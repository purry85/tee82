let shouldStopRegistration=false;
let isRegistrationRunning=false;
let latestAlertNotice='';
window.addEventListener('\x6d\x65\x73\x73\x61\x67\x65',(e)=>{
if(e.data&&e.data.type==='\x5f\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x44\x49\x41\x4c\x4f\x47\x5f\x4e\x4f\x54\x49\x43\x45\x5f\x5f'){
const alertText=e.data.text||'';
console.log("[\uace8\ud504\ud0d1 \x41\x6c\x65\x72\x74 \uac10\uc9c0]\x3a",alertText);
latestAlertNotice=alertText;
if(alertText.includes('\ucd08\uacfc')||alertText.includes('\uc2e4\ud328')||alertText.includes('\uc624\ub958')||alertText.includes('\uae08\uc9c0')){
console.warn("[\uace8\ud504\ud0d1] \uc11c\ubc84 \uc81c\ud55c\x2f\uc624\ub958 \uc54c\ub9bc \uac10\uc9c0\x3a",alertText);
}
}
});
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
function _0x1000(type='\x6e\x6f\x72\x6d\x61\x6c',preset='\x68\x75\x6d\x61\x6e'){
if(preset==='\x75\x6c\x74\x72\x61')return type==='\x66\x61\x73\x74'?40:80;
if(preset==='\x66\x61\x73\x74')return type==='\x66\x61\x73\x74'?80:150;
if(preset==='\x68\x75\x6d\x61\x6e')return type==='\x66\x61\x73\x74'?150:300;
return type==='\x66\x61\x73\x74'?250:500;
}
function _0x1001(preset='\x73\x61\x66\x65'){
if(preset==='\x75\x6c\x74\x72\x61')return 300;
if(preset==='\x66\x61\x73\x74')return 600;
if(preset==='\x68\x75\x6d\x61\x6e')return 1200;
return 1800;
}
async function _0x1002(el){
if(!el)return;
el.scrollIntoView({block:'\x6e\x65\x61\x72\x65\x73\x74',inline:'\x63\x65\x6e\x74\x65\x72',behavior:'\x69\x6e\x73\x74\x61\x6e\x74'});
const rect=el.getBoundingClientRect();
const x=rect.left+rect.width/2;
const y=rect.top+rect.height/2;
['\x70\x6f\x69\x6e\x74\x65\x72\x6f\x76\x65\x72','\x6d\x6f\x75\x73\x65\x6f\x76\x65\x72','\x70\x6f\x69\x6e\x74\x65\x72\x64\x6f\x77\x6e','\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e'].forEach(t=>{
el.dispatchEvent(new MouseEvent(t,{bubbles:true,cancelable:true,view:window,clientX:x,clientY:y}));
});
await sleep(20);
['\x70\x6f\x69\x6e\x74\x65\x72\x75\x70','\x6d\x6f\x75\x73\x65\x75\x70','\x63\x6c\x69\x63\x6b'].forEach(t=>{
el.dispatchEvent(new MouseEvent(t,{bubbles:true,cancelable:true,view:window,clientX:x,clientY:y}));
});
try{el.click();}catch(e){}
}
async function _0x1003(input,text){
if(!input)return;
input.focus();
input.value='';
input.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
input.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
await sleep(40);
const str=String(text);
input.value=str;
input.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
input.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
}
function _0x1004(){
let hud=document.getElementById('\x67\x74\x70\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c');
if(!hud){
hud=document.createElement('\x64\x69\x76');
hud.id='\x67\x74\x70\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c';
hud.style.cssText=`
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 9999999;
            background: rgba(15, 23, 42, 0.94);
            backdrop-filter: blur(8px);
            color: #F8FAFC;
            padding: 14px 18px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 13px;
            min-width: 280px;
            max-width: 380px;
            transition: all 0.2s ease;
        `;
hud.innerHTML=`
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <div style="font-weight: 700; font-size: 13.5px; color: #F59E0B; display: flex; align-items: center; gap: 6px;">
                    <span>\ud83c\udfaf</span> <span id="gtp_hud_title">\uace8\ud504\ud0d1 \ud64d\ubcf4 \uc790\ub3d9\ub4f1\ub85d</span>
                </div>
                <button id="gtp_hud_stop_btn" style="
                    background: #EF4444; color: white; border: none; padding: 3px 8px; border-radius: 4px;
                    font-size: 11px; font-weight: 700; cursor: pointer;">\uc911\ub2e8</button>
            </div>
            <div id="gtp_hud_desc" style="font-size: 12px; color: #CBD5E1; margin-bottom: 8px; line-height: 1.4;">
                \uc900\ube44 \uc911...
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); height: 6px; border-radius: 3px; overflow: hidden; margin-bottom: 6px;">
                <div id="gtp_hud_bar" style="background: #F59E0B; height: 100%; width: 0%; transition: width 0.25s ease;"></div>
            </div>
            <div id="gtp_hud_count" style="font-size: 11px; color: #94A3B8; text-align: right; font-weight: 600;">
                0 / 0\uac74 (0%)
            </div>
        `;
document.body.appendChild(hud);
hud.querySelector('\x23\x67\x74\x70\x5f\x68\x75\x64\x5f\x73\x74\x6f\x70\x5f\x62\x74\x6e')?.addEventListener('\x63\x6c\x69\x63\x6b',()=>{
console.log("[\uace8\ud504\ud0d1] \uc0ac\uc6a9\uc790\uac00 \x48\x55\x44 \uc911\ub2e8 \ubc84\ud2bc \ud074\ub9ad");
shouldStopRegistration=true;
isRegistrationRunning=false;
_0x1005({desc:'\ud83d\uded1 \uc0ac\uc6a9\uc790\uc5d0 \uc758\ud574 \uc911\ub2e8\ub418\uc5c8\uc2b5\ub2c8\ub2e4\x2e',isStopped:true});
chrome.runtime.sendMessage({type:'\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x53\x54\x4f\x50\x50\x45\x44'});
setTimeout(_0x1006,2000);
});
}
return hud;
}
function _0x1005({title,desc,current,total,isCompleted,isStopped}){
const hud=_0x1004();
if(!hud)return;
if(title)hud.querySelector('\x23\x67\x74\x70\x5f\x68\x75\x64\x5f\x74\x69\x74\x6c\x65').innerText=title;
if(desc)hud.querySelector('\x23\x67\x74\x70\x5f\x68\x75\x64\x5f\x64\x65\x73\x63').innerText=desc;
const bar=hud.querySelector('\x23\x67\x74\x70\x5f\x68\x75\x64\x5f\x62\x61\x72');
const countEl=hud.querySelector('\x23\x67\x74\x70\x5f\x68\x75\x64\x5f\x63\x6f\x75\x6e\x74');
if(total&&total>0){
const cur=current||0;
const pct=Math.min(100,Math.round((cur/total)*100));
if(bar)bar.style.width=`${pct}%`;
if(countEl)countEl.innerText=`${cur} / ${total}\uac74 (${pct}%)`;
}
if(isCompleted&&bar){
bar.style.width='\x31\x30\x30%';
bar.style.background='\x23\x31\x30\x42\x39\x38\x31';
}
if(isStopped&&bar){
bar.style.background='\x23\x45\x46\x34\x34\x34\x34';
}
}
function _0x1006(){
const hud=document.getElementById('\x67\x74\x70\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c');
if(hud)hud.remove();
}
function _0x1007(labelName){
const cleanTarget=labelName.replace(/[\s\-_/]/g,'').toLowerCase();
const allLabels=Array.from(document.querySelectorAll('\x74\x68, \x74\x64, \x6c\x61\x62\x65\x6c, \x64\x69\x76, \x73\x70\x61\x6e, \x70'))
.filter(el=>{
if(el.offsetHeight<=0)return false;
const t=(el.innerText||el.textContent||'').trim().replace(/[\s\-_/]/g,'').toLowerCase();
return t===cleanTarget||t.startsWith(cleanTarget);
});
for(const el of allLabels){
const tr=el.closest('\x74\x72');
if(tr){
const cells=Array.from(tr.querySelectorAll('\x74\x64, \x74\x68'));
const cellIdx=cells.indexOf(el.closest('\x74\x64, \x74\x68'));
if(cellIdx!==-1&&cellIdx+1<cells.length){
return cells[cellIdx+1];
}
return tr;
}
const row=el.closest('\x2e\x72\x6f\x77, \x2e\x66\x6f\x72\x6d-\x67\x72\x6f\x75\x70, \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x72\x6f\x77"]');
if(row)return row;
}
return null;
}
async function _0x1008(rowLabel,targetValue){
const container=_0x1007(rowLabel)||document.body;
const radios=Array.from(container.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"], \x6c\x61\x62\x65\x6c'));
for(const r of radios){
const txt=(r.innerText||r.textContent||r.value||'').trim();
if(txt.includes(targetValue)||targetValue.includes(txt)){
const radioInput=(r.tagName==='\x49\x4e\x50\x55\x54')?r:r.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"]')||r.previousElementSibling||r;
if(radioInput){
radioInput.scrollIntoView({block:'\x6e\x65\x61\x72\x65\x73\x74',inline:'\x63\x65\x6e\x74\x65\x72'});
await _0x1002(radioInput);
if(radioInput.type==='\x72\x61\x64\x69\x6f'){
radioInput.checked=true;
radioInput.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
}
console.log(`[\uace8\ud504\ud0d1] [${rowLabel}] \ub77c\ub514\uc624 [${targetValue}] \uc120\ud0dd \uc644\ub8cc`);
return true;
}
}
}
return false;
}
async function _0x1009(rowLabel,value){
const container=_0x1007(rowLabel);
if(!container)return false;
const input=container.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x6e\x75\x6d\x62\x65\x72"], \x69\x6e\x70\x75\x74\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"])');
if(input){
await _0x1003(input,value);
console.log(`[\uace8\ud504\ud0d1] [${rowLabel}] \uc785\ub825\uac12: [${value}] \uc644\ub8cc`);
return true;
}
return false;
}
async function _0x100a(rowLabel,targetText){
const container=_0x1007(rowLabel);
if(!container)return false;
const sel=container.querySelector('\x73\x65\x6c\x65\x63\x74');
if(!sel)return false;
const options=Array.from(sel.options);
const cleanTarget=(targetText||'').trim();
let matchedOpt=options.find(o=>o.text.trim()===cleanTarget);
if(!matchedOpt&&cleanTarget){
matchedOpt=options.find(o=>o.text.includes(cleanTarget)||cleanTarget.includes(o.text.trim()));
}
if(matchedOpt){
sel.value=matchedOpt.value;
sel.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
console.log(`[\uace8\ud504\ud0d1] [${rowLabel}] \uc140\ub809\ud2b8 [${matchedOpt.text}] \uc120\ud0dd \uc644\ub8cc`);
return true;
}
return false;
}
async function _0x100b(rowLabel,cbLabel,shouldCheck){
const container=_0x1007(rowLabel)||document.body;
const checkboxes=Array.from(container.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"], \x6c\x61\x62\x65\x6c'));
for(const el of checkboxes){
const txt=(el.innerText||el.textContent||'').trim();
if(txt.includes(cbLabel)){
const cb=(el.tagName==='\x49\x4e\x50\x55\x54')?el:el.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]')||el.previousElementSibling;
if(cb&&cb.type==='\x63\x68\x65\x63\x6b\x62\x6f\x78'){
if(cb.checked!==shouldCheck){
await _0x1002(cb);
cb.checked=shouldCheck;
cb.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
}
console.log(`[\uace8\ud504\ud0d1] [${rowLabel}] [${cbLabel}] \uccb4\ud06c\uc0c1\ud0dc: ${shouldCheck}`);
return true;
}
}
}
return false;
}
async function _0x100c(dateStr){
if(!dateStr)return true;
const dateMatch=dateStr.match(/(\d{1,2})[./\-](\d{1,2})/);
if(!dateMatch)return true;
const targetDay=parseInt(dateMatch[2],10);
console.log(`[\uace8\ud504\ud0d1] \ud83d\udcc5 \ubaa9\ud45c \ub0a0\uc9dc: [${targetDay}\uc77c] \uc120\ud0dd \uc2dc\ub3c4...`);
const calArea=Array.from(document.querySelectorAll('\x64\x69\x76, \x74\x64, \x74\x61\x62\x6c\x65, \x73\x65\x63\x74\x69\x6f\x6e'))
.find(el=>(el.innerText||el.textContent||'').includes('\ub0a0\uc9dc \uc120\ud0dd')&&el.offsetHeight>0);
const searchScope=calArea||document.body;
const dayCells=Array.from(searchScope.querySelectorAll('\x74\x64, \x64\x69\x76, \x73\x70\x61\x6e, \x61, \x62\x75\x74\x74\x6f\x6e'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const t=(el.innerText||el.textContent||'').trim();
return t===String(targetDay);
});
for(const cell of dayCells){
const r=cell.getBoundingClientRect();
if(r.left<400&&r.top<500&&r.width<60&&r.height<60){
await _0x1002(cell);
console.log(`[\uace8\ud504\ud0d1] \ud83d\udcc5 \ub2ec\ub825 [${targetDay}\uc77c] \ud074\ub9ad \uc644\ub8cc!`);
await sleep(350);
return true;
}
}
return false;
}
async function _0x100d(){
console.log("[\uace8\ud504\ud0d1] \ud83c\udfaf \uc2e0\uccad \uad6c\ubd84 [\ud64d\ubcf4] \ubaa8\ub4dc \uc804\ud658 \uc2dc\ub3c4\x2e\x2e\x2e");
const allBtns=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x62\x74\x6e, \x61, \x73\x70\x61\x6e, \x6c\x61\x62\x65\x6c, \x64\x69\x76'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const t=(el.innerText||el.textContent||'').trim();
if(t!=='\ud64d\ubcf4')return false;
const r=el.getBoundingClientRect();
return r.top<650&&r.width<150;
});
if(allBtns.length>0){
const promoBtn=allBtns[0].closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x62\x74\x6e, \x61')||allBtns[0];
const isAlreadyActive=promoBtn.classList.contains('\x61\x63\x74\x69\x76\x65')||promoBtn.classList.contains('\x73\x65\x6c\x65\x63\x74\x65\x64')||
window.getComputedStyle(promoBtn).backgroundColor.includes('\x72\x67\x62(\x30, \x31\x32\x38, \x31\x32\x38)')||
window.getComputedStyle(promoBtn).color.includes('\x72\x67\x62(\x32\x35\x35, \x32\x35\x35, \x32\x35\x35)');
if(!isAlreadyActive){
await _0x1002(promoBtn);
console.log("[\uace8\ud504\ud0d1] \ud83c\udfaf \uc0c1\ub2e8 [\ud64d\ubcf4] \ubc84\ud2bc \ud074\ub9ad \uc644\ub8cc!");
await sleep(300);
}else{
console.log("[\uace8\ud504\ud0d1] \ud83c\udfaf \uc0c1\ub2e8 [\ud64d\ubcf4] \ubaa8\ub4dc \uc774\ubbf8 \ud65c\uc131 \uc0c1\ud0dc");
}
return true;
}
return false;
}
async function _0x100e(golfName,rawGolfName){
console.log(`[\uace8\ud504\ud0d1] \u26f3 \uace8\ud504\uc7a5 \uc120\ud0dd \uc2dc\ub3c4: [${golfName}] (\uc6d0\ubcf8: ${rawGolfName})...`);
const clean1=(golfName||'').trim().replace(/[\s\-_]/g,'').toLowerCase();
const clean2=(rawGolfName||'').trim().replace(/[\s\-_]/g,'').toLowerCase();
const stripped1=clean1.replace(/cc|gc|골프장|골프클럽/gi,'');
const stripped2=clean2.replace(/cc|gc|골프장|골프클럽/gi,'');
const courseBtns=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x62\x74\x6e, \x61, \x64\x69\x76'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const r=el.getBoundingClientRect();
return r.left>=180&&r.left<=650&&r.top>=80&&r.top<=600;
});
let targetBtn=null;
targetBtn=courseBtns.find(el=>{
const t=(el.innerText||el.textContent||'').trim().replace(/[\s\-_]/g,'').toLowerCase();
return t===clean1||t===clean2;
});
if(!targetBtn&&(stripped1.length>=2||stripped2.length>=2)){
targetBtn=courseBtns.find(el=>{
const t=(el.innerText||el.textContent||'').trim().replace(/[\s\-_]/g,'').toLowerCase().replace(/cc|gc|골프장|골프클럽/gi,'');
return(stripped1&&t===stripped1)||(stripped2&&t===stripped2);
});
}
if(!targetBtn&&(stripped1.length>=2||stripped2.length>=2)){
targetBtn=courseBtns.find(el=>{
const t=(el.innerText||el.textContent||'').trim().replace(/[\s\-_]/g,'').toLowerCase().replace(/cc|gc|골프장|골프클럽/gi,'');
return(stripped1&&t.includes(stripped1))||(stripped2&&t.includes(stripped2))||
(stripped1&&stripped1.includes(t))||(stripped2&&stripped2.includes(t));
});
}
if(targetBtn){
const clickEl=targetBtn.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x62\x74\x6e, \x61')||targetBtn;
clickEl.scrollIntoView({block:'\x6e\x65\x61\x72\x65\x73\x74',inline:'\x63\x65\x6e\x74\x65\x72'});
await _0x1002(clickEl);
console.log(`[\uace8\ud504\ud0d1] \u26f3 \uace8\ud504\uc7a5 \ubc84\ud2bc [${(clickEl.innerText||'').trim()}] \ud074\ub9ad \uc644\ub8cc!`);
await sleep(500);
return true;
}
console.warn(`[\uace8\ud504\ud0d1] \u26a0\ufe0f \uace8\ud504\uc7a5 \ubc84\ud2bc [${golfName}] \ubbf8\ubc1c\uacac`);
return false;
}
async function _0x100f(timeStr){
if(!timeStr)return false;
const cleanTime=timeStr.replace(/[^\d]/g,'');
const colonTime=(cleanTime.length===4)?`${cleanTime.slice(0,2)}:${cleanTime.slice(2)}`:timeStr;
console.log(`[\uace8\ud504\ud0d1] \u23f1\ufe0f \uc794\uc5ec\ud0c0\uc784 \ubaa9\ub85d\uc5d0\uc11c [${colonTime}] \ud0d0\uc0c9 \ubc0f [\uc2e0\uccad] \ud074\ub9ad \uc2dc\ub3c4...`);
const allRows=Array.from(document.querySelectorAll('\x74\x72, \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x72\x6f\x77"]'))
.filter(el=>{
if(el.offsetHeight<=0)return false;
const r=el.getBoundingClientRect();
return r.left>=550;
});
for(const row of allRows){
const txt=(row.innerText||row.textContent||'');
if(txt.includes(colonTime)||(cleanTime.length===4&&txt.replace(/[^\d]/g,'').includes(cleanTime))){
const applyBtn=Array.from(row.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x62\x74\x6e, \x61, \x73\x70\x61\x6e'))
.find(b=>{
const bt=(b.innerText||b.textContent||'').trim();
return bt==='\uc2e0\uccad'&&b.offsetHeight>0;
});
if(applyBtn){
applyBtn.scrollIntoView({block:'\x6e\x65\x61\x72\x65\x73\x74',inline:'\x63\x65\x6e\x74\x65\x72'});
await _0x1002(applyBtn);
console.log(`[\uace8\ud504\ud0d1] \u23f1\ufe0f \uc794\uc5ec\ud0c0\uc784 [${colonTime}]\uc758 [\uc2e0\uccad] \ubc84\ud2bc \ud074\ub9ad \uc644\ub8cc!`);
await sleep(350);
return true;
}
}
}
console.log(`[\uace8\ud504\ud0d1] \u2139\ufe0f \uc794\uc5ec\ud0c0\uc784 \ubaa9\ub85d\uc5d0 [${colonTime}] \ubbf8\uc874\uc7ac -> \ud558\ub2e8 '\ud76c\ub9dd\uc2dc\uac04' \uc9c1\uc811 \uc785\ub825\uc73c\ub85c \uc804\ud658`);
return false;
}
async function _0x1010(){
console.log("[\uace8\ud504\ud0d1] \ud83d\ude80 \ud558\ub2e8 \ub178\ub780\uc0c9 [\ud64d\ubcf4] \uc81c\ucd9c \ubc84\ud2bc \ud0d0\uc0c9 \ubc0f \ud074\ub9ad\x2e\x2e\x2e");
const candidates=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x62\x74\x6e, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"], \x61'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const txt=(el.innerText||el.textContent||el.value||'').trim();
if(txt!=='\ud64d\ubcf4')return false;
const r=el.getBoundingClientRect();
return r.top>500&&r.width>=100;
});
if(candidates.length>0){
const submitBtn=candidates[candidates.length-1];
submitBtn.scrollIntoView({block:'\x63\x65\x6e\x74\x65\x72',inline:'\x63\x65\x6e\x74\x65\x72'});
submitBtn.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x46\x35\x39\x45\x30\x42','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await sleep(100);
await _0x1002(submitBtn);
console.log("[\uace8\ud504\ud0d1] \ud83d\ude80 [\ud64d\ubcf4] \uc81c\ucd9c \ubc84\ud2bc \ud074\ub9ad \uc644\ub8cc!");
await sleep(600);
return true;
}
console.error("[\uace8\ud504\ud0d1] \u274c \ud558\ub2e8 [\ud64d\ubcf4] \uc81c\ucd9c \ubc84\ud2bc\uc744 \ucc3e\uc9c0 \ubabb\ud568");
return false;
}
async function _0x1011(item,customMemo='',stepPreset='\x68\x75\x6d\x61\x6e'){
console.log(`\n================== [\uace8\ud504\ud0d1 \uc790\ub3d9\ub4f1\ub85d] ${item.golf} (${item.date} ${item.time}) ==================`);
await _0x100c(item.date);
if(shouldStopRegistration)return false;
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
await _0x100d();
if(shouldStopRegistration)return false;
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
await _0x100e(item.golf,item.rawGolf);
if(shouldStopRegistration)return false;
await sleep(_0x1000('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
const appliedTime=await _0x100f(item.time);
if(shouldStopRegistration)return false;
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
const timeClean=(item.time||'').replace(/[^\d]/g,'');
const formattedTime=(timeClean.length===4)?`${timeClean.slice(0,2)}:${timeClean.slice(2)}`:item.time;
if(!appliedTime){
await _0x1009('\ud76c\ub9dd\uc2dc\uac04',formattedTime);
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
}
const isTransfer=(item.roomType==='\uc591\ub3c4');
await _0x1008('\uc591\ub3c4\x2f\uc870\uc778',isTransfer?'\uc591\ub3c4':'\uc870\uc778');
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
const fieldFeeNum=parseFloat((item.fieldFee||item.fee||'').toString().replace(/[^\d.]/g,''))||0;
const preFeeNum=parseFloat((item.prepaidFee||'').toString().replace(/[^\d.]/g,''))||0;
let payType='\ud604\uc7a5';
if(fieldFeeNum>0&&preFeeNum>0)payType='\uc77c\ubd80\uc120\uacb0';
else if(preFeeNum>0&&fieldFeeNum<=0)payType='\uc804\uc561\uc120\uacb0';
else payType='\ud604\uc7a5';
await _0x1008('\uacb0\uc81c\uad6c\ubd84',payType);
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
if(fieldFeeNum>0){
await _0x1009('\ud604\uc7a5\uacb0\uc81c',String(fieldFeeNum));
await sleep(100);
}
if(preFeeNum>0){
await _0x1009('\uc120\uacb0\uc81c',String(preFeeNum));
await sleep(100);
}
const rawGender=(item.waitGender||item.gender||'').trim();
let targetGender='\uc120\ud0dd';
if(rawGender.includes('\ub0a8\ub0a8'))targetGender='\ub0a8\ub0a8';
else if(rawGender.includes('\uc5ec\uc5ec'))targetGender='\uc5ec\uc5ec';
else if(rawGender.includes('\ub0a8\uc5ec')||rawGender.includes('\ubd80\ubd80'))targetGender='\ub0a8\uc5ec';
else if(rawGender.includes('\ub0a8'))targetGender='\ub0a8';
else if(rawGender.includes('\uc5ec'))targetGender='\uc5ec';
if(targetGender!=='\uc120\ud0dd'){
await _0x100a('\ub300\uae30\uc131\ubcc4',targetGender);
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
}
const cond=(item.condition||'').trim();
let reqGender='\uc0c1\uad00\uc5c6\uc74c';
if(cond.includes('\ub0a8\uc790')||cond.includes('\ub0a8\uc131'))reqGender='\ub0a8\uc131\ub9cc';
else if(cond.includes('\uc5ec\uc790')||cond.includes('\uc5ec\uc131'))reqGender='\uc5ec\uc131\ub9cc';
else if(cond.includes('\ubd80\ubd80')||cond.includes('\ucee4\ud50c'))reqGender='\ub0a8\uc5ec\ub9cc';
await _0x1008('\uc694\uccad\uc131\ubcc4',reqGender);
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
const hasCart=Boolean(item.isCart||(item.rawText||'').includes('\uce74\ud3ec')||(item.rawText||'').includes('\uce74\ud2b8\ud3ec\ud568'));
const hasMeal=Boolean(item.isMeal||(item.rawText||'').includes('\uc2dd\ud3ec')||(item.rawText||'').includes('\uc2dd\uc0ac\ud3ec\ud568')||(item.rawText||'').includes('\uc870\uc2dd'));
await _0x100b('\uc870\uac74\uc120\ud0dd','\uce74\ud3ec',hasCart);
await _0x100b('\uc870\uac74\uc120\ud0dd','\uc2dd\ud3ec',hasMeal);
await _0x100b('\uc870\uac74\uc120\ud0dd','\ucee4\ud53c',false);
await _0x100b('\uc870\uac74\uc120\ud0dd','\uc2dc\uc124\x58',false);
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
const cadyRaw=(item.cady||'\uce90\ub514').trim();
let cadyTarget='\uce90\ud2f0';
if(cadyRaw.includes('\ub178\uce90\ub514'))cadyTarget='\ub178\uce90\ub514';
else if(cadyRaw.includes('\uc6b4\uc804')||cadyRaw.includes('\ub4dc\ub77c\uc774\ube59'))cadyTarget='\ub4dc\ub77c\uc774\ube59\uce90\ub514';
else if(cadyRaw.includes('\uc2e0\uc785')||cadyRaw.includes('\uad50\uc721\uc0dd'))cadyTarget='\uc2e0\uc785\uce90\ub514';
else if(cadyRaw.includes('\ud2b9\uc218'))cadyTarget='\ud2b9\uc218\uce90\ub514';
else cadyTarget='\uce90\ud2f0';
const cadyDone=await _0x1008('\uce90\ub514\uc720\ubb34',cadyTarget);
if(!cadyDone&&cadyTarget==='\uce90\ud2f0'){
await _0x1008('\uce90\ub514\uc720\ubb34','\uce90\ub514');
}
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
const memoVal=item.memo||customMemo||'';
if(memoVal){
const container=_0x1007('\ub9e4\ub2c8\uc800\ube44\uace0');
if(container){
const memoInput=container.querySelector('\x74\x65\x78\x74\x61\x72\x65\x61, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"]');
if(memoInput){
await _0x1003(memoInput,memoVal);
console.log("[\uace8\ud504\ud0d1] \ub9e4\ub2c8\uc800\ube44\uace0 \ub4f1\ub85d\ubb38\uad6c \uc785\ub825 \uc644\ub8cc");
await sleep(100);
}
}
}
const submitted=await _0x1010();
if(!submitted)return false;
await sleep(_0x1000('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
return true;
}
async function _0x1012(items,memo='',delayPreset='\x73\x61\x66\x65',stepPreset='\x68\x75\x6d\x61\x6e'){
if(!items||items.length===0)return;
isRegistrationRunning=true;
shouldStopRegistration=false;
console.log(`\ud83d\ude80 [\uace8\ud504\ud0d1 \uc790\ub3d9\ub4f1\ub85d \uc2dc\uc791] \ucd1d ${items.length}\uac74 (\uc18d\ub3c4: ${stepPreset}, \uac04\uaca9: ${delayPreset})`);
_0x1005({
title:'\uace8\ud504\ud0d1 \ud64d\ubcf4 \uc790\ub3d9\ub4f1\ub85d',
desc:`\ucd1d ${items.length}\uac74 \ub4f1\ub85d \uc2dc\uc791...`,
current:0,
total:items.length
});
let successCount=0;
for(let i=0;i<items.length;i++){
if(shouldStopRegistration)break;
const item=items[i];
_0x1005({
desc:`[${i+1}/${items.length}] ${item.golf} (${item.date} ${item.time}) \ucc98\ub9ac \uc911...`,
current:i+1,
total:items.length
});
chrome.runtime.sendMessage({
type:'\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x50\x52\x4f\x47\x52\x45\x53\x53',
current:i+1,
total:items.length,
golf:item.golf,
date:item.date,
time:item.time,
fee:item.fee,
regId:item.regId
});
try{
const ok=await _0x1011(item,memo,stepPreset);
if(ok){
successCount++;
console.log(`\u2705 [\uace8\ud504\ud0d1] [${i+1}/${items.length}] ${item.golf} (${item.time}) \ub4f1\ub85d \uc644\ub8cc!`);
chrome.runtime.sendMessage({
type:'\x49\x54\x45\x4d\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x53\x55\x43\x43\x45\x53\x53',
regId:item.regId,
item:item
});
}
}catch(err){
console.error(`[\uace8\ud504\ud0d1] [${i+1}/${items.length}] ${item.golf} \ucc98\ub9ac \uc911 \uc608\uc678 \ubc1c\uc0dd:`,err);
}
if(shouldStopRegistration)break;
if(i<items.length-1){
const cooldown=_0x1001(delayPreset);
await sleep(cooldown);
}
}
isRegistrationRunning=false;
if(shouldStopRegistration){
console.log(`\ud83d\uded1 [\uace8\ud504\ud0d1] \uc790\ub3d9\ub4f1\ub85d \uc911\ub2e8 (\uc131\uacf5: ${successCount}\uac74)`);
_0x1005({desc:`\ud83d\uded1 \ub4f1\ub85d \uc911\ub2e8 (\uc131\uacf5 ${successCount}\uac74)`,isStopped:true});
chrome.runtime.sendMessage({type:'\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x53\x54\x4f\x50\x50\x45\x44',total:items.length,successCount:successCount});
}else{
console.log(`\ud83c\udf89 [\uace8\ud504\ud0d1] \ubaa8\ub4e0 \ub4f1\ub85d \uc644\ub8cc! (\ucd1d \uc131\uacf5: ${successCount}/${items.length}\uac74)`);
_0x1005({desc:`\ud83c\udf89 \ubaa8\ub4e0 \ub4f1\ub85d \uc644\ub8cc! (${successCount}\uac74 \uc131\uacf5)`,isCompleted:true});
chrome.runtime.sendMessage({type:'\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x43\x4f\x4d\x50\x4c\x45\x54\x45\x44',total:items.length,successCount:successCount});
}
setTimeout(_0x1006,4000);
}
chrome.runtime.onMessage.addListener((msg,sender,sendResponse)=>{
if(msg.action==='\x53\x54\x41\x52\x54\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e'){
console.log("[\uace8\ud504\ud0d1] \uc790\ub3d9\ub4f1\ub85d \uc2dc\uc791 \uc694\uccad \uc218\uc2e0\x3a",msg);
shouldStopRegistration=false;
_0x1012(msg.items,msg.memo,msg.delayPreset,msg.stepPreset);
sendResponse({success:true});
return true;
}else if(msg.action==='\x53\x54\x4f\x50\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e'||msg.action==='\x53\x54\x4f\x50\x5f\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e'){
console.log("[\uace8\ud504\ud0d1] \uc790\ub3d9\ub4f1\ub85d \uc911\ub2e8 \uc694\uccad \uc218\uc2e0");
shouldStopRegistration=true;
isRegistrationRunning=false;
_0x1005({desc:'\ud83d\uded1 \uc790\ub3d9\ub4f1\ub85d\uc774 \uc911\ub2e8\ub418\uc5c8\uc2b5\ub2c8\ub2e4\x2e',isStopped:true});
sendResponse({success:true});
return true;
}
});
console.log("[\x54\x65\x65\x38\x32] \uace8\ud504\ud0d1(\x69\x6e\x74\x72\x61\x2e\x67\x6f\x6c\x66\x74\x6f\x70\x2e\x6b\x72) \uc790\ub3d9\ub4f1\ub85d \ucf58\ud150\uce20 \uc2a4\ud06c\ub9bd\ud2b8 \ub85c\ub4dc \uc644\ub8cc (\x56\x65\x72 \x32\x2e\x30\x2e\x32\x30)");
