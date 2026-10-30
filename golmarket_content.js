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
window.addEventListener('\x6d\x65\x73\x73\x61\x67\x65',async(e)=>{
if(e.data&&e.data.type==='\x5f\x5f\x55\x49\x5f\x44\x49\x41\x4c\x4f\x47\x5f\x4e\x4f\x54\x49\x43\x45\x5f\x5f'){
const alertText=e.data.text||'';
console.warn("[\uace8\ub9c8\ucf13 \x41\x6c\x65\x72\x74 \uc218\uc2e0]\x3a",alertText);
if(alertText.includes('\ub4f1\ub85d\ub418\uc5c8\uc2b5\ub2c8\ub2e4')||alertText.includes('\ub4f1\ub85d \uc644\ub8cc')||alertText.includes('\uc131\uacf5')){
console.log("\ud83c\udf89 [\uace8\ub9c8\ucf13] '\ub4f1\ub85d\ub418\uc5c8\uc2b5\ub2c8\ub2e4' \uc54c\ub9bc \uc218\uc2e0! \uc131\uacf5 \uac10\uc9c0 \ubc0f \ub2e4\uc74c \uac74 \uc900\ube44\x2e\x2e\x2e");
setTimeout(async()=>{
const checkRes=await new Promise(r=>chrome.storage.local.get(['\x67\x6f\x6c\x6d\x61\x72\x6b\x65\x74\x5f\x74\x61\x73\x6b'],r));
const task=checkRes?.golmarket_task;
if(task&&task.isRunning&&task.status==='\x73\x75\x62\x6d\x69\x74\x74\x69\x6e\x67'){
console.log("[\uace8\ub9c8\ucf13] '\ub4f1\ub85d\ub418\uc5c8\uc2b5\ub2c8\ub2e4' \ud6c4\uc18d \ud398\uc774\uc9c0 \uc774\ub3d9 \uc2e4\ud589\x2e\x2e\x2e");
const isTransfer=Boolean(task.isTransferMode||task.mode==='\x74\x72\x61\x6e\x73\x66\x65\x72'||(task.items&&task.items.some(it=>it.roomType==='\uc591\ub3c4')));
if(isTransfer){
window.location.href='\x68\x74\x74\x70\x73\x3a\x2f\x2f\x67\x6f\x6c\x6d\x61\x72\x6b\x65\x74\x2e\x63\x6f\x2e\x6b\x72\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x5f\x66\x6f\x72\x6d\x2e\x70\x68\x70';
}else{
window.location.href='\x68\x74\x74\x70\x73\x3a\x2f\x2f\x77\x77\x77\x2e\x67\x6f\x6c\x6d\x61\x72\x6b\x65\x74\x2e\x63\x6f\x2e\x6b\x72\x2f\x6a\x6f\x69\x6e\x5f\x6c\x69\x73\x74\x2e\x70\x68\x70';
}
}
},1200);
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
golmarket_task:null,
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
let hud=document.getElementById('\x67\x6d\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x77\x72\x61\x70');
if(hud)return hud;
hud=document.createElement('\x64\x69\x76');
hud.id='\x67\x6d\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x77\x72\x61\x70';
hud.style.cssText=`
        position: fixed !important;
        top: 20px !important;
        right: 24px !important;
        width: 320px !important;
        max-width: 92vw !important;
        background: #ffffff !important;
        border: 2px solid #13392E !important;
        border-radius: 12px !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(19, 57, 46, 0.12) !important;
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
            <div style="display: flex; align-items: center; gap: 6px; font-weight: 800; font-size: 13.5px; color: #13392E;">
                <span style="font-size: 16px;">\u26f3</span>
                <span id="gm_status_panel_title">\uace8\ub9c8\ucf13 \uc790\ub3d9 \ub4f1\ub85d \uc9c4\ud589 \uc911</span>
            </div>
            <span style="background: #E8F5E9; color: #1B5E20; font-size: 10px; font-weight: 800; padding: 2px 7px; border-radius: 10px; border: 1px solid #A5D6A7;">LIVE</span>
        </div>
        <div id="gm_status_panel_desc" style="font-size: 12px; color: #4B5563; margin-bottom: 9px; line-height: 1.4; word-break: break-all; min-height: 28px;">
            \uace8\ub9c8\ucf13 \ud654\uba74\uc744 \uc900\ube44\ud558\uace0 \uc788\uc2b5\ub2c8\ub2e4...
        </div>
        <div style="background: #E5E7EB; border-radius: 10px; height: 9px; overflow: hidden; margin-bottom: 9px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);">
            <div id="gm_status_panel_bar" style="background: linear-gradient(90deg, #10B981, #059669); height: 100%; width: 0%; transition: width 0.35s ease; border-radius: 10px;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <div id="gm_status_panel_count" style="font-size: 11.5px; font-weight: 800; color: #10B981;">
                0 / 0\uac74 \uc644\ub8cc
            </div>
            <button id="gm_status_panel_stop" style="
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
const stopBtn=hud.querySelector('\x23\x67\x6d\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x73\x74\x6f\x70');
if(stopBtn){
stopBtn.addEventListener('\x63\x6c\x69\x63\x6b',async()=>{
console.log("[\uace8\ub9c8\ucf13 \x48\x55\x44] \uc0ac\uc6a9\uc790\uac00 \uc628\uc2a4\ud06c\ub9b0 \ud83d\uded1 \uc911\ub2e8\ud558\uae30 \ud074\ub9ad");
shouldStopRegistration=true;
isRegistrationRunning=false;
try{
await new Promise(r=>chrome.storage.local.set({
golmarket_task:null,
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
function _0x1002({title,desc,current,total,isCompleted,isStopped,waitSec,nextGolf}){
const hud=_0x1001();
if(!hud)return;
if(title){
const titleEl=hud.querySelector('\x23\x67\x6d\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x74\x69\x74\x6c\x65');
if(titleEl)titleEl.innerText=title;
}
if(desc){
const descEl=hud.querySelector('\x23\x67\x6d\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x64\x65\x73\x63');
if(descEl)descEl.innerText=desc;
}
const barEl=hud.querySelector('\x23\x67\x6d\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x62\x61\x72');
const countEl=hud.querySelector('\x23\x67\x6d\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x63\x6f\x75\x6e\x74');
if(total&&total>0){
const cur=current||0;
const pct=Math.min(100,Math.round((cur/total)*100));
if(barEl)barEl.style.width=`${pct}%`;
if(countEl)countEl.innerText=`${cur} / ${total}\uac74 (${pct}%)`;
}
if(isCompleted){
if(barEl)barEl.style.width='\x31\x30\x30%';
const descEl=hud.querySelector('\x23\x67\x6d\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x64\x65\x73\x63');
if(descEl)descEl.innerText=`\ud83c\udf89 \ucd1d ${total||''}\uac74\uc758 \ub4f1\ub85d\uc774 \ubaa8\ub450 \uc644\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4!`;
const countEl=hud.querySelector('\x23\x67\x6d\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x63\x6f\x75\x6e\x74');
if(countEl)countEl.innerText=`${total}/${total}\uac74 \uc644\ub8cc (100%)`;
setTimeout(_0x1003,2600);
}
if(isStopped){
const barEl=hud.querySelector('\x23\x67\x6d\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x62\x61\x72');
if(barEl)barEl.style.background='\x23\x45\x46\x34\x34\x34\x34';
setTimeout(_0x1003,2000);
}
}
function _0x1003(){
const hud=document.getElementById('\x67\x6d\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x77\x72\x61\x70');
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
if(actionType==='\x63\x6f\x75\x72\x73\x65\x5f\x73\x65\x61\x72\x63\x68'){
minMs=Math.round(minMs*1.3);
maxMs=Math.round(maxMs*1.5);
}else if(actionType==='\x62\x65\x66\x6f\x72\x65\x5f\x73\x75\x62\x6d\x69\x74'){
minMs=Math.round(minMs*1.4);
maxMs=Math.round(maxMs*1.7);
}else if(actionType==='\x74\x79\x70\x69\x6e\x67'){
minMs=Math.round(minMs*1.1);
maxMs=Math.round(maxMs*1.25);
}else if(actionType==='\x63\x6c\x69\x63\x6b'){
minMs=Math.round(minMs*0.85);
maxMs=Math.round(maxMs*1.0);
}
const rand=(Math.random()+Math.random()+Math.random())/3;
return Math.floor(rand*(maxMs-minMs)+minMs);
}
function _0x1006(preset='\x73\x61\x66\x65'){
let minMs=2200,maxMs=4500;
if(preset==='\x73\x74\x65\x61\x6c\x74\x68'){
minMs=3500;maxMs=7000;
}else if(preset==='\x66\x61\x73\x74'){
minMs=1200;maxMs=2500;
}else if(preset==='\x74\x75\x72\x62\x6f'){
minMs=600;maxMs=1200;
}else{
minMs=2200;maxMs=4500;
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
const jitterX=(Math.random()-0.5)*(rect.width*0.3);
const jitterY=(Math.random()-0.5)*(rect.height*0.3);
const x=rect.left+rect.width/2+jitterX;
const y=rect.top+rect.height/2+jitterY;
const opts={bubbles:true,cancelable:true,view:window,clientX:x,clientY:y};
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x65\x6e\x74\x65\x72',opts));
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x6f\x76\x65\x72',opts));
await _0x1004(Math.floor(Math.random()*40+30));
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
await _0x1004(Math.floor(Math.random()*80+60));
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
el.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',opts));
}
function _0x1008(golfName){
if(!golfName)return'';
let clean=golfName.replace(/\(.*?\)/g,'').replace(/\[.*?\]/g,'').trim();
clean=clean.replace(/cc|gc/gi,'').trim();
clean=clean.replace(/[^\w\s가-힣0-9]/g,'').trim();
return clean||golfName;
}
const GOLMARKET_GOLF_NAME_MAP={
'\uace8\ud504\uc874\uc9c4\ucc9c':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \uc9c4\ucc9c',
'\uace8\ud504\uc874\ud654\ub791':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \ud654\ub791',
'\uace8\ud504\uc874\uc1a1\ub3c4':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \uc1a1\ub3c4',
'\uace8\ud504\uc874\ucc9c\uc548':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \ucc9c\uc548',
'\uace8\ud504\uc874 \uc9c4\ucc9c':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \uc9c4\ucc9c',
'\uace8\ud504\uc874 \ud654\ub791':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \ud654\ub791',
'\uace8\ud504\uc874 \uc1a1\ub3c4':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \uc1a1\ub3c4',
'\uace8\ud504\uc874 \ucc9c\uc548':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \ucc9c\uc548',
'\uace8\ud504\uc874\uce74\uc6b4\ud2f0\uc9c4\ucc9c':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \uc9c4\ucc9c',
'\uace8\ud504\uc874\uce74\uc6b4\ud2f0\ud654\ub791':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \ud654\ub791',
'\uace8\ud504\uc874\uce74\uc6b4\ud2f0\uc1a1\ub3c4':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \uc1a1\ub3c4',
'\uace8\ud504\uc874\uce74\uc6b4\ud2f0\ucc9c\uc548':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \ucc9c\uc548',
'\uace8\ud504\uc874\uc548\uc131\x48':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \uc548\uc131\x48',
'\uace8\ud504\uc874\uc548\uc131\x57':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \uc548\uc131\x57',
'\uace8\ud504\uc874\uce74\uc6b4\ud2f0\uc548\uc131\x48':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \uc548\uc131\x48',
'\uace8\ud504\uc874\uce74\uc6b4\ud2f0\uc548\uc131\x57':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \uc548\uc131\x57',
'\uace8\ud504\uc874\uc120\uc6b4':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \uc120\uc6b4',
'\uace8\ud504\uc874\uccad\ud1b5':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \uccad\ud1b5',
'\uace8\ud504\uc874\uac10\ud3ec':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \uac10\ud3ec',
'\uace8\ud504\uc874\uc21c\ucc9c':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \uc21c\ucc9c',
'\uace8\ud504\uc874\uc0ac\ucc9c':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \uc0ac\ucc9c',
'\uace8\ud504\uc874\uad6c\ubbf8':'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \uad6c\ubbf8'
};
function _0x1009(golfName){
if(!golfName)return'';
const clean=String(golfName).trim();
if(GOLMARKET_GOLF_NAME_MAP[clean]){
return GOLMARKET_GOLF_NAME_MAP[clean];
}
const noSpace=clean.replace(/[\s\-_]/g,'');
for(const[k,v]of Object.entries(GOLMARKET_GOLF_NAME_MAP)){
if(k.replace(/[\s\-_]/g,'')===noSpace)return v;
}
if(/골프존.*진천/i.test(clean))return'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \uc9c4\ucc9c';
if(/골프존.*화랑/i.test(clean))return'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \ud654\ub791';
if(/골프존.*송도/i.test(clean))return'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \uc1a1\ub3c4';
if(/골프존.*천안/i.test(clean))return'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \ucc9c\uc548';
if(/골프존.*안성\s*h/i.test(clean))return'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \uc548\uc131\x48';
if(/골프존.*안성\s*w/i.test(clean))return'\uace8\ud504\uc874\uce74\uc6b4\ud2f0 \uc548\uc131\x57';
return clean;
}
function _0x100a(feeStr){
if(!feeStr)return{won:'',isInquiry:true};
const clean=String(feeStr).trim();
if(clean.includes('\ubb38\uc758')||clean==='\x30'){
return{won:'',isInquiry:true};
}
const hasMan=clean.includes('\ub9cc');
const noComma=clean.replace(/,/g,'');
const numMatch=noComma.match(/([0-9]+(?:\.[0-9]+)?)/);
if(numMatch){
const floatVal=parseFloat(numMatch[1]);
if(!isNaN(floatVal)){
if(hasMan||floatVal<500){
return{won:String(Math.round(floatVal*10000)),isInquiry:false};
}else{
return{won:String(Math.round(floatVal)),isInquiry:false};
}
}
}
return{won:'',isInquiry:true};
}
function _0x100b(dateStr){
if(!dateStr)return'';
const now=new Date();
const currentYear=now.getFullYear();
const clean=dateStr.trim();
const mFull=clean.match(/(\d{4})[./-](\d{1,2})[./-](\d{1,2})/);
if(mFull){
return`${mFull[1]}-${mFull[2].padStart(2,'\x30')}-${mFull[3].padStart(2,'\x30')}`;
}
const mShort=clean.match(/(\d{1,2})[./-](\d{1,2})/);
if(mShort){
return`${currentYear}-${mShort[1].padStart(2,'\x30')}-${mShort[2].padStart(2,'\x30')}`;
}
return dateStr;
}
function _0x100c(){
const byName=document.querySelector('\x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65="\x67\x66\x5f\x6e\x61\x6d\x65"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65="\x67\x6f\x6c\x66\x5f\x6e\x61\x6d\x65"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65="\x67\x6f\x6c\x66"], \x69\x6e\x70\x75\x74[\x69\x64="\x67\x66\x5f\x6e\x61\x6d\x65"], \x69\x6e\x70\x75\x74[\x69\x64="\x67\x6f\x6c\x66\x5f\x6e\x61\x6d\x65"]');
if(byName)return byName;
const labels=Array.from(document.querySelectorAll('\x74\x68, \x74\x64, \x6c\x61\x62\x65\x6c, \x64\x69\x76, \x73\x70\x61\x6e'));
for(const el of labels){
if(el.textContent.trim()==='\uace8\ud504\uc7a5'&&el.offsetHeight>0){
const tr=el.closest('\x74\x72')||el.parentElement;
if(tr){
const inp=tr.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"], \x69\x6e\x70\x75\x74\x3a\x6e\x6f\x74([\x74\x79\x70\x65])');
if(inp)return inp;
}
}
}
return document.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"]');
}
function _0x100d(){
const byName=document.querySelector('\x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65="\x62\x6f\x6f\x6b\x69\x6e\x67\x5f\x64\x61\x74\x65"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65="\x62\x5f\x64\x61\x74\x65"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65="\x64\x61\x74\x65"], \x69\x6e\x70\x75\x74\x2e\x64\x61\x74\x65\x70\x69\x63\x6b\x65\x72, \x69\x6e\x70\x75\x74\x23\x64\x61\x74\x65\x70\x69\x63\x6b\x65\x72');
if(byName)return byName;
const labels=Array.from(document.querySelectorAll('\x74\x68, \x74\x64, \x6c\x61\x62\x65\x6c'));
for(const el of labels){
if(el.textContent.trim().includes('\ubd80\ud0b9\uc77c\uc2dc')&&el.offsetHeight>0){
const tr=el.closest('\x74\x72')||el.parentElement;
if(tr){
const inps=Array.from(tr.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"], \x69\x6e\x70\x75\x74\x3a\x6e\x6f\x74([\x74\x79\x70\x65])'));
if(inps.length>0)return inps[0];
}
}
}
return null;
}
function _0x100e(){
const byName=document.querySelector('\x73\x65\x6c\x65\x63\x74[\x6e\x61\x6d\x65="\x62\x6f\x6f\x6b\x69\x6e\x67\x5f\x68\x6f\x75\x72"], \x73\x65\x6c\x65\x63\x74[\x6e\x61\x6d\x65="\x62\x5f\x68\x6f\x75\x72"], \x73\x65\x6c\x65\x63\x74[\x6e\x61\x6d\x65="\x68\x6f\x75\x72"]');
if(byName)return byName;
const selects=Array.from(document.querySelectorAll('\x73\x65\x6c\x65\x63\x74'));
for(const sel of selects){
const parentText=(sel.parentElement?.textContent||'');
if(parentText.includes('\uc2dc')||sel.closest('\x74\x72')?.textContent.includes('\ubd80\ud0b9\uc77c\uc2dc')){
return sel;
}
}
return selects[0]||null;
}
function _0x100f(){
const byName=document.querySelector('\x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65="\x62\x6f\x6f\x6b\x69\x6e\x67\x5f\x6d\x69\x6e\x75\x74\x65"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65="\x62\x5f\x6d\x69\x6e\x75\x74\x65"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65="\x6d\x69\x6e\x75\x74\x65"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x6d\x69\x6e"], \x73\x65\x6c\x65\x63\x74[\x6e\x61\x6d\x65="\x62\x6f\x6f\x6b\x69\x6e\x67\x5f\x6d\x69\x6e\x75\x74\x65"], \x73\x65\x6c\x65\x63\x74[\x6e\x61\x6d\x65="\x62\x5f\x6d\x69\x6e\x75\x74\x65"], \x73\x65\x6c\x65\x63\x74[\x6e\x61\x6d\x65="\x6d\x69\x6e\x75\x74\x65"], \x73\x65\x6c\x65\x63\x74[\x6e\x61\x6d\x65*="\x6d\x69\x6e"]');
if(byName)return byName;
const hourSel=_0x100e();
if(hourSel){
let el=hourSel.nextElementSibling;
while(el){
if(el.tagName&&(el.tagName.toLowerCase()==='\x69\x6e\x70\x75\x74'||el.tagName.toLowerCase()==='\x73\x65\x6c\x65\x63\x74')){
return el;
}
const nested=el.querySelector?el.querySelector('\x69\x6e\x70\x75\x74, \x73\x65\x6c\x65\x63\x74'):null;
if(nested)return nested;
el=el.nextElementSibling;
}
const parentTr=hourSel.closest('\x74\x72')||hourSel.parentElement;
if(parentTr){
const inps=Array.from(parentTr.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x6e\x75\x6d\x62\x65\x72"], \x69\x6e\x70\x75\x74\x3a\x6e\x6f\x74([\x74\x79\x70\x65])'));
if(inps.length>1)return inps[inps.length-1];
const selects=Array.from(parentTr.querySelectorAll('\x73\x65\x6c\x65\x63\x74'));
if(selects.length>1)return selects[1];
}
}
const labels=Array.from(document.querySelectorAll('\x74\x68, \x74\x64, \x6c\x61\x62\x65\x6c'));
for(const el of labels){
if(el.textContent.trim().includes('\ubd80\ud0b9\uc77c\uc2dc')){
const tr=el.closest('\x74\x72')||el.parentElement;
if(tr){
const inps=Array.from(tr.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x6e\x75\x6d\x62\x65\x72"], \x69\x6e\x70\x75\x74\x3a\x6e\x6f\x74([\x74\x79\x70\x65])'));
if(inps.length>1)return inps[1];
}
}
}
return null;
}
function _0x1010(){
let priceInput=document.querySelector('\x69\x6e\x70\x75\x74[\x70\x6c\x61\x63\x65\x68\x6f\x6c\x64\x65\x72*="\x31\x30\x30\x30\x30\x30"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65="\x70\x72\x69\x63\x65"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65="\x70\x61\x79"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65="\x67\x66\x5f\x70\x72\x69\x63\x65"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65="\x66\x65\x65"]');
let inquiryCheckbox=document.querySelector('\x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65="\x69\x73\x5f\x69\x6e\x71\x75\x69\x72\x79"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65="\x74\x65\x6c\x5f\x69\x6e\x71\x75\x69\x72\x79"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65="\x63\x61\x6c\x6c\x5f\x69\x6e\x71\x75\x69\x72\x79"]');
if(!priceInput||!inquiryCheckbox){
const labels=Array.from(document.querySelectorAll('\x74\x68, \x74\x64, \x6c\x61\x62\x65\x6c'));
for(const el of labels){
if(el.textContent.trim()==='\uac00\uaca9'){
const tr=el.closest('\x74\x72')||el.parentElement;
if(tr){
if(!priceInput)priceInput=tr.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x6e\x75\x6d\x62\x65\x72"], \x69\x6e\x70\x75\x74\x3a\x6e\x6f\x74([\x74\x79\x70\x65])');
if(!inquiryCheckbox){
const chks=tr.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]');
if(chks.length>0)inquiryCheckbox=chks[0];
}
}
}
}
}
return{priceInput,inquiryCheckbox};
}
function _0x1011(labelText,checked){
const targetClean=labelText.replace(/\s/g,'');
const labels=Array.from(document.querySelectorAll('\x6c\x61\x62\x65\x6c'));
for(const label of labels){
const text=label.textContent.trim().replace(/\s/g,'');
if(text===targetClean){
const chk=label.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]')||
(label.htmlFor?document.getElementById(label.htmlFor):null);
if(chk){
if(chk.checked!==checked){
chk.checked=checked;
chk.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
chk.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
}
return true;
}
}
}
const checkboxes=Array.from(document.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]'));
for(const chk of checkboxes){
const val=(chk.value||'').trim().replace(/\s/g,'');
if(val===targetClean){
if(chk.checked!==checked){
chk.checked=checked;
chk.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
chk.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
}
return true;
}
}
for(const chk of checkboxes){
let sib=chk.nextSibling;
while(sib&&sib.nodeType===Node.TEXT_NODE&&!sib.textContent.trim()){
sib=sib.nextSibling;
}
if(sib){
const sibText=(sib.textContent||'').trim().replace(/\s/g,'');
if(sibText===targetClean){
if(chk.checked!==checked){
chk.checked=checked;
chk.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
chk.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
}
return true;
}
}
}
return false;
}
function _0x1012(){
return document.querySelector('\x74\x65\x78\x74\x61\x72\x65\x61[\x6e\x61\x6d\x65="\x6d\x65\x6d\x6f"], \x74\x65\x78\x74\x61\x72\x65\x61[\x6e\x61\x6d\x65="\x63\x6f\x6e\x74\x65\x6e\x74"], \x74\x65\x78\x74\x61\x72\x65\x61[\x6e\x61\x6d\x65="\x77\x72\x5f\x63\x6f\x6e\x74\x65\x6e\x74"], \x74\x65\x78\x74\x61\x72\x65\x61[\x6e\x61\x6d\x65="\x69\x6e\x66\x6f"], \x74\x65\x78\x74\x61\x72\x65\x61');
}
function _0x1013(){
const candidates=Array.from(document.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"], \x62\x75\x74\x74\x6f\x6e[\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"], \x62\x75\x74\x74\x6f\x6e, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"], \x61\x2e\x62\x74\x6e, \x61'));
for(const el of candidates){
const val=(el.value||el.textContent||'').trim();
if(val==='\ub4f1\ub85d\ud558\uae30'||val==='\uc870\uc778\ub4f1\ub85d'||val==='\ub4f1\ub85d'){
if(el.offsetHeight>0)return el;
}
}
return document.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"], \x62\x75\x74\x74\x6f\x6e[\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"]');
}
function _0x1014(keyword){
const items=[];
const golfInput=_0x100c();
const inputRect=golfInput?golfInput.getBoundingClientRect():null;
const cleanKw=(keyword||'').toLowerCase().replace(/[\s\-_gcCC\(\)\[\]]/gi,'');
if(golfInput){
const cell=golfInput.closest('\x74\x64')||golfInput.parentElement;
if(cell){
const cellCandidates=Array.from(cell.querySelectorAll('\x73\x65\x6c\x65\x63\x74, \x6f\x70\x74\x69\x6f\x6e, \x69\x6e\x70\x75\x74, \x62\x75\x74\x74\x6f\x6e, \x61, \x64\x69\x76, \x73\x70\x61\x6e, \x70, \x6c\x69, \x62'));
for(const c of cellCandidates){
if(!c||c===golfInput||c.contains(golfInput))continue;
if(['\x53\x43\x52\x49\x50\x54','\x53\x54\x59\x4c\x45'].includes(c.tagName))continue;
const cText=(c.value||c.textContent||c.innerText||'').trim();
if(/\[\d{2,6}\]/.test(cText)||(cText.length>=2&&cleanKw&&cText.toLowerCase().includes(cleanKw))){
if(!items.includes(c))items.push(c);
}
}
}
}
const allCandidates=Array.from(document.querySelectorAll('\x73\x65\x6c\x65\x63\x74, \x6f\x70\x74\x69\x6f\x6e, \x69\x6e\x70\x75\x74, \x62\x75\x74\x74\x6f\x6e, \x61, \x64\x69\x76, \x6c\x69, \x74\x72, \x74\x64, \x73\x70\x61\x6e, \x70, \x6c\x61\x62\x65\x6c'));
try{
const iframes=Array.from(document.querySelectorAll('\x69\x66\x72\x61\x6d\x65'));
for(const ifr of iframes){
try{
const doc=ifr.contentDocument||ifr.contentWindow?.document;
if(doc){
const ifrCandidates=Array.from(doc.querySelectorAll('\x73\x65\x6c\x65\x63\x74, \x6f\x70\x74\x69\x6f\x6e, \x69\x6e\x70\x75\x74, \x62\x75\x74\x74\x6f\x6e, \x61, \x64\x69\x76, \x6c\x69, \x74\x72, \x74\x64, \x73\x70\x61\x6e, \x70, \x6c\x61\x62\x65\x6c'));
allCandidates.push(...ifrCandidates);
}
}catch(e){}
}
}catch(e){}
for(const el of allCandidates){
if(!el||el===golfInput||(golfInput&&el.contains(golfInput)))continue;
if(['\x54\x45\x58\x54\x41\x52\x45\x41','\x42\x4f\x44\x59','\x48\x54\x4d\x4c','\x53\x43\x52\x49\x50\x54','\x53\x54\x59\x4c\x45'].includes(el.tagName))continue;
if(el.tagName!=='\x4f\x50\x54\x49\x4f\x4e'&&el.offsetHeight<=3&&el.offsetWidth<=5)continue;
const valText=(el.value||'').trim();
const contentText=(el.textContent||el.innerText||'').trim();
const rawText=valText||contentText;
if(!rawText||rawText.length>150)continue;
let isNearInput=false;
if(inputRect){
try{
const r=el.getBoundingClientRect();
const topDiff=r.top-inputRect.top;
const leftDiff=Math.abs(r.left-inputRect.left);
if(topDiff>=-10&&topDiff<=500&&leftDiff<=400){
isNearInput=true;
}
}catch(e){}
}
const hasCode=/\[\d{2,6}\]/.test(rawText);
const cleanRaw=rawText.replace(/[\s\-_gcCC\(\)\[\]]/gi,'').toLowerCase();
const hasKw=cleanKw&&cleanRaw.includes(cleanKw);
if(hasCode||(isNearInput&&hasKw)){
const hasBetterChild=Array.from(el.children).some(child=>{
const cVal=(child.value||child.textContent||child.innerText||'').trim();
return/\[\d{2,6}\]/.test(cVal)&&/[가-힣]/.test(cVal);
});
if(!hasBetterChild){
if(hasCode&&!/[가-힣]/.test(rawText)&&el.parentElement&&el.parentElement!==golfInput){
const pText=(el.parentElement.value||el.parentElement.textContent||'').trim();
if(/[가-힣]/.test(pText)&&!items.includes(el.parentElement)){
items.push(el.parentElement);
continue;
}
}
if(!items.includes(el)){
items.push(el);
}
}
}
}
if(items.length>0)return items;
if(golfInput&&inputRect){
const candidateContainers=Array.from(document.querySelectorAll('\x64\x69\x76, \x75\x6c, \x74\x61\x62\x6c\x65')).filter(container=>{
if(container.offsetHeight<=0||container.contains(golfInput))return false;
const r=container.getBoundingClientRect();
const isUnder=(r.top>=inputRect.top-10&&r.top<=inputRect.bottom+260)&&
(Math.abs(r.left-inputRect.left)<300);
return isUnder;
});
for(const c of candidateContainers){
const rows=Array.from(c.querySelectorAll('\x69\x6e\x70\x75\x74, \x62\x75\x74\x74\x6f\x6e, \x6c\x69, \x74\x72, \x64\x69\x76, \x61, \x70, \x73\x70\x61\x6e')).filter(el=>{
if(el.offsetHeight<=0)return false;
const t=(el.value||el.textContent||'').trim();
return t.length>0&&t.length<80;
});
if(rows.length>0)return rows;
}
}
const standard=document.querySelectorAll('\x2e\x75\x69-\x61\x75\x74\x6f\x63\x6f\x6d\x70\x6c\x65\x74\x65 \x6c\x69, \x2e\x75\x69-\x6d\x65\x6e\x75-\x69\x74\x65\x6d, \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x61\x75\x74\x6f\x63\x6f\x6d\x70\x6c\x65\x74\x65"] \x6c\x69, \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x73\x75\x67\x67\x65\x73\x74"] \x6c\x69, \x23\x67\x6f\x6c\x66\x5f\x6c\x69\x73\x74 \x6c\x69, \x23\x73\x65\x61\x72\x63\x68\x5f\x72\x65\x73\x75\x6c\x74 \x6c\x69, \x23\x61\x75\x74\x6f\x5f\x63\x6f\x6d\x70\x6c\x65\x74\x65 \x64\x69\x76, \x2e\x61\x75\x74\x6f\x5f\x6c\x69\x73\x74 \x64\x69\x76, \x2e\x61\x75\x74\x6f\x5f\x6c\x69\x73\x74 \x6c\x69');
const filteredStd=Array.from(standard).filter(el=>el.offsetHeight>0);
if(filteredStd.length>0)return filteredStd;
return[];
}
function _0x1015(suggestions,targetGolf,rawGolf){
if(!suggestions||suggestions.length===0)return null;
if(suggestions.length===1)return suggestions[0];
const cleanTarget=(targetGolf||'').replace(/[\s\-_gcCC\(\)\[\]]/gi,'').toLowerCase();
const cleanRaw=(rawGolf||'').replace(/[\s\-_gcCC\(\)\[\]]/gi,'').toLowerCase();
const keyword=_0x1008(targetGolf).toLowerCase();
let bestItem=suggestions[0];
let maxScore=-999;
for(const el of suggestions){
const text=(el.value||el.textContent||el.innerText||'').trim();
const cleanItem=text.replace(/\[\d+\]/g,'').replace(/[\s\-_gcCC\(\)\[\]]/gi,'').toLowerCase();
let score=0;
if(cleanRaw&&cleanItem===cleanRaw)score+=150;
if(cleanTarget&&cleanItem===cleanTarget)score+=120;
const subCourses=['\uc624\uc158','\ud074\ub798\uc2dd','\ub808\uc774\ud06c','\ud558\ub298','\ub3d9\ucf54\uc2a4','\uc11c\ucf54\uc2a4','\ub0a8\ucf54\uc2a4','\ubd81\ucf54\uc2a4','\ub9c8\uc6b4\ud2f4','\ubc38\ub9ac','\ud790','\ub8e8\ube44','\ub2e4\uc774\uc544','\uc0ac\ud30c\uc774\uc5b4','\ud30c\uc778','\ube44\uce58','\uc911','\ub3d9','\uc11c','\ub0a8','\ubd81'];
for(const sub of subCourses){
const inSource=cleanRaw.includes(sub)||cleanTarget.includes(sub);
const inItem=cleanItem.includes(sub);
if(inSource&&inItem)score+=80;
else if(inSource&&!inItem)score-=40;
}
if(cleanTarget&&cleanItem.includes(cleanTarget))score+=40;
if(cleanRaw&&cleanItem.includes(cleanRaw))score+=40;
if(keyword&&cleanItem.includes(keyword))score+=30;
if(/\[\d{2,6}\]/.test(text))score+=60;
score-=Math.abs(cleanItem.length-(cleanRaw.length||cleanTarget.length));
if(score>maxScore){
maxScore=score;
bestItem=el;
}
}
return bestItem;
}
async function _0x1016(el,targetGolf=''){
if(!el)return;
try{
el.scrollIntoView({behavior:'\x69\x6e\x73\x74\x61\x6e\x74',block:'\x63\x65\x6e\x74\x65\x72'});
}catch(e){}
await _0x1004(60);
const text=(el.value||el.textContent||el.innerText||'').trim();
const codeMatch=text.match(/\[(\d+)\]/);
const golfCode=codeMatch?codeMatch[1]:'';
const cleanGolfName=text.replace(/\[\d+\]/g,'').trim();
console.log(`[\uace8\ub9c8\ucf13] \u26f3 \uace8\ud504\uc7a5 \uc120\ud0dd \uc2e4\ud589: '${text}' (\ucf54\ub4dc: '${golfCode}', \uad6c\uc7a5\uba85: '${cleanGolfName}')`);
if(el.tagName==='\x4f\x50\x54\x49\x4f\x4e'){
const sel=el.closest('\x73\x65\x6c\x65\x63\x74');
if(sel){
sel.value=el.value;
el.selected=true;
sel.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
sel.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
}
}
if(el.tagName==='\x53\x45\x4c\x45\x43\x54'){
if(el.options.length>0){
el.selectedIndex=0;
el.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
el.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
}
}
const rect=el.getBoundingClientRect();
const x=rect.left+rect.width/2;
const y=rect.top+rect.height/2;
const opts={
bubbles:true,
cancelable:true,
view:window,
clientX:x,
clientY:y,
button:0,
buttons:1,
which:1,
composed:true
};
try{
el.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x64\x6f\x77\x6e',opts));
}catch(e){}
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x65\x6e\x74\x65\x72',opts));
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x6f\x76\x65\x72',opts));
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x6d\x6f\x76\x65',opts));
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
try{el.focus();}catch(e){}
await _0x1004(50);
const upOpts={...opts,buttons:0};
try{
el.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x75\x70',upOpts));
}catch(e){}
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',upOpts));
el.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',opts));
try{
el.click();
}catch(e){}
const parentClickable=el.closest('[\x6f\x6e\x63\x6c\x69\x63\x6b], [\x68\x72\x65\x66], [\x64\x61\x74\x61-\x63\x6f\x64\x65], [\x64\x61\x74\x61-\x69\x64], \x74\x72, \x6c\x69, \x64\x69\x76, \x61, \x62\x75\x74\x74\x6f\x6e');
if(parentClickable&&parentClickable!==el){
parentClickable.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
parentClickable.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',upOpts));
parentClickable.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',opts));
try{
parentClickable.click();
}catch(e){}
}
const inlineOnclick=el.getAttribute('\x6f\x6e\x63\x6c\x69\x63\x6b')||(parentClickable&&parentClickable.getAttribute('\x6f\x6e\x63\x6c\x69\x63\x6b'));
const hrefAttr=el.getAttribute('\x68\x72\x65\x66')||(parentClickable&&parentClickable.getAttribute('\x68\x72\x65\x66'));
let scriptToRun='';
if(inlineOnclick){
scriptToRun+=`try { ${inlineOnclick} } catch(e) { console.error(e); }\n`;
}
if(hrefAttr&&hrefAttr.toLowerCase().startsWith('\x6a\x61\x76\x61\x73\x63\x72\x69\x70\x74\x3a')){
const jsOnly=hrefAttr.substring(11);
scriptToRun+=`try { ${jsOnly} } catch(e) { console.error(e); }\n`;
}
el.setAttribute('\x64\x61\x74\x61-\x61\x63\x74\x69\x76\x65-\x69\x74\x65\x6d','\x74\x72\x75\x65');
scriptToRun+=`
        try {
            var targetEl = document.querySelector('[data-active-item="true"]');
            if (targetEl) {
                targetEl.removeAttribute('data-active-item');
                try { targetEl.click(); } catch(err) {}
            }
            var gCode = "${golfCode}";
            var gName = "${cleanGolfName}";
            var candidateFns = ['sel_golf', 'select_golf', 'set_golf', 'choice_golf', 'choose_golf', 'golf_select', 'put_golf'];
            for (var i = 0; i < candidateFns.length; i++) {
                var fnName = candidateFns[i];
                if (typeof window[fnName] === 'function') {
                    try { window[fnName](gName, gCode); } catch(err) {}
                    try { window[fnName](gCode, gName); } catch(err) {}
                }
            }
        } catch(e) { console.error(e); }
    `;
try{
const sc=document.createElement('\x73\x63\x72\x69\x70\x74');
sc.textContent=scriptToRun;
(document.head||document.documentElement).appendChild(sc);
sc.remove();
}catch(e){}
if(golfCode){
const hiddenCodeInputs=document.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x68\x69\x64\x64\x65\x6e"][\x6e\x61\x6d\x65*="\x67\x6f\x6c\x66"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x68\x69\x64\x64\x65\x6e"][\x6e\x61\x6d\x65*="\x67\x66"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x68\x69\x64\x64\x65\x6e"][\x69\x64*="\x67\x6f\x6c\x66"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x68\x69\x64\x64\x65\x6e"][\x69\x64*="\x67\x66"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x68\x69\x64\x64\x65\x6e"][\x6e\x61\x6d\x65="\x63\x6f\x64\x65"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x68\x69\x64\x64\x65\x6e"][\x6e\x61\x6d\x65="\x62\x5f\x67\x6f\x6c\x66"]');
hiddenCodeInputs.forEach(inp=>{
inp.value=golfCode;
inp.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
inp.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
});
}
const golfInput=_0x100c();
if(golfInput&&cleanGolfName){
golfInput.value=cleanGolfName;
golfInput.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
golfInput.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
}
await _0x1004(200);
}
async function _0x1017(targetGolf){
try{
const suggestions=_0x1014(targetGolf);
if(suggestions&&suggestions.length>0){
const bestPick=_0x1015(suggestions,targetGolf,'');
if(bestPick){
const itemText=(bestPick.value||bestPick.textContent||bestPick.innerText||'').trim();
console.log(`[\uace8\ub9c8\ucf13] \ud83c\udfaf \uace8\ud504\uc7a5 \ucd94\ucc9c \ud56d\ubaa9('${itemText}') \uc790\ub3d9 \ud074\ub9ad \uc120\ud0dd \uc2e4\ud589!`);
await _0x1016(bestPick,targetGolf);
return true;
}
}
}catch(e){
console.error("[\uace8\ub9c8\ucf13] \x65\x6e\x73\x75\x72\x65\x47\x6f\x6c\x66\x53\x75\x67\x67\x65\x73\x74\x69\x6f\x6e\x43\x6c\x69\x63\x6b\x65\x64 \uc5d0\ub7ec\x3a",e);
}
return false;
}
async function _0x1018(targetGolf,rawGolf='',stepPreset='\x68\x75\x6d\x61\x6e'){
const golfInput=_0x100c();
if(!golfInput){
console.error("[\uace8\ub9c8\ucf13] \uace8\ud504\uc7a5 \uc785\ub825 \ud544\ub4dc\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4\x2e");
return false;
}
golfInput.focus();
golfInput.value='';
golfInput.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
await _0x1004(150);
const golmarketTarget=_0x1009(targetGolf)||_0x1009(rawGolf)||targetGolf;
const keyword=_0x1008(golmarketTarget);
console.log(`[\uace8\ub9c8\ucf13] \uace8\ud504\uc7a5 \uac80\uc0c9 \ud0a4\uc6cc\ub4dc: '${keyword}' (\uace8\ub9c8\ucf13 \ud0c0\uac9f: '${golmarketTarget}', \uc6d0\ubcf8: '${targetGolf}', rawGolf: '${rawGolf}')`);
for(let i=0;i<keyword.length;i++){
if(shouldStopRegistration)return false;
const char=keyword[i];
golfInput.value+=char;
golfInput.dispatchEvent(new KeyboardEvent('\x6b\x65\x79\x64\x6f\x77\x6e',{key:char,bubbles:true,cancelable:true}));
golfInput.dispatchEvent(new KeyboardEvent('\x6b\x65\x79\x70\x72\x65\x73\x73',{key:char,bubbles:true,cancelable:true}));
golfInput.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
golfInput.dispatchEvent(new KeyboardEvent('\x6b\x65\x79\x75\x70',{key:char,bubbles:true,cancelable:true}));
await _0x1004(Math.floor(Math.random()*40+35));
}
golfInput.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
let suggestions=[];
const maxWaitMs=2500;
let startWait=Date.now();
while(Date.now()-startWait<maxWaitMs){
if(shouldStopRegistration)return false;
suggestions=_0x1014(keyword);
if(suggestions.length>0)break;
await _0x1004(120);
}
if(suggestions.length===0){
let fallbackKeyword='';
if(golmarketTarget.includes('\uc9c4\ucc9c'))fallbackKeyword='\uc9c4\ucc9c';
else if(golmarketTarget.includes('\ud654\ub791'))fallbackKeyword='\ud654\ub791';
else if(golmarketTarget.includes('\uc1a1\ub3c4'))fallbackKeyword='\uc1a1\ub3c4';
else if(golmarketTarget.includes('\ucc9c\uc548'))fallbackKeyword='\ucc9c\uc548';
if(fallbackKeyword&&fallbackKeyword!==keyword){
console.log(`[\uace8\ub9c8\ucf13] \uace8\ud504\uc7a5 2\ucc28 \ub300\uccb4 \ud0a4\uc6cc\ub4dc \uac80\uc0c9 \uc2dc\ub3c4: '${fallbackKeyword}'`);
golfInput.focus();
golfInput.value='';
golfInput.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
await _0x1004(60);
for(let i=0;i<fallbackKeyword.length;i++){
if(shouldStopRegistration)return false;
const char=fallbackKeyword[i];
golfInput.value+=char;
golfInput.dispatchEvent(new KeyboardEvent('\x6b\x65\x79\x64\x6f\x77\x6e',{key:char,bubbles:true,cancelable:true}));
golfInput.dispatchEvent(new KeyboardEvent('\x6b\x65\x79\x70\x72\x65\x73\x73',{key:char,bubbles:true,cancelable:true}));
golfInput.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
golfInput.dispatchEvent(new KeyboardEvent('\x6b\x65\x79\x75\x70',{key:char,bubbles:true,cancelable:true}));
await _0x1004(Math.floor(Math.random()*35+30));
}
golfInput.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
startWait=Date.now();
while(Date.now()-startWait<2000){
if(shouldStopRegistration)return false;
suggestions=_0x1014(fallbackKeyword);
if(suggestions.length>0)break;
await _0x1004(100);
}
}
}
if(suggestions.length>0){
console.log(`[\uace8\ub9c8\ucf13] \uc790\ub3d9\uc644\uc131 \uac80\uc0c9 \uacb0\uacfc ${suggestions.length}\uac1c \ubc1c\uacac`);
const bestPick=_0x1015(suggestions,golmarketTarget,rawGolf);
if(bestPick){
const itemText=(bestPick.value||bestPick.textContent||bestPick.innerText||'').trim();
console.log(`[\uace8\ub9c8\ucf13] \uc815\ud655\ud55c \uace8\ud504\uc7a5 \ud56d\ubaa9 \uc120\ud0dd: '${itemText}'`);
await _0x1016(bestPick,golmarketTarget);
await _0x1004(250);
return true;
}
}else{
console.warn(`[\uace8\ub9c8\ucf13] '${keyword}' \uc790\ub3d9\uc644\uc131 \ubaa9\ub85d\uc774 \ub098\ud0c0\ub098\uc9c0 \uc54a\uc74c. \uc785\ub825\uac12 \uc720\uc9c0 \ubc0f Enter \ucc98\ub9ac.`);
golfInput.dispatchEvent(new KeyboardEvent('\x6b\x65\x79\x64\x6f\x77\x6e',{key:'\x45\x6e\x74\x65\x72',keyCode:13,which:13,bubbles:true}));
golfInput.dispatchEvent(new KeyboardEvent('\x6b\x65\x79\x75\x70',{key:'\x45\x6e\x74\x65\x72',keyCode:13,which:13,bubbles:true}));
return true;
}
}
async function _0x1019(item,customMemo,stepPreset='\x68\x75\x6d\x61\x6e'){
const golmarketGolf=_0x1009(item.golf)||item.golf;
console.log(`[\uace8\ub9c8\ucf13] \ud83d\udcdd \ud3fc \uc785\ub825 \uc2dc\uc791: ${golmarketGolf} (\uc6d0\ubcf8: ${item.golf}, ${item.date} ${item.time})`);
await _0x1018(golmarketGolf,item.rawGolf||'',stepPreset);
if(shouldStopRegistration)return false;
await _0x1017(golmarketGolf);
await _0x1004(_0x1005('\x63\x6c\x69\x63\x6b',stepPreset));
const dateInput=_0x100d();
if(dateInput){
const formattedDate=_0x100b(item.date);
dateInput.value=formattedDate;
dateInput.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
dateInput.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
console.log(`[\uace8\ub9c8\ucf13] \ub0a0\uc9dc \uc785\ub825: ${formattedDate}`);
}
if(shouldStopRegistration)return false;
await _0x1004(_0x1005('\x63\x6c\x69\x63\x6b',stepPreset));
let targetHour='';
let targetMinute='';
if(item.time){
const cleanTime=String(item.time).trim().replace(/[^0-9:]/g,'');
if(cleanTime.includes('\x3a')){
const parts=cleanTime.split('\x3a');
targetHour=parts[0].padStart(2,'\x30');
targetMinute=parts[1].padStart(2,'\x30');
}else if(cleanTime.length===4){
targetHour=cleanTime.substring(0,2);
targetMinute=cleanTime.substring(2,4);
}else if(cleanTime.length===3){
targetHour=cleanTime.substring(0,1).padStart(2,'\x30');
targetMinute=cleanTime.substring(1,3);
}
}
if(targetHour&&targetMinute){
const targetHourNum=parseInt(targetHour,10);
const targetMinNum=parseInt(targetMinute,10);
const hourSel=_0x100e();
if(hourSel){
hourSel.focus();
const opt=Array.from(hourSel.options).find(o=>{
const val=o.value.trim();
const txt=o.text.trim();
return val===targetHour||
val===String(targetHourNum)||
txt===targetHour||
txt===String(targetHourNum)||
txt.startsWith(targetHour)||
txt.startsWith(String(targetHourNum));
});
if(opt){
hourSel.value=opt.value;
hourSel.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
console.log(`[\uace8\ub9c8\ucf13] \uc2dc\uac04(\uc2dc) \uc120\ud0dd \uc131\uacf5: ${opt.value}\uc2dc`);
}else{
console.warn(`[\uace8\ub9c8\ucf13] \uc2dc\uac04(\uc2dc) '${targetHour}' \uc635\uc158\uc744 \ucc3e\uc9c0 \ubabb\ud568`);
}
}
const minEl=_0x100f();
if(minEl){
if(minEl.tagName.toLowerCase()==='\x73\x65\x6c\x65\x63\x74'){
const opt=Array.from(minEl.options).find(o=>{
const val=o.value.trim();
const txt=o.text.trim();
return val===targetMinute||
val===String(targetMinNum)||
txt===targetMinute||
txt===String(targetMinNum)||
txt.includes(targetMinute);
});
if(opt){
minEl.value=opt.value;
minEl.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
}
}else{
minEl.focus();
minEl.value=targetMinute;
minEl.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
minEl.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
}
console.log(`[\uace8\ub9c8\ucf13] \uc2dc\uac04(\ubd84) \uc785\ub825 \uc131\uacf5: ${targetMinute}\ubd84`);
}
}
if(shouldStopRegistration)return false;
await _0x1004(_0x1005('\x74\x79\x70\x69\x6e\x67',stepPreset));
const{priceInput,inquiryCheckbox}=_0x1010();
const{won,isInquiry}=_0x100a(item.fee);
if(isInquiry){
if(inquiryCheckbox){
inquiryCheckbox.checked=true;
inquiryCheckbox.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
inquiryCheckbox.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
console.log("[\uace8\ub9c8\ucf13] \uac00\uaca9\x3a \uc804\ud654\ubb38\uc758 \uccb4\ud06c");
}
}else{
if(inquiryCheckbox&&inquiryCheckbox.checked){
inquiryCheckbox.checked=false;
inquiryCheckbox.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
inquiryCheckbox.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
}
if(priceInput){
priceInput.focus();
priceInput.value=won;
priceInput.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
priceInput.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
console.log(`[\uace8\ub9c8\ucf13] \uac00\uaca9 \uc785\ub825: ${won}\uc6d0 (\uc6d0\ubcf8: '${item.fee}')`);
}
}
if(shouldStopRegistration)return false;
await _0x1004(_0x1005('\x74\x79\x70\x69\x6e\x67',stepPreset));
const allCheckboxes=document.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]');
allCheckboxes.forEach(chk=>{
if(chk!==inquiryCheckbox&&chk.checked){
chk.checked=false;
chk.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
chk.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
}
});
const toCheck=[];
const pax=(item.sizenum||'').trim();
const cond=(item.condition||'').trim();
const roomType=(item.roomType||'').trim();
const isNoCaddy=(item.cady||'').includes('\ub178\uce90\ub514');
const isPrepaid=(item.isPrepaid===true||item.isPrepaid==='\x74\x72\x75\x65');
const isTransfer=(roomType==='\uc591\ub3c4'||(item.category||'')==='\uc591\ub3c4');
if(isTransfer){
toCheck.push('\x34\uc778');
if(isPrepaid&&toCheck.length<2)toCheck.push('\uc120\uc785\uae08');
if(isNoCaddy&&toCheck.length<2)toCheck.push('\ub178\uce90\ub514');
}
else{
if(isNoCaddy)toCheck.push('\ub178\uce90\ub514');
if(isPrepaid)toCheck.push('\uc120\uc785\uae08');
if(toCheck.length<2){
if(pax.includes('\x34\uc778')||pax.includes('\x34\uba85')){
if(!toCheck.includes('\x32\uc778')&&toCheck.length<2)toCheck.push('\x32\uc778');
if(!toCheck.includes('\x31\uc778')&&toCheck.length<2)toCheck.push('\x31\uc778');
}
else if(pax.includes('\x31\uc778')||pax.includes('\x31\uba85')){
if(!toCheck.includes('\x31\uc778')){
toCheck.push('\x31\uc778');
}
}
else if(pax.includes('\x32\uc778')||pax.includes('\x32\uba85')){
if(cond.includes('\ub0a8\uc790')||cond.includes('\ub0a8\uc131')){
if(!toCheck.includes('\x32\uc778\ub0a8\uc131')){
toCheck.push('\x32\uc778\ub0a8\uc131');
}
}
else if(cond.includes('\uc5ec\uc790')||cond.includes('\uc5ec\uc131')){
if(!toCheck.includes('\x32\uc778')&&toCheck.length<2)toCheck.push('\x32\uc778');
if(!toCheck.includes('\x32\uc778\uc5ec\uc131')&&toCheck.length<2)toCheck.push('\x32\uc778\uc5ec\uc131');
}
else if(cond.includes('\ucee4\ud50c')||cond.includes('\ubd80\ubd80')){
if(!toCheck.includes('\x32\uc778')&&toCheck.length<2)toCheck.push('\x32\uc778');
if(!toCheck.includes('\ucee4\ud50c')&&toCheck.length<2)toCheck.push('\ucee4\ud50c');
}
else{
if(!toCheck.includes('\x32\uc778')&&toCheck.length<2)toCheck.push('\x32\uc778');
}
}
else{
if((cond.includes('\ucee4\ud50c')||cond.includes('\ubd80\ubd80'))&&toCheck.length<2){
toCheck.push('\ucee4\ud50c');
}
}
}
if(toCheck.length===0){
if(pax.includes('\x34\uc778')||pax.includes('\x34\uba85')){
toCheck.push('\x32\uc778');
toCheck.push('\x31\uc778');
}else if(pax.includes('\x31\uc778')||pax.includes('\x31\uba85')){
toCheck.push('\x31\uc778');
}else{
toCheck.push('\x32\uc778');
}
}
}
const finalChecks=toCheck.slice(0,2);
console.log(`[\uace8\ub9c8\ucf13] \uad6c\uc131 \uccb4\ud06c\ubc15\uc2a4 \ucd5c\uc885 \uc120\ud0dd (${finalChecks.length}\uac1c, \uc591\ub3c4\uc5ec\ubd80: ${isTransfer}):`,finalChecks);
for(const label of finalChecks){
const success=_0x1011(label,true);
if(!success){
console.warn(`[\uace8\ub9c8\ucf13] \uccb4\ud06c\ubc15\uc2a4 '${label}' \uc694\uc18c\ub97c \ucc3e\uc9c0 \ubabb\ud568`);
}
}
if(shouldStopRegistration)return false;
await _0x1004(_0x1005('\x63\x6c\x69\x63\x6b',stepPreset));
const memoEl=_0x1012();
const targetMemo=item.memo||customMemo;
if(memoEl&&targetMemo){
memoEl.value=targetMemo;
memoEl.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
memoEl.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
console.log(`[\uace8\ub9c8\ucf13] \uc0c1\uc138 \uba54\ubaa8 \uc785\ub825 \uc644\ub8cc (\ucd9c\ucc98: ${item.source||'\uae30\ubcf8'})`);
}
if(shouldStopRegistration)return false;
await _0x1017(golmarketGolf);
await _0x1004(_0x1005('\x62\x65\x66\x6f\x72\x65\x5f\x73\x75\x62\x6d\x69\x74',stepPreset));
if(shouldStopRegistration)return false;
const submitBtn=_0x1013();
if(submitBtn){
console.log("[\uace8\ub9c8\ucf13] \ud83d\ude80 '\ub4f1\ub85d\ud558\uae30' \ubc84\ud2bc \ud074\ub9ad!");
await _0x1007(submitBtn);
return true;
}else{
console.error("[\uace8\ub9c8\ucf13] '\ub4f1\ub85d\ud558\uae30' \ubc84\ud2bc\uc744 \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4\x2e");
return false;
}
}
async function _0x101a(){
console.log("[\uace8\ub9c8\ucf13] \ud83d\udcc5 \ubd80\ud0b9(\uc591\ub3c4) \ub4f1\ub85d \ud3fc(\x62\x6f\x6f\x6b\x69\x6e\x67\x5f\x66\x6f\x72\x6d\x2e\x70\x68\x70)\uc73c\ub85c \uc9c1\uc811 \uc774\ub3d9\ud569\ub2c8\ub2e4\x2e");
if(!window.location.href.includes('\x62\x6f\x6f\x6b\x69\x6e\x67\x5f\x66\x6f\x72\x6d\x2e\x70\x68\x70')){
window.location.href='\x68\x74\x74\x70\x73\x3a\x2f\x2f\x67\x6f\x6c\x6d\x61\x72\x6b\x65\x74\x2e\x63\x6f\x2e\x6b\x72\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x5f\x66\x6f\x72\x6d\x2e\x70\x68\x70';
}
return true;
}
async function _0x101b(){
try{
const res=await new Promise(r=>chrome.storage.local.get(['\x67\x6f\x6c\x6d\x61\x72\x6b\x65\x74\x5f\x74\x61\x73\x6b'],r));
const task=res?.golmarket_task;
if(!task||!task.isRunning){
_0x1003();
return;
}
const isTransferTask=Boolean(task.isTransferMode||task.mode==='\x74\x72\x61\x6e\x73\x66\x65\x72'||(task.items&&task.items.some(it=>it.roomType==='\uc591\ub3c4')));
const modeTitle=isTransferTask?'\ud83d\udcc5 \uace8\ub9c8\ucf13 \ubd80\ud0b9(\uc591\ub3c4) \ub4f1\ub85d \uc9c4\ud589 \uc911':'\ud83d\uded2 \uace8\ub9c8\ucf13 \uc870\uc778 \ub4f1\ub85d \uc9c4\ud589 \uc911';
const currentUrl=window.location.href;
console.log(`[\uace8\ub9c8\ucf13 \ub9e4\ub2c8\uc800] \ud604\uc7ac \ud398\uc774\uc9c0: ${currentUrl}, \ubaa8\ub4dc: ${isTransferTask?'\ubd80\ud0b9(\uc591\ub3c4)':'\uc870\uc778'}, \ud050 \uc0c1\ud0dc: [${task.currentIndex+1}/${task.items.length}]`);
_0x1002({
title:modeTitle,
desc:`[${task.currentIndex+1}/${task.items.length}] ${task.items[task.currentIndex]?.golf} \uc900\ube44 \uc911...`,
current:task.currentIndex,
total:task.items.length
});
const isFormPage=currentUrl.includes('\x6a\x6f\x69\x6e\x5f\x66\x6f\x72\x6d\x2e\x70\x68\x70')||
currentUrl.includes('\x62\x6f\x6f\x6b\x69\x6e\x67\x5f\x66\x6f\x72\x6d')||
currentUrl.includes('\x62\x6f\x6f\x6b\x5f\x66\x6f\x72\x6d')||
currentUrl.includes('\x62\x6f\x6f\x6b\x69\x6e\x67\x5f\x77\x72\x69\x74\x65')||
Boolean(_0x100c()&&(_0x100d()||_0x100e())&&_0x1013());
const isListPage=currentUrl.includes('\x6a\x6f\x69\x6e\x5f\x6c\x69\x73\x74\x2e\x70\x68\x70')||
currentUrl.includes('\x6a\x6f\x69\x6e\x5f\x76\x69\x65\x77\x2e\x70\x68\x70')||
currentUrl.includes('\x62\x6f\x6f\x6b\x69\x6e\x67\x5f\x6c\x69\x73\x74')||
currentUrl.includes('\x62\x6f\x6f\x6b\x5f\x6c\x69\x73\x74')||
currentUrl.includes('\x62\x6f\x6f\x6b\x69\x6e\x67\x5f\x76\x69\x65\x77');
if(isListPage){
const finishedItem=task.items[task.currentIndex];
console.log(`\u2705 [\uace8\ub9c8\ucf13] [${task.currentIndex+1}/${task.items.length}] ${finishedItem?.golf} \ub4f1\ub85d \uc131\uacf5 \ud655\uc778!`);
try{
const compRes=await new Promise(r=>chrome.storage.local.get(['\x63\x6f\x6d\x70\x6c\x65\x74\x65\x64\x49\x74\x65\x6d\x73'],r));
const compList=(compRes&&Array.isArray(compRes.completedItems))?compRes.completedItems:[];
compList.push({regId:finishedItem.regId,date:finishedItem.date,golf:finishedItem.golf,time:finishedItem.time});
await new Promise(r=>chrome.storage.local.set({completedItems:compList},r));
}catch(e){}
chrome.runtime.sendMessage({
type:'\x49\x54\x45\x4d\x5f\x52\x45\x47\x49\x53\x54\x45\x52\x5f\x53\x55\x43\x43\x45\x53\x53',
regId:finishedItem.regId,
item:finishedItem,
current:task.currentIndex+1,
total:task.items.length
});
const nextIdx=task.currentIndex+1;
if(nextIdx>=task.items.length){
console.log("\ud83c\udf89 [\uace8\ub9c8\ucf13] \ubaa8\ub4e0 \ud56d\ubaa9 \uc870\uc778\x2f\ubd80\ud0b9 \ub4f1\ub85d \uc644\ub8cc!");
_0x1002({
title:modeTitle,
isCompleted:true,
total:task.items.length
});
await new Promise(r=>chrome.storage.local.set({
golmarket_task:null,
isRegistrationRunning:false
},r));
chrome.runtime.sendMessage({type:'\x52\x45\x47\x49\x53\x54\x45\x52\x5f\x43\x4f\x4d\x50\x4c\x45\x54\x45\x44',total:task.items.length});
return;
}
task.currentIndex=nextIdx;
task.status='\x70\x65\x6e\x64\x69\x6e\x67';
await new Promise(r=>chrome.storage.local.set({golmarket_task:task},r));
const cooldownMs=_0x1006(task.delayPreset||'\x73\x61\x66\x65');
const cooldownSec=(cooldownMs/1000).toFixed(1);
console.log(`\u23f3 \ub2e4\uc74c \uac74 \uc9c4\ud589 \uc804 \uc0ac\ub78c\ucc98\ub7fc ${cooldownSec}\ucd08 \ub300\uae30...`);
_0x1002({
title:modeTitle,
desc:`\u23f3 \uc0ac\ub78c\ucc98\ub7fc \ub300\uae30 \uc911... [${task.items[nextIdx]?.golf}] \uc900\ube44 (${cooldownSec}\ucd08 \uc9c0\uc5f0)`,
current:nextIdx,
total:task.items.length
});
chrome.runtime.sendMessage({
type:'\x52\x45\x47\x49\x53\x54\x45\x52\x5f\x57\x41\x49\x54\x49\x4e\x47',
current:nextIdx,
total:task.items.length,
waitSec:cooldownSec,
nextGolf:task.items[nextIdx]?.golf||''
});
let leftSec=parseFloat(cooldownSec);
const countdownTimer=setInterval(()=>{
leftSec=Math.max(0,leftSec-0.4);
const descEl=document.getElementById('\x67\x6d\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x64\x65\x73\x63');
if(descEl&&!shouldStopRegistration){
descEl.innerText=`\u23f3 \uc0ac\ub78c\ucc98\ub7fc \ub300\uae30 \uc911... [${task.items[nextIdx]?.golf}] \uc900\ube44 (${leftSec.toFixed(1)}\ucd08)`;
}
},400);
await _0x1004(cooldownMs);
clearInterval(countdownTimer);
if(shouldStopRegistration)return;
if(isTransferTask){
window.location.href='\x68\x74\x74\x70\x73\x3a\x2f\x2f\x67\x6f\x6c\x6d\x61\x72\x6b\x65\x74\x2e\x63\x6f\x2e\x6b\x72\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x5f\x66\x6f\x72\x6d\x2e\x70\x68\x70';
}else{
window.location.href='\x68\x74\x74\x70\x73\x3a\x2f\x2f\x77\x77\x77\x2e\x67\x6f\x6c\x6d\x61\x72\x6b\x65\x74\x2e\x63\x6f\x2e\x6b\x72\x2f\x6a\x6f\x69\x6e\x5f\x66\x6f\x72\x6d\x2e\x70\x68\x70';
}
return;
}
if(isFormPage){
if(isTransferTask&&!task.bookingFormUrl){
task.bookingFormUrl=window.location.href;
try{
await new Promise(r=>chrome.storage.local.set({
golmarket_task:task,
cachedGolmarketBookingUrl:window.location.href
},r));
}catch(e){}
}
if(task.status==='\x73\x75\x62\x6d\x69\x74\x74\x69\x6e\x67'){
const finishedItem=task.items[task.currentIndex];
console.log(`\u2705 [\uace8\ub9c8\ucf13 \ub9ac\ub85c\ub4dc] [${task.currentIndex+1}/${task.items.length}] ${finishedItem?.golf} \ub4f1\ub85d \uc131\uacf5 \ud655\uc778!`);
try{
const compRes=await new Promise(r=>chrome.storage.local.get(['\x63\x6f\x6d\x70\x6c\x65\x74\x65\x64\x49\x74\x65\x6d\x73'],r));
const compList=(compRes&&Array.isArray(compRes.completedItems))?compRes.completedItems:[];
compList.push({regId:finishedItem.regId,date:finishedItem.date,golf:finishedItem.golf,time:finishedItem.time});
await new Promise(r=>chrome.storage.local.set({completedItems:compList},r));
}catch(e){}
chrome.runtime.sendMessage({
type:'\x49\x54\x45\x4d\x5f\x52\x45\x47\x49\x53\x54\x45\x52\x5f\x53\x55\x43\x43\x45\x53\x53',
regId:finishedItem.regId,
item:finishedItem,
current:task.currentIndex+1,
total:task.items.length
});
const nextIdx=task.currentIndex+1;
if(nextIdx>=task.items.length){
console.log("\ud83c\udf89 [\uace8\ub9c8\ucf13] \ubaa8\ub4e0 \ud56d\ubaa9 \uc870\uc778\x2f\ubd80\ud0b9 \ub4f1\ub85d \uc644\ub8cc!");
_0x1002({
title:modeTitle,
isCompleted:true,
total:task.items.length
});
await new Promise(r=>chrome.storage.local.set({
golmarket_task:null,
isRegistrationRunning:false
},r));
chrome.runtime.sendMessage({type:'\x52\x45\x47\x49\x53\x54\x45\x52\x5f\x43\x4f\x4d\x50\x4c\x45\x54\x45\x44',total:task.items.length});
return;
}
task.currentIndex=nextIdx;
task.status='\x70\x65\x6e\x64\x69\x6e\x67';
await new Promise(r=>chrome.storage.local.set({golmarket_task:task},r));
const cooldownMs=_0x1006(task.delayPreset||'\x73\x61\x66\x65');
const cooldownSec=(cooldownMs/1000).toFixed(1);
_0x1002({
title:modeTitle,
desc:`\u23f3 \uc0ac\ub78c\ucc98\ub7fc \ub300\uae30 \uc911... [${task.items[nextIdx]?.golf}] \uc900\ube44 (${cooldownSec}\ucd08 \uc9c0\uc5f0)`,
current:nextIdx,
total:task.items.length
});
let leftSec=parseFloat(cooldownSec);
const countdownTimer=setInterval(()=>{
leftSec=Math.max(0,leftSec-0.4);
const descEl=document.getElementById('\x67\x6d\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c\x5f\x64\x65\x73\x63');
if(descEl&&!shouldStopRegistration){
descEl.innerText=`\u23f3 \uc0ac\ub78c\ucc98\ub7fc \ub300\uae30 \uc911... [${task.items[nextIdx]?.golf}] \uc900\ube44 (${leftSec.toFixed(1)}\ucd08)`;
}
},400);
await _0x1004(cooldownMs);
clearInterval(countdownTimer);
if(shouldStopRegistration)return;
}
const curItem=task.items[task.currentIndex];
if(!curItem)return;
isRegistrationRunning=true;
_0x1002({
title:modeTitle,
desc:`[${task.currentIndex+1}/${task.items.length}] ${curItem.golf} (${curItem.date} ${curItem.time}) \ub4f1\ub85d \uc9c4\ud589 \uc911...`,
current:task.currentIndex+1,
total:task.items.length
});
chrome.runtime.sendMessage({
type:'\x52\x45\x47\x49\x53\x54\x45\x52\x5f\x50\x52\x4f\x47\x52\x45\x53\x53',
current:task.currentIndex+1,
total:task.items.length,
golf:curItem.golf,
date:curItem.date,
time:curItem.time
});
task.status='\x73\x75\x62\x6d\x69\x74\x74\x69\x6e\x67';
await new Promise(r=>chrome.storage.local.set({golmarket_task:task},r));
const success=await _0x1019(curItem,task.memo,task.stepPreset||'\x68\x75\x6d\x61\x6e');
if(success){
setTimeout(async()=>{
if(shouldStopRegistration)return;
const checkRes=await new Promise(r=>chrome.storage.local.get(['\x67\x6f\x6c\x6d\x61\x72\x6b\x65\x74\x5f\x74\x61\x73\x6b'],r));
if(checkRes?.golmarket_task?.status==='\x73\x75\x62\x6d\x69\x74\x74\x69\x6e\x67'){
console.log("[\uace8\ub9c8\ucf13] \x41\x4a\x41\x58 \uc81c\ucd9c \uac10\uc9c0\x3a \ub2e4\uc74c \uac74\uc73c\ub85c \uc774\ub3d9\x2e\x2e\x2e");
if(isTransferTask){
window.location.href='\x68\x74\x74\x70\x73\x3a\x2f\x2f\x67\x6f\x6c\x6d\x61\x72\x6b\x65\x74\x2e\x63\x6f\x2e\x6b\x72\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x5f\x66\x6f\x72\x6d\x2e\x70\x68\x70';
}else{
window.location.href='\x68\x74\x74\x70\x73\x3a\x2f\x2f\x77\x77\x77\x2e\x67\x6f\x6c\x6d\x61\x72\x6b\x65\x74\x2e\x63\x6f\x2e\x6b\x72\x2f\x6a\x6f\x69\x6e\x5f\x6c\x69\x73\x74\x2e\x70\x68\x70';
}
}
},3500);
}
}else{
if(isTransferTask){
console.log("[\uace8\ub9c8\ucf13] \ubd80\ud0b9 \ubaa8\ub4dc \uc9c4\uc785\x3a \x62\x6f\x6f\x6b\x69\x6e\x67\x5f\x66\x6f\x72\x6d\x2e\x70\x68\x70\ub85c \uc9c1\uc811 \uc774\ub3d9");
window.location.href='\x68\x74\x74\x70\x73\x3a\x2f\x2f\x67\x6f\x6c\x6d\x61\x72\x6b\x65\x74\x2e\x63\x6f\x2e\x6b\x72\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x5f\x66\x6f\x72\x6d\x2e\x70\x68\x70';
}else{
console.log("[\uace8\ub9c8\ucf13] \uc870\uc778 \ubaa8\ub4dc \uc9c4\uc785\x3a \x6a\x6f\x69\x6e\x5f\x66\x6f\x72\x6d\x2e\x70\x68\x70\ub85c \uc790\ub3d9 \uc774\ub3d9");
window.location.href='\x68\x74\x74\x70\x73\x3a\x2f\x2f\x77\x77\x77\x2e\x67\x6f\x6c\x6d\x61\x72\x6b\x65\x74\x2e\x63\x6f\x2e\x6b\x72\x2f\x6a\x6f\x69\x6e\x5f\x66\x6f\x72\x6d\x2e\x70\x68\x70';
}
}
}catch(err){
console.error("[\uace8\ub9c8\ucf13 \ud050 \ucc98\ub9ac \uc5d0\ub7ec]\x3a",err);
}
}
chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
if(request.isAdmin!==undefined||request.allowF12!==undefined){
isDebugAdmin=!!request.isAdmin||!!request.allowF12;
if(!isDebugAdmin){
try{console.clear();}catch(e){}
}
}
if(request.action==='\x53\x54\x41\x52\x54\x5f\x47\x4f\x4c\x4d\x41\x52\x4b\x45\x54\x5f\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e'){
shouldStopRegistration=false;
isRegistrationRunning=true;
const isTransferMode=Boolean(request.isTransferMode||request.mode==='\x74\x72\x61\x6e\x73\x66\x65\x72'||(request.items&&request.items.some(it=>it.roomType==='\uc591\ub3c4')));
_0x1002({
title:isTransferMode?'\ud83d\udcc5 \uace8\ub9c8\ucf13 \ubd80\ud0b9(\uc591\ub3c4) \ub4f1\ub85d \uc9c4\ud589 \uc911':'\ud83d\uded2 \uace8\ub9c8\ucf13 \uc870\uc778 \ub4f1\ub85d \uc9c4\ud589 \uc911',
desc:`[1/${request.items.length}] ${request.items[0]?.golf} \ub4f1\ub85d \uc900\ube44 \uc911...`,
current:1,
total:request.items.length
});
const task={
isRunning:true,
platform:'\x67\x6f\x6c\x6d\x61\x72\x6b\x65\x74',
mode:isTransferMode?'\x74\x72\x61\x6e\x73\x66\x65\x72':'\x6a\x6f\x69\x6e',
isTransferMode:isTransferMode,
items:request.items,
currentIndex:0,
totalCount:request.items.length,
memo:request.memo,
delayPreset:request.delayPreset||'\x73\x61\x66\x65',
stepPreset:request.stepPreset||'\x68\x75\x6d\x61\x6e',
status:'\x70\x65\x6e\x64\x69\x6e\x67',
startedAt:Date.now()
};
chrome.storage.local.set({
golmarket_task:task,
isRegistrationRunning:true
},()=>{
sendResponse({status:'\x73\x74\x61\x72\x74\x65\x64'});
_0x101b();
});
return true;
}else if(request.action==='\x53\x54\x4f\x50\x5f\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e'){
shouldStopRegistration=true;
isRegistrationRunning=false;
_0x1002({
desc:'\ud83d\uded1 \uc0ac\uc6a9\uc790\uc5d0 \uc758\ud574 \uc790\ub3d9 \ub4f1\ub85d\uc774 \uc911\ub2e8\ub418\uc5c8\uc2b5\ub2c8\ub2e4\x2e',
isStopped:true
});
chrome.storage.local.set({
golmarket_task:null,
isRegistrationRunning:false
},()=>{
sendResponse({status:'\x73\x74\x6f\x70\x70\x65\x64'});
chrome.runtime.sendMessage({type:'\x52\x45\x47\x49\x53\x54\x45\x52\x5f\x53\x54\x4f\x50\x50\x45\x44'});
});
return true;
}else if(request.action==='\x43\x48\x45\x43\x4b\x5f\x53\x54\x41\x54\x55\x53'){
sendResponse({isRunning:isRegistrationRunning});
return true;
}
});
if(document.readyState==='\x6c\x6f\x61\x64\x69\x6e\x67'){
document.addEventListener('\x44\x4f\x4d\x43\x6f\x6e\x74\x65\x6e\x74\x4c\x6f\x61\x64\x65\x64',()=>{
setTimeout(_0x101b,400);
});
}else{
setTimeout(_0x101b,400);
}
