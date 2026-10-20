/**
 * 골프몬(golfmon.net) 조인 자동 등록 Content Script
 * 오토마(Automa) 매크로 워크플로우를 100% 동일하게 이식 및 강화
 */

var isRegistrationRunning = false;
var shouldStopRegistration = false;

function sleep(ms) {
    if (!isRegistrationRunning) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
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

// 인간적 미세 불규칙 지연 (단계별 사람 반응 속도 흉내 및 커스텀 조절)
// 3합 가우시안(정규분포 근사) 알고리즘으로 기계적이지 않은 유기적인 인간 반응 속도 재현
function getStepDelay(actionType = 'normal', stepPreset = 'human') {
    let minMs = 380;
    let maxMs = 1050;

    if (stepPreset === 'slow') { // 🐢 신중한 사람 (0.8 ~ 1.8초 여유)
        minMs = 800;
        maxMs = 1800;
    } else if (stepPreset === 'fast') { // ⚡ 빠른 손 (0.2 ~ 0.5초 신속)
        minMs = 200;
        maxMs = 500;
    } else if (stepPreset === 'turbo') { // 🚀 초고속 (0.08 ~ 0.2초 즉시)
        minMs = 80;
        maxMs = 200;
    } else { // 👤 human 기본 사람 리듬 (0.4 ~ 1.1초 불규칙)
        minMs = 380;
        maxMs = 1050;
    }

    // 단계별 사람의 실제 인지/조작 특성 가중치
    if (actionType === 'browse_dropdown' || actionType === 'select_golf') {
        // 골프장 목록 눈으로 훑기 & 스크롤 탐색 시간
        minMs = Math.round(minMs * 1.3);
        maxMs = Math.round(maxMs * 1.45);
    } else if (actionType === 'calendar') {
        // 달력 날짜 눈으로 확인하는 시간
        minMs = Math.round(minMs * 1.15);
        maxMs = Math.round(maxMs * 1.25);
    } else if (actionType === 'typing') {
        // 숫자/시간/그린피 타이핑 후 확인 시간
        minMs = Math.round(minMs * 1.05);
        maxMs = Math.round(maxMs * 1.15);
    } else if (actionType === 'before_submit') {
        // '등록하기' 버튼 누르기 전 폼 전체를 한번 훑어보는 인간적 멈춤
        minMs = Math.round(minMs * 1.35);
        maxMs = Math.round(maxMs * 1.6);
    } else if (actionType === 'quick_click') {
        // 캐디/인원/조건 등 단순 버튼 탭
        minMs = Math.round(minMs * 0.85);
        maxMs = Math.round(maxMs * 0.95);
    }

    // 3합 균등 가우시안 근사 (중앙값 집중, 자연스러운 사람 반응 지터)
    const rand = (Math.random() + Math.random() + Math.random()) / 3;
    return Math.floor(rand * (maxMs - minMs) + minMs);
}

function getRandomDelay(min = 280, max = 650) {
    return getStepDelay('normal', 'human');
}

// 등록 건 사이의 사람 같은 불규칙 쿨다운 시간 계산
function getCooldownDelay(preset = 'safe') {
    let minMs = 2200, maxMs = 4800;
    if (preset === 'stealth') {
        minMs = 3500; maxMs = 7500;
    } else if (preset === 'fast') {
        minMs = 1200; maxMs = 2600;
    } else if (preset === 'turbo') {
        minMs = 600; maxMs = 1200;
    } else {
        minMs = 2200; maxMs = 4800; // safe 보통 안심 (기본)
    }
    const rand = (Math.random() + Math.random()) / 2;
    return Math.floor(rand * (maxMs - minMs) + minMs);
}

// 사람 손가락 터치/마우스 클릭 시뮬레이션 (랜덤 미세 좌표 지터 + 불규칙 누름 시간)
async function humanClick(el, customX = null, customY = null) {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const jitterX = (Math.random() - 0.5) * (rect.width * 0.3);
    const jitterY = (Math.random() - 0.5) * (rect.height * 0.3);
    const x = customX !== null ? customX : (rect.left + rect.width / 2 + jitterX);
    const y = customY !== null ? customY : (rect.top + rect.height / 2 + jitterY);

    const opts = { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y };

    el.dispatchEvent(new MouseEvent('mouseenter', opts));
    el.dispatchEvent(new MouseEvent('mouseover', opts));
    await sleep(Math.floor(Math.random() * 40 + 30));

    el.dispatchEvent(new MouseEvent('mousedown', opts));
    await sleep(Math.floor(Math.random() * 90 + 70)); // 사람이 누르는 시간 70~160ms
    el.dispatchEvent(new MouseEvent('mouseup', opts));
    el.dispatchEvent(new MouseEvent('click', opts));
}

// 메인 부킹프라자 화면의 플로팅 '등록 · 내글보기' 버튼 탐색 헬퍼
function findRegisterMenuButton() {
    const targets = Array.from(document.querySelectorAll('button, .q-btn, [role="button"], div, span, a'))
        .filter(el => {
            if (el.offsetHeight <= 0 || el.offsetWidth <= 0) return false;
            const text = (el.innerText || el.textContent || '').trim().replace(/\s/g, '');
            const rect = el.getBoundingClientRect();
            return (text.includes('등록') && text.includes('내글보기')) && rect.height < 120 && rect.height > 10;
        });
    if (targets.length === 0) return null;
    targets.sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length);
    return targets[0].closest('button, .q-btn, [role="button"], .cursor-pointer') || targets[0];
}

// 하단 네비게이션 바의 '부킹' 탭 탐색 및 클릭 헬퍼 (홈 화면 이탈 시 부킹프라자로 자동 복귀)
async function clickBottomBookingTab(maxAttempts = 10) {
    console.log("[매크로] 하단 '부킹' 탭 탐색 및 클릭 시도...");
    const winHeight = window.innerHeight || document.documentElement.clientHeight || 800;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        if (shouldStopRegistration) return false;

        // 1. Quasar q-tab 및 footer 내부에서 '부킹' 탐색
        const tabCandidates = Array.from(document.querySelectorAll('.q-footer .q-tab, footer .q-tab, .q-tabs .q-tab, [role="tab"], .q-tab, .q-footer button, footer button, .q-footer a, footer a, .q-footer div, footer div, nav div, nav button, nav a'))
            .filter(el => {
                if (el.offsetHeight <= 0 || el.offsetWidth <= 0) return false;
                const r = el.getBoundingClientRect();
                if (r.top < winHeight - 140) return false; // 화면 하단부
                const txt = (el.innerText || el.textContent || '').trim().replace(/\s+/g, '');
                return txt === '부킹' || (txt.includes('부킹') && !txt.includes('검색') && !txt.includes('프라자') && !txt.includes('내글보기') && txt.length <= 4);
            });

        // 2. 화면 전체 하단 140px 이내의 모든 요소 중 '부킹' 탐색 (범용 fallback)
        let matched = tabCandidates;
        if (matched.length === 0) {
            matched = Array.from(document.querySelectorAll('*'))
                .filter(el => {
                    if (el.offsetHeight <= 0 || el.offsetWidth <= 0) return false;
                    const r = el.getBoundingClientRect();
                    if (r.top < winHeight - 140) return false;
                    const txt = (el.innerText || el.textContent || '').trim().replace(/\s+/g, '');
                    return txt === '부킹';
                });
        }

        if (matched.length > 0) {
            // 가장 면적이 작은 요소(텍스트 리프) 우선
            matched.sort((a, b) => (a.offsetWidth * a.offsetHeight) - (b.offsetWidth * b.offsetHeight));
            const leaf = matched[0];
            const clickTarget = leaf.closest('.q-tab, [role="tab"], button, .q-btn, a, .cursor-pointer') || leaf;

            console.log(`[매크로] 하단 '부킹' 탭 발견 (${clickTarget.tagName}, class=${clickTarget.className}) -> 클릭 실행`);
            clickTarget.style.setProperty('outline', '4px solid #00e676', 'important');
            await sleep(80);

            const rect = clickTarget.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const opts = { clientX: cx, clientY: cy, bubbles: true, cancelable: true, view: window };

            const topEl = document.elementFromPoint(cx, cy) || clickTarget;
            try {
                topEl.dispatchEvent(new PointerEvent('pointerdown', opts));
                topEl.dispatchEvent(new MouseEvent('mousedown', opts));
            } catch(e) {}
            await sleep(60);
            try {
                topEl.dispatchEvent(new PointerEvent('pointerup', opts));
                topEl.dispatchEvent(new MouseEvent('mouseup', opts));
                topEl.dispatchEvent(new MouseEvent('click', opts));
            } catch(e) {}
            try { clickTarget.click(); } catch(e) {}
            try { topEl.click(); } catch(e) {}
            await humanClick(clickTarget);

            // 클릭 후 '등록 · 내글보기' 버튼 또는 부킹 화면이 뜰 때까지 대기
            for (let w = 0; w < 30; w++) {
                await sleep(150);
                if (shouldStopRegistration) return true;
                const regBtn = findRegisterMenuButton();
                if (regBtn && regBtn.offsetHeight > 0) {
                    console.log("[매크로] 하단 '부킹' 클릭 후 부킹프라자('등록 · 내글보기') 화면 복귀 확인 완료!");
                    await sleep(250);
                    return true;
                }
            }
            return true;
        }

        await sleep(250);
    }

    console.warn("[매크로] 하단 '부킹' 탭을 찾지 못함");
    return false;
}

// 홈 화면 또는 부킹프라자 이탈 여부 판별 헬퍼
function isHomeScreenOrNeedsBooking() {
    // 1. 이미 등록 폼이나 팝업 다이얼로그가 열려있다면 복귀 불필요
    if (document.querySelector('.q-dialog:not(.hidden), [role="dialog"]')) {
        return false;
    }
    // 2. 이미 화면에 '등록 · 내글보기' 버튼이 있다면 부킹프라자 화면이므로 복귀 불필요
    const regBtn = findRegisterMenuButton();
    if (regBtn && regBtn.offsetHeight > 0) {
        return false;
    }
    // 3. '등록상품내역' 화면이면 제외
    if (typeof isRegisteredListPage === 'function' && isRegisteredListPage()) {
        return false;
    }

    // 4. 홈 화면 특징: '골프몬 부킹 검색', '국내투어', '해외투어' 등이 있고 '등록 · 내글보기'가 없음
    const bodyTxt = (document.body ? document.body.innerText || '' : '').replace(/\s+/g, '');
    if (bodyTxt.includes('골프몬부킹검색') || bodyTxt.includes('국내투어') || bodyTxt.includes('해외투어') || bodyTxt.includes('개인정보유출')) {
        return true;
    }

    // 5. '등록 · 내글보기' 버튼이 없고 등록 다이얼로그도 없다면 부킹 탭 복귀 필요
    return true;
}

/// 1. 등록/내글보기 버튼 클릭 (재시도 및 대기 포함)
async function clickRegisterMenu(maxAttempts = 15) {
    console.log("[매크로] '등록 · 내글보기' 버튼 탐색 중...");
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        if (shouldStopRegistration) return false;

        const targets = Array.from(document.querySelectorAll('*')).filter(el => {
            if (el.offsetHeight <= 0 || el.offsetWidth <= 0) return false;
            const text = (el.innerText || el.textContent || '').trim().replace(/\s/g, '');
            const rect = el.getBoundingClientRect();
            return text.includes('등록') && text.includes('내글보기') && rect.height < 100 && rect.height > 10;
        });

        if (targets.length > 0) {
            const realBtn = targets.sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length)[0];
            const clickTarget = realBtn.closest('button, .q-btn, [role="button"], .cursor-pointer') || realBtn;

            clickTarget.style.setProperty('outline', '5px solid #00e676', 'important');
            await sleep(100);

            const rect = clickTarget.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const opts = { clientX: cx, clientY: cy, bubbles: true, cancelable: true, view: window };

            try {
                clickTarget.dispatchEvent(new PointerEvent('pointerdown', opts));
                clickTarget.dispatchEvent(new MouseEvent('mousedown', opts));
            } catch(e) {}
            await sleep(80);
            try {
                clickTarget.dispatchEvent(new PointerEvent('pointerup', opts));
                clickTarget.dispatchEvent(new MouseEvent('mouseup', opts));
                clickTarget.dispatchEvent(new MouseEvent('click', opts));
            } catch(e) {}
            try { clickTarget.click(); } catch(e) {}
            await humanClick(clickTarget);

            console.log("[매크로] '등록 · 내글보기' 클릭 완료");
            return true;
        }

        // 3회 시도 후에도 '등록 · 내글보기'를 못 찾았고, 홈 화면 등으로 이탈한 경우 하단 '부킹' 탭 클릭 시도
        if (attempt === 3 && isHomeScreenOrNeedsBooking()) {
            console.log("[매크로] '등록 · 내글보기' 미발견 -> 홈 화면 감지됨. 하단 '부킹' 탭 클릭 시도...");
            await clickBottomBookingTab(5);
        }

        await sleep(250);
    }
    console.warn("[매크로] '등록 · 내글보기' 버튼을 찾지 못함 (이미 등록 폼일 수 있음)");
    return false;
}

// 2. '조인 등록' 메뉴 클릭 (재시도 및 대기 포함)
async function clickJoinRegisterMenu(maxAttempts = 15) {
    console.log("[매크로] 2단계: '조인 등록' 메뉴 탐색 중...");
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        if (shouldStopRegistration) return false;

        const menuItems = Array.from(document.querySelectorAll('div, span, li, button')).filter(el => {
            return el.textContent.trim() === '조인 등록' && el.getBoundingClientRect().height > 0;
        });

        const transferBtn = menuItems.sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length)[0];

        if (transferBtn) {
            transferBtn.style.setProperty('outline', '5px solid #ff9800', 'important');
            const opts = { bubbles: true, cancelable: true, view: window };
            transferBtn.dispatchEvent(new MouseEvent('mousedown', opts));
            await sleep(150);
            transferBtn.dispatchEvent(new MouseEvent('mouseup', opts));
            transferBtn.click();
            console.log("[매크로] '조인 등록' 클릭 완료");
            return true;
        }
        await sleep(200);
    }
    console.warn("[매크로] '조인 등록' 버튼을 찾지 못함 (이미 등록 폼일 수 있음)");
    return false;
}

// 2-B. '양도 등록' 메뉴 클릭 (재시도 및 대기 포함)
async function clickTransferRegisterMenu(maxAttempts = 15) {
    console.log("[매크로] 2단계: '양도 등록' 메뉴 탐색 중...");
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        if (shouldStopRegistration) return false;

        const menuItems = Array.from(document.querySelectorAll('div, span, li, button')).filter(el => {
            return el.textContent.trim() === '양도 등록' && el.getBoundingClientRect().height > 0;
        });

        const transferBtn = menuItems.sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length)[0];

        if (transferBtn) {
            transferBtn.style.setProperty('outline', '5px solid #ff9800', 'important');
            const opts = { bubbles: true, cancelable: true, view: window };
            transferBtn.dispatchEvent(new MouseEvent('mousedown', opts));
            await sleep(150);
            transferBtn.dispatchEvent(new MouseEvent('mouseup', opts));
            transferBtn.click();
            console.log("[매크로] '양도 등록' 클릭 완료");
            return true;
        }
        await sleep(200);
    }
    console.warn("[매크로] '양도 등록' 버튼을 찾지 못함 (이미 등록 폼일 수 있음)");
    return false;
}

// 3. 지역 선택 (재시도 및 대기 포함)
async function selectRegion(targetRegion, maxAttempts = 15) {
    if (!targetRegion) return false;
    console.log(`[매크로] 3단계: 지역(${targetRegion}) 선택 중...`);
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        if (shouldStopRegistration) return false;

        const allElements = Array.from(document.querySelectorAll('label, span, button, div.q-btn__content'));
        const regionBtn = allElements.find(el => 
            el.textContent.trim().includes(targetRegion) && 
            el.offsetHeight > 0
        );

        if (regionBtn) {
            const clickTarget = regionBtn.closest('button, .q-btn, .q-item') || regionBtn;
            clickTarget.style.setProperty('outline', '4px solid cyan', 'important');
            const opts = { bubbles: true, cancelable: true, view: window };
            clickTarget.dispatchEvent(new MouseEvent('mousedown', opts));
            clickTarget.dispatchEvent(new MouseEvent('mouseup', opts));
            clickTarget.click();
            console.log(`[매크로] 지역(${targetRegion}) 선택 완료`);
            return true;
        }
        await sleep(250);
    }
    console.error(`[매크로] 지역(${targetRegion}) 버튼을 찾지 못함`);
    return false;
}

// 4. '골프장을 선택하세요' 클릭하여 목록 호출 (재시도 및 대기 포함)
async function openGolfDropdown(maxAttempts = 15) {
    console.log("[매크로] 4단계: '골프장을 선택하세요' 드롭다운 호출 중...");
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        if (shouldStopRegistration) return false;

        // 다이얼로그가 이미 열려있는지 확인 (중복 클릭 방지)
        const existingDialog = document.querySelector('.q-dialog:not(.hidden), [role="dialog"]');
        if (existingDialog && existingDialog.offsetHeight > 0) {
            console.log("[매크로] 골프장 다이얼로그가 이미 열려있음");
            return true;
        }

        const titleElements = Array.from(document.querySelectorAll('div, span, label'))
            .filter(el => el.textContent.trim() === '골프장을 선택하세요' && el.offsetHeight > 0);
        
        const standard = titleElements[0];
        if (standard) {
            const rect = standard.getBoundingClientRect();
            const x = rect.left + 20;
            const y = rect.bottom + 25;
            const realInput = document.elementFromPoint(x, y);

            if (realInput) {
                realInput.style.setProperty('border', '4px solid #ff00ff', 'important');
                realInput.focus();
                realInput.click();
                ['mousedown', 'mouseup', 'click'].forEach(type => {
                    realInput.dispatchEvent(new MouseEvent(type, { bubbles: true, clientX: x, clientY: y }));
                });
                document.execCommand('insertText', false, ' ');
                realInput.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', bubbles: true}));
                console.log("[매크로] 골프장 드롭다운 열기 성공");
                return true;
            }
        }
        await sleep(250);
    }
    console.error("[매크로] '골프장을 선택하세요' 요소를 찾지 못함");
    return false;
}

// 골프장 항목 탐색 헬퍼 (인천경인 등 스크롤 없는 소규모 지역부터 대규모 지역까지 모두 대응)
function findGolfCourseElement(targetText, container) {
    if (!targetText) return null;
    const root = container || document.body;
    const cleanTarget = targetText.replace(/\s+/g, '').toLowerCase();

    // 1. Quasar q-item 또는 option 엘리먼트 순회
    const items = Array.from(root.querySelectorAll('.q-item, [role="option"], div[class*="item"]'))
        .filter(el => el.offsetHeight > 0);

    // 1-1. 완전 일치 탐색 (공백/대소문자 무시)
    for (const item of items) {
        const itemText = (item.innerText || item.textContent || '').trim();
        const cleanItem = itemText.replace(/\s+/g, '').toLowerCase();
        if (cleanItem === cleanTarget) return item;
    }

    // 1-2. 부분 포함 일치 탐색
    for (const item of items) {
        const itemText = (item.innerText || item.textContent || '').trim();
        const cleanItem = itemText.replace(/\s+/g, '').toLowerCase();
        if (cleanItem.includes(cleanTarget) || cleanTarget.includes(cleanItem)) return item;
    }

    // 2. TreeWalker를 이용한 전체 텍스트 노드 탐색
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    let node;
    let exactFound = null;
    let partialFound = null;

    while (node = walker.nextNode()) {
        const text = node.textContent.trim();
        if (!text) continue;
        const parent = node.parentElement;
        if (!parent || parent.offsetHeight === 0) continue;

        const cleanNode = text.replace(/\s+/g, '').toLowerCase();
        if (cleanNode === cleanTarget) {
            exactFound = parent;
            break;
        }
        if (!partialFound && (cleanNode.includes(cleanTarget) || cleanTarget.includes(cleanNode))) {
            partialFound = parent;
        }
    }

    return exactFound || partialFound;
}

// 골프장 엘리먼트 물리 클릭 핸들러
async function clickGolfCourseElement(foundEl) {
    if (!foundEl) return false;
    const targetRow = foundEl.closest('.q-item, [role="option"], div[class*="item"]') || foundEl;
    targetRow.style.setProperty('outline', '5px solid #00ff00', 'important');
    targetRow.scrollIntoView({ block: "center", behavior: "instant" });
    await sleep(100);

    const radio = targetRow.querySelector('.q-radio, input[type="radio"], .q-radio__inner');
    const clickTarget = radio || targetRow;

    const rect = clickTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const opts = { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y, buttons: 1 };

    // 마우스 이벤트 시뮬레이션
    clickTarget.dispatchEvent(new MouseEvent('mouseenter', opts));
    clickTarget.dispatchEvent(new MouseEvent('mouseover', opts));
    clickTarget.dispatchEvent(new MouseEvent('mousedown', opts));
    clickTarget.dispatchEvent(new MouseEvent('mouseup', opts));
    clickTarget.click();

    // 라디오가 있다면 라디오도 클릭
    if (radio && radio !== clickTarget) {
        radio.click();
    }
    // 행 자체도 클릭
    if (targetRow !== clickTarget) {
        targetRow.click();
    }
    // Enter 키 전달
    targetRow.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    await sleep(350);
    return true;
}

// 5. 골프장 찾기 및 선택
async function selectGolfCourse(targetText, maxAttempts = 15) {
    if (!targetText) return false;
    console.log(`[매크로] 5단계: 골프장(${targetText}) 탐색 및 선택 시작...`);

    // 다이얼로그 팝업이 뜰 때까지 잠시 대기 (최대 3초)
    let dialogEl = null;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        if (shouldStopRegistration) return false;
        dialogEl = document.querySelector('.q-dialog:not(.hidden), [role="dialog"], .q-dialog__inner, .q-menu');
        if (dialogEl || document.querySelector('.q-item, [role="option"]')) break;
        await sleep(150);
    }

    const searchScope = dialogEl || document.body;

    // 1차 시도: 현재 화면에서 바로 찾기 (인천경인 등 15개 내외로 스크롤이 없는 구장 즉각 선택)
    for (let check = 0; check < 5; check++) {
        if (shouldStopRegistration) return false;
        const found = findGolfCourseElement(targetText, searchScope);
        if (found) {
            console.log(`[매크로] 골프장(${targetText}) 즉시 발견! 선택 클릭 진행...`);
            const ok = await clickGolfCourseElement(found);
            if (ok) return true;
        }
        await sleep(150);
    }

    // 2차 시도: 화면 아래에 숨겨져 있을 경우 스크롤하며 탐색 (경기남부/동부 등 스크롤 필요 구장)
    let scrollBox = document.querySelector('.q-dialog .scroll, .q-dialog__inner .scroll, .q-dialog .q-card, .q-dialog [class*="scroll"], .q-menu, .q-virtual-scroll__content, .q-scrollarea__container') ||
                    Array.from(document.querySelectorAll('.q-dialog div, [role="dialog"] div, div')).find(el => el.scrollHeight > el.clientHeight && el.offsetHeight > 0);

    for (let i = 0; i < 40; i++) {
        if (shouldStopRegistration) return false;

        const found = findGolfCourseElement(targetText, searchScope);
        if (found) {
            console.log(`[매크로] 골프장(${targetText}) 스크롤 중 발견! 선택 클릭 진행...`);
            const ok = await clickGolfCourseElement(found);
            if (ok) return true;
        }

        if (scrollBox) {
            scrollBox.scrollTop += 380;
            const firstItem = scrollBox.querySelector('.q-item, div');
            if (firstItem && i > 5) {
                firstItem.style.marginTop = "-" + ((i - 5) * 380) + "px";
            }
        }
        await sleep(250);
    }

    // 3차 시도: document 전체에서 최종 탐색
    const lastChance = findGolfCourseElement(targetText, document.body);
    if (lastChance) {
        console.log(`[매크로] 골프장(${targetText}) 최종 검색에서 발견! 선택 클릭 진행...`);
        return await clickGolfCourseElement(lastChance);
    }

    console.error(`[매크로] 골프장(${targetText}) 목록 내 미발견`);
    return false;
}

// 6. 달력 날짜(월/일) 선택
async function selectDate(rawDate) {
    if (!rawDate) return false;
    const parts = rawDate.split('.');
    const targetMonth = parts[0];
    const targetDay = parts[1];
    console.log(`[매크로] 6단계: 날짜 선택 (${targetMonth}월 ${targetDay}일)...`);

    const fields = Array.from(document.querySelectorAll('.q-field, .q-field__control'))
                        .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
    
    if (fields.length > 0) {
        fields[0].click(); 
        await sleep(600); 

        // 현재 달 확인
        const monthHeaderBtn = document.querySelector('.q-date__view .q-btn__content span') || 
                               document.querySelector('.q-date__view .q-btn__content');
        
        const currentMonthNum = monthHeaderBtn ? monthHeaderBtn.textContent.replace(/[^0-9]/g, '').trim() : "";
        console.log(`[매크로] 달력 현재 표시 월: ${currentMonthNum}월`);

        if (currentMonthNum !== targetMonth && monthHeaderBtn) {
            console.log(`[매크로] 목표 월(${targetMonth}월)로 변경 진행`);
            monthHeaderBtn.click(); 
            await sleep(500); 

            const allMonthBtns = Array.from(document.querySelectorAll('.q-date__months-item .q-btn__content, .q-btn__content span'));
            const targetMonthBtn = allMonthBtns.find(el => el.textContent.trim() === `${targetMonth}월`);

            if (targetMonthBtn) {
                targetMonthBtn.click();
                await sleep(600);
            }
        }

        // 최종 날짜(일) 클릭
        const dayBtns = Array.from(document.querySelectorAll('.q-date__calendar-item button'));
        const finalBtn = dayBtns.find(btn => {
            return btn.textContent.trim() === targetDay && !btn.closest('.q-date__calendar-item--out');
        });

        if (finalBtn) {
            const rect = finalBtn.getBoundingClientRect();
            const opts = { bubbles: true, clientX: rect.left + rect.width/2, clientY: rect.top + rect.height/2 };
            finalBtn.dispatchEvent(new MouseEvent('mouseenter', opts));
            await sleep(150);
            finalBtn.click();
            console.log(`[매크로] 날짜(${targetMonth}월 ${targetDay}일) 클릭 완료`);
            return true;
        }
    }
    console.error(`[매크로] 날짜(${rawDate}) 선택 실패`);
    return false;
}

// 7. 시간 입력
async function inputTime(selectedTime) {
    if (!selectedTime) return false;
    console.log(`[매크로] 7단계: 시간(${selectedTime}) 입력 중...`);

    const fields = Array.from(document.querySelectorAll('.q-field, .q-field__control'))
                        .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
    
    if (fields.length > 0) {
        const rect = fields[0].getBoundingClientRect();
        const tx = rect.left + (rect.width / 2);
        const ty = rect.top + 75; // 날짜 칸 아래 75px

        let input = null;
        const target = document.elementFromPoint(tx, ty);
        if (target) {
            const opts = { bubbles: false, cancelable: true, view: window, clientX: tx, clientY: ty };
            target.dispatchEvent(new MouseEvent('mouseenter', opts));
            target.dispatchEvent(new MouseEvent('mouseover', opts));
            await sleep(100); 

            const elements = document.elementsFromPoint(tx, ty);
            input = elements.find(el => el.tagName === 'INPUT') || 
                    elements.find(el => el.querySelector('input'))?.querySelector('input');
        }

        // fallback: 좌표 탐색 실패 시 시간 관련 placeholder/selector로 2차 탐색
        if (!input) {
            const allInputs = Array.from(document.querySelectorAll('input')).filter(el => el.offsetHeight > 0);
            input = allInputs.find(el => {
                const ph = el.placeholder || '';
                return ph.includes('1600') || ph.includes('0710') || ph.includes('시간');
            }) || (fields[1] ? fields[1].querySelector('input') : null);
        }

        if (input) {
            input.focus();
            input.dispatchEvent(new MouseEvent('mousedown', { bubbles: false, cancelable: true }));
            // 주의: input.click()은 상위 요소의 인라인 이벤트(CSP 위반 에러)를 트리거하므로 
            // 호출하지 않고 focus + select + execCommand + v-model 이벤트 트리거로 안전하게 입력
            input.select();
            document.execCommand('selectAll', false, null);
            document.execCommand('delete', false, null);
            document.execCommand('insertText', false, selectedTime);

            if (input.value !== selectedTime) {
                input.value = selectedTime;
            }
            
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, bubbles: true }));
            input.blur();
            input.dispatchEvent(new Event('blur', { bubbles: true }));
            
            console.log(`[매크로] 시간(${selectedTime}) 입력 성공`);
            return true;
        }
    }
    console.error(`[매크로] 시간 입력칸 탐색 실패`);
    return false;
}

// 8. 그린피 입력 및 선입금 체크
async function inputFee(feeValue, isPrepaidParam = false) {
    if (!feeValue) return false;

    let isPrepaid = isPrepaidParam;
    let actualFee = feeValue.toString().trim();

    if (actualFee.includes('선입금')) {
        actualFee = actualFee.split('|')[0].replace('선입금', '').trim();
        isPrepaid = true;
    }

    console.log(`[매크로] 8단계: 그린피(${actualFee}) 입력 및 선입금 처리 여부: ${isPrepaid ? '선입금 체크 진행' : '체크 안 함'}`);

    // 숫자 및 소수점만 깔끔하게 추출 (예: '17.9만' -> '17.9', '15만원' -> '15')
    const matchNum = actualFee.match(/([0-9]+(?:\.[0-9]+)?)/);
    if (matchNum) {
        actualFee = matchNum[1];
    }

    // 1) 입력칸 찾기 (다이얼로그 내부 우선 탐색)
    let feeInput = null;
    const dialog = document.querySelector('.q-dialog:not([style*="display: none"]), .q-card, [role="dialog"]');
    if (dialog) {
        feeInput = dialog.querySelector('input[placeholder*="그린피"], input[placeholder*="숫자"], input[name*="fee"]');
    }
    if (!feeInput) {
        const inputs = Array.from(document.querySelectorAll('input[placeholder*="그린피"], input[placeholder*="숫자"], input[name*="fee"]'))
                            .filter(el => el.offsetHeight > 0);
        feeInput = inputs[0] || document.querySelector('input[placeholder*="그린피"], input[name*="fee"]');
    }

    if (feeInput) {
        feeInput.scrollIntoView({ block: 'center' });
        
        // 마우스 클릭 및 포커스 시뮬레이션
        const rect = feeInput.getBoundingClientRect();
        const tx = rect.left + rect.width / 2;
        const ty = rect.top + rect.height / 2;
        const opts = { bubbles: false, cancelable: true, view: window, clientX: tx, clientY: ty };
        feeInput.dispatchEvent(new MouseEvent('mouseenter', opts));
        feeInput.dispatchEvent(new MouseEvent('mouseover', opts));
        feeInput.dispatchEvent(new MouseEvent('mousedown', opts));
        feeInput.focus();
        feeInput.dispatchEvent(new MouseEvent('mouseup', opts));
        // feeInput.click()은 상위 인라인 핸들러 CSP 에러 방지를 위해 제외
        await sleep(100);

        // 2) 기존 텍스트 전체 선택 후 삭제
        feeInput.select();
        document.execCommand('selectAll', false, null);
        document.execCommand('delete', false, null);
        feeInput.value = '';
        feeInput.dispatchEvent(new Event('input', { bubbles: true }));
        await sleep(50);

        // 3) 브라우저 레벨 insertText 실행 (Quasar/Vue 3 v-model 반응형 상태 트리거의 핵심)
        const execSuccess = document.execCommand('insertText', false, actualFee);
        console.log(`[매크로] execCommand insertText 실행 결과: ${execSuccess}, 주입값: ${actualFee}`);

        // 4) 혹시 execCommand가 적용되지 않은 경우를 위한 fallback 주입
        if (feeInput.value !== actualFee) {
            const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
            if (nativeSetter) {
                nativeSetter.call(feeInput, actualFee);
            } else {
                feeInput.value = actualFee;
            }
        }

        // 5) Vue / Quasar v-model 동기화를 위한 풀 이벤트 시퀀스 발송
        try {
            feeInput.dispatchEvent(new InputEvent('input', {
                bubbles: true,
                cancelable: true,
                composed: true,
                data: actualFee,
                inputType: 'insertText'
            }));
        } catch (e) {}

        feeInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        feeInput.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
        feeInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, composed: true }));
        feeInput.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true, composed: true }));

        // 6) blur 이벤트로 모델 동기화 확정
        await sleep(100);
        feeInput.blur();
        feeInput.dispatchEvent(new Event('blur', { bubbles: true, composed: true }));

        console.log(`[매크로] 그린피 숫자(${actualFee}) 최종 입력 및 v-model 커밋 완료`);
    } else {
        console.warn(`[매크로] 그린피 입력칸을 찾지 못함`);
    }

    if (isPrepaid) {
        await sleep(500);
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while(node = walker.nextNode()) {
            if (node.textContent.includes('선입금')) {
                const targetEl = node.parentElement;
                if (targetEl.tagName === 'SCRIPT' || targetEl.tagName === 'STYLE') continue;
                const clickTarget = targetEl.closest('button, .q-btn, label, .q-checkbox, .q-radio, .q-chip') || targetEl;
                const rect = clickTarget.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) continue;
                
                const isAlreadyChecked = clickTarget.classList.contains('q-checkbox--truthy') ||
                                         clickTarget.classList.contains('q-btn--active') ||
                                         clickTarget.classList.contains('active') ||
                                         clickTarget.getAttribute('aria-checked') === 'true';
                if (!isAlreadyChecked) {
                    const x = rect.left + rect.width / 2;
                    const y = rect.top + rect.height / 2;
                    const opts = { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y };
                    clickTarget.dispatchEvent(new MouseEvent('mouseenter', opts));
                    clickTarget.dispatchEvent(new MouseEvent('mouseover', opts));
                    clickTarget.dispatchEvent(new MouseEvent('mousedown', opts));
                    clickTarget.dispatchEvent(new MouseEvent('mouseup', opts));
                    clickTarget.click();
                    console.log("[매크로] '선입금' 체크 완료");
                } else {
                    console.log("[매크로] '선입금' 이미 체크되어 있음");
                }
                break;
            }
        }
    }
    return true;
}

// 8-2. 식사포함 체크
async function selectMeal(isMealParam = false) {
    console.log(`[매크로] 8-2단계: 식사포함 처리 여부: ${isMealParam ? '식사포함 체크 진행' : '체크 안 함'}`);

    const dialog = document.querySelector('.q-dialog:not([style*="display: none"]), .q-card, [role="dialog"]') || document.body;
    const walker = document.createTreeWalker(dialog, NodeFilter.SHOW_TEXT, null, false);
    let node;
    let targetCheckbox = null;

    while (node = walker.nextNode()) {
        const txt = node.textContent.trim().replace(/\s+/g, '');
        // 골프몬 폼에서 식사포함 관련 라벨 탐색
        if (txt.includes('식사포함') || txt.includes('식사제공') || txt.includes('조식포함') || (txt === '식사' && !txt.includes('불가'))) {
            const parent = node.parentElement;
            if (!parent || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE') continue;
            const candidate = parent.closest('label, .q-checkbox, button, .q-btn, .q-chip') || parent;
            const rect = candidate.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;
            targetCheckbox = candidate;
            break;
        }
    }

    // fallback: 전체 dialog 내에서 .q-checkbox 중 텍스트에 '식사'가 포함된 항목 탐색
    if (!targetCheckbox) {
        const checkboxes = Array.from(dialog.querySelectorAll('.q-checkbox, label'))
            .filter(el => el.offsetHeight > 0 && el.textContent.includes('식사'));
        if (checkboxes.length > 0) {
            targetCheckbox = checkboxes[0];
        }
    }

    if (targetCheckbox) {
        const isAlreadyChecked = targetCheckbox.classList.contains('q-checkbox--truthy') ||
                                 targetCheckbox.classList.contains('q-btn--active') ||
                                 targetCheckbox.classList.contains('active') ||
                                 targetCheckbox.getAttribute('aria-checked') === 'true' ||
                                 Boolean(targetCheckbox.querySelector('input[type="checkbox"]')?.checked);

        if (isMealParam && !isAlreadyChecked) {
            const rect = targetCheckbox.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            const opts = { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y };
            targetCheckbox.dispatchEvent(new MouseEvent('mouseenter', opts));
            targetCheckbox.dispatchEvent(new MouseEvent('mouseover', opts));
            targetCheckbox.dispatchEvent(new MouseEvent('mousedown', opts));
            targetCheckbox.dispatchEvent(new MouseEvent('mouseup', opts));
            targetCheckbox.click();
            const chkInput = targetCheckbox.querySelector('input[type="checkbox"]');
            if (chkInput && !chkInput.checked) {
                chkInput.click();
            }
            console.log("[매크로] '식사포함' 체크 완료");
        } else if (!isMealParam && isAlreadyChecked) {
            targetCheckbox.click();
            console.log("[매크로] '식사포함' 이전 체크 해제 완료");
        } else {
            console.log(`[매크로] '식사포함' 이미 ${isMealParam ? '체크됨' : '미체크 상태'}`);
        }
        return true;
    } else {
        if (isMealParam) {
            console.warn("[매크로] '식사포함' 체크박스를 찾지 못함 (화면에 없는 경우 통과)");
        }
    }
    return false;
}

// 9. 캐디 선택
async function selectCady(cadyValue) {
    let raw = (cadyValue || '캐디').toString().trim();
    let targetCady = '캐디';

    if (raw.includes('신입') || raw.includes('교육생')) {
        targetCady = '교육생캐디';
    } else if (raw.includes('운전') || raw.includes('드라이빙') || raw.includes('특수')) {
        targetCady = '운전캐디';
    } else if (raw.includes('마샬')) {
        targetCady = '마샬';
    } else if (raw.includes('노캐디')) {
        targetCady = '노캐디';
    } else {
        targetCady = '캐디';
    }

    console.log(`[매크로] 9단계: 캐디 설정 -> 목표: [${targetCady}] (원래값: ${raw})`);
    if (targetCady === '캐디') {
        console.log("[매크로] 기본값 '캐디'이므로 통과");
        return false;
    }

    const candidateTexts = [
        targetCady,
        targetCady.replace(/\s+/g, ''),
        targetCady.replace('캐디', '')
    ].filter(Boolean);

    let targetBtn = null;

    // 전략 1: '캐디를 선택하세요' 헤더 섹션 내부에서 탐색
    const headers = Array.from(document.querySelectorAll('div, span, label, p, h6, h5, .q-field__label'))
        .filter(el => {
            const txt = el.textContent.trim().replace(/\s+/g, '');
            return (txt.includes('캐디를선택') || txt.includes('캐디선택')) && el.offsetHeight > 0;
        });

    if (headers.length > 0) {
        const headerEl = headers.sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length)[0];
        let container = headerEl.parentElement;
        for (let depth = 0; depth < 5 && container; depth++) {
            const candidates = Array.from(container.querySelectorAll('button, .q-btn, label, [role="button"], .q-btn__content, span'))
                .filter(el => {
                    const t = el.textContent.trim().replace(/\s+/g, '');
                    return candidateTexts.some(ct => t === ct.replace(/\s+/g, '')) && el.offsetHeight > 0;
                });

            if (candidates.length > 0) {
                targetBtn = candidates[0].closest('button, .q-btn, label, [role="button"]') || candidates[0];
                break;
            }
            container = container.parentElement;
        }
    }

    // 전략 2: 전체 문서에서 일치하는 버튼 탐색
    if (!targetBtn) {
        const allElements = Array.from(document.querySelectorAll('button, .q-btn, .q-btn__content, label, span, [role="button"]'))
            .filter(el => {
                const t = el.textContent.trim().replace(/\s+/g, '');
                return candidateTexts.some(ct => t === ct.replace(/\s+/g, '')) && el.offsetHeight > 0;
            });
        
        if (allElements.length > 0) {
            const btnMatch = allElements.find(el => el.matches('button, .q-btn, [role="button"]') || el.closest('button, .q-btn'));
            targetBtn = btnMatch ? (btnMatch.closest('button, .q-btn, [role="button"]') || btnMatch) : allElements[0];
        }
    }

    if (targetBtn) {
        const clickTarget = targetBtn.closest('button, .q-btn, .q-item, label, .q-checkbox') || targetBtn;
        
        // 이미 선택되어 있는지 확인하여 중복 클릭 방지
        const isAlreadyChecked = clickTarget.classList.contains('q-checkbox--truthy') ||
                                 clickTarget.classList.contains('q-btn--active') ||
                                 clickTarget.classList.contains('active') ||
                                 clickTarget.classList.contains('bg-primary') ||
                                 clickTarget.getAttribute('aria-checked') === 'true' ||
                                 clickTarget.getAttribute('aria-pressed') === 'true';
        if (isAlreadyChecked) {
            console.log(`[매크로] 캐디 [${targetCady}] 이미 선택되어 있어 클릭을 건너뜁니다.`);
            return false;
        }

        clickTarget.style.setProperty('outline', '4px solid cyan', 'important');
        const opts = { bubbles: true, cancelable: true, view: window };
        clickTarget.dispatchEvent(new MouseEvent('mousedown', opts));
        clickTarget.dispatchEvent(new MouseEvent('mouseup', opts));
        clickTarget.click();
        console.log(`[매크로] 캐디 [${targetCady}] 선택 완료`);
        return true;
    } else {
        console.warn(`[매크로] 캐디 [${targetCady}] 버튼을 찾지 못했습니다.`);
    }
    return false;
}

// 10. 성별/조건 선택 (무관, 남자, 여자, 부부/커플)
async function selectCondition(conditionValue) {
    let raw = (conditionValue || '무관').toString().trim();
    let targetCondition = '무관';

    if (raw === '남자' || raw === '남자만' || raw === '남성만' || raw === '남자 전용' || raw === '남성 전용' || raw === '남남만') {
        targetCondition = '남자';
    } else if (raw === '여자' || raw === '여자만' || raw === '여성만' || raw === '여자 전용' || raw === '여성 전용' || raw === '여여만') {
        targetCondition = '여자';
    } else if (raw === '부부/커플' || raw === '남여만' || raw === '남녀만' || raw === '부부' || raw === '커플') {
        targetCondition = '부부/커플';
    } else {
        // 무관, 아무나, 여여불가, 남여불가, 남녀불가, 남남불가 등 모두 '무관'
        targetCondition = '무관';
    }

    console.log(`[매크로] 10단계: 조건/성별 설정 -> 목표: [${targetCondition}] (원래값: ${raw})`);

    let targetBtn = null;

    // 전략 1: '조인 조건' 헤더 섹션 내부의 버튼 또는 q-btn 그룹에서 탐색
    const headers = Array.from(document.querySelectorAll('div, span, label, p, h6, h5, .q-field__label'))
        .filter(el => {
            const txt = el.textContent.trim().replace(/\s+/g, '');
            return (txt.includes('조인조건') || txt.includes('조인조건을선택하세요') || txt.includes('조건선택')) && el.offsetHeight > 0;
        });

    if (headers.length > 0) {
        const headerEl = headers.sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length)[0];
        let container = headerEl.parentElement;
        for (let depth = 0; depth < 5 && container; depth++) {
            const candidates = Array.from(container.querySelectorAll('button, .q-btn, label, [role="button"], .q-btn__content, span'))
                .filter(el => el.textContent.trim().replace(/\s+/g, '') === targetCondition.replace(/\s+/g, '') && el.offsetHeight > 0);

            if (candidates.length > 0) {
                targetBtn = candidates[0].closest('button, .q-btn, label, [role="button"]') || candidates[0];
                break;
            }
            container = container.parentElement;
        }
    }

    // 전략 2: 전체 문서에서 텍스트가 정확히 일치하는 버튼 탐색
    if (!targetBtn) {
        const allElements = Array.from(document.querySelectorAll('button, .q-btn, .q-btn__content, label, span, [role="button"]'))
            .filter(el => el.offsetHeight > 0 && el.textContent.trim().replace(/\s+/g, '') === targetCondition.replace(/\s+/g, ''));
        
        if (allElements.length > 0) {
            const btnMatch = allElements.find(el => el.matches('button, .q-btn, [role="button"]') || el.closest('button, .q-btn'));
            targetBtn = btnMatch ? (btnMatch.closest('button, .q-btn, [role="button"]') || btnMatch) : allElements[0];
        }
    }

    if (targetBtn) {
        const clickTarget = targetBtn.closest('button, .q-btn, .q-item, label, .q-checkbox') || targetBtn;
        
        // 이미 선택/체크되어 있는지 확인하여 중복 토글(해제) 방지
        const isAlreadyChecked = clickTarget.classList.contains('q-checkbox--truthy') ||
                                 clickTarget.classList.contains('q-btn--active') ||
                                 clickTarget.classList.contains('active') ||
                                 clickTarget.classList.contains('bg-primary') ||
                                 clickTarget.getAttribute('aria-checked') === 'true' ||
                                 clickTarget.getAttribute('aria-pressed') === 'true';
        if (isAlreadyChecked) {
            console.log(`[매크로] 조건 [${targetCondition}] 이미 선택되어 있어 클릭을 건너뜁니다.`);
            return false;
        }

        clickTarget.style.setProperty('outline', '4px solid cyan', 'important');
        const opts = { bubbles: true, cancelable: true, view: window };
        clickTarget.dispatchEvent(new MouseEvent('mousedown', opts));
        clickTarget.dispatchEvent(new MouseEvent('mouseup', opts));
        clickTarget.click();
        console.log(`[매크로] 조건 [${targetCondition}] 클릭 및 선택 완료`);
        return true;
    } else {
        console.warn(`[매크로] 조건 [${targetCondition}] 버튼을 찾지 못했습니다.`);
    }
    return false;
}

// 11. 인원수 선택 (요청 인원: 1명, 2명, 3명, 4명 버튼 전용 클릭)
async function selectPeopleCount(sizenum, maxAttempts = 2) {
    const match = (sizenum || '4').toString().match(/\d+/);
    const pNum = match ? match[0] : '4';
    const targetText = `${pNum}명`;

    console.log(`[매크로] 11단계: 요청 인원(${targetText}) 버튼 탐색 및 선택 시작... (목표: ${pNum}명)`);

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        if (shouldStopRegistration) return false;

        let targetBtn = null;

        // 전략 1: '요청 인원' 헤더 섹션 내부의 버튼 또는 q-btn 그룹에서 탐색
        const headers = Array.from(document.querySelectorAll('div, span, label, p, h6, h5, .q-field__label'))
            .filter(el => {
                const txt = el.textContent.trim().replace(/\s+/g, '');
                return (txt.includes('요청인원') || txt.includes('요청인원을선택하세요')) && el.offsetHeight > 0;
            });

        if (headers.length > 0) {
            const headerEl = headers.sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length)[0];
            let container = headerEl.parentElement;
            for (let depth = 0; depth < 5 && container; depth++) {
                // 1-1: 텍스트가 정확히 'X명'인 버튼 탐색
                const candidates = Array.from(container.querySelectorAll('button, .q-btn, label, [role="button"], .q-btn__content'))
                    .filter(el => el.textContent.trim().replace(/\s+/g, '') === targetText && el.offsetHeight > 0);

                if (candidates.length > 0) {
                    targetBtn = candidates[0];
                    break;
                }

                // 1-2: 4개의 인원 버튼 그룹([1명, 2명, 3명, 4명])이 모여있는 경우 인덱스로 탐색
                const groupButtons = Array.from(container.querySelectorAll('button, .q-btn'))
                    .filter(el => ['1명', '2명', '3명', '4명'].some(t => el.textContent.trim().replace(/\s+/g, '') === t) && el.offsetHeight > 0);
                
                const idx = parseInt(pNum, 10) - 1;
                if (groupButtons.length >= 4 && idx >= 0 && idx < groupButtons.length) {
                    targetBtn = groupButtons[idx];
                    break;
                }

                container = container.parentElement;
            }
        }

        // 전략 2: 전체 문서에서 텍스트가 정확히 'X명'인 버튼 또는 q-btn 탐색
        if (!targetBtn) {
            const allElements = Array.from(document.querySelectorAll('button, .q-btn, .q-btn__content, label, span, [role="button"]'))
                .filter(el => el.offsetHeight > 0 && el.textContent.trim().replace(/\s+/g, '') === targetText);
            
            if (allElements.length > 0) {
                const btnMatch = allElements.find(el => el.matches('button, .q-btn, [role="button"]') || el.closest('button, .q-btn'));
                targetBtn = btnMatch || allElements[0];
            }
        }

        // 전략 3: TreeWalker를 통한 텍스트 노드 탐색
        if (!targetBtn) {
            const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
            let node;
            while ((node = walker.nextNode())) {
                if (node.textContent.trim().replace(/\s+/g, '') === targetText) {
                    const parent = node.parentElement;
                    if (parent && parent.offsetHeight > 0 && !['SCRIPT', 'STYLE'].includes(parent.tagName)) {
                        targetBtn = parent.closest('button, .q-btn, label, [role="button"]') || parent;
                        break;
                    }
                }
            }
        }

        // 전략 4: 'X인' 또는 숫자 형식으로 표시되어 있는 경우 대비 fallback
        if (!targetBtn) {
            const altCandidates = Array.from(document.querySelectorAll('button, .q-btn, .q-btn__content, label'))
                .filter(el => el.offsetHeight > 0 && (el.textContent.trim().replace(/\s+/g, '') === `${pNum}인` || el.textContent.trim().replace(/\s+/g, '') === pNum));
            if (altCandidates.length > 0) {
                targetBtn = altCandidates[0];
            }
        }

        if (targetBtn) {
            const clickTarget = targetBtn.closest('button, .q-btn, label, [role="button"]') || targetBtn;

            // 이미 선택되어 있는지 확인하여 불필요한 중복 클릭 및 지연 방지
            const isAlreadyActive = clickTarget.classList.contains('q-btn--active') ||
                                    clickTarget.classList.contains('active') ||
                                    clickTarget.classList.contains('bg-primary') ||
                                    clickTarget.getAttribute('aria-pressed') === 'true' ||
                                    clickTarget.getAttribute('aria-selected') === 'true';
            if (isAlreadyActive) {
                console.log(`[매크로] 요청 인원(${targetText}) 이미 선택되어 있어 건너뜁니다.`);
                return false;
            }

            // 시각적 피드백 및 스크롤 포커스
            clickTarget.scrollIntoView({ behavior: 'instant', block: 'center' });
            clickTarget.style.setProperty('outline', '5px solid #00e676', 'important');
            clickTarget.style.setProperty('box-shadow', '0 0 12px #00e676', 'important');

            const rect = clickTarget.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const topEl = document.elementFromPoint(cx, cy) || clickTarget;

            console.log(`[매크로] 요청 인원(${targetText}) 버튼 발견! 좌표: (${Math.round(cx)}, ${Math.round(cy)})`);

            const eventOpts = { bubbles: true, cancelable: true, view: window, clientX: cx, clientY: cy };

            // MouseEvent & PointerEvent 물리적 클릭 시퀀스 실행
            ['pointerdown', 'mousedown'].forEach(t => {
                topEl.dispatchEvent(new MouseEvent(t, eventOpts));
                if (topEl !== clickTarget) clickTarget.dispatchEvent(new MouseEvent(t, eventOpts));
            });

            await sleep(40);

            ['pointerup', 'mouseup', 'click'].forEach(t => {
                topEl.dispatchEvent(new MouseEvent(t, eventOpts));
                if (topEl !== clickTarget) clickTarget.dispatchEvent(new MouseEvent(t, eventOpts));
            });

            // Native DOM click 호출
            if (typeof topEl.click === 'function') topEl.click();
            if (topEl !== clickTarget && typeof clickTarget.click === 'function') clickTarget.click();

            console.log(`[매크로] 요청 인원(${targetText}) 물리적 클릭 완료!`);
            await sleep(80);
            return true;
        }

        await sleep(80);
    }

    console.warn(`[매크로] 요청 인원(${targetText}) 버튼을 찾지 못함 (양도 등록이거나 화면에 없는 경우 통과)`);
    return false;
}

// 12. 상세 내용 입력 (.ql-editor 또는 textarea, 재시도 포함)
async function inputMemo(customMemo, maxAttempts = 10) {
    const val = customMemo || "골프락 지원 혜택가\n가장 빠르고 신속하게 모십니다\n타구장상담까지 한번에\n현재실장입니다!!";
    console.log("[매크로] 12단계: 상세 안내 문구 입력...");

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        if (shouldStopRegistration) return false;
        const el = document.querySelector('.ql-editor, textarea, [contenteditable="true"]');
        if (el && el.offsetHeight > 0) {
            el.focus();
            if (el.isContentEditable) {
                document.execCommand('selectAll', false, null);
                document.execCommand('insertText', false, val);
            } else {
                const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set ||
                                     Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value')?.set;
                if (nativeSetter) nativeSetter.call(el, val);
                else el.value = val;
                el.dispatchEvent(new Event('input', { bubbles: true }));
                el.dispatchEvent(new Event('change', { bubbles: true }));
            }
            console.log("[매크로] 상세 문구 입력 완료");
            return true;
        }
        await sleep(200);
    }
    console.warn("[매크로] 에디터를 찾지 못함 (통과)");
    return false;
}

// 13. 등록하기 버튼 클릭 (재시도 및 다중 태그 탐색 포함)
async function clickSubmitButton(maxAttempts = 15) {
    console.log("[매크로] 13단계: '등록하기' 버튼 탐색 및 클릭 시도...");
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        if (shouldStopRegistration) return false;
        const btn = Array.from(document.querySelectorAll('button, .q-btn, div, span'))
            .find(el => el.textContent.trim() === '등록하기' && el.offsetHeight > 0);

        if (btn) {
            const finalTarget = btn.closest('button') || btn.closest('.q-btn') || btn;
            finalTarget.scrollIntoView({ block: 'center' });
            finalTarget.style.setProperty('outline', '8px solid blue', 'important');
            await sleep(300);

            const rect = finalTarget.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            const topElement = document.elementFromPoint(x, y) || finalTarget;
            const opts = { clientX: x, clientY: y, bubbles: true, cancelable: true, view: window };

            topElement.dispatchEvent(new MouseEvent('mousedown', opts));
            await sleep(100);
            topElement.dispatchEvent(new MouseEvent('mouseup', opts));
            topElement.dispatchEvent(new MouseEvent('click', opts));
            console.log("[매크로] '등록하기' 클릭 완료!");
            return true;
        }
        await sleep(250);
    }
    console.error("[매크로] '등록하기' 버튼을 찾지 못함");
    return false;
}

// 14. 팝업 / 하단 알림바 '확인' 버튼 정밀 탐색 헬퍼 (Quasar Notification, 다이얼로그, 바텀 배너 전방위 탐색)
function findConfirmButton() {
    // 1. Quasar Notification 알림바 / 스낵바 (.q-notification, .q-notifications, .q-notifications__list, .q-banner 등)
    const notifs = Array.from(document.querySelectorAll('.q-notification, .q-notifications, .q-banner, .q-snackbar, [class*="notification"], [class*="notify"]'))
        .filter(el => el.offsetHeight > 0);

    for (const notif of notifs) {
        // 실제 버튼 태그(button, .q-btn, [role="button"]) 우선 탐색 (컨테이너 div 오인식 원천 배제)
        const realBtns = Array.from(notif.querySelectorAll('button, .q-btn, [role="button"]'))
            .filter(b => b.offsetHeight > 0);
        for (const b of realBtns) {
            const txt = (b.innerText || b.textContent || '').trim().replace(/\s+/g, '');
            if (txt === '확인' || txt === '닫기' || txt === '완료') {
                if (!/수정|등록/.test(txt)) return b;
            }
        }

        // 혹시 button 태그가 아닐 경우 내부 span/div 탐색 후 최적의 버튼/클릭 타깃 매핑
        const texts = Array.from(notif.querySelectorAll('span, div, b, strong, a'))
            .filter(el => el.offsetHeight > 0);
        for (const t of texts) {
            const txt = (t.innerText || t.textContent || '').trim().replace(/\s+/g, '');
            if (txt === '확인' || txt === '닫기' || txt === '완료') {
                const targetBtn = t.closest('button, .q-btn, [role="button"]') || t.querySelector('button, .q-btn, [role="button"]') || t;
                const targetTxt = (targetBtn.innerText || targetBtn.textContent || '').trim().replace(/\s+/g, '');
                if (!/수정|등록/.test(targetTxt)) return targetBtn;
            }
        }
    }

    // 2. 다이얼로그 모달 (.q-dialog, [role="dialog"])
    const dialogs = Array.from(document.querySelectorAll('.q-dialog:not(.hidden), [role="dialog"]'))
        .filter(d => d.offsetHeight > 0 && d.style.display !== 'none');
    for (const dlg of dialogs) {
        const realBtns = Array.from(dlg.querySelectorAll('button, .q-btn, [role="button"]'))
            .filter(b => b.offsetHeight > 0);
        for (const b of realBtns) {
            const txt = (b.innerText || b.textContent || '').trim().replace(/\s+/g, '');
            if (txt === '확인' || txt === '네' || txt === '예' || txt === '완료') {
                if (!/수정|등록/.test(txt)) return b;
            }
        }
        const texts = Array.from(dlg.querySelectorAll('span, div, b, strong'))
            .filter(el => el.offsetHeight > 0);
        for (const t of texts) {
            const txt = (t.innerText || t.textContent || '').trim().replace(/\s+/g, '');
            if (txt === '확인' || txt === '네' || txt === '예' || txt === '완료') {
                const targetBtn = t.closest('button, .q-btn, [role="button"]') || t.querySelector('button, .q-btn, [role="button"]') || t;
                const targetTxt = (targetBtn.innerText || targetBtn.textContent || '').trim().replace(/\s+/g, '');
                if (!/수정|등록/.test(targetTxt)) return targetBtn;
            }
        }
    }

    // 3. '수정되었습니다' / '등록되었습니다' 문구를 포함하는 알림 컨테이너 내부 탐색
    const banners = Array.from(document.querySelectorAll('div, section, footer, [class*="banner"], [class*="alert"]'))
        .filter(el => {
            if (el.offsetHeight <= 0) return false;
            const txt = (el.innerText || el.textContent || '').trim();
            return txt.includes('수정되었습니다') || txt.includes('등록되었습니다') || txt.includes('수정완료');
        });
    for (const bn of banners) {
        const realBtns = Array.from(bn.querySelectorAll('button, .q-btn, [role="button"]'))
            .filter(b => b.offsetHeight > 0);
        for (const b of realBtns) {
            const txt = (b.innerText || b.textContent || '').trim().replace(/\s+/g, '');
            if (txt === '확인' || txt === '닫기' || txt === '완료') {
                if (!/수정|등록/.test(txt)) return b;
            }
        }
        const texts = Array.from(bn.querySelectorAll('span, div, b, strong'))
            .filter(el => el.offsetHeight > 0);
        for (const t of texts) {
            const txt = (t.innerText || t.textContent || '').trim().replace(/\s+/g, '');
            if (txt === '확인' || txt === '닫기' || txt === '완료') {
                const targetBtn = t.closest('button, .q-btn, [role="button"]') || t.querySelector('button, .q-btn, [role="button"]') || t;
                const targetTxt = (targetBtn.innerText || targetBtn.textContent || '').trim().replace(/\s+/g, '');
                if (!/수정|등록/.test(targetTxt)) return targetBtn;
            }
        }
    }

    // 4. 안전장치: .q-dialog, .q-notification, .q-banner 등 팝업/모달 컨테이너 외부의 일반 페이지 요소는 절대 클릭하지 않음 (오클릭/뒤로가기 유발 방지)
    return null;
}

// '확인' 버튼 전용 정밀 클릭 헬퍼 (Quasar 및 Vue 이벤트 레이어 완벽 트리거)
async function clickConfirmButtonReliably(targetEl) {
    if (!targetEl) return false;

    // 만약 targetEl이 wrapper라면 실제 button 탐색
    const realBtn = (targetEl.tagName === 'BUTTON' || targetEl.classList.contains('q-btn') || targetEl.getAttribute('role') === 'button')
        ? targetEl
        : (targetEl.querySelector('button, .q-btn, [role="button"]') || targetEl.closest('button, .q-btn, [role="button"]') || targetEl);

    realBtn.scrollIntoView({ block: 'center', behavior: 'instant' });
    realBtn.style.setProperty('outline', '5px solid #ff9800', 'important');
    realBtn.style.setProperty('box-shadow', '0 0 16px #ff9800', 'important');

    const rect = realBtn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const opts = { clientX: x, clientY: y, bubbles: true, cancelable: true, view: window };

    // 화면 최상단 엘리먼트 (텍스트 span 또는 ripple helper)
    const topElement = document.elementFromPoint(x, y) || realBtn;

    // 포커스 & 마우스다운/터치다운
    try { realBtn.focus(); } catch(e) {}
    try {
        topElement.dispatchEvent(new PointerEvent('pointerdown', opts));
        topElement.dispatchEvent(new MouseEvent('mousedown', opts));
    } catch(e) {}

    await sleep(60);

    // 마우스업/터치업
    try {
        topElement.dispatchEvent(new PointerEvent('pointerup', opts));
        topElement.dispatchEvent(new MouseEvent('mouseup', opts));
        topElement.dispatchEvent(new MouseEvent('click', opts));
    } catch(e) {}

    // Native .click()을 topElement와 realBtn 모두에 안전 실행
    try {
        if (topElement !== realBtn && typeof topElement.click === 'function') {
            topElement.click();
        }
    } catch(e) {}

    try {
        if (typeof realBtn.click === 'function') {
            realBtn.click();
        }
    } catch(e) {}

    console.log(`[매크로] 팝업/하단 알림 '확인' 버튼 정밀 클릭 완료 (${realBtn.tagName}, class=${realBtn.className})`);
    return true;
}

// 14. 팝업 / 하단 알림바 '확인' 버튼 대기 및 클릭 시도 (Quasar Notification, 바텀 배너, 다이얼로그 전방위 탐색 - 단 1회만 정확히 실행)
async function clickConfirmPopup(maxWaitAttempts = 25) {
    console.log("[매크로] 팝업/하단 알림 '확인' 버튼 대기 및 클릭 시도...");

    for (let attempt = 0; attempt < maxWaitAttempts; attempt++) {
        if (shouldStopRegistration) return false;

        const confirmBtn = findConfirmButton();
        if (confirmBtn) {
            console.log(`[매크로] '확인' 버튼 감지 (시도 ${attempt + 1}/${maxWaitAttempts}) -> 정밀 클릭 실행`);
            await clickConfirmButtonReliably(confirmBtn);
            await sleep(300);
            return true; // 2번째 잔여 알림 추가 클릭 삭제 (오클릭/뒤로가기 유발 원천 차단)
        }

        await sleep(200);
    }

    console.warn("[매크로] 팝업/하단 알림 '확인' 버튼 미발생 (자동 닫힘 또는 팝업 없음)");
    return false;
}

// 메인 일괄 등록 루프
async function executeBatchRegistration(items, customMemo, mode = 'join', delayPreset = 'safe', stepPreset = 'human') {
    if (isRegistrationRunning) return;
    isRegistrationRunning = true;
    shouldStopRegistration = false;

    try {
        await new Promise(r => chrome.storage.local.set({ completedItems: [], isRegistrationRunning: true }, r));
    } catch(e) {}

    const modeLabel = mode === 'transfer' ? '양도등록' : '조인등록';
    console.log(`🚀 [골프몬 ${modeLabel} 매크로 시작] 총 ${items.length}건 (단계별 속도: ${stepPreset}, 타임 간 대기: ${delayPreset})`);
    chrome.runtime.sendMessage({ type: 'REGISTER_STARTED', total: items.length });

    for (let i = 0; i < items.length; i++) {
        if (shouldStopRegistration) {
            console.log("🛑 사용자에 의해 매크로가 중단되었습니다.");
            chrome.runtime.sendMessage({ type: 'REGISTER_STOPPED', current: i, total: items.length });
            break;
        }

        const item = items[i];
        console.log(`\n================== [${i + 1}/${items.length}] ${item.golf} (${item.date} ${item.time}) [${modeLabel}] 등록 시작 ==================`);
        chrome.runtime.sendMessage({
            type: 'REGISTER_PROGRESS',
            current: i + 1,
            total: items.length,
            golf: item.golf,
            date: item.date,
            time: item.time,
            fee: item.fee
        });

        try {
            if (shouldStopRegistration) break;
            // 이전 등록 후 잔여 다이얼로그나 트랜지션이 완전히 정리될 때까지 잠시 대기
            await sleep(getStepDelay('normal', stepPreset));
            if (shouldStopRegistration) break;

            // ★ 사용자 요청: 게시물 등록 후 홈 화면으로 이탈된 경우, 하단 '부킹' 탭을 클릭하여 부킹프라자로 복귀 후 다음 등록 시작
            if (isHomeScreenOrNeedsBooking()) {
                console.log(`[매크로] [${i + 1}/${items.length}] 홈 화면 또는 비-부킹 화면 감지 -> 하단 '부킹' 탭 클릭하여 부킹프라자 복귀 진행...`);
                await clickBottomBookingTab();
                await sleep(getStepDelay('normal', stepPreset));
            }

            // 1) 등록/내글보기
            await clickRegisterMenu();
            if (shouldStopRegistration) break;
            await sleep(getStepDelay('normal', stepPreset));
            if (shouldStopRegistration) break;

            // 2) 등록 메뉴 (조인 vs 양도)
            if (mode === 'transfer') {
                await clickTransferRegisterMenu();
            } else {
                await clickJoinRegisterMenu();
            }
            if (shouldStopRegistration) break;
            await sleep(getStepDelay('quick_click', stepPreset));
            if (shouldStopRegistration) break;

            // 3) 지역 선택
            await selectRegion(item.region);
            if (shouldStopRegistration) break;
            await sleep(getStepDelay('quick_click', stepPreset));
            if (shouldStopRegistration) break;

            // 4) 골프장 선택창 열기
            await openGolfDropdown();
            if (shouldStopRegistration) break;
            await sleep(getStepDelay('browse_dropdown', stepPreset));
            if (shouldStopRegistration) break;

            // 5) 골프장명 선택
            await selectGolfCourse(item.golf);
            if (shouldStopRegistration) break;
            await sleep(getStepDelay('browse_dropdown', stepPreset));
            if (shouldStopRegistration) break;

            // 6) 날짜 선택
            await selectDate(item.date);
            if (shouldStopRegistration) break;
            await sleep(getStepDelay('calendar', stepPreset));
            if (shouldStopRegistration) break;

            // 7) 시간 입력
            await inputTime(item.time);
            if (shouldStopRegistration) break;
            await sleep(getStepDelay('typing', stepPreset));
            if (shouldStopRegistration) break;

            // 8) 그린피 입력
            await inputFee(item.fee, item.isPrepaid);
            if (shouldStopRegistration) break;
            await sleep(getStepDelay('typing', stepPreset));
            if (shouldStopRegistration) break;

            // 8-2) 식사포함 체크 (요청 시에만 클릭 및 지연)
            if (item.isMeal) {
                const mealClicked = await selectMeal(true);
                if (shouldStopRegistration) break;
                if (mealClicked) {
                    await sleep(getStepDelay('quick_click', stepPreset));
                    if (shouldStopRegistration) break;
                }
            }

            // 9) 캐디 선택 (기본 '캐디'가 아닐 때만 클릭 및 지연)
            const cadyClicked = await selectCady(item.cady);
            if (shouldStopRegistration) break;
            if (cadyClicked) {
                await sleep(getStepDelay('quick_click', stepPreset));
                if (shouldStopRegistration) break;
            }

            // 10) 성별/조건 & 11) 요청 인원 선택 (조인 등록 전용 - 양도 등록 시에는 화면에 존재하지 않으므로 건너뜀)
            if (mode !== 'transfer') {
                const conditionClicked = await selectCondition(item.condition || '무관');
                if (shouldStopRegistration) break;
                if (conditionClicked) {
                    await sleep(getStepDelay('quick_click', stepPreset));
                    if (shouldStopRegistration) break;
                }

                const peopleClicked = await selectPeopleCount(item.sizenum || '4인', 2);
                if (shouldStopRegistration) break;
                if (peopleClicked) {
                    await sleep(getStepDelay('quick_click', stepPreset));
                    if (shouldStopRegistration) break;
                }
            }

            // 12) 상세 내용 입력 (항목별 락/탑 전용 문구 우선 반영)
            await inputMemo(item.memo || customMemo);
            if (shouldStopRegistration) break;
            await sleep(getStepDelay('typing', stepPreset));
            if (shouldStopRegistration) break;

            // 13) 등록하기 클릭 직전 인간적 최종 확인 대기
            await sleep(getStepDelay('before_submit', stepPreset));
            if (shouldStopRegistration) break;
            await clickSubmitButton();
            if (shouldStopRegistration) break;
            await sleep(getStepDelay('normal', stepPreset));
            if (shouldStopRegistration) break;

            // 14) 확인 팝업 클릭
            await clickConfirmPopup();

            console.log(`✅ [${i + 1}/${items.length}] ${item.golf} [${modeLabel}] 등록 완료!`);

            // 등록 성공한 건 영구 기록 & 팝업 통지 (완료된 티타임 즉시 체크 해제)
            try {
                const res = await new Promise(r => chrome.storage.local.get(['completedItems'], r));
                const list = (res && Array.isArray(res.completedItems)) ? res.completedItems : [];
                list.push({ regId: item.regId, date: item.date, golf: item.golf, time: item.time });
                await new Promise(r => chrome.storage.local.set({ completedItems: list }, r));
            } catch(e) {}

            chrome.runtime.sendMessage({
                type: 'ITEM_REGISTER_SUCCESS',
                regId: item.regId,
                item: item,
                current: i + 1,
                total: items.length
            });

            if (shouldStopRegistration) break;

            // 다음 건이 남아있을 때: 사람처럼 불규칙한 랜덤 쿨다운 대기
            if (i < items.length - 1) {
                const cooldownMs = getCooldownDelay(delayPreset || 'safe');
                const cooldownSec = (cooldownMs / 1000).toFixed(1);
                console.log(`⏳ 사람처럼 보이기 위해 불규칙하게 ${cooldownSec}초 대기 후 다음 건 진행...`);

                chrome.runtime.sendMessage({
                    type: 'REGISTER_WAITING',
                    current: i + 1,
                    total: items.length,
                    waitSec: cooldownSec,
                    nextGolf: items[i + 1]?.golf || ''
                });

                await sleep(cooldownMs);
                if (shouldStopRegistration) break;
            } else {
                await sleep(1000); // 마지막 건 안전 대기
            }

        } catch (err) {
            console.error(`❌ [${i + 1}/${items.length}] ${item.golf} 등록 중 오류:`, err);
            if (shouldStopRegistration) break;
            if (i < items.length - 1) {
                console.log("⚠️ 오류 발생 후 3초 대기 후 다음 건 진행 시도...");
                await sleep(3000);
            }
        }
    }

    isRegistrationRunning = false;
    try {
        chrome.storage.local.set({ isRegistrationRunning: false });
    } catch(e) {}

    if (shouldStopRegistration) {
        console.log(`🛑 [골프몬 ${modeLabel} 매크로 중단됨]`);
        chrome.runtime.sendMessage({ type: 'REGISTER_STOPPED', total: items.length });
    } else {
        chrome.runtime.sendMessage({ type: 'REGISTER_COMPLETED', total: items.length });
        console.log(`🎉 [골프몬 ${modeLabel} 매크로 종료]`);
    }
}

// ========================================================
// 골프몬 내글 가격수정 자동화 매크로 (등록 상품 내역 -> 상세 -> 수정 -> 그린피 입력 -> 수정하기)
// ========================================================

// 팝업 모달에서 '내글 보기' 항목 클릭 헬퍼
async function clickMyPostsMenu(maxAttempts = 15) {
    console.log("[가격수정] 팝업 모달에서 '내글 보기' 탐색 및 클릭 시도...");
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        if (shouldStopRegistration) return false;

        const candidates = Array.from(document.querySelectorAll('.q-dialog, [role="dialog"], .q-bottom-sheet, .q-list, .q-item, button, .q-btn, div, span'))
            .filter(el => {
                if (el.offsetHeight <= 0 || el.offsetWidth <= 0) return false;
                const txt = (el.innerText || el.textContent || '').trim().replace(/\s+/g, '');
                return txt === '내글보기';
            });

        if (candidates.length > 0) {
            const leaf = candidates.sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length)[0];
            const target = leaf.closest('.q-item, button, .q-btn, [role="button"], .cursor-pointer') || leaf;

            console.log(`[가격수정] '내글 보기' 버튼 발견 (${target.tagName}, class=${target.className}) -> 클릭 실행`);
            target.style.setProperty('outline', '4px solid #00e676', 'important');
            await sleep(100);

            const rect = target.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const opts = { clientX: cx, clientY: cy, bubbles: true, cancelable: true, view: window };

            const topEl = document.elementFromPoint(cx, cy) || target;
            try {
                topEl.dispatchEvent(new PointerEvent('pointerdown', opts));
                topEl.dispatchEvent(new MouseEvent('mousedown', opts));
            } catch(e) {}
            await sleep(60);
            try {
                topEl.dispatchEvent(new PointerEvent('pointerup', opts));
                topEl.dispatchEvent(new MouseEvent('mouseup', opts));
                topEl.dispatchEvent(new MouseEvent('click', opts));
            } catch(e) {}
            try { target.click(); } catch(e) {}
            try { topEl.click(); } catch(e) {}
            await humanClick(target);

            console.log("[가격수정] '내글 보기' 클릭 완료!");
            return true;
        }

        await sleep(200);
    }

    console.warn("[가격수정] '내글 보기' 항목을 찾지 못함");
    return false;
}


// 마이페이지 내 '내가 등록한 상품 내역' 버튼 탐색 헬퍼
function findMyRegisteredPostsButton() {
    const candidates = Array.from(document.querySelectorAll('button, .q-btn, [role="button"], .cursor-pointer, .q-item, div, span, a'))
        .filter(el => {
            if (el.offsetHeight <= 0 || el.offsetWidth <= 0) return false;
            const txt = (el.innerText || el.textContent || '').trim().replace(/\s+/g, '');
            return txt === '내가등록한상품내역' || (txt.includes('내가등록한') && txt.includes('상품내역'));
        });
    if (candidates.length === 0) return null;
    candidates.sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length);
    const leaf = candidates[0];
    return leaf.closest('button, .q-btn, [role="button"], .cursor-pointer, .q-item, div') || leaf;
}

// 마이페이지 여부 판별 (Screen C: '내가 등록한 상품 내역' 진입 전 마이 화면)
function isMyPage() {
    if (isEditPage() || isDetailPage()) return false;
    const bodyTxt = document.body ? (document.body.innerText || '').replace(/\s+/g, '') : '';
    if (bodyTxt.includes('등록상품내역')) return false; // Screen B는 '내가'가 없음
    const myPostsBtn = findMyRegisteredPostsButton();
    if (myPostsBtn && myPostsBtn.offsetHeight > 0) return true;
    if (bodyTxt.includes('내가등록한상품내역') || (bodyTxt.includes('찜한매니저') && bodyTxt.includes('골프몬에요청'))) {
        return true;
    }
    return false;
}

// 메인 부킹프라자 카운트 매트릭스 화면 여부 판별 (Screen A: 등록 상품 내역 목록이 아님!)
function isMainBookingMatrixPage() {
    if (isEditPage()) return false;

    // 만약 이미 '등록상품내역' 화면이면 메인 매트릭스 화면이 아님
    const bodyTxt = document.body ? (document.body.innerText || '').replace(/\s+/g, '') : '';
    if (bodyTxt.includes('등록상품내역')) return false;

    // 플로팅 '등록 · 내글보기' 버튼이 화면에 존재하는 경우 100% Screen A
    const regBtn = findRegisterMenuButton();
    if (regBtn && regBtn.offsetHeight > 0) return true;

    // 매트릭스 지표 텍스트 확인 (등록한양도수 / 등록한조인수 / 총등록건수 등)
    if (bodyTxt.includes('등록한양도수') || bodyTxt.includes('등록한조인수') || bodyTxt.includes('총등록건수')) {
        return true;
    }

    return false;
}

// 등록 상품 내역 목록 페이지 여부 판별 (Screen B: 실제 등록된 글 목록)
function isRegisteredListPage() {
    if (isEditPage()) return false;

    // 본문 전체 또는 헤더에 '등록상품내역' 텍스트가 있는지 공백 제거 후 확인
    const bodyTxt = document.body ? (document.body.innerText || '').replace(/\s+/g, '') : '';
    if (bodyTxt.includes('등록상품내역')) {
        return true;
    }

    const headerEl = document.querySelector('.q-header, header, .q-toolbar');
    const hTxt = (headerEl ? headerEl.textContent : '').replace(/\s+/g, '');
    if (hTxt.includes('등록상품내역')) {
        return true;
    }

    return false;
}

function isAnyListPage() {
    return isRegisteredListPage();
}

// '등록 상품 내역' 목록 페이지로 이동 (이미 목록 화면이면 0ms 즉시 통과)
async function navigateToRegisteredList(filterType = '') {
    // 1. 이미 '등록 상품 내역' 목록 화면이면 즉시 성공
    if (isRegisteredListPage()) {
        console.log("[가격수정] 이미 '등록 상품 내역' 목록 화면에 위치해 있습니다. (즉시 진행)");
        if (filterType && (filterType === '양도' || filterType === '조인')) {
            await applyCategoryFilter(filterType);
        }
        return true;
    }

    // 2. 만약 수정 화면(isEditPage) 또는 상세 화면(isDetailPage)에 있다면 뒤로가기 1회 실행
    if (isEditPage() || isDetailPage()) {
        console.log("[가격수정] 수정/상세 화면 감지 -> 뒤로가기 1회 실행");
        await executeSingleBack();
        await sleep(350);
        if (isRegisteredListPage()) {
            if (filterType && (filterType === '양도' || filterType === '조인')) {
                await applyCategoryFilter(filterType);
            }
            return true;
        }
    }

    // 3. ★ 사용자 요청: 마이페이지 화면 감지 시 '내가 등록한 상품 내역' 버튼 클릭하여 즉시 진입!
    const myPostsBtn = findMyRegisteredPostsButton();
    if (myPostsBtn) {
        console.log("[가격수정] 마이페이지 감지 -> '내가 등록한 상품 내역' 버튼 클릭 실행");
        myPostsBtn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'instant' });
        myPostsBtn.style.setProperty('outline', '4px solid #00e676', 'important');
        await sleep(80);
        await humanClick(myPostsBtn);
        try { myPostsBtn.click(); } catch(e) {}

        for (let w = 0; w < 35; w++) {
            await sleep(150);
            if (isRegisteredListPage()) {
                console.log("[가격수정] '등록 상품 내역' 목록 진입 성공 (마이페이지 경유)!");
                await sleep(350);
                if (filterType && (filterType === '양도' || filterType === '조인')) {
                    await applyCategoryFilter(filterType);
                }
                return true;
            }
        }
    }

    // 4. 만약 화면에 이미 '내글 보기' 팝업 모달이 열려있다면 즉시 클릭
    const openMenu = Array.from(document.querySelectorAll('*'))
        .find(el => el.offsetHeight > 0 && (el.innerText || el.textContent || '').trim().replace(/\s+/g, '') === '내글보기' && el.children.length <= 1);
    if (openMenu) {
        console.log("[가격수정] 이미 '내글 보기' 팝업 모달이 열려있음 -> 바로 클릭");
        const clicked = await clickMyPostsMenu(5);
        if (clicked) {
            for (let w = 0; w < 30; w++) {
                await sleep(150);
                if (isRegisteredListPage()) {
                    console.log("[가격수정] '등록 상품 내역' 화면 진입 완료!");
                    await sleep(300);
                    if (filterType && (filterType === '양도' || filterType === '조인')) {
                        await applyCategoryFilter(filterType);
                    }
                    return true;
                }
            }
        }
    }

    // 5. 부킹프라자 메인 화면(Screen A): '등록 · 내글보기' 플로팅 버튼 클릭
    console.log("[가격수정] '등록 · 내글보기' 버튼 클릭 시도...");
    let openedMenu = false;
    const regBtn = findRegisterMenuButton();
    if (regBtn) {
        console.log(`[가격수정] '등록 · 내글보기' 버튼 발견 (${regBtn.tagName}) -> 클릭`);
        regBtn.style.setProperty('outline', '4px solid #00e676', 'important');
        await sleep(80);
        await humanClick(regBtn);
        try { regBtn.click(); } catch(e) {}
        openedMenu = true;
    } else {
        openedMenu = await clickRegisterMenu(3);
    }

    if (openedMenu) {
        await sleep(350);
        // 6. 팝업에서 '내글 보기' 메뉴 클릭
        const clickedMyPosts = await clickMyPostsMenu(10);
        if (clickedMyPosts) {
            for (let w = 0; w < 35; w++) {
                await sleep(150);
                if (isRegisteredListPage()) {
                    console.log("[가격수정] '등록 상품 내역' 목록 진입 성공!");
                    await sleep(350);
                    // 7. 목록 진입 직후 필터 재적용 (양도면 양도, 조인이면 조인)
                    if (filterType && (filterType === '양도' || filterType === '조인')) {
                        await applyCategoryFilter(filterType);
                    }
                    return true;
                }
            }
        }
    }

    return isRegisteredListPage();
}

function extractDayNumber(dateStr) {
    if (!dateStr) return '';
    const clean = dateStr.toString().trim();
    // 끝쪽의 1~2자리 숫자 매칭 (뒤에 한글, 요일, 공백 등 있어도 매칭)
    const m = clean.match(/(\d{1,2})(?=[^\d]*$)/);
    if (m) {
        return parseInt(m[1], 10).toString();
    }
    return '';
}

function extractMonthNumber(dateStr) {
    if (!dateStr) return '';
    const clean = dateStr.toString().trim();
    // "10.21", "10/21", "2026-10-21" 등에서 월 추출
    const m = clean.match(/(?:^|[^\d])(\d{1,2})[./\-](\d{1,2})/);
    if (m) {
        return parseInt(m[1], 10).toString();
    }
    return '';
}

async function ensureListMonth(targetMonth) {
    if (!targetMonth) return true;
    const cleanTargetMonth = parseInt(targetMonth, 10).toString();

    // 상단 좌측(y: 25~135, x: 0~180)에서 'X월' 요소 탐색
    const monthElements = Array.from(document.querySelectorAll('button, .q-btn, div, span, [role="button"]'))
        .filter(el => {
            if (el.offsetHeight <= 0 || el.offsetWidth <= 0) return false;
            const r = el.getBoundingClientRect();
            if (r.top < 25 || r.top > 135) return false;
            if (r.left < 0 || r.left > 180) return false;
            const txt = (el.innerText || el.textContent || '').trim();
            return /\d{1,2}월/.test(txt);
        });

    if (monthElements.length === 0) return true;

    // 가장 면적이 작은 요소(텍스트 리프) 탐색 후 버튼 컨테이너 식별
    monthElements.sort((a, b) => (a.offsetWidth * a.offsetHeight) - (b.offsetWidth * b.offsetHeight));
    const currentMonthBtn = monthElements[0].closest('button, .q-btn, .cursor-pointer, [role="button"]') || monthElements[0];
    const curTxt = (currentMonthBtn.innerText || currentMonthBtn.textContent || '').trim();
    const curMatch = curTxt.match(/(\d{1,2})월/);
    const curMonthNum = curMatch ? parseInt(curMatch[1], 10).toString() : '';

    if (curMonthNum && curMonthNum === cleanTargetMonth) {
        console.log(`[가격수정] 상단 월 (${cleanTargetMonth}월) 이미 일치함`);
        return true;
    }

    if (curMonthNum && curMonthNum !== cleanTargetMonth) {
        console.log(`[가격수정] 현재 월(${curMonthNum}월) -> 목표 월(${cleanTargetMonth}월)로 변경 시도...`);
        await humanClick(currentMonthBtn);
        try { currentMonthBtn.click(); } catch(e) {}
        await sleep(400);

        // 열린 메뉴에서 targetMonth + "월" 클릭
        const allItems = Array.from(document.querySelectorAll('.q-menu .q-item, .q-dialog .q-item, [role="listbox"] [role="option"], .q-item, div, span'))
            .filter(el => el.offsetHeight > 0);
        const targetItem = allItems.find(el => {
            const t = (el.innerText || el.textContent || '').trim().replace(/\s+/g, '');
            return t === `${cleanTargetMonth}월`;
        });
        if (targetItem) {
            const clickT = targetItem.closest('.q-item, [role="option"], button') || targetItem;
            await humanClick(clickT);
            try { clickT.click(); } catch(e) {}
            console.log(`[가격수정] 목표 월(${cleanTargetMonth}월) 선택 완료!`);
            await sleep(600);
        }
    }
    return true;
}

function getRegionBarTop() {
    const regionNames = ['전체', '인천경인', '경기북부', '경기동부', '경기남부', '충청', '강원', '전라', '경상', '제주'];
    const candidates = Array.from(document.querySelectorAll('.q-tab, [role="tab"], button, .q-btn, div, span'))
        .filter(el => {
            if (el.offsetHeight <= 0 || el.offsetWidth <= 0) return false;
            const txt = (el.innerText || el.textContent || '').trim();
            return regionNames.includes(txt);
        });

    if (candidates.length > 0) {
        const tops = candidates.map(el => el.getBoundingClientRect().top).filter(t => t > 60 && t < 400);
        if (tops.length > 0) {
            return Math.min(...tops);
        }
    }
    return 260; // fallback
}

function matchesDayNumber(el, cleanDay) {
    if (!el) return false;
    const raw = (el.innerText || el.textContent || '').trim();
    if (!raw) return false;
    // 시간(:), 금액(원, 만), 골프장명 등 배제
    if (raw.includes(':') || raw.includes('원') || raw.includes('만') || raw.includes('홀') || raw.includes('조인') || raw.includes('양도')) return false;

    // 텍스트를 공백/줄바꿈으로 분리
    const tokens = raw.split(/[\s\n\r\t]+/).map(t => t.trim()).filter(Boolean);
    // 토큰 중 하나가 정확히 cleanDay이거나 cleanDay+"일"인 경우
    if (tokens.some(t => t === cleanDay || t === `${cleanDay}일`)) {
        return true;
    }

    // 또는 숫자만 추출했을 때 cleanDay와 동일한 경우 (예: "수 21" -> 숫자만 뽑으면 "21")
    const nums = raw.match(/\b\d{1,2}\b/g);
    if (nums && nums.length === 1 && parseInt(nums[0], 10).toString() === cleanDay) {
        return true;
    }

    return false;
}

function isDateItemActive(el) {
    if (!el) return false;
    
    // 1. 정확한 active/selected 클래스명 검사 (substring 절대 금지! q-interactive 등 오탐 방지)
    const exactActiveClasses = ['active', 'selected', 'q-tab--active', 'q-btn--active'];
    if (exactActiveClasses.some(c => el.classList.contains(c))) return true;
    if (el.getAttribute('aria-selected') === 'true') return true;

    // 2. 자식 요소 중 정확한 active 클래스를 가진 요소 검사
    for (const cls of exactActiveClasses) {
        if (el.querySelector(`.${cls}`)) return true;
    }

    // 3. 자식 중 bg-black, bg-dark, bg-primary 클래스를 가진 요소가 있고 높이가 유효한지 검사
    const darkBadge = el.querySelector('.bg-black, .bg-dark, .bg-primary');
    if (darkBadge && darkBadge.offsetHeight > 0) {
        return true;
    }

    // 4. 배경색이 실제로 검은색/어두운색 계열인지 검사
    // (주의: rgba(0, 0, 0, 0) 투명 배경은 반드시 통과/제외해야 함!)
    const checkNodes = [el, ...Array.from(el.querySelectorAll('div, span, button'))];
    for (const node of checkNodes) {
        try {
            const style = window.getComputedStyle(node);
            const bg = style.backgroundColor || '';
            // 투명 배경 제외
            if (bg.includes('rgba(') && (bg.includes(', 0)') || bg.includes(',0)'))) continue;
            if (bg === 'transparent') continue;

            // 실제 불투명 검정색/어두운 배경 검사 (골프몬 활성 날짜 원형 배지)
            if (bg === 'rgb(0, 0, 0)' || 
                bg === 'rgb(18, 18, 18)' || 
                bg === 'rgb(33, 33, 33)' || 
                bg === 'rgb(34, 34, 34)' || 
                bg === 'rgb(38, 38, 38)' || 
                bg === 'rgb(44, 44, 44)' ||
                bg.startsWith('rgba(0, 0, 0, 1') ||
                bg.startsWith('rgba(33, 33, 33, 1')) {
                return true;
            }
        } catch(e) {}
    }

    return false;
}

function findDateElementInTopBar(cleanDay) {
    if (!cleanDay) return null;
    const regionBarTop = getRegionBarTop();
    const maxBottom = regionBarTop + 20;

    console.log(`[가격수정] 상단 날짜(${cleanDay}일) 탐색 범위: Y=35px ~ ${maxBottom}px (지역탭 top: ${regionBarTop}px)`);

    // 1단계: 상단 영역(35px ~ maxBottom)에 위치한 모든 요소 수집
    const topElements = Array.from(document.querySelectorAll('*'))
        .filter(el => {
            if (el.offsetHeight <= 0 || el.offsetWidth <= 0) return false;
            const r = el.getBoundingClientRect();
            // 상단 35px ~ 지역탭 위치 사이
            if (r.top < 35 || r.bottom > maxBottom) return false;
            // 너무 큰 컨테이너(가로 전체를 덮는 row 등) 배제
            if (r.width > 150 || r.height > 100) return false;
            return true;
        });

    // cleanDay와 일치하는 요소 필터링
    const matched = topElements.filter(el => matchesDayNumber(el, cleanDay));

    if (matched.length > 0) {
        // 면적이 작은 순(리프 우선) 정렬
        matched.sort((a, b) => (a.offsetWidth * a.offsetHeight) - (b.offsetWidth * b.offsetHeight));
        const leaf = matched[0];
        // 클릭 가능한 상위 요소 탐색 (단, maxBottom 이내)
        const clickable = leaf.closest('button, .q-btn, .cursor-pointer, [role="button"], .col') || leaf;
        const cRect = clickable.getBoundingClientRect();
        if (cRect.top >= 35 && cRect.bottom <= maxBottom) {
            return clickable;
        }
        return leaf;
    }

    // 2단계: TreeWalker를 통한 텍스트 노드 탐색 (Y 범위 검증)
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;
    while ((node = walker.nextNode())) {
        const txt = node.textContent.trim();
        if (txt === cleanDay || txt === `${cleanDay}일`) {
            const p = node.parentElement;
            if (p && p.offsetHeight > 0) {
                const r = p.getBoundingClientRect();
                if (r.top >= 35 && r.bottom <= maxBottom) {
                    const clickTarget = p.closest('button, .q-btn, .cursor-pointer, [role="button"], .col') || p;
                    return clickTarget;
                }
            }
        }
    }

    return null;
}

function getActiveDayFromScreen() {
    const regionBarTop = getRegionBarTop();
    const maxBottom = regionBarTop + 20;

    const topElements = Array.from(document.querySelectorAll('*'))
        .filter(el => {
            if (el.offsetHeight <= 0 || el.offsetWidth <= 0) return false;
            const r = el.getBoundingClientRect();
            if (r.top < 35 || r.bottom > maxBottom) return false;
            if (r.width > 150 || r.height > 100) return false;
            return true;
        });

    for (const el of topElements) {
        if (isDateItemActive(el)) {
            const raw = (el.innerText || el.textContent || '').trim();
            if (raw.includes(':') || raw.includes('원') || raw.includes('만') || raw.includes('월')) continue;
            const nums = raw.match(/\b\d{1,2}\b/g);
            if (nums && nums.length > 0) {
                const val = parseInt(nums[0], 10);
                if (val >= 1 && val <= 31) {
                    return val.toString();
                }
            }
        }
    }
    return null;
}

// 상단 날짜 버튼 단 1회 정밀 클릭 (중복/연타/토글 해제 100% 원천 차단)
async function clickDateElementOnce(el) {
    if (!el) return false;
    try {
        el.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'instant' });
    } catch(e) {}
    el.style.setProperty('outline', '4px solid #ff9800', 'important');
    await sleep(80);

    // 클릭 대상 요소: 상위 컨테이너(.cursor-pointer, button, [role="button"]) 우선
    const targetEl = el.closest('.cursor-pointer, button, .q-btn, [role="button"]') || el;

    console.log(`[가격수정] 상단 날짜 버튼 단 1회 정밀 클릭 실행 (${targetEl.tagName}, class=${targetEl.className})`);
    
    // 단 1회의 native click만 정밀 실행 (어떠한 보조 이벤트나 중복 클릭도 일절 배제!)
    try {
        targetEl.click();
    } catch(e) {
        const rect = targetEl.getBoundingClientRect();
        const opts = { clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2, bubbles: true, cancelable: true, view: window };
        targetEl.dispatchEvent(new MouseEvent('click', opts));
    }

    return true;
}

async function selectListDate(targetDateStr, maxAttempts = 12) {
    if (!targetDateStr) return true;

    // 1. 목표 월/일 추출
    const targetMonth = extractMonthNumber(targetDateStr);
    const cleanDay = extractDayNumber(targetDateStr);

    if (!cleanDay) {
        console.warn(`[가격수정] 날짜 파싱 실패 (입력: ${targetDateStr})`);
        return true;
    }

    // 화면상 이미 cleanDay가 활성화되어 있다면 절대 클릭 금지 (토글 해제 방지)
    const curActiveDay = getActiveDayFromScreen();
    if (curActiveDay && curActiveDay === cleanDay) {
        console.log(`[가격수정] 상단 날짜 (${cleanDay}일) 화면상 이미 활성화 확인됨 -> 중복 클릭 방지 (생략)`);
        return true;
    }

    console.log(`[가격수정] 상단 날짜 일치 선택 시도 -> 목표: [${targetMonth ? targetMonth + '월 ' : ''}${cleanDay}일] (현재 화면: ${curActiveDay || '미확인'}일)`);

    // 만약 월이 다르면 월 먼저 일치
    if (targetMonth) {
        await ensureListMonth(targetMonth);
        await sleep(200);
    }

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        if (shouldStopRegistration) return false;

        const dateEl = findDateElementInTopBar(cleanDay);

        if (dateEl) {
            const isAlreadyActive = isDateItemActive(dateEl);
            if (isAlreadyActive) {
                console.log(`[가격수정] 상단 날짜 (${cleanDay}일) 이미 선택되어 있음 (활성 상태 확인) -> 중복 클릭 방지 (생략)`);
                return true;
            }

            console.log(`[가격수정] 상단 날짜 (${cleanDay}일) 요소 발견 -> 단 1회 클릭 실행!`);
            await clickDateElementOnce(dateEl);

            // 클릭 직후 추가 클릭 절대 방지 및 골프몬 화면 목록 갱신 대기 (350ms)
            await sleep(350);
            return true;
        }

        await sleep(250);
    }

    console.warn(`[가격수정] 상단 날짜 (${cleanDay}일) 요소를 찾지 못함 (통과)`);
    return false;
}

async function selectListRegion(regionName) {
    if (!regionName) return true;
    const cleanReg = regionName.trim();
    if (!cleanReg) return true;

    console.log(`[가격수정] 지역 (${cleanReg}) 탭 선택 시도...`);
    const tabs = Array.from(document.querySelectorAll('.q-tabs .q-tab, .q-tab, [role="tab"], button, .q-btn, div'))
        .filter(el => el.offsetHeight > 0 && el.children.length <= 2);

    // 1차: 정확한 텍스트 일치 탭 탐색
    let regTab = tabs.find(t => t.textContent.trim() === cleanReg);

    // 2차: 공백/슬래시 정규화 매칭 (예: '인천/경인' -> '인천경인')
    if (!regTab) {
        const normTarget = cleanReg.replace(/[\s/]/g, '');
        regTab = tabs.find(t => {
            const normTab = t.textContent.trim().replace(/[\s/]/g, '');
            return normTab === normTarget || normTab.includes(normTarget) || normTarget.includes(normTab);
        });
    }

    if (regTab) {
        const isActive = regTab.classList.contains('q-tab--active') || 
                         regTab.getAttribute('aria-selected') === 'true' ||
                         regTab.classList.contains('text-black') ||
                         regTab.classList.contains('active');
        if (!isActive) {
            console.log(`[가격수정] 지역 탭 (${cleanReg}) 즉시 클릭 실행`);
            const clickTarget = regTab.closest('.q-tab, button, [role="tab"]') || regTab;
            await humanClick(clickTarget);
            try { clickTarget.click(); } catch(e) {}
            await sleep(350);
        } else {
            console.log(`[가격수정] 지역 탭 (${cleanReg}) 이미 선택됨`);
        }
    } else {
        console.warn(`[가격수정] 지역 탭 (${cleanReg})을 찾지 못함 (통과)`);
    }
    return true;
}

// ----------------------------------------------------
// 골프몬 양도/조인 구분 필터 자동화 (전체/양도/조인 pill 드롭다운 연동)
// ----------------------------------------------------
function findCategoryFilterButton() {
    // 1순위: '골프장' 텍스트가 있는 pill 버튼의 좌측 형제 버튼
    const allBtns = Array.from(document.querySelectorAll('button, .q-btn, [role="button"], div'))
        .filter(el => {
            if (el.offsetHeight <= 0 || el.offsetWidth <= 0) return false;
            const r = el.getBoundingClientRect();
            if (r.top < 100 || r.top > 400) return false;
            return true;
        });

    const golfBtn = allBtns.find(el => {
        const txt = (el.innerText || el.textContent || '').trim().replace(/\s+/g, '');
        return txt === '골프장' || txt.startsWith('골프장');
    });

    if (golfBtn) {
        const gClick = golfBtn.closest('button, .q-btn, [role="button"]') || golfBtn;
        const gRect = gClick.getBoundingClientRect();

        // gClick과 같은 Y 레벨(오차 25px 이내)이면서 gClick보다 왼쪽에 있는 pill 버튼
        const leftPills = allBtns.filter(el => {
            if (el === gClick || el.contains(gClick) || gClick.contains(el)) return false;
            if (el.offsetHeight <= 0 || el.offsetWidth <= 0) return false;
            const r = el.getBoundingClientRect();
            if (Math.abs(r.top - gRect.top) > 25) return false;
            if (r.right > gRect.left + 5) return false; // 골프장 버튼보다 좌측
            if (r.width > 140 || r.height > 65) return false;
            return true;
        });

        if (leftPills.length > 0) {
            leftPills.sort((a, b) => b.getBoundingClientRect().right - a.getBoundingClientRect().right);
            return leftPills[0].closest('button, .q-btn, [role="button"]') || leftPills[0];
        }
    }

    // 2순위: 텍스트가 '전체', '양도', '조인' 중 하나인 상단 좌측 pill 버튼 (Y: 100~380, X < 45%)
    const categoryPills = allBtns.filter(el => {
        const r = el.getBoundingClientRect();
        if (r.left > window.innerWidth * 0.45) return false;
        if (r.width > 140 || r.height > 65) return false;
        const txt = (el.innerText || el.textContent || '').trim().replace(/\s+/g, '');
        return txt === '전체' || txt === '양도' || txt === '조인' ||
               txt.startsWith('전체') || txt.startsWith('양도') || txt.startsWith('조인');
    });

    if (categoryPills.length > 0) {
        categoryPills.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
        return categoryPills[0].closest('button, .q-btn, [role="button"]') || categoryPills[0];
    }

    return null;
}

async function applyCategoryFilter(targetType) {
    if (!targetType || (targetType !== '양도' && targetType !== '조인')) return false;

    console.log(`[가격수정] 구분(양도/조인) 필터 확인 -> 목표: [${targetType}]`);

    // 1. 구분 필터 pill 버튼 탐색 (최대 5회)
    let categoryBtn = null;
    for (let attempt = 0; attempt < 5; attempt++) {
        categoryBtn = findCategoryFilterButton();
        if (categoryBtn) break;
        await sleep(150);
    }

    if (!categoryBtn) {
        console.warn("[가격수정] 구분 필터 버튼을 찾지 못함 (통과)");
        return false;
    }

    // 2. 이미 해당 필터가 선택되어 있는지 확인
    const curTxt = (categoryBtn.innerText || categoryBtn.textContent || '').trim().replace(/\s+/g, '');
    console.log(`[가격수정] 현재 구분 필터 상태: [${curTxt}] (목표: [${targetType}])`);
    if (curTxt.includes(targetType)) {
        console.log(`[가격수정] 구분 필터가 이미 [${targetType}]로 설정되어 있습니다. (유지)`);
        return true;
    }

    // 3. 버튼 클릭하여 하단 선택 모달 오픈
    console.log(`[가격수정] 구분 필터 버튼 클릭 -> 선택 모달 오픈`);
    categoryBtn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'instant' });
    categoryBtn.style.setProperty('outline', '3px solid #00e676', 'important');
    await sleep(80);
    await humanClick(categoryBtn);
    try { categoryBtn.click(); } catch(e) {}

    // 4. 모달에서 targetType 옵션 클릭 (최대 10회 대기)
    for (let w = 0; w < 10; w++) {
        await sleep(150);
        const dialog = document.querySelector('.q-dialog:not([style*="display: none"]), .q-bottom-sheet, .q-menu, [role="dialog"], [role="listbox"]');
        const searchScope = dialog || document.body;
        const options = Array.from(searchScope.querySelectorAll('.q-item, [role="option"], button, div, span'))
            .filter(el => {
                if (el.offsetHeight <= 0) return false;
                if (!dialog && el.closest('.q-card, div[class*="card"]')) return false;
                const t = (el.innerText || el.textContent || '').trim().replace(/\s+/g, '');
                return t === targetType;
            });

        if (options.length > 0) {
            const leaf = options.sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length)[0];
            const opt = leaf.closest('.q-item, [role="option"], button, .cursor-pointer') || leaf;
            opt.style.setProperty('outline', '3px solid #ff9800', 'important');
            await sleep(80);
            await humanClick(opt);
            try { opt.click(); } catch(e) {}
            console.log(`[가격수정] 모달 내 [${targetType}] 클릭 완료!`);
            await sleep(350);
            return true;
        }
    }

    console.warn(`[가격수정] 구분 필터 모달 내에서 [${targetType}] 옵션을 찾지 못함`);
    return false;
}

function normalizeCourseForMatch(str) {
    let s = (str || '').toLowerCase();
    // CC, GC, 골프클럽 등 접미사 제거
    s = s.replace(/cc|gc|골프장|골프클럽|골프코스/gi, '');
    // 영문/한글 브랜드 및 혼용 표기 통일
    s = s.replace(/club\s*d/gi, '클럽디')
         .replace(/club/gi, '클럽')
         .replace(/route\s*52/gi, '루트52')
         .replace(/route/gi, '루트')
         .replace(/spring/gi, '스프링')
         .replace(/orange/gi, '오렌지')
         .replace(/smart/gi, '스마트')
         .replace(/pine/gi, '파인')
         .replace(/lake/gi, '레이크')
         .replace(/hill/gi, '힐')
         .replace(/valley/gi, '밸리')
         .replace(/벨리/g, '밸리')
         .replace(/골프존카운티/g, '골프존')
         .replace(/golfzon/gi, '골프존')
         .replace(/안성q/gi, '안성')
         .replace(/안성큐/g, '안성')
         .replace(/q/gi, '큐');
    return s.replace(/[^a-z0-9가-힣]/g, '');
}

// ========================================================
// 골프몬 내글 가격수정 자동화 매크로 (등록 상품 내역 -> 상세 -> 수정 -> 그린피 입력 -> 수정하기)
// ========================================================

// 마우스, 포인터 통합 물리 이벤트 시뮬레이션 (Quasar 데스크톱/반응형 최적화)
async function simulateFullClick(el, customX = null, customY = null) {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = customX !== null ? customX : (rect.left + rect.width / 2);
    const y = customY !== null ? customY : (rect.top + rect.height / 2);
    const opts = {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: x,
        clientY: y,
        buttons: 1,
        pointerId: 1,
        pointerType: 'mouse',
        isPrimary: true
    };

    // 1. PointerEvent 시퀀스
    try {
        el.dispatchEvent(new PointerEvent('pointerover', opts));
        el.dispatchEvent(new PointerEvent('pointerenter', opts));
        el.dispatchEvent(new PointerEvent('pointerdown', opts));
    } catch(e) {}

    // 2. MouseEvent 시퀀스
    el.dispatchEvent(new MouseEvent('mouseenter', opts));
    el.dispatchEvent(new MouseEvent('mouseover', opts));
    el.dispatchEvent(new MouseEvent('mousedown', opts));
    await sleep(40);
    try { el.dispatchEvent(new PointerEvent('pointerup', opts)); } catch(e) {}
    el.dispatchEvent(new MouseEvent('mouseup', opts));
    el.dispatchEvent(new MouseEvent('click', opts));
    try { el.click(); } catch(e) {}
}

// 카드 내에서 양도/조인 구별 판별 함수 (뱃지/칩/텍스트 정밀 검사)
function inspectCardPostType(cardEl, rawTxt = '') {
    const text = (rawTxt || cardEl.innerText || cardEl.textContent || '').toLowerCase();

    // 1. 뱃지/칩 요소 검사 (.q-badge, .q-chip, span, div)
    const badgeElements = Array.from(cardEl.querySelectorAll('.q-badge, [class*="badge"], .q-chip, span, div'))
        .filter(el => el.offsetHeight > 0 && el.children.length <= 1);

    let hasTransferBadge = false;
    let hasJoinBadge = false;
    let hasJoinChip = false;
    let hasTransferTag = false;

    for (const b of badgeElements) {
        const bTxt = (b.innerText || b.textContent || '').trim().replace(/\s+/g, '');
        if (/^양도\d*건?$/.test(bTxt) || bTxt === '양도') {
            hasTransferBadge = true;
        }
        if (/^조인\d*건?$/.test(bTxt) || bTxt === '조인') {
            hasJoinBadge = true;
        }
        if (/부부|커플|[남여]성|\d명/.test(bTxt)) {
            hasJoinChip = true;
        }
        if (/4인필수|4인|1팀/.test(bTxt)) {
            hasTransferTag = true;
        }
    }

    // 2. 전체 텍스트 보조 정규식 검사
    const textHasTransferBadge = /양도\s*\d*\s*건/.test(text);
    const textHasJoinBadge = /조인\s*\d*\s*건/.test(text);
    const textHasJoinChip = /부부|커플|\d+명|남성|여성/.test(text);
    const textHasTransferTag = /4인\s*필수|4인필수/.test(text);

    const isTransfer = hasTransferBadge || textHasTransferBadge || (hasTransferTag && !hasJoinBadge && !hasJoinChip);
    const isJoin = hasJoinBadge || textHasJoinBadge || hasJoinChip || textHasJoinChip;

    if (isTransfer && !isJoin) return '양도';
    if (isJoin && !isTransfer) return '조인';
    if (hasTransferBadge && !hasJoinBadge) return '양도';
    if (hasJoinBadge && !hasTransferBadge) return '조인';
    return isTransfer ? '양도' : (isJoin ? '조인' : 'unknown');
}

// 화면 내 일치하는 개별 타임 카드 탐색 헬퍼 (양방향 정규화 + 브랜드 접두어 제거 핵심키워드 + 양도/조인 엄격구별 + 가격 일치 가중치 + 리프 카드 선별)
function findMatchingCardElement(golfName, rawGolfName, timeStr, targetRoomType = '', prevFee = '', targetFee = '') {
    const digitsOnlyTime = (timeStr || '').replace(/[^\d]/g, '');
    const hh = digitsOnlyTime.length === 4 ? digitsOnlyTime.substring(0, 2) : (digitsOnlyTime.length === 3 ? '0' + digitsOnlyTime[0] : '');
    const mm = digitsOnlyTime.length >= 3 ? digitsOnlyTime.slice(-2) : '';
    const colonTime = (hh && mm) ? `${hh}:${mm}` : '';
    const shortColonTime = (hh && mm) ? `${parseInt(hh, 10)}:${mm}` : '';

    const normG1 = normalizeCourseForMatch(golfName);
    const normG2 = normalizeCourseForMatch(rawGolfName);

    // 브랜드 접두어를 뗀 핵심 키워드 (예: '클럽디더플레이어스' -> '더플레이어스', '골프존안성' -> '안성')
    const strippedG1 = normG1.replace(/^(클럽디|클럽|골프존|루트52|루트|포웰|한림|베어즈|스프링|세이지|sg|tg|이글|파인)/g, '');
    const strippedG2 = normG2.replace(/^(클럽디|클럽|골프존|루트52|루트|포웰|한림|베어즈|스프링|세이지|sg|tg|이글|파인)/g, '');

    // 가격 비교 힌트 (예: 10만 -> 100000, 9.5만 -> 95000)
    const cleanPrevNum = (prevFee || '').toString().replace(/[^\d.]/g, '');
    const cleanTargetNum = (targetFee || '').toString().replace(/[^\d.]/g, '');

    // 화면 내 카드 형태의 모든 후보 컨테이너 수집
    const allDivs = Array.from(document.querySelectorAll('.q-card, .q-item, div[class*="card"], div[class*="border"], div'))
        .filter(el => {
            if (el.offsetHeight < 45 || el.offsetHeight > 360) return false;
            if (el.offsetWidth < 120) return false;
            const txt = el.innerText || el.textContent || '';
            if (!/\d{1,2}:\d{2}/.test(txt) || !/원/.test(txt)) return false;
            return true;
        });

    const matched = [];
    for (const el of allDivs) {
        const rawTxt = (el.innerText || el.textContent || '').toLowerCase();
        const normCard = normalizeCourseForMatch(rawTxt);
        const digitsInCard = rawTxt.replace(/[^\d]/g, '');

        // 1. 시간 일치 확인 (07:36, 7:36, 0736 모두 대응)
        const timeMatches = (colonTime && rawTxt.includes(colonTime)) ||
                            (shortColonTime && rawTxt.includes(shortColonTime)) ||
                            (digitsOnlyTime && digitsInCard.includes(digitsOnlyTime));
        if (!timeMatches) continue;

        // 2. 구장명 일치 점수 산정 (완전일치 > 상호포함 > 핵심키워드 일치)
        let golfScore = 0;
        if (normG1 && normCard.includes(normG1)) golfScore = 100;
        else if (normG2 && normCard.includes(normG2)) golfScore = 95;
        else if (normCard && normG1 && normG1.includes(normCard)) golfScore = 90;
        else if (strippedG1 && strippedG1.length >= 2 && normCard.includes(strippedG1)) golfScore = 85;
        else if (strippedG2 && strippedG2.length >= 2 && normCard.includes(strippedG2)) golfScore = 80;
        else if (normG1.length >= 2 && normCard.includes(normG1.substring(0, 2))) golfScore = 60;

        if (golfScore === 0) continue;

        // 3. 양도 / 조인 룸타입 엄격 판별 및 상충 카드 원천 배제
        const isTargetTransfer = (targetRoomType || '').includes('양도');
        const isTargetJoin = (targetRoomType || '').includes('조인') || 
                             (targetRoomType || '').includes('선티') || 
                             (targetRoomType || '').includes('대기');

        const cardType = inspectCardPostType(el, rawTxt);

        if (isTargetTransfer) {
            // 양도 건을 찾는데 카드가 명백히 '조인'인 경우 -> 무조건 탈락!
            if (cardType === '조인') continue;
        } else if (isTargetJoin) {
            // 조인 건을 찾는데 카드가 명백히 '양도'인 경우 -> 무조건 탈락!
            if (cardType === '양도') continue;
        }

        let roomScore = 0;
        if (isTargetTransfer && cardType === '양도') {
            roomScore = 150; // 양도 일치 대폭 가산
        } else if (isTargetJoin && cardType === '조인') {
            roomScore = 150; // 조인 일치 대폭 가산
        }

        // 4. 가격 일치 힌트 점수 (이전 가격과 일치하는 글을 우선 선택, 이미 수정된 금액의 글은 후순위)
        let feeScore = 0;
        if (cleanPrevNum && (rawTxt.includes(`${cleanPrevNum}만`) || rawTxt.includes(`${Math.round(parseFloat(cleanPrevNum) * 10000)}`))) {
            feeScore += 25;
        }
        if (cleanTargetNum && (rawTxt.includes(`${cleanTargetNum}만`) || rawTxt.includes(`${Math.round(parseFloat(cleanTargetNum) * 10000)}`))) {
            feeScore -= 20; // 이미 변경하려는 가격이 적혀있는 글은 이미 수정된 것으로 보고 감점
        }

        matched.push({ el, totalScore: golfScore + roomScore + feeScore });
    }

    if (matched.length === 0) return null;

    // 일치 요소 중 다른 일치 요소를 자식으로 포함하고 있는 부모 컨테이너(row, page 등)는 배제 (리프 카드만)
    const leafCards = matched.filter(item => {
        return !matched.some(other => other !== item && item.el.contains(other.el));
    });

    const candidates = leafCards.length > 0 ? leafCards : matched;
    candidates.sort((a, b) => b.totalScore - a.totalScore);

    return candidates[0].el;
}


// 수정 폼 화면 여부 판별 (← 양도 수정 / ← 조인 수정 / 하단 '수정하기' 버튼)
function isEditPage() {
    const headerEl = document.querySelector('.q-header, header, .q-toolbar');
    const hTxt = (headerEl ? headerEl.textContent : '').replace(/\s+/g, '');
    if (hTxt.includes('수정') && (hTxt.includes('양도') || hTxt.includes('조인'))) return true;

    return Array.from(document.querySelectorAll('button, .q-btn, div, span'))
        .some(el => {
            if (el.offsetHeight <= 0) return false;
            const r = el.getBoundingClientRect();
            if (r.top < 80) return false; // 상단 헤더 영역 제외
            const txt = (el.innerText || el.textContent || '').trim().replace(/\s+/g, '');
            return txt === '수정하기' || txt === '수정완료';
        });
}

// 현재 열린 수정 화면이 대상 아이템(구장, 시간 등)과 일치하는지 정밀 판별
function isCurrentlyOnTargetEditPage(item) {
    if (!isEditPage() || !item) return false;
    const bodyText = (document.body.innerText || '').toLowerCase();
    const timeDigits = (item.time || '').replace(/[^\d]/g, '');

    // 폼 내의 시간 입력 필드 값 검사
    const timeInputs = Array.from(document.querySelectorAll('input')).map(inp => (inp.value || '').replace(/[^\d]/g, ''));
    const timeInputMatched = Boolean(timeDigits && timeInputs.some(v => v === timeDigits || v.includes(timeDigits)));

    const normGolf = normalizeCourseForMatch(item.golf);
    const rawGolf = normalizeCourseForMatch(item.rawGolf);
    const normBody = normalizeCourseForMatch(bodyText);

    const golfMatched = Boolean((normGolf && normBody.includes(normGolf)) || (rawGolf && normBody.includes(rawGolf)));
    const timeMatched = Boolean(timeInputMatched || (timeDigits && bodyText.replace(/[^\d]/g, '').includes(timeDigits)));

    return Boolean(golfMatched && timeMatched);
}

// 상세 페이지 상단 우측 더보기(⋮) 버튼 탐색 헬퍼 (엄격한 우상단 좌표 + more_vert 아이콘 정밀 타겟팅)
function findDetailMoreButton() {
    // 1순위: 화면 우측 상단(y: 0~75px, x: 우측 30% 이내)에 위치한 아이콘/버튼 중 more_vert, ⋮, more 또는 최우측 클릭 가능 요소
    const topElements = Array.from(document.querySelectorAll('button, .q-btn, i, .q-icon, [role="button"], .cursor-pointer, span, div'))
        .filter(el => {
            if (el.offsetHeight <= 0 || el.offsetWidth <= 0) return false;
            const r = el.getBoundingClientRect();
            // 화면 상단 75px 이내 & 우측 30% 이내 (하단 프로필/텍스트 요소 원천 배제!)
            if (r.top < -5 || r.top > 75) return false;
            if (r.bottom > 90) return false;
            if (r.right < window.innerWidth * 0.7) return false;
            // 너무 큰 컨테이너 제외
            if (r.width > 90 || r.height > 90) return false;
            return true;
        });

    // 1-1. more_vert, more, ⋮, \ue5d4 텍스트/아이콘을 직접 포함하는 우상단 요소
    const iconMatch = topElements.find(el => {
        const txt = (el.innerText || el.textContent || '').trim().toLowerCase();
        return txt === 'more_vert' || txt === 'more' || txt === '⋮' || txt === '\ue5d4' || txt.includes('more_vert');
    });
    if (iconMatch) {
        return iconMatch.closest('button, .q-btn, [role="button"], .cursor-pointer') || iconMatch;
    }

    // 1-2. 우상단 후보 중 가장 우측에 위치한 버튼/아이콘 요소
    if (topElements.length > 0) {
        topElements.sort((a, b) => b.getBoundingClientRect().right - a.getBoundingClientRect().right);
        const rightmost = topElements[0];
        return rightmost.closest('button, .q-btn, [role="button"], .cursor-pointer') || rightmost;
    }

    // 2순위: 헤더 요소(.q-header, header, .q-toolbar) 내부에서 우측 탐색
    const headers = Array.from(document.querySelectorAll('.q-header, header, .q-toolbar, [class*="header"], [class*="toolbar"]'))
        .filter(el => el.offsetHeight > 0 && el.getBoundingClientRect().top <= 50);

    for (const h of headers) {
        const hRect = h.getBoundingClientRect();
        const btns = Array.from(h.querySelectorAll('button, .q-btn, i, [role="button"], .cursor-pointer'))
            .filter(el => {
                if (el.offsetHeight <= 0) return false;
                const r = el.getBoundingClientRect();
                return r.right > (hRect.left + hRect.width * 0.75) && r.width < 90 && r.height < 90;
            });

        if (btns.length > 0) {
            btns.sort((a, b) => b.getBoundingClientRect().right - a.getBoundingClientRect().right);
            return btns[0].closest('button, .q-btn, [role="button"], .cursor-pointer') || btns[0];
        }
    }

    // 3순위: 뷰포트 우측 상단 물리적 좌표 (우측 여백 20~30px, 상단 25px)
    const points = [
        { x: window.innerWidth - 20, y: 25 },
        { x: window.innerWidth - 25, y: 30 },
        { x: window.innerWidth - 15, y: 20 },
        { x: window.innerWidth - 30, y: 25 }
    ];

    for (const pt of points) {
        const el = document.elementFromPoint(pt.x, pt.y);
        if (el && el !== document.body && el !== document.documentElement) {
            const btn = el.closest('button, .q-btn, [role="button"], .cursor-pointer') || el;
            if (btn && btn.getBoundingClientRect().top <= 75) {
                return btn;
            }
        }
    }

    return null;
}

// 팝업 메뉴 내 '수정' 항목 탐색 헬퍼
function findMenuEditItem() {
    // 1. Quasar 팝업 메뉴 컨테이너 우선 탐색
    const menuContainers = Array.from(document.querySelectorAll('.q-menu, [role="menu"], .q-portal, .q-dialog'))
        .filter(el => el.offsetHeight > 0);

    for (const menu of menuContainers) {
        const items = Array.from(menu.querySelectorAll('*')).filter(el => {
            if (el.offsetHeight <= 0) return false;
            const txt = (el.innerText || el.textContent || '').trim().replace(/\s+/g, '');
            return txt === '수정' || txt === '수정하기';
        });

        if (items.length > 0) {
            return items[0].closest('.q-item, button, .q-btn, [role="menuitem"], .cursor-pointer') || items[0];
        }
    }

    // 2. 전체 문서에서 텍스트가 '수정'인 클릭 가능 메뉴 항목 탐색 (타임스탬프 제외)
    const allCandidates = Array.from(document.querySelectorAll('.q-item, button, .q-btn, [role="menuitem"], .cursor-pointer, div, span'))
        .filter(el => {
            if (el.offsetHeight <= 0) return false;
            const txt = (el.innerText || el.textContent || '').trim().replace(/\s+/g, '');
            // 헤더의 타임스탬프 (예: "2026/10/19(월) 20:27 수정")나 긴 문장 제외
            if (txt.length > 5 || txt.includes('/') || txt.includes(':') || txt.includes('(')) return false;
            return txt === '수정' || txt === '수정하기';
        });

    if (allCandidates.length > 0) {
        return allCandidates[0].closest('.q-item, button, .q-btn, [role="menuitem"], .cursor-pointer') || allCandidates[0];
    }

    return null;
}

// 현재 화면이 상세 페이지인지 판별 (목록 화면의 가짜 양성 100% 방지)
function isDetailPage() {
    if (isEditPage()) return false;

    const bodyTxt = document.body ? (document.body.innerText || '').replace(/\s+/g, '') : '';
    if (bodyTxt.includes('등록상품내역')) return false;

    const curH = document.querySelector('.q-header, header, .q-toolbar');
    const hTxt = curH ? (curH.textContent || '').trim().replace(/\s+/g, '') : '';

    const rawBodyTxt = document.body.innerText || '';
    const hasDetailKeywords = rawBodyTxt.includes('상품정보') || rawBodyTxt.includes('위약규정') || rawBodyTxt.includes('조인 등록하기');
    const hasDetailHeader = hTxt.includes('양도') || hTxt.includes('조인');
    const moreBtn = findDetailMoreButton();

    if (hasDetailHeader && (hasDetailKeywords || moreBtn)) return true;
    if (hasDetailKeywords && moreBtn) return true;
    if (hasDetailKeywords && (rawBodyTxt.includes('홀수') || rawBodyTxt.includes('일시'))) return true;

    return false;
}

// 현재 화면이 이미 대상 글의 상세 페이지인지 판별 헬퍼
function isCurrentlyOnTargetDetailPage(item) {
    if (!isDetailPage()) return false;
    const bodyText = (document.body.innerText || '').toLowerCase();
    const timeDigits = (item.time || '').replace(/[^\d]/g, '');
    const hh = timeDigits.length === 4 ? timeDigits.substring(0, 2) : (timeDigits.length === 3 ? '0' + timeDigits[0] : '');
    const mm = timeDigits.length >= 3 ? timeDigits.slice(-2) : '';
    const colonTime = (hh && mm) ? `${hh}:${mm}` : '';
    const shortColonTime = (hh && mm) ? `${parseInt(hh, 10)}:${mm}` : '';

    const normGolf = normalizeCourseForMatch(item.golf);
    const rawGolf = normalizeCourseForMatch(item.rawGolf);
    const strippedGolf = normGolf.replace(/^(클럽디|클럽|골프존|루트52|루트|포웰|한림|베어즈|스프링|세이지|sg|tg|이글|파인)/g, '');

    const normBody = normalizeCourseForMatch(bodyText);
    const timeMatch = !timeDigits || 
                      (colonTime && bodyText.includes(colonTime)) ||
                      (shortColonTime && bodyText.includes(shortColonTime)) ||
                      (timeDigits && bodyText.replace(/[^\d]/g, '').includes(timeDigits)) ||
                      bodyText.includes(item.time);

    const golfMatch = (normGolf && normBody.includes(normGolf)) ||
                      (rawGolf && normBody.includes(rawGolf)) ||
                      (strippedGolf && strippedGolf.length >= 2 && normBody.includes(strippedGolf));

    if (!timeMatch || !golfMatch) return false;

    // 양도/조인 타입 구별 판별
    const isTargetTransfer = (item.roomType || '').includes('양도');
    const isTargetJoin = (item.roomType || '').includes('조인') || 
                         (item.roomType || '').includes('선티') || 
                         (item.roomType || '').includes('대기');

    const curH = document.querySelector('.q-header, header, .q-toolbar');
    const hTxt = curH ? (curH.textContent || '').trim().replace(/\s+/g, '') : '';
    const pageIsTransfer = hTxt.includes('양도') || /양도\s*문의|양도\s*신청/.test(bodyText);
    const pageIsJoin = hTxt.includes('조인') || /조인\s*신청|조인\s*등록/.test(bodyText);

    if (isTargetTransfer && pageIsJoin && !pageIsTransfer) return false;
    if (isTargetJoin && pageIsTransfer && !pageIsJoin) return false;

    return true;
}

async function findAndClickPostCard(golfName, rawGolfName, timeStr, roomType = '', maxScrolls = 8, prevFee = '', targetFee = '') {
    console.log(`[가격수정] 등록 상품 카드 탐색: ${golfName} (${timeStr}) [타입: ${roomType || '미지정'}] (기존: ${prevFee || '미지정'}, 목표: ${targetFee || '미지정'})...`);

    // 0. 만약 이미 대상 글의 상세 페이지에 진입해 있다면 즉시 성공 반환!
    if (isCurrentlyOnTargetDetailPage({ golf: golfName, rawGolf: rawGolfName, time: timeStr, roomType: roomType })) {
        console.log(`[가격수정] 이미 대상 글(${golfName} ${timeStr} [${roomType}])의 상세 페이지에 위치해 있습니다.`);
        return true;
    }

    // 탐색 전 스크롤 맨 위로 리셋
    window.scrollTo(0, 0);
    document.querySelectorAll('.q-scrollarea__container, .scroll, .q-page, body').forEach(el => {
        el.scrollTop = 0;
    });
    await sleep(250);

    for (let scroll = 0; scroll < maxScrolls; scroll++) {
        if (shouldStopRegistration) return false;

        const foundCard = findMatchingCardElement(golfName, rawGolfName, timeStr, roomType, prevFee, targetFee);

        if (foundCard) {
            console.log(`[가격수정] 일치하는 등록 타임 카드 발견! [${golfName} ${timeStr}]`);
            foundCard.scrollIntoView({ block: 'center', behavior: 'instant' });
            foundCard.style.setProperty('outline', '4px solid #7C3AED', 'important');
            foundCard.style.setProperty('box-shadow', '0 0 14px #7C3AED', 'important');
            await sleep(300);

            // 1순위: 카드 자체 및 내부 클릭 가능한 링크/항목 클릭
            const clickTarget = foundCard.querySelector('.cursor-pointer:not(.q-badge):not(.q-chip), a, .q-item') || foundCard;
            await humanClick(clickTarget);
            try { clickTarget.click(); } catch(e) {}
            if (clickTarget !== foundCard) {
                try { foundCard.click(); } catch(e) {}
            }

            // 상세 페이지 이동 대기 (최대 3.5초까지 충분히 대기)
            for (let w = 0; w < 35; w++) {
                await sleep(100);
                if (isDetailPage()) {
                    console.log(`[가격수정] 상세 페이지 진입 성공! (${(w * 0.1).toFixed(1)}초 소요)`);
                    await sleep(400);
                    return true;
                }
            }

            // 2순위: 카드의 중앙 좌표 탭 시도 (화면 렌더링 좌표 직접 클릭)
            const rect = foundCard.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const centerEl = document.elementFromPoint(cx, cy) || foundCard;
            await humanClick(centerEl, cx, cy);
            try { centerEl.click(); } catch(e) {}

            for (let w = 0; w < 25; w++) {
                await sleep(100);
                if (isDetailPage()) {
                    console.log(`[가격수정] 상세 페이지 진입 성공! (중앙 탭, ${(w * 0.1).toFixed(1)}초 소요)`);
                    await sleep(400);
                    return true;
                }
            }

            console.warn(`[가격수정] 카드 클릭 후 상세 페이지 진입 미확인 (헤더가 여전히 '등록 상품 내역')`);
            return false;
        }

        // 스크롤 다운
        window.scrollBy(0, 350);
        document.querySelectorAll('.q-scrollarea__container, .scroll, .q-page, body').forEach(el => {
            el.scrollTop += 350;
        });
        await sleep(250);
    }

    console.warn(`[가격수정] ${golfName} (${timeStr}) 카드를 찾지 못함 -> 스크롤 상단 원복`);
    window.scrollTo(0, 0);
    document.querySelectorAll('.q-scrollarea__container, .scroll, .q-page, body').forEach(el => {
        el.scrollTop = 0;
    });
    return false;
}

async function openMenuAndClickEdit(maxAttempts = 20) {
    console.log("[가격수정] 상세 페이지 우측 상단 더보기 메뉴(⋮) 클릭 시도...");

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        if (shouldStopRegistration) return false;

        // 이미 수정 화면에 진입한 상태라면 성공 반환
        if (isEditPage()) {
            console.log("[가격수정] 이미 수정 폼 진입 확인!");
            return true;
        }

        const menuBtn = findDetailMoreButton();
        if (menuBtn) {
            const targetBtn = menuBtn.closest('button, .q-btn, [role="button"]') || menuBtn;
            targetBtn.style.setProperty('outline', '4px solid #7C3AED', 'important');
            targetBtn.style.setProperty('box-shadow', '0 0 12px #7C3AED', 'important');

            // 1. 단일 마우스/포인터 클릭 1회 실행
            await humanClick(targetBtn);
            try { targetBtn.click(); } catch(e) {}

            // 팝업 메뉴('수정')가 렌더링될 때까지 대기 탐색
            let editTarget = null;
            for (let m = 0; m < 12; m++) {
                await sleep(100);
                editTarget = findMenuEditItem();
                if (editTarget) break;
            }

            // 1회 클릭으로 메뉴가 미감지되었을 경우 좌표 기반 정밀 탭 보조
            if (!editTarget) {
                const rect = targetBtn.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) {
                    const cx = rect.left + rect.width / 2;
                    const cy = rect.top + rect.height / 2;
                    const pEl = document.elementFromPoint(cx, cy) || targetBtn;
                    await humanClick(pEl, cx, cy);
                    try { pEl.click(); } catch(e) {}
                    for (let m = 0; m < 10; m++) {
                        await sleep(100);
                        editTarget = findMenuEditItem();
                        if (editTarget) break;
                    }
                }
            }

            // 2. 팝업 메뉴 내 '수정' 항목 클릭
            if (editTarget) {
                console.log("[가격수정] 팝업 메뉴 내 '수정' 항목 발견! 클릭합니다.");
                editTarget.style.setProperty('outline', '4px solid #00e676', 'important');
                await sleep(150);
                await humanClick(editTarget);
                try { editTarget.click(); } catch(e) {}

                // 수정 폼 화면 진입 대기 (최대 3.5초)
                for (let w = 0; w < 25; w++) {
                    await sleep(150);
                    if (isEditPage()) {
                        console.log("[가격수정] 수정 폼 화면 진입 성공!");
                        await sleep(300);
                        return true;
                    }
                }
                return true;
            }
        }

        await sleep(300);
    }

    console.error("[가격수정] 우측 상단 더보기(⋮) -> '수정' 메뉴 진입 실패");
    return false;
}

// 수정 폼 화면에서 인원 변경 헬퍼 ("인원이 달라졌으면 인원도 바꾸고")
async function updatePeopleCountInEditForm(targetPeopleNum) {
    if (!targetPeopleNum) return;
    const targetText = `${targetPeopleNum}명`;
    console.log(`[가격수정] 인원 변경 탐색 (목표: ${targetText})...`);

    const allButtons = Array.from(document.querySelectorAll('button, .q-btn, label, [role="button"]'))
        .filter(el => el.offsetHeight > 0);

    let targetBtn = null;
    for (const btn of allButtons) {
        const txt = btn.textContent.trim().replace(/\s+/g, '');
        if (txt === targetText || txt === `${targetPeopleNum}인`) {
            targetBtn = btn;
            break;
        }
    }

    if (!targetBtn) {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while ((node = walker.nextNode())) {
            const txt = node.textContent.trim().replace(/\s+/g, '');
            if (txt === targetText || txt === `${targetPeopleNum}인`) {
                const p = node.parentElement;
                if (p && p.offsetHeight > 0 && !['SCRIPT', 'STYLE'].includes(p.tagName)) {
                    targetBtn = p.closest('button, .q-btn, label, [role="button"]') || p;
                    break;
                }
            }
        }
    }

    if (targetBtn) {
        const clickTarget = targetBtn.closest('button, .q-btn, label, [role="button"]') || targetBtn;

        // 이미 해당 인원이 선택되어 있는지 확인 (중복 클릭/토글 방지)
        const isAlreadyActive = clickTarget.classList.contains('bg-primary') ||
                                clickTarget.classList.contains('q-btn--active') ||
                                clickTarget.classList.contains('active') ||
                                clickTarget.classList.contains('text-white') ||
                                clickTarget.getAttribute('aria-pressed') === 'true' ||
                                clickTarget.getAttribute('aria-selected') === 'true';

        if (isAlreadyActive) {
            console.log(`[가격수정] 인원 [${targetText}] 이미 선택되어 있습니다.`);
            return true;
        }

        console.log(`[가격수정] 인원 [${targetText}] 클릭하여 변경합니다.`);
        clickTarget.scrollIntoView({ block: 'center' });
        clickTarget.style.setProperty('outline', '4px solid #00e676', 'important');
        await humanClick(clickTarget);
        try { clickTarget.click(); } catch(e) {}
        console.log(`[가격수정] 인원 [${targetText}] 변경 클릭 완료!`);
        return true;
    } else {
        console.warn(`[가격수정] 인원 [${targetText}] 버튼을 찾지 못함 (통과)`);
    }
}

// 수정 폼 화면에서 조인 조건 선택 헬퍼 ('무관' 등)
async function updateJoinConditionInEditForm(targetCondition = '무관') {
    const cleanTarget = (targetCondition || '무관').trim();
    console.log(`[가격수정] 조건 탐색 및 선택 -> 목표: [${cleanTarget}]...`);

    const allButtons = Array.from(document.querySelectorAll('button, .q-btn, label, [role="button"]'))
        .filter(el => el.offsetHeight > 0);

    let targetBtn = null;
    for (const btn of allButtons) {
        const txt = btn.textContent.trim().replace(/\s+/g, '');
        if (txt === cleanTarget) {
            targetBtn = btn;
            break;
        }
    }

    if (!targetBtn) {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while ((node = walker.nextNode())) {
            const txt = node.textContent.trim().replace(/\s+/g, '');
            if (txt === cleanTarget) {
                const p = node.parentElement;
                if (p && p.offsetHeight > 0 && !['SCRIPT', 'STYLE'].includes(p.tagName)) {
                    targetBtn = p.closest('button, .q-btn, label, [role="button"]') || p;
                    break;
                }
            }
        }
    }

    if (targetBtn) {
        const clickTarget = targetBtn.closest('button, .q-btn, label, [role="button"]') || targetBtn;
        const isAlreadyActive = clickTarget.classList.contains('bg-primary') ||
                                clickTarget.classList.contains('bg-dark') ||
                                clickTarget.classList.contains('q-btn--active') ||
                                clickTarget.classList.contains('active') ||
                                clickTarget.classList.contains('text-white') ||
                                clickTarget.getAttribute('aria-pressed') === 'true' ||
                                clickTarget.getAttribute('aria-selected') === 'true';

        if (isAlreadyActive) {
            console.log(`[가격수정] 조건 [${cleanTarget}] 이미 선택됨`);
            return true;
        }

        console.log(`[가격수정] 조건 [${cleanTarget}] 클릭 선택`);
        clickTarget.scrollIntoView({ block: 'center' });
        clickTarget.style.setProperty('outline', '4px solid #00e676', 'important');
        await humanClick(clickTarget);
        try { clickTarget.click(); } catch(e) {}
        await sleep(250);
        return true;
    }
    return false;
}

// 수정 폼 화면 하단 '수정하기' 버튼 정밀 탐색 헬퍼 (상단 헤더 가짜 양성 100% 배제)
function findEditSubmitButton() {
    // 1. 화면 헤더 영역(.q-header, header, .q-toolbar, top < 80px)은 100% 배제 (헤더 타이틀 가짜 양성 완벽 차단!)
    const allCandidates = Array.from(document.querySelectorAll('button, .q-btn, input[type="submit"], [role="button"], div, span, a'))
        .filter(el => {
            if (el.offsetHeight <= 0 || el.offsetWidth <= 0) return false;
            const r = el.getBoundingClientRect();
            if (r.top < 80) return false; // 상단 헤더 영역 원천 배제!
            if (el.dataset.alreadySubmitted === 'true' || el.disabled) return false; // 이미 제출된 버튼 배제
            if (el.style.pointerEvents === 'none') return false;

            const txt = (el.innerText || el.textContent || '').trim().replace(/\s+/g, '');
            return txt === '수정하기' || txt === '수정완료' || txt === '수정' || txt === '등록하기';
        });

    if (allCandidates.length === 0) {
        // 혹시 '수정'을 포함하는 하단 버튼 탐색 (단, 헤더 제외)
        const subCandidates = Array.from(document.querySelectorAll('button, .q-btn, [role="button"]'))
            .filter(el => {
                if (el.offsetHeight <= 0 || el.offsetWidth <= 0) return false;
                const r = el.getBoundingClientRect();
                if (r.top < 80) return false;
                if (el.dataset.alreadySubmitted === 'true' || el.disabled) return false;
                if (el.style.pointerEvents === 'none') return false;
                const txt = (el.innerText || el.textContent || '').trim().replace(/\s+/g, '');
                return txt.includes('수정') && txt.length <= 6;
            });
        allCandidates.push(...subCandidates);
    }

    if (allCandidates.length === 0) return null;

    // 점수화하여 최적의 제출 버튼 선별:
    // 실제 button / .q-btn / [role="button"] 태그에 높은 가산점
    // 정확한 '수정하기' 텍스트에 가산점
    // 화면 더 하단에 위치할수록 가산점
    allCandidates.sort((a, b) => {
        const aIsBtn = (a.tagName === 'BUTTON' || a.classList.contains('q-btn') || a.getAttribute('role') === 'button') ? 100 : 0;
        const bIsBtn = (b.tagName === 'BUTTON' || b.classList.contains('q-btn') || b.getAttribute('role') === 'button') ? 100 : 0;
        const aExact = (a.innerText || a.textContent || '').trim().replace(/\s+/g, '') === '수정하기' ? 50 : 0;
        const bExact = (b.innerText || b.textContent || '').trim().replace(/\s+/g, '') === '수정하기' ? 50 : 0;
        const aTop = a.getBoundingClientRect().top;
        const bTop = b.getBoundingClientRect().top;
        return (bIsBtn + bExact + bTop / 10) - (aIsBtn + aExact + aTop / 10);
    });

    const best = allCandidates[0];
    return best.closest('button, .q-btn, [role="button"]') || best;
}

// 전역 제출 진행 잠금 플래그 (단 1회 클릭 완벽 보장)
let isEditSubmittingLock = false;

function resetEditSubmitLock() {
    isEditSubmittingLock = false;
    window.__TEE82_SUBMIT_LOCKED__ = false;
}

// '수정하기' 버튼 전용 안정적 클릭 헬퍼 (글 1건당 단 1회 클릭 완벽 보장, 중복/연타 100% 원천 차단)
async function clickSubmitButtonReliably(submitBtn, item = null) {
    if (!submitBtn) return false;

    const currentUrlKey = window.location.href;
    const itemKey = item ? `${item.golf}_${item.date}_${item.time}_${item.fee}` : '';
    window.__TEE82_SUBMITTED_URLS__ = window.__TEE82_SUBMITTED_URLS__ || new Set();
    window.__TEE82_SUBMITTED_ITEMS__ = window.__TEE82_SUBMITTED_ITEMS__ || new Set();

    // 1. 이미 제출되었거나 진행 중인 경우 중복 클릭 절대 불가 (100% 원천 차단)
    if (isEditSubmittingLock ||
        window.__TEE82_SUBMIT_LOCKED__ ||
        window.__TEE82_SUBMITTED_URLS__.has(currentUrlKey) ||
        (itemKey && window.__TEE82_SUBMITTED_ITEMS__.has(itemKey)) ||
        submitBtn.dataset.alreadySubmitted === 'true' ||
        submitBtn.disabled) {
        console.warn("[가격수정] 이미 제출 완료 또는 진행 중인 '수정하기'입니다. 중복 클릭 원천 차단!");
        return true;
    }

    // 전역/로컬 잠금 즉각 활성화
    isEditSubmittingLock = true;
    window.__TEE82_SUBMIT_LOCKED__ = true;
    window.__TEE82_SUBMITTED_URLS__.add(currentUrlKey);
    if (itemKey) window.__TEE82_SUBMITTED_ITEMS__.add(itemKey);

    // 2. 활성 포커스 해제 (입력 필드 v-model 동기화 확정)
    try {
        if (document.activeElement && typeof document.activeElement.blur === 'function') {
            document.activeElement.blur();
        }
    } catch(e) {}
    await sleep(150);

    const targetEl = submitBtn.closest('button, .q-btn, [role="button"]') || submitBtn;

    // 3. 화면 내 스크롤 정렬 및 시각적 강조
    targetEl.scrollIntoView({ block: 'center', behavior: 'instant' });
    targetEl.style.setProperty('outline', '5px solid #ff9800', 'important');
    targetEl.style.setProperty('box-shadow', '0 0 16px #ff9800', 'important');
    await sleep(150);

    // 4. 단 1회의 native 클릭만 정밀 실행 (어떠한 보조 이벤트나 중복 클릭도 일절 배제!)
    try {
        targetEl.click();
    } catch(e) {
        const rect = targetEl.getBoundingClientRect();
        const opts = { clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2, bubbles: true, cancelable: true, view: window };
        targetEl.dispatchEvent(new MouseEvent('click', opts));
    }

    // 5. 클릭 직후 모든 관련 버튼 요소에 즉각적/물리적 비활성화 영구 적용 (2회차 클릭 원천 소멸)
    [targetEl, submitBtn].forEach(el => {
        if (!el) return;
        el.dataset.alreadySubmitted = 'true';
        el.disabled = true;
        el.setAttribute('disabled', 'true');
        el.classList.add('disabled', 'q-btn--disabled');
        el.style.setProperty('pointer-events', 'none', 'important');
        el.style.setProperty('opacity', '0.3', 'important');
        el.style.setProperty('cursor', 'not-allowed', 'important');
    });

    console.log("[가격수정] '수정하기' 버튼 단 1회 클릭 완료 (추가 중복 클릭 100% 원천 차단)");
    return true;
}

// 수정 화면: 달라진 가격 변경 + 인원 변경 + 수정하기 클릭 + 확인 팝업 클릭
async function editFeeAndPeopleAndSubmit(item, maxAttempts = 15) {
    console.log(`[가격수정] 수정 폼 처리 시작: 목표 그린피 [${item.fee}만], 목표 인원 [${item.sizenum || '미지정'}]...`);

    // 만약 현재 수정 폼 페이지가 이미 이전에 '수정하기'를 실행한 페이지라면 재실행 원천 방지
    const currentUrlKey = window.location.href;
    if (window.__TEE82_SUBMITTED_URLS__ && window.__TEE82_SUBMITTED_URLS__.has(currentUrlKey)) {
        console.warn("[가격수정] 현재 페이지는 이미 '수정하기'가 완료된 페이지입니다. 추가 중복 수정을 차단하고 바로 완료 처리합니다.");
        return true;
    }

    resetEditSubmitLock();

    let feeInput = null;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        if (shouldStopRegistration) return false;

        // 1. 그린피 입력칸 탐색
        const inputs = Array.from(document.querySelectorAll('input[type="text"], input[type="number"], input[inputmode="numeric"], input'))
            .filter(el => el.offsetHeight > 0);

        // 일자 필드(2026-10-20 등 하이픈 포함) 제외
        const validInputs = inputs.filter(inp => {
            const val = inp.value || '';
            if (val.includes('-') && val.length >= 8) return false;
            return true;
        });

        // 1순위: '그린피를 입력하세요' 라벨 섹션 바로 다음 input
        const feeSection = Array.from(document.querySelectorAll('div, label, span, p'))
            .find(el => {
                const txt = el.textContent.trim().replace(/\s+/g, '');
                return (txt === '그린피를입력하세요' || txt.includes('그린피를입력')) && el.offsetHeight > 0;
            });
        if (feeSection) {
            const nextInp = feeSection.parentElement?.querySelector('input') || feeSection.nextElementSibling?.querySelector('input');
            if (nextInp && nextInp.offsetHeight > 0) feeInput = nextInp;
        }

        // 2순위: '만원'이나 '그린피' 텍스트를 포함하는 부모 아래의 input
        if (!feeInput) {
            feeInput = validInputs.find(inp => {
                const parent = inp.closest('.q-field, .q-input, div.row, div.col, div');
                const txt = parent?.textContent || '';
                const ph = inp.placeholder || '';
                return txt.includes('만원') || txt.includes('그린피') || ph.includes('그린피') || ph.includes('숫자');
            });
        }

        // 3순위: 남은 후보 중 마지막 입력칸 (일자 -> 시간 -> 그린피 순)
        if (!feeInput && validInputs.length >= 2) {
            feeInput = validInputs[validInputs.length - 1];
        } else if (!feeInput && validInputs.length === 1) {
            feeInput = validInputs[0];
        }

        if (feeInput) break;
        await sleep(250);
    }

    if (!feeInput) {
        console.error("[가격수정] 그린피 입력란을 찾지 못함");
        return false;
    }

    // ----------------------------------------------------
    // 1) 달라진 가격으로 바꾸기
    // ----------------------------------------------------
    const cleanFeeNum = (item.fee?.toString() || '').replace(/[^\d.]/g, '');
    if (cleanFeeNum) {
        feeInput.scrollIntoView({ block: 'center' });
        feeInput.style.setProperty('outline', '3px solid #ff9800', 'important');
        await humanClick(feeInput);
        try { feeInput.focus(); } catch(e) {}
        await sleep(150);

        feeInput.select();
        document.execCommand('selectAll', false, null);
        document.execCommand('delete', false, null);
        feeInput.value = '';
        feeInput.dispatchEvent(new Event('input', { bubbles: true }));
        await sleep(50);

        document.execCommand('insertText', false, cleanFeeNum);
        if (feeInput.value !== cleanFeeNum) {
            const nativeSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
            if (nativeSetter) nativeSetter.call(feeInput, cleanFeeNum);
            else feeInput.value = cleanFeeNum;
        }

        try {
            feeInput.dispatchEvent(new InputEvent('input', {
                bubbles: true,
                cancelable: true,
                composed: true,
                data: cleanFeeNum,
                inputType: 'insertText'
            }));
        } catch(e) {}

        feeInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
        feeInput.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
        feeInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        feeInput.blur();
        feeInput.dispatchEvent(new Event('blur', { bubbles: true, composed: true }));
        console.log(`[가격수정] 달라진 그린피(${cleanFeeNum}만원) 입력 및 동기화 완료!`);
        await sleep(300);
    }

    // ----------------------------------------------------
    // 2) 조건 및 인원 변경
    // ----------------------------------------------------
    const targetPeopleMatch = (item.sizenum || '').toString().match(/\d+/);
    if (targetPeopleMatch) {
        const targetPeopleNum = targetPeopleMatch[0];
        console.log(`[가격수정] 목표 인원 확인: [${targetPeopleNum}명]`);

        // 1인 또는 3인으로 변경되는 경우 조인 조건을 '무관'으로 우선 변경
        if (targetPeopleNum === '1' || targetPeopleNum === '3') {
            console.log(`[가격수정] 1인/3인 변경 감지 -> 조인 조건을 '무관'으로 우선 변경`);
            await updateJoinConditionInEditForm('무관');
            await sleep(250);
        } else if (item.condition && item.condition === '무관') {
            await updateJoinConditionInEditForm('무관');
            await sleep(250);
        }

        await updatePeopleCountInEditForm(targetPeopleNum);
        await sleep(300);
    }

    // ----------------------------------------------------
    // 3) '수정하기' 버튼 클릭 (단 1회만 정확히 실행)
    // ----------------------------------------------------
    console.log("[가격수정] 하단 '수정하기' 버튼 라이브 탐색 및 제출 실행...");
    const liveSubmitBtn = findEditSubmitButton();
    if (!liveSubmitBtn) {
        console.error("[가격수정] '수정하기' 버튼을 찾지 못함");
        return false;
    }

    console.log(`[가격수정] live '수정하기' 버튼 발견 (${liveSubmitBtn.tagName}, ${liveSubmitBtn.textContent.trim()}) -> 단 1회 클릭 실행`);
    await clickSubmitButtonReliably(liveSubmitBtn, item);
    await sleep(500); // 서버 API 처리 및 Quasar 알림바 렌더링 대기

    // ----------------------------------------------------
    // 4) 확인 팝업/하단 알림 [확인] 클릭 (단 1회만 실행!)
    // ----------------------------------------------------
    await clickConfirmPopup(25);
    await sleep(400);

    // ----------------------------------------------------
    // 5) 확인 누르고 나서 뒤로가기를 1회 실행하여 복귀!
    // ----------------------------------------------------
    await sleep(350);
    if (isEditPage() || isDetailPage()) {
        console.log("[가격수정] 확인 완료 후 아직 수정/상세 화면 감지 -> 뒤로가기 1회 실행");
        await executeSingleBack();
        await sleep(500);
    }

    console.log("[가격수정] '수정하기' 제출 및 팝업 [확인] 처리 완료!");
    return true;
}

// 상단 좌측 뒤로가기(←) 버튼 단 1회 정밀 클릭 헬퍼
async function executeSingleBack() {
    console.log("[가격수정] 상단 뒤로가기(←) 단 1회 실행...");
    resetEditSubmitLock();

    // 1. 헤더 영역 좌측의 뒤로가기(←) 버튼 탐색 (x < 80, y < 65)
    let backBtn = null;
    const headerCandidates = Array.from(document.querySelectorAll('.q-header, header, .q-toolbar, [class*="header"], [class*="toolbar"]'))
        .filter(el => el.offsetHeight > 0 && el.getBoundingClientRect().top <= 65);

    for (const h of headerCandidates) {
        const clickables = Array.from(h.querySelectorAll('button, .q-btn, i, .q-icon, [role="button"], .cursor-pointer, a, span'))
            .filter(el => {
                if (el.offsetHeight <= 0 || el.offsetWidth <= 0) return false;
                const r = el.getBoundingClientRect();
                return r.left < 80 && r.top < 65;
            });
        if (clickables.length > 0) {
            clickables.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
            backBtn = clickables[0].closest('button, .q-btn, [role="button"], .cursor-pointer') || clickables[0];
            break;
        }
    }

    // 2. 화면 전체에서 좌상단(x < 80, y < 65) 클릭 가능 요소 탐색
    if (!backBtn) {
        const topElements = Array.from(document.querySelectorAll('button, .q-btn, i, .q-icon, [role="button"], .cursor-pointer'))
            .filter(el => {
                if (el.offsetHeight <= 0 || el.offsetWidth <= 0) return false;
                const r = el.getBoundingClientRect();
                return r.left >= 0 && r.left < 80 && r.top >= 0 && r.top < 65;
            });
        if (topElements.length > 0) {
            topElements.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
            backBtn = topElements[0];
        }
    }

    // 3. 뒤로가기 버튼 정밀 클릭 (실패 시 window.history.back())
    if (backBtn && backBtn.offsetHeight > 0) {
        console.log(`[가격수정] 좌상단 뒤로가기(←) 버튼 발견 -> 1회 클릭 (${backBtn.tagName}, class=${backBtn.className})`);
        backBtn.style.setProperty('outline', '3px solid #3B82F6', 'important');
        await sleep(100);
        try {
            backBtn.click();
        } catch(e) {
            await humanClick(backBtn);
        }
    } else {
        console.log("[가격수정] 좌상단 뒤로가기 버튼 미발견 -> window.history.back() 1회 호출");
        window.history.back();
    }

    await sleep(600);
    return true;
}

// '등록 상품 내역' 목록 화면으로 안전하게 복귀 (마이페이지/부킹프라자 화면에서는 '등록 상품 내역' 연동)
async function navigateBackToList(filterType = '') {
    console.log("[가격수정] '등록 상품 내역' 목록 화면으로 안전 복귀 확인...");
    resetEditSubmitLock();

    // 1. 이미 '등록 상품 내역' 목록 화면이면 즉시 통과
    if (isRegisteredListPage()) {
        console.log("[가격수정] 이미 '등록 상품 내역' 목록 화면입니다. (즉시 진행)");
        if (filterType && (filterType === '양도' || filterType === '조인')) {
            await applyCategoryFilter(filterType);
        }
        return true;
    }

    // 2. ★ 사용자 요청: 마이페이지 화면 감지 시 '내가 등록한 상품 내역' 버튼 즉시 클릭
    const myPostsBtn = findMyRegisteredPostsButton();
    if (myPostsBtn) {
        console.log("[가격수정] 마이페이지 감지 -> '내가 등록한 상품 내역' 즉시 클릭");
        myPostsBtn.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'instant' });
        myPostsBtn.style.setProperty('outline', '4px solid #00e676', 'important');
        await sleep(80);
        await humanClick(myPostsBtn);
        try { myPostsBtn.click(); } catch(e) {}

        for (let w = 0; w < 35; w++) {
            await sleep(150);
            if (isRegisteredListPage()) {
                console.log("[가격수정] '등록 상품 내역' 목록 진입 성공 (마이페이지 경유)!");
                await sleep(350);
                if (filterType && (filterType === '양도' || filterType === '조인')) {
                    await applyCategoryFilter(filterType);
                }
                return true;
            }
        }
    }

    // 3. 만약 수정 폼 화면(isEditPage) 또는 상세 화면(isDetailPage)에 머물러 있다면 뒤로가기 1회
    if (isEditPage() || isDetailPage()) {
        console.log("[가격수정] 수정/상세 화면 감지 -> 뒤로가기 1회 실행");
        await executeSingleBack();
        await sleep(350);
        if (isRegisteredListPage()) {
            if (filterType && (filterType === '양도' || filterType === '조인')) {
                await applyCategoryFilter(filterType);
            }
            return true;
        }
    }

    // 4. Screen A(부킹프라자 화면)이거나 기타 화면인 경우: '등록 · 내글보기' -> '내글 보기' 연동
    return await navigateToRegisteredList(filterType);
}

async function executeBatchPriceUpdate(items, delayPreset = 'safe', stepPreset = 'human', filterType = '') {
    if (!items || items.length === 0) return;
    isRegistrationRunning = true;
    shouldStopRegistration = false;
    let successCount = 0;
    let lastProcessedDateKey = null;

    try {
        chrome.storage.local.set({ isRegistrationRunning: true });
    } catch(e) {}

    console.log(`🚀 [골프몬 내글 가격수정 매크로 시작] 총 ${items.length}건 (필터: [${filterType || '전체'}])`);

    for (let i = 0; i < items.length; i++) {
        if (shouldStopRegistration) break;
        const item = items[i];

        try {
            console.log(`\n========================================`);
            console.log(`[${i + 1}/${items.length}] 가격수정 시작: ${item.golf} (${item.date} ${item.time}) [${item.roomType || ''}] ➔ ${item.fee}만 (인원: ${item.sizenum || '미지정'})`);
            console.log(`========================================`);

            chrome.runtime.sendMessage({
                type: 'PRICE_UPDATE_PROGRESS',
                current: i + 1,
                total: items.length,
                golf: item.golf,
                date: item.date,
                time: item.time,
                fee: item.fee
            });

            let editSuccess = false;

            // [상황 1] 첫 번째 건(i === 0)이고 현재 브라우저가 해당 대상 글의 수정 폼 화면에 위치해 있는 경우에만 직접 수정
            const canDirectEdit = (i === 0) && isEditPage() && isCurrentlyOnTargetEditPage(item);

            if (canDirectEdit) {
                console.log(`[가격수정] 이미 대상 글(${item.golf} ${item.time})의 수정 폼 화면에 위치해 있습니다! 바로 가격/인원 수정 진행`);
                editSuccess = await editFeeAndPeopleAndSubmit(item);
            }
            // [상황 2] 첫 번째 건이고 대상 글의 상세 페이지에 위치해 있는 경우
            else if ((i === 0) && isCurrentlyOnTargetDetailPage(item)) {
                console.log(`[가격수정] 이미 대상 글(${item.golf} ${item.time})의 상세 페이지에 위치해 있습니다! 바로 더보기(⋮) -> 수정 메뉴 클릭 진행`);
                const openedEdit = await openMenuAndClickEdit();
                if (openedEdit) {
                    await sleep(300);
                    editSuccess = await editFeeAndPeopleAndSubmit(item);
                } else {
                    console.warn(`[가격수정] 더보기(⋮) 메뉴를 통한 수정 진입 실패`);
                }
            }
            // [상황 3] 일반 흐름: 목록 화면에서 날짜 선택 후 카드 탐색 -> 상세 이동 -> 수정
            else {
                // 혹시 화면이 이전 글의 수정 폼 또는 상세 페이지에 머물러 있다면 먼저 목록으로 복귀
                if (isEditPage() || isDetailPage()) {
                    console.log("[가격수정] 이전 글 화면 감지 -> 목록 화면으로 복귀 선행");
                    await navigateBackToList(filterType);
                    await sleep(400);
                }

                // 여전히 수정 폼 화면을 벗어나지 못한 경우, 이전 글에 '수정하기'가 재호출되는 것을 원천 차단하기 위해 추가 이탈 시도
                if (isEditPage()) {
                    console.warn("[가격수정] 이전 글 수정 폼 탈출 미확인 -> 브라우저 뒤로가기 보조 실행");
                    window.history.back();
                    await sleep(500);
                    if (isEditPage()) {
                        console.error("[가격수정] 이전 글 수정 폼 화면에서 탈출 불가 -> 이전 글 중복 수정을 원천 차단하기 위해 이번 건 건너뜀");
                        continue;
                    }
                }

                // 1단계: 목록 화면 확인 (만약 마이페이지이거나 메인 부킹프라자 화면이거나 목록이 아니면 복귀)
                if (!isRegisteredListPage() || isMainBookingMatrixPage() || isMyPage()) {
                    console.log("[가격수정] '등록 상품 내역' 목록 화면 미확인 (마이페이지/부킹프라자 메인 등) -> '등록 상품 내역' 복귀 실행");
                    await navigateToRegisteredList(filterType);
                }
                if (shouldStopRegistration) break;

                window.scrollTo(0, 0);

                // 1.5단계: 양도/조인 구분 필터 확인 및 적용 (조인이면 조인, 양도면 양도)
                // ★ 사용자 요청: 조인이면 조인 필터링 체크, 양도면 양도 필터링 체크 후 다음 글 수정
                if (filterType && (filterType === '양도' || filterType === '조인')) {
                    await applyCategoryFilter(filterType);
                }
                if (shouldStopRegistration) break;

                // 2단계: 상단 날짜(월/일) 일치 선택
                // ★ 사용자 요청: 날짜가 바뀔 때만 해당 날짜를 단 1회만 클릭 (동일 날짜 재클릭/토글 해제 100% 방지)
                if (item.date) {
                    const targetDay = extractDayNumber(item.date);
                    const targetMonth = extractMonthNumber(item.date);
                    const dateKey = `${targetMonth || ''}_${targetDay}`;

                    // 화면상 현재 활성화된 날짜 확인
                    const activeDayOnScreen = getActiveDayFromScreen();

                    // 조건: 화면상 활성화된 날짜가 목표 날짜와 일치하거나, 이전 처리 건과 날짜가 같고 화면도 맞으면 클릭 생략!
                    const isAlreadyMatched = (activeDayOnScreen && activeDayOnScreen === targetDay) ||
                                             (lastProcessedDateKey === dateKey && activeDayOnScreen === targetDay);

                    if (isAlreadyMatched) {
                        console.log(`[가격수정] 날짜(${targetDay}일)가 이미 선택되어 있음 (화면: ${activeDayOnScreen}일) -> 토글 해제 방지 위해 클릭 생략 (0ms)`);
                    } else {
                        console.log(`[가격수정] 날짜 변경 감지 (현재 화면: ${activeDayOnScreen || '미확인'}일 -> 목표: ${targetDay}일) -> 단 1회만 신속 클릭`);
                        const ok = await selectListDate(item.date);
                        if (ok) {
                            lastProcessedDateKey = dateKey;
                            await sleep(200);
                        }
                    }
                }
                if (shouldStopRegistration) break;

                // ★ 3단계: 대상 지역 탭 즉시 선택 (초고속 번개 진행)
                if (item.region && item.region !== '전체') {
                    console.log(`[가격수정] 속도 극대화: 대상 지역(${item.region}) 탭 즉시 선택`);
                    await selectListRegion(item.region);
                    await sleep(200);
                }
                if (shouldStopRegistration) break;

                // 4단계: 일치하는 구장 및 시간 카드 탐색 후 클릭 (선택된 지역 내에서 바로 탐색!)
                const foundCard = await findAndClickPostCard(item.golf, item.rawGolf, item.time, item.roomType, 5, item.prevFee, item.fee);

                // ★ 사용자 요청: 해당 지역에서 타임을 발견하지 못하면 전체 탭으로 가지 않고 즉시 패스(스킵) 후 다음 건 진행!
                if (!foundCard) {
                    console.warn(`[가격수정] 지역(${item.region || '현재'})에서 타임 미발견 (${item.golf} ${item.time}) -> 전체 탭 탐색 생략, 즉시 패스하고 다음 건 진행`);
                    window.scrollTo(0, 0);
                    document.querySelectorAll('.q-scrollarea__container, .scroll, .q-page, body').forEach(el => {
                        el.scrollTop = 0;
                    });
                    continue;
                }
                await sleep(getStepDelay('normal', stepPreset));
                if (shouldStopRegistration) break;

                // 4단계: 상단 ⋮ 메뉴 클릭 후 '수정' 선택
                const openedEdit = await openMenuAndClickEdit();
                if (!openedEdit) {
                    console.warn("[가격수정] 수정 메뉴 진입 실패 -> 뒤로가기 후 다음 진행");
                    await navigateBackToList(filterType);
                    continue;
                }
                await sleep(getStepDelay('normal', stepPreset));
                if (shouldStopRegistration) break;

                // 5단계: 달라진 가격 변경 + 인원 변경 + '수정하기' 클릭 및 팝업 '확인'
                editSuccess = await editFeeAndPeopleAndSubmit(item);
            }

            if (!editSuccess) {
                console.warn("[가격수정] 가격/인원 수정 제출 실패");
                await navigateBackToList(filterType);
                continue;
            }

            successCount++;
            console.log(`✅ [${i + 1}/${items.length}] ${item.golf} (${item.time}) 가격/인원 수정 완료! (누적 성공: ${successCount}건)`);

            // 성공 알림 전송 (팝업에서 해당 항목 자동 체크 해제 및 기록)
            chrome.runtime.sendMessage({
                type: 'ITEM_PRICE_UPDATE_SUCCESS',
                regId: item.regId,
                item: item,
                newFee: item.fee
            });

            // 6단계: 목록 화면 복귀 확인 (마이페이지나 부킹프라자 메인 화면으로 돌아갔다면 다시 '등록 상품 내역'으로 복귀)
            if (!isRegisteredListPage() || isMainBookingMatrixPage() || isMyPage()) {
                console.log("[가격수정] 타임 수정 완료 후 목록 복귀 확인 (마이페이지/메인 화면 감지 시 재진입)");
                await navigateBackToList(filterType);
                await sleep(350);
            }

            if (shouldStopRegistration) break;

            // 다음 건 진행 전 인간적 쿨다운 대기
            if (i < items.length - 1) {
                const cooldownMs = getCooldownDelay(delayPreset || 'safe');
                await sleep(cooldownMs);
                if (shouldStopRegistration) break;
            } else {
                await sleep(1000);
            }

        } catch (err) {
            console.error(`❌ [${i + 1}/${items.length}] ${item.golf} 가격수정 중 오류:`, err);
            await navigateBackToList(filterType);
            if (shouldStopRegistration) break;
            await sleep(2000);
        }
    }

    isRegistrationRunning = false;
    window.__TEE82_PRICE_UPDATE_RUNNING__ = false;
    try {
        chrome.storage.local.set({ isRegistrationRunning: false });
    } catch(e) {}

    if (shouldStopRegistration) {
        chrome.runtime.sendMessage({ type: 'PRICE_UPDATE_STOPPED', total: items.length, successCount: successCount });
    } else {
        chrome.runtime.sendMessage({ type: 'PRICE_UPDATE_COMPLETED', total: items.length, successCount: successCount });
    }
}

// 확장 프로그램 메시지 리스너 (단 1회만 등록 보장하여 다중 주입 시 병렬 실행/중복 클릭 100% 원천 차단)
if (!window.__TEE82_GOLFMON_LISTENER_REGISTERED__) {
    window.__TEE82_GOLFMON_LISTENER_REGISTERED__ = true;
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'START_REGISTRATION') {
            executeBatchRegistration(request.items, request.memo, request.mode || 'join', request.delayPreset || 'safe', request.stepPreset || 'human');
            sendResponse({ status: 'started' });
        } else if (request.action === 'START_GOLFMON_PRICE_UPDATE') {
            if (window.__TEE82_PRICE_UPDATE_RUNNING__ || isRegistrationRunning) {
                console.log("[가격수정] 이미 작업이 진행 중이므로 이전 실행 정리 및 재시작 준비");
                shouldStopRegistration = true;
                isRegistrationRunning = false;
                window.__TEE82_PRICE_UPDATE_RUNNING__ = false;
            }
            window.__TEE82_PRICE_UPDATE_RUNNING__ = true;
            setTimeout(() => {
                executeBatchPriceUpdate(request.items, request.delayPreset || 'safe', request.stepPreset || 'human', request.filterType || '');
            }, 100);
            sendResponse({ status: 'started' });
        } else if (request.action === 'STOP_REGISTRATION') {
            shouldStopRegistration = true;
            window.__TEE82_PRICE_UPDATE_RUNNING__ = false;
            sendResponse({ status: 'stopping' });
        } else if (request.action === 'CHECK_STATUS') {
            sendResponse({ isRunning: isRegistrationRunning });
        }
        return true;
    });
}
