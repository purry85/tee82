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
var isRegistrationRunning=false;
var shouldStopRegistration=false;
function _0x1001(ms){
if(!isRegistrationRunning){
return new Promise(resolve=>setTimeout(resolve,ms));
}
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
function _0x1002(actionType='\x6e\x6f\x72\x6d\x61\x6c',stepPreset='\x68\x75\x6d\x61\x6e'){
let minMs=380;
let maxMs=1050;
if(stepPreset==='\x73\x6c\x6f\x77'){
minMs=800;
maxMs=1800;
}else if(stepPreset==='\x66\x61\x73\x74'){
minMs=200;
maxMs=500;
}else if(stepPreset==='\x74\x75\x72\x62\x6f'){
minMs=80;
maxMs=200;
}else{
minMs=380;
maxMs=1050;
}
if(actionType==='\x62\x72\x6f\x77\x73\x65\x5f\x64\x72\x6f\x70\x64\x6f\x77\x6e'||actionType==='\x73\x65\x6c\x65\x63\x74\x5f\x67\x6f\x6c\x66'){
minMs=Math.round(minMs*1.3);
maxMs=Math.round(maxMs*1.45);
}else if(actionType==='\x63\x61\x6c\x65\x6e\x64\x61\x72'){
minMs=Math.round(minMs*1.15);
maxMs=Math.round(maxMs*1.25);
}else if(actionType==='\x74\x79\x70\x69\x6e\x67'){
minMs=Math.round(minMs*1.05);
maxMs=Math.round(maxMs*1.15);
}else if(actionType==='\x62\x65\x66\x6f\x72\x65\x5f\x73\x75\x62\x6d\x69\x74'){
minMs=Math.round(minMs*1.35);
maxMs=Math.round(maxMs*1.6);
}else if(actionType==='\x71\x75\x69\x63\x6b\x5f\x63\x6c\x69\x63\x6b'){
minMs=Math.round(minMs*0.85);
maxMs=Math.round(maxMs*0.95);
}
const rand=(Math.random()+Math.random()+Math.random())/3;
return Math.floor(rand*(maxMs-minMs)+minMs);
}
function _0x1003(min=280,max=650){
return _0x1002('\x6e\x6f\x72\x6d\x61\x6c','\x68\x75\x6d\x61\x6e');
}
function _0x1004(preset='\x73\x61\x66\x65'){
let minMs=2200,maxMs=4800;
if(preset==='\x73\x74\x65\x61\x6c\x74\x68'){
minMs=3500;maxMs=7500;
}else if(preset==='\x66\x61\x73\x74'){
minMs=1200;maxMs=2600;
}else if(preset==='\x74\x75\x72\x62\x6f'){
minMs=600;maxMs=1200;
}else{
minMs=2200;maxMs=4800;
}
const rand=(Math.random()+Math.random())/2;
return Math.floor(rand*(maxMs-minMs)+minMs);
}
async function _0x1005(el,customX=null,customY=null){
if(!el)return;
const rect=el.getBoundingClientRect();
const jitterX=(Math.random()-0.5)*(rect.width*0.3);
const jitterY=(Math.random()-0.5)*(rect.height*0.3);
const x=customX!==null?customX:(rect.left+rect.width/2+jitterX);
const y=customY!==null?customY:(rect.top+rect.height/2+jitterY);
const opts={bubbles:true,cancelable:true,view:window,clientX:x,clientY:y};
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x65\x6e\x74\x65\x72',opts));
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x6f\x76\x65\x72',opts));
await _0x1001(Math.floor(Math.random()*40+30));
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
await _0x1001(Math.floor(Math.random()*90+70));
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
el.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',opts));
}
async function _0x1006(el,customX=null,customY=null){
if(!el)return;
const rect=el.getBoundingClientRect();
const cx=customX!==null?customX:(rect.left+rect.width/2);
const cy=customY!==null?customY:(rect.top+rect.height/2);
const opts={bubbles:true,cancelable:true,view:window,clientX:cx,clientY:cy,button:0,buttons:1};
try{el.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x6f\x76\x65\x72',opts));}catch(e){}
try{el.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x65\x6e\x74\x65\x72',opts));}catch(e){}
try{el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x6f\x76\x65\x72',opts));}catch(e){}
try{el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x65\x6e\x74\x65\x72',opts));}catch(e){}
try{el.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x64\x6f\x77\x6e',opts));}catch(e){}
try{el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));}catch(e){}
await _0x1001(40);
try{el.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x75\x70',opts));}catch(e){}
try{el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));}catch(e){}
try{el.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',opts));}catch(e){}
try{el.click();}catch(e){}
}
async function _0x1007(inputEl,text){
if(!inputEl)return false;
const str=String(text??'');
const nativeSetter=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'\x76\x61\x6c\x75\x65')?.set;
try{inputEl.focus();}catch(e){}
await _0x1001(Math.floor(Math.random()*40+40));
if((inputEl.value||'').length>0){
inputEl.select();
const bsCode=8;
inputEl.dispatchEvent(new KeyboardEvent('\x6b\x65\x79\x64\x6f\x77\x6e',{key:'\x42\x61\x63\x6b\x73\x70\x61\x63\x65',code:'\x42\x61\x63\x6b\x73\x70\x61\x63\x65',keyCode:bsCode,which:bsCode,bubbles:true,composed:true}));
document.execCommand('\x73\x65\x6c\x65\x63\x74\x41\x6c\x6c',false,null);
document.execCommand('\x64\x65\x6c\x65\x74\x65',false,null);
if(inputEl.value!==''){
if(nativeSetter)nativeSetter.call(inputEl,'');
else inputEl.value='';
}
try{
inputEl.dispatchEvent(new InputEvent('\x69\x6e\x70\x75\x74',{bubbles:true,cancelable:true,composed:true,data:null,inputType:'\x64\x65\x6c\x65\x74\x65\x43\x6f\x6e\x74\x65\x6e\x74\x42\x61\x63\x6b\x77\x61\x72\x64'}));
}catch(e){
inputEl.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true,composed:true}));
}
await _0x1001(Math.floor(Math.random()*25+20));
inputEl.dispatchEvent(new KeyboardEvent('\x6b\x65\x79\x75\x70',{key:'\x42\x61\x63\x6b\x73\x70\x61\x63\x65',code:'\x42\x61\x63\x6b\x73\x70\x61\x63\x65',keyCode:bsCode,which:bsCode,bubbles:true,composed:true}));
await _0x1001(Math.floor(Math.random()*55+45));
}
let accumulated='';
for(let i=0;i<str.length;i++){
if(shouldStopRegistration)break;
const ch=str[i];
accumulated+=ch;
const isDigit=/^[0-9]$/.test(ch);
const keyCode=ch==='\x2e'?190:(ch==='\x3a'?186:ch.charCodeAt(0));
const keyCodeStr=isDigit?`Digit${ch}`:(ch==='\x2e'?'\x50\x65\x72\x69\x6f\x64':(ch==='\x3a'?'\x53\x65\x6d\x69\x63\x6f\x6c\x6f\x6e':`Key${ch.toUpperCase()}`));
const kbOpts={key:ch,code:keyCodeStr,keyCode:keyCode,which:keyCode,bubbles:true,cancelable:true,composed:true};
inputEl.dispatchEvent(new KeyboardEvent('\x6b\x65\x79\x64\x6f\x77\x6e',kbOpts));
inputEl.dispatchEvent(new KeyboardEvent('\x6b\x65\x79\x70\x72\x65\x73\x73',kbOpts));
await _0x1001(Math.floor(Math.random()*20+15));
try{inputEl.focus();}catch(e){}
try{
if(typeof inputEl.setSelectionRange==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
const len=(inputEl.value||'').length;
inputEl.setSelectionRange(len,len);
}
}catch(e){}
const inserted=document.execCommand('\x69\x6e\x73\x65\x72\x74\x54\x65\x78\x74',false,ch);
if(!inserted||inputEl.value!==accumulated){
if(nativeSetter)nativeSetter.call(inputEl,accumulated);
else inputEl.value=accumulated;
try{
inputEl.dispatchEvent(new InputEvent('\x69\x6e\x70\x75\x74',{
bubbles:true,
cancelable:true,
composed:true,
data:ch,
inputType:'\x69\x6e\x73\x65\x72\x74\x54\x65\x78\x74'
}));
}catch(e){
inputEl.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true,composed:true}));
}
}
inputEl.dispatchEvent(new KeyboardEvent('\x6b\x65\x79\x75\x70',kbOpts));
await _0x1001(Math.floor(Math.random()*70+45));
}
if(inputEl.value!==str){
if(nativeSetter)nativeSetter.call(inputEl,str);
else inputEl.value=str;
inputEl.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true,composed:true}));
}
inputEl.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true,composed:true}));
await _0x1001(Math.floor(Math.random()*40+40));
inputEl.blur();
inputEl.dispatchEvent(new Event('\x62\x6c\x75\x72',{bubbles:true,composed:true}));
return true;
}
function _0x1008(){
const targets=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x64\x69\x76, \x73\x70\x61\x6e, \x61'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const text=(el.innerText||el.textContent||'').trim().replace(/[\s·•/]/g,'');
const rect=el.getBoundingClientRect();
if(rect.height>120||rect.height<15)return false;
if(text==='\ub4f1\ub85d\ub0b4\uae00\ubcf4\uae30'||(text.includes('\ub4f1\ub85d')&&text.includes('\ub0b4\uae00\ubcf4\uae30')))return true;
return false;
});
if(targets.length===0)return null;
targets.sort((a,b)=>(a.offsetWidth*a.offsetHeight)-(b.offsetWidth*b.offsetHeight));
return targets[0].closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72')||targets[0];
}
function _0x1009(){
const winHeight=window.innerHeight||document.documentElement.clientHeight||800;
const targets=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72, \x64\x69\x76, \x73\x70\x61\x6e, \x61'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
if(el.closest('\x2e\x71-\x63\x61\x72\x64, \x2e\x71-\x68\x65\x61\x64\x65\x72, \x68\x65\x61\x64\x65\x72, \x2e\x71-\x74\x6f\x6f\x6c\x62\x61\x72, \x2e\x71-\x64\x69\x61\x6c\x6f\x67, [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"]'))return false;
const rect=el.getBoundingClientRect();
if(rect.top<winHeight*0.5)return false;
if(rect.width<24||rect.width>180||rect.height<22||rect.height>110)return false;
const text=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
return text==='\ub4f1\ub85d';
});
if(targets.length===0)return null;
targets.sort((a,b)=>(a.offsetWidth*a.offsetHeight)-(b.offsetWidth*b.offsetHeight));
return targets[0].closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72')||targets[0];
}
async function _0x100a(regBtn){
if(!regBtn)return false;
regBtn.scrollIntoView({block:'\x63\x65\x6e\x74\x65\x72',inline:'\x63\x65\x6e\x74\x65\x72',behavior:'\x69\x6e\x73\x74\x61\x6e\x74'});
regBtn.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x35\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x30\x30\x65\x36\x37\x36','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await _0x1001(80);
const rect=regBtn.getBoundingClientRect();
const cx=rect.left+rect.width/2;
const cy=rect.top+rect.height/2;
const opts={clientX:cx,clientY:cy,bubbles:true,cancelable:true,view:window};
const topEl=document.elementFromPoint(cx,cy)||regBtn;
try{
topEl.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x64\x6f\x77\x6e',opts));
topEl.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
}catch(e){}
await _0x1001(60);
try{
topEl.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x75\x70',opts));
topEl.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
topEl.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',opts));
}catch(e){}
try{regBtn.click();}catch(e){}
try{topEl.click();}catch(e){}
await _0x1005(regBtn);
return true;
}
async function _0x100b(maxAttempts=10){
console.log("[\ub9e4\ud06c\ub85c] \ud558\ub2e8 '\ubd80\ud0b9' \ud0ed \ud0d0\uc0c9 \ubc0f \ud074\ub9ad \uc2dc\ub3c4\x2e\x2e\x2e");
const winHeight=window.innerHeight||document.documentElement.clientHeight||800;
for(let attempt=0;attempt<maxAttempts;attempt++){
if(shouldStopRegistration)return false;
const tabCandidates=Array.from(document.querySelectorAll('\x2e\x71-\x66\x6f\x6f\x74\x65\x72 \x2e\x71-\x74\x61\x62, \x66\x6f\x6f\x74\x65\x72 \x2e\x71-\x74\x61\x62, \x2e\x71-\x74\x61\x62\x73 \x2e\x71-\x74\x61\x62, [\x72\x6f\x6c\x65="\x74\x61\x62"], \x2e\x71-\x74\x61\x62, \x2e\x71-\x66\x6f\x6f\x74\x65\x72 \x62\x75\x74\x74\x6f\x6e, \x66\x6f\x6f\x74\x65\x72 \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x66\x6f\x6f\x74\x65\x72 \x61, \x66\x6f\x6f\x74\x65\x72 \x61, \x2e\x71-\x66\x6f\x6f\x74\x65\x72 \x64\x69\x76, \x66\x6f\x6f\x74\x65\x72 \x64\x69\x76, \x6e\x61\x76 \x64\x69\x76, \x6e\x61\x76 \x62\x75\x74\x74\x6f\x6e, \x6e\x61\x76 \x61'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const r=el.getBoundingClientRect();
if(r.top<winHeight-140)return false;
const txt=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
return txt==='\ubd80\ud0b9'||(txt.includes('\ubd80\ud0b9')&&!txt.includes('\uac80\uc0c9')&&!txt.includes('\ud504\ub77c\uc790')&&!txt.includes('\ub0b4\uae00\ubcf4\uae30')&&txt.length<=4);
});
let matched=tabCandidates;
if(matched.length===0){
matched=Array.from(document.querySelectorAll('*'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const r=el.getBoundingClientRect();
if(r.top<winHeight-140)return false;
const txt=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
return txt==='\ubd80\ud0b9';
});
}
if(matched.length>0){
matched.sort((a,b)=>(a.offsetWidth*a.offsetHeight)-(b.offsetWidth*b.offsetHeight));
const leaf=matched[0];
const clickTarget=leaf.closest('\x2e\x71-\x74\x61\x62, [\x72\x6f\x6c\x65="\x74\x61\x62"], \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x61, \x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72')||leaf;
console.log(`[\ub9e4\ud06c\ub85c] \ud558\ub2e8 '\ubd80\ud0b9' \ud0ed \ubc1c\uacac (${clickTarget.tagName}, class=${clickTarget.className}) -> \ud074\ub9ad \uc2e4\ud589`);
clickTarget.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x30\x30\x65\x36\x37\x36','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await _0x1001(80);
const rect=clickTarget.getBoundingClientRect();
const cx=rect.left+rect.width/2;
const cy=rect.top+rect.height/2;
const opts={clientX:cx,clientY:cy,bubbles:true,cancelable:true,view:window};
const topEl=document.elementFromPoint(cx,cy)||clickTarget;
try{
topEl.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x64\x6f\x77\x6e',opts));
topEl.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
}catch(e){}
await _0x1001(60);
try{
topEl.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x75\x70',opts));
topEl.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
topEl.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',opts));
}catch(e){}
try{clickTarget.click();}catch(e){}
try{topEl.click();}catch(e){}
await _0x1005(clickTarget);
for(let w=0;w<30;w++){
await _0x1001(150);
if(shouldStopRegistration)return true;
const regBtn=_0x1008();
if(regBtn&&regBtn.offsetHeight>0){
console.log("[\ub9e4\ud06c\ub85c] \ud558\ub2e8 '\ubd80\ud0b9' \ud074\ub9ad \ud6c4 \ubd80\ud0b9\ud504\ub77c\uc790('\ub4f1\ub85d \u00b7 \ub0b4\uae00\ubcf4\uae30') \ud654\uba74 \ubcf5\uadc0 \ud655\uc778 \uc644\ub8cc!");
await _0x1001(250);
return true;
}
}
return true;
}
await _0x1001(250);
}
console.warn("[\ub9e4\ud06c\ub85c] \ud558\ub2e8 '\ubd80\ud0b9' \ud0ed\uc744 \ucc3e\uc9c0 \ubabb\ud568");
return false;
}
async function _0x100c(maxAttempts=10){
if(_priceUpdateRunning||isPostReplacementRunning||window.location.href.includes('\x2f\x70\x72\x6f\x64\x75\x63\x74\x2f\x6c\x69\x73\x74')){
console.warn("[\ub9e4\ud06c\ub85c] \ub4f1\ub85d \uc0c1\ud488 \ubaa9\ub85d \uc720\uc9c0 \uc911\uc774\ubbc0\ub85c \ud558\ub2e8 '\ub9c8\uc774\ud398\uc774\uc9c0' \ud0ed \ud074\ub9ad\uc744 \uc6d0\ucc9c \ucc28\ub2e8\ud569\ub2c8\ub2e4\x2e");
return false;
}
console.log("[\ub9e4\ud06c\ub85c] \ud558\ub2e8 '\ub9c8\uc774\ud398\uc774\uc9c0'\x2f'\ub9c8\uc774' \ud0ed \ud0d0\uc0c9 \ubc0f \ud074\ub9ad \uc2dc\ub3c4\x2e\x2e\x2e");
const winHeight=window.innerHeight||document.documentElement.clientHeight||800;
for(let attempt=0;attempt<maxAttempts;attempt++){
if(shouldStopRegistration)return false;
const tabCandidates=Array.from(document.querySelectorAll('\x2e\x71-\x66\x6f\x6f\x74\x65\x72 \x2e\x71-\x74\x61\x62, \x66\x6f\x6f\x74\x65\x72 \x2e\x71-\x74\x61\x62, \x2e\x71-\x74\x61\x62\x73 \x2e\x71-\x74\x61\x62, [\x72\x6f\x6c\x65="\x74\x61\x62"], \x2e\x71-\x74\x61\x62, \x2e\x71-\x66\x6f\x6f\x74\x65\x72 \x62\x75\x74\x74\x6f\x6e, \x66\x6f\x6f\x74\x65\x72 \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x66\x6f\x6f\x74\x65\x72 \x61, \x66\x6f\x6f\x74\x65\x72 \x61, \x2e\x71-\x66\x6f\x6f\x74\x65\x72 \x64\x69\x76, \x66\x6f\x6f\x74\x65\x72 \x64\x69\x76, \x6e\x61\x76 \x64\x69\x76, \x6e\x61\x76 \x62\x75\x74\x74\x6f\x6e, \x6e\x61\x76 \x61'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const r=el.getBoundingClientRect();
if(r.top<winHeight-160)return false;
const txt=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
return txt==='\ub9c8\uc774\ud398\uc774\uc9c0'||txt==='\ub9c8\uc774'||txt.includes('\ub9c8\uc774\ud398\uc774\uc9c0')||txt.toUpperCase()==='\x4d\x59'||(txt.includes('\ub9c8\uc774')&&txt.length<=5);
});
let matched=tabCandidates;
if(matched.length===0){
matched=Array.from(document.querySelectorAll('*'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const r=el.getBoundingClientRect();
if(r.top<winHeight-160)return false;
const txt=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
return txt==='\ub9c8\uc774\ud398\uc774\uc9c0'||txt==='\ub9c8\uc774'||txt.toUpperCase()==='\x4d\x59';
});
}
if(matched.length>0){
matched.sort((a,b)=>(a.offsetWidth*a.offsetHeight)-(b.offsetWidth*b.offsetHeight));
const leaf=matched[0];
const clickTarget=leaf.closest('\x2e\x71-\x74\x61\x62, [\x72\x6f\x6c\x65="\x74\x61\x62"], \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x61, \x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72')||leaf;
console.log(`[\ub9e4\ud06c\ub85c] \ud558\ub2e8 '\ub9c8\uc774\ud398\uc774\uc9c0' \ud0ed \ubc1c\uacac (${clickTarget.tagName}, class=${clickTarget.className}) -> \ud074\ub9ad \uc2e4\ud589`);
clickTarget.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x30\x30\x65\x36\x37\x36','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await _0x1001(80);
const rect=clickTarget.getBoundingClientRect();
const cx=rect.left+rect.width/2;
const cy=rect.top+rect.height/2;
const opts={clientX:cx,clientY:cy,bubbles:true,cancelable:true,view:window};
const topEl=document.elementFromPoint(cx,cy)||clickTarget;
try{
topEl.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x64\x6f\x77\x6e',opts));
topEl.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
}catch(e){}
await _0x1001(60);
try{
topEl.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x75\x70',opts));
topEl.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
topEl.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',opts));
}catch(e){}
try{clickTarget.click();}catch(e){}
try{topEl.click();}catch(e){}
await _0x1005(clickTarget);
for(let w=0;w<25;w++){
await _0x1001(150);
if(shouldStopRegistration)return true;
const myBtn=_0x1029();
if(myBtn&&myBtn.offsetHeight>0){
console.log("[\ub9e4\ud06c\ub85c] \ud558\ub2e8 '\ub9c8\uc774\ud398\uc774\uc9c0' \ud074\ub9ad \ud6c4 '\ub0b4\uac00 \ub4f1\ub85d\ud55c \uc0c1\ud488 \ub0b4\uc5ed' \ubc84\ud2bc \ud45c\uc2dc \ud655\uc778 \uc644\ub8cc!");
await _0x1001(150);
return true;
}
}
return true;
}
await _0x1001(250);
}
console.warn("[\ub9e4\ud06c\ub85c] \ud558\ub2e8 '\ub9c8\uc774\ud398\uc774\uc9c0' \ud0ed\uc744 \ucc3e\uc9c0 \ubabb\ud568");
return false;
}
function _0x100d(){
if(document.querySelector('\x2e\x71-\x64\x69\x61\x6c\x6f\x67\x3a\x6e\x6f\x74(\x2e\x68\x69\x64\x64\x65\x6e), [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"]')){
return false;
}
const regBtn=_0x1008();
if(regBtn&&regBtn.offsetHeight>0){
return false;
}
if(typeof _0x102c==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'&&_0x102c()){
return false;
}
const bodyTxt=(document.body?document.body.innerText||'':'').replace(/\s+/g,'');
if(bodyTxt.includes('\uace8\ud504\ubaac\ubd80\ud0b9\uac80\uc0c9')||bodyTxt.includes('\uad6d\ub0b4\ud22c\uc5b4')||bodyTxt.includes('\ud574\uc678\ud22c\uc5b4')||bodyTxt.includes('\uac1c\uc778\uc815\ubcf4\uc720\ucd9c')){
return true;
}
return true;
}
async function _0x100e(maxAttempts=15){
console.log("[\ub9e4\ud06c\ub85c] '\ub4f1\ub85d \uc0c1\ud488 \ub0b4\uc5ed' \ud558\ub2e8 [\ub4f1\ub85d] \ubc84\ud2bc \ud0d0\uc0c9 \uc911\x2e\x2e\x2e");
for(let attempt=0;attempt<maxAttempts;attempt++){
if(shouldStopRegistration)return false;
const listRegBtn=_0x1009();
const mainRegBtn=!listRegBtn?_0x1008():null;
const regBtn=listRegBtn||mainRegBtn;
if(regBtn){
regBtn.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x35\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x30\x30\x65\x36\x37\x36','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await _0x1001(100);
const rect=regBtn.getBoundingClientRect();
const cx=rect.left+rect.width/2;
const cy=rect.top+rect.height/2;
const opts={clientX:cx,clientY:cy,bubbles:true,cancelable:true,view:window};
try{
regBtn.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x64\x6f\x77\x6e',opts));
regBtn.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
}catch(e){}
await _0x1001(80);
try{
regBtn.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x75\x70',opts));
regBtn.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
regBtn.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',opts));
}catch(e){}
try{regBtn.click();}catch(e){}
await _0x1005(regBtn);
console.log(listRegBtn?"[\ub9e4\ud06c\ub85c] \ub4f1\ub85d \uc0c1\ud488 \ub0b4\uc5ed \ud558\ub2e8 [\ub4f1\ub85d] \ubc84\ud2bc \ud074\ub9ad \uc644\ub8cc":"[\ub9e4\ud06c\ub85c] '\ub4f1\ub85d \u00b7 \ub0b4\uae00\ubcf4\uae30' \ud074\ub9ad \uc644\ub8cc");
return true;
}
if(attempt===1&&_0x102c()){
window.scrollBy(0,180);
document.querySelectorAll('\x2e\x71-\x73\x63\x72\x6f\x6c\x6c\x61\x72\x65\x61\x5f\x5f\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x73\x63\x72\x6f\x6c\x6c, \x2e\x71-\x70\x61\x67\x65, \x62\x6f\x64\x79').forEach(el=>{
el.scrollTop+=180;
});
await _0x1001(200);
}
if(attempt===3){
const topPlazaBtn=Array.from(document.querySelectorAll('\x61, \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x64\x69\x76, \x73\x70\x61\x6e'))
.filter(el=>el.offsetHeight>0&&el.getBoundingClientRect().top<140&&(el.innerText||el.textContent||'').trim()==='\ubd80\ud0b9\ud504\ub77c\uc790')
.sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length)[0];
if(topPlazaBtn){
console.log("[\ub9e4\ud06c\ub85c] \ud558\ub2e8 [\ub4f1\ub85d] \ubc84\ud2bc \ubbf8\ub178\ucd9c -> \uc0c1\ub2e8 '\ubd80\ud0b9\ud504\ub77c\uc790' \ud074\ub9ad\ud558\uc5ec \ub4f1\ub85d \uba54\ub274 \ud638\ucd9c\x2e\x2e\x2e");
await _0x1005(topPlazaBtn);
try{topPlazaBtn.click();}catch(e){}
await _0x1001(350);
}else if(!_0x102c()){
console.log("[\ub9e4\ud06c\ub85c] \ud558\ub2e8 [\ub4f1\ub85d] \ubc84\ud2bc \ubbf8\ubc1c\uacac -> '\ub4f1\ub85d \uc0c1\ud488 \ub0b4\uc5ed' \ud654\uba74\uc73c\ub85c \uc774\ub3d9 \uc2dc\ub3c4\x2e\x2e\x2e");
await _0x102e();
}
}
await _0x1001(250);
}
console.warn("[\ub9e4\ud06c\ub85c] \ub4f1\ub85d \ubc84\ud2bc\uc744 \ucc3e\uc9c0 \ubabb\ud568 (\uc774\ubbf8 \ub4f1\ub85d \ud3fc\uc77c \uc218 \uc788\uc74c)");
return false;
}
async function _0x100f(maxAttempts=15){
console.log("[\ub9e4\ud06c\ub85c] \x32\ub2e8\uacc4\x3a '\uc870\uc778 \ub4f1\ub85d' \uba54\ub274 \ud0d0\uc0c9 \uc911\x2e\x2e\x2e");
for(let attempt=0;attempt<maxAttempts;attempt++){
if(shouldStopRegistration)return false;
const menuItems=Array.from(document.querySelectorAll('\x64\x69\x76, \x73\x70\x61\x6e, \x6c\x69, \x62\x75\x74\x74\x6f\x6e')).filter(el=>{
return el.textContent.trim()==='\uc870\uc778 \ub4f1\ub85d'&&el.getBoundingClientRect().height>0;
});
const transferBtn=menuItems.sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length)[0];
if(transferBtn){
transferBtn.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x35\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x66\x66\x39\x38\x30\x30','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
const opts={bubbles:true,cancelable:true,view:window};
transferBtn.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
await _0x1001(150);
transferBtn.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
transferBtn.click();
console.log("[\ub9e4\ud06c\ub85c] '\uc870\uc778 \ub4f1\ub85d' \ud074\ub9ad \uc644\ub8cc");
return true;
}
await _0x1001(200);
}
console.warn("[\ub9e4\ud06c\ub85c] '\uc870\uc778 \ub4f1\ub85d' \ubc84\ud2bc\uc744 \ucc3e\uc9c0 \ubabb\ud568 (\uc774\ubbf8 \ub4f1\ub85d \ud3fc\uc77c \uc218 \uc788\uc74c)");
return false;
}
async function _0x1010(maxAttempts=15){
console.log("[\ub9e4\ud06c\ub85c] \x32\ub2e8\uacc4\x3a '\uc591\ub3c4 \ub4f1\ub85d' \uba54\ub274 \ud0d0\uc0c9 \uc911\x2e\x2e\x2e");
for(let attempt=0;attempt<maxAttempts;attempt++){
if(shouldStopRegistration)return false;
const menuItems=Array.from(document.querySelectorAll('\x64\x69\x76, \x73\x70\x61\x6e, \x6c\x69, \x62\x75\x74\x74\x6f\x6e')).filter(el=>{
return el.textContent.trim()==='\uc591\ub3c4 \ub4f1\ub85d'&&el.getBoundingClientRect().height>0;
});
const transferBtn=menuItems.sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length)[0];
if(transferBtn){
transferBtn.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x35\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x66\x66\x39\x38\x30\x30','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
const opts={bubbles:true,cancelable:true,view:window};
transferBtn.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
await _0x1001(150);
transferBtn.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
transferBtn.click();
console.log("[\ub9e4\ud06c\ub85c] '\uc591\ub3c4 \ub4f1\ub85d' \ud074\ub9ad \uc644\ub8cc");
return true;
}
await _0x1001(200);
}
console.warn("[\ub9e4\ud06c\ub85c] '\uc591\ub3c4 \ub4f1\ub85d' \ubc84\ud2bc\uc744 \ucc3e\uc9c0 \ubabb\ud568 (\uc774\ubbf8 \ub4f1\ub85d \ud3fc\uc77c \uc218 \uc788\uc74c)");
return false;
}
async function _0x1011(targetRegion,maxAttempts=15){
if(!targetRegion)return false;
console.log(`[\ub9e4\ud06c\ub85c] 3\ub2e8\uacc4: \uc9c0\uc5ed(${targetRegion}) \uc120\ud0dd \uc911...`);
for(let attempt=0;attempt<maxAttempts;attempt++){
if(shouldStopRegistration)return false;
const allElements=Array.from(document.querySelectorAll('\x6c\x61\x62\x65\x6c, \x73\x70\x61\x6e, \x62\x75\x74\x74\x6f\x6e, \x64\x69\x76\x2e\x71-\x62\x74\x6e\x5f\x5f\x63\x6f\x6e\x74\x65\x6e\x74'));
const regionBtn=allElements.find(el=>
el.textContent.trim().includes(targetRegion)&&
el.offsetHeight>0
);
if(regionBtn){
const clickTarget=regionBtn.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x69\x74\x65\x6d')||regionBtn;
clickTarget.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x63\x79\x61\x6e','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
const opts={bubbles:true,cancelable:true,view:window};
clickTarget.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
clickTarget.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
clickTarget.click();
console.log(`[\ub9e4\ud06c\ub85c] \uc9c0\uc5ed(${targetRegion}) \uc120\ud0dd \uc644\ub8cc`);
return true;
}
await _0x1001(250);
}
console.error(`[\ub9e4\ud06c\ub85c] \uc9c0\uc5ed(${targetRegion}) \ubc84\ud2bc\uc744 \ucc3e\uc9c0 \ubabb\ud568`);
return false;
}
async function _0x1012(maxAttempts=15){
console.log("[\ub9e4\ud06c\ub85c] \x34\ub2e8\uacc4\x3a '\uace8\ud504\uc7a5\uc744 \uc120\ud0dd\ud558\uc138\uc694' \ub4dc\ub86d\ub2e4\uc6b4 \ud638\ucd9c \uc911\x2e\x2e\x2e");
for(let attempt=0;attempt<maxAttempts;attempt++){
if(shouldStopRegistration)return false;
const existingDialog=document.querySelector('\x2e\x71-\x64\x69\x61\x6c\x6f\x67\x3a\x6e\x6f\x74(\x2e\x68\x69\x64\x64\x65\x6e), [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"]');
if(existingDialog&&existingDialog.offsetHeight>0){
console.log("[\ub9e4\ud06c\ub85c] \uace8\ud504\uc7a5 \ub2e4\uc774\uc5bc\ub85c\uadf8\uac00 \uc774\ubbf8 \uc5f4\ub824\uc788\uc74c");
return true;
}
const titleElements=Array.from(document.querySelectorAll('\x64\x69\x76, \x73\x70\x61\x6e, \x6c\x61\x62\x65\x6c'))
.filter(el=>el.textContent.trim()==='\uace8\ud504\uc7a5\uc744 \uc120\ud0dd\ud558\uc138\uc694'&&el.offsetHeight>0);
const standard=titleElements[0];
if(standard){
const rect=standard.getBoundingClientRect();
const x=rect.left+20;
const y=rect.bottom+25;
const realInput=document.elementFromPoint(x,y);
if(realInput){
realInput.style.setProperty('\x62\x6f\x72\x64\x65\x72','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x66\x66\x30\x30\x66\x66','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
realInput.focus();
realInput.click();
['\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e','\x6d\x6f\x75\x73\x65\x75\x70','\x63\x6c\x69\x63\x6b'].forEach(type=>{
realInput.dispatchEvent(new MouseEvent(type,{bubbles:true,clientX:x,clientY:y}));
});
document.execCommand('\x69\x6e\x73\x65\x72\x74\x54\x65\x78\x74',false,' ');
realInput.dispatchEvent(new KeyboardEvent('\x6b\x65\x79\x64\x6f\x77\x6e',{key:'\x45\x6e\x74\x65\x72',bubbles:true}));
console.log("[\ub9e4\ud06c\ub85c] \uace8\ud504\uc7a5 \ub4dc\ub86d\ub2e4\uc6b4 \uc5f4\uae30 \uc131\uacf5");
return true;
}
}
await _0x1001(250);
}
console.error("[\ub9e4\ud06c\ub85c] '\uace8\ud504\uc7a5\uc744 \uc120\ud0dd\ud558\uc138\uc694' \uc694\uc18c\ub97c \ucc3e\uc9c0 \ubabb\ud568");
return false;
}
function _0x1013(targetText,container){
if(!targetText)return null;
const root=container||document.body;
let cleanTarget=targetText.replace(/\s+/g,'').toLowerCase();
if(cleanTarget==='\ud074\ub7fd\x37\x32'||cleanTarget==='\ud074\ub7fd\x37\x32(\ud074\ub798\uc2dd\x2f\ub808\uc774\ud06c)'||cleanTarget==='\ub808\x2f\ud074'||cleanTarget==='\ub808\uc774\ud06c\x2f\ud074\ub798\uc2dd'||cleanTarget==='\ud074\ub7fd\x37\x32\ub808\uc774\ud06c'||cleanTarget==='\ud074\ub7fd\x37\x32\ud074\ub798\uc2dd'){
cleanTarget='\ud074\ub7fd\x37\x32(\ub808\uc774\ud06c\x2f\ud074\ub798\uc2dd)'.replace(/\s+/g,'').toLowerCase();
}
const items=Array.from(root.querySelectorAll('\x2e\x71-\x69\x74\x65\x6d, [\x72\x6f\x6c\x65="\x6f\x70\x74\x69\x6f\x6e"], \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x69\x74\x65\x6d"]'))
.filter(el=>el.offsetHeight>0);
for(const item of items){
const itemText=(item.innerText||item.textContent||'').trim();
const cleanItem=itemText.replace(/\s+/g,'').toLowerCase();
if(cleanItem===cleanTarget)return item;
}
for(const item of items){
const itemText=(item.innerText||item.textContent||'').trim();
const cleanItem=itemText.replace(/\s+/g,'').toLowerCase();
if(cleanTarget.includes('\ud074\ub7fd\x37\x32')||cleanItem.includes('\ud074\ub7fd\x37\x32')){
if(!cleanTarget.includes('\uc624\uc158')&&cleanItem.includes('\uc624\uc158'))continue;
if(!cleanTarget.includes('\ud558\ub298')&&cleanItem.includes('\ud558\ub298'))continue;
if(cleanTarget.includes('\uc624\uc158')&&!cleanItem.includes('\uc624\uc158'))continue;
if(cleanTarget.includes('\ud558\ub298')&&!cleanItem.includes('\ud558\ub298'))continue;
}
if(cleanItem.includes(cleanTarget)||cleanTarget.includes(cleanItem))return item;
}
const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null,false);
let node;
let exactFound=null;
let partialFound=null;
while(node=walker.nextNode()){
const text=node.textContent.trim();
if(!text)continue;
const parent=node.parentElement;
if(!parent||parent.offsetHeight===0)continue;
const cleanNode=text.replace(/\s+/g,'').toLowerCase();
if(cleanNode===cleanTarget){
exactFound=parent;
break;
}
if(cleanTarget.includes('\ud074\ub7fd\x37\x32')||cleanNode.includes('\ud074\ub7fd\x37\x32')){
if(!cleanTarget.includes('\uc624\uc158')&&cleanNode.includes('\uc624\uc158'))continue;
if(!cleanTarget.includes('\ud558\ub298')&&cleanNode.includes('\ud558\ub298'))continue;
if(cleanTarget.includes('\uc624\uc158')&&!cleanNode.includes('\uc624\uc158'))continue;
if(cleanTarget.includes('\ud558\ub298')&&!cleanNode.includes('\ud558\ub298'))continue;
}
if(!partialFound&&(cleanNode.includes(cleanTarget)||cleanTarget.includes(cleanNode))){
partialFound=parent;
}
}
return exactFound||partialFound;
}
async function _0x1014(foundEl){
if(!foundEl)return false;
const targetRow=foundEl.closest('\x2e\x71-\x69\x74\x65\x6d, [\x72\x6f\x6c\x65="\x6f\x70\x74\x69\x6f\x6e"], \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x69\x74\x65\x6d"]')||foundEl;
targetRow.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x35\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x30\x30\x66\x66\x30\x30','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
targetRow.scrollIntoView({block:"\x63\x65\x6e\x74\x65\x72",behavior:"\x69\x6e\x73\x74\x61\x6e\x74"});
await _0x1001(100);
const radio=targetRow.querySelector('\x2e\x71-\x72\x61\x64\x69\x6f, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"], \x2e\x71-\x72\x61\x64\x69\x6f\x5f\x5f\x69\x6e\x6e\x65\x72');
const clickTarget=radio||targetRow;
const rect=clickTarget.getBoundingClientRect();
const x=rect.left+rect.width/2;
const y=rect.top+rect.height/2;
const opts={bubbles:true,cancelable:true,view:window,clientX:x,clientY:y,buttons:1};
clickTarget.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x65\x6e\x74\x65\x72',opts));
clickTarget.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x6f\x76\x65\x72',opts));
clickTarget.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
clickTarget.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
clickTarget.click();
if(radio&&radio!==clickTarget){
radio.click();
}
if(targetRow!==clickTarget){
targetRow.click();
}
targetRow.dispatchEvent(new KeyboardEvent('\x6b\x65\x79\x64\x6f\x77\x6e',{key:'\x45\x6e\x74\x65\x72',bubbles:true}));
await _0x1001(350);
return true;
}
async function _0x1015(targetText,maxAttempts=15){
if(!targetText)return false;
console.log(`[\ub9e4\ud06c\ub85c] 5\ub2e8\uacc4: \uace8\ud504\uc7a5(${targetText}) \ud0d0\uc0c9 \ubc0f \uc120\ud0dd \uc2dc\uc791...`);
let dialogEl=null;
for(let attempt=0;attempt<maxAttempts;attempt++){
if(shouldStopRegistration)return false;
dialogEl=document.querySelector('\x2e\x71-\x64\x69\x61\x6c\x6f\x67\x3a\x6e\x6f\x74(\x2e\x68\x69\x64\x64\x65\x6e), [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"], \x2e\x71-\x64\x69\x61\x6c\x6f\x67\x5f\x5f\x69\x6e\x6e\x65\x72, \x2e\x71-\x6d\x65\x6e\x75');
if(dialogEl||document.querySelector('\x2e\x71-\x69\x74\x65\x6d, [\x72\x6f\x6c\x65="\x6f\x70\x74\x69\x6f\x6e"]'))break;
await _0x1001(150);
}
const searchScope=dialogEl||document.body;
for(let check=0;check<5;check++){
if(shouldStopRegistration)return false;
const found=_0x1013(targetText,searchScope);
if(found){
console.log(`[\ub9e4\ud06c\ub85c] \uace8\ud504\uc7a5(${targetText}) \uc989\uc2dc \ubc1c\uacac! \uc120\ud0dd \ud074\ub9ad \uc9c4\ud589...`);
const ok=await _0x1014(found);
if(ok)return true;
}
await _0x1001(150);
}
let scrollBox=document.querySelector('\x2e\x71-\x64\x69\x61\x6c\x6f\x67 \x2e\x73\x63\x72\x6f\x6c\x6c, \x2e\x71-\x64\x69\x61\x6c\x6f\x67\x5f\x5f\x69\x6e\x6e\x65\x72 \x2e\x73\x63\x72\x6f\x6c\x6c, \x2e\x71-\x64\x69\x61\x6c\x6f\x67 \x2e\x71-\x63\x61\x72\x64, \x2e\x71-\x64\x69\x61\x6c\x6f\x67 [\x63\x6c\x61\x73\x73*="\x73\x63\x72\x6f\x6c\x6c"], \x2e\x71-\x6d\x65\x6e\x75, \x2e\x71-\x76\x69\x72\x74\x75\x61\x6c-\x73\x63\x72\x6f\x6c\x6c\x5f\x5f\x63\x6f\x6e\x74\x65\x6e\x74, \x2e\x71-\x73\x63\x72\x6f\x6c\x6c\x61\x72\x65\x61\x5f\x5f\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72')||
Array.from(document.querySelectorAll('\x2e\x71-\x64\x69\x61\x6c\x6f\x67 \x64\x69\x76, [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"] \x64\x69\x76, \x64\x69\x76')).find(el=>el.scrollHeight>el.clientHeight&&el.offsetHeight>0);
for(let i=0;i<40;i++){
if(shouldStopRegistration)return false;
const found=_0x1013(targetText,searchScope);
if(found){
console.log(`[\ub9e4\ud06c\ub85c] \uace8\ud504\uc7a5(${targetText}) \uc2a4\ud06c\ub864 \uc911 \ubc1c\uacac! \uc120\ud0dd \ud074\ub9ad \uc9c4\ud589...`);
const ok=await _0x1014(found);
if(ok)return true;
}
if(scrollBox){
scrollBox.scrollTop+=380;
const firstItem=scrollBox.querySelector('\x2e\x71-\x69\x74\x65\x6d, \x64\x69\x76');
if(firstItem&&i>5){
firstItem.style.marginTop="-"+((i-5)*380)+"\x70\x78";
}
}
await _0x1001(250);
}
const lastChance=_0x1013(targetText,document.body);
if(lastChance){
console.log(`[\ub9e4\ud06c\ub85c] \uace8\ud504\uc7a5(${targetText}) \ucd5c\uc885 \uac80\uc0c9\uc5d0\uc11c \ubc1c\uacac! \uc120\ud0dd \ud074\ub9ad \uc9c4\ud589...`);
return await _0x1014(lastChance);
}
console.error(`[\ub9e4\ud06c\ub85c] \uace8\ud504\uc7a5(${targetText}) \ubaa9\ub85d \ub0b4 \ubbf8\ubc1c\uacac`);
return false;
}
async function _0x1016(rawDate){
if(!rawDate)return false;
await _0x1001(Math.floor(Math.random()*100+300));
if(shouldStopRegistration)return false;
const parts=rawDate.split('\x2e');
const targetMonth=parts[0];
const targetDay=parts[1];
console.log(`[\ub9e4\ud06c\ub85c] 6\ub2e8\uacc4: \ub0a0\uc9dc \uc120\ud0dd (${targetMonth}\uc6d4 ${targetDay}\uc77c)...`);
const fields=Array.from(document.querySelectorAll('\x2e\x71-\x66\x69\x65\x6c\x64, \x2e\x71-\x66\x69\x65\x6c\x64\x5f\x5f\x63\x6f\x6e\x74\x72\x6f\x6c'))
.sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top);
if(fields.length>0){
fields[0].click();
await _0x1001(600);
const monthHeaderBtn=document.querySelector('\x2e\x71-\x64\x61\x74\x65\x5f\x5f\x76\x69\x65\x77 \x2e\x71-\x62\x74\x6e\x5f\x5f\x63\x6f\x6e\x74\x65\x6e\x74 \x73\x70\x61\x6e')||
document.querySelector('\x2e\x71-\x64\x61\x74\x65\x5f\x5f\x76\x69\x65\x77 \x2e\x71-\x62\x74\x6e\x5f\x5f\x63\x6f\x6e\x74\x65\x6e\x74');
const currentMonthNum=monthHeaderBtn?monthHeaderBtn.textContent.replace(/[^0-9]/g,'').trim():"";
console.log(`[\ub9e4\ud06c\ub85c] \ub2ec\ub825 \ud604\uc7ac \ud45c\uc2dc \uc6d4: ${currentMonthNum}\uc6d4`);
if(currentMonthNum!==targetMonth&&monthHeaderBtn){
console.log(`[\ub9e4\ud06c\ub85c] \ubaa9\ud45c \uc6d4(${targetMonth}\uc6d4)\ub85c \ubcc0\uacbd \uc9c4\ud589`);
monthHeaderBtn.click();
await _0x1001(500);
const allMonthBtns=Array.from(document.querySelectorAll('\x2e\x71-\x64\x61\x74\x65\x5f\x5f\x6d\x6f\x6e\x74\x68\x73-\x69\x74\x65\x6d \x2e\x71-\x62\x74\x6e\x5f\x5f\x63\x6f\x6e\x74\x65\x6e\x74, \x2e\x71-\x62\x74\x6e\x5f\x5f\x63\x6f\x6e\x74\x65\x6e\x74 \x73\x70\x61\x6e'));
const targetMonthBtn=allMonthBtns.find(el=>el.textContent.trim()===`${targetMonth}\uc6d4`);
if(targetMonthBtn){
targetMonthBtn.click();
await _0x1001(600);
}
}
const dayBtns=Array.from(document.querySelectorAll('\x2e\x71-\x64\x61\x74\x65\x5f\x5f\x63\x61\x6c\x65\x6e\x64\x61\x72-\x69\x74\x65\x6d \x62\x75\x74\x74\x6f\x6e'));
const finalBtn=dayBtns.find(btn=>{
return btn.textContent.trim()===targetDay&&!btn.closest('\x2e\x71-\x64\x61\x74\x65\x5f\x5f\x63\x61\x6c\x65\x6e\x64\x61\x72-\x69\x74\x65\x6d--\x6f\x75\x74');
});
if(finalBtn){
await _0x1001(200);
const rect=finalBtn.getBoundingClientRect();
const opts={bubbles:true,clientX:rect.left+rect.width/2,clientY:rect.top+rect.height/2};
finalBtn.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x65\x6e\x74\x65\x72',opts));
await _0x1001(150);
finalBtn.click();
console.log(`[\ub9e4\ud06c\ub85c] \ub0a0\uc9dc(${targetMonth}\uc6d4 ${targetDay}\uc77c) \ud074\ub9ad \uc644\ub8cc`);
await _0x1001(350);
return true;
}
}
console.error(`[\ub9e4\ud06c\ub85c] \ub0a0\uc9dc(${rawDate}) \uc120\ud0dd \uc2e4\ud328`);
return false;
}
async function _0x1017(selectedTime){
if(!selectedTime)return false;
console.log(`[\ub9e4\ud06c\ub85c] 7\ub2e8\uacc4: \uc2dc\uac04(${selectedTime}) \uc785\ub825 \uc911...`);
const fields=Array.from(document.querySelectorAll('\x2e\x71-\x66\x69\x65\x6c\x64, \x2e\x71-\x66\x69\x65\x6c\x64\x5f\x5f\x63\x6f\x6e\x74\x72\x6f\x6c'))
.sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top);
if(fields.length>0){
const rect=fields[0].getBoundingClientRect();
const tx=rect.left+(rect.width/2);
const ty=rect.top+75;
let input=null;
const target=document.elementFromPoint(tx,ty);
if(target){
const opts={bubbles:false,cancelable:true,view:window,clientX:tx,clientY:ty};
target.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x65\x6e\x74\x65\x72',opts));
target.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x6f\x76\x65\x72',opts));
await _0x1001(100);
const elements=document.elementsFromPoint(tx,ty);
input=elements.find(el=>el.tagName==='\x49\x4e\x50\x55\x54')||
elements.find(el=>el.querySelector('\x69\x6e\x70\x75\x74'))?.querySelector('\x69\x6e\x70\x75\x74');
}
if(!input){
const allInputs=Array.from(document.querySelectorAll('\x69\x6e\x70\x75\x74')).filter(el=>el.offsetHeight>0);
input=allInputs.find(el=>{
const ph=el.placeholder||'';
return ph.includes('\x31\x36\x30\x30')||ph.includes('\x30\x37\x31\x30')||ph.includes('\uc2dc\uac04');
})||(fields[1]?fields[1].querySelector('\x69\x6e\x70\x75\x74'):null);
}
if(input){
input.focus();
input.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',{bubbles:false,cancelable:true}));
await _0x1007(input,selectedTime);
console.log(`[\ub9e4\ud06c\ub85c] \uc2dc\uac04(${selectedTime}) \ud55c \uae00\uc790\uc529 \ud0c0\uc774\ud551 \uc785\ub825 \uc131\uacf5`);
return true;
}
}
console.error(`[\ub9e4\ud06c\ub85c] \uc2dc\uac04 \uc785\ub825\uce78 \ud0d0\uc0c9 \uc2e4\ud328`);
return false;
}
async function _0x1018(feeValue,isPrepaidParam=false){
if(!feeValue)return false;
let isPrepaid=isPrepaidParam;
let actualFee=feeValue.toString().trim();
if(actualFee.includes('\uc120\uc785\uae08')){
actualFee=actualFee.split('|')[0].replace('\uc120\uc785\uae08','').trim();
isPrepaid=true;
}
console.log(`[\ub9e4\ud06c\ub85c] 8\ub2e8\uacc4: \uadf8\ub9b0\ud53c(${actualFee}) \uc785\ub825 \ubc0f \uc120\uc785\uae08 \ucc98\ub9ac \uc5ec\ubd80: ${isPrepaid?'\uc120\uc785\uae08 \uccb4\ud06c \uc9c4\ud589':'\uccb4\ud06c \uc548 \ud568'}`);
const matchNum=actualFee.match(/([0-9]+(?:\.[0-9]+)?)/);
if(matchNum){
actualFee=matchNum[1];
}
let feeInput=null;
const dialog=document.querySelector('\x2e\x71-\x64\x69\x61\x6c\x6f\x67\x3a\x6e\x6f\x74([\x73\x74\x79\x6c\x65*="\x64\x69\x73\x70\x6c\x61\x79\x3a \x6e\x6f\x6e\x65"]), \x2e\x71-\x63\x61\x72\x64, [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"]');
if(dialog){
feeInput=dialog.querySelector('\x69\x6e\x70\x75\x74[\x70\x6c\x61\x63\x65\x68\x6f\x6c\x64\x65\x72*="\uadf8\ub9b0\ud53c"], \x69\x6e\x70\x75\x74[\x70\x6c\x61\x63\x65\x68\x6f\x6c\x64\x65\x72*="\uc22b\uc790"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x66\x65\x65"]');
}
if(!feeInput){
const inputs=Array.from(document.querySelectorAll('\x69\x6e\x70\x75\x74[\x70\x6c\x61\x63\x65\x68\x6f\x6c\x64\x65\x72*="\uadf8\ub9b0\ud53c"], \x69\x6e\x70\x75\x74[\x70\x6c\x61\x63\x65\x68\x6f\x6c\x64\x65\x72*="\uc22b\uc790"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x66\x65\x65"]'))
.filter(el=>el.offsetHeight>0);
feeInput=inputs[0]||document.querySelector('\x69\x6e\x70\x75\x74[\x70\x6c\x61\x63\x65\x68\x6f\x6c\x64\x65\x72*="\uadf8\ub9b0\ud53c"], \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x66\x65\x65"]');
}
if(feeInput){
feeInput.scrollIntoView({block:'\x63\x65\x6e\x74\x65\x72'});
const rect=feeInput.getBoundingClientRect();
const tx=rect.left+rect.width/2;
const ty=rect.top+rect.height/2;
const opts={bubbles:false,cancelable:true,view:window,clientX:tx,clientY:ty};
feeInput.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x65\x6e\x74\x65\x72',opts));
feeInput.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x6f\x76\x65\x72',opts));
feeInput.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
feeInput.focus();
feeInput.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
await _0x1001(80);
await _0x1007(feeInput,actualFee);
console.log(`[\ub9e4\ud06c\ub85c] \uadf8\ub9b0\ud53c \uc22b\uc790(${actualFee}) \ud55c \uae00\uc790\uc529 \ud0c0\uc774\ud551 \uc785\ub825 \ubc0f v-model \ucee4\ubc0b \uc644\ub8cc`);
}else{
console.warn(`[\ub9e4\ud06c\ub85c] \uadf8\ub9b0\ud53c \uc785\ub825\uce78\uc744 \ucc3e\uc9c0 \ubabb\ud568`);
}
if(isPrepaid){
await _0x1001(500);
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,false);
let node;
while(node=walker.nextNode()){
if(node.textContent.includes('\uc120\uc785\uae08')){
const targetEl=node.parentElement;
if(targetEl.tagName==='\x53\x43\x52\x49\x50\x54'||targetEl.tagName==='\x53\x54\x59\x4c\x45')continue;
const clickTarget=targetEl.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x6c\x61\x62\x65\x6c, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, \x2e\x71-\x63\x68\x69\x70')||targetEl;
const rect=clickTarget.getBoundingClientRect();
if(rect.width===0||rect.height===0)continue;
const isAlreadyChecked=clickTarget.classList.contains('\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78--\x74\x72\x75\x74\x68\x79')||
clickTarget.classList.contains('\x71-\x62\x74\x6e--\x61\x63\x74\x69\x76\x65')||
clickTarget.classList.contains('\x61\x63\x74\x69\x76\x65')||
clickTarget.getAttribute('\x61\x72\x69\x61-\x63\x68\x65\x63\x6b\x65\x64')==='\x74\x72\x75\x65';
if(!isAlreadyChecked){
const x=rect.left+rect.width/2;
const y=rect.top+rect.height/2;
const opts={bubbles:true,cancelable:true,view:window,clientX:x,clientY:y};
clickTarget.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x65\x6e\x74\x65\x72',opts));
clickTarget.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x6f\x76\x65\x72',opts));
clickTarget.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
clickTarget.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
clickTarget.click();
console.log("[\ub9e4\ud06c\ub85c] '\uc120\uc785\uae08' \uccb4\ud06c \uc644\ub8cc");
}else{
console.log("[\ub9e4\ud06c\ub85c] '\uc120\uc785\uae08' \uc774\ubbf8 \uccb4\ud06c\ub418\uc5b4 \uc788\uc74c");
}
break;
}
}
}
return true;
}
async function _0x1019(isMealParam=false){
console.log(`[\ub9e4\ud06c\ub85c] 8-2\ub2e8\uacc4: \uc2dd\uc0ac\ud3ec\ud568 \ucc98\ub9ac \uc5ec\ubd80: ${isMealParam?'\uc2dd\uc0ac\ud3ec\ud568 \uccb4\ud06c \uc9c4\ud589':'\uccb4\ud06c \uc548 \ud568'}`);
const dialog=document.querySelector('\x2e\x71-\x64\x69\x61\x6c\x6f\x67\x3a\x6e\x6f\x74([\x73\x74\x79\x6c\x65*="\x64\x69\x73\x70\x6c\x61\x79\x3a \x6e\x6f\x6e\x65"]), \x2e\x71-\x63\x61\x72\x64, [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"]')||document.body;
const walker=document.createTreeWalker(dialog,NodeFilter.SHOW_TEXT,null,false);
let node;
let targetCheckbox=null;
while(node=walker.nextNode()){
const txt=node.textContent.trim().replace(/\s+/g,'');
if(txt.includes('\uc2dd\uc0ac\ud3ec\ud568')||txt.includes('\uc2dd\uc0ac\uc81c\uacf5')||txt.includes('\uc870\uc2dd\ud3ec\ud568')||(txt==='\uc2dd\uc0ac'&&!txt.includes('\ubd88\uac00'))){
const parent=node.parentElement;
if(!parent||parent.tagName==='\x53\x43\x52\x49\x50\x54'||parent.tagName==='\x53\x54\x59\x4c\x45')continue;
const candidate=parent.closest('\x6c\x61\x62\x65\x6c, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x63\x68\x69\x70')||parent;
const rect=candidate.getBoundingClientRect();
if(rect.width===0||rect.height===0)continue;
targetCheckbox=candidate;
break;
}
}
if(!targetCheckbox){
const checkboxes=Array.from(dialog.querySelectorAll('\x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x6c\x61\x62\x65\x6c'))
.filter(el=>el.offsetHeight>0&&el.textContent.includes('\uc2dd\uc0ac'));
if(checkboxes.length>0){
targetCheckbox=checkboxes[0];
}
}
if(targetCheckbox){
const isAlreadyChecked=targetCheckbox.classList.contains('\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78--\x74\x72\x75\x74\x68\x79')||
targetCheckbox.classList.contains('\x71-\x62\x74\x6e--\x61\x63\x74\x69\x76\x65')||
targetCheckbox.classList.contains('\x61\x63\x74\x69\x76\x65')||
targetCheckbox.getAttribute('\x61\x72\x69\x61-\x63\x68\x65\x63\x6b\x65\x64')==='\x74\x72\x75\x65'||
Boolean(targetCheckbox.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]')?.checked);
if(isMealParam&&!isAlreadyChecked){
const rect=targetCheckbox.getBoundingClientRect();
const x=rect.left+rect.width/2;
const y=rect.top+rect.height/2;
const opts={bubbles:true,cancelable:true,view:window,clientX:x,clientY:y};
targetCheckbox.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x65\x6e\x74\x65\x72',opts));
targetCheckbox.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x6f\x76\x65\x72',opts));
targetCheckbox.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
targetCheckbox.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
targetCheckbox.click();
const chkInput=targetCheckbox.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]');
if(chkInput&&!chkInput.checked){
chkInput.click();
}
console.log("[\ub9e4\ud06c\ub85c] '\uc2dd\uc0ac\ud3ec\ud568' \uccb4\ud06c \uc644\ub8cc");
}else if(!isMealParam&&isAlreadyChecked){
targetCheckbox.click();
console.log("[\ub9e4\ud06c\ub85c] '\uc2dd\uc0ac\ud3ec\ud568' \uc774\uc804 \uccb4\ud06c \ud574\uc81c \uc644\ub8cc");
}else{
console.log(`[\ub9e4\ud06c\ub85c] '\uc2dd\uc0ac\ud3ec\ud568' \uc774\ubbf8 ${isMealParam?'\uccb4\ud06c\ub428':'\ubbf8\uccb4\ud06c \uc0c1\ud0dc'}`);
}
return true;
}else{
if(isMealParam){
console.warn("[\ub9e4\ud06c\ub85c] '\uc2dd\uc0ac\ud3ec\ud568' \uccb4\ud06c\ubc15\uc2a4\ub97c \ucc3e\uc9c0 \ubabb\ud568 (\ud654\uba74\uc5d0 \uc5c6\ub294 \uacbd\uc6b0 \ud1b5\uacfc)");
}
}
return false;
}
function _0x101a(el){
if(!el)return null;
return el.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, \x6c\x61\x62\x65\x6c, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||el;
}
function _0x101b(el){
if(!el)return false;
return el.classList.contains('\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78--\x74\x72\x75\x74\x68\x79')||
el.classList.contains('\x71-\x62\x74\x6e--\x61\x63\x74\x69\x76\x65')||
el.classList.contains('\x61\x63\x74\x69\x76\x65')||
el.classList.contains('\x62\x67-\x70\x72\x69\x6d\x61\x72\x79')||
el.getAttribute('\x61\x72\x69\x61-\x63\x68\x65\x63\x6b\x65\x64')==='\x74\x72\x75\x65'||
el.getAttribute('\x61\x72\x69\x61-\x70\x72\x65\x73\x73\x65\x64')==='\x74\x72\x75\x65'||
el.getAttribute('\x61\x72\x69\x61-\x73\x65\x6c\x65\x63\x74\x65\x64')==='\x74\x72\x75\x65';
}
async function _0x101c(clickTarget,label=''){
if(!clickTarget)return false;
clickTarget.scrollIntoView({block:'\x63\x65\x6e\x74\x65\x72',behavior:'\x69\x6e\x73\x74\x61\x6e\x74'});
clickTarget.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x30\x30\x65\x36\x37\x36','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
const rect=clickTarget.getBoundingClientRect();
const cx=rect.left+rect.width/2;
const cy=rect.top+rect.height/2;
const opts={bubbles:true,cancelable:true,view:window,clientX:cx,clientY:cy};
const topEl=document.elementFromPoint(cx,cy)||clickTarget;
try{
topEl.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x64\x6f\x77\x6e',opts));
topEl.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
}catch(e){}
await _0x1001(60);
try{
topEl.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x75\x70',opts));
topEl.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
topEl.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',opts));
}catch(e){}
try{clickTarget.click();}catch(e){}
try{topEl.click();}catch(e){}
await _0x1005(clickTarget);
return true;
}
async function _0x101d(cadyValue,forceCheck=false){
let raw=(cadyValue||'\uce90\ub514').toString().trim();
let targetCady='\uce90\ub514';
if(raw.includes('\ub178\uce90\ub514')){
targetCady='\ub178\uce90\ub514';
}else if(raw.includes('\uc2e0\uc785')||raw.includes('\uad50\uc721\uc0dd')){
targetCady='\uad50\uc721\uc0dd\uce90\ub514';
}else if(raw.includes('\uc6b4\uc804')||raw.includes('\ub4dc\ub77c\uc774\ube59')||raw.includes('\ud2b9\uc218')||raw.includes('\ub9c8\uc0ec')){
targetCady='\uc6b4\uc804\uce90\ub514';
}else{
targetCady='\uce90\ub514';
}
console.log(`[\ub9e4\ud06c\ub85c] 9\ub2e8\uacc4: \uce90\ub514 \uc124\uc815 -> \ubaa9\ud45c: [${targetCady}] (\uc6d0\ub798\uac12: ${raw}, forceCheck: ${forceCheck})`);
if(targetCady==='\uce90\ub514'&&!forceCheck&&!isEditPage()){
console.log("[\ub9e4\ud06c\ub85c] \uc2e0\uaddc \ub4f1\ub85d \uae30\ubcf8\uac12 '\uce90\ub514'\uc774\ubbc0\ub85c \ud1b5\uacfc");
return false;
}
const candidateTexts=[
targetCady,
targetCady.replace(/\s+/g,'')
];
if(targetCady==='\uad50\uc721\uc0dd\uce90\ub514')candidateTexts.push('\uad50\uc721\uc0dd','\uad50\uc721\uc0dd\uce90\ub514','\uc2e0\uc785\uce90\ub514','\uc2e0\uc785');
else if(targetCady==='\uc6b4\uc804\uce90\ub514')candidateTexts.push('\uc6b4\uc804\uce90\ub514','\uc6b4\uc804','\uc6b4\uc804 \uce90\ub514');
else if(targetCady==='\ub178\uce90\ub514')candidateTexts.push('\ub178\uce90\ub514');
else if(targetCady==='\uce90\ub514')candidateTexts.push('\uce90\ub514');
const isMatchCady=(txt)=>{
const clean=(txt||'').trim().replace(/\s+/g,'');
if(targetCady==='\ub178\uce90\ub514'){
return clean==='\ub178\uce90\ub514'||clean.includes('\ub178\uce90\ub514');
}
if(targetCady==='\uc6b4\uc804\uce90\ub514'){
return clean==='\uc6b4\uc804\uce90\ub514'||clean==='\uc6b4\uc804';
}
if(targetCady==='\uad50\uc721\uc0dd\uce90\ub514'){
return clean==='\uad50\uc721\uc0dd\uce90\ub514'||clean==='\uad50\uc721\uc0dd'||clean==='\uc2e0\uc785'||clean==='\uc2e0\uc785\uce90\ub514';
}
if(targetCady==='\uce90\ub514'){
return clean==='\uce90\ub514';
}
return candidateTexts.some(ct=>clean===ct.replace(/\s+/g,''));
};
let targetBtn=null;
const headers=Array.from(document.querySelectorAll('\x64\x69\x76, \x73\x70\x61\x6e, \x6c\x61\x62\x65\x6c, \x70, \x68\x36, \x68\x35, \x2e\x71-\x66\x69\x65\x6c\x64\x5f\x5f\x6c\x61\x62\x65\x6c'))
.filter(el=>{
if(el.offsetHeight<=0)return false;
if(el.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]'))return false;
const txt=el.textContent.trim().replace(/\s+/g,'');
return txt.includes('\uce90\ub514\ub97c\uc120\ud0dd')||txt.includes('\uce90\ub514\uc120\ud0dd')||txt==='\uce90\ub514';
});
if(headers.length>0){
const headerEl=headers.sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length)[0];
let container=headerEl.parentElement;
for(let depth=0;depth<5&&container;depth++){
const candidates=Array.from(container.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, \x6c\x61\x62\x65\x6c, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x2e\x71-\x62\x74\x6e\x5f\x5f\x63\x6f\x6e\x74\x65\x6e\x74, \x73\x70\x61\x6e'))
.filter(el=>{
if(el.offsetHeight<=0)return false;
if(el.closest('\x2e\x71-\x63\x61\x72\x64')&&!el.closest('\x2e\x71-\x64\x69\x61\x6c\x6f\x67, [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"]'))return false;
return isMatchCady(el.textContent);
});
if(candidates.length>0){
const directBtn=candidates.find(el=>el.matches('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||el.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]'));
const bestCandidate=directBtn||candidates.sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length)[0];
targetBtn=_0x101a(bestCandidate);
break;
}
container=container.parentElement;
}
}
if(!targetBtn){
const allElements=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, \x2e\x71-\x62\x74\x6e\x5f\x5f\x63\x6f\x6e\x74\x65\x6e\x74, \x6c\x61\x62\x65\x6c, \x73\x70\x61\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]'))
.filter(el=>{
if(el.offsetHeight<=0)return false;
if(el.closest('\x2e\x71-\x63\x61\x72\x64')&&!el.closest('\x2e\x71-\x64\x69\x61\x6c\x6f\x67, [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"]'))return false;
return isMatchCady(el.textContent);
});
if(allElements.length>0){
const btnMatch=allElements.find(el=>el.matches('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||el.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]'));
const best=btnMatch||allElements.sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length)[0];
targetBtn=_0x101a(best);
}
}
if(!targetBtn){
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,false);
let node;
while((node=walker.nextNode())){
if(isMatchCady(node.textContent)){
const p=node.parentElement;
if(p&&p.offsetHeight>0&&!['\x53\x43\x52\x49\x50\x54','\x53\x54\x59\x4c\x45'].includes(p.tagName)){
if(p.closest('\x2e\x71-\x63\x61\x72\x64')&&!p.closest('\x2e\x71-\x64\x69\x61\x6c\x6f\x67, [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"]'))continue;
targetBtn=_0x101a(p);
break;
}
}
}
}
if(targetBtn){
const clickTarget=_0x101a(targetBtn);
if(_0x101b(clickTarget)){
console.log(`[\ub9e4\ud06c\ub85c] \uce90\ub514 [${targetCady}] \uc774\ubbf8 \uc120\ud0dd(\ud65c\uc131)\ub418\uc5b4 \uc788\uc5b4 \ud074\ub9ad\uc744 \uac74\ub108\ub701\ub2c8\ub2e4.`);
return false;
}
console.log(`[\ub9e4\ud06c\ub85c] \uce90\ub514 [${targetCady}] \uc815\ubc00 \ud074\ub9ad \uc2e4\ud589!`);
await _0x101c(clickTarget,`\uce90\ub514:${targetCady}`);
await _0x1001(150);
if(!_0x101b(clickTarget)){
console.log(`[\ub9e4\ud06c\ub85c] \uce90\ub514 [${targetCady}] 1\ucc28 \ud074\ub9ad \ud6c4 \ubbf8\ud65c\uc131 \uac10\uc9c0 -> \uc9c1\uc811 click() \uc7ac\uc2dc\ub3c4`);
try{clickTarget.click();}catch(e){}
const innerBtn=clickTarget.querySelector('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e\x5f\x5f\x63\x6f\x6e\x74\x65\x6e\x74')||clickTarget;
try{innerBtn.click();}catch(e){}
await _0x1001(150);
}
return true;
}else{
console.warn(`[\ub9e4\ud06c\ub85c] \uce90\ub514 [${targetCady}] \ubc84\ud2bc\uc744 \ucc3e\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4.`);
}
return false;
}
async function _0x101e(conditionValue){
let raw=(conditionValue||'\ubb34\uad00').toString().trim();
let targetCondition='\ubb34\uad00';
if(raw==='\ub0a8\uc790'||raw==='\ub0a8\uc790\ub9cc'||raw==='\ub0a8\uc131\ub9cc'||raw==='\ub0a8\uc790 \uc804\uc6a9'||raw==='\ub0a8\uc131 \uc804\uc6a9'||raw==='\ub0a8\ub0a8\ub9cc'){
targetCondition='\ub0a8\uc790';
}else if(raw==='\uc5ec\uc790'||raw==='\uc5ec\uc790\ub9cc'||raw==='\uc5ec\uc131\ub9cc'||raw==='\uc5ec\uc790 \uc804\uc6a9'||raw==='\uc5ec\uc131 \uc804\uc6a9'||raw==='\uc5ec\uc5ec\ub9cc'){
targetCondition='\uc5ec\uc790';
}else if(raw==='\ubd80\ubd80\x2f\ucee4\ud50c'||raw==='\ub0a8\uc5ec\ub9cc'||raw==='\ub0a8\ub140\ub9cc'||raw==='\ubd80\ubd80'||raw==='\ucee4\ud50c'){
targetCondition='\ubd80\ubd80\x2f\ucee4\ud50c';
}else{
targetCondition='\ubb34\uad00';
}
console.log(`[\ub9e4\ud06c\ub85c] 10\ub2e8\uacc4: \uc870\uac74/\uc131\ubcc4 \uc124\uc815 -> \ubaa9\ud45c: [${targetCondition}] (\uc6d0\ub798\uac12: ${raw})`);
let targetBtn=null;
const headers=Array.from(document.querySelectorAll('\x64\x69\x76, \x73\x70\x61\x6e, \x6c\x61\x62\x65\x6c, \x70, \x68\x36, \x68\x35, \x2e\x71-\x66\x69\x65\x6c\x64\x5f\x5f\x6c\x61\x62\x65\x6c'))
.filter(el=>{
const txt=el.textContent.trim().replace(/\s+/g,'');
return(txt.includes('\uc870\uc778\uc870\uac74')||txt.includes('\uc870\uc778\uc870\uac74\uc744\uc120\ud0dd\ud558\uc138\uc694')||txt.includes('\uc870\uac74\uc120\ud0dd'))&&el.offsetHeight>0;
});
if(headers.length>0){
const headerEl=headers.sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length)[0];
let container=headerEl.parentElement;
for(let depth=0;depth<5&&container;depth++){
const candidates=Array.from(container.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x6c\x61\x62\x65\x6c, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x2e\x71-\x62\x74\x6e\x5f\x5f\x63\x6f\x6e\x74\x65\x6e\x74, \x73\x70\x61\x6e'))
.filter(el=>el.textContent.trim().replace(/\s+/g,'')===targetCondition.replace(/\s+/g,'')&&el.offsetHeight>0);
if(candidates.length>0){
targetBtn=candidates[0].closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x6c\x61\x62\x65\x6c, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||candidates[0];
break;
}
container=container.parentElement;
}
}
if(!targetBtn){
const allElements=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x62\x74\x6e\x5f\x5f\x63\x6f\x6e\x74\x65\x6e\x74, \x6c\x61\x62\x65\x6c, \x73\x70\x61\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]'))
.filter(el=>el.offsetHeight>0&&el.textContent.trim().replace(/\s+/g,'')===targetCondition.replace(/\s+/g,''));
if(allElements.length>0){
const btnMatch=allElements.find(el=>el.matches('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||el.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e'));
targetBtn=btnMatch?(btnMatch.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||btnMatch):allElements[0];
}
}
if(targetBtn){
const clickTarget=targetBtn.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x69\x74\x65\x6d, \x6c\x61\x62\x65\x6c, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78')||targetBtn;
const isAlreadyChecked=clickTarget.classList.contains('\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78--\x74\x72\x75\x74\x68\x79')||
clickTarget.classList.contains('\x71-\x62\x74\x6e--\x61\x63\x74\x69\x76\x65')||
clickTarget.classList.contains('\x61\x63\x74\x69\x76\x65')||
clickTarget.classList.contains('\x62\x67-\x70\x72\x69\x6d\x61\x72\x79')||
clickTarget.getAttribute('\x61\x72\x69\x61-\x63\x68\x65\x63\x6b\x65\x64')==='\x74\x72\x75\x65'||
clickTarget.getAttribute('\x61\x72\x69\x61-\x70\x72\x65\x73\x73\x65\x64')==='\x74\x72\x75\x65';
if(isAlreadyChecked){
console.log(`[\ub9e4\ud06c\ub85c] \uc870\uac74 [${targetCondition}] \uc774\ubbf8 \uc120\ud0dd\ub418\uc5b4 \uc788\uc5b4 \ud074\ub9ad\uc744 \uac74\ub108\ub701\ub2c8\ub2e4.`);
return false;
}
enforceNonSubmitButtonType(clickTarget);
clickTarget.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x63\x79\x61\x6e','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
const opts={bubbles:true,cancelable:true,view:window};
clickTarget.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
clickTarget.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
clickTarget.click();
console.log(`[\ub9e4\ud06c\ub85c] \uc870\uac74 [${targetCondition}] \ud074\ub9ad \ubc0f \uc120\ud0dd \uc644\ub8cc`);
return true;
}else{
console.warn(`[\ub9e4\ud06c\ub85c] \uc870\uac74 [${targetCondition}] \ubc84\ud2bc\uc744 \ucc3e\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4.`);
}
return false;
}
async function _0x101f(sizenum,maxAttempts=2){
const match=(sizenum||'\x34').toString().match(/\d+/);
const pNum=match?match[0]:'\x34';
const targetText=`${pNum}\uba85`;
console.log(`[\ub9e4\ud06c\ub85c] 11\ub2e8\uacc4: \uc694\uccad \uc778\uc6d0(${targetText}) \ubc84\ud2bc \ud0d0\uc0c9 \ubc0f \uc120\ud0dd \uc2dc\uc791... (\ubaa9\ud45c: ${pNum}\uba85)`);
for(let attempt=0;attempt<maxAttempts;attempt++){
if(shouldStopRegistration)return false;
let targetBtn=null;
const headers=Array.from(document.querySelectorAll('\x64\x69\x76, \x73\x70\x61\x6e, \x6c\x61\x62\x65\x6c, \x70, \x68\x36, \x68\x35, \x2e\x71-\x66\x69\x65\x6c\x64\x5f\x5f\x6c\x61\x62\x65\x6c'))
.filter(el=>{
const txt=el.textContent.trim().replace(/\s+/g,'');
return(txt.includes('\uc694\uccad\uc778\uc6d0')||txt.includes('\uc694\uccad\uc778\uc6d0\uc744\uc120\ud0dd\ud558\uc138\uc694'))&&el.offsetHeight>0;
});
if(headers.length>0){
const headerEl=headers.sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length)[0];
let container=headerEl.parentElement;
for(let depth=0;depth<5&&container;depth++){
const candidates=Array.from(container.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x6c\x61\x62\x65\x6c, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x2e\x71-\x62\x74\x6e\x5f\x5f\x63\x6f\x6e\x74\x65\x6e\x74'))
.filter(el=>el.textContent.trim().replace(/\s+/g,'')===targetText&&el.offsetHeight>0);
if(candidates.length>0){
targetBtn=candidates[0];
break;
}
const groupButtons=Array.from(container.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e'))
.filter(el=>['\x31\uba85','\x32\uba85','\x33\uba85','\x34\uba85'].some(t=>el.textContent.trim().replace(/\s+/g,'')===t)&&el.offsetHeight>0);
const idx=parseInt(pNum,10)-1;
if(groupButtons.length>=4&&idx>=0&&idx<groupButtons.length){
targetBtn=groupButtons[idx];
break;
}
container=container.parentElement;
}
}
if(!targetBtn){
const allElements=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x62\x74\x6e\x5f\x5f\x63\x6f\x6e\x74\x65\x6e\x74, \x6c\x61\x62\x65\x6c, \x73\x70\x61\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]'))
.filter(el=>el.offsetHeight>0&&el.textContent.trim().replace(/\s+/g,'')===targetText);
if(allElements.length>0){
const btnMatch=allElements.find(el=>el.matches('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||el.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e'));
targetBtn=btnMatch||allElements[0];
}
}
if(!targetBtn){
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,false);
let node;
while((node=walker.nextNode())){
if(node.textContent.trim().replace(/\s+/g,'')===targetText){
const parent=node.parentElement;
if(parent&&parent.offsetHeight>0&&!['\x53\x43\x52\x49\x50\x54','\x53\x54\x59\x4c\x45'].includes(parent.tagName)){
targetBtn=parent.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x6c\x61\x62\x65\x6c, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||parent;
break;
}
}
}
}
if(!targetBtn){
const altCandidates=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x62\x74\x6e\x5f\x5f\x63\x6f\x6e\x74\x65\x6e\x74, \x6c\x61\x62\x65\x6c'))
.filter(el=>el.offsetHeight>0&&(el.textContent.trim().replace(/\s+/g,'')===`${pNum}\uc778`||el.textContent.trim().replace(/\s+/g,'')===pNum));
if(altCandidates.length>0){
targetBtn=altCandidates[0];
}
}
if(targetBtn){
const clickTarget=targetBtn.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x6c\x61\x62\x65\x6c, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||targetBtn;
const isAlreadyActive=clickTarget.classList.contains('\x71-\x62\x74\x6e--\x61\x63\x74\x69\x76\x65')||
clickTarget.classList.contains('\x61\x63\x74\x69\x76\x65')||
clickTarget.classList.contains('\x62\x67-\x70\x72\x69\x6d\x61\x72\x79')||
clickTarget.getAttribute('\x61\x72\x69\x61-\x70\x72\x65\x73\x73\x65\x64')==='\x74\x72\x75\x65'||
clickTarget.getAttribute('\x61\x72\x69\x61-\x73\x65\x6c\x65\x63\x74\x65\x64')==='\x74\x72\x75\x65';
if(isAlreadyActive){
console.log(`[\ub9e4\ud06c\ub85c] \uc694\uccad \uc778\uc6d0(${targetText}) \uc774\ubbf8 \uc120\ud0dd\ub418\uc5b4 \uc788\uc5b4 \uac74\ub108\ub701\ub2c8\ub2e4.`);
return false;
}
enforceNonSubmitButtonType(clickTarget);
clickTarget.scrollIntoView({behavior:'\x69\x6e\x73\x74\x61\x6e\x74',block:'\x63\x65\x6e\x74\x65\x72'});
clickTarget.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x35\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x30\x30\x65\x36\x37\x36','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
clickTarget.style.setProperty('\x62\x6f\x78-\x73\x68\x61\x64\x6f\x77','\x30 \x30 \x31\x32\x70\x78 \x23\x30\x30\x65\x36\x37\x36','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
const rect=clickTarget.getBoundingClientRect();
const cx=rect.left+rect.width/2;
const cy=rect.top+rect.height/2;
const rawTopEl=document.elementFromPoint(cx,cy);
const topEl=(rawTopEl&&(rawTopEl===clickTarget||clickTarget.contains(rawTopEl)))?rawTopEl:clickTarget;
enforceNonSubmitButtonType(topEl);
console.log(`[\ub9e4\ud06c\ub85c] \uc694\uccad \uc778\uc6d0(${targetText}) \ubc84\ud2bc \ubc1c\uacac! \uc88c\ud45c: (${Math.round(cx)}, ${Math.round(cy)})`);
await _0x101c(clickTarget,`\uc694\uccad\uc778\uc6d0:${targetText}`);
console.log(`[\ub9e4\ud06c\ub85c] \uc694\uccad \uc778\uc6d0(${targetText}) \ubb3c\ub9ac\uc801 \ud074\ub9ad \uc644\ub8cc!`);
await _0x1001(80);
return true;
}
await _0x1001(80);
}
console.warn(`[\ub9e4\ud06c\ub85c] \uc694\uccad \uc778\uc6d0(${targetText}) \ubc84\ud2bc\uc744 \ucc3e\uc9c0 \ubabb\ud568 (\uc591\ub3c4 \ub4f1\ub85d\uc774\uac70\ub098 \ud654\uba74\uc5d0 \uc5c6\ub294 \uacbd\uc6b0 \ud1b5\uacfc)`);
return false;
}
async function _0x1020(customMemo,maxAttempts=10){
const val=customMemo||"\uace8\ud504\ub77d \uc9c0\uc6d0 \ud61c\ud0dd\uac00\n\uac00\uc7a5 \ube60\ub974\uace0 \uc2e0\uc18d\ud558\uac8c \ubaa8\uc2ed\ub2c8\ub2e4\n\ud0c0\uad6c\uc7a5\uc0c1\ub2f4\uae4c\uc9c0 \ud55c\ubc88\uc5d0\n\ud604\uc7ac\uc2e4\uc7a5\uc785\ub2c8\ub2e4!!";
console.log("[\ub9e4\ud06c\ub85c] \x31\x32\ub2e8\uacc4\x3a \uc0c1\uc138 \uc548\ub0b4 \ubb38\uad6c \uc785\ub825\x2e\x2e\x2e");
for(let attempt=0;attempt<maxAttempts;attempt++){
if(shouldStopRegistration)return false;
const el=document.querySelector('\x2e\x71\x6c-\x65\x64\x69\x74\x6f\x72, \x74\x65\x78\x74\x61\x72\x65\x61, [\x63\x6f\x6e\x74\x65\x6e\x74\x65\x64\x69\x74\x61\x62\x6c\x65="\x74\x72\x75\x65"]');
if(el&&el.offsetHeight>0){
el.focus();
if(el.isContentEditable){
document.execCommand('\x73\x65\x6c\x65\x63\x74\x41\x6c\x6c',false,null);
document.execCommand('\x69\x6e\x73\x65\x72\x74\x54\x65\x78\x74',false,val);
}else{
const nativeSetter=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'\x76\x61\x6c\x75\x65')?.set||
Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype,'\x76\x61\x6c\x75\x65')?.set;
if(nativeSetter)nativeSetter.call(el,val);
else el.value=val;
el.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
el.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
}
console.log("[\ub9e4\ud06c\ub85c] \uc0c1\uc138 \ubb38\uad6c \uc785\ub825 \uc644\ub8cc");
return true;
}
await _0x1001(200);
}
console.warn("[\ub9e4\ud06c\ub85c] \uc5d0\ub514\ud130\ub97c \ucc3e\uc9c0 \ubabb\ud568 (\ud1b5\uacfc)");
return false;
}
async function _0x1021(maxAttempts=15){
console.log("[\ub9e4\ud06c\ub85c] \x31\x33\ub2e8\uacc4\x3a '\ub4f1\ub85d\ud558\uae30' \ubc84\ud2bc \ud0d0\uc0c9 \ubc0f \ud074\ub9ad \uc2dc\ub3c4\x2e\x2e\x2e");
for(let attempt=0;attempt<maxAttempts;attempt++){
if(shouldStopRegistration)return false;
const btn=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x64\x69\x76, \x73\x70\x61\x6e'))
.find(el=>el.textContent.trim()==='\ub4f1\ub85d\ud558\uae30'&&el.offsetHeight>0);
if(btn){
const finalTarget=btn.closest('\x62\x75\x74\x74\x6f\x6e')||btn.closest('\x2e\x71-\x62\x74\x6e')||btn;
finalTarget.scrollIntoView({block:'\x63\x65\x6e\x74\x65\x72'});
finalTarget.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x38\x70\x78 \x73\x6f\x6c\x69\x64 \x62\x6c\x75\x65','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await _0x1001(300);
const rect=finalTarget.getBoundingClientRect();
const x=rect.left+rect.width/2;
const y=rect.top+rect.height/2;
const topElement=document.elementFromPoint(x,y)||finalTarget;
const opts={clientX:x,clientY:y,bubbles:true,cancelable:true,view:window};
topElement.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
await _0x1001(100);
topElement.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
topElement.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',opts));
console.log("[\ub9e4\ud06c\ub85c] '\ub4f1\ub85d\ud558\uae30' \ud074\ub9ad \uc644\ub8cc!");
return true;
}
await _0x1001(250);
}
console.error("[\ub9e4\ud06c\ub85c] '\ub4f1\ub85d\ud558\uae30' \ubc84\ud2bc\uc744 \ucc3e\uc9c0 \ubabb\ud568");
return false;
}
function _0x1022(){
const errorNotifs=Array.from(document.querySelectorAll('\x2e\x71-\x6e\x6f\x74\x69\x66\x69\x63\x61\x74\x69\x6f\x6e, \x2e\x71-\x62\x61\x6e\x6e\x65\x72, \x2e\x62\x67-\x6e\x65\x67\x61\x74\x69\x76\x65, \x2e\x62\x67-\x72\x65\x64, [\x63\x6c\x61\x73\x73*="\x6e\x65\x67\x61\x74\x69\x76\x65"], [\x63\x6c\x61\x73\x73*="\x65\x72\x72\x6f\x72"], [\x63\x6c\x61\x73\x73*="\x61\x6c\x65\x72\x74"]'))
.filter(el=>el.offsetHeight>0);
for(const notif of errorNotifs){
const txt=(notif.innerText||notif.textContent||'').trim();
if(txt.includes('\x31\uc77c \ucd5c\ub300')||txt.includes('\ucd08\uacfc')||txt.includes('\uc2e4\ud328')||txt.includes('\uc624\ub958')||txt.includes('\ubd88\uac00')||txt.includes('\uc81c\ud55c')||txt.includes('\uae08\uc9c0')){
return txt;
}
}
const bodyTxt=document.body?(document.body.innerText||''):'';
const match=bodyTxt.match(/1일\s*최대\s*\d+개까지\s*등록\s*가능합니다/);
if(match)return match[0];
return null;
}
async function _0x1023(logTag='\uc218\uc815'){
let succeeded=false;
let detectedError=null;
for(let w=0;w<25;w++){
if(shouldStopRegistration)return false;
detectedError=_0x1022();
if(detectedError){
console.error(`[${logTag}] \u274c \uc11c\ubc84 \uc81c\ucd9c \uac70\ubd80 \uac10\uc9c0: [${detectedError}]`);
break;
}
const confirmBtn=_0x1024();
if(confirmBtn){
console.log(`[${logTag}] '\ud655\uc778' \ubc84\ud2bc \uac10\uc9c0 -> \uc815\ubc00 \ud074\ub9ad \uc2e4\ud589`);
await _0x1025(confirmBtn);
succeeded=true;
await _0x1001(300);
break;
}
if(!isEditPage()){
succeeded=true;
break;
}
await _0x1001(150);
}
if(detectedError||!succeeded){
console.warn(`[${logTag}] \u26a0\ufe0f \uc218\uc815 \uc644\ub8cc \ubbf8\ud655\uc778 (\uc0ac\uc720: ${detectedError||'\uc751\ub2f5 \uc9c0\uc5f0 \ub610\ub294 \ud654\uba74 \ubbf8\uc804\ud658'})`);
return false;
}
return true;
}
function _0x1024(){
const notifs=Array.from(document.querySelectorAll('\x2e\x71-\x6e\x6f\x74\x69\x66\x69\x63\x61\x74\x69\x6f\x6e, \x2e\x71-\x6e\x6f\x74\x69\x66\x69\x63\x61\x74\x69\x6f\x6e\x73, \x2e\x71-\x62\x61\x6e\x6e\x65\x72, \x2e\x71-\x73\x6e\x61\x63\x6b\x62\x61\x72, [\x63\x6c\x61\x73\x73*="\x6e\x6f\x74\x69\x66\x69\x63\x61\x74\x69\x6f\x6e"], [\x63\x6c\x61\x73\x73*="\x6e\x6f\x74\x69\x66\x79"]'))
.filter(el=>el.offsetHeight>0);
for(const notif of notifs){
const realBtns=Array.from(notif.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]'))
.filter(b=>b.offsetHeight>0);
for(const b of realBtns){
const txt=(b.innerText||b.textContent||'').trim().replace(/\s+/g,'');
if(txt==='\ud655\uc778'||txt==='\ub2eb\uae30'||txt==='\uc644\ub8cc'){
if(!/수정|등록/.test(txt))return b;
}
}
const texts=Array.from(notif.querySelectorAll('\x73\x70\x61\x6e, \x64\x69\x76, \x62, \x73\x74\x72\x6f\x6e\x67, \x61'))
.filter(el=>el.offsetHeight>0);
for(const t of texts){
const txt=(t.innerText||t.textContent||'').trim().replace(/\s+/g,'');
if(txt==='\ud655\uc778'||txt==='\ub2eb\uae30'||txt==='\uc644\ub8cc'){
const targetBtn=t.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||t.querySelector('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||t;
const targetTxt=(targetBtn.innerText||targetBtn.textContent||'').trim().replace(/\s+/g,'');
if(!/수정|등록/.test(targetTxt))return targetBtn;
}
}
}
const dialogs=Array.from(document.querySelectorAll('\x2e\x71-\x64\x69\x61\x6c\x6f\x67\x3a\x6e\x6f\x74(\x2e\x68\x69\x64\x64\x65\x6e), [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"]'))
.filter(d=>d.offsetHeight>0&&d.style.display!=='\x6e\x6f\x6e\x65');
for(const dlg of dialogs){
const realBtns=Array.from(dlg.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]'))
.filter(b=>b.offsetHeight>0);
for(const b of realBtns){
const txt=(b.innerText||b.textContent||'').trim().replace(/\s+/g,'');
if(txt==='\ud655\uc778'||txt==='\ub124'||txt==='\uc608'||txt==='\uc644\ub8cc'){
if(!/수정|등록/.test(txt))return b;
}
}
const texts=Array.from(dlg.querySelectorAll('\x73\x70\x61\x6e, \x64\x69\x76, \x62, \x73\x74\x72\x6f\x6e\x67'))
.filter(el=>el.offsetHeight>0);
for(const t of texts){
const txt=(t.innerText||t.textContent||'').trim().replace(/\s+/g,'');
if(txt==='\ud655\uc778'||txt==='\ub124'||txt==='\uc608'||txt==='\uc644\ub8cc'){
const targetBtn=t.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||t.querySelector('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||t;
const targetTxt=(targetBtn.innerText||targetBtn.textContent||'').trim().replace(/\s+/g,'');
if(!/수정|등록/.test(targetTxt))return targetBtn;
}
}
}
const banners=Array.from(document.querySelectorAll('\x64\x69\x76, \x73\x65\x63\x74\x69\x6f\x6e, \x66\x6f\x6f\x74\x65\x72, [\x63\x6c\x61\x73\x73*="\x62\x61\x6e\x6e\x65\x72"], [\x63\x6c\x61\x73\x73*="\x61\x6c\x65\x72\x74"]'))
.filter(el=>{
if(el.offsetHeight<=0)return false;
const txt=(el.innerText||el.textContent||'').trim();
return txt.includes('\uc218\uc815\ub418\uc5c8\uc2b5\ub2c8\ub2e4')||txt.includes('\ub4f1\ub85d\ub418\uc5c8\uc2b5\ub2c8\ub2e4')||txt.includes('\uc218\uc815\uc644\ub8cc');
});
for(const bn of banners){
const realBtns=Array.from(bn.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]'))
.filter(b=>b.offsetHeight>0);
for(const b of realBtns){
const txt=(b.innerText||b.textContent||'').trim().replace(/\s+/g,'');
if(txt==='\ud655\uc778'||txt==='\ub2eb\uae30'||txt==='\uc644\ub8cc'){
if(!/수정|등록/.test(txt))return b;
}
}
const texts=Array.from(bn.querySelectorAll('\x73\x70\x61\x6e, \x64\x69\x76, \x62, \x73\x74\x72\x6f\x6e\x67'))
.filter(el=>el.offsetHeight>0);
for(const t of texts){
const txt=(t.innerText||t.textContent||'').trim().replace(/\s+/g,'');
if(txt==='\ud655\uc778'||txt==='\ub2eb\uae30'||txt==='\uc644\ub8cc'){
const targetBtn=t.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||t.querySelector('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||t;
const targetTxt=(targetBtn.innerText||targetBtn.textContent||'').trim().replace(/\s+/g,'');
if(!/수정|등록/.test(targetTxt))return targetBtn;
}
}
}
return null;
}
async function _0x1025(targetEl){
if(!targetEl)return false;
const realBtn=(targetEl.tagName==='\x42\x55\x54\x54\x4f\x4e'||targetEl.classList.contains('\x71-\x62\x74\x6e')||targetEl.getAttribute('\x72\x6f\x6c\x65')==='\x62\x75\x74\x74\x6f\x6e')
?targetEl
:(targetEl.querySelector('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||targetEl.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||targetEl);
realBtn.scrollIntoView({block:'\x63\x65\x6e\x74\x65\x72',behavior:'\x69\x6e\x73\x74\x61\x6e\x74'});
realBtn.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x35\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x66\x66\x39\x38\x30\x30','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
realBtn.style.setProperty('\x62\x6f\x78-\x73\x68\x61\x64\x6f\x77','\x30 \x30 \x31\x36\x70\x78 \x23\x66\x66\x39\x38\x30\x30','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
const rect=realBtn.getBoundingClientRect();
const x=rect.left+rect.width/2;
const y=rect.top+rect.height/2;
const opts={clientX:x,clientY:y,bubbles:true,cancelable:true,view:window};
const topElement=document.elementFromPoint(x,y)||realBtn;
try{realBtn.focus();}catch(e){}
try{
topElement.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x64\x6f\x77\x6e',opts));
topElement.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
}catch(e){}
await _0x1001(60);
try{
topElement.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x75\x70',opts));
topElement.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
topElement.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',opts));
}catch(e){}
try{
if(topElement!==realBtn&&typeof topElement.click==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
topElement.click();
}
}catch(e){}
try{
if(typeof realBtn.click==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
realBtn.click();
}
}catch(e){}
console.log(`[\ub9e4\ud06c\ub85c] \ud31d\uc5c5/\ud558\ub2e8 \uc54c\ub9bc '\ud655\uc778' \ubc84\ud2bc \uc815\ubc00 \ud074\ub9ad \uc644\ub8cc (${realBtn.tagName}, class=${realBtn.className})`);
return true;
}
async function _0x1026(maxWaitAttempts=25){
console.log("[\ub9e4\ud06c\ub85c] \ud31d\uc5c5\x2f\ud558\ub2e8 \uc54c\ub9bc '\ud655\uc778' \ubc84\ud2bc \ub300\uae30 \ubc0f \ud074\ub9ad \uc2dc\ub3c4\x2e\x2e\x2e");
for(let attempt=0;attempt<maxWaitAttempts;attempt++){
if(shouldStopRegistration)return false;
const confirmBtn=_0x1024();
if(confirmBtn){
console.log(`[\ub9e4\ud06c\ub85c] '\ud655\uc778' \ubc84\ud2bc \uac10\uc9c0 (\uc2dc\ub3c4 ${attempt+1}/${maxWaitAttempts}) -> \uc815\ubc00 \ud074\ub9ad \uc2e4\ud589`);
await _0x1025(confirmBtn);
await _0x1001(300);
return true;
}
await _0x1001(200);
}
console.warn("[\ub9e4\ud06c\ub85c] \ud31d\uc5c5\x2f\ud558\ub2e8 \uc54c\ub9bc '\ud655\uc778' \ubc84\ud2bc \ubbf8\ubc1c\uc0dd (\uc790\ub3d9 \ub2eb\ud798 \ub610\ub294 \ud31d\uc5c5 \uc5c6\uc74c)");
return false;
}
let _activeMacroRunId=0;
let _isAutoResuming=false;
async function _0x1027(items,customMemo,mode='\x6a\x6f\x69\x6e',delayPreset='\x73\x61\x66\x65',stepPreset='\x68\x75\x6d\x61\x6e',resumeState=null){
if(!items||items.length===0)return;
const myRunId=++_activeMacroRunId;
isRegistrationRunning=true;
shouldStopRegistration=false;
const totalOverallCount=(resumeState&&resumeState.totalOverallCount)?resumeState.totalOverallCount:items.length;
const globalIndexOffset=(resumeState&&typeof resumeState.globalIndexOffset==='\x6e\x75\x6d\x62\x65\x72')?resumeState.globalIndexOffset:0;
try{
if(!resumeState){
await new Promise(r=>chrome.storage.local.set({completedItems:[],isRegistrationRunning:true},r));
}else{
await new Promise(r=>chrome.storage.local.set({isRegistrationRunning:true},r));
}
}catch(e){}
const isTransferMode=(mode==='\x74\x72\x61\x6e\x73\x66\x65\x72')||(Array.isArray(items)&&items.some(it=>it.roomType==='\uc591\ub3c4'));
const effectiveMode=isTransferMode?'\x74\x72\x61\x6e\x73\x66\x65\x72':'\x6a\x6f\x69\x6e';
const modeLabel=effectiveMode==='\x74\x72\x61\x6e\x73\x66\x65\x72'?'\uc591\ub3c4\ub4f1\ub85d':'\uc870\uc778\ub4f1\ub85d';
saveActiveBatchState({
macroType:'\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e',
remainingItems:items,
totalOverallCount:totalOverallCount,
globalIndexOffset:globalIndexOffset,
customMemo:customMemo,
mode:effectiveMode,
delayPreset:delayPreset,
stepPreset:stepPreset,
needsHistoryBack:true,
interruptedItemLabel:items[0]?`${items[0].golf} (${items[0].date} ${items[0].time})`:''
});
if(resumeState){
console.log(`\ud83d\udd04 [\uace8\ud504\ubaac ${modeLabel} \ub9e4\ud06c\ub85c \uc790\ub3d9 \uc7ac\uac1c] \uc911\ub2e8\ub410\ub358 [${globalIndexOffset+1}/${totalOverallCount}]\ubc88\uc9f8 \ud0c0\uc784\ubd80\ud130 \uc774\uc5b4\uc11c \uc9c4\ud589\ud569\ub2c8\ub2e4! (\ub0a8\uc740 \ud0c0\uc784: ${items.length}\uac74)`);
}else{
console.log(`\ud83d\ude80 [\uace8\ud504\ubaac ${modeLabel} \ub9e4\ud06c\ub85c \uc2dc\uc791] \ucd1d ${totalOverallCount}\uac74 (\ub2e8\uacc4\ubcc4 \uc18d\ub3c4: ${stepPreset}, \ud0c0\uc784 \uac04 \ub300\uae30: ${delayPreset})`);
chrome.runtime.sendMessage({type:'\x52\x45\x47\x49\x53\x54\x45\x52\x5f\x53\x54\x41\x52\x54\x45\x44',total:totalOverallCount});
}
for(let i=0;i<items.length;i++){
const currentGlobalIdx=globalIndexOffset+i+1;
if(shouldStopRegistration||_activeMacroRunId!==myRunId){
if(_activeMacroRunId===myRunId){
console.log("\ud83d\uded1 \uc0ac\uc6a9\uc790\uc5d0 \uc758\ud574 \ub9e4\ud06c\ub85c\uac00 \uc911\ub2e8\ub418\uc5c8\uc2b5\ub2c8\ub2e4\x2e");
clearActiveBatchState();
chrome.runtime.sendMessage({type:'\x52\x45\x47\x49\x53\x54\x45\x52\x5f\x53\x54\x4f\x50\x50\x45\x44',current:currentGlobalIdx-1,total:totalOverallCount});
}
break;
}
const item=items[i];
saveActiveBatchState({
macroType:'\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e',
remainingItems:items.slice(i),
totalOverallCount:totalOverallCount,
globalIndexOffset:currentGlobalIdx-1,
customMemo:customMemo,
mode:effectiveMode,
delayPreset:delayPreset,
stepPreset:stepPreset,
needsHistoryBack:true,
interruptedItemLabel:`${item.golf} (${item.date} ${item.time})`
});
console.log(`\n================== [${currentGlobalIdx}/${totalOverallCount}] ${item.golf} (${item.date} ${item.time}) [${modeLabel}] \ub4f1\ub85d \uc2dc\uc791 ==================`);
chrome.runtime.sendMessage({
type:'\x52\x45\x47\x49\x53\x54\x45\x52\x5f\x50\x52\x4f\x47\x52\x45\x53\x53',
current:currentGlobalIdx,
total:totalOverallCount,
golf:item.golf,
rawGolf:item.rawGolf,
date:item.date,
time:item.time,
fee:item.fee,
regId:item.regId
});
try{
if(shouldStopRegistration)break;
await _0x1001(_0x1002('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
if(shouldStopRegistration)break;
if(!_0x102c()&&!_0x1009()&&!document.querySelector('\x2e\x71-\x64\x69\x61\x6c\x6f\x67\x3a\x6e\x6f\x74(\x2e\x68\x69\x64\x64\x65\x6e), [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"]')){
console.log(`[\ub9e4\ud06c\ub85c] [${i+1}/${items.length}] '\ub4f1\ub85d \uc0c1\ud488 \ub0b4\uc5ed' \ud654\uba74\uc73c\ub85c \uc774\ub3d9\ud558\uc5ec \ud558\ub2e8 [\ub4f1\ub85d] \ubc84\ud2bc\uc73c\ub85c \uc2dc\uc791\ud569\ub2c8\ub2e4...`);
await _0x102e();
await _0x1001(_0x1002('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
}
await _0x100e();
if(shouldStopRegistration)break;
await _0x1001(_0x1002('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
if(shouldStopRegistration)break;
const isItemTransfer=(effectiveMode==='\x74\x72\x61\x6e\x73\x66\x65\x72')||(item.roomType==='\uc591\ub3c4');
if(isItemTransfer){
await _0x1010();
}else{
await _0x100f();
}
if(shouldStopRegistration)break;
await _0x1001(_0x1002('\x71\x75\x69\x63\x6b\x5f\x63\x6c\x69\x63\x6b',stepPreset));
if(shouldStopRegistration)break;
await _0x1011(item.region);
if(shouldStopRegistration)break;
await _0x1001(_0x1002('\x71\x75\x69\x63\x6b\x5f\x63\x6c\x69\x63\x6b',stepPreset));
if(shouldStopRegistration)break;
await _0x1012();
if(shouldStopRegistration)break;
await _0x1001(_0x1002('\x62\x72\x6f\x77\x73\x65\x5f\x64\x72\x6f\x70\x64\x6f\x77\x6e',stepPreset));
if(shouldStopRegistration)break;
await _0x1015(item.golf);
if(shouldStopRegistration)break;
await _0x1001(_0x1002('\x62\x72\x6f\x77\x73\x65\x5f\x64\x72\x6f\x70\x64\x6f\x77\x6e',stepPreset));
if(shouldStopRegistration)break;
await _0x1016(item.date);
if(shouldStopRegistration)break;
await _0x1001(_0x1002('\x63\x61\x6c\x65\x6e\x64\x61\x72',stepPreset));
if(shouldStopRegistration)break;
await _0x1017(item.time);
if(shouldStopRegistration)break;
await _0x1001(_0x1002('\x74\x79\x70\x69\x6e\x67',stepPreset));
if(shouldStopRegistration)break;
await _0x1018(item.fee,item.isPrepaid);
if(shouldStopRegistration)break;
await _0x1001(_0x1002('\x74\x79\x70\x69\x6e\x67',stepPreset));
if(shouldStopRegistration)break;
if(item.isMeal){
const mealClicked=await _0x1019(true);
if(shouldStopRegistration)break;
if(mealClicked){
await _0x1001(_0x1002('\x71\x75\x69\x63\x6b\x5f\x63\x6c\x69\x63\x6b',stepPreset));
if(shouldStopRegistration)break;
}
}
const cadyClicked=await _0x101d(item.cady);
if(shouldStopRegistration)break;
if(cadyClicked){
await _0x1001(_0x1002('\x71\x75\x69\x63\x6b\x5f\x63\x6c\x69\x63\x6b',stepPreset));
if(shouldStopRegistration)break;
}
if(!isItemTransfer){
const conditionClicked=await _0x101e(item.condition||'\ubb34\uad00');
if(shouldStopRegistration)break;
if(conditionClicked){
await _0x1001(_0x1002('\x71\x75\x69\x63\x6b\x5f\x63\x6c\x69\x63\x6b',stepPreset));
if(shouldStopRegistration)break;
}
const peopleClicked=await _0x101f(item.sizenum||'\x34\uc778',2);
if(shouldStopRegistration)break;
if(peopleClicked){
await _0x1001(_0x1002('\x71\x75\x69\x63\x6b\x5f\x63\x6c\x69\x63\x6b',stepPreset));
if(shouldStopRegistration)break;
}
}
await _0x1020(item.memo||customMemo);
if(shouldStopRegistration)break;
await _0x1001(_0x1002('\x74\x79\x70\x69\x6e\x67',stepPreset));
if(shouldStopRegistration)break;
await _0x1001(_0x1002('\x62\x65\x66\x6f\x72\x65\x5f\x73\x75\x62\x6d\x69\x74',stepPreset));
if(shouldStopRegistration)break;
await _0x1021();
if(shouldStopRegistration)break;
await _0x1001(_0x1002('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
if(shouldStopRegistration)break;
await _0x1026();
console.log(`\u2705 [${currentGlobalIdx}/${totalOverallCount}] ${item.golf} [${modeLabel}] \ub4f1\ub85d \uc644\ub8cc!`);
try{
const res=await new Promise(r=>chrome.storage.local.get(['\x63\x6f\x6d\x70\x6c\x65\x74\x65\x64\x49\x74\x65\x6d\x73'],r));
const list=(res&&Array.isArray(res.completedItems))?res.completedItems:[];
list.push({regId:item.regId,date:item.date,golf:item.golf,time:item.time});
await new Promise(r=>chrome.storage.local.set({completedItems:list},r));
}catch(e){}
chrome.runtime.sendMessage({
type:'\x49\x54\x45\x4d\x5f\x52\x45\x47\x49\x53\x54\x45\x52\x5f\x53\x55\x43\x43\x45\x53\x53',
regId:item.regId,
item:item,
current:currentGlobalIdx,
total:totalOverallCount
});
if(i<items.length-1){
saveActiveBatchState({
macroType:'\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e',
remainingItems:items.slice(i+1),
totalOverallCount:totalOverallCount,
globalIndexOffset:currentGlobalIdx,
customMemo:customMemo,
mode:effectiveMode,
delayPreset:delayPreset,
stepPreset:stepPreset,
needsHistoryBack:true,
interruptedItemLabel:items[i+1]?`${items[i+1].golf} (${items[i+1].date} ${items[i+1].time})`:''
});
}else{
clearActiveBatchState();
}
if(shouldStopRegistration||_activeMacroRunId!==myRunId)break;
if(i<items.length-1){
const cooldownMs=_0x1004(delayPreset||'\x73\x61\x66\x65');
const cooldownSec=(cooldownMs/1000).toFixed(1);
console.log(`\u23f3 \uc0ac\ub78c\ucc98\ub7fc \ubcf4\uc774\uae30 \uc704\ud574 \ubd88\uaddc\uce59\ud558\uac8c ${cooldownSec}\ucd08 \ub300\uae30 \ud6c4 \ub2e4\uc74c \uac74 \uc9c4\ud589...`);
chrome.runtime.sendMessage({
type:'\x52\x45\x47\x49\x53\x54\x45\x52\x5f\x57\x41\x49\x54\x49\x4e\x47',
current:currentGlobalIdx,
total:totalOverallCount,
waitSec:cooldownSec,
nextGolf:items[i+1]?.golf||''
});
await _0x1001(cooldownMs);
if(shouldStopRegistration||_activeMacroRunId!==myRunId)break;
}else{
await _0x1001(1000);
}
}catch(err){
console.error(`\u274c [${currentGlobalIdx}/${totalOverallCount}] ${item.golf} \ub4f1\ub85d \uc911 \uc624\ub958:`,err);
if(_isPageUnloading||shouldStopRegistration||_activeMacroRunId!==myRunId)break;
if(i<items.length-1){
console.log("\u26a0\ufe0f \uc624\ub958 \ubc1c\uc0dd \ud6c4 \x33\ucd08 \ub300\uae30 \ud6c4 \ub2e4\uc74c \uac74 \uc9c4\ud589 \uc2dc\ub3c4\x2e\x2e\x2e");
await _0x1001(3000);
}
}
}
if(_activeMacroRunId!==myRunId)return;
isRegistrationRunning=false;
if(_isPageUnloading)return;
clearActiveBatchState();
try{
chrome.storage.local.set({isRegistrationRunning:false});
}catch(e){}
if(shouldStopRegistration){
console.log(`\ud83d\uded1 [\uace8\ud504\ubaac ${modeLabel} \ub9e4\ud06c\ub85c \uc911\ub2e8\ub428]`);
chrome.runtime.sendMessage({type:'\x52\x45\x47\x49\x53\x54\x45\x52\x5f\x53\x54\x4f\x50\x50\x45\x44',total:totalOverallCount});
}else{
chrome.runtime.sendMessage({type:'\x52\x45\x47\x49\x53\x54\x45\x52\x5f\x43\x4f\x4d\x50\x4c\x45\x54\x45\x44',total:totalOverallCount});
console.log(`\ud83c\udf89 [\uace8\ud504\ubaac ${modeLabel} \ub9e4\ud06c\ub85c \uc885\ub8cc]`);
}
}
async function _0x1028(maxAttempts=15){
console.log("[\ubcf5\uadc0] \ud31d\uc5c5\x2f\ud50c\ub85c\ud305 \ubaa8\ub2ec\uc5d0\uc11c '\ub0b4\uae00 \ubcf4\uae30' \x2f '\ub0b4\uac00 \ub4f1\ub85d\ud55c \uc0c1\ud488 \ub0b4\uc5ed' \ud0d0\uc0c9 \ubc0f \ud074\ub9ad \uc2dc\ub3c4\x2e\x2e\x2e");
for(let attempt=0;attempt<maxAttempts;attempt++){
if(shouldStopRegistration)return false;
const candidates=Array.from(document.querySelectorAll('\x2e\x71-\x64\x69\x61\x6c\x6f\x67, [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"], \x2e\x71-\x62\x6f\x74\x74\x6f\x6d-\x73\x68\x65\x65\x74, \x2e\x71-\x6d\x65\x6e\x75, \x2e\x71-\x6c\x69\x73\x74, \x2e\x71-\x69\x74\x65\x6d, \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x64\x69\x76, \x73\x70\x61\x6e, \x61'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const raw=(el.innerText||el.textContent||'').trim();
const clean=raw.replace(/[\s·•/]/g,'');
if(clean.includes('\ub4f1\ub85d')&&clean.includes('\ub0b4\uae00\ubcf4\uae30'))return false;
return clean==='\ub0b4\uae00\ubcf4\uae30'||
clean==='\ub0b4\uac00\ub4f1\ub85d\ud55c\uc0c1\ud488\ub0b4\uc5ed'||
clean==='\ub4f1\ub85d\ud55c\uc0c1\ud488\ub0b4\uc5ed'||
clean==='\ub4f1\ub85d\uc0c1\ud488\ub0b4\uc5ed'||
clean==='\ub0b4\uae00\uad00\ub9ac'||
(clean.startsWith('\ub0b4\uae00\ubcf4\uae30')&&clean.length<=8)||
(clean.includes('\ub0b4\uae00\ubcf4\uae30')&&!clean.includes('\ub4f1\ub85d'));
});
if(candidates.length>0){
candidates.sort((a,b)=>{
const childDiff=a.querySelectorAll('*').length-b.querySelectorAll('*').length;
if(childDiff!==0)return childDiff;
return(a.offsetWidth*a.offsetHeight)-(b.offsetWidth*b.offsetHeight);
});
const leaf=candidates[0];
const target=leaf.closest('\x2e\x71-\x69\x74\x65\x6d, \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72')||leaf;
console.log(`[\ubcf5\uadc0] \ud558\ub2e8 \ud50c\ub85c\ud305 '\ub0b4\uae00 \ubcf4\uae30' \ubc84\ud2bc \ubc1c\uacac (${target.tagName}, class=${target.className}) -> \ud074\ub9ad \uc2e4\ud589`);
target.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x30\x30\x65\x36\x37\x36','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await _0x1001(80);
const rect=target.getBoundingClientRect();
const cx=rect.left+rect.width/2;
const cy=rect.top+rect.height/2;
const opts={clientX:cx,clientY:cy,bubbles:true,cancelable:true,view:window};
const topEl=document.elementFromPoint(cx,cy)||target;
try{
topEl.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x64\x6f\x77\x6e',opts));
topEl.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
}catch(e){}
await _0x1001(60);
try{
topEl.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x75\x70',opts));
topEl.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
topEl.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',opts));
}catch(e){}
try{target.click();}catch(e){}
try{topEl.click();}catch(e){}
await _0x1005(target);
console.log("[\ubcf5\uadc0] '\ub0b4\uae00 \ubcf4\uae30' \ud074\ub9ad \uc644\ub8cc!");
return true;
}
await _0x1001(200);
}
console.warn("[\ubcf5\uadc0] '\ub0b4\uae00 \ubcf4\uae30' \ud56d\ubaa9\uc744 \ucc3e\uc9c0 \ubabb\ud568");
return false;
}
function _0x1029(){
const candidates=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72, \x2e\x71-\x69\x74\x65\x6d, \x64\x69\x76, \x73\x70\x61\x6e, \x61'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
if(el.closest('\x2e\x71-\x68\x65\x61\x64\x65\x72, \x68\x65\x61\x64\x65\x72, \x2e\x71-\x74\x6f\x6f\x6c\x62\x61\x72'))return false;
const txt=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
return txt==='\ub0b4\uac00\ub4f1\ub85d\ud55c\uc0c1\ud488\ub0b4\uc5ed'||
txt.includes('\ub0b4\uac00\ub4f1\ub85d\ud55c\uc0c1\ud488\ub0b4\uc5ed')||
txt.includes('\ub4f1\ub85d\ud55c\uc0c1\ud488\ub0b4\uc5ed')||
txt.includes('\ub4f1\ub85d\uc0c1\ud488\ub0b4\uc5ed')||
(txt.includes('\ub0b4\uac00\ub4f1\ub85d\ud55c')&&txt.includes('\uc0c1\ud488\ub0b4\uc5ed'))||
(txt.includes('\ub4f1\ub85d\ud55c')&&txt.includes('\uc0c1\ud488\ub0b4\uc5ed'));
});
if(candidates.length===0)return null;
candidates.sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length);
const leaf=candidates[0];
return leaf.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72, \x2e\x71-\x69\x74\x65\x6d, \x64\x69\x76')||leaf;
}
let _isCheckingPageType=false;
function _0x102a(){
if(_isCheckingPageType)return false;
if(isEditPage()||isDetailPage())return false;
const curUrl=window.location.href;
if(curUrl.includes('\x2f\x6d\x79\x70\x61\x67\x65')||curUrl.includes('\x2f\x6d\x79-\x70\x61\x67\x65')||curUrl.includes('\x2f\x75\x73\x65\x72\x2f'))return true;
const bodyTxt=document.body?(document.body.innerText||'').replace(/\s+/g,''):'';
if(bodyTxt.includes('\ucc1c\ud55c\ub9e4\ub2c8\uc800')||bodyTxt.includes('\uace8\ud504\ubaac\uc5d0\uc694\uccad')||bodyTxt.includes('\ud68c\uc6d0\uc815\ubcf4\uc218\uc815')||bodyTxt.includes('\ub85c\uadf8\uc544\uc6c3')){
const headerEl=document.querySelector('\x2e\x71-\x68\x65\x61\x64\x65\x72, \x68\x65\x61\x64\x65\x72, \x2e\x71-\x74\x6f\x6f\x6c\x62\x61\x72');
const hTxt=(headerEl?headerEl.textContent:'').replace(/\s+/g,'');
if(hTxt.includes('\ub4f1\ub85d\uc0c1\ud488\ub0b4\uc5ed')||hTxt.includes('\ub4f1\ub85d\ud55c\uc0c1\ud488\ub0b4\uc5ed')||hTxt.includes('\ub0b4\uac00\ub4f1\ub85d\ud55c\uc0c1\ud488\ub0b4\uc5ed')){
return false;
}
return true;
}
const myPostsBtn=_0x1029();
if(myPostsBtn&&myPostsBtn.offsetHeight>0){
const catBtn=_0x103e();
const hasTabs=Boolean(document.querySelector('\x2e\x71-\x74\x61\x62\x73, [\x72\x6f\x6c\x65="\x74\x61\x62\x6c\x69\x73\x74"]'));
if(!catBtn&&!hasTabs){
return true;
}
}
return false;
}
function _0x102b(){
if(isEditPage()||isDetailPage())return false;
const headerEl=document.querySelector('\x2e\x71-\x68\x65\x61\x64\x65\x72, \x68\x65\x61\x64\x65\x72, \x2e\x71-\x74\x6f\x6f\x6c\x62\x61\x72');
const hTxt=(headerEl?headerEl.textContent:'').replace(/\s+/g,'');
if(hTxt.includes('\ub4f1\ub85d\uc0c1\ud488\ub0b4\uc5ed')||hTxt.includes('\ub4f1\ub85d\ud55c\uc0c1\ud488\ub0b4\uc5ed')||hTxt.includes('\ub0b4\uac00\ub4f1\ub85d\ud55c\uc0c1\ud488\ub0b4\uc5ed')){
return false;
}
const bodyTxt=document.body?(document.body.innerText||'').replace(/\s+/g,''):'';
if(bodyTxt.includes('\ub4f1\ub85d\ud55c\uc591\ub3c4\uc218')||bodyTxt.includes('\ub4f1\ub85d\ud55c\uc870\uc778\uc218')||bodyTxt.includes('\ucd1d\ub4f1\ub85d\uac74\uc218')){
return true;
}
const regBtn=_0x1008();
if(regBtn&&regBtn.offsetHeight>0)return true;
return false;
}
function _0x102c(){
if(_isCheckingPageType)return false;
_isCheckingPageType=true;
try{
if(isEditPage()||isDetailPage())return false;
const curUrl=window.location.href.toLowerCase();
if((curUrl.includes('\x2f\x70\x72\x6f\x64\x75\x63\x74\x2f\x6c\x69\x73\x74')||curUrl.includes('\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x2f\x6d\x79-\x6c\x69\x73\x74')||curUrl.includes('\x2f\x6d\x79-\x6c\x69\x73\x74'))&&!isEditPage()&&!isDetailPage()){
return true;
}
const headerEl=document.querySelector('\x2e\x71-\x68\x65\x61\x64\x65\x72, \x68\x65\x61\x64\x65\x72, \x2e\x71-\x74\x6f\x6f\x6c\x62\x61\x72');
const hTxt=(headerEl?headerEl.textContent:'').replace(/\s+/g,'');
if(hTxt.includes('\ub4f1\ub85d\uc0c1\ud488\ub0b4\uc5ed')||hTxt.includes('\ub4f1\ub85d\ud55c\uc0c1\ud488\ub0b4\uc5ed')||hTxt.includes('\ub0b4\uac00\ub4f1\ub85d\ud55c\uc0c1\ud488\ub0b4\uc5ed')){
return true;
}
const bodyTxt=document.body?(document.body.innerText||'').replace(/\s+/g,''):'';
const isMyPageExclusive=bodyTxt.includes('\ucc1c\ud55c\ub9e4\ub2c8\uc800')||bodyTxt.includes('\uace8\ud504\ubaac\uc5d0\uc694\uccad')||bodyTxt.includes('\ud68c\uc6d0\uc815\ubcf4\uc218\uc815');
if(isMyPageExclusive)return false;
const hasListTitle=bodyTxt.includes('\ub4f1\ub85d\uc0c1\ud488\ub0b4\uc5ed')||bodyTxt.includes('\ub4f1\ub85d\ud55c\uc0c1\ud488\ub0b4\uc5ed')||bodyTxt.includes('\ub0b4\uac00\ub4f1\ub85d\ud55c\uc0c1\ud488\ub0b4\uc5ed');
if(hasListTitle){
return true;
}
if(bodyTxt.includes('\ub4f1\ub85d\ud55c\uc591\ub3c4\uc218')||bodyTxt.includes('\ub4f1\ub85d\ud55c\uc870\uc778\uc218')||bodyTxt.includes('\ucd1d\ub4f1\ub85d\uac74\uc218')){
return false;
}
const regBtn=_0x1008();
if(regBtn&&regBtn.offsetHeight>0)return false;
const catBtn=_0x103e();
const hasTabs=Boolean(document.querySelector('\x2e\x71-\x74\x61\x62\x73, [\x72\x6f\x6c\x65="\x74\x61\x62\x6c\x69\x73\x74"]'));
if(catBtn&&hasTabs){
return true;
}
return false;
}finally{
_isCheckingPageType=false;
}
}
function _0x102d(){
return _0x102c();
}
async function _0x102e(filterType=''){
console.log(`[\ubcf5\uadc0] '\ub0b4\uac00 \ub4f1\ub85d\ud55c \uc0c1\ud488 \ub0b4\uc5ed' \ubaa9\ub85d \ud654\uba74 \ubcf5\uadc0 \uc2dc\ub3c4... (\ud544\ud130: ${filterType||'\uc720\uc9c0'})`);
if(_0x102c()){
console.log("[\ubcf5\uadc0] \uc774\ubbf8 '\ub0b4\uac00 \ub4f1\ub85d\ud55c \uc0c1\ud488 \ub0b4\uc5ed' \ubaa9\ub85d \ud654\uba74\uc5d0 \uc704\uce58\ud574 \uc788\uc2b5\ub2c8\ub2e4\x2e (\uc989\uc2dc \uc9c4\ud589)");
if(filterType&&(filterType==='\uc591\ub3c4'||filterType==='\uc870\uc778'||filterType==='\uc804\uccb4')){
await _0x103f(filterType);
}
return true;
}
const regBtn=_0x1008();
if(regBtn||_0x102b()){
console.log("[\ubcf5\uadc0] \ubd80\ud0b9\ud504\ub77c\uc790(\x53\x63\x72\x65\x65\x6e \x41) \ud654\uba74 \uac10\uc9c0 -> '\ub4f1\ub85d \u00b7 \ub0b4\uae00\ubcf4\uae30' \ud074\ub9ad \ud6c4 \ud558\ub2e8 \ud50c\ub85c\ud305 '\ub0b4\uae00 \ubcf4\uae30' \uc5f0\ub3d9 \uc2dc\uc791!");
for(let attempt=0;attempt<3;attempt++){
if(shouldStopRegistration)return false;
const liveRegBtn=_0x1008();
if(liveRegBtn){
console.log(`[\ubcf5\uadc0] (${attempt+1}/3) '\ub4f1\ub85d \u00b7 \ub0b4\uae00\ubcf4\uae30' \ubc84\ud2bc \ud074\ub9ad \uc2e4\ud589...`);
await _0x100a(liveRegBtn);
await _0x1001(400);
}
const clickedFloating=await _0x1028(12);
if(clickedFloating){
for(let w=0;w<35;w++){
await _0x1001(150);
if(_0x102c()){
console.log("\u2705 [\ubcf5\uadc0] '\ub0b4\uac00 \ub4f1\ub85d\ud55c \uc0c1\ud488 \ub0b4\uc5ed' \ubaa9\ub85d \uc9c4\uc785 \uc131\uacf5 (\ud50c\ub85c\ud305 '\ub0b4\uae00 \ubcf4\uae30' \uacbd\uc720)!");
await _0x1001(350);
if(filterType&&(filterType==='\uc591\ub3c4'||filterType==='\uc870\uc778'||filterType==='\uc804\uccb4')){
await _0x103f(filterType);
}
return true;
}
}
}
await _0x1001(300);
}
}
if(isEditPage()||isDetailPage()){
console.log("[\ubcf5\uadc0] \uc218\uc815\x2f\uc0c1\uc138 \ud654\uba74 \uac10\uc9c0 -> \ubaa9\ub85d \ubcf5\uadc0 \ub4a4\ub85c\uac00\uae30 \uc2e4\ud589");
await executeSingleBack();
for(let w=0;w<25;w++){
await _0x1001(100);
if(_0x102c()){
console.log("[\ubcf5\uadc0] \u2705 '\ub0b4\uac00 \ub4f1\ub85d\ud55c \uc0c1\ud488 \ub0b4\uc5ed' \ubaa9\ub85d \ubcf5\uadc0 \uc131\uacf5!");
await _0x1001(200);
if(filterType&&(filterType==='\uc591\ub3c4'||filterType==='\uc870\uc778'||filterType==='\uc804\uccb4')){
await _0x103f(filterType);
}
return true;
}
}
}
let myPostsBtn=_0x1029();
if(myPostsBtn){
console.log("[\ubcf5\uadc0] \ub9c8\uc774\ud398\uc774\uc9c0 \uac10\uc9c0\x3a '\ub0b4\uac00 \ub4f1\ub85d\ud55c \uc0c1\ud488 \ub0b4\uc5ed' \ubc84\ud2bc \ud074\ub9ad \uc2e4\ud589");
myPostsBtn.scrollIntoView({block:'\x6e\x65\x61\x72\x65\x73\x74',inline:'\x63\x65\x6e\x74\x65\x72',behavior:'\x69\x6e\x73\x74\x61\x6e\x74'});
myPostsBtn.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x30\x30\x65\x36\x37\x36','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await _0x1001(80);
await _0x1005(myPostsBtn);
try{myPostsBtn.click();}catch(e){}
for(let w=0;w<35;w++){
await _0x1001(150);
if(_0x102c()){
console.log("[\ubcf5\uadc0] '\ub0b4\uac00 \ub4f1\ub85d\ud55c \uc0c1\ud488 \ub0b4\uc5ed' \ubaa9\ub85d \uc9c4\uc785 \uc131\uacf5 (\ub9c8\uc774\ud398\uc774\uc9c0 \uacbd\uc720)!");
await _0x1001(350);
if(filterType&&(filterType==='\uc591\ub3c4'||filterType==='\uc870\uc778'||filterType==='\uc804\uccb4')){
await _0x103f(filterType);
}
return true;
}
}
}
if(window.location.href.toLowerCase().includes('\x2f\x70\x72\x6f\x64\x75\x63\x74\x2f\x6c\x69\x73\x74')){
return true;
}
if(!_0x102c()&&!_priceUpdateRunning&&!isPostReplacementRunning&&!window.location.href.includes('\x2f\x70\x72\x6f\x64\x75\x63\x74\x2f\x6c\x69\x73\x74')){
console.log("[\ubcf5\uadc0] \ucd5c\uc885 \x66\x61\x6c\x6c\x62\x61\x63\x6b\x3a \ud558\ub2e8 '\ubd80\ud0b9' \ud0ed \ubcf5\uadc0 \ud6c4 \uc7ac\uc2dc\ub3c4\x2e\x2e\x2e");
await _0x100b(5);
await _0x1001(350);
const retryRegBtn=_0x1008();
if(retryRegBtn){
await _0x100a(retryRegBtn);
await _0x1001(350);
const ok=await _0x1028(10);
if(ok){
for(let w=0;w<30;w++){
await _0x1001(150);
if(_0x102c()){
if(filterType&&(filterType==='\uc591\ub3c4'||filterType==='\uc870\uc778'||filterType==='\uc804\uccb4')){
await _0x103f(filterType);
}
return true;
}
}
}
}
}
return _0x102c();
}
function _0x102f(dateStr){
if(!dateStr)return'';
const clean=dateStr.toString().trim();
const dayKorean=clean.match(/(\d{1,2})\s*일/);
if(dayKorean)return parseInt(dayKorean[1],10).toString();
const m=clean.match(/(\d{1,2})(?=[^\d]*$)/);
if(m){
return parseInt(m[1],10).toString();
}
return'';
}
function _0x1030(dateStr){
if(!dateStr)return'';
const clean=dateStr.toString().trim();
const monthKorean=clean.match(/(\d{1,2})\s*월/);
if(monthKorean)return parseInt(monthKorean[1],10).toString();
const ym=clean.match(/\d{4}[./\-](\d{1,2})[./\-]\d{1,2}/);
if(ym)return parseInt(ym[1],10).toString();
const m=clean.match(/(?:^|[^\d])(\d{1,2})[./\-](\d{1,2})/);
if(m){
return parseInt(m[1],10).toString();
}
return'';
}
function _0x1031(){
const regionNames=['\uc804\uccb4','\uc778\ucc9c\uacbd\uc778','\uacbd\uae30\ubd81\ubd80','\uacbd\uae30\ub3d9\ubd80','\uacbd\uae30\ub0a8\ubd80','\ucda9\uccad','\uac15\uc6d0','\uc804\ub77c','\uacbd\uc0c1','\uc81c\uc8fc'];
const candidates=Array.from(document.querySelectorAll('\x2e\x71-\x74\x61\x62, [\x72\x6f\x6c\x65="\x74\x61\x62"], \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x64\x69\x76, \x73\x70\x61\x6e'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const txt=(el.innerText||el.textContent||'').trim();
return regionNames.includes(txt);
});
if(candidates.length>0){
const tops=candidates.map(el=>el.getBoundingClientRect().top).filter(t=>t>60&&t<400);
if(tops.length>0){
return Math.min(...tops);
}
}
return 260;
}
function _0x1032(){
const regionBarTop=(typeof _0x1031==='\x66\x75\x6e\x63\x74\x69\x6f\x6e')?_0x1031():260;
const maxBottom=regionBarTop+20;
const candidates=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x64\x69\x76, \x73\x70\x61\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x61, \x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const r=el.getBoundingClientRect();
if(r.top<30||r.bottom>maxBottom)return false;
if(r.left<0||r.left>220)return false;
const txt=(el.innerText||el.textContent||'').trim();
if(!txt||txt.includes('\x3a')||txt.includes('\uc6d0')||txt.includes('\ub9cc')||txt.includes('\ud640'))return false;
return/\b\d{1,2}월/.test(txt)||/^\d{1,2}월/.test(txt);
});
if(candidates.length===0){
const fallback=Array.from(document.querySelectorAll('*'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const r=el.getBoundingClientRect();
if(r.top<30||r.top>360)return false;
if(r.left<0||r.left>250)return false;
const txt=(el.innerText||el.textContent||'').trim();
if(!txt||txt.includes('\x3a')||txt.includes('\uc6d0')||txt.includes('\ub9cc')||txt.includes('\ud640'))return false;
return/^\d{1,2}월(\s*[▾▼∨\/]|$)/.test(txt)||/^(\d{1,2})월$/.test(txt);
});
if(fallback.length>0){
fallback.sort((a,b)=>(a.offsetWidth*a.offsetHeight)-(b.offsetWidth*b.offsetHeight));
const leaf=fallback[0];
return leaf.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||leaf;
}
return null;
}
candidates.sort((a,b)=>(a.offsetWidth*a.offsetHeight)-(b.offsetWidth*b.offsetHeight));
const leaf=candidates[0];
return leaf.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||leaf;
}
async function _0x1033(targetMonth){
if(!targetMonth)return true;
const cleanTargetMonth=parseInt(targetMonth,10).toString();
const targetMonthStr=`${cleanTargetMonth}\uc6d4`;
console.log(`[\uc6d4\uc77c\uce58] \ubaa9\ud45c \uc6d4: [${targetMonthStr}] \ud655\uc778 \uc2dc\uc791...`);
let monthBtn=_0x1032();
if(!monthBtn){
console.warn(`[\uc6d4\uc77c\uce58] \uc0c1\ub2e8 \uc6d4 \ubc84\ud2bc \uc694\uc18c\ub97c \ucc3e\uc9c0 \ubabb\ud568 (\ud1b5\uacfc)`);
return true;
}
const curTxt=(monthBtn.innerText||monthBtn.textContent||'').trim();
const curMatch=curTxt.match(/(\d{1,2})월/);
const curMonthNum=curMatch?parseInt(curMatch[1],10).toString():'';
if(curMonthNum&&curMonthNum===cleanTargetMonth){
console.log(`[\uc6d4\uc77c\uce58] \uc0c1\ub2e8 \uc6d4 (${cleanTargetMonth}\uc6d4) \uc774\ubbf8 \uc77c\uce58 \ud655\uc778\ub428`);
return true;
}
console.log(`[\uc6d4\uc77c\uce58] \ud604\uc7ac \ud654\uba74 \uc6d4(${curMonthNum||'\ubbf8\ud655\uc778'}\uc6d4) -> \ubaa9\ud45c \uc6d4(${cleanTargetMonth}\uc6d4)\ub85c \ubcc0\uacbd \uc2dc\ub3c4...`);
monthBtn.scrollIntoView({block:'\x6e\x65\x61\x72\x65\x73\x74',inline:'\x63\x65\x6e\x74\x65\x72',behavior:'\x69\x6e\x73\x74\x61\x6e\x74'});
monthBtn.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x66\x66\x39\x38\x30\x30','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await _0x1001(100);
await _0x1005(monthBtn);
try{monthBtn.click();}catch(e){}
let dialogEl=null;
for(let w=0;w<20;w++){
await _0x1001(100);
if(shouldStopRegistration)return false;
dialogEl=document.querySelector('\x2e\x71-\x64\x69\x61\x6c\x6f\x67\x3a\x6e\x6f\x74(\x2e\x68\x69\x64\x64\x65\x6e), [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"], \x2e\x71-\x62\x6f\x74\x74\x6f\x6d-\x73\x68\x65\x65\x74, \x2e\x71-\x6d\x65\x6e\x75\x3a\x6e\x6f\x74(\x2e\x68\x69\x64\x64\x65\x6e)');
if(dialogEl&&dialogEl.offsetHeight>0)break;
}
const searchScope=dialogEl||document.body;
let targetItemEl=null;
for(let attempt=0;attempt<10;attempt++){
const allCandidates=Array.from(searchScope.querySelectorAll('\x2e\x71-\x69\x74\x65\x6d, \x2e\x71-\x72\x61\x64\x69\x6f, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, [\x72\x6f\x6c\x65="\x72\x61\x64\x69\x6f"], [\x72\x6f\x6c\x65="\x6f\x70\x74\x69\x6f\x6e"], \x6c\x61\x62\x65\x6c, \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x64\x69\x76, \x73\x70\x61\x6e'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const t=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
return t===targetMonthStr||t.startsWith(targetMonthStr);
});
if(allCandidates.length>0){
allCandidates.sort((a,b)=>(a.offsetWidth*a.offsetHeight)-(b.offsetWidth*b.offsetHeight));
const leaf=allCandidates[0];
targetItemEl=leaf.closest('\x2e\x71-\x69\x74\x65\x6d, [\x72\x6f\x6c\x65="\x72\x61\x64\x69\x6f"], [\x72\x6f\x6c\x65="\x6f\x70\x74\x69\x6f\x6e"], \x6c\x61\x62\x65\x6c, \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e')||leaf;
break;
}
await _0x1001(100);
}
if(targetItemEl){
console.log(`[\uc6d4\uc77c\uce58] \ud31d\uc5c5\ucc3d \ub0b4 \ubaa9\ud45c \uc6d4 [${targetMonthStr}] \ud56d\ubaa9 \ubc1c\uacac -> \ud074\ub9ad \uc2e4\ud589`);
targetItemEl.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x30\x30\x65\x36\x37\x36','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await _0x1001(150);
await _0x1005(targetItemEl);
try{targetItemEl.click();}catch(e){}
const innerInput=targetItemEl.querySelector('\x69\x6e\x70\x75\x74');
if(innerInput&&!innerInput.checked){
try{innerInput.click();}catch(e){}
}
await _0x1001(250);
}else{
console.warn(`[\uc6d4\uc77c\uce58] \ud31d\uc5c5\ucc3d \ub0b4\uc5d0\uc11c [${targetMonthStr}] \ud56d\ubaa9\uc744 \ucc3e\uc9c0 \ubabb\ud568`);
}
const findConfirmBtn=()=>{
const btnCandidates=Array.from(searchScope.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x64\x69\x76, \x73\x70\x61\x6e'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const t=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
return t==='\uc120\ud0dd'||t==='\ud655\uc778';
});
if(btnCandidates.length>0){
btnCandidates.sort((a,b)=>(a.offsetWidth*a.offsetHeight)-(b.offsetWidth*b.offsetHeight));
return btnCandidates[0].closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||btnCandidates[0];
}
return null;
};
let confirmBtn=findConfirmBtn();
if(confirmBtn){
console.log(`[\uc6d4\uc77c\uce58] \ud31d\uc5c5\ucc3d \ud558\ub2e8 [\uc120\ud0dd] \ubc84\ud2bc \ud074\ub9ad \uc2e4\ud589 (${confirmBtn.tagName})`);
confirmBtn.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x35\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x66\x66\x39\x38\x30\x30','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await _0x1001(150);
await _0x1005(confirmBtn);
try{confirmBtn.click();}catch(e){}
await _0x1001(400);
}else{
console.warn("[\uc6d4\uc77c\uce58] \ud31d\uc5c5\ucc3d \ud558\ub2e8 [\uc120\ud0dd] \ubc84\ud2bc \ubbf8\ubc1c\uacac (\uc774\ubbf8 \ub2eb\ud614\uac70\ub098 \uc790\ub3d9 \uc801\uc6a9 \uc5ec\ubd80 \ud655\uc778)");
await _0x1001(300);
}
const remainingDialog=document.querySelector('\x2e\x71-\x64\x69\x61\x6c\x6f\x67\x3a\x6e\x6f\x74(\x2e\x68\x69\x64\x64\x65\x6e), [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"]');
if(remainingDialog&&remainingDialog.offsetHeight>0){
const btn2=Array.from(remainingDialog.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]'))
.find(b=>(b.innerText||b.textContent||'').trim().replace(/\s+/g,'')==='\uc120\ud0dd');
if(btn2){
await _0x1005(btn2);
try{btn2.click();}catch(e){}
await _0x1001(400);
}
}
for(let v=0;v<10;v++){
const updatedMonthBtn=_0x1032();
if(updatedMonthBtn){
const uTxt=(updatedMonthBtn.innerText||updatedMonthBtn.textContent||'').trim();
const uMatch=uTxt.match(/(\d{1,2})월/);
const uMonth=uMatch?parseInt(uMatch[1],10).toString():'';
if(uMonth===cleanTargetMonth){
console.log(`\u2705 [\uc6d4\uc77c\uce58 \uc644\ub8cc] \uc0c1\ub2e8 \uc6d4\uc774 [${cleanTargetMonth}\uc6d4]\ub85c \uc815\uc0c1 \ubcc0\uacbd\ub418\uc5c8\uc2b5\ub2c8\ub2e4!`);
await _0x1001(300);
return true;
}
}
await _0x1001(150);
}
return true;
}
function _0x1034(el,cleanDay){
if(!el)return false;
const raw=(el.innerText||el.textContent||'').trim();
if(!raw)return false;
if(raw.includes('\x3a')||raw.includes('\uc6d0')||raw.includes('\ub9cc')||raw.includes('\ud640')||raw.includes('\uc870\uc778')||raw.includes('\uc591\ub3c4')||/\d{1,2}월/.test(raw))return false;
const tokens=raw.split(/[\s\n\r\t]+/).map(t=>t.trim()).filter(Boolean);
if(tokens.some(t=>t===cleanDay||t===`${cleanDay}\uc77c`||(parseInt(t,10).toString()===cleanDay&&!isNaN(parseInt(t,10))))){
return true;
}
const nums=raw.match(/\b\d{1,2}\b/g);
if(nums&&nums.length===1&&parseInt(nums[0],10).toString()===cleanDay){
return true;
}
return false;
}
function _0x1035(el){
if(!el)return false;
const container=el.closest('\x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72, \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x2e\x63\x6f\x6c')||el;
const allRelatedNodes=new Set([
container,
el,
el.parentElement,
el.parentElement?.parentElement,
...Array.from(container.querySelectorAll('*')),
...Array.from(el.querySelectorAll('*'))
]);
const activeClasses=['\x61\x63\x74\x69\x76\x65','\x73\x65\x6c\x65\x63\x74\x65\x64','\x71-\x74\x61\x62--\x61\x63\x74\x69\x76\x65','\x71-\x62\x74\x6e--\x61\x63\x74\x69\x76\x65','\x74\x65\x78\x74-\x77\x68\x69\x74\x65','\x62\x67-\x62\x6c\x61\x63\x6b','\x62\x67-\x64\x61\x72\x6b','\x62\x67-\x70\x72\x69\x6d\x61\x72\x79','\x62\x67-\x67\x72\x65\x79-\x39','\x62\x67-\x67\x72\x65\x79-\x31\x30','\x62\x67-\x62\x6c\x75\x65-\x67\x72\x65\x79-\x31\x30'];
for(const node of allRelatedNodes){
if(!node)continue;
if(typeof node.getAttribute==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'&&node.getAttribute('\x61\x72\x69\x61-\x73\x65\x6c\x65\x63\x74\x65\x64')==='\x74\x72\x75\x65')return true;
if(node.classList){
for(const cls of activeClasses){
if(node.classList.contains(cls))return true;
}
}
}
for(const node of allRelatedNodes){
if(!node)continue;
try{
const style=window.getComputedStyle(node);
const color=style.color||'';
if(color==='\x72\x67\x62(\x32\x35\x35, \x32\x35\x35, \x32\x35\x35)'||color==='\x72\x67\x62\x61(\x32\x35\x35, \x32\x35\x35, \x32\x35\x35, \x31)'||color==='\x23\x66\x66\x66\x66\x66\x66'||color==='\x23\x66\x66\x66'){
const txt=(node.innerText||node.textContent||'').trim();
if(txt.length>0&&!txt.includes('\x3a')&&!txt.includes('\uc6d0')&&!txt.includes('\ub9cc')&&!txt.includes('\ud640')){
return true;
}
}
}catch(e){}
}
for(const node of allRelatedNodes){
if(!node)continue;
try{
const style=window.getComputedStyle(node);
const bg=style.backgroundColor||'';
if(!bg||bg==='\x74\x72\x61\x6e\x73\x70\x61\x72\x65\x6e\x74')continue;
const rgbMatch=bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
if(rgbMatch){
const r=parseInt(rgbMatch[1],10);
const g=parseInt(rgbMatch[2],10);
const b=parseInt(rgbMatch[3],10);
const a=rgbMatch[4]!==undefined?parseFloat(rgbMatch[4]):1;
if(a>0.4&&r<115&&g<115&&b<130){
return true;
}
}
}catch(e){}
}
return false;
}
function _0x1036(cleanDay){
if(!cleanDay)return null;
const regionBarTop=_0x1031();
const maxBottom=Math.max(regionBarTop+20,320);
console.log(`[\uac00\uaca9\uc218\uc815] \uc0c1\ub2e8 \ub0a0\uc9dc(${cleanDay}\uc77c) \ud0d0\uc0c9 \ubc94\uc704: Y=25px ~ ${maxBottom}px (\uc9c0\uc5ed\ud0ed top: ${regionBarTop}px)`);
const topElements=Array.from(document.querySelectorAll('*'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const r=el.getBoundingClientRect();
if(r.top<25||r.bottom>maxBottom)return false;
if(r.width>150||r.height>100)return false;
return true;
});
const matched=topElements.filter(el=>_0x1034(el,cleanDay));
if(matched.length>0){
matched.sort((a,b)=>(a.offsetWidth*a.offsetHeight)-(b.offsetWidth*b.offsetHeight));
const leaf=matched[0];
const clickable=leaf.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x2e\x63\x6f\x6c')||leaf;
const cRect=clickable.getBoundingClientRect();
if(cRect.top>=25&&cRect.bottom<=maxBottom){
return clickable;
}
return leaf;
}
const padDay=cleanDay.padStart(2,'\x30');
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,false);
let node;
while((node=walker.nextNode())){
const txt=node.textContent.trim();
if(txt===cleanDay||txt===`${cleanDay}\uc77c`||txt===padDay){
const p=node.parentElement;
if(p&&p.offsetHeight>0){
const r=p.getBoundingClientRect();
if(r.top>=25&&r.bottom<=maxBottom){
const clickTarget=p.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x2e\x63\x6f\x6c')||p;
return clickTarget;
}
}
}
}
return null;
}
function _0x1037(){
const regionBarTop=_0x1031();
const maxBottom=Math.max(regionBarTop+20,320);
const topElements=Array.from(document.querySelectorAll('*'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
if(el.closest('\x2e\x71-\x63\x61\x72\x64, [\x63\x6c\x61\x73\x73*="\x71-\x63\x61\x72\x64"], \x2e\x71-\x69\x74\x65\x6d, \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x63\x61\x72\x64"], \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x62\x6f\x72\x64\x65\x72"]'))return false;
const r=el.getBoundingClientRect();
if(r.top<25||r.bottom>maxBottom)return false;
if(r.width>150||r.height>100)return false;
return true;
});
for(const el of topElements){
if(_0x1035(el)){
const raw=(el.innerText||el.textContent||'').trim();
if(raw.includes('\x3a')||raw.includes('\uc6d0')||raw.includes('\ub9cc')||raw.includes('\ud300')||raw.includes('\uba85')||raw.includes('\ud640')||/\d{1,2}월/.test(raw))continue;
const nums=raw.match(/\b\d{1,2}\b/g);
if(nums&&nums.length>0){
const val=parseInt(nums[0],10);
if(val>=1&&val<=31){
return val.toString();
}
}
}
}
return null;
}
function _0x1038(targetDateStr){
if(!targetDateStr)return false;
const cleanDay=_0x102f(targetDateStr);
const cleanMonth=_0x1030(targetDateStr);
if(!cleanDay)return false;
if(window.scrollY>0)window.scrollTo(0,0);
if(cleanMonth){
const monthBtn=_0x1032();
if(monthBtn){
const txt=(monthBtn.innerText||monthBtn.textContent||'').trim();
const m=txt.match(/(\d{1,2})월/);
if(m&&parseInt(m[1],10).toString()!==cleanMonth){
return false;
}
}
}
const activeDay=_0x1037();
if(activeDay){
return(activeDay===cleanDay);
}
const dateEl=_0x1036(cleanDay);
if(dateEl&&_0x1035(dateEl)){
return true;
}
return false;
}
function _0x1039(targetDateStr){
if(!targetDateStr)return true;
return _0x1038(targetDateStr);
}
async function _0x103a(targetDateStr){
if(!targetDateStr)return true;
if(_0x1038(targetDateStr))return true;
console.warn(`[\ub0a0\uc9dc\uac80\uc99d] \ud654\uba74 \ub0a0\uc9dc\uac00 \ubaa9\ud45c \ub0a0\uc9dc(${targetDateStr})\uc640 \ubd88\uc77c\uce58 \uac10\uc9c0 -> \ubaa9\ud45c \ub0a0\uc9dc \uc7ac\uc120\ud0dd \uc2e4\ud589...`);
await _0x103c(targetDateStr);
await _0x1001(350);
return _0x1038(targetDateStr);
}
async function _0x103b(el){
if(!el)return false;
try{
el.scrollIntoView({block:'\x6e\x65\x61\x72\x65\x73\x74',inline:'\x63\x65\x6e\x74\x65\x72',behavior:'\x69\x6e\x73\x74\x61\x6e\x74'});
}catch(e){}
el.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x66\x66\x39\x38\x30\x30','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await _0x1001(80);
const targetEl=el.closest('\x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72, \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||el;
console.log(`[\uac00\uaca9\uc218\uc815] \uc0c1\ub2e8 \ub0a0\uc9dc \ubc84\ud2bc \ub2e8 1\ud68c \uc815\ubc00 \ud074\ub9ad \uc2e4\ud589 (${targetEl.tagName}, class=${targetEl.className})`);
try{
targetEl.click();
}catch(e){
const rect=targetEl.getBoundingClientRect();
const opts={clientX:rect.left+rect.width/2,clientY:rect.top+rect.height/2,bubbles:true,cancelable:true,view:window};
targetEl.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',opts));
}
return true;
}
async function _0x103c(targetDateStr,maxAttempts=12){
if(!targetDateStr)return true;
if(_0x1038(targetDateStr)){
const cleanDay=_0x102f(targetDateStr);
console.log(`[\ub0a0\uc9dc\uc120\ud0dd] \uc0c1\ub2e8 \ub0a0\uc9dc (${cleanDay}\uc77c) \uc774\ubbf8 \uc815\uc0c1 \ud65c\uc131\ud654 \ud655\uc778\ub428 -> \ud074\ub9ad \uc0dd\ub7b5 (\ub0a0\uc9dc \ud574\uc81c \ubc29\uc9c0)`);
return true;
}
await _0x1001(Math.floor(Math.random()*100+350));
if(shouldStopRegistration)return false;
const targetMonth=_0x1030(targetDateStr);
const cleanDay=_0x102f(targetDateStr);
if(!cleanDay){
console.warn(`[\ub0a0\uc9dc\uc120\ud0dd] \ub0a0\uc9dc \ud30c\uc2f1 \uc2e4\ud328 (\uc785\ub825: ${targetDateStr})`);
return true;
}
if(targetMonth){
await _0x1033(targetMonth);
await _0x1001(380);
}
if(_0x1038(targetDateStr)){
console.log(`[\ub0a0\uc9dc\uc120\ud0dd] \uc0c1\ub2e8 \ub0a0\uc9dc ([${targetMonth?targetMonth+'\uc6d4 ':''}${cleanDay}\uc77c]) \uc774\ubbf8 \uc815\uc0c1 \ud65c\uc131\ud654 \ud655\uc778\ub428 -> \uc911\ubcf5 \ud074\ub9ad \ubc29\uc9c0 (\uc0dd\ub7b5)`);
return true;
}
console.log(`[\ub0a0\uc9dc\uc120\ud0dd] \uc0c1\ub2e8 \ub0a0\uc9dc \uc77c\uce58 \uc120\ud0dd \uc2dc\ub3c4 -> \ubaa9\ud45c: [${targetMonth?targetMonth+'\uc6d4 ':''}${cleanDay}\uc77c]...`);
const maxDateAttempts=maxAttempts;
for(let attempt=0;attempt<maxDateAttempts;attempt++){
if(shouldStopRegistration)return false;
if(_0x1038(targetDateStr)){
console.log(`[\ub0a0\uc9dc\uc120\ud0dd] \uc0c1\ub2e8 \ub0a0\uc9dc (${cleanDay}\uc77c) \uc774\ubbf8 \uc120\ud0dd\ub418\uc5b4 \uc788\uc74c (\ud65c\uc131 \uc0c1\ud0dc \ud655\uc778) -> \uc911\ubcf5 \ud074\ub9ad \ubc29\uc9c0 (\uc0dd\ub7b5)`);
return true;
}
const dateEl=_0x1036(cleanDay);
if(dateEl){
const isAlreadyActive=_0x1035(dateEl);
if(isAlreadyActive||_0x1038(targetDateStr)){
console.log(`[\ub0a0\uc9dc\uc120\ud0dd] \uc0c1\ub2e8 \ub0a0\uc9dc (${cleanDay}\uc77c) \uc694\uc18c \uc774\ubbf8 \ud65c\uc131 \uc0c1\ud0dc -> \uc911\ubcf5 \ud074\ub9ad \ubc29\uc9c0 (\uc0dd\ub7b5)`);
return true;
}
console.log(`[\ub0a0\uc9dc\uc120\ud0dd] \uc0c1\ub2e8 \ub0a0\uc9dc (${cleanDay}\uc77c) \ubbf8\uc120\ud0dd \ud655\uc778 -> \ub2e8 1\ud68c \uc815\ubc00 \ud074\ub9ad \uc2e4\ud589!`);
await _0x1001(100);
await _0x103b(dateEl);
await _0x1001(350);
return true;
}
await _0x1001(250);
}
console.warn(`[\ub0a0\uc9dc\uc120\ud0dd] \uc0c1\ub2e8 \ub0a0\uc9dc (${cleanDay}\uc77c) \uc694\uc18c\ub97c \ucc3e\uc9c0 \ubabb\ud568 (\ud1b5\uacfc)`);
return false;
}
async function _0x103d(regionName){
if(!regionName)return true;
const cleanReg=regionName.trim();
if(!cleanReg)return true;
console.log(`[\uac00\uaca9\uc218\uc815] \uc9c0\uc5ed (${cleanReg}) \ud0ed \uc120\ud0dd \uc2dc\ub3c4...`);
const rawCandidates=Array.from(document.querySelectorAll('\x2e\x71-\x74\x61\x62\x73 \x2e\x71-\x74\x61\x62, \x2e\x71-\x74\x61\x62, [\x72\x6f\x6c\x65="\x74\x61\x62"], \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x64\x69\x76'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
if(el.closest('\x2e\x71-\x68\x65\x61\x64\x65\x72, \x68\x65\x61\x64\x65\x72, \x2e\x71-\x74\x6f\x6f\x6c\x62\x61\x72, \x2e\x71-\x66\x6f\x6f\x74\x65\x72, \x66\x6f\x6f\x74\x65\x72, \x2e\x71-\x63\x61\x72\x64, \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x63\x61\x72\x64"], \x2e\x71-\x64\x69\x61\x6c\x6f\x67, \x2e\x71-\x6d\x65\x6e\x75, [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"]'))return false;
const r=el.getBoundingClientRect();
if(r.top<35||r.top>300)return false;
return true;
});
const normTarget=cleanReg.replace(/[\s/]/g,'');
const tabEls=[];
const seenTabs=new Set();
for(const el of rawCandidates){
const tabRoot=el.closest('\x2e\x71-\x74\x61\x62, [\x72\x6f\x6c\x65="\x74\x61\x62"], \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e')||el;
if(seenTabs.has(tabRoot))continue;
if(tabRoot.closest('\x2e\x71-\x68\x65\x61\x64\x65\x72, \x68\x65\x61\x64\x65\x72, \x2e\x71-\x74\x6f\x6f\x6c\x62\x61\x72, \x2e\x71-\x66\x6f\x6f\x74\x65\x72, \x66\x6f\x6f\x74\x65\x72, \x2e\x71-\x63\x61\x72\x64, \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x63\x61\x72\x64"]'))continue;
const txt=(tabRoot.innerText||tabRoot.textContent||'').trim();
if(!txt||txt.length>10)continue;
seenTabs.add(tabRoot);
tabEls.push(tabRoot);
}
let regTab=tabEls.find(t=>(t.innerText||t.textContent||'').trim()===cleanReg);
if(!regTab){
regTab=tabEls.find(t=>{
const normTab=(t.innerText||t.textContent||'').trim().replace(/[\s/]/g,'');
return normTab&&(normTab===normTarget||normTab.includes(normTarget)||normTarget.includes(normTab));
});
}
const isRegionTabActive=(el)=>{
if(!el)return false;
try{
const urlTab=new URLSearchParams(window.location.search).get('\x71\x54\x61\x62');
if(urlTab){
const normUrlTab=urlTab.trim().replace(/[\s/]/g,'');
if(normUrlTab&&normUrlTab!==normTarget&&!normUrlTab.includes(normTarget)&&!normTarget.includes(normUrlTab)){
return false;
}
}
}catch(e){}
const root=el.closest('\x2e\x71-\x74\x61\x62, [\x72\x6f\x6c\x65="\x74\x61\x62"]')||el;
if(root.classList.contains('\x71-\x74\x61\x62--\x61\x63\x74\x69\x76\x65')||
root.classList.contains('\x71-\x72\x6f\x75\x74\x65\x72-\x6c\x69\x6e\x6b--\x61\x63\x74\x69\x76\x65')||
root.classList.contains('\x71-\x72\x6f\x75\x74\x65\x72-\x6c\x69\x6e\x6b--\x65\x78\x61\x63\x74-\x61\x63\x74\x69\x76\x65')||
root.getAttribute('\x61\x72\x69\x61-\x73\x65\x6c\x65\x63\x74\x65\x64')==='\x74\x72\x75\x65'||
root.classList.contains('\x74\x65\x78\x74-\x62\x6c\x61\x63\x6b')||
root.classList.contains('\x74\x65\x78\x74-\x70\x72\x69\x6d\x61\x72\x79')||
root.classList.contains('\x61\x63\x74\x69\x76\x65')){
return true;
}
if(root.querySelector('\x2e\x71-\x74\x61\x62--\x61\x63\x74\x69\x76\x65, [\x61\x72\x69\x61-\x73\x65\x6c\x65\x63\x74\x65\x64="\x74\x72\x75\x65"], \x2e\x74\x65\x78\x74-\x62\x6c\x61\x63\x6b, \x2e\x74\x65\x78\x74-\x70\x72\x69\x6d\x61\x72\x79, \x2e\x74\x65\x78\x74-\x77\x65\x69\x67\x68\x74-\x62\x6f\x6c\x64')){
return true;
}
const indicator=root.querySelector('\x2e\x71-\x74\x61\x62\x5f\x5f\x69\x6e\x64\x69\x63\x61\x74\x6f\x72');
if(indicator){
const st=window.getComputedStyle(indicator);
if(st&&st.opacity!=='\x30'&&parseFloat(st.opacity)>0.5&&indicator.offsetHeight>0&&indicator.offsetWidth>0){
return true;
}
}
return false;
};
if(regTab){
const clickTarget=regTab.closest('\x2e\x71-\x74\x61\x62, [\x72\x6f\x6c\x65="\x74\x61\x62"], \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e')||regTab;
if(isRegionTabActive(clickTarget)){
console.log(`[\uac00\uaca9\uc218\uc815] \uc9c0\uc5ed \ud0ed (${cleanReg}) \uc774\ubbf8 \uc120\ud0dd\ub428 (\uc911\ubcf5 \ud074\ub9ad \uc0dd\ub7b5)`);
return true;
}
const anchorEl=clickTarget.tagName==='\x41'?clickTarget:(clickTarget.closest('\x61')||clickTarget.querySelector('\x61'));
let savedHref=null;
if(anchorEl&&anchorEl.hasAttribute('\x68\x72\x65\x66')){
savedHref=anchorEl.getAttribute('\x68\x72\x65\x66');
anchorEl.removeAttribute('\x68\x72\x65\x66');
}
try{
console.log(`[\uac00\uaca9\uc218\uc815] \uc9c0\uc5ed \ud0ed (${cleanReg}) \ub2e8 1\ud68c \ud074\ub9ad \uc2e4\ud589`);
enforceNonSubmitButtonType(clickTarget);
await _0x1005(clickTarget);
await _0x1001(300);
}finally{
if(anchorEl&&savedHref!==null){
try{anchorEl.setAttribute('\x68\x72\x65\x66',savedHref);}catch(e){}
}
}
}else{
console.warn(`[\uac00\uaca9\uc218\uc815] \uc9c0\uc5ed \ud0ed (${cleanReg})\uc744 \ucc3e\uc9c0 \ubabb\ud568 (\ud1b5\uacfc)`);
}
return true;
}
function _0x103e(){
const regionBarTop=_0x1031();
const minFilterTop=Math.max(120,regionBarTop+15);
const maxFilterBottom=regionBarTop+125;
const allBtns=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72, \x64\x69\x76, \x73\x70\x61\x6e'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
if(el.closest('\x2e\x71-\x63\x61\x72\x64, \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x63\x61\x72\x64"], \x2e\x71-\x69\x74\x65\x6d'))return false;
if(el.closest('\x2e\x71-\x74\x61\x62\x73, \x2e\x71-\x74\x61\x62, [\x72\x6f\x6c\x65="\x74\x61\x62"], [\x72\x6f\x6c\x65="\x74\x61\x62\x6c\x69\x73\x74"]'))return false;
if(el.closest('\x2e\x71-\x68\x65\x61\x64\x65\x72, \x68\x65\x61\x64\x65\x72, \x2e\x71-\x74\x6f\x6f\x6c\x62\x61\x72, \x2e\x71-\x64\x69\x61\x6c\x6f\x67, \x2e\x71-\x6d\x65\x6e\x75, [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"]'))return false;
if(el.tagName==='\x41'||el.closest('\x61'))return false;
const r=el.getBoundingClientRect();
if(r.top<minFilterTop||r.bottom>maxFilterBottom)return false;
if(r.width<35||r.width>140||r.height<18||r.height>58)return false;
return true;
});
const resolvePillRoot=(el)=>{
if(!el)return null;
let curr=el;
let best=el;
for(let d=0;d<4&&curr&&curr!==document.body;d++){
const r=curr.getBoundingClientRect();
if(r.width>=40&&r.width<=140&&r.height>=22&&r.height<=58&&
r.top>=minFilterTop&&r.bottom<=maxFilterBottom){
best=curr;
if(curr.tagName==='\x42\x55\x54\x54\x4f\x4e'||curr.classList.contains('\x71-\x62\x74\x6e')||curr.getAttribute('\x72\x6f\x6c\x65')==='\x62\x75\x74\x74\x6f\x6e'){
break;
}
}else if(r.width>140||r.height>58){
break;
}
curr=curr.parentElement;
}
return best;
};
const golfCandidates=allBtns.filter(el=>{
const txt=(el.innerText||el.textContent||'').trim().replace(/[\s⌄∨▼▾vV]/g,'');
return txt==='\uace8\ud504\uc7a5';
});
if(golfCandidates.length>0){
golfCandidates.sort((a,b)=>(a.offsetWidth*a.offsetHeight)-(b.offsetWidth*b.offsetHeight));
const gClick=resolvePillRoot(golfCandidates[0]);
if(gClick){
const gRect=gClick.getBoundingClientRect();
const leftPills=allBtns.filter(el=>{
if(el===gClick||el.contains(gClick)||gClick.contains(el))return false;
const r=el.getBoundingClientRect();
if(Math.abs(r.top-gRect.top)>22)return false;
if(r.left>=gRect.left-5)return false;
const txt=(el.innerText||el.textContent||'').trim().replace(/[\s⌄∨▼▾vV]/g,'');
return txt==='\uc804\uccb4'||txt==='\uc591\ub3c4'||txt==='\uc870\uc778';
});
if(leftPills.length>0){
leftPills.sort((a,b)=>a.getBoundingClientRect().left-b.getBoundingClientRect().left);
return resolvePillRoot(leftPills[0]);
}
}
}
const categoryPills=allBtns.filter(el=>{
const r=el.getBoundingClientRect();
if(r.left>window.innerWidth*0.55)return false;
const txt=(el.innerText||el.textContent||'').trim().replace(/[\s⌄∨▼▾vV]/g,'');
return txt==='\uc804\uccb4'||txt==='\uc591\ub3c4'||txt==='\uc870\uc778';
});
if(categoryPills.length>0){
categoryPills.sort((a,b)=>a.getBoundingClientRect().left-b.getBoundingClientRect().left);
return resolvePillRoot(categoryPills[0]);
}
return null;
}
async function _0x103f(targetType){
if(!targetType||(targetType!=='\uc591\ub3c4'&&targetType!=='\uc870\uc778'&&targetType!=='\uc804\uccb4'))return false;
console.log(`[\ud544\ud130] \uad6c\ubd84(\uc591\ub3c4/\uc870\uc778/\uc804\uccb4) \ud544\ud130 \ud655\uc778 -> \ubaa9\ud45c: [${targetType}]`);
let categoryBtn=null;
for(let attempt=0;attempt<5;attempt++){
categoryBtn=_0x103e();
if(categoryBtn)break;
await _0x1001(150);
}
if(!categoryBtn){
console.warn("[\ud544\ud130] \uad6c\ubd84 \ud544\ud130 \ubc84\ud2bc\uc744 \ucc3e\uc9c0 \ubabb\ud568 (\ud1b5\uacfc)");
return false;
}
const curTxt=(categoryBtn.innerText||categoryBtn.textContent||'').trim().replace(/[\s⌄∨▼▾vV]/g,'');
let urlOption='';
try{
urlOption=(new URLSearchParams(window.location.search).get('\x71\x4f\x70\x74\x69\x6f\x6e')||'').trim();
}catch(e){}
console.log(`[\ud544\ud130] \ud604\uc7ac \uad6c\ubd84 \ud544\ud130 \uc0c1\ud0dc: \ubc84\ud2bc=[${curTxt}], URL(qOption)=[${urlOption||'\ubbf8\uc9c0\uc815'}] (\ubaa9\ud45c: [${targetType}])`);
const urlMatchesTarget=!urlOption||urlOption===targetType;
if(curTxt===targetType&&urlMatchesTarget){
console.log(`[\ud544\ud130] \uad6c\ubd84 \ud544\ud130\uac00 \uc774\ubbf8 [${targetType}]\ub85c \uc815\ud655\ud788 \uc124\uc815\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4. (\uc720\uc9c0)`);
return true;
}
if(categoryBtn.tagName==='\x41'||categoryBtn.closest('\x61')||categoryBtn.closest('\x2e\x71-\x74\x61\x62\x73, \x2e\x71-\x74\x61\x62, [\x72\x6f\x6c\x65="\x74\x61\x62"]')){
console.warn(`[\ud544\ud130] \u26a0\ufe0f \uac10\uc9c0\ub41c \uc694\uc18c\uac00 \ub9c1\ud06c/\ud0ed \uc694\uc18c\uc774\ubbc0\ub85c \ud398\uc774\uc9c0 \uc774\ud0c8 \ubc29\uc9c0\ub97c \uc704\ud574 \ud074\ub9ad\uc744 \ucc28\ub2e8\ud569\ub2c8\ub2e4.`);
return false;
}
console.log(`[\ud544\ud130] \uc88c\uce21 \uc0c1\ub2e8 \uad6c\ubd84 \ud544\ud130 \ubc84\ud2bc \ud074\ub9ad -> [${targetType}] \uc120\ud0dd \ubaa8\ub2ec \uc624\ud508`);
categoryBtn.scrollIntoView({block:'\x6e\x65\x61\x72\x65\x73\x74',inline:'\x63\x65\x6e\x74\x65\x72',behavior:'\x69\x6e\x73\x74\x61\x6e\x74'});
categoryBtn.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x33\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x30\x30\x65\x36\x37\x36','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
enforceNonSubmitButtonType(categoryBtn);
await _0x1001(80);
await _0x1005(categoryBtn);
await _0x1001(150);
if(!document.querySelector('\x2e\x71-\x64\x69\x61\x6c\x6f\x67\x3a\x6e\x6f\x74([\x73\x74\x79\x6c\x65*="\x64\x69\x73\x70\x6c\x61\x79\x3a \x6e\x6f\x6e\x65"]), \x2e\x71-\x62\x6f\x74\x74\x6f\x6d-\x73\x68\x65\x65\x74, \x2e\x71-\x6d\x65\x6e\x75, [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"], [\x72\x6f\x6c\x65="\x6c\x69\x73\x74\x62\x6f\x78"]')){
try{categoryBtn.click();}catch(e){}
}
for(let w=0;w<10;w++){
await _0x1001(150);
const popupEl=document.querySelector('\x2e\x71-\x6d\x65\x6e\x75\x3a\x6e\x6f\x74([\x73\x74\x79\x6c\x65*="\x64\x69\x73\x70\x6c\x61\x79\x3a \x6e\x6f\x6e\x65"]), \x2e\x71-\x64\x69\x61\x6c\x6f\x67\x3a\x6e\x6f\x74([\x73\x74\x79\x6c\x65*="\x64\x69\x73\x70\x6c\x61\x79\x3a \x6e\x6f\x6e\x65"]), \x2e\x71-\x62\x6f\x74\x74\x6f\x6d-\x73\x68\x65\x65\x74, [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"], [\x72\x6f\x6c\x65="\x6c\x69\x73\x74\x62\x6f\x78"]');
if(!popupEl)continue;
const options=Array.from(popupEl.querySelectorAll('\x2e\x71-\x69\x74\x65\x6d, [\x72\x6f\x6c\x65="\x6f\x70\x74\x69\x6f\x6e"], \x62\x75\x74\x74\x6f\x6e, \x64\x69\x76, \x73\x70\x61\x6e'))
.filter(el=>{
if(el.offsetHeight<=0)return false;
if(el.tagName==='\x41'||el.closest('\x61'))return false;
const t=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
return t===targetType;
});
if(options.length>0){
const leaf=options.sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length)[0];
const opt=leaf.closest('\x2e\x71-\x69\x74\x65\x6d, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, [\x72\x6f\x6c\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"], [\x72\x6f\x6c\x65="\x72\x61\x64\x69\x6f"], [\x72\x6f\x6c\x65="\x6f\x70\x74\x69\x6f\x6e"], \x6c\x61\x62\x65\x6c, \x62\x75\x74\x74\x6f\x6e, \x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72')||leaf;
opt.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x33\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x66\x66\x39\x38\x30\x30','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
enforceNonSubmitButtonType(opt);
await _0x1001(80);
const isAlreadyChecked=opt.getAttribute('\x61\x72\x69\x61-\x63\x68\x65\x63\x6b\x65\x64')==='\x74\x72\x75\x65'||
opt.classList.contains('\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78--\x74\x72\x75\x74\x68\x79')||
Boolean(opt.querySelector('\x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78--\x74\x72\x75\x74\x68\x79, [\x61\x72\x69\x61-\x63\x68\x65\x63\x6b\x65\x64="\x74\x72\x75\x65"], \x69\x6e\x70\x75\x74\x3a\x63\x68\x65\x63\x6b\x65\x64'));
if(!isAlreadyChecked){
await _0x1005(opt);
try{opt.click();}catch(e){}
const innerInput=opt.querySelector('\x69\x6e\x70\x75\x74');
if(innerInput&&!innerInput.checked){
try{innerInput.click();}catch(e){}
}
}
console.log(`[\ud544\ud130] \ubaa8\ub2ec \ub0b4 [${targetType}] \uc120\ud0dd \uc644\ub8cc!`);
await _0x1001(200);
const confirmBtns=Array.from(popupEl.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x64\x69\x76, \x73\x70\x61\x6e'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const t=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
return t==='\uc120\ud0dd'||t==='\ud655\uc778';
});
if(confirmBtns.length>0){
confirmBtns.sort((a,b)=>(a.offsetWidth*a.offsetHeight)-(b.offsetWidth*b.offsetHeight));
const cBtn=confirmBtns[0].closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||confirmBtns[0];
enforceNonSubmitButtonType(cBtn);
await _0x1005(cBtn);
try{cBtn.click();}catch(e){}
console.log(`[\ud544\ud130] \ubaa8\ub2ec \ud558\ub2e8 [\uc120\ud0dd] \ud655\uc778 \ubc84\ud2bc \ud074\ub9ad \uc644\ub8cc!`);
}
await _0x1001(400);
return true;
}
}
const openMenu=document.querySelector('\x2e\x71-\x6d\x65\x6e\x75\x3a\x6e\x6f\x74([\x73\x74\x79\x6c\x65*="\x64\x69\x73\x70\x6c\x61\x79\x3a \x6e\x6f\x6e\x65"]), \x2e\x71-\x64\x69\x61\x6c\x6f\x67\x3a\x6e\x6f\x74([\x73\x74\x79\x6c\x65*="\x64\x69\x73\x70\x6c\x61\x79\x3a \x6e\x6f\x6e\x65"])');
if(openMenu){
try{document.body.click();}catch(e){}
}
console.warn(`[\ud544\ud130] \uad6c\ubd84 \ud544\ud130 \ubaa8\ub2ec \ub0b4\uc5d0\uc11c [${targetType}] \uc635\uc158\uc744 \ucc3e\uc9c0 \ubabb\ud568`);
return false;
}
function _0x1040(str){
let s=(str||'').toLowerCase();
s=s.replace(/cc|gc|골프장|골프클럽|골프코스/gi,'');
s=s.replace(/club\s*d/gi,'\ud074\ub7fd\ub514')
.replace(/club/gi,'\ud074\ub7fd')
.replace(/route\s*52/gi,'\ub8e8\ud2b8\x35\x32')
.replace(/route/gi,'\ub8e8\ud2b8')
.replace(/spring/gi,'\uc2a4\ud504\ub9c1')
.replace(/orange/gi,'\uc624\ub80c\uc9c0')
.replace(/smart/gi,'\uc2a4\ub9c8\ud2b8')
.replace(/pine/gi,'\ud30c\uc778')
.replace(/lake/gi,'\ub808\uc774\ud06c')
.replace(/hill/gi,'\ud790')
.replace(/valley/gi,'\ubc38\ub9ac')
.replace(/벨리/g,'\ubc38\ub9ac')
.replace(/골프존카운티/g,'\uace8\ud504\uc874')
.replace(/golfzon/gi,'\uace8\ud504\uc874')
.replace(/안성q/gi,'\uc548\uc131')
.replace(/안성큐/g,'\uc548\uc131')
.replace(/q/gi,'\ud050');
return s.replace(/[^a-z0-9가-힣]/g,'');
}
async function _0x1006(el,customX=null,customY=null){
if(!el)return;
const rect=el.getBoundingClientRect();
const x=customX!==null?customX:(rect.left+rect.width/2);
const y=customY!==null?customY:(rect.top+rect.height/2);
const opts={
bubbles:true,
cancelable:true,
view:window,
clientX:x,
clientY:y,
buttons:1,
pointerId:1,
pointerType:'\x6d\x6f\x75\x73\x65',
isPrimary:true
};
try{
el.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x6f\x76\x65\x72',opts));
el.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x65\x6e\x74\x65\x72',opts));
el.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x64\x6f\x77\x6e',opts));
}catch(e){}
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x65\x6e\x74\x65\x72',opts));
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x6f\x76\x65\x72',opts));
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',opts));
await _0x1001(40);
try{el.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x75\x70',opts));}catch(e){}
el.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',opts));
el.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',opts));
try{el.click();}catch(e){}
}
function _0x1041(cardEl,rawTxt=''){
const text=(rawTxt||cardEl.innerText||cardEl.textContent||'').toLowerCase();
const badgeElements=Array.from(cardEl.querySelectorAll('\x2e\x71-\x62\x61\x64\x67\x65, [\x63\x6c\x61\x73\x73*="\x62\x61\x64\x67\x65"], \x2e\x71-\x63\x68\x69\x70, \x73\x70\x61\x6e, \x64\x69\x76'))
.filter(el=>el.offsetHeight>0&&el.children.length<=1);
let hasTransferBadge=false;
let hasJoinBadge=false;
let hasJoinChip=false;
let hasTransferTag=false;
for(const b of badgeElements){
const bTxt=(b.innerText||b.textContent||'').trim().replace(/\s+/g,'');
if(/^양도\d*건?$/.test(bTxt)||bTxt==='\uc591\ub3c4'){
hasTransferBadge=true;
}
if(/^조인\d*건?$/.test(bTxt)||bTxt==='\uc870\uc778'){
hasJoinBadge=true;
}
if(/부부|커플|[남여]성|[남여]자|무관|\d명/.test(bTxt)){
hasJoinChip=true;
}
if(/4인필수|1팀/.test(bTxt)){
hasTransferTag=true;
}
}
const textHasTransferBadge=/양도\s*\d+\s*건/.test(text);
const textHasJoinBadge=/조인\s*\d+\s*건/.test(text);
const textHasJoinChip=/부부|커플|\d+\s*명|남성|여성|무관/.test(text);
const textHasTransferTag=/4인\s*필수|4인필수/.test(text);
if((hasTransferBadge||textHasTransferBadge)&&!hasJoinBadge&&!textHasJoinBadge)return'\uc591\ub3c4';
if((hasJoinBadge||textHasJoinBadge)&&!hasTransferBadge&&!textHasTransferBadge)return'\uc870\uc778';
const isTransfer=hasTransferBadge||textHasTransferBadge||(hasTransferTag&&!hasJoinBadge&&!hasJoinChip&&!textHasJoinChip);
const isJoin=hasJoinBadge||textHasJoinBadge||hasJoinChip||textHasJoinChip;
if(isTransfer&&!isJoin)return'\uc591\ub3c4';
if(isJoin&&!isTransfer)return'\uc870\uc778';
return isTransfer?'\uc591\ub3c4':(isJoin?'\uc870\uc778':'\x75\x6e\x6b\x6e\x6f\x77\x6e');
}
function _0x1042(normCard,normG1,normG2){
if(!normCard)return 0;
const isClub72Target=(normG1&&normG1.includes('\ud074\ub7fd\x37\x32'))||(normG2&&normG2.includes('\ud074\ub7fd\x37\x32'));
if(isClub72Target){
const targetHasOcean=(normG1&&normG1.includes('\uc624\uc158'))||(normG2&&normG2.includes('\uc624\uc158'));
const cardHasOcean=normCard.includes('\uc624\uc158');
if(targetHasOcean!==cardHasOcean)return 0;
const targetHasHaneul=(normG1&&normG1.includes('\ud558\ub298'))||(normG2&&normG2.includes('\ud558\ub298'));
const cardHasHaneul=normCard.includes('\ud558\ub298');
if(targetHasHaneul!==cardHasHaneul)return 0;
}
if(normG1&&normCard.includes(normG1))return 100;
if(normG2&&normCard.includes(normG2))return 95;
const chainPrefixRegex=/^(골프존|클럽디|한림)/;
const stripped1=(normG1&&chainPrefixRegex.test(normG1))?normG1.replace(chainPrefixRegex,''):'';
const stripped2=(normG2&&chainPrefixRegex.test(normG2))?normG2.replace(chainPrefixRegex,''):'';
const commonGolfWords=/^(스톤|밸리|힐스|레이크|크리크|비치|포레|파크|골프)$/;
if(stripped1&&stripped1.length>=2&&!commonGolfWords.test(stripped1)&&normCard.includes(stripped1)){
return 85;
}
if(stripped2&&stripped2.length>=2&&!commonGolfWords.test(stripped2)&&normCard.includes(stripped2)){
return 80;
}
return 0;
}
function _0x1043(){
const allNodes=Array.from(document.querySelectorAll('\x2e\x71-\x63\x61\x72\x64, [\x63\x6c\x61\x73\x73*="\x71-\x63\x61\x72\x64"], \x2e\x71-\x69\x74\x65\x6d, \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x63\x61\x72\x64"], \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x62\x6f\x72\x64\x65\x72"], \x64\x69\x76'))
.filter(el=>{
if(el.offsetHeight<65||el.offsetHeight>550)return false;
if(el.offsetWidth<120)return false;
if(el.closest('\x2e\x71-\x68\x65\x61\x64\x65\x72, \x68\x65\x61\x64\x65\x72, \x2e\x71-\x74\x6f\x6f\x6c\x62\x61\x72, \x2e\x71-\x66\x6f\x6f\x74\x65\x72, \x66\x6f\x6f\x74\x65\x72, \x2e\x71-\x64\x69\x61\x6c\x6f\x67, [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"]'))return false;
const txt=el.innerText||el.textContent||'';
if(!/\d{1,2}:\d{2}/.test(txt)||!/원/.test(txt))return false;
if(!/(?:조인|양도)\s*\d*\s*건/.test(txt)&&!/진행중|마감|지난티업/.test(txt))return false;
return true;
});
const leafCards=allNodes.filter(item=>{
return!allNodes.some(other=>other!==item&&item.contains(other));
});
const uniqueCardEls=[];
for(const el of leafCards){
let boxEl=el;
let curr=el;
for(let up=0;up<3;up++){
const p=curr.parentElement;
if(!p||p===document.body)break;
const cRect=curr.getBoundingClientRect();
const pRect=p.getBoundingClientRect();
const containsOtherLeaf=leafCards.some(other=>other!==el&&p.contains(other));
if(!containsOtherLeaf&&
Math.abs(pRect.width-cRect.width)<=28&&
Math.abs(pRect.height-cRect.height)<=28&&
p.offsetHeight>=65&&p.offsetHeight<=550){
boxEl=p;
curr=p;
}else{
break;
}
}
const rBox=boxEl.getBoundingClientRect();
const isDup=uniqueCardEls.some(existing=>{
if(existing===boxEl||existing.contains(boxEl)||boxEl.contains(existing))return true;
const rEx=existing.getBoundingClientRect();
return Math.abs(rEx.top-rBox.top)<25&&Math.abs(rEx.left-rBox.left)<25;
});
if(!isDup){
uniqueCardEls.push(boxEl);
}
}
uniqueCardEls.sort((a,b)=>{
const rA=a.getBoundingClientRect();
const rB=b.getBoundingClientRect();
if(Math.abs(rA.top-rB.top)>25)return rA.top-rB.top;
return rA.left-rB.left;
});
return uniqueCardEls;
}
function _0x1044(golfName,rawGolfName,timeStr,targetRoomType='',prevFee='',targetFee=''){
const digitsOnlyTime=(timeStr||'').replace(/[^\d]/g,'');
const hh=digitsOnlyTime.length===4?digitsOnlyTime.substring(0,2):(digitsOnlyTime.length===3?'\x30'+digitsOnlyTime[0]:'');
const mm=digitsOnlyTime.length>=3?digitsOnlyTime.slice(-2):'';
const colonTime=(hh&&mm)?`${hh}:${mm}`:'';
const shortColonTime=(hh&&mm)?`${parseInt(hh,10)}:${mm}`:'';
const normG1=_0x1040(golfName);
const normG2=_0x1040(rawGolfName);
const cleanPrevNum=(prevFee||'').toString().replace(/[^\d.]/g,'');
const cleanTargetNum=(targetFee||'').toString().replace(/[^\d.]/g,'');
const allDivs=_0x1043();
const matched=[];
for(const el of allDivs){
const rawTxt=(el.innerText||el.textContent||'').toLowerCase();
const normCard=_0x1040(rawTxt);
const digitsInCard=rawTxt.replace(/[^\d]/g,'');
const timeMatches=(colonTime&&rawTxt.includes(colonTime))||
(shortColonTime&&rawTxt.includes(shortColonTime))||
(digitsOnlyTime&&digitsInCard.includes(digitsOnlyTime));
if(!timeMatches)continue;
const golfScore=_0x1042(normCard,normG1,normG2);
if(golfScore<90)continue;
const isTargetTransfer=(targetRoomType||'').includes('\uc591\ub3c4');
const isTargetJoin=(targetRoomType||'').includes('\uc870\uc778')||
(targetRoomType||'').includes('\uc120\ud2f0')||
(targetRoomType||'').includes('\ub300\uae30');
const cardType=_0x1041(el,rawTxt);
if(isTargetTransfer){
if(cardType==='\uc870\uc778')continue;
}else if(isTargetJoin){
if(cardType==='\uc591\ub3c4')continue;
}
let roomScore=0;
if(isTargetTransfer&&cardType==='\uc591\ub3c4'){
roomScore=150;
}else if(isTargetJoin&&cardType==='\uc870\uc778'){
roomScore=150;
}
let feeScore=0;
if(cleanPrevNum&&(rawTxt.includes(`${cleanPrevNum}\ub9cc`)||rawTxt.includes(`${Math.round(parseFloat(cleanPrevNum)*10000)}`))){
feeScore+=25;
}
if(cleanTargetNum&&(rawTxt.includes(`${cleanTargetNum}\ub9cc`)||rawTxt.includes(`${Math.round(parseFloat(cleanTargetNum)*10000)}`))){
feeScore-=20;
}
matched.push({el,totalScore:golfScore+roomScore+feeScore});
}
if(matched.length===0)return null;
const leafCards=matched.filter(item=>{
return!matched.some(other=>other!==item&&item.el.contains(other.el));
});
const candidates=leafCards.length>0?leafCards:matched;
candidates.sort((a,b)=>b.totalScore-a.totalScore);
return candidates[0].el;
}
function _0x1045(cardEl){
if(!cardEl)return'';
const rawTxt=(cardEl.innerText||cardEl.textContent||'').trim();
const lines=rawTxt.split('\n').map(l=>l.trim()).filter(Boolean);
for(const line of lines){
if(/^\d+$/.test(line))continue;
if(/^\d{1,2}:\d{2}/.test(line))continue;
if(/^\d{1,2}[./\-]\d{1,2}/.test(line))continue;
if(/^[0-9.,]+(?:만|만원|원)/.test(line))continue;
if(/^(?:진행중|마감|완료|대기|삭제)$/.test(line))continue;
if(/^(?:양도|조인)\s*\d*건?$/.test(line))continue;
if(/^(?:부부|커플|\d+인|\d+명|무관|남성|여성|남자|여자)/.test(line))continue;
if(/^(?:노캐디|캐디|운전캐디|마샬캐디|\d+\s*홀)$/.test(line))continue;
if((line.includes('\uc218\uc815')||line.includes('\ub4f1\ub85d'))&&(line.includes('\x2f')||line.includes('\x3a')||line.includes('\x2e')))continue;
let cleaned=line
.replace(/진행중|마감|완료/g,'')
.replace(/\d{1,2}[./\-]\d{1,2}\s*(?:\([가-힣]\))?/g,'')
.replace(/\d{1,2}:\d{2}/g,'')
.replace(/양도\s*\d*건?|조인\s*\d*건?/g,'')
.replace(/[0-9.,]+(?:만|만원|원)/g,'')
.replace(/부부|커플|\d+인|\d+명|무관|남자|여자|남성|여성/g,'')
.replace(/노캐디|운전캐디|마샬캐디|캐디|\d+\s*홀/g,'')
.replace(/등록\.?|수정\.?/g,'')
.replace(/[\r\n\t]+/g,' ')
.trim();
if(cleaned.length>=2&&cleaned.length<=25&&!/^\d+$/.test(cleaned)){
return cleaned;
}
}
return'';
}
function _0x1046(targetRoomType='',targetDateStr=''){
if(targetDateStr&&!_0x1039(targetDateStr)){
return[];
}
const leafCandidates=_0x1043();
const list=[];
for(const el of leafCandidates){
const rawTxt=(el.innerText||el.textContent||'').trim();
const postType=_0x1041(el,rawTxt);
if(targetRoomType==='\uc591\ub3c4'&&postType==='\uc870\uc778')continue;
if(targetRoomType==='\uc870\uc778'&&postType==='\uc591\ub3c4')continue;
if(targetDateStr){
const targetM=_0x1030(targetDateStr);
const targetD=_0x102f(targetDateStr);
if(targetD){
const allDateMatches=Array.from(rawTxt.matchAll(/(?:^|[^\d])(\d{1,2})[./\-](\d{1,2})(?:\([월화수목금토일]\))?\s*\d{1,2}:\d{2}/g));
const teeDateMatches=allDateMatches.filter(m=>{
const idx=m.index;
const before=rawTxt.substring(Math.max(0,idx-20),idx);
return!/수정|등록|작성|접수/.test(before);
});
const dateAttachedMatch=teeDateMatches.length>0?teeDateMatches[0]:allDateMatches[0];
if(dateAttachedMatch){
const cardM=parseInt(dateAttachedMatch[1],10).toString();
const cardD=parseInt(dateAttachedMatch[2],10).toString();
if(cardD!==targetD||(targetM&&cardM!==targetM)){
continue;
}
}
}
}
const courseName=_0x1045(el);
const teeTime=typeof extractTeeTimeFromResetCard==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'?extractTeeTimeFromResetCard(rawTxt):'';
const timeMatch=rawTxt.match(/(\d{1,2}:\d{2})/);
const timeStr=teeTime||(timeMatch?timeMatch[1]:'');
const feeMatch=rawTxt.match(/([0-9.,]+)\s*(?:만|만원|원)/);
const feeStr=feeMatch?feeMatch[0]:'';
list.push({
el:el,
courseName:courseName||'\uad6c\uc7a5\uba85 \ubbf8\ud655\uc778',
timeStr:timeStr,
feeStr:feeStr,
postType:postType,
rawTxt:rawTxt
});
}
return list;
}
async function _0x1047(rawGolf,golfmonName){
if(!rawGolf||!golfmonName)return;
try{
const res=await new Promise(r=>chrome.storage.local.get(['\x76\x32\x5f\x67\x6f\x6c\x66\x44\x69\x63\x74'],r));
let dict=(res&&res.v2_golfDict&&typeof res.v2_golfDict==='\x6f\x62\x6a\x65\x63\x74')?res.v2_golfDict:{};
const cleanRaw=rawGolf.trim();
const cleanGm=golfmonName.trim();
const existing=dict[cleanRaw]||{};
dict[cleanRaw]={
region:existing.region||'',
golfmon:cleanGm,
golfpang:existing.golfpang||cleanGm,
golmarket:existing.golmarket||cleanGm,
golfrock:existing.golfrock||cleanGm,
golfland:existing.golfland||cleanGm,
name:cleanGm
};
await new Promise(r=>chrome.storage.local.set({v2_golfDict:dict},r));
console.log(`[\ub9e4\uce6d\uc0ac\uc804] \uc800\uc7a5 \uc644\ub8cc: '${cleanRaw}' \u2794 '${cleanGm}'`);
}catch(e){
console.error("[\ub9e4\uce6d\uc0ac\uc804] \uc800\uc7a5 \uc911 \uc624\ub958\x3a",e);
}
}
function _0x1048({mode,rawGolf,targetGolf,date,time,fee,sizenum,roomType,cardsOnScreen}){
return new Promise((resolve)=>{
const existingModal=document.getElementById('\x71-\x64\x69\x61\x6c\x6f\x67-\x63\x6f\x75\x72\x73\x65-\x76\x65\x72\x69\x66\x79');
if(existingModal)existingModal.remove();
const overlay=document.createElement('\x64\x69\x76');
overlay.id='\x71-\x64\x69\x61\x6c\x6f\x67-\x63\x6f\x75\x72\x73\x65-\x76\x65\x72\x69\x66\x79';
overlay.style.cssText=`
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(4px);
            z-index: 99999999; display: flex; align-items: center; justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans KR", sans-serif;
            box-sizing: border-box; padding: 16px;
        `;
const escapeStr=(s)=>(s||'').replace(/&/g,'&\x61\x6d\x70;').replace(/</g,'&\x6c\x74;').replace(/>/g,'&\x67\x74;').replace(/"/g,'&\x71\x75\x6f\x74;');
const uniqueCourses=[];
const seen=new Set();
(cardsOnScreen||[]).forEach(c=>{
const cn=(c.courseName||'').trim();
if(cn&&!seen.has(cn)&&cn!=='\uad6c\uc7a5\uba85 \ubbf8\ud655\uc778'){
seen.add(cn);
uniqueCourses.push({
courseName:cn,
postType:c.postType||'',
timeStr:c.timeStr||'',
feeStr:c.feeStr||''
});
}
});
let cardsHtml='';
if((cardsOnScreen||[]).length>0){
cardsHtml=cardsOnScreen.slice(0,10).map((cand,idx)=>{
const isSelected=idx===0;
return`
                    <label class="q-verify-cand-item" style="display: flex; align-items: center; gap: 8px; padding: 7px 10px; margin-bottom: 5px; background: #F8FAFC; border: 1.5px solid ${isSelected?'\x23\x36\x33\x36\x36\x46\x31':'\x23\x45\x32\x45\x38\x46\x30'}; border-radius: 6px; cursor: pointer; transition: all 0.15s ease;">
                        <input type="radio" name="q_cand_radio" value="${escapeStr(cand.courseName)}" ${isSelected?'\x63\x68\x65\x63\x6b\x65\x64':''} style="margin: 0; cursor: pointer; accent-color: #6366F1;">
                        <span style="font-size: 9.5px; font-weight: 700; padding: 1.5px 5px; border-radius: 4px; background: ${cand.postType==='\uc591\ub3c4'?'\x23\x46\x45\x46\x33\x43\x37':'\x23\x44\x43\x46\x43\x45\x37'}; color: ${cand.postType==='\uc591\ub3c4'?'\x23\x42\x34\x35\x33\x30\x39':'\x23\x31\x36\x36\x35\x33\x34'};">${cand.postType||'\uc870\uc778'}</span>
                        <span style="font-size: 11.5px; font-weight: 700; color: #1E293B; flex: 1;">${escapeStr(cand.courseName)}</span>
                        <span style="font-size: 10.5px; color: #64748B; font-weight: 600;">\u23f0 ${escapeStr(cand.timeStr||'-')}</span>
                        <span style="font-size: 10.5px; color: #047857; font-weight: 700;">\ud83d\udcb5 ${escapeStr(cand.feeStr||'-')}</span>
                    </label>
                `;
}).join('');
}else{
cardsHtml=`<div style="padding: 12px; text-align: center; color: #94A3B8; font-size: 11px;">\ud604\uc7ac \uace8\ud504\ubaac \ud654\uba74\uc5d0 \ub4f1\ub85d\ub41c \uae00 \uce74\ub4dc\uac00 \uc5c6\uc2b5\ub2c8\ub2e4.</div>`;
}
const defaultSelectedName=(uniqueCourses.length>0)?uniqueCourses[0].courseName:targetGolf;
overlay.innerHTML=`
            <div style="background: white; width: 480px; max-width: 96vw; max-height: 92vh; border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.4); border: 2px solid #F59E0B; overflow: hidden; display: flex; flex-direction: column;">
                <div style="background: linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%); padding: 12px 16px; border-bottom: 1px solid #FDE68A; display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 18px;">\u26a0\ufe0f</span>
                        <div>
                            <div style="font-size: 13px; font-weight: 800; color: #B45309;">\uad6c\uc7a5\uba85 \ud655\uc778 (\ub2e4\ub978 \uad6c\uc7a5 \uc624\ub4f1\ub85d \ubc29\uc9c0)</div>
                            <div style="font-size: 10px; color: #92400E; margin-top: 1px;">\uace8\ud504\ubaac\uc5d0 \ub4f1\ub85d\ub41c \uae00 \uc911 \ub300\uc0c1 \uad6c\uc7a5\uacfc \uc815\ud655\ud788 \uc77c\uce58\ud558\ub294 \uce74\ub4dc\ub97c \ucc3e\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4.</div>
                        </div>
                    </div>
                </div>

                <div style="padding: 14px 16px; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 10px;">
                    <div style="background: #EEF2FF; border: 1px solid #C7D2FE; border-radius: 8px; padding: 10px 12px; font-size: 11px; line-height: 1.45;">
                        <div style="font-weight: 700; color: #3730A3; margin-bottom: 4px; display: flex; align-items: center; gap: 4px;">
                            <span>\ud83c\udfaf \uc218\uc815\ud558\ub824\ub294 \ud2f0\ud0c0\uc784 \ub370\uc774\ud130</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                            <span style="color: #4B5563;">\uc6d0\ubcf8 \uad6c\uc7a5\uba85: <strong style="color: #4338CA;">${escapeStr(rawGolf||'-')}</strong></span>
                            <span style="color: #4B5563;">\ud604\uc7ac \ubcc0\ud658\uba85: <strong style="color: #1E1B4B;">${escapeStr(targetGolf||'-')}</strong></span>
                        </div>
                        <div style="display: flex; justify-content: space-between; color: #4B5563;">
                            <span>\uc77c\uc2dc: <strong>${escapeStr(date||'')} ${escapeStr(time||'')}</strong> (${escapeStr(roomType||'\uc870\uc778')})</span>
                            <span>\uadf8\ub9b0\ud53c: <strong style="color: #047857;">${escapeStr(fee||'')}\ub9cc</strong> / ${escapeStr(sizenum||'\x34\uc778')}</span>
                        </div>
                    </div>

                    <div>
                        <div style="font-size: 11px; font-weight: 700; color: #1E293B; margin-bottom: 6px; display: flex; justify-content: space-between; align-items: center;">
                            <span>\ud83d\udccb \ud604\uc7ac \uace8\ud504\ubaac\uc5d0 \ub4f1\ub85d\ub41c \uae00 (${(cardsOnScreen||[]).length}\uac74):</span>
                            <span style="font-size: 9.5px; color: #64748B;">\uc218\uc815\ud560 \ub300\uc0c1\uc744 \ud074\ub9ad\ud558\uc138\uc694</span>
                        </div>
                        <div id="q-verify-cand-list" style="max-height: 160px; overflow-y: auto; border: 1px solid #E2E8F0; border-radius: 8px; padding: 6px;">
                            ${cardsHtml}
                        </div>
                    </div>

                    <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 8px; padding: 10px 12px;">
                        <label style="font-size: 10.5px; font-weight: 700; color: #334155; display: block; margin-bottom: 4px;">
                            \ub9e4\uce6d\ud560 \uace8\ud504\ubaac \uad6c\uc7a5\uba85:
                        </label>
                        <input type="text" id="q-verify-name-input" value="${escapeStr(defaultSelectedName)}" style="width: 100%; box-sizing: border-box; font-size: 12px; font-weight: 700; padding: 6px 8px; border: 1.5px solid #6366F1; border-radius: 5px; outline: none; font-family: inherit; color: #1E1B4B;">
                        <label style="display: flex; align-items: center; gap: 5px; margin-top: 6px; font-size: 10px; color: #4F46E5; font-weight: 600; cursor: pointer;">
                            <input type="checkbox" id="q-verify-save-dict" checked style="accent-color: #6366F1; cursor: pointer;">
                            <span>\uc774 \uc774\ub984\uc744 \ub9e4\uce6d\uc0ac\uc804\uc5d0 \uc601\uad6c \uc800\uc7a5\ud558\uae30 (\ub2e4\uc74c\ubd80\ud130 \uc790\ub3d9 \ub9e4\ud551)</span>
                        </label>
                    </div>
                </div>

                <div style="padding: 10px 16px; background: #F8FAFC; border-top: 1px solid #E2E8F0; display: flex; gap: 6px; justify-content: flex-end;">
                    <button type="button" id="btnVerifyDialogStop" style="background: #EF4444; color: white; border: none; padding: 6px 12px; border-radius: 5px; font-size: 10.5px; font-weight: 700; cursor: pointer;">
                        \ud83d\uded1 \uc791\uc5c5 \uc911\ub2e8
                    </button>
                    <button type="button" id="btnVerifyDialogSkip" style="background: #64748B; color: white; border: none; padding: 6px 12px; border-radius: 5px; font-size: 10.5px; font-weight: 700; cursor: pointer;">
                        \u23ed\ufe0f \uac74\ub108\ub6f0\uae30
                    </button>
                    <button type="button" id="btnVerifyDialogConfirm" style="background: #4F46E5; color: white; border: none; padding: 6px 16px; border-radius: 5px; font-size: 11px; font-weight: 800; cursor: pointer; box-shadow: 0 2px 4px rgba(79, 70, 229, 0.25);">
                        \u2705 \uc774 \uad6c\uc7a5\uc73c\ub85c \uc218\uc815 \uc9c4\ud589
                    </button>
                </div>
            </div>
        `;
document.body.appendChild(overlay);
const nameInput=overlay.querySelector('\x23\x71-\x76\x65\x72\x69\x66\x79-\x6e\x61\x6d\x65-\x69\x6e\x70\x75\x74');
const saveDictChk=overlay.querySelector('\x23\x71-\x76\x65\x72\x69\x66\x79-\x73\x61\x76\x65-\x64\x69\x63\x74');
const candRadios=overlay.querySelectorAll('\x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65="\x71\x5f\x63\x61\x6e\x64\x5f\x72\x61\x64\x69\x6f"]');
candRadios.forEach(radio=>{
radio.closest('\x6c\x61\x62\x65\x6c')?.addEventListener('\x63\x6c\x69\x63\x6b',()=>{
nameInput.value=radio.value;
overlay.querySelectorAll('\x2e\x71-\x76\x65\x72\x69\x66\x79-\x63\x61\x6e\x64-\x69\x74\x65\x6d').forEach(item=>{
item.style.borderColor='\x23\x45\x32\x45\x38\x46\x30';
});
radio.closest('\x6c\x61\x62\x65\x6c').style.borderColor='\x23\x36\x33\x36\x36\x46\x31';
});
});
overlay.querySelector('\x23\x62\x74\x6e\x56\x65\x72\x69\x66\x79\x44\x69\x61\x6c\x6f\x67\x43\x6f\x6e\x66\x69\x72\x6d')?.addEventListener('\x63\x6c\x69\x63\x6b',()=>{
const confirmedName=(nameInput.value||'').trim();
if(!confirmedName){
alert('\ub9e4\uce6d\ud560 \uace8\ud504\ubaac \uad6c\uc7a5\uba85\uc744 \uc785\ub825\ud574\uc8fc\uc138\uc694\x2e');
nameInput.focus();
return;
}
const saveToDict=saveDictChk?saveDictChk.checked:true;
overlay.remove();
resolve({
action:'\x70\x72\x6f\x63\x65\x65\x64',
confirmedGolfName:confirmedName,
saveToDict:saveToDict
});
});
overlay.querySelector('\x23\x62\x74\x6e\x56\x65\x72\x69\x66\x79\x44\x69\x61\x6c\x6f\x67\x4e\x65\x77')?.addEventListener('\x63\x6c\x69\x63\x6b',()=>{
overlay.remove();
resolve({action:'\x72\x65\x67\x69\x73\x74\x65\x72\x5f\x6e\x65\x77'});
});
overlay.querySelector('\x23\x62\x74\x6e\x56\x65\x72\x69\x66\x79\x44\x69\x61\x6c\x6f\x67\x53\x6b\x69\x70')?.addEventListener('\x63\x6c\x69\x63\x6b',()=>{
const skipName=(nameInput.value||'').trim();
const skipSaveDict=saveDictChk?saveDictChk.checked:false;
overlay.remove();
resolve({action:'\x73\x6b\x69\x70',confirmedGolfName:skipName,saveToDict:skipSaveDict});
});
overlay.querySelector('\x23\x62\x74\x6e\x56\x65\x72\x69\x66\x79\x44\x69\x61\x6c\x6f\x67\x53\x74\x6f\x70')?.addEventListener('\x63\x6c\x69\x63\x6b',()=>{
overlay.remove();
resolve({action:'\x73\x74\x6f\x70'});
});
});
}
function isEditPage(){
const curUrl=window.location.href.toLowerCase();
if(curUrl.includes('\x2f\x6f\x76\x65\x72\x77\x72\x69\x74\x65')||curUrl.includes('\x2f\x6a\x6f\x69\x6e\x77\x72\x69\x74\x65')||curUrl.includes('\x2f\x65\x64\x69\x74')||curUrl.includes('\x2f\x6d\x6f\x64\x69\x66\x79'))return true;
const headerEl=document.querySelector('\x2e\x71-\x68\x65\x61\x64\x65\x72, \x68\x65\x61\x64\x65\x72, \x2e\x71-\x74\x6f\x6f\x6c\x62\x61\x72');
const hTxt=(headerEl?headerEl.textContent:'').replace(/\s+/g,'');
if(hTxt.includes('\uc218\uc815')&&(hTxt.includes('\uc591\ub3c4')||hTxt.includes('\uc870\uc778')))return true;
return Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x64\x69\x76, \x73\x70\x61\x6e'))
.some(el=>{
if(el.offsetHeight<=0)return false;
const r=el.getBoundingClientRect();
if(r.top<80)return false;
const txt=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
return txt==='\uc218\uc815\ud558\uae30'||txt==='\uc218\uc815\uc644\ub8cc';
});
}
function detectCurrentDetailPageType(){
const headerEls=Array.from(document.querySelectorAll('\x2e\x71-\x68\x65\x61\x64\x65\x72, \x68\x65\x61\x64\x65\x72, \x2e\x71-\x74\x6f\x6f\x6c\x62\x61\x72, [\x63\x6c\x61\x73\x73*="\x68\x65\x61\x64\x65\x72"], [\x63\x6c\x61\x73\x73*="\x74\x6f\x6f\x6c\x62\x61\x72"]'))
.filter(el=>el.offsetHeight>0&&el.getBoundingClientRect().top<=90);
for(const h of headerEls){
const hTxt=(h.innerText||h.textContent||'').trim().replace(/\s+/g,'');
if(hTxt.includes('\ub4f1\ub85d\uc0c1\ud488\ub0b4\uc5ed'))continue;
if(hTxt.includes('\uc591\ub3c4')&&!hTxt.includes('\uc870\uc778'))return'\uc591\ub3c4';
if(hTxt.includes('\uc870\uc778')&&!hTxt.includes('\uc591\ub3c4'))return'\uc870\uc778';
}
const topEls=Array.from(document.querySelectorAll('\x64\x69\x76, \x73\x70\x61\x6e'))
.filter(el=>el.offsetHeight>0&&el.getBoundingClientRect().top<=85&&el.children.length<=2);
for(const el of topEls){
const t=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
if(t.endsWith('\uc591\ub3c4')&&!t.includes('\uc870\uc778'))return'\uc591\ub3c4';
if(t.endsWith('\uc870\uc778')&&!t.includes('\uc591\ub3c4'))return'\uc870\uc778';
}
return'';
}
function detectCurrentEditPageType(){
const curUrl=window.location.href.toLowerCase();
if(curUrl.includes('\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x2f\x6f\x76\x65\x72\x77\x72\x69\x74\x65')||curUrl.includes('\x2f\x6f\x76\x65\x72\x77\x72\x69\x74\x65'))return'\uc591\ub3c4';
if(curUrl.includes('\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x2f\x6a\x6f\x69\x6e\x77\x72\x69\x74\x65')||curUrl.includes('\x2f\x6a\x6f\x69\x6e\x77\x72\x69\x74\x65'))return'\uc870\uc778';
const topEls=Array.from(document.querySelectorAll('\x2e\x71-\x68\x65\x61\x64\x65\x72, \x68\x65\x61\x64\x65\x72, \x2e\x71-\x74\x6f\x6f\x6c\x62\x61\x72, \x64\x69\x76, \x73\x70\x61\x6e'))
.filter(el=>el.offsetHeight>0&&el.getBoundingClientRect().top<=140);
for(const el of topEls){
const t=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
if(t==='\uc591\ub3c4\uc218\uc815'||t==='\uc591\ub3c4\uc0c1\uc138'||t.includes('\uc591\ub3c4\uc218\uc815'))return'\uc591\ub3c4';
if(t==='\uc870\uc778\uc218\uc815'||t==='\uc870\uc778\uc0c1\uc138'||t.includes('\uc870\uc778\uc218\uc815'))return'\uc870\uc778';
}
const bodyTxt=(document.body.innerText||'').replace(/\s+/g,'');
if(bodyTxt.includes('\uc591\ub3c4\uc218\uc815'))return'\uc591\ub3c4';
if(bodyTxt.includes('\uc870\uc778\uc218\uc815')||bodyTxt.includes('\uc870\uc778\uc870\uac74\uc744\uc120\ud0dd\ud558\uc138\uc694')||bodyTxt.includes('\uc694\uccad\uc778\uc6d0\uc744\uc120\ud0dd\ud558\uc138\uc694'))return'\uc870\uc778';
if(bodyTxt.includes('\uc591\ub3c4\uc778'))return'\uc591\ub3c4';
return detectCurrentDetailPageType();
}
async function ensureCorrectEditRouteAndType(expectedCategory='\uc591\ub3c4',maxWaitMs=1500){
const curUrl=window.location.href;
const idMatch=curUrl.match(/[?&]id=(\d+)/);
const postId=idMatch?idMatch[1]:'';
if(expectedCategory==='\uc591\ub3c4'&&curUrl.toLowerCase().includes('\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x2f\x6a\x6f\x69\x6e\x77\x72\x69\x74\x65')&&postId){
const targetOverwriteUrl=curUrl.replace(/\/booking\/joinwrite/i,'\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x2f\x6f\x76\x65\x72\x77\x72\x69\x74\x65');
console.log(`[\uc218\uc815\ub77c\uc6b0\ud2b8\ubcf4\uc815] \ud83d\udd04 \uc591\ub3c4 \uc218\uc815 \ubaa9\ud45c\uc778\ub370 '/booking/joinwrite?id=${postId}'(\uc870\uc778 \uc218\uc815)\uac00 \uc5f4\ub838\uc2b5\ub2c8\ub2e4 -> \uc815\uc0c1 \uc591\ub3c4 \uc218\uc815 \uc8fc\uc18c('/booking/overwrite?id=${postId}')\ub85c SPA \ub77c\uc6b0\ud130 \uc804\ud658\ud558\uc5ec \uc218\uc815\uc744 \uacc4\uc18d \uc9c4\ud589\ud569\ub2c8\ub2e4!`);
try{
window.history.replaceState(window.history.state,'',targetOverwriteUrl);
window.dispatchEvent(new PopStateEvent('\x70\x6f\x70\x73\x74\x61\x74\x65',{state:window.history.state}));
}catch(e){}
await _0x1001(600);
}else if(expectedCategory==='\uc870\uc778'&&curUrl.toLowerCase().includes('\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x2f\x6f\x76\x65\x72\x77\x72\x69\x74\x65')&&postId){
const targetJoinwriteUrl=curUrl.replace(/\/booking\/overwrite/i,'\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x2f\x6a\x6f\x69\x6e\x77\x72\x69\x74\x65');
console.log(`[\uc218\uc815\ub77c\uc6b0\ud2b8\ubcf4\uc815] \ud83d\udd04 \uc870\uc778 \uc218\uc815 \ubaa9\ud45c\uc778\ub370 '/booking/overwrite?id=${postId}'(\uc591\ub3c4 \uc218\uc815)\uac00 \uc5f4\ub838\uc2b5\ub2c8\ub2e4 -> \uc815\uc0c1 \uc870\uc778 \uc218\uc815 \uc8fc\uc18c('/booking/joinwrite?id=${postId}')\ub85c SPA \ub77c\uc6b0\ud130 \uc804\ud658\ud569\ub2c8\ub2e4!`);
try{
window.history.replaceState(window.history.state,'',targetJoinwriteUrl);
window.dispatchEvent(new PopStateEvent('\x70\x6f\x70\x73\x74\x61\x74\x65',{state:window.history.state}));
}catch(e){}
await _0x1001(600);
}
const loops=Math.max(1,Math.ceil(maxWaitMs/100));
for(let i=0;i<loops;i++){
const nowType=detectCurrentEditPageType();
const hasLoadedInput=Array.from(document.querySelectorAll('\x69\x6e\x70\x75\x74')).some(inp=>(inp.value||'').trim().length>=3);
if(expectedCategory&&nowType===expectedCategory&&hasLoadedInput){
return nowType;
}
await _0x1001(100);
}
return detectCurrentEditPageType();
}
function isCurrentlyOnTargetEditPage(item){
if(!isEditPage()||!item)return false;
const bodyText=(document.body.innerText||'').toLowerCase();
const timeDigits=(item.time||'').replace(/[^\d]/g,'');
const timeInputs=Array.from(document.querySelectorAll('\x69\x6e\x70\x75\x74')).map(inp=>(inp.value||'').replace(/[^\d]/g,''));
const timeInputMatched=Boolean(timeDigits&&timeInputs.some(v=>v===timeDigits||v.includes(timeDigits)));
const normGolf=_0x1040(item.golf);
const rawGolf=_0x1040(item.rawGolf);
const normBody=_0x1040(bodyText);
const golfMatched=Boolean((normGolf&&normBody.includes(normGolf))||(rawGolf&&normBody.includes(rawGolf)));
const timeMatched=Boolean(timeInputMatched||(timeDigits&&bodyText.replace(/[^\d]/g,'').includes(timeDigits)));
return Boolean(golfMatched&&timeMatched);
}
function isNavigationOrShareElement(el){
if(!el)return false;
const txt=(el.innerText||el.textContent||'').trim().toLowerCase();
const aria=(el.getAttribute('\x61\x72\x69\x61-\x6c\x61\x62\x65\x6c')||el.getAttribute('\x6e\x61\x6d\x65')||el.dataset?.icon||'').toLowerCase();
const cls=(el.className&&typeof el.className==='\x73\x74\x72\x69\x6e\x67')?el.className.toLowerCase():'';
const badWords=['\x6e\x65\x61\x72\x5f\x6d\x65','\x64\x69\x72\x65\x63\x74\x69\x6f\x6e\x73','\x6e\x61\x76\x69\x67\x61\x74\x69\x6f\x6e','\x70\x6c\x61\x63\x65','\x6d\x61\x70','\x73\x68\x61\x72\x65','\x73\x65\x6e\x64','\x61\x72\x72\x6f\x77','\x63\x6f\x6d\x70\x61\x73\x73','\x74\x75\x72\x6e','\x72\x6f\x75\x74\x65','\x61\x6c\x74\x5f\x72\x6f\x75\x74\x65'];
if(badWords.some(w=>txt.includes(w)||aria.includes(w)||cls.includes(w))){
return true;
}
const parent=el.closest('\x64\x69\x76, \x70');
if(parent){
const pTxt=(parent.innerText||parent.textContent||'').trim();
if((pTxt.includes('\x6b\x6d')||pTxt.includes('\ub85c ')||pTxt.includes('\uae38 ')||pTxt.includes('\ucda9\ub0a8')||pTxt.includes('\uacbd\uae30'))&&pTxt.length>10){
return true;
}
}
return false;
}
function findDetailMoreButton(){
const winWidth=window.innerWidth||document.documentElement.clientWidth||450;
const headerBtns=Array.from(document.querySelectorAll('\x2e\x71-\x68\x65\x61\x64\x65\x72 \x62\x75\x74\x74\x6f\x6e, \x68\x65\x61\x64\x65\x72 \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x74\x6f\x6f\x6c\x62\x61\x72 \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x68\x65\x61\x64\x65\x72 \x2e\x71-\x62\x74\x6e, \x68\x65\x61\x64\x65\x72 \x2e\x71-\x62\x74\x6e, \x2e\x71-\x74\x6f\x6f\x6c\x62\x61\x72 \x2e\x71-\x62\x74\x6e'))
.filter(b=>{
if(b.offsetHeight<=0||b.offsetWidth<=0)return false;
const r=b.getBoundingClientRect();
if(r.width>75||r.height>75||r.width<15||r.height<15)return false;
if(r.top>75||r.top<-10)return false;
if(r.left<winWidth*0.5)return false;
if(isNavigationOrShareElement(b))return false;
return true;
});
if(headerBtns.length>0){
const moreBtn=headerBtns.find(b=>{
const t=(b.innerText||b.textContent||'').trim().toLowerCase();
const a=(b.getAttribute('\x61\x72\x69\x61-\x6c\x61\x62\x65\x6c')||b.getAttribute('\x6e\x61\x6d\x65')||b.dataset?.icon||'').toLowerCase();
const cls=(b.className&&typeof b.className==='\x73\x74\x72\x69\x6e\x67')?b.className.toLowerCase():'';
return t==='\x6d\x6f\x72\x65\x5f\x76\x65\x72\x74'||t==='\x6d\x6f\x72\x65'||t==='\u22ee'||t==='\ue5d4'||t==='\ufe19'||
t.includes('\x6d\x6f\x72\x65\x5f\x76\x65\x72\x74')||a.includes('\x6d\x6f\x72\x65')||a.includes('\ub354\ubcf4\uae30')||cls.includes('\x6d\x6f\x72\x65\x5f\x76\x65\x72\x74');
});
if(moreBtn)return moreBtn;
headerBtns.sort((a,b)=>b.getBoundingClientRect().right-a.getBoundingClientRect().right);
return headerBtns[0];
}
const topBarProbePoints=[
{x:winWidth-25,y:28},
{x:winWidth-35,y:28},
{x:winWidth-18,y:32},
{x:winWidth-45,y:28},
{x:winWidth-25,y:40}
];
for(const pt of topBarProbePoints){
const el=document.elementFromPoint(pt.x,pt.y);
if(el&&el!==document.body&&el!==document.documentElement){
const btn=el.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||el;
if(btn&&btn.offsetHeight>0){
const tag=btn.tagName.toUpperCase();
if(tag==='\x48\x45\x41\x44\x45\x52'||tag==='\x4d\x41\x49\x4e'||tag==='\x53\x45\x43\x54\x49\x4f\x4e'||tag==='\x4e\x41\x56')continue;
const r=btn.getBoundingClientRect();
if(r.width>75||r.height>75||r.width<15||r.height<15)continue;
if(r.top<=75&&r.left>=winWidth*0.5&&!isNavigationOrShareElement(btn)){
return btn;
}
}
}
}
const allMoreIcons=Array.from(document.querySelectorAll('\x69, \x2e\x71-\x69\x63\x6f\x6e, \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x73\x70\x61\x6e'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const r=el.getBoundingClientRect();
if(r.top>75||r.width>75||r.height>75)return false;
if(r.left<winWidth*0.5)return false;
if(isNavigationOrShareElement(el))return false;
const t=(el.innerText||el.textContent||'').trim().toLowerCase();
const a=(el.getAttribute('\x61\x72\x69\x61-\x6c\x61\x62\x65\x6c')||'').toLowerCase();
const cls=(el.className&&typeof el.className==='\x73\x74\x72\x69\x6e\x67')?el.className.toLowerCase():'';
return t==='\x6d\x6f\x72\x65\x5f\x76\x65\x72\x74'||t==='\u22ee'||t==='\ue5d4'||t==='\ufe19'||
t.includes('\x6d\x6f\x72\x65\x5f\x76\x65\x72\x74')||a.includes('\x6d\x6f\x72\x65')||a.includes('\ub354\ubcf4\uae30')||cls.includes('\x6d\x6f\x72\x65\x5f\x76\x65\x72\x74');
});
if(allMoreIcons.length>0){
const directBtn=allMoreIcons[0].closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]');
if(directBtn){
const dr=directBtn.getBoundingClientRect();
if(dr.width<=75&&dr.height<=75)return directBtn;
}
return allMoreIcons[0];
}
return null;
}
function findMenuEditItem(){
const menuContainers=Array.from(document.querySelectorAll('\x2e\x71-\x6d\x65\x6e\x75, [\x72\x6f\x6c\x65="\x6d\x65\x6e\x75"], \x2e\x71-\x70\x6f\x72\x74\x61\x6c'))
.filter(el=>el.offsetHeight>0);
for(const menu of menuContainers){
const exactItems=Array.from(menu.querySelectorAll('\x2e\x71-\x69\x74\x65\x6d, [\x72\x6f\x6c\x65="\x6d\x65\x6e\x75\x69\x74\x65\x6d"], \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x64\x69\x76, \x73\x70\x61\x6e'))
.filter(el=>{
if(el.offsetHeight<=0)return false;
const txt=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
return txt==='\uc218\uc815'||txt==='\uc218\uc815\ud558\uae30';
});
if(exactItems.length>0){
exactItems.sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length);
const leaf=exactItems[0];
return leaf.closest('\x2e\x71-\x69\x74\x65\x6d, [\x72\x6f\x6c\x65="\x6d\x65\x6e\x75\x69\x74\x65\x6d"], \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e')||leaf;
}
}
const allCandidates=Array.from(document.querySelectorAll('\x2e\x71-\x69\x74\x65\x6d, [\x72\x6f\x6c\x65="\x6d\x65\x6e\x75\x69\x74\x65\x6d"], \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72, \x64\x69\x76, \x73\x70\x61\x6e'))
.filter(el=>{
if(el.offsetHeight<=0)return false;
const r=el.getBoundingClientRect();
if(r.top<0||r.bottom>280)return false;
const txt=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
return txt==='\uc218\uc815'||txt==='\uc218\uc815\ud558\uae30';
});
if(allCandidates.length>0){
allCandidates.sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length);
const leaf=allCandidates[0];
return leaf.closest('\x2e\x71-\x69\x74\x65\x6d, [\x72\x6f\x6c\x65="\x6d\x65\x6e\x75\x69\x74\x65\x6d"], \x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72')||leaf;
}
return null;
}
function isDetailPage(){
if(isEditPage())return false;
const curUrl=window.location.href.toLowerCase();
if(curUrl.includes('\x2f\x6d\x79\x70\x61\x67\x65')||curUrl.includes('\x2f\x6d\x79-\x70\x61\x67\x65')||curUrl.includes('\x2f\x70\x72\x6f\x64\x75\x63\x74\x2f\x6c\x69\x73\x74')||curUrl.includes('\x2f\x6d\x79-\x6c\x69\x73\x74')){
return false;
}
if(curUrl.includes('\x2f\x64\x65\x74\x61\x69\x6c\x2f')||curUrl.includes('\x2f\x69\x74\x65\x6d\x2f')||curUrl.includes('\x2f\x62\x6f\x6f\x6b\x69\x6e\x67\x2f\x76\x69\x65\x77')){
return true;
}
const curH=document.querySelector('\x2e\x71-\x68\x65\x61\x64\x65\x72, \x68\x65\x61\x64\x65\x72, \x2e\x71-\x74\x6f\x6f\x6c\x62\x61\x72');
const hTxt=curH?(curH.textContent||'').trim().replace(/\s+/g,''):'';
if(hTxt.includes('\ub4f1\ub85d\uc0c1\ud488\ub0b4\uc5ed')||hTxt.includes('\ub0b4\uac00\ub4f1\ub85d\ud55c\uc0c1\ud488\ub0b4\uc5ed')||hTxt.includes('\ub9c8\uc774\ud398\uc774\uc9c0'))return false;
const rawBodyTxt=document.body?(document.body.innerText||''):'';
if(rawBodyTxt.includes('\ucc1c\ud55c\ub9e4\ub2c8\uc800')||rawBodyTxt.includes('\ub0b4\uac00 \ub4f1\ub85d\ud55c \uc0c1\ud488 \ub0b4\uc5ed')||rawBodyTxt.includes('\ud68c\uc6d0\uc815\ubcf4\uc218\uc815'))return false;
const hasDetailKeywords=rawBodyTxt.includes('\uc0c1\ud488\uc815\ubcf4')||rawBodyTxt.includes('\uc704\uc57d\uaddc\uc815')||rawBodyTxt.includes('\uc870\uc778 \ub4f1\ub85d\ud558\uae30');
if(rawBodyTxt.includes('\uc0c1\ud488\uc815\ubcf4')&&rawBodyTxt.includes('\uc704\uc57d\uaddc\uc815'))return true;
const bodyTxt=rawBodyTxt.replace(/\s+/g,'');
if(bodyTxt.includes('\ub4f1\ub85d\uc0c1\ud488\ub0b4\uc5ed'))return false;
const hasDetailHeader=hTxt.includes('\uc591\ub3c4')||hTxt.includes('\uc870\uc778');
const moreBtn=findDetailMoreButton();
if(hasDetailHeader&&(hasDetailKeywords||moreBtn))return true;
if(hasDetailKeywords&&moreBtn)return true;
if(hasDetailKeywords&&(rawBodyTxt.includes('\ud640\uc218')||rawBodyTxt.includes('\uc77c\uc2dc')))return true;
return false;
}
function isCurrentlyOnTargetDetailPage(item){
if(!isDetailPage())return false;
const bodyText=(document.body.innerText||'').toLowerCase();
const timeDigits=(item.time||'').replace(/[^\d]/g,'');
const hh=timeDigits.length===4?timeDigits.substring(0,2):(timeDigits.length===3?'\x30'+timeDigits[0]:'');
const mm=timeDigits.length>=3?timeDigits.slice(-2):'';
const colonTime=(hh&&mm)?`${hh}:${mm}`:'';
const shortColonTime=(hh&&mm)?`${parseInt(hh,10)}:${mm}`:'';
const normGolf=_0x1040(item.golf);
const rawGolf=_0x1040(item.rawGolf);
const chainPrefixRegex=/^(골프존|클럽디|한림)/;
const strippedGolf=(normGolf&&chainPrefixRegex.test(normGolf))?normGolf.replace(chainPrefixRegex,''):'';
const normBody=_0x1040(bodyText);
const timeMatch=!timeDigits||
(colonTime&&bodyText.includes(colonTime))||
(shortColonTime&&bodyText.includes(shortColonTime))||
(timeDigits&&bodyText.replace(/[^\d]/g,'').includes(timeDigits))||
bodyText.includes(item.time);
const golfMatch=(normGolf&&normBody.includes(normGolf))||
(rawGolf&&normBody.includes(rawGolf))||
(strippedGolf&&strippedGolf.length>=2&&normBody.includes(strippedGolf));
if(!timeMatch||!golfMatch)return false;
const isTargetTransfer=(item.roomType||'').includes('\uc591\ub3c4');
const isTargetJoin=(item.roomType||'').includes('\uc870\uc778')||
(item.roomType||'').includes('\uc120\ud2f0')||
(item.roomType||'').includes('\ub300\uae30');
const curH=document.querySelector('\x2e\x71-\x68\x65\x61\x64\x65\x72, \x68\x65\x61\x64\x65\x72, \x2e\x71-\x74\x6f\x6f\x6c\x62\x61\x72');
const hTxt=curH?(curH.textContent||'').trim().replace(/\s+/g,''):'';
const pageIsTransfer=hTxt.includes('\uc591\ub3c4')||/양도\s*문의|양도\s*신청/.test(bodyText);
const pageIsJoin=hTxt.includes('\uc870\uc778')||/조인\s*신청|조인\s*등록/.test(bodyText);
if(isTargetTransfer&&pageIsJoin&&!pageIsTransfer)return false;
if(isTargetJoin&&pageIsTransfer&&!pageIsJoin)return false;
return true;
}
async function findAndClickPostCardByNameOnly(golfName,roomType='',maxScrolls=8){
console.log(`[\uac00\uaca9\uc218\uc815] \ud83d\udd0d \uad6c\uc7a5\uba85 \ub2e8\ub3c5 \uce74\ub4dc \ud0d0\uc0c9 (\uc2dc\uac04 \ubb34\uc2dc): ${golfName} [\ud0c0\uc785: ${roomType||'\ubbf8\uc9c0\uc815'}]...`);
const normTarget=_0x1040(golfName);
if(!normTarget)return false;
window.scrollTo(0,0);
document.querySelectorAll('\x2e\x71-\x73\x63\x72\x6f\x6c\x6c\x61\x72\x65\x61\x5f\x5f\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x73\x63\x72\x6f\x6c\x6c, \x2e\x71-\x70\x61\x67\x65, \x62\x6f\x64\x79').forEach(el=>{
el.scrollTop=0;
});
await _0x1001(250);
for(let scroll=0;scroll<maxScrolls;scroll++){
if(shouldStopRegistration)return false;
const allDivs=_0x1043();
const matched=[];
for(const el of allDivs){
const rawTxt=(el.innerText||el.textContent||'').toLowerCase();
const normCard=_0x1040(rawTxt);
const golfScore=_0x1042(normCard,normTarget,'');
if(golfScore<90)continue;
const isTargetTransfer=(roomType||'').includes('\uc591\ub3c4');
const isTargetJoin=(roomType||'').includes('\uc870\uc778')||(roomType||'').includes('\uc120\ud2f0')||(roomType||'').includes('\ub300\uae30');
const cardType=_0x1041(el,rawTxt);
if(isTargetTransfer&&cardType==='\uc870\uc778')continue;
if(isTargetJoin&&cardType==='\uc591\ub3c4')continue;
let roomScore=0;
if(isTargetTransfer&&cardType==='\uc591\ub3c4')roomScore=150;
else if(isTargetJoin&&cardType==='\uc870\uc778')roomScore=150;
matched.push({el,totalScore:golfScore+roomScore});
}
const leafCards=matched.filter(item=>{
return!matched.some(other=>other!==item&&item.el.contains(other.el));
});
const candidates=leafCards.length>0?leafCards:matched;
candidates.sort((a,b)=>b.totalScore-a.totalScore);
if(candidates.length>0){
console.log(`[\uac00\uaca9\uc218\uc815] \uad6c\uc7a5\uba85 \ub2e8\ub3c5 \ub9e4\uce6d \uce74\ub4dc \ubc1c\uacac! [${golfName}] (${candidates.length}\uac74 \uc911 \ucd5c\uace0 \uc810\uc218 \uce74\ub4dc \ud074\ub9ad)`);
const ok=await clickPostCardReliably(candidates[0].el);
if(ok){
console.log(`[\uac00\uaca9\uc218\uc815] \uad6c\uc7a5\uba85 \ub2e8\ub3c5 \ub9e4\uce6d \u2192 \uc0c1\uc138 \ud398\uc774\uc9c0 \uc9c4\uc785 \uc131\uacf5!`);
await _0x1001(350);
return true;
}
console.warn(`[\uac00\uaca9\uc218\uc815] \uad6c\uc7a5\uba85 \ub2e8\ub3c5 \ub9e4\uce6d \uce74\ub4dc \ud074\ub9ad \ud6c4 \uc0c1\uc138 \ud398\uc774\uc9c0 \uc9c4\uc785 \ubbf8\ud655\uc778`);
return false;
}
window.scrollBy(0,350);
document.querySelectorAll('\x2e\x71-\x73\x63\x72\x6f\x6c\x6c\x61\x72\x65\x61\x5f\x5f\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x73\x63\x72\x6f\x6c\x6c, \x2e\x71-\x70\x61\x67\x65, \x62\x6f\x64\x79').forEach(el=>{
el.scrollTop+=350;
});
await _0x1001(250);
}
console.warn(`[\uac00\uaca9\uc218\uc815] \uad6c\uc7a5\uba85 \ub2e8\ub3c5 \ub9e4\uce6d \uce74\ub4dc \ubbf8\ubc1c\uacac (${golfName})`);
window.scrollTo(0,0);
document.querySelectorAll('\x2e\x71-\x73\x63\x72\x6f\x6c\x6c\x61\x72\x65\x61\x5f\x5f\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x73\x63\x72\x6f\x6c\x6c, \x2e\x71-\x70\x61\x67\x65, \x62\x6f\x64\x79').forEach(el=>{
el.scrollTop=0;
});
return false;
}
async function findAndClickPostCard(golfName,rawGolfName,timeStr,roomType='',maxScrolls=8,prevFee='',targetFee=''){
console.log(`[\uac00\uaca9\uc218\uc815] \ub4f1\ub85d \uc0c1\ud488 \uce74\ub4dc \ud0d0\uc0c9: ${golfName} (${timeStr}) [\ud0c0\uc785: ${roomType||'\ubbf8\uc9c0\uc815'}] (\uae30\uc874: ${prevFee||'\ubbf8\uc9c0\uc815'}, \ubaa9\ud45c: ${targetFee||'\ubbf8\uc9c0\uc815'})...`);
if(isCurrentlyOnTargetDetailPage({golf:golfName,rawGolf:rawGolfName,time:timeStr,roomType:roomType})){
console.log(`[\uac00\uaca9\uc218\uc815] \uc774\ubbf8 \ub300\uc0c1 \uae00(${golfName} ${timeStr} [${roomType}])\uc758 \uc0c1\uc138 \ud398\uc774\uc9c0\uc5d0 \uc704\uce58\ud574 \uc788\uc2b5\ub2c8\ub2e4.`);
return true;
}
window.scrollTo(0,0);
document.querySelectorAll('\x2e\x71-\x73\x63\x72\x6f\x6c\x6c\x61\x72\x65\x61\x5f\x5f\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x73\x63\x72\x6f\x6c\x6c, \x2e\x71-\x70\x61\x67\x65, \x62\x6f\x64\x79').forEach(el=>{
el.scrollTop=0;
});
await _0x1001(250);
for(let scroll=0;scroll<maxScrolls;scroll++){
if(shouldStopRegistration)return false;
const foundCard=_0x1044(golfName,rawGolfName,timeStr,roomType,prevFee,targetFee);
if(foundCard){
console.log(`[\uac00\uaca9\uc218\uc815] \uc77c\uce58\ud558\ub294 \ub4f1\ub85d \ud0c0\uc784 \uce74\ub4dc \ubc1c\uacac! [${golfName} ${timeStr}]`);
const ok=await clickPostCardReliably(foundCard);
if(ok){
console.log(`[\uac00\uaca9\uc218\uc815] \uc0c1\uc138 \ud398\uc774\uc9c0 \uc9c4\uc785 \uc131\uacf5!`);
await _0x1001(350);
return true;
}
console.warn(`[\uac00\uaca9\uc218\uc815] \uce74\ub4dc \ud074\ub9ad \ud6c4 \uc0c1\uc138 \ud398\uc774\uc9c0 \uc9c4\uc785 \ubbf8\ud655\uc778`);
return false;
}
window.scrollBy(0,350);
document.querySelectorAll('\x2e\x71-\x73\x63\x72\x6f\x6c\x6c\x61\x72\x65\x61\x5f\x5f\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x73\x63\x72\x6f\x6c\x6c, \x2e\x71-\x70\x61\x67\x65, \x62\x6f\x64\x79').forEach(el=>{
el.scrollTop+=350;
});
await _0x1001(250);
}
console.warn(`[\uac00\uaca9\uc218\uc815] ${golfName} (${timeStr}) \uce74\ub4dc\ub97c \ucc3e\uc9c0 \ubabb\ud568 -> \uc2a4\ud06c\ub864 \uc0c1\ub2e8 \uc6d0\ubcf5`);
window.scrollTo(0,0);
document.querySelectorAll('\x2e\x71-\x73\x63\x72\x6f\x6c\x6c\x61\x72\x65\x61\x5f\x5f\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x73\x63\x72\x6f\x6c\x6c, \x2e\x71-\x70\x61\x67\x65, \x62\x6f\x64\x79').forEach(el=>{
el.scrollTop=0;
});
return false;
}
async function clickPostCardReliably(cardEl){
if(!cardEl)return false;
if(isDetailPage()||isEditPage())return true;
document.querySelectorAll('[\x64\x61\x74\x61-\x74\x65\x65\x38\x32-\x6f\x75\x74\x6c\x69\x6e\x65="\x74\x72\x75\x65"]').forEach(el=>{
el.style.outline='';
el.style.boxShadow='';
delete el.dataset.tee82Outline;
});
const actualCard=cardEl.closest('\x2e\x71-\x63\x61\x72\x64, [\x63\x6c\x61\x73\x73*="\x71-\x63\x61\x72\x64"], \x2e\x71-\x69\x74\x65\x6d')||
cardEl.querySelector('\x2e\x71-\x63\x61\x72\x64, [\x63\x6c\x61\x73\x73*="\x71-\x63\x61\x72\x64"], \x2e\x71-\x69\x74\x65\x6d')||
cardEl;
actualCard.scrollIntoView({block:'\x63\x65\x6e\x74\x65\x72',inline:'\x63\x65\x6e\x74\x65\x72',behavior:'\x69\x6e\x73\x74\x61\x6e\x74'});
actualCard.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x30\x30\x65\x36\x37\x36','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
actualCard.style.setProperty('\x62\x6f\x78-\x73\x68\x61\x64\x6f\x77','\x30 \x30 \x31\x32\x70\x78 \x23\x30\x30\x65\x36\x37\x36','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
actualCard.dataset.tee82Outline='\x74\x72\x75\x65';
await _0x1001(200);
const rect=actualCard.getBoundingClientRect();
const cx=rect.left+rect.width/2;
const cy=rect.top+rect.height/2;
const innerTarget=actualCard.querySelector('\x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72\x3a\x6e\x6f\x74(\x2e\x71-\x62\x61\x64\x67\x65)\x3a\x6e\x6f\x74(\x2e\x71-\x63\x68\x69\x70), \x61, \x2e\x71-\x69\x74\x65\x6d')||actualCard;
console.log(`[\uce74\ub4dc\ud074\ub9ad] 1\ucc28 \ub0b4\ubd80 \ud0c0\uac9f \ud074\ub9ad \uc2dc\ub3c4: <${innerTarget.tagName} class="${innerTarget.className}"> (\uc88c\ud45c: ${Math.round(cx)}, ${Math.round(cy)})`);
try{
innerTarget.click();
}catch(e){
await _0x1005(innerTarget,cx,cy);
}
for(let w=0;w<18;w++){
await _0x1001(100);
if(isDetailPage()||isEditPage()){
console.log(`[\uce74\ub4dc\ud074\ub9ad] \uc0c1\uc138 \ud398\uc774\uc9c0 \uc9c4\uc785 \uc131\uacf5! (1\ucc28)`);
window.scrollTo(0,0);
document.querySelectorAll('\x2e\x71-\x73\x63\x72\x6f\x6c\x6c\x61\x72\x65\x61\x5f\x5f\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x73\x63\x72\x6f\x6c\x6c, \x2e\x71-\x70\x61\x67\x65, \x62\x6f\x64\x79').forEach(el=>{
try{el.scrollTop=0;}catch(e){}
});
await _0x1001(300);
return true;
}
}
const centerPointEl=document.elementFromPoint(cx,cy)||innerTarget;
if(centerPointEl){
console.log(`[\uce74\ub4dc\ud074\ub9ad] 2\ucc28 \uc911\uc559 \uc88c\ud45c(${Math.round(cx)}, ${Math.round(cy)}) \ud074\ub9ad: <${centerPointEl.tagName}>`);
await _0x1005(centerPointEl,cx,cy);
}
for(let w=0;w<18;w++){
await _0x1001(100);
if(isDetailPage()||isEditPage()){
console.log(`[\uce74\ub4dc\ud074\ub9ad] \uc0c1\uc138 \ud398\uc774\uc9c0 \uc9c4\uc785 \uc131\uacf5! (2\ucc28 \uc911\uc559 \uc88c\ud45c)`);
window.scrollTo(0,0);
document.querySelectorAll('\x2e\x71-\x73\x63\x72\x6f\x6c\x6c\x61\x72\x65\x61\x5f\x5f\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x73\x63\x72\x6f\x6c\x6c, \x2e\x71-\x70\x61\x67\x65, \x62\x6f\x64\x79').forEach(el=>{
try{el.scrollTop=0;}catch(e){}
});
await _0x1001(300);
return true;
}
}
const topCy=rect.top+Math.min(35,rect.height*0.3);
const topPointEl=document.elementFromPoint(cx,topCy);
if(topPointEl){
console.log(`[\uce74\ub4dc\ud074\ub9ad] 3\ucc28 \uc0c1\ub2e8 \ud14d\uc2a4\ud2b8 \uc88c\ud45c(${Math.round(cx)}, ${Math.round(topCy)}) \ud074\ub9ad: <${topPointEl.tagName}>`);
await _0x1005(topPointEl,cx,topCy);
}
for(let w=0;w<20;w++){
await _0x1001(100);
if(isDetailPage()||isEditPage()){
console.log(`[\uce74\ub4dc\ud074\ub9ad] \uc0c1\uc138 \ud398\uc774\uc9c0 \uc9c4\uc785 \uc131\uacf5! (3\ucc28 \uc0c1\ub2e8 \ud14d\uc2a4\ud2b8 \uc88c\ud45c)`);
window.scrollTo(0,0);
document.querySelectorAll('\x2e\x71-\x73\x63\x72\x6f\x6c\x6c\x61\x72\x65\x61\x5f\x5f\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x73\x63\x72\x6f\x6c\x6c, \x2e\x71-\x70\x61\x67\x65, \x62\x6f\x64\x79').forEach(el=>{
try{el.scrollTop=0;}catch(e){}
});
await _0x1001(300);
return true;
}
}
console.log(`[\uce74\ub4dc\ud074\ub9ad] 4\ucc28 \uce74\ub4dc \uc804\uccb4 \uc2dc\ubbac\ub808\uc774\uc158`);
try{actualCard.click();}catch(e){}
for(let w=0;w<20;w++){
await _0x1001(100);
if(isDetailPage()||isEditPage()){
console.log(`[\uce74\ub4dc\ud074\ub9ad] \uc0c1\uc138 \ud398\uc774\uc9c0 \uc9c4\uc785 \uc131\uacf5! (4\ucc28)`);
window.scrollTo(0,0);
document.querySelectorAll('\x2e\x71-\x73\x63\x72\x6f\x6c\x6c\x61\x72\x65\x61\x5f\x5f\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x73\x63\x72\x6f\x6c\x6c, \x2e\x71-\x70\x61\x67\x65, \x62\x6f\x64\x79').forEach(el=>{
try{el.scrollTop=0;}catch(e){}
});
await _0x1001(300);
return true;
}
}
console.warn(`[\uce74\ub4dc\ud074\ub9ad] \uce74\ub4dc \ud074\ub9ad \ud6c4 \uc0c1\uc138 \ud398\uc774\uc9c0 \uc9c4\uc785 \uc2e4\ud328`);
return false;
}
async function openMenuAndClickEdit(maxAttempts=20){
console.log("[\uac00\uaca9\uc218\uc815] \uc0c1\uc138 \ud398\uc774\uc9c0 \uc6b0\uce21 \uc0c1\ub2e8 \ub354\ubcf4\uae30 \uba54\ub274(\u22ee) \ud074\ub9ad \uc2dc\ub3c4\x2e\x2e\x2e");
window.scrollTo(0,0);
document.querySelectorAll('\x2e\x71-\x73\x63\x72\x6f\x6c\x6c\x61\x72\x65\x61\x5f\x5f\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x73\x63\x72\x6f\x6c\x6c, \x2e\x71-\x70\x61\x67\x65, \x62\x6f\x64\x79').forEach(el=>{
try{el.scrollTop=0;}catch(e){}
});
for(let attempt=0;attempt<maxAttempts;attempt++){
if(shouldStopRegistration)return false;
if(isEditPage()){
console.log("[\uac00\uaca9\uc218\uc815] \uc774\ubbf8 \uc218\uc815 \ud3fc \uc9c4\uc785 \ud655\uc778!");
return true;
}
let editTarget=findMenuEditItem();
if(!editTarget){
const menuBtn=findDetailMoreButton();
if(menuBtn){
let targetBtn=menuBtn.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||menuBtn;
let rect=targetBtn.getBoundingClientRect();
if(rect.width>75&&menuBtn.getBoundingClientRect().width<=75){
targetBtn=menuBtn;
rect=targetBtn.getBoundingClientRect();
}
if(rect.width>75){
const winW=window.innerWidth||450;
const innerBtns=Array.from(targetBtn.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x69, \x2e\x71-\x69\x63\x6f\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]'))
.filter(b=>{
const r=b.getBoundingClientRect();
return r.width<=75&&r.height<=75&&r.left>=winW*0.5&&!isNavigationOrShareElement(b);
})
.sort((a,b)=>b.getBoundingClientRect().right-a.getBoundingClientRect().right);
if(innerBtns.length>0){
targetBtn=innerBtns[0];
rect=targetBtn.getBoundingClientRect();
}
}
console.log(`[\uac00\uaca9\uc218\uc815] \ub354\ubcf4\uae30(\u22ee) \ud074\ub9ad \ub300\uc0c1 \uac10\uc9c0: <${targetBtn.tagName}> (X: ${Math.round(rect.left)}, Y: ${Math.round(rect.top)}, W: ${Math.round(rect.width)}, H: ${Math.round(rect.height)}) text='${(targetBtn.innerText||targetBtn.textContent||'').trim()}'`);
targetBtn.scrollIntoView({block:'\x6e\x65\x61\x72\x65\x73\x74',inline:'\x63\x65\x6e\x74\x65\x72',behavior:'\x69\x6e\x73\x74\x61\x6e\x74'});
targetBtn.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x37\x43\x33\x41\x45\x44','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
targetBtn.style.setProperty('\x62\x6f\x78-\x73\x68\x61\x64\x6f\x77','\x30 \x30 \x31\x32\x70\x78 \x23\x37\x43\x33\x41\x45\x44','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
try{
targetBtn.click();
}catch(e){
await _0x1005(targetBtn,rect.left+rect.width/2,rect.top+rect.height/2);
}
for(let m=0;m<10;m++){
await _0x1001(100);
editTarget=findMenuEditItem();
if(editTarget)break;
}
if(!editTarget){
const rect=targetBtn.getBoundingClientRect();
const cx=rect.left+rect.width/2;
const cy=rect.top+rect.height/2;
await _0x1005(targetBtn,cx,cy);
for(let m=0;m<10;m++){
await _0x1001(100);
editTarget=findMenuEditItem();
if(editTarget)break;
}
}
}
}
if(editTarget){
console.log("[\uac00\uaca9\uc218\uc815] \ud31d\uc5c5 \uba54\ub274 \ub0b4 '\uc218\uc815' \ud56d\ubaa9 \ubc1c\uacac! \uc815\ubc00 \ub2e8\uc77c \ud074\ub9ad\uc744 \uc2e4\ud589\ud569\ub2c8\ub2e4\x2e");
editTarget.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x30\x30\x65\x36\x37\x36','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await _0x1001(80);
const eRect=editTarget.getBoundingClientRect();
const eCx=eRect.left+eRect.width/2;
const eCy=eRect.top+eRect.height/2;
const evOpts={bubbles:true,cancelable:true,composed:true,view:window,clientX:eCx,clientY:eCy,button:0,buttons:1};
try{editTarget.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x64\x6f\x77\x6e',evOpts));}catch(e){}
try{editTarget.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',evOpts));}catch(e){}
await _0x1001(35);
try{editTarget.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x75\x70',evOpts));}catch(e){}
try{editTarget.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',evOpts));}catch(e){}
try{editTarget.click();}catch(e){
try{editTarget.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',evOpts));}catch(err){}
}
for(let w=0;w<18;w++){
await _0x1001(140);
if(isEditPage()){
console.log("[\uac00\uaca9\uc218\uc815] \uc218\uc815 \ud3fc \ud654\uba74 \uc9c4\uc785 \uc131\uacf5!");
await _0x1001(450);
return true;
}
}
if(isEditPage())return true;
}
await _0x1001(300);
}
console.error("[\uac00\uaca9\uc218\uc815] \uc6b0\uce21 \uc0c1\ub2e8 \ub354\ubcf4\uae30(\u22ee) -> '\uc218\uc815' \uba54\ub274 \uc9c4\uc785 \uc2e4\ud328");
return false;
}
function _0x101b(el){
if(!el)return false;
const targets=[
el,
el.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], [\x72\x6f\x6c\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"], [\x72\x6f\x6c\x65="\x72\x61\x64\x69\x6f"], \x6c\x61\x62\x65\x6c'),
el.querySelector('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, \x69\x6e\x70\x75\x74')
].filter(Boolean);
for(const t of targets){
const cls=t.className&&typeof t.className==='\x73\x74\x72\x69\x6e\x67'?t.className:'';
if(
t.classList.contains('\x62\x67-\x70\x72\x69\x6d\x61\x72\x79')||
t.classList.contains('\x62\x67-\x74\x65\x61\x6c')||
t.classList.contains('\x62\x67-\x67\x72\x65\x65\x6e')||
t.classList.contains('\x62\x67-\x62\x6c\x75\x65')||
t.classList.contains('\x71-\x62\x74\x6e--\x61\x63\x74\x69\x76\x65')||
t.classList.contains('\x61\x63\x74\x69\x76\x65')||
t.classList.contains('\x73\x65\x6c\x65\x63\x74\x65\x64')||
t.classList.contains('\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78--\x74\x72\x75\x74\x68\x79')||
t.classList.contains('\x71-\x72\x61\x64\x69\x6f--\x74\x72\x75\x74\x68\x79')||
(t.classList.contains('\x74\x65\x78\x74-\x77\x68\x69\x74\x65')&&!t.classList.contains('\x62\x67-\x77\x68\x69\x74\x65'))||
t.getAttribute('\x61\x72\x69\x61-\x70\x72\x65\x73\x73\x65\x64')==='\x74\x72\x75\x65'||
t.getAttribute('\x61\x72\x69\x61-\x73\x65\x6c\x65\x63\x74\x65\x64')==='\x74\x72\x75\x65'||
t.getAttribute('\x61\x72\x69\x61-\x63\x68\x65\x63\x6b\x65\x64')==='\x74\x72\x75\x65'||
(t.tagName==='\x49\x4e\x50\x55\x54'&&t.checked===true)
){
return true;
}
try{
const cs=window.getComputedStyle(t);
const bg=cs.backgroundColor||'';
const m=bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
if(m){
const r=parseInt(m[1],10),g=parseInt(m[2],10),b=parseInt(m[3],10);
const a=m[4]!==undefined?parseFloat(m[4]):1;
if(a>0.5&&!(r>235&&g>235&&b>235)){
return true;
}
}
}catch(e){}
}
return false;
}
function isQuasarOptionDisabled(el){
if(!el)return false;
const btn=el.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x6c\x61\x62\x65\x6c')||el;
if(
btn.disabled===true||
btn.hasAttribute('\x64\x69\x73\x61\x62\x6c\x65\x64')||
btn.getAttribute('\x61\x72\x69\x61-\x64\x69\x73\x61\x62\x6c\x65\x64')==='\x74\x72\x75\x65'||
btn.classList.contains('\x64\x69\x73\x61\x62\x6c\x65\x64')||
btn.classList.contains('\x71-\x62\x74\x6e--\x64\x69\x73\x61\x62\x6c\x65\x64')
){
return true;
}
const innerInput=btn.querySelector('\x69\x6e\x70\x75\x74, \x62\x75\x74\x74\x6f\x6e');
if(innerInput&&(innerInput.disabled===true||innerInput.hasAttribute('\x64\x69\x73\x61\x62\x6c\x65\x64'))){
return true;
}
return false;
}
function enforceNonSubmitButtonType(rootEl){
if(!rootEl)return;
const btns=[];
if(rootEl.tagName==='\x42\x55\x54\x54\x4f\x4e')btns.push(rootEl);
if(typeof rootEl.closest==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
const closestBtn=rootEl.closest('\x62\x75\x74\x74\x6f\x6e');
if(closestBtn&&!btns.includes(closestBtn))btns.push(closestBtn);
}
if(typeof rootEl.querySelectorAll==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
rootEl.querySelectorAll('\x62\x75\x74\x74\x6f\x6e').forEach(b=>{
if(!btns.includes(b))btns.push(b);
});
}
for(const b of btns){
const txt=(b.textContent||'').trim();
if(txt!=='\uc218\uc815\ud558\uae30'&&txt!=='\ub4f1\ub85d\ud558\uae30'){
const curType=(b.getAttribute('\x74\x79\x70\x65')||'').toLowerCase();
if(!curType||curType==='\x73\x75\x62\x6d\x69\x74'){
b.setAttribute('\x74\x79\x70\x65','\x62\x75\x74\x74\x6f\x6e');
}
}
}
}
function _0x101a(candidate){
if(!candidate)return null;
const closestInteractive=candidate.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], [\x72\x6f\x6c\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"], [\x72\x6f\x6c\x65="\x72\x61\x64\x69\x6f"]');
if(closestInteractive)return closestInteractive;
const innerInteractive=candidate.querySelector('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x69\x6e\x70\x75\x74');
if(innerInteractive)return innerInteractive.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x6c\x61\x62\x65\x6c')||innerInteractive;
const closestLabel=candidate.closest('\x6c\x61\x62\x65\x6c');
if(closestLabel)return closestLabel;
return candidate;
}
async function _0x101c(rawTarget,labelForLog=''){
const clickTarget=_0x101a(rawTarget);
if(!clickTarget)return false;
enforceNonSubmitButtonType(clickTarget);
const blockAccidentalFormSubmit=(e)=>{
e.preventDefault();
e.stopImmediatePropagation();
};
window.addEventListener('\x73\x75\x62\x6d\x69\x74',blockAccidentalFormSubmit,true);
try{
clickTarget.scrollIntoView({behavior:'\x69\x6e\x73\x74\x61\x6e\x74',block:'\x63\x65\x6e\x74\x65\x72'});
clickTarget.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x30\x30\x65\x36\x37\x36','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
clickTarget.style.setProperty('\x62\x6f\x78-\x73\x68\x61\x64\x6f\x77','\x30 \x30 \x31\x30\x70\x78 \x23\x30\x30\x65\x36\x37\x36','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await _0x1001(60);
for(let tryIdx=0;tryIdx<3;tryIdx++){
if(_0x101b(clickTarget)){
console.log(`[\uc635\uc158\uc120\ud0dd] [${labelForLog}] \ud65c\uc131 \uc0c1\ud0dc \ud655\uc778\ub428 (\uc2dc\ub3c4 ${tryIdx})`);
return true;
}
enforceNonSubmitButtonType(clickTarget);
const rect=clickTarget.getBoundingClientRect();
const cx=rect.left+rect.width/2;
const cy=rect.top+rect.height/2;
const rawTopEl=(cx>0&&cy>0&&document.elementFromPoint(cx,cy));
const topEl=(rawTopEl&&(rawTopEl===clickTarget||clickTarget.contains(rawTopEl)))?rawTopEl:clickTarget;
const innerBtn=clickTarget.querySelector('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x69\x6e\x70\x75\x74, \x2e\x71-\x62\x74\x6e\x5f\x5f\x63\x6f\x6e\x74\x65\x6e\x74, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78\x5f\x5f\x69\x6e\x6e\x65\x72, \x2e\x71-\x72\x61\x64\x69\x6f\x5f\x5f\x69\x6e\x6e\x65\x72')||clickTarget;
enforceNonSubmitButtonType(topEl);
enforceNonSubmitButtonType(innerBtn);
const dispatchTargets=[];
[topEl,innerBtn,clickTarget].forEach(t=>{
if(t&&!dispatchTargets.includes(t))dispatchTargets.push(t);
});
const eventOpts={bubbles:true,cancelable:true,composed:true,view:window,clientX:cx,clientY:cy,button:0,buttons:1};
if(tryIdx===0){
for(const t of dispatchTargets){
try{t.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x64\x6f\x77\x6e',eventOpts));}catch(e){}
try{t.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',eventOpts));}catch(e){}
}
await _0x1001(45);
for(const t of dispatchTargets){
try{t.dispatchEvent(new PointerEvent('\x70\x6f\x69\x6e\x74\x65\x72\x75\x70',eventOpts));}catch(e){}
try{t.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',eventOpts));}catch(e){}
}
try{
if(typeof clickTarget.click==='\x66\x75\x6e\x63\x74\x69\x6f\x6e')clickTarget.click();
}catch(e){}
await _0x1001(90);
if(!_0x101b(clickTarget)&&topEl!==clickTarget){
try{
if(typeof topEl.click==='\x66\x75\x6e\x63\x74\x69\x6f\x6e')topEl.click();
}catch(e){}
await _0x1001(90);
}
}else if(tryIdx===1){
console.log(`[\uc635\uc158\uc120\ud0dd] [${labelForLog}] 1\ucc28 \ud074\ub9ad \ud6c4 \ubbf8\ud65c\uc131 -> 2\ucc28 \uc815\ubc00 \ud074\ub9ad \uc7ac\uc2dc\ub3c4...`);
try{innerBtn.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',eventOpts));}catch(e){}
await _0x1001(80);
if(!_0x101b(clickTarget)){
await _0x1005(topEl,cx,cy);
await _0x1001(90);
}
}else{
console.log(`[\uc635\uc158\uc120\ud0dd] [${labelForLog}] 2\ucc28 \ud074\ub9ad \ud6c4 \ubbf8\ud65c\uc131 -> 3\ucc28 \ud558\uc704 \uc694\uc18c \uac15\uc81c \ud074\ub9ad...`);
const subClickables=Array.from(clickTarget.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x69\x6e\x70\x75\x74, \x73\x70\x61\x6e, \x64\x69\x76'))
.filter(el=>el.offsetHeight>0);
for(const sub of subClickables){
enforceNonSubmitButtonType(sub);
try{sub.click();}catch(e){}
await _0x1001(60);
if(_0x101b(clickTarget))break;
}
}
if(_0x101b(clickTarget)){
console.log(`[\uc635\uc158\uc120\ud0dd] [${labelForLog}] \ud074\ub9ad \ubc0f \ud65c\uc131\ud654 \uc644\ub8cc! (\uc2dc\ub3c4 ${tryIdx+1}\ud68c)`);
return true;
}
}
console.log(`[\uc635\uc158\uc120\ud0dd] [${labelForLog}] \ubb3c\ub9ac\uc801 \ud074\ub9ad \uc2dc\ud000\uc2a4 \uc804\uc1a1 \uc644\ub8cc`);
return true;
}finally{
window.removeEventListener('\x73\x75\x62\x6d\x69\x74',blockAccidentalFormSubmit,true);
}
}
async function updatePeopleCountInEditForm(targetPeopleNum){
if(!targetPeopleNum)return false;
const pNum=(targetPeopleNum||'').toString().replace(/[^\d]/g,'')||targetPeopleNum;
const targetText=`${pNum}\uba85`;
console.log(`[\uac00\uaca9\uc218\uc815] \uc778\uc6d0 \ubcc0\uacbd \ud0d0\uc0c9 (\ubaa9\ud45c: ${targetText})...`);
const findPeopleBtn=()=>{
let found=null;
const headers=Array.from(document.querySelectorAll('\x64\x69\x76, \x73\x70\x61\x6e, \x6c\x61\x62\x65\x6c, \x70, \x68\x36, \x68\x35, \x2e\x71-\x66\x69\x65\x6c\x64\x5f\x5f\x6c\x61\x62\x65\x6c'))
.filter(el=>{
const txt=el.textContent.trim().replace(/\s+/g,'');
return(txt.includes('\uc694\uccad\uc778\uc6d0')||txt.includes('\uc694\uccad\uc778\uc6d0\uc744\uc120\ud0dd\ud558\uc138\uc694')||txt.includes('\uc778\uc6d0\uc120\ud0dd'))&&el.offsetHeight>0;
});
if(headers.length>0){
const headerEl=headers.sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length)[0];
let container=headerEl.parentElement;
for(let depth=0;depth<5&&container;depth++){
const candidates=Array.from(container.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x6c\x61\x62\x65\x6c, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x2e\x71-\x62\x74\x6e\x5f\x5f\x63\x6f\x6e\x74\x65\x6e\x74, \x73\x70\x61\x6e'))
.filter(el=>{
if(el.offsetHeight<=0)return false;
const txt=el.textContent.trim().replace(/\s+/g,'');
return txt===targetText||txt===`${pNum}\uc778`;
});
if(candidates.length>0){
const btnMatch=candidates.find(el=>el.matches('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||el.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]'));
found=_0x101a(btnMatch||candidates[0]);
break;
}
container=container.parentElement;
}
}
if(!found){
const allButtons=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x6c\x61\x62\x65\x6c, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x2e\x71-\x62\x74\x6e\x5f\x5f\x63\x6f\x6e\x74\x65\x6e\x74'))
.filter(el=>{
if(el.offsetHeight<=0)return false;
const txt=el.textContent.trim().replace(/\s+/g,'');
return txt===targetText||txt===`${pNum}\uc778`;
});
if(allButtons.length>0){
const btnMatch=allButtons.find(el=>el.matches('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||el.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]'));
found=_0x101a(btnMatch||allButtons[0]);
}
}
if(!found){
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,false);
let node;
while((node=walker.nextNode())){
const txt=node.textContent.trim().replace(/\s+/g,'');
if(txt===targetText||txt===`${pNum}\uc778`){
const p=node.parentElement;
if(p&&p.offsetHeight>0&&!['\x53\x43\x52\x49\x50\x54','\x53\x54\x59\x4c\x45'].includes(p.tagName)){
found=_0x101a(p);
break;
}
}
}
}
return found;
};
let clickTarget=findPeopleBtn();
if(!clickTarget){
console.warn(`[\uac00\uaca9\uc218\uc815] \uc778\uc6d0 [${targetText}] \ubc84\ud2bc\uc744 \ucc3e\uc9c0 \ubabb\ud568 (\ud1b5\uacfc)`);
return false;
}
if(isQuasarOptionDisabled(clickTarget)&&String(pNum)!=='\x32'){
console.log(`[\uac00\uaca9\uc218\uc815] \uc778\uc6d0 [${targetText}] \ubc84\ud2bc\uc774 \uc7a0\uae08(disabled) \uc0c1\ud0dc\uc785\ub2c8\ub2e4 -> '\ubb34\uad00' \uac15\uc81c \uc804\ud658 \ubc0f \uc7a0\uae08 \ud574\uc81c \ub300\uae30...`);
await updateJoinConditionInEditForm('\ubb34\uad00');
for(let w=0;w<10;w++){
await _0x1001(80);
clickTarget=findPeopleBtn()||clickTarget;
if(!isQuasarOptionDisabled(clickTarget)){
console.log(`[\uac00\uaca9\uc218\uc815] \uc778\uc6d0 [${targetText}] \ubc84\ud2bc \uc7a0\uae08(disabled) \ud574\uc81c \ud655\uc778 \uc644\ub8cc!`);
break;
}
}
}
if(_0x101b(clickTarget)){
console.log(`[\uac00\uaca9\uc218\uc815] \uc778\uc6d0 [${targetText}] \uc774\ubbf8 \uc120\ud0dd\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4.`);
return true;
}
console.log(`[\uac00\uaca9\uc218\uc815] \uc778\uc6d0 [${targetText}] \ud074\ub9ad\ud558\uc5ec \ubcc0\uacbd\ud569\ub2c8\ub2e4.`);
await _0x101c(clickTarget,`\uc778\uc6d0:${targetText}`);
return true;
}
async function updateJoinConditionInEditForm(targetCondition='\ubb34\uad00'){
let raw=(targetCondition||'\ubb34\uad00').toString().trim();
let cleanTarget='\ubb34\uad00';
if(raw==='\ub0a8\uc790'||raw==='\ub0a8\uc790\ub9cc'||raw==='\ub0a8\uc131'||raw==='\ub0a8\uc131\ub9cc'||raw==='\ub0a8\uc790 \uc804\uc6a9'||raw==='\ub0a8\uc131 \uc804\uc6a9'||raw==='\ub0a8\ub0a8\ub9cc'||raw.includes('\ub0a8\uc790')||raw.includes('\ub0a8\uc131')){
cleanTarget='\ub0a8\uc790';
}else if(raw==='\uc5ec\uc790'||raw==='\uc5ec\uc790\ub9cc'||raw==='\uc5ec\uc131'||raw==='\uc5ec\uc131\ub9cc'||raw==='\uc5ec\uc790 \uc804\uc6a9'||raw==='\uc5ec\uc131 \uc804\uc6a9'||raw==='\uc5ec\uc5ec\ub9cc'||raw.includes('\uc5ec\uc790')||raw.includes('\uc5ec\uc131')){
cleanTarget='\uc5ec\uc790';
}else if(raw==='\ubd80\ubd80\x2f\ucee4\ud50c'||raw==='\ub0a8\uc5ec\ub9cc'||raw==='\ub0a8\ub140\ub9cc'||raw==='\ubd80\ubd80'||raw==='\ucee4\ud50c'||raw.includes('\ubd80\ubd80')||raw.includes('\ucee4\ud50c')){
cleanTarget='\ubd80\ubd80\x2f\ucee4\ud50c';
}else{
cleanTarget='\ubb34\uad00';
}
console.log(`[\uc218\uc815] \uc870\uc778 \uc870\uac74 \ud0d0\uc0c9 \ubc0f \uc120\ud0dd -> \ubaa9\ud45c: [${cleanTarget}] (\uc785\ub825: ${raw})...`);
const matchWords=[cleanTarget];
if(cleanTarget==='\ub0a8\uc790')matchWords.push('\ub0a8\uc131','\ub0a8\uc131\ub9cc','\ub0a8\uc790\ub9cc','\ub0a8');
if(cleanTarget==='\uc5ec\uc790')matchWords.push('\uc5ec\uc131','\uc5ec\uc131\ub9cc','\uc5ec\uc790\ub9cc','\uc5ec');
if(cleanTarget==='\ubd80\ubd80\x2f\ucee4\ud50c')matchWords.push('\ubd80\ubd80','\ucee4\ud50c','\ubd80\ubd80\ucee4\ud50c');
if(cleanTarget==='\ubb34\uad00')matchWords.push('\uc131\ubcc4\ubb34\uad00','\uc870\uac74\ubb34\uad00');
let targetBtn=null;
const headers=Array.from(document.querySelectorAll('\x64\x69\x76, \x73\x70\x61\x6e, \x6c\x61\x62\x65\x6c, \x70, \x68\x36, \x68\x35, \x2e\x71-\x66\x69\x65\x6c\x64\x5f\x5f\x6c\x61\x62\x65\x6c'))
.filter(el=>{
const txt=el.textContent.trim().replace(/\s+/g,'');
return(txt.includes('\uc870\uc778\uc870\uac74')||txt.includes('\uc870\uc778\uc870\uac74\uc744\uc120\ud0dd\ud558\uc138\uc694')||txt.includes('\uc870\uac74\uc120\ud0dd')||txt.includes('\uc131\ubcc4'))&&el.offsetHeight>0;
});
if(headers.length>0){
const headerEl=headers.sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length)[0];
let container=headerEl.parentElement;
for(let depth=0;depth<5&&container;depth++){
const candidates=Array.from(container.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, \x6c\x61\x62\x65\x6c, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x2e\x71-\x62\x74\x6e\x5f\x5f\x63\x6f\x6e\x74\x65\x6e\x74, \x73\x70\x61\x6e'))
.filter(el=>{
if(el.offsetHeight<=0)return false;
const txt=el.textContent.trim().replace(/\s+/g,'');
return matchWords.some(w=>txt===w);
});
if(candidates.length>0){
const directBtn=candidates.find(el=>el.matches('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||el.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]'));
const bestCandidate=directBtn||candidates.sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length)[0];
targetBtn=_0x101a(bestCandidate);
break;
}
container=container.parentElement;
}
}
if(!targetBtn){
const allCandidates=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, \x6c\x61\x62\x65\x6c, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x2e\x71-\x62\x74\x6e\x5f\x5f\x63\x6f\x6e\x74\x65\x6e\x74, \x73\x70\x61\x6e'))
.filter(el=>{
if(el.offsetHeight<=0)return false;
const txt=el.textContent.trim().replace(/\s+/g,'');
return matchWords.some(w=>txt===w);
});
if(allCandidates.length>0){
const directBtn=allCandidates.find(el=>el.matches('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||el.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x2e\x71-\x63\x68\x65\x63\x6b\x62\x6f\x78, \x2e\x71-\x72\x61\x64\x69\x6f, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]'));
targetBtn=_0x101a(directBtn||allCandidates[0]);
}
}
if(!targetBtn){
const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,null,false);
let node;
while((node=walker.nextNode())){
const txt=node.textContent.trim().replace(/\s+/g,'');
if(matchWords.some(w=>txt===w)){
const p=node.parentElement;
if(p&&p.offsetHeight>0&&!['\x53\x43\x52\x49\x50\x54','\x53\x54\x59\x4c\x45'].includes(p.tagName)){
targetBtn=_0x101a(p);
break;
}
}
}
}
if(targetBtn){
const clickTarget=_0x101a(targetBtn);
if(_0x101b(clickTarget)){
console.log(`[\uc218\uc815] \uc870\uc778 \uc870\uac74 [${cleanTarget}] \uc774\ubbf8 \uc120\ud0dd\ub418\uc5b4 \uc788\uc2b5\ub2c8\ub2e4.`);
return true;
}
console.log(`[\uc218\uc815] \uc870\uc778 \uc870\uac74 [${cleanTarget}] \ud074\ub9ad \uc120\ud0dd!`);
await _0x101c(clickTarget,`\uc870\uc778\uc870\uac74:${cleanTarget}`);
await _0x1001(200);
return true;
}else{
console.warn(`[\uc218\uc815] \uc870\uc778 \uc870\uac74 [${cleanTarget}] \ubc84\ud2bc\uc744 \ucc3e\uc9c0 \ubabb\ud568`);
}
return false;
}
const _submittedButtonsSet=new WeakSet();
const _replacedCardsSet=new WeakSet();
let _submitLocked=false;
let _submittedUrls=new Set();
let _submittedItems=new Set();
let _priceUpdateRunning=false;
function findEditSubmitButton(){
const allCandidates=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"], [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x64\x69\x76, \x73\x70\x61\x6e, \x61'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const r=el.getBoundingClientRect();
if(r.top<80)return false;
if(_submittedButtonsSet.has(el)||el.disabled)return false;
if(el.style.pointerEvents==='\x6e\x6f\x6e\x65')return false;
const txt=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
return txt==='\uc218\uc815\ud558\uae30'||txt==='\uc218\uc815\uc644\ub8cc'||txt==='\uc218\uc815'||txt==='\ub4f1\ub85d\ud558\uae30';
});
if(allCandidates.length===0){
const subCandidates=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const r=el.getBoundingClientRect();
if(r.top<80)return false;
if(_submittedButtonsSet.has(el)||el.disabled)return false;
if(el.style.pointerEvents==='\x6e\x6f\x6e\x65')return false;
const txt=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
return txt.includes('\uc218\uc815')&&txt.length<=6;
});
allCandidates.push(...subCandidates);
}
if(allCandidates.length===0)return null;
allCandidates.sort((a,b)=>{
const aIsBtn=(a.tagName==='\x42\x55\x54\x54\x4f\x4e'||a.classList.contains('\x71-\x62\x74\x6e')||a.getAttribute('\x72\x6f\x6c\x65')==='\x62\x75\x74\x74\x6f\x6e')?100:0;
const bIsBtn=(b.tagName==='\x42\x55\x54\x54\x4f\x4e'||b.classList.contains('\x71-\x62\x74\x6e')||b.getAttribute('\x72\x6f\x6c\x65')==='\x62\x75\x74\x74\x6f\x6e')?100:0;
const aExact=(a.innerText||a.textContent||'').trim().replace(/\s+/g,'')==='\uc218\uc815\ud558\uae30'?50:0;
const bExact=(b.innerText||b.textContent||'').trim().replace(/\s+/g,'')==='\uc218\uc815\ud558\uae30'?50:0;
const aTop=a.getBoundingClientRect().top;
const bTop=b.getBoundingClientRect().top;
return(bIsBtn+bExact+bTop/10)-(aIsBtn+aExact+aTop/10);
});
const best=allCandidates[0];
return best.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||best;
}
let isEditSubmittingLock=false;
function resetEditSubmitLock(){
isEditSubmittingLock=false;
_submitLocked=false;
}
async function clickSubmitButtonReliably(submitBtn,item=null){
if(!submitBtn)return false;
const currentUrlKey=window.location.href;
const itemKey=item?`${item.golf}_${item.date}_${item.time}_${item.fee}`:'';
if(isEditSubmittingLock||
_submitLocked||
_submittedButtonsSet.has(submitBtn)||
submitBtn.disabled){
console.warn("[\uac00\uaca9\uc218\uc815] \uc774\ubbf8 \uc81c\ucd9c \uc9c4\ud589 \uc911\uc778 '\uc218\uc815\ud558\uae30'\uc785\ub2c8\ub2e4\x2e \uc911\ubcf5 \ud074\ub9ad \uc6d0\ucc9c \ucc28\ub2e8!");
return true;
}
isEditSubmittingLock=true;
_submitLocked=true;
_submittedUrls.add(currentUrlKey);
if(itemKey)_submittedItems.add(itemKey);
try{
if(document.activeElement&&typeof document.activeElement.blur==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
document.activeElement.blur();
}
}catch(e){}
await _0x1001(150);
const targetEl=submitBtn.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||submitBtn;
targetEl.scrollIntoView({block:'\x63\x65\x6e\x74\x65\x72',behavior:'\x69\x6e\x73\x74\x61\x6e\x74'});
targetEl.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x35\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x66\x66\x39\x38\x30\x30','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
targetEl.style.setProperty('\x62\x6f\x78-\x73\x68\x61\x64\x6f\x77','\x30 \x30 \x31\x36\x70\x78 \x23\x66\x66\x39\x38\x30\x30','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await _0x1001(150);
try{
targetEl.click();
}catch(e){
const rect=targetEl.getBoundingClientRect();
const opts={clientX:rect.left+rect.width/2,clientY:rect.top+rect.height/2,bubbles:true,cancelable:true,view:window};
targetEl.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',opts));
}
[targetEl,submitBtn].forEach(el=>{
if(!el)return;
_submittedButtonsSet.add(el);
el.disabled=true;
el.setAttribute('\x64\x69\x73\x61\x62\x6c\x65\x64','\x74\x72\x75\x65');
el.classList.add('\x64\x69\x73\x61\x62\x6c\x65\x64','\x71-\x62\x74\x6e--\x64\x69\x73\x61\x62\x6c\x65\x64');
el.style.setProperty('\x70\x6f\x69\x6e\x74\x65\x72-\x65\x76\x65\x6e\x74\x73','\x6e\x6f\x6e\x65','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
el.style.setProperty('\x6f\x70\x61\x63\x69\x74\x79','\x30\x2e\x33','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
el.style.setProperty('\x63\x75\x72\x73\x6f\x72','\x6e\x6f\x74-\x61\x6c\x6c\x6f\x77\x65\x64','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
});
console.log("[\uac00\uaca9\uc218\uc815] '\uc218\uc815\ud558\uae30' \ubc84\ud2bc \ub2e8 \x31\ud68c \ud074\ub9ad \uc644\ub8cc (\ucd94\uac00 \uc911\ubcf5 \ud074\ub9ad \x31\x30\x30% \uc6d0\ucc9c \ucc28\ub2e8)");
return true;
}
async function editFeeAndPeopleAndSubmit(item,maxAttempts=15){
console.log(`[\uac00\uaca9\uc218\uc815] \uc218\uc815 \ud3fc \ucc98\ub9ac \uc2dc\uc791: \ubaa9\ud45c \uadf8\ub9b0\ud53c [${item.fee}\ub9cc], \ubaa9\ud45c \uc778\uc6d0 [${item.sizenum||'\ubbf8\uc9c0\uc815'}]...`);
resetEditSubmitLock();
let feeInput=null;
for(let attempt=0;attempt<maxAttempts;attempt++){
if(shouldStopRegistration)return false;
const inputs=Array.from(document.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x6e\x75\x6d\x62\x65\x72"], \x69\x6e\x70\x75\x74[\x69\x6e\x70\x75\x74\x6d\x6f\x64\x65="\x6e\x75\x6d\x65\x72\x69\x63"], \x69\x6e\x70\x75\x74'))
.filter(el=>el.offsetHeight>0);
const validInputs=inputs.filter(inp=>{
const val=inp.value||'';
if(val.includes('-')&&val.length>=8)return false;
return true;
});
const feeSection=Array.from(document.querySelectorAll('\x64\x69\x76, \x6c\x61\x62\x65\x6c, \x73\x70\x61\x6e, \x70'))
.find(el=>{
const txt=el.textContent.trim().replace(/\s+/g,'');
return(txt==='\uadf8\ub9b0\ud53c\ub97c\uc785\ub825\ud558\uc138\uc694'||txt.includes('\uadf8\ub9b0\ud53c\ub97c\uc785\ub825'))&&el.offsetHeight>0;
});
if(feeSection){
const nextInp=feeSection.parentElement?.querySelector('\x69\x6e\x70\x75\x74')||feeSection.nextElementSibling?.querySelector('\x69\x6e\x70\x75\x74');
if(nextInp&&nextInp.offsetHeight>0)feeInput=nextInp;
}
if(!feeInput){
feeInput=validInputs.find(inp=>{
const parent=inp.closest('\x2e\x71-\x66\x69\x65\x6c\x64, \x2e\x71-\x69\x6e\x70\x75\x74, \x64\x69\x76\x2e\x72\x6f\x77, \x64\x69\x76\x2e\x63\x6f\x6c, \x64\x69\x76');
const txt=parent?.textContent||'';
const ph=inp.placeholder||'';
return txt.includes('\ub9cc\uc6d0')||txt.includes('\uadf8\ub9b0\ud53c')||ph.includes('\uadf8\ub9b0\ud53c')||ph.includes('\uc22b\uc790');
});
}
if(!feeInput&&validInputs.length>=2){
feeInput=validInputs[validInputs.length-1];
}else if(!feeInput&&validInputs.length===1){
feeInput=validInputs[0];
}
if(feeInput)break;
await _0x1001(250);
}
if(!feeInput){
console.error("[\uac00\uaca9\uc218\uc815] \uadf8\ub9b0\ud53c \uc785\ub825\ub780\uc744 \ucc3e\uc9c0 \ubabb\ud568");
return false;
}
const cleanFeeNum=(item.fee?.toString()||'').replace(/[^\d.]/g,'');
if(cleanFeeNum){
feeInput.scrollIntoView({block:'\x63\x65\x6e\x74\x65\x72'});
feeInput.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x33\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x66\x66\x39\x38\x30\x30','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await _0x1005(feeInput);
await _0x1007(feeInput,cleanFeeNum);
console.log(`[\uac00\uaca9\uc218\uc815] \ub2ec\ub77c\uc9c4 \uadf8\ub9b0\ud53c(${cleanFeeNum}\ub9cc\uc6d0) \ud55c \uae00\uc790\uc529 \ud0c0\uc774\ud551 \uc785\ub825 \uc644\ub8cc!`);
await _0x1001(250);
}
if(item.cady){
await _0x101d(item.cady,true);
await _0x1001(200);
}
if(item.isMeal!==undefined){
await _0x1019(Boolean(item.isMeal));
await _0x1001(150);
}
const isTransferEditMode=(item.roomType==='\uc591\ub3c4')||
window.location.href.toLowerCase().includes('\x74\x72\x61\x6e\x73\x66\x65\x72')||
Array.from(document.querySelectorAll('\x64\x69\x76, \x73\x70\x61\x6e, \x68\x65\x61\x64\x65\x72, \x2e\x71-\x74\x6f\x6f\x6c\x62\x61\x72')).some(el=>{
if(el.offsetHeight<=0||el.getBoundingClientRect().top>120)return false;
return(el.innerText||el.textContent||'').trim().replace(/\s+/g,'')==='\uc591\ub3c4\uc218\uc815';
});
if(!isTransferEditMode){
const targetPeopleMatch=(item.sizenum||'').toString().match(/\d+/);
const targetPeopleNum=targetPeopleMatch?targetPeopleMatch[0]:'';
let resolvedCondition=item.condition||'';
if(targetPeopleNum&&targetPeopleNum!=='\x32'){
if(!resolvedCondition||resolvedCondition==='\ubd80\ubd80\x2f\ucee4\ud50c'||resolvedCondition.includes('\ubd80\ubd80')||resolvedCondition.includes('\ucee4\ud50c')){
resolvedCondition='\ubb34\uad00';
}
}
if(resolvedCondition){
console.log(`[\uac00\uaca9\uc218\uc815] \uc870\uc778 \uc870\uac74 \uba3c\uc800 \ubcc0\uacbd: [${resolvedCondition}]`);
await updateJoinConditionInEditForm(resolvedCondition);
await _0x1001(250);
}
if(targetPeopleNum){
console.log(`[\uac00\uaca9\uc218\uc815] \ubaa9\ud45c \uc778\uc6d0 \ubcc0\uacbd: [${targetPeopleNum}\uba85]`);
await updatePeopleCountInEditForm(targetPeopleNum);
await _0x1001(250);
}
}else{
console.log(`[\uac00\uaca9\uc218\uc815] \uc591\ub3c4 \uc218\uc815 \ubaa8\ub4dc \ud655\uc778\ub428 -> \uc870\uc778 \uc870\uac74 \ubc0f \uc694\uccad \uc778\uc6d0 \ubcc0\uacbd \ub2e8\uacc4 \uc0dd\ub7b5`);
}
console.log("[\uac00\uaca9\uc218\uc815] \ud558\ub2e8 '\uc218\uc815\ud558\uae30' \ubc84\ud2bc \ub77c\uc774\ube0c \ud0d0\uc0c9 \ubc0f \uc81c\ucd9c \uc2e4\ud589\x2e\x2e\x2e");
const liveSubmitBtn=findEditSubmitButton();
if(!liveSubmitBtn){
console.error("[\uac00\uaca9\uc218\uc815] '\uc218\uc815\ud558\uae30' \ubc84\ud2bc\uc744 \ucc3e\uc9c0 \ubabb\ud568");
return false;
}
console.log(`[\uac00\uaca9\uc218\uc815] live '\uc218\uc815\ud558\uae30' \ubc84\ud2bc \ubc1c\uacac (${liveSubmitBtn.tagName}, ${liveSubmitBtn.textContent.trim()}) -> \ub2e8 1\ud68c \ud074\ub9ad \uc2e4\ud589`);
await clickSubmitButtonReliably(liveSubmitBtn,item);
await _0x1001(400);
const submitOk=await _0x1023('\uac00\uaca9\uc218\uc815');
if(!submitOk){
return false;
}
console.log("[\uac00\uaca9\uc218\uc815] '\uc218\uc815\ud558\uae30' \uc81c\ucd9c \ubc0f \ud31d\uc5c5 [\ud655\uc778] \ucc98\ub9ac \uc644\ub8cc!");
await exitEditFormToList();
return true;
}
async function executeSingleBack(){
console.log("[\ubcf5\uadc0] \uc0c1\ub2e8 \ub4a4\ub85c\uac00\uae30(\u2190) \ub2e8 \x31\ud68c \uc2e4\ud589\x2e\x2e\x2e");
resetEditSubmitLock();
let backBtn=null;
const headerCandidates=Array.from(document.querySelectorAll('\x2e\x71-\x68\x65\x61\x64\x65\x72, \x68\x65\x61\x64\x65\x72, \x2e\x71-\x74\x6f\x6f\x6c\x62\x61\x72, [\x63\x6c\x61\x73\x73*="\x68\x65\x61\x64\x65\x72"], [\x63\x6c\x61\x73\x73*="\x74\x6f\x6f\x6c\x62\x61\x72"]'))
.filter(el=>el.offsetHeight>0&&el.getBoundingClientRect().top<=65);
for(const h of headerCandidates){
const clickables=Array.from(h.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x69, \x2e\x71-\x69\x63\x6f\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72, \x61, \x73\x70\x61\x6e'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const r=el.getBoundingClientRect();
return r.left<80&&r.top<65;
});
if(clickables.length>0){
clickables.sort((a,b)=>a.getBoundingClientRect().left-b.getBoundingClientRect().left);
backBtn=clickables[0].closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72')||clickables[0];
break;
}
}
if(!backBtn){
const topElements=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x69, \x2e\x71-\x69\x63\x6f\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x2e\x63\x75\x72\x73\x6f\x72-\x70\x6f\x69\x6e\x74\x65\x72'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const r=el.getBoundingClientRect();
return r.left>=0&&r.left<80&&r.top>=0&&r.top<65;
});
if(topElements.length>0){
topElements.sort((a,b)=>a.getBoundingClientRect().left-b.getBoundingClientRect().left);
backBtn=topElements[0];
}
}
if(backBtn&&backBtn.offsetHeight>0){
console.log(`[\ubcf5\uadc0] \uc88c\uc0c1\ub2e8 \ub4a4\ub85c\uac00\uae30(\u2190) \ubc84\ud2bc \ubc1c\uacac -> 1\ud68c \ud074\ub9ad (${backBtn.tagName}, class=${backBtn.className})`);
backBtn.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x33\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x33\x42\x38\x32\x46\x36','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await _0x1001(100);
try{
backBtn.click();
}catch(e){
await _0x1005(backBtn);
}
}else{
console.log("[\ubcf5\uadc0] \uc88c\uc0c1\ub2e8 \ub4a4\ub85c\uac00\uae30 \ubc84\ud2bc \ubbf8\ubc1c\uacac -> \x77\x69\x6e\x64\x6f\x77\x2e\x68\x69\x73\x74\x6f\x72\x79\x2e\x62\x61\x63\x6b() \x31\ud68c \ud638\ucd9c");
window.history.back();
}
await _0x1001(600);
return true;
}
async function exitEditFormToList(){
console.log("[\ubcf5\uadc0] \uc218\uc815\x2f\uc0c1\uc138 \ud654\uba74\uc5d0\uc11c '\ub4f1\ub85d \uc0c1\ud488 \ub0b4\uc5ed' \ubaa9\ub85d\uc73c\ub85c \ubcf5\uadc0 \uc2dc\ub3c4\x2e\x2e\x2e");
resetEditSubmitLock();
if(_0x102c()||(window.location.href.includes('\x2f\x70\x72\x6f\x64\x75\x63\x74\x2f\x6c\x69\x73\x74')&&!isEditPage()&&!isDetailPage())){
console.log("[\ubcf5\uadc0] \uc774\ubbf8 '\ub4f1\ub85d \uc0c1\ud488 \ub0b4\uc5ed' \ubaa9\ub85d \ud654\uba74\uc785\ub2c8\ub2e4\x2e (\ub4a4\ub85c\uac00\uae30 \uc0dd\ub7b5)");
return true;
}
if(isEditPage()){
console.log("[\ubcf5\uadc0] \uc218\uc815 \ud3fc \ud654\uba74 \uac10\uc9c0 -> \uc88c\uc0c1\ub2e8 \ub4a4\ub85c\uac00\uae30(\u2190) \x31\ud68c \uc2e4\ud589");
await executeSingleBack();
for(let w=0;w<25;w++){
await _0x1001(100);
if(_0x102c()||(window.location.href.includes('\x2f\x70\x72\x6f\x64\x75\x63\x74\x2f\x6c\x69\x73\x74')&&!isEditPage()&&!isDetailPage())){
console.log("[\ubcf5\uadc0] \u2705 '\ub4f1\ub85d \uc0c1\ud488 \ub0b4\uc5ed' \ubaa9\ub85d \ubcf5\uadc0 \ud655\uc778 \uc644\ub8cc!");
await _0x1001(250);
return true;
}
if(isDetailPage())break;
}
}
if(isDetailPage()){
console.log("[\ubcf5\uadc0] \uc0c1\uc138 \ud654\uba74 \uac10\uc9c0 -> \uc88c\uc0c1\ub2e8 \ub4a4\ub85c\uac00\uae30(\u2190) \x31\ud68c \uc2e4\ud589\ud558\uc5ec \ubaa9\ub85d \ubcf5\uadc0");
await executeSingleBack();
for(let w=0;w<25;w++){
await _0x1001(100);
if(_0x102c()||(window.location.href.includes('\x2f\x70\x72\x6f\x64\x75\x63\x74\x2f\x6c\x69\x73\x74')&&!isEditPage()&&!isDetailPage())){
console.log("[\ubcf5\uadc0] \u2705 '\ub4f1\ub85d \uc0c1\ud488 \ub0b4\uc5ed' \ubaa9\ub85d \ubcf5\uadc0 \ud655\uc778 \uc644\ub8cc!");
await _0x1001(250);
return true;
}
}
}
for(let w=0;w<20;w++){
await _0x1001(100);
if(_0x102c()||(window.location.href.toLowerCase().includes('\x2f\x70\x72\x6f\x64\x75\x63\x74\x2f\x6c\x69\x73\x74')&&!isEditPage()&&!isDetailPage())){
console.log("[\ubcf5\uadc0] \u2705 '\ub4f1\ub85d \uc0c1\ud488 \ub0b4\uc5ed' \ubaa9\ub85d \ubcf5\uadc0 \ud655\uc778 \uc644\ub8cc!");
await _0x1001(200);
return true;
}
}
let myPostsBtn=_0x1029();
if(myPostsBtn||window.location.href.toLowerCase().includes('\x2f\x6d\x79\x70\x61\x67\x65')){
console.log("[\ubcf5\uadc0] \ub9c8\uc774\ud398\uc774\uc9c0 \ud648 \uac10\uc9c0 -> \ud654\uba74\uc758 '\ub0b4\uac00 \ub4f1\ub85d\ud55c \uc0c1\ud488 \ub0b4\uc5ed' \ubc84\ud2bc \uc989\uc2dc \ud074\ub9ad\ud558\uc5ec \ubaa9\ub85d \ubcf5\uc6d0!");
for(let retry=0;retry<5;retry++){
myPostsBtn=_0x1029();
if(myPostsBtn){
myPostsBtn.scrollIntoView({block:'\x6e\x65\x61\x72\x65\x73\x74',inline:'\x63\x65\x6e\x74\x65\x72',behavior:'\x69\x6e\x73\x74\x61\x6e\x74'});
myPostsBtn.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x30\x30\x65\x36\x37\x36','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await _0x1001(80);
await _0x1005(myPostsBtn);
try{myPostsBtn.click();}catch(e){}
const innerLink=myPostsBtn.querySelector('\x61, \x62\x75\x74\x74\x6f\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||myPostsBtn.closest('\x61, \x62\x75\x74\x74\x6f\x6e, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]');
if(innerLink&&innerLink!==myPostsBtn){
try{innerLink.click();}catch(e){}
}
}
await _0x1001(300);
if(_0x102c()||window.location.href.toLowerCase().includes('\x2f\x70\x72\x6f\x64\x75\x63\x74\x2f\x6c\x69\x73\x74')){
console.log("[\ubcf5\uadc0] \u2705 '\ub4f1\ub85d \uc0c1\ud488 \ub0b4\uc5ed' \ubaa9\ub85d \ubcf5\uadc0 \ud655\uc778 \uc644\ub8cc (\ub9c8\uc774\ud398\uc774\uc9c0\uc5d0\uc11c \ubcf5\uc6d0 \uc131\uacf5)!");
await _0x1001(250);
return true;
}
}
}
return _0x102c();
}
async function navigateBackToList(filterType=''){
console.log("[\uac00\uaca9\uc218\uc815] '\ub4f1\ub85d \uc0c1\ud488 \ub0b4\uc5ed' \ubaa9\ub85d \ud654\uba74 \uc548\uc804 \ubcf5\uadc0 \ud655\uc778\x2e\x2e\x2e");
resetEditSubmitLock();
if(_0x102c()){
if(filterType&&(filterType==='\uc591\ub3c4'||filterType==='\uc870\uc778'||filterType==='\uc804\uccb4')){
await _0x103f(filterType);
}
return true;
}
if(isEditPage()||isDetailPage()){
await exitEditFormToList();
if(_0x102c()){
if(filterType&&(filterType==='\uc591\ub3c4'||filterType==='\uc870\uc778'||filterType==='\uc804\uccb4')){
await _0x103f(filterType);
}
return true;
}
}
const myPostsBtn=_0x1029();
if(myPostsBtn){
console.log("[\uac00\uaca9\uc218\uc815] \ub9c8\uc774\ud398\uc774\uc9c0 \uac10\uc9c0 -> \ud654\uba74\uc758 '\ub0b4\uac00 \ub4f1\ub85d\ud55c \uc0c1\ud488 \ub0b4\uc5ed' \ubc84\ud2bc \ud074\ub9ad\ud558\uc5ec \ubaa9\ub85d \ubcf5\uadc0");
myPostsBtn.scrollIntoView({block:'\x6e\x65\x61\x72\x65\x73\x74',inline:'\x63\x65\x6e\x74\x65\x72',behavior:'\x69\x6e\x73\x74\x61\x6e\x74'});
await _0x1001(80);
await _0x1005(myPostsBtn);
try{myPostsBtn.click();}catch(e){}
for(let w=0;w<30;w++){
await _0x1001(150);
if(_0x102c()){
console.log("[\uac00\uaca9\uc218\uc815] '\ub4f1\ub85d \uc0c1\ud488 \ub0b4\uc5ed' \ubaa9\ub85d \ubcf5\uadc0 \uc131\uacf5!");
await _0x1001(300);
if(filterType&&(filterType==='\uc591\ub3c4'||filterType==='\uc870\uc778'||filterType==='\uc804\uccb4')){
await _0x103f(filterType);
}
return true;
}
}
}
const regBtn=_0x1008();
if(regBtn||_0x102b()){
console.log("[\uac00\uaca9\uc218\uc815] \ubd80\ud0b9\ud504\ub77c\uc790 \ud654\uba74 \uac10\uc9c0 -> '\ub4f1\ub85d \u00b7 \ub0b4\uae00\ubcf4\uae30' -> \ud50c\ub85c\ud305 '\ub0b4\uae00 \ubcf4\uae30' \uc5f0\ub3d9");
await _0x100a(regBtn);
await _0x1001(350);
await _0x1028(10);
for(let w=0;w<30;w++){
await _0x1001(150);
if(_0x102c()){
if(filterType&&(filterType==='\uc591\ub3c4'||filterType==='\uc870\uc778'||filterType==='\uc804\uccb4')){
await _0x103f(filterType);
}
return true;
}
}
}
return _0x102c();
}
async function executeBatchPriceUpdate(items,delayPreset='\x73\x61\x66\x65',stepPreset='\x68\x75\x6d\x61\x6e',filterType='',confirmMismatch=true,customMemo='',resumeState=null){
if(!items||items.length===0)return;
const myRunId=++_activeMacroRunId;
isRegistrationRunning=true;
_priceUpdateRunning=true;
shouldStopRegistration=false;
_submitLocked=false;
_submittedUrls=new Set();
_submittedItems=new Set();
resetEditSubmitLock();
try{
chrome.storage.local.set({isRegistrationRunning:true});
}catch(e){}
const totalOverallCount=(resumeState&&resumeState.totalOverallCount)?resumeState.totalOverallCount:items.length;
const processedPostIds=new Set(Array.isArray(resumeState?.processedPostIds)?resumeState.processedPostIds:[]);
let successCount=(resumeState&&typeof resumeState.successCount==='\x6e\x75\x6d\x62\x65\x72')?resumeState.successCount:0;
let globalIndex=(resumeState&&typeof resumeState.globalIndexOffset==='\x6e\x75\x6d\x62\x65\x72')?resumeState.globalIndexOffset:0;
saveActiveBatchState({
macroType:'\x50\x52\x49\x43\x45\x5f\x55\x50\x44\x41\x54\x45',
remainingItems:items,
totalOverallCount:totalOverallCount,
globalIndexOffset:globalIndex,
successCount:successCount,
processedPostIds:Array.from(processedPostIds),
delayPreset:delayPreset,
stepPreset:stepPreset,
filterType:filterType,
confirmMismatch:confirmMismatch,
customMemo:customMemo,
needsHistoryBack:true,
interruptedItemLabel:items[0]?`${items[0].golf} (${items[0].date} ${items[0].time})`:''
});
if(resumeState){
console.log(`\ud83d\udd04 [\uace8\ud504\ubaac \ubcc0\ub3d9\uc218\uc815 \ub9e4\ud06c\ub85c \uc790\ub3d9 \uc7ac\uac1c] \uc911\ub2e8\ub410\ub358 [${globalIndex+1}/${totalOverallCount}]\ubc88\uc9f8 \ud0c0\uc784\ubd80\ud130 \uc774\uc5b4\uc11c \uc9c4\ud589\ud569\ub2c8\ub2e4! (\ub0a8\uc740 \ud0c0\uc784: ${items.length}\uac74)`);
}else{
console.log(`\ud83d\ude80 [\uace8\ud504\ubaac \ubcc0\ub3d9\uc218\uc815 \ub9e4\ud06c\ub85c \uc2dc\uc791] \ucd1d ${totalOverallCount}\uac74 (\ub3d9\uc77c \ub0a0\uc9dc/\uc2dc\uac04/\uad6c\uc7a5 \uc911 \uac00\uaca9\u00b7\uc778\uc6d0 \ubcc0\ub3d9 \uac74\ub9cc \uc815\ubc00 \uc218\uc815)`);
chrome.runtime.sendMessage({type:'\x50\x52\x49\x43\x45\x5f\x55\x50\x44\x41\x54\x45\x5f\x53\x54\x41\x52\x54\x45\x44',total:totalOverallCount});
}
const courseGroups={};
for(const it of items){
const key=`${it.date}_${it.golf}`;
if(!courseGroups[key]){
courseGroups[key]={
date:it.date,
golf:it.golf,
rawGolf:it.rawGolf||it.golf,
region:it.region,
roomType:it.roomType,
items:[]
};
}else if(it.roomType==='\uc870\uc778'&&courseGroups[key].roomType==='\uc591\ub3c4'){
courseGroups[key].roomType='\uc870\uc778';
}
courseGroups[key].items.push(it);
}
const groupKeyList=Object.keys(courseGroups);
const parseFeeMan=(f)=>{
const num=parseFloat((f||'').toString().replace(/[^\d.]/g,''));
if(isNaN(num))return null;
return num>=1000?Math.round((num/10000)*10)/10:num;
};
const normalizeTimeDigits=(t)=>(t||'').toString().replace(/[^\d]/g,'');
try{
for(let gIdx=0;gIdx<groupKeyList.length;gIdx++){
if(shouldStopRegistration||_activeMacroRunId!==myRunId)break;
const groupKey=groupKeyList[gIdx];
const group=courseGroups[groupKey];
const remainingInFutureGroups=groupKeyList.slice(gIdx+1).flatMap(k=>courseGroups[k].items);
saveActiveBatchState({
macroType:'\x50\x52\x49\x43\x45\x5f\x55\x50\x44\x41\x54\x45',
remainingItems:[...group.items,...remainingInFutureGroups],
totalOverallCount:totalOverallCount,
globalIndexOffset:globalIndex,
successCount:successCount,
processedPostIds:Array.from(processedPostIds),
delayPreset:delayPreset,
stepPreset:stepPreset,
filterType:filterType,
confirmMismatch:confirmMismatch,
customMemo:customMemo,
needsHistoryBack:true,
interruptedItemLabel:group.items[0]?`${group.items[0].golf} (${group.items[0].date} ${group.items[0].time})`:`${group.golf} (${group.date})`
});
console.log(`\n================== [\ubcc0\ub3d9\uc218\uc815] ${group.golf} (${group.date}) \ud0c0\uc784 \uac80\uc0ac \uc2dc\uc791 (${group.items.length}\uac74) ==================`);
const groupCategory=(filterType==='\uc591\ub3c4'||filterType==='\uc870\uc778')
?filterType
:(group.roomType==='\uc591\ub3c4'?'\uc591\ub3c4':'\uc870\uc778');
if(!_0x102c()||isEditPage()||isDetailPage()||_0x102b()||_0x102a()){
await navigateBackToList(groupCategory);
await _0x1001(350);
}
if(shouldStopRegistration||_activeMacroRunId!==myRunId)break;
await _0x1001(250);
if(group.region&&group.region!=='\uc804\uccb4'){
await _0x103d(group.region);
await _0x1001(200);
}else{
await _0x103d('\uc804\uccb4');
await _0x1001(200);
}
if(shouldStopRegistration)break;
if(group.date){
if(!_0x1038(group.date)){
console.log(`[\ubcc0\ub3d9\uc218\uc815] \ud83d\udcc5 [${group.golf}] \uc2dc\uc791 \ub0a0\uc9dc(${group.date}) \ubbf8\uc120\ud0dd \uac10\uc9c0 -> \uc120\ud0dd \uc2e4\ud589...`);
await _0x103c(group.date);
await _0x1001(350);
}else{
console.log(`[\ubcc0\ub3d9\uc218\uc815] \ud83d\udcc5 [${group.golf}] \uc2dc\uc791 \ub0a0\uc9dc(${group.date}) \uc774\ubbf8 \uc815\uc0c1 \uc120\ud0dd \ud655\uc778\ub428 -> \ud074\ub9ad \uc0dd\ub7b5 (\ub0a0\uc9dc \ud574\uc81c \ubc29\uc9c0)`);
}
}
if(shouldStopRegistration)break;
await _0x103f(groupCategory);
await _0x1001(150);
const isDateMatchingTarget=!group.date||_0x1038(group.date);
let existingCards=[];
if(!isDateMatchingTarget){
const currentActiveDay=_0x1037();
console.log(`[\ubcc0\ub3d9\uc218\uc815] \u26a0\ufe0f [${group.golf}] \uc9c0\uc5ed(${group.region}) \uc120\ud0dd \ud6c4 \ubaa9\ud45c \ub0a0\uc9dc(${group.date})\uac00 \uc544\ub2cc \ub2e4\ub978 \ub0a0\uc9dc(${currentActiveDay?currentActiveDay+'\uc77c':''})\ub85c \uc804\ud658\ub428 -> \ud574\ub2f9 \ub0a0\uc9dc\uc5d0 \uae00\uc774 \uc5c6\uc73c\ubbc0\ub85c \ubcc0\ub3d9\uc218\uc815 \uac74\ub108\ub700`);
existingCards=[];
}else{
for(let r=0;r<5;r++){
existingCards=findExistingCardsForCourse(group.golf,group.rawGolf,groupCategory,group.date);
if(existingCards.length>0)break;
await _0x1001(300);
}
if(existingCards.length===0&&group.region&&group.region!=='\uc804\uccb4'){
console.log(`[\ubcc0\ub3d9\uc218\uc815] ${group.golf}: \uc9c0\uc815 \uc9c0\uc5ed(${group.region})\uc5d0 \uce74\ub4dc\uac00 \uc5c6\uc5b4 \uc9c0\uc5ed '\uc804\uccb4'\ub85c \uc7ac\ud0d0\uc0c9...`);
await _0x103d('\uc804\uccb4');
await _0x103f(groupCategory);
if(group.date&&!_0x1038(group.date)){
await _0x103c(group.date);
await _0x1001(350);
}
if(_0x1038(group.date)){
existingCards=findExistingCardsForCourse(group.golf,group.rawGolf,groupCategory,group.date);
}
if(existingCards.length===0){
await _0x103d(group.region);
await _0x1001(200);
if(group.date&&!_0x1038(group.date)){
await _0x103c(group.date);
await _0x1001(350);
}
}
}
}
console.log(`[\ubcc0\ub3d9\uc218\uc815] \ud83d\udcca [${group.golf} ${group.date}] \uae30\uc874 \ub4f1\ub85d\uae00 \uc218 \ud30c\uc545: ${existingCards.length}\uac74 (${existingCards.map(c=>c.timeStr).join(', ')})`);
for(let itemIdx=0;itemIdx<group.items.length;itemIdx++){
if(shouldStopRegistration)break;
const item=group.items[itemIdx];
globalIndex++;
try{
saveActiveBatchState({
macroType:'\x50\x52\x49\x43\x45\x5f\x55\x50\x44\x41\x54\x45',
remainingItems:[...group.items.slice(itemIdx),...remainingInFutureGroups],
totalOverallCount:totalOverallCount,
globalIndexOffset:globalIndex-1,
successCount:successCount,
processedPostIds:Array.from(processedPostIds),
delayPreset:delayPreset,
stepPreset:stepPreset,
filterType:filterType,
confirmMismatch:confirmMismatch,
customMemo:customMemo,
needsHistoryBack:true,
interruptedItemLabel:`${item.golf} (${item.date} ${item.time})`
});
const targetDigits=normalizeTimeDigits(item.time);
const targetFeeMan=parseFeeMan(item.fee);
const targetPeopleMatch=(item.sizenum||'').toString().match(/\d+/);
const targetPeopleNum=targetPeopleMatch?targetPeopleMatch[0]:'';
const targetDate=item.date||group.date;
chrome.runtime.sendMessage({
type:'\x50\x52\x49\x43\x45\x5f\x55\x50\x44\x41\x54\x45\x5f\x50\x52\x4f\x47\x52\x45\x53\x53',
current:globalIndex,
total:totalOverallCount,
golf:item.golf,
rawGolf:item.rawGolf,
date:item.date,
time:item.time,
fee:item.fee,
regId:item.regId
});
if(targetDate){
if(!_0x1038(targetDate)){
console.log(`[\ubcc0\ub3d9\uc218\uc815] \ud83d\udcc5 \ub300\uc0c1 \ub0a0\uc9dc(${targetDate}) \ubbf8\uc120\ud0dd \uac10\uc9c0 -> \uc120\ud0dd \uc2e4\ud589...`);
await _0x103c(targetDate);
await _0x1001(250);
}else{
console.log(`[\ubcc0\ub3d9\uc218\uc815] \ud83d\udcc5 \ub300\uc0c1 \ub0a0\uc9dc(${targetDate}) \uc774\ubbf8 \uc815\uc0c1 \uc120\ud0dd \ud655\uc778\ub428 -> \ud074\ub9ad \uc0dd\ub7b5 (\ub0a0\uc9dc \ud574\uc81c \ubc29\uc9c0)`);
}
}
let sameTimeCards=existingCards.filter(c=>{
if(c.postId&&processedPostIds.has(c.postId))return false;
const cDigits=normalizeTimeDigits(c.timeStr||c.timeDigits);
return cDigits===targetDigits;
});
if(sameTimeCards.length===0){
window.scrollBy(0,350);
await _0x1001(250);
const scrolledCards=findExistingCardsForCourse(group.golf,group.rawGolf,groupCategory,group.date);
window.scrollTo(0,0);
const retrySameTime=scrolledCards.filter(c=>{
if(c.postId&&processedPostIds.has(c.postId))return false;
const cDigits=normalizeTimeDigits(c.timeStr||c.timeDigits);
return cDigits===targetDigits;
});
if(retrySameTime.length>0){
sameTimeCards=retrySameTime;
}
}
if(sameTimeCards.length===0){
console.warn(`[\ubcc0\ub3d9\uc218\uc815] \u26a0\ufe0f ${item.golf} (${item.date} ${item.time}): \ub3d9\uc77c\ud55c \uc2dc\uac04\uc758 \uae30\uc874 \ub4f1\ub85d\uae00 \uc5c6\uc74c -> \uac74\ub108\ub700 (\uc2e0\uaddc\ub4f1\ub85d \uc77c\uc808 \ubc30\uc81c)`);
continue;
}
let targetCardToModify=null;
let changeReason='';
for(const card of sameTimeCards){
const cardFeeMan=card.feeManVal;
const cardPeopleMatch=(card.peopleStr||card.rawTxt).match(/(\d+)\s*(?:명|인)/);
const cardPeopleNum=cardPeopleMatch?cardPeopleMatch[1]:'';
let feeChanged=false;
if(targetFeeMan!==null&&cardFeeMan!==null){
feeChanged=(Math.abs(cardFeeMan-targetFeeMan)>=0.1);
}else if(item.isPriceDropped===true){
feeChanged=true;
}else if(item.prevFee&&item.fee){
const pNum=parseFloat(item.prevFee.toString().replace(/[^\d.]/g,''));
const nNum=parseFloat(item.fee.toString().replace(/[^\d.]/g,''));
if(!isNaN(pNum)&&!isNaN(nNum))feeChanged=(Math.abs(pNum-nNum)>=0.1);
}
let peopleChanged=false;
if(targetPeopleNum&&cardPeopleNum){
peopleChanged=(targetPeopleNum!==cardPeopleNum);
}
if(feeChanged||peopleChanged){
targetCardToModify=card;
const reasons=[];
if(feeChanged)reasons.push(`\uac00\uaca9 ${cardFeeMan!==null?cardFeeMan+'\ub9cc':'\uae30\uc874'} \u2794 ${targetFeeMan!==null?targetFeeMan+'\ub9cc':item.fee+'\ub9cc'}`);
if(peopleChanged)reasons.push(`\uc778\uc6d0 ${cardPeopleNum}\uba85 \u2794 ${targetPeopleNum}\uba85`);
changeReason=reasons.join(', ');
break;
}
}
if(!targetCardToModify){
const firstCard=sameTimeCards[0];
console.log(`[\ubcc0\ub3d9\uc218\uc815] \u23ed\ufe0f ${item.golf} (${item.date} ${item.time}): \uac00\uaca9(${firstCard.feeManVal??'-'}\ub9cc) \ubc0f \uc778\uc6d0(${firstCard.peopleStr||'-'}) \ubcc0\ub3d9 \uc5c6\uc74c -> \uc218\uc815 \ubd88\ud544\uc694 (\uac74\ub108\ub700)`);
continue;
}
console.log(`[\ubcc0\ub3d9\uc218\uc815] \ud83c\udfaf [${globalIndex}/${items.length}] ${item.golf} (${item.date} ${item.time}) \ubcc0\ub3d9 \uac10\uc9c0 [${changeReason}] -> \uc218\uc815 \uc9c4\ud589!`);
if(isEditPage()||isDetailPage()||!_0x102c()||_0x102b()||_0x102a()){
await navigateBackToList(groupCategory);
await _0x103f(groupCategory);
if(group.region&&group.region!=='\uc804\uccb4')await _0x103d(group.region);
await _0x1001(250);
}
if(targetDate){
if(!_0x1038(targetDate)){
console.log(`[\ubcc0\ub3d9\uc218\uc815] \ud83d\udcc5 \uce74\ub4dc \ud074\ub9ad \uc804 \ub300\uc0c1 \ub0a0\uc9dc(${targetDate}) \ubbf8\uc120\ud0dd \uac10\uc9c0 -> \uc120\ud0dd \uc2e4\ud589...`);
await _0x103c(targetDate);
await _0x1001(350);
}else{
console.log(`[\ubcc0\ub3d9\uc218\uc815] \ud83d\udcc5 \uce74\ub4dc \ud074\ub9ad \uc804 \ub300\uc0c1 \ub0a0\uc9dc(${targetDate}) \uc774\ubbf8 \uc815\uc0c1 \uc120\ud0dd \ud655\uc778\ub428 -> \ud074\ub9ad \uc0dd\ub7b5 (\ub0a0\uc9dc \ud574\uc81c \ubc29\uc9c0)`);
}
}
const cardClicked=await clickPostCardReliably(targetCardToModify.el);
if(!cardClicked||shouldStopRegistration){
console.warn(`[\ubcc0\ub3d9\uc218\uc815] ${item.golf} (${item.time}) \uce74\ub4dc \ud074\ub9ad \uc2e4\ud328`);
await navigateBackToList(groupCategory);
continue;
}
const detailTypeInPriceUpdate=detectCurrentDetailPageType();
if((groupCategory==='\uc591\ub3c4'&&detailTypeInPriceUpdate==='\uc870\uc778')||
(groupCategory==='\uc870\uc778'&&detailTypeInPriceUpdate==='\uc591\ub3c4')){
console.warn(`[\ubcc0\ub3d9\uc218\uc815] \u26a0\ufe0f [${groupCategory}] \uc218\uc815 \ubaa9\ud45c\uc778\ub370 \uc0c1\uc138 \ud398\uc774\uc9c0\uac00 [${detailTypeInPriceUpdate}]\ub85c \ud655\uc778\ub418\uc5b4 \uc989\uc2dc \ubcf5\uadc0\ud569\ub2c8\ub2e4.`);
await navigateBackToList(groupCategory);
await _0x103f(groupCategory);
continue;
}
const editOpened=await openMenuAndClickEdit();
if(!editOpened||shouldStopRegistration){
console.warn(`[\ubcc0\ub3d9\uc218\uc815] ${item.golf} (${item.time}) '\uc218\uc815' \uba54\ub274 \uc9c4\uc785 \uc2e4\ud328`);
await navigateBackToList(groupCategory);
continue;
}
const editTypeInPriceUpdate=await ensureCorrectEditRouteAndType(groupCategory,1500);
if((groupCategory==='\uc591\ub3c4'&&editTypeInPriceUpdate==='\uc870\uc778')||
(groupCategory==='\uc870\uc778'&&editTypeInPriceUpdate==='\uc591\ub3c4')){
console.warn(`[\ubcc0\ub3d9\uc218\uc815] \u26a0\ufe0f [${groupCategory}] \uc218\uc815 \ubaa9\ud45c\uc778\ub370 [${editTypeInPriceUpdate} \uc218\uc815] \ud654\uba74\uc774 \uac10\uc9c0\ub418\uc5b4 \uc989\uc2dc \ubcf5\uadc0\ud569\ub2c8\ub2e4.`);
await navigateBackToList(groupCategory);
await _0x103f(groupCategory);
continue;
}
const editSuccess=await editFeeAndPeopleAndSubmit(item);
if(editSuccess){
successCount++;
if(targetCardToModify.postId)processedPostIds.add(targetCardToModify.postId);
console.log(`\u2705 [\ubcc0\ub3d9\uc218\uc815 \uc644\ub8cc] [${globalIndex}/${totalOverallCount}] ${item.golf} (${item.date} ${item.time}): ${changeReason} \uc218\uc815 \uc131\uacf5! (\ub204\uc801: ${successCount}\uac74)`);
chrome.runtime.sendMessage({
type:'\x49\x54\x45\x4d\x5f\x50\x52\x49\x43\x45\x5f\x55\x50\x44\x41\x54\x45\x5f\x53\x55\x43\x43\x45\x53\x53',
regId:item.regId,
item:item,
newTime:item.time,
newFee:item.fee
});
const nextRemaining=[...group.items.slice(itemIdx+1),...remainingInFutureGroups];
if(nextRemaining.length>0){
saveActiveBatchState({
macroType:'\x50\x52\x49\x43\x45\x5f\x55\x50\x44\x41\x54\x45',
remainingItems:nextRemaining,
totalOverallCount:totalOverallCount,
globalIndexOffset:globalIndex,
successCount:successCount,
processedPostIds:Array.from(processedPostIds),
delayPreset:delayPreset,
stepPreset:stepPreset,
filterType:filterType,
confirmMismatch:confirmMismatch,
customMemo:customMemo,
needsHistoryBack:true,
interruptedItemLabel:`${nextRemaining[0].golf} (${nextRemaining[0].date} ${nextRemaining[0].time})`
});
}else{
clearActiveBatchState();
}
await navigateBackToList(groupCategory);
if(group.region&&group.region!=='\uc804\uccb4')await _0x103d(group.region);
if(targetDate&&!_0x1038(targetDate))await _0x103c(targetDate);
await _0x1001(_0x1004(delayPreset||'\x73\x61\x66\x65'));
existingCards=findExistingCardsForCourse(group.golf,group.rawGolf,groupCategory,group.date);
}else{
console.warn(`[\ubcc0\ub3d9\uc218\uc815] ${item.golf} (${item.time}) \uc218\uc815 \ud3fc \uc81c\ucd9c \uc2e4\ud328`);
await navigateBackToList(groupCategory);
}
}catch(itemErr){
console.error(`[\ubcc0\ub3d9\uc218\uc815] \u26a0\ufe0f [${globalIndex}/${totalOverallCount}] ${item.golf} (${item.time}) \ucc98\ub9ac \uc911 \uc608\uc678 \ubc1c\uc0dd (\ub2e4\uc74c \uac74 \uc548\uc804 \uc9c4\ud589):`,itemErr);
try{await navigateBackToList(groupCategory);}catch(e){}
}
}
}
}catch(fatalErr){
console.error('[\ubcc0\ub3d9\uc218\uc815] \uce58\uba85\uc801 \uc624\ub958 \uac10\uc9c0 (\ube44\uc815\uc0c1 \uba48\ucda4 \ubc29\uc9c0)\x3a',fatalErr);
}finally{
if(_activeMacroRunId!==myRunId)return;
isRegistrationRunning=false;
_priceUpdateRunning=false;
if(_isPageUnloading)return;
clearActiveBatchState();
try{chrome.storage.local.set({isRegistrationRunning:false});}catch(e){}
if(shouldStopRegistration){
chrome.runtime.sendMessage({type:'\x50\x52\x49\x43\x45\x5f\x55\x50\x44\x41\x54\x45\x5f\x53\x54\x4f\x50\x50\x45\x44',total:totalOverallCount,successCount});
}else{
chrome.runtime.sendMessage({type:'\x50\x52\x49\x43\x45\x5f\x55\x50\x44\x41\x54\x45\x5f\x43\x4f\x4d\x50\x4c\x45\x54\x45\x44',total:totalOverallCount,successCount});
}
}
}
let isPostReplacementRunning=false;
async function updateTimeInEditForm(targetTime){
if(!targetTime)return false;
const digits=targetTime.replace(/[^\d]/g,'');
const cleanTime=(digits.length===4)?digits:targetTime.trim();
console.log(`[\uad50\uccb4\uc218\uc815] \uc2dc\uac04 \ubcc0\uacbd \uc785\ub825 \uc2dc\uc791: \ubaa9\ud45c [${cleanTime}]...`);
const allInputs=Array.from(document.querySelectorAll('\x69\x6e\x70\x75\x74')).filter(el=>el.offsetHeight>0);
let timeInput=allInputs.find(el=>{
const ph=el.placeholder||'';
return ph.includes('\x31\x36\x30\x30')||ph.includes('\x30\x37\x31\x30')||ph.includes('\uc2dc\uac04');
});
if(!timeInput){
timeInput=allInputs.find(el=>{
const v=(el.value||'').trim();
if(v.includes('-')&&v.length>=8)return false;
return/^\d{1,2}:\d{2}$/.test(v)||/^\d{3,4}$/.test(v);
});
}
if(!timeInput){
const feeSection=Array.from(document.querySelectorAll('\x64\x69\x76, \x6c\x61\x62\x65\x6c, \x73\x70\x61\x6e, \x70'))
.find(el=>{
const txt=el.textContent.trim().replace(/\s+/g,'');
return(txt==='\uadf8\ub9b0\ud53c\ub97c\uc785\ub825\ud558\uc138\uc694'||txt.includes('\uadf8\ub9b0\ud53c'))&&el.offsetHeight>0;
});
const feeInp=feeSection?.parentElement?.querySelector('\x69\x6e\x70\x75\x74')||feeSection?.nextElementSibling?.querySelector('\x69\x6e\x70\x75\x74');
if(feeInp){
const idx=allInputs.indexOf(feeInp);
if(idx>0)timeInput=allInputs[idx-1];
}
}
if(!timeInput){
const nonDateInputs=allInputs.filter(inp=>{
const val=inp.value||'';
return!(val.includes('-')&&val.length>=8);
});
if(nonDateInputs.length>=2){
timeInput=nonDateInputs[0];
}
}
if(timeInput){
timeInput.scrollIntoView({block:'\x63\x65\x6e\x74\x65\x72'});
timeInput.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x30\x30\x65\x36\x37\x36','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await _0x1005(timeInput);
const formattedTime=(timeInput.placeholder&&timeInput.placeholder.includes('\x3a'))
?(digits.length===4?`${digits.slice(0,2)}:${digits.slice(2)}`:cleanTime)
:cleanTime;
await _0x1007(timeInput,formattedTime);
console.log(`[\uad50\uccb4\uc218\uc815] \uc0c8 \uc2dc\uac04(${formattedTime}) \ud55c \uae00\uc790\uc529 \ud0c0\uc774\ud551 \uc785\ub825 \uc644\ub8cc!`);
await _0x1001(200);
return true;
}
console.warn("[\uad50\uccb4\uc218\uc815] \uc2dc\uac04 \uc785\ub825\uce78\uc744 \ucc3e\uc9c0 \ubabb\ud568");
return false;
}
async function editTimeAndFeeAndPeopleAndSubmit(item,maxAttempts=15){
console.log(`[\uad50\uccb4\uc218\uc815] \uc218\uc815 \ud3fc \ucc98\ub9ac \uc2dc\uc791: \uc0c8 \uc2dc\uac04 [${item.time}], \uc0c8 \uadf8\ub9b0\ud53c [${item.fee}\ub9cc], \uc0c8 \uc778\uc6d0 [${item.sizenum||'\ubbf8\uc9c0\uc815'}]...`);
const currentUrlKey=window.location.href;
const hasUniquePostIdInUrl=/\/(?:detail|edit|view|item)\/\d+/.test(currentUrlKey);
if(hasUniquePostIdInUrl&&_submittedUrls&&_submittedUrls.has(currentUrlKey)){
console.warn(`[\uad50\uccb4\uc218\uc815] \ud604\uc7ac \ud398\uc774\uc9c0(${currentUrlKey})\ub294 \uc774\ubbf8 \uc81c\ucd9c \uc644\ub8cc\ub41c \uae00\uc785\ub2c8\ub2e4. (\ub3d9\uc77c \uae00 \uc911\ubcf5 \uc218\uc815 \ubc29\uc9c0) -> \ubcf5\uadc0`);
await executeSingleBack();
await _0x1001(400);
return false;
}
resetEditSubmitLock();
await updateTimeInEditForm(item.time);
await _0x1001(200);
let feeInput=null;
for(let attempt=0;attempt<maxAttempts;attempt++){
if(shouldStopRegistration)return false;
const inputs=Array.from(document.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x6e\x75\x6d\x62\x65\x72"], \x69\x6e\x70\x75\x74[\x69\x6e\x70\x75\x74\x6d\x6f\x64\x65="\x6e\x75\x6d\x65\x72\x69\x63"], \x69\x6e\x70\x75\x74'))
.filter(el=>el.offsetHeight>0);
const validInputs=inputs.filter(inp=>{
const val=inp.value||'';
return!(val.includes('-')&&val.length>=8);
});
const feeSection=Array.from(document.querySelectorAll('\x64\x69\x76, \x6c\x61\x62\x65\x6c, \x73\x70\x61\x6e, \x70'))
.find(el=>{
const txt=el.textContent.trim().replace(/\s+/g,'');
return(txt==='\uadf8\ub9b0\ud53c\ub97c\uc785\ub825\ud558\uc138\uc694'||txt.includes('\uadf8\ub9b0\ud53c'))&&el.offsetHeight>0;
});
if(feeSection){
const nextInp=feeSection.parentElement?.querySelector('\x69\x6e\x70\x75\x74')||feeSection.nextElementSibling?.querySelector('\x69\x6e\x70\x75\x74');
if(nextInp&&nextInp.offsetHeight>0)feeInput=nextInp;
}
if(!feeInput){
feeInput=validInputs.find(inp=>{
const parent=inp.closest('\x2e\x71-\x66\x69\x65\x6c\x64, \x2e\x71-\x69\x6e\x70\x75\x74, \x64\x69\x76\x2e\x72\x6f\x77, \x64\x69\x76\x2e\x63\x6f\x6c, \x64\x69\x76');
const txt=parent?.textContent||'';
const ph=inp.placeholder||'';
return txt.includes('\ub9cc\uc6d0')||txt.includes('\uadf8\ub9b0\ud53c')||ph.includes('\uadf8\ub9b0\ud53c')||ph.includes('\uc22b\uc790');
});
}
if(!feeInput&&validInputs.length>=2){
feeInput=validInputs[validInputs.length-1];
}else if(!feeInput&&validInputs.length===1){
feeInput=validInputs[0];
}
if(feeInput)break;
await _0x1001(200);
}
const cleanFeeNum=(item.fee?.toString()||'').replace(/[^\d.]/g,'');
if(feeInput&&cleanFeeNum){
feeInput.scrollIntoView({block:'\x63\x65\x6e\x74\x65\x72'});
feeInput.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x33\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x66\x66\x39\x38\x30\x30','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await _0x1005(feeInput);
await _0x1007(feeInput,cleanFeeNum);
console.log(`[\uad50\uccb4\uc218\uc815] \uc0c8 \uadf8\ub9b0\ud53c(${cleanFeeNum}\ub9cc\uc6d0) \ud55c \uae00\uc790\uc529 \ud0c0\uc774\ud551 \uc785\ub825 \uc644\ub8cc!`);
await _0x1001(200);
}
if(item.cady){
console.log(`[\uad50\uccb4\uc218\uc815] \uce90\ub514 \uc635\uc158 \ud655\uc778 \ubc0f \ubcc0\uacbd: [${item.cady}]`);
await _0x101d(item.cady,true);
await _0x1001(200);
}
if(item.isMeal!==undefined){
await _0x1019(Boolean(item.isMeal));
await _0x1001(150);
}
const isTransferEditMode=(item.roomType==='\uc591\ub3c4')||
window.location.href.toLowerCase().includes('\x74\x72\x61\x6e\x73\x66\x65\x72')||
Array.from(document.querySelectorAll('\x64\x69\x76, \x73\x70\x61\x6e, \x68\x65\x61\x64\x65\x72, \x2e\x71-\x74\x6f\x6f\x6c\x62\x61\x72')).some(el=>{
if(el.offsetHeight<=0||el.getBoundingClientRect().top>120)return false;
return(el.innerText||el.textContent||'').trim().replace(/\s+/g,'')==='\uc591\ub3c4\uc218\uc815';
});
if(!isTransferEditMode){
const targetPeopleMatch=(item.sizenum||'').toString().match(/\d+/);
const targetPeopleNum=targetPeopleMatch?targetPeopleMatch[0]:'';
let resolvedCondition=item.condition||'';
if(targetPeopleNum&&targetPeopleNum!=='\x32'){
if(!resolvedCondition||resolvedCondition==='\ubd80\ubd80\x2f\ucee4\ud50c'||resolvedCondition.includes('\ubd80\ubd80')||resolvedCondition.includes('\ucee4\ud50c')){
resolvedCondition='\ubb34\uad00';
}
}
if(resolvedCondition){
console.log(`[\uad50\uccb4\uc218\uc815] \uc870\uc778 \uc870\uac74 \uba3c\uc800 \ubcc0\uacbd: [${resolvedCondition}]`);
await updateJoinConditionInEditForm(resolvedCondition);
await _0x1001(250);
}
if(targetPeopleNum){
console.log(`[\uad50\uccb4\uc218\uc815] \ubaa9\ud45c \uc778\uc6d0 \ubcc0\uacbd: [${targetPeopleNum}\uba85]`);
await updatePeopleCountInEditForm(targetPeopleNum);
await _0x1001(250);
}
}else{
console.log(`[\uad50\uccb4\uc218\uc815] \uc591\ub3c4 \uc218\uc815 \ubaa8\ub4dc \ud655\uc778\ub428 -> \uc870\uc778 \uc870\uac74 \ubc0f \uc694\uccad \uc778\uc6d0 \ubcc0\uacbd \ub2e8\uacc4 \uc0dd\ub7b5`);
}
const liveSubmitBtn=findEditSubmitButton();
if(!liveSubmitBtn){
console.error("[\uad50\uccb4\uc218\uc815] '\uc218\uc815\ud558\uae30' \ubc84\ud2bc\uc744 \ucc3e\uc9c0 \ubabb\ud568");
return false;
}
await clickSubmitButtonReliably(liveSubmitBtn,item);
await _0x1001(400);
const submitOk=await _0x1023('\uad50\uccb4\uc218\uc815');
if(!submitOk){
return false;
}
console.log("[\uad50\uccb4\uc218\uc815] '\uc218\uc815\ud558\uae30' \ubc0f \ud31d\uc5c5 [\ud655\uc778] \uc644\ub8cc!");
await exitEditFormToList();
return true;
}
function findExistingCardsForCourse(golfName,rawGolfName,targetRoomType='',targetDateStr=''){
if(targetDateStr&&!_0x1039(targetDateStr)){
console.warn(`[\uce74\ub4dc\ud0d0\uc0c9] \u26a0\ufe0f \ud604\uc7ac \ud654\uba74 \ub0a0\uc9dc\uac00 \ubaa9\ud45c \ub0a0\uc9dc(${targetDateStr})\uc640 \ubd88\uc77c\uce58(\uc624\ub298 \ub0a0\uc9dc \ub4f1\uc73c\ub85c \ud295\uae40 \uac10\uc9c0) -> \ub2e4\ub978 \ub0a0\uc9dc \uae00 \uc624\uc778\uc2dd \uc218\uc815 \uc6d0\ucc9c \ucc28\ub2e8 (0\uac74 \ubc18\ud658)`);
return[];
}
const normG1=_0x1040(golfName);
const normG2=_0x1040(rawGolfName);
const cardCandidates=_0x1043();
const matched=[];
for(const el of cardCandidates){
const rawTxt=(el.innerText||el.textContent||'').toLowerCase();
const normCard=_0x1040(rawTxt);
const golfScore=_0x1042(normCard,normG1,normG2);
if(golfScore===0)continue;
if(targetRoomType&&targetRoomType!=='\uc804\uccb4'){
const cardPostType=_0x1041(el,rawTxt);
if(targetRoomType==='\uc591\ub3c4'){
if(cardPostType==='\uc870\uc778')continue;
if(/조인\s*[1-9]\d*\s*건|\d+\s*명/.test(rawTxt))continue;
}else if(targetRoomType==='\uc870\uc778'){
if(cardPostType==='\uc591\ub3c4')continue;
if(/양도\s*[1-9]\d*\s*건/.test(rawTxt))continue;
}
}
if(targetDateStr){
const targetM=_0x1030(targetDateStr);
const targetD=_0x102f(targetDateStr);
if(targetD){
const cleanTxtForDate=rawTxt
.replace(/(?:등록|수정|작성|접수)[.\s]*\d{1,2}[./\-]\d{1,2}(?:\([월화수목금토일]\))?\s*\d{1,2}:\d{2}/g,'')
.replace(/\d{4}[./\-]\d{1,2}[./\-]\d{1,2}\s*\d{1,2}:\d{2}/g,'')
.replace(/(?:등록|수정|작성|접수)[^.\n\r]{0,20}\d{1,2}[./\-]\d{1,2}/g,'');
const teeDateMatch=cleanTxtForDate.match(/(?:^|[^\d])(\d{1,2})[./\-](\d{1,2})(?:\([월화수목금토일]\))?\s*\d{1,2}:\d{2}/);
if(teeDateMatch){
const cardM=parseInt(teeDateMatch[1],10).toString();
const cardD=parseInt(teeDateMatch[2],10).toString();
if(cardD!==targetD||(targetM&&cardM!==targetM)){
console.warn(`[\uce74\ub4dc\ud0d0\uc0c9] \uce74\ub4dc \ud2f0\ud0c0\uc784 \ub0a0\uc9dc(${cardM}/${cardD})\uac00 \ubaa9\ud45c \ub0a0\uc9dc(${targetDateStr})\uc640 \ub2ec\ub77c \ubc30\uc81c: [${golfName}]`);
continue;
}
}
}
}
let cardPostId='';
const linkEl=el.querySelector('\x61[\x68\x72\x65\x66*="\x2f\x64\x65\x74\x61\x69\x6c\x2f"], \x61[\x68\x72\x65\x66*="\x2f\x76\x69\x65\x77"], \x61[\x68\x72\x65\x66*="\x69\x64="], [\x64\x61\x74\x61-\x69\x64], [\x69\x64*="\x70\x6f\x73\x74"]');
if(linkEl){
const href=linkEl.getAttribute('\x68\x72\x65\x66')||linkEl.dataset.id||linkEl.id||'';
const pIdM=href.match(/[?&]id=(\d+)/)||href.match(/\/(?:detail|item|view)\/(\d+)/)||href.match(/(\d{4,})/);
if(pIdM)cardPostId=pIdM[1];
}
if(!cardPostId){
const anyLink=el.closest('\x61[\x68\x72\x65\x66*="\x2f\x64\x65\x74\x61\x69\x6c\x2f"], \x61[\x68\x72\x65\x66*="\x2f\x76\x69\x65\x77"], \x61[\x68\x72\x65\x66*="\x69\x64="]')||el.querySelector('\x61');
if(anyLink){
const href=anyLink.getAttribute('\x68\x72\x65\x66')||'';
const pIdM=href.match(/[?&]id=(\d+)/)||href.match(/\/(?:detail|item|view)\/(\d+)/);
if(pIdM)cardPostId=pIdM[1];
}
}
const allDateAttachedTimes=Array.from(rawTxt.matchAll(/(?:\d{1,2}[./\-]\d{1,2}|\([월화수목금토일]\))\s*(\d{1,2}:\d{2})/g));
const teeDateAttachedTimes=allDateAttachedTimes.filter(m=>{
const idx=m.index;
const before=rawTxt.substring(Math.max(0,idx-20),idx);
return!/수정|등록|작성|접수/.test(before);
});
const dateAttachedTime=teeDateAttachedTimes.length>0?teeDateAttachedTimes[0]:allDateAttachedTimes[0];
const allTimes=Array.from(rawTxt.matchAll(/(\d{1,2}):(\d{2})/g));
const teeTimeCandidates=allTimes.filter(m=>{
const idx=m.index;
const surrounding=rawTxt.substring(Math.max(0,idx-25),Math.min(rawTxt.length,idx+25));
return!/수정|등록|작성|접수|202\d/.test(surrounding);
});
let timeM=null;
if(dateAttachedTime){
const parts=dateAttachedTime[1].split('\x3a');
timeM=[null,parts[0],parts[1]];
}else if(teeTimeCandidates.length>0){
timeM=[null,teeTimeCandidates[0][1],teeTimeCandidates[0][2]];
}else if(allTimes.length>0){
timeM=[null,allTimes[0][1],allTimes[0][2]];
}else{
timeM=rawTxt.match(/(\d{1,2}):(\d{2})/);
}
let timeMinutes=9999;
let timeStr='';
if(timeM){
timeStr=`${timeM[1].padStart(2,'\x30')}:${timeM[2]}`;
timeMinutes=parseInt(timeM[1],10)*60+parseInt(timeM[2],10);
}
const timeDigits=timeStr.replace(/[^\d]/g,'');
let feeManVal=null;
let feeStr='';
const feeWonMatch=rawTxt.match(/([0-9]{1,3}(?:,[0-9]{3})+)\s*원/);
const feeManMatch=rawTxt.match(/(\d+(?:\.\d+)?)\s*만\s*원?/);
if(feeManMatch){
feeManVal=parseFloat(feeManMatch[1]);
feeStr=feeManMatch[0];
}else if(feeWonMatch){
const rawWon=parseInt(feeWonMatch[1].replace(/,/g,''),10);
if(!isNaN(rawWon)){
feeManVal=Math.round((rawWon/10000)*10)/10;
}
feeStr=feeWonMatch[0];
}
const regStampMatch=rawTxt.match(/(?:등록|수정)[.\s]*\d{1,2}[./\-]\d{1,2}(?:\([월화수목금토일]\))?\s*\d{1,2}:\d{2}/);
const regStamp=regStampMatch?regStampMatch[0].replace(/\s+/g,''):'';
const peopleMatch=rawTxt.match(/(\d+)\s*명/);
const peopleStr=peopleMatch?`${peopleMatch[1]}\uba85`:'';
const clickableEl=el;
const rect=clickableEl.getBoundingClientRect();
const topY=rect.top;
const leftX=rect.left;
matched.push({el:clickableEl,golfScore,timeMinutes,timeStr,timeDigits,feeManVal,feeStr,regStamp,peopleStr,topY,leftX,rawTxt,postId:cardPostId});
}
if(matched.length===0){
return[];
}
const maxScore=matched.reduce((max,item)=>Math.max(max,item.golfScore),0);
const scoreThreshold=maxScore>=90?90:(maxScore>=80?80:maxScore);
const topMatched=matched.filter(item=>item.golfScore>=scoreThreshold);
const uniqueCards=[];
for(const item of topMatched){
const rItem=item.el.getBoundingClientRect();
const existingIdx=uniqueCards.findIndex(u=>{
if(u.el===item.el||u.el.contains(item.el)||item.el.contains(u.el))return true;
const rU=u.el.getBoundingClientRect();
return Math.abs(rU.top-rItem.top)<25&&Math.abs(rU.left-rItem.left)<25;
});
if(existingIdx===-1){
uniqueCards.push(item);
}else{
if(item.golfScore>uniqueCards[existingIdx].golfScore){
uniqueCards[existingIdx]=item;
}
}
}
const compareScreenAsc=(a,b)=>{
if(Math.abs(a.topY-b.topY)>25)return a.topY-b.topY;
return(a.leftX||0)-(b.leftX||0);
};
const byScreenOrder=[...uniqueCards].sort(compareScreenAsc);
byScreenOrder.forEach((c,idx)=>{c.domOrderIdx=idx;});
uniqueCards.sort((a,b)=>(a.timeMinutes-b.timeMinutes)||compareScreenAsc(a,b));
return uniqueCards;
}
async function registerSingleNewPost(item,customMemo='',stepPreset='\x68\x75\x6d\x61\x6e',modeOverride=''){
const isTransfer=(modeOverride==='\x74\x72\x61\x6e\x73\x66\x65\x72'||modeOverride==='\uc591\ub3c4'||item.roomType==='\uc591\ub3c4');
const modeLabel=isTransfer?'\uc591\ub3c4':'\uc870\uc778';
console.log(`[\uc2e0\uaddc\ub4f1\ub85d] ${item.golf} (${item.date} ${item.time}) [${modeLabel}] '\ub4f1\ub85d \uc0c1\ud488 \ub0b4\uc5ed'\uc5d0\uc11c \ubc14\ub85c \uc2e0\uaddc \ub4f1\ub85d \uc2dc\uc791...`);
if((isEditPage()||isDetailPage()||!_0x102c())&&!_0x1009()){
console.log("[\uc2e0\uaddc\ub4f1\ub85d] '\ub4f1\ub85d \uc0c1\ud488 \ub0b4\uc5ed' \ud654\uba74 \ud655\uc778 \ubc0f \ubcf5\uadc0 \uc9c4\ud589\x2e\x2e\x2e");
await _0x102e(modeLabel);
await _0x1001(_0x1002('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
}
if(shouldStopRegistration)return false;
const regMenuClicked=await _0x100e(10);
if(!regMenuClicked&&!document.querySelector('\x2e\x71-\x64\x69\x61\x6c\x6f\x67\x3a\x6e\x6f\x74(\x2e\x68\x69\x64\x64\x65\x6e), [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"]')){
console.warn("[\uc2e0\uaddc\ub4f1\ub85d] \ud558\ub2e8 [\ub4f1\ub85d] \ubc84\ud2bc \ud638\ucd9c \uc2e4\ud328");
return false;
}
if(shouldStopRegistration)return false;
await _0x1001(_0x1002('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
if(shouldStopRegistration)return false;
if(isTransfer){
await _0x1010();
}else{
await _0x100f();
}
if(shouldStopRegistration)return false;
await _0x1001(_0x1002('\x71\x75\x69\x63\x6b\x5f\x63\x6c\x69\x63\x6b',stepPreset));
if(shouldStopRegistration)return false;
if(item.region&&item.region!=='\uc804\uccb4'){
await _0x1011(item.region);
if(shouldStopRegistration)return false;
await _0x1001(_0x1002('\x71\x75\x69\x63\x6b\x5f\x63\x6c\x69\x63\x6b',stepPreset));
if(shouldStopRegistration)return false;
}
await _0x1012();
if(shouldStopRegistration)return false;
await _0x1001(_0x1002('\x62\x72\x6f\x77\x73\x65\x5f\x64\x72\x6f\x70\x64\x6f\x77\x6e',stepPreset));
if(shouldStopRegistration)return false;
await _0x1015(item.golf);
if(shouldStopRegistration)return false;
await _0x1001(_0x1002('\x62\x72\x6f\x77\x73\x65\x5f\x64\x72\x6f\x70\x64\x6f\x77\x6e',stepPreset));
if(shouldStopRegistration)return false;
await _0x1016(item.date);
if(shouldStopRegistration)return false;
await _0x1001(_0x1002('\x63\x61\x6c\x65\x6e\x64\x61\x72',stepPreset));
if(shouldStopRegistration)return false;
await _0x1017(item.time);
if(shouldStopRegistration)return false;
await _0x1001(_0x1002('\x74\x79\x70\x69\x6e\x67',stepPreset));
if(shouldStopRegistration)return false;
await _0x1018(item.fee,item.isPrepaid);
if(shouldStopRegistration)return false;
await _0x1001(_0x1002('\x74\x79\x70\x69\x6e\x67',stepPreset));
if(shouldStopRegistration)return false;
if(item.isMeal){
const mealClicked=await _0x1019(true);
if(shouldStopRegistration)return false;
if(mealClicked){
await _0x1001(_0x1002('\x71\x75\x69\x63\x6b\x5f\x63\x6c\x69\x63\x6b',stepPreset));
if(shouldStopRegistration)return false;
}
}
const cadyClicked=await _0x101d(item.cady);
if(shouldStopRegistration)return false;
if(cadyClicked){
await _0x1001(_0x1002('\x71\x75\x69\x63\x6b\x5f\x63\x6c\x69\x63\x6b',stepPreset));
if(shouldStopRegistration)return false;
}
if(!isTransfer){
const conditionClicked=await _0x101e(item.condition||'\ubb34\uad00');
if(shouldStopRegistration)return false;
if(conditionClicked){
await _0x1001(_0x1002('\x71\x75\x69\x63\x6b\x5f\x63\x6c\x69\x63\x6b',stepPreset));
if(shouldStopRegistration)return false;
}
const peopleClicked=await _0x101f(item.sizenum||'\x34\uc778',2);
if(shouldStopRegistration)return false;
if(peopleClicked){
await _0x1001(_0x1002('\x71\x75\x69\x63\x6b\x5f\x63\x6c\x69\x63\x6b',stepPreset));
if(shouldStopRegistration)return false;
}
}
await _0x1020(item.memo||customMemo||'');
if(shouldStopRegistration)return false;
await _0x1001(_0x1002('\x74\x79\x70\x69\x6e\x67',stepPreset));
if(shouldStopRegistration)return false;
await _0x1001(_0x1002('\x62\x65\x66\x6f\x72\x65\x5f\x73\x75\x62\x6d\x69\x74',stepPreset));
if(shouldStopRegistration)return false;
await _0x1021();
if(shouldStopRegistration)return false;
await _0x1001(_0x1002('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
if(shouldStopRegistration)return false;
await _0x1026(15);
await _0x1001(500);
const regBtnStillExists=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x71-\x62\x74\x6e, \x64\x69\x76, \x73\x70\x61\x6e'))
.some(el=>el.textContent.trim()==='\ub4f1\ub85d\ud558\uae30'&&el.offsetHeight>0);
if(regBtnStillExists){
console.warn(`[\uc2e0\uaddc\ub4f1\ub85d] \ub4f1\ub85d \ud3fc\uc774 \ub2eb\ud788\uc9c0 \uc54a\uace0 \uc720\uc9c0\ub428 -> \uc11c\ubc84 \ub4f1\ub85d \uac70\ubd80(\ub3d9\uc77c \uad6c\uc7a5 1\uc77c 2\uac74 \uc81c\ud55c \ub4f1) \uac00\ub2a5\uc131 \uac10\uc9c0`);
await _0x1026(5);
await _0x1001(300);
await executeSingleBack();
await _0x1001(500);
return false;
}
console.log(`\u2705 [\uc2e0\uaddc\ub4f1\ub85d \uc644\ub8cc] ${item.golf} (${item.date} ${item.time}) \ub4f1\ub85d \uc131\uacf5!`);
return true;
}
async function executeBatchPostReplacement(items,delayPreset='\x73\x61\x66\x65',stepPreset='\x68\x75\x6d\x61\x6e',filterType='',customMemo='',confirmMismatch=true,isPriceUpdateMode=false,resumeState=null){
if(!items||items.length===0)return;
if(isRegistrationRunning&&!isPriceUpdateMode)return;
const myRunId=++_activeMacroRunId;
isRegistrationRunning=true;
isPostReplacementRunning=true;
_priceUpdateRunning=isPriceUpdateMode;
shouldStopRegistration=false;
_submitLocked=false;
_submittedUrls=new Set();
_submittedItems=new Set();
resetEditSubmitLock();
try{
chrome.storage.local.set({isRegistrationRunning:true});
}catch(e){}
const logTag=isPriceUpdateMode?'\ubcc0\ub3d9\uc218\uc815':'\uad50\uccb4\uc218\uc815';
const progressMsgType=isPriceUpdateMode?'\x50\x52\x49\x43\x45\x5f\x55\x50\x44\x41\x54\x45\x5f\x50\x52\x4f\x47\x52\x45\x53\x53':'\x50\x4f\x53\x54\x5f\x52\x45\x50\x4c\x41\x43\x45\x5f\x50\x52\x4f\x47\x52\x45\x53\x53';
const itemSuccessMsgType=isPriceUpdateMode?'\x49\x54\x45\x4d\x5f\x50\x52\x49\x43\x45\x5f\x55\x50\x44\x41\x54\x45\x5f\x53\x55\x43\x43\x45\x53\x53':'\x49\x54\x45\x4d\x5f\x50\x4f\x53\x54\x5f\x52\x45\x50\x4c\x41\x43\x45\x5f\x53\x55\x43\x43\x45\x53\x53';
const completedMsgType=isPriceUpdateMode?'\x50\x52\x49\x43\x45\x5f\x55\x50\x44\x41\x54\x45\x5f\x43\x4f\x4d\x50\x4c\x45\x54\x45\x44':'\x50\x4f\x53\x54\x5f\x52\x45\x50\x4c\x41\x43\x45\x5f\x43\x4f\x4d\x50\x4c\x45\x54\x45\x44';
const stoppedMsgType=isPriceUpdateMode?'\x50\x52\x49\x43\x45\x5f\x55\x50\x44\x41\x54\x45\x5f\x53\x54\x4f\x50\x50\x45\x44':'\x50\x4f\x53\x54\x5f\x52\x45\x50\x4c\x41\x43\x45\x5f\x53\x54\x4f\x50\x50\x45\x44';
const totalOverallCount=(resumeState&&resumeState.totalOverallCount)?resumeState.totalOverallCount:items.length;
const processedPostIds=new Set(Array.isArray(resumeState?.processedPostIds)?resumeState.processedPostIds:[]);
const processedDetailUrls=new Set(Array.isArray(resumeState?.processedDetailUrls)?resumeState.processedDetailUrls:[]);
const updatedNewTimesByCourse=new Map();
const processedOldTimesByCourse=new Map();
const modifiedRecordsByCourse=new Map(Array.isArray(resumeState?.modifiedRecordsEntries)?resumeState.modifiedRecordsEntries:[]);
let successCount=(resumeState&&typeof resumeState.successCount==='\x6e\x75\x6d\x62\x65\x72')?resumeState.successCount:0;
let globalIndex=(resumeState&&typeof resumeState.globalIndexOffset==='\x6e\x75\x6d\x62\x65\x72')?resumeState.globalIndexOffset:0;
saveActiveBatchState({
macroType:'\x50\x4f\x53\x54\x5f\x52\x45\x50\x4c\x41\x43\x45',
remainingItems:items,
totalOverallCount:totalOverallCount,
globalIndexOffset:globalIndex,
successCount:successCount,
processedPostIds:Array.from(processedPostIds),
processedDetailUrls:Array.from(processedDetailUrls),
modifiedRecordsEntries:Array.from(modifiedRecordsByCourse.entries()),
delayPreset:delayPreset,
stepPreset:stepPreset,
filterType:filterType,
customMemo:customMemo,
confirmMismatch:confirmMismatch,
isPriceUpdateMode:isPriceUpdateMode,
needsHistoryBack:true,
interruptedItemLabel:items[0]?`${items[0].golf} (${items[0].date} ${items[0].time})`:''
});
if(resumeState){
console.log(`\ud83d\udd04 [\uace8\ud504\ubaac ${logTag} \ub9e4\ud06c\ub85c \uc790\ub3d9 \uc7ac\uac1c] \uc911\ub2e8\ub410\ub358 [${globalIndex+1}/${totalOverallCount}]\ubc88\uc9f8 \ud0c0\uc784\ubd80\ud130 \uc774\uc5b4\uc11c \uc9c4\ud589\ud569\ub2c8\ub2e4! (\ub0a8\uc740 \ud0c0\uc784: ${items.length}\uac74)`);
}else{
console.log(`\ud83d\ude80 [\uace8\ud504\ubaac ${logTag} \ub9e4\ud06c\ub85c \uc2dc\uc791] \ucd1d ${totalOverallCount}\uac74 (\ub2e8\uacc4\ubcc4 \uc18d\ub3c4: ${stepPreset}, \ud0c0\uc784 \uac04 \ub300\uae30: ${delayPreset})`);
chrome.runtime.sendMessage({type:isPriceUpdateMode?'\x50\x52\x49\x43\x45\x5f\x55\x50\x44\x41\x54\x45\x5f\x53\x54\x41\x52\x54\x45\x44':'\x50\x4f\x53\x54\x5f\x52\x45\x50\x4c\x41\x43\x45\x5f\x53\x54\x41\x52\x54\x45\x44',total:totalOverallCount});
}
const courseGroups={};
for(const it of items){
const key=`${it.date}_${it.golf}`;
if(!courseGroups[key]){
courseGroups[key]={
date:it.date,
golf:it.golf,
rawGolf:it.rawGolf||it.golf,
region:it.region,
roomType:it.roomType,
items:[]
};
}else if(it.roomType==='\uc870\uc778'&&courseGroups[key].roomType==='\uc591\ub3c4'){
courseGroups[key].roomType='\uc870\uc778';
}
courseGroups[key].items.push(it);
}
const groupKeyList=Object.keys(courseGroups);
try{
for(let gIdx=0;gIdx<groupKeyList.length;gIdx++){
if(shouldStopRegistration||_activeMacroRunId!==myRunId)break;
const groupKey=groupKeyList[gIdx];
const group=courseGroups[groupKey];
const remainingInFutureGroups=groupKeyList.slice(gIdx+1).flatMap(k=>courseGroups[k].items);
group.items.sort((a,b)=>{
const tA=(a.time||'').replace(/[^\d]/g,'');
const tB=(b.time||'').replace(/[^\d]/g,'');
return(parseInt(tA,10)||0)-(parseInt(tB,10)||0);
});
saveActiveBatchState({
macroType:'\x50\x4f\x53\x54\x5f\x52\x45\x50\x4c\x41\x43\x45',
remainingItems:[...group.items,...remainingInFutureGroups],
totalOverallCount:totalOverallCount,
globalIndexOffset:globalIndex,
successCount:successCount,
processedPostIds:Array.from(processedPostIds),
processedDetailUrls:Array.from(processedDetailUrls),
modifiedRecordsEntries:Array.from(modifiedRecordsByCourse.entries()),
delayPreset:delayPreset,
stepPreset:stepPreset,
filterType:filterType,
customMemo:customMemo,
confirmMismatch:confirmMismatch,
isPriceUpdateMode:isPriceUpdateMode,
needsHistoryBack:true,
interruptedItemLabel:group.items[0]?`${group.items[0].golf} (${group.items[0].date} ${group.items[0].time})`:`${group.golf} (${group.date})`
});
console.log(`\n================== [${logTag}] ${group.golf} (${group.date}) \uadf8\ub8f9 \ucc98\ub9ac \uc2dc\uc791 (\uc0c8 \ud0c0\uc784 ${group.items.length}\uac74) ==================`);
const groupCategory=(filterType==='\uc591\ub3c4'||filterType==='\uc870\uc778')
?filterType
:(group.roomType==='\uc591\ub3c4'?'\uc591\ub3c4':'\uc870\uc778');
const courseTrackKey=`${group.date}_${group.golf}`;
if(!updatedNewTimesByCourse.has(courseTrackKey))updatedNewTimesByCourse.set(courseTrackKey,new Set());
if(!processedOldTimesByCourse.has(courseTrackKey))processedOldTimesByCourse.set(courseTrackKey,new Set());
if(!modifiedRecordsByCourse.has(courseTrackKey))modifiedRecordsByCourse.set(courseTrackKey,[]);
const groupUpdatedNewTimes=updatedNewTimesByCourse.get(courseTrackKey);
const groupProcessedOldTimes=processedOldTimesByCourse.get(courseTrackKey);
const groupModifiedRecords=modifiedRecordsByCourse.get(courseTrackKey);
if(!_0x102c()||isEditPage()||isDetailPage()||_0x102b()||_0x102a()){
await navigateBackToList(groupCategory);
await _0x1001(350);
}
if(shouldStopRegistration||_activeMacroRunId!==myRunId)break;
await _0x1001(250);
if(group.region&&group.region!=='\uc804\uccb4'){
await _0x103d(group.region);
await _0x1001(200);
}else{
await _0x103d('\uc804\uccb4');
await _0x1001(200);
}
if(shouldStopRegistration)break;
if(group.date){
if(!_0x1038(group.date)){
console.log(`[${logTag}] \ud83d\udcc5 [${group.golf}] \uc2dc\uc791 \ub0a0\uc9dc(${group.date}) \ubbf8\uc120\ud0dd \uac10\uc9c0 -> \uc120\ud0dd \uc2e4\ud589...`);
await _0x103c(group.date);
await _0x1001(350);
}else{
console.log(`[${logTag}] \ud83d\udcc5 [${group.golf}] \uc2dc\uc791 \ub0a0\uc9dc(${group.date}) \uc774\ubbf8 \uc815\uc0c1 \uc120\ud0dd \ud655\uc778\ub428 -> \ud074\ub9ad \uc0dd\ub7b5 (\ub0a0\uc9dc \ud574\uc81c \ubc29\uc9c0)`);
}
}
if(shouldStopRegistration)break;
await _0x103f(groupCategory);
await _0x1001(150);
const normalizeTimeDigits=(t)=>(t||'').toString().replace(/[^\d]/g,'');
const formatColonTime=(t)=>{
const d=normalizeTimeDigits(t);
return(d.length===4)?`${d.slice(0,2)}:${d.slice(2)}`:(d.length===3?`0${d[0]}:${d.slice(1)}`:t);
};
const parseFeeMan=(f)=>{
const num=parseFloat((f||'').toString().replace(/[^\d.]/g,''));
if(isNaN(num))return null;
return num>=1000?Math.round((num/10000)*10)/10:num;
};
const isDateMatchingTarget=!group.date||_0x1038(group.date);
let initialCards=[];
if(!isDateMatchingTarget){
const currentActiveDay=_0x1037();
console.log(`[${logTag}] \u26a0\ufe0f [${group.golf}] \uc9c0\uc5ed(${group.region}) \uc120\ud0dd \ud6c4 \ubaa9\ud45c \ub0a0\uc9dc(${group.date})\uac00 \uc544\ub2cc \ub2e4\ub978 \ub0a0\uc9dc(${currentActiveDay?currentActiveDay+'\uc77c':''})\ub85c \uc804\ud658\ub428 -> \ud574\ub2f9 \ub0a0\uc9dc\uc5d0 \uae00\uc774 \uc5c6\uc73c\ubbc0\ub85c \uae30\uc874\uae00 0\uac74 \ud310\uc815, \uc989\uc2dc '\uc2e0\uaddc \ub4f1\ub85d' \uc9c4\ud589!`);
initialCards=[];
}else{
for(let r=0;r<6;r++){
initialCards=findExistingCardsForCourse(group.golf,group.rawGolf,groupCategory,group.date);
if(initialCards.length>=2)break;
await _0x1001(300);
}
if(initialCards.length===0&&group.region&&group.region!=='\uc804\uccb4'){
console.log(`[${logTag}] ${group.golf}: \uc9c0\uc815 \uc9c0\uc5ed(${group.region})\uc5d0 \uce74\ub4dc\uac00 \uc5c6\uc5b4 \uc9c0\uc5ed '\uc804\uccb4'\ub85c \uc7ac\ud0d0\uc0c9...`);
await _0x103d('\uc804\uccb4');
await _0x103f(groupCategory);
if(group.date&&!_0x1038(group.date)){
await _0x103c(group.date);
await _0x1001(350);
}
if(_0x1038(group.date)){
initialCards=findExistingCardsForCourse(group.golf,group.rawGolf,groupCategory,group.date);
}
if(initialCards.length===0){
await _0x103d(group.region);
await _0x1001(200);
if(group.date&&!_0x1038(group.date)){
await _0x103c(group.date);
await _0x1001(350);
}
}
}
if(initialCards.length<2&&(!group.date||_0x1038(group.date))){
console.log(`[${logTag}] ${group.golf}: \uce74\ub4dc\uac00 ${initialCards.length}\uac74\ub9cc \ubc1c\uacac\ub428 -> \ud558\ub2e8 \uc2a4\ud06c\ub864 \uc815\ubc00 \uc7ac\ud0d0\uc0c9 \uc2dc\uc791`);
const scrollContainers=Array.from(document.querySelectorAll('\x2e\x73\x63\x72\x6f\x6c\x6c, \x2e\x71-\x73\x63\x72\x6f\x6c\x6c\x61\x72\x65\x61\x5f\x5f\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x71-\x70\x61\x67\x65')).filter(el=>el.scrollHeight>el.clientHeight);
for(let step=0;step<5;step++){
window.scrollBy(0,500);
scrollContainers.forEach(el=>{
try{el.scrollTop+=500;}catch(e){}
});
await _0x1001(250);
const scrolledCards=findExistingCardsForCourse(group.golf,group.rawGolf,groupCategory,group.date);
if(scrolledCards.length>initialCards.length){
initialCards=scrolledCards;
}
if(initialCards.length>=2)break;
}
window.scrollTo(0,0);
scrollContainers.forEach(el=>{
try{el.scrollTop=0;}catch(e){}
});
await _0x1001(250);
const topCheckCards=findExistingCardsForCourse(group.golf,group.rawGolf,groupCategory,group.date);
if(topCheckCards.length>initialCards.length){
initialCards=topCheckCards;
}
console.log(`[${logTag}] \ud83d\udcca [${groupCategory}] \uc7ac\ud0d0\uc0c9 \uacb0\uacfc \uae30\uc874 \uae00 ${initialCards.length}\uac74 \ud655\ubcf4 (${initialCards.map(c=>c.timeStr).join(', ')})`);
}
}
const hasExactMatch=initialCards.length>0&&initialCards[0].golfScore>=95;
if(initialCards.length>0&&!hasExactMatch&&confirmMismatch){
const allCardsOnScreen=_0x1046(groupCategory,group.date);
if(allCardsOnScreen.length>0){
console.log(`[${logTag}] \u26a0\ufe0f ${group.golf} (\uc6d0\ubcf8: ${group.rawGolf}): \uc720\uc0ac \uad6c\uc7a5 \uce74\ub4dc \ubc1c\uacac (\uc810\uc218: ${initialCards[0].golfScore}) -> \uad6c\uc7a5\uba85 \ud655\uc778 \ubaa8\ub2ec \uc624\ud508`);
const verifyResult=await _0x1048({
mode:'\x72\x65\x70\x6c\x61\x63\x65',
rawGolf:group.rawGolf,
targetGolf:group.golf,
date:group.date,
time:group.items[0]?.time||'',
fee:group.items[0]?.fee||'',
sizenum:group.items[0]?.sizenum||'',
roomType:groupCategory,
cardsOnScreen:allCardsOnScreen
});
if(verifyResult.action==='\x70\x72\x6f\x63\x65\x65\x64'){
const confirmedName=verifyResult.confirmedGolfName;
console.log(`[${logTag}] \u2705 \uc0ac\uc6a9\uc790\uac00 \uad6c\uc7a5\uba85\uc744 [${confirmedName}]\uc73c\ub85c \ud655\uc778/\uc9c0\uc815\ud568`);
if(verifyResult.saveToDict){
await _0x1047(group.rawGolf,confirmedName);
chrome.runtime.sendMessage({
type:'\x43\x4f\x55\x52\x53\x45\x5f\x4d\x41\x50\x50\x49\x4e\x47\x5f\x55\x50\x44\x41\x54\x45\x44',
rawGolf:group.rawGolf,
golfmonName:confirmedName
});
}
group.golf=confirmedName;
group.items.forEach(it=>{it.golf=confirmedName;});
initialCards=findExistingCardsForCourse(group.golf,group.rawGolf,'',group.date);
}else if(verifyResult.action==='\x72\x65\x67\x69\x73\x74\x65\x72\x5f\x6e\x65\x77'){
console.log(`[${logTag}] \uc0ac\uc6a9\uc790\uac00 [\uc2e0\uaddc \ub4f1\ub85d] \uc120\ud0dd\ud568 -> \uc2e0\uaddc \ucd94\uac00\ub4f1\ub85d\uc73c\ub85c \uc9c4\ud589`);
initialCards=[];
}else if(verifyResult.action==='\x73\x74\x6f\x70'){
shouldStopRegistration=true;
break;
}else{
if(verifyResult.saveToDict&&verifyResult.confirmedGolfName){
await _0x1047(group.rawGolf,verifyResult.confirmedGolfName);
chrome.runtime.sendMessage({
type:'\x43\x4f\x55\x52\x53\x45\x5f\x4d\x41\x50\x50\x49\x4e\x47\x5f\x55\x50\x44\x41\x54\x45\x44',
rawGolf:group.rawGolf,
golfmonName:verifyResult.confirmedGolfName
});
}
console.warn(`[${logTag}] \uc0ac\uc6a9\uc790\uac00 [${group.golf}] \ud56d\ubaa9\uc744 \uac74\ub108\ub700`);
chrome.runtime.sendMessage({
type:'\x50\x4f\x53\x54\x5f\x52\x45\x50\x4c\x41\x43\x45\x5f\x53\x4b\x49\x50\x50\x45\x44',
golf:group.golf,
date:group.date,
time:group.items[0]?.time||'',
reason:'\uc0ac\uc6a9\uc790 \uc694\uccad\uc73c\ub85c \uad6c\uc7a5 \ubd88\uc77c\uce58 \ud56d\ubaa9 \uac74\ub108\ub700'
});
continue;
}
}
}
const existingCount=initialCards.length;
console.log(`[${logTag}] \ud83d\udcca [${group.golf} ${group.date}] \uae30\uc874 \ub4f1\ub85d\uae00 \uc218 \uc0ac\uc804 \ud30c\uc545: ${existingCount}\uac74 (${initialCards.map(c=>c.timeStr).join(', ')})`);
const plan=[];
const unusedCards=initialCards.filter(c=>{
if(c.postId&&processedPostIds.has(c.postId))return false;
if(groupModifiedRecords.length>0){
if(initialCards.length>=2&&c.domOrderIdx<groupModifiedRecords.length)return false;
const isAlreadyMod=groupModifiedRecords.some(rec=>
(c.timeDigits&&rec.newTimeDigits&&c.timeDigits===rec.newTimeDigits)&&
(c.feeManVal!==null&&rec.newFeeManVal!==null&&Math.abs(c.feeManVal-rec.newFeeManVal)<0.05)
);
if(isAlreadyMod)return false;
}
return true;
});
const unassignedItems=[...group.items];
if(existingCount>0){
for(let i=unassignedItems.length-1;i>=0;i--){
const itemDigits=normalizeTimeDigits(unassignedItems[i].time);
const exactCardIdx=unusedCards.findIndex(c=>normalizeTimeDigits(c.timeStr)===itemDigits);
if(exactCardIdx!==-1){
const matchedCard=unusedCards.splice(exactCardIdx,1)[0];
const matchedItem=unassignedItems.splice(i,1)[0];
plan.push({item:matchedItem,action:'\x6d\x6f\x64\x69\x66\x79',targetCard:matchedCard});
}
}
while(unusedCards.length>0&&unassignedItems.length>0){
const card=unusedCards.shift();
const item=unassignedItems.shift();
plan.push({item,action:'\x6d\x6f\x64\x69\x66\x79',targetCard:card});
}
while(unassignedItems.length>0){
const item=unassignedItems.shift();
if(plan.length<2){
plan.push({item,action:'\x6d\x6f\x64\x69\x66\x79',targetCard:null});
}else{
console.warn(`[${logTag}] ${item.golf}: \uae30\uc874 \uae00 \uc2ac\ub86f(${existingCount}\uac74)\uc744 \ucd08\uacfc\ud558\ub294 \ub0a8\uc740 \ud0c0\uc784(${item.time})\uc740 \uc911\ubcf5 \ub4f1\ub85d \ubc29\uc9c0\ub97c \uc704\ud574 \uac74\ub108\ub701\ub2c8\ub2e4.`);
}
}
}else{
console.log(`[${logTag}] \u2139\ufe0f [${group.golf} ${group.date}] \uae30\uc874 \uae00\uc774 0\uac74\uc774\ubbc0\ub85c \uc2e0\uaddc \ub4f1\ub85d\uc73c\ub85c \ubc30\uc815\ud569\ub2c8\ub2e4.`);
while(unassignedItems.length>0){
const item=unassignedItems.shift();
plan.push({item,action:'\x72\x65\x67\x69\x73\x74\x65\x72'});
}
}
const modifyCount=plan.filter(p=>p.action==='\x6d\x6f\x64\x69\x66\x79').length;
const registerCount=plan.filter(p=>p.action==='\x72\x65\x67\x69\x73\x74\x65\x72').length;
console.log(`[${logTag}] \ud83d\udcca [${group.golf} ${group.date}] \uae00 \uc0c1\ud0dc \ubd84\uc11d \uc644\ub8cc: \uae30\uc874 \uae00 ${existingCount}\uac74 / \ubaa9\ud45c \ud0c0\uc784 ${group.items.length}\uac74 \u2794 \uc218\uc815 ${modifyCount}\uac74, \uc2e0\uaddc \ucd94\uac00\ub4f1\ub85d ${registerCount}\uac74 \ud30c\uc545 \ubc0f \uacc4\ud68d \uc218\ub9bd!`);
for(let pIdx=0;pIdx<plan.length;pIdx++){
if(shouldStopRegistration)break;
const step=plan[pIdx];
const{item,targetCard}=step;
let action=step.action;
globalIndex++;
saveActiveBatchState({
macroType:'\x50\x4f\x53\x54\x5f\x52\x45\x50\x4c\x41\x43\x45',
remainingItems:[...plan.slice(pIdx).map(p=>p.item),...remainingInFutureGroups],
totalOverallCount:totalOverallCount,
globalIndexOffset:globalIndex-1,
successCount:successCount,
processedPostIds:Array.from(processedPostIds),
processedDetailUrls:Array.from(processedDetailUrls),
modifiedRecordsEntries:Array.from(modifiedRecordsByCourse.entries()),
delayPreset:delayPreset,
stepPreset:stepPreset,
filterType:filterType,
customMemo:customMemo,
confirmMismatch:confirmMismatch,
isPriceUpdateMode:isPriceUpdateMode,
needsHistoryBack:true,
interruptedItemLabel:`${item.golf} (${item.date} ${item.time})`
});
chrome.runtime.sendMessage({
type:progressMsgType,
current:globalIndex,
total:totalOverallCount,
golf:item.golf,
rawGolf:item.rawGolf,
date:item.date,
time:item.time,
fee:item.fee,
regId:item.regId
});
try{
if(action==='\x72\x65\x67\x69\x73\x74\x65\x72'){
console.log(`[${logTag}] [${pIdx+1}/${plan.length}] ${item.golf}: \uae30\uc874 \uae00 \uc2ac\ub86f \ubd80\uc871\uc73c\ub85c '\uc2e0\uaddc \ucd94\uac00\ub4f1\ub85d' \uc2e4\ud589 (${item.time}, ${item.fee}\ub9cc, ${item.sizenum||''})...`);
if(isEditPage()||isDetailPage()||!_0x102c()||_0x102b()||_0x102a()){
await navigateBackToList(groupCategory);
await _0x103f('\uc804\uccb4');
if(group.region&&group.region!=='\uc804\uccb4'){
await _0x103d(group.region);
}else{
await _0x103d('\uc804\uccb4');
}
await _0x1001(250);
}
const regSuccess=await registerSingleNewPost(item,customMemo,stepPreset,groupCategory);
if(regSuccess){
successCount++;
const newDigits=normalizeTimeDigits(item.time);
const newColon=formatColonTime(item.time);
groupUpdatedNewTimes.add(newDigits);
groupUpdatedNewTimes.add(newColon);
groupUpdatedNewTimes.add(item.time);
console.log(`\u2705 [${globalIndex}/${totalOverallCount}] ${item.golf} (${item.date} ${item.time}) \uc2e0\uaddc \ucd94\uac00\ub4f1\ub85d \uc644\ub8cc! (\ub204\uc801 \uc131\uacf5: ${successCount}\uac74)`);
chrome.runtime.sendMessage({
type:itemSuccessMsgType,
regId:item.regId,
item:item,
newTime:item.time,
newFee:item.fee
});
}else{
console.warn(`[${logTag}] \u26a0\ufe0f ${item.golf} (${item.date} ${item.time}) \uc2e0\uaddc \ucd94\uac00\ub4f1\ub85d \uac70\ubd80\ub428(\ub3d9\uc77c \uad6c\uc7a5 1\uc77c 2\uac74 \uc81c\ud55c \ub4f1) -> \ubaa9\ub85d\uc758 \uae30\uc874 \ub4f1\ub85d\uae00\uc744 \ucc3e\uc544 '\uc218\uc815(modify)'\uc73c\ub85c \uc989\uc2dc \uc804\ud658\ud569\ub2c8\ub2e4!`);
await navigateBackToList(groupCategory);
await _0x1001(350);
action='\x6d\x6f\x64\x69\x66\x79';
}
if(action==='\x72\x65\x67\x69\x73\x74\x65\x72'&&(isEditPage()||isDetailPage()||!_0x102c()||_0x102b()||_0x102a())){
await navigateBackToList(groupCategory);
await _0x1001(350);
}
}
if(action==='\x6d\x6f\x64\x69\x66\x79'){
const targetTimeLabel=targetCard?.timeStr||'\ud654\uba74 \ubbf8\uc218\uc815 \uce74\ub4dc';
console.log(`[${logTag}] [${pIdx+1}/${plan.length}] ${item.golf}: \uae30\uc874 \uae00(${targetTimeLabel}) \u2794 \uc0c8 \ud0c0\uc784(${item.time}, ${item.fee}\ub9cc, ${item.sizenum||''}) \uc218\uc815 \uc2e4\ud589...`);
if(isEditPage()||isDetailPage()||!_0x102c()||_0x102b()||_0x102a()){
await navigateBackToList(groupCategory);
await _0x103f(groupCategory);
if(group.region&&group.region!=='\uc804\uccb4'){
await _0x103d(group.region);
}else{
await _0x103d('\uc804\uccb4');
}
await _0x1001(250);
}
const targetDate=item.date||group.date;
if(targetDate){
if(!_0x1038(targetDate)){
console.log(`[${logTag}] \ud83d\udcc5 \uc218\uc815 \uc804 \ud574\ub2f9 \ub0a0\uc9dc(${targetDate}) \ubbf8\uc120\ud0dd \uac10\uc9c0 -> \uc120\ud0dd \uc2e4\ud589...`);
await _0x103c(targetDate);
await _0x1001(350);
}else{
console.log(`[${logTag}] \ud83d\udcc5 \uc218\uc815 \uc804 \ud574\ub2f9 \ub0a0\uc9dc(${targetDate}) \uc774\ubbf8 \uc815\uc0c1 \uc120\ud0dd \ud655\uc778\ub428 -> \ud074\ub9ad \uc0dd\ub7b5 (\ud574\uc81c \ubc29\uc9c0)`);
}
}
await _0x103f(groupCategory);
window.scrollTo(0,0);
let liveCardObj=null;
const targetDigits=normalizeTimeDigits(targetCard?.timeStr);
const targetFeeMan=targetCard?.feeManVal;
const targetRegStamp=targetCard?.regStamp||'';
const compareReverseScreenOrder=(a,b)=>{
if(typeof a.domOrderIdx==='\x6e\x75\x6d\x62\x65\x72'&&typeof b.domOrderIdx==='\x6e\x75\x6d\x62\x65\x72'&&a.domOrderIdx!==b.domOrderIdx){
return b.domOrderIdx-a.domOrderIdx;
}
if(Math.abs(b.topY-a.topY)>25)return b.topY-a.topY;
return(b.leftX||0)-(a.leftX||0);
};
for(let retry=0;retry<10;retry++){
let liveCards=findExistingCardsForCourse(group.golf,group.rawGolf,groupCategory,group.date);
if(liveCards.length===0&&(retry===1||retry===3)){
if(targetDate&&!_0x1038(targetDate)){
await _0x103c(targetDate);
await _0x1001(350);
}
window.scrollBy(0,500*retry);
document.querySelectorAll('\x2e\x73\x63\x72\x6f\x6c\x6c, \x2e\x71-\x73\x63\x72\x6f\x6c\x6c\x61\x72\x65\x61\x5f\x5f\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x71-\x70\x61\x67\x65').forEach(el=>{
try{el.scrollTop+=500;}catch(e){}
});
await _0x1001(250);
liveCards=findExistingCardsForCourse(group.golf,group.rawGolf,groupCategory,group.date);
}
if(liveCards.length===0&&retry===2){
await _0x103f(groupCategory);
if(group.region&&group.region!=='\uc804\uccb4'){
await _0x103d(group.region);
}else{
await _0x103d('\uc804\uccb4');
}
if(targetDate&&!_0x1038(targetDate)){
await _0x103c(targetDate);
await _0x1001(350);
}
await _0x1001(250);
liveCards=findExistingCardsForCourse(group.golf,group.rawGolf,groupCategory,group.date);
}
if(liveCards.length===0&&retry===4){
await _0x103d('\uc804\uccb4');
if(targetDate&&!_0x1038(targetDate)){
await _0x103c(targetDate);
await _0x1001(350);
}
await _0x1001(250);
liveCards=findExistingCardsForCourse(group.golf,group.rawGolf,groupCategory,group.date);
}
const eligibleCards=liveCards.filter(c=>{
if(c.postId&&processedPostIds.has(c.postId))return false;
if(c.el&&_replacedCardsSet.has(c.el))return false;
if(groupModifiedRecords.length>0){
if(liveCards.length>=2&&c.domOrderIdx<groupModifiedRecords.length){
return false;
}
const matchesModifiedRecord=groupModifiedRecords.some(rec=>{
const timeSame=(c.timeDigits&&rec.newTimeDigits&&c.timeDigits===rec.newTimeDigits);
const feeSame=(c.feeManVal!==null&&rec.newFeeManVal!==null&&Math.abs(c.feeManVal-rec.newFeeManVal)<0.05);
if(timeSame&&feeSame){
if(liveCards.length>=2&&c.domOrderIdx>=groupModifiedRecords.length){
return false;
}
return true;
}
if(timeSame&&targetDigits!==rec.newTimeDigits){
if(liveCards.length>=2&&c.domOrderIdx>=groupModifiedRecords.length){
return false;
}
return true;
}
return false;
});
if(matchesModifiedRecord)return false;
}
return true;
});
if(targetRegStamp){
const stampMatched=eligibleCards.filter(c=>c.regStamp&&c.regStamp===targetRegStamp);
if(stampMatched.length===1){
liveCardObj=stampMatched[0];
}else if(stampMatched.length>1){
stampMatched.sort(groupModifiedRecords.length>0?compareReverseScreenOrder:(a,b)=>a.domOrderIdx-b.domOrderIdx);
liveCardObj=stampMatched[0];
}
}
if(!liveCardObj&&targetDigits){
const timeMatchedCards=eligibleCards.filter(c=>c.timeDigits===targetDigits);
if(timeMatchedCards.length===1){
liveCardObj=timeMatchedCards[0];
}else if(timeMatchedCards.length>1){
timeMatchedCards.sort((a,b)=>{
if(groupModifiedRecords.length>0){
return compareReverseScreenOrder(a,b);
}
if(targetFeeMan!==null){
const diffA=a.feeManVal!==null?Math.abs(a.feeManVal-targetFeeMan):999;
const diffB=b.feeManVal!==null?Math.abs(b.feeManVal-targetFeeMan):999;
if(Math.abs(diffA-diffB)>0.05)return diffA-diffB;
}
return(a.domOrderIdx||0)-(b.domOrderIdx||0);
});
liveCardObj=timeMatchedCards[0];
}
}
if(!liveCardObj&&targetCard&&targetCard.postId){
liveCardObj=eligibleCards.find(c=>c.postId===targetCard.postId);
}
if(!liveCardObj&&eligibleCards.length>0){
if(groupModifiedRecords.length>0){
const sortedByBottom=[...eligibleCards].sort(compareReverseScreenOrder);
liveCardObj=sortedByBottom[0];
}else{
liveCardObj=eligibleCards[0];
}
}
if(!liveCardObj&&groupModifiedRecords.length>0&&liveCards.length>=2){
const sortedAllByBottom=[...liveCards].sort(compareReverseScreenOrder);
const bottomMost=sortedAllByBottom.find(c=>(!c.postId||!processedPostIds.has(c.postId))&&!_replacedCardsSet.has(c.el));
if(bottomMost){
liveCardObj=bottomMost;
}
}
if(liveCardObj)break;
await _0x1001(300);
}
if(!liveCardObj){
console.warn(`[${logTag}] \uc218\uc815 \ub300\uc0c1 \uce74\ub4dc(${targetCard?.timeStr||''})\ub97c \ud654\uba74\uc5d0\uc11c \ucc3e\uc9c0 \ubabb\ud568 -> \ud1b5\uacfc`);
continue;
}
let targetCardEl=liveCardObj.el;
let originalPostTime=liveCardObj.timeStr;
let inDetail=await clickPostCardReliably(targetCardEl);
if(!inDetail){
console.warn(`[${logTag}] ${item.golf} (${originalPostTime}) \uce74\ub4dc \ud074\ub9ad \ud6c4 \uc0c1\uc138 \uc9c4\uc785 \uc2e4\ud328 -> \ubaa9\ub85d \ubcf5\uadc0`);
await navigateBackToList(groupCategory);
continue;
}
const openedDetailType=detectCurrentDetailPageType();
if((groupCategory==='\uc591\ub3c4'&&openedDetailType==='\uc870\uc778')||
(groupCategory==='\uc870\uc778'&&openedDetailType==='\uc591\ub3c4')){
console.warn(`[${logTag}] \u26a0\ufe0f [${groupCategory}] \uc218\uc815 \ubaa9\ud45c\uc778\ub370 \uc0c1\uc138 \ud398\uc774\uc9c0 \uc88c\uce21 \uc0c1\ub2e8\uc774 [${openedDetailType}]\uc73c\ub85c \uac10\uc9c0\ub418\uc5c8\uc2b5\ub2c8\ub2e4! \uc810\uc138\uac1c(\u22ee) \ud074\ub9ad\uc744 \uc911\ub2e8\ud558\uace0 \uc989\uc2dc \ubaa9\ub85d\uc73c\ub85c \ubcf5\uadc0\ud558\uc5ec [${groupCategory}] \uae00\ub9cc \ub2e4\uc2dc \ucc3e\uc2b5\ub2c8\ub2e4.`);
_replacedCardsSet.add(targetCardEl);
await navigateBackToList(groupCategory);
await _0x103f(groupCategory);
if(group.region&&group.region!=='\uc804\uccb4'){
await _0x103d(group.region);
}else{
await _0x103d('\uc804\uccb4');
}
if(group.date&&!_0x1038(group.date))await _0x103c(group.date);
await _0x103f(groupCategory);
await _0x1001(350);
const retryTypeCards=findExistingCardsForCourse(group.golf,group.rawGolf,groupCategory,group.date)
.filter(c=>c.el!==targetCardEl&&!_replacedCardsSet.has(c.el)&&(!c.postId||!processedPostIds.has(c.postId)));
if(retryTypeCards.length===0){
console.warn(`[${logTag}] ${item.golf}: [${groupCategory}] \uad6c\ubd84\uc5d0 \ud574\ub2f9\ud558\ub294 \ubbf8\uc218\uc815 \uce74\ub4dc\uac00 \uc5c6\uc5b4 \uc218\uc815\uc744 \uac74\ub108\ub701\ub2c8\ub2e4.`);
continue;
}
liveCardObj=retryTypeCards[0];
targetCardEl=liveCardObj.el;
originalPostTime=liveCardObj.timeStr;
inDetail=await clickPostCardReliably(targetCardEl);
if(!inDetail){
await navigateBackToList(groupCategory);
continue;
}
const recheckDetailType=detectCurrentDetailPageType();
if((groupCategory==='\uc591\ub3c4'&&recheckDetailType==='\uc870\uc778')||
(groupCategory==='\uc870\uc778'&&recheckDetailType==='\uc591\ub3c4')){
console.warn(`[${logTag}] \u26a0\ufe0f \uc7ac\uc9c4\uc785\ud55c \uc0c1\uc138 \ud398\uc774\uc9c0\ub3c4 [${recheckDetailType}]\uc774\ubbc0\ub85c \uc624\uc218\uc815\uc744 \ucc28\ub2e8\ud558\uace0 \ubaa9\ub85d\uc73c\ub85c \ubcf5\uadc0\ud569\ub2c8\ub2e4.`);
_replacedCardsSet.add(targetCardEl);
await navigateBackToList(groupCategory);
continue;
}
}
let curUrl=window.location.href;
let curUrlMatch=curUrl.match(/[?&]id=(\d+)/)||curUrl.match(/\/(?:join|transfer)\/(?:detail|edit|view|item)\/(\d+)/)||curUrl.match(/\/(?:detail|item)\/(\d+)/);
let detectedPostId=curUrlMatch?curUrlMatch[1]:(liveCardObj.postId||'');
if((detectedPostId&&processedPostIds.has(detectedPostId))||
(/\/(?:detail|item|view)\b/.test(curUrl)&&processedDetailUrls.has(curUrl))){
console.warn(`[${logTag}] \u26a0\ufe0f \uc0c1\uc138 \ud398\uc774\uc9c0 \uc9c4\uc785 \uacb0\uacfc \uc774\ubbf8 \uc218\uc815 \uc644\ub8cc\ud55c \uae00(ID: ${detectedPostId||curUrl})\uc774 \uac10\uc9c0\ub418\uc5c8\uc2b5\ub2c8\ub2e4! \ubc14\uafbc \uae00\uc744 \ub610 \ubc14\uafb8\uc9c0 \uc54a\ub3c4\ub85d \uc989\uc2dc \ubaa9\ub85d\uc73c\ub85c \ub3cc\uc544\uac00 \uc544\ub798\ucabd \ubbf8\uc218\uc815 \uae00\uc744 \uc120\ud0dd\ud569\ub2c8\ub2e4.`);
_replacedCardsSet.add(targetCardEl);
await navigateBackToList(groupCategory);
await _0x103f(groupCategory);
if(group.region&&group.region!=='\uc804\uccb4'){
await _0x103d(group.region);
}else{
await _0x103d('\uc804\uccb4');
}
if(group.date&&!_0x1038(group.date))await _0x103c(group.date);
await _0x1001(350);
const retryCards=findExistingCardsForCourse(group.golf,group.rawGolf,groupCategory,group.date);
const sortedBottomCards=[...retryCards]
.filter(c=>c.el!==targetCardEl&&!_replacedCardsSet.has(c.el)&&(!c.postId||!processedPostIds.has(c.postId)))
.sort(compareReverseScreenOrder);
if(sortedBottomCards.length===0){
console.warn(`[${logTag}] ${item.golf}: \ub300\uccb4\ud560 \ubbf8\uc218\uc815 \uce74\ub4dc\ub97c \ucc3e\uc9c0 \ubabb\ud574 \uc911\ubcf5 \uc218\uc815\uc744 \ubc29\uc9c0\ud558\uace0 \uac74\ub108\ub701\ub2c8\ub2e4.`);
continue;
}
liveCardObj=sortedBottomCards[0];
targetCardEl=liveCardObj.el;
originalPostTime=liveCardObj.timeStr;
console.log(`[${logTag}] \ud83d\udd04 \ud654\uba74 \ud558\ub2e8\uc758 \ubbf8\uc218\uc815 \uce74\ub4dc(${originalPostTime})\ub85c \uc7ac\uc120\ud0dd\ud558\uc5ec \uc0c1\uc138 \ud398\uc774\uc9c0 \uc9c4\uc785...`);
inDetail=await clickPostCardReliably(targetCardEl);
if(!inDetail){
await navigateBackToList(groupCategory);
continue;
}
curUrl=window.location.href;
curUrlMatch=curUrl.match(/[?&]id=(\d+)/)||curUrl.match(/\/(?:join|transfer)\/(?:detail|edit|view|item)\/(\d+)/)||curUrl.match(/\/(?:detail|item)\/(\d+)/);
detectedPostId=curUrlMatch?curUrlMatch[1]:(liveCardObj.postId||'');
if((detectedPostId&&processedPostIds.has(detectedPostId))||
(/\/(?:detail|item|view)\b/.test(curUrl)&&processedDetailUrls.has(curUrl))){
console.warn(`[${logTag}] \u26a0\ufe0f \uc7ac\uc120\ud0dd\ud55c \uce74\ub4dc \uc5ed\uc2dc \uc774\ubbf8 \uc218\uc815\ub41c \uae00(ID: ${detectedPostId})\uc774\ubbc0\ub85c \uc911\ubcf5 \uc218\uc815 \ubc29\uc9c0\ub97c \uc704\ud574 \uac74\ub108\ub701\ub2c8\ub2e4.`);
await navigateBackToList(groupCategory);
continue;
}
}
const openedEdit=await openMenuAndClickEdit();
if(!openedEdit){
console.warn(`[${logTag}] \uc218\uc815 \uba54\ub274 \uc9c4\uc785 \uc2e4\ud328 -> \ubaa9\ub85d \ubcf5\uadc0`);
await navigateBackToList(groupCategory);
continue;
}
const openedPageType=await ensureCorrectEditRouteAndType(groupCategory,1500);
if(groupCategory==='\uc591\ub3c4'&&openedPageType==='\uc870\uc778'){
console.warn(`[${logTag}] \u26a0\ufe0f \uc591\ub3c4 \uc218\uc815 \ubaa9\ud45c\uc778\ub370 '\uc870\uc778 \uc218\uc815' \ud654\uba74\uc774 \uac10\uc9c0\ub418\uc5c8\uc2b5\ub2c8\ub2e4! \uc870\uc778 \uae00 \uc624\uc218\uc815\uc744 \ucc28\ub2e8\ud558\uace0 \ubaa9\ub85d\uc73c\ub85c \ubcf5\uadc0\ud569\ub2c8\ub2e4.`);
_replacedCardsSet.add(targetCardEl);
await navigateBackToList(groupCategory);
continue;
}
if(groupCategory==='\uc870\uc778'&&openedPageType==='\uc591\ub3c4'){
console.warn(`[${logTag}] \u26a0\ufe0f \uc870\uc778 \uc218\uc815 \ubaa9\ud45c\uc778\ub370 '\uc591\ub3c4 \uc218\uc815' \ud654\uba74\uc774 \uac10\uc9c0\ub418\uc5c8\uc2b5\ub2c8\ub2e4! \uc591\ub3c4 \uae00 \uc624\uc218\uc815\uc744 \ucc28\ub2e8\ud558\uace0 \ubaa9\ub85d\uc73c\ub85c \ubcf5\uadc0\ud569\ub2c8\ub2e4.`);
_replacedCardsSet.add(targetCardEl);
await navigateBackToList(groupCategory);
continue;
}
await _0x1001(_0x1002('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
if(shouldStopRegistration)break;
const editSuccess=await editTimeAndFeeAndPeopleAndSubmit(item);
if(editSuccess){
successCount++;
_replacedCardsSet.add(targetCardEl);
if(detectedPostId){
processedPostIds.add(detectedPostId);
}
if(/\/(?:detail|item)\/\d+/.test(curUrl)){
processedDetailUrls.add(curUrl);
}
const newDigits=normalizeTimeDigits(item.time);
const newColon=formatColonTime(item.time);
groupUpdatedNewTimes.add(newDigits);
groupUpdatedNewTimes.add(newColon);
groupUpdatedNewTimes.add(item.time);
groupModifiedRecords.push({
postId:detectedPostId,
detailUrl:curUrl,
oldTimeDigits:normalizeTimeDigits(originalPostTime),
newTimeDigits:newDigits,
newFeeManVal:parseFeeMan(item.fee)
});
if(originalPostTime){
const oldDigits=normalizeTimeDigits(originalPostTime);
const oldColon=formatColonTime(originalPostTime);
groupProcessedOldTimes.add(oldDigits);
groupProcessedOldTimes.add(oldColon);
groupProcessedOldTimes.add(originalPostTime);
}
console.log(`\u2705 [${globalIndex}/${totalOverallCount}] ${item.golf} (${originalPostTime} \u2794 ${item.time}, ${item.fee}\ub9cc) ${logTag} \uc644\ub8cc! (\ub204\uc801 \uc131\uacf5: ${successCount}\uac74)`);
chrome.runtime.sendMessage({
type:itemSuccessMsgType,
regId:item.regId,
item:item,
newTime:item.time,
newFee:item.fee
});
}else{
console.warn(`[${logTag}] \u274c ${item.golf} (${item.date} ${item.time}) \uc218\uc815 \uc2e4\ud328 (\uc11c\ubc84 \uc800\uc7a5 \uac70\ubd80 \ub4f1) -> \ubaa9\ub85d \ubcf5\uadc0`);
}
if(!_0x102c()||_0x102b()||_0x102a()){
await navigateBackToList(groupCategory);
await _0x1001(350);
}
}
}catch(stepErr){
console.error(`[${logTag}] \u274c [${globalIndex}/${totalOverallCount}] ${item.golf} (${item.date} ${item.time}) \ucc98\ub9ac \uc911 \uc608\uc678 \ubc1c\uc0dd:`,stepErr);
if(_isPageUnloading)break;
try{
await navigateBackToList(groupCategory);
await _0x1001(350);
}catch(navErr){}
}
if(_isPageUnloading||shouldStopRegistration||_activeMacroRunId!==myRunId)break;
const nextRemainingAfterStep=[...plan.slice(pIdx+1).map(p=>p.item),...remainingInFutureGroups];
if(nextRemainingAfterStep.length>0){
saveActiveBatchState({
macroType:'\x50\x4f\x53\x54\x5f\x52\x45\x50\x4c\x41\x43\x45',
remainingItems:nextRemainingAfterStep,
totalOverallCount:totalOverallCount,
globalIndexOffset:globalIndex,
successCount:successCount,
processedPostIds:Array.from(processedPostIds),
processedDetailUrls:Array.from(processedDetailUrls),
modifiedRecordsEntries:Array.from(modifiedRecordsByCourse.entries()),
delayPreset:delayPreset,
stepPreset:stepPreset,
filterType:filterType,
customMemo:customMemo,
confirmMismatch:confirmMismatch,
isPriceUpdateMode:isPriceUpdateMode,
needsHistoryBack:true,
interruptedItemLabel:`${nextRemainingAfterStep[0].golf} (${nextRemainingAfterStep[0].date} ${nextRemainingAfterStep[0].time})`
});
}else{
clearActiveBatchState();
}
if(globalIndex<totalOverallCount){
const cooldownMs=_0x1004(delayPreset||'\x73\x61\x66\x65');
await _0x1001(cooldownMs);
if(shouldStopRegistration||_activeMacroRunId!==myRunId)break;
}
}
}
}catch(fatalErr){
console.error(`[${logTag}] \uce58\uba85\uc801 \uc624\ub958 \uac10\uc9c0 (\ube44\uc815\uc0c1 \uba48\ucda4 \ubc29\uc9c0):`,fatalErr);
}finally{
if(_activeMacroRunId!==myRunId)return;
isRegistrationRunning=false;
isPostReplacementRunning=false;
_priceUpdateRunning=false;
if(_isPageUnloading)return;
clearActiveBatchState();
try{chrome.storage.local.set({isRegistrationRunning:false});}catch(e){}
if(shouldStopRegistration){
chrome.runtime.sendMessage({type:stoppedMsgType,total:totalOverallCount,successCount:successCount});
}else{
chrome.runtime.sendMessage({type:completedMsgType,total:totalOverallCount,successCount:successCount});
}
}
}
let isDateResetRunning=false;
function extractTeeTimeFromResetCard(rawTxt){
if(!rawTxt)return'';
const dateAttachedTime=rawTxt.match(/(?:\d{1,2}[./\-]\d{1,2}|\([월화수목금토일]\))\s*(\d{1,2}:\d{2})/);
if(dateAttachedTime){
const parts=dateAttachedTime[1].split('\x3a');
return`${parts[0].padStart(2,'\x30')}:${parts[1]}`;
}
const allTimes=Array.from(rawTxt.matchAll(/(\d{1,2}):(\d{2})/g));
const teeTimeCandidates=allTimes.filter(m=>{
const idx=m.index;
const surrounding=rawTxt.substring(Math.max(0,idx-20),Math.min(rawTxt.length,idx+25));
return!/수정|등록|작성|접수|202\d/.test(surrounding);
});
if(teeTimeCandidates.length>0){
return`${teeTimeCandidates[0][1].padStart(2,'\x30')}:${teeTimeCandidates[0][2]}`;
}
if(allTimes.length>0){
const last=allTimes[allTimes.length-1];
return`${last[1].padStart(2,'\x30')}:${last[2]}`;
}
return'';
}
function collectResetCandidateCards(filterType='\uc804\uccb4'){
const leafCandidates=_0x1043();
const list=[];
for(const el of leafCandidates){
const rawTxt=(el.innerText||el.textContent||'').trim();
if(!/\d{1,2}:\d{2}/.test(rawTxt)||!/원/.test(rawTxt))continue;
const postType=_0x1041(el,rawTxt);
if(filterType==='\uc591\ub3c4'&&postType==='\uc870\uc778')continue;
if(filterType==='\uc870\uc778'&&postType==='\uc591\ub3c4')continue;
const courseName=_0x1045(el)||'\uad6c\uc7a5';
const normCourse=_0x1040(courseName)||courseName;
const teeTime=extractTeeTimeFromResetCard(rawTxt);
const feeMatch=rawTxt.match(/([0-9.,]+)\s*(?:만|만원|원)/);
const feeStr=feeMatch?feeMatch[0].replace(/\s+/g,''):'';
let cardPostId='';
const linkEl=el.querySelector('\x61[\x68\x72\x65\x66*="\x2f\x64\x65\x74\x61\x69\x6c\x2f"], \x61[\x68\x72\x65\x66*="\x2f\x76\x69\x65\x77"], \x61[\x68\x72\x65\x66*="\x69\x64="], [\x64\x61\x74\x61-\x69\x64], [\x69\x64*="\x70\x6f\x73\x74"]')||el.closest('\x61[\x68\x72\x65\x66*="\x2f\x64\x65\x74\x61\x69\x6c\x2f"], \x61[\x68\x72\x65\x66*="\x2f\x76\x69\x65\x77"], \x61[\x68\x72\x65\x66*="\x69\x64="]');
if(linkEl){
const href=linkEl.getAttribute('\x68\x72\x65\x66')||linkEl.dataset.id||linkEl.id||'';
const pIdM=href.match(/[?&]id=(\d+)/)||href.match(/\/(?:detail|item|view)\/(\d+)/)||href.match(/(\d{4,})/);
if(pIdM)cardPostId=pIdM[1];
}
const clickableEl=el;
const sig=`${postType||'\uc804\uccb4'}|${normCourse}|${teeTime}|${feeStr}`;
list.push({
el:clickableEl,
courseName:courseName,
teeTime:teeTime,
feeStr:feeStr,
postType:postType,
postId:cardPostId,
sig:sig
});
}
return list;
}
async function submitEditWithoutChanges(stepPreset='\x68\x75\x6d\x61\x6e',cardInfo=null){
console.log(`[\uc804\uccb4\ub9ac\uc14b] \uc218\uc815 \ud3fc \uc9c4\uc785 \uc644\ub8cc -> \ub0b4\uc6a9 \ubcc0\uacbd \uc5c6\uc774 \uae30\uc874 \ub370\uc774\ud130 \ub85c\ub4dc \ud655\uc778 \ud6c4 '\uc218\uc815\ud558\uae30' \uc81c\ucd9c \uc9c4\ud589...`);
const currentUrlKey=window.location.href;
if(_submittedUrls&&_submittedUrls.has(currentUrlKey)){
console.warn(`[\uc804\uccb4\ub9ac\uc14b] \ud604\uc7ac \ud398\uc774\uc9c0(${currentUrlKey})\ub294 \uc774\ubbf8 \uc81c\ucd9c \uc644\ub8cc\ub41c \uae00\uc785\ub2c8\ub2e4. (\uc911\ubcf5 \uc218\uc815 \ubc29\uc9c0) -> \ubcf5\uadc0`);
await executeSingleBack();
await _0x1001(400);
return false;
}
resetEditSubmitLock();
for(let attempt=0;attempt<15;attempt++){
if(shouldStopRegistration)return false;
const populatedInputs=Array.from(document.querySelectorAll('\x69\x6e\x70\x75\x74'))
.filter(el=>el.offsetHeight>0&&(el.value||'').trim().length>0);
if(populatedInputs.length>=2)break;
await _0x1001(150);
}
await _0x1001(_0x1002('\x62\x65\x66\x6f\x72\x65\x5f\x73\x75\x62\x6d\x69\x74',stepPreset));
if(shouldStopRegistration)return false;
const liveSubmitBtn=findEditSubmitButton();
if(!liveSubmitBtn){
console.error("[\uc804\uccb4\ub9ac\uc14b] \ud558\ub2e8 '\uc218\uc815\ud558\uae30' \ubc84\ud2bc\uc744 \ucc3e\uc9c0 \ubabb\ud568");
return false;
}
await clickSubmitButtonReliably(liveSubmitBtn,{
golf:cardInfo?.courseName||'',
date:cardInfo?.date||'',
time:cardInfo?.teeTime||'',
fee:cardInfo?.feeStr||'\x72\x65\x73\x65\x74'
});
await _0x1001(400);
const submitOk=await _0x1023('\uc804\uccb4\ub9ac\uc14b');
if(!submitOk){
return false;
}
console.log(`[\uc804\uccb4\ub9ac\uc14b] '${cardInfo?.courseName||''} (${cardInfo?.teeTime||''})' \ub0b4\uc6a9 \ubcc0\uacbd \uc5c6\uc774 \uc218\uc815(\ub9ac\uc14b) \uc644\ub8cc!`);
return true;
}
async function executeBatchDateReset(targetDateInput,filterType='\uc804\uccb4',delayPreset='\x73\x61\x66\x65',stepPreset='\x68\x75\x6d\x61\x6e',targetDatesArray=null){
if(isRegistrationRunning)return;
isRegistrationRunning=true;
isDateResetRunning=true;
shouldStopRegistration=false;
_submitLocked=false;
_submittedUrls=new Set();
_submittedItems=new Set();
resetEditSubmitLock();
const effectiveFilter=(filterType==='\uc870\uc778'||filterType==='\uc591\ub3c4')?filterType:'\uc804\uccb4';
const datesList=(Array.isArray(targetDatesArray)&&targetDatesArray.length>0)
?targetDatesArray.filter(Boolean)
:[targetDateInput].filter(Boolean);
const rangeLabel=datesList.length>1
?`${datesList[0]} ~ ${datesList[datesList.length-1]}`
:(datesList[0]||targetDateInput||'');
try{
chrome.storage.local.set({isRegistrationRunning:true});
}catch(e){}
console.log(`\ud83d\ude80 [\uace8\ud504\ubaac \ub0a0\uc9dc\ubcc4(\uae30\uac04\ubcc4) \uc804\uccb4\ub9ac\uc14b \uc2dc\uc791] \ub300\uc0c1 \ub0a0\uc9dc \ubaa9\ub85d: [${datesList.join(', ')}] (\ucd1d ${datesList.length}\uc77c), \uad6c\ubd84: [${effectiveFilter}]`);
const processedPostIds=new Set();
let totalSuccessCount=0;
let totalDiscoveredAllDates=0;
const scrollToBottomAndCollectAllCards=async()=>{
window.scrollTo(0,0);
document.querySelectorAll('\x2e\x71-\x73\x63\x72\x6f\x6c\x6c\x61\x72\x65\x61\x5f\x5f\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x73\x63\x72\x6f\x6c\x6c, \x2e\x71-\x70\x61\x67\x65, \x62\x6f\x64\x79').forEach(el=>{
el.scrollTop=0;
});
await _0x1001(200);
const allCardsOrdered=[];
const seenEls=new Set();
for(let scroll=0;scroll<20;scroll++){
if(shouldStopRegistration)break;
const visibleCards=collectResetCandidateCards(effectiveFilter);
visibleCards.sort((a,b)=>{
const rA=a.el.getBoundingClientRect();
const rB=b.el.getBoundingClientRect();
if(Math.abs(rA.top-rB.top)>15)return rA.top-rB.top;
return rA.left-rB.left;
});
for(const c of visibleCards){
if(!seenEls.has(c.el)){
seenEls.add(c.el);
allCardsOrdered.push(c);
}
}
const prevScrollY=window.scrollY;
window.scrollBy(0,500);
let scrolledContainer=false;
document.querySelectorAll('\x2e\x71-\x73\x63\x72\x6f\x6c\x6c\x61\x72\x65\x61\x5f\x5f\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x73\x63\x72\x6f\x6c\x6c, \x2e\x71-\x70\x61\x67\x65, \x62\x6f\x64\x79').forEach(el=>{
if(el.scrollHeight>el.clientHeight){
const before=el.scrollTop;
el.scrollTop+=500;
if(el.scrollTop!==before)scrolledContainer=true;
}
});
await _0x1001(220);
if(window.scrollY===prevScrollY&&!scrolledContainer&&scroll>=1){
break;
}
}
return allCardsOrdered;
};
await _0x102e(effectiveFilter);
if(shouldStopRegistration){
isRegistrationRunning=false;
isDateResetRunning=false;
chrome.runtime.sendMessage({type:'\x44\x41\x54\x45\x5f\x52\x45\x53\x45\x54\x5f\x53\x54\x4f\x50\x50\x45\x44',targetDate:rangeLabel,successCount:totalSuccessCount});
return;
}
await _0x103f(effectiveFilter);
if(shouldStopRegistration){
isRegistrationRunning=false;
isDateResetRunning=false;
chrome.runtime.sendMessage({type:'\x44\x41\x54\x45\x5f\x52\x45\x53\x45\x54\x5f\x53\x54\x4f\x50\x50\x45\x44',targetDate:rangeLabel,successCount:totalSuccessCount});
return;
}
for(let dIdx=0;dIdx<datesList.length;dIdx++){
if(shouldStopRegistration)break;
const targetDate=datesList[dIdx];
const targetDay=_0x102f(targetDate);
console.log(`\n\ud83d\udcc5 [\uc804\uccb4\ub9ac\uc14b \ub0a0\uc9dc ${dIdx+1}/${datesList.length}] [${targetDate}] (${targetDay}\uc77c) \ub9ac\uc14b \uc2dc\uc791...`);
if(!_0x102c()||_0x102b()||_0x102a()||isEditPage()||isDetailPage()){
await navigateBackToList(effectiveFilter);
await _0x1001(350);
}
if(shouldStopRegistration)break;
await _0x103f(effectiveFilter);
await _0x1001(300);
if(!_0x1038(targetDate)){
const dateClicked=await _0x103c(targetDate);
await _0x1001(300);
const activeDayNow=_0x1037();
if(!dateClicked&&activeDayNow&&targetDay&&activeDayNow!==targetDay){
console.warn(`\u26a0\ufe0f [\uc804\uccb4\ub9ac\uc14b] \uace8\ud504\ubaac \ub0b4\uae00 \ubaa9\ub85d \uc0c1\ub2e8\uc5d0\uc11c [${targetDate}] \ub0a0\uc9dc \ud0ed\uc744 \ucc3e\uc9c0 \ubabb\ud574 \ub2e4\uc74c \ub0a0\uc9dc\ub85c \ub118\uc5b4\uac11\ub2c8\ub2e4.`);
continue;
}
}else{
console.log(`[\uc804\uccb4\ub9ac\uc14b] \uc2dc\uc791 \uc2dc \ubaa9\ud45c \ub0a0\uc9dc(${targetDate}) \uc774\ubbf8 \uc815\uc0c1 \uc120\ud0dd \ud655\uc778\ub428 -> \ud074\ub9ad \uc0dd\ub7b5`);
}
await _0x103d('\uc804\uccb4');
await _0x1001(350);
let firstResetSig=null;
let firstResetSigTotalCount=1;
let firstResetSigDoneCount=0;
let firstResetPostId=null;
let initialTotalCards=0;
let dateSuccessCount=0;
let dateDiscovered=0;
for(let stepIdx=0;stepIdx<200;stepIdx++){
if(shouldStopRegistration)break;
if(!_0x102c()||_0x102b()||_0x102a()||isEditPage()||isDetailPage()){
await navigateBackToList(effectiveFilter);
await _0x1001(350);
}
if(shouldStopRegistration)break;
await _0x103f(effectiveFilter);
await _0x1001(250);
if(targetDay&&!_0x1038(targetDate)){
console.log(`[\uc804\uccb4\ub9ac\uc14b] \ubaa9\ud45c \ub0a0\uc9dc(${targetDate}) \ubbf8\uc120\ud0dd \uac10\uc9c0 -> \uc7ac\uc120\ud0dd \uc2e4\ud589`);
await _0x103c(targetDate);
await _0x1001(250);
}else{
console.log(`[\uc804\uccb4\ub9ac\uc14b] \ubaa9\ud45c \ub0a0\uc9dc(${targetDate}) \uc774\ubbf8 \uc815\uc0c1 \uc120\ud0dd \ud655\uc778\ub428 -> \ud074\ub9ad \uc0dd\ub7b5 (\ub0a0\uc9dc \ud574\uc81c \ubc29\uc9c0)`);
}
await _0x103d('\uc804\uccb4');
await _0x1001(200);
const allCards=await scrollToBottomAndCollectAllCards();
if(shouldStopRegistration)break;
if(allCards.length===0){
console.log(`\u2705 [\uc804\uccb4\ub9ac\uc14b] \uc9c0\uc815 \ub0a0\uc9dc(${targetDate})\uc5d0 \ub4f1\ub85d\ub41c \uae00\uc774 \uc5c6\uc2b5\ub2c8\ub2e4. (\ud574\ub2f9 \ub0a0\uc9dc ${dateSuccessCount}\uac74 \ub9ac\uc14b \uc644\ub8cc)`);
break;
}
if(initialTotalCards===0){
initialTotalCards=allCards.length;
dateDiscovered=allCards.length;
totalDiscoveredAllDates+=allCards.length;
console.log(`\ud83d\udccb [\uc804\uccb4\ub9ac\uc14b] [${targetDate}] \ucd08\uae30 \uc2a4\uce94 \uc644\ub8cc: \ucd1d ${initialTotalCards}\uac74\uc758 \ub4f1\ub85d\uae00 \uac10\uc9c0\ub428.`);
}else{
dateDiscovered=Math.max(dateDiscovered,allCards.length);
}
const bottomCard=allCards[allCards.length-1];
if(firstResetSig&&bottomCard.sig===firstResetSig&&firstResetSigDoneCount>=firstResetSigTotalCount){
console.log(`\ud83c\udf89 [\uc804\uccb4\ub9ac\uc14b] [${targetDate}] \ucc98\uc74c\uc5d0 \ub9ac\uc14b\ud588\ub358 \uae00 [${bottomCard.courseName} (${bottomCard.teeTime})]\uc774 \ucd5c\ud558\ub2e8 \ucc28\ub840\ub85c \ub3cc\uc544\uc654\uc2b5\ub2c8\ub2e4! [${targetDate}] \ub9ac\uc14b \uc644\ub8cc! (${dateSuccessCount}\uac74)`);
break;
}
if(initialTotalCards>0&&dateSuccessCount>=initialTotalCards&&firstResetSig&&bottomCard.sig===firstResetSig){
console.log(`\ud83c\udf89 [\uc804\uccb4\ub9ac\uc14b] [${targetDate}] \uc804\uccb4 ${initialTotalCards}\uac74 \ud55c \ubc14\ud034 \ub9ac\uc14b \uc644\ub8cc! (${dateSuccessCount}\uac74)`);
break;
}
if(!firstResetSig){
firstResetSig=bottomCard.sig;
firstResetSigTotalCount=allCards.filter(c=>c.sig===firstResetSig).length||1;
console.log(`\ud83d\udccc [\uc804\uccb4\ub9ac\uc14b \uae30\uc900\uc810 \uae30\uc5b5 (${targetDate})] \uccab \ub9ac\uc14b \ub300\uc0c1(\ucd5c\ud558\ub2e8): [${bottomCard.courseName} / ${bottomCard.teeTime} / ${bottomCard.feeStr}] (\ub3d9\uc77c \uc2dc\uadf8\ub2c8\ucc98 ${firstResetSigTotalCount}\uac74)`);
}
const nextCard=bottomCard;
const displayDateTotal=Math.max(initialTotalCards,dateDiscovered,dateSuccessCount+1);
const dateProgressPrefix=datesList.length>1?`[${targetDate} (${dIdx+1}/${datesList.length}\uc77c\ucc28)] `:'';
console.log(`\n================== [\uc804\uccb4\ub9ac\uc14b ${dateProgressPrefix}${dateSuccessCount+1}/${displayDateTotal}] (\ucd5c\ud558\ub2e8 \uc120\ud0dd) ${nextCard.courseName} (${targetDate} ${nextCard.teeTime}) \uc218\uc815 \uc2dc\uc791 ==================`);
chrome.runtime.sendMessage({
type:'\x44\x41\x54\x45\x5f\x52\x45\x53\x45\x54\x5f\x50\x52\x4f\x47\x52\x45\x53\x53',
current:dateSuccessCount+1,
total:displayDateTotal,
golf:datesList.length>1?`[${targetDate}] ${nextCard.courseName}`:nextCard.courseName,
date:targetDate,
time:nextCard.teeTime
});
const inDetail=await clickPostCardReliably(nextCard.el);
if(!inDetail){
console.warn(`[\uc804\uccb4\ub9ac\uc14b] ${nextCard.courseName} (${nextCard.teeTime}) \uc0c1\uc138 \ud398\uc774\uc9c0 \uc9c4\uc785 \uc2e4\ud328 -> \ubaa9\ub85d \ubcf5\uadc0 \ud6c4 \uc7ac\uc2dc\ub3c4`);
await navigateBackToList(effectiveFilter);
continue;
}
const curUrlMatch=window.location.href.match(/[?&]id=(\d+)/)||window.location.href.match(/\/(?:join|transfer)\/(?:detail|edit|view)\/(\d+)/)||window.location.href.match(/\/(?:detail|item)\/(\d+)/);
const detectedPostId=curUrlMatch?curUrlMatch[1]:nextCard.postId;
if(detectedPostId&&(detectedPostId===firstResetPostId||processedPostIds.has(detectedPostId))){
console.log(`\ud83c\udf89 [\uc804\uccb4\ub9ac\uc14b] [${targetDate}] \uc774\ubbf8 \ub9ac\uc14b \uc644\ub8cc\ub41c \uae00(ID: ${detectedPostId})\uc758 \ucc28\ub840\uac00 \ub3cc\uc544\uc654\uc2b5\ub2c8\ub2e4 -> [${targetDate}] \ub9ac\uc14b \uc644\ub8cc \ucc98\ub9ac \ud6c4 \ubcf5\uadc0!`);
await navigateBackToList(effectiveFilter);
break;
}
if(!firstResetPostId&&detectedPostId){
firstResetPostId=detectedPostId;
console.log(`\ud83d\udccc [\uc804\uccb4\ub9ac\uc14b \uae30\uc900\uc810 ID \uae30\uc5b5 (${targetDate})] \uccab \ub9ac\uc14b \uae00 \uace0\uc720 ID: ${firstResetPostId}`);
}
if(shouldStopRegistration)break;
await _0x1001(_0x1002('\x71\x75\x69\x63\x6b\x5f\x63\x6c\x69\x63\x6b',stepPreset));
const openedEdit=await openMenuAndClickEdit();
if(!openedEdit){
console.warn(`[\uc804\uccb4\ub9ac\uc14b] ${nextCard.courseName} (${nextCard.teeTime}) \uc218\uc815 \ud3fc \uc9c4\uc785 \uc2e4\ud328 -> \ubaa9\ub85d \ubcf5\uadc0`);
if(detectedPostId)processedPostIds.add(detectedPostId);
await navigateBackToList(effectiveFilter);
continue;
}
if(shouldStopRegistration)break;
const editSuccess=await submitEditWithoutChanges(stepPreset,{
courseName:nextCard.courseName,
date:targetDate,
teeTime:nextCard.teeTime,
feeStr:nextCard.feeStr
});
if(detectedPostId){
processedPostIds.add(detectedPostId);
}
if(nextCard.sig===firstResetSig){
firstResetSigDoneCount++;
}
if(editSuccess){
dateSuccessCount++;
totalSuccessCount++;
console.log(`\u2705 [\uc804\uccb4\ub9ac\uc14b \uc644\ub8cc -> \ub9e8 \uc704\ub85c \uc774\ub3d9\ub428] ${nextCard.courseName} (${targetDate} ${nextCard.teeTime}) (${targetDate}: ${dateSuccessCount}/${displayDateTotal}\uac74, \ub204\uc801: ${totalSuccessCount}\uac74)`);
}else{
console.warn(`[\uc804\uccb4\ub9ac\uc14b] ${nextCard.courseName} (${nextCard.teeTime}) \uc81c\ucd9c \ubbf8\ud655\uc778 -> \ubaa9\ub85d \ubcf5\uadc0`);
}
if(!_0x102c()||_0x102b()||_0x102a()){
await navigateBackToList(effectiveFilter);
await _0x1001(350);
}
if(shouldStopRegistration)break;
if(initialTotalCards>0&&dateSuccessCount>=initialTotalCards){
console.log(`\ud83c\udf89 [\uc804\uccb4\ub9ac\uc14b] [${targetDate}] \uc804\uccb4 ${initialTotalCards}\uac74 \ub9ac\uc14b\uc744 \ubaa8\ub450 \uc644\ub8cc\ud588\uc2b5\ub2c8\ub2e4!`);
break;
}
const cooldownMs=_0x1004(delayPreset||'\x73\x61\x66\x65');
await _0x1001(cooldownMs);
}
if(!shouldStopRegistration&&dIdx<datesList.length-1){
console.log(`\u27a1\ufe0f [\uc804\uccb4\ub9ac\uc14b] [${targetDate}] \uc644\ub8cc (${dateSuccessCount}\uac74) -> \ub2e4\uc74c \ub0a0\uc9dc [${datesList[dIdx+1]}]\ub85c \uc774\ub3d9\ud569\ub2c8\ub2e4...`);
await _0x1001(500);
}
}
isRegistrationRunning=false;
isDateResetRunning=false;
try{chrome.storage.local.set({isRegistrationRunning:false});}catch(e){}
if(shouldStopRegistration){
chrome.runtime.sendMessage({
type:'\x44\x41\x54\x45\x5f\x52\x45\x53\x45\x54\x5f\x53\x54\x4f\x50\x50\x45\x44',
targetDate:rangeLabel,
total:totalDiscoveredAllDates,
successCount:totalSuccessCount
});
}else{
chrome.runtime.sendMessage({
type:'\x44\x41\x54\x45\x5f\x52\x45\x53\x45\x54\x5f\x43\x4f\x4d\x50\x4c\x45\x54\x45\x44',
targetDate:rangeLabel,
total:totalDiscoveredAllDates,
successCount:totalSuccessCount,
reason:totalSuccessCount===0?`\u26a0\ufe0f \uc9c0\uc815\ud55c \uae30\uac04(${rangeLabel})\uc5d0 \ub4f1\ub85d\ub41c \uae00\uc744 \ucc3e\uc9c0 \ubabb\ud588\uac70\ub098 \ub9ac\uc14b\ud560 \ud56d\ubaa9\uc774 \uc5c6\uc2b5\ub2c8\ub2e4.`:undefined
});
}
}
function filterOutSpecialCoursesForCS(items,specialCourses){
if(!Array.isArray(items)||!Array.isArray(specialCourses)||specialCourses.length===0)return items;
const cleanSpecials=specialCourses.map(s=>String(s||'').replace(/[\s\-_()\[\]]/g,'').toLowerCase()).filter(Boolean);
if(cleanSpecials.length===0)return items;
return items.filter(it=>{
const names=[it.golf,it.rawGolf].filter(Boolean).map(n=>String(n).replace(/[\s\-_()\[\]]/g,'').toLowerCase());
const isSpecial=names.some(name=>cleanSpecials.some(spec=>name.includes(spec)||spec.includes(name)));
if(isSpecial){
console.log(`[Tee82] \ud2b9\uc815\uad6c\uc7a5 \uc81c\uc678 \uc124\uc815\uc73c\ub85c \uc218\uc815 \ub300\uc0c1\uc5d0\uc11c \uc81c\uc678\ub428: [${it.golf}] (${it.date} ${it.time})`);
}
return!isSpecial;
});
}
const ACTIVE_BATCH_STORAGE_KEY='\x67\x6f\x6c\x66\x6d\x6f\x6e\x5f\x61\x63\x74\x69\x76\x65\x5f\x62\x61\x74\x63\x68\x5f\x73\x74\x61\x74\x65\x5f\x76\x31';
let _isPageUnloading=false;
window.addEventListener('\x62\x65\x66\x6f\x72\x65\x75\x6e\x6c\x6f\x61\x64',()=>{
_isPageUnloading=true;
});
window.addEventListener('\x70\x61\x67\x65\x68\x69\x64\x65',()=>{
_isPageUnloading=true;
});
window.addEventListener('\x70\x61\x67\x65\x73\x68\x6f\x77',(e)=>{
_isPageUnloading=false;
if(e&&e.persisted){
isRegistrationRunning=false;
isPostReplacementRunning=false;
_priceUpdateRunning=false;
isDateResetRunning=false;
_isAutoResuming=false;
checkAndResumeInterruptedBatch();
}
});
function saveActiveBatchState(stateObj){
try{
const payload={
...stateObj,
active:true,
updatedAt:Date.now()
};
sessionStorage.setItem(ACTIVE_BATCH_STORAGE_KEY,JSON.stringify(payload));
}catch(e){}
}
function loadActiveBatchState(){
try{
const raw=sessionStorage.getItem(ACTIVE_BATCH_STORAGE_KEY);
if(!raw)return null;
const parsed=JSON.parse(raw);
if(!parsed||!parsed.active)return null;
if(Date.now()-(parsed.updatedAt||0)>5*60*1000){
sessionStorage.removeItem(ACTIVE_BATCH_STORAGE_KEY);
return null;
}
return parsed;
}catch(e){
return null;
}
}
function clearActiveBatchState(){
try{
sessionStorage.removeItem(ACTIVE_BATCH_STORAGE_KEY);
}catch(e){}
}
async function checkAndResumeInterruptedBatch(){
if(_isAutoResuming)return;
_isAutoResuming=true;
try{
await _0x1001(600);
if(_isPageUnloading||isRegistrationRunning||isPostReplacementRunning||_priceUpdateRunning||isDateResetRunning){
return;
}
const saved=loadActiveBatchState();
if(!saved||!saved.active||!Array.isArray(saved.remainingItems)||saved.remainingItems.length===0){
return;
}
console.log(`\ud83d\udd04 [\uc790\ub3d9\ubcf5\uad6c \uac10\uc9c0] \uc2e4\ud589 \uc911 \ud2b9\uc815 \uc8fc\uc18c\ub85c \uc774\ub3d9("${window.location.href}")\ub418\uc5b4 \uc911\ub2e8\ub41c \uc791\uc5c5 \uac10\uc9c0! (\uc911\ub2e8 \ud0c0\uc784: ${saved.interruptedItemLabel||'\uc9c4\ud589 \uc911 \ud56d\ubaa9'}, \ub0a8\uc740 \ud0c0\uc784: ${saved.remainingItems.length}\uac74)`);
if(saved.needsHistoryBack!==false){
saved.needsHistoryBack=false;
saveActiveBatchState(saved);
console.log(`\ud83d\udd19 [\uc790\ub3d9\ubcf5\uad6c] \ub4a4\ub85c\uac00\uae30(history.back) 1\ud68c \uc2e4\ud589 \ud6c4 \uae30\uc874 \uc9c4\ud589\ud558\ub2e4 \uc911\ub2e8\ub410\ub358 \ud0c0\uc784(${saved.interruptedItemLabel||''})\ubd80\ud130 \ub2e4\uc2dc \uc9c4\ud589\ud569\ub2c8\ub2e4...`);
window.history.back();
await _0x1001(1100);
if(_isPageUnloading)return;
}
if(isRegistrationRunning||isPostReplacementRunning||_priceUpdateRunning||isDateResetRunning){
return;
}
saved.needsHistoryBack=true;
saveActiveBatchState(saved);
const resumeItems=saved.remainingItems;
if(saved.macroType==='\x50\x4f\x53\x54\x5f\x52\x45\x50\x4c\x41\x43\x45'){
executeBatchPostReplacement(
resumeItems,
saved.delayPreset||'\x73\x61\x66\x65',
saved.stepPreset||'\x68\x75\x6d\x61\x6e',
saved.filterType||'',
saved.customMemo||'',
saved.confirmMismatch!==false,
Boolean(saved.isPriceUpdateMode),
saved
);
}else if(saved.macroType==='\x50\x52\x49\x43\x45\x5f\x55\x50\x44\x41\x54\x45'){
executeBatchPriceUpdate(
resumeItems,
saved.delayPreset||'\x73\x61\x66\x65',
saved.stepPreset||'\x68\x75\x6d\x61\x6e',
saved.filterType||'',
saved.confirmMismatch!==false,
saved.customMemo||'',
saved
);
}else if(saved.macroType==='\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e'){
_0x1027(
resumeItems,
saved.customMemo||'',
saved.mode||'\x6a\x6f\x69\x6e',
saved.delayPreset||'\x73\x61\x66\x65',
saved.stepPreset||'\x68\x75\x6d\x61\x6e',
saved
);
}
}finally{
_isAutoResuming=false;
}
}
if(!window._qRuntimeHandlerBound){
window._qRuntimeHandlerBound=true;
chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
if(typeof request.isAdmin==='\x62\x6f\x6f\x6c\x65\x61\x6e'||typeof request.allowF12==='\x62\x6f\x6f\x6c\x65\x61\x6e'){
isDebugAdmin=!!request.isAdmin||!!request.allowF12;
}
if(!isDebugAdmin){
try{console.clear();}catch(e){}
}
if(request.action==='\x53\x54\x41\x52\x54\x5f\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e'){
_activeMacroRunId++;
_isAutoResuming=false;
clearActiveBatchState();
shouldStopRegistration=false;
isRegistrationRunning=false;
isPostReplacementRunning=false;
_priceUpdateRunning=false;
isDateResetRunning=false;
setTimeout(()=>{
_0x1027(request.items,request.memo,request.mode||'\x6a\x6f\x69\x6e',request.delayPreset||'\x73\x61\x66\x65',request.stepPreset||'\x68\x75\x6d\x61\x6e');
},80);
sendResponse({status:'\x73\x74\x61\x72\x74\x65\x64'});
}else if(request.action==='\x53\x54\x41\x52\x54\x5f\x47\x4f\x4c\x46\x4d\x4f\x4e\x5f\x50\x52\x49\x43\x45\x5f\x55\x50\x44\x41\x54\x45'){
_activeMacroRunId++;
_isAutoResuming=false;
clearActiveBatchState();
shouldStopRegistration=false;
isRegistrationRunning=false;
_priceUpdateRunning=false;
isPostReplacementRunning=false;
isDateResetRunning=false;
let runItems=request.items||[];
if(request.includeSpecial===false&&Array.isArray(request.specialCourses)&&request.specialCourses.length>0){
runItems=filterOutSpecialCoursesForCS(runItems,request.specialCourses);
}
setTimeout(()=>{
executeBatchPriceUpdate(runItems,request.delayPreset||'\x73\x61\x66\x65',request.stepPreset||'\x68\x75\x6d\x61\x6e',request.filterType||'',request.confirmMismatch!==false,request.memo||'');
},80);
sendResponse({status:'\x73\x74\x61\x72\x74\x65\x64'});
}else if(request.action==='\x53\x54\x41\x52\x54\x5f\x47\x4f\x4c\x46\x4d\x4f\x4e\x5f\x50\x4f\x53\x54\x5f\x52\x45\x50\x4c\x41\x43\x45\x4d\x45\x4e\x54'){
_activeMacroRunId++;
_isAutoResuming=false;
clearActiveBatchState();
shouldStopRegistration=false;
isRegistrationRunning=false;
isPostReplacementRunning=false;
_priceUpdateRunning=false;
isDateResetRunning=false;
let runItems=request.items||[];
if(request.includeSpecial===false&&Array.isArray(request.specialCourses)&&request.specialCourses.length>0){
runItems=filterOutSpecialCoursesForCS(runItems,request.specialCourses);
}
setTimeout(()=>{
executeBatchPostReplacement(runItems,request.delayPreset||'\x73\x61\x66\x65',request.stepPreset||'\x68\x75\x6d\x61\x6e',request.filterType||'',request.memo||'',request.confirmMismatch!==false);
},80);
sendResponse({status:'\x73\x74\x61\x72\x74\x65\x64'});
}else if(request.action==='\x53\x54\x41\x52\x54\x5f\x47\x4f\x4c\x46\x4d\x4f\x4e\x5f\x44\x41\x54\x45\x5f\x52\x45\x53\x45\x54'){
_activeMacroRunId++;
_isAutoResuming=false;
clearActiveBatchState();
shouldStopRegistration=false;
isRegistrationRunning=false;
isDateResetRunning=false;
isPostReplacementRunning=false;
_priceUpdateRunning=false;
setTimeout(()=>{
executeBatchDateReset(request.targetDate,request.filterType||'\uc804\uccb4',request.delayPreset||'\x73\x61\x66\x65',request.stepPreset||'\x68\x75\x6d\x61\x6e',request.targetDates||null);
},80);
sendResponse({status:'\x73\x74\x61\x72\x74\x65\x64'});
}else if(request.action==='\x46\x4f\x52\x43\x45\x5f\x42\x41\x43\x4b\x5f\x41\x4e\x44\x5f\x52\x45\x53\x55\x4d\x45'){
if(!isRegistrationRunning&&!isPostReplacementRunning&&!_priceUpdateRunning&&!isDateResetRunning&&!_isAutoResuming){
if(request.resumeState&&Array.isArray(request.resumeState.remainingItems)&&request.resumeState.remainingItems.length>0){
saveActiveBatchState(request.resumeState);
checkAndResumeInterruptedBatch();
sendResponse({status:'\x72\x65\x73\x75\x6d\x69\x6e\x67'});
return true;
}
}
sendResponse({status:'\x61\x6c\x72\x65\x61\x64\x79\x5f\x72\x75\x6e\x6e\x69\x6e\x67'});
}else if(request.action==='\x53\x54\x4f\x50\x5f\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e'){
_activeMacroRunId++;
_isAutoResuming=false;
clearActiveBatchState();
shouldStopRegistration=true;
isRegistrationRunning=false;
_priceUpdateRunning=false;
isPostReplacementRunning=false;
isDateResetRunning=false;
sendResponse({status:'\x73\x74\x6f\x70\x70\x69\x6e\x67'});
}else if(request.action==='\x43\x48\x45\x43\x4b\x5f\x53\x54\x41\x54\x55\x53'){
sendResponse({isRunning:Boolean(isRegistrationRunning||isPostReplacementRunning||_priceUpdateRunning||isDateResetRunning||_isAutoResuming)});
}
return true;
});
checkAndResumeInterruptedBatch();
}
