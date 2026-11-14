const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const workspaceDir = __dirname;
const brainDir = 'C:\\Users\\yebba\\.gemini\\antigravity\\brain\\212cc417-7034-458d-99b0-79d7093c18c4';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const tempUserDataDir = path.join(workspaceDir, 'chrome-temp-preview');

const sidepanelHtml = fs.readFileSync(path.join(workspaceDir, 'sidepanel.html'), 'utf8');

function capture(htmlContent, outFilename, width, height) {
    const tempHtmlPath = path.join(workspaceDir, 'temp_' + outFilename + '.html');
    fs.writeFileSync(tempHtmlPath, htmlContent, 'utf8');

    const outPath = path.join(brainDir, outFilename);
    const args = [
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        `--user-data-dir=${tempUserDataDir}`,
        `--window-size=${width},${height}`,
        `--screenshot=${outPath}`,
        `file:///${tempHtmlPath.replace(/\\/g, '/')}`
    ];

    try {
        execFileSync(chromePath, args, { stdio: 'inherit' });
        console.log(`Generated: ${outFilename}`);
    } catch (e) {
        console.error(`Error generating ${outFilename}:`, e);
    } finally {
        if (fs.existsSync(tempHtmlPath)) {
            fs.unlinkSync(tempHtmlPath);
        }
    }
}

// 1. Preview: Login screen with AnyDesk Remote Support
const html1 = sidepanelHtml.replace('<script src="popup.js"></script>', '')
    + `<style>
        * { animation: none !important; transition: none !important; }
        .app-wrapper { display: none !important; }
        #authOverlay { display: flex !important; opacity: 1 !important; background: #0A111D !important; }
    </style>
    <script>
        document.getElementById('authInputId').value = 'admin';
        document.getElementById('authInputPw').value = '••••••••';
    </script>`;
capture(html1, 'preview_login_support.png', 450, 720);

// 2. Preview: Main screen with remote support banner above footer and referral button in header
const html2 = sidepanelHtml.replace('<script src="popup.js"></script>', '')
    + `<style>
        * { animation: none !important; transition: none !important; }
        #authOverlay { display: none !important; }
    </style>
    <script>
        const cardList = document.getElementById('cardList');
        if (cardList) {
            cardList.innerHTML = \`
                <div class="teetime-card" style="margin: 4px 6px; padding: 7px 10px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 6px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
                        <span style="font-size: 11px; font-weight: 800; color: #1E293B;">⛳ 클럽모우CC (단독 2부)</span>
                        <span style="font-size: 10px; color: #059669; font-weight: 700;">11/15 (금) 12:44</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 10.5px; color: #DC2626; font-weight: 700;">120,000원 <span style="font-size: 9px; color: #64748B;">(카포포함)</span></span>
                        <span style="font-size: 9px; background: #EFF6FF; color: #2563EB; padding: 1px 5px; border-radius: 3px; font-weight: 600;">조인/양도</span>
                    </div>
                </div>
                <div class="teetime-card" style="margin: 4px 6px; padding: 7px 10px; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 6px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;">
                        <span style="font-size: 11px; font-weight: 800; color: #1E293B;">⛳ 세라지오CC (단독 1부)</span>
                        <span style="font-size: 10px; color: #059669; font-weight: 700;">11/15 (금) 07:12</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 10.5px; color: #DC2626; font-weight: 700;">105,000원</span>
                        <span style="font-size: 9px; background: #EFF6FF; color: #2563EB; padding: 1px 5px; border-radius: 3px; font-weight: 600;">선티지정</span>
                    </div>
                </div>
            \`;
        }
    </script>`;
capture(html2, 'preview_main_footer_remote.png', 485, 780);

// 3. Preview: Register Modal with Referral Code input field
const html3 = sidepanelHtml.replace('<script src="popup.js"></script>', '')
    + `<style>
        * { animation: none !important; transition: none !important; }
        .app-wrapper { display: none !important; }
        #authRegisterModal { display: flex !important; opacity: 1 !important; background: #0A111D !important; }
    </style>
    <script>
        document.getElementById('inputRegisterId').value = 'daljkdlad';
        document.getElementById('inputRegisterPw').value = '••••';
        document.getElementById('inputRegisterPwConfirm').value = '••••';
        document.getElementById('inputRegisterName').value = '황사루랑';
        document.getElementById('inputRegisterPhone').value = '010-1234-5678';
        document.getElementById('inputRegisterReferral').value = 'golfking88';
    </script>`;
capture(html3, 'preview_register_referral.png', 450, 720);

// 4. Preview: Referral Share & Promo Modal
const html4 = sidepanelHtml.replace('<script src="popup.js"></script>', '')
    + `<style>
        * { animation: none !important; transition: none !important; }
        .app-wrapper { display: none !important; }
        #referralPromoModal { display: flex !important; opacity: 1 !important; background: #0A111D !important; }
    </style>
    <script>
        document.getElementById('referralMyCode').value = 'admin';
        document.getElementById('referralShareText').value = 
\`[AutomaTee] 골프 매니저 업무 10초 컷 솔루션!
골프몬·골팡·골마켓·골프락·골프랜드·골프탑 6개사 동시 등록!

가입 시 추천인 코드 [admin] 을 입력하시면
추천인과 가입자 모두에게 +15일 무료 연장 혜택을 드립니다 🎁

다운로드: https://automatee.netlify.app\`;
    </script>`;
capture(html4, 'preview_referral_promo_modal.png', 450, 680);

// 5. Preview: Lab Settings Panel with the new 2 experimental features
const html5 = sidepanelHtml.replace('<script src="popup.js"></script>', '')
    + `<style>
        * { animation: none !important; transition: none !important; }
        #authOverlay { display: none !important; }
        .tab-panel { display: none !important; }
        #tabSettings { display: block !important; }
        #rowLabMode { display: flex !important; }
        #labSettingsPanel { display: block !important; }
    </style>
    <script>
        document.getElementById('chkLabMode').checked = true;
        document.getElementById('chkOpenSoldOutFeature').checked = false;
        document.getElementById('chkOpenBumpTimerFeature').checked = false;
    </script>`;
capture(html5, 'preview_lab_settings.png', 485, 900);

