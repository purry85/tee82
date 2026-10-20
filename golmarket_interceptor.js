/**
 * Tee82 Golmarket Native Dialog Auto-Pass Interceptor
 * Chrome MV3 Main-World Content Script (run_at: document_start)
 * 
 * 골마켓의 "등록하시겠습니까?" (confirm) -> 100% 자동 확인(true) 통과
 * 골마켓의 "등록되었습니다" (alert) -> 블로킹 없이 자동 통과 및 다음 건 진행
 */

(function() {
    function installInterceptor(w) {
        if (!w) return;

        try {
            // 1. window.confirm 가로채기 -> "등록하시겠습니까?" 무조건 true(확인) 반환
            w.confirm = function(msg) {
                console.log("[Tee82 Main-World Confirm Auto-OK]:", msg);
                return true;
            };

            // 2. window.alert 가로채기 -> "등록되었습니다" 블로킹 없이 통과 & 메시지 전송
            w.alert = function(msg) {
                console.log("[Tee82 Main-World Alert Auto-Closed]:", msg);
                try {
                    w.postMessage({ type: 'TEE82_GOLMARKET_ALERT', text: String(msg) }, '*');
                } catch(e) {}
                return undefined;
            };

            // 3. window.prompt 가로채기
            w.prompt = function(msg, def) {
                return def || '';
            };

            // 4. Object.defineProperty로 페이지 내부 다른 스크립트의 덮어쓰기 원천 차단
            try {
                Object.defineProperty(w, 'confirm', {
                    configurable: true,
                    enumerable: true,
                    get: function() {
                        return function(msg) {
                            console.log("[Tee82 Confirm Intercepted]:", msg);
                            return true;
                        };
                    },
                    set: function() {}
                });

                Object.defineProperty(w, 'alert', {
                    configurable: true,
                    enumerable: true,
                    get: function() {
                        return function(msg) {
                            console.log("[Tee82 Alert Intercepted]:", msg);
                            try {
                                w.postMessage({ type: 'TEE82_GOLMARKET_ALERT', text: String(msg) }, '*');
                            } catch(e) {}
                            return undefined;
                        };
                    },
                    set: function() {}
                });
            } catch(e) {}
        } catch(e) {}
    }

    // 즉시 실행
    installInterceptor(window);

    // DOM 로드 및 페이지 로드 시점 재보장
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => installInterceptor(window));
    }
    window.addEventListener('load', () => installInterceptor(window));
})();
