var _rawLog=console.log;
var _rawWarn=console.warn;
var _rawInfo=console.info;
var _rawDebug=console.debug;
var _rawError=console.error;
var isDebugAdmin=false;
function _0x1000(res){
if(!res)return false;
if(res.v2_isAdmin===true||res.v2_allowF12===true)return true;
var u=res.v2_auth_user;
if(u){
if(u.id==='\x61\x64\x6d\x69\x6e'||u.id==='\x61\x64\x6d\x69\x6e\x69\x73\x74\x72\x61\x74\x6f\x72')return true;
var features=String(u.features||'').toLowerCase();
if(features.includes('\x66\x31\x32')||features.includes('\uac1c\ubc1c\uc790')||features.includes('\ub514\ubc84\uadf8')||features.includes('\uac80\uc0ac')||features.includes('\uc804\uccb4')||features.includes('\x61\x6c\x6c')){
return true;
}
}
return false;
}
try{
chrome.storage.local.get(['\x76\x32\x5f\x69\x73\x41\x64\x6d\x69\x6e','\x76\x32\x5f\x61\x75\x74\x68\x5f\x75\x73\x65\x72','\x76\x32\x5f\x61\x6c\x6c\x6f\x77\x46\x31\x32'],function(res){
if(_0x1000(res)){
isDebugAdmin=true;
}
});
if(chrome.storage&&chrome.storage.onChanged){
chrome.storage.onChanged.addListener(function(changes,areaName){
if(areaName==='\x6c\x6f\x63\x61\x6c'){
chrome.storage.local.get(['\x76\x32\x5f\x69\x73\x41\x64\x6d\x69\x6e','\x76\x32\x5f\x61\x75\x74\x68\x5f\x75\x73\x65\x72','\x76\x32\x5f\x61\x6c\x6c\x6f\x77\x46\x31\x32'],function(res){
isDebugAdmin=_0x1000(res);
if(!isDebugAdmin){
try{console.clear();}catch(e){}
}
});
}
});
}
}catch(e){}
console.log=function(){
if(isDebugAdmin)_rawLog.apply(console,arguments);
};
console.info=function(){
if(isDebugAdmin)_rawInfo.apply(console,arguments);
};
console.debug=function(){
if(isDebugAdmin)_rawDebug.apply(console,arguments);
};
console.warn=function(){
if(isDebugAdmin)_rawWarn.apply(console,arguments);
};
console.error=function(){
if(isDebugAdmin){
_rawError.apply(console,arguments);
}else{
var firstArg=arguments[0];
if(typeof firstArg==='\x73\x74\x72\x69\x6e\x67'&&(firstArg.includes('\uace8\ud504')||firstArg.includes('\ub9e4\ud06c\ub85c')||firstArg.includes('\x54\x65\x65\x38\x32')||firstArg.includes('\uc790\ub3d9')||firstArg.includes('\uc2a4\ub9c8\ud2b8'))){
return;
}
_rawError.apply(console,arguments);
}
};
document.addEventListener('\x6b\x65\x79\x64\x6f\x77\x6e',function(e){
if(isDebugAdmin)return;
if(e.key==='\x46\x31\x32'||e.keyCode===123){
e.preventDefault();
e.stopPropagation();
return false;
}
if(e.ctrlKey&&e.shiftKey&&(['\x49','\x69','\x4a','\x6a','\x43','\x63'].indexOf(e.key)!==-1||[73,74,67].indexOf(e.keyCode)!==-1)){
e.preventDefault();
e.stopPropagation();
return false;
}
if(e.ctrlKey&&(e.key==='\x75'||e.key==='\x55'||e.keyCode===85)){
e.preventDefault();
e.stopPropagation();
return false;
}
},true);
document.addEventListener('\x63\x6f\x6e\x74\x65\x78\x74\x6d\x65\x6e\x75',function(e){
if(isDebugAdmin)return;
var t=e.target;
if(t&&(t.tagName==='\x49\x4e\x50\x55\x54'||t.tagName==='\x54\x45\x58\x54\x41\x52\x45\x41'))return;
e.preventDefault();
return false;
},true);
let isRegistrationRunning=false;
let shouldStopRegistration=false;
let isHandlingNextItem=false;
window.addEventListener('\x6d\x65\x73\x73\x61\x67\x65',async(e)=>{
if(e.data&&e.data.type==='\x5f\x5f\x55\x49\x5f\x44\x49\x41\x4c\x4f\x47\x5f\x4e\x4f\x54\x49\x43\x45\x5f\x5f'){
const alertText=e.data.text||'';
console.log("[\uace8\ud504\ub79c\ub4dc \x41\x6c\x65\x72\x74 \uc218\uc2e0]\x3a",alertText);
if(alertText.includes('\ub4f1\ub85d\ub418\uc5c8\uc2b5\ub2c8\ub2e4')||alertText.includes('\ub4f1\ub85d \uc644\ub8cc')||alertText.includes('\uc131\uacf5')||alertText.includes('\uc644\ub8cc')){
console.log("\ud83c\udf89 [\uace8\ud504\ub79c\ub4dc] '\ub4f1\ub85d\ub418\uc5c8\uc2b5\ub2c8\ub2e4' \uac10\uc9c0! \uc131\uacf5 \ucc98\ub9ac \ubc0f \ub2e4\uc74c \uac74 \uc900\ube44\x2e\x2e\x2e");
await _0x1020('\x64\x69\x61\x6c\x6f\x67\x5f\x6e\x6f\x74\x69\x63\x65');
return;
}
if(alertText.includes('\ucd08\uacfc')||alertText.includes('\uad8c\ud55c')||alertText.includes('\ub85c\uadf8\uc778')||alertText.includes('\uc81c\ud55c')){
shouldStopRegistration=true;
isRegistrationRunning=false;
_0x1002({
desc:`\u26a0\ufe0f ${alertText}`,
isStopped:true
});
try{
await new Promise(r=>chrome.storage.local.set({
golfland_task:null,
isRegistrationRunning:false
},r));
}catch(err){}
chrome.runtime.sendMessage({
type:'\x52\x45\x47\x49\x53\x54\x45\x52\x5f\x53\x54\x4f\x50\x50\x45\x44',
reason:alertText
});
}
}
});
function _0x1001(){
let hud=document.getElementById('\x67\x6c\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x77\x72\x61\x70');
if(hud)return hud;
hud=document.createElement('\x64\x69\x76');
hud.id='\x67\x6c\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x77\x72\x61\x70';
hud.style.cssText=`
        position: fixed !important;
        top: 20px !important;
        right: 20px !important;
        width: 330px !important;
        max-width: 92vw !important;
        background: #ffffff !important;
        border: 2px solid #059669 !important;
        border-radius: 12px !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(5, 150, 105, 0.15) !important;
        z-index: 2147483647 !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', 'Segoe UI', Roboto, sans-serif !important;
        padding: 15px 16px !important;
        box-sizing: border-box !important;
        color: #111827 !important;
        transition: opacity 0.3s ease, transform 0.3s ease !important;
        display: block !important;
    `;
hud.innerHTML=`
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 6px; font-weight: 800; font-size: 13.5px; color: #047857;">
                <span style="font-size: 16px;">\ud83c\udf3f</span>
                <span id="gld_status_panel_title">\uace8\ud504\ub79c\ub4dc \uc790\ub3d9 \ub4f1\ub85d \uc9c4\ud589 \uc911</span>
            </div>
            <span style="background: #D1FAE5; color: #065F46; font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 10px; border: 1px solid #A7F3D0;">LIVE</span>
        </div>
        <div id="gld_status_panel_desc" style="font-size: 12px; color: #4B5563; margin-bottom: 9px; line-height: 1.4; word-break: break-all; min-height: 28px;">
            \uace8\ud504\ub79c\ub4dc \ubd80\ud0b9\ud504\ub77c\uc790 \ud654\uba74\uc744 \uc900\ube44\ud558\uace0 \uc788\uc2b5\ub2c8\ub2e4...
        </div>
        <div style="background: #E5E7EB; border-radius: 10px; height: 9px; overflow: hidden; margin-bottom: 9px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);">
            <div id="gld_status_panel_bar" style="background: linear-gradient(90deg, #10B981, #059669); height: 100%; width: 0%; transition: width 0.35s ease; border-radius: 10px;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div id="gld_status_panel_count" style="font-size: 11.5px; font-weight: 800; color: #059669;">
                0 / 0\uac74 \uc644\ub8cc
            </div>
            <button id="gld_status_panel_stop" style="
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
            ">\ud83d\uded1 \uc911\ub2e8\ud558\uae30</button>
        </div>
    `;
(document.body||document.documentElement).appendChild(hud);
const stopBtn=hud.querySelector('\x23\x67\x6c\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x73\x74\x6f\x70');
if(stopBtn){
stopBtn.addEventListener('\x63\x6c\x69\x63\x6b',async()=>{
console.log("[\uace8\ud504\ub79c\ub4dc \x48\x55\x44] \uc0ac\uc6a9\uc790\uac00 \uc628\uc2a4\ud06c\ub9b0 \ud83d\uded1 \uc911\ub2e8\ud558\uae30 \ud074\ub9ad");
shouldStopRegistration=true;
isRegistrationRunning=false;
try{
await new Promise(r=>chrome.storage.local.set({
golfland_task:null,
isRegistrationRunning:false
},r));
}catch(e){}
chrome.runtime.sendMessage({type:'\x52\x45\x47\x49\x53\x54\x45\x52\x5f\x53\x54\x4f\x50\x50\x45\x44'});
_0x1002({
desc:'\ud83d\uded1 \uc0ac\uc6a9\uc790\uc5d0 \uc758\ud574 \uc790\ub3d9 \ub4f1\ub85d\uc774 \uc911\ub2e8\ub418\uc5c8\uc2b5\ub2c8\ub2e4\x2e',
isStopped:true
});
setTimeout(_0x1003,1800);
});
}
return hud;
}
function _0x1002({title,desc,current,total,isCompleted,isStopped}){
const hud=_0x1001();
if(!hud)return;
if(title){
const titleEl=hud.querySelector('\x23\x67\x6c\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x74\x69\x74\x6c\x65');
if(titleEl)titleEl.innerText=title;
}
if(desc){
const descEl=hud.querySelector('\x23\x67\x6c\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x64\x65\x73\x63');
if(descEl)descEl.innerText=desc;
}
const barEl=hud.querySelector('\x23\x67\x6c\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x62\x61\x72');
const countEl=hud.querySelector('\x23\x67\x6c\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x63\x6f\x75\x6e\x74');
if(total&&total>0){
const cur=current||0;
const pct=Math.min(100,Math.round((cur/total)*100));
if(barEl)barEl.style.width=`${pct}%`;
if(countEl)countEl.innerText=`${cur} / ${total}\uac74 (${pct}%)`;
}
if(isCompleted){
if(barEl)barEl.style.width='\x31\x30\x30%';
const descEl=hud.querySelector('\x23\x67\x6c\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x64\x65\x73\x63');
if(descEl)descEl.innerText=`\ud83c\udf89 \ucd1d ${total||''}\uac74\uc758 \ub4f1\ub85d\uc774 \ubaa8\ub450 \uc644\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4!`;
const countEl=hud.querySelector('\x23\x67\x6c\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x63\x6f\x75\x6e\x74');
if(countEl)countEl.innerText=`${total}/${total}\uac74 \uc644\ub8cc (100%)`;
setTimeout(_0x1003,2600);
}
if(isStopped){
const barEl=hud.querySelector('\x23\x67\x6c\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x62\x61\x72');
if(barEl)barEl.style.background='\x23\x45\x46\x34\x34\x34\x34';
setTimeout(_0x1003,2000);
}
}
function _0x1003(){
const hud=document.getElementById('\x67\x6c\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x77\x72\x61\x70');
if(hud){
hud.style.opacity='\x30';
hud.style.transform='\x74\x72\x61\x6e\x73\x6c\x61\x74\x65\x59(-\x31\x30\x70\x78)';
setTimeout(()=>hud.remove(),300);
}
}
function _0x1004(ms){
return new Promise((resolve)=>{
const start=Date.now();
const interval=setInterval(()=>{
if(shouldStopRegistration||(Date.now()-start>=ms)){
clearInterval(interval);
resolve();
}
},40);
});
}
function _0x1005(actionType='\x6e\x6f\x72\x6d\x61\x6c',stepPreset='\x68\x75\x6d\x61\x6e'){
let minMs=380;
let maxMs=950;
if(stepPreset==='\x73\x6c\x6f\x77'){
minMs=700;maxMs=1500;
}else if(stepPreset==='\x66\x61\x73\x74'){
minMs=180;maxMs=450;
}else if(stepPreset==='\x74\x75\x72\x62\x6f'){
minMs=80;maxMs=180;
}else{
minMs=380;maxMs=950;
}
if(actionType==='\x63\x6f\x75\x72\x73\x65\x5f\x73\x65\x61\x72\x63\x68'||actionType==='\x61\x6a\x61\x78\x5f\x77\x61\x69\x74'){
minMs=Math.round(minMs*1.3);
maxMs=Math.round(maxMs*1.6);
}else if(actionType==='\x62\x65\x66\x6f\x72\x65\x5f\x73\x75\x62\x6d\x69\x74'){
minMs=Math.round(minMs*1.4);
maxMs=Math.round(maxMs*1.7);
}else if(actionType==='\x74\x79\x70\x69\x6e\x67'){
minMs=Math.round(minMs*1.0);
maxMs=Math.round(maxMs*1.2);
}
const rand=(Math.random()+Math.random()+Math.random())/3;
return Math.floor(rand*(maxMs-minMs)+minMs);
}
function _0x1006(preset='\x73\x61\x66\x65'){
let minMs=2000,maxMs=4200;
if(preset==='\x73\x74\x65\x61\x6c\x74\x68'){
minMs=3500;maxMs=7000;
}else if(preset==='\x66\x61\x73\x74'){
minMs=1000;maxMs=2200;
}else if(preset==='\x74\x75\x72\x62\x6f'){
minMs=500;maxMs=1000;
}else{
minMs=2000;maxMs=4200;
}
const rand=(Math.random()+Math.random())/2;
return Math.floor(rand*(maxMs-minMs)+minMs);
}
async function _0x1007(el){
if(!el)return;
try{
el.scrollIntoView({behavior:'\x73\x6d\x6f\x6f\x74\x68',block:'\x63\x65\x6e\x74\x65\x72'});
}catch(e){}
const rect=el.getBoundingClientRect();
const jitterX=(Math.random()-0.5)*(rect.width*0.3||10);
const jitterY=(Math.random()-0.5)*(rect.height*0.3||10);
const x=rect.left+rect.width/2+jitterX;
const y=rect.top+rect.height/2+jitterY;
const opts={bubbles:true,cancelable:true,view:window,clientX:x,clientY:y};
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x65\x6e\x74\x65\x72',opts));
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x6f\x76\x65\x72',opts));
await _0x1004(Math.floor(Math.random()*30+20));
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
await _0x1004(Math.floor(Math.random()*50+40));
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
el.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',opts));
}
async function _0x1008(el,val){
if(!el)return;
try{
el.scrollIntoView({behavior:'\x73\x6d\x6f\x6f\x74\x68',block:'\x63\x65\x6e\x74\x65\x72'});
}catch(e){}
el.focus();
el.value='';
el.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
const str=String(val);
el.value=str;
el.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
el.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
}
async function _0x1009(el,dateStr){
if(!el)return false;
try{
el.scrollIntoView({behavior:'\x73\x6d\x6f\x6f\x74\x68',block:'\x63\x65\x6e\x74\x65\x72'});
}catch(e){}
el.focus();
const isoDate=_0x100c(dateStr);
if(!isoDate)return false;
console.log(`[\uace8\ud504\ub79c\ub4dc] \ub0a0\uc9dc \uc124\uc815 \uc2dc\uc791:`,isoDate,`(\ud0dc\uadf8: ${el.tagName}, type: ${el.type})`);
const isDateType=(el.type==='\x64\x61\x74\x65');
try{
const nativeSetter=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'\x76\x61\x6c\x75\x65')?.set;
if(nativeSetter){
nativeSetter.call(el,isoDate);
}else{
el.value=isoDate;
}
}catch(e){
el.value=isoDate;
}
try{
el.setAttribute('\x76\x61\x6c\x75\x65',isoDate);
el.value=isoDate;
}catch(e){}
if(isDateType){
const parts=isoDate.split('-');
if(parts.length===3){
const y=parseInt(parts[0],10);
const m=parseInt(parts[1],10);
const d=parseInt(parts[2],10);
if(!isNaN(y)&&!isNaN(m)&&!isNaN(d)){
try{
el.valueAsDate=new Date(Date.UTC(y,m-1,d));
}catch(e){}
try{
el.valueAsNumber=Date.UTC(y,m-1,d);
}catch(e){}
}
}
}
if(!isDateType&&el.value!==isoDate){
el.value=isoDate;
}
el.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
el.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
if(typeof el.onchange==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
try{el.onchange();}catch(e){}
}
el.blur();
console.log(`[\uace8\ud504\ub79c\ub4dc] \ub0a0\uc9dc \uc124\uc815 \uc644\ub8cc -> \ucd5c\uc885 \ud544\ub4dc value: '${el.value}'`);
return true;
}
function _0x100a(name){
if(!name)return'';
let clean=String(name).toLowerCase();
clean=clean.replace(/\(.*?\)/g,'').replace(/\[.*?\]/g,'').trim();
clean=clean.replace(/cc|gc|골프장|골프클럽|컨트리클럽/gi,'').trim();
clean=clean.replace(/[\s\-_]/g,'');
return clean;
}
function _0x100b(regStr){
if(!regStr)return'';
const s=String(regStr).trim();
if(s.includes('\ubd81\ubd80'))return'\uacbd\uae30\ubd81\ubd80';
if(s.includes('\ub0a8\ubd80'))return'\uacbd\uae30\ub0a8\ubd80';
if(s.includes('\ub3d9\ubd80'))return'\uacbd\uae30';
if(s.includes('\uc778\ucc9c')||s.includes('\uacbd\uc778'))return'\uc778\ucc9c';
if(s.includes('\uac15\uc6d0'))return'\uac15\uc6d0';
if(s.includes('\ucda9\uccad')||s.includes('\ucda9\ubd81')||s.includes('\ucda9\ub0a8'))return'\ucda9\uccad';
if(s.includes('\uacbd\uc0c1')||s.includes('\uacbd\ubd81')||s.includes('\uacbd\ub0a8'))return'\uacbd\uc0c1';
if(s.includes('\uc804\ub77c')||s.includes('\uc804\ubd81')||s.includes('\uc804\ub0a8'))return'\uc804\ub77c';
if(s.includes('\uc81c\uc8fc'))return'\uc81c\uc8fc';
if(s.includes('\uacbd\uae30'))return'\uacbd\uae30';
return s;
}
function _0x100c(dateStr){
if(!dateStr)return'';
const now=new Date();
const currentYear=now.getFullYear();
const clean=String(dateStr).trim();
const mFull=clean.match(/(\d{4})[./\-](\d{1,2})[./\-](\d{1,2})/);
if(mFull){
return`${mFull[1]}-${String(mFull[2]).padStart(2,'\x30')}-${String(mFull[3]).padStart(2,'\x30')}`;
}
const mKoreanFull=clean.match(/(\d{4})\s*년\s*(\d{1,2})\s*월\s*(\d{1,2})\s*일?/);
if(mKoreanFull){
return`${mKoreanFull[1]}-${String(mKoreanFull[2]).padStart(2,'\x30')}-${String(mKoreanFull[3]).padStart(2,'\x30')}`;
}
const mKoreanShort=clean.match(/(\d{1,2})\s*월\s*(\d{1,2})\s*일?/);
if(mKoreanShort){
return`${currentYear}-${String(mKoreanShort[1]).padStart(2,'\x30')}-${String(mKoreanShort[2]).padStart(2,'\x30')}`;
}
const mShort=clean.match(/(\d{1,2})[./\-](\d{1,2})/);
if(mShort){
return`${currentYear}-${String(mShort[1]).padStart(2,'\x30')}-${String(mShort[2]).padStart(2,'\x30')}`;
}
return clean;
}
function _0x100d(timeStr){
if(!timeStr)return'';
const digits=String(timeStr).replace(/\D/g,'');
if(digits.length>=4){
return digits.substring(0,4);
}else if(digits.length===3){
return'\x30'+digits;
}
return digits.padStart(4,'\x30');
}
function _0x100e(feeStr){
if(!feeStr)return{man:'',isInquiry:true};
const clean=String(feeStr).trim();
if(clean.includes('\ubb38\uc758')||clean==='\x30'){
return{man:'',isInquiry:true};
}
const noComma=clean.replace(/,/g,'');
const numMatch=noComma.match(/([0-9]+(?:\.[0-9]+)?)/);
if(numMatch){
let floatVal=parseFloat(numMatch[1]);
if(!isNaN(floatVal)){
if(floatVal>=500){
floatVal=Math.round((floatVal/10000)*10)/10;
}
return{man:String(floatVal),isInquiry:false};
}
}
return{man:'',isInquiry:true};
}
function _0x100f(r){
if(!r)return'';
if(r.id){
const lbl=document.querySelector(`label[for="${r.id}"]`);
if(lbl&&lbl.textContent.trim())return lbl.textContent.trim();
}
const parentLabel=r.closest('\x6c\x61\x62\x65\x6c');
if(parentLabel&&parentLabel.textContent.trim()){
return parentLabel.textContent.trim();
}
let sib=r.nextSibling;
while(sib){
if(sib.nodeType===3&&sib.textContent.trim()){
return sib.textContent.trim();
}
if(sib.nodeType===1){
if(sib.tagName==='\x4c\x41\x42\x45\x4c'||sib.tagName==='\x53\x50\x41\x4e'){
return sib.textContent.trim();
}
break;
}
sib=sib.nextSibling;
}
if(r.parentElement&&r.parentElement.querySelectorAll('\x69\x6e\x70\x75\x74').length===1){
return r.parentElement.textContent.trim();
}
return(r.value||'').trim();
}
function _0x1010(mode='\x6a\x6f\x69\x6e'){
const isTransfer=(mode==='\x74\x72\x61\x6e\x73\x66\x65\x72');
const targetText=isTransfer?'\uc591\ub3c4 \ub4f1\ub85d':'\uc870\uc778 \ub4f1\ub85d';
const candidates=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x61, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"], \x64\x69\x76, \x73\x70\x61\x6e'));
for(const el of candidates){
const txt=el.textContent.trim();
if(txt===targetText&&el.offsetHeight>0){
return el;
}
}
for(const el of candidates){
const txt=el.textContent.trim();
if(isTransfer){
if(txt.includes('\uc591\ub3c4')&&txt.includes('\ub4f1\ub85d')&&el.offsetHeight>0)return el;
}else{
if(txt.includes('\uc870\uc778')&&txt.includes('\ub4f1\ub85d')&&!txt.includes('\x31\ubc15')&&el.offsetHeight>0)return el;
}
}
return null;
}
function _0x1011(){
const headers=Array.from(document.querySelectorAll('\x68\x31, \x68\x32, \x68\x33, \x68\x34, \x68\x35, \x64\x69\x76, \x73\x70\x61\x6e, \x70'));
for(const el of headers){
if(el.textContent.trim()==='\ub4f1\ub85d\ud558\uae30'&&el.offsetHeight>0){
const modal=el.closest('\x2e\x6d\x6f\x64\x61\x6c, \x2e\x70\x6f\x70\x75\x70, \x2e\x6c\x61\x79\x65\x72, \x2e\x64\x69\x61\x6c\x6f\x67, \x64\x69\x76[\x73\x74\x79\x6c\x65*="\x66\x69\x78\x65\x64"], \x64\x69\x76[\x73\x74\x79\x6c\x65*="\x61\x62\x73\x6f\x6c\x75\x74\x65"], \x64\x69\x76[\x69\x64*="\x72\x65\x67"], \x64\x69\x76[\x69\x64*="\x77\x72\x69\x74\x65"], \x64\x69\x76[\x69\x64*="\x6d\x6f\x64\x61\x6c"], \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x6d\x6f\x64\x61\x6c"]')||el.parentElement?.parentElement;
if(modal&&modal.offsetHeight>100)return modal;
}
}
const allDivs=Array.from(document.querySelectorAll('\x64\x69\x76, \x66\x6f\x72\x6d'));
for(const d of allDivs){
if(d.offsetHeight>150&&d.offsetWidth>250){
const txt=d.textContent||'';
if(txt.includes('\ub4f1\ub85d\ud558\uae30')&&txt.includes('\uace8\ud504\uc7a5')&&txt.includes('\ud2f0\uc5c5\uc77c\uc790')){
return d;
}
}
}
return null;
}
function _0x1012(modal){
if(!modal)return null;
const candidates=Array.from(modal.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x61, \x73\x70\x61\x6e, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"]'));
for(const el of candidates){
const txt=el.textContent.trim();
if(txt==='\ub2eb\uae30'||txt==='\x58'||txt==='\u00d7'||el.getAttribute('\x61\x72\x69\x61-\x6c\x61\x62\x65\x6c')==='\x43\x6c\x6f\x73\x65'||el.classList.contains('\x63\x6c\x6f\x73\x65')){
if(el.offsetHeight>0)return el;
}
}
return null;
}
function _0x1013(modal){
if(!modal)return'';
const txt=modal.textContent||'';
const rows=Array.from(modal.querySelectorAll('\x74\x72, \x2e\x66\x6f\x72\x6d-\x67\x72\x6f\x75\x70, \x64\x69\x76'));
for(const r of rows){
const rTxt=r.textContent.trim();
if(rTxt.startsWith('\uad6c\ubd84')){
if(rTxt.includes('\uc591\ub3c4'))return'\uc591\ub3c4';
if(rTxt.includes('\uc870\uc778'))return'\uc870\uc778';
}
}
if(txt.includes('\ucd08\ub300 \uc778\uc6d0')||txt.includes('\ubd80\ubd80\x2f\ucee4\ud50c'))return'\uc870\uc778';
if(txt.includes('\uc591\ub3c4'))return'\uc591\ub3c4';
return'';
}
function _0x1014(modal){
const scope=modal||document;
const byName=scope.querySelector('\x73\x65\x6c\x65\x63\x74[\x6e\x61\x6d\x65="\x61\x72\x65\x61"], \x73\x65\x6c\x65\x63\x74[\x6e\x61\x6d\x65="\x73\x5f\x61\x72\x65\x61"], \x73\x65\x6c\x65\x63\x74[\x6e\x61\x6d\x65="\x7a\x6f\x6e\x65"], \x73\x65\x6c\x65\x63\x74[\x6e\x61\x6d\x65="\x72\x65\x67\x69\x6f\x6e"], \x73\x65\x6c\x65\x63\x74[\x69\x64="\x61\x72\x65\x61"], \x73\x65\x6c\x65\x63\x74[\x69\x64="\x73\x5f\x61\x72\x65\x61"]');
if(byName)return byName;
const rows=Array.from(scope.querySelectorAll('\x74\x72, \x2e\x66\x6f\x72\x6d-\x67\x72\x6f\x75\x70, \x64\x69\x76'));
for(const r of rows){
const label=r.querySelector('\x74\x68, \x6c\x61\x62\x65\x6c, \x74\x64, \x73\x70\x61\x6e');
if(label&&label.textContent.trim()==='\uc9c0\uc5ed'){
const sel=r.querySelector('\x73\x65\x6c\x65\x63\x74');
if(sel)return sel;
}
}
const allSelects=Array.from(scope.querySelectorAll('\x73\x65\x6c\x65\x63\x74'));
return allSelects[0]||null;
}
function _0x1015(modal){
const scope=modal||document;
const byName=scope.querySelector('\x73\x65\x6c\x65\x63\x74[\x6e\x61\x6d\x65="\x67\x6f\x6c\x66"], \x73\x65\x6c\x65\x63\x74[\x6e\x61\x6d\x65="\x67\x6f\x6c\x66\x5f\x6e\x61\x6d\x65"], \x73\x65\x6c\x65\x63\x74[\x6e\x61\x6d\x65="\x63\x63"], \x73\x65\x6c\x65\x63\x74[\x6e\x61\x6d\x65="\x67\x6f\x6c\x66\x5f\x63\x6f\x64\x65"], \x73\x65\x6c\x65\x63\x74[\x6e\x61\x6d\x65="\x63\x63\x5f\x63\x6f\x64\x65"], \x73\x65\x6c\x65\x63\x74[\x69\x64="\x67\x6f\x6c\x66"], \x73\x65\x6c\x65\x63\x74[\x69\x64="\x67\x6f\x6c\x66\x5f\x6e\x61\x6d\x65"], \x73\x65\x6c\x65\x63\x74[\x69\x64="\x63\x63"]');
if(byName)return byName;
const rows=Array.from(scope.querySelectorAll('\x74\x72, \x2e\x66\x6f\x72\x6d-\x67\x72\x6f\x75\x70, \x64\x69\x76'));
for(const r of rows){
const label=r.querySelector('\x74\x68, \x6c\x61\x62\x65\x6c, \x74\x64, \x73\x70\x61\x6e');
if(label&&label.textContent.trim()==='\uace8\ud504\uc7a5'){
const sel=r.querySelector('\x73\x65\x6c\x65\x63\x74');
if(sel)return sel;
}
}
const allSelects=Array.from(scope.querySelectorAll('\x73\x65\x6c\x65\x63\x74'));
if(allSelects.length>1)return allSelects[1];
return null;
}
function _0x1016(modal){
const scope=modal||document;
const rows=Array.from(scope.querySelectorAll('\x74\x72, \x2e\x66\x6f\x72\x6d-\x67\x72\x6f\x75\x70, \x64\x69\x76'));
for(const r of rows){
const label=r.querySelector('\x74\x68, \x6c\x61\x62\x65\x6c, \x74\x64, \x73\x70\x61\x6e');
if(label&&(label.textContent.includes('\ud2f0\uc5c5\uc77c\uc790')||label.textContent.includes('\uc77c\uc790')||label.textContent.includes('\ub0a0\uc9dc'))&&label.offsetHeight>0){
const inps=Array.from(r.querySelectorAll('\x69\x6e\x70\x75\x74'));
for(const inp of inps){
if(inp.type!=='\x68\x69\x64\x64\x65\x6e'&&inp.offsetHeight>0)return inp;
}
}
}
const byPlaceholder=scope.querySelector('\x69\x6e\x70\x75\x74[\x70\x6c\x61\x63\x65\x68\x6f\x6c\x64\x65\x72*="\ud2f0\uc5c5 \uc77c\uc790"], \x69\x6e\x70\x75\x74[\x70\x6c\x61\x63\x65\x68\x6f\x6c\x64\x65\x72*="\ud2f0\uc5c5\uc77c\uc790"], \x69\x6e\x70\x75\x74[\x70\x6c\x61\x63\x65\x68\x6f\x6c\x64\x65\x72*="\uc77c\uc790 \uc120\ud0dd"]');
if(byPlaceholder&&byPlaceholder.offsetHeight>0)return byPlaceholder;
const byType=Array.from(scope.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x64\x61\x74\x65"]'));
for(const inp of byType){
if(inp.offsetHeight>0)return inp;
}
const byName=Array.from(scope.querySelectorAll('\x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x64\x61\x74\x65"], \x69\x6e\x70\x75\x74[\x69\x64*="\x64\x61\x74\x65"], \x69\x6e\x70\x75\x74[\x70\x6c\x61\x63\x65\x68\x6f\x6c\x64\x65\x72*="\ub0a0\uc9dc"]'));
for(const inp of byName){
if(inp.type!=='\x68\x69\x64\x64\x65\x6e'&&inp.offsetHeight>0)return inp;
}
return scope.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x64\x61\x74\x65"]')||scope.querySelector('\x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x64\x61\x74\x65"]');
}
function _0x1017(modal){
const scope=modal||document;
const byPlaceholder=scope.querySelector('\x69\x6e\x70\x75\x74[\x70\x6c\x61\x63\x65\x68\x6f\x6c\x64\x65\x72*="\x30\x37\x34\x35"], \x69\x6e\x70\x75\x74[\x70\x6c\x61\x63\x65\x68\x6f\x6c\x64\x65\x72*="\uc2dc\ubd84"], \x69\x6e\x70\x75\x74[\x70\x6c\x61\x63\x65\x68\x6f\x6c\x64\x65\x72*="\x34\uc790\ub9ac"]');
if(byPlaceholder)return byPlaceholder;
const byName=scope.querySelector('\x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x74\x69\x6d\x65"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x74\x65\x65\x5f\x74\x69\x6d\x65"], \x69\x6e\x70\x75\x74[\x69\x64*="\x74\x69\x6d\x65"]');
if(byName)return byName;
const rows=Array.from(scope.querySelectorAll('\x74\x72, \x2e\x66\x6f\x72\x6d-\x67\x72\x6f\x75\x70, \x64\x69\x76'));
for(const r of rows){
const label=r.querySelector('\x74\x68, \x6c\x61\x62\x65\x6c, \x74\x64, \x73\x70\x61\x6e');
if(label&&(label.textContent.trim()==='\ud2f0\uc5c5 \uc2dc\uac04'||label.textContent.trim()==='\ud2f0\uc5c5\uc2dc\uac04'||label.textContent.trim()==='\uc2dc\uac04')){
const inp=r.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x6c"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x6e\x75\x6d\x62\x65\x72"], \x69\x6e\x70\x75\x74\x3a\x6e\x6f\x74([\x74\x79\x70\x65])');
if(inp)return inp;
}
}
return null;
}
function _0x1018(modal){
const scope=modal||document;
let feeInput=null;
let inquiryCheckbox=null;
const rows=Array.from(scope.querySelectorAll('\x74\x72, \x2e\x66\x6f\x72\x6d-\x67\x72\x6f\x75\x70, \x64\x69\x76'));
for(const r of rows){
const label=r.querySelector('\x74\x68, \x6c\x61\x62\x65\x6c, \x74\x64, \x73\x70\x61\x6e');
if(label&&(label.textContent.trim()==='\uadf8\ub9b0\ud53c'||label.textContent.trim().includes('\uadf8\ub9b0\ud53c'))){
feeInput=r.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x6e\x75\x6d\x62\x65\x72"], \x69\x6e\x70\x75\x74\x3a\x6e\x6f\x74([\x74\x79\x70\x65])');
const chk=r.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]');
if(chk)inquiryCheckbox=chk;
break;
}
}
if(!feeInput){
feeInput=scope.querySelector('\x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x67\x72\x65\x65\x6e"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x70\x72\x69\x63\x65"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x66\x65\x65"]');
}
if(!inquiryCheckbox){
const allCheckboxes=Array.from(scope.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]'));
inquiryCheckbox=allCheckboxes.find(c=>{
const labelText=_0x100f(c)||c.parentElement?.textContent||'';
return labelText.includes('\uc804\ud654\ubb38\uc758')||labelText.includes('\ubb38\uc758');
});
}
return{feeInput,inquiryCheckbox};
}
function _0x1019(modal){
const scope=modal||document;
let mealCheckbox=null;
let cartCheckbox=null;
const allCheckboxes=Array.from(scope.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]'));
allCheckboxes.forEach(c=>{
const labelText=_0x100f(c)||c.parentElement?.textContent||'';
const name=(c.name||'').toLowerCase();
if(labelText.includes('\uc2dd\uc0ac')||name.includes('\x6d\x65\x61\x6c'))mealCheckbox=c;
if(labelText.includes('\uce74\ud2b8')||name.includes('\x63\x61\x72\x74'))cartCheckbox=c;
});
return{mealCheckbox,cartCheckbox};
}
function _0x101a(modal){
const scope=modal||document;
const inputs=Array.from(scope.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]'));
let hole18=null;
let hole27=null;
let hole36=null;
inputs.forEach(inp=>{
const labelText=_0x100f(inp);
const val=(inp.value||'').trim();
if(labelText.includes('\x31\x38\ud640')||val==='\x31\x38')hole18=inp;
if(labelText.includes('\x32\x37\ud640')||val==='\x32\x37')hole27=inp;
if(labelText.includes('\x33\x36\ud640')||val==='\x33\x36')hole36=inp;
});
return{hole18,hole27,hole36};
}
function _0x101b(modal){
const scope=modal||document;
const inputs=Array.from(scope.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]'));
let cadyNormal=null;
let cadyNo=null;
let cadyIntern=null;
let cadyDriving=null;
inputs.forEach(inp=>{
const labelText=_0x100f(inp);
const name=(inp.name||'').toLowerCase();
const val=(inp.value||'').toLowerCase();
const isCadyRelated=name.includes('\x63\x61\x64')||name.includes('\x63\x61\x64\x64\x79')||labelText.includes('\uce90\ub514');
if(!isCadyRelated&&!labelText.includes('\ub178\uce90\ub514')&&!labelText.includes('\uc6b4\uc804'))return;
if(labelText.includes('\ub178\uce90\ub514')||val==='\ub178\uce90\ub514'){
cadyNo=inp;
}else if(labelText.includes('\uc778\ud134')||val==='\uc778\ud134'){
cadyIntern=inp;
}else if(labelText.includes('\uc6b4\uc804')||labelText.includes('\ub4dc\ub77c\uc774\ube59')||labelText.includes('\ub9c8\uc0ec')){
cadyDriving=inp;
}else if(labelText.includes('\uc77c\ubc18')||labelText.includes('\uce90\ub514')||val==='\x79'||val==='\x31'){
cadyNormal=inp;
}
});
return{cadyNormal,cadyNo,cadyIntern,cadyDriving};
}
function _0x101c(modal){
const scope=modal||document;
let personInput=null;
let optAny=null;
let optMale=null;
let optCouple=null;
let optFemale=null;
const rows=Array.from(scope.querySelectorAll('\x74\x72, \x2e\x66\x6f\x72\x6d-\x67\x72\x6f\x75\x70, \x64\x69\x76'));
for(const r of rows){
const label=r.querySelector('\x74\x68, \x6c\x61\x62\x65\x6c, \x74\x64, \x73\x70\x61\x6e');
if(label&&(label.textContent.trim()==='\ucd08\ub300 \uc778\uc6d0'||label.textContent.trim().includes('\ucd08\ub300\uc778\uc6d0')||label.textContent.trim()==='\uc778\uc6d0')){
personInput=r.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x6e\x75\x6d\x62\x65\x72"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x6c"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"], \x69\x6e\x70\x75\x74\x3a\x6e\x6f\x74([\x74\x79\x70\x65])');
break;
}
}
if(!personInput){
personInput=scope.querySelector('\x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x70\x65\x72\x73\x6f\x6e"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x6d\x65\x6d\x62\x65\x72"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x63\x6f\x75\x6e\x74"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x67\x75\x65\x73\x74"]');
}
const inputs=Array.from(scope.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]'));
inputs.forEach(inp=>{
const labelText=_0x100f(inp);
if(labelText.includes('\ubb34\uad00'))optAny=inp;
if(labelText.includes('\ub0a8\uc790')||labelText.includes('\ub0a8\uc131'))optMale=inp;
if(labelText.includes('\ubd80\ubd80')||labelText.includes('\ucee4\ud50c'))optCouple=inp;
if(labelText.includes('\uc5ec\uc790')||labelText.includes('\uc5ec\uc131'))optFemale=inp;
});
return{personInput,optAny,optMale,optCouple,optFemale};
}
function _0x101d(modal){
const scope=modal||document;
return scope.querySelector('\x74\x65\x78\x74\x61\x72\x65\x61');
}
function _0x101e(modal){
const scope=modal||document;
const candidates=Array.from(scope.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"], \x61\x2e\x62\x74\x6e, \x61'));
for(const btn of candidates){
const txt=(btn.textContent||btn.value||'').trim();
if(txt==='\ub4f1\ub85d'||txt==='\ub4f1\ub85d\ud558\uae30'){
if(btn.offsetHeight>0)return btn;
}
}
return scope.querySelector('\x62\x75\x74\x74\x6f\x6e[\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"]')||scope.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"]');
}
async function _0x101f(item,task){
if(!item)return false;
console.log(`[\uace8\ud504\ub79c\ub4dc \uc790\ub3d9\ub4f1\ub85d] \uc791\uc131 \uc2dc\uc791: [${item.golf}] ${item.date} ${item.time} (${item.fee}\ub9cc / ${item.cady||'\uce90\ub514'})`);
const stepPreset=task.stepPreset||'\x68\x75\x6d\x61\x6e';
const isTransfer=Boolean(task.mode==='\x74\x72\x61\x6e\x73\x66\x65\x72'||item.roomType==='\uc591\ub3c4');
const targetDivision=isTransfer?'\uc591\ub3c4':'\uc870\uc778';
let modal=_0x1011();
if(modal){
const currentDiv=_0x1013(modal);
if(currentDiv&&currentDiv!==targetDivision){
console.log(`[\uace8\ud504\ub79c\ub4dc] \ubaa8\ub2ec \ubaa8\ub4dc \ubd88\uc77c\uce58 (\ud604\uc7ac: ${currentDiv}, \ud544\uc694: ${targetDivision}) -> \ub2eb\uace0 \uc7ac\uc624\ud508`);
const closeBtn=_0x1012(modal);
if(closeBtn)await _0x1007(closeBtn);
await _0x1004(400);
modal=null;
}
}
if(!modal){
const tabBtn=_0x1010(isTransfer?'\x74\x72\x61\x6e\x73\x66\x65\x72':'\x6a\x6f\x69\x6e');
if(tabBtn){
console.log(`[\uace8\ud504\ub79c\ub4dc] '${isTransfer?'\uc591\ub3c4 \ub4f1\ub85d':'\uc870\uc778 \ub4f1\ub85d'}' \ubc84\ud2bc \ud074\ub9ad\ud558\uc5ec \ub4f1\ub85d \ubaa8\ub2ec \uc624\ud508`);
await _0x1007(tabBtn);
await _0x1004(600);
}else{
console.warn("[\uace8\ud504\ub79c\ub4dc] \uc0c1\ub2e8 \uc591\ub3c4\x2f\uc870\uc778 \ub4f1\ub85d \ubc84\ud2bc \ud0d0\uc0c9 \uc2e4\ud328, \ud398\uc774\uc9c0 \ub0b4 \ubaa8\ub2ec \uc9c1\uc811 \uc7ac\ud0d0\uc0c9");
}
let waitModal=0;
while(!modal&&waitModal<10){
await _0x1004(200);
modal=_0x1011();
waitModal++;
}
}
if(!modal){
console.error("\u274c [\uace8\ud504\ub79c\ub4dc] '\ub4f1\ub85d\ud558\uae30' \ubaa8\ub2ec \ucc3d\uc744 \uc5f4 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4\x2e");
return false;
}
_0x1002({
title:isTransfer?'\ud83c\udf3f \uace8\ud504\ub79c\ub4dc \uc591\ub3c4 \ub4f1\ub85d \uc9c4\ud589 \uc911':'\ud83c\udf3f \uace8\ud504\ub79c\ub4dc \uc870\uc778 \ub4f1\ub85d \uc9c4\ud589 \uc911',
desc:`[${task.currentIndex+1}/${task.totalCount}] ${item.golf} (${item.date} ${item.time}) \uc815\ubcf4 \uc785\ub825 \uc911...`
});
const regSelect=_0x1014(modal);
if(regSelect){
const targetRegNorm=_0x100b(item.region);
let matchedIndex=-1;
for(let i=0;i<regSelect.options.length;i++){
const optText=regSelect.options[i].text.trim();
const optNorm=_0x100b(optText);
if(targetRegNorm&&(optNorm===targetRegNorm||optText.includes(targetRegNorm)||targetRegNorm.includes(optNorm))){
matchedIndex=i;
break;
}
}
if(matchedIndex>0){
regSelect.selectedIndex=matchedIndex;
regSelect.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
regSelect.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
if(typeof regSelect.onchange==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
try{regSelect.onchange();}catch(e){}
}
console.log(`[\uace8\ud504\ub79c\ub4dc] \uc9c0\uc5ed \uc120\ud0dd \uc644\ub8cc: ${regSelect.options[matchedIndex].text}`);
await _0x1004(_0x1005('\x61\x6a\x61\x78\x5f\x77\x61\x69\x74',stepPreset));
}
}
const golfSelect=_0x1015(modal);
if(golfSelect){
let waitCount=0;
while(golfSelect.options.length<=1&&waitCount<8){
await _0x1004(250);
waitCount++;
}
const targetGolfNorm=_0x100a(item.golf);
const targetRawNorm=_0x100a(item.rawGolf);
const targetLandNorm=_0x100a(item.golflandGolf);
let matchedGolfIndex=-1;
for(let i=0;i<golfSelect.options.length;i++){
const optText=golfSelect.options[i].text.trim();
const optNorm=_0x100a(optText);
if(!optNorm)continue;
if(optNorm===targetGolfNorm||optNorm===targetRawNorm||optNorm===targetLandNorm){
matchedGolfIndex=i;
break;
}
}
if(matchedGolfIndex<0){
for(let i=0;i<golfSelect.options.length;i++){
const optText=golfSelect.options[i].text.trim();
const optNorm=_0x100a(optText);
if(!optNorm||optNorm.length<2)continue;
if(targetGolfNorm.includes(optNorm)||optNorm.includes(targetGolfNorm)||
(targetRawNorm&&(targetRawNorm.includes(optNorm)||optNorm.includes(targetRawNorm)))||
(targetLandNorm&&(targetLandNorm.includes(optNorm)||optNorm.includes(targetLandNorm)))){
matchedGolfIndex=i;
break;
}
}
}
if(matchedGolfIndex>=0){
golfSelect.selectedIndex=matchedGolfIndex;
golfSelect.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
golfSelect.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
if(typeof golfSelect.onchange==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
try{golfSelect.onchange();}catch(e){}
}
console.log(`[\uace8\ud504\ub79c\ub4dc] \uace8\ud504\uc7a5 \uc120\ud0dd \uc644\ub8cc: ${golfSelect.options[matchedGolfIndex].text}`);
}else{
console.warn(`[\uace8\ud504\ub79c\ub4dc] \uad6c\uc7a5 \ub4dc\ub86d\ub2e4\uc6b4\uc5d0\uc11c '${item.golf}' \ub9e4\uce6d \uc2e4\ud328`);
}
await _0x1004(_0x1005('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
}
const dateInput=_0x1016(modal);
if(dateInput){
const formattedDate=_0x100c(item.date);
await _0x1009(dateInput,formattedDate);
console.log(`[\uace8\ud504\ub79c\ub4dc] \ud2f0\uc5c5\uc77c\uc790 \uc785\ub825 \uc644\ub8cc: ${formattedDate}`);
await _0x1004(_0x1005('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
}else{
console.warn(`[\uace8\ud504\ub79c\ub4dc] \ud2f0\uc5c5\uc77c\uc790 \uc785\ub825 \ud544\ub4dc\ub97c \ucc3e\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4.`);
}
const timeInput=_0x1017(modal);
if(timeInput){
const time4=_0x100d(item.time);
await _0x1008(timeInput,time4);
console.log(`[\uace8\ud504\ub79c\ub4dc] \ud2f0\uc5c5\uc2dc\uac04 \uc785\ub825 \uc644\ub8cc: ${time4}`);
await _0x1004(_0x1005('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
}
const{feeInput,inquiryCheckbox}=_0x1018(modal);
const{man,isInquiry}=_0x100e(item.fee);
if(isInquiry){
if(inquiryCheckbox&&!inquiryCheckbox.checked){
await _0x1007(inquiryCheckbox);
}
console.log("[\uace8\ud504\ub79c\ub4dc] \uadf8\ub9b0\ud53c\x3a \uc804\ud654\ubb38\uc758 \uccb4\ud06c");
}else{
if(inquiryCheckbox&&inquiryCheckbox.checked){
await _0x1007(inquiryCheckbox);
}
if(feeInput){
await _0x1008(feeInput,man);
console.log(`[\uace8\ud504\ub79c\ub4dc] \uadf8\ub9b0\ud53c \uc785\ub825 \uc644\ub8cc: ${man}\ub9cc\uc6d0`);
}
}
await _0x1004(_0x1005('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
const{mealCheckbox,cartCheckbox}=_0x1019(modal);
if(mealCheckbox){
const shouldMeal=!!item.isMeal;
if(mealCheckbox.checked!==shouldMeal){
await _0x1007(mealCheckbox);
}
}
if(cartCheckbox){
const isCartIncluded=!!(item.isCartFree||item.condition?.includes('\uce74\ud3ec')||item.fee?.includes('\uce74\ud3ec'));
if(cartCheckbox.checked!==isCartIncluded){
await _0x1007(cartCheckbox);
}
}
await _0x1004(_0x1005('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
const{hole18,hole27,hole36}=_0x101a(modal);
const is27Hole=item.roomType?.includes('\x32\x37')||item.golf?.includes('\x32\x37\ud640');
const is36Hole=item.roomType?.includes('\x33\x36')||item.golf?.includes('\x33\x36\ud640');
if(is27Hole&&hole27){
await _0x1007(hole27);
}else if(is36Hole&&hole36){
await _0x1007(hole36);
}else if(hole18&&!hole18.checked){
await _0x1007(hole18);
}
await _0x1004(_0x1005('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
const{cadyNormal,cadyNo,cadyIntern,cadyDriving}=_0x101b(modal);
const cadyStr=String(item.cady||'').trim();
if(cadyStr.includes('\ub178\uce90\ub514')){
if(cadyNo){
await _0x1007(cadyNo);
console.log("[\uace8\ud504\ub79c\ub4dc] \uce90\ub514\uc120\ud0dd\x3a \u25b6 \ub178\uce90\ub514 \uc120\ud0dd");
}
}else if(cadyStr.includes('\uc778\ud134')){
if(cadyIntern){
await _0x1007(cadyIntern);
console.log("[\uace8\ud504\ub79c\ub4dc] \uce90\ub514\uc120\ud0dd\x3a \u25b6 \uc778\ud134\uce90\ub514 \uc120\ud0dd");
}
}else if(cadyStr.includes('\uc6b4\uc804')||cadyStr.includes('\ub4dc\ub77c\uc774\ube59')||cadyStr.includes('\ub9c8\uc0ec')){
if(cadyDriving){
await _0x1007(cadyDriving);
console.log("[\uace8\ud504\ub79c\ub4dc] \uce90\ub514\uc120\ud0dd\x3a \u25b6 \uc6b4\uc804\uce90\ub514 \uc120\ud0dd");
}
}else{
if(cadyNormal&&!cadyNormal.checked){
await _0x1007(cadyNormal);
console.log("[\uace8\ud504\ub79c\ub4dc] \uce90\ub514\uc120\ud0dd\x3a \u25b6 \uc77c\ubc18\uce90\ub514 \uc120\ud0dd");
}
}
await _0x1004(_0x1005('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
if(!isTransfer){
const{personInput,optAny,optMale,optCouple,optFemale}=_0x101c(modal);
if(personInput){
let num='\x32';
const m=String(item.sizenum||'').match(/(\d+)/);
if(m)num=m[1];
await _0x1008(personInput,num);
console.log(`[\uace8\ud504\ub79c\ub4dc] \ucd08\ub300 \uc778\uc6d0 \uc785\ub825: ${num}\uba85`);
}
const cond=String(item.condition||'');
if(cond.includes('\ub0a8\uc131')||cond.includes('\ub0a8\uc790')){
if(optMale)await _0x1007(optMale);
}else if(cond.includes('\uc5ec\uc131')||cond.includes('\uc5ec\uc790')){
if(optFemale)await _0x1007(optFemale);
}else if(cond.includes('\ubd80\ubd80')||cond.includes('\ucee4\ud50c')){
if(optCouple)await _0x1007(optCouple);
}else{
if(optAny&&!optAny.checked)await _0x1007(optAny);
}
await _0x1004(_0x1005('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
}
const memoEl=_0x101d(modal);
if(memoEl){
const finalMemo=item.memo||task.memo||'';
await _0x1008(memoEl,finalMemo);
console.log(`[\uace8\ud504\ub79c\ub4dc] \ub4f1\ub85d \ub0b4\uc6a9(\uba54\ubaa8) \uc791\uc131 \uc644\ub8cc (${finalMemo.length}\uc790)`);
await _0x1004(_0x1005('\x62\x65\x66\x6f\x72\x65\x5f\x73\x75\x62\x6d\x69\x74',stepPreset));
}
const submitBtn=_0x101e(modal);
if(submitBtn){
_0x1002({
desc:`[${task.currentIndex+1}/${task.totalCount}] ${item.golf} (${item.date} ${item.time}) \ub4f1\ub85d \uc81c\ucd9c \uc911...`
});
task.status='\x73\x75\x62\x6d\x69\x74\x74\x69\x6e\x67';
try{
await new Promise(r=>chrome.storage.local.set({golfland_task:task},r));
}catch(e){}
console.log("\ud83d\ude80 [\uace8\ud504\ub79c\ub4dc] \ubaa8\ub2ec [\ub4f1\ub85d] \ubc84\ud2bc \ud074\ub9ad \uc2e4\ud589!");
await _0x1007(submitBtn);
setTimeout(async()=>{
const check=await new Promise(r=>chrome.storage.local.get(['\x67\x6f\x6c\x66\x6c\x61\x6e\x64\x5f\x74\x61\x73\x6b'],r));
const curTask=check?.golfland_task;
if(curTask&&curTask.isRunning&&curTask.status==='\x73\x75\x62\x6d\x69\x74\x74\x69\x6e\x67'){
console.log("[\uace8\ud504\ub79c\ub4dc] \ud0c0\uc784\uc544\uc6c3 \ud6c4\uc18d \uccb4\ud06c -> \x61\x64\x76\x61\x6e\x63\x65\x54\x6f\x4e\x65\x78\x74\x49\x74\x65\x6d \uc2e4\ud589");
await _0x1020('\x73\x75\x62\x6d\x69\x74\x5f\x74\x69\x6d\x65\x6f\x75\x74');
}
},3500);
return true;
}else{
console.error("\u274c [\uace8\ud504\ub79c\ub4dc] \ubaa8\ub2ec \ub0b4 [\ub4f1\ub85d] \ubc84\ud2bc\uc744 \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4\x2e");
return false;
}
}
async function _0x1020(trigger='\x75\x6e\x6b\x6e\x6f\x77\x6e'){
if(isHandlingNextItem)return;
isHandlingNextItem=true;
try{
const res=await new Promise(r=>chrome.storage.local.get(['\x67\x6f\x6c\x66\x6c\x61\x6e\x64\x5f\x74\x61\x73\x6b','\x63\x6f\x6d\x70\x6c\x65\x74\x65\x64\x49\x74\x65\x6d\x73'],r));
const task=res?.golfland_task;
if(!task||!task.isRunning)return;
if(task.status==='\x63\x6f\x6f\x6c\x64\x6f\x77\x6e\x5f\x77\x61\x69\x74\x69\x6e\x67'||task.status==='\x6e\x61\x76\x69\x67\x61\x74\x69\x6e\x67'){
return;
}
const curIdx=task.currentIndex||0;
const curItem=task.items?task.items[curIdx]:null;
if(curItem){
console.log(`\u2705 [\uace8\ud504\ub79c\ub4dc] [${curIdx+1}/${task.totalCount}] ${curItem.golf} \ub4f1\ub85d \uc131\uacf5 \ud655\uc778 (${trigger})`);
chrome.runtime.sendMessage({
type:'\x49\x54\x45\x4d\x5f\x52\x45\x47\x49\x53\x54\x45\x52\x5f\x53\x55\x43\x43\x45\x53\x53',
regId:curItem.regId,
item:curItem,
current:curIdx+1,
total:task.totalCount
});
const completedItems=Array.isArray(res.completedItems)?res.completedItems:[];
if(!completedItems.some(it=>it.regId===curItem.regId)){
completedItems.push(curItem);
try{
await new Promise(r=>chrome.storage.local.set({completedItems},r));
}catch(e){}
}
}
const nextIdx=curIdx+1;
task.currentIndex=nextIdx;
if(nextIdx>=task.totalCount){
console.log("\ud83c\udf89 [\uace8\ud504\ub79c\ub4dc] \ubaa8\ub4e0 \ud56d\ubaa9\uc758 \uc790\ub3d9 \ub4f1\ub85d\uc774 \uc644\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4!");
_0x1002({
current:task.totalCount,
total:task.totalCount,
isCompleted:true
});
try{
await new Promise(r=>chrome.storage.local.set({
golfland_task:null,
isRegistrationRunning:false
},r));
}catch(e){}
chrome.runtime.sendMessage({type:'\x41\x4c\x4c\x5f\x52\x45\x47\x49\x53\x54\x45\x52\x5f\x43\x4f\x4d\x50\x4c\x45\x54\x45\x44',total:task.totalCount});
chrome.runtime.sendMessage({type:'\x52\x45\x47\x49\x53\x54\x45\x52\x5f\x43\x4f\x4d\x50\x4c\x45\x54\x45\x44',total:task.totalCount});
const openModal=_0x1011();
if(openModal){
const closeBtn=_0x1012(openModal);
if(closeBtn)await _0x1007(closeBtn);
}
return;
}
task.status='\x63\x6f\x6f\x6c\x64\x6f\x77\x6e\x5f\x77\x61\x69\x74\x69\x6e\x67';
try{
await new Promise(r=>chrome.storage.local.set({golfland_task:task},r));
}catch(e){}
const nextItem=task.items[nextIdx];
const isNextTransfer=Boolean(task.mode==='\x74\x72\x61\x6e\x73\x66\x65\x72'||nextItem.roomType==='\uc591\ub3c4');
const cooldownMs=_0x1006(task.delayPreset||'\x73\x61\x66\x65');
const cooldownSec=(cooldownMs/1000).toFixed(1);
console.log(`[\uace8\ud504\ub79c\ub4dc] \ub2e4\uc74c \ud56d\ubaa9 \uc900\ube44 \uc911 (${nextIdx+1}/${task.totalCount})... ${cooldownSec}\ucd08 \ub300\uae30 \ud6c4 \uc791\uc131`);
_0x1002({
title:isNextTransfer?'\ud83c\udf3f \uace8\ud504\ub79c\ub4dc \uc591\ub3c4 \ub4f1\ub85d \ub300\uae30 \uc911':'\ud83c\udf3f \uace8\ud504\ub79c\ub4dc \uc870\uc778 \ub4f1\ub85d \ub300\uae30 \uc911',
current:nextIdx,
total:task.totalCount,
desc:`\u23f3 \uc0ac\ub78c\ucc98\ub7fc \ub300\uae30 \uc911... [${nextItem.golf}] \uc900\ube44 (${cooldownSec}\ucd08 \uc9c0\uc5f0)`
});
chrome.runtime.sendMessage({
type:'\x52\x45\x47\x49\x53\x54\x45\x52\x5f\x57\x41\x49\x54\x49\x4e\x47',
current:nextIdx,
total:task.totalCount,
waitSec:cooldownSec,
nextGolf:nextItem.golf||''
});
const openModal=_0x1011();
if(openModal){
const closeBtn=_0x1012(openModal);
if(closeBtn)await _0x1007(closeBtn);
}
let leftSec=parseFloat(cooldownSec);
const timer=setInterval(()=>{
leftSec=Math.max(0,leftSec-0.4);
const descEl=document.getElementById('\x67\x6c\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x64\x65\x73\x63');
if(descEl&&!shouldStopRegistration){
descEl.innerText=`\u23f3 \uc0ac\ub78c\ucc98\ub7fc \ub300\uae30 \uc911... [${nextItem.golf}] \uc900\ube44 (${leftSec.toFixed(1)}\ucd08)`;
}
},400);
await _0x1004(cooldownMs);
clearInterval(timer);
if(shouldStopRegistration)return;
task.status='\x70\x65\x6e\x64\x69\x6e\x67';
try{
await new Promise(r=>chrome.storage.local.set({golfland_task:task},r));
}catch(e){}
await _0x1021();
}finally{
isHandlingNextItem=false;
}
}
async function _0x1021(){
try{
const res=await new Promise(r=>chrome.storage.local.get(['\x67\x6f\x6c\x66\x6c\x61\x6e\x64\x5f\x74\x61\x73\x6b'],r));
const task=res?.golfland_task;
if(!task||!task.isRunning||!task.items||task.items.length===0)return;
if(task.currentIndex>=task.totalCount){
await new Promise(r=>chrome.storage.local.set({golfland_task:null,isRegistrationRunning:false},r));
_0x1002({isCompleted:true,total:task.totalCount});
return;
}
isRegistrationRunning=true;
shouldStopRegistration=false;
if(task.status==='\x73\x75\x62\x6d\x69\x74\x74\x69\x6e\x67'){
console.log(`[\uace8\ud504\ub79c\ub4dc] \uc9c1\uc804 \ud0c0\uc784([${task.currentIndex+1}/${task.totalCount}] ${task.items[task.currentIndex]?.golf}) \ub4f1\ub85d \uc644\ub8cc \uac10\uc9c0 -> \ub2e4\uc74c \uac74\uc73c\ub85c \uc9c4\ud589!`);
await _0x1020('\x73\x75\x62\x6d\x69\x74\x74\x69\x6e\x67\x5f\x70\x61\x67\x65\x5f\x6c\x6f\x61\x64');
return;
}
const curItem=task.items[task.currentIndex];
if(!curItem)return;
const isTransfer=Boolean(task.mode==='\x74\x72\x61\x6e\x73\x66\x65\x72'||curItem.roomType==='\uc591\ub3c4');
_0x1001();
_0x1002({
title:isTransfer?'\ud83c\udf3f \uace8\ud504\ub79c\ub4dc \uc591\ub3c4 \ub4f1\ub85d \uc9c4\ud589 \uc911':'\ud83c\udf3f \uace8\ud504\ub79c\ub4dc \uc870\uc778 \ub4f1\ub85d \uc9c4\ud589 \uc911',
desc:`[${task.currentIndex+1}/${task.totalCount}] ${curItem.golf} (${curItem.date} ${curItem.time}) \uc900\ube44 \uc911...`,
current:task.currentIndex,
total:task.totalCount
});
const currentPath=window.location.pathname;
if(!currentPath.includes('\x62\x6f\x6f\x6b\x69\x6e\x67\x4d\x61\x69\x6e\x2e\x70\x68\x70')){
console.log("[\uace8\ud504\ub79c\ub4dc] \ubd80\ud0b9\ud504\ub77c\uc790 \uba54\uc778 \ud398\uc774\uc9c0\ub85c \uc774\ub3d9\x3a",currentPath);
window.location.href='\x68\x74\x74\x70\x3a\x2f\x2f\x67\x6f\x6c\x66\x6c\x61\x6e\x64\x2e\x63\x6f\x2e\x6b\x72\x2f\x77\x65\x62\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x4d\x61\x69\x6e\x2e\x70\x68\x70';
return;
}
task.status='\x66\x69\x6c\x6c\x69\x6e\x67';
try{
await new Promise(r=>chrome.storage.local.set({golfland_task:task},r));
}catch(e){}
await _0x1004(_0x1005('\x6e\x6f\x72\x6d\x61\x6c',task.stepPreset||'\x68\x75\x6d\x61\x6e'));
if(shouldStopRegistration)return;
await _0x101f(curItem,task);
}catch(err){
console.error("[\uace8\ud504\ub79c\ub4dc] \ud0dc\uc2a4\ud06c \uc7ac\uac1c \uc5d0\ub7ec\x3a",err);
}
}
chrome.runtime.onMessage.addListener((msg,sender,sendResponse)=>{
if(msg.isAdmin!==undefined||msg.allowF12!==undefined){
isDebugAdmin=!!msg.isAdmin||!!msg.allowF12;
if(!isDebugAdmin){
try{console.clear();}catch(e){}
}
}
if(msg.action==='\x53\x54\x41\x52\x54\x5f\x47\x4f\x4c\x46\x4c\x41\x4e\x44\x5f\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e'){
console.log("[\uace8\ud504\ub79c\ub4dc] \ub4f1\ub85d \uc2dc\uc791 \uba54\uc2dc\uc9c0 \uc218\uc2e0\x3a",msg);
shouldStopRegistration=false;
isRegistrationRunning=true;
const currentPath=window.location.pathname;
if(!currentPath.includes('\x62\x6f\x6f\x6b\x69\x6e\x67\x4d\x61\x69\x6e\x2e\x70\x68\x70')){
window.location.href='\x68\x74\x74\x70\x3a\x2f\x2f\x67\x6f\x6c\x66\x6c\x61\x6e\x64\x2e\x63\x6f\x2e\x6b\x72\x2f\x77\x65\x62\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x4d\x61\x69\x6e\x2e\x70\x68\x70';
}else{
_0x1021();
}
sendResponse({success:true});
}else if(msg.action==='\x53\x54\x4f\x50\x5f\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e'){
console.log("[\uace8\ud504\ub79c\ub4dc] \ub4f1\ub85d \uc911\ub2e8 \uba54\uc2dc\uc9c0 \uc218\uc2e0");
shouldStopRegistration=true;
isRegistrationRunning=false;
_0x1002({
desc:'\ud83d\uded1 \uc790\ub3d9\ub4f1\ub85d\uc774 \uc911\ub2e8\ub418\uc5c8\uc2b5\ub2c8\ub2e4\x2e',
isStopped:true
});
setTimeout(_0x1003,1500);
sendResponse({success:true});
}
});
if(document.readyState==='\x6c\x6f\x61\x64\x69\x6e\x67'){
document.addEventListener('\x44\x4f\x4d\x43\x6f\x6e\x74\x65\x6e\x74\x4c\x6f\x61\x64\x65\x64',()=>{
setTimeout(_0x1021,500);
});
}else{
setTimeout(_0x1021,500);
}
