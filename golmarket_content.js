/**
 * Golmarket (golmarket.co.kr) 조인 자동 등록 Content Script
 * Tee82 골마켓 초고속 & 안전 자동등록 엔진
 */

let isRegistrationRunning = false;
let shouldStopRegistration = false;

// 1. 브라우저 Alert/Confirm 자동 통과 인터셉터 (메인 월드 스크립트 주입)
try {
    const script = document.createElement('script');
    script.textContent = `
        window._origAlert = window.alert;
        window.alert = function(msg) {
            console.log("[Tee82 Golmarket Alert Intercepted]:", msg);
            window.postMessage({ type: 'TEE82_GOLMARKET_ALERT', text: String(msg) }, '*');
            return true;
        };
        window.confirm = function(msg) {
            console.log("[Tee82 Golmarket Confirm Intercepted]:", msg);
            return true;
        };
    `;
    (document.head || document.documentElement).appendChild(script);
    script.remove();
} catch (e) {
    console.error("Alert override failed:", e);
}

// 1-1. 인터셉트된 Alert 감지 및 등록 완료/에러 처리
window.addEventListener('message', async (e) => {
    if (e.data && e.data.type === 'TEE82_GOLMARKET_ALERT') {
        const alertText = e.data.text || '';
        console.warn("[골마켓 Alert 수신]:", alertText);

        // A. '등록되었습니다' 등 성공 메시지 감지 시: 지연 없이 즉시 다음 건으로 페이지 이동 보조
        if (alertText.includes('등록되었습니다') || alertText.includes('등록 완료') || alertText.includes('성공')) {
            console.log("🎉 [골마켓] '등록되었습니다' 알림 수신! 성공 감지 및 다음 건 준비...");
            setTimeout(async () => {
                const checkRes = await new Promise(r => chrome.storage.local.get(['golmarket_task'], r));
                const task = checkRes?.golmarket_task;
                if (task && task.isRunning && task.status === 'submitting') {
                    console.log("[골마켓] '등록되었습니다' 후속 페이지 이동 실행...");
                    const isTransfer = Boolean(task.isTransferMode || task.mode === 'transfer' || (task.items && task.items.some(it => it.roomType === '양도')));
                    if (isTransfer) {
                        window.location.href = 'https://golmarket.co.kr/booking_form.php';
                    } else {
                        window.location.href = 'https://www.golmarket.co.kr/join_list.php';
                    }
                }
            }, 1200);
            return;
        }

        // B. 일일 등록 한도 초과 또는 로그인 필요/권한 에러 감지 시 자동 중단
        if (alertText.includes('초과') || alertText.includes('권한') || alertText.includes('로그인') || alertText.includes('제한')) {
            shouldStopRegistration = true;
            isRegistrationRunning = false;
            updateGolmarketHUD({
                desc: `⚠️ ${alertText}`,
                isStopped: true
            });
            try {
                await new Promise(r => chrome.storage.local.set({
                    golmarket_task: null,
                    isRegistrationRunning: false
                }, r));
            } catch(err) {}
            chrome.runtime.sendMessage({
                type: 'REGISTER_STOPPED',
                reason: alertText
            });
        }
    }
});

// ==================== 골마켓 온스크린 진행 상황 HUD (Floating Progress Window) ====================
function getOrCreateGolmarketHUD() {
    let hud = document.getElementById('tee82_golmarket_hud');
    if (hud) return hud;

    hud = document.createElement('div');
    hud.id = 'tee82_golmarket_hud';
    hud.style.cssText = `
        position: fixed !important;
        top: 20px !important;
        right: 24px !important;
        width: 320px !important;
        max-width: 92vw !important;
        background: #ffffff !important;
        border: 2px solid #13392E !important;
        border-radius: 12px !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(19, 57, 46, 0.12) !important;
        z-index: 2147483647 !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', 'Segoe UI', Roboto, sans-serif !important;
        padding: 15px 16px !important;
        box-sizing: border-box !important;
        color: #111827 !important;
        transition: opacity 0.3s ease, transform 0.3s ease !important;
        display: block !important;
    `;

    hud.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 6px; font-weight: 800; font-size: 13.5px; color: #13392E;">
                <span style="font-size: 16px;">⛳</span>
                <span id="tee82_hud_title">골마켓 자동 등록 진행 중</span>
            </div>
            <span style="background: #E8F5E9; color: #1B5E20; font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 10px; border: 1px solid #A5D6A7;">Tee82 Live</span>
        </div>
        <div id="tee82_hud_desc" style="font-size: 12px; color: #4B5563; margin-bottom: 9px; line-height: 1.4; word-break: break-all; min-height: 28px;">
            골마켓 화면을 준비하고 있습니다...
        </div>
        <div style="background: #E5E7EB; border-radius: 10px; height: 9px; overflow: hidden; margin-bottom: 9px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);">
            <div id="tee82_hud_bar" style="background: linear-gradient(90deg, #10B981, #059669); height: 100%; width: 0%; transition: width 0.35s ease; border-radius: 10px;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div id="tee82_hud_count" style="font-size: 11.5px; font-weight: 800; color: #10B981;">
                0 / 0건 완료
            </div>
            <button id="tee82_hud_btn_stop" style="
                background: #EF4444 !important;
                color: #ffffff !important;
                border: none !important;
                padding: 5px 12px !important;
                border-radius: 6px !important;
                font-size: 11px !important;
                font-weight: 700 !important;
                cursor: pointer !important;
                box-shadow: 0 2px 5px rgba(239, 68, 68, 0.35) !important;
                transition: background 0.15s !important;
            ">🛑 중단하기</button>
        </div>
    `;

    (document.body || document.documentElement).appendChild(hud);

    // 중단 버튼 이벤트 연결
    const stopBtn = hud.querySelector('#tee82_hud_btn_stop');
    if (stopBtn) {
        stopBtn.addEventListener('click', async () => {
            console.log("[골마켓 HUD] 사용자가 온스크린 🛑 중단하기 클릭");
            shouldStopRegistration = true;
            isRegistrationRunning = false;
            try {
                await new Promise(r => chrome.storage.local.set({
                    golmarket_task: null,
                    isRegistrationRunning: false
                }, r));
            } catch(e) {}
            chrome.runtime.sendMessage({ type: 'REGISTER_STOPPED' });
            updateGolmarketHUD({
                desc: '🛑 사용자에 의해 자동 등록이 중단되었습니다.',
                isStopped: true
            });
            setTimeout(removeGolmarketHUD, 1800);
        });
    }

    return hud;
}

function updateGolmarketHUD({ title, desc, current, total, isCompleted, isStopped, waitSec, nextGolf }) {
    const hud = getOrCreateGolmarketHUD();
    if (!hud) return;

    if (title) {
        const titleEl = hud.querySelector('#tee82_hud_title');
        if (titleEl) titleEl.innerText = title;
    }

    if (desc) {
        const descEl = hud.querySelector('#tee82_hud_desc');
        if (descEl) descEl.innerText = desc;
    }

    const barEl = hud.querySelector('#tee82_hud_bar');
    const countEl = hud.querySelector('#tee82_hud_count');

    if (total && total > 0) {
        const cur = current || 0;
        const pct = Math.min(100, Math.round((cur / total) * 100));
        if (barEl) barEl.style.width = `${pct}%`;
        if (countEl) countEl.innerText = `${cur} / ${total}건 (${pct}%)`;
    }

    if (isCompleted) {
        if (barEl) barEl.style.width = '100%';
        const descEl = hud.querySelector('#tee82_hud_desc');
        if (descEl) descEl.innerText = `🎉 총 ${total || ''}건의 등록이 모두 완료되었습니다!`;
        const countEl = hud.querySelector('#tee82_hud_count');
        if (countEl) countEl.innerText = `${total}/${total}건 완료 (100%)`;
        setTimeout(removeGolmarketHUD, 2600);
    }

    if (isStopped) {
        const barEl = hud.querySelector('#tee82_hud_bar');
        if (barEl) barEl.style.background = '#EF4444';
        setTimeout(removeGolmarketHUD, 2000);
    }
}

function removeGolmarketHUD() {
    const hud = document.getElementById('tee82_golmarket_hud');
    if (hud) {
        hud.style.opacity = '0';
        hud.style.transform = 'translateY(-10px)';
        setTimeout(() => hud.remove(), 300);
    }
}

// 2. 수면(대기) 함수 - 즉시 중단 감지 지원
function sleep(ms) {
    return new Promise((resolve) => {
        const start = Date.now();
        const interval = setInterval(() => {
            if (shouldStopRegistration || (Date.now() - start >= ms)) {
                clearInterval(interval);
                resolve();
            }
        }, 40);
    });
}

// 3. 인간적 미세 불규칙 지연 (3합 균등 가우시안 정규분포 근사)
function getStepDelay(actionType = 'normal', stepPreset = 'human') {
    let minMs = 380;
    let maxMs = 950;

    if (stepPreset === 'slow') { // 🐢 신중한 사람
        minMs = 700; maxMs = 1500;
    } else if (stepPreset === 'fast') { // ⚡ 빠른 손
        minMs = 180; maxMs = 450;
    } else if (stepPreset === 'turbo') { // 🚀 초고속
        minMs = 80; maxMs = 180;
    } else { // 👤 human 기본 리듬
        minMs = 380; maxMs = 950;
    }

    if (actionType === 'course_search') {
        minMs = Math.round(minMs * 1.3);
        maxMs = Math.round(maxMs * 1.5);
    } else if (actionType === 'before_submit') {
        minMs = Math.round(minMs * 1.4);
        maxMs = Math.round(maxMs * 1.7);
    } else if (actionType === 'typing') {
        minMs = Math.round(minMs * 1.1);
        maxMs = Math.round(maxMs * 1.25);
    } else if (actionType === 'click') {
        minMs = Math.round(minMs * 0.85);
        maxMs = Math.round(maxMs * 1.0);
    }

    const rand = (Math.random() + Math.random() + Math.random()) / 3;
    return Math.floor(rand * (maxMs - minMs) + minMs);
}

// 4. 건별 불규칙 쿨다운 시간 계산
function getCooldownDelay(preset = 'safe') {
    let minMs = 2200, maxMs = 4500;
    if (preset === 'stealth') {
        minMs = 3500; maxMs = 7000;
    } else if (preset === 'fast') {
        minMs = 1200; maxMs = 2500;
    } else if (preset === 'turbo') {
        minMs = 600; maxMs = 1200;
    } else {
        minMs = 2200; maxMs = 4500;
    }
    const rand = (Math.random() + Math.random()) / 2;
    return Math.floor(rand * (maxMs - minMs) + minMs);
}

// 5. 사람 손가락 터치/마우스 클릭 시뮬레이션
async function humanClick(el) {
    if (!el) return;
    try {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch(e) {}

    const rect = el.getBoundingClientRect();
    const jitterX = (Math.random() - 0.5) * (rect.width * 0.3);
    const jitterY = (Math.random() - 0.5) * (rect.height * 0.3);
    const x = rect.left + rect.width / 2 + jitterX;
    const y = rect.top + rect.height / 2 + jitterY;

    const opts = { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y };

    el.dispatchEvent(new MouseEvent('mouseenter', opts));
    el.dispatchEvent(new MouseEvent('mouseover', opts));
    await sleep(Math.floor(Math.random() * 40 + 30));

    el.dispatchEvent(new MouseEvent('mousedown', opts));
    await sleep(Math.floor(Math.random() * 80 + 60));
    el.dispatchEvent(new MouseEvent('mouseup', opts));
    el.dispatchEvent(new MouseEvent('click', opts));
}

// 6. 구장 검색용 순수 키워드 추출 (예: '세레니티강촌(구.파가니카)' -> '세레니티', '필로스GC' -> '필로스')
function getSearchKeyword(golfName) {
    if (!golfName) return '';
    let clean = golfName.replace(/\(.*?\)/g, '').replace(/\[.*?\]/g, '').trim();
    clean = clean.replace(/cc|gc/gi, '').trim();
    // 특수문자 제거 후 2글자 이상 키워드 우선
    clean = clean.replace(/[^\w\s가-힣0-9]/g, '').trim();
    return clean || golfName;
}

// 6-1. 골마켓 전용 골프장명 변환 매핑 (골프존진천 -> 골프존카운티 진천 등 공식 명칭)
const GOLMARKET_GOLF_NAME_MAP = {
    '골프존진천': '골프존카운티 진천',
    '골프존화랑': '골프존카운티 화랑',
    '골프존송도': '골프존카운티 송도',
    '골프존천안': '골프존카운티 천안',
    '골프존 진천': '골프존카운티 진천',
    '골프존 화랑': '골프존카운티 화랑',
    '골프존 송도': '골프존카운티 송도',
    '골프존 천안': '골프존카운티 천안',
    '골프존카운티진천': '골프존카운티 진천',
    '골프존카운티화랑': '골프존카운티 화랑',
    '골프존카운티송도': '골프존카운티 송도',
    '골프존카운티천안': '골프존카운티 천안',
    '골프존안성H': '골프존카운티 안성H',
    '골프존안성W': '골프존카운티 안성W',
    '골프존카운티안성H': '골프존카운티 안성H',
    '골프존카운티안성W': '골프존카운티 안성W',
    '골프존선운': '골프존카운티 선운',
    '골프존청통': '골프존카운티 청통',
    '골프존감포': '골프존카운티 감포',
    '골프존순천': '골프존카운티 순천',
    '골프존사천': '골프존카운티 사천',
    '골프존구미': '골프존카운티 구미'
};

function getGolmarketGolfName(golfName) {
    if (!golfName) return '';
    const clean = String(golfName).trim();
    if (GOLMARKET_GOLF_NAME_MAP[clean]) {
        return GOLMARKET_GOLF_NAME_MAP[clean];
    }
    const noSpace = clean.replace(/[\s\-_]/g, '');
    for (const [k, v] of Object.entries(GOLMARKET_GOLF_NAME_MAP)) {
        if (k.replace(/[\s\-_]/g, '') === noSpace) return v;
    }
    if (/골프존.*진천/i.test(clean)) return '골프존카운티 진천';
    if (/골프존.*화랑/i.test(clean)) return '골프존카운티 화랑';
    if (/골프존.*송도/i.test(clean)) return '골프존카운티 송도';
    if (/골프존.*천안/i.test(clean)) return '골프존카운티 천안';
    if (/골프존.*안성\s*h/i.test(clean)) return '골프존카운티 안성H';
    if (/골프존.*안성\s*w/i.test(clean)) return '골프존카운티 안성W';

    return clean;
}

// 7. 가격 문자열 -> 원 단위 숫자 변환 (예: '10' -> 100000, '10.9' -> 109000, '9.9' -> 99000, '11만' -> 110000, '10.5만' -> 105000, '전화문의' -> 문의)
function parseFeeToWon(feeStr) {
    if (!feeStr) return { won: '', isInquiry: true };
    const clean = String(feeStr).trim();
    if (clean.includes('문의') || clean === '0') {
        return { won: '', isInquiry: true };
    }
    const hasMan = clean.includes('만');
    const noComma = clean.replace(/,/g, '');
    const numMatch = noComma.match(/([0-9]+(?:\.[0-9]+)?)/);
    if (numMatch) {
        const floatVal = parseFloat(numMatch[1]);
        if (!isNaN(floatVal)) {
            if (hasMan || floatVal < 500) {
                // 예: 10 -> 100000, 10.9 -> 109000, 9.9 -> 99000, 11 -> 110000
                return { won: String(Math.round(floatVal * 10000)), isInquiry: false };
            } else {
                // 예: 100000 -> 100000, 109000 -> 109000
                return { won: String(Math.round(floatVal)), isInquiry: false };
            }
        }
    }
    return { won: '', isInquiry: true };
}

// 8. 날짜 포맷 변환 (Tee82 '10/15' 또는 '2026-10-15' -> 'YYYY-MM-DD')
function formatGolmarketDate(dateStr) {
    if (!dateStr) return '';
    const now = new Date();
    const currentYear = now.getFullYear();
    const clean = dateStr.trim();

    const mFull = clean.match(/(\d{4})[./-](\d{1,2})[./-](\d{1,2})/);
    if (mFull) {
        return `${mFull[1]}-${mFull[2].padStart(2, '0')}-${mFull[3].padStart(2, '0')}`;
    }

    const mShort = clean.match(/(\d{1,2})[./-](\d{1,2})/);
    if (mShort) {
        return `${currentYear}-${mShort[1].padStart(2, '0')}-${mShort[2].padStart(2, '0')}`;
    }

    return dateStr;
}

// ==================== DOM 필드 탐색기 ====================

// A. 골프장 입력 필드 찾기
function findGolfInput() {
    const byName = document.querySelector('input[name="gf_name"], input[name="golf_name"], input[name="golf"], input[id="gf_name"], input[id="golf_name"]');
    if (byName) return byName;

    const labels = Array.from(document.querySelectorAll('th, td, label, div, span'));
    for (const el of labels) {
        if (el.textContent.trim() === '골프장' && el.offsetHeight > 0) {
            const tr = el.closest('tr') || el.parentElement;
            if (tr) {
                const inp = tr.querySelector('input[type="text"], input:not([type])');
                if (inp) return inp;
            }
        }
    }
    return document.querySelector('input[type="text"]');
}

// B. 부킹일시 - 날짜 입력 필드 찾기
function findDateInput() {
    const byName = document.querySelector('input[name="booking_date"], input[name="b_date"], input[name="date"], input.datepicker, input#datepicker');
    if (byName) return byName;

    const labels = Array.from(document.querySelectorAll('th, td, label'));
    for (const el of labels) {
        if (el.textContent.trim().includes('부킹일시') && el.offsetHeight > 0) {
            const tr = el.closest('tr') || el.parentElement;
            if (tr) {
                const inps = Array.from(tr.querySelectorAll('input[type="text"], input:not([type])'));
                if (inps.length > 0) return inps[0];
            }
        }
    }
    return null;
}

// C. 부킹일시 - 시간(시) 선택 드롭다운 찾기
function findHourSelect() {
    const byName = document.querySelector('select[name="booking_hour"], select[name="b_hour"], select[name="hour"]');
    if (byName) return byName;

    const selects = Array.from(document.querySelectorAll('select'));
    for (const sel of selects) {
        const parentText = (sel.parentElement?.textContent || '');
        if (parentText.includes('시') || sel.closest('tr')?.textContent.includes('부킹일시')) {
            return sel;
        }
    }
    return selects[0] || null;
}

// D. 부킹일시 - 분(분) 입력/선택 필드 찾기
function findMinuteElement() {
    const byName = document.querySelector('input[name="booking_minute"], input[name="b_minute"], input[name="minute"], input[name*="min"], select[name="booking_minute"], select[name="b_minute"], select[name="minute"], select[name*="min"]');
    if (byName) return byName;

    // "시"와 "분" 사이에 위치한 input/select 탐색
    const hourSel = findHourSelect();
    if (hourSel) {
        let el = hourSel.nextElementSibling;
        while (el) {
            if (el.tagName && (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'select')) {
                return el;
            }
            const nested = el.querySelector ? el.querySelector('input, select') : null;
            if (nested) return nested;
            el = el.nextElementSibling;
        }
        const parentTr = hourSel.closest('tr') || hourSel.parentElement;
        if (parentTr) {
            const inps = Array.from(parentTr.querySelectorAll('input[type="text"], input[type="number"], input:not([type])'));
            if (inps.length > 1) return inps[inps.length - 1]; // 날짜 외 마지막 input이 분
            const selects = Array.from(parentTr.querySelectorAll('select'));
            if (selects.length > 1) return selects[1];
        }
    }

    const labels = Array.from(document.querySelectorAll('th, td, label'));
    for (const el of labels) {
        if (el.textContent.trim().includes('부킹일시')) {
            const tr = el.closest('tr') || el.parentElement;
            if (tr) {
                const inps = Array.from(tr.querySelectorAll('input[type="text"], input[type="number"], input:not([type])'));
                if (inps.length > 1) return inps[1];
            }
        }
    }
    return null;
}

// E. 가격 입력 필드 및 전화문의 체크박스 찾기
function findPriceElements() {
    let priceInput = document.querySelector('input[placeholder*="100000"], input[name="price"], input[name="pay"], input[name="gf_price"], input[name="fee"]');
    let inquiryCheckbox = document.querySelector('input[name="is_inquiry"], input[name="tel_inquiry"], input[name="call_inquiry"]');

    if (!priceInput || !inquiryCheckbox) {
        const labels = Array.from(document.querySelectorAll('th, td, label'));
        for (const el of labels) {
            if (el.textContent.trim() === '가격') {
                const tr = el.closest('tr') || el.parentElement;
                if (tr) {
                    if (!priceInput) priceInput = tr.querySelector('input[type="text"], input[type="number"], input:not([type])');
                    if (!inquiryCheckbox) {
                        const chks = tr.querySelectorAll('input[type="checkbox"]');
                        if (chks.length > 0) inquiryCheckbox = chks[0];
                    }
                }
            }
        }
    }
    return { priceInput, inquiryCheckbox };
}

// F. 체크박스 라벨/값으로 정확한 1:1 선택/해제
function setCheckboxByLabel(labelText, checked) {
    const targetClean = labelText.replace(/\s/g, '');

    // 1. label 태그 정확 일치 검색
    const labels = Array.from(document.querySelectorAll('label'));
    for (const label of labels) {
        const text = label.textContent.trim().replace(/\s/g, '');
        if (text === targetClean) {
            const chk = label.querySelector('input[type="checkbox"]') ||
                        (label.htmlFor ? document.getElementById(label.htmlFor) : null);
            if (chk) {
                if (chk.checked !== checked) {
                    chk.checked = checked;
                    chk.dispatchEvent(new Event('input', { bubbles: true }));
                    chk.dispatchEvent(new Event('change', { bubbles: true }));
                }
                return true;
            }
        }
    }

    // 2. checkbox value 속성 직접 일치 (예: value="선입금", value="2인", value="노캐디")
    const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    for (const chk of checkboxes) {
        const val = (chk.value || '').trim().replace(/\s/g, '');
        if (val === targetClean) {
            if (chk.checked !== checked) {
                chk.checked = checked;
                chk.dispatchEvent(new Event('input', { bubbles: true }));
                chk.dispatchEvent(new Event('change', { bubbles: true }));
            }
            return true;
        }
    }

    // 3. 체크박스 바로 다음 텍스트 노드 일치 (예: <input type="checkbox"> 선입금)
    for (const chk of checkboxes) {
        let sib = chk.nextSibling;
        while (sib && sib.nodeType === Node.TEXT_NODE && !sib.textContent.trim()) {
            sib = sib.nextSibling;
        }
        if (sib) {
            const sibText = (sib.textContent || '').trim().replace(/\s/g, '');
            // 정확히 일치해야 함 ('2인'이 '2인남성'/'2인여성'을 잘못 건드리지 않도록 완전 일치 검사)
            if (sibText === targetClean) {
                if (chk.checked !== checked) {
                    chk.checked = checked;
                    chk.dispatchEvent(new Event('input', { bubbles: true }));
                    chk.dispatchEvent(new Event('change', { bubbles: true }));
                }
                return true;
            }
        }
    }

    return false;
}

// G. 추가 정보 사항 (상세 내용) textarea 찾기
function findMemoTextarea() {
    return document.querySelector('textarea[name="memo"], textarea[name="content"], textarea[name="wr_content"], textarea[name="info"], textarea');
}

// H. 등록하기 버튼 찾기
function findSubmitButton() {
    const candidates = Array.from(document.querySelectorAll('input[type="submit"], button[type="submit"], button, input[type="button"], a.btn, a'));
    for (const el of candidates) {
        const val = (el.value || el.textContent || '').trim();
        if (val === '등록하기' || val === '조인등록' || val === '등록') {
            if (el.offsetHeight > 0) return el;
        }
    }
    return document.querySelector('input[type="submit"], button[type="submit"]');
}

// ==================== 골프장 자동완성 탐색 및 선택기 ====================

// 1. 골마켓 자동완성 목록 요소 정밀 탐색기 (select, option, input, button, div, li, tr, td 등 모든 형태 완벽 탐색)
function findGolfSuggestionItems(keyword) {
    const items = [];
    const golfInput = findGolfInput();
    const inputRect = golfInput ? golfInput.getBoundingClientRect() : null;
    const cleanKw = (keyword || '').toLowerCase().replace(/[\s\-_gcCC\(\)\[\]]/gi, '');

    // A. 골프장 입력 필드와 동일한 셀(td) 또는 행(tr) 내부 요소 최우선 정밀 검사
    if (golfInput) {
        const cell = golfInput.closest('td') || golfInput.parentElement;
        if (cell) {
            const cellCandidates = Array.from(cell.querySelectorAll('select, option, input, button, a, div, span, p, li, b'));
            for (const c of cellCandidates) {
                if (!c || c === golfInput || c.contains(golfInput)) continue;
                if (['SCRIPT', 'STYLE'].includes(c.tagName)) continue;
                const cText = (c.value || c.textContent || c.innerText || '').trim();
                if (/\[\d{2,6}\]/.test(cText) || (cText.length >= 2 && cleanKw && cText.toLowerCase().includes(cleanKw))) {
                    if (!items.includes(c)) items.push(c);
                }
            }
        }
    }

    // B. 모든 DOM 후보 요소 수집 (select, option, input, button, a, div, li, tr, td, span, p, label)
    const allCandidates = Array.from(document.querySelectorAll('select, option, input, button, a, div, li, tr, td, span, p, label'));

    // B-1. iframe 내부 문서 후보 요소 보조 수집
    try {
        const iframes = Array.from(document.querySelectorAll('iframe'));
        for (const ifr of iframes) {
            try {
                const doc = ifr.contentDocument || ifr.contentWindow?.document;
                if (doc) {
                    const ifrCandidates = Array.from(doc.querySelectorAll('select, option, input, button, a, div, li, tr, td, span, p, label'));
                    allCandidates.push(...ifrCandidates);
                }
            } catch(e) {}
        }
    } catch(e) {}

    for (const el of allCandidates) {
        // 골프장 입력창 자신 및 상위 컨테이너는 제외
        if (!el || el === golfInput || (golfInput && el.contains(golfInput))) continue;
        if (['TEXTAREA', 'BODY', 'HTML', 'SCRIPT', 'STYLE'].includes(el.tagName)) continue;

        // OPTION 태그는 브라우저에서 offsetHeight가 0일 수 있으므로 태그 검사 예외 처리
        if (el.tagName !== 'OPTION' && el.offsetHeight <= 3 && el.offsetWidth <= 5) continue;

        // textContent 또는 value 또는 innerText 확인
        const valText = (el.value || '').trim();
        const contentText = (el.textContent || el.innerText || '').trim();
        const rawText = valText || contentText;
        if (!rawText || rawText.length > 150) continue;

        // 위치 판별: golfInput 바로 아래쪽(수직 500px 이내, 수평 400px 이내)
        let isNearInput = false;
        if (inputRect) {
            try {
                const r = el.getBoundingClientRect();
                const topDiff = r.top - inputRect.top;
                const leftDiff = Math.abs(r.left - inputRect.left);
                if (topDiff >= -10 && topDiff <= 500 && leftDiff <= 400) {
                    isNearInput = true;
                }
            } catch(e) {}
        }

        // 조건 1: 골마켓 구장코드 패턴 ([숫자], 예: "[4037]", "[3033]") 포함
        const hasCode = /\[\d{2,6}\]/.test(rawText);

        // 조건 2: 검색 키워드 포함 (예: "동촌", "파크밸리")
        const cleanRaw = rawText.replace(/[\s\-_gcCC\(\)\[\]]/gi, '').toLowerCase();
        const hasKw = cleanKw && cleanRaw.includes(cleanKw);

        // [구장코드]가 있거나, 입력창 근처에 있으면서 키워드를 포함하는 요소 채택
        if (hasCode || (isNearInput && hasKw)) {
            // 자식 요소 중 더 구체적으로 구장명+코드를 둘 다 가진 요소가 있다면 상위 컨테이너 대신 자식 요소 채택
            const hasBetterChild = Array.from(el.children).some(child => {
                const cVal = (child.value || child.textContent || child.innerText || '').trim();
                return /\[\d{2,6}\]/.test(cVal) && /[가-힣]/.test(cVal);
            });

            if (!hasBetterChild) {
                // 한글 구장명이 없고 코드만 있는 경우, 부모 요소가 구장명을 가지고 있다면 부모를 대신 추가
                if (hasCode && !/[가-힣]/.test(rawText) && el.parentElement && el.parentElement !== golfInput) {
                    const pText = (el.parentElement.value || el.parentElement.textContent || '').trim();
                    if (/[가-힣]/.test(pText) && !items.includes(el.parentElement)) {
                        items.push(el.parentElement);
                        continue;
                    }
                }
                if (!items.includes(el)) {
                    items.push(el);
                }
            }
        }
    }

    if (items.length > 0) return items;

    // C. 골프장 입력 필드 바로 아래에 위치한 컨테이너 내부 행 보조 탐색
    if (golfInput && inputRect) {
        const candidateContainers = Array.from(document.querySelectorAll('div, ul, table')).filter(container => {
            if (container.offsetHeight <= 0 || container.contains(golfInput)) return false;
            const r = container.getBoundingClientRect();
            const isUnder = (r.top >= inputRect.top - 10 && r.top <= inputRect.bottom + 260) &&
                           (Math.abs(r.left - inputRect.left) < 300);
            return isUnder;
        });

        for (const c of candidateContainers) {
            const rows = Array.from(c.querySelectorAll('input, button, li, tr, div, a, p, span')).filter(el => {
                if (el.offsetHeight <= 0) return false;
                const t = (el.value || el.textContent || '').trim();
                return t.length > 0 && t.length < 80;
            });
            if (rows.length > 0) return rows;
        }
    }

    // D. 표준 자동완성 클래스 탐색
    const standard = document.querySelectorAll('.ui-autocomplete li, .ui-menu-item, div[class*="autocomplete"] li, div[class*="suggest"] li, #golf_list li, #search_result li, #auto_complete div, .auto_list div, .auto_list li');
    const filteredStd = Array.from(standard).filter(el => el.offsetHeight > 0);
    if (filteredStd.length > 0) return filteredStd;

    return [];
}

// 2. 검색 결과 중 타겟 구장(및 세부 코스)과 가장 일치하는 항목 채점 및 선택
function pickBestGolfSuggestion(suggestions, targetGolf, rawGolf) {
    if (!suggestions || suggestions.length === 0) return null;
    if (suggestions.length === 1) return suggestions[0];

    const cleanTarget = (targetGolf || '').replace(/[\s\-_gcCC\(\)\[\]]/gi, '').toLowerCase();
    const cleanRaw = (rawGolf || '').replace(/[\s\-_gcCC\(\)\[\]]/gi, '').toLowerCase();
    const keyword = getSearchKeyword(targetGolf).toLowerCase();

    let bestItem = suggestions[0];
    let maxScore = -999;

    for (const el of suggestions) {
        const text = (el.value || el.textContent || el.innerText || '').trim();
        const cleanItem = text.replace(/\[\d+\]/g, '').replace(/[\s\-_gcCC\(\)\[\]]/gi, '').toLowerCase();

        let score = 0;

        // 원본 구장명(rawGolf) 완전 일치 또는 매핑 구장명 완전 일치
        if (cleanRaw && cleanItem === cleanRaw) score += 150;
        if (cleanTarget && cleanItem === cleanTarget) score += 120;

        // 서브코스 일치 가중치 (하늘, 오션, 클래식, 레이크 등)
        const subCourses = ['오션', '클래식', '레이크', '하늘', '동코스', '서코스', '남코스', '북코스', '마운틴', '밸리', '힐', '루비', '다이아', '사파이어', '파인', '비치', '중', '동', '서', '남', '북'];
        for (const sub of subCourses) {
            const inSource = cleanRaw.includes(sub) || cleanTarget.includes(sub);
            const inItem = cleanItem.includes(sub);
            if (inSource && inItem) score += 80;
            else if (inSource && !inItem) score -= 40;
        }

        // 키워드 포함 점수
        if (cleanTarget && cleanItem.includes(cleanTarget)) score += 40;
        if (cleanRaw && cleanItem.includes(cleanRaw)) score += 40;
        if (keyword && cleanItem.includes(keyword)) score += 30;

        // 구장코드([숫자])가 포함되어 있으면 높은 우선순위 가중치 부여
        if (/\[\d{2,6}\]/.test(text)) score += 60;

        // 글자 수 차이 감점
        score -= Math.abs(cleanItem.length - (cleanRaw.length || cleanTarget.length));

        if (score > maxScore) {
            maxScore = score;
            bestItem = el;
        }
    }

    return bestItem;
}

// 3. 자동완성 항목에 대한 정밀 마우스 클릭, 이벤트 발송 및 메인 월드 스크립트 실행
async function clickGolfSuggestion(el, targetGolf = '') {
    if (!el) return;

    try {
        el.scrollIntoView({ behavior: 'instant', block: 'center' });
    } catch(e) {}
    await sleep(60);

    const text = (el.value || el.textContent || el.innerText || '').trim();
    const codeMatch = text.match(/\[(\d+)\]/);
    const golfCode = codeMatch ? codeMatch[1] : '';
    const cleanGolfName = text.replace(/\[\d+\]/g, '').trim();

    console.log(`[골마켓] ⛳ 골프장 선택 실행: '${text}' (코드: '${golfCode}', 구장명: '${cleanGolfName}')`);

    // A. <option> 태그인 경우 상위 <select> 값 직접 변경
    if (el.tagName === 'OPTION') {
        const sel = el.closest('select');
        if (sel) {
            sel.value = el.value;
            el.selected = true;
            sel.dispatchEvent(new Event('input', { bubbles: true }));
            sel.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }

    // B. <select> 태그인 경우 해당 옵션 선택
    if (el.tagName === 'SELECT') {
        if (el.options.length > 0) {
            el.selectedIndex = 0;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }

    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const opts = { 
        bubbles: true, 
        cancelable: true, 
        view: window, 
        clientX: x, 
        clientY: y,
        button: 0,
        buttons: 1,
        which: 1,
        composed: true 
    };

    // C. Pointer 및 Mouse Event 시퀀스 발송
    try {
        el.dispatchEvent(new PointerEvent('pointerdown', opts));
    } catch(e) {}
    el.dispatchEvent(new MouseEvent('mouseenter', opts));
    el.dispatchEvent(new MouseEvent('mouseover', opts));
    el.dispatchEvent(new MouseEvent('mousemove', opts));
    el.dispatchEvent(new MouseEvent('mousedown', opts));
    try { el.focus(); } catch(e) {}
    await sleep(50);

    const upOpts = { ...opts, buttons: 0 };
    try {
        el.dispatchEvent(new PointerEvent('pointerup', upOpts));
    } catch(e) {}
    el.dispatchEvent(new MouseEvent('mouseup', upOpts));
    el.dispatchEvent(new MouseEvent('click', opts));

    // D. DOM 레벨 click() 호출
    try {
        el.click();
    } catch(e) {}

    // E. 부모 clickable 요소 처리
    const parentClickable = el.closest('[onclick], [href], [data-code], [data-id], tr, li, div, a, button');
    if (parentClickable && parentClickable !== el) {
        parentClickable.dispatchEvent(new MouseEvent('mousedown', opts));
        parentClickable.dispatchEvent(new MouseEvent('mouseup', upOpts));
        parentClickable.dispatchEvent(new MouseEvent('click', opts));
        try {
            parentClickable.click();
        } catch(e) {}
    }

    // F. 인라인 onclick 또는 href="javascript:..." 메인 월드 스크립트 실행 보장 (CSP 우회)
    const inlineOnclick = el.getAttribute('onclick') || (parentClickable && parentClickable.getAttribute('onclick'));
    const hrefAttr = el.getAttribute('href') || (parentClickable && parentClickable.getAttribute('href'));
    let scriptToRun = '';

    if (inlineOnclick) {
        scriptToRun += `try { ${inlineOnclick} } catch(e) { console.error(e); }\n`;
    }
    if (hrefAttr && hrefAttr.toLowerCase().startsWith('javascript:')) {
        const jsOnly = hrefAttr.substring(11);
        scriptToRun += `try { ${jsOnly} } catch(e) { console.error(e); }\n`;
    }

    // G. 골마켓 메인 월드 전역 골프장 선택 함수 직접 호출 및 요소 클릭 보강
    el.setAttribute('data-tee82-target', 'true');
    scriptToRun += `
        try {
            var targetEl = document.querySelector('[data-tee82-target="true"]');
            if (targetEl) {
                try { targetEl.click(); } catch(err) {}
            }
            var gCode = "${golfCode}";
            var gName = "${cleanGolfName}";
            var candidateFns = ['sel_golf', 'select_golf', 'set_golf', 'choice_golf', 'choose_golf', 'golf_select', 'put_golf'];
            for (var i = 0; i < candidateFns.length; i++) {
                var fnName = candidateFns[i];
                if (typeof window[fnName] === 'function') {
                    try { window[fnName](gName, gCode); } catch(err) {}
                    try { window[fnName](gCode, gName); } catch(err) {}
                }
            }
        } catch(e) { console.error(e); }
    `;

    try {
        const sc = document.createElement('script');
        sc.textContent = scriptToRun;
        (document.head || document.documentElement).appendChild(sc);
        sc.remove();
    } catch(e) {}

    // H. 폼 내 hidden 구장코드 및 입력값 직접 주입 (이중 안전장치)
    if (golfCode) {
        const hiddenCodeInputs = document.querySelectorAll('input[type="hidden"][name*="golf"], input[type="hidden"][name*="gf"], input[type="hidden"][id*="golf"], input[type="hidden"][id*="gf"], input[type="hidden"][name="code"], input[type="hidden"][name="b_golf"]');
        hiddenCodeInputs.forEach(inp => {
            inp.value = golfCode;
            inp.dispatchEvent(new Event('input', { bubbles: true }));
            inp.dispatchEvent(new Event('change', { bubbles: true }));
        });
    }

    const golfInput = findGolfInput();
    if (golfInput && cleanGolfName) {
        golfInput.value = cleanGolfName;
        golfInput.dispatchEvent(new Event('input', { bubbles: true }));
        golfInput.dispatchEvent(new Event('change', { bubbles: true }));
    }

    await sleep(200);
}

// 3-1. 화면 상에 골프장 추천 박스가 아직 떠 있다면 즉시 클릭하여 선택 완료하는 안전 함수
async function ensureGolfSuggestionClicked(targetGolf) {
    try {
        const suggestions = findGolfSuggestionItems(targetGolf);
        if (suggestions && suggestions.length > 0) {
            const bestPick = pickBestGolfSuggestion(suggestions, targetGolf, '');
            if (bestPick) {
                const itemText = (bestPick.value || bestPick.textContent || bestPick.innerText || '').trim();
                console.log(`[골마켓] 🎯 골프장 추천 항목('${itemText}') 자동 클릭 선택 실행!`);
                await clickGolfSuggestion(bestPick, targetGolf);
                return true;
            }
        }
    } catch(e) {
        console.error("[골마켓] ensureGolfSuggestionClicked 에러:", e);
    }
    return false;
}

// 4. 골프장 타이핑 및 자동완성 선택 메인 함수
async function typeAndSelectGolfCourse(targetGolf, rawGolf = '', stepPreset = 'human') {
    const golfInput = findGolfInput();
    if (!golfInput) {
        console.error("[골마켓] 골프장 입력 필드를 찾을 수 없습니다.");
        return false;
    }

    golfInput.focus();
    golfInput.value = '';
    golfInput.dispatchEvent(new Event('input', { bubbles: true }));
    await sleep(150);

    // 골마켓 공식 구장명으로 변환 (예: 골프존진천 -> 골프존카운티 진천 등)
    const golmarketTarget = getGolmarketGolfName(targetGolf) || getGolmarketGolfName(rawGolf) || targetGolf;
    const keyword = getSearchKeyword(golmarketTarget);
    console.log(`[골마켓] 골프장 검색 키워드: '${keyword}' (골마켓 타겟: '${golmarketTarget}', 원본: '${targetGolf}', rawGolf: '${rawGolf}')`);

    // 사람처럼 한 글자씩 타이핑 & 키보드 이벤트 발생
    for (let i = 0; i < keyword.length; i++) {
        if (shouldStopRegistration) return false;
        const char = keyword[i];
        golfInput.value += char;

        golfInput.dispatchEvent(new KeyboardEvent('keydown', { key: char, bubbles: true, cancelable: true }));
        golfInput.dispatchEvent(new KeyboardEvent('keypress', { key: char, bubbles: true, cancelable: true }));
        golfInput.dispatchEvent(new Event('input', { bubbles: true }));
        golfInput.dispatchEvent(new KeyboardEvent('keyup', { key: char, bubbles: true, cancelable: true }));

        await sleep(Math.floor(Math.random() * 40 + 35));
    }
    golfInput.dispatchEvent(new Event('change', { bubbles: true }));

    // 자동완성 드롭다운이 렌더링될 때까지 최대 2.5초간 120ms 간격으로 대기 (AJAX 지연 완벽 대응)
    let suggestions = [];
    const maxWaitMs = 2500;
    let startWait = Date.now();
    while (Date.now() - startWait < maxWaitMs) {
        if (shouldStopRegistration) return false;
        suggestions = findGolfSuggestionItems(keyword);
        if (suggestions.length > 0) break;
        await sleep(120);
    }

    // 2차 Fallback: 1차 키워드로 목록이 안 뜬 경우, 핵심 구장 키워드(진천, 화랑, 송도, 천안)로 즉시 재검색 시도
    if (suggestions.length === 0) {
        let fallbackKeyword = '';
        if (golmarketTarget.includes('진천')) fallbackKeyword = '진천';
        else if (golmarketTarget.includes('화랑')) fallbackKeyword = '화랑';
        else if (golmarketTarget.includes('송도')) fallbackKeyword = '송도';
        else if (golmarketTarget.includes('천안')) fallbackKeyword = '천안';

        if (fallbackKeyword && fallbackKeyword !== keyword) {
            console.log(`[골마켓] 골프장 2차 대체 키워드 검색 시도: '${fallbackKeyword}'`);
            golfInput.focus();
            golfInput.value = '';
            golfInput.dispatchEvent(new Event('input', { bubbles: true }));
            await sleep(60);

            for (let i = 0; i < fallbackKeyword.length; i++) {
                if (shouldStopRegistration) return false;
                const char = fallbackKeyword[i];
                golfInput.value += char;
                golfInput.dispatchEvent(new KeyboardEvent('keydown', { key: char, bubbles: true, cancelable: true }));
                golfInput.dispatchEvent(new KeyboardEvent('keypress', { key: char, bubbles: true, cancelable: true }));
                golfInput.dispatchEvent(new Event('input', { bubbles: true }));
                golfInput.dispatchEvent(new KeyboardEvent('keyup', { key: char, bubbles: true, cancelable: true }));
                await sleep(Math.floor(Math.random() * 35 + 30));
            }
            golfInput.dispatchEvent(new Event('change', { bubbles: true }));

            startWait = Date.now();
            while (Date.now() - startWait < 2000) {
                if (shouldStopRegistration) return false;
                suggestions = findGolfSuggestionItems(fallbackKeyword);
                if (suggestions.length > 0) break;
                await sleep(100);
            }
        }
    }

    if (suggestions.length > 0) {
        console.log(`[골마켓] 자동완성 검색 결과 ${suggestions.length}개 발견`);
        const bestPick = pickBestGolfSuggestion(suggestions, golmarketTarget, rawGolf);
        if (bestPick) {
            const itemText = (bestPick.value || bestPick.textContent || bestPick.innerText || '').trim();
            console.log(`[골마켓] 정확한 골프장 항목 선택: '${itemText}'`);
            await clickGolfSuggestion(bestPick, golmarketTarget);
            await sleep(250);
            return true;
        }
    } else {
        console.warn(`[골마켓] '${keyword}' 자동완성 목록이 나타나지 않음. 입력값 유지 및 Enter 처리.`);
        golfInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, which: 13, bubbles: true }));
        golfInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', keyCode: 13, which: 13, bubbles: true }));
        return true;
    }
}

// ==================== 개별 건 폼 채우기 및 제출 ====================
async function fillAndSubmitGolmarketForm(item, customMemo, stepPreset = 'human') {
    const golmarketGolf = getGolmarketGolfName(item.golf) || item.golf;
    console.log(`[골마켓] 📝 폼 입력 시작: ${golmarketGolf} (원본: ${item.golf}, ${item.date} ${item.time})`);

    // 1) 골프장 입력 및 자동완성 선택
    await typeAndSelectGolfCourse(golmarketGolf, item.rawGolf || '', stepPreset);
    if (shouldStopRegistration) return false;
    await ensureGolfSuggestionClicked(golmarketGolf);
    await sleep(getStepDelay('click', stepPreset));

    // 2) 부킹일시 - 날짜 입력
    const dateInput = findDateInput();
    if (dateInput) {
        const formattedDate = formatGolmarketDate(item.date);
        dateInput.value = formattedDate;
        dateInput.dispatchEvent(new Event('input', { bubbles: true }));
        dateInput.dispatchEvent(new Event('change', { bubbles: true }));
        console.log(`[골마켓] 날짜 입력: ${formattedDate}`);
    }
    if (shouldStopRegistration) return false;
    await sleep(getStepDelay('click', stepPreset));

    // 3) 부킹일시 - 시/분 입력 (0621, 06:21, 6:21, 621 등 모든 형식 완벽 지원)
    let targetHour = '';
    let targetMinute = '';
    if (item.time) {
        const cleanTime = String(item.time).trim().replace(/[^0-9:]/g, '');
        if (cleanTime.includes(':')) {
            const parts = cleanTime.split(':');
            targetHour = parts[0].padStart(2, '0');
            targetMinute = parts[1].padStart(2, '0');
        } else if (cleanTime.length === 4) {
            targetHour = cleanTime.substring(0, 2);
            targetMinute = cleanTime.substring(2, 4);
        } else if (cleanTime.length === 3) {
            targetHour = cleanTime.substring(0, 1).padStart(2, '0');
            targetMinute = cleanTime.substring(1, 3);
        }
    }

    if (targetHour && targetMinute) {
        const targetHourNum = parseInt(targetHour, 10);
        const targetMinNum = parseInt(targetMinute, 10);

        // 시간 select 선택
        const hourSel = findHourSelect();
        if (hourSel) {
            hourSel.focus();
            const opt = Array.from(hourSel.options).find(o => {
                const val = o.value.trim();
                const txt = o.text.trim();
                return val === targetHour || 
                       val === String(targetHourNum) || 
                       txt === targetHour || 
                       txt === String(targetHourNum) ||
                       txt.startsWith(targetHour) ||
                       txt.startsWith(String(targetHourNum));
            });
            if (opt) {
                hourSel.value = opt.value;
                hourSel.dispatchEvent(new Event('change', { bubbles: true }));
                console.log(`[골마켓] 시간(시) 선택 성공: ${opt.value}시`);
            } else {
                console.warn(`[골마켓] 시간(시) '${targetHour}' 옵션을 찾지 못함`);
            }
        }

        // 분 input 또는 select 입력
        const minEl = findMinuteElement();
        if (minEl) {
            if (minEl.tagName.toLowerCase() === 'select') {
                const opt = Array.from(minEl.options).find(o => {
                    const val = o.value.trim();
                    const txt = o.text.trim();
                    return val === targetMinute || 
                           val === String(targetMinNum) || 
                           txt === targetMinute || 
                           txt === String(targetMinNum) ||
                           txt.includes(targetMinute);
                });
                if (opt) {
                    minEl.value = opt.value;
                    minEl.dispatchEvent(new Event('change', { bubbles: true }));
                }
            } else {
                minEl.focus();
                minEl.value = targetMinute;
                minEl.dispatchEvent(new Event('input', { bubbles: true }));
                minEl.dispatchEvent(new Event('change', { bubbles: true }));
            }
            console.log(`[골마켓] 시간(분) 입력 성공: ${targetMinute}분`);
        }
    }
    if (shouldStopRegistration) return false;
    await sleep(getStepDelay('typing', stepPreset));

    // 4) 가격 및 전화문의
    const { priceInput, inquiryCheckbox } = findPriceElements();
    const { won, isInquiry } = parseFeeToWon(item.fee);

    if (isInquiry) {
        if (inquiryCheckbox) {
            inquiryCheckbox.checked = true;
            inquiryCheckbox.dispatchEvent(new Event('input', { bubbles: true }));
            inquiryCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
            console.log("[골마켓] 가격: 전화문의 체크");
        }
    } else {
        if (inquiryCheckbox && inquiryCheckbox.checked) {
            inquiryCheckbox.checked = false;
            inquiryCheckbox.dispatchEvent(new Event('input', { bubbles: true }));
            inquiryCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
        }
        if (priceInput) {
            priceInput.focus();
            priceInput.value = won;
            priceInput.dispatchEvent(new Event('input', { bubbles: true }));
            priceInput.dispatchEvent(new Event('change', { bubbles: true }));
            console.log(`[골마켓] 가격 입력: ${won}원 (원본: '${item.fee}')`);
        }
    }
    if (shouldStopRegistration) return false;
    await sleep(getStepDelay('typing', stepPreset));

    // 5) 구성 체크박스 설정 (골마켓 규정: 최고 2개, 최소 1개 체크 엄격 준수)
    // 1단계: 전화문의를 제외한 모든 체크박스 초기화 해제
    const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    allCheckboxes.forEach(chk => {
        if (chk !== inquiryCheckbox && chk.checked) {
            chk.checked = false;
            chk.dispatchEvent(new Event('input', { bubbles: true }));
            chk.dispatchEvent(new Event('change', { bubbles: true }));
        }
    });

    const toCheck = [];
    const pax = (item.sizenum || '').trim();
    const cond = (item.condition || '').trim();
    const roomType = (item.roomType || '').trim();
    const isNoCaddy = (item.cady || '').includes('노캐디');
    const isPrepaid = (item.isPrepaid === true || item.isPrepaid === 'true');
    const isTransfer = (roomType === '양도' || (item.category || '') === '양도');

    // [규칙 1] 골마켓에서 양도(부킹)인 경우: "골마켓에서 양도는 부킹 이라고 해. 양도등록을 하려면 부킹바로가기 에서 부킹등록으로 하는거고 구성은 4인 체크."
    if (isTransfer) {
        toCheck.push('4인');
        // 여유가 있을 때 선입금 / 노캐디 추가 (최대 2개 한도 내)
        if (isPrepaid && toCheck.length < 2) toCheck.push('선입금');
        if (isNoCaddy && toCheck.length < 2) toCheck.push('노캐디');
    }
    // [규칙 2] 골마켓에서 조인인 경우
    else {
        // 1순위: 노캐디 및 선입금 최우선 체크 ("노캐디에 선입금이라면 노캐디,선입금체크가 우선")
        if (isNoCaddy) toCheck.push('노캐디');
        if (isPrepaid) toCheck.push('선입금');

        // 2순위: 2개 한도가 아직 안 찬 경우 (toCheck.length < 2), 인원 및 성별/커플 조건 추가
        if (toCheck.length < 2) {
            // A. "조인인데 4인을 구하는경우 2인체크 1인체크 로 변경."
            if (pax.includes('4인') || pax.includes('4명')) {
                if (!toCheck.includes('2인') && toCheck.length < 2) toCheck.push('2인');
                if (!toCheck.includes('1인') && toCheck.length < 2) toCheck.push('1인');
            }
            // B. 1인을 구하는 경우: "인원이 1인을 구한다면 1인 체크."
            else if (pax.includes('1인') || pax.includes('1명')) {
                if (!toCheck.includes('1인')) {
                    toCheck.push('1인');
                }
            }
            // C. 2인을 구하는 경우:
            else if (pax.includes('2인') || pax.includes('2명')) {
                // "2인을 구하는데 현재인원이 여성2명이라면 2인남성 체크." (조건: 남성/남자 모집)
                if (cond.includes('남자') || cond.includes('남성')) {
                    if (!toCheck.includes('2인남성')) {
                        toCheck.push('2인남성');
                    }
                }
                // "현재인원이 남성2명이라면 2인체크,2인여성체크." (조건: 여성/여자 모집)
                else if (cond.includes('여자') || cond.includes('여성')) {
                    if (!toCheck.includes('2인') && toCheck.length < 2) toCheck.push('2인');
                    if (!toCheck.includes('2인여성') && toCheck.length < 2) toCheck.push('2인여성');
                }
                // "현재인원이 남녀라면, 2인체크,커플체크." (조건: 커플/부부 모집)
                else if (cond.includes('커플') || cond.includes('부부')) {
                    if (!toCheck.includes('2인') && toCheck.length < 2) toCheck.push('2인');
                    if (!toCheck.includes('커플') && toCheck.length < 2) toCheck.push('커플');
                }
                // 일반 2인 (무관 등)
                else {
                    if (!toCheck.includes('2인') && toCheck.length < 2) toCheck.push('2인');
                }
            }
            // D. 기타 인원 (3인 등)
            else {
                if ((cond.includes('커플') || cond.includes('부부')) && toCheck.length < 2) {
                    toCheck.push('커플');
                }
            }
        }

        // 3순위: 폴백 ("하나이상은 무조건 체크해야하고")
        // 만약 노캐디/선입금도 없고 위 조건에도 걸리지 않아 toCheck가 비어있다면, 최소 1개는 무조건 체크
        if (toCheck.length === 0) {
            if (pax.includes('4인') || pax.includes('4명')) {
                toCheck.push('2인');
                toCheck.push('1인');
            } else if (pax.includes('1인') || pax.includes('1명')) {
                toCheck.push('1인');
            } else {
                toCheck.push('2인'); // 기본 fallback 2인
            }
        }
    }

    // 4순위: "최고 2개까지만 체크할수있어" (최대 2개 엄격 보장)
    const finalChecks = toCheck.slice(0, 2);
    console.log(`[골마켓] 구성 체크박스 최종 선택 (${finalChecks.length}개, 양도여부: ${isTransfer}):`, finalChecks);

    for (const label of finalChecks) {
        const success = setCheckboxByLabel(label, true);
        if (!success) {
            console.warn(`[골마켓] 체크박스 '${label}' 요소를 찾지 못함`);
        }
    }

    if (shouldStopRegistration) return false;
    await sleep(getStepDelay('click', stepPreset));

    // 6) 추가 정보 사항 (상세 메모)
    const memoEl = findMemoTextarea();
    if (memoEl && customMemo) {
        memoEl.value = customMemo;
        memoEl.dispatchEvent(new Event('input', { bubbles: true }));
        memoEl.dispatchEvent(new Event('change', { bubbles: true }));
        console.log("[골마켓] 상세 메모 입력 완료");
    }
    if (shouldStopRegistration) return false;

    // 7) 제출 직전 골프장 추천 박스가 여전히 미선택 상태로 남아있는지 최종 확인 후 자동 클릭
    await ensureGolfSuggestionClicked(golmarketGolf);
    await sleep(getStepDelay('before_submit', stepPreset));
    if (shouldStopRegistration) return false;

    // 8) 등록하기 버튼 클릭 직전 confirm/alert 자동 통과 2차 보장 스크립트 실행
    try {
        const sc = document.createElement('script');
        sc.textContent = `
            window.confirm = function() { return true; };
            window.alert = function(msg) {
                try { window.postMessage({ type: 'TEE82_GOLMARKET_ALERT', text: String(msg) }, '*'); } catch(e){}
                return undefined;
            };
        `;
        (document.head || document.documentElement).appendChild(sc);
        sc.remove();
    } catch(e) {}

    const submitBtn = findSubmitButton();
    if (submitBtn) {
        console.log("[골마켓] 🚀 '등록하기' 버튼 클릭!");
        await humanClick(submitBtn);
        return true;
    } else {
        console.error("[골마켓] '등록하기' 버튼을 찾을 수 없습니다.");
        return false;
    }
}

// ==================== 부킹(양도) 등록 페이지 직접 이동기 ====================
async function navigateToBookingForm() {
    console.log("[골마켓] 📅 부킹(양도) 등록 폼(booking_form.php)으로 직접 이동합니다.");
    if (!window.location.href.includes('booking_form.php')) {
        window.location.href = 'https://golmarket.co.kr/booking_form.php';
    }
    return true;
}

// ==================== 골마켓 큐 처리 매니저 ====================
async function checkAndResumeQueue() {
    try {
        const res = await new Promise(r => chrome.storage.local.get(['golmarket_task'], r));
        const task = res?.golmarket_task;
        if (!task || !task.isRunning) {
            removeGolmarketHUD();
            return;
        }

        const isTransferTask = Boolean(task.isTransferMode || task.mode === 'transfer' || (task.items && task.items.some(it => it.roomType === '양도')));
        const modeTitle = isTransferTask ? '📅 골마켓 부킹(양도) 등록 진행 중' : '🛒 골마켓 조인 등록 진행 중';
        const currentUrl = window.location.href;
        console.log(`[골마켓 매니저] 현재 페이지: ${currentUrl}, 모드: ${isTransferTask ? '부킹(양도)' : '조인'}, 큐 상태: [${task.currentIndex + 1}/${task.items.length}]`);

        // 온스크린 진행 상황 HUD 즉각 표시 및 갱신
        updateGolmarketHUD({
            title: modeTitle,
            desc: `[${task.currentIndex + 1}/${task.items.length}] ${task.items[task.currentIndex]?.golf} 준비 중...`,
            current: task.currentIndex,
            total: task.items.length
        });

        // 등록 폼 판별: 조인 폼(join_form.php) 또는 부킹 폼(booking_form 등) 또는 DOM 골프장 입력 필드 존재 여부
        const isFormPage = currentUrl.includes('join_form.php') || 
                           currentUrl.includes('booking_form') || 
                           currentUrl.includes('book_form') || 
                           currentUrl.includes('booking_write') || 
                           Boolean(findGolfInput() && (findDateInput() || findHourSelect()) && findSubmitButton());

        // 목록/완료 페이지 판별
        const isListPage = currentUrl.includes('join_list.php') || 
                           currentUrl.includes('join_view.php') || 
                           currentUrl.includes('booking_list') || 
                           currentUrl.includes('book_list') || 
                           currentUrl.includes('booking_view');

        // A. 목록 페이지에 도착한 경우 -> 이전 항목 제출 성공 후 리다이렉트된 상황!
        if (isListPage) {
            const finishedItem = task.items[task.currentIndex];
            console.log(`✅ [골마켓] [${task.currentIndex + 1}/${task.items.length}] ${finishedItem?.golf} 등록 성공 확인!`);

            // 등록 성공 영구 기록
            try {
                const compRes = await new Promise(r => chrome.storage.local.get(['completedItems'], r));
                const compList = (compRes && Array.isArray(compRes.completedItems)) ? compRes.completedItems : [];
                compList.push({ regId: finishedItem.regId, date: finishedItem.date, golf: finishedItem.golf, time: finishedItem.time });
                await new Promise(r => chrome.storage.local.set({ completedItems: compList }, r));
            } catch(e) {}

            chrome.runtime.sendMessage({
                type: 'ITEM_REGISTER_SUCCESS',
                regId: finishedItem.regId,
                item: finishedItem,
                current: task.currentIndex + 1,
                total: task.items.length
            });

            // 다음 건이 남아있는지 확인
            const nextIdx = task.currentIndex + 1;
            if (nextIdx >= task.items.length) {
                console.log("🎉 [골마켓] 모든 항목 조인/부킹 등록 완료!");
                updateGolmarketHUD({
                    title: modeTitle,
                    isCompleted: true,
                    total: task.items.length
                });
                await new Promise(r => chrome.storage.local.set({
                    golmarket_task: null,
                    isRegistrationRunning: false
                }, r));
                chrome.runtime.sendMessage({ type: 'REGISTER_COMPLETED', total: task.items.length });
                return;
            }

            // 다음 건 준비 및 쿨다운 대기
            task.currentIndex = nextIdx;
            task.status = 'pending';
            await new Promise(r => chrome.storage.local.set({ golmarket_task: task }, r));

            const cooldownMs = getCooldownDelay(task.delayPreset || 'safe');
            const cooldownSec = (cooldownMs / 1000).toFixed(1);
            console.log(`⏳ 다음 건 진행 전 사람처럼 ${cooldownSec}초 대기...`);

            updateGolmarketHUD({
                title: modeTitle,
                desc: `⏳ 사람처럼 대기 중... [${task.items[nextIdx]?.golf}] 준비 (${cooldownSec}초 지연)`,
                current: nextIdx,
                total: task.items.length
            });

            chrome.runtime.sendMessage({
                type: 'REGISTER_WAITING',
                current: nextIdx,
                total: task.items.length,
                waitSec: cooldownSec,
                nextGolf: task.items[nextIdx]?.golf || ''
            });

            let leftSec = parseFloat(cooldownSec);
            const countdownTimer = setInterval(() => {
                leftSec = Math.max(0, leftSec - 0.4);
                const descEl = document.getElementById('tee82_hud_desc');
                if (descEl && !shouldStopRegistration) {
                    descEl.innerText = `⏳ 사람처럼 대기 중... [${task.items[nextIdx]?.golf}] 준비 (${leftSec.toFixed(1)}초)`;
                }
            }, 400);

            await sleep(cooldownMs);
            clearInterval(countdownTimer);
            if (shouldStopRegistration) return;

            // 다음 건 이동: 양도(부킹)이면 booking_form.php, 조인이면 join_form.php 이동
            if (isTransferTask) {
                window.location.href = 'https://golmarket.co.kr/booking_form.php';
            } else {
                window.location.href = 'https://www.golmarket.co.kr/join_form.php';
            }
            return;
        }

        // B. 등록 폼(조인 폼 또는 부킹 폼)인 경우
        if (isFormPage) {
            // 부킹 폼인 경우 URL 기억 및 캐시 저장 (다음 건 이동 시 직접 재사용)
            if (isTransferTask && !task.bookingFormUrl) {
                task.bookingFormUrl = window.location.href;
                try {
                    await new Promise(r => chrome.storage.local.set({
                        golmarket_task: task,
                        cachedGolmarketBookingUrl: window.location.href
                    }, r));
                } catch(e) {}
            }

            // 만약 task.status가 'submitting' 상태로 다시 폼에 온 경우 (PHP가 같은 페이지로 리로드시킨 경우)
            if (task.status === 'submitting') {
                const finishedItem = task.items[task.currentIndex];
                console.log(`✅ [골마켓 리로드] [${task.currentIndex + 1}/${task.items.length}] ${finishedItem?.golf} 등록 성공 확인!`);

                try {
                    const compRes = await new Promise(r => chrome.storage.local.get(['completedItems'], r));
                    const compList = (compRes && Array.isArray(compRes.completedItems)) ? compRes.completedItems : [];
                    compList.push({ regId: finishedItem.regId, date: finishedItem.date, golf: finishedItem.golf, time: finishedItem.time });
                    await new Promise(r => chrome.storage.local.set({ completedItems: compList }, r));
                } catch(e) {}

                chrome.runtime.sendMessage({
                    type: 'ITEM_REGISTER_SUCCESS',
                    regId: finishedItem.regId,
                    item: finishedItem,
                    current: task.currentIndex + 1,
                    total: task.items.length
                });

                const nextIdx = task.currentIndex + 1;
                if (nextIdx >= task.items.length) {
                    console.log("🎉 [골마켓] 모든 항목 조인/부킹 등록 완료!");
                    updateGolmarketHUD({
                        title: modeTitle,
                        isCompleted: true,
                        total: task.items.length
                    });
                    await new Promise(r => chrome.storage.local.set({
                        golmarket_task: null,
                        isRegistrationRunning: false
                    }, r));
                    chrome.runtime.sendMessage({ type: 'REGISTER_COMPLETED', total: task.items.length });
                    return;
                }

                task.currentIndex = nextIdx;
                task.status = 'pending';
                await new Promise(r => chrome.storage.local.set({ golmarket_task: task }, r));

                const cooldownMs = getCooldownDelay(task.delayPreset || 'safe');
                const cooldownSec = (cooldownMs / 1000).toFixed(1);
                updateGolmarketHUD({
                    title: modeTitle,
                    desc: `⏳ 사람처럼 대기 중... [${task.items[nextIdx]?.golf}] 준비 (${cooldownSec}초 지연)`,
                    current: nextIdx,
                    total: task.items.length
                });

                let leftSec = parseFloat(cooldownSec);
                const countdownTimer = setInterval(() => {
                    leftSec = Math.max(0, leftSec - 0.4);
                    const descEl = document.getElementById('tee82_hud_desc');
                    if (descEl && !shouldStopRegistration) {
                        descEl.innerText = `⏳ 사람처럼 대기 중... [${task.items[nextIdx]?.golf}] 준비 (${leftSec.toFixed(1)}초)`;
                    }
                }, 400);

                await sleep(cooldownMs);
                clearInterval(countdownTimer);
                if (shouldStopRegistration) return;
            }

            // 현재 순번의 항목 등록 실행
            const curItem = task.items[task.currentIndex];
            if (!curItem) return;

            isRegistrationRunning = true;

            updateGolmarketHUD({
                title: modeTitle,
                desc: `[${task.currentIndex + 1}/${task.items.length}] ${curItem.golf} (${curItem.date} ${curItem.time}) 등록 진행 중...`,
                current: task.currentIndex + 1,
                total: task.items.length
            });

            chrome.runtime.sendMessage({
                type: 'REGISTER_PROGRESS',
                current: task.currentIndex + 1,
                total: task.items.length,
                golf: curItem.golf,
                date: curItem.date,
                time: curItem.time
            });

            // 상태를 submitting으로 갱신
            task.status = 'submitting';
            await new Promise(r => chrome.storage.local.set({ golmarket_task: task }, r));

            const success = await fillAndSubmitGolmarketForm(curItem, task.memo, task.stepPreset || 'human');

            if (success) {
                // 제출 후 페이지가 바로 리로드되지 않는 경우(AJAX 방식)를 대비한 백업 핸들러
                setTimeout(async () => {
                    if (shouldStopRegistration) return;
                    const checkRes = await new Promise(r => chrome.storage.local.get(['golmarket_task'], r));
                    if (checkRes?.golmarket_task?.status === 'submitting') {
                        console.log("[골마켓] AJAX 제출 감지: 다음 건으로 이동...");
                        if (isTransferTask) {
                            window.location.href = 'https://golmarket.co.kr/booking_form.php';
                        } else {
                            window.location.href = 'https://www.golmarket.co.kr/join_list.php';
                        }
                    }
                }, 3500);
            }
        } else {
            // C. 폼도 아니고 리스트 페이지도 아닌 일반 페이지(예: 메인화면)
            if (isTransferTask) {
                console.log("[골마켓] 부킹 모드 진입: booking_form.php로 직접 이동");
                window.location.href = 'https://golmarket.co.kr/booking_form.php';
            } else {
                console.log("[골마켓] 조인 모드 진입: join_form.php로 자동 이동");
                window.location.href = 'https://www.golmarket.co.kr/join_form.php';
            }
        }
    } catch(err) {
        console.error("[골마켓 큐 처리 에러]:", err);
    }
}

// 9. 확장프로그램 메시지 수신 리스너
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'START_GOLMARKET_REGISTRATION') {
        shouldStopRegistration = false;
        isRegistrationRunning = true;

        const isTransferMode = Boolean(request.isTransferMode || request.mode === 'transfer' || (request.items && request.items.some(it => it.roomType === '양도')));

        updateGolmarketHUD({
            title: isTransferMode ? '📅 골마켓 부킹(양도) 등록 진행 중' : '🛒 골마켓 조인 등록 진행 중',
            desc: `[1/${request.items.length}] ${request.items[0]?.golf} 등록 준비 중...`,
            current: 1,
            total: request.items.length
        });

        const task = {
            isRunning: true,
            platform: 'golmarket',
            mode: isTransferMode ? 'transfer' : 'join',
            isTransferMode: isTransferMode,
            items: request.items,
            currentIndex: 0,
            totalCount: request.items.length,
            memo: request.memo,
            delayPreset: request.delayPreset || 'safe',
            stepPreset: request.stepPreset || 'human',
            status: 'pending',
            startedAt: Date.now()
        };

        chrome.storage.local.set({
            golmarket_task: task,
            isRegistrationRunning: true
        }, () => {
            sendResponse({ status: 'started' });
            checkAndResumeQueue();
        });
        return true;
    } else if (request.action === 'STOP_REGISTRATION') {
        shouldStopRegistration = true;
        isRegistrationRunning = false;
        updateGolmarketHUD({
            desc: '🛑 사용자에 의해 자동 등록이 중단되었습니다.',
            isStopped: true
        });
        chrome.storage.local.set({
            golmarket_task: null,
            isRegistrationRunning: false
        }, () => {
            sendResponse({ status: 'stopped' });
            chrome.runtime.sendMessage({ type: 'REGISTER_STOPPED' });
        });
        return true;
    } else if (request.action === 'CHECK_STATUS') {
        sendResponse({ isRunning: isRegistrationRunning });
        return true;
    }
});

// 페이지 로드 즉시 큐 확인 및 자동 재개
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(checkAndResumeQueue, 400);
    });
} else {
    setTimeout(checkAndResumeQueue, 400);
}
