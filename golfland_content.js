(function _0x1000(){
function _0x1001(methodName){
try{
var iframe=document.createElement('\x69\x66\x72\x61\x6d\x65');
iframe.style.display='\x6e\x6f\x6e\x65';
(document.head||document.documentElement||document.body).appendChild(iframe);
var cleanFn=iframe.contentWindow.console[methodName];
var boundFn=Function.prototype.bind.call(cleanFn,console);
(document.head||document.documentElement||document.body).removeChild(iframe);
return boundFn;
}catch(e){
var curr=console[methodName];
if(curr&&!curr.__isTeeWrapped){
return Function.prototype.bind.call(curr,console);
}
return function(){};
}
}
if(!window.__golftee82_orig_console){
window.__golftee82_orig_console={
log:_0x1001('\x6c\x6f\x67'),
warn:_0x1001('\x77\x61\x72\x6e'),
info:_0x1001('\x69\x6e\x66\x6f'),
debug:_0x1001('\x64\x65\x62\x75\x67'),
error:_0x1001('\x65\x72\x72\x6f\x72')
};
}
})();
var _rawLog=window.__golftee82_orig_console.log;
var _rawWarn=window.__golftee82_orig_console.warn;
var _rawInfo=window.__golftee82_orig_console.info;
var _rawDebug=window.__golftee82_orig_console.debug;
var _rawError=window.__golftee82_orig_console.error;
window.__golftee82_isDebugAdmin=window.__golftee82_isDebugAdmin||false;
var isDebugAdmin=window.__golftee82_isDebugAdmin;
var _teeInLog=false;
var _teeInWarn=false;
var _teeInInfo=false;
var _teeInDebug=false;
var _teeInError=false;
try{
chrome.storage.local.get(['\x76\x32\x5f\x69\x73\x41\x64\x6d\x69\x6e','\x76\x32\x5f\x61\x75\x74\x68\x5f\x75\x73\x65\x72'],function(res){
if(res&&(res.v2_isAdmin===true||(res.v2_auth_user&&(res.v2_auth_user.id==='\x61\x64\x6d\x69\x6e'||res.v2_auth_user.id==='\x61\x64\x6d\x69\x6e\x69\x73\x74\x72\x61\x74\x6f\x72')))){
isDebugAdmin=true;
window.__golftee82_isDebugAdmin=true;
}
});
if(chrome.storage&&chrome.storage.onChanged&&!window.__golftee82_gld_storage_listener_added){
window.__golftee82_gld_storage_listener_added=true;
chrome.storage.onChanged.addListener(function(changes,areaName){
if(areaName==='\x6c\x6f\x63\x61\x6c'){
if(changes.v2_isAdmin!==undefined){
isDebugAdmin=!!changes.v2_isAdmin.newValue;
window.__golftee82_isDebugAdmin=isDebugAdmin;
if(!isDebugAdmin){
try{console.clear();}catch(e){}
}
}
if(changes.v2_auth_user!==undefined){
var u=changes.v2_auth_user.newValue;
if(u&&(u.id==='\x61\x64\x6d\x69\x6e'||u.id==='\x61\x64\x6d\x69\x6e\x69\x73\x74\x72\x61\x74\x6f\x72')){
isDebugAdmin=true;
window.__golftee82_isDebugAdmin=true;
}else if(!changes.v2_isAdmin||!changes.v2_isAdmin.newValue){
isDebugAdmin=false;
window.__golftee82_isDebugAdmin=false;
try{console.clear();}catch(e){}
}
}
}
});
}
}catch(e){}
if(!window.__golftee82_console_wrapped){
window.__golftee82_console_wrapped=true;
var wrappedLog=function(){
if(_teeInLog)return;
_teeInLog=true;
try{
if(window.__golftee82_isDebugAdmin||isDebugAdmin){
_rawLog.apply(console,arguments);
}
}catch(e){}finally{
_teeInLog=false;
}
};
wrappedLog.__isTeeWrapped=true;
console.log=wrappedLog;
var wrappedInfo=function(){
if(_teeInInfo)return;
_teeInInfo=true;
try{
if(window.__golftee82_isDebugAdmin||isDebugAdmin){
_rawInfo.apply(console,arguments);
}
}catch(e){}finally{
_teeInInfo=false;
}
};
wrappedInfo.__isTeeWrapped=true;
console.info=wrappedInfo;
var wrappedDebug=function(){
if(_teeInDebug)return;
_teeInDebug=true;
try{
if(window.__golftee82_isDebugAdmin||isDebugAdmin){
_rawDebug.apply(console,arguments);
}
}catch(e){}finally{
_teeInDebug=false;
}
};
wrappedDebug.__isTeeWrapped=true;
console.debug=wrappedDebug;
var wrappedWarn=function(){
if(_teeInWarn)return;
_teeInWarn=true;
try{
if(window.__golftee82_isDebugAdmin||isDebugAdmin){
_rawWarn.apply(console,arguments);
}
}catch(e){}finally{
_teeInWarn=false;
}
};
wrappedWarn.__isTeeWrapped=true;
console.warn=wrappedWarn;
var wrappedError=function(){
if(_teeInError)return;
_teeInError=true;
try{
if(window.__golftee82_isDebugAdmin||isDebugAdmin){
_rawError.apply(console,arguments);
}else{
var firstArg=arguments[0];
if(typeof firstArg==='\x73\x74\x72\x69\x6e\x67'&&(firstArg.includes('\uace8\ud504')||firstArg.includes('\ub9e4\ud06c\ub85c')||firstArg.includes('\x54\x65\x65\x38\x32')||firstArg.includes('\uc790\ub3d9')||firstArg.includes('\uc2a4\ub9c8\ud2b8'))){
return;
}
_rawError.apply(console,arguments);
}
}catch(e){}finally{
_teeInError=false;
}
};
wrappedError.__isTeeWrapped=true;
console.error=wrappedError;
}
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
function _0x1002(active){
isRegistrationRunning=Boolean(active);
try{
if(active){
document.documentElement.setAttribute('\x64\x61\x74\x61-\x74\x65\x65\x38\x32-\x61\x63\x74\x69\x76\x65','\x74\x72\x75\x65');
window.postMessage({type:'\x5f\x5f\x53\x45\x54\x5f\x54\x45\x45\x38\x32\x5f\x41\x55\x54\x4f\x5f\x41\x43\x54\x49\x56\x45\x5f\x5f',active:true},'*');
}else{
document.documentElement.removeAttribute('\x64\x61\x74\x61-\x74\x65\x65\x38\x32-\x61\x63\x74\x69\x76\x65');
window.postMessage({type:'\x5f\x5f\x53\x45\x54\x5f\x54\x45\x45\x38\x32\x5f\x41\x55\x54\x4f\x5f\x41\x43\x54\x49\x56\x45\x5f\x5f',active:false},'*');
}
}catch(e){}
}
window.addEventListener('\x6d\x65\x73\x73\x61\x67\x65',async(e)=>{
if(e.data&&e.data.type==='\x5f\x5f\x55\x49\x5f\x44\x49\x41\x4c\x4f\x47\x5f\x4e\x4f\x54\x49\x43\x45\x5f\x5f'){
window.__gldLastDialogAt=Date.now();
const alertText=e.data.text||'';
console.log("[\uace8\ud504\ub79c\ub4dc \x41\x6c\x65\x72\x74 \uc218\uc2e0]\x3a",alertText);
if(alertText.includes('\ub4f1\ub85d\ub418\uc5c8\uc2b5\ub2c8\ub2e4')||alertText.includes('\ub4f1\ub85d \uc644\ub8cc')||alertText.includes('\uc131\uacf5')||alertText.includes('\uc644\ub8cc')){
console.log("\ud83c\udf89 [\uace8\ud504\ub79c\ub4dc] '\ub4f1\ub85d\ub418\uc5c8\uc2b5\ub2c8\ub2e4' \uac10\uc9c0! \uc131\uacf5 \ucc98\ub9ac \ubc0f \ub2e4\uc74c \uac74 \uc900\ube44\x2e\x2e\x2e");
await _0x1034('\x64\x69\x61\x6c\x6f\x67\x5f\x6e\x6f\x74\x69\x63\x65');
return;
}
if(alertText.includes('\ucd08\uacfc')||alertText.includes('\uad8c\ud55c')||alertText.includes('\ub85c\uadf8\uc778')||alertText.includes('\uc81c\ud55c')){
shouldStopRegistration=true;
_0x1002(false);
_0x1004({
desc:`\u26a0\ufe0f ${alertText}`,
isStopped:true
});
try{
await new Promise(r=>chrome.storage.local.set({
golfland_task:null,
golfland_isRegistrationRunning:false
},r));
}catch(err){}
chrome.runtime.sendMessage({
type:'\x47\x4f\x4c\x46\x4c\x41\x4e\x44\x5f\x53\x54\x4f\x50\x50\x45\x44',
reason:alertText
});
}
}
});
function _0x1003(){
let hud=document.getElementById('\x67\x6c\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x77\x72\x61\x70');
if(hud)return hud;
hud=document.createElement('\x64\x69\x76');
hud.id='\x67\x6c\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x77\x72\x61\x70';
hud.style.cssText=`
        position: fixed !important;
        bottom: 24px !important;
        right: 20px !important;
        width: 330px !important;
        max-width: 92vw !important;
        background: #FFFFFF !important;
        border: 1px solid #E2E8F0 !important;
        border-radius: 12px !important;
        box-shadow: 0 18px 40px -16px rgba(15, 23, 42, 0.35) !important;
        z-index: 2147483647 !important;
        font-family: -apple-system, BlinkMacSystemFont, 'Pretendard', 'Segoe UI', Roboto, sans-serif !important;
        padding: 15px 16px !important;
        box-sizing: border-box !important;
        color: #0F172A !important;
        transition: opacity 0.3s ease, transform 0.3s ease !important;
        display: block !important;
    `;
hud.innerHTML=`
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 6px; font-weight: 800; font-size: 13.5px; color: #0F172A;">
                
                <span id="gld_status_panel_title">\uace8\ud504\ub79c\ub4dc \uc790\ub3d9 \ub4f1\ub85d \uc9c4\ud589 \uc911</span>
            </div>
            
        </div>
        <div id="gld_status_panel_desc" style="font-size: 12px; color: #475569; margin-bottom: 9px; line-height: 1.4; word-break: break-all; min-height: 28px;">
            \uace8\ud504\ub79c\ub4dc \ubd80\ud0b9\ud504\ub77c\uc790 \ud654\uba74\uc744 \uc900\ube44\ud558\uace0 \uc788\uc2b5\ub2c8\ub2e4...
        </div>
        <div style="background: #F1F5F9; border-radius: 10px; height: 9px; overflow: hidden; margin-bottom: 9px; box-shadow: none;">
            <div id="gld_status_panel_bar" style="background: linear-gradient(90deg, #10B981, #0EA5E9 60%, #3B82F6); height: 100%; width: 0%; transition: width 0.35s ease; border-radius: 10px;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div id="gld_status_panel_count" style="font-size: 11.5px; font-weight: 800; color: #2F7CF6;">
                0 / 0\uac74 \uc644\ub8cc
            </div>
            <button id="gld_status_panel_stop" style="
                background: #FFFFFF !important;
                color: #DC2626 !important;
                border:  1px solid #FECACA !important;
                padding: 5px 12px !important;
                border-radius: 6px !important;
                font-size: 11px !important;
                font-weight: 700 !important;
                cursor: pointer !important;
                box-shadow: none !important;
                transition: background 0.15s !important;
            ">\uc911\ub2e8</button>
        </div>
    `;
(document.body||document.documentElement).appendChild(hud);
const stopBtn=hud.querySelector('\x23\x67\x6c\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x73\x74\x6f\x70');
if(stopBtn){
stopBtn.addEventListener('\x63\x6c\x69\x63\x6b',async()=>{
console.log("[\uace8\ud504\ub79c\ub4dc \x48\x55\x44] \uc0ac\uc6a9\uc790\uac00 \uc628\uc2a4\ud06c\ub9b0 \uc911\ub2e8 \ud074\ub9ad");
shouldStopRegistration=true;
isRegistrationRunning=false;
try{
await new Promise(r=>chrome.storage.local.set({
golfland_task:null,
golfland_isRegistrationRunning:false
},r));
}catch(e){}
chrome.runtime.sendMessage({type:'\x47\x4f\x4c\x46\x4c\x41\x4e\x44\x5f\x53\x54\x4f\x50\x50\x45\x44'});
_0x1004({
desc:'\ud83d\uded1 \uc0ac\uc6a9\uc790\uc5d0 \uc758\ud574 \uc790\ub3d9 \ub4f1\ub85d\uc774 \uc911\ub2e8\ub418\uc5c8\uc2b5\ub2c8\ub2e4\x2e',
isStopped:true
});
setTimeout(_0x1005,1800);
});
}
return hud;
}
function _0x1004({title,desc,current,total,isCompleted,isStopped}){
const hud=_0x1003();
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
setTimeout(_0x1005,2600);
}
if(isStopped){
const barEl=hud.querySelector('\x23\x67\x6c\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x62\x61\x72');
if(barEl)barEl.style.background='\x23\x45\x46\x34\x34\x34\x34';
setTimeout(_0x1005,2000);
}
}
function _0x1005(){
const hud=document.getElementById('\x67\x6c\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x77\x72\x61\x70');
if(hud){
hud.style.opacity='\x30';
hud.style.transform='\x74\x72\x61\x6e\x73\x6c\x61\x74\x65\x59(-\x31\x30\x70\x78)';
setTimeout(()=>hud.remove(),300);
}
}
function _0x1006(ms){
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
function _0x1007(actionType='\x6e\x6f\x72\x6d\x61\x6c',stepPreset='\x68\x75\x6d\x61\x6e'){
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
function _0x1008(preset='\x73\x61\x66\x65'){
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
async function _0x1009(el){
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
await _0x1006(Math.floor(Math.random()*30+20));
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
await _0x1006(Math.floor(Math.random()*50+40));
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
el.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',opts));
}
async function _0x100a(el,val){
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
async function _0x100b(el,dateStr){
if(!el)return false;
try{
el.scrollIntoView({behavior:'\x73\x6d\x6f\x6f\x74\x68',block:'\x63\x65\x6e\x74\x65\x72'});
}catch(e){}
el.focus();
const isoDate=_0x1014(dateStr);
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
async function _0x100c(dateInput,formattedDate,stepPreset='\x66\x61\x73\x74'){
if(!dateInput)return false;
try{
const parts=(formattedDate||'').split('-');
if(parts.length<3)return false;
const targetYear=parseInt(parts[0],10);
const targetMonth=parseInt(parts[1],10);
const targetDay=parseInt(parts[2],10);
try{
dateInput.scrollIntoView({behavior:'\x73\x6d\x6f\x6f\x74\x68',block:'\x63\x65\x6e\x74\x65\x72'});
}catch(e){}
dateInput.setAttribute('\x64\x61\x74\x61-\x67\x6c\x64-\x74\x61\x72\x67\x65\x74-\x64\x61\x74\x65','\x31');
console.log(`[\uace8\ud504\ub79c\ub4dc] \ud2f0\uc5c5\uc77c\uc790 \uc785\ub825\ucc3d \uc9c1\uc811 \ud074\ub9ad\ud558\uc5ec \ub2ec\ub825 \ud31d\uc5c5 \uc624\ud508: ${formattedDate}`);
try{dateInput.focus();}catch(e){}
await _0x1009(dateInput);
try{dateInput.click();}catch(e){}
let dp=document.getElementById('\x75\x69-\x64\x61\x74\x65\x70\x69\x63\x6b\x65\x72-\x64\x69\x76');
for(let wait=0;wait<15;wait++){
dp=document.getElementById('\x75\x69-\x64\x61\x74\x65\x70\x69\x63\x6b\x65\x72-\x64\x69\x76');
if(dp&&(dp.style.display!=='\x6e\x6f\x6e\x65'||dp.offsetHeight>0||dp.getClientRects().length>0)){
break;
}
await _0x1006(100);
}
if(dp){
for(let nav=0;nav<12;nav++){
const monthHeader=dp.querySelector('\x2e\x75\x69-\x64\x61\x74\x65\x70\x69\x63\x6b\x65\x72-\x6d\x6f\x6e\x74\x68');
const yearHeader=dp.querySelector('\x2e\x75\x69-\x64\x61\x74\x65\x70\x69\x63\x6b\x65\x72-\x79\x65\x61\x72');
const curMonthText=monthHeader?monthHeader.textContent.trim():'';
const curYearText=yearHeader?yearHeader.textContent.trim():'';
const curMonthMatch=curMonthText.match(/(\d+)/);
const curYearMatch=curYearText.match(/(\d+)/);
const curMonth=curMonthMatch?parseInt(curMonthMatch[1],10):(new Date().getMonth()+1);
const curYear=curYearMatch?parseInt(curYearMatch[1],10):new Date().getFullYear();
const curTotalMonths=curYear*12+curMonth;
const targetTotalMonths=targetYear*12+targetMonth;
if(curTotalMonths<targetTotalMonths){
const nextBtn=dp.querySelector('\x2e\x75\x69-\x64\x61\x74\x65\x70\x69\x63\x6b\x65\x72-\x6e\x65\x78\x74');
if(nextBtn){
await _0x1009(nextBtn);
await _0x1006(150);
continue;
}
}else if(curTotalMonths>targetTotalMonths){
const prevBtn=dp.querySelector('\x2e\x75\x69-\x64\x61\x74\x65\x70\x69\x63\x6b\x65\x72-\x70\x72\x65\x76');
if(prevBtn){
await _0x1009(prevBtn);
await _0x1006(150);
continue;
}
}
break;
}
const dayLinks=Array.from(dp.querySelectorAll('\x74\x64\x3a\x6e\x6f\x74(\x2e\x75\x69-\x64\x61\x74\x65\x70\x69\x63\x6b\x65\x72-\x6f\x74\x68\x65\x72-\x6d\x6f\x6e\x74\x68) \x61\x2e\x75\x69-\x73\x74\x61\x74\x65-\x64\x65\x66\x61\x75\x6c\x74, \x74\x64\x3a\x6e\x6f\x74(\x2e\x75\x69-\x64\x61\x74\x65\x70\x69\x63\x6b\x65\x72-\x6f\x74\x68\x65\x72-\x6d\x6f\x6e\x74\x68) \x61'));
const targetLink=dayLinks.find(a=>parseInt(a.textContent.trim(),10)===targetDay);
if(targetLink){
console.log(`[\uace8\ud504\ub79c\ub4dc] \ub2ec\ub825 \ud31d\uc5c5\uc5d0\uc11c ${targetDay}\uc77c \uc9c1\uc811 \ud074\ub9ad!`);
await _0x1009(targetLink);
try{targetLink.click();}catch(e){}
await _0x1006(200);
}else{
console.warn(`[\uace8\ud504\ub79c\ub4dc] \ub2ec\ub825 \ud31d\uc5c5\uc5d0\uc11c ${targetDay}\uc77c \ub9c1\ud06c\ub97c \ucc3e\uc9c0 \ubabb\ud568 (\ud3f4\ubc31 \uc801\uc6a9)`);
}
}
window.postMessage({
type:'\x5f\x5f\x47\x4f\x4c\x46\x4c\x41\x4e\x44\x5f\x53\x45\x54\x5f\x44\x41\x54\x45\x5f\x5f',
date:formattedDate,
selector:'[\x64\x61\x74\x61-\x67\x6c\x64-\x74\x61\x72\x67\x65\x74-\x64\x61\x74\x65="\x31"]'
},'*');
await _0x1006(150);
await _0x100b(dateInput,formattedDate);
if(dp&&(dp.style.display!=='\x6e\x6f\x6e\x65'||dp.offsetHeight>0)){
const closeBtn=dp.querySelector('\x2e\x75\x69-\x64\x61\x74\x65\x70\x69\x63\x6b\x65\x72-\x63\x6c\x6f\x73\x65, \x62\x75\x74\x74\x6f\x6e\x2e\x75\x69-\x64\x61\x74\x65\x70\x69\x63\x6b\x65\x72-\x63\x6c\x6f\x73\x65');
if(closeBtn){
await _0x1009(closeBtn);
}else{
dp.style.display='\x6e\x6f\x6e\x65';
}
}
}catch(err){
console.error("[\uace8\ud504\ub79c\ub4dc] \ub0a0\uc9dc \uc120\ud0dd \uc911 \uc624\ub958 \ubc1c\uc0dd (\uc9c4\ud589 \uc720\uc9c0)\x3a",err);
}
return true;
}
async function _0x100d(inp,value){
if(!inp)return false;
try{inp.scrollIntoView({behavior:'\x73\x6d\x6f\x6f\x74\x68',block:'\x63\x65\x6e\x74\x65\x72'});}catch(e){}
inp.focus();
const strVal=String(value);
try{
const proto=inp.tagName==='\x54\x45\x58\x54\x41\x52\x45\x41'?window.HTMLTextAreaElement.prototype:window.HTMLInputElement.prototype;
const nativeSetter=Object.getOwnPropertyDescriptor(proto,'\x76\x61\x6c\x75\x65')?.set;
if(nativeSetter){
nativeSetter.call(inp,strVal);
}else{
inp.value=strVal;
}
}catch(e){
inp.value=strVal;
}
await _0x100a(inp,strVal);
if(inp.value!==strVal){
inp.value=strVal;
}
inp.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
inp.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
inp.blur();
return true;
}
function _0x100e(modal){
const scope=modal||document;
return Array.from(scope.querySelectorAll('\x69\x6e\x70\x75\x74')).filter(inp=>_0x101c(inp)&&_0x101b(inp));
}
function _0x100f(name){
const s=String(name==null?'':name).toLowerCase().replace(/[\s·]+/g,'');
if(!s)return'';
const tail=(idx,len)=>s.slice(idx,idx+14).replace(/^(?:cc|gc)/,'').replace(/^[\(\[\-_\/.,]+/,'');
let m=s.match(/클럽72|club72/);
if(m){
const w=tail(m.index+m[0].length);
if(/^(?:오션|ocean|오(?=[.…)\]]|$))/.test(w))return'\x43\x37\x32\x3a\x4f\x43\x45\x41\x4e';
if(/^(?:하늘|sky|하(?=[.…)\]]|$))/.test(w))return'\x43\x37\x32\x3a\x53\x4b\x59';
return'\x43\x37\x32\x3a\x4c\x43';
}
if(/클오/.test(s))return'\x43\x37\x32\x3a\x4f\x43\x45\x41\x4e';
if(/클하/.test(s))return'\x43\x37\x32\x3a\x53\x4b\x59';
m=s.match(/떼제베/);
if(m){
const w=tail(m.index+m[0].length);
if(/^(?:동북|한울|마루|동(?=[.…)\]]|$)|한(?=[.…)\]]|$))/.test(w))return'\x54\x4a\x42\x3a\x4e\x45';
return'\x54\x4a\x42\x3a\x53\x57';
}
m=s.match(/비에이비스타?|bavista/);
if(m){
const w=tail(m.index+m[0].length).replace(/^(?:골프장|골프클럽)/,'').replace(/^[\(\[\-_\/.,]+/,'');
return/^(?:p\d*(?![a-z])|퍼블릭|대중제|public)/.test(w)?'\x42\x41\x3a\x50':'\x42\x41\x3a\x4d';
}
m=s.match(/알펜시아|알펜/);
if(m){
const w=tail(m.index+m[0].length);
return/^700/.test(w)?'\x41\x4c\x50\x3a\x37\x30\x30':'\x41\x4c\x50\x3a\x4d\x4d';
}
return'';
}
function _0x1010(a,b,skipBA){
const fa=_0x100f(a),fb=_0x100f(b);
if(!fa||!fb)return false;
const ga=fa.split('\x3a')[0],gb=fb.split('\x3a')[0];
if(ga!==gb)return false;
if(skipBA&&ga==='\x42\x41')return false;
return fa!==fb;
}
function _0x1011(optionTexts,targets,skipBA){
let tf='';
for(const t of(targets||[])){const f=_0x100f(t);if(f){tf=f;break;}}
if(!tf||(skipBA&&tf.startsWith('\x42\x41\x3a')))return[];
const out=[];
(optionTexts||[]).forEach((o,i)=>{if(_0x100f(o)===tf)out.push(i);});
return out;
}
function _0x1012(name){
if(!name)return'';
let clean=String(name).toLowerCase();
clean=clean.replace(/\(.*?\)/g,'').replace(/\[.*?\]/g,'').trim();
clean=clean.replace(/cc|gc|골프장|골프클럽|컨트리클럽/gi,'').trim();
clean=clean.replace(/[\s\-_]/g,'');
return clean;
}
function _0x1013(regStr){
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
function _0x1014(dateStr){
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
function _0x1015(timeStr){
if(!timeStr)return'';
const digits=String(timeStr).replace(/\D/g,'');
if(digits.length>=4){
return digits.substring(0,4);
}else if(digits.length===3){
return'\x30'+digits;
}
return digits.padStart(4,'\x30');
}
function _0x1016(waitPax,waitGender,condition,fullText){
const raw=`${waitGender||''} ${condition||''} ${fullText||''}`;
const clean=raw.replace(/\s+/g,'');
let pax=(typeof waitPax==='\x6e\x75\x6d\x62\x65\x72'&&!isNaN(waitPax))?waitPax:null;
if(pax===null||pax===0){
const m=clean.match(/대기(?:중)?[:\s]?(\d+)인?/)||clean.match(/(\d+)인대기/);
if(m)pax=parseInt(m[1],10);
}
if(clean.includes('\ub0a8\uc5ec\x2f\ub0a8')||clean.includes('\ub0a8\ub0a8\uc5ec')||clean.includes('\uc5ec\uc5ec\ub0a8')||clean.includes('\ub0a8\x2f\ub0a8\uc5ec')||clean.includes('\ub0a8\uc5ec\x2f\uc5ec')||clean.includes('\uc5ec\x2f\ub0a8\uc5ec')||clean.includes('\ub0a8\uc5ec\ub0a8')||clean.includes('\uc5ec\ub0a8\ub0a8')||clean.includes('\ub0a8\uc5ec,\ub0a8')||clean.includes('\ub0a8\uc5ec+\ub0a8')){
return'\ubb34\uad00';
}
if(pax!==null&&pax!==2){
return'\ubb34\uad00';
}
if(clean.includes('\uc5ec\uc790\x32')||clean.includes('\uc5ec\uc131\x32')||clean.includes('\uc5ec\x32')||clean.includes('\uc5ec\uc5ec')||clean.includes('\x32\uc778(\uc5ec\uc5ec)')||clean.includes('\x32\uc778(\uc5ec)')){
return'\ub0a8\uc790';
}
if(clean.includes('\ub0a8\uc790\x32')||clean.includes('\ub0a8\uc131\x32')||clean.includes('\ub0a8\x32')||clean.includes('\ub0a8\ub0a8')||clean.includes('\x32\uc778(\ub0a8\ub0a8)')||clean.includes('\x32\uc778(\ub0a8)')){
return'\ubb34\uad00';
}
if(clean.includes('\x32\uc778(\ub0a8\uc5ec)')||clean.includes('\x32\uc778(\uc5ec\ub0a8)')||clean.includes('\ub300\uae30\uc911\x3a\x32[\ub0a8\uc5ec]')||clean.includes('\ub300\uae30\x3a\x32[\ub0a8\uc5ec]')||clean.includes('\ubd80\ubd80')||clean.includes('\ucee4\ud50c')){
return'\ubd80\ubd80\x2f\ucee4\ud50c';
}
if((clean.includes('\ub0a8\uc5ec')||clean.includes('\uc5ec\ub0a8')||clean.includes('\ud63c\uc131'))&&(pax===2||clean.includes('\x32\uc778')||clean.includes('\x32\uba85'))){
return'\ubd80\ubd80\x2f\ucee4\ud50c';
}
return'\ubb34\uad00';
}
function _0x1017(feeStr){
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
function _0x1018(r){
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
function _0x1019(isTransfer){
return _0x101a(isTransfer?'\x74\x72\x61\x6e\x73\x66\x65\x72':'\x6a\x6f\x69\x6e');
}
function _0x101a(mode='\x6a\x6f\x69\x6e'){
const isTransfer=(mode==='\x74\x72\x61\x6e\x73\x66\x65\x72');
const isMatchingTabEl=(el)=>{
if(!el||!_0x101b(el))return false;
if(el.closest('\x23\x67\x6c\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x77\x72\x61\x70, \x23\x67\x74\x70\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c, \x23\x67\x6d\x5f\x68\x75\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c, \x2e\x6a\x50\x6f\x70\x75\x70\x41\x72\x65\x61, \x2e\x6a\x50\x6f\x70\x75\x70'))return false;
const txt=(el.textContent||el.value||'').replace(/\s+/g,'');
if(isTransfer)return txt==='\uc591\ub3c4\ub4f1\ub85d'||(txt.includes('\uc591\ub3c4')&&txt.includes('\ub4f1\ub85d')&&txt.length<=8);
return txt==='\uc870\uc778\ub4f1\ub85d'||(txt.includes('\uc870\uc778')&&txt.includes('\ub4f1\ub85d')&&!txt.includes('\x31\ubc15')&&txt.length<=8);
};
const primarySel=isTransfer
?'\x2e\x77\x72\x69\x74\x65\x42\x6f\x6f\x6b\x69\x6e\x67\x2e\x62\x74\x6e-\x74\x72\x61\x6e\x73\x66\x65\x72, \x70\x2e\x77\x72\x69\x74\x65\x42\x6f\x6f\x6b\x69\x6e\x67[\x73\x65\x71="\x31"], \x2e\x66\x69\x6c\x74\x65\x72\x5f\x62\x74\x6e\x5f\x77\x72\x61\x70 \x2e\x62\x74\x6e-\x74\x72\x61\x6e\x73\x66\x65\x72, \x2e\x62\x74\x6e-\x66\x69\x6c\x74\x65\x72-\x77\x72\x61\x70 \x2e\x62\x74\x6e-\x74\x72\x61\x6e\x73\x66\x65\x72'
:'\x2e\x77\x72\x69\x74\x65\x42\x6f\x6f\x6b\x69\x6e\x67\x2e\x62\x74\x6e-\x6a\x6f\x69\x6e, \x70\x2e\x77\x72\x69\x74\x65\x42\x6f\x6f\x6b\x69\x6e\x67[\x73\x65\x71="\x32"], \x2e\x66\x69\x6c\x74\x65\x72\x5f\x62\x74\x6e\x5f\x77\x72\x61\x70 \x2e\x62\x74\x6e-\x6a\x6f\x69\x6e, \x2e\x62\x74\x6e-\x66\x69\x6c\x74\x65\x72-\x77\x72\x61\x70 \x2e\x62\x74\x6e-\x6a\x6f\x69\x6e';
const primaryMatch=Array.from(document.querySelectorAll(primarySel)).find(isMatchingTabEl);
if(primaryMatch)return primaryMatch;
const container=document.querySelector('\x2e\x62\x74\x6e-\x66\x69\x6c\x74\x65\x72-\x77\x72\x61\x70, \x2e\x66\x69\x6c\x74\x65\x72\x5f\x62\x74\x6e\x5f\x77\x72\x61\x70, \x2e\x62\x6f\x6f\x6b\x69\x6e\x67\x5f\x62\x74\x6e\x5f\x77\x72\x61\x70');
if(container){
const innerMatch=Array.from(container.querySelectorAll('\x70, \x62\x75\x74\x74\x6f\x6e, \x61, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"], \x6c\x69, \x73\x70\x61\x6e, \x64\x69\x76'))
.filter(el=>el.children.length<=2)
.find(isMatchingTabEl);
if(innerMatch)return innerMatch;
}
const preferredTags=Array.from(document.querySelectorAll('\x70, \x62\x75\x74\x74\x6f\x6e, \x61, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"], \x6c\x69'));
const tagMatch=preferredTags.find(el=>el.children.length<=2&&isMatchingTabEl(el));
if(tagMatch)return tagMatch;
const fallbackTags=Array.from(document.querySelectorAll('\x73\x70\x61\x6e, \x64\x69\x76'));
const fbMatch=fallbackTags.find(el=>el.children.length<=1&&isMatchingTabEl(el));
return fbMatch||null;
}
function _0x101b(el){
if(!el||!el.isConnected)return false;
if(el.getClientRects().length===0)return false;
const st=window.getComputedStyle(el);
if(st.visibility==='\x68\x69\x64\x64\x65\x6e'||st.display==='\x6e\x6f\x6e\x65')return false;
return true;
}
function _0x101c(el){
if(!el||el.tagName!=='\x49\x4e\x50\x55\x54')return false;
const val=(el.value||'').trim();
if(val==='\ub4f1\ub85d'||val==='\ub2eb\uae30'||val==='\ucde8\uc18c')return false;
const type=(el.getAttribute('\x74\x79\x70\x65')||el.type||'\x74\x65\x78\x74').toLowerCase();
const bad=['\x63\x68\x65\x63\x6b\x62\x6f\x78','\x72\x61\x64\x69\x6f','\x68\x69\x64\x64\x65\x6e','\x73\x75\x62\x6d\x69\x74','\x62\x75\x74\x74\x6f\x6e','\x72\x65\x73\x65\x74','\x66\x69\x6c\x65','\x69\x6d\x61\x67\x65'];
if(bad.includes(type))return false;
return['\x74\x65\x78\x74','\x6e\x75\x6d\x62\x65\x72','\x74\x65\x6c','\x73\x65\x61\x72\x63\x68',''].includes(type);
}
function _0x101d(el){
if(!el||!_0x101b(el))return false;
if(el.tagName==='\x54\x45\x58\x54\x41\x52\x45\x41')return true;
return _0x101c(el);
}
function _0x101e(s){
return String(s||'').replace(/[\s:*·]/g,'');
}
function _0x101f(labelVariants,root){
const targets=labelVariants.map(_0x101e);
const scope=root||document.body;
const found=[];
const walker=document.createTreeWalker(scope,NodeFilter.SHOW_TEXT,null);
let node;
while((node=walker.nextNode())){
const t=_0x101e(node.nodeValue);
if(!t||t.length>12)continue;
if(!targets.includes(t))continue;
const parent=node.parentElement;
if(!parent||['\x53\x43\x52\x49\x50\x54','\x53\x54\x59\x4c\x45','\x4f\x50\x54\x49\x4f\x4e','\x54\x45\x58\x54\x41\x52\x45\x41'].includes(parent.tagName))continue;
if(!_0x101b(parent))continue;
found.push(node);
}
return found;
}
function _0x1020(labelVariants,modal,excludes=[]){
const labelNodes=_0x101f(labelVariants,document.body);
if(labelNodes.length===0)return null;
labelNodes.sort((a,b)=>{
const ia=modal&&modal.contains(a)?0:1;
const ib=modal&&modal.contains(b)?0:1;
return ia-ib;
});
const visibleInputs=Array.from(document.querySelectorAll('\x69\x6e\x70\x75\x74'))
.filter(inp=>_0x101c(inp)&&_0x101b(inp)&&!excludes.includes(inp));
for(const lbl of labelNodes){
for(const inp of visibleInputs){
if(lbl.compareDocumentPosition(inp)&Node.DOCUMENT_POSITION_FOLLOWING){
return inp;
}
}
}
return null;
}
function _0x1021(el){
if(!el||!_0x101b(el)||el===document.body||el===document.documentElement)return false;
if(el.closest('\x23\x67\x6c\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x77\x72\x61\x70, \x23\x67\x74\x70\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c, \x23\x67\x6d\x5f\x68\x75\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c'))return false;
if(el.querySelector('\x2e\x77\x72\x69\x74\x65\x42\x6f\x6f\x6b\x69\x6e\x67'))return false;
const txt=el.textContent||'';
if(
txt.includes('\ub0b4\uac00 \uc4f4 \uae00')||
txt.includes('\uc870\uc778 \x31\ubc15 \x32\uc77c')||
txt.includes('\uc870\ud68c\uc218')||
txt.includes('\uad6c\ubd84 \uc804\uccb4')||
txt.includes('\uc9c0\uc5ed \uc804\uccb4')||
txt.includes('\uace8\ud504\uc7a5 \uc804\uccb4')
){
return false;
}
const hasCloseBtn=txt.includes('\ub2eb\uae30')||Array.from(el.querySelectorAll('\x69\x6e\x70\x75\x74, \x62\x75\x74\x74\x6f\x6e, \x61, \x73\x70\x61\x6e, \x64\x69\x76')).some(b=>{
if(!_0x101b(b))return false;
const v=(b.value||b.textContent||'').trim();
return v==='\ub2eb\uae30'||v==='\u00d7'||v==='\x58';
});
const hasTeeFields=(txt.includes('\uadf8\ub9b0\ud53c'))&&(txt.includes('\ud2f0\uc5c5\uc77c\uc790')||txt.includes('\ud2f0\uc5c5 \uc77c\uc790')||txt.includes('\ud2f0\uc5c5 \uc2dc\uac04')||txt.includes('\ud2f0\uc5c5\uc2dc\uac04'));
const hasModalMeta=txt.includes('\ub4f1\ub85d\ud558\uae30')||txt.includes('\ub4f1\ub85d\uc790')||txt.includes('\ud734\ub300\ud3f0')||txt.includes('\ud3ec\ud568\uc0ac\ud56d');
if(!hasCloseBtn||!hasTeeFields||!hasModalMeta)return false;
const hasVisibleField=Array.from(el.querySelectorAll('\x73\x65\x6c\x65\x63\x74, \x69\x6e\x70\x75\x74')).some(_0x101b);
return hasVisibleField;
}
function _0x1022(){
const popupAreas=Array.from(document.querySelectorAll('\x2e\x6a\x50\x6f\x70\x75\x70\x41\x72\x65\x61, \x2e\x6a\x50\x6f\x70\x75\x70, \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x50\x6f\x70\x75\x70"], \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x70\x6f\x70\x75\x70"], \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x6d\x6f\x64\x61\x6c"], \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x6c\x61\x79\x65\x72"]'));
for(const pop of popupAreas){
if(_0x1021(pop))return pop;
}
const headers=Array.from(document.querySelectorAll('\x68\x31, \x68\x32, \x68\x33, \x68\x34, \x68\x35, \x64\x69\x76, \x73\x70\x61\x6e, \x70, \x74\x68, \x74\x64, \x62, \x73\x74\x72\x6f\x6e\x67'))
.filter(el=>(el.textContent.trim().startsWith('\ub4f1\ub85d\ud558\uae30')||el.textContent.trim()==='\ub4f1\ub85d\ud558\uae30')&&_0x101b(el)&&el.children.length<=2);
for(const el of headers){
let curr=el.parentElement;
for(let i=0;i<15&&curr&&curr!==document.body;i++){
if(_0x1021(curr))return curr;
curr=curr.parentElement;
}
}
const focusAreas=Array.from(document.querySelectorAll('\x2e\x66\x6f\x63\x75\x73\x41\x72\x65\x61, \x2e\x66\x6f\x63\x75\x73\x41\x72\x65\x61\x32, \x2e\x66\x6f\x63\x75\x73\x41\x72\x65\x61\x33, \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x66\x6f\x63\x75\x73\x41\x72\x65\x61"]'))
.filter(_0x101b);
for(const f of focusAreas){
let curr=f.parentElement;
for(let i=0;i<15&&curr&&curr!==document.body;i++){
if(_0x1021(curr))return curr;
curr=curr.parentElement;
}
}
const visibleSelects=Array.from(document.querySelectorAll('\x73\x65\x6c\x65\x63\x74')).filter(_0x101b);
for(const sel of visibleSelects){
let curr=sel.parentElement;
for(let i=0;i<12&&curr&&curr!==document.body&&curr!==document.documentElement;i++){
if(_0x1021(curr))return curr;
curr=curr.parentElement;
}
}
const greenFeeLabels=Array.from(document.querySelectorAll('\x74\x68, \x74\x64, \x6c\x61\x62\x65\x6c, \x64\x74, \x73\x70\x61\x6e, \x70, \x64\x69\x76'))
.filter(el=>_0x101e(el.textContent)==='\uadf8\ub9b0\ud53c'&&_0x101b(el)&&el.children.length===0);
for(const lbl of greenFeeLabels){
let curr=lbl.parentElement;
for(let i=0;i<15&&curr&&curr!==document.body;i++){
if(_0x1021(curr))return curr;
curr=curr.parentElement;
}
}
const allTextareas=Array.from(document.querySelectorAll('\x74\x65\x78\x74\x61\x72\x65\x61')).filter(_0x101b);
for(const ta of allTextareas){
let curr=ta.parentElement;
for(let i=0;i<15&&curr&&curr!==document.body;i++){
if(_0x1021(curr))return curr;
curr=curr.parentElement;
}
}
return null;
}
function _0x1023(modal){
if(!modal)return null;
const candidates=Array.from(modal.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x61, \x73\x70\x61\x6e, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"], \x69\x6e\x70\x75\x74, \x64\x69\x76'));
for(const el of candidates){
if(!_0x101b(el))continue;
const txt=(el.tagName==='\x49\x4e\x50\x55\x54'?(el.value||''):(el.textContent||'')).replace(/\s+/g,'');
if(txt==='\ub2eb\uae30')return el;
}
for(const el of candidates){
if(!_0x101b(el))continue;
const txt=(el.textContent||'').trim();
if(txt==='\x58'||txt==='\u00d7'||txt==='\x78'||el.getAttribute('\x61\x72\x69\x61-\x6c\x61\x62\x65\x6c')==='\x43\x6c\x6f\x73\x65'||el.classList.contains('\x63\x6c\x6f\x73\x65')||el.classList.contains('\x62\x74\x6e\x5f\x63\x6c\x6f\x73\x65')){
return el;
}
}
return null;
}
function _0x1024(){
const allDivs=Array.from(document.querySelectorAll('\x2e\x6a\x50\x6f\x70\x75\x70, \x2e\x6a\x50\x6f\x70\x75\x70\x41\x72\x65\x61, \x2e\x6c\x61\x79\x65\x72\x5f\x70\x6f\x70\x75\x70, \x2e\x70\x6f\x70\x75\x70, \x64\x69\x76[\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"], \x64\x69\x76[\x69\x64*="\x70\x6f\x70\x75\x70"], \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x70\x6f\x70\x75\x70"], \x64\x69\x76[\x73\x74\x79\x6c\x65*="\x7a-\x69\x6e\x64\x65\x78"]'));
const candidates=allDivs.length>0?allDivs:Array.from(document.querySelectorAll('\x64\x69\x76, \x70, \x73\x65\x63\x74\x69\x6f\x6e'));
for(const el of candidates){
if(!_0x101b(el))continue;
if(el.querySelector('\x73\x65\x6c\x65\x63\x74, \x69\x6e\x70\x75\x74[\x70\x6c\x61\x63\x65\x68\x6f\x6c\x64\x65\x72*="\ud2f0\uc5c5"]'))continue;
const txt=(el.innerText||el.textContent||'').trim();
if(txt.includes('\ub4f1\ub85d \ub418\uc5c8\uc2b5\ub2c8\ub2e4')||txt.includes('\ub4f1\ub85d\ub418\uc5c8\uc2b5\ub2c8\ub2e4')||txt.includes('\ub4f1\ub85d\uc774 \uc644\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4')||txt.includes('\ub4f1\ub85d \uc644\ub8cc')){
const btns=Array.from(el.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x61, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"], \x69\x6e\x70\x75\x74[\x76\x61\x6c\x75\x65="\ud655\uc778"], \x73\x70\x61\x6e, \x64\x69\x76, \x70'));
for(const b of btns){
if(!_0x101b(b))continue;
const bTxt=(b.tagName==='\x49\x4e\x50\x55\x54'?b.value:b.textContent).replace(/\s+/g,'');
if(bTxt==='\ud655\uc778'){
return{success:true,text:txt,okBtn:b,popupEl:el};
}
}
const p=el.parentElement;
if(p){
const pBtns=Array.from(p.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x61, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"], \x69\x6e\x70\x75\x74[\x76\x61\x6c\x75\x65="\ud655\uc778"], \x73\x70\x61\x6e, \x64\x69\x76'));
for(const b of pBtns){
if(!_0x101b(b))continue;
const bTxt=(b.tagName==='\x49\x4e\x50\x55\x54'?b.value:b.textContent).replace(/\s+/g,'');
if(bTxt==='\ud655\uc778'){
return{success:true,text:txt,okBtn:b,popupEl:el};
}
}
}
}
}
const bodyText=document.body.innerText||'';
if(bodyText.includes('\ub4f1\ub85d \ub418\uc5c8\uc2b5\ub2c8\ub2e4')||bodyText.includes('\ub4f1\ub85d\ub418\uc5c8\uc2b5\ub2c8\ub2e4')){
const okCandidates=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x61, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"], \x69\x6e\x70\x75\x74[\x76\x61\x6c\x75\x65="\ud655\uc778"], \x2e\x62\x74\x6e\x5f\x63\x6f\x6e\x66\x69\x72\x6d, \x2e\x62\x74\x6e-\x6f\x6b'));
for(const b of okCandidates){
if(!_0x101b(b))continue;
const bTxt=(b.tagName==='\x49\x4e\x50\x55\x54'?b.value:b.textContent).replace(/\s+/g,'');
if(bTxt==='\ud655\uc778'){
return{success:true,text:'\ub4f1\ub85d \ub418\uc5c8\uc2b5\ub2c8\ub2e4',okBtn:b,popupEl:b.closest('\x64\x69\x76')};
}
}
}
return null;
}
function _0x1025(){
const bodyText=document.body.innerText||'';
const errorPhrases=[
'\uc774\uc804 \ub0a0\uc9dc\ub294 \ub4f1\ub85d\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4',
'\ub4f1\ub85d\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4',
'\ucd08\uacfc',
'\ud544\uc218 \ud56d\ubaa9',
'\uc815\uc0c1\uc801\uc778 \uc811\uadfc\uc774 \uc544\ub2d9\ub2c8\ub2e4',
'\uad8c\ud55c\uc774 \uc5c6\uc2b5\ub2c8\ub2e4'
];
for(const phrase of errorPhrases){
if(bodyText.includes(phrase)){
const okCandidates=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x61, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"], \x69\x6e\x70\x75\x74[\x76\x61\x6c\x75\x65="\ud655\uc778"]'));
for(const b of okCandidates){
if(!_0x101b(b))continue;
const bTxt=(b.tagName==='\x49\x4e\x50\x55\x54'?b.value:b.textContent).replace(/\s+/g,'');
if(bTxt==='\ud655\uc778'){
return{error:true,text:phrase,okBtn:b};
}
}
}
}
return null;
}
function _0x1026(modal){
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
function _0x1027(modal,labelText){
if(!modal)return null;
const targetNorm=String(labelText||'').replace(/[\s\-_/:]/g,'').toLowerCase();
if(!targetNorm)return null;
const allTrs=Array.from(modal.querySelectorAll('\x74\x72'));
for(const tr of allTrs){
const header=tr.querySelector('\x74\x68, \x74\x64\x3a\x66\x69\x72\x73\x74-\x63\x68\x69\x6c\x64, \x6c\x61\x62\x65\x6c, \x64\x74');
if(header){
const hTxt=(header.textContent||'').replace(/[\s\-_/:]/g,'').toLowerCase().trim();
if(hTxt===targetNorm||hTxt.startsWith(targetNorm)||targetNorm.startsWith(hTxt)){
return tr;
}
}
}
const allElements=Array.from(modal.querySelectorAll('\x74\x68, \x74\x64, \x6c\x61\x62\x65\x6c, \x64\x69\x76, \x73\x70\x61\x6e, \x70, \x64\x74'));
for(const el of allElements){
if(el.children.length>2)continue;
const txt=(el.textContent||'').replace(/[\s\-_/:]/g,'').toLowerCase().trim();
if(txt===targetNorm){
const row=el.closest('\x74\x72')||el.closest('\x64\x69\x76\x2e\x72\x6f\x77, \x64\x69\x76\x2e\x66\x6f\x72\x6d-\x67\x72\x6f\x75\x70, \x6c\x69, \x70')||el.parentElement;
if(row&&row!==modal)return row;
}
}
return null;
}
function _0x1028(modal){
if(!modal)return document.querySelector('\x73\x65\x6c\x65\x63\x74');
const r=_0x1027(modal,'\uc9c0\uc5ed');
if(r){
const sel=r.querySelector('\x73\x65\x6c\x65\x63\x74');
if(sel)return sel;
}
const allSelects=Array.from(modal.querySelectorAll('\x73\x65\x6c\x65\x63\x74'));
return allSelects[0]||null;
}
function _0x1029(modal){
if(!modal)return null;
const r=_0x1027(modal,'\uace8\ud504\uc7a5');
if(r){
const sel=r.querySelector('\x73\x65\x6c\x65\x63\x74');
if(sel)return sel;
}
const allSelects=Array.from(modal.querySelectorAll('\x73\x65\x6c\x65\x63\x74'));
if(allSelects.length>1)return allSelects[1];
return null;
}
function _0x102a(modal){
if(!modal)return null;
const r=_0x1027(modal,'\ud76c\ub9dd\uc77c\uc2dc')||_0x1027(modal,'\ud76c\ub9dd \uc77c\uc2dc')||_0x1027(modal,'\ud2f0\uc5c5\uc77c\uc790')||_0x1027(modal,'\ud2f0\uc5c5 \uc77c\uc790')||_0x1027(modal,'\uc77c\uc790');
if(r){
const inp=r.querySelector('\x69\x6e\x70\x75\x74\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x68\x69\x64\x64\x65\x6e"])');
if(inp)return inp;
}
const byPl=Array.from(modal.querySelectorAll('\x69\x6e\x70\x75\x74[\x70\x6c\x61\x63\x65\x68\x6f\x6c\x64\x65\x72*="\ud2f0\uc5c5 \uc77c\uc790"], \x69\x6e\x70\x75\x74[\x70\x6c\x61\x63\x65\x68\x6f\x6c\x64\x65\x72*="\uc77c\uc790"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x64\x61\x74\x65"], \x69\x6e\x70\x75\x74\x2e\x64\x70'))
.find(inp=>_0x101c(inp)&&_0x101b(inp));
if(byPl)return byPl;
return modal.querySelector('\x69\x6e\x70\x75\x74\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x68\x69\x64\x64\x65\x6e"])')||null;
}
function _0x102b(modal,dateInput){
const excludes=[dateInput].filter(Boolean);
const r=_0x1027(modal,'\ud2f0\uc5c5 \uc2dc\uac04')||
_0x1027(modal,'\ud2f0\uc5c5\uc2dc\uac04')||
_0x1027(modal,'\ud76c\ub9dd \uc2dc\uac04')||
_0x1027(modal,'\ud76c\ub9dd\uc2dc\uac04')||
_0x1027(modal,'\uc2dc\uac04');
if(r){
const fields=Array.from(r.querySelectorAll('\x69\x6e\x70\x75\x74, \x74\x65\x78\x74\x61\x72\x65\x61')).filter(el=>_0x101d(el)&&!excludes.includes(el));
if(fields[0])return fields[0];
}
const byLbl=_0x1020(['\ud2f0\uc5c5 \uc2dc\uac04','\ud2f0\uc5c5\uc2dc\uac04','\ud76c\ub9dd \uc2dc\uac04','\ud76c\ub9dd\uc2dc\uac04','\uc2dc\uac04'],modal,excludes);
if(byLbl)return byLbl;
const allTextNodes=Array.from(modal.querySelectorAll('*')).filter(el=>(el.textContent||'').includes('\x30\x37\x34\x35')&&el.children.length<=1);
for(const el of allTextNodes){
const parentRow=el.closest('\x74\x72, \x64\x69\x76, \x6c\x69, \x70')||el.parentElement;
if(parentRow){
const fields=Array.from(parentRow.querySelectorAll('\x69\x6e\x70\x75\x74, \x74\x65\x78\x74\x61\x72\x65\x61')).filter(inp=>_0x101d(inp)&&!excludes.includes(inp));
if(fields[0])return fields[0];
}
}
const byPl=Array.from(modal.querySelectorAll('\x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x74\x69\x6d\x65" \x69], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x74\x5f\x74\x69\x6d\x65" \x69], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x74\x74\x69\x6d\x65" \x69], \x69\x6e\x70\x75\x74[\x69\x64*="\x74\x69\x6d\x65" \x69], \x69\x6e\x70\x75\x74[\x70\x6c\x61\x63\x65\x68\x6f\x6c\x64\x65\x72*="\x30\x37\x34\x35"], \x74\x65\x78\x74\x61\x72\x65\x61[\x6e\x61\x6d\x65*="\x74\x69\x6d\x65" \x69]'))
.find(inp=>_0x101d(inp)&&!excludes.includes(inp));
if(byPl)return byPl;
const allInputs=Array.from(modal.querySelectorAll('\x69\x6e\x70\x75\x74'))
.filter(inp=>_0x101c(inp)&&_0x101b(inp)&&!excludes.includes(inp));
return allInputs[0]||null;
}
function _0x102c(modal,dateInput,timeInput){
const scopes=[modal,document.querySelector('\x2e\x6a\x50\x6f\x70\x75\x70\x41\x72\x65\x61')].filter(Boolean);
const excludes=[dateInput,timeInput].filter(Boolean);
let feeInput=null;
let inquiryCheckbox=null;
for(const scope of scopes){
if(!inquiryCheckbox){
const allCheckboxes=Array.from(scope.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]')).filter(_0x101b);
inquiryCheckbox=allCheckboxes.find(c=>{
const txt=(_0x1018(c)||c.parentElement?.textContent||c.nextSibling?.nodeValue||'').trim();
return txt.includes('\uc804\ud654\ubb38\uc758')||txt.includes('\ubb38\uc758');
})||null;
}
if(inquiryCheckbox&&!feeInput){
let chkRow=inquiryCheckbox.closest('\x74\x72, \x64\x69\x76\x2e\x66\x6f\x72\x6d-\x67\x72\x6f\x75\x70, \x64\x69\x76\x2e\x72\x6f\x77, \x6c\x69, \x70')||inquiryCheckbox.parentElement;
if(chkRow){
const fields=Array.from(chkRow.querySelectorAll('\x69\x6e\x70\x75\x74, \x74\x65\x78\x74\x61\x72\x65\x61')).filter(inp=>_0x101d(inp)&&!excludes.includes(inp));
if(fields[0])feeInput=fields[0];
}
if(!feeInput){
let prev=inquiryCheckbox.previousElementSibling;
while(prev){
if(_0x101d(prev)&&!excludes.includes(prev)){feeInput=prev;break;}
const inPrev=prev.querySelector('\x69\x6e\x70\x75\x74, \x74\x65\x78\x74\x61\x72\x65\x61');
if(inPrev&&_0x101d(inPrev)&&!excludes.includes(inPrev)){feeInput=inPrev;break;}
prev=prev.previousElementSibling;
}
}
}
if(feeInput)break;
}
if(!feeInput){
for(const scope of scopes){
const r=_0x1027(scope,'\uadf8\ub9b0\ud53c')||_0x1027(scope,'\uae08\uc561')||_0x1027(scope,'\ube44\uc6a9');
if(r){
const fields=Array.from(r.querySelectorAll('\x69\x6e\x70\x75\x74, \x74\x65\x78\x74\x61\x72\x65\x61')).filter(inp=>_0x101d(inp)&&!excludes.includes(inp));
if(fields[0]){feeInput=fields[0];break;}
}
}
}
if(!feeInput){
feeInput=_0x1020(['\uadf8\ub9b0\ud53c','\uae08\uc561'],modal,excludes);
}
if(!feeInput){
const allNodes=Array.from(modal.querySelectorAll('\x73\x70\x61\x6e, \x74\x64, \x64\x69\x76, \x70, \x6c\x61\x62\x65\x6c'));
const manNode=allNodes.find(el=>el.children.length===0&&(el.textContent.trim()==='\ub9cc'||el.textContent.trim()==='\ub9cc\uc6d0'));
if(manNode){
const container=manNode.closest('\x74\x72, \x64\x69\x76, \x6c\x69, \x70')||manNode.parentElement;
if(container){
const fields=Array.from(container.querySelectorAll('\x69\x6e\x70\x75\x74, \x74\x65\x78\x74\x61\x72\x65\x61')).filter(inp=>_0x101d(inp)&&!excludes.includes(inp));
if(fields[0])feeInput=fields[0];
if(!inquiryCheckbox)inquiryCheckbox=container.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]');
}
}
}
if(!feeInput){
const byAttr=Array.from(modal.querySelectorAll('\x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x66\x65\x65" \x69], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x67\x72\x65\x65\x6e" \x69], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x70\x72\x69\x63\x65" \x69], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x70\x61\x79" \x69], \x69\x6e\x70\x75\x74[\x69\x64*="\x66\x65\x65" \x69], \x74\x65\x78\x74\x61\x72\x65\x61[\x6e\x61\x6d\x65*="\x66\x65\x65" \x69]'))
.find(inp=>_0x101d(inp)&&!excludes.includes(inp));
if(byAttr)feeInput=byAttr;
}
if(!feeInput){
for(const scope of scopes){
const candidates=Array.from(scope.querySelectorAll('\x69\x6e\x70\x75\x74'))
.filter(inp=>_0x101c(inp)&&_0x101b(inp)&&!excludes.includes(inp));
if(candidates[0]){feeInput=candidates[0];break;}
}
}
return{feeInput,inquiryCheckbox};
}
function _0x102d(modal){
if(!modal)return{mealCheckbox:null,cartCheckbox:null};
let mealCheckbox=null;
let cartCheckbox=null;
const r=_0x1027(modal,'\ud3ec\ud568\uc0ac\ud56d')||modal;
const allCheckboxes=Array.from(r.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]'));
allCheckboxes.forEach(c=>{
const labelText=_0x1018(c)||c.parentElement?.textContent||'';
const name=(c.name||'').toLowerCase();
if(labelText.includes('\uc2dd\uc0ac')||name.includes('\x6d\x65\x61\x6c'))mealCheckbox=c;
if(labelText.includes('\uce74\ud2b8')||name.includes('\x63\x61\x72\x74'))cartCheckbox=c;
});
return{mealCheckbox,cartCheckbox};
}
function _0x102e(modal){
if(!modal)return{hole18:null,hole27:null,hole36:null};
const r=_0x1027(modal,'\ud640')||modal;
const inputs=Array.from(r.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]'));
let hole18=null;
let hole27=null;
let hole36=null;
inputs.forEach(inp=>{
const labelText=_0x1018(inp)||inp.parentElement?.textContent||'';
const val=(inp.value||'').trim();
if(labelText.includes('\x31\x38\ud640')||val==='\x31\x38')hole18=inp;
if(labelText.includes('\x32\x37\ud640')||val==='\x32\x37')hole27=inp;
if(labelText.includes('\x33\x36\ud640')||val==='\x33\x36')hole36=inp;
});
return{hole18,hole27,hole36};
}
function _0x102f(modal){
if(!modal)return{cadyNormal:null,cadyNo:null,cadyIntern:null,cadyDriving:null};
const r=_0x1027(modal,'\uce90\ub514')||modal;
const inputs=Array.from(r.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]'));
let cadyNormal=null;
let cadyNo=null;
let cadyIntern=null;
let cadyDriving=null;
inputs.forEach(inp=>{
const labelText=_0x1018(inp)||inp.parentElement?.textContent||'';
const name=(inp.name||'').toLowerCase();
const val=(inp.value||'').trim();
if(labelText.includes('\uc77c\ubc18')||name.includes('\x6e\x6f\x72\x6d\x61\x6c')||val==='\x31')cadyNormal=inp;
if(labelText.includes('\ub178\uce90\ub514')||name.includes('\x6e\x6f')||val==='\x32')cadyNo=inp;
if(labelText.includes('\uc778\ud134')||name.includes('\x69\x6e\x74\x65\x72\x6e')||val==='\x33')cadyIntern=inp;
if(labelText.includes('\uc6b4\uc804')||labelText.includes('\ub4dc\ub77c\uc774\ube59')||labelText.includes('\ub9c8\uc0ec')||val==='\x34')cadyDriving=inp;
});
return{cadyNormal,cadyNo,cadyIntern,cadyDriving};
}
function _0x1030(modal,dateInput,timeInput,feeInput){
const scopes=[modal,document.querySelector('\x2e\x6a\x50\x6f\x70\x75\x70\x41\x72\x65\x61')].filter(Boolean);
const excludes=[dateInput,timeInput,feeInput].filter(Boolean);
let personInput=null;
for(const scope of scopes){
const r=_0x1027(scope,'\ucd08\ub300 \uc778\uc6d0')||_0x1027(scope,'\ucd08\ub300\uc778\uc6d0')||_0x1027(scope,'\uc870\ub0b4 \uc778\uc6d0')||_0x1027(scope,'\uc870\ub0b4\uc778\uc6d0')||_0x1027(scope,'\ucd08\ub300')||_0x1027(scope,'\uc778\uc6d0');
if(r){
const fields=Array.from(r.querySelectorAll('\x69\x6e\x70\x75\x74, \x74\x65\x78\x74\x61\x72\x65\x61')).filter(inp=>_0x101d(inp)&&!excludes.includes(inp));
if(fields[0]){personInput=fields[0];break;}
}
if(!personInput){
const allNodes=Array.from(scope.querySelectorAll('\x73\x70\x61\x6e, \x74\x64, \x64\x69\x76, \x70, \x6c\x61\x62\x65\x6c'));
const myeongNode=allNodes.find(el=>el.children.length===0&&el.textContent.trim()==='\uba85');
if(myeongNode){
const container=myeongNode.closest('\x74\x72, \x64\x69\x76\x2e\x66\x6f\x72\x6d-\x67\x72\x6f\x75\x70, \x64\x69\x76\x2e\x72\x6f\x77, \x64\x69\x76, \x6c\x69, \x70')||myeongNode.parentElement;
if(container){
const fields=Array.from(container.querySelectorAll('\x69\x6e\x70\x75\x74, \x74\x65\x78\x74\x61\x72\x65\x61')).filter(inp=>_0x101d(inp)&&!excludes.includes(inp));
if(fields[0]){personInput=fields[0];break;}
}
}
}
}
if(!personInput){
for(const scope of scopes){
const candidates=Array.from(scope.querySelectorAll('\x69\x6e\x70\x75\x74'))
.filter(inp=>_0x101c(inp)&&_0x101b(inp)&&!excludes.includes(inp));
if(candidates[0]){personInput=candidates[0];break;}
}
}
let optAny=null,optMale=null,optCouple=null,optFemale=null;
const optRow=_0x1027(modal,'\uc635\uc158')||modal;
const inputs=Array.from(optRow.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]'));
inputs.forEach(inp=>{
const labelText=(_0x1018(inp)||inp.parentElement?.textContent||inp.nextSibling?.nodeValue||'').trim();
if(labelText.includes('\ubb34\uad00'))optAny=inp;
if(labelText.includes('\ub0a8\uc790')||labelText.includes('\ub0a8\uc131'))optMale=inp;
if(labelText.includes('\ubd80\ubd80')||labelText.includes('\ucee4\ud50c'))optCouple=inp;
if(labelText.includes('\uc5ec\uc790')||labelText.includes('\uc5ec\uc131'))optFemale=inp;
});
return{personInput,optAny,optMale,optCouple,optFemale};
}
function _0x1031(modal,excludes=[]){
if(!modal)return document.querySelector('\x74\x65\x78\x74\x61\x72\x65\x61');
const r=_0x1027(modal,'\ub0b4\uc6a9')||_0x1027(modal,'\uba54\ubaa8');
if(r){
const ta=Array.from(r.querySelectorAll('\x74\x65\x78\x74\x61\x72\x65\x61')).find(el=>_0x101b(el)&&!excludes.includes(el));
if(ta)return ta;
}
const textareas=Array.from(modal.querySelectorAll('\x74\x65\x78\x74\x61\x72\x65\x61'))
.filter(el=>_0x101b(el)&&!excludes.includes(el));
if(textareas.length>0){
const tall=textareas.filter(el=>el.offsetHeight>=40);
if(tall.length>0)return tall[tall.length-1];
return textareas[textareas.length-1];
}
return null;
}
function _0x1032(modal){
const scope=modal?.parentElement||modal||document;
document.querySelectorAll('[\x64\x61\x74\x61-\x67\x6c\x64-\x73\x75\x62\x6d\x69\x74]').forEach(el=>el.removeAttribute('\x64\x61\x74\x61-\x67\x6c\x64-\x73\x75\x62\x6d\x69\x74'));
const allCandidates=Array.from(scope.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"], \x61, \x70, \x73\x70\x61\x6e, \x64\x69\x76'))
.filter(el=>{
if(!_0x101b(el))return false;
if(el.classList.contains('\x77\x72\x69\x74\x65\x42\x6f\x6f\x6b\x69\x6e\x67'))return false;
const cls=(el.className||'').toLowerCase();
if(cls.includes('\x74\x69\x74\x6c\x65')||cls.includes('\x68\x65\x61\x64\x65\x72')||cls.includes('\x73\x75\x62\x6a\x65\x63\x74'))return false;
const txt=(el.tagName==='\x49\x4e\x50\x55\x54'?(el.value||''):(el.textContent||'')).replace(/\s+/g,'');
if(txt!=='\ub4f1\ub85d')return false;
const hasChildWithSameText=Array.from(el.children).some(ch=>(ch.textContent||'').replace(/\s+/g,'')==='\ub4f1\ub85d');
return!hasChildWithSameText;
});
if(allCandidates.length===0){
const direct=Array.from(scope.querySelectorAll('\x69\x6e\x70\x75\x74\x2e\x6a\x53\x75\x62\x6d\x69\x74\x42\x6f\x6f\x6b\x69\x6e\x67, \x69\x6e\x70\x75\x74[\x76\x61\x6c\x75\x65="\ub4f1\ub85d"], \x62\x75\x74\x74\x6f\x6e\x2e\x6a\x53\x75\x62\x6d\x69\x74\x42\x6f\x6f\x6b\x69\x6e\x67, \x62\x75\x74\x74\x6f\x6e'))
.find(el=>_0x101b(el)&&!el.classList.contains('\x77\x72\x69\x74\x65\x42\x6f\x6f\x6b\x69\x6e\x67'));
if(direct){
direct.setAttribute('\x64\x61\x74\x61-\x67\x6c\x64-\x73\x75\x62\x6d\x69\x74','\x31');
return direct;
}
return null;
}
const tagRank=el=>(['\x42\x55\x54\x54\x4f\x4e','\x49\x4e\x50\x55\x54','\x41'].includes(el.tagName)?0:1);
const hasCloseSibling=el=>{
const parent=el.parentElement;
if(!parent)return 0;
const pTxt=parent.textContent.replace(/\s+/g,'');
return pTxt.includes('\ub2eb\uae30')?1:0;
};
allCandidates.sort((a,b)=>{
const closeDiff=hasCloseSibling(b)-hasCloseSibling(a);
if(closeDiff!==0)return closeDiff;
const rankDiff=tagRank(a)-tagRank(b);
if(rankDiff!==0)return rankDiff;
const rectA=a.getBoundingClientRect();
const rectB=b.getBoundingClientRect();
return rectB.top-rectA.top;
});
const best=allCandidates[0];
if(best){
best.setAttribute('\x64\x61\x74\x61-\x67\x6c\x64-\x73\x75\x62\x6d\x69\x74','\x31');
}
return best;
}
async function _0x1033(item,task){
if(!item)return false;
console.log(`[\uace8\ud504\ub79c\ub4dc \uc790\ub3d9\ub4f1\ub85d] \uc791\uc131 \uc2dc\uc791: [${item.golf}] ${item.date} ${item.time} (${item.fee}\ub9cc / ${item.cady||'\uce90\ub514'})`);
const stepPreset=task.stepPreset||'\x68\x75\x6d\x61\x6e';
const isTransfer=Boolean(task.mode==='\x74\x72\x61\x6e\x73\x66\x65\x72'||item.roomType==='\uc591\ub3c4');
const targetDivision=isTransfer?'\uc591\ub3c4':'\uc870\uc778';
let modal=_0x1022();
if(modal){
const currentDiv=_0x1026(modal);
if(currentDiv&&currentDiv!==targetDivision){
console.log(`[\uace8\ud504\ub79c\ub4dc] \ubaa8\ub2ec \ubaa8\ub4dc \ubd88\uc77c\uce58 (\ud604\uc7ac: ${currentDiv}, \ud544\uc694: ${targetDivision}) -> \ub2eb\uace0 \uc7ac\uc624\ud508`);
const closeBtn=_0x1023(modal);
if(closeBtn)await _0x1009(closeBtn);
await _0x1006(400);
modal=null;
}
}
if(!modal){
const tabBtn=_0x1019(isTransfer);
if(tabBtn){
const clickEl=tabBtn.closest('\x2e\x77\x72\x69\x74\x65\x42\x6f\x6f\x6b\x69\x6e\x67, \x62\x75\x74\x74\x6f\x6e, \x61, \x70, \x6c\x69')||tabBtn;
_0x1004({
desc:`[${(task.currentIndex||0)+1}/${task.totalCount||1}] '${targetDivision} \ub4f1\ub85d' \ubc84\ud2bc \ud074\ub9ad \uc911...`
});
console.log(`[\uace8\ud504\ub79c\ub4dc] '${targetDivision} \ub4f1\ub85d' \ubc84\ud2bc \ubc1c\uacac:`,clickEl.tagName,clickEl.className,clickEl.textContent?.trim());
try{
document.querySelectorAll('[\x64\x61\x74\x61-\x67\x6c\x64-\x6f\x70\x65\x6e-\x62\x74\x6e="\x31"]').forEach(el=>el.removeAttribute('\x64\x61\x74\x61-\x67\x6c\x64-\x6f\x70\x65\x6e-\x62\x74\x6e'));
clickEl.setAttribute('\x64\x61\x74\x61-\x67\x6c\x64-\x6f\x70\x65\x6e-\x62\x74\x6e','\x31');
clickEl.scrollIntoView({block:'\x63\x65\x6e\x74\x65\x72',behavior:'\x69\x6e\x73\x74\x61\x6e\x74'});
}catch(e){}
await _0x1009(clickEl);
try{clickEl.click();}catch(e){}
for(let w=0;w<5&&!modal;w++){
await _0x1006(200);
modal=_0x1022();
}
if(!modal){
console.log(`[\uace8\ud504\ub79c\ub4dc] \ubb3c\ub9ac \ud074\ub9ad \ud6c4 \ubaa8\ub2ec \ubbf8\uac10\uc9c0 -> MAIN \uc6d4\ub4dc jQuery \ud074\ub9ad \uc2dc\ub3c4`);
try{clickEl.setAttribute('\x64\x61\x74\x61-\x67\x6c\x64-\x6f\x70\x65\x6e-\x62\x74\x6e','\x31');}catch(e){}
window.postMessage({
type:'\x5f\x5f\x47\x4f\x4c\x46\x4c\x41\x4e\x44\x5f\x4f\x50\x45\x4e\x5f\x54\x41\x42\x5f\x5f',
isTransfer:isTransfer
},'*');
for(let w=0;w<10&&!modal;w++){
await _0x1006(200);
modal=_0x1022();
}
}
if(!modal&&clickEl.parentElement&&(clickEl.parentElement.textContent||'').replace(/\s+/g,'').length<=10){
await _0x1009(clickEl.parentElement);
try{clickEl.parentElement.click();}catch(e){}
for(let w=0;w<6&&!modal;w++){
await _0x1006(200);
modal=_0x1022();
}
}
}else{
console.warn("[\uace8\ud504\ub79c\ub4dc] \uc0c1\ub2e8 \uc591\ub3c4\x2f\uc870\uc778 \ub4f1\ub85d \ubc84\ud2bc \ud0d0\uc0c9 \uc2e4\ud328, \x4d\x41\x49\x4e \uc6d4\ub4dc \uc9c1\uc811 \uc624\ud508 \uc2dc\ub3c4");
_0x1004({
desc:`[${(task.currentIndex||0)+1}/${task.totalCount||1}] '${targetDivision} \ub4f1\ub85d' \ubc84\ud2bc \ud0d0\uc0c9 \uc7ac\uc2dc\ub3c4 \uc911...`
});
window.postMessage({
type:'\x5f\x5f\x47\x4f\x4c\x46\x4c\x41\x4e\x44\x5f\x4f\x50\x45\x4e\x5f\x54\x41\x42\x5f\x5f',
isTransfer:isTransfer
},'*');
for(let w=0;w<12&&!modal;w++){
await _0x1006(200);
modal=_0x1022();
}
}
}
if(!modal){
const msg=`'${targetDivision} \ub4f1\ub85d' \ucc3d\uc774 \uc5f4\ub9ac\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4. (\ud654\uba74\uc5d0 '${targetDivision} \ub4f1\ub85d' \ubc84\ud2bc\uc774 \ubcf4\uc774\ub294\uc9c0 \ud655\uc778\ud574\uc8fc\uc138\uc694)`;
console.error("[\uace8\ud504\ub79c\ub4dc]",msg);
_0x1004({desc:msg});
return false;
}
_0x1004({
desc:`[${(task.currentIndex||0)+1}/${task.totalCount||1}] ${item.golf} \ub4f1\ub85d\ucc3d \uc785\ub825 \uc911...`
});
console.log("\ud83c\udfaf [\uace8\ud504\ub79c\ub4dc] \ub4f1\ub85d \ubaa8\ub2ec \ud3ec\ucee4\uc2a4 \uc131\uacf5\x3a",modal.className);
const regionSelect=_0x1028(modal);
if(regionSelect){
const targetRegion=_0x1013(item.region);
let matchedIndex=-1;
for(let i=0;i<regionSelect.options.length;i++){
const optTxt=regionSelect.options[i].text.trim();
if(optTxt===targetRegion||optTxt.includes(targetRegion)||targetRegion.includes(optTxt)){
matchedIndex=i;
break;
}
}
if(matchedIndex>=0){
regionSelect.selectedIndex=matchedIndex;
regionSelect.setAttribute('\x64\x61\x74\x61-\x67\x6c\x64-\x72\x65\x67\x69\x6f\x6e','\x31');
window.postMessage({
type:'\x5f\x5f\x47\x4f\x4c\x46\x4c\x41\x4e\x44\x5f\x4d\x41\x49\x4e\x5f\x54\x52\x49\x47\x47\x45\x52\x5f\x5f',
selector:'[\x64\x61\x74\x61-\x67\x6c\x64-\x72\x65\x67\x69\x6f\x6e="\x31"]',
event:'\x63\x68\x61\x6e\x67\x65',
value:regionSelect.value
},'*');
regionSelect.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
if(typeof regionSelect.onchange==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
try{regionSelect.onchange();}catch(e){}
}
console.log(`[\uace8\ud504\ub79c\ub4dc] \uc9c0\uc5ed \uc120\ud0dd \uc644\ub8cc: ${regionSelect.options[matchedIndex].text}`);
}
await _0x1006(_0x1007('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
}
let golfSelect=_0x1029(modal);
if(golfSelect){
let waitOpts=0;
while(golfSelect.options.length<=1&&waitOpts<25){
await _0x1006(100);
golfSelect=_0x1029(modal)||golfSelect;
waitOpts++;
}
console.log(`[\uace8\ud504\ub79c\ub4dc] \uace8\ud504\uc7a5 \uc635\uc158 \uac1c\uc218: ${golfSelect.options.length}\uac1c`);
const normItemGolf=_0x1012(item.golf);
const rawItemGolf=String(item.golf||'').replace(/\[.*?\]/g,'').trim().toLowerCase();
const strictNorm=(s)=>String(s||'')
.toLowerCase()
.replace(/클레식/g,'\ud074\ub798\uc2dd')
.replace(/cc|gc|골프장|골프클럽|컨트리클럽/gi,'')
.replace(/[\s,·\/\-_()[\]]/g,'');
const strictItemGolf=strictNorm(item.golf);
const strictRawGolf=strictNorm(item.rawGolf||'');
const gLow=String(item.golf||'').toLowerCase();
const gBAP=/(?:비에이비스타|비에이).*(?:p\b|퍼블릭|대중제)/i.test(gLow);
const gHasLakeClassic=gLow.includes('\ub808\uc774\ud06c')||gLow.includes('\ud074\ub798\uc2dd')||gLow.includes('\ud074\ub808\uc2dd');
const gHasOcean=gLow.includes('\uc624\uc158');
const gHasSky=gLow.includes('\ud558\ub298');
const isOptionBranchConflict=(optTxt)=>{
const oLow=String(optTxt||'').toLowerCase();
if(_0x1010(item.golf,optTxt)||(!_0x100f(item.golf)&&_0x1010(item.rawGolf,optTxt)))return true;
const oBAP=/(?:비에이비스타|비에이).*(?:p\b|퍼블릭|대중제)/i.test(oLow);
if((gLow.includes('\ube44\uc5d0\uc774')||oLow.includes('\ube44\uc5d0\uc774'))&&gBAP!==oBAP)return true;
if((gLow.includes('\uc54c\ud39c\uc2dc\uc544')||oLow.includes('\uc54c\ud39c\uc2dc\uc544'))&&gLow.includes('\x37\x30\x30')!==oLow.includes('\x37\x30\x30'))return true;
if(gLow.includes('\ud074\ub7fd\x37\x32')||oLow.includes('\ud074\ub7fd\x37\x32')){
const oHasOcean=oLow.includes('\uc624\uc158');
const oHasSky=oLow.includes('\ud558\ub298');
const oHasLakeClassic=oLow.includes('\ub808\uc774\ud06c')||oLow.includes('\ud074\ub798\uc2dd')||oLow.includes('\ud074\ub808\uc2dd');
if(gHasOcean&&!oHasOcean)return true;
if(gHasSky&&!oHasSky)return true;
if(gHasLakeClassic&&(oHasOcean||oHasSky||!oHasLakeClassic))return true;
if(!gHasOcean&&!gHasSky&&!gHasLakeClassic&&(oHasOcean||oHasSky))return true;
}
if((gLow.includes('\ub5bc\uc81c\ubca0')||oLow.includes('\ub5bc\uc81c\ubca0'))&&((gLow.includes('\ub3d9\ubd81')||gLow.includes('\ud55c\uc6b8')||gLow.includes('\ub9c8\ub8e8'))!==(oLow.includes('\ub3d9\ubd81')||oLow.includes('\ud55c\uc6b8')||oLow.includes('\ub9c8\ub8e8'))))return true;
if((gLow.includes('\uc548\uc131')||oLow.includes('\uc548\uc131'))&&(/안성\s*h/i.test(gLow)!==/안성\s*h/i.test(oLow)||/안성\s*w/i.test(gLow)!==/안성\s*w/i.test(oLow)))return true;
if((gLow.includes('\uc9c4\ucc9c')!==oLow.includes('\uc9c4\ucc9c'))||(gLow.includes('\ucc9c\uc548')!==oLow.includes('\ucc9c\uc548'))||(gLow.includes('\ud654\ub791')!==oLow.includes('\ud654\ub791')))return true;
return false;
};
let matchedGolfIndex=-1;
const rawLow=String(item.rawGolf||'').toLowerCase();
if(gLow.includes('\ud074\ub7fd\x37\x32')||rawLow.includes('\ud074\ub7fd\x37\x32')||gLow.includes('\x63\x6c\x75\x62\x37\x32')||rawLow.includes('\x63\x6c\x75\x62\x37\x32')){
let targetClub72Sub='\ub808\uc774\ud06c\ud074\ub798\uc2dd';
if(gHasOcean||rawLow.includes('\uc624\uc158'))targetClub72Sub='\uc624\uc158';
else if(gHasSky||rawLow.includes('\ud558\ub298'))targetClub72Sub='\ud558\ub298';
for(let i=0;i<golfSelect.options.length;i++){
const optTxt=golfSelect.options[i].text.trim();
const oNorm=strictNorm(optTxt);
if(!oNorm.includes('\ud074\ub7fd\x37\x32'))continue;
if(targetClub72Sub==='\uc624\uc158'&&oNorm.includes('\uc624\uc158')){
matchedGolfIndex=i;
break;
}else if(targetClub72Sub==='\ud558\ub298'&&oNorm.includes('\ud558\ub298')){
matchedGolfIndex=i;
break;
}else if(targetClub72Sub==='\ub808\uc774\ud06c\ud074\ub798\uc2dd'){
if(oNorm.includes('\ub808\uc774\ud06c')||oNorm.includes('\ud074\ub798\uc2dd')||optTxt.includes('\ud074\ub808\uc2dd')){
matchedGolfIndex=i;
break;
}
}
}
}
if(matchedGolfIndex<0){
const __optTexts=Array.from(golfSelect.options).map(o=>(o.text||'').trim());
const __cand=_0x1011(__optTexts,[item.golf,item.rawGolf]);
if(__cand.length>0){
const __exact=__cand.find(i=>strictNorm(__optTexts[i])===strictItemGolf);
matchedGolfIndex=(__exact!==undefined)?__exact:__cand[0];
}
}
if(matchedGolfIndex<0){
for(let i=0;i<golfSelect.options.length;i++){
const optTxt=golfSelect.options[i].text.trim();
if(!optTxt||optTxt==='\uc120\ud0dd')continue;
if(isOptionBranchConflict(optTxt))continue;
const strictOpt=strictNorm(optTxt);
if(strictOpt&&strictOpt===strictItemGolf){
matchedGolfIndex=i;
break;
}
}
}
if(matchedGolfIndex<0){
for(let i=0;i<golfSelect.options.length;i++){
const optTxt=golfSelect.options[i].text.trim();
if(isOptionBranchConflict(optTxt))continue;
const normOpt=_0x1012(optTxt);
if(!normOpt)continue;
if(normOpt===normItemGolf){
matchedGolfIndex=i;
break;
}
}
}
if(matchedGolfIndex<0){
for(let i=0;i<golfSelect.options.length;i++){
const optTxt=golfSelect.options[i].text.trim();
if(isOptionBranchConflict(optTxt))continue;
const normOpt=_0x1012(optTxt);
if(!normOpt||normOpt.length<2)continue;
if(normOpt.includes(normItemGolf)||normItemGolf.includes(normOpt)||
rawItemGolf.includes(normOpt)||normOpt.includes(rawItemGolf)){
matchedGolfIndex=i;
break;
}
}
}
if(matchedGolfIndex<0&&strictRawGolf){
for(let i=0;i<golfSelect.options.length;i++){
const optTxt=golfSelect.options[i].text.trim();
if(!optTxt||optTxt==='\uc120\ud0dd')continue;
if(isOptionBranchConflict(optTxt))continue;
const strictOpt=strictNorm(optTxt);
if(strictOpt&&strictOpt===strictRawGolf){
matchedGolfIndex=i;
break;
}
}
}
if(matchedGolfIndex>=0){
golfSelect.selectedIndex=matchedGolfIndex;
golfSelect.setAttribute('\x64\x61\x74\x61-\x67\x6c\x64-\x67\x6f\x6c\x66','\x31');
window.postMessage({
type:'\x5f\x5f\x47\x4f\x4c\x46\x4c\x41\x4e\x44\x5f\x4d\x41\x49\x4e\x5f\x54\x52\x49\x47\x47\x45\x52\x5f\x5f',
selector:'[\x64\x61\x74\x61-\x67\x6c\x64-\x67\x6f\x6c\x66="\x31"]',
event:'\x63\x68\x61\x6e\x67\x65',
value:golfSelect.value
},'*');
golfSelect.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
if(typeof golfSelect.onchange==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
try{golfSelect.onchange();}catch(e){}
}
console.log(`[\uace8\ud504\ub79c\ub4dc] \uace8\ud504\uc7a5 \uc120\ud0dd \uc644\ub8cc: ${golfSelect.options[matchedGolfIndex].text}`);
}else{
console.warn(`[\uace8\ud504\ub79c\ub4dc] \uad6c\uc7a5 \ub4dc\ub86d\ub2e4\uc6b4\uc5d0\uc11c '${item.golf}' \ub9e4\uce6d \uc2e4\ud328 (\ucd1d ${golfSelect.options.length}\uac1c \uc635\uc158 \uc911)`);
}
await _0x1006(_0x1007('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
}
const dateInput=_0x102a(modal);
if(dateInput){
const formattedDate=_0x1014(item.date);
await _0x100c(dateInput,formattedDate,stepPreset);
console.log(`[\uace8\ud504\ub79c\ub4dc] \ud2f0\uc5c5\uc77c\uc790 \uc785\ub825 \uc644\ub8cc: ${formattedDate} (\ud544\ub4dc value: '${dateInput.value}')`);
await _0x1006(_0x1007('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
}else{
console.warn(`[\uace8\ud504\ub79c\ub4dc] \ud2f0\uc5c5\uc77c\uc790 \uc785\ub825 \ud544\ub4dc\ub97c \ucc3e\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4.`);
}
const timeInput=_0x102b(modal,dateInput);
if(timeInput){
const time4=_0x1015(item.time);
await _0x100d(timeInput,time4);
console.log(`[\uace8\ud504\ub79c\ub4dc] \ud2f0\uc5c5\uc2dc\uac04 \uc785\ub825 \uc644\ub8cc: ${time4} (\ud544\ub4dc value: '${timeInput.value}')`);
await _0x1006(_0x1007('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
}else{
console.warn(`[\uace8\ud504\ub79c\ub4dc] \u26a0\ufe0f \ud2f0\uc5c5\uc2dc\uac04 \uc785\ub825 \ud544\ub4dc\ub97c \ucc3e\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4.`);
}
const{feeInput,inquiryCheckbox}=_0x102c(modal,dateInput,timeInput);
const{man,isInquiry}=_0x1017(item.fee);
console.log(`[\uace8\ud504\ub79c\ub4dc] \uadf8\ub9b0\ud53c \ud544\ub4dc \ud655\uc778:`,{
feeInputTag:feeInput?.tagName,
feeInputType:feeInput?.type,
feeInputName:feeInput?.name,
isDateInput:feeInput===dateInput,
isTimeInput:feeInput===timeInput,
man:man,
isInquiry:isInquiry,
rawFee:item.fee
});
if(isInquiry){
if(inquiryCheckbox&&!inquiryCheckbox.checked){
await _0x1009(inquiryCheckbox);
}
console.log("[\uace8\ud504\ub79c\ub4dc] \uadf8\ub9b0\ud53c\x3a \u25b6 \uc804\ud654\ubb38\uc758 \uccb4\ud06c \uc644\ub8cc");
}else{
if(inquiryCheckbox&&inquiryCheckbox.checked){
await _0x1009(inquiryCheckbox);
}
if(feeInput&&feeInput!==dateInput&&feeInput!==timeInput){
await _0x100d(feeInput,man);
console.log(`[\uace8\ud504\ub79c\ub4dc] \uadf8\ub9b0\ud53c \uc785\ub825 \uc644\ub8cc: \u25b6 ${man}\ub9cc\uc6d0 (\ud544\ub4dc value: '${feeInput.value}')`);
}else{
console.warn("[\uace8\ud504\ub79c\ub4dc] \u26a0\ufe0f \uc720\ud6a8\ud55c \uadf8\ub9b0\ud53c \uc785\ub825 \ud544\ub4dc\ub97c \ucc3e\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4\x2e");
}
}
await _0x1006(_0x1007('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
const{mealCheckbox,cartCheckbox}=_0x102d(modal);
if(mealCheckbox){
const shouldMeal=!!item.isMeal;
if(mealCheckbox.checked!==shouldMeal){
await _0x1009(mealCheckbox);
}
}
if(cartCheckbox){
const isCartIncluded=!!(item.isCartFree||item.condition?.includes('\uce74\ud3ec')||item.fee?.includes('\uce74\ud3ec'));
if(cartCheckbox.checked!==isCartIncluded){
await _0x1009(cartCheckbox);
}
}
await _0x1006(_0x1007('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
const{hole18,hole27,hole36}=_0x102e(modal);
const is27Hole=item.roomType?.includes('\x32\x37')||item.golf?.includes('\x32\x37\ud640');
const is36Hole=item.roomType?.includes('\x33\x36')||item.golf?.includes('\x33\x36\ud640');
if(is27Hole&&hole27){
await _0x1009(hole27);
}else if(is36Hole&&hole36){
await _0x1009(hole36);
}else if(hole18&&!hole18.checked){
await _0x1009(hole18);
}
await _0x1006(_0x1007('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
const{cadyNormal,cadyNo,cadyIntern,cadyDriving}=_0x102f(modal);
const cadyStr=String(item.cady||'').trim();
if(cadyStr.includes('\ub178\uce90\ub514')){
if(cadyNo){
await _0x1009(cadyNo);
console.log("[\uace8\ud504\ub79c\ub4dc] \uce90\ub514\uc120\ud0dd\x3a \u25b6 \ub178\uce90\ub514 \uc120\ud0dd");
}
}else if(cadyStr.includes('\uc778\ud134')){
if(cadyIntern){
await _0x1009(cadyIntern);
console.log("[\uace8\ud504\ub79c\ub4dc] \uce90\ub514\uc120\ud0dd\x3a \u25b6 \uc778\ud134\uce90\ub514 \uc120\ud0dd");
}
}else if(cadyStr.includes('\uc6b4\uc804')||cadyStr.includes('\ub4dc\ub77c\uc774\ube59')||cadyStr.includes('\ub9c8\uc0ec')){
if(cadyDriving){
await _0x1009(cadyDriving);
console.log("[\uace8\ud504\ub79c\ub4dc] \uce90\ub514\uc120\ud0dd\x3a \u25b6 \uc6b4\uc804\uce90\ub514 \uc120\ud0dd");
}
}else{
if(cadyNormal&&!cadyNormal.checked){
await _0x1009(cadyNormal);
console.log("[\uace8\ud504\ub79c\ub4dc] \uce90\ub514\uc120\ud0dd\x3a \u25b6 \uc77c\ubc18\uce90\ub514 \uc120\ud0dd");
}
}
await _0x1006(_0x1007('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
let personInputRef=null;
if(!isTransfer){
const{personInput,optAny,optMale,optCouple,optFemale}=_0x1030(modal,dateInput,timeInput,feeInput);
personInputRef=personInput;
let invitedCount=4;
const p=(typeof item.waitPax==='\x6e\x75\x6d\x62\x65\x72'&&!isNaN(item.waitPax))?item.waitPax:0;
if(p>0&&p<4){
invitedCount=4-p;
}else if(p>=4){
invitedCount=1;
}else{
const s=`${item.sizenum||''} ${item.condition||''} ${item.fullRawText||''}`;
const m=s.match(/대기\s*(\d+)인?/)||s.match(/(\d+)인?\s*대기/);
if(m){
const foundWait=parseInt(m[1],10);
if(foundWait>0&&foundWait<4)invitedCount=4-foundWait;
}
}
console.log(`[\uace8\ud504\ub79c\ub4dc] \ucd08\ub300\uc778\uc6d0 \ud544\ub4dc \ud655\uc778:`,{
personInputTag:personInput?.tagName,
personInputType:personInput?.type,
personInputName:personInput?.name,
isDateInput:personInput===dateInput,
isTimeInput:personInput===timeInput,
isFeeInput:personInput===feeInput,
invitedCount:invitedCount,
waitPax:p
});
if(personInput&&personInput!==dateInput&&personInput!==feeInput&&personInput!==timeInput){
await _0x100d(personInput,String(invitedCount));
console.log(`[\uace8\ud504\ub79c\ub4dc] \ucd08\ub300 \uc778\uc6d0 \uc785\ub825 \uc644\ub8cc: \u25b6 ${invitedCount}\uba85 (\ub300\uae30\uc778\uc6d0 ${p}\uba85 \uae30\uc900, \ud544\ub4dc value: '${personInput.value}')`);
}else{
console.warn("[\uace8\ud504\ub79c\ub4dc] \u26a0\ufe0f \uc720\ud6a8\ud55c \ucd08\ub300 \uc778\uc6d0 \uc785\ub825 \ud544\ub4dc\ub97c \ucc3e\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4\x2e");
}
const targetOption=_0x1016(item.waitPax,item.waitGender,item.condition,item.fullRawText);
console.log(`[\uace8\ud504\ub79c\ub4dc] \uc131\ubcc4 \uc635\uc158 \ud310\ubcc4 \uacb0\uacfc: \u25b6 '${targetOption}'`,{
hasOptMale:!!optMale,
hasOptFemale:!!optFemale,
hasOptCouple:!!optCouple,
hasOptAny:!!optAny
});
let targetOptEl=null;
if(targetOption==='\ub0a8\uc790')targetOptEl=optMale;
else if(targetOption==='\uc5ec\uc790')targetOptEl=optFemale;
else if(targetOption==='\ubd80\ubd80\x2f\ucee4\ud50c')targetOptEl=optCouple;
else targetOptEl=optAny;
if(targetOptEl){
if(!targetOptEl.checked){
await _0x1009(targetOptEl);
}
console.log(`[\uace8\ud504\ub79c\ub4dc] \uc131\ubcc4 \uc635\uc158 \ud074\ub9ad \uc644\ub8cc: \u25b6 [${targetOption}]`);
}else{
console.warn(`[\uace8\ud504\ub79c\ub4dc] \uc131\ubcc4 \uc635\uc158 [${targetOption}] \uc694\uc18c\ub97c \ucc3e\uc9c0 \ubabb\ud568`);
}
await _0x1006(_0x1007('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
}
const memoEl=_0x1031(modal,[dateInput,timeInput,feeInput,personInputRef].filter(Boolean));
const finalMemo=(item.memo||task.memo||'').trim();
if(memoEl&&finalMemo){
await _0x100d(memoEl,finalMemo);
console.log(`[\uace8\ud504\ub79c\ub4dc] \ub4f1\ub85d \ub0b4\uc6a9(\uba54\ubaa8) \uc791\uc131 \uc644\ub8cc (${finalMemo.length}\uc790)`);
await _0x1006(_0x1007('\x62\x65\x66\x6f\x72\x65\x5f\x73\x75\x62\x6d\x69\x74',stepPreset));
}
const submitBtn=_0x1032(modal);
if(submitBtn){
_0x1004({
desc:`[${task.currentIndex+1}/${task.totalCount}] ${item.golf} (${item.date} ${item.time}) \ub4f1\ub85d \uc81c\ucd9c \uc911...`
});
task.status='\x73\x75\x62\x6d\x69\x74\x74\x69\x6e\x67';
try{
await new Promise(r=>chrome.storage.local.set({golfland_task:task},r));
}catch(e){}
console.log("[\uace8\ud504\ub79c\ub4dc] \ubaa8\ub2ec [\ub4f1\ub85d] \ubc84\ud2bc \ud074\ub9ad \uc2e4\ud589!",submitBtn.tagName,submitBtn.className,(submitBtn.value||submitBtn.textContent||'').trim());
const clickAt=Date.now();
await _0x1009(submitBtn);
let handled=false;
const maxWaitMs=12000;
const pollInterval=300;
const startWait=Date.now();
while(Date.now()-startWait<maxWaitMs){
const resultPopup=_0x1024();
if(resultPopup&&resultPopup.okBtn){
console.log("[\uace8\ud504\ub79c\ub4dc] '\ub4f1\ub85d \ub418\uc5c8\uc2b5\ub2c8\ub2e4' \uc644\ub8cc \ud31d\uc5c5 \uac10\uc9c0 -> [\ud655\uc778] \ubc84\ud2bc \ud074\ub9ad");
_0x1004({
desc:`[${task.currentIndex+1}/${task.totalCount}] \ub4f1\ub85d \uc644\ub8cc! \ud655\uc778 \ubc0f \ub4f1\ub85d\ucc3d \ub2eb\ub294 \uc911...`
});
await _0x1009(resultPopup.okBtn);
try{resultPopup.okBtn.click();}catch(e){}
await _0x1006(400);
const openModal=_0x1022();
if(openModal){
const closeBtn=_0x1023(openModal);
if(closeBtn){
console.log("[\uace8\ud504\ub79c\ub4dc] \ub4f1\ub85d \ubaa8\ub2ec [\ub2eb\uae30] \ubc84\ud2bc \ud074\ub9ad");
await _0x1009(closeBtn);
try{closeBtn.click();}catch(e){}
}
window.postMessage({type:'\x5f\x5f\x47\x4f\x4c\x46\x4c\x41\x4e\x44\x5f\x43\x4c\x4f\x53\x45\x5f\x4d\x4f\x44\x41\x4c\x5f\x5f'},'*');
await _0x1006(300);
}
handled=true;
await _0x1034('\x6c\x61\x79\x65\x72\x5f\x63\x6f\x6e\x66\x69\x72\x6d\x5f\x6e\x6f\x74\x69\x63\x65');
return true;
}
const errorPopup=_0x1025();
if(errorPopup&&errorPopup.okBtn){
console.warn(`[\uace8\ud504\ub79c\ub4dc] \ub4f1\ub85d \uc624\ub958 \ud31d\uc5c5 \uac10\uc9c0: '${errorPopup.text}' -> [\ud655\uc778] \ud074\ub9ad \ud6c4 \ub2eb\uae30`);
await _0x1009(errorPopup.okBtn);
try{errorPopup.okBtn.click();}catch(e){}
await _0x1006(400);
const openModal=_0x1022();
if(openModal){
const closeBtn=_0x1023(openModal);
if(closeBtn)await _0x1009(closeBtn);
window.postMessage({type:'\x5f\x5f\x47\x4f\x4c\x46\x4c\x41\x4e\x44\x5f\x43\x4c\x4f\x53\x45\x5f\x4d\x4f\x44\x41\x4c\x5f\x5f'},'*');
await _0x1006(300);
}
handled=true;
await _0x1034('\x65\x72\x72\x6f\x72\x5f\x73\x6b\x69\x70');
return false;
}
const elapsed=Date.now()-clickAt;
if(elapsed>1500&&elapsed<1900){
const curModal=_0x1022();
if(curModal&&_0x101b(curModal)&&submitBtn.isConnected){
console.log("[\uace8\ud504\ub79c\ub4dc] \uc81c\ucd9c \ubc18\uc751 \uc5c6\uc74c -> \x4d\x41\x49\x4e \uc6d4\ub4dc \ud3f4\ubc31 \ud074\ub9ad \x31\ud68c");
window.postMessage({type:'\x5f\x5f\x47\x4f\x4c\x46\x4c\x41\x4e\x44\x5f\x53\x55\x42\x4d\x49\x54\x5f\x4d\x4f\x44\x41\x4c\x5f\x5f'},'*');
}
}
const curModal=_0x1022();
if(!curModal&&elapsed>2000){
console.log("[\uace8\ud504\ub79c\ub4dc] \ub4f1\ub85d \ubaa8\ub2ec \ub2eb\ud798 \uac10\uc9c0 -> \ub2e4\uc74c \uac74 \uc9c4\ud589");
handled=true;
await _0x1034('\x6d\x6f\x64\x61\x6c\x5f\x63\x6c\x6f\x73\x65\x64');
return true;
}
await _0x1006(pollInterval);
}
if(!handled){
console.log("[\uace8\ud504\ub79c\ub4dc] \uc751\ub2f5 \ub300\uae30 \uc644\ub8cc -> \ubaa8\ub2ec \uc815\ub9ac \ud6c4 \ub2e4\uc74c \uac74 \uc9c4\ud589");
const openModal=_0x1022();
if(openModal){
const closeBtn=_0x1023(openModal);
if(closeBtn)await _0x1009(closeBtn);
window.postMessage({type:'\x5f\x5f\x47\x4f\x4c\x46\x4c\x41\x4e\x44\x5f\x43\x4c\x4f\x53\x45\x5f\x4d\x4f\x44\x41\x4c\x5f\x5f'},'*');
}
await _0x1034('\x74\x69\x6d\x65\x6f\x75\x74\x5f\x66\x61\x6c\x6c\x62\x61\x63\x6b');
return true;
}
return true;
}else{
console.error("[\uace8\ud504\ub79c\ub4dc] \ubaa8\ub2ec \ub0b4 [\ub4f1\ub85d] \ubc84\ud2bc\uc744 \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4\x2e");
return false;
}
}
async function _0x1034(trigger='\x75\x6e\x6b\x6e\x6f\x77\x6e'){
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
platform:'\x67\x6f\x6c\x66\x6c\x61\x6e\x64',
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
_0x1004({
current:task.totalCount,
total:task.totalCount,
isCompleted:true
});
try{
await new Promise(r=>chrome.storage.local.set({
golfland_task:null,
golfland_isRegistrationRunning:false
},r));
}catch(e){}
chrome.runtime.sendMessage({type:'\x47\x4f\x4c\x46\x4c\x41\x4e\x44\x5f\x43\x4f\x4d\x50\x4c\x45\x54\x45\x44',total:task.totalCount});
const openModal=_0x1022();
if(openModal){
const closeBtn=_0x1023(openModal);
if(closeBtn)await _0x1009(closeBtn);
}
return;
}
task.status='\x63\x6f\x6f\x6c\x64\x6f\x77\x6e\x5f\x77\x61\x69\x74\x69\x6e\x67';
try{
await new Promise(r=>chrome.storage.local.set({golfland_task:task},r));
}catch(e){}
const nextItem=task.items[nextIdx];
const isNextTransfer=Boolean(task.mode==='\x74\x72\x61\x6e\x73\x66\x65\x72'||nextItem.roomType==='\uc591\ub3c4');
const cooldownMs=_0x1008(task.delayPreset||'\x73\x61\x66\x65');
const cooldownSec=(cooldownMs/1000).toFixed(1);
console.log(`[\uace8\ud504\ub79c\ub4dc] \ub2e4\uc74c \ud56d\ubaa9 \uc900\ube44 \uc911 (${nextIdx+1}/${task.totalCount})... ${cooldownSec}\ucd08 \ub300\uae30 \ud6c4 \uc791\uc131`);
_0x1004({
title:isNextTransfer?'\ud83c\udf3f \uace8\ud504\ub79c\ub4dc \uc591\ub3c4 \ub4f1\ub85d \ub300\uae30 \uc911':'\ud83c\udf3f \uace8\ud504\ub79c\ub4dc \uc870\uc778 \ub4f1\ub85d \ub300\uae30 \uc911',
current:nextIdx,
total:task.totalCount,
desc:`\u23f3 \uc0ac\ub78c\ucc98\ub7fc \ub300\uae30 \uc911... [${nextItem.golf}] \uc900\ube44 (${cooldownSec}\ucd08 \uc9c0\uc5f0)`
});
chrome.runtime.sendMessage({
type:'\x47\x4f\x4c\x46\x4c\x41\x4e\x44\x5f\x57\x41\x49\x54\x49\x4e\x47',
current:nextIdx,
total:task.totalCount,
waitSec:cooldownSec,
nextGolf:nextItem.golf||''
});
const openModal=_0x1022();
if(openModal){
const closeBtn=_0x1023(openModal);
if(closeBtn)await _0x1009(closeBtn);
}
let leftSec=parseFloat(cooldownSec);
const timer=setInterval(()=>{
leftSec=Math.max(0,leftSec-0.4);
const descEl=document.getElementById('\x67\x6c\x64\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x64\x65\x73\x63');
if(descEl&&!shouldStopRegistration){
descEl.innerText=`\u23f3 \uc0ac\ub78c\ucc98\ub7fc \ub300\uae30 \uc911... [${nextItem.golf}] \uc900\ube44 (${leftSec.toFixed(1)}\ucd08)`;
}
},400);
await _0x1006(cooldownMs);
clearInterval(timer);
if(shouldStopRegistration)return;
task.status='\x70\x65\x6e\x64\x69\x6e\x67';
try{
await new Promise(r=>chrome.storage.local.set({golfland_task:task},r));
}catch(e){}
await _0x1035();
}finally{
isHandlingNextItem=false;
}
}
async function _0x1035(){
try{
const res=await new Promise(r=>chrome.storage.local.get(['\x67\x6f\x6c\x66\x6c\x61\x6e\x64\x5f\x74\x61\x73\x6b'],r));
const task=res?.golfland_task;
if(!task||!task.isRunning||!task.items||task.items.length===0)return;
if(task.currentIndex>=task.totalCount){
_0x1002(false);
await new Promise(r=>chrome.storage.local.set({golfland_task:null,isRegistrationRunning:false},r));
_0x1004({isCompleted:true,total:task.totalCount});
return;
}
_0x1002(true);
shouldStopRegistration=false;
if(task.status==='\x73\x75\x62\x6d\x69\x74\x74\x69\x6e\x67'){
console.log(`[\uace8\ud504\ub79c\ub4dc] \uc9c1\uc804 \ud0c0\uc784([${task.currentIndex+1}/${task.totalCount}] ${task.items[task.currentIndex]?.golf}) \ub4f1\ub85d \uc644\ub8cc \uac10\uc9c0 -> \ub2e4\uc74c \uac74\uc73c\ub85c \uc9c4\ud589!`);
await _0x1034('\x73\x75\x62\x6d\x69\x74\x74\x69\x6e\x67\x5f\x70\x61\x67\x65\x5f\x6c\x6f\x61\x64');
return;
}
const curItem=task.items[task.currentIndex];
if(!curItem)return;
const isTransfer=Boolean(task.mode==='\x74\x72\x61\x6e\x73\x66\x65\x72'||curItem.roomType==='\uc591\ub3c4');
_0x1003();
_0x1004({
title:isTransfer?'\ud83c\udf3f \uace8\ud504\ub79c\ub4dc \uc591\ub3c4 \ub4f1\ub85d \uc9c4\ud589 \uc911':'\ud83c\udf3f \uace8\ud504\ub79c\ub4dc \uc870\uc778 \ub4f1\ub85d \uc9c4\ud589 \uc911',
desc:`[${task.currentIndex+1}/${task.totalCount}] ${curItem.golf} (${curItem.date} ${curItem.time}) \uc900\ube44 \uc911...`,
current:task.currentIndex,
total:task.totalCount
});
const currentPath=window.location.pathname;
if(!currentPath.includes('\x62\x6f\x6f\x6b\x69\x6e\x67\x4d\x61\x69\x6e\x2e\x70\x68\x70')){
console.log("[\uace8\ud504\ub79c\ub4dc] \ubd80\ud0b9\ud504\ub77c\uc790 \uba54\uc778 \ud398\uc774\uc9c0\ub85c \uc774\ub3d9\x3a",currentPath);
window.location.href='\x68\x74\x74\x70\x73\x3a\x2f\x2f\x67\x6f\x6c\x66\x6c\x61\x6e\x64\x2e\x63\x6f\x2e\x6b\x72\x2f\x77\x65\x62\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x4d\x61\x69\x6e\x2e\x70\x68\x70';
return;
}
task.status='\x66\x69\x6c\x6c\x69\x6e\x67';
try{
await new Promise(r=>chrome.storage.local.set({golfland_task:task},r));
}catch(e){}
await _0x1006(_0x1007('\x6e\x6f\x72\x6d\x61\x6c',task.stepPreset||'\x68\x75\x6d\x61\x6e'));
if(shouldStopRegistration)return;
await _0x1033(curItem,task);
}catch(err){
console.error("[\uace8\ud504\ub79c\ub4dc] \ud0dc\uc2a4\ud06c \uc7ac\uac1c \uc5d0\ub7ec\x3a",err);
}
}
chrome.runtime.onMessage.addListener((msg,sender,sendResponse)=>{
if(msg.isAdmin!==undefined){
isDebugAdmin=!!msg.isAdmin;
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
window.location.href='\x68\x74\x74\x70\x73\x3a\x2f\x2f\x67\x6f\x6c\x66\x6c\x61\x6e\x64\x2e\x63\x6f\x2e\x6b\x72\x2f\x77\x65\x62\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x4d\x61\x69\x6e\x2e\x70\x68\x70';
}else{
_0x1035();
}
sendResponse({success:true});
}else if(msg.action==='\x53\x54\x4f\x50\x5f\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e'||msg.action==='\x53\x54\x4f\x50\x5f\x47\x4f\x4c\x46\x4c\x41\x4e\x44\x5f\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e'){
console.log("[\uace8\ud504\ub79c\ub4dc] \ub4f1\ub85d \uc911\ub2e8 \uba54\uc2dc\uc9c0 \uc218\uc2e0");
shouldStopRegistration=true;
isRegistrationRunning=false;
_0x1004({
desc:'\ud83d\uded1 \uc790\ub3d9\ub4f1\ub85d\uc774 \uc911\ub2e8\ub418\uc5c8\uc2b5\ub2c8\ub2e4\x2e',
isStopped:true
});
_0x1005();
sendResponse({success:true});
}
});
if(document.readyState==='\x6c\x6f\x61\x64\x69\x6e\x67'){
document.addEventListener('\x44\x4f\x4d\x43\x6f\x6e\x74\x65\x6e\x74\x4c\x6f\x61\x64\x65\x64',()=>{
setTimeout(_0x1035,500);
});
}else{
setTimeout(_0x1035,500);
}
