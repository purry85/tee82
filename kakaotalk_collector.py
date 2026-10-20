# -*- coding: utf-8 -*-
"""
Tee82 - 카카오톡 PC 공지 실시간 무인 자동 수집기 (옵션 B)
======================================================
카카오톡 PC 대화창(예: '골프락_그린피방')을 백그라운드에서 실시간 모니터링하여,
새로 등록되는 구장 공지 텍스트를 감지하고 로컬 API(127.0.0.1:18900)를 통해
크롬 확장 프로그램(Tee82)으로 자동 공급합니다.
"""

import sys
import os
import re
import time
import json
import hashlib
from datetime import datetime
from http.server import HTTPServer, BaseHTTPRequestHandler
import threading

# 표준 출력 인코딩 UTF-8 설정 (Windows 콘솔 한글 깨짐 방지)
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# UIAutomation 모듈 불러오기
try:
    import uiautomation as auto
except ImportError:
    print("=" * 60)
    print("❌ 'uiautomation' 패키지가 설치되어 있지 않습니다.")
    print("👉 명령 프롬프트(CMD)에서 아래 명령어를 실행해주세요:")
    print("   pip install uiautomation")
    print("=" * 60)
    input("엔터 키를 누르면 종료합니다...")
    sys.exit(1)

# 전역 상태 및 저장소
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONFIG_PATH = os.path.join(BASE_DIR, "config.json")
DATA_PATH = os.path.join(BASE_DIR, "collected_notices.json")

config = {
    "target_rooms": ["골프락_그린피방", "골프락", "그린피방"],
    "auto_detect_golf_rooms": True,
    "poll_interval_sec": 3,
    "server_port": 18900,
    "server_host": "127.0.0.1",
    "max_history_count": 50
}

if os.path.exists(CONFIG_PATH):
    try:
        with open(CONFIG_PATH, "r", encoding="utf-8") as f:
            user_cfg = json.load(f)
            config.update(user_cfg)
    except Exception as e:
        print(f"⚠️ config.json 로드 실패, 기본 설정 사용: {e}")

collected_notices = []
seen_message_hashes = set()
active_window_title = ""
last_poll_time = ""

# 기존 수집된 공지 파일에서 복원
if os.path.exists(DATA_PATH):
    try:
        with open(DATA_PATH, "r", encoding="utf-8") as f:
            saved = json.load(f)
            if isinstance(saved, list):
                collected_notices = saved
                for item in collected_notices:
                    if "hash" in item:
                        seen_message_hashes.add(item["hash"])
                    elif "text" in item:
                        h = hashlib.md5(item["text"].strip().encode('utf-8')).hexdigest()
                        seen_message_hashes.add(h)
    except Exception:
        collected_notices = []


def save_notices_to_file():
    """수집된 공지 데이터를 JSON 파일로 안전 저장"""
    try:
        with open(DATA_PATH, "w", encoding="utf-8") as f:
            json.dump(collected_notices, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"⚠️ 데이터 저장 오류: {e}")


def is_golf_notice(text):
    """카톡 메시지가 실제 골프장 그린피 할인/공지 메시지인지 판별"""
    if not text or len(text.strip()) < 10:
        return False

    clean = text.strip()

    # 1. 카톡 시스템 문구 및 단순 대화 스킵
    if any(clean.startswith(prefix) for prefix in [
        "님이 들어왔습니다", "님이 나갔습니다", "초대했습니다", "내보냈습니다",
        "채팅방 관리자가 메시지를 가렸습니다"
    ]):
        return False

    if clean in ["사진", "이모티콘", "동영상", "보이스톡", "음성메시지", "네", "감사합니다", "확인했습니다"]:
        return False

    # 2. 공지 핵심 키워드
    notice_keywords = [
        "공지", "부분선결제", "선결제", "금액 인하", "금액인하", "인하", "특가", "임박특가",
        "할인안내", "할인", "그린피", "잔여타임", "잔여", "현장결제", "현장", "골프락",
        "솔트베이", "양평TPC", "유니아일랜드", "벨라45", "1부", "2부", "3부", "카포", "카트포함"
    ]
    has_keyword = any(kw in clean for kw in notice_keywords)

    # 3. 날짜 패턴 (예: 10/20, 10.20, 10월 20일)
    has_date = bool(re.search(r'(\d{1,2}\s*월\s*\d{1,2}\s*일|\d{1,2}[./\-]\d{1,2})', clean))

    # 4. 금액 패턴 (예: 13만, 10.9만, 22.9, 150,000원, 14만!)
    has_price = bool(re.search(r'([0-9.,]+\s*만|\d{2,3},\d{3}\s*원|\d{1,2}:\d{2}\s*[-~:]\s*[0-9.]+)', clean))

    # 5. 시간 패턴 (예: 6:44, 7시, 7시30분, 05:46)
    has_time = bool(re.search(r'(\d{1,2}:\d{2}|\d{1,2}시(?:\s*\d{1,2}분)?)', clean))

    # 규칙: 공지 키워드가 있으면서 (금액 또는 날짜)가 있거나, (날짜 + 시간 + 금액)이 명시된 경우
    if has_keyword and (has_price or has_date):
        return True
    if has_date and has_time and has_price:
        return True

    return False


def find_target_chat_windows():
    """열려 있는 카카오톡 창 중 공지 대상 채팅방 검색"""
    target_rooms = config.get("target_rooms", [])
    auto_detect = config.get("auto_detect_golf_rooms", True)

    root = auto.GetRootControl()
    found_windows = []

    for win in root.GetChildren():
        name = win.Name or ""
        class_name = win.ClassName or ""

        # 카카오톡 창 클래스(EVA_Window_Dblclk) 또는 이름 매칭
        if not name:
            continue

        is_matched = any(target in name for target in target_rooms)
        if not is_matched and auto_detect:
            if any(k in name for k in ["골프", "그린피", "조인", "부킹", "티타임", "골프락", "골팡", "골마켓"]) and ("EVA" in class_name or "카카오톡" in name):
                is_matched = True

        if is_matched:
            found_windows.append(win)

    return found_windows


def extract_messages_from_window(win):
    """카카오톡 대화창 UI 컨트롤에서 최근 메시지 목록 추출"""
    messages = []
    try:
        # 대화 내용 리스트 컨트롤 찾기
        chat_list = win.ListControl()
        if not chat_list.Exists(0, 0):
            # 일부 카톡 버전에서는 PaneControl 안에 List가 존재
            chat_list = win.PaneControl().ListControl()

        if not chat_list.Exists(0, 0):
            return []

        items = chat_list.GetChildren()
        # 최근 25개 메시지 위주로 검사
        recent_items = items[-25:] if len(items) > 25 else items

        for item in recent_items:
            # 항목 텍스트 취합
            parts = []
            if item.Name:
                parts.append(item.Name.strip())

            for child in item.GetChildren():
                c_name = child.Name or ""
                if c_name and c_name not in parts:
                    parts.append(c_name.strip())

            full_text = "\n".join(parts).strip()
            if full_text:
                messages.append({
                    "text": full_text,
                    "item_control": item
                })
    except Exception:
        pass

    return messages


# ====================================================================
# 로컬 HTTP API 서버 (크롬 확장 프로그램과 통신용)
# ====================================================================
class NoticeAPIHandler(BaseHTTPRequestHandler):
    def _set_cors_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_cors_headers(200)

    def do_GET(self):
        global collected_notices, active_window_title, last_poll_time

        if self.path.startswith('/api/notices'):
            self._set_cors_headers(200)
            res = {
                "status": "ok",
                "count": len(collected_notices),
                "notices": collected_notices
            }
            self.wfile.write(json.dumps(res, ensure_ascii=False).encode('utf-8'))
        elif self.path.startswith('/api/status'):
            self._set_cors_headers(200)
            res = {
                "status": "ok",
                "collector_running": True,
                "target_rooms": config.get("target_rooms", []),
                "active_window": active_window_title or "대화창 검색 중...",
                "collected_count": len(collected_notices),
                "last_poll_time": last_poll_time or datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
            self.wfile.write(json.dumps(res, ensure_ascii=False).encode('utf-8'))
        else:
            self._set_cors_headers(404)
            self.wfile.write(json.dumps({"status": "error", "message": "Not Found"}).encode('utf-8'))

    def do_POST(self):
        global collected_notices
        if self.path.startswith('/api/clear'):
            collected_notices = []
            save_notices_to_file()
            self._set_cors_headers(200)
            self.wfile.write(json.dumps({"status": "ok", "message": "모든 공지가 초기화되었습니다."}).encode('utf-8'))
        else:
            self._set_cors_headers(404)

    def log_message(self, format, *args):
        # 콘솔에 지저분한 HTTP 로그 출력 방지
        return


def start_http_server():
    """크롬 확장 연동용 로컬 웹 서버 구동 (127.0.0.1:18900)"""
    port = config.get("server_port", 18900)
    host = config.get("server_host", "127.0.0.1")
    try:
        server = HTTPServer((host, port), NoticeAPIHandler)
        print(f"📡 [Tee82 API 서버 시작] http://{host}:{port}/api/notices")
        server.serve_forever()
    except Exception as e:
        print(f"❌ API 서버 시작 실패 (포트 {port} 충돌 가능성): {e}")


# ====================================================================
# 메인 모니터링 루프
# ====================================================================
def main_monitoring_loop():
    global active_window_title, last_poll_time, collected_notices

    interval = config.get("poll_interval_sec", 3)
    max_history = config.get("max_history_count", 50)

    print("\n" + "=" * 65)
    print("🚀 Tee82 카카오톡 PC 공지 무인 자동 수집기 실행 완료!")
    print(f"🎯 대상 카톡방 키워드: {', '.join(config.get('target_rooms', []))}")
    print(f"⏰ 감시 주기: {interval}초 간격")
    print("💡 카카오톡에서 해당 대화창을 열어두시면 자동으로 공지를 수집합니다.")
    print("=" * 65 + "\n")

    while True:
        try:
            last_poll_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            windows = find_target_chat_windows()

            if not windows:
                active_window_title = ""
                # 조용히 대기 (콘솔 도배 방지)
            else:
                active_window_title = ", ".join([w.Name for w in windows if w.Name])
                for win in windows:
                    room_name = win.Name or "카카오톡 대화방"
                    messages = extract_messages_from_window(win)

                    for msg in messages:
                        raw_text = msg["text"]
                        if not is_golf_notice(raw_text):
                            continue

                        # 중복 공지 방지용 MD5 해시 생성
                        # 날짜, 구장명, 시간, 금액 등의 핵심 텍스트 기준 해시
                        clean_normalized = re.sub(r'\s+', ' ', raw_text).strip()
                        msg_hash = hashlib.md5(clean_normalized.encode('utf-8')).hexdigest()

                        if msg_hash in seen_message_hashes:
                            continue

                        # 새 공지 등록!
                        seen_message_hashes.add(msg_hash)
                        now_str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

                        notice_entry = {
                            "id": f"kakao_{int(time.time() * 1000)}",
                            "hash": msg_hash,
                            "room": room_name,
                            "text": raw_text,
                            "collected_at": now_str
                        }

                        collected_notices.append(notice_entry)
                        if len(collected_notices) > max_history:
                            collected_notices.pop(0)

                        save_notices_to_file()

                        # 콘솔에 보기 좋게 알림 출력
                        first_line = raw_text.split('\n')[0].strip()
                        print(f"\n📢 [새 공지 자동 감지!] {now_str}")
                        print(f"   🏠 채팅방: {room_name}")
                        print(f"   📝 내용요약: {first_line[:40]}...")
                        print(f"   ✨ 크롬 확장 프로그램(Tee82)으로 실시간 제공 준비 완료!")
                        print("-" * 50)

        except Exception as e:
            # 예외 발생 시 크래시 방지 후 재시도
            pass

        time.sleep(interval)


if __name__ == "__main__":
    # 백그라운드 스레드에서 HTTP 서버 구동
    server_thread = threading.Thread(target=start_http_server, daemon=True)
    server_thread.start()

    # 메인 스레드에서 카카오톡 감시 실행
    main_monitoring_loop()
