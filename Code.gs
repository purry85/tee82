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
    const name = (data.name || params.name || '').trim();
    const phone = (data.phone || params.phone || '').trim();

    // 1. 연결 테스트 핑
    if (action === 'ping') {
      return createJsonResponse({ success: true, message: 'pong' });
    }

    // 1-1. 최신 배포 버전 및 업데이트 내용 조회/발행 (action: 'get_release' / 'publish_release')
    if (action === 'get_release') {
      const props = PropertiesService.getScriptProperties();
      const relVer = props.getProperty('LATEST_RELEASE_VER') || '';
      const relTitle = props.getProperty('LATEST_RELEASE_TITLE') || '';
      const relNotes = props.getProperty('LATEST_RELEASE_NOTES') || '';
      const relDate = props.getProperty('LATEST_RELEASE_DATE') || '';
      if (relVer) {
        return createJsonResponse({
          success: true,
          version: relVer,
          title: relTitle || ('v' + relVer + ' 주요 기능 개선'),
          releaseNotes: relNotes.split(/\r?\n/).filter(Boolean),
          notes: relNotes,
          releaseDate: relDate
        });
      }
      return createJsonResponse({ success: false, message: '등록된 배포 정보가 없습니다.' });
    }

    if (action === 'publish_release') {
      const relVer = String(data.version || params.version || '').trim();
      const relTitle = String(data.title || params.title || '').trim();
      const relNotes = String(data.notes || data.releaseNotes || params.notes || '').trim();
      const nowStr = Utilities.formatDate(new Date(), "GMT+9", "yyyy-MM-dd HH:mm:ss");
      if (relVer) {
        const props = PropertiesService.getScriptProperties();
        props.setProperties({
          'LATEST_RELEASE_VER': relVer,
          'LATEST_RELEASE_TITLE': relTitle || ('v' + relVer + ' 주요 기능 개선'),
          'LATEST_RELEASE_NOTES': relNotes,
          'LATEST_RELEASE_DATE': nowStr
        });
        return createJsonResponse({
          success: true,
          version: relVer,
          title: relTitle,
          notes: relNotes,
          publishedAt: nowStr,
          message: '최신 버전 배포 정보가 서버에 저장되었습니다.'
        });
      }
      return createJsonResponse({ success: false, message: '버전 번호가 누락되었습니다.' });
    }

    // ====================================================
    // 1-2. 애니데스크 원격 지원 요청 처리 (action: 'remote_support_request' or 'anydesk')
    // 웹 다운로드 페이지에서 회원이 보낸 성함 및 애니데스크 9자리 번호를
    // 회원목록의 해당 회원 행(애니데스크 열)에 자동 기재하고, '원격지원요청' 시트에도 자동 기록!
    // ====================================================
    if (action === 'remote_support_request' || action === 'anydesk_request' || action === 'anydesk') {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const memberSheet = ss.getSheetByName('회원목록') || ss.getSheets()[0];
      const anydeskNum = String(data.anydesk || params.anydesk || '').trim();
      const reqName = String(data.name || params.name || '').trim();
      const nowStr = Utilities.formatDate(new Date(), "GMT+9", "yyyy-MM-dd HH:mm:ss");

      let updatedRow = -1;
      let matchedName = reqName;

      if (memberSheet) {
        const lastCol = Math.max(memberSheet.getLastColumn(), 10);
        const header = memberSheet.getRange(1, 1, 1, lastCol).getValues()[0] || [];
        
        let anydeskColIdx = -1;
        let nameColIdx = 4; // 기본 E열 (5번째 열, 0-based 4)
        let idColIdx = 0;   // 기본 A열 (0-based 0)
        let loginColIdx = -1;

        for (let c = 0; c < header.length; c++) {
          const h = String(header[c] || '').trim().toLowerCase();
          if (h.indexOf('애니') !== -1 || h.indexOf('원격') !== -1 || h.indexOf('anydesk') !== -1) {
            anydeskColIdx = c;
          } else if (h.indexOf('이름') !== -1 || h.indexOf('성명') !== -1 || h.indexOf('매니저') !== -1) {
            nameColIdx = c;
          } else if (h.indexOf('아이디') !== -1 || h.indexOf('id') !== -1) {
            idColIdx = c;
          } else if (h.indexOf('접속') !== -1 || h.indexOf('로그인') !== -1) {
            loginColIdx = c;
          }
        }

        // '애니데스크' 컬럼이 없으면 마지막 열 바로 뒤에 자동 생성
        if (anydeskColIdx === -1) {
          anydeskColIdx = header.length;
          memberSheet.getRange(1, anydeskColIdx + 1).setValue('애니데스크').setBackground('#E0E7FF').setFontWeight('bold');
          SpreadsheetApp.flush();
        }

        const rows = memberSheet.getDataRange().getValues();
        const targetClean = reqName.toLowerCase().replace(/[\s\-_]/g, '');

        if (targetClean) {
          for (let i = 1; i < rows.length; i++) {
            const rowName = String(rows[i][nameColIdx] || '').trim().toLowerCase().replace(/[\s\-_]/g, '');
            const rowId = String(rows[i][idColIdx] || '').trim().toLowerCase().replace(/[\s\-_]/g, '');
            if (rowName === targetClean || rowId === targetClean || (targetClean.length >= 2 && (rowName.includes(targetClean) || targetClean.includes(rowName)))) {
              updatedRow = i + 1; // 1-based index
              matchedName = String(rows[i][nameColIdx] || rows[i][idColIdx] || reqName);
              break;
            }
          }
        }

        if (updatedRow > 0) {
          // 1) 기존 회원인 경우: 애니데스크 열에 번호 기재 및 최근접속열 업데이트
          memberSheet.getRange(updatedRow, anydeskColIdx + 1).setValue(anydeskNum);
          if (loginColIdx >= 0) {
            memberSheet.getRange(updatedRow, loginColIdx + 1).setValue(nowStr + ' (원격요청)');
          }
        } else if (reqName) {
          // 2) 회원목록에 아직 없는 신규 설치자/가입 전 매니저인 경우: 회원목록에 원격대기로 자동 등록
          const newRow = new Array(Math.max(anydeskColIdx + 1, 10)).fill('');
          newRow[idColIdx] = reqName;
          newRow[1] = '';
          newRow[2] = Utilities.formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "GMT+9", "yyyy-MM-dd");
          newRow[3] = '원격대기';
          newRow[nameColIdx] = reqName;
          if (loginColIdx >= 0) newRow[loginColIdx] = nowStr + ' (원격신청)';
          newRow[anydeskColIdx] = anydeskNum;
          memberSheet.appendRow(newRow);
          updatedRow = memberSheet.getLastRow();
        }
      }

      // 관리자가 한눈에 볼 수 있도록 '원격지원요청' 별도 탭 시트에도 자동 누적 기록
      let remoteSheet = ss.getSheetByName('원격지원요청');
      if (!remoteSheet) {
        remoteSheet = ss.insertSheet('원격지원요청');
        remoteSheet.appendRow(['신청일시', '성함/매니저명', '애니데스크 번호', '처리상태', '회원매칭여부']);
        remoteSheet.getRange(1, 1, 1, 5).setBackground('#FEF3C7').setFontWeight('bold');
      }
      remoteSheet.appendRow([nowStr, reqName, anydeskNum, '원격요청', updatedRow > 0 ? ('회원목록 ' + updatedRow + '행 반영') : '신규']);
      SpreadsheetApp.flush();

      return createJsonResponse({
        success: true,
        message: '애니데스크 PC 번호가 회원목록에 정상 반영되었습니다.',
        name: reqName,
        anydesk: anydeskNum,
        updatedRow: updatedRow
      });
    }

    // ====================================================
    // 2-1. 특정 구장 공지 삭제 (action: 'delete_notice')
    // 사용자 누구나 특정 구장의 공지를 삭제 시 시트에서 해당 행 삭제 및 삭제이력(Tombstone) 등록
    // ====================================================
    if (action === 'delete_notice') {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const targetCourse = String(data.course || (e && e.parameter ? e.parameter.course : '') || '').trim();
      const delTs = Number(data.deletedTimestamp || (e && e.parameter ? e.parameter.deletedTimestamp : 0)) || Date.now();
      const uploader = String(data.userId || data.userName || data.id || (e && e.parameter ? e.parameter.userId : '') || '관리자').trim();
      const nowStr = Utilities.formatDate(new Date(), "GMT+9", "yyyy-MM-dd HH:mm:ss");

      if (targetCourse) {
        // 1) 공지목록 시트에서 해당 구장의 모든 행 삭제
        const noticeSheet = ss.getSheetByName('공지목록');
        if (noticeSheet && noticeSheet.getLastRow() > 1) {
          const values = noticeSheet.getDataRange().getValues();
          const targetClean = targetCourse.replace(/[\s\-_]/g, '').toLowerCase();
          for (let i = values.length - 1; i >= 1; i--) {
            const rowCourse = String(values[i][0] || '').trim();
            const rowClean = rowCourse.replace(/[\s\-_]/g, '').toLowerCase();
            if (rowClean === targetClean || rowClean.includes(targetClean) || targetClean.includes(rowClean)) {
              noticeSheet.deleteRow(i + 1);
            }
          }
        }

        // 2) 공지삭제이력 시트에 영구 기록 (일반 사용자의 과거 공지 부활 방지)
        const delSheet = ss.getSheetByName('공지삭제이력') || ss.insertSheet('공지삭제이력');
        if (delSheet.getLastRow() === 0) {
          delSheet.appendRow(['구장명', '삭제일시', '삭제타임스탬프', '삭제자']);
          delSheet.getRange(1, 1, 1, 4).setBackground('#FFEBEE').setFontWeight('bold');
        }
        delSheet.appendRow([targetCourse, nowStr, delTs, uploader]);
      }

      return createJsonResponse({
        success: true,
        message: "'" + targetCourse + "' 공지가 서버에서 정상 삭제되었습니다.",
        deletedCourse: targetCourse,
        deletedTimestamp: delTs,
        syncedAt: nowStr
      });
    }

    // ====================================================
    // 2-2. 전체 공지 초기화 (action: 'clear_all_notices')
    // ====================================================
    if (action === 'clear_all_notices') {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const delTs = Number(data.deletedTimestamp || (e && e.parameter ? e.parameter.deletedTimestamp : 0)) || Date.now();
      const uploader = String(data.userId || data.userName || data.id || (e && e.parameter ? e.parameter.userId : '') || '관리자').trim();
      const nowStr = Utilities.formatDate(new Date(), "GMT+9", "yyyy-MM-dd HH:mm:ss");

      // 공지목록 전체 비우기
      const noticeSheet = ss.getSheetByName('공지목록');
      if (noticeSheet) {
        noticeSheet.clearContents();
        noticeSheet.appendRow(['구장명', '날짜', '시간', '시작분', '종료분', '캐디구분', '금액', '할인', '규칙유형', '원문전문', '등록자', '수신일시', '타임스탬프', '업데이트일시']);
        noticeSheet.getRange(1, 1, 1, 14).setBackground('#E8F5E9').setFontWeight('bold');
      }

      // 공지삭제이력에 __ALL__ 마커 추가
      const delSheet = ss.getSheetByName('공지삭제이력') || ss.insertSheet('공지삭제이력');
      if (delSheet.getLastRow() === 0) {
        delSheet.appendRow(['구장명', '삭제일시', '삭제타임스탬프', '삭제자']);
        delSheet.getRange(1, 1, 1, 4).setBackground('#FFEBEE').setFontWeight('bold');
      }
      delSheet.appendRow(['__ALL__', nowStr, delTs, uploader]);

      return createJsonResponse({
        success: true,
        message: '전체 공지가 초기화되었습니다.',
        isAllCleared: true,
        deletedTimestamp: delTs,
        syncedAt: nowStr
      });
    }

    // ====================================================
    // 2-3. 전체 사용자 공지 실시간 상호 동기화 (action: 'sync_notices')
    // A가 등록한 공지 업로드 + B가 등록한 공지 다운로드 취합 + 관리자 삭제 실시간 반영
    // ====================================================
    if (action === 'sync_notices' || action === 'get_notices') {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const noticeSheet = ss.getSheetByName('공지목록') || ss.insertSheet('공지목록');
      
      // 헤더 설정 (최초 생성 시)
      if (noticeSheet.getLastRow() === 0) {
        noticeSheet.appendRow(['구장명', '날짜', '시간', '시작분', '종료분', '캐디구분', '금액', '할인', '규칙유형', '원문전문', '등록자', '수신일시', '타임스탬프', '업데이트일시']);
        noticeSheet.getRange(1, 1, 1, 14).setBackground('#E8F5E9').setFontWeight('bold');
      }

      // 1) 공지삭제이력 읽기 (삭제 마커 목록 로드)
      const delSheet = ss.getSheetByName('공지삭제이력');
      const deletedCourseMap = {};
      let allClearedTimestamp = 0;
      const deletedCoursesList = [];

      if (delSheet && delSheet.getLastRow() > 1) {
        const delData = delSheet.getDataRange().getValues();
        for (let i = 1; i < delData.length; i++) {
          const dCourse = String(delData[i][0] || '').trim();
          const dTs = Number(delData[i][2]) || 0;
          if (!dCourse) continue;
          if (dCourse === '__ALL__') {
            if (dTs > allClearedTimestamp) allClearedTimestamp = dTs;
          } else {
            const cleanKey = dCourse.replace(/[\s\-_]/g, '').toLowerCase();
            if (!deletedCourseMap[cleanKey] || dTs > deletedCourseMap[cleanKey]) {
              deletedCourseMap[cleanKey] = dTs;
            }
            deletedCoursesList.push({ course: dCourse, deletedTimestamp: dTs });
          }
        }
      }

      // 2) 기존 시트의 공지들 읽기
      const existingData = noticeSheet.getDataRange().getValues();
      let serverRules = [];
      for (let i = 1; i < existingData.length; i++) {
        const row = existingData[i];
        if (!row[0]) continue;
        const rowCourse = String(row[0]);
        const rowClean = rowCourse.replace(/[\s\-_]/g, '').toLowerCase();
        const rTs = Number(row[12]) || 0;

        // 삭제된 공지 필터링
        if (allClearedTimestamp > 0 && rTs <= allClearedTimestamp) continue;
        if (deletedCourseMap[rowClean] && rTs <= deletedCourseMap[rowClean]) continue;

        serverRules.push({
          course: rowCourse,
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
          receivedTimestamp: rTs,
          updatedAt: String(row[13] || '')
        });
      }

      // 3) 클라이언트가 업로드한 규칙들 필터링 (삭제된 공지는 부활 방지를 위해 철저히 제외)
      const incomingRawRules = Array.isArray(data.rules) ? data.rules : [];
      const incomingRules = incomingRawRules.filter(inRule => {
        if (!inRule || !inRule.course) return false;
        const inTs = Number(inRule.receivedTimestamp) || 0;
        if (allClearedTimestamp > 0 && inTs <= allClearedTimestamp) return false;
        const cleanCourse = inRule.course.replace(/[\s\-_]/g, '').toLowerCase();
        if (deletedCourseMap[cleanCourse] && inTs <= deletedCourseMap[cleanCourse]) return false;
        return true;
      });

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

      // 시트에 전체 데이터 다시 쓰기 (새 규칙이 업로드되었거나 삭제 필터링되었을 때)
      if (incomingRules.length > 0 || serverRules.length !== (existingData.length - 1)) {
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
        deletedCourses: deletedCoursesList,
        isAllCleared: allClearedTimestamp > 0,
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

    // 컬럼 인덱스 자동 감지 (F열 전화번호 추가 지원)
    const header = rows[0] || [];
    let phoneColIdx = -1;
    let lastLoginColIdx = 6; // G열 (index 6, 7번째 열)
    let featuresColIdx = 7;  // H열 (index 7, 8번째 열)
    let sitesColIdx = 8;     // I열 (index 8, 9번째 열)
    let sessionColIdx = 9;   // J열 (index 9, 10번째 열)

    for (let c = 0; c < header.length; c++) {
      const h = String(header[c] || '').trim();
      if (h.indexOf('전화') !== -1 || h.indexOf('연락') !== -1 || h.indexOf('휴대폰') !== -1 || h.indexOf('핸드폰') !== -1) {
        phoneColIdx = c;
      } else if (h.indexOf('접속') !== -1 || h.indexOf('로그인') !== -1) {
        lastLoginColIdx = c;
      } else if (h.indexOf('부여') !== -1 || h.indexOf('기능') !== -1) {
        featuresColIdx = c;
      } else if (h.indexOf('사이트') !== -1) {
        sitesColIdx = c;
      } else if (h.indexOf('토큰') !== -1 || h.indexOf('세션') !== -1) {
        sessionColIdx = c;
      }
    }

    // ⭐️ 기존 9개 열 시트에 '전화번호' 열이 아직 없는 경우: E열(5번째 열) 뒤에 F열을 자동으로 삽입하고 헤더를 '전화번호'로 자동 설정!
    if (phoneColIdx === -1 && header.length >= 5) {
      try {
        sheet.insertColumnAfter(5); // E열(5번째 열) 바로 다음에 F열 삽입 (이후 열들은 자동으로 한 칸씩 오른쪽으로 이동)
        sheet.getRange(1, 6).setValue('전화번호');
        SpreadsheetApp.flush();
        phoneColIdx = 5;      // 0-based index 5 = F열 (전화번호)
        lastLoginColIdx = 6;  // G열 (최근접속일시)
        featuresColIdx = 7;   // H열 (부여기능)
        sitesColIdx = 8;      // I열 (사이트)
        sessionColIdx = 9;    // J열 (세션토큰)
      } catch(err) {
        // 삽입 권한 등 예외 발생 시 기존 9개 열 체제로 안전하게 하위 호환
        lastLoginColIdx = 5; // F열
        featuresColIdx = 6;  // G열
        sitesColIdx = 7;     // H열
        sessionColIdx = 8;   // I열
      }
    }

    // 2-0. 회원가입 신청 처리 (action: 'register' or 'signup')
    if (action === 'register' || action === 'signup') {
      if (!id || !pw) {
        return createJsonResponse({ success: false, message: '아이디와 비밀번호를 모두 입력해주세요.' });
      }
      if (id.length < 3) {
        return createJsonResponse({ success: false, message: '아이디를 3자 이상 입력해주세요.' });
      }

      // 기존 아이디 중복 체크 (대소문자 무시)
      for (let i = 1; i < rows.length; i++) {
        const rowId = String(rows[i][0] || '').trim();
        if (rowId.toLowerCase() === id.toLowerCase()) {
          return createJsonResponse({ success: false, message: '이미 등록되거나 신청된 아이디입니다. 다른 아이디를 입력해주세요.' });
        }
      }

      // 만료일: 기본 30일 후로 설정
      const now = new Date();
      const expireDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
      const expireStr = Utilities.formatDate(expireDate, "GMT+9", "yyyy-MM-dd");
      const nowStr = Utilities.formatDate(now, "GMT+9", "yyyy-MM-dd HH:mm:ss");

      // 회원정보 등록 (A:아이디, B:비밀번호, C:만료일자, D:상태, E:이름, F:전화번호, G:최근접속일시, H:부여기능, I:사이트, J:세션토큰)
      if (phoneColIdx !== -1 || header.length >= 10) {
        sheet.appendRow([id, pw, expireStr, '대기', name || '', phone || '', nowStr + ' (가입신청)', '', '전체', '']);
      } else {
        // 기존 9개 열 시트에 F열 '전화번호'를 자동 추가하여 10개 열로 등록
        sheet.appendRow([id, pw, expireStr, '대기', name || '', phone || '', nowStr + ' (가입신청)', '', '전체', '']);
      }
      SpreadsheetApp.flush();

      return createJsonResponse({
        success: true,
        action: 'register',
        message: '회원가입 신청이 완료되었습니다! 관리자 승인 후 로그인하실 수 있습니다.'
      });
    }

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

          // 최근접속일시 열에 변경 로그 기록 (전화번호가 추가된 경우 G열 = 7번째 열)
          try {
            const now = new Date();
            const nowStr = Utilities.formatDate(now, "GMT+9", "yyyy-MM-dd HH:mm:ss");
            const logCol = (lastLoginColIdx >= 0) ? (lastLoginColIdx + 1) : 7;
            sheet.getRange(i + 1, logCol).setValue(nowStr + ' (PW변경)');
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
      const rowPhone = (phoneColIdx >= 0) ? String(row[phoneColIdx] || '').trim() : '';
      const rowFeatures = String(row[featuresColIdx] || '').trim();
      const rowSites = String(row[sitesColIdx] || '').trim();
      const serverStoredValue = String(row[sessionColIdx] || '').trim();
      let serverDeviceId = '';
      let serverSessionToken = '';
      if (serverStoredValue.indexOf('@@') !== -1) {
        const parts = serverStoredValue.split('@@');
        serverDeviceId = parts[0].trim();
        serverSessionToken = parts[1].trim();
      } else {
        serverSessionToken = serverStoredValue;
      }

      if (rowId === id) {
        // 1. 비밀번호 확인
        if (rowPw !== pw) {
          return createJsonResponse({ success: false, message: '비밀번호가 일치하지 않습니다.' });
        }

        // 2. 계정 상태 확인
        if (rowStatus === '대기' || rowStatus === '승인대기') {
          return createJsonResponse({ success: false, message: '관리자 승인 대기 중인 계정입니다. 관리자에게 승인을 요청해주세요.' });
        }
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

        // 4. 동시접속 제어 및 기기(PC)/세션 토큰 처리 (I열: deviceId@@sessionToken)
        // - 관리자(admin): 모든 중복로그인 100% 무제한 상시 허용 (기기/브라우저/모바일 제한 일절 없음)
        // - 일반 회원:
        //   1) 동일 PC: 어떤 브라우저(Chrome, Edge, Whale 등)든 끊김 없이 다중 실행 허용
        //   2) 다른 PC / 모바일 접속 시: 이전 기기 세션 즉시 만료 및 차단
        const isNewLogin = String(data.newLogin || params.newLogin || '') === 'true';
        const clientDeviceId = String(data.deviceId || params.deviceId || '').trim();
        const clientSessionToken = String(data.sessionToken || params.sessionToken || '').trim();
        let sessionToken = serverSessionToken;

        // 관리자 계정 판별 (아이디/이름/부여기능에 admin, 관리자, 최고관리자, 마스터 등이 포함된 경우)
        const cleanRowId = String(rowId || '').toLowerCase();
        const cleanRowName = String(rowName || '').toLowerCase();
        const cleanFeatures = String(rowFeatures || '').toLowerCase();
        const isAdmin = cleanRowId === 'admin' || cleanRowId === 'administrator' || cleanRowId.indexOf('admin') !== -1 ||
                        cleanRowName.indexOf('관리자') !== -1 || cleanRowName === 'admin' ||
                        cleanFeatures.indexOf('관리자') !== -1 || cleanFeatures.indexOf('admin') !== -1 || cleanFeatures.indexOf('마스터') !== -1;

        if (isAdmin) {
          // ★ [관리자 전용 특권]: 모든 중복로그인 100% 무제한 상시 허용!
          // 다른 컴퓨터, 모바일, 여러 브라우저에서 몇 대가 동시에 켜져도 절대 끊어지지 않음
          sessionToken = serverSessionToken || ('GT_ADMIN_' + Utilities.getUuid());
        } else if (isNewLogin || !serverSessionToken) {
          // [로그인 버튼 클릭 시 (신규 로그인)]
          // 1) 같은 기기(동일 PC)에서 로그인한 경우:
          //    기존 기기 세션을 유지하여 Chrome, Edge, Brave, Whale 등 한 컴퓨터 내의 모든 브라우저가 끊김 없이 정상 사용 가능!
          if (clientDeviceId && serverDeviceId && clientDeviceId === serverDeviceId && serverSessionToken) {
            sessionToken = serverSessionToken;
          } else {
            // 2) 다른 기기(다른 컴퓨터 또는 모바일)에서 로그인한 경우:
            //    새 세션 토큰을 발급하고 I열을 새 기기ID로 갱신하여, 기존에 켜져 있던 다른 기기/PC의 모든 브라우저 세션을 즉시 강제 종료!
            sessionToken = 'GT_' + Utilities.getUuid();
            const newStored = clientDeviceId ? (clientDeviceId + '@@' + sessionToken) : sessionToken;
            try {
              sheet.getRange(i + 1, sessionColIdx + 1).setValue(newStored);
            } catch(err) {}
          }
        } else {
          // [주기적 백그라운드 검증 (Heartbeat) 또는 팝업 재진입 검증]
          // 1) 다른 기기(다른 PC 또는 모바일)에서 새로 로그인한 경우 -> 즉시 세션 차단 (중복 로그인 끊김)
          if (clientDeviceId && serverDeviceId && clientDeviceId !== serverDeviceId) {
            return createJsonResponse({
              success: false,
              code: 'CONCURRENT_LOGIN',
              isConcurrentLogin: true,
              message: '다른 컴퓨터 또는 모바일에서 로그인되어 현재 세션이 종료되었습니다.'
            });
          }
          // 2) 세션 토큰 불일치 검증
          if (serverSessionToken && clientSessionToken && serverSessionToken !== clientSessionToken) {
            // 동일 기기(동일 PC) 내의 브라우저인 경우 토큰을 최신으로 동기화하여 유지
            if (clientDeviceId && serverDeviceId && clientDeviceId === serverDeviceId) {
              sessionToken = serverSessionToken;
            } else {
              return createJsonResponse({
                success: false,
                code: 'CONCURRENT_LOGIN',
                isConcurrentLogin: true,
                message: '다른 컴퓨터 또는 모바일에서 로그인되어 현재 세션이 종료되었습니다.'
              });
            }
          }
        }

        // 5. 접속 시간 자동 기록 (최근접속일시 열)
        try {
          const nowStr = Utilities.formatDate(now, "GMT+9", "yyyy-MM-dd HH:mm:ss");
          sheet.getRange(i + 1, lastLoginColIdx + 1).setValue(nowStr);
        } catch(err) {}

        SpreadsheetApp.flush(); // 즉시 구글 스프레드시트에 영구 저장 강제

        const expStr = Utilities.formatDate(expDate, "GMT+9", "yyyy-MM-dd");
        let latestRelease = null;
        try {
          const props = PropertiesService.getScriptProperties();
          const relVer = props.getProperty('LATEST_RELEASE_VER') || '';
          if (relVer) {
            const relTitle = props.getProperty('LATEST_RELEASE_TITLE') || ('v' + relVer + ' 주요 기능 개선');
            const relNotes = props.getProperty('LATEST_RELEASE_NOTES') || '';
            latestRelease = {
              version: relVer,
              title: relTitle,
              releaseNotes: relNotes.split(/\r?\n/).filter(Boolean),
              notes: relNotes
            };
          }
        } catch(e) {}
        return createJsonResponse({
          success: true,
          id: id,
          name: rowName || id,
          phone: rowPhone,
          isAdmin: isAdmin,
          expireDate: expStr,
          daysLeft: daysLeft,
          features: rowFeatures,
          sites: rowSites,
          sessionToken: sessionToken,
          latestRelease: latestRelease,
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