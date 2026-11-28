/**
 * 골프탑 스마트뷰 - 오토매티 내장판 (자동 생성 파일, 직접 고치지 말 것)
 * 원본: golftop_smartview/smartview_content.js  →  생성: tools/make_smartview_embed.js
 */
(async function __t82SmartViewEmbedded() {
    if (window.__t82SmartViewEmbeddedLoaded) return;
    window.__t82SmartViewEmbeddedLoaded = true;

    // 1) 오토매티 설정에서 켠 경우만 동작
    let __opt = {};
    try { __opt = await new Promise(r => chrome.storage.local.get(['v2_smartviewEnabled'], r)); } catch (e) {}
    if (!__opt || __opt.v2_smartviewEnabled !== true) {
        // 꺼진 상태로 열려 있던 골프탑 탭: 오토매티에서 스마트뷰를 켜면 이 탭을 자동 새로고침해서 바로 적용
        //   (맨 위 화면만, 골프탑 자동등록이 이 탭에서 돌고 있으면 끝날 때까지 기다렸다가 새로고침)
        if (window.top === window) {
            try {
                chrome.storage.onChanged.addListener((ch, area) => {
                    if (area !== 'local' || !ch.v2_smartviewEnabled || ch.v2_smartviewEnabled.newValue !== true) return;
                    const reloadWhenIdle = () => {
                        if (document.documentElement.getAttribute('data-tee82-active') === 'true') { setTimeout(reloadWhenIdle, 2000); return; }
                        location.reload();
                    };
                    reloadWhenIdle();
                });
            } catch (e) {}
        }
        return;
    }

    // 2) 단독 스마트뷰 확장과 중복 실행 방지 (먼저 자리를 잡은 쪽만 동작)
    const __root = document.documentElement;
    if (__root.dataset.gtpSmartviewOwner && __root.dataset.gtpSmartviewOwner !== 'automatee') return;
    __root.dataset.gtpSmartviewOwner = 'automatee';
    await new Promise(r => setTimeout(r, 400));
    if (document.getElementById('gtp_smartview_float_wrap')) return; // 예전 단독 스마트뷰가 이미 화면을 만든 경우

    // ===================== 원본 스마트뷰 시작 =====================
    /**
     * 골프탑 스마트뷰 (Golftop SmartView) - 독립형 확장프로그램 콘텐츠 스크립트
     * Ver 1.1
     */
    
    if (typeof sleep === 'undefined') {
        window.sleep = (ms) => new Promise(r => setTimeout(r, ms));
    }
    
    async function humanClick(el) {
        if (!el) return;
        try {
            el.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'instant' });
        } catch (e) {}
        const rect = el.getBoundingClientRect();
        const x = (rect.width > 0 && rect.left >= 0) ? (rect.left + rect.width / 2) : 100;
        const y = (rect.height > 0 && rect.top >= 0) ? (rect.top + rect.height / 2) : 100;
    
        ['pointerover', 'mouseover', 'pointerdown', 'mousedown'].forEach(t => {
            el.dispatchEvent(new MouseEvent(t, { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y }));
        });
        await sleep(20);
        ['pointerup', 'mouseup'].forEach(t => {
            el.dispatchEvent(new MouseEvent(t, { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y }));
        });
        try { el.click(); } catch (e) {}
    }
    
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        if (!msg || !msg.action) return false;
        if (msg.action === 'SET_GOLFTOP_SMART_LAYOUT') {
            if (msg.onlyMain !== undefined) {
                try { localStorage.setItem(GTP_ONLY_MAIN_STORAGE_KEY, String(msg.onlyMain)); } catch(e) {}
            }
            if (!isTargetGolftopAllowedPage()) {
                applyGolftopSmartLayout(false);
                sendResponse({ success: true, notTargetPage: true });
                return true;
            }
            const enabled = !!msg.enabled;
            setGolftopSmartLayoutEnabled(enabled);
            applyGolftopSmartLayout(enabled);
            sendResponse({ success: true, enabled: enabled });
            return true;
        } else if (msg.action === 'GET_GOLFTOP_SMART_LAYOUT_STATUS') {
            const isTarget = isTargetGolftopAllowedPage();
            const isEnabled = isTarget && document.body.classList.contains('gtp-smart-layout-active');
            sendResponse({ success: true, enabled: isEnabled, isTargetPage: isTarget });
            return true;
        } else if (msg.action === 'RESET_GOLFTOP_SMART_ZOOM') {
            if (!isTargetGolftopAllowedPage()) {
                sendResponse({ success: false, notTargetPage: true });
                return true;
            }
            try {
                localStorage.removeItem('gtp_smart_custom_zoom');
            } catch (e) {}
            if (typeof applyGolftopResponsiveScale === 'function') {
                applyGolftopResponsiveScale(false);
            }
            sendResponse({ success: true });
            return true;
        }
        return false;
    });
    
    // =========================================================================================
    // ⛳ GolftopSmartLayoutManager: 골프탑 모바일/분할화면 스마트 레이아웃 최적화 (골프락 스타일)
    // - [할인 그린피 / 골프장 특이사항] 단일 탭(Tab) 컨테이너로 통합 (독립 열 제거로 가로 250px 확보)
    // - [골프장 선택 버튼] 말줄임표(...) 강제 제거 및 2줄 줄바꿈 보장 (구장명 100% 식별)
    // - 원클릭 실시간 ON / OFF 플로팅 스위치 및 상태 자동 영구 저장
    // =========================================================================================
    
    const GTP_LAYOUT_STORAGE_KEY = 'gtp_smart_layout_enabled';
    const GTP_CUSTOM_ZOOM_STORAGE_KEY = 'gtp_smart_custom_zoom_ratio';
    const GTP_LAYOUT_STYLE_ID = 'gtp_smart_layout_injected_style';
    
    function getStoredGolftopZoomRatio() {
        try {
            const val = localStorage.getItem(GTP_CUSTOM_ZOOM_STORAGE_KEY);
            if (val) {
                const num = parseFloat(val);
                if (!isNaN(num) && num >= 0.5 && num <= 3.0) return num;
            }
        } catch (e) {}
        return 1.0;
    }
    
    function setStoredGolftopZoomRatio(ratio) {
        try {
            localStorage.setItem(GTP_CUSTOM_ZOOM_STORAGE_KEY, String(ratio));
        } catch (e) {}
    }
    let __gtp_smart_layout_observer = null;
    let __gtp_is_layout_updating = false;
    let __gtp_layout_debounce_timer = null;
    
    const GTP_ONLY_MAIN_STORAGE_KEY = 'gtp_smart_only_main_pc1';
    
    function isOnlyMainPc1ModeEnabled() {
        try {
            const localVal = localStorage.getItem(GTP_ONLY_MAIN_STORAGE_KEY);
            if (localVal !== null) return localVal === 'true';
        } catch (e) {}
        return true; // 기본값: 체크됨 (Manage/Main?pc=1 전용)
    }
    
    function isTargetGolftopAllowedPage() {
        const onlyMain = isOnlyMainPc1ModeEnabled();
        if (!onlyMain) {
            // 체크 해제 시: 골프탑 전체 도메인 허용
            return true;
        }
        // 체크 시: https://intra.golftop.kr/Manage/Main?pc=1 전용 검사
        try {
            const pathname = window.location.pathname || '';
            const search = window.location.search || '';
            if (!pathname.toLowerCase().includes('/manage/main')) return false;
            const params = new URLSearchParams(search);
            return params.get('pc') === '1';
        } catch (e) {
            return false;
        }
    }
    
    function isGolftopSmartLayoutEnabled() {
        if (!isTargetGolftopAllowedPage()) {
            return Promise.resolve(false);
        }
        return new Promise(resolve => {
            try {
                chrome.storage.local.get([GTP_LAYOUT_STORAGE_KEY, GTP_ONLY_MAIN_STORAGE_KEY], (res) => {
                    if (res && res[GTP_ONLY_MAIN_STORAGE_KEY] !== undefined) {
                        try { localStorage.setItem(GTP_ONLY_MAIN_STORAGE_KEY, String(res[GTP_ONLY_MAIN_STORAGE_KEY])); } catch(e) {}
                    }
                    if (!isTargetGolftopAllowedPage()) {
                        resolve(false);
                        return;
                    }
                    if (chrome.runtime.lastError || res[GTP_LAYOUT_STORAGE_KEY] === undefined) {
                        const localVal = localStorage.getItem(GTP_LAYOUT_STORAGE_KEY);
                        resolve(localVal === null ? true : localVal === 'true'); // 기본값: 켜짐(true)
                    } else {
                        resolve(!!res[GTP_LAYOUT_STORAGE_KEY]);
                    }
                });
            } catch (e) {
                const localVal = localStorage.getItem(GTP_LAYOUT_STORAGE_KEY);
                resolve(localVal === null ? true : localVal === 'true');
            }
        });
    }
    
    function setGolftopSmartLayoutEnabled(enabled) {
        try {
            chrome.storage.local.set({ [GTP_LAYOUT_STORAGE_KEY]: enabled });
        } catch (e) {}
        try {
            localStorage.setItem(GTP_LAYOUT_STORAGE_KEY, String(enabled));
        } catch (e) {}
    }
    
    function injectGolftopSmartLayoutStyles() {
        let style = document.getElementById(GTP_LAYOUT_STYLE_ID);
        if (!style) {
            style = document.createElement('style');
            style.id = GTP_LAYOUT_STYLE_ID;
            document.head.appendChild(style);
        }
        style.textContent = `
            /* ===== 골프탑 골프락 완벽 일치 스마트 레이아웃 CSS ===== */
            html:has(body.gtp-smart-layout-active),
            html.gtp-smart-html-active,
            body.gtp-smart-layout-active {
                height: auto !important;
                min-height: 100% !important;
                max-height: none !important;
                overflow-y: auto !important;
                overflow-x: auto !important;
                -webkit-overflow-scrolling: touch !important;
                touch-action: pan-x pan-y pinch-zoom !important;
                -webkit-text-size-adjust: none !important;
                padding-bottom: 70px !important;
            }
    
            body.gtp-smart-layout-active form,
            body.gtp-smart-layout-active #form1,
            body.gtp-smart-layout-active .main_content,
            body.gtp-smart-layout-active .content-wrapper,
            body.gtp-smart-layout-active div[class*="content"] {
                height: auto !important;
                min-height: 100% !important;
                max-height: none !important;
                overflow: visible !important;
            }
    
            /* 전체 창 세로 스크롤바 명확하게 표시 */
            html::-webkit-scrollbar,
            body.gtp-smart-layout-active::-webkit-scrollbar {
                width: 10px !important;
                height: 10px !important;
                display: block !important;
            }
            html::-webkit-scrollbar-track,
            body.gtp-smart-layout-active::-webkit-scrollbar-track {
                background: #f1f5f9 !important;
            }
            html::-webkit-scrollbar-thumb,
            body.gtp-smart-layout-active::-webkit-scrollbar-thumb {
                background: #64748b !important;
                border-radius: 5px !important;
                border: 2px solid #f1f5f9 !important;
            }
            html::-webkit-scrollbar-thumb:hover,
            body.gtp-smart-layout-active::-webkit-scrollbar-thumb:hover {
                background: #475569 !important;
            }
    
            /* 0. 테이블 및 tbody display block 변환 (flex 자식의 멀티라인 줄바꿈 높이 붕괴 원천 방지) */
            body.gtp-smart-layout-active table:has(.gtp-smart-top-row),
            body.gtp-smart-layout-active tbody:has(.gtp-smart-top-row) {
                display: block !important;
                width: 100% !important;
                height: auto !important;
                min-height: 0px !important;
                max-height: none !important;
                overflow: visible !important;
                margin-top: 0px !important;
                margin-bottom: 2px !important;
                padding-top: 0px !important;
                padding-bottom: 0px !important;
            }
            body.gtp-smart-layout-active div:has(> table .gtp-smart-top-row),
            body.gtp-smart-layout-active div:has(> .gtp-smart-top-row) {
                height: auto !important;
                min-height: 0px !important;
                max-height: none !important;
                overflow: visible !important;
                margin-top: 0px !important;
                margin-bottom: 2px !important;
                padding-top: 0px !important;
                padding-bottom: 0px !important;
            }
    
            /* 1. 상단 행: 달력(좌) + 필터(중) + 특이사항/할인그린피(우) 3카드 나란히 배치 */
            body.gtp-smart-layout-active .gtp-smart-top-row,
            body.gtp-smart-layout-active tr.gtp-smart-top-row {
                display: flex !important;
                flex-wrap: nowrap !important;
                width: 100% !important;
                box-sizing: border-box !important;
                align-items: flex-start !important;
                gap: 6px !important;
                height: 235px !important;
                min-height: 235px !important;
                max-height: 235px !important;
                overflow: visible !important;
                margin-top: 0px !important;
                margin-bottom: 2px !important;
            }
    
            /* [상단 좌측 전체 컨테이너]: 달력 및 잔여타임 필터 래퍼 (Column 1) */
            body.gtp-smart-layout-active .gtp-smart-col-date,
            body.gtp-smart-layout-active tr.gtp-smart-top-row > td.gtp-smart-col-date {
                order: 1 !important;
                display: flex !important;
                flex-direction: row !important;
                gap: 6px !important;
                flex: 0 0 auto !important;
                width: auto !important;
                max-width: none !important;
                height: 235px !important;
                min-height: 235px !important;
                max-height: 235px !important;
                background: transparent !important;
                border: none !important;
                padding: 0 !important;
                box-shadow: none !important;
                overflow: visible !important;
                box-sizing: border-box !important;
            }
    
            /* [상단 1A]: 📅 달력 카드 (맨 위 좌측) */
            body.gtp-smart-layout-active #gtp_smart_cal_box,
            body.gtp-smart-layout-active .gtp-smart-cal-card {
                flex: 0 0 220px !important;
                width: 220px !important;
                max-width: 220px !important;
                min-width: 220px !important;
                height: 235px !important;
                max-height: 235px !important;
                background: #ffffff !important;
                border: 1px solid #cbd5e1 !important;
                border-radius: 8px !important;
                padding: 4px 6px !important;
                box-sizing: border-box !important;
                overflow-y: auto !important;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
            }
    
            /* [상단 1B]: 🔍 필터선택 카드 (달력 우측 - '잔여타임 필터 중복 허용 초기화' 1줄 표시를 위해 268px로 확장) */
            body.gtp-smart-layout-active #gtp_smart_filter_box,
            body.gtp-smart-layout-active .gtp-smart-filter-card {
                flex: 0 0 170px !important;
                width: 170px !important;
                max-width: 170px !important;
                min-width: 170px !important;
                height: 235px !important;
                max-height: 235px !important;
                background: #ffffff !important;
                border: 1px solid #cbd5e1 !important;
                border-radius: 8px !important;
                padding: 4px 6px !important;
                box-sizing: border-box !important;
                overflow-y: auto !important;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
            }
    
            /* 필터 카드 내부 텍스트/헤더 줄바꿈 방지 (잔여타임 필터 / 중복 허용 / 초기화 한 줄 고정) */
            body.gtp-smart-layout-active #gtp_smart_filter_box span,
            body.gtp-smart-layout-active #gtp_smart_filter_box b,
            body.gtp-smart-layout-active #gtp_smart_filter_box strong,
            body.gtp-smart-layout-active #gtp_smart_filter_box label,
            body.gtp-smart-layout-active #gtp_smart_filter_box button,
            body.gtp-smart-layout-active #gtp_smart_filter_box a,
            body.gtp-smart-layout-active #gtp_smart_filter_box h1,
            body.gtp-smart-layout-active #gtp_smart_filter_box h2,
            body.gtp-smart-layout-active #gtp_smart_filter_box h3,
            body.gtp-smart-layout-active #gtp_smart_filter_box h4,
            body.gtp-smart-layout-active #gtp_smart_filter_box h5,
            body.gtp-smart-layout-active #gtp_smart_filter_box h6 {
                white-space: nowrap !important;
                word-break: keep-all !important;
            }
    
            /* [상단 우측 2]: 📝 할인그린피 / 골프장특이사항 카드 (필터 우측) */
            body.gtp-smart-layout-active .gtp-smart-col-detail,
            body.gtp-smart-layout-active tr.gtp-smart-top-row > td.gtp-smart-col-detail {
                order: 2 !important;
                flex: 1 1 0 !important;
                min-width: 150px !important;
                width: auto !important;
                max-width: none !important;
                height: 235px !important;
                min-height: 235px !important;
                max-height: 235px !important;
                box-sizing: border-box !important;
                margin-left: 0 !important;
                padding: 4px 6px !important;
                background: #ffffff !important;
                border-radius: 8px !important;
                border: 1px solid #cbd5e1 !important;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
                display: flex !important;
                flex-direction: column !important;
                visibility: visible !important;
                overflow-y: auto !important;
            }
    
            body.gtp-smart-layout-active .gtp-smart-col-detail > * {
                max-width: 100% !important;
                width: 100% !important;
                visibility: visible !important;
            }
    
            /* 특이사항 헤더 뱃지 숨김 (사용자 요청: 제목 안넣어도 됨) */
            body.gtp-smart-layout-active #gtp_smart_detail_header,
            body.gtp-smart-layout-active .gtp-detail-header-styled {
                display: none !important;
            }
    
            /* [중단/하단 전체폭]: ⛳ 골프장 선택 목록 (상단 행과 하단 예약 폼 사이에 독립 블록으로 물리적 배치) */
            body.gtp-smart-layout-active #gtp_smart_course_wrapper,
            body.gtp-smart-layout-active #gtp_smart_course_tr,
            body.gtp-smart-layout-active .gtp-smart-col-course,
            body.gtp-smart-layout-active td.gtp-smart-col-course,
            body.gtp-smart-layout-active tr.gtp-smart-top-row > td.gtp-smart-col-course {
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
                min-width: 100% !important;
                box-sizing: border-box !important;
                margin-top: 2px !important;
                margin-bottom: 2px !important;
                padding: 4px 6px !important;
                background: #ffffff !important;
                border-radius: 8px !important;
                border: 1px solid #cbd5e1 !important;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
                height: auto !important;
                max-height: none !important;
                overflow: visible !important;
                clear: both !important;
                position: relative !important;
                z-index: 10 !important;
                visibility: visible !important;
            }
    
            body.gtp-smart-layout-active #gtp_smart_course_wrapper {
                padding: 0 !important;
                border: none !important;
                background: transparent !important;
                box-shadow: none !important;
            }
    
            body.gtp-smart-layout-active #gtp_smart_course_tr {
                display: table-row !important;
                height: auto !important;
                max-height: none !important;
                background: transparent !important;
                border: none !important;
                box-shadow: none !important;
                padding: 0 !important;
            }
    
            body.gtp-smart-layout-active #gtp_smart_course_tr > td {
                display: table-cell !important;
                width: 100% !important;
                padding: 0 !important;
                border: none !important;
                height: auto !important;
                background: transparent !important;
            }
    
            /* 중단/하단 예약/대기/홍보 신청 폼 컴팩트 여백 보장 */
            body.gtp-smart-layout-active .gtp-smart-resv-container,
            body.gtp-smart-layout-active table:has(.gtp-smart-top-row) + *,
            body.gtp-smart-layout-active .gtp-smart-top-row + * {
                clear: both !important;
                position: relative !important;
                margin-top: 2px !important;
                margin-bottom: 2px !important;
                padding-top: 0px !important;
                padding-bottom: 0px !important;
                z-index: 1 !important;
            }
    
            /* 골프장 선택 내부 모든 래퍼 100% 가로폭 강제 (250px 좁힘 차단) */
            body.gtp-smart-layout-active .gtp-smart-col-course > div,
            body.gtp-smart-layout-active .gtp-smart-col-course form,
            body.gtp-smart-layout-active .gtp-smart-col-course section,
            body.gtp-smart-layout-active .gtp-smart-col-course div[class*="body"],
            body.gtp-smart-layout-active .gtp-smart-col-course div[id*="scroll"],
            body.gtp-smart-layout-active #gtp_smart_regions_grid {
                width: 100% !important;
                max-width: 100% !important;
                min-width: 100% !important;
                box-sizing: border-box !important;
            }
    
            /* 2. 골프장 선택 목록: 골프락처럼 3개 열로 나란히 배치:
               [열1]: [경기북부] -> [강원도] -> [제주도]
               [열2]: [경기남부] (하단 확장) -> [경상도]
               [열3]: [충청도]   (하단 확장) -> [전라도]
               - 각 지역 카드는 구장 수에 따라 하단으로 자연스럽게 늘어나며 내부 스크롤이 없음!
               - 전체 그리드 우측에만 단일 스크롤바가 매끄럽게 동작!
            */
            body.gtp-smart-layout-active #gtp_smart_regions_grid,
            body.gtp-smart-layout-active .gtp-regions-grid {
                display: grid !important;
                grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
                gap: 6px !important;
                width: 100% !important;
                max-width: 100% !important;
                min-width: 100% !important;
                box-sizing: border-box !important;
                align-items: start !important;
                max-height: 340px !important;
                overflow-y: auto !important;
                -webkit-overflow-scrolling: touch !important;
                overscroll-behavior-y: contain !important;
                touch-action: pan-x pan-y pinch-zoom !important;
                padding: 2px 2px 16px 2px !important;
            }
    
            /* 3개 독립 세로 열 컨테이너 (각 열별로 카드가 위에서 아래로 물 흐르듯 자연스럽게 배치) */
            body.gtp-smart-layout-active .gtp-region-col {
                display: flex !important;
                flex-direction: column !important;
                gap: 6px !important;
                width: 100% !important;
                min-width: 0 !important;
                box-sizing: border-box !important;
                padding-bottom: 24px !important;
            }
    
            /* 권역별 카드 스타일 (골프락 스타일 - 구장 수에 맞춰 하단으로 자연스럽게 늘어남, 내부 스크롤 없음) */
            body.gtp-smart-layout-active .gtp-region-card {
                background: #f8fafc !important;
                border: 1px solid #cbd5e1 !important;
                border-radius: 6px !important;
                padding: 4px 6px !important;
                box-sizing: border-box !important;
                display: flex !important;
                flex-direction: column !important;
                min-width: 0 !important;
                width: 100% !important;
                height: auto !important;
                max-height: none !important;
                overflow: visible !important;
                box-shadow: 0 1px 2px rgba(0,0,0,0.03) !important;
            }
    
            /* 권역 제목 스타일 (녹색 뱃지 헤더) */
            body.gtp-smart-layout-active .gtp-region-header-styled {
                font-size: 14.5px !important;
                font-weight: 800 !important;
                color: #064e3b !important;
                background: #d1fae5 !important;
                padding: 3px 6px !important;
                border-radius: 4px !important;
                margin-bottom: 3px !important;
                text-align: center !important;
                border: 1px solid #6ee7b7 !important;
                display: block !important;
                visibility: visible !important;
                box-shadow: 0 1px 2px rgba(0,0,0,0.04) !important;
                user-select: none !important;
                flex-shrink: 0 !important;
            }
    
            /* 권역 내부의 버튼 그리드 (3개씩 배치, 내부 스크롤 없이 하단으로 100% 펼쳐짐) */
            body.gtp-smart-layout-active .gtp-region-buttons-wrap {
                display: grid !important;
                grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
                gap: 3px !important;
                width: 100% !important;
                min-width: 100% !important;
                box-sizing: border-box !important;
                height: auto !important;
                max-height: none !important;
                overflow: visible !important;
                padding-right: 0px !important;
                align-content: start !important;
            }
    
            /* 골프장 선택 버튼 2줄 줄바꿈 및 가독성 대폭 강화 (폴드/모바일 선명도 향상) */
            body.gtp-smart-layout-active .gtp-smart-course-btn {
                white-space: pre-line !important;
                word-break: keep-all !important;
                text-overflow: clip !important;
                line-height: 1.15 !important;
                font-size: 14.5px !important;
                font-weight: 700 !important;
                letter-spacing: -0.3px !important;
                min-height: 36px !important;
                height: auto !important;
                padding: 2px 2px !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                text-align: center !important;
                box-sizing: border-box !important;
                border-radius: 4px !important;
                background: #ffffff !important;
                border: 1px solid #94a3b8 !important;
                color: #0f172a !important;
                cursor: pointer !important;
                transition: all 0.1s ease !important;
                width: 100% !important;
                min-width: 0 !important;
            }
            body.gtp-smart-layout-active .gtp-smart-course-btn:hover {
                background: #f1f5f9 !important;
                border-color: #64748b !important;
            }
    
            /* 잔여타임 필터 조건 매칭으로 불이 들어온 구장 상태 (스마트뷰 OFF의 노란색 하이라이트 100% 재현) */
            body.gtp-smart-layout-active .gtp-smart-course-btn.gtp-filter-lit {
                background: #fde68a !important;
                border: 1.5px solid #d97706 !important;
                color: #0f172a !important;
                font-weight: 800 !important;
                box-shadow: 0 1px 3px rgba(217, 119, 6, 0.28) !important;
            }
    
            /* 구장 선택 활성화(active/selected) 상태 */
            body.gtp-smart-layout-active .gtp-smart-course-btn.active,
            body.gtp-smart-layout-active .gtp-smart-course-btn.selected {
                background: #2563eb !important;
                border-color: #1d4ed8 !important;
                color: #ffffff !important;
                font-weight: 800 !important;
            }
            body.gtp-smart-layout-active .gtp-smart-course-btn.gtp-filter-lit.active,
            body.gtp-smart-layout-active .gtp-smart-course-btn.gtp-filter-lit.selected {
                background: #fde68a !important;
                border: 2px solid #2563eb !important;
                color: #0f172a !important;
                font-weight: 800 !important;
                box-shadow: 0 0 0 1.5px rgba(37, 99, 235, 0.35) !important;
            }
    
            /* ===== 폴드/모바일 및 전체 화면 글자 가독성(선명도/크기/굵기/명암비) 대폭 강화 ===== */
            body.gtp-smart-layout-active {
                -webkit-font-smoothing: antialiased !important;
                text-rendering: optimizeLegibility !important;
            }
    
            /* 1) 상단 좌측 달력 및 필터 카드 가독성 강화 */
            body.gtp-smart-layout-active #gtp_smart_cal_box td,
            body.gtp-smart-layout-active #gtp_smart_cal_box th,
            body.gtp-smart-layout-active #gtp_smart_cal_box span,
            body.gtp-smart-layout-active #gtp_smart_cal_box b,
            body.gtp-smart-layout-active #gtp_smart_cal_box strong {
                font-weight: 700 !important;
            }
            body.gtp-smart-layout-active #gtp_smart_filter_box label,
            body.gtp-smart-layout-active #gtp_smart_filter_box label span {
                font-size: 14.5px !important;
                font-weight: 700 !important;
                color: #0f172a !important;
            }
    
            /* 2) 상단 우측 할인그린피 / 골프장특이사항 가독성 강화 */
            body.gtp-smart-layout-active .gtp-smart-col-detail th {
                font-size: 14px !important;
                font-weight: 800 !important;
                color: #0f172a !important;
                background: #f1f5f9 !important;
            }
            body.gtp-smart-layout-active .gtp-smart-col-detail td,
            body.gtp-smart-layout-active .gtp-smart-col-detail p,
            body.gtp-smart-layout-active .gtp-smart-col-detail div {
                font-size: 14px !important;
                font-weight: 700 !important;
                color: #0f172a !important;
                line-height: 1.35 !important;
            }
    
            /* 3) 중단 예약/대기/홍보 신청 폼 가독성 강화 및 좌측 입력칸 확장·상하 초슬림 압축 */
            body.gtp-smart-layout-active .gtp-smart-resv-container table {
                width: 100% !important;
                table-layout: auto !important;
                border-collapse: collapse !important;
            }
            body.gtp-smart-layout-active .gtp-smart-resv-container tr {
                height: auto !important;
                min-height: 0px !important;
            }
            body.gtp-smart-layout-active .gtp-smart-resv-container th,
            body.gtp-smart-layout-active .gtp-smart-resv-container td:first-child,
            body.gtp-smart-layout-active .gtp-smart-resv-container dt {
                font-size: 14px !important;
                font-weight: 800 !important;
                color: #0f172a !important;
                width: 74px !important;
                min-width: 70px !important;
                max-width: 80px !important;
                padding: 2px 5px !important;
                line-height: 1.15 !important;
                white-space: nowrap !important;
                vertical-align: middle !important;
            }
            body.gtp-smart-layout-active .gtp-smart-resv-container td {
                font-size: 14px !important;
                font-weight: 700 !important;
                padding: 2px 6px !important;
                line-height: 1.15 !important;
                vertical-align: middle !important;
            }
            body.gtp-smart-layout-active .gtp-smart-resv-container td:nth-child(2) {
                width: 520px !important;
                min-width: 470px !important;
                max-width: none !important;
            }
            body.gtp-smart-layout-active .gtp-smart-resv-container td:nth-child(3) {
                width: auto !important;
                min-width: 70px !important;
                max-width: 110px !important;
            }
            body.gtp-smart-layout-active .gtp-smart-resv-container label,
            body.gtp-smart-layout-active .gtp-smart-resv-container span {
                font-size: 14.5px !important;
                font-weight: 700 !important;
                line-height: 1.15 !important;
                white-space: nowrap !important;
            }
            body.gtp-smart-layout-active .gtp-smart-resv-container label {
                margin-right: 3px !important;
                margin-left: 0px !important;
                margin-top: 0px !important;
                margin-bottom: 0px !important;
                padding-right: 0px !important;
                display: inline-flex !important;
                align-items: center !important;
                gap: 2px !important;
            }
            body.gtp-smart-layout-active .gtp-smart-resv-container input[type="radio"],
            body.gtp-smart-layout-active .gtp-smart-resv-container input[type="checkbox"] {
                margin: 0px 1.5px 0px 0px !important;
            }
            body.gtp-smart-layout-active .gtp-smart-resv-container input[type="text"],
            body.gtp-smart-layout-active .gtp-smart-resv-container input[type="number"],
            body.gtp-smart-layout-active .gtp-smart-resv-container input[type="tel"],
            body.gtp-smart-layout-active .gtp-smart-resv-container select {
                font-size: 14px !important;
                font-weight: 700 !important;
                color: #0f172a !important;
                height: 22px !important;
                min-height: 22px !important;
                padding: 1px 5px !important;
                margin-top: 0px !important;
                margin-bottom: 0px !important;
                box-sizing: border-box !important;
            }
            body.gtp-smart-layout-active .gtp-smart-resv-container textarea {
                font-size: 14px !important;
                font-weight: 700 !important;
                color: #0f172a !important;
                height: 24px !important;
                min-height: 24px !important;
                max-height: 30px !important;
                padding: 2px 6px !important;
                margin-top: 0px !important;
                margin-bottom: 0px !important;
                box-sizing: border-box !important;
            }
            body.gtp-smart-layout-active .gtp-smart-resv-container button,
            body.gtp-smart-layout-active .gtp-smart-resv-container .btn {
                font-weight: 800 !important;
            }
            body.gtp-smart-layout-active .gtp-smart-resv-container td button,
            body.gtp-smart-layout-active .gtp-smart-resv-container td .btn,
            body.gtp-smart-layout-active .gtp-smart-resv-container td a {
                font-size: 11.5px !important;
                font-weight: 800 !important;
                height: 20px !important;
                min-height: 20px !important;
                padding: 1px 6px !important;
                line-height: 1 !important;
                margin-top: 0px !important;
                margin-bottom: 0px !important;
                white-space: nowrap !important;
                flex-shrink: 0 !important;
            }
    
            /* 4) 우측 잔여타임 및 외 잔여타임 테이블 가독성 대폭 강화 */
            body.gtp-smart-layout-active [data-gtp-right-stretched="true"] th {
                font-size: 14.5px !important;
                font-weight: 800 !important;
                color: #0f172a !important;
                background: #f1f5f9 !important;
            }
            body.gtp-smart-layout-active [data-gtp-right-stretched="true"] td {
                font-size: 14.5px !important;
                font-weight: 700 !important;
                line-height: 1.3 !important;
                letter-spacing: -0.2px !important;
            }
            body.gtp-smart-layout-active [data-gtp-right-stretched="true"] td button,
            body.gtp-smart-layout-active [data-gtp-right-stretched="true"] td a,
            body.gtp-smart-layout-active [data-gtp-right-stretched="true"] td .btn {
                font-size: 14px !important;
                font-weight: 800 !important;
            }
    
            /* 세로 스크롤바 커스텀 스타일 (더 뚜렷하고 매끄럽게) */
            body.gtp-smart-layout-active .gtp-regions-grid::-webkit-scrollbar,
            body.gtp-smart-layout-active .gtp-region-buttons-wrap::-webkit-scrollbar,
            body.gtp-smart-layout-active .gtp-smart-col-detail::-webkit-scrollbar,
            body.gtp-smart-layout-active #gtp_smart_cal_box::-webkit-scrollbar,
            body.gtp-smart-layout-active #gtp_smart_filter_box::-webkit-scrollbar,
            body.gtp-smart-layout-active .gtp-smart-col-date::-webkit-scrollbar {
                width: 5px !important;
            }
            body.gtp-smart-layout-active .gtp-regions-grid::-webkit-scrollbar-track,
            body.gtp-smart-layout-active .gtp-region-buttons-wrap::-webkit-scrollbar-track,
            body.gtp-smart-layout-active .gtp-smart-col-detail::-webkit-scrollbar-track,
            body.gtp-smart-layout-active #gtp_smart_cal_box::-webkit-scrollbar-track,
            body.gtp-smart-layout-active #gtp_smart_filter_box::-webkit-scrollbar-track,
            body.gtp-smart-layout-active .gtp-smart-col-date::-webkit-scrollbar-track {
                background: #f1f5f9 !important;
                border-radius: 4px !important;
            }
            body.gtp-smart-layout-active .gtp-regions-grid::-webkit-scrollbar-thumb,
            body.gtp-smart-layout-active .gtp-region-buttons-wrap::-webkit-scrollbar-thumb,
            body.gtp-smart-layout-active .gtp-smart-col-detail::-webkit-scrollbar-thumb,
            body.gtp-smart-layout-active #gtp_smart_cal_box::-webkit-scrollbar-thumb,
            body.gtp-smart-layout-active #gtp_smart_filter_box::-webkit-scrollbar-thumb,
            body.gtp-smart-layout-active .gtp-smart-col-date::-webkit-scrollbar-thumb {
                background: #94a3b8 !important;
                border-radius: 4px !important;
            }
        `;
    }
    
    // ⛳ 골프탑 컬럼 및 버튼 정밀 탐색 & 제어 캐시
    let __gtp_cached_row = null;
    let __gtp_cached_date_col = null;
    let __gtp_cached_course_col = null;
    let __gtp_cached_detail_col = null;
    let __gtp_cached_common_parent = null;
    let __gtp_cached_form_container = null;
    let __gtp_cached_resv_blocks = [];
    let __gtp_cached_detected_regions = [];
    let __gtp_cached_optimized_btns = [];
    let __gtp_cached_orig_scroll_el = null;
    
    // 구장명 2줄 줄바꿈 및 말줄임표 풀네임 변환 함수 (줄바꿈 \n 활용)
    function formatCourseButtonText(rawTxt, titleVal) {
        let text = rawTxt;
        if (titleVal && titleVal.length > rawTxt.length && !titleVal.includes('클릭')) {
            text = titleVal;
        }
        const clean = text.replace(/\s+/g, ' ').trim();
    
        if (clean.includes('남양주')) {
            return '남양주cc\n(9홀)';
        }
        if (clean.includes('골프존') && clean.includes('천안')) {
            return '골프존\n천안';
        }
        if (clean.includes('골프존') && clean.includes('진천')) {
            return '골프존\n진천';
        }
        if (clean.includes('골프존') && clean.includes('화랑')) {
            return '골프존\n화랑';
        }
        if (clean.includes('골프존') && clean.includes('안성H')) {
            return '골프존\n안성H';
        }
        if (clean.includes('골프존') && (clean.includes('안성W') || clean.includes('안성w') || clean.includes('안성'))) {
            return '골프존\n안성W';
        }
        if (clean.includes('골프존') && clean.includes('이')) {
            return '골프존\n이천';
        }
        if (clean.includes('골프존') && clean.includes('송도')) {
            return '골프존\n송도';
        }
        if (clean.includes('베어즈')) {
            return '베어즈\n베스트';
        }
        if (clean.includes('비에이비스') && (clean.includes('...') || clean.includes('…') || clean.includes('P') || clean.includes('p') || clean.includes('퍼블릭'))) {
            return '비에이비스타\n(P)';
        }
        if (clean === '비에이비스타' || clean.startsWith('비에이비스타')) {
            return '비에이\n비스타';
        }
        if (clean.includes('캐슬렉스')) {
            return '캐슬렉스\n하남';
        }
        if (clean.includes('클럽72') && clean.includes('오션')) {
            return '클럽72\n(오션)';
        }
        if (clean.includes('클럽72') && clean.includes('하늘')) {
            return '클럽72\n(하늘)';
        }
        if (clean.includes('썬밸리') && (clean.includes('여주') || clean.includes('경기'))) {
            return '썬밸리\n여주';
        }
        if (clean.includes('썬밸리') && (clean.includes('음성') || clean.includes('충청'))) {
            return '썬밸리\n음성';
        }
        if (clean.includes('레인보우')) {
            return '레인보우\n힐스';
        }
        if (clean.includes('보령')) {
            return '보령\n베이스';
        }
        if (clean.includes('모카')) {
            return '모카\n(구:떼제베)';
        }
        if (clean.includes('임페리얼')) {
            return '임페리얼\n레이크';
        }
        if (clean.includes('대영베이스')) {
            return '대영\n베이스cc';
        }
        if (clean.includes('대영힐스')) {
            return '대영\n힐스cc';
        }
        if (clean.includes('로얄포레')) {
            return '로얄\n포레cc';
        }
        if (clean.includes('속리산')) {
            return '속리산\ncc';
        }
        if (clean.includes('솔라고')) {
            return '솔라고\ncc';
        }
        if (clean.includes('올데이')) {
            return '올데이\ncc';
        }
        if (clean.includes('플라밍고')) {
            return '플라밍고\ncc';
        }
        if (clean.includes('히든밸리')) {
            return '히든\n밸리cc';
        }
        if (clean.includes('베스트밸리')) {
            return '베스트\n밸리cc';
        }
        if (clean.includes('비전힐스')) {
            return '비전\n힐스cc';
        }
        if (clean.includes('서울한양')) {
            return '서울\n한양cc';
        }
        if (clean.includes('포레스트힐')) {
            return '포레스트\n힐cc';
        }
        if (clean.includes('한양파인')) {
            return '한양\n파인cc';
        }
        if (clean.includes('강남300')) {
            return '강남\n300cc';
        }
        if (clean.includes('그린힐')) {
            return '그린힐\ncc';
        }
        if (clean.includes('크로스비')) {
            return '더\n크로스비';
        }
        if (clean.includes('라비돌')) {
            return '라비돌\ncc';
        }
        if (clean.includes('리베라')) {
            return '리베라\ncc';
        }
        if (clean.includes('세현')) {
            return '세현\ncc';
        }
        if (clean.includes('신라')) {
            return '신라\ncc';
        }
        if (clean.includes('신안')) {
            return '신안\ncc';
        }
        if (clean.includes('양평TPC') || clean.includes('양평tpc')) {
            return '양평\nTPC';
        }
        if (clean.includes('용인cc') || clean === '용인') {
            return '용인\ncc';
        }
        if (clean.includes('지산cc') || clean === '지산') {
            return '지산\ncc';
        }
        if (clean.includes('크리스밸리')) {
            return '크리스\n밸리';
        }
        if (clean.includes('태광')) {
            return '태광\ncc';
        }
        if (clean.includes('영광')) {
            return '영광\ncc';
        }
        if (clean.includes('파인크리크')) {
            return '파인\n크리크';
        }
        if (clean.includes('한원')) {
            return '한원\ncc';
        }
        if (clean.includes('해솔리아')) {
            return '해솔리아\ncc';
        }
        if (clean.includes('(')) {
            return clean.replace('(', '\n(');
        }
        if (clean.includes('_')) {
            return clean.replace('_', '\n');
        }
        if (clean.length >= 6 && clean.endsWith('cc')) {
            return clean.slice(0, -2) + '\ncc';
        }
        return clean;
    }
    
    /**
     * ⛳ 골프탑 컬럼 정밀 탐색 함수
     * - Column 1: 날짜 선택 (달력/필터)
     * - Column 2: 골프장 선택 (지역별/구장목록)
     * - Column 3: 내용/작성일 (골프장 특이사항/할인그린피)
     */
    function findGolftopColumns() {
        // 1. 이미 네이티브 식별 속성이 마킹된 요소가 유효하게 존재하면 즉시 반환 (SPA 리렌더링 및 모바일 안정성 극대화)
        const cachedCourse = document.querySelector('[data-gtp-native-course="true"]');
        const cachedDate = document.querySelector('[data-gtp-native-date="true"]');
        const cachedDetail = document.querySelector('[data-gtp-native-detail="true"]');
        const cachedRow = document.querySelector('[data-gtp-native-row="true"]');
        if (cachedCourse && cachedDate && cachedRow && cachedDetail && document.body.contains(cachedRow)) {
            return {
                rowContainer: cachedRow,
                colDate: cachedDate,
                colCourse: cachedCourse,
                colDetail: cachedDetail
            };
        }
    
        const allHeaders = Array.from(document.querySelectorAll('th, td, div, span, h1, h2, h3, h4, h5, h6, b, strong, p'));
        const courseHeader = allHeaders.find(el => {
            if (el.closest('#gtp_smart_regions_grid')) return false;
            const t = (el.textContent || '').trim().replace(/\s+/g, '');
            return t === '골프장선택' || t === '골프장선택지역별' || (t.startsWith('골프장선택') && t.length <= 15);
        });
    
        if (!courseHeader) {
            return null;
        }
    
        let cur = courseHeader;
        let rowContainer = null;
        let colDate = null;
        let colCourse = null;
        let colDetail = null;
    
        for (let step = 0; step < 8 && cur && cur.parentElement && cur.parentElement !== document.body; step++) {
            const parent = cur.parentElement;
            const children = Array.from(parent.children);
    
            const dateChild = children.find(c => {
                const txt = c.textContent || '';
                return (txt.includes('날짜 선택') || txt.includes('날짜선택')) && !txt.includes('골프장 선택');
            });
    
            const courseChild = children.find(c => {
                const txt = c.textContent || '';
                return (txt.includes('골프장 선택') || txt.includes('골프장선택') || txt.includes('경기북부')) && !txt.includes('날짜 선택');
            });
    
            if (dateChild && courseChild) {
                rowContainer = parent;
                colDate = dateChild;
                colCourse = courseChild;
    
                // 네이티브 요소 태깅
                try {
                    rowContainer.dataset.gtpNativeRow = "true";
                    colDate.dataset.gtpNativeDate = "true";
                    colCourse.dataset.gtpNativeCourse = "true";
                } catch (e) {}
    
                const detailChild = children.find(c => {
                    if (c === colDate || c === colCourse) return false;
                    const txt = c.textContent || '';
                    return (txt.includes('내용') && txt.includes('작성일')) || txt.includes('골프장을 선택') || txt.includes('골프장을선택') || txt.includes('특이사항') || txt.includes('할인');
                });
    
                if (detailChild) {
                    colDetail = detailChild;
                    try { colDetail.dataset.gtpNativeDetail = "true"; } catch (e) {}
                } else {
                    // In Golftop native rowContainer, children are [colDate, colCourse, colDetail]
                    // Any child that is neither colDate nor colCourse is colDetail!
                    const otherChild = children.find(c => c !== colDate && c !== colCourse);
                    if (otherChild) {
                        colDetail = otherChild;
                        try { colDetail.dataset.gtpNativeDetail = "true"; } catch (e) {}
                    }
                }
                break;
            }
            cur = parent;
        }
    
        // Fallback: If colDetail is null or invalid, search rowContainer descendants for '내용' and '작성일'
        if (!colDetail && rowContainer) {
            const candidates = Array.from(rowContainer.querySelectorAll('td, div, section')).filter(el => {
                if (el === colDate || el === colCourse) return false;
                if (colDate && colDate.contains(el)) return false;
                if (colCourse && colCourse.contains(el)) return false;
                const t = el.textContent || '';
                return ((t.includes('내용') && t.includes('작성일')) || t.includes('골프장을 선택') || t.includes('골프장을선택')) && !t.includes('잔여타임');
            });
            if (candidates.length > 0) {
                let best = candidates[0];
                while (best.parentElement && best.parentElement !== rowContainer) {
                    best = best.parentElement;
                }
                colDetail = best;
                try { colDetail.dataset.gtpNativeDetail = "true"; } catch (e) {}
            }
        }
    
        if (colDetail) {
            const dTxt = colDetail.textContent || '';
            if (colDetail === colDate || colDetail === colCourse || dTxt.includes('경기북부') || dTxt.includes('경기남부')) {
                colDetail = null;
            }
        }
    
        return { rowContainer, colDate, colCourse, colDetail };
    }
    
    /**
     * [달력]과 [필터선택] 분리 헬퍼
     * - Col 1(colDate) 내부에서 '잔여타임 필터' 요소를 기점으로 달력 영역과 필터 영역을 2개 카드로 분리
     */
    function styleGolftopFilterBoxHeader(filterBox) {
        if (!filterBox) return;
        const hdrRow = Array.from(filterBox.querySelectorAll('div, p, header, section')).find(el => {
            const t = (el.innerText || el.textContent || '').replace(/\s+/g, '');
            return t.includes('잔여타임필터') && t.includes('초기화') && !el.querySelector('input[type="checkbox"]');
        });
        if (hdrRow) {
            hdrRow.style.setProperty('display', 'flex', 'important');
            hdrRow.style.setProperty('flex-direction', 'row', 'important');
            hdrRow.style.setProperty('flex-wrap', 'nowrap', 'important');
            hdrRow.style.setProperty('align-items', 'center', 'important');
            hdrRow.style.setProperty('justify-content', 'space-between', 'important');
            hdrRow.style.setProperty('gap', '4px', 'important');
            hdrRow.style.setProperty('padding', '4px 6px', 'important');
            hdrRow.style.setProperty('white-space', 'nowrap', 'important');
            Array.from(hdrRow.querySelectorAll('*')).forEach(ch => {
                ch.style.setProperty('white-space', 'nowrap', 'important');
                ch.style.setProperty('word-break', 'keep-all', 'important');
                ch.style.setProperty('flex-shrink', '0', 'important');
            });
        }
    }
    
    function separateGolftopDateAndFilter(colDate) {
        if (!colDate) return null;
    
        let calBox = colDate.querySelector('#gtp_smart_cal_box');
        let filterBox = colDate.querySelector('#gtp_smart_filter_box');
        if (calBox && filterBox) {
            calBox.style.setProperty('display', 'block', 'important');
            filterBox.style.setProperty('display', 'block', 'important');
            styleGolftopFilterBoxHeader(filterBox);
            return { calBox, filterBox };
        }
    
        // colDate 내부에서 '잔여타임 필터' 텍스트를 포함하는 헤더/컨테이너 탐색
        const allDescendants = Array.from(colDate.querySelectorAll('div, table, section, form, p, span, h1, h2, h3, h4, h5, h6, b, strong'));
        const filterHeader = allDescendants.find(el => {
            if (el.children.length > 3) return false;
            const txt = (el.innerText || el.textContent || '').trim().replace(/\s+/g, '');
            return txt.includes('잔여타임필터') || txt.includes('필터중복허용') || (txt.includes('필터') && (txt.includes('중복') || txt.includes('허용') || txt.includes('초기화')));
        });
    
        if (!filterHeader) {
            console.warn("[골프탑 스마트뷰] ⚠️ 잔여타임 필터 헤더를 찾지 못함");
            return null;
        }
    
        // colDate의 직계 자식 수준에서 분할 기준 요소 결정
        let container = colDate;
        let filterTopChild = filterHeader;
        while (filterTopChild.parentElement && filterTopChild.parentElement !== colDate) {
            filterTopChild = filterTopChild.parentElement;
        }
    
        // colDate가 1개의 래퍼 div만을 가지고 있다면 그 내부 컨테이너에서 분할
        if (colDate.children.length === 1 && filterTopChild === colDate.firstElementChild) {
            let inner = filterHeader;
            while (inner.parentElement && inner.parentElement !== colDate.firstElementChild) {
                inner = inner.parentElement;
            }
            container = colDate.firstElementChild;
            filterTopChild = inner;
        }
    
        const children = Array.from(container.children);
        const filterIdx = children.indexOf(filterTopChild);
        if (filterIdx < 0) return null;
    
        calBox = document.createElement('div');
        calBox.id = 'gtp_smart_cal_box';
        calBox.className = 'gtp-smart-cal-card';
    
        filterBox = document.createElement('div');
        filterBox.id = 'gtp_smart_filter_box';
        filterBox.className = 'gtp-smart-filter-card';
    
        // 필터 이전 요소들은 달력 카드로 이동
        for (let i = 0; i < filterIdx; i++) {
            calBox.appendChild(children[i]);
        }
        // 필터 및 그 이후 요소들은 필터 카드로 이동
        for (let i = filterIdx; i < children.length; i++) {
            filterBox.appendChild(children[i]);
        }
    
        container.appendChild(calBox);
        container.appendChild(filterBox);
    
        container.style.setProperty('display', 'flex', 'important');
        container.style.setProperty('flex-direction', 'row', 'important');
        container.style.setProperty('gap', '6px', 'important');
        container.style.setProperty('align-items', 'flex-start', 'important');
        container.style.setProperty('width', 'auto', 'important');
        container.style.setProperty('max-width', 'none', 'important');
        container.style.setProperty('height', '235px', 'important');
        container.style.setProperty('min-height', '235px', 'important');
        container.style.setProperty('max-height', '235px', 'important');
    
        if (container !== colDate) {
            colDate.style.setProperty('display', 'flex', 'important');
            colDate.style.setProperty('flex-direction', 'row', 'important');
            colDate.style.setProperty('gap', '6px', 'important');
            colDate.style.setProperty('width', 'auto', 'important');
            colDate.style.setProperty('max-width', 'none', 'important');
            colDate.style.setProperty('height', '235px', 'important');
            colDate.style.setProperty('min-height', '235px', 'important');
            colDate.style.setProperty('max-height', '235px', 'important');
        }
    
        styleGolftopFilterBoxHeader(filterBox);
        console.log("[골프탑 스마트뷰] 📅 달력 및 🔍 필터선택 2개 카드 좌우 분할 완료");
        return { calBox, filterBox };
    }
    
    /**
     * 달력 및 필터 카드 원상 복원
     */
    function restoreGolftopDateAndFilter(colDate) {
        if (!colDate) return;
        const calBox = colDate.querySelector('#gtp_smart_cal_box');
        const filterBox = colDate.querySelector('#gtp_smart_filter_box');
        if (calBox && filterBox) {
            const parent = calBox.parentElement;
            while (calBox.firstChild) {
                parent.insertBefore(calBox.firstChild, calBox);
            }
            while (filterBox.firstChild) {
                parent.insertBefore(filterBox.firstChild, filterBox);
            }
            calBox.remove();
            filterBox.remove();
            parent.style.removeProperty('display');
            parent.style.removeProperty('flex-direction');
            parent.style.removeProperty('gap');
            parent.style.removeProperty('align-items');
            parent.style.removeProperty('height');
            parent.style.removeProperty('min-height');
            parent.style.removeProperty('max-height');
        }
    }
    
    /**
     * 2열(골프장 선택) 내부의 실제 세로 스크롤 컨테이너 탐색
     */
    function findCourseScrollElement(colCourse) {
        if (!colCourse) return null;
        if (__gtp_cached_orig_scroll_el && colCourse.contains(__gtp_cached_orig_scroll_el)) {
            return __gtp_cached_orig_scroll_el;
        }
        const candidates = Array.from(colCourse.querySelectorAll('div, ul, section, table'));
        let best = null;
        for (const el of candidates) {
            // ★ 스마트 그리드 내부는 절대 매칭하지 않음 (모바일 증발 원천 차단)
            if (el.id === 'gtp_smart_regions_grid' || el.closest('#gtp_smart_regions_grid')) continue;
            const txt = el.textContent || '';
            if (txt.includes('경기북부') && txt.includes('경기남부')) {
                if (!best || best.contains(el)) {
                    best = el;
                }
            }
        }
        if (best) {
            __gtp_cached_orig_scroll_el = best;
        }
        return best;
    }
    
    /**
     * 2열(골프장 선택) 내부의 실제 구장 선택 버튼들만 정밀 탐색
     */
    function findCourseButtons(colCourse) {
        if (!colCourse) return [];
        // colCourse 내부의 모든 클릭 가능한 후보 요소 직접 탐색 (그리드 내부 제외)
        const candidateElements = Array.from(colCourse.querySelectorAll('button, a, [role="button"], input[type="button"], .btn, span, td, div, li, label'))
            .filter(el => !el.closest('#gtp_smart_regions_grid'));
    
        const uniqueSet = new Set();
        const result = [];
    
        candidateElements.forEach(el => {
            if (el.children.length >= 3) return; // 컨테이너 제외
    
            const btn = el.closest('button, a, [role="button"], input[type="button"], .btn') || el;
            if (uniqueSet.has(btn)) return;
    
            const rawTxt = (btn.dataset.gtpOrigText || btn.textContent || '').trim();
            if (rawTxt.length < 2 || rawTxt.length > 30) return;
    
            const cleanT = rawTxt.replace(/\s+/g, '');
            // 헤더 및 타이틀 제외
            if (cleanT.includes('골프장선택') || cleanT.includes('지역별') || cleanT === '골프장선택지역별') return;
            if (cleanT.includes('작성일') || cleanT.includes('내용')) return;
    
            const normRegion = cleanT.replace(/[\s\[\]\-:_]/g, '');
            if (['경기북부', '경기남부', '충청도', '강원도', '경상도', '전라도', '제주도', '충청', '강원', '전라', '경상', '제주', '조회', '초기화', '필터', '달력', '기간'].includes(normRegion)) {
                return;
            }
    
            uniqueSet.add(btn);
            result.push(btn);
        });
    
        return result;
    }
    
    /**
     * ⛳ 골프장 선택 권역 그리드 (골프락 스타일) 빌더:
     * [열1]: [경기북부] -> [강원도] -> [제주도]
     * [열2]: [경기남부] (구장 수만큼 하단 확장) -> [경상도]
     * [열3]: [충청도]   (구장 수만큼 하단 확장) -> [전라도]
     * - 지역별 내부 스크롤 완전 제거!
     * - 우측 전체 단일 스크롤바로 매끄럽게 통일
     */
    function buildGolftopRegionsGrid(colCourse) {
        if (!colCourse) return 0;
    
        // ★ 1. 구장 버튼 탐색을 먼저 수행! (버튼이 없으면 DOM을 절대 숨기지 않고 원본 유지)
        const allBtns = findCourseButtons(colCourse);
        if (allBtns.length === 0) {
            console.warn("[골프탑 스마트뷰] ⚠️ 구장 버튼을 찾지 못하여 원본 유지");
            return 0;
        }
    
        // 2. 원본 세로 스크롤 컨테이너 탐색 및 안전한 오프스크린 숨김 (DOM, 가시성 및 스타일 연산 100% 보존)
        const scrollEl = findCourseScrollElement(colCourse);
        if (scrollEl && scrollEl !== colCourse) {
            if (!scrollEl.__gtp_orig_style) {
                scrollEl.__gtp_orig_style = {
                    position: scrollEl.style.position || '',
                    width: scrollEl.style.width || '',
                    opacity: scrollEl.style.opacity || '',
                    height: scrollEl.style.height || '',
                    maxHeight: scrollEl.style.maxHeight || '',
                    overflow: scrollEl.style.overflow || '',
                    margin: scrollEl.style.margin || '',
                    padding: scrollEl.style.padding || '',
                    border: scrollEl.style.border || '',
                    pointerEvents: scrollEl.style.pointerEvents || '',
                    zIndex: scrollEl.style.zIndex || ''
                };
            }
            scrollEl.style.setProperty('position', 'absolute', 'important');
            scrollEl.style.setProperty('width', '1px', 'important');
            scrollEl.style.setProperty('opacity', '0', 'important');
            scrollEl.style.setProperty('height', '1px', 'important');
            scrollEl.style.setProperty('max-height', '1px', 'important');
            scrollEl.style.setProperty('overflow', 'hidden', 'important');
            scrollEl.style.setProperty('margin', '0px', 'important');
            scrollEl.style.setProperty('padding', '0px', 'important');
            scrollEl.style.setProperty('border', 'none', 'important');
            scrollEl.style.setProperty('pointer-events', 'none', 'important');
            scrollEl.style.setProperty('z-index', '-1', 'important');
        }
    
        // colCourse 내부의 다른 불필요 요소 숨김 (원본 구장 버튼을 포함한 컨테이너는 display:none 대신 1px 오프스크린 처리하여 필터 하이라이트 스타일 연산 유지!)
        Array.from(colCourse.children).forEach(child => {
            if (child !== scrollEl && child.id !== 'gtp_smart_regions_grid') {
                if (scrollEl && child.contains(scrollEl)) return;
                const txt = (child.textContent || '').trim();
                const isHeader = (txt.includes('골프장 선택') || txt.includes('골프장선택')) && !txt.includes('경기북부') && !txt.includes('경기남부');
                if (!isHeader) {
                    const hasOrigBtns = allBtns.some(b => child.contains(b));
                    if (hasOrigBtns) {
                        child.style.setProperty('position', 'absolute', 'important');
                        child.style.setProperty('width', '1px', 'important');
                        child.style.setProperty('height', '1px', 'important');
                        child.style.setProperty('max-height', '1px', 'important');
                        child.style.setProperty('opacity', '0', 'important');
                        child.style.setProperty('overflow', 'hidden', 'important');
                        child.style.setProperty('pointer-events', 'none', 'important');
                        child.style.setProperty('z-index', '-1', 'important');
                    } else {
                        if (child.__gtp_orig_display === undefined) {
                            child.__gtp_orig_display = child.style.display || '';
                        }
                        child.style.display = 'none';
                    }
                }
            }
        });
    
        let gridContainer = colCourse.querySelector('#gtp_smart_regions_grid');
        if (!gridContainer) {
            gridContainer = document.createElement('div');
            gridContainer.id = 'gtp_smart_regions_grid';
            gridContainer.className = 'gtp-regions-grid';
        }
    
        gridContainer.style.setProperty('display', 'grid', 'important');
        gridContainer.style.setProperty('grid-template-columns', 'repeat(3, minmax(0, 1fr))', 'important');
        gridContainer.style.setProperty('gap', '6px', 'important');
        gridContainer.style.setProperty('width', '100%', 'important');
        gridContainer.style.setProperty('max-width', '100%', 'important');
        gridContainer.style.setProperty('min-width', '100%', 'important');
        gridContainer.style.setProperty('box-sizing', 'border-box', 'important');
        gridContainer.style.setProperty('align-items', 'start', 'important');
        if (!gridContainer.dataset.gtpDynamicMaxH) {
            gridContainer.style.setProperty('max-height', '480px', 'important');
        }
        gridContainer.style.setProperty('overflow-y', 'auto', 'important');
        gridContainer.style.setProperty('-webkit-overflow-scrolling', 'touch', 'important');
        gridContainer.style.setProperty('overscroll-behavior-y', 'contain', 'important');
        gridContainer.style.setProperty('touch-action', 'pan-x pan-y pinch-zoom', 'important');
        gridContainer.style.setProperty('padding', '2px 2px 24px 2px', 'important');
    
        // 모바일(폴드 등)에서 body zoom 적용 시에도 구장 그리드 한 손가락 터치 스크롤이 끝까지 매끄럽게 동작하도록 보강
        if (gridContainer.dataset.gtpTouchScrollAttached !== 'true') {
            gridContainer.dataset.gtpTouchScrollAttached = 'true';
            let tStartY = 0;
            let tStartX = 0;
            let tStartScroll = 0;
            let tIsDragging = false;
    
            gridContainer.addEventListener('touchstart', (e) => {
                if (!e.touches || e.touches.length !== 1) {
                    tIsDragging = false;
                    return;
                }
                tStartY = e.touches[0].clientY;
                tStartX = e.touches[0].clientX;
                tStartScroll = gridContainer.scrollTop;
                tIsDragging = false;
            }, { passive: true });
    
            gridContainer.addEventListener('touchmove', (e) => {
                if (!e.touches || e.touches.length !== 1) return;
                const dy = tStartY - e.touches[0].clientY;
                const dx = Math.abs(e.touches[0].clientX - tStartX);
                if (!tIsDragging && Math.abs(dy) > 7 && Math.abs(dy) > dx) {
                    tIsDragging = true;
                }
                if (tIsDragging) {
                    const curZoom = parseFloat(document.body.style.zoom) || 1;
                    const nextScroll = Math.max(0, tStartScroll + (dy / curZoom));
                    if (Math.abs(gridContainer.scrollTop - nextScroll) > 3) {
                        gridContainer.scrollTop = nextScroll;
                    }
                    if (e.cancelable) e.preventDefault();
                }
            }, { passive: false });
    
            const finishTouchDrag = () => {
                if (tIsDragging) {
                    gridContainer.dataset.gtpJustScrolled = 'true';
                    setTimeout(() => { delete gridContainer.dataset.gtpJustScrolled; }, 140);
                }
                tIsDragging = false;
            };
            gridContainer.addEventListener('touchend', finishTouchDrag, { passive: true });
            gridContainer.addEventListener('touchcancel', finishTouchDrag, { passive: true });
        }
    
        // 3개 독립 세로 열 구성 정의
        const colDefs = [
            { colIndex: 1, regions: ['경기북부', '강원도', '제주도'] },
            { colIndex: 2, regions: ['경기남부', '경상도'] },
            { colIndex: 3, regions: ['충청도', '전라도'] }
        ];
    
        const regionCardsMap = new Map();
    
        colDefs.forEach(cDef => {
            let colEl = gridContainer.querySelector(`.gtp-region-col[data-gtp-col="${cDef.colIndex}"]`);
            if (!colEl) {
                colEl = document.createElement('div');
                colEl.className = 'gtp-region-col';
                colEl.dataset.gtpCol = String(cDef.colIndex);
                colEl.style.setProperty('display', 'flex', 'important');
                colEl.style.setProperty('flex-direction', 'column', 'important');
                colEl.style.setProperty('gap', '6px', 'important');
                colEl.style.setProperty('width', '100%', 'important');
                colEl.style.setProperty('min-width', '0', 'important');
                colEl.style.setProperty('box-sizing', 'border-box', 'important');
                gridContainer.appendChild(colEl);
            }
    
            cDef.regions.forEach(regName => {
                let card = colEl.querySelector(`.gtp-region-card[data-gtp-region="${regName}"]`);
                let headerBadge;
                let btnsWrap;
    
                if (!card) {
                    card = document.createElement('div');
                    card.className = 'gtp-region-card';
                    card.dataset.gtpRegion = regName;
    
                    headerBadge = document.createElement('div');
                    headerBadge.className = 'gtp-region-header-styled';
                    headerBadge.innerText = `[${regName}]`;
                    card.appendChild(headerBadge);
    
                    btnsWrap = document.createElement('div');
                    btnsWrap.className = 'gtp-region-buttons-wrap';
                    card.appendChild(btnsWrap);
    
                    colEl.appendChild(card);
                } else {
                    headerBadge = card.querySelector('.gtp-region-header-styled');
                    if (!headerBadge) {
                        headerBadge = document.createElement('div');
                        headerBadge.className = 'gtp-region-header-styled';
                        headerBadge.innerText = `[${regName}]`;
                        card.insertBefore(headerBadge, card.firstChild);
                    }
                    btnsWrap = card.querySelector('.gtp-region-buttons-wrap');
                    if (!btnsWrap) {
                        btnsWrap = document.createElement('div');
                        btnsWrap.className = 'gtp-region-buttons-wrap';
                        card.appendChild(btnsWrap);
                    }
                }
    
                // 헤더 뱃지 100% 가시성 보장
                headerBadge.style.setProperty('display', 'block', 'important');
                headerBadge.style.setProperty('visibility', 'visible', 'important');
                headerBadge.innerText = `[${regName}]`;
    
                // 카드는 구장 수에 맞춰 하단으로 자유롭게 늘어남 (내부 스크롤 제거!)
                card.style.setProperty('width', '100%', 'important');
                card.style.setProperty('min-width', '0', 'important');
                card.style.setProperty('box-sizing', 'border-box', 'important');
                card.style.setProperty('height', 'auto', 'important');
                card.style.setProperty('max-height', 'none', 'important');
                card.style.setProperty('overflow', 'visible', 'important');
    
                // 버튼 그리드는 3열로 하단으로 100% 펼쳐짐 (내부 스크롤 제거!)
                btnsWrap.style.setProperty('display', 'grid', 'important');
                btnsWrap.style.setProperty('grid-template-columns', 'repeat(3, minmax(0, 1fr))', 'important');
                btnsWrap.style.setProperty('gap', '3px', 'important');
                btnsWrap.style.setProperty('width', '100%', 'important');
                btnsWrap.style.setProperty('min-width', '100%', 'important');
                btnsWrap.style.setProperty('box-sizing', 'border-box', 'important');
                btnsWrap.style.setProperty('align-content', 'start', 'important');
                btnsWrap.style.setProperty('height', 'auto', 'important');
                btnsWrap.style.setProperty('max-height', 'none', 'important');
                btnsWrap.style.setProperty('overflow', 'visible', 'important');
    
                regionCardsMap.set(regName, { card, btnsWrap });
            });
        });
    
        // ★ 원본 골프탑 화면의 지역 헤더(충청도/강원도 등) 위치 기준으로 권역 판정 (원본 분류 그대로 따름)
        const REGION_ALIAS = {
            '경기북부': '경기북부', '경기남부': '경기남부',
            '충청도': '충청도', '충청': '충청도',
            '강원도': '강원도', '강원': '강원도',
            '경상도': '경상도', '경상': '경상도',
            '전라도': '전라도', '전라': '전라도',
            '제주도': '제주도', '제주': '제주도'
        };
        const origRegionHeaders = [];
        {
            const searchRoot = scrollEl || colCourse;
            Array.from(searchRoot.querySelectorAll('*')).forEach(el => {
                if (el.closest('#gtp_smart_regions_grid')) return;
                if (el.children.length > 1) return;
                const norm = (el.textContent || '').replace(/[\s\[\]\-:_]/g, '');
                const reg = REGION_ALIAS[norm];
                if (!reg) return;
                if (el.children.length === 1 && REGION_ALIAS[(el.children[0].textContent || '').replace(/[\s\[\]\-:_]/g, '')]) return;
                origRegionHeaders.push({ el, reg });
            });
        }
        function getRegionFromOrigDom(btn) {
            let found = null;
            for (const h of origRegionHeaders) {
                if (h.el === btn || h.el.contains(btn)) continue;
                if (h.el.compareDocumentPosition(btn) & Node.DOCUMENT_POSITION_FOLLOWING) {
                    found = h.reg;
                }
            }
            return found;
        }
    
        // 구장명 기반 권역 매칭 함수 (원본 DOM 판정 실패 시 폴백)
        function getRegionForButton(btn) {
            const domReg = getRegionFromOrigDom(btn);
            if (domReg) return domReg;
            const rawTxt = (btn.dataset.gtpOrigText || btn.textContent || '').trim().replace(/\s+/g, '');
            if (rawTxt.includes('알프스대영')) return '강원도';
            if (rawTxt.includes('영광')) return '전라도';
            if (rawTxt.includes('스프링데일') || rawTxt.includes('엘리시안') || rawTxt.includes('라온') || rawTxt.includes('타미우스') || rawTxt.includes('에코랜드') || rawTxt.includes('제주')) return '제주도';
            if (rawTxt.includes('벨라스톤') || rawTxt.includes('블랙밸리') || rawTxt.includes('샤인데일') || rawTxt.includes('동원썬밸리') || rawTxt.includes('썬밸리') || rawTxt.includes('비콘힐스') || rawTxt.includes('설악') || rawTxt.includes('알펜시아') || rawTxt.includes('에스파크남한강') || rawTxt.includes('옥스필드') || rawTxt.includes('웰리힐리') || rawTxt.includes('파인밸리')) return '강원도';
            if (rawTxt.includes('가산') || rawTxt.includes('에스파크밀양') || rawTxt.includes('엠스클럽') || rawTxt.includes('스톤비치') || rawTxt.includes('스프링힐') || rawTxt.includes('클럽디거창') || rawTxt.includes('마우나')) return '경상도';
            if (rawTxt.includes('골프존진천') || rawTxt.includes('골프존천안') || rawTxt.includes('골프존화랑') || rawTxt.includes('대영') || rawTxt.includes('로얄포레') || rawTxt.includes('속리산') || rawTxt.includes('솔라고') || rawTxt.includes('올데이') || rawTxt.includes('플라밍고') || rawTxt.includes('히든밸리') || rawTxt.includes('레인보우') || rawTxt.includes('보령') || rawTxt.includes('모카') || rawTxt.includes('임페리얼') || rawTxt.includes('진천') || rawTxt.includes('천안') || rawTxt.includes('화랑') || rawTxt.includes('떼제베') || rawTxt.includes('클럽디보은') || rawTxt.includes('감곡') || rawTxt.includes('그랜드청주') || rawTxt.includes('동촌') || rawTxt.includes('로얄링스') || rawTxt.includes('마론뉴데이') || rawTxt.includes('백제') || rawTxt.includes('블랙스톤벨포레') || rawTxt.includes('세레니티') || rawTxt.includes('아름다운')) return '충청도';
            if (rawTxt.includes('고양') || rawTxt.includes('남양주') || rawTxt.includes('베스트밸리') || rawTxt.includes('비전힐스') || rawTxt.includes('서울한양') || rawTxt.includes('파주') || rawTxt.includes('포레스트힐') || rawTxt.includes('한양파인') || rawTxt.includes('리싸') || rawTxt.includes('리앤리') || rawTxt.includes('베뉴지') || rawTxt.includes('삼발라') || rawTxt.includes('서서울') || rawTxt.includes('스마트KU') || rawTxt.includes('썬힐') || rawTxt.includes('자유로') || rawTxt.includes('제이퍼블릭') || rawTxt.includes('크리스탈밸리') || rawTxt.includes('포천힐스') || rawTxt.includes('필로스') || rawTxt.includes('한림광릉')) return '경기북부';
    
            return '경기남부';
        }
    
        // 기존 버튼 초기화 후 프록시 버튼 생성 (중복 방지)
        regionCardsMap.forEach(regData => {
            regData.btnsWrap.innerHTML = '';
        });
    
        const createdBtns = [];
        allBtns.forEach(origBtn => {
            const rawTxt = (origBtn.dataset.gtpOrigText || origBtn.textContent || '').trim();
            const regName = getRegionForButton(origBtn);
            const regData = regionCardsMap.get(regName);
            if (!regData) return;
    
            const titleVal = origBtn.getAttribute('title');
            const formatted = formatCourseButtonText(rawTxt, titleVal);
    
            const gridBtn = document.createElement('button');
            gridBtn.type = 'button';
            gridBtn.className = 'gtp-smart-course-btn';
            gridBtn.innerText = formatted;
            gridBtn.setAttribute('title', titleVal || rawTxt);
            gridBtn.dataset.gtpOrigText = rawTxt;
            gridBtn.__gtp_orig_btn = origBtn;
            origBtn.__gtp_grid_btn = gridBtn;
    
            // 원본 요소가 이미 active/selected 상태이면 스타일 반영
            if (origBtn.classList.contains('active') || origBtn.classList.contains('selected')) {
                gridBtn.classList.add('active', 'selected');
            }
    
            // 구장 버튼 클릭 핸들러 (골프탑 네이티브 클릭 완벽 트리거)
            gridBtn.addEventListener('click', async (e) => {
                if (gridContainer && gridContainer.dataset.gtpJustScrolled === 'true') {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                }
                e.preventDefault();
                e.stopPropagation();
    
                // 1. UI 선택 하이라이트 반영 (필터 하이라이트는 유지하면서 선택 상태만 갱신)
                document.querySelectorAll('.gtp-smart-course-btn').forEach(b => {
                    b.classList.remove('active', 'selected');
                    if (!b.classList.contains('gtp-filter-lit')) {
                        b.style.removeProperty('background');
                        b.style.removeProperty('color');
                        b.style.removeProperty('border-color');
                        b.style.removeProperty('border');
                    }
                });
                gridBtn.classList.add('active', 'selected');
                if (!gridBtn.classList.contains('gtp-filter-lit')) {
                    gridBtn.style.setProperty('background', '#2563eb', 'important');
                    gridBtn.style.setProperty('color', '#ffffff', 'important');
                    gridBtn.style.setProperty('border-color', '#1d4ed8', 'important');
                }
    
                // 2. 원본 구장 요소 클릭 트리거
                console.log(`[골프탑 스마트뷰] ⛳ 구장 버튼 클릭: [${rawTxt}]`);
                if (origBtn) {
                    if (typeof origBtn.onclick === 'function') {
                        try { origBtn.onclick.call(origBtn, e); } catch (err) {}
                    }
                    const href = origBtn.getAttribute('href');
                    if (href && href.startsWith('javascript:')) {
                        try {
                            const code = href.replace(/^javascript:/i, '');
                            const script = document.createElement('script');
                            script.textContent = code;
                            document.body.appendChild(script);
                            script.remove();
                        } catch (err) {}
                    }
                    await humanClick(origBtn);
                    setTimeout(() => {
                        if (document.body.classList.contains('gtp-smart-layout-active')) {
                            syncGolftopCourseButtonHighlights();
                            optimizeGolftopRightColumn(__gtp_cached_row);
                            collapseTopMiddleGap(__gtp_cached_row, null, __gtp_cached_resv_blocks);
                        }
                    }, 200);
                    setTimeout(() => {
                        if (document.body.classList.contains('gtp-smart-layout-active')) {
                            syncGolftopCourseButtonHighlights();
                            optimizeGolftopRightColumn(__gtp_cached_row);
                            collapseTopMiddleGap(__gtp_cached_row, null, __gtp_cached_resv_blocks);
                        }
                    }, 500);
                }
            });
    
            regData.btnsWrap.appendChild(gridBtn);
            createdBtns.push(gridBtn);
        });
    
        __gtp_cached_optimized_btns = createdBtns;
        __gtp_cached_common_parent = colCourse;
    
        if (gridContainer.parentElement !== colCourse) {
            colCourse.appendChild(gridContainer);
        }
    
        syncGolftopCourseButtonHighlights();
        initGolftopFilterHighlightListeners();
    
        console.log(`[골프탑 스마트뷰] ✅ 골프락 스타일 권역 그리드 생성 완료 (3개 세로 열, 내부 스크롤 없음, 구장 ${createdBtns.length}개)`);
        return createdBtns.length;
    }
    
    let __gtp_filter_highlight_listeners_attached = false;
    
    function normalizeGolftopCourseKey(name) {
        if (!name) return '';
        return String(name)
            .trim()
            .replace(/\(\s*9\s*홀\s*x\s*2\s*\)/gi, '')
            .replace(/\(\s*9\s*홀\s*\)/gi, '')
            .replace(/\(\s*18\s*홀\s*\)/gi, '')
            .replace(/\(\s*구[.:]?\s*[^)]*\)/gi, '')
            .replace(/\.{2,}|…/g, '')
            .replace(/cc|gc|컨트리클럽|골프클럽/gi, '')
            .replace(/[\s_\-]/g, '')
            .toLowerCase();
    }
    
    function parseGolftopRgbColor(str) {
        if (!str) return null;
        const m = String(str).match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/i);
        if (!m) return null;
        return {
            r: Number(m[1]),
            g: Number(m[2]),
            b: Number(m[3]),
            a: m[4] !== undefined ? Number(m[4]) : 1
        };
    }
    
    /**
     * 우측 잔여타임 테이블의 개별 행(tr)이 현재 체크된 잔여타임 필터 조건에 실제로 부합하는지 정밀 판별
     */
    function doesGolftopRowMatchCheckedFilters(tr, checkedLabels) {
        if (!tr || !checkedLabels || checkedLabels.length === 0) return false;
        if (tr.offsetHeight === 0) return false;
        const trCs = getComputedStyle(tr);
        if (trCs.display === 'none' || trCs.visibility === 'hidden' || parseFloat(trCs.opacity) === 0) return false;
    
        const tds = Array.from(tr.querySelectorAll('td'));
        if (tds.length < 2) return false;
    
        const timeTxt = (tds[1]?.textContent || '').trim();
        const noteTxt = (tds[4]?.textContent || '').trim().replace(/\s+/g, '');
        const btnEl = (tds[5] && tds[5].querySelector('button, a, .btn, span')) || tds[5] || tr;
        const actionTxt = (tds[5]?.textContent || '').trim().replace(/\s+/g, '');
    
        // 행의 타임 유형 판별: 실시간('신청'), 확정타임(빨간색 + '보기'), 대기(초록색 + '보기')
        const isRealtime = actionTxt.includes('신청');
        let isConfirmed = false;
        let isWaiting = false;
        if (actionTxt.includes('보기')) {
            const sampleCell = tds[0] || tds[1] || tr;
            const cRgb = parseGolftopRgbColor(getComputedStyle(sampleCell).color);
            const bRgb = btnEl ? parseGolftopRgbColor(getComputedStyle(btnEl).backgroundColor) : null;
            if ((cRgb && cRgb.r >= 160 && (cRgb.r - cRgb.g) >= 30) || (bRgb && bRgb.r >= 160 && (bRgb.r - bRgb.g) >= 30)) {
                isConfirmed = true;
            } else if (cRgb && cRgb.g >= 110 && (cRgb.g - cRgb.r) >= 15) {
                isWaiting = true;
            } else {
                isConfirmed = true;
            }
        }
    
        // 1) 구분 필터 체크 확인 ('실시간만', '확정타임만', '대기만', '실+확정+대', '실+확정')
        const typeFilters = checkedLabels.filter(l => ['실시간만', '확정타임만', '대기만', '실+확정+대', '실+확정'].includes(l));
        if (typeFilters.length > 0) {
            let typeMatched = false;
            for (const tf of typeFilters) {
                if (tf === '실시간만' && isRealtime) typeMatched = true;
                else if (tf === '확정타임만' && isConfirmed) typeMatched = true;
                else if (tf === '대기만' && isWaiting) typeMatched = true;
                else if (tf === '실+확정' && (isRealtime || isConfirmed)) typeMatched = true;
                else if (tf === '실+확정+대' && (isRealtime || isConfirmed || isWaiting)) typeMatched = true;
            }
            if (!typeMatched) return false;
        }
    
        // 2) 부제 필터 체크 확인 ('1부잔여', '2부잔여', '3부잔여')
        const partFilters = checkedLabels.filter(l => ['1부잔여', '2부잔여', '3부잔여'].includes(l));
        if (partFilters.length > 0) {
            const hm = timeTxt.match(/(\d{1,2}):(\d{2})/);
            if (hm) {
                const hour = Number(hm[1]);
                let partMatched = false;
                for (const pf of partFilters) {
                    if (pf === '1부잔여' && hour < 10) partMatched = true;
                    else if (pf === '2부잔여' && hour >= 10 && hour < 16) partMatched = true;
                    else if (pf === '3부잔여' && hour >= 16) partMatched = true;
                }
                if (!partMatched) return false;
            }
        }
    
        // 3) 성별/인원 조건 필터 확인 ('남여대기', '남남대기', '3인가능')
        if (checkedLabels.includes('남여대기') && !checkedLabels.includes('남남대기')) {
            if (!noteTxt.includes('남여')) return false;
        } else if (checkedLabels.includes('남남대기') && !checkedLabels.includes('남여대기')) {
            if (!noteTxt.includes('남남')) return false;
        } else if (checkedLabels.includes('남여대기') && checkedLabels.includes('남남대기')) {
            if (!noteTxt.includes('남여') && !noteTxt.includes('남남')) return false;
        }
        if (checkedLabels.includes('3인가능')) {
            if (!noteTxt.includes('3인')) return false;
        }
    
        return true;
    }
    
    /**
     * 잔여타임 필터 체크 시(또는 날짜 변경 시) 해당 필터 조건의 잔여타임이 있는 구장 버튼에만 불이 들어오도록(노란색 하이라이트) 정밀 동기화
     */
    function syncGolftopCourseButtonHighlights() {
        try {
            if (!document.body || !document.body.classList.contains('gtp-smart-layout-active')) return;
            if (!__gtp_cached_optimized_btns || __gtp_cached_optimized_btns.length === 0) return;
    
            // 1. 현재 잔여타임 필터 체크박스가 1개 이상 체크되어 있는지 및 체크된 필터명 수집
            const filterBox = document.getElementById('gtp_smart_filter_box') || __gtp_cached_date_col;
            const checkedFilterInputs = filterBox
                ? Array.from(filterBox.querySelectorAll('input[type="checkbox"]:checked'))
                : [];
            const anyFilterChecked = checkedFilterInputs.length > 0;
    
            const checkedFilterLabels = checkedFilterInputs.map(inp => {
                const lbl = inp.closest('label') || inp.parentElement;
                return (lbl ? (lbl.innerText || lbl.textContent || '') : '').replace(/\s+/g, '').trim();
            }).filter(Boolean);
    
            // 2. 필터가 체크된 경우 우측 '잔여타임' 및 '외 잔여타임' 테이블에서 화면에 실제로 보이고(display !== 'none') 필터 조건에 부합하는 구장명만 수집
            const matchedTableCourseKeys = new Set();
            if (anyFilterChecked) {
                const panels = findRightTimePanels(__gtp_cached_row);
                const boxes = [panels?.mainBox, panels?.otherBox].filter(Boolean);
                boxes.forEach(box => {
                    Array.from(box.querySelectorAll('tbody tr, table tr')).forEach(tr => {
                        const firstCell = tr.querySelector('td');
                        if (!firstCell) return;
                        const txt = (firstCell.textContent || '').trim();
                        if (!txt || txt.includes('조회된 내용이 없습니다') || txt.includes('골프장명')) return;
                        if (!doesGolftopRowMatchCheckedFilters(tr, checkedFilterLabels)) return;
                        const key = normalizeGolftopCourseKey(txt);
                        if (key && key.length >= 2) {
                            matchedTableCourseKeys.add(key);
                        }
                    });
                });
            }
    
            // 3. 모든 스마트뷰 구장 버튼에 대해 원본 버튼(origBtn) 노란색 하이라이트 상태 및 필터 매칭 테이블 상태 반영
            __gtp_cached_optimized_btns.forEach(gridBtn => {
                const origBtn = gridBtn.__gtp_orig_btn;
                if (!origBtn) return;
    
                let isOrigFilterLit = false;
                let isOrigSelected = false;
    
                const checkTargets = [origBtn];
                if (origBtn.firstElementChild) checkTargets.push(origBtn.firstElementChild);
                if (origBtn.parentElement && origBtn.parentElement.children.length <= 2 && origBtn.parentElement !== __gtp_cached_orig_scroll_el) {
                    checkTargets.push(origBtn.parentElement);
                }
    
                for (const el of checkTargets) {
                    const cls = String(el.className || '').toLowerCase();
                    if (anyFilterChecked && /\b(yellow|highlight|has[_-]?time|filter[_-]?on|match|exist|point|bg[_-]?yellow|bg[_-]?warn|btn[_-]?warning)\b/.test(cls)) {
                        isOrigFilterLit = true;
                    }
                    const cs = getComputedStyle(el);
                    const rgb = parseGolftopRgbColor(cs.backgroundColor);
                    if (rgb && rgb.a >= 0.08) {
                        const maxC = Math.max(rgb.r, rgb.g, rgb.b);
                        const minC = Math.min(rgb.r, rgb.g, rgb.b);
                        const isNeutralWhiteOrGray = (rgb.r >= 225 && rgb.g >= 225 && rgb.b >= 225 && (maxC - minC) <= 20);
                        if (!isNeutralWhiteOrGray) {
                            // 파란색 또는 초록색(골프탑 구장 클릭 선택 색상)은 '선택된 구장(isOrigSelected)'이지 필터 노란불이 아님!
                            if ((rgb.b >= 160 && (rgb.b - rgb.r) >= 30) || (rgb.g >= 120 && (rgb.g - rgb.r) >= 20)) {
                                isOrigSelected = true;
                            } else if (anyFilterChecked && rgb.r >= 215 && rgb.g >= 165 && rgb.b <= 205 && (rgb.r - rgb.b) >= 35 && rgb.r >= rgb.g) {
                                // 정확히 노란색/호박색(#fde68a, #fcd34d 등) 배경일 때만 필터 하이라이트로 인정!
                                isOrigFilterLit = true;
                            }
                        }
                    }
                }
    
                // 우측 잔여타임 테이블에서 실제 필터 조건에 매칭된 구장인지 확인
                let isTableFilterLit = false;
                if (anyFilterChecked && matchedTableCourseKeys.size > 0) {
                    const fullKey = normalizeGolftopCourseKey(gridBtn.innerText);
                    const origKey = normalizeGolftopCourseKey(gridBtn.dataset.gtpOrigText);
                    if ((fullKey && matchedTableCourseKeys.has(fullKey)) || (origKey && matchedTableCourseKeys.has(origKey))) {
                        isTableFilterLit = true;
                    }
                }
    
                const isFilterLit = anyFilterChecked && (isOrigFilterLit || isTableFilterLit);
                const isSelected = isOrigSelected || gridBtn.classList.contains('selected') || origBtn.classList.contains('selected');
    
                if (isFilterLit) {
                    gridBtn.classList.add('gtp-filter-lit');
                    gridBtn.style.setProperty('background', '#fde68a', 'important');
                    gridBtn.style.setProperty('color', '#0f172a', 'important');
                    gridBtn.style.setProperty('font-weight', '800', 'important');
                    if (isSelected) {
                        gridBtn.style.setProperty('border', '2px solid #2563eb', 'important');
                    } else {
                        gridBtn.style.setProperty('border', '1.5px solid #d97706', 'important');
                    }
                } else {
                    gridBtn.classList.remove('gtp-filter-lit');
                    if (isSelected) {
                        gridBtn.classList.add('active', 'selected');
                        gridBtn.style.setProperty('background', '#2563eb', 'important');
                        gridBtn.style.setProperty('color', '#ffffff', 'important');
                        gridBtn.style.setProperty('border', '1px solid #1d4ed8', 'important');
                    } else {
                        gridBtn.classList.remove('active', 'selected');
                        gridBtn.style.removeProperty('background');
                        gridBtn.style.removeProperty('color');
                        gridBtn.style.removeProperty('border-color');
                        gridBtn.style.removeProperty('border');
                    }
                }
            });
        } catch (e) {
            console.warn('[골프탑 스마트뷰] 구장 필터 하이라이트 동기화 오류:', e);
        }
    }
    
    function triggerGolftopFilterHighlightSyncBurst() {
        syncGolftopCourseButtonHighlights();
        [40, 120, 280, 550, 950].forEach(ms => {
            setTimeout(() => {
                if (document.body && document.body.classList.contains('gtp-smart-layout-active')) {
                    syncGolftopCourseButtonHighlights();
                }
            }, ms);
        });
    }
    
    function initGolftopFilterHighlightListeners() {
        if (__gtp_filter_highlight_listeners_attached) return;
        __gtp_filter_highlight_listeners_attached = true;
    
        document.addEventListener('change', (e) => {
            if (!document.body || !document.body.classList.contains('gtp-smart-layout-active')) return;
            const t = e.target;
            if (t && t.closest && t.closest('#gtp_smart_filter_box, #gtp_smart_cal_box, .gtp-smart-col-date')) {
                triggerGolftopFilterHighlightSyncBurst();
            }
        }, true);
    
        document.addEventListener('click', (e) => {
            if (!document.body || !document.body.classList.contains('gtp-smart-layout-active')) return;
            const t = e.target;
            if (t && t.closest && t.closest('#gtp_smart_filter_box, #gtp_smart_cal_box, .gtp-smart-col-date')) {
                triggerGolftopFilterHighlightSyncBurst();
            }
        }, true);
    }
    
    /**
     * 권역 그리드 해제 및 원상 복원
     */
    function restoreGolftopRegionsGrid() {
        const grid = document.getElementById('gtp_smart_regions_grid');
        if (grid) {
            grid.remove();
        }
    
        const colCourse = __gtp_cached_course_col || (findGolftopColumns() || {}).colCourse;
        if (colCourse) {
            // 1. colCourse 내부의 모든 하위 요소를 전수 검사하여 숨김/0px 스타일 완전 해제
            const allDescendants = colCourse.querySelectorAll('*');
            allDescendants.forEach(el => {
                if (el.__gtp_orig_style) {
                    const s = el.style;
                    const o = el.__gtp_orig_style;
                    s.position = o.position || '';
                    s.width = o.width || '';
                    s.opacity = o.opacity || '';
                    s.height = o.height || '';
                    s.maxHeight = o.maxHeight || '';
                    s.overflow = o.overflow || '';
                    s.margin = o.margin || '';
                    s.padding = o.padding || '';
                    s.border = o.border || '';
                    s.pointerEvents = o.pointerEvents || '';
                    s.zIndex = o.zIndex || '';
                    delete el.__gtp_orig_style;
                }
                if (el.__gtp_orig_display !== undefined) {
                    el.style.display = el.__gtp_orig_display;
                    delete el.__gtp_orig_display;
                }
                if (el.style.position === 'absolute') el.style.removeProperty('position');
                if (el.style.width === '1px') el.style.removeProperty('width');
                if (el.style.opacity === '0') el.style.removeProperty('opacity');
                if (el.style.height === '0px' || el.style.height === '1px') el.style.removeProperty('height');
                if (el.style.maxHeight === '0px' || el.style.maxHeight === '1px') el.style.removeProperty('max-height');
                if (el.style.overflow === 'hidden') el.style.removeProperty('overflow');
                if (el.style.pointerEvents === 'none') el.style.removeProperty('pointer-events');
                if (el.style.zIndex === '-1') el.style.removeProperty('z-index');
                if (el.style.display === 'none') el.style.removeProperty('display');
            });
    
            // 2. 직계 자식 display 복원
            Array.from(colCourse.children).forEach(child => {
                if (child.__gtp_orig_display !== undefined) {
                    child.style.display = child.__gtp_orig_display;
                    delete child.__gtp_orig_display;
                } else if (child.style.display === 'none') {
                    child.style.removeProperty('display');
                }
                if (child.style.position === 'absolute') child.style.removeProperty('position');
                if (child.style.width === '1px') child.style.removeProperty('width');
                if (child.style.height === '1px') child.style.removeProperty('height');
                if (child.style.maxHeight === '1px') child.style.removeProperty('max-height');
                if (child.style.opacity === '0') child.style.removeProperty('opacity');
                if (child.style.pointerEvents === 'none') child.style.removeProperty('pointer-events');
                if (child.style.zIndex === '-1') child.style.removeProperty('z-index');
            });
        }
    
        if (__gtp_cached_orig_scroll_el && __gtp_cached_orig_scroll_el.__gtp_orig_style) {
            const s = __gtp_cached_orig_scroll_el.style;
            const o = __gtp_cached_orig_scroll_el.__gtp_orig_style;
            s.position = o.position || '';
            s.width = o.width || '';
            s.opacity = o.opacity || '';
            s.height = o.height || '';
            s.maxHeight = o.maxHeight || '';
            s.overflow = o.overflow || '';
            s.margin = o.margin || '';
            s.padding = o.padding || '';
            s.border = o.border || '';
            s.pointerEvents = o.pointerEvents || '';
            s.zIndex = o.zIndex || '';
            delete __gtp_cached_orig_scroll_el.__gtp_orig_style;
        }
    
        __gtp_cached_optimized_btns = [];
        __gtp_cached_detected_regions = [];
        __gtp_cached_common_parent = null;
        __gtp_cached_orig_scroll_el = null;
    }
    
    /**
     * 예약 섹션의 첫 시작 라벨('신청구분', '예약/대기', '신청일자' 등) 정밀 탐색
     */
    function findReservationLabel() {
        const all = Array.from(document.querySelectorAll('th, td, label, div, span, p, b, strong, dt, dd, button, a'))
            .filter(el => {
                if (el.children.length > 2) return false;
                const t = (el.innerText || el.textContent || '').trim().replace(/[\s\-_/]/g, '');
                return t === '신청구분' || t.startsWith('신청구분');
            });
        if (all.length > 0) return all[0];
    
        const btns = Array.from(document.querySelectorAll('button, .btn, a, [role="button"], span'))
            .filter(el => {
                const t = (el.innerText || el.textContent || '').trim().replace(/[\s\-_/]/g, '');
                return t === '예약/대기' || t === '예약대기';
            });
        if (btns.length > 0) return btns[0];
    
        const dateLabels = Array.from(document.querySelectorAll('th, td, label, div, span, p, b, strong'))
            .filter(el => {
                if (el.children.length > 2) return false;
                const t = (el.innerText || el.textContent || '').trim().replace(/[\s\-_/]/g, '');
                return t === '신청일자' || t.startsWith('신청일자');
            });
        return dateLabels.length > 0 ? dateLabels[0] : null;
    }
    
    /**
     * 예약 섹션 최하단 요소 탐색 ('매니저비고', '조건선택', '캐디유무', '[예약신청]', '[대기신청]' 등)
     */
    function findReservationBottomElement() {
        const candidates = Array.from(document.querySelectorAll('button, input[type="submit"], input[type="button"], a, textarea, th, td, label'))
            .filter(el => {
                const t = (el.innerText || el.textContent || el.value || '').trim().replace(/\s+/g, '');
                return t === '매니저비고' || t === '조건선택' || t === '캐디유무' || (t.includes('예약신청') && !t.includes('예약/대기/홍보')) || (t.includes('대기신청') && !t.includes('확정타임/대기신청'));
            });
        if (candidates.length === 0) return null;
    
        let best = candidates[0];
        let maxTop = -1;
        for (const el of candidates) {
            const rect = el.getBoundingClientRect();
            if (rect.bottom > maxTop) {
                maxTop = rect.bottom;
                best = el;
            }
        }
        return best;
    }
    
    /**
     * 예약 섹션을 이루는 모든 직계 블록('신청구분'부터 '매니저비고'/하단 버튼까지) 정밀 수집
     */
    function findReservationSectionBlocks(rowContainer) {
        const startEl = findReservationLabel();
        if (!startEl) return [];
    
        const bottomEl = findReservationBottomElement();
        const topTable = rowContainer ? (rowContainer.closest('table') || rowContainer) : null;
    
        let topBlock = topTable;
        while (topBlock && topBlock.parentElement && 
               topBlock.parentElement !== document.body && 
               topBlock.parentElement.tagName !== 'FORM' && 
               (!topBlock.parentElement.id || !topBlock.parentElement.id.includes('form')) && 
               topBlock.parentElement.children.length === 1) {
            topBlock = topBlock.parentElement;
        }
    
        const commonParent = topBlock ? topBlock.parentElement : (startEl.closest('form, div[class*="content"]') || document.body);
    
        // commonParent의 직계 자식 중 startEl을 포함하는 블록 찾기
        let startBlock = startEl;
        while (startBlock && startBlock.parentElement && startBlock.parentElement !== commonParent) {
            startBlock = startBlock.parentElement;
        }
    
        // commonParent의 직계 자식 중 bottomEl을 포함하는 블록 찾기
        let endBlock = bottomEl || startEl;
        while (endBlock && endBlock.parentElement && endBlock.parentElement !== commonParent) {
            endBlock = endBlock.parentElement;
        }
    
        if (!startBlock || startBlock.parentElement !== commonParent) {
            const single = startEl.closest('table, div[class*="content"], div[class*="main"], div') || startEl;
            return [single];
        }
    
        if (!endBlock || endBlock.parentElement !== commonParent) {
            endBlock = startBlock;
        }
    
        // commonParent 내에서 startBlock부터 endBlock까지의 모든 직계 형제 수집
        const blocks = [];
        let cur = startBlock;
        while (cur) {
            if (cur.id !== 'gtp_smart_course_wrapper' && cur !== topBlock && !cur.contains(topBlock)) {
                blocks.push(cur);
            }
            if (cur === endBlock) break;
            cur = cur.nextElementSibling;
        }
    
        return blocks.length > 0 ? blocks : [startBlock];
    }
    const findReservationSectionBlock = (rowContainer) => {
        const blocks = findReservationSectionBlocks(rowContainer);
        return blocks.length > 0 ? blocks[0] : null;
    };
    const findReservationSectionContainer = findReservationSectionBlock;
    const findReservationSectionStart = findReservationSectionBlock;
    
    /**
     * 중단 예약 신청란(신청일자 ~ 매니저비고 및 상/하단 버튼)의 좌측 입력칸(2열)을 넓히고
     * [복사] / [+ 추가] / [삭제] / [타임리셋] 버튼을 각 줄 우측에 1줄로 정렬하여 상하 높이를 대폭 축소
     */
    function compactGolftopReservationForm(resvBlocks) {
        if (!resvBlocks || resvBlocks.length === 0) return;
    
        const markCompacted = (el) => {
            if (el && el.dataset) el.dataset.gtpResvCompacted = 'true';
        };
    
        const RESV_ROW_LABELS = [
            '신청일자', '광고유/무', '광고유무', '결제구분', '희망시간',
            '현장결제', '선결제', '인원', '요청성별', '예약자명',
            '연락처', '조건선택', '캐디유무', '매니저비고'
        ];
    
        resvBlocks.forEach(block => {
            if (!block) return;
    
            // 1) 테이블 및 colgroup 열 너비 재조정 (1열 라벨 축소, 2열 입력/옵션칸 대폭 확장, 3열 구장명 여백 축소)
            Array.from(block.querySelectorAll('table')).forEach(table => {
                markCompacted(table);
                table.style.setProperty('width', '100%', 'important');
                table.style.setProperty('table-layout', 'auto', 'important');
                table.style.setProperty('border-collapse', 'collapse', 'important');
    
                const cols = Array.from(table.querySelectorAll('colgroup > col, col'));
                if (cols.length >= 2) {
                    markCompacted(cols[0]);
                    cols[0].removeAttribute('width');
                    cols[0].style.setProperty('width', '74px', 'important');
                    cols[0].style.setProperty('min-width', '70px', 'important');
                    cols[0].style.setProperty('max-width', '80px', 'important');
    
                    markCompacted(cols[1]);
                    cols[1].removeAttribute('width');
                    cols[1].style.setProperty('width', '520px', 'important');
                    cols[1].style.setProperty('min-width', '470px', 'important');
                    cols[1].style.setProperty('max-width', 'none', 'important');
    
                    if (cols[2]) {
                        markCompacted(cols[2]);
                        cols[2].removeAttribute('width');
                        cols[2].style.setProperty('width', 'auto', 'important');
                        cols[2].style.setProperty('min-width', '70px', 'important');
                        cols[2].style.setProperty('max-width', '110px', 'important');
                    }
                }
            });
    
            // 2) 예약 폼 행(tr 또는 div 행) 수집
            const rowPairs = [];
            const seenCol2 = new Set();
    
            Array.from(block.querySelectorAll('tr')).forEach(tr => {
                const cells = Array.from(tr.children).filter(c => c.tagName === 'TH' || c.tagName === 'TD');
                if (cells.length >= 2) {
                    const rowLabel = (cells[0].innerText || cells[0].textContent || '').trim().replace(/\s+/g, '');
                    seenCol2.add(cells[1]);
                    rowPairs.push({ rowEl: tr, col1: cells[0], col2: cells[1], col3: cells[2] || null, rowLabel });
                }
            });
    
            Array.from(block.querySelectorAll('th, td, dt, div, span, label, p, b, strong')).forEach(el => {
                if (el.children.length > 2) return;
                const clean = (el.innerText || el.textContent || '').trim().replace(/\s+/g, '');
                if (!RESV_ROW_LABELS.includes(clean)) return;
    
                let col1 = el;
                while (col1.parentElement && col1.parentElement !== block) {
                    const p = col1.parentElement;
                    const pClean = (p.innerText || p.textContent || '').trim().replace(/\s+/g, '');
                    const pHasCtrl = p.querySelector('input, select, textarea, button');
                    if (pClean === clean && !pHasCtrl) {
                        col1 = p;
                    } else {
                        break;
                    }
                }
                const rowEl = col1.parentElement;
                if (!rowEl || rowEl === block) return;
                const col2 = col1.nextElementSibling;
                if (!col2 || seenCol2.has(col2)) return;
                seenCol2.add(col2);
                const col3 = col2.nextElementSibling || null;
                rowPairs.push({ rowEl, col1, col2, col3, rowLabel: clean });
            });
    
            // 3) 각 행의 열 폭 및 우측 액션 버튼([복사], [+ 추가], [삭제], [타임리셋]) 1줄 정렬 처리
            rowPairs.forEach(({ rowEl, col1, col2, col3 }) => {
                markCompacted(rowEl);
                rowEl.removeAttribute('height');
                rowEl.style.setProperty('height', 'auto', 'important');
                rowEl.style.setProperty('min-height', '0px', 'important');
                if (rowEl.tagName !== 'TR') {
                    const rCs = getComputedStyle(rowEl);
                    if (rCs.display === 'flex' || rCs.display === 'grid') {
                        rowEl.style.setProperty('display', 'flex', 'important');
                        rowEl.style.setProperty('flex-direction', 'row', 'important');
                        rowEl.style.setProperty('flex-wrap', 'nowrap', 'important');
                    }
                }
    
                markCompacted(col1);
                col1.removeAttribute('width');
                col1.style.setProperty('width', '74px', 'important');
                col1.style.setProperty('min-width', '70px', 'important');
                col1.style.setProperty('max-width', '80px', 'important');
                col1.style.setProperty('flex', '0 0 74px', 'important');
                col1.style.setProperty('padding', '2px 5px', 'important');
                col1.style.setProperty('line-height', '1.15', 'important');
                col1.style.setProperty('white-space', 'nowrap', 'important');
    
                markCompacted(col2);
                col2.removeAttribute('width');
                col2.style.setProperty('width', '520px', 'important');
                col2.style.setProperty('min-width', '470px', 'important');
                col2.style.setProperty('max-width', 'none', 'important');
                col2.style.setProperty('flex', '1 1 495px', 'important');
                col2.style.setProperty('padding', '1px 5px', 'important');
                col2.style.setProperty('line-height', '1.15', 'important');
    
                if (col3) {
                    markCompacted(col3);
                    col3.removeAttribute('width');
                    col3.style.setProperty('width', 'auto', 'important');
                    col3.style.setProperty('min-width', '70px', 'important');
                    col3.style.setProperty('max-width', '110px', 'important');
                    col3.style.setProperty('flex', '0 1 90px', 'important');
                    col3.style.setProperty('padding', '1px 5px', 'important');
                    col3.style.setProperty('line-height', '1.15', 'important');
                }
    
                // col2 내부의 강제 줄바꿈(<br>) 제거
                Array.from(col2.querySelectorAll('br')).forEach(br => {
                    markCompacted(br);
                    br.style.setProperty('display', 'none', 'important');
                });
    
                // col2 내부의 우측 액션 버튼([복사], [+ 추가], [삭제], [타임리셋]) 탐색 및 슬림화
                const actionBtns = Array.from(col2.querySelectorAll('button, a, input[type="button"], .btn, [role="button"]')).filter(b => {
                    const t = (b.innerText || b.textContent || b.value || '').trim().replace(/\s+/g, '');
                    return t.includes('복사') || t.includes('추가') || t.includes('삭제') || t.includes('타임리셋') || t.includes('리셋');
                });
    
                // col2 내부의 라벨/스팬 좌우 간격 타이트하게 압축 (요청성별·캐디유무 등 6개 라디오도 1줄에 모두 들어가도록)
                Array.from(col2.querySelectorAll('label, span')).forEach(ls => {
                    if (actionBtns.includes(ls) || actionBtns.some(b => b.contains(ls))) return;
                    markCompacted(ls);
                    ls.style.setProperty('margin-right', '3px', 'important');
                    ls.style.setProperty('margin-left', '0px', 'important');
                    ls.style.setProperty('padding-right', '0px', 'important');
                    ls.style.setProperty('padding-left', '0px', 'important');
                });
    
                actionBtns.forEach(btn => {
                    markCompacted(btn);
                    btn.style.setProperty('height', '20px', 'important');
                    btn.style.setProperty('min-height', '20px', 'important');
                    btn.style.setProperty('padding', '1px 6px', 'important');
                    btn.style.setProperty('font-size', '11.5px', 'important');
                    btn.style.setProperty('line-height', '1', 'important');
                    btn.style.setProperty('margin-top', '0px', 'important');
                    btn.style.setProperty('margin-bottom', '0px', 'important');
                    btn.style.setProperty('white-space', 'nowrap', 'important');
                    btn.style.setProperty('flex-shrink', '0', 'important');
                    btn.style.setProperty('display', 'inline-flex', 'important');
                    btn.style.setProperty('align-items', 'center', 'important');
                    btn.style.setProperty('justify-content', 'center', 'important');
                });
    
                const ta = col2.querySelector('textarea');
                if (ta) {
                    markCompacted(ta);
                    ta.style.setProperty('height', '24px', 'important');
                    ta.style.setProperty('min-height', '24px', 'important');
                    ta.style.setProperty('max-height', '30px', 'important');
                    ta.style.setProperty('width', 'calc(100% - 62px)', 'important');
                    ta.style.setProperty('max-width', '400px', 'important');
                    ta.style.setProperty('padding', '2px 6px', 'important');
                    ta.style.setProperty('vertical-align', 'middle', 'important');
                }
    
                const innerFlex = (col2.tagName !== 'TD' && col2.tagName !== 'TH')
                    ? col2
                    : (col2.children.length === 1 && col2.firstElementChild.tagName === 'DIV' ? col2.firstElementChild : null);
    
                if (innerFlex) {
                    markCompacted(innerFlex);
                    innerFlex.style.setProperty('display', 'flex', 'important');
                    innerFlex.style.setProperty('flex-direction', 'row', 'important');
                    innerFlex.style.setProperty('flex-wrap', 'nowrap', 'important');
                    innerFlex.style.setProperty('align-items', 'center', 'important');
                    innerFlex.style.setProperty('justify-content', 'flex-start', 'important');
                    innerFlex.style.setProperty('gap', '4px', 'important');
                    innerFlex.style.setProperty('width', '100%', 'important');
    
                    let firstRightAssigned = false;
                    Array.from(innerFlex.children).forEach(ch => {
                        if (ch.tagName === 'BR') return;
                        const isBtnOrBtnWrap = actionBtns.includes(ch) || (actionBtns.some(b => ch.contains(b)) && !ch.querySelector('input[type="radio"], input[type="checkbox"], input[type="text"], input[type="number"], input[type="tel"], select, textarea'));
                        if (isBtnOrBtnWrap) {
                            markCompacted(ch);
                            ch.style.setProperty('flex', '0 0 auto', 'important');
                            ch.style.setProperty('display', 'inline-flex', 'important');
                            ch.style.setProperty('align-items', 'center', 'important');
                            ch.style.setProperty('gap', '3px', 'important');
                            ch.style.setProperty('margin-top', '0px', 'important');
                            ch.style.setProperty('margin-bottom', '0px', 'important');
                            if (!firstRightAssigned) {
                                ch.style.setProperty('margin-left', 'auto', 'important');
                                firstRightAssigned = true;
                            }
                        } else if (ch.tagName === 'DIV' || ch.tagName === 'P' || ch.tagName === 'SPAN') {
                            markCompacted(ch);
                            ch.style.setProperty('display', 'inline-flex', 'important');
                            ch.style.setProperty('flex-direction', 'row', 'important');
                            ch.style.setProperty('flex-wrap', 'wrap', 'important');
                            ch.style.setProperty('align-items', 'center', 'important');
                            ch.style.setProperty('gap', '2px 5px', 'important');
                            ch.style.setProperty('flex', '0 1 auto', 'important');
                            ch.style.setProperty('min-width', '0px', 'important');
                            ch.style.setProperty('width', 'auto', 'important');
                            ch.style.setProperty('margin', '0px', 'important');
                            ch.style.setProperty('padding', '0px', 'important');
                        }
                    });
                } else {
                    // col2가 TD이고 직계 자식이 여러 개인 경우: 내부 블록 div를 inline-flex화하고 우측 버튼을 같은 줄 우측에 배치
                    const reserveRightPx = actionBtns.length > 1 ? 112 : 58;
                    Array.from(col2.children).forEach(ch => {
                        if (ch.tagName === 'BR') return;
                        const isBtnOrBtnWrap = actionBtns.includes(ch) || (actionBtns.some(b => ch.contains(b)) && !ch.querySelector('input[type="radio"], input[type="checkbox"], input[type="text"], input[type="number"], input[type="tel"], select, textarea'));
                        if (isBtnOrBtnWrap && (ch.tagName === 'DIV' || ch.tagName === 'P' || ch.tagName === 'SPAN')) {
                            markCompacted(ch);
                            ch.style.setProperty('display', 'inline-flex', 'important');
                            ch.style.setProperty('align-items', 'center', 'important');
                            ch.style.setProperty('gap', '3px', 'important');
                            ch.style.setProperty('width', 'auto', 'important');
                            ch.style.setProperty('float', 'right', 'important');
                            ch.style.setProperty('vertical-align', 'middle', 'important');
                            ch.style.setProperty('margin', '0px', 'important');
                            ch.style.setProperty('padding', '0px', 'important');
                        } else if (!isBtnOrBtnWrap && (ch.tagName === 'DIV' || ch.tagName === 'P')) {
                            markCompacted(ch);
                            ch.style.setProperty('display', 'inline-flex', 'important');
                            ch.style.setProperty('flex-direction', 'row', 'important');
                            ch.style.setProperty('flex-wrap', 'wrap', 'important');
                            ch.style.setProperty('align-items', 'center', 'important');
                            ch.style.setProperty('gap', '2px 5px', 'important');
                            ch.style.setProperty('width', 'auto', 'important');
                            ch.style.setProperty('max-width', `calc(100% - ${reserveRightPx}px)`, 'important');
                            ch.style.setProperty('vertical-align', 'middle', 'important');
                            ch.style.setProperty('margin', '0px', 'important');
                            ch.style.setProperty('padding', '0px', 'important');
                        }
                    });
    
                    if (actionBtns.length === 1 && actionBtns[0].parentElement === col2) {
                        actionBtns[0].style.setProperty('float', 'right', 'important');
                    } else if (actionBtns.length === 2 && actionBtns[0].parentElement === col2 && actionBtns[1].parentElement === col2) {
                        actionBtns[1].style.setProperty('float', 'right', 'important');
                        actionBtns[0].style.setProperty('float', 'right', 'important');
                        actionBtns[0].style.setProperty('margin-right', '3px', 'important');
                    }
                }
            });
    
            // 4) 상단 '신청 구분' 바 및 하단 '[예약신청] [대기신청]' 버튼 영역 상하 여백/높이 슬림화
            Array.from(block.querySelectorAll('button, input[type="submit"], input[type="button"], a, .btn')).forEach(btn => {
                const t = (btn.innerText || btn.textContent || btn.value || '').trim().replace(/\s+/g, '');
                if (t === '예약/대기' || t === '홍보' || t.includes('초기화') || t === '예약신청' || t === '대기신청') {
                    markCompacted(btn);
                    btn.style.setProperty('height', '26px', 'important');
                    btn.style.setProperty('min-height', '26px', 'important');
                    btn.style.setProperty('padding', '2px 12px', 'important');
                    btn.style.setProperty('font-size', '12.5px', 'important');
                    btn.style.setProperty('line-height', '1.1', 'important');
                    btn.style.setProperty('margin-top', '0px', 'important');
                    btn.style.setProperty('margin-bottom', '0px', 'important');
    
                    const p = btn.parentElement;
                    if (p && p !== block && !p.querySelector('table')) {
                        markCompacted(p);
                        p.style.setProperty('padding-top', '2px', 'important');
                        p.style.setProperty('padding-bottom', '2px', 'important');
                        p.style.setProperty('margin-top', '2px', 'important');
                        p.style.setProperty('margin-bottom', '2px', 'important');
                        p.style.setProperty('min-height', '0px', 'important');
                    }
                }
            });
    
            const bottomEl = findReservationBottomElement();
            if (bottomEl && block.contains(bottomEl)) {
                let cur = bottomEl.parentElement;
                while (cur && cur !== block) {
                    markCompacted(cur);
                    cur.style.setProperty('padding-top', '2px', 'important');
                    cur.style.setProperty('padding-bottom', '3px', 'important');
                    cur.style.setProperty('margin-bottom', '0px', 'important');
                    cur.style.setProperty('min-height', '0px', 'important');
                    cur = cur.parentElement;
                }
            }
        });
    }
    
    /**
     * 상단, 중단(골프장선택 3열 그리드), 하단(예약신청란) 섹션을 물리적으로 밀착 재배치
     * - [상단]: 📅 달력 / 🔍 잔여타임 필터 / 📝 특이사항 내용 (높이 235px)
     * - [중단]: ⛳ 골프장 선택 (지역별 3열 그리드)
     * - [하단]: 📋 예약 신청란 전체 ('신청구분' ~ '매니저비고' / 하단 버튼)
     * -> 상단과 중단 사이, 중단과 하단 사이의 빈 공간/여백을 4px로 완전 제거!
     */
    function reorganizeGolftopSections(rowContainer, colCourse) {
        if (!rowContainer) return null;
    
        const topTable = rowContainer.closest('table') || rowContainer;
        let topBlock = topTable;
        while (topBlock.parentElement && 
               topBlock.parentElement !== document.body && 
               topBlock.parentElement.tagName !== 'FORM' && 
               (!topBlock.parentElement.id || !topBlock.parentElement.id.includes('form')) && 
               topBlock.parentElement.children.length === 1) {
            topBlock = topBlock.parentElement;
        }
    
        const commonParent = topBlock.parentElement || document.body;
    
        // 1. colCourse 래퍼 생성 및 보존
        let wrapper = null;
        if (colCourse) {
            if (!colCourse.__gtp_orig_parent) {
                colCourse.__gtp_orig_parent = colCourse.parentElement;
                colCourse.__gtp_orig_next = colCourse.nextSibling;
            }
            wrapper = colCourse.closest('#gtp_smart_course_wrapper');
            if (!wrapper) {
                wrapper = document.createElement('div');
                wrapper.id = 'gtp_smart_course_wrapper';
                wrapper.appendChild(colCourse);
            }
        }
    
        // 2. 예약 섹션 전체 블록들 정밀 탐색
        const resvBlocks = findReservationSectionBlocks(rowContainer);
        __gtp_cached_resv_blocks = resvBlocks;
    
        // 3. [중단] 골프장 선택 목록(wrapper)을 topBlock 바로 뒤로 먼저 밀착 이동 (상단 바로 밑에 배치!)
        let lastInserted = topBlock;
        if (wrapper) {
            if (lastInserted.nextElementSibling !== wrapper) {
                lastInserted.insertAdjacentElement('afterend', wrapper);
            }
            wrapper.style.setProperty('clear', 'both', 'important');
            wrapper.style.setProperty('position', 'relative', 'important');
            if (!wrapper.dataset.gtpGapCollapsed) wrapper.style.setProperty('margin-top', '2px', 'important');
            wrapper.style.setProperty('margin-bottom', '2px', 'important');
            wrapper.style.setProperty('padding', '4px 6px', 'important');
            wrapper.style.setProperty('display', 'block', 'important');
            wrapper.style.setProperty('visibility', 'visible', 'important');
            lastInserted = wrapper;
        }
    
        // 4. [하단] 예약 신청란 블록들을 골프장 선택 목록(wrapper) 바로 뒤로 순서대로 밀착 이동
        resvBlocks.forEach(block => {
            if (!block.__gtp_orig_parent) {
                block.__gtp_orig_parent = block.parentElement;
                block.__gtp_orig_next = block.nextSibling;
            }
            if (lastInserted.nextElementSibling !== block) {
                lastInserted.insertAdjacentElement('afterend', block);
            }
            block.classList.add('gtp-smart-resv-container');
            block.style.setProperty('clear', 'both', 'important');
            block.style.setProperty('position', 'relative', 'important');
            if (!block.dataset.gtpGapCollapsed) block.style.setProperty('margin-top', '2px', 'important');
            block.style.setProperty('margin-bottom', '4px', 'important');
            block.style.setProperty('padding-top', '0px', 'important');
            block.style.setProperty('padding-bottom', '0px', 'important');
            block.style.setProperty('display', 'block', 'important');
            block.style.setProperty('visibility', 'visible', 'important');
    
            // 내부 숨겨진 요소 가시성 100% 보장
            Array.from(block.querySelectorAll('tr, td, th, div, table, button, input, select, label')).forEach(el => {
                if (el.style.display === 'none') {
                    el.style.removeProperty('display');
                }
                if (el.style.visibility === 'hidden') {
                    el.style.removeProperty('visibility');
                }
            });
    
            lastInserted = block;
        });
    
        // 5. 공통 부모 내의 남겨진 빈 스페이서/공백 요소 완전 숨김
        if (commonParent) {
            Array.from(commonParent.children).forEach(child => {
                if (child !== topBlock && !resvBlocks.includes(child) && child !== wrapper) {
                    const hasControls = child.querySelector('input, button, select, a, textarea');
                    const txt = (child.innerText || child.textContent || '').trim();
                    if (!hasControls && txt.length < 5) {
                        child.style.setProperty('display', 'none', 'important');
                        child.style.setProperty('height', '0px', 'important');
                        child.style.setProperty('margin', '0px', 'important');
                        child.style.setProperty('padding', '0px', 'important');
                    }
                }
            });
        }
    
        // 6. 하단 예약 신청란 가로 확장 및 상하 압축 후 실측 기반 여백 제거
        compactGolftopReservationForm(resvBlocks);
        collapseTopMiddleGap(rowContainer, topBlock, resvBlocks);
    
        console.log("[골프탑 스마트뷰] ✅ 3단 섹션 밀착 배치 완료 (상단 -> 중단:골프장선택 -> 하단:예약신청란)");
        return { topBlock, resvBlocks, wrapper };
    }
    const relocateCourseColumnToMiddle = reorganizeGolftopSections;
    
    const GTP_BASE_DESIGN_WIDTH = 1580;
    let __gtp_resize_listener_attached = false;
    let __gtp_pinch_listener_attached = false;
    let __gtp_user_pinch_scale = 1.0;
    let __gtp_is_pinching = false;
    let __gtp_last_client_width = 0;
    
    /**
     * 모바일 브라우저에서 핀치줌(확대) 및 핀치아웃(축소)이 가능하도록 viewport 메타태그 잠금 해제
     */
    function ensureGolftopPinchZoomViewport(enabled) {
        try {
            let vp = document.querySelector('meta[name="viewport"]');
            if (enabled) {
                if (!vp) {
                    vp = document.createElement('meta');
                    vp.name = 'viewport';
                    vp.dataset.gtpCreatedViewport = 'true';
                    if (document.head) document.head.appendChild(vp);
                } else if (vp.dataset.gtpOrigContent === undefined) {
                    vp.dataset.gtpOrigContent = vp.getAttribute('content') || '';
                }
                vp.setAttribute('content', 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, user-scalable=yes');
            } else if (vp) {
                if (vp.dataset.gtpCreatedViewport === 'true') {
                    vp.remove();
                } else if (vp.dataset.gtpOrigContent !== undefined) {
                    vp.setAttribute('content', vp.dataset.gtpOrigContent);
                    delete vp.dataset.gtpOrigContent;
                }
            }
        } catch (e) {}
    }
    
    /**
     * 모바일 터치 환경에서 네이티브 핀치줌이 막혀 있거나 1.0 이하로 더 줌아웃할 때도
     * 두 손가락 핀치 인/아웃으로 자유롭게 확대·축소할 수 있도록 지원
     */
    function initGolftopTouchPinchZoom() {
        if (__gtp_pinch_listener_attached) return;
        __gtp_pinch_listener_attached = true;
    
        let startDist = 0;
        let startPinchScale = 1.0;
        let startVvScale = 1.0;
    
        function getTouchDist(t1, t2) {
            const dx = t1.clientX - t2.clientX;
            const dy = t1.clientY - t2.clientY;
            return Math.hypot(dx, dy);
        }
    
        document.addEventListener('touchstart', (e) => {
            if (!document.body || !document.body.classList.contains('gtp-smart-layout-active')) return;
            if (e.touches && e.touches.length === 2) {
                __gtp_is_pinching = true;
                startDist = getTouchDist(e.touches[0], e.touches[1]);
                startPinchScale = __gtp_user_pinch_scale;
                startVvScale = (window.visualViewport && window.visualViewport.scale) ? window.visualViewport.scale : 1.0;
            }
        }, { passive: true });
    
        document.addEventListener('touchmove', (e) => {
            if (!__gtp_is_pinching || !e.touches || e.touches.length !== 2 || startDist <= 10) return;
            if (!document.body || !document.body.classList.contains('gtp-smart-layout-active')) return;
    
            const curDist = getTouchDist(e.touches[0], e.touches[1]);
            const ratio = curDist / startDist;
            const curVvScale = (window.visualViewport && window.visualViewport.scale) ? window.visualViewport.scale : 1.0;
            const nativeZoomChanged = Math.abs(curVvScale - startVvScale) > 0.04;
    
            // 네이티브 핀치줌이 동작하면 브라우저 기본 핀치 인/아웃(1.0~5.0)에 맡기고,
            // 네이티브 핀치줌이 막힌 환경에서만 1.0(화면 100% 꽉 참) ~ 3.5배 사이로 직접 배율 조절
            if (!nativeZoomChanged) {
                const nextScale = Math.max(1.0, Math.min(3.5, startPinchScale * ratio));
                if (Math.abs(nextScale - __gtp_user_pinch_scale) > 0.01) {
                    __gtp_user_pinch_scale = nextScale;
                    applyGolftopResponsiveScale(false);
                }
            } else if (__gtp_user_pinch_scale !== 1.0) {
                __gtp_user_pinch_scale = 1.0;
                applyGolftopResponsiveScale(false);
            }
        }, { passive: true });
    
        const endPinch = (e) => {
            if (!e.touches || e.touches.length < 2) {
                __gtp_is_pinching = false;
            }
        };
        document.addEventListener('touchend', endPinch, { passive: true });
        document.addEventListener('touchcancel', endPinch, { passive: true });
    }
    
    function getGolftopEffectiveDesignWidth() {
        const calBox = document.getElementById('gtp_smart_cal_box') || __gtp_cached_row;
        if (calBox) {
            const curZoom = parseFloat(document.body.style.zoom) || 1;
            const unzoomedLeft = calBox.getBoundingClientRect().left / curZoom;
            // 좌측 검정 사이드바가 접혀 있거나 모바일/분할화면 환경일 때
            // 기준 폭을 1200px로 최적화하여 레이아웃 비율을 완벽히 유지하면서
            // 모바일/폴드 화면의 모든 글자, 버튼, 테이블을 약 30% 더 크고 선명하게 확대 표시!
            if (unzoomedLeft >= 0 && unzoomedLeft < 140) {
                return 1150;
            }
        }
        const vw = document.documentElement.clientWidth || window.innerWidth || 1580;
        if (vw < 1350) {
            return 1150;
        }
        return 1400;
    }
    
    /**
     * 창 크기(가로폭)에 맞춰 전체 레이아웃 모양은 그대로 유지하면서 비율(zoom)만 자동 축소/확대
     */
    function applyGolftopResponsiveScale(resetZoomOnly = false) {
        if (!document.body || !document.body.classList.contains('gtp-smart-layout-active')) {
            if (document.body) {
                document.body.style.removeProperty('zoom');
                document.body.style.removeProperty('width');
                document.body.style.removeProperty('min-width');
                document.body.style.removeProperty('max-width');
            }
            document.documentElement.style.removeProperty('overflow-x');
            return;
        }
    
        const designW = getGolftopEffectiveDesignWidth();
        const vw = document.documentElement.clientWidth || window.innerWidth || designW;
        if (resetZoomOnly) {
            if (vw < designW) {
                document.body.style.setProperty('width', designW + 'px', 'important');
                document.body.style.setProperty('min-width', designW + 'px', 'important');
                document.body.style.setProperty('max-width', designW + 'px', 'important');
            } else {
                document.body.style.removeProperty('width');
                document.body.style.removeProperty('min-width');
                document.body.style.removeProperty('max-width');
            }
            document.body.style.removeProperty('zoom');
            return;
        }
    
        document.documentElement.style.removeProperty('overflow-x');
        const customZoomRatio = getStoredGolftopZoomRatio();
        const effectiveUserScale = __gtp_user_pinch_scale * customZoomRatio;
        if (vw < designW || effectiveUserScale !== 1.0) {
            const baseScale = vw < designW ? Math.max(0.15, vw / designW) : 1.0;
            const scale = Math.max(0.12, Math.min(4.0, baseScale * effectiveUserScale));
            document.body.style.setProperty('width', designW + 'px', 'important');
            document.body.style.setProperty('min-width', designW + 'px', 'important');
            document.body.style.setProperty('max-width', designW + 'px', 'important');
            document.body.style.setProperty('zoom', scale.toFixed(4), 'important');
        } else {
            document.body.style.removeProperty('width');
            document.body.style.removeProperty('min-width');
            document.body.style.removeProperty('max-width');
            document.body.style.removeProperty('zoom');
        }
    }
    
    /**
     * 컨테이너 내부에서 실제 화면에 보이는 콘텐츠(테두리 박스, 텍스트, 입력요소)의 최하단 Y좌표
     * - overflow로 잘린 부분, 숨김 요소, 빈 박스 높이는 제외
     */
    function computeVisibleContentBottom(container) {
        if (!container) return 0;
        let maxBottom = 0;
        const els = container.querySelectorAll('*');
        for (const el of els) {
            if (el.closest('#gtp_smart_course_wrapper')) continue;
            const rects = el.getClientRects();
            if (!rects || rects.length === 0) continue;
            const r = el.getBoundingClientRect();
            if (r.width < 2 || r.height < 2) continue;
            const cs = getComputedStyle(el);
            if (cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) continue;
    
            const isLeafContent = (el.children.length === 0 && (el.textContent || '').trim().length > 0) ||
                /^(INPUT|BUTTON|SELECT|TEXTAREA|IMG|LABEL)$/.test(el.tagName);
            const hasBorder = parseFloat(cs.borderBottomWidth) > 0 && cs.borderBottomStyle !== 'none' &&
                cs.borderBottomColor !== 'transparent' && !/rgba\(\d+,\s*\d+,\s*\d+,\s*0\)/.test(cs.borderBottomColor);
            if (!isLeafContent && !hasBorder) continue;
    
            // overflow로 잘리는 조상 기준으로 클리핑
            let bottom = r.bottom;
            let p = el.parentElement;
            let clippedOut = false;
            while (p && p !== document.body) {
                const pcs = getComputedStyle(p);
                if (pcs.overflowY !== 'visible' || pcs.overflow === 'hidden') {
                    const pr = p.getBoundingClientRect();
                    if (r.top >= pr.bottom) { clippedOut = true; break; }
                    bottom = Math.min(bottom, pr.bottom);
                }
                if (p === container) break;
                p = p.parentElement;
            }
            if (clippedOut) continue;
            if (bottom > maxBottom) maxBottom = bottom;
        }
        return maxBottom;
    }
    
    /**
     * 상단 카드 행의 실제 하단 위치를 측정하여,
     * 1) 상단과 중단('골프장 선택') 사이를 4px 간격으로 밀착하고
     * 2) 중단('골프장 선택')과 하단('예약 신청란') 사이도 4px 간격으로 밀착
     */
    function collapseTopMiddleGap(rowContainer, topBlock, resvBlocks) {
        try {
            if (!document.body.classList.contains('gtp-smart-layout-active')) return;
            if (!rowContainer || !resvBlocks || resvBlocks.length === 0) return;
            const first = resvBlocks[0];
            if (!document.body.contains(first) || !document.body.contains(rowContainer)) return;
    
            // 1:1 픽셀 좌표계에서 정확한 간격 실측을 위해 일시적으로 zoom만 해제 (동일 프레임 내 복원)
            applyGolftopResponsiveScale(true);
            compactGolftopReservationForm(resvBlocks);
    
            const courseWrap = document.getElementById('gtp_smart_course_wrapper');
            const desired = 4;
    
            // 좌측 상단 3개 카드(달력, 필터, 특이사항)만의 하단 위치 측정 (우측 잔여타임 테이블 높이 영향 원천 차단)
            let rowBottom = 0;
            const topLeftCards = [
                document.getElementById('gtp_smart_cal_box'),
                document.getElementById('gtp_smart_filter_box'),
                rowContainer.querySelector('.gtp-smart-col-detail')
            ].filter(Boolean);
            topLeftCards.forEach(c => {
                const b = c.getBoundingClientRect().bottom;
                if (b > rowBottom) rowBottom = b;
            });
            if (!rowBottom) rowBottom = computeVisibleContentBottom(rowContainer) || rowContainer.getBoundingClientRect().bottom;
    
            // 1) 상단 조상 컨테이너 높이 실측 축소 (중단/하단 블록을 포함하지 않는 조상만)
            let anc = rowContainer.parentElement;
            while (anc && anc !== document.body) {
                if (resvBlocks.some(b => anc.contains(b)) || (courseWrap && anc.contains(courseWrap))) break;
                const r = anc.getBoundingClientRect();
                if (r.bottom > rowBottom + 4) {
                    const h = Math.max(0, Math.ceil(rowBottom - r.top + 2));
                    anc.dataset.gtpGapCollapsed = 'true';
                    anc.style.setProperty('height', h + 'px', 'important');
                    anc.style.setProperty('min-height', '0px', 'important');
                    anc.style.setProperty('max-height', h + 'px', 'important');
                    anc.style.setProperty('overflow', 'visible', 'important');
                    anc.style.setProperty('padding-bottom', '0px', 'important');
                    anc.style.setProperty('margin-bottom', '0px', 'important');
                }
                if (anc === topBlock) break;
                anc = anc.parentElement;
            }
    
            // 2) [중단: 골프장 선택] 그리드 높이 설정 및 상단 카드 바로 아래(4px 간격)로 밀착
            if (courseWrap && document.body.contains(courseWrap)) {
                let scrollAnc = courseWrap.parentElement;
                while (scrollAnc && scrollAnc !== document.body) {
                    const acs = getComputedStyle(scrollAnc);
                    if (acs.overflowY === 'hidden' || acs.overflow === 'hidden') {
                        scrollAnc.dataset.gtpGapCollapsed = 'true';
                        scrollAnc.style.setProperty('overflow-y', 'visible', 'important');
                        scrollAnc.style.setProperty('overflow', 'visible', 'important');
                    }
                    scrollAnc = scrollAnc.parentElement;
                }
    
                const gridContainer = document.getElementById('gtp_smart_regions_grid');
                if (gridContainer && document.body.contains(gridContainer)) {
                    const targetMaxH = 340;
                    gridContainer.dataset.gtpDynamicMaxH = String(targetMaxH);
                    gridContainer.style.setProperty('max-height', targetMaxH + 'px', 'important');
                    gridContainer.style.setProperty('height', 'auto', 'important');
                    gridContainer.style.setProperty('overflow-y', 'auto', 'important');
                    gridContainer.style.setProperty('-webkit-overflow-scrolling', 'touch', 'important');
                    gridContainer.style.setProperty('overscroll-behavior-y', 'contain', 'important');
                    gridContainer.style.setProperty('touch-action', 'pan-x pan-y pinch-zoom', 'important');
                    gridContainer.style.setProperty('padding-bottom', '16px', 'important');
                }
    
                let cGap = courseWrap.getBoundingClientRect().top - rowBottom;
                for (let i = 0; i < 4 && Math.abs(cGap - desired) > 1; i++) {
                    const curM = parseFloat(getComputedStyle(courseWrap).marginTop) || 0;
                    const newM = Math.round(curM - (cGap - desired));
                    courseWrap.dataset.gtpGapCollapsed = 'true';
                    courseWrap.style.setProperty('margin-top', newM + 'px', 'important');
                    courseWrap.style.setProperty('position', 'relative', 'important');
                    courseWrap.style.setProperty('z-index', '10', 'important');
                    cGap = courseWrap.getBoundingClientRect().top - rowBottom;
                }
            }
    
            // 3) [하단: 예약 신청란]을 중단('골프장 선택') 바로 아래(4px 간격)로 밀착
            const midBottom = (courseWrap && document.body.contains(courseWrap))
                ? courseWrap.getBoundingClientRect().bottom
                : rowBottom;
    
            const startEl = findReservationLabel();
            let card = first;
            if (startEl && first.contains(startEl) && startEl !== first) {
                const labelTop = startEl.getBoundingClientRect().top;
                let p = startEl;
                card = startEl;
                while (p && p !== first) {
                    const t = p.getBoundingClientRect().top;
                    if (t >= labelTop - 30) card = p; else break;
                    p = p.parentElement;
                }
                // 카드 ~ 블록 사이 조상들의 빈 형제/상단 패딩 제거
                let c = card;
                while (c && c !== first) {
                    let prev = c.previousElementSibling;
                    while (prev) {
                        const hasCtrl = prev.querySelector('input, button, select, a, textarea') || /^(INPUT|BUTTON|SELECT|A|TEXTAREA)$/.test(prev.tagName);
                        const txt = (prev.innerText || prev.textContent || '').trim();
                        if (!hasCtrl && txt.length < 5 && prev.id !== 'gtp_smart_course_wrapper') {
                            prev.dataset.gtpGapCollapsed = 'true';
                            prev.style.setProperty('display', 'none', 'important');
                        }
                        prev = prev.previousElementSibling;
                    }
                    const par = c.parentElement;
                    if (par) {
                        par.dataset.gtpGapCollapsed = 'true';
                        par.style.setProperty('padding-top', '0px', 'important');
                        par.style.setProperty('min-height', '0px', 'important');
                    }
                    c = par;
                }
            }
    
            const target = first;
            let gap = card.getBoundingClientRect().top - midBottom;
            for (let i = 0; i < 4 && Math.abs(gap - desired) > 1; i++) {
                const curMargin = parseFloat(getComputedStyle(target).marginTop) || 0;
                const newMargin = Math.round(curMargin - (gap - desired));
                target.dataset.gtpGapCollapsed = 'true';
                target.style.setProperty('margin-top', newMargin + 'px', 'important');
                target.style.setProperty('position', 'relative', 'important');
                gap = card.getBoundingClientRect().top - midBottom;
            }
            if (target.__gtp_last_gap_log !== Math.round(gap)) {
                target.__gtp_last_gap_log = Math.round(gap);
                console.log(`[골프탑 스마트뷰] 중단(골프장선택)-하단(예약신청) 간격 보정 완료: ${Math.round(gap)}px`);
            }
    
            // 4) 하단 예약신청란 내부가 잘리지 않도록 조상 컨테이너 고정 높이 해제
            const bottomEl = findReservationBottomElement();
            if (bottomEl) {
                let bp = bottomEl.parentElement;
                while (bp && bp !== document.body && first.contains(bp)) {
                    bp.dataset.gtpGapCollapsed = 'true';
                    bp.style.setProperty('height', 'auto', 'important');
                    bp.style.setProperty('max-height', 'none', 'important');
                    bp.style.setProperty('min-height', '0px', 'important');
                    bp.style.setProperty('overflow', 'visible', 'important');
                    if (bp === first) break;
                    bp = bp.parentElement;
                }
                first.dataset.gtpGapCollapsed = 'true';
                first.style.setProperty('flex', '0 0 auto', 'important');
                first.style.setProperty('height', 'auto', 'important');
                first.style.setProperty('min-height', '0px', 'important');
                first.style.setProperty('max-height', 'none', 'important');
            }
        } catch (e) {
            console.warn('[골프탑 스마트뷰] 상단-중단-하단 여백 보정 오류:', e);
        } finally {
            applyGolftopResponsiveScale(false);
        }
    }
    
    /**
     * 우측 '잔여타임' 및 '외 잔여타임' 패널 탐색 헬퍼
     */
    function findRightTimePanels(rowContainer) {
        const startEl = findReservationLabel();
        const calBox = document.getElementById('gtp_smart_cal_box');
        const courseWrap = document.getElementById('gtp_smart_course_wrapper');
        const leftMustNotContain = [rowContainer, calBox, startEl, courseWrap].filter(Boolean);
    
        const candidates = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6, div, span, p, b, strong, caption, th, td'))
            .filter(el => {
                if (el.children.length > 4) return false;
                // ⚡ 성능: 레이아웃을 강제하지 않는 textContent로 먼저 걸러냄 (기간 길게 조회 시 수천 개 td의 innerText 계산 방지)
                const quickTxt = el.textContent || '';
                if (quickTxt.length > 200 || quickTxt.indexOf('잔여타임') === -1) return false;
                if (el.closest('#gtp_smart_filter_box, #gtp_smart_cal_box, .gtp-smart-col-detail, #gtp_smart_course_wrapper, .gtp-smart-resv-container')) return false;
                const txt = (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' ');
                return /\[\d{4}-\d{2}-\d{2}\]/.test(txt) && txt.includes('잔여타임') && txt.length < 70;
            });
    
        let mainHdr = null;
        let otherHdr = null;
        for (const el of candidates) {
            const txt = (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' ');
            if (/외\s*잔여타임/.test(txt)) {
                if (!otherHdr || otherHdr.contains(el)) otherHdr = el;
            } else {
                if (!mainHdr || mainHdr.contains(el)) mainHdr = el;
            }
        }
        if (!mainHdr) return null;
    
        function getRightBranchBox(hdr) {
            if (!hdr) return null;
            let cur = hdr;
            let bestWithTable = null;
            let highestSafe = hdr;
            while (cur && cur.parentElement && cur.parentElement !== document.body) {
                const nextP = cur.parentElement;
                if (leftMustNotContain.some(lx => nextP.contains(lx))) {
                    highestSafe = cur;
                    break;
                }
                if (cur.querySelector('table')) bestWithTable = cur;
                cur = nextP;
                highestSafe = cur;
            }
            if (cur && cur.querySelector('table')) bestWithTable = cur;
            return bestWithTable || highestSafe;
        }
    
        let rightCol = null;
        let mainBox = null;
        let otherBox = null;
    
        if (otherHdr) {
            let p = mainHdr.parentElement;
            while (p && p !== document.body) {
                if (leftMustNotContain.some(lx => p.contains(lx))) break;
                if (p.contains(otherHdr)) {
                    rightCol = p;
                    break;
                }
                p = p.parentElement;
            }
        }
    
        if (rightCol) {
            let m = mainHdr;
            while (m && m.parentElement && m.parentElement !== rightCol) m = m.parentElement;
            let o = otherHdr;
            while (o && o.parentElement && o.parentElement !== rightCol) o = o.parentElement;
            mainBox = m;
            otherBox = o;
        } else {
            mainBox = getRightBranchBox(mainHdr);
            otherBox = otherHdr ? getRightBranchBox(otherHdr) : null;
            if (mainBox && mainBox.parentElement && !leftMustNotContain.some(lx => mainBox.parentElement.contains(lx))) {
                rightCol = mainBox.parentElement;
            }
        }
    
        return { rightCol, mainBox, otherBox, leftMustNotContain };
    }
    
    function stretchTimeBoxInternals(box, targetHeight) {
        if (!box || targetHeight <= 0) return;
        box.dataset.gtpRightStretched = 'true';
        box.style.setProperty('height', targetHeight + 'px', 'important');
        box.style.setProperty('min-height', targetHeight + 'px', 'important');
        box.style.setProperty('max-height', targetHeight + 'px', 'important');
        box.style.setProperty('flex-shrink', '0', 'important');
        box.style.setProperty('display', 'flex', 'important');
        box.style.setProperty('flex-direction', 'column', 'important');
        box.style.setProperty('box-sizing', 'border-box', 'important');
        box.style.setProperty('margin-bottom', '0px', 'important');
    
        Array.from(box.children).forEach((ch, idx) => {
            if (idx === 0 && !ch.querySelector('table') && ch.offsetHeight < 75) {
                ch.dataset.gtpRightStretched = 'true';
                ch.style.setProperty('flex', '0 0 auto', 'important');
            } else {
                ch.dataset.gtpRightStretched = 'true';
                ch.style.setProperty('flex', '1 1 0%', 'important');
                ch.style.setProperty('height', 'auto', 'important');
                ch.style.setProperty('min-height', '0px', 'important');
                ch.style.setProperty('max-height', 'none', 'important');
                ch.style.setProperty('overflow-y', 'auto', 'important');
            }
        });
    
        const table = box.querySelector('table');
        if (table) {
            table.dataset.gtpRightStretched = 'true';
            table.style.setProperty('width', '100%', 'important');
            let p = table.parentElement;
            while (p && p !== box) {
                p.dataset.gtpRightStretched = 'true';
                p.removeAttribute('height');
                p.style.setProperty('flex', '1 1 0%', 'important');
                p.style.setProperty('height', '100%', 'important');
                p.style.setProperty('min-height', '0px', 'important');
                p.style.setProperty('max-height', 'none', 'important');
                p.style.setProperty('overflow-y', 'auto', 'important');
                p = p.parentElement;
            }
        }
    
        Array.from(box.querySelectorAll('div, section, tbody')).forEach(el => {
            const cs = getComputedStyle(el);
            if (el.tagName === 'TBODY' && cs.display === 'block') {
                el.dataset.gtpRightStretched = 'true';
                el.style.setProperty('max-height', Math.max(150, targetHeight - 85) + 'px', 'important');
                el.style.setProperty('height', 'auto', 'important');
                el.style.setProperty('overflow-y', 'auto', 'important');
            } else if (cs.overflowY === 'auto' || cs.overflowY === 'scroll' || (cs.maxHeight && cs.maxHeight !== 'none' && parseFloat(cs.maxHeight) > 50)) {
                el.dataset.gtpRightStretched = 'true';
                el.style.setProperty('flex', '1 1 0%', 'important');
                el.style.setProperty('height', '100%', 'important');
                el.style.setProperty('min-height', '0px', 'important');
                el.style.setProperty('max-height', 'none', 'important');
                el.style.setProperty('overflow-y', 'auto', 'important');
            }
        });
    }
    
    /**
     * 우측 '잔여타임'을 기존 '외 잔여타임' 하단(예약신청란 하단)까지 늘리고,
     * '외 잔여타임'을 그 아래(골프장 선택 영역 옆)로 내려 화면 전체를 여백 없이 채움
     */
    function optimizeGolftopRightColumn(rowContainer) {
        try {
            if (!document.body || !document.body.classList.contains('gtp-smart-layout-active')) return;
            const baseRow = rowContainer || __gtp_cached_row;
            const panels = findRightTimePanels(baseRow);
            if (!panels || !panels.mainBox) return;
    
            applyGolftopResponsiveScale(true);
    
            const { rightCol, mainBox, otherBox, leftMustNotContain } = panels;
            const courseWrap = document.getElementById('gtp_smart_course_wrapper');
            const refTop = baseRow ? baseRow.getBoundingClientRect().top : mainBox.getBoundingClientRect().top;
    
            // 좌측 중단(골프장 선택) 하단 Y좌표
            const midBottom = courseWrap ? courseWrap.getBoundingClientRect().bottom : (refTop + 600);
    
            // 좌측 하단(예약신청란) 최하단 Y좌표
            const bottomEl = findReservationBottomElement();
            let leftBottom = midBottom + 440;
            if (bottomEl) {
                leftBottom = Math.max(midBottom + 320, bottomEl.getBoundingClientRect().bottom + 10);
            }
    
            const hasOther = !!(otherBox && otherBox !== mainBox && getComputedStyle(otherBox).display !== 'none' && otherBox.offsetHeight > 0);
    
            // 좌우 분할 컨테이너가 align-items: stretch로 좌측 컬럼을 늘리지 못하도록 차단
            let splitAnc = mainBox.parentElement;
            while (splitAnc && splitAnc !== document.body) {
                if (leftMustNotContain && leftMustNotContain.some(lx => splitAnc.contains(lx))) {
                    splitAnc.dataset.gtpRightStretched = 'true';
                    splitAnc.style.setProperty('align-items', 'flex-start', 'important');
                    break;
                }
                splitAnc = splitAnc.parentElement;
            }
    
            // ★ 핵심: 우측 래퍼의 레이아웃 높이는 235px로 고정하고 overflow: visible 로 설정하여
            // 우측 잔여타임이 길어져도 좌측 중단(신청구분)이나 하단(골프장선택)을 절대 아래로 밀어내지 않게 함!
            let anc = mainBox.parentElement;
            while (anc && anc !== document.body) {
                if (leftMustNotContain && leftMustNotContain.some(lx => anc.contains(lx))) break;
                anc.dataset.gtpRightStretched = 'true';
                anc.removeAttribute('height');
                anc.style.setProperty('height', '235px', 'important');
                anc.style.setProperty('min-height', '0px', 'important');
                anc.style.setProperty('max-height', '235px', 'important');
                anc.style.setProperty('overflow', 'visible', 'important');
                anc = anc.parentElement;
            }
    
            if (rightCol && rightCol !== mainBox && !(leftMustNotContain && leftMustNotContain.some(lx => rightCol.contains(lx)))) {
                rightCol.dataset.gtpRightStretched = 'true';
                rightCol.style.setProperty('display', 'flex', 'important');
                rightCol.style.setProperty('flex-direction', 'column', 'important');
                rightCol.style.setProperty('gap', '6px', 'important');
                rightCol.style.setProperty('height', '235px', 'important');
                rightCol.style.setProperty('min-height', '0px', 'important');
                rightCol.style.setProperty('max-height', '235px', 'important');
                rightCol.style.setProperty('overflow', 'visible', 'important');
            }
    
            mainBox.style.setProperty('position', 'relative', 'important');
            mainBox.style.setProperty('z-index', '5', 'important');
    
            if (hasOther) {
                const mainH = Math.max(360, Math.round(midBottom - refTop));
                const otherH = Math.max(300, Math.round(leftBottom - midBottom - 6));
                stretchTimeBoxInternals(mainBox, mainH);
    
                // otherBox의 상위 우측 래퍼도 레이아웃 높이 증가 방지
                let oAnc = otherBox.parentElement;
                while (oAnc && oAnc !== document.body && oAnc !== rightCol) {
                    if (leftMustNotContain && leftMustNotContain.some(lx => oAnc.contains(lx))) break;
                    oAnc.dataset.gtpRightStretched = 'true';
                    oAnc.style.setProperty('max-height', '235px', 'important');
                    oAnc.style.setProperty('overflow', 'visible', 'important');
                    oAnc = oAnc.parentElement;
                }
    
                otherBox.dataset.gtpRightStretched = 'true';
                otherBox.style.setProperty('margin-top', '0px', 'important');
                otherBox.style.removeProperty('transform');
                otherBox.style.setProperty('position', 'relative', 'important');
                otherBox.style.setProperty('z-index', '5', 'important');
                stretchTimeBoxInternals(otherBox, otherH);
    
                // 만약 otherBox가 rightCol 내부 flex로 자동 배치되지 않고 별도 행(mm-bottom 등)에 있다면 정확한 위치로 이동
                const targetOtherTop = midBottom + 6;
                const curOtherTop = otherBox.getBoundingClientRect().top;
                if (Math.abs(curOtherTop - targetOtherTop) > 4) {
                    const shiftY = Math.round(targetOtherTop - curOtherTop);
                    otherBox.style.setProperty('transform', `translateY(${shiftY}px)`, 'important');
                }
            } else {
                const mainH = Math.max(600, Math.round(leftBottom - refTop));
                stretchTimeBoxInternals(mainBox, mainH);
            }
        } catch (e) {
            console.warn('[골프탑 스마트뷰] 우측 잔여타임 영역 확장 오류:', e);
        } finally {
            applyGolftopResponsiveScale(false);
        }
    }
    
    /**
     * 물리적 재배치된 골프장 선택 컬럼을 원래의 rowContainer 위치로 복원
     */
    function restoreRelocatedCourseColumn(colCourse) {
        if (!colCourse) return;
        if (colCourse.__gtp_orig_parent && document.body.contains(colCourse.__gtp_orig_parent)) {
            colCourse.__gtp_orig_parent.insertBefore(colCourse, colCourse.__gtp_orig_next || null);
        }
        delete colCourse.__gtp_orig_parent;
        delete colCourse.__gtp_orig_next;
    
        const tr = document.getElementById('gtp_smart_course_tr');
        if (tr) tr.remove();
        const div = document.getElementById('gtp_smart_course_wrapper');
        if (div) div.remove();
    
        if (__gtp_cached_form_container) {
            __gtp_cached_form_container.classList.remove('gtp-smart-resv-container');
            __gtp_cached_form_container.style.removeProperty('clear');
            __gtp_cached_form_container.style.removeProperty('position');
            __gtp_cached_form_container.style.removeProperty('margin-top');
            __gtp_cached_form_container.style.removeProperty('z-index');
            __gtp_cached_form_container.style.removeProperty('width');
            __gtp_cached_form_container.style.removeProperty('display');
            __gtp_cached_form_container = null;
        }
    }
    
    function optimizeGolftopLayout() {
        console.log("[골프탑 스마트뷰] ⛳ 골프락 스타일 최적화 시작...");
    
        const cols = findGolftopColumns();
        if (!cols || !cols.colCourse) {
            console.warn("[골프탑 스마트뷰] ⚠️ 골프탑 컬럼을 식별하지 못했습니다.");
            return { success: false, buttonCount: 0 };
        }
    
        const { rowContainer, colDate, colCourse, colDetail } = cols;
    
        // 1. 상단 행 Flexbox 설정 및 상위 테이블/tbody 블록화 (달력 + 특이사항 1행 나란히 고정)
        if (rowContainer) {
            __gtp_cached_row = rowContainer;
            rowContainer.classList.add('gtp-smart-top-row');
            rowContainer.style.setProperty('display', 'flex', 'important');
            rowContainer.style.setProperty('flex-wrap', 'nowrap', 'important');
            rowContainer.style.setProperty('width', '100%', 'important');
            rowContainer.style.setProperty('gap', '6px', 'important');
            rowContainer.style.setProperty('align-items', 'flex-start', 'important');
            rowContainer.style.setProperty('margin-top', '0px', 'important');
            rowContainer.style.setProperty('margin-bottom', '2px', 'important');
            rowContainer.style.setProperty('height', '235px', 'important');
            rowContainer.style.setProperty('min-height', '235px', 'important');
            rowContainer.style.setProperty('max-height', '235px', 'important');
            rowContainer.style.setProperty('overflow', 'visible', 'important');
    
            // 상단 테이블 및 조상 컨테이너의 불필요한 고정 높이(height="350" 등) 및 빈 공간 완전 압축
            const topTable = rowContainer.closest('table') || rowContainer;
            let cur = topTable;
            while (cur && cur !== document.body && cur.id !== 'form1' && !cur.classList.contains('main_content')) {
                cur.removeAttribute('height');
                cur.style.setProperty('height', 'auto', 'important');
                cur.style.setProperty('min-height', '0px', 'important');
                cur.style.setProperty('max-height', 'none', 'important');
                cur.style.setProperty('margin-top', '0px', 'important');
                cur.style.setProperty('margin-bottom', '2px', 'important');
                cur.style.setProperty('padding-top', '0px', 'important');
                cur.style.setProperty('padding-bottom', '0px', 'important');
                cur = cur.parentElement;
            }
    
            Array.from(topTable.querySelectorAll('tr')).forEach(tr => {
                tr.removeAttribute('height');
                if (tr !== rowContainer && !rowContainer.contains(tr)) {
                    const txt = (tr.innerText || tr.textContent || '').trim();
                    const hasControls = tr.querySelector('input, button, select, a, textarea');
                    if (!hasControls && (txt === '' || txt.length < 5)) {
                        tr.style.setProperty('display', 'none', 'important');
                        tr.style.setProperty('height', '0px', 'important');
                        tr.style.setProperty('margin', '0px', 'important');
                        tr.style.setProperty('padding', '0px', 'important');
                    }
                }
            });
            Array.from(topTable.querySelectorAll('td, tbody')).forEach(el => {
                el.removeAttribute('height');
            });
        }
    
        // 폼 및 메인 컨테이너 고정 높이/스크롤 잠금 해제 (전체 세로 스크롤 보장)
        const formEl = document.getElementById('form1') || document.querySelector('form');
        if (formEl) {
            formEl.style.setProperty('height', 'auto', 'important');
            formEl.style.setProperty('min-height', '100%', 'important');
            formEl.style.setProperty('max-height', 'none', 'important');
            formEl.style.setProperty('overflow', 'visible', 'important');
        }
        document.querySelectorAll('.main_content, .content-wrapper, .wrapper').forEach(el => {
            el.style.setProperty('height', 'auto', 'important');
            el.style.setProperty('min-height', '100%', 'important');
            el.style.setProperty('max-height', 'none', 'important');
            el.style.setProperty('overflow', 'visible', 'important');
        });
    
        // 2. Col 1A(달력) + 1B(필터선택) 2개 카드로 좌우 분할
        if (colDate) {
            __gtp_cached_date_col = colDate;
            colDate.classList.add('gtp-smart-col-date');
            separateGolftopDateAndFilter(colDate);
        }
    
        // 3. Col 2: 할인그린피 / 골프장특이사항 (상단 우측 배치)
        if (colDetail) {
            __gtp_cached_detail_col = colDetail;
            colDetail.classList.add('gtp-smart-col-detail');
            colDetail.style.setProperty('order', '2', 'important');
            colDetail.style.setProperty('flex', '1 1 0', 'important');
            colDetail.style.setProperty('min-width', '150px', 'important');
            colDetail.style.setProperty('width', 'auto', 'important');
            colDetail.style.setProperty('max-width', 'none', 'important');
            colDetail.style.setProperty('height', '235px', 'important');
            colDetail.style.setProperty('min-height', '235px', 'important');
            colDetail.style.setProperty('max-height', '235px', 'important');
            colDetail.style.setProperty('background', '#ffffff', 'important');
            colDetail.style.setProperty('border', '1px solid #cbd5e1', 'important');
            colDetail.style.setProperty('border-radius', '8px', 'important');
            colDetail.style.setProperty('padding', '4px 6px', 'important');
            colDetail.style.setProperty('box-sizing', 'border-box', 'important');
            colDetail.style.setProperty('overflow-y', 'auto', 'important');
            colDetail.style.setProperty('box-shadow', '0 1px 3px rgba(0, 0, 0, 0.04)', 'important');
            colDetail.style.setProperty('display', 'flex', 'important');
            colDetail.style.setProperty('flex-direction', 'column', 'important');
            colDetail.style.setProperty('visibility', 'visible', 'important');
    
            // 사용자 요청: 할인그린피/골프장특이사항 제목 헤더는 넣지 않음
            const existingDetailHeader = colDetail.querySelector('#gtp_smart_detail_header, .gtp-detail-header-styled');
            if (existingDetailHeader) {
                existingDetailHeader.remove();
            }
    
            Array.from(colDetail.querySelectorAll('*')).forEach(el => {
                if (el.style.display === 'none') {
                    el.style.removeProperty('display');
                }
                el.style.setProperty('visibility', 'visible', 'important');
            });
        }
    
        // 4. Col 3: 골프장 선택 목록 및 3단 섹션 밀착 재배치 (상단 -> 중단:예약신청란 -> 하단:골프장선택)
        if (colCourse) {
            __gtp_cached_course_col = colCourse;
    
            colCourse.classList.add('gtp-smart-col-course');
            colCourse.style.setProperty('width', '100%', 'important');
            colCourse.style.setProperty('max-width', '100%', 'important');
            colCourse.style.setProperty('min-width', '100%', 'important');
            colCourse.style.setProperty('box-sizing', 'border-box', 'important');
            colCourse.style.setProperty('display', 'block', 'important');
            colCourse.style.setProperty('visibility', 'visible', 'important');
            colCourse.style.setProperty('margin-top', '2px', 'important');
            colCourse.style.setProperty('margin-bottom', '2px', 'important');
            colCourse.style.setProperty('background', '#ffffff', 'important');
            colCourse.style.setProperty('border', '1px solid #cbd5e1', 'important');
            colCourse.style.setProperty('border-radius', '8px', 'important');
            colCourse.style.setProperty('padding', '4px 6px', 'important');
            colCourse.style.setProperty('height', 'auto', 'important');
            colCourse.style.setProperty('max-height', 'none', 'important');
            colCourse.style.setProperty('overflow', 'visible', 'important');
            colCourse.style.setProperty('position', 'relative', 'important');
            colCourse.style.setProperty('z-index', '10', 'important');
    
            // 상단 바로 뒤 [중단: 예약신청란] -> [하단: 골프장선택]으로 물리적 밀착 재배치 (여백 완전 제거)
            reorganizeGolftopSections(rowContainer, colCourse);
        }
    
        // 6. 골프장 선택 권역 그리드 (골프락 스타일: 3개씩 나란히 100% 꽉 채움 + 클릭 핸들러 연동)
        const count = buildGolftopRegionsGrid(colCourse) || 0;
    
        // 7. 그리드 생성 완료 후 상단-중단 여백 최종 밀착 및 우측 '잔여타임'/'외 잔여타임' 확장
        collapseTopMiddleGap(rowContainer, null, __gtp_cached_resv_blocks);
        optimizeGolftopRightColumn(rowContainer);
        collapseTopMiddleGap(rowContainer, null, __gtp_cached_resv_blocks);
    
        applyGolftopResponsiveScale(false);
        if (__gtp_smart_layout_observer) __gtp_smart_layout_observer.takeRecords();
        console.log(`[골프탑 스마트뷰] ✅ 구장 버튼 ${count}개 2줄 줄바꿈 및 클릭 핸들러 연동 완료`);
    
        return { success: true, buttonCount: count };
    }
    
    function restoreGolftopLayout() {
        console.log("[골프탑 스마트뷰] ↩️ 원래 순정 뷰 복원 시작...");
        applyGolftopResponsiveScale(false);
    
        // 1. 권역 그리드 해제 및 버튼 원위치 복원
        restoreGolftopRegionsGrid();
    
        const cols = findGolftopColumns() || {};
        const colCourse = __gtp_cached_course_col || cols.colCourse;
        const rowContainer = __gtp_cached_row || cols.rowContainer;
        const colDate = __gtp_cached_date_col || cols.colDate;
        const colDetail = __gtp_cached_detail_col || cols.colDetail;
        const formContainer = __gtp_cached_form_container;
    
        // 2. 예약 신청란 블록들 및 우측 확장 스타일 원위치 복원
        document.querySelectorAll('[data-gtp-right-stretched="true"]').forEach(el => {
            ['height', 'min-height', 'max-height', 'flex', 'width', 'max-width', 'display', 'flex-direction', 'align-items', 'box-sizing', 'margin-top', 'margin-bottom', 'overflow', 'overflow-y', 'gap', 'position', 'z-index', 'transform'].forEach(p => el.style.removeProperty(p));
            delete el.dataset.gtpRightStretched;
        });
        document.querySelectorAll('[data-gtp-resv-compacted="true"]').forEach(el => {
            ['width', 'min-width', 'max-width', 'height', 'min-height', 'max-height', 'padding', 'padding-top', 'padding-bottom', 'margin', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right', 'display', 'flex', 'flex-direction', 'flex-wrap', 'flex-shrink', 'align-items', 'justify-content', 'gap', 'line-height', 'font-size', 'white-space', 'vertical-align', 'float', 'table-layout', 'border-collapse'].forEach(p => el.style.removeProperty(p));
            delete el.dataset.gtpResvCompacted;
        });
        document.querySelectorAll('[data-gtp-gap-collapsed="true"]').forEach(el => {
            ['height', 'min-height', 'max-height', 'overflow', 'padding-bottom', 'margin-bottom', 'padding-top', 'margin-top', 'display', 'transform', 'flex', 'position', 'z-index'].forEach(p => el.style.removeProperty(p));
            delete el.dataset.gtpGapCollapsed;
            delete el.dataset.gtpShift;
        });
        if (__gtp_cached_resv_blocks && __gtp_cached_resv_blocks.length > 0) {
            __gtp_cached_resv_blocks.forEach(block => {
                if (block.__gtp_orig_parent && document.body.contains(block.__gtp_orig_parent)) {
                    block.__gtp_orig_parent.insertBefore(block, block.__gtp_orig_next || null);
                }
                delete block.__gtp_orig_parent;
                delete block.__gtp_orig_next;
                block.classList.remove('gtp-smart-resv-container');
                block.style.removeProperty('clear');
                block.style.removeProperty('position');
                block.style.removeProperty('margin-top');
                block.style.removeProperty('margin-bottom');
                block.style.removeProperty('padding-top');
                block.style.removeProperty('padding-bottom');
            });
            __gtp_cached_resv_blocks = [];
        }
    
        // 3. 물리적 재배치된 골프장 선택 영역을 원래 rowContainer 위치로 복원
        restoreRelocatedCourseColumn(colCourse);
    
        // 4. 달력 및 필터선택 카드 원상 복원
        if (colDate) {
            restoreGolftopDateAndFilter(colDate);
            colDate.classList.remove('gtp-smart-col-date');
            colDate.style.removeProperty('order');
            colDate.style.removeProperty('display');
            colDate.style.removeProperty('flex-direction');
            colDate.style.removeProperty('flex');
            colDate.style.removeProperty('gap');
            colDate.style.removeProperty('width');
            colDate.style.removeProperty('max-width');
            colDate.style.removeProperty('height');
            colDate.style.removeProperty('min-height');
            colDate.style.removeProperty('max-height');
            colDate.style.removeProperty('background');
            colDate.style.removeProperty('border');
            colDate.style.removeProperty('padding');
            colDate.style.removeProperty('box-shadow');
            colDate.style.removeProperty('overflow');
            colDate.style.removeProperty('box-sizing');
        }
    
        // 4. 상단 행 Flexbox 해제 및 원래 순정 순서/스타일 복원
        if (rowContainer) {
            rowContainer.classList.remove('gtp-smart-top-row');
            rowContainer.style.removeProperty('display');
            rowContainer.style.removeProperty('flex-wrap');
            rowContainer.style.removeProperty('width');
            rowContainer.style.removeProperty('gap');
            rowContainer.style.removeProperty('align-items');
            rowContainer.style.removeProperty('margin-bottom');
            rowContainer.style.removeProperty('height');
            rowContainer.style.removeProperty('max-height');
            rowContainer.style.removeProperty('overflow');
    
            // Restore parent table and tbody display
            let p = rowContainer.parentElement;
            while (p && p !== document.body) {
                if (p.tagName === 'TBODY' || p.tagName === 'TABLE') {
                    if (p.dataset.gtpOrigDisplay !== undefined) {
                        p.style.display = p.dataset.gtpOrigDisplay;
                        delete p.dataset.gtpOrigDisplay;
                    } else {
                        p.style.removeProperty('display');
                    }
                    p.style.removeProperty('width');
                    p.style.removeProperty('height');
                    p.style.removeProperty('max-height');
                    p.style.removeProperty('overflow');
                }
                p = p.parentElement;
            }
        }
    
        if (colDetail) {
            colDetail.classList.remove('gtp-smart-col-detail');
            const detailHeader = colDetail.querySelector('#gtp_smart_detail_header, .gtp-detail-header-styled');
            if (detailHeader) detailHeader.remove();
            colDetail.style.removeProperty('order');
            colDetail.style.removeProperty('flex');
            colDetail.style.removeProperty('min-width');
            colDetail.style.removeProperty('width');
            colDetail.style.removeProperty('max-width');
            colDetail.style.removeProperty('height');
            colDetail.style.removeProperty('min-height');
            colDetail.style.removeProperty('max-height');
            colDetail.style.removeProperty('background');
            colDetail.style.removeProperty('border');
            colDetail.style.removeProperty('border-radius');
            colDetail.style.removeProperty('padding');
            colDetail.style.removeProperty('box-sizing');
            colDetail.style.removeProperty('overflow-y');
            colDetail.style.removeProperty('overflow');
            colDetail.style.removeProperty('box-shadow');
            colDetail.style.removeProperty('display');
            colDetail.style.removeProperty('flex-direction');
            colDetail.style.removeProperty('visibility');
        }
    
        if (colCourse) {
            colCourse.classList.remove('gtp-smart-col-course');
            colCourse.style.removeProperty('order');
            colCourse.style.removeProperty('flex');
            colCourse.style.removeProperty('width');
            colCourse.style.removeProperty('max-width');
            colCourse.style.removeProperty('min-width');
            colCourse.style.removeProperty('box-sizing');
            colCourse.style.removeProperty('display');
            colCourse.style.removeProperty('visibility');
            colCourse.style.removeProperty('margin-top');
            colCourse.style.removeProperty('background');
            colCourse.style.removeProperty('border');
            colCourse.style.removeProperty('border-radius');
            colCourse.style.removeProperty('padding');
            colCourse.style.removeProperty('height');
            colCourse.style.removeProperty('max-height');
            colCourse.style.removeProperty('overflow');
            colCourse.style.removeProperty('position');
            colCourse.style.removeProperty('z-index');
        }
    
        if (formContainer) {
            formContainer.classList.remove('gtp-smart-resv-container');
            formContainer.style.removeProperty('clear');
            formContainer.style.removeProperty('position');
            formContainer.style.removeProperty('margin-top');
            formContainer.style.removeProperty('z-index');
            formContainer.style.removeProperty('width');
            formContainer.style.removeProperty('display');
        }
    
        // 4. 구장 버튼 인라인 스타일 및 원본 텍스트 복원
        if (__gtp_cached_optimized_btns && __gtp_cached_optimized_btns.length > 0) {
            __gtp_cached_optimized_btns.forEach(btn => {
                if (btn.dataset.gtpOrigText) {
                    btn.innerText = btn.dataset.gtpOrigText;
                    delete btn.dataset.gtpOrigText;
                }
                btn.classList.remove('gtp-smart-course-btn');
                btn.style.removeProperty('width');
                btn.style.removeProperty('min-width');
                btn.style.removeProperty('box-sizing');
                btn.style.removeProperty('min-height');
                btn.style.removeProperty('height');
                btn.style.removeProperty('font-size');
                btn.style.removeProperty('line-height');
                btn.style.removeProperty('white-space');
                btn.style.removeProperty('word-break');
                btn.style.removeProperty('padding');
                btn.style.removeProperty('display');
                btn.style.removeProperty('align-items');
                btn.style.removeProperty('justify-content');
                btn.style.removeProperty('text-align');
                btn.style.removeProperty('border-radius');
                btn.style.removeProperty('background');
                btn.style.removeProperty('border');
                btn.style.removeProperty('color');
            });
            __gtp_cached_optimized_btns = [];
        }
    
        __gtp_cached_row = null;
        __gtp_cached_date_col = null;
        __gtp_cached_course_col = null;
        __gtp_cached_detail_col = null;
        __gtp_cached_form_container = null;
        __gtp_cached_detected_regions = [];
        __gtp_cached_common_parent = null;
        __gtp_cached_orig_scroll_el = null;
    }
    
    function showGolftopLayoutToast(msg) {
        let toast = document.getElementById('gtp_layout_toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'gtp_layout_toast';
            toast.style.cssText = `
                position: fixed !important;
                bottom: 30px !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                background: rgba(15, 23, 42, 0.94) !important;
                color: #ffffff !important;
                padding: 9px 20px !important;
                border-radius: 30px !important;
                font-size: 14.5px !important;
                font-weight: 700 !important;
                z-index: 10000000 !important;
                pointer-events: none !important;
                transition: opacity 0.25s ease !important;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3) !important;
                font-family: -apple-system, BlinkMacSystemFont, "Pretendard", Roboto, sans-serif !important;
            `;
            document.body.appendChild(toast);
        }
        toast.innerText = msg;
        toast.style.opacity = '1';
        setTimeout(() => {
            if (toast) toast.style.opacity = '0';
        }, 2500);
    }
    
    function updateGolftopZoomDisplay() {
        const ratio = getStoredGolftopZoomRatio();
        const pct = Math.round(ratio * 100);
        const textEl = document.getElementById('gtp_zoom_val_text');
        if (textEl) {
            textEl.textContent = pct + '%';
        }
    }
    
    function adjustGolftopZoomRatio(delta) {
        let cur = getStoredGolftopZoomRatio();
        let next = Math.round((cur + delta) * 100) / 100;
        next = Math.max(0.6, Math.min(2.5, next));
        setStoredGolftopZoomRatio(next);
        updateGolftopZoomDisplay();
        applyGolftopResponsiveScale(false);
        showGolftopLayoutToast(`화면 배율: ${Math.round(next * 100)}%`);
    }
    
    function resetGolftopZoomRatio() {
        setStoredGolftopZoomRatio(1.0);
        __gtp_user_pinch_scale = 1.0;
        updateGolftopZoomDisplay();
        applyGolftopResponsiveScale(false);
        showGolftopLayoutToast('화면 배율 기본값(100%) 초기화');
    }
    
    function createOrUpdateGolftopTogglePill(isEnabled) {
        let container = document.getElementById('gtp_smartview_float_wrap');
        if (!container) {
            container = document.createElement('div');
            container.id = 'gtp_smartview_float_wrap';
            container.style.cssText = `
                position: fixed !important;
                bottom: 20px !important;
                right: 20px !important;
                z-index: 999999999 !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                gap: 10px !important;
                background: #ffffff !important;
                border: 1px solid #e2e8f0 !important;
                border-radius: 16px !important;
                padding: 12px 16px 14px !important;
                box-shadow: 0 12px 28px -12px rgba(15, 23, 42, 0.35) !important;
                user-select: none !important;
                font-family: -apple-system, BlinkMacSystemFont, "Pretendard", Roboto, sans-serif !important;
            `;
    
            // 1. GOLFTOP SMART VIEW 로고 (켜기/끄기 토글과 같은 흰 카드 안, 토글 위)
            //    배율 조절은 없앰. 예전에 바꿔 둔 사용자 배율이 남아 화면이 작게/크게 고정되지 않도록 한 번 초기화
            try { localStorage.removeItem(GTP_CUSTOM_ZOOM_STORAGE_KEY); } catch (e) {}
            const logoImg = document.createElement('img');
            logoImg.id = 'gtp_smartview_logo';
            logoImg.alt = 'GOLFTOP SMART VIEW';
            logoImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhAAAADICAYAAAC58tjiAAAQAElEQVR4nOydB3wUxf7Af7N7dwkhRWoIoqCiQLCLij4bYu8NXrGAYHkq4el7z17+8Sn2ghQrxYL6lKcidkFF7CgqCAlIFQSSUEwvd7sz/9/s3SV3l7vkdm8vt0l+3w9hbnZ2Z2br/Ob3m/mNAgRBEARBECZRgCAIgiAIwiQkQBAEQRAEYRoSIAiCIAiCMA0JEARBEARBmIYECIIgCIIgTEMCBEEQBEEQpiEBgiAIgiAI05AAQRAEQRCEaUiAIAiCIAjCNCRAEARBEARhGhIgCIIgCIIwDQkQBEEQBEGYhgQIgiAIgiBMQwIEQRAEQRCmIQGCIAiCIAjTkABBEARBEIRpSIAgCIIgCMI0JEAQBEEQBGEaEiAIgiAIgjANCRAEQRAEQZiGBAiCIAiCIExDAgRBEARBEKYhAYIgCIIgCNOQAEEQBEEQhGlIgCAIgiAIwjQkQBAEQRAEYRoSIAiCIAiCMA0JEARBEARBmMYFKeT232dfynU4VVHYcCHEPowxwBAobArxxzIMZt67x+VTgSAIgiAcQko1ENhIHgMMLuYoPAiMY2hsl6GIEXa2dA5wkC7gTCAIgiAIB5FSDQQHtj8YjSb2tMHf4+YhcfD3wCkdIBsIgiAIwkGkVIAQuvD4f3GjsRRcBFP8bWhjvLOni3QgCIIgCAeRWg0E2jBkOykbS8F5wPYf6Hjz4BgASheMcSAIgiAIB5FiE4YQCjSq6Q31vaG8D3S8/XFKB07yA0EQBOEsUipAYOPIuOBGIylCxgCEx21NL8d0FojrCsaF4EtlTfCwGjmk1FCKCCZA4VwBtQsezxkoaQL4CDxeDTk+Jwn1i57ulysIgiAIwjGkVgMR6FmLgM0/OAbAprgP416M/YbtbzG2xdU6h/W423YstUIFViF0UQMuXoeihIYNdz3KBy7QAeUKgeKD8KIooXAmmAu0NBDKs5hfT9Sa5GDmvRUFBmD1sw0LA4jTsTw3pnuScz4EQRAE4SxSO4gy0PVnwQGEgVkHCcVB1GAPfh7Gd4CirGW62ASM70BppZwxT5XHXV/9QP9r/2heGcEK4e6wnn4h/J/MPKz9vmHzjO6KD7KE0HcTTM1GBUUP3OcTxmEf1E0MwHxOw/q4sPx0W84nECcIgiAIJ5HSlun6tc98j1UY1rQlMKLQfFzD/5dgz70IQPkeG/VlboVvqMxQqp/te3VtcO+CNVOyXekZLl8NS3eleT3gc3XBPNJQwOiCygaPUMCNWbrByJULHbUYqHmoUzjU6ox7ha7WMRV86S6vVlsvfO70rrq3plbL6uJSvRrPBBfLQ9vHIBQ5hqOWYyiKAcdgTu6Ez0/Assn7XnUwEARBEIRDSLUGQhGBMQAGRodbNLo/8Ictp3PB5ykClqK2YammuZZNGzx+a2Q51/z2ZDeXV8lTFbaXXqft4XKxvlxTBjBFz8R8FGaoGcQ5xoyHxnxZYCYln4c/XQowTah8F27a1MDVTaobtulawyamitIH97l6J26vwL8t+PdDwZpZHyvCO4SryiGg8+MZU7phzidYOT+ZrtAQCIIgCMJhpLRlmvjrM8uwiTzQ6Gcb1gdo9KHUGAajzbaz/2L4Cfb0vyzdr9uauWy0Hpl/wZrn+qmgDdSFciBqA4bi/rnYGp8O/nGK7hbzj12+F8Of8cd63PA7E+JXXcA64dHXKTovmbrvxIZg+YWiUNm+oecezOcajlLKn/C4/bH8EXGdX3j6sqn7/Z00EARBEIRjSKkAUfDr0yuxx50f/9oQ8DkG25gCC9CksLj3PtvXF7LCsDmOYzfMTs/x+g7QhPYnRVGG4f674XGn4PGKnEVh81oVPmFM22AfYCNfhfHlWJnFvbzdfircf7S3sVK4yw1FM7vpHu1YzvlI1EgcgIedYKIcEiAIgiAIR5FSAeK61U8VYwUGh45SDOl4h8Y1DOZge/oucO2b0kG5pdE0DhNWTe0rQB2NLe4JGD0F/1x4vDuO/O2Iyzr6sMVfiEaRhaDpb0/Pn/AbRHDD5se6eGszjsafo/HIMXh8Whz5L58+6JqDgCAIgiAcQkrHQMjym/s9iIzDJ7jf5xi+1Gdw6aZIjYPk38te7FrrqToRmHI29thHMwE5sfNLWtxlzL4AOJtxOE4oyoHX/frUPLe7/svJe91QHqzr43v8sw6DT1DYKUZhp1juj2LCia3lTxAEQRBOIqUt0zXF09dgFQb6J3QGRg4G+9yM1WDwJTafz3XJrHs/0PA249qV0wdyBS7GxvZSPH5P/6yHqPm1dVxDYaYEhZpXQIf/Pj30mp8i6z5qxeueHq6dh6O4cBFGx+PxWTHyW/7UkOtIA0EQBEE4hpTPwvBPN4DGtSAC8VrO9WdVpr68c3CPn6OZKyTXFD95PGomxuNBZ3HOu4UcH5lfKuJSI9EPOP8XxgdcXTTthWfyJ7wfWv+5/nESX1217pkVrN67hSnKX/D4wyLzEwxUIAiCIAgHkVINxFUrp63DNnLvsI0MlgGHt92qeGba4IKtUY9b90wONPj+hjtfgL3343GTO9p+kV4VUpguBaDNaIqYwlXXS88OunpH5L6XLnu4axdPl4sUgOtQZjg87HgBq54ZOmEIEARBEIRDSO0YCMb0kLUgqhUGK3SdzfYAe2Xa4AnV0Q4Zv/Kx7lDv+zvufx0KH30jxwxEzmJwSLqK6QMwepPQGvpdsWrqtBmDCzaEntdLB91YM2pF4avdWa9SzvhlqHY4C/fPChzfAI5nQHpGzy7doqUoqlevLl0nfWXo0P5RM3P36cF1T5hWqFarq4PyjeVAEEQj5/1UuFud7u4Suk24fXrO6vydc0eP7gjfg05NSjUQV6yc8ho2lMfiz3JFgWKUJV7wdc38+Pm9Lq+Ptv/lP07p5UqHfwnOLsPGNU+ETFcId74UMoTAeemlGH4qmHLXzKHXrY12nleumH4wU/QrOGenYnQg/r05Y/+CC8EZqDm9Bw4A8JyEp3M6ntURKCjlxXMgnrcP/1+PAtHnKG8t1Fjd4pqyDaXgTNTMHvvup6iuEXjXTon3PEPPEQXBd6EWvq6qWrUT2gaWlTW4u57GPCaPA6bUc7wX0lGaD9qc2MKnUwhenxM+K1TTstyOrmtLNFT5/lg0orAebGbkt5Ny3S5xHL7XJ+FH7nh8EfbG98UtQsaFBTtWYS77hdiGG5YA8A8wujBz/aCNbSVY4L1Mb6t72VGFppQKEFeueOKfOmd7KwrbhY/VR2q9Z8mzw66O+gEb+9Pju6kedSKaN67BB69PuMfGRj8R7SjO56hCmfTsgQWrop3vVb9M2Udn7BwQ/FCFKd88t3/Bk5A61Kzeg4/Eek9Ege8CxqKbjCwhoFww8YLQxZNVO1atAQibxdrWuHN6Dx4hGPsH1kKuaaKADeC934p5Tff6Gl6q27VuMySLXvmZOYp4F5+w48E8taDz4yp2rFoKbUxW7uCzFVDmg7Mxrs+R71/SF1/j+ca7HEwJtontII7fn3M+PuKOdyBRhGBnLLl/X10V16KadQzmv5tN9fXhj5dVhT/ddf3gH5LZ4J6y5N6zsdz5Kbgf2zCOQpNoc6HJblIqQFy+Ykq+ykUXL9dLXjz4n1ti7Tdu1YNZ4E2/Emt7G1a5R3gb45du22F8J/76AFT1jplR/EVIrvrhmRzuqR+oM61s9gH/Sl7DE4vuA7OzXO6/40P+b+xR94Ikgx+3dfgxuqNyR/Eb0IY94YyeQ/JcCvs3Y+IavD9dIImgMLEAvyZ3VpYWLQG7hSUSIJKIqBOafvzwDy7rIwUIw2QZNF22qzAxAeKorx/rkq3WjRKM34X57ZPc+sImfGHuzNYz5849OvosvESQAgTe1/kOuC/yW/eyQKEpJ8lCk92kVICIB+kOeuOK7mOxJ36vVCGLRr8IIqrdoJ2l78T/p/rS2eMv7zuxEhxDvy5ZvbMKsJ732qptiJ9NqGm6sWJ7kRQkkvcyoYCU7fZMwrsxAdoYvO/fcx+Mrd5VVAR2QQJEUuHAzznqnUvkuzy/qSMQETbaLh2bbkmAGPX662p5/19HY/ZPY/7ZbVz/Svxq/n233/Z73c7G1RAgBGogHHV/YBO2Ejdmbxz8RnsQJGxR0SYNVJNtWNH9JME59gwhz1jiWhi9OOOSy3hkaDJdx3CXtMNh+AmGi5iAz3CHz4w4F99iuAXDXRxAS0L5PfC/89214ozCzwpT7dRLwjJzB52Yk5u9WmHswRQJD5I98cl8Lbv3kC/Sdxs8AOxHzc4d/Lcct2dbKoQHCZZ7uOqGldm5+VOlIANE+0D3f+797zBrepcDjULju+7QdCvi+Mhv78sv33P1D3j0K5h/dgrqn40/Xinvv+YbWRewEefdP9iTC/ZaRf/Vq09ect/x4HCc0GjFZOzPk/vrTFylMGUY5xGzHHiMsPV0H4aVGK7AcDPnfCUDZQMKKSXYXNYoHAxVGQdV7rwb/shTFLEf12E/RVH2EoIPxeMyMT+PxfIjtsNBwMSVG3p0k/b/Nu/9NZKb2zVbdH8ItQ7XgkPA63OUx8N+9fQeckVlWfFL4P92J0TXXvl9XAzm4M+R4ACkAIOCzLl6z8GXVu9Y9TkQjkeIiB/C33/kIXGnpptZ2fewH55xd/NtvxmljnsAUl9//PYejuEvI7+799ZytdfjS2OMl4sbKQw2dvyddf/w3z4g9EUnfXPvnX+4ez2Y8LkmCccKEGM3FKZrFezPCogTgxfWr/5vutAm417csAPvzNe64AsUwX5Bm9Om3bq6doSuoBmNgjVT0qoa6rvpXlc/UJWDMLcTZQ8S890Tw7RE64ehXPTr4kuXPbxKTueENqZL94H93OB+CxvsYeAw/FoQ9kJO7/wDK8qKboUExkZk99jvcKaANIvsAc5iD0Vhn2bnDvlnZWnxNOgY0107JBreGsXwfxdlunZoB8Gh6Vqcj9apXxd217Wy57B/fIE0uTro/BT8Zj6Y4ys9Eut45UdHF+6CBHD8/QN+T3et7KCTfnjgioXDbqkAh+FYAUKvzDmagX4JqnO6+YeaQMiF9gtvMuQixIoUO92LkuanIJQ3uaJ88PJBE383U5eAgFES+PsBG/p3OFeGM5Vdwjkcj/n3TrB+qBYUZ2Fb+REmfIwJCfe04yWzx75DVNWNdvMIh15Og8G/cnoPya4oK74OLAgR2T2HnIn363X8mQEOJDDjYzIKSnskKigRyUWEdADaY9gaJ3xb2E/j7C08YJhTzwO/mRdowPbEup6/aHihqe95EClMsYAZoa3qbSXENuMi8HkzUYj4i9OECEeOgRi1YnomXrRR2DgPlBdRNrryUqK5IRCKprD19BJUfb2Jz8l9Lx1y/XNmhYdooJagbM6h/5qPCsE7sfAXsfzNWJ5msX7B9H051y+7bNnjfaGNaBQemMOFhyCMXYlCxHQAc2MzMnsPvhCfdDlIz5HCQxgoKGX3HjIFIGXjT4hWkO+uMNTMxmJ//t/Cvz0wzMmxig4obQAAEABJREFU6a1x4lf39leE8ikeO8zx54embcaVD2WdwRJqe7p/p3Gf72FpVgIH4TwBQgjm9jYM5zo/Ga9buohofEVjI8xDBqPETN+GO7zkE+p/5hz0zy/AZuYcdP3qBuG7F38WYn1XYHm6yfpFpp/k0/jpo1YUmnYEZJb03Yb0V1TX2+1GeAiAL9Xl2b0GxT1+IbtH/hEqKDPs8unQFmBd/57Ve8gNACYM1kSbITiEDHxr+vgHoo5PjwX2cHME4zPx+H3b0fkNxS7YTFl3MI3eHs4vJF1ciaab8eAgHPdRvWzJ/d254KNQtZQXbFxDVTom4jsEF1O8zPPwa4fdUAxJYi6qlLyeqjlMFYVY+lJDiLBWXzDsewzyoTI7E5JJt71z0jxsJjZU+0I7Ai+TD407f6vcvvqjePaXQhKoYg42w7tBOwMlh/tRc3IBEI5C1/yhCHzVw9TN7SAerH8ksmerN/gexv1GtsPzG6k3NJjvnWvt5vwa46i1vuuErwsHgkNwlgCB2gev4hmBF+pU7MpnyEvXqP4PDUWM7U3p1TqIaRpoT809dOJ2SDJz9y/0vnLIjW9j73gS3uhvsHzeSv1i1V/VhPB2UeuT2fNkOa70a7GFcsQshLgRUI7WyjMqthfNBb9A3jLtVEgKIjUmUnMiNShAOIrGj3nkx72dxKOcEMtuKL0BO25Xttfzw39XZuI5yHOBONEbT79dnW8e2m4mmDnPZOKoQZR/XfpoD8HEKWj32d0YYMj9Aw7DQpBTLKNsb0qv5Ew8qwo2/dU2HnCir93jPbbXxp14ty/BBuBMrI9LYeAJ1E/huhG6ubz7Ms6FG8MGuR+G1WjG+Aqz+V6p9SZtJkZWr/xjhAKFdj59+IBzPN/P8QH/EJgo9jWw5YoL5FLlwDXwuNPEgUwowzDtDNQsWZnpsVkTcE7N9uKf49w/KUISfqZ+wP9mcwaLWa3YVlW1ahfAgLQu3V093arnAHylz0WJ/M+2aTwwH6bCfSgMXQh/rHfcCGwngM/eF9jwTYE2QOfiR6aIXvi0P9e4TYRPjTTiDHLwI4/PO77rgenahsjr/0a5jDVVmuKR6S3FvRj/H75DNbHKx3dQxf0Pw/27R8sPhfBmHh1HfHnPEfhN+j8L9WkpvhX/m4PhB6rbXVzu6rlr7/Xd+Jbdi3qoCgxQNOUkUMRluP8gm8pDxK3HfnH3IrRVL4E4sVwewEbctiDq/Q+/Hwfi/nvivnk2Xt+LR3x1z3OfAayEFOMoG+tflj50rK4LtFcr+0mpK3S2QngYnObSLB2bMvgAXK5/zD3sn2shRYz68b5eQlMPVAEGYS2NgXuG0KAwN5MGDnzFQWdeNHtkCJ3VKqrwYf1rFCF+Uxr4j68ce+sfkAwS81TYHAE/c8bvqipd9SHEO2sgN7drFu/+F6bA/fG4x8ZGeyVwdl7l9qK472dGr/xD3HLWjQ0NOZa/HZ+pW6uUXf+F0tJ4BLvAuiHKZDnVF+xAwDUVZUVPt7pfJ/REiW/Ti5VlxWOgnXDs4kl5jPm+xXu0Z9PWQOvQenyTEK7hXxx3+zawiRM+K8zkLngT8z85jvJbi0vr/dPAXQ8sPv6OuFzvH/f5vXsA027Dj/ffLZTXLI7flHe9aubob+JwfX38F3efjUfOt1YevLj42MK4nztpXsmq33YYF+wmPP58q+cXjGNjUvDFMXdNgxTjKA2EposD8EINlFKAxK+xCZ1mE4zHTK8WCpvzRgqFB8ncQ2+TZpNPAn+OIVuIs+wQHvDx3YGi8KWV21cvALM+C7ARroLSmQD9XmnNXbbs8ft8vvPrdq01M3PG7VZAToNMSHgwtCpC3F65vfoJgN/N+OHXq8pWfY3hUdm5g0czwZ7Gj2OCnibFHem5gz6qL129AYgOQGx/AK2FdqOrcB6+gydbrU9IOF/V4bpFI8xNqQwIGtccu7hwKtbjeXznD0+kHqiNOsulVZ+Lef43nvIt3wcuwAwBR1AoOMIFx31eeCJq2l/DfHpaL5+fjsLfjGSsrGoGx4yBuPjbQmzfYDh+txV5awy7lhFyQ1AIi8dIxxfze5/u+xSI5nTbOwdUuB4SRcAnOmcHoPAgtQ4JODz6va6qrPghr5fvZ5gGIouR/jDq2KkmhQdpohmOT8K5kAjGeAs4tWL7qgdMCg+h6JWlq15FvdNhhhYlERjb3SPUdtPLJlomaNu2GtrFEQvvkwsTTky0PqhWv7s2I+8is8JDKF8cV1jkc2Udj2bAZxKtjwB+/UkLWp+VEfx4tfV9WHx8oWyjzsR8yhMo/1DNBW025T8WjhEgqrQumdhoDDGEAh6yhkSo8MCjhCHpKH1+NH/47aVANCPb5T4KL1JiA/JQeKjw1V9Ys72oBGyivnzVxkrYdQLewzmNxeDvSrbrgsrKIrNe5lxoo74WG3/r02Dl8uI6Cg9lxQvBBqTpBbUop0UTkkzB4M9de++VC0Q7x28FC3ZgmxqF+OLB4+0gzeM9GfM9PJH66Fzc/OVx/3e3Ha6WpdmhrsvWAnzWH7Van0D8iHpX/VFxFGk1/4RdxaLAtAQ7Bg9YLR/j8luQ8in4jhEgFEWTwsPuYU6WAJpmKfAYYVP6GpQ8bff10EFw4QUewxLQgWKjvqbBK8YnZTAfmjUqy6quwkKew5v5KNq0x8U53iCMzNwhg9FkcBpYRJotdOBXVO4sinsQVjxILQr3sbGG6ccieOMGqzx9BBDtnK7+RfWgUWtqMt4V7EAuy43ZjTVfflMcea4hs+/jdnrOXTrsWZ+uVtyJRb1r7foYcelgcswJrS1QqOuQ4PkniJiL+ZVYLJ8JzveBFOMYAUIobE/UIPSWv5ukLA7xxtEytMjrZauAaEZO7333BMFOAIsI6QpcsPH15cW/QdL4vQ57/XKw4I1g0Y2zyuHMhAZOMphaXbbqTUgC1buKVuI9uAESQYVLAQakA9GOkXJxYNyWYE2NQpxxuzQQav0f+ZjlsWbLb4rDSq7CHclY5Ombox+vw/xvwPK2Wa0fGrZPqVfUVqZwq2A1f0jQjCFxabAV8/vR6vPAQE25fxtHCBCjUBrmHAaAbAOMCyQi7D2txJko56AvfC9ZsxfaOQLcR6HuoQ9YBB/Xl6q2F30DyUd2Cay9mb3yM/FpPh0sgi/kNuBsmuXy46BSwDzM/nOwimCH5vR2p9zuSSSGMYpLRNi044nb+Ghyxk7CfDNMlR8ef+DrPxWWQZL4ZkThWlQIPpFA/boD9x3aUhnBhcUs5W8DcgAkiiI7LJ6fNB+l3MeNM2ZheLwe5uN5nDO/cCcVCyZC1DsX4cv1HdjE+d/d16NB45mq4IZHSK4y7mL4n6YZJgCFu4Tm1sOeIhV139wFhkqE+1TGXLoamS+Ti+EFwGfAFdwmfyu6UEBntS6XXvOWzS8mahhHWJ6xK6BcZzAZADRwMJnct4dQ3AdYtdHgcS9VbC9aB8lke1G13nvwFJTaj7NiTpJCoODuQfhzPRDtklrwD9CRjYAxa4AHZw/EF6+FxEHVfnq90I+zUr4/rvyk6Q0fQJLxKforqq5egeUOtHa9FGnye7mlMqydP360OdiCzEdhFp8HJfXr5ThCgKjhShdFh55+L1GB6SrSzhOcLhMRRqZjfGmtV7Nl8OSZX95zjqaJkxQBAwVDFRE27gzVG7qQXqBUQ2rhiuAMBQZ5Bw0pBkNjOCdXMJGDqggm5Kq/IemhoYIhb4wLnSmsC56NIlxQ7uNs41lfTlqi6uKjt+OcS90iPQdloflhUAIzwD6pLi12vGlIUdwD8BS7gwUMEw2IeZBE7UNTWQ1fAeuyGn8OBgvgI3MIBkn/eBPJw2/DDp1+HmdcHmeDzrhO9+bg+zLYdPnBOOfzl5x0/05IMt8fN+n3oz676yMsd6Cl6yX4oD99eVPWV8c8VBW1AP8QCPPnHzRj2ITV8vF5SPmKvY4QINx1XrfmgmwIu0DQZGeKCCPT8UKusmM+7FmLJ43EHG/j/mVs1aZy5X9Bu1fj4uKNcRkau3AeUr/w9NBQD4sDNA6xFX4zF244VVeVXmd+cf/TiZplunA9hynKXgk88NLXg6O1DxK8bAdaP0exXGmobRMhqaZsQ2l2br68ppYECHw6pFpWvreOvydELAKNgXxcjX5QeNzoGEVJZ3a1WYraD79xfcyWH4hr2AOyZYZSq8hiFyrzUGi6VrplibN+oekDG+ozpLO6qlhFCPPnH+i4QsIc+NG/uzIhdgcr5fs1EGsgxThiDES9yrO5LjJEwM5jNsR7mXBPvVAUKpzxY1EzcCRmqVqph00hPlNsT13wM4XC+0OCeBRXLj5w3cASok7o2o/QDhByETKL4Ou4rKJiU5uNn8FnbBFYhYme0CufBlK2Y4Izx5r6D01xfxg93a7B/1ywvphVhtnyA+mbQPe1WcMlVFiF78tWE/ULTc9WFT3mty/UD4SV/BPFo2bmYj5DrZaPpvtySDGO0EDg9UiXI/2CtyUyNNa+iLK9MWSQ8Md/0SJQMlzQzz++yVz5yUjHeF+ucTlgLt71H6LCVeiLUmIGWIJt15hq2TlMG+LC7onl+W34ghZBG6Jy+A31W9KcbeG+sL3wy5+FB1cDgbC/5uTmj4BkIES5xsTFNaWrfgG7kHfdDQGNQpNtW4hYnhUjPBDaMQgCG1bjG2OhfDxuQ73ubbNnD1UH5ZkAa7H83eOqX3iYIYUlzCame3bT5x/cnqgKQhrEPxWXS02QlfKFBNTkjtmKA8e4sjb0CEKB4IPtn6bCIOxBD4mHpuNHxAs2gFkqYTcszvKTkY5xt8KYdYdItiA21DJWBU5H9shlz9yqCYO1rSrQB2wrtiHSJ8SeQCQE87tB3wOSAWM9XLqw/R0Mjt9qGlMgQmzxracnCuO8n1AUS+Xjry3LT30kaYv9RVI0orB62II7f2Mmrk9Yehx2H7PX3x9PTHl/5KeFJ3Oh/9N6+UyO+Uv5YGpHCBCcG51wDoGeuL8xbeqZB6eviBjplk3fIfTani/Kc1fVKMJ8+UlK19HInbBghFm57bg+dpOZu09vRaS9ge9Jf1MHCjHOLi+R/uzQpisUmv5LtBnG2x4pDETKBq2lJ4AxdtBq+QxSopEUZq9PIJ215DJSM/qsLR4fO3+LGgj8tA/75M4/61yfCaEaSPPn92OmS654mlqcooHQUKhqaJzOAiywZHdzFU60dIXrtrhnw5cqIOyZKz8p6Uw0YH0SHmWrCravEwUIrntUVTV64KZ6j3hduoCN4CX3Yo/M6noXlpBanRzU7kDYioxEZyG2IsHQpkILR0Jy6xBH+QIqoY0RhomxcQRhS3s2S2+pmfcLUi0fHzN/k7fisAU34yvvOgUWsNvw0INbzb+VdGwx5qd6IS2JIwQIF+dVOrBqHnTZCX4HD03TViLiEem6EHlgA4FJFKbLT0o6Zw1CSbxh44ooUpwoQTgEvOZdmGJ1kKk15BgGOZYBiE6LaMX2HitMefly1vUgrccAABAASURBVEBbI1h+mOnX1PVqedUKq9cB6/PXwz6+c0Sc+/fBnqk7dDaN5XL94RavgI/BAThCgPDp7jrGfDtEjGkrrcUVhe2BG7DjnqBPdiaY4Z7BZPlJiYOoZoraZrbGaGBVuuZ4q932L35hM8pOvFw9NCtyEl5rhhY0W7UaBNESTR0H86EdIgRqP30srANjqvxWV7m0H+vXq2UCa2FYy9eN4R4WjrMjnLH81Hs3gANwxDROXfU16AK2i9CFsgRAU5xHxMPTNV3se/oHd2dBggSKMV1+ktLLlXpvwtN0GFcs+wtAcSzPq3rsWb0nmZSW1uAV2wIWUTizPAXUCm4QcmR4T7CCAI0p9Tb5wSNShf2NYfzge73Gavn44PXP/6wwE9oIWRaW3N9yYwuixe9fChr/RMNVmu6aAQ7BKYtp1eNDvU0YU+SFMZhQXrDGxhSgMR49XRxY50psadOhRUXSclBmrfykpG9GBVHCGghUqUi32JYmf2F/I9elegZAOwB1R5YHdwnGDgRbhuLGh64YA0etTa1lYnON6JJSzRSRGCKgVW802cYIm6UnuoZ0AFS5yUHDmunyjVAMdNVBmy3iJMvCcgc2r0dc16+WgRpzWQAtcD3NnX9K02XH4Y7lZxQ6Zmq9IwQIORgEL9EmvEC7mhrRwIWTDSsPbVybp+PfYKbA0YWFhZbPp/D/CgUqAlahIWQj5ivMlJ+E9HpsztZ5PYkPWJJTBsE/ZdA0aElxKSD+BO0AJhTrvhwYHJyVtV8PaBvwUWUngkXQUrcFtheRANGO8XcYAr8bOxAQ/g2IkW4HXl3fitnusFK+0EVfVdGseVG1gEvU74/l9o27fuHpf2h6Q4tLHJg+/1SmM7j1p1MnJWW1YKs4Zzlv8ElvY9t5qFof/N7XwuLR0gVkaZp2zCfDvblgFSYn5vi+w/xfwyxXY/7VGNbL2SFGyHkdhnWYHggDcQHhcS58puvfPL1E08RqO0bZ1qq7KjFDy34OhALnQ7e9U2D3NAc+A78JYdG9sxBDWDobBm1A19579UbJbCRYhAmxHOxrS4gUwP0z1gONRsAGH0fcRrvVH6jx/d1s+YE4w47weSDaQGOHZeiKcpYQfgf/pq+XYGu1LhnlrRRh9vxTEsd/T6s9tz9uuApyEI5xJAWa+3fO9FLG2JCg44zgymPxxdkRjCkHYE7bwCKLT520+cT373hOZ8pSoYh+mG8m5qlKwwp2GzWuY0HSAYvODdFLrq8l4/hG6UY6Fy7cfx9UZZyM9dvLXP1D4rrYguKEPWszyPEBuT2KMHtrjZaAI7Jd7qNQFfIhOBiNaxs8LnULXsj+YBI5kFIwZQz+lP4lkrrGhAu6nA8W18EQ8kvKYnvVI9oL/sX0mk3fbiUej1OkePjlzAfKD3r/thWY3zAz5Yc4wDvvwHfueHQ5JHcg30Ef3ZkvuP5n0/VrjIvl0hFVS2VYOv82jiug3K3mlk1aOuzZlC+eFYljBAift3ankpa2AnviJwQbVeNCcg5xxvcRCjv2hM8KFyfSc//0jHule1DLLkKPee/W/ZjqqsX6TMB6uUzUvzGOT8wqd63LltVFJQL0hWgLLAALBBrX6wD6fQ7we5v6SzBD3c5fSz29838As46pAuBH8ZycnoMPqtixKmkNtHSehX2JCcxi5w0fj01eTS8GIgSxER/wBf7fbG+8tPuBXUhX1irY4uU2PN/QRffiD0HYpIOQn5v32ULUZo21Ug8Md8cO1mj8+SAkC/wcivf1K/FXTwv184dcxOVwrg0GPloNa/E6jP/5zHtfc5rmIYhjBIivzn2o6k8f3CHXfajAG5/DWIiHRu6fO9taHC/4yXpdw6u4qU3XNgjFlZG2SavTSoyX1GT9A3E5mHN1L99K21xIozlkqcclfrPSO5dgg3dWTu/sMRVl8DQ4Fw2v3lt4GS8Ea2QIlRWioDQ6SYISU7ingClsKFgEz+8bKSgB0Qi+Mosry4qvgnaCsRSGoZoO69HHHbdjKQwDrn8DTC0RgvcxU35THP590Id3vrvstHtWQhI48L1bj8FirjF7fULiWxhXW13DJIH8kxzHb5miTVx+5kOOXovIMWMgJIwzqYEwVPc8MDggbERqa3EOwzhXLjry/cJsSBG+ylo3CgJ7Yn3cputvxLmcjrh67ui5No25NnrnW/G5fBcS4/7sHvlHgIPxMv1rfAMtT+eUglJW76wCSMKMjMzegy/AXG+DBEDJUgrHtIx3Oye04+C31ZuI20SPrumb8Fu7yHT5IugtWPTkPu0Jw8OizQx57/b+aMKdieV5rNYPfyxYfva9G1ssSH5hRYL3w+44wAKuw0G/nHnfhcvPcLbwIHGUAOHyqqsx+LZx+drggEMRI2yergoGFzPwnQ0pQlc9R2JdRlisP/7Pin0+sG/1Pz+yhJdFImtrMNiNqfBqZo99h4BDqS9dvRHPcR4kAEoO92f1GjwGbBQipOClgjIDexiW3ze8fysFaN8C0b4JzJ9pabR9S3Gwaf4Nmnk1rogXAp8eq/UZ2VDHph340b9t8xVz2Os35yicz8TO4L5Wrk8gzoXOX2lN7a9bz9/WOH5otmLH8XahK3v+ctb9p6w4977lTjVZROIoAWLR+YXlurRnClgZNrVRNElrofFo6dgo74cP38Th8287HdqYo+ffeTjaFW/E+gy2WH8dH/wv69Pqy8Bmqsqq0TwkEnN/ymBvxeVanJk7yPI0xCQjGBezIYFFj2Ujj8zOzh1yOxgLLycEy8oddA5zwWdSAINE4OLp6tJ1tj8XRNvj9/kS7gGxcbR9K+m2UpP+Jf6/2Ez5zdPZJXqD+nb+ezf2gQQZ/NYtA+rTlYWY8Uir18f/TYUFWQ2+L1svUbOWf2Lp29Bs9AnG/4MpI3h9WtYvZ9+/+4pzHrxvxXmTNkM7wzmzMAIwxfOFrnnfRXPQ0CZxrelGhMZbSB+GLcH1h793e833Z05aDG3AUW/fcghn+o1SKjeelpbrBzHSv0eZ7tPkLJf7ex0TQ6bgI3xGIj1hVPP3VEH9JDs3f1qlz3s77FpryVeF4D7slLtVu0aWB6nYsWpZTu4QVPWz8ZAAeJ735PTOP8GrecfW7VprXpXYfWB2ttszCc9uAiSI1D5wxfc6EB2G8NH2TXEREY9Mt5Oi0YXV+7996xR82I8TcoJPHOVHT2cjQVN/2f/t2/624pz7FprtPY96fZRalL7PaHzrnsZ8s82XH5bOFeCPfjP68TjGMbmkqsJs/v5PlhAvrjz3gTHQyXGUBkLy3RmFlfjxfhc1CUVGz1z4e+iN7p/ji6MWjJ/IdLj5yLdvOxmSzBHv3HwQyrL/xCqcJ6QZxXx9ZVxHu997dWkNP0GSqCgrXoQvwRtgA7JhzHZ5dqAgMSWr5+D9ID6VvypNINi7n+xxu3/FNzEZC/Nouo89jlfVkvOsMBiM9Lg9m7N7D3kxs3t+PsRxjl2677NHdu/8R3Pc7hI7hAcDwR4g7UPHITiZomm2gLm4nZQ31H+An6L3EqlPIN6TA/84f/7NPw6dd/PZhz1zVavaO2n6yJ9/y9iVnoGrMatXpPCQQPnB+BtpJeWLIB50zUr+tk2G6Qg4TgMh6ZLl/qG2sv49vF+BNQoievDxxV0ojJ6K8mLmEfNu6+UVnvd/RhMJ2Mhh7xRmqNw7As0P4zB6NpbvNlG/yPjXCmfzk6N9aMSn++BuxS1GSE0CJAhK4vJ8C5iqFGCj6WNSHcqgCE/nO5SHGox9QMlRGDsCz/EoPMuhiWg/4qV6V9HKrN75D2D9HgEbwDpfqrrhUhSWyvCmfYBbFqCAuoUDW62AGITp++DfiXiyJ+E16B04CuwABaF3K8uqbBH6WiEDVOWHnFwTy4II+ANPsxrMIOC+irIiJ8/maRPCRt8DiztuN79jTz3/7VvuwvyPwfx3M1uf5nG5VDWbX5vbzZc/7+bFmP6mAmwz1zW066dlgarvjwKx/B6cotWxoSKgrrVeXlh8Byji7qVXx+8voTEfk+XxJAhz7RFHChDSj8Mhb9/8rirYcXjDjgy7keZCVQA/Bj/u/VRRd9iwt2/7sEHlP/xy1gN/QAKc8FlhemVV7cGgN5yug7gIy9kPy3MlUM9KbHjn1TR47HEe1QKycUXV/J1Y6FNgIwFhYqThsIpBgcrUyD2S8PmLTZWAZ7JBnIr33jYNlCEcMDYGf45RVQXU4NZkIWC91ysKHOt/g4FcBt3cUuhCON6rabJp7MmCtdBuis594KfBb91yL5bwSCL1igjdhjkX2Eijw67IpkYPuNO0Jf/IUPqrnFB8zoNxTys11uIUFssj+cHAkQKEpMpd+122t+treIMHo2o/R36meUBaNRkqKC3ujc3XdWgkONXD4cND37x1EWdixc/nP7ARTHDYG7flMZUPrfqj7mjsSJ+ED9IhmH+mxXo1hUy8IzT1DbRJ2u+0JgrYA5yZ03vIodgYXgkdle1F1d7dhlzp8YgFKETsC+0MacvF5+Om+vJVG4HoUIjgf/6ut9/DZJzxZImrXct2TanJ7TYIu9ZXmqmPg+Iz8BxMrxMhrJZHGDhWgFh7xtSGA9/898squA7C+zWGB1RIRqMbHNwCfoG2Kd5iehqmD8UHZiBGRzEulh365i3L8XFYryqsxCf0HYpgDaAohvpLAa6iSOsBpmcIofZDTQZqGfgQzsWhmN/umE+GyfKjpuuo7meKOvunCyZtgrbDV+FruDHHnS4991lel8Hp1JcX/+bpkX8Jqgo+AtZ2KwgmihQe8L9/VG9f5aiFcwh7CFWLG62SCI1DRDwkHUTSBAip9t/79ZtvdMtVjYUYaal+qUv/n09jN6662ryrZ5FA+YSDBQjJ8vMf2X7wmzfPxft1PEYHSBeNofanSHtUnOlp0tETRvfE7/TpGK/x6aIObfUNmK4xzuXiWVK9pYLgHtyOqjiRgQ8SahpkPOHyQ9Or0B74qlK2YzG09bzfP9ZXeLsPHOt2u9/COrXJQlKpoHJn0RLUtozC6zy3vQgR+NTcVLW9eDqQorSD0nx0f1Mcoo7+D8aTyfrRD1bkv37jJbpLfZ0LfqyV+qUg/UNNZ1fIuoMFrJcPBDhwFkYY2KhWd6ldiA3vTLyRFdDY+IpGaTA8bjrdhXE0j4g+KEz0x/R9UMOQj4n5gotBmL4XpvfD/bvj/p4klP8/za3+d+nVqVkkRU5P1DmTgz+/gA5MRVnxQhT+zrBlZkYSMcwWnF9eVVb0GJDw0HHRAx2I4Oh+Hl8cbPNNG5ui0Q+XqFrDedhIfmy2fm0fF3PSa/hFVoUHTUusfMLpAgT4TRk+XXsSW97H8ONaIdvd4BTI5iGHdpPO2Rua4JNXnHtfStc2qNleVFLpazgbm6v/gcPBS/e9InRLvverylZ9wzXtOMwj6QNVrSCFG874yVXbVz0PJDx0YPw+zpqmBApTcbBvNYyYFI1+fFdatX4BdnieN1u/NouDuDNrZ8W45ZfAgae2AAAQAElEQVQlNmvNavnczsXV2zGOFyAk8oH2gTYNb91UvJHlRh9e+MfEttMQzQbioRUXPmK3y2proDmjoqzoLyhh/wOr57glY2WdUHNzc2Vp5fEVZWvWg0Wqd64prvR5j8R78CI4CQGf+Hy+Q6pLV38KRIdHl42RgHAtZRzxtpw6KBvmX/n6KwSD8Viuz0p9kxTfgd+pU9Zc8PCkxDW3uvX6kPxg0C4ECIkUInShPS6YmIwPUKnREIe5g24X8Qb8/yVF129ZNvqhJW0+7qFl9MrtRVO4BgfLnj44BKzLNFHH86rKih+yZTrjrrWVlWXFY3XQR+Itsbxsuy0IUYnmub+h8HaqJW+XRLsltENhJt6mjJ6rr73o4VmgMDmw8i0r9bU1zsQ00VC/z5rRDy2w69tptT40CMJPuxEgJFKIqBXqZLyJD3DpUxwCZgHw30+Hx6vxb4oX9FuX/eWxX8GhVO8qKqosLToKJew/Y7QtZ4aEIOrwPX3Mp4u+WJeCqqpVO8FehOztV5ZVHoDC6ETZkEMbIsc64DMxtULz7VFZukqusNkG1m3CCUgDRLg2kpmKJ9+A0Zy1Fz70+5pRj1zIOD+eA/s5kfpbi8O3GBu69qJHCtZeMtW+d1WHhOpHtDMBQiIHzNTUZT7NOJuEn+GNIO+rIQ2K0ME1UcKUpssG8Il6RZ306+jHLS833YboFduLXq8oLdpb6OKsttJI4Iv5LdoWz6koLc6pLCv6V+2O4m2QVH6vQ63L1Iqyqj5Y9pjkayRQMELbLf7fGwWjiVbXESHaOYY6PPCzUT0uYywi3jw9ZWDV1vz50cXrRz18qKLDcPy0fRitfq3V32Q6mnr50HWjHj567ehHiyAJWK0fWTD8OHoaZyw2Xl5Yj8H0wa/8axe2zlcxxo7AnmSGsdgJD/j9wJ6/Py4iwjZNx/ZQbMD40546fUbR5Y9YGi2cQvTKHcXST/57co0Hl8vzVzy1cXheg8AearBBfRfVNM9Xbm9YhHe2HlICChJlIMdFvGj3eQo5poSJN1HKnVpVtnoJbnLcGBOiDUEVgnDLj4QCjaP65X8MQgcIGh+RqOkNkFqkIAGPfIe/Ts998d9dMzzsDKzZFbj9JKyf0SFtsf6tp//AGX+CMfc76yzOroiXJk+UpurXmE6kVKS1h/xXbhiqAbsYn9y/4se6H95XV6N6KXCfRWSY/HS5yx/4AH4ELvbSr3959APoUAxIz+6RcaBQxQkM2NF4zofixu741zXGATV4RUrRhvkDXqOl+CIuqdbqf4byjbauTWI/A9Izc7sMRDHwSP96HnAkvjHd8UYreIPzgut6SCEBr0FJ4PeP+On5VQj2GVcallaXrtsOQBpPooPz+ih1oHevPJ/KD1cYHIUvgnS4t5/ssWMop8F3bVzNUmHb8BugYXwrtsk/qor4TmjK192qKzamako7YY0OIUYNnFOQzZh6kgLK6fiAnowPZh6GnqblV9ss1DGUq4l+h6qH911MnV988aO/AUEQBEF0MDqUHmavV/6R69KlV0XlBDyz47FVPxDDNKP/19KZJp6uY/oW7GEvwt+fq0J8tfrSJ1YDQRAEQXRQOqQhZ8DswnSPq+JwtHFdiDauc1BB0B81A0rQzhDUGNgS56ICVXJyeef/uUFbuGrMdLtnDBAEQRCE4+jQI0H2fPmabm49/VRs9S/B6Cn45wb70AWDXzDv/wJX31o/xrlTMwmCIAjCbjrFUNIBL/7jSKaza5gCl6DqQI0+8tFUKMdJfoaxZ1kFn7d24tRUj40mCIIgiDal08xFGTC7YDhjyu348yxInOUM2APrx05+FQiCIAiiE9LuHElZZePYqd9xYP/lXBRLJULjAlciYsGr1uN/AIe5GO1gUzMJgiAIIn46jQAhHaCg4eE9EPCqEMKYs29hERWdCfEObpu78fLJDvdhQBAEQRDJo/MIECA9WE4u13T9NdQevBe6wl1Q09B6XCz0Cfb8hnFP0IBJgiAIolPTqQQIyZYrp6/hcmU5AT9FExYgtvCwXhfwVk5W968ctoomQRAEQbQ5nU6AkI1/A+uyGM0Sb6FQUBFurhD+MCQeTBcc3vcIZV7R6EIvEARBEEQnp/MJEMiO8Q9Vgc7m60IsiHMA5bdcsHc2XPFEGRAEQRAE0TkFCMmWkh6/MMHQlCFWy9XVwtd8D9E8CLET1Q9vKzWuL8h0QRAEQRB+VOisLFokelx49GbdJ3qguDAMbRsu/6LvAWdRgbXfGShvC6E/sXXitB1AEARBEIRBp9VASIypmEL/H4oLH3DBQzQQ0nwh42IdxueV9Ni5GQiCIAiCaKRTCxCSbWW5P4HGXkDR4UfBA2YMbszCqEHh4Q1Vh09g9FwdCIIgCIJopPOaMIKgKSPvtOEb6xm40V6xHwoN3YCxSrm6JgjX1NIJ038HgiAIgiDCIAEC2fXBEj3j3EM2CV0RCmMVQvBFDMSMHROeXgEEQRAEQTSj0yymRRAEQRCEfXT6MRAEQRAEQZiHBAiCIAiCIExDAgRBEARBEKYhAYIgCIIgCNOQAEEQBEEQhGlIgCAIgiAIwjQkQBAEQRAEYRoSIAiCIAiCMA0JEARBEARBmIYECIIgCIIgTEMCBEEQBEEQpiEBgiAIgiAI05AAQRAEQRCEaUiAIAiCIAjCNCRAEARBEARhGhIgCIIgCIIwDQkQBEEQBEGYhgQIgiAIgiBMQwIEQRAEQRCmcQHR6dj9het6CFC7Nm6or9+x9epna4EgCIIg4oQB0eHp/dw/clWVT2AC/iIY7MWAqVF2qxMg1oJgz+ucvVx25ROlYJK+sybOAgGnBeOCiT9AVy/aduXkYrCKANZ3dsF0zOy8kI0lDS7X2TvHPL4FbKDbM1flpLvSXsfrckBY0Uz8WsNdF1Re8fgusIE+MwqOUBQ2B88pM5798V41YLAMX9KvMfL21nFP/IpvrAAT9J0x4TxgypNgJ4Jfu/WKafMgCRj3wp0+F5/V/SOSKkGIv269YupPYJK8mRPvx2s4JnQbXtsV9b76UX9c/WxFrONi3i+T599z5k1Zbqh7DZ+vgyEh4nvuc2cXnK0K9hTWO0zDzEHcVjJ+6vPQCrHfB/7wtnHTHm/teHjmKndfd9pLeMBxYeUz8XTJuKn/AaLDQBqIDkzui//uqmjeyfjqXm4IDaxFibGL8cFg8CgKGw/lzSpYqCtwXdnYqesgTrBl684Y5AXjmF8eKPwu/KBcBlc/6wML9Jk14TTMdwzmmxFSkEhDyQRsIs2ddjJ+7E7ECoe/D4L1ylC0EysB/gc2gHcgTXCRxxiLS4AI3KsB+HcuMPEg3pMNbKa4fuu4ae/EK0gIxrqG3hM7QJmuKyQJ2aCjwPiJEGwk1ju0AczDRn8shqYEiO7PFfTDGv8ZGIu4BuLJloQHSaz7Zfb8da1ccbvSekGC90EIyPJwbW/82aIAwUD9RYoLkeXh+zgK38WXW3sX0z1pB+LhR+MBmeHHKxfhN+XZ0sseqWnp+DwlY6AA/US8f72a6i5qBWdfAdGhoDEQHZTsGTd0V30NH2EjdEUMjUNMjP3xA65wOAQShcEFea70s8ACsiekMHYXfsAzQrdjQ5KpafruYAfYW8LzvZyx5sK03KYAu0EKYuAA8DrshZ3Kt/JmT3yj+5yCbOig1GvwMt7l35olCDjbLxDET5oKY+V1C89GlDAmbBEKnUjJ2Mm/oXS5pHmKOLSvx7NPqxlwdkZUIVfAYNXbsF9rhwuXNgLfqV5hGxmsqwPVtPaIcDYkQHREsFHMZPp0bHH+BFZhoriWuz6FxPFgXndIgQZMkuZKvwR7okc0S8BWVFUUW7RnuWr6cdg9OiFWOvacDgavdzg4BNkrR6Hw/HQvmwFTCtKgA7Lryqm/Y4PzTvMU1h8FgjMhTgLP3OhmCQI+2Tp22mroqBjaKf4maix42HbBeuO2YS0dKoV23PGkGPl2x6fv5JaONwRyoZzX/FD40i5TIOEcyITRAZGNIvayzmERBgvcpqNt+T0O7GXB+feqR9E5Z7mMi2Nx19Nw72Nwty6B3V+37YUX7GC0pdyApoA74z2k14xrB2JjeRNLppCLumhllrg8UsMRikxTQFyO+35qdvyBiYp8iyVtDtsCYjCee18UoLpFqPL96QIu7NOVfV4CML2lnHXGNuBLPjd20eIoPMl+EduwAWfftJQnJBnBlDlMiMvw527Bbf7rwC5DjdCc1tToEml+woyGhL4GUpXOBZudvHsZP3gPi/GcVpg4pI5xpSyeHQVzfakA34Y/GzV18vqh7H0BnvnLsc4/YL4YHDNfEGf1feaqabEGXUvzBT4hB4cbS0U9mtLmA9HhIAGiA6Iq4kJ8gcPV/kJUoybgoq3jp30Usfsm/Pse/x6TPdq8TDYG957IOLwHNuH/cMFVfZ6/7r8lY6evbPUAbNjds1zX4689IYn0fX7CIDSHjAwrWoAmw1CTBgoRZ/Z5/h/DSuCJ7yEJYJnTto2f8nK0NP8AWPGMVN+HChL+3+Jq7GW/2pKgVzZuytcgB2HGIG/WxHn4qQ8TIPBjv3TbuCmjIYWUeOt+znOnf411OyN0e4hG6JMWM4hlmmLwRWmN+BKcwdtbx025FZJAibd2C14/OQA3zNSH8SP6PH99/xKYvDHqgYb5IvYgXybYUFDTBkGssSiqjho91iNMaANYj/dtKRAdDjJhdEDkxIVmGxlb6RMZX7d44MSpDdhwPLtt3NT9rYx2bwn8mPdmXL0nHrV73vMFx2BPZwwkGezdX4P16hO2kYm5xl84uzHBL4EUIGfDbKuWgwDFgmaJAvbqqmpDoSNy9bM+fAZmBwW6IIZGiBkaoRZnkPXxdDkYdzg6dJvMCxuzGfI5h46OMVBSzI80Y2A8FxWRUc0YLZovgqAZg6uotYoGCm24wzmRGjO8D5+XjJu6HYgOBwkQnQUhVDkaHFIIfkjOzOvKzmhpH2PAooB74p2pYBVjMB726kO3GeptzmbKP/k7/Ah2njSrQCrABk82fFEa00xsHpKqpUklwpX2ATZGzQYD4rbT8mZNOCz2gWiaEuI6CDF/+A+0bVxPu4Ax8Tmec1n4NnChGfO8aAKYYb6A2OaLxjzkGAdDWAjHP0BTHBq+lcwXHRkSIDoiEQ2NH3ZoujvtqZyXr+kGqUMOqLxHquVj7aD4Gv6GKlDrgz/jxD8Yj/UP3YYN8s/g8Xwr/4zfoWloTnEp6l8gReCHv1R+jKOk7A8dFDnOAbUQLzYbDAhSRc4ujXWcYZoCcWqUpNcdNpDPnplEMdjq9a7Da/Vj5HZ8lob3nHN9n2YHRJ99MRe/JxHXTBzsH+sQsVWw4+VAzYjNW3wuZRkQHRIaA9ERQXU3vsznN7eZs792bXBf2HVWwWIu2Dwm9He3jZ++qU0HlAk2RDq1gigDKnu8cMPuTNNuCvXHIAd+SqN8tIGEVvGPzteuC83TaKSYeDE4OC9vVsGLWO7wiHJHFaclnAAACxZJREFU47FPOqkRQsHGkn+N9kKDDu+lKXJKZ/hUzMCUzoeNGRsR4LN/UaRpyplTN0Vu3xcmxqVBYqDXbBkzfSeYQZoxZhWgGYOdFv6ss/6eBu1I/NnoDKvJfBGmmCjnjD+pgCIFnSZzkBzjIMc6ADQ5iIthvsCyvt5x6eRtQHRISAPRAanhLrTjQ6wBfx580U9SGExjirqx7+yJNX1nTfyq78wJ461MtWwNlEy+CzUHBKYhXpM3c8KwiB1Zmqbfijs09mxko44NwRyUb0rARhpH54dX4DfZWAVj/t8RvggEG9pV0UZBCsAG8IBmDo3w+mDX3Mwo/naH2SmdsaZuMsHecNrUTbyfp4AOv8Xzx3V1JlhBVxfjye8MLxdcgikXhG6LYb4oEmr69/jsfRBxvOyMnBNqxohmvpAmNyb4m0B0WEiA6IDIHrJP1S/DN3htHLvLaZtHo9V4BjaOZX1nFnyZ9/zEw8Am8OOzCD+UEYMSpQpauS10QGXfFyZIz3cXh+8mijlj08FOsEzDuVbz0fnvhPZmozVcfuHHmEbYpo6ler5w3X6Ms5uaJWDDwLjyC3Rw5JRODMpDt8W6F9GFQ+xJK+wFJ0zdbGu28Vr8BoSb4wyYOKzPrIImZ09RzBdScDDMSEyRM7fKwzMId0oVzXyBGp/fvGmu74DosJAA0UHZMWb6rzXp2hHYC3gJo954jvG7u2Z/Ai6+y5s58VE7HBVhzw+/Q+x+/MRsDi8LzszLFP7ePJYjOJMmjdBBb1487k5FEabX5GiJ3Ax2DH4Zj43YXB5opMKI1nDJaYTMV38cJBvUyEiTDt6Hf3o0ZQl+3Ps334l9728gOjZySic+x82mbTZz8hVDOESp4WuZB3RG5GwWxput24HXaW98poyOQozZF+UBwQGE6i7CoCgsNdQplTEgk51K5ovOBwkQHZiKi5/6Y9v4KZdpOtsTX/Z/YUteZIwpaIWA6+vr8zLZ/7U2XS4eto5/YjUX7MGIwXDSlHKLHFDZpyv8VbrODj0GP/rvbasR74OdyNH5rLnjqFgNjNFwRfhQkMcypkyINgrdKpjnHDQjibC/2RN5mq7/jh/lR3GHnCiHlTOF32d1jZF2BZ4jF/BU5MyYyCmd0YRD/9RNMbtTXKcYMM31GV6DiGmULJ0JcY785VHTpSCQH3FYUUBw8A9mFbA47GhDWDCcUjHpV0L6lwhNJ/NF54AGUXYCAitrPib/+j5zVQb3eI5QuDGd8vxYq3MGHBVdlTdrwpvbYNoPkCDC7XmeaQ2ocUBVZ7AMYENdCn8ApAfMsF4j2myFuA8mTmuAFyaCXfR54bp8LCfMFa8UqLCn9H7f9PS8aGVxDd5HNcqpoddI+heQfgZKAJLiWCoO6rgQN5SMndZ5FieSM2M0rxTywnw74M0YKWddbBXTVkf1KurgqZsonL69bdyU8yDJSC1Vnpour13Esw/HyDEjiqJJr7URQrXffNG4QRHvCw4TQs0cQadUTGjHCKHksbCuhthcL1jC3w3C2ZAGopMhXdCWXD5t0dbxU2/Cv30bPNBdaiewwY6yMiHrgb3tE8EG/L0YdrfhETOsCDY2dOCkBPd7btv4abZ/fBhXrpIOrcK2oWAgB5TGGrxmDDZtLmDtZvgZsEE7Yx6xmXMxKp5lmTsSsaZ0ytkWctaFFCKguVdRjo3ay51+DYYYZgx8fvfJYLo0XYyISGk0XwSp9zYsx2BV2OHSKRVoh0tNRJRZUl/vumJqi6uGEu0fEiA6ObsumVqJZo7HOLDzmzXuYHwkbPMbUTJuyiL84L/Q0j7YSKzUOZsMNhPNcVQiSD8DRqPVtnxd74H9S66Yapub8fZE1JkxIJUMMAa4UtDMqyju61/Zk1B09k2kPwe/CQj+IQWJiN0bzRdB/Eufs4Xhx4MLhfIJaAo5MnS7YTZiMK8zDlrtbJAA0UHJe+76IWacRtUKdRl+gNdDMsEPis75oyioxFqMyYufnwcCJhdb8Sjs3EjHUYkQ7PmCDeBX9llsBceH/snBr1HcEB+R1gB/huSTYecYD7uINaUTFUF7CyaubnZAxMyaTo3esBqvUbR1aI5uPiYownwRgAtY2HwcChyH/0W4zhebvTp8C0SHhwSIDoic2sZUPqNrvWtD3qwJN8Qz7TCD+Y7ED0dz73IK3ww2UnrlNCk83C+ieMvE8j/bVs3mgs1IOy/DBsZOZ1QS2fOVMyUgUYRYvPXyqbNC/2qEen2kLw9jdgGDe/s8f11y178Qols3KUQ4ELyPT4kIvyCBKZ2RZqaoM2s6K9J0idfo3Th2bWa+CFIH6k/4/K2D1iHzRSeBBlF2QOQ0Q+yVHWzMGAD2mKp5J+XNLFiESS8zF/tia5dtW2D0XB1eH6X2ru0zQOVsPKohr4XInoiAHVww2wfqcXfaK4rWcHHogMrAwMk7jIGTNtPCss7nlF4x5ZN48ugzq+AiJtirLMxLJtvbo2tn4c9nwGak3T5j9oRbmFDegtAlreUYDq5MR6HwzHiWtO5oSGdQebMKPmnmMySC9jF1U+zRd3bBOFOH6PCT5YXuuFiA7/jNckGsFvZqZr4IIp/JrrMKPsOfB8Q6OODR9UMyX3QOSAPR0ZDLGDNlQoRasgvGT5fTBeXAwL7VeZoxVRBDF2drsV29NdpUQdz+Wtm4qcvBZmTDxxRxO4T5WGAzt42bZvuSv4Y2BuTo8XBhuXHdizgxRvIzURyeR3IdS8nBrtjbntZsLQjBjkUB7BbojGDDhILf7OaLnYXhxeZrhtOnbuKzcyjey5lm/gRj1pdZj23GaCSW+SII52x+S9ce34ltgrmcslw6kWRIgOhg5Krpg/AzcDgkiHRBXS3Uu5LVk9g6ZtrXID+G0ubP4a/1HjEpKWVJR0MCwq6HbJDliH4zPfjASP7XI7fLcQlMazgdkgR3pT2A1+iL0G0BwWVCn9kTToDOSJTFziL4gbs9HwMRhjRjYNDSdYlpvgiCgv9yfE83xkrHF3hJydjJvwHRKSABooOBKvkVugJHYQP5UTxOoyLx+0WAlxo84pSkTn9DYWHr5U8sMGz+V0z5r5wNAnYTw3FU5LoX8SIXY4pif3dhY355sgYdGtMXFX4dllsWkbQbmlQeTcb6JU4n9iqd1oTDzkR0t9SNxDRfBCkZN3U7avQ+j5q3cT/4m2S+6DyQANEBKRs7dd22cVNPw0ZyAH5M75VrYsQhTNThW/+WLuAw6b0yKQ16G5M3a8Jh2MCf1izB4uh8YzGmKC6V8foel+dJGw5JomTs9JVCsP9E8YFwaCbT/5MafxSpRdeVeZEmJT/WhMPOQlS31MG0VswXjfsxNj/a0vJkvuh8dLoPT6fl9VFqj7p+fVw6P0RlvNGZEgexXge+avvYJ0up50AQBEHECwkQBEEQBEGYhkwYBEEQBEGYhgQIgiAIgiBMQwIEQRAEQRCmIQGCIAiCIAjTkABBEARBEIRpSIAgCIIgCMI0JEAQBEEQBGEaEiAIgiAIgjANCRAEQRAEQZiGBAiCIAiCIExDAgRBEARBEKYhAYIgCIIgCNOQAEEQBEEQhGlIgCAIgiAIwjQkQBAEQRAEYRoSIAiCIAiCMA0JEARBEARBmIYECIIgCIIgTEMCBEEQBEEQpiEBgiAIgiAI05AAQRAEQRCEaUiAIAiCIAjCNCRAEARBEARhGhIgCIIgCIIwDQkQBEEQBEGYhgQIgiAIgiBMQwIEQRAEQRCmIQGCIAiCIAjTkABBEARBEIRpSIAgCIIgCMI0JEAQBEEQBGEaEiAIgiAIgjDN/wMAAP//MO+aSAAAAAZJREFUAwCQK2cJbFpmDwAAAABJRU5ErkJggg==';
            logoImg.style.cssText = 'width: 150px !important; height: auto !important; display: block !important; pointer-events: none !important;';
            container.appendChild(logoImg);
    
            // 2. 스마트뷰 [ON/OFF] 토글 알약 버튼
            const pill = document.createElement('div');
            pill.id = 'gtp_layout_toggle_pill';
            pill.title = '클릭 시 스마트뷰와 순정 골프탑 뷰를 즉시 전환합니다.';
            pill.style.cssText = `
                display: inline-block !important;
                position: relative !important;
                width: 64px !important;
                height: 34px !important;
                padding: 0 !important;
                border-radius: 999px !important;
                cursor: pointer !important;
                box-shadow: 0 4px 10px -4px rgba(15, 23, 42, 0.25) !important;
                transition: background 0.2s ease, transform 0.15s ease !important;
                line-height: 0 !important;
                box-sizing: border-box !important;
            `;
            pill.addEventListener('mouseenter', () => { pill.style.opacity = '1'; pill.style.transform = 'scale(1.03)'; });
            pill.addEventListener('mouseleave', () => { pill.style.opacity = '0.9'; pill.style.transform = 'scale(1)'; });
            pill.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const current = document.body.classList.contains('gtp-smart-layout-active');
                const next = !current;
                setGolftopSmartLayoutEnabled(next);
                applyGolftopSmartLayout(next);
                if (next) {
                    const res = optimizeGolftopLayout() || {};
                    const count = res.buttonCount || 0;
                    showGolftopLayoutToast(`골프탑 스마트 레이아웃 적용됨 (구장 ${count}개 2줄 줄바꿈)`);
                } else {
                    showGolftopLayoutToast('골프탑 원래 순정 뷰 복원됨');
                }
            });
            container.appendChild(pill);
            document.body.appendChild(container);
        }
    
        const pill = document.getElementById('gtp_layout_toggle_pill');
        const zoomBar = document.getElementById('gtp_zoom_control_bar');
        if (pill) {
            // 팝업과 같은 토글 스위치 모양 (켜짐: 그라데이션 + 흰 원 안 초록 체크 / 꺼짐: 회색 + 흰 원)
            // 원(knob)은 한 번만 만들고 위치만 바꿔서, 켤 때/끌 때 원이 미끄러지듯 이동하게 한다
            let knobEl = pill.querySelector('.gtp-knob');
            if (!knobEl) {
                pill.innerHTML = '<span class="gtp-knob" style="position:absolute;top:3px;left:3px;width:28px;height:28px;border-radius:50%;background:#ffffff;'
                    + 'box-shadow:0 2px 6px rgba(15,23,42,0.25);display:flex;align-items:center;justify-content:center;transition:left 0.22s ease">'
                    + '<svg class="gtp-knob-check" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="transition:opacity 0.2s ease;opacity:0"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
                    + '</span>';
                knobEl = pill.querySelector('.gtp-knob');
            }
            const knob = (on) => {
                knobEl.style.left = on ? '33px' : '3px';
                const chk = knobEl.querySelector('.gtp-knob-check');
                if (chk) chk.style.opacity = on ? '1' : '0';
            };
            pill.setAttribute('aria-label', isEnabled ? '스마트뷰 켜짐' : '스마트뷰 꺼짐');
            if (isEnabled) {
                pill.style.background = 'linear-gradient(90deg, #10b981, #0ea5e9 60%, #3b82f6)';
                pill.style.border = 'none';
                knob(true);
                // 배율 바는 자리를 그대로 차지한 채 보이기/숨기기만 해서, 켜고 끌 때 토글 위치가 움직이지 않게 한다
                if (zoomBar) {
                    zoomBar.style.setProperty('display', 'inline-flex', 'important');
                    zoomBar.style.setProperty('visibility', 'visible', 'important');
                    zoomBar.style.setProperty('opacity', '1', 'important');
                    zoomBar.style.setProperty('pointer-events', 'auto', 'important');
                }
            } else {
                pill.style.background = '#e2e8f0';
                pill.style.border = 'none';
                knob(false);
                if (zoomBar) {
                    zoomBar.style.setProperty('display', 'inline-flex', 'important');
                    zoomBar.style.setProperty('visibility', 'hidden', 'important');
                    zoomBar.style.setProperty('opacity', '0', 'important');
                    zoomBar.style.setProperty('pointer-events', 'none', 'important');
                }
            }
        }
        updateGolftopZoomDisplay();
    }
    
    function safeRunOptimization() {
        if (__gtp_is_layout_updating) return;
        if (__gtp_layout_debounce_timer) clearTimeout(__gtp_layout_debounce_timer);
        
        __gtp_layout_debounce_timer = setTimeout(() => {
            if (!document.body.classList.contains('gtp-smart-layout-active')) return;
            __gtp_is_layout_updating = true;
            try {
                optimizeGolftopLayout();
            } catch (e) {
                console.warn("[골프탑 스마트 레이아웃 최적화 오류]:", e);
            } finally {
                // 자체 DOM 재배치로 발생한 변경 기록은 폐기 (무한 재실행/크기 반복 변동 차단)
                if (__gtp_smart_layout_observer) __gtp_smart_layout_observer.takeRecords();
                __gtp_is_layout_updating = false;
            }
        }, 250);
    }
    
    // ⚡ 성능: 하이라이트 동기화는 프레임당 1회 이하로 묶어서 실행 (변경마다 즉시 실행 시 getComputedStyle 폭주)
    let __gtp_highlight_sync_timer = null;
    let __gtp_highlight_sync_first_req = 0;
    function scheduleGolftopHighlightSync() {
        // ⚡ 성능: 대량 행 렌더링 중에는 계속 미루고(디바운스), 최대 1초마다 한 번만 실행
        const now = Date.now();
        if (!__gtp_highlight_sync_timer) __gtp_highlight_sync_first_req = now;
        else clearTimeout(__gtp_highlight_sync_timer);
        const waited = now - __gtp_highlight_sync_first_req;
        const delay = waited >= 1000 ? 0 : 200;
        __gtp_highlight_sync_timer = setTimeout(() => {
            __gtp_highlight_sync_timer = null;
            syncGolftopCourseButtonHighlights();
        }, delay);
    }
    
    // ⚡ 성능: 표 데이터만 바뀌었을 때는 우측 잔여타임 영역 높이만 가볍게 재계산
    let __gtp_right_refresh_timer = null;
    let __gtp_last_right_has_other = null;
    function isGolftopRightBoxStillStretched(box) {
        if (!box || !box.isConnected) return false;
        if (box.dataset.gtpRightStretched !== 'true' || !box.style.height) return false;
        const tbl = box.querySelector('table');
        if (tbl && tbl.dataset.gtpRightStretched !== 'true') return false;
        return true;
    }
    function scheduleGolftopRightColumnRefresh() {
        if (__gtp_right_refresh_timer) clearTimeout(__gtp_right_refresh_timer);
        __gtp_right_refresh_timer = setTimeout(() => {
            __gtp_right_refresh_timer = null;
            if (!document.body.classList.contains('gtp-smart-layout-active')) return;
            if (__gtp_is_layout_updating) return;
            // ⚡ 성능: 표 내용만 바뀌고 잔여타임 박스 구조/높이 설정이 그대로면 무거운 재배치(줌 해제→재적용) 생략
            try {
                const pnl = findRightTimePanels(__gtp_cached_row);
                if (pnl && pnl.mainBox) {
                    const hasOtherNow = !!(pnl.otherBox && pnl.otherBox !== pnl.mainBox && pnl.otherBox.offsetHeight > 0);
                    const sameShape = __gtp_last_right_has_other === hasOtherNow;
                    if (sameShape && isGolftopRightBoxStillStretched(pnl.mainBox) && (!hasOtherNow || isGolftopRightBoxStillStretched(pnl.otherBox))) {
                        syncGolftopCourseButtonHighlights();
                        return;
                    }
                    __gtp_last_right_has_other = hasOtherNow;
                }
            } catch (e) {}
            __gtp_is_layout_updating = true;
            try {
                if (__gtp_cached_row) optimizeGolftopRightColumn(__gtp_cached_row);
            } catch (e) {
                console.warn('[골프탑 스마트뷰] 우측 영역 갱신 오류:', e);
            } finally {
                if (__gtp_smart_layout_observer) __gtp_smart_layout_observer.takeRecords();
                __gtp_is_layout_updating = false;
            }
            syncGolftopCourseButtonHighlights();
        }, 400);
    }
    
    // 잔여타임 표 행/셀, 복사용 텍스트영역 등 레이아웃과 무관한 데이터 변경인지 판별
    function isGolftopDataOnlyMutation(m) {
        const t = m.target && m.target.nodeType === 1 ? m.target : (m.target ? m.target.parentElement : null);
        if (!t) return true;
        if (t.closest('textarea')) return true;
        const keyEls = [__gtp_cached_course_col, __gtp_cached_row, __gtp_cached_date_col, __gtp_cached_detail_col].filter(Boolean);
        // 레이아웃 핵심 컨테이너를 포함하는(상위) 요소의 변경은 레이아웃 변경으로 간주
        if (keyEls.some(k => t === k || t.contains(k))) return false;
        // 구장 선택 영역 내부 변경은 레이아웃 변경 (구장 목록 재렌더링)
        if (__gtp_cached_course_col && __gtp_cached_course_col.contains(t)) return false;
        // 독립된 데이터 표(레이아웃 컨테이너를 포함하지 않는 표) 내부 변경
        const tbl = t.closest('table');
        if (tbl && !keyEls.some(k => tbl.contains(k))) return true;
        // 추가/삭제된 노드가 전부 표 조각/텍스트이면 데이터 변경
        const nodes = [...m.addedNodes, ...m.removedNodes];
        if (nodes.length > 0 && nodes.every(n => n.nodeType === 3 || (n.nodeType === 1 && /^(TABLE|TBODY|THEAD|TR|TD|TH|BR|SPAN|FONT|B)$/.test(n.tagName)))) return true;
        return false;
    }
    
    function isGolftopSelfMutation(m) {
        const t = m.target && m.target.nodeType === 1 ? m.target : (m.target ? m.target.parentElement : null);
        if (!t) return true;
        if (t.closest && t.closest('#gtp_smart_course_wrapper, #gtp_smart_regions_grid, #gtp_layout_toast, #gtp_layout_toggle_pill, #gtp_status_panel, #gtp_smart_cal_box, #gtp_smart_filter_box')) return true;
        const nodes = [...m.addedNodes, ...m.removedNodes].filter(n => n.nodeType === 1);
        if (nodes.length > 0 && nodes.every(n => n.id === 'gtp_smart_course_wrapper' || n.id === 'gtp_smart_regions_grid' || n.id === 'gtp_layout_toast' ||
            n.id === 'gtp_smart_cal_box' || n.id === 'gtp_smart_filter_box' || n.classList.contains('gtp-smart-resv-container') ||
            n.classList.contains('gtp-smart-course-btn') || n.classList.contains('gtp-smart-col-course'))) return true;
        return false;
    }
    
    function applyGolftopSmartLayout(enabled) {
        if (!isTargetGolftopAllowedPage()) {
            document.body.classList.remove('gtp-smart-layout-active');
            restoreGolftopLayout();
            const existingPill = document.getElementById('gtp_layout_toggle_pill');
            if (existingPill) existingPill.remove();
            return;
        }
        injectGolftopSmartLayoutStyles();
        createOrUpdateGolftopTogglePill(enabled);
        ensureGolftopPinchZoomViewport(enabled);
        initGolftopTouchPinchZoom();
    
        if (!__gtp_resize_listener_attached) {
            __gtp_resize_listener_attached = true;
            window.addEventListener('resize', () => {
                if (!document.body || !document.body.classList.contains('gtp-smart-layout-active')) return;
                if (__gtp_is_pinching) return;
                // visualViewport scale check omitted to ensure split-screen always resizes
                // ★ 모바일 소프트 키보드 팝업 시에는 세로(height)만 변하고 가로(width)는 그대로이므로,
                //   가로 폭 변화가 없거나 입력창 포커스 중일 때는 zoom/레이아웃 재계산을 건너뛰어 키보드가 닫히지 않게 보호!
                const activeEl = document.activeElement;
                if (activeEl && /^(INPUT|TEXTAREA|SELECT)$/.test(activeEl.tagName)) return;
                const cw = document.documentElement.clientWidth || window.innerWidth || 0;
                if (Math.abs(cw - __gtp_last_client_width) < 4) return;
                __gtp_last_client_width = cw;
                collapseTopMiddleGap(__gtp_cached_row, null, __gtp_cached_resv_blocks);
                optimizeGolftopRightColumn(__gtp_cached_row);
                applyGolftopResponsiveScale(false);
            });
        }
    
        if (enabled) {
            document.body.classList.add('gtp-smart-layout-active');
            document.documentElement.classList.add('gtp-smart-html-active');
            document.documentElement.style.setProperty('overflow-y', 'auto', 'important');
            document.documentElement.style.setProperty('height', 'auto', 'important');
            document.body.style.setProperty('overflow-y', 'auto', 'important');
            document.body.style.setProperty('height', 'auto', 'important');
            document.body.style.setProperty('padding-bottom', '70px', 'important');
            __gtp_last_client_width = document.documentElement.clientWidth || window.innerWidth || 0;
            applyGolftopResponsiveScale(false);
            safeRunOptimization();
    
            // DOM 변화 감지 (원본 구장 버튼 class/style 변화 및 잔여타임 테이블 갱신 시 구장 불 들어오기 즉시 동기화)
            if (!__gtp_smart_layout_observer) {
                __gtp_smart_layout_observer = new MutationObserver((mutations) => {
                    if (__gtp_is_layout_updating) return;
                    if (!document.body.classList.contains('gtp-smart-layout-active')) return;
    
                    // 원본 구장 버튼의 class/style 속성 변경이나 잔여타임 테이블 변경 시 하이라이트 즉시 동기화
                    const hasExternalChange = mutations.some(m => {
                        const t = m.target && m.target.nodeType === 1 ? m.target : (m.target ? m.target.parentElement : null);
                        if (!t) return false;
                        if (t.closest && t.closest('#gtp_smart_regions_grid, #gtp_layout_toast, #gtp_layout_toggle_pill, textarea')) return false;
                        return true;
                    });
                    if (hasExternalChange) {
                        scheduleGolftopHighlightSync();
                    }
    
                    const childListMutations = mutations.filter(m => m.type === 'childList');
                    if (childListMutations.length === 0 || childListMutations.every(isGolftopSelfMutation)) return;
                    // ★ 잔여타임 표/복사 텍스트 영역 등 '데이터만' 바뀐 경우 전체 레이아웃 재구성 생략 (기간 길게 조회/복사 시 버벅임 방지)
                    const layoutMutations = childListMutations.filter(m => !isGolftopSelfMutation(m) && !isGolftopDataOnlyMutation(m));
                    if (layoutMutations.length === 0) {
                        scheduleGolftopRightColumnRefresh();
                        return;
                    }
                    safeRunOptimization();
                });
                __gtp_smart_layout_observer.observe(document.body, {
                    childList: true,
                    subtree: true,
                    attributes: true,
                    attributeFilter: ['class', 'style']
                });
            }
        } else {
            document.body.classList.remove('gtp-smart-layout-active');
            restoreGolftopLayout();
    
            if (__gtp_smart_layout_observer) {
                __gtp_smart_layout_observer.disconnect();
                __gtp_smart_layout_observer = null;
            }
        }
    }
    
    // 스토리지 변경 이벤트 실시간 감청 (사이드패널 체크박스 <-> 본문 플로팅 버튼 동기화)
    try {
        chrome.storage.onChanged.addListener((changes, area) => {
            if (area === 'local') {
                if (changes[GTP_ONLY_MAIN_STORAGE_KEY]) {
                    const onlyMainVal = !!changes[GTP_ONLY_MAIN_STORAGE_KEY].newValue;
                    try { localStorage.setItem(GTP_ONLY_MAIN_STORAGE_KEY, String(onlyMainVal)); } catch(e) {}
                    isGolftopSmartLayoutEnabled().then(enabled => {
                        applyGolftopSmartLayout(enabled);
                    });
                }
                if (changes[GTP_LAYOUT_STORAGE_KEY]) {
                    const nextVal = !!changes[GTP_LAYOUT_STORAGE_KEY].newValue;
                    applyGolftopSmartLayout(nextVal);
                }
            }
        });
    } catch (e) {}
    
    // 초기 로딩 시 레이아웃 매니저 자동 가동
    (async function initGolftopSmartLayout() {
        try {
            const enabled = await isGolftopSmartLayoutEnabled();
            const runInit = () => {
                applyGolftopSmartLayout(enabled);
                // 늦게 렌더링되는 SPA/Vue 프레임워크 대응
                setTimeout(() => { if (document.body.classList.contains('gtp-smart-layout-active')) optimizeGolftopLayout(); }, 400);
                setTimeout(() => { if (document.body.classList.contains('gtp-smart-layout-active')) optimizeGolftopLayout(); }, 1000);
                setTimeout(() => { if (document.body.classList.contains('gtp-smart-layout-active')) optimizeGolftopLayout(); }, 2000);
            };
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', runInit);
            } else {
                runInit();
            }
        } catch (e) {
            console.warn("[골프탑 스마트 레이아웃] 초기화 중 예외:", e);
        }
    })();
    

    // ===================== 원본 스마트뷰 끝 =====================

    // 3) 골프탑 자동등록 중에는 레이아웃을 끄고 버튼도 숨김 (자동등록이 버튼 위치를 잘못 잡는 것 방지)
    let __t82RegRunning = false;
    let __t82Off = false; // 오토매티 설정에서 꺼 둔 상태
    const __origApply = applyGolftopSmartLayout;
    applyGolftopSmartLayout = function (enabled) { return __origApply((__t82RegRunning || __t82Off) ? false : enabled); };
    const __setFloatVisible = (visible) => {
        // 카드는 원래 'display:flex !important' (세로·가운데 정렬). 다시 보일 때 그대로 되돌려야 토글이 가운데에 옴
        try { const w = document.getElementById('gtp_smartview_float_wrap'); if (w) w.style.setProperty('display', visible ? 'flex' : 'none', 'important'); } catch (e) {}
    };
    const __onRunning = async (running) => {
        __t82RegRunning = !!running;
        try {
            if (__t82RegRunning) { __origApply(false); __setFloatVisible(false); }
            else if (!__t82Off) { __setFloatVisible(true); const en = await isGolftopSmartLayoutEnabled(); __origApply(en); }
        } catch (e) {}
    };
    // 자동등록 진행 여부: 골프탑 자동등록 스크립트(golftop_content.js)가 실행 중에만 <html data-tee82-active="true"> 를 붙임.
    //   (chrome.storage 의 golftop_isRegistrationRunning 은 비정상 종료 시 true 로 남아 스마트뷰가 계속 숨겨지는 문제가 있어 쓰지 않음)
    const __isAutoActive = () => {
        try {
            const d = (window.top && window.top !== window && window.top.document) ? window.top.document : document;
            return d.documentElement.getAttribute('data-tee82-active') === 'true';
        } catch (e) {
            return document.documentElement.getAttribute('data-tee82-active') === 'true';
        }
    };
    let __lastActive = false;
    const __tick = () => { const a = __isAutoActive(); if (a !== __lastActive) { __lastActive = a; __onRunning(a); } };
    setInterval(__tick, 1000);
    __tick();
    try {
        chrome.storage.onChanged.addListener((ch, area) => {
            if (area !== 'local') return;
            if (!ch.v2_smartviewEnabled) return;
            if (ch.v2_smartviewEnabled.newValue !== true) {
                // 오토매티에서 스마트뷰를 끄면 바로 원래 화면으로
                __t82Off = true;
                try { __origApply(false); } catch (e) {}
                __setFloatVisible(false);
            } else {
                // 다시 켜면 새로고침 없이 그 자리에서 되살림 (골프탑 자동등록 중이면 끝난 뒤 자동으로 나타남)
                __t82Off = false;
                if (!__t82RegRunning) {
                    __setFloatVisible(true);
                    isGolftopSmartLayoutEnabled().then(en => { try { __origApply(en); } catch (e) {} });
                }
            }
        });
    } catch (e) {}
})();
