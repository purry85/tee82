# ⛳ GolfTee82 구글 스프레드시트 회원제 인증 서버 구축 가이드

구글 스프레드시트를 회원 관리 데이터베이스로 사용하여, **회원별 아이디/비밀번호/만료일자**를 부여하고 실시간으로 관리(연장/차단)할 수 있는 무료 인증 서버 구축 방법입니다. (서버 비용 0원, 3분 완성)

---

## 1. 구글 스프레드시트 생성 및 열 구성

1. [Google Drive](https://drive.google.com/)에 접속하여 **새로 만들기 → Google 스프레드시트**를 생성합니다.
2. 스프레드시트 제목을 `GolfTee82 회원관리`로 변경합니다.
3. 첫 번째 행(1행)에 아래와 같이 헤더를 입력합니다:

| A열 (아이디) | B열 (비밀번호) | C열 (만료일자) | D열 (상태) | E열 (이름/메모) | F열 (최근접속일시) | G열 (부여기능) |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **아이디** | **비밀번호** | **만료일자** | **상태** | **이름** | **최근접속일시** | **부여기능** |
| admin | Hyunkyu12! | 2099-12-31 | 활성 | 최고관리자 | (자동기록) | 전체 |
| user1 | 1234 | 2026-12-31 | 활성 | 홍길동 | (자동기록) | 속도해제, 전체리셋 |
| user2 | 5678 | 2026-10-31 | 활성 | 김철수 | (자동기록) | (빈칸: 일반회원) |
| user3 | 9999 | 2026-12-31 | 활성 | 이영희 | (자동기록) | 변동수정 |
| test | 0000 | 2026-10-20 | 활성 | 만료테스트 | (자동기록) | |

> 💡 **참고사항:**
> - **만료일자**: `YYYY-MM-DD` 형식 (예: `2026-12-31`)으로 입력합니다. 해당 날짜 밤 23:59:59까지 사용 가능합니다.
> - **상태**: `활성`으로 적어두면 정상 사용되며, 회원을 정지시키고 싶을 때 `차단` 또는 `중지`로 변경하면 즉시 로그아웃 및 차단됩니다.
> - **최근접속일시**: 회원이 GolfTee82를 실행하여 인증할 때마다 현재 한국시간이 자동으로 기록됩니다.
> - **⭐️ G열 (부여기능 - 맞춤형 권한 부여)**:
>   - **빈칸(기본값)**: 일반 회원 (기본 매크로 기능만 사용 가능하며, **`[🧪 실험실]` 메뉴 자체가 아예 보이지 않습니다.**)
>   - **`속도해제`** (또는 `속도`): 설정 탭의 `⚡ 빠른 손`, `🚀 초고속` 등록 속도 옵션이 기본 활성화됩니다.
>   - **`전체리셋`** (또는 `리셋`): 메인 화면에 `🔄 골프몬 전체리셋(내용유지 수정)` 바가 기본 노출됩니다.
>   - **`변동수정`** (또는 `수정`): 메인 화면에 `📉 변동수정` 및 `🔄 교체수정` 버튼이 기본 노출됩니다.
>   - **`f12`** (또는 `개발자`, `디버그`, `검사`): F12 키(개발자 도구), 우클릭, 바로가기 단축키(Ctrl+Shift+I 등) 차단이 완전히 해제됩니다.
>   - **`전체`** (또는 `관리자`): 모든 실험실 기능 상시 활성화 + 관리자 권한 부여 (`[🧪 실험실]` 설정 메뉴 제어 가능).
>   - 여러 기능을 함께 주려면 쉼표(`,`)로 적어주시면 됩니다. (예: `속도해제, 전체리셋, f12`)

---

## 2. Google Apps Script 코드 등록

1. 구글 스프레드시트 상단 메뉴에서 **확장 프로그램 → Apps Script**를 클릭합니다.
2. 기존 편집기에 있는 내용을 모두 지우고, **아래 코드를 전체 복사하여 붙여넣습니다**:

```javascript
/**
 * GolfTee82 구글 스프레드시트 회원 인증 웹 앱 스크립트
 */

function doGet(e) {
  return handleAuth(e);
}

function doPost(e) {
  return handleAuth(e);
}

function handleAuth(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    let postData = {};
    if (e && e.postData && e.postData.contents) {
      try {
        postData = JSON.parse(e.postData.contents);
      } catch(err) {}
    }
    const data = Object.assign({}, params, postData);
    const action = data.action || params.action || 'verify';
    const id = (data.id || params.id || '').trim();
    const pw = (data.password || data.pw || params.password || params.pw || '').trim();
    const newPw = (data.newPassword || data.newPw || params.newPassword || params.newPw || '').trim();

    // 1. 연결 테스트 핑
    if (action === 'ping') {
      return createJsonResponse({ success: true, message: 'pong' });
    }

    // ====================================================
    // 2. 전체 사용자 공지 실시간 상호 동기화 (action: 'sync_notices')
    // A가 등록한 공지 업로드 + B가 등록한 공지 다운로드 취합
    // ====================================================
    if (action === 'sync_notices' || action === 'get_notices') {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const noticeSheet = ss.getSheetByName('공지목록') || ss.insertSheet('공지목록');
      
      // 헤더 설정 (최초 생성 시)
      if (noticeSheet.getLastRow() === 0) {
        noticeSheet.appendRow(['구장명', '날짜', '시간', '시작분', '종료분', '캐디구분', '금액', '할인', '규칙유형', '원문전문', '등록자', '수신일시', '타임스탬프', '업데이트일시']);
        noticeSheet.getRange(1, 1, 1, 14).setBackground('#E8F5E9').setFontWeight('bold');
      }

      // 기존 시트의 공지들 읽기
      const existingData = noticeSheet.getDataRange().getValues();
      const serverRules = [];
      for (let i = 1; i < existingData.length; i++) {
        const row = existingData[i];
        if (!row[0]) continue;
        serverRules.push({
          course: String(row[0]),
          date: String(row[1] || ''),
          timeText: String(row[2] || ''),
          startMins: Number(row[3]) || 0,
          endMins: Number(row[4]) || 1440,
          caddyType: row[5] ? String(row[5]) : null,
          price: (row[6] !== '' && row[6] !== null && !isNaN(row[6])) ? Number(row[6]) : null,
          discount: (row[7] !== '' && row[7] !== null && !isNaN(row[7])) ? Number(row[7]) : null,
          type: String(row[8] || 'target'),
          fullNoticeText: String(row[9] || ''),
          registeredBy: String(row[10] || ''),
          receivedAt: String(row[11] || ''),
          receivedTimestamp: Number(row[12]) || 0,
          updatedAt: String(row[13] || '')
        });
      }

      // 클라이언트가 업로드한 규칙들
      const incomingRules = Array.isArray(data.rules) ? data.rules : [];
      const uploader = (data.userId || data.userName || data.id || '사용자').trim();
      const nowStr = Utilities.formatDate(new Date(), "GMT+9", "yyyy-MM-dd HH:mm:ss");

      // 병합 로직 (동일 구장, 동일 날짜, 시간대 겹침/동일 규칙 시 최신 타임스탬프가 우선)
      incomingRules.forEach(inRule => {
        if (!inRule.course) return;
        const inCourse = inRule.course.trim();
        const inDate = (inRule.date || '').trim();
        const inStart = Number(inRule.startMins) || 0;
        const inEnd = Number(inRule.endMins) || 1440;
        const inCaddy = inRule.caddyType || null;
        const inTs = Number(inRule.receivedTimestamp) || Date.now();

        const existingIdx = serverRules.findIndex(sr => {
          if (sr.course !== inCourse) return false;
          if ((sr.date || '') !== inDate) return false;
          const isOverlap = !(sr.endMins < inStart || sr.startMins > inEnd);
          if (isOverlap) {
            if (!sr.caddyType || !inCaddy || sr.caddyType === inCaddy) return true;
          }
          return false;
        });

        const mergedObj = {
          course: inCourse,
          date: inDate,
          timeText: inRule.timeText || '',
          startMins: inStart,
          endMins: inEnd,
          caddyType: inCaddy,
          price: (inRule.price !== undefined && inRule.price !== null) ? inRule.price : null,
          discount: (inRule.discount !== undefined && inRule.discount !== null) ? inRule.discount : null,
          type: inRule.type || 'target',
          fullNoticeText: inRule.fullNoticeText || '',
          registeredBy: uploader,
          receivedAt: inRule.receivedAt || '',
          receivedTimestamp: inTs,
          updatedAt: nowStr
        };

        if (existingIdx >= 0) {
          if (inTs >= (serverRules[existingIdx].receivedTimestamp || 0)) {
            serverRules[existingIdx] = mergedObj;
          }
        } else {
          serverRules.push(mergedObj);
        }
      });

      // 최신 등록순(타임스탬프 내림차순 LIFO) 정렬
      serverRules.sort((a, b) => (b.receivedTimestamp || 0) - (a.receivedTimestamp || 0));

      // 시트에 전체 데이터 다시 쓰기 (새 규칙이 업로드되었을 때)
      if (incomingRules.length > 0) {
        noticeSheet.clearContents();
        noticeSheet.appendRow(['구장명', '날짜', '시간', '시작분', '종료분', '캐디구분', '금액', '할인', '규칙유형', '원문전문', '등록자', '수신일시', '타임스탬프', '업데이트일시']);
        noticeSheet.getRange(1, 1, 1, 14).setBackground('#E8F5E9').setFontWeight('bold');

        const rowsToWrite = serverRules.map(r => [
          r.course, r.date, r.timeText, r.startMins, r.endMins, r.caddyType || '',
          r.price !== null ? r.price : '', r.discount !== null ? r.discount : '',
          r.type, r.fullNoticeText || '', r.registeredBy || '', r.receivedAt || '',
          r.receivedTimestamp || 0, r.updatedAt || ''
        ]);
        if (rowsToWrite.length > 0) {
          noticeSheet.getRange(2, 1, rowsToWrite.length, 14).setValues(rowsToWrite);
        }
      }

      return createJsonResponse({
        success: true,
        message: '공지 동기화 완료',
        rules: serverRules,
        count: serverRules.length,
        syncedAt: nowStr
      });
    }

    if (!id || !pw) {
      return createJsonResponse({ success: false, message: '아이디와 비밀번호를 모두 입력해주세요.' });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('회원목록') || ss.getSheets()[0];
    const rows = sheet.getDataRange().getValues();
    const displayRows = sheet.getDataRange().getDisplayValues();

    // 2. 비밀번호 변경 요청 처리 (사용자가 직접 비밀번호 수정 시 자동 업데이트)
    if (action === 'changePassword' || action === 'updatePassword') {
      if (!newPw) {
        return createJsonResponse({ success: false, message: '새 비밀번호를 입력해주세요.' });
      }
      if (pw === newPw) {
        return createJsonResponse({ success: false, message: '새 비밀번호가 현재 비밀번호와 동일합니다.' });
      }

      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const rowId = String(row[0] || '').trim();
        const rowPw = String(row[1] || '').trim();
        const rowStatus = String(row[3] || '활성').trim();

        if (rowId === id) {
          if (rowPw !== pw) {
            return createJsonResponse({ success: false, message: '현재 비밀번호가 일치하지 않습니다.' });
          }
          if (rowStatus === '차단' || rowStatus === '중지' || rowStatus === '비활성') {
            return createJsonResponse({ success: false, message: '관리자에 의해 정지된 계정은 비밀번호를 변경할 수 없습니다.' });
          }

          // B열(비밀번호) 즉시 업데이트
          sheet.getRange(i + 1, 2).setValue(newPw);

          // F열(최근접속일시)에 변경 로그 기록
          try {
            const now = new Date();
            const nowStr = Utilities.formatDate(now, "GMT+9", "yyyy-MM-dd HH:mm:ss");
            sheet.getRange(i + 1, 6).setValue(nowStr + ' (PW변경)');
          } catch(err) {}

          SpreadsheetApp.flush(); // 즉시 구글 스프레드시트에 영구 저장 강제

          return createJsonResponse({
            success: true,
            action: 'changePassword',
            message: '비밀번호가 성공적으로 변경되었습니다.'
          });
        }
      }
      return createJsonResponse({ success: false, message: '등록되지 않은 아이디입니다.' });
    }

    // 3. 2행부터 회원 검색 (로그인 인증 verify)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const rowId = String(row[0] || '').trim();
      const rowPw = String(row[1] || '').trim();
      let rawExpire = row[2];
      const displayExpire = displayRows[i] ? displayRows[i][2] : '';
      const rowStatus = String(row[3] || '활성').trim();
      const rowName = String(row[4] || '').trim();
      const rowFeatures = String(row[6] || '').trim(); // G열 (부여기능)

      if (rowId === id) {
        // 1. 비밀번호 확인
        if (rowPw !== pw) {
          return createJsonResponse({ success: false, message: '비밀번호가 일치하지 않습니다.' });
        }

        // 2. 계정 상태 확인
        if (rowStatus === '차단' || rowStatus === '중지' || rowStatus === '비활성') {
          return createJsonResponse({ success: false, message: '관리자에 의해 사용이 정지된 계정입니다.' });
        }

        // 3. 만료일자 확인 (Date 객체, 텍스트, 표시값 모두 안전 지원)
        let expDate = null;

        if (rawExpire && typeof rawExpire.getTime === 'function' && !isNaN(rawExpire.getTime())) {
          expDate = new Date(rawExpire.getTime());
        } else if (rawExpire instanceof Date && !isNaN(rawExpire.getTime())) {
          expDate = new Date(rawExpire.getTime());
        } else {
          const dateStr = String(displayExpire || rawExpire || '').trim();
          const numbers = dateStr.match(/\d+/g);
          if (numbers && numbers.length >= 3) {
            const y = parseInt(numbers[0], 10);
            const m = parseInt(numbers[1], 10) - 1;
            const d = parseInt(numbers[2], 10);
            expDate = new Date(y, m, d);
          } else if (dateStr.length === 8 && /^\d{8}$/.test(dateStr)) {
            const y = parseInt(dateStr.substring(0, 4), 10);
            const m = parseInt(dateStr.substring(4, 6), 10) - 1;
            const d = parseInt(dateStr.substring(6, 8), 10);
            expDate = new Date(y, m, d);
          } else {
            const parsed = new Date(dateStr);
            if (!isNaN(parsed.getTime())) {
              expDate = parsed;
            }
          }
        }

        if (!expDate || isNaN(expDate.getTime())) {
          return createJsonResponse({ success: false, message: '만료일자 형식이 올바르지 않습니다. (YYYY-MM-DD)' });
        }

        // 해당 날짜 23:59:59까지 유효
        expDate.setHours(23, 59, 59, 999);
        const now = new Date();
        const diffMs = expDate.getTime() - now.getTime();
        const daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        if (diffMs < 0) {
          const expStr = Utilities.formatDate(expDate, "GMT+9", "yyyy-MM-dd");
          return createJsonResponse({ 
            success: false, 
            isExpired: true, 
            expireDate: expStr,
            message: '사용 기간이 만료되었습니다. (' + expStr + ' 만료)' 
          });
        }

        // 4. 접속 시간 자동 기록 (F열)
        try {
          const nowStr = Utilities.formatDate(now, "GMT+9", "yyyy-MM-dd HH:mm:ss");
          sheet.getRange(i + 1, 6).setValue(nowStr);
        } catch(err) {}

        const expStr = Utilities.formatDate(expDate, "GMT+9", "yyyy-MM-dd");
        return createJsonResponse({
          success: true,
          id: id,
          name: rowName || id,
          expireDate: expStr,
          daysLeft: daysLeft,
          features: rowFeatures,
          message: '인증 성공! ' + daysLeft + '일 남았습니다.'
        });
      }
    }

    return createJsonResponse({ success: false, message: '등록되지 않은 아이디입니다.' });

  } catch (error) {
    return createJsonResponse({ success: false, message: '서버 오류: ' + error.message });
  }
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. 상단 디스켓 아이콘(💾 **프로젝트 저장**)을 클릭합니다.

---

## 3. 웹 앱(Web App)으로 배포 및 URL 발급

1. Apps Script 편집기 우측 상단의 파란색 **[배포] → [새 배포]** 버튼을 클릭합니다.
2. 톱니바퀴 아이콘(유형 선택)을 누르고 **웹 앱 (Web App)**을 선택합니다.
3. 배포 설정을 아래와 같이 지정합니다:
   - **설명**: `GolfTee82 인증 API`
   - **웹 앱 (실행 대상)**: **나 (내 계정)**
   - **액세스 권한이 있는 사용자**: **모든 사용자 (Anyone)**  *(⭐️ 중요: 로그인 없이 확장프로그램에서 인증하기 위해 필수)*
4. **[배포]** 버튼을 클릭합니다. (최초 1회 구글 계정 권한 승인 창이 뜨면 허용합니다.)
5. 배포가 완료되면 화면에 나타나는 **웹 앱 URL**을 복사합니다.
   - 예시: `https://script.google.com/macros/s/AKfycbx.../exec`

---

## 4. GolfTee82 확장 프로그램에 등록하기

1. 브라우저에서 **GolfTee82** 확장 프로그램을 엽니다.
2. 화면에 표시된 회원 인증 모달 하단의 **`⚙️ 관리자 인증서버 설정`** 버튼을 클릭합니다.
3. 복사한 구글 웹 앱 URL을 붙여넣고 **[연결 테스트]**를 누릅니다.
4. 초록색 `🟢 연결 성공!` 메시지가 뜨면 **[저장하기]**를 클릭합니다.
5. 이제 스프레드시트에 등록해둔 아이디와 비밀번호를 입력하고 **[인증 및 사용 시작]**을 누르면 정상 로그인되어 모든 매크로 기능을 이용할 수 있습니다!

---

## 5. 회원 운영 팁

- **기간 연장**: 구글 시트 C열의 `만료일자`를 변경하면 회원이 다음에 열 때 자동으로 연장 반영됩니다.
- **즉시 차단**: 회원의 D열 `상태`를 `차단`으로 바꾸면, 회원이 프로그램을 켤 때 즉시 차단 메시지가 표시되며 사용이 정지됩니다.
- **회원 추가**: 구글 시트의 빈 행에 새로운 아이디, 비밀번호, 만료일자를 적기만 하면 즉시 로그인 가능합니다.
