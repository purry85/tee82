/**
 * GolfTee82 (Tee82) 확장프로그램 Background Service Worker
 * GolfTee82 투명 엠블럼 아이콘(icon.svg) 동적 렌더링 엔진 탑재
 */

// 툴바 아이콘 동적 생성 및 적용 엔진 (icon.svg 투명 엠블럼 기준)
async function applyToolbarIcon() {
    if (!chrome.action || !chrome.action.setIcon) return;

    try {
        const sizes = [16, 32, 48, 128];
        const imageDataMap = {};

        for (const size of sizes) {
            imageDataMap[size] = renderGolfTee82Icon(size);
        }

        await chrome.action.setIcon({ imageData: imageDataMap });
        console.log("[Tee82] 툴바 아이콘(icon.svg 투명 엠블럼)이 성공적으로 적용되었습니다.");
    } catch (err) {
        console.error("[Tee82] 툴바 아이콘 적용 실패:", err);
    }
}

// icon.svg 정밀 벡터 렌더러 (투명 배경 + 딥다크그린 골프공/딤플/티 + 골드 스파이크 팁)
function renderGolfTee82Icon(size) {
    const canvas = new OffscreenCanvas(size, size);
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, size, size);

    const scale = size / 128;
    ctx.save();
    ctx.translate(0, 2 * scale);

    const darkGreen = '#13392E';
    const gold = '#C78B1A';

    // 1. 골프공 외곽 링 (stroke width 5.5, radius 33)
    ctx.beginPath();
    ctx.arc(64 * scale, 46 * scale, 33 * scale, 0, Math.PI * 2);
    ctx.lineWidth = Math.max(1.5, 5.5 * scale);
    ctx.strokeStyle = darkGreen;
    ctx.stroke();

    // 2. 골프공 딤플 (Dimples: 4행 19개 점)
    const dimples = [
        // 1행 (5개)
        [47, 40, 2.4], [55.5, 40, 2.4], [64, 40, 2.4], [72.5, 40, 2.4], [81, 40, 2.4],
        // 2행 (6개)
        [41.5, 48.5, 2.4], [50.5, 48.5, 2.4], [59.5, 48.5, 2.4], [68.5, 48.5, 2.4], [77.5, 48.5, 2.4], [86.5, 48.5, 2.4],
        // 3행 (5개)
        [46, 57, 2.4], [55, 57, 2.4], [64, 57, 2.4], [73, 57, 2.4], [82, 57, 2.4],
        // 4행 (3개)
        [55.5, 64.5, 2.2], [64, 65.5, 2.2], [72.5, 64.5, 2.2]
    ];

    ctx.fillStyle = darkGreen;
    const minDimpleR = size <= 16 ? 0.75 : (size <= 32 ? 1.0 : 1.5);
    for (const d of dimples) {
        ctx.beginPath();
        const r = Math.max(minDimpleR, d[2] * scale);
        ctx.arc(d[0] * scale, d[1] * scale, r, 0, Math.PI * 2);
        ctx.fill();
    }

    // 3. 골프 티 바디 (Tee Cup & Stem)
    // SVG: M 33 55 C 34 68, 45 78, 64 78 C 83 78, 94 68, 95 55 C 93 74, 79 81, 68 82 L 68 94 L 60 94 L 60 82 C 49 81, 35 74, 33 55 Z
    ctx.beginPath();
    ctx.moveTo(33 * scale, 55 * scale);
    ctx.bezierCurveTo(34 * scale, 68 * scale, 45 * scale, 78 * scale, 64 * scale, 78 * scale);
    ctx.bezierCurveTo(83 * scale, 78 * scale, 94 * scale, 68 * scale, 95 * scale, 55 * scale);
    ctx.bezierCurveTo(93 * scale, 74 * scale, 79 * scale, 81 * scale, 68 * scale, 82 * scale);
    ctx.lineTo(68 * scale, 94 * scale);
    ctx.lineTo(60 * scale, 94 * scale);
    ctx.lineTo(60 * scale, 82 * scale);
    ctx.bezierCurveTo(49 * scale, 81 * scale, 35 * scale, 74 * scale, 33 * scale, 55 * scale);
    ctx.closePath();
    ctx.fillStyle = darkGreen;
    ctx.fill();

    // 4. 하단 골드 티 팁 (Golden Spike Tip)
    // SVG: polygon points="59.5,98 68.5,98 64,113"
    ctx.beginPath();
    ctx.moveTo(59.5 * scale, 98 * scale);
    ctx.lineTo(68.5 * scale, 98 * scale);
    ctx.lineTo(64 * scale, 113 * scale);
    ctx.closePath();
    ctx.fillStyle = gold;
    ctx.fill();

    ctx.restore();
    return ctx.getImageData(0, 0, size, size);
}

// 확장프로그램 설치/업데이트 시 아이콘 적용
chrome.runtime.onInstalled.addListener(() => {
    console.log("골프몬 변환기 확장프로그램 설치 완료");
    applyToolbarIcon();
});

// 브라우저 실행 시 아이콘 적용
chrome.runtime.onStartup.addListener(() => {
    applyToolbarIcon();
});

// 서비스 워커 로드 시 즉각 실행
applyToolbarIcon();

// 팝업에서 사이드패널 열기 요청 수신 처리
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'OPEN_SIDE_PANEL') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs && tabs[0] && chrome.sidePanel) {
                chrome.sidePanel.open({ windowId: tabs[0].windowId }).then(() => {
                    sendResponse({ success: true });
                }).catch((err) => {
                    console.error("사이드패널 열기 실패:", err);
                    sendResponse({ success: false, error: err.message });
                });
            }
        });
        return true;
    }
});
