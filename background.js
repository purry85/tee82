async function _0x1000(){
if(!chrome.action||!chrome.action.setIcon)return;
try{
await chrome.action.setIcon({
path:{
16:"\x69\x63\x6f\x6e\x2e\x70\x6e\x67",
32:"\x69\x63\x6f\x6e\x2e\x70\x6e\x67",
48:"\x69\x63\x6f\x6e\x2e\x70\x6e\x67",
128:"\x69\x63\x6f\x6e\x2e\x70\x6e\x67"
}
});
console.log("[\x41\x75\x74\x6f\x6d\x61\x54\x65\x65] \ud234\ubc14 \uc544\uc774\ucf58(\x69\x63\x6f\x6e\x2e\x70\x6e\x67)\uc774 \uc131\uacf5\uc801\uc73c\ub85c \uc801\uc6a9\ub418\uc5c8\uc2b5\ub2c8\ub2e4\x2e");
}catch(err){
console.error("[\x41\x75\x74\x6f\x6d\x61\x54\x65\x65] \ud234\ubc14 \uc544\uc774\ucf58 \uc801\uc6a9 \uc2e4\ud328\x3a",err);
}
}
function _0x1001(size){
const canvas=new OffscreenCanvas(size,size);
const ctx=canvas.getContext('\x32\x64');
ctx.clearRect(0,0,size,size);
const scale=size/128;
ctx.save();
ctx.translate(0,2*scale);
const darkGreen='\x23\x31\x33\x33\x39\x32\x45';
const gold='\x23\x43\x37\x38\x42\x31\x41';
ctx.beginPath();
ctx.arc(64*scale,46*scale,33*scale,0,Math.PI*2);
ctx.lineWidth=Math.max(1.5,5.5*scale);
ctx.strokeStyle=darkGreen;
ctx.stroke();
const dimples=[
[47,40,2.4],[55.5,40,2.4],[64,40,2.4],[72.5,40,2.4],[81,40,2.4],
[41.5,48.5,2.4],[50.5,48.5,2.4],[59.5,48.5,2.4],[68.5,48.5,2.4],[77.5,48.5,2.4],[86.5,48.5,2.4],
[46,57,2.4],[55,57,2.4],[64,57,2.4],[73,57,2.4],[82,57,2.4],
[55.5,64.5,2.2],[64,65.5,2.2],[72.5,64.5,2.2]
];
ctx.fillStyle=darkGreen;
const minDimpleR=size<=16?0.75:(size<=32?1.0:1.5);
for(const d of dimples){
ctx.beginPath();
const r=Math.max(minDimpleR,d[2]*scale);
ctx.arc(d[0]*scale,d[1]*scale,r,0,Math.PI*2);
ctx.fill();
}
ctx.beginPath();
ctx.moveTo(33*scale,55*scale);
ctx.bezierCurveTo(34*scale,68*scale,45*scale,78*scale,64*scale,78*scale);
ctx.bezierCurveTo(83*scale,78*scale,94*scale,68*scale,95*scale,55*scale);
ctx.bezierCurveTo(93*scale,74*scale,79*scale,81*scale,68*scale,82*scale);
ctx.lineTo(68*scale,94*scale);
ctx.lineTo(60*scale,94*scale);
ctx.lineTo(60*scale,82*scale);
ctx.bezierCurveTo(49*scale,81*scale,35*scale,74*scale,33*scale,55*scale);
ctx.closePath();
ctx.fillStyle=darkGreen;
ctx.fill();
ctx.beginPath();
ctx.moveTo(59.5*scale,98*scale);
ctx.lineTo(68.5*scale,98*scale);
ctx.lineTo(64*scale,113*scale);
ctx.closePath();
ctx.fillStyle=gold;
ctx.fill();
ctx.restore();
return ctx.getImageData(0,0,size,size);
}
chrome.runtime.onInstalled.addListener((details)=>{
console.log("[\x41\x75\x74\x6f\x6d\x61\x54\x65\x65] \ud655\uc7a5\ud504\ub85c\uadf8\ub7a8 \uc124\uce58\x2f\uc5c5\ub370\uc774\ud2b8 \uac10\uc9c0\x3a",details?.reason);
_0x1000();
if(details&&(details.reason==='\x75\x70\x64\x61\x74\x65'||details.reason==='\x69\x6e\x73\x74\x61\x6c\x6c')){
try{
chrome.storage.local.get(['\x76\x32\x5f\x69\x73\x41\x64\x6d\x69\x6e','\x76\x32\x5f\x61\x75\x74\x68\x5f\x75\x73\x65\x72'],(res)=>{
let user=res?.v2_auth_user;
let isAdmin=res?.v2_isAdmin===true;
if(!isAdmin&&user){
const id=String(user.id||'').toLowerCase();
const name=String(user.name||'').toLowerCase();
const features=String(user.features||'').toLowerCase();
if(id.includes('\x61\x64\x6d\x69\x6e')||name.includes('\uad00\ub9ac\uc790')||features.includes('\uad00\ub9ac\uc790')||features.includes('\x61\x64\x6d\x69\x6e')||features.includes('\ub9c8\uc2a4\ud130')){
isAdmin=true;
}
}
if(isAdmin){
console.log("[\x41\x75\x74\x6f\x6d\x61\x54\x65\x65] \uad00\ub9ac\uc790 \uacc4\uc815 \uac10\uc9c0 -> \uc5c5\ub370\uc774\ud2b8 \uc2dc \ub85c\uadf8\uc778 \uc720\uc9c0 (\ub85c\uadf8\uc544\uc6c3 \uc81c\uc678)");
return;
}
chrome.storage.local.remove(['\x76\x32\x5f\x61\x75\x74\x68\x5f\x75\x73\x65\x72','\x76\x32\x5f\x6c\x61\x62\x4d\x6f\x64\x65\x41\x63\x74\x69\x76\x65','\x76\x32\x5f\x69\x73\x41\x64\x6d\x69\x6e','\x76\x32\x5f\x6d\x75\x6c\x74\x69\x46\x65\x61\x74\x75\x72\x65\x41\x63\x74\x69\x76\x65']);
chrome.storage.local.set({v2_auth_invalidated_at:Date.now()});
});
}catch(e){}
}
});
chrome.runtime.onStartup.addListener(()=>{
_0x1000();
});
_0x1000();
if(chrome.sidePanel&&typeof chrome.sidePanel.setPanelBehavior==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
chrome.sidePanel.setPanelBehavior({openPanelOnActionClick:true}).catch((err)=>{
console.warn('[\x41\x75\x74\x6f\x6d\x61\x54\x65\x65] \x73\x65\x74\x50\x61\x6e\x65\x6c\x42\x65\x68\x61\x76\x69\x6f\x72 \uc124\uc815\x3a',err);
});
}
if(chrome.action&&typeof chrome.action.setPopup==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
if(chrome.sidePanel){
chrome.action.setPopup({popup:''});
}
}
if(chrome.action&&chrome.action.onClicked){
chrome.action.onClicked.addListener(async(tab)=>{
if(chrome.sidePanel&&typeof chrome.sidePanel.open==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'&&tab&&tab.windowId){
try{
await chrome.sidePanel.open({windowId:tab.windowId});
}catch(e){
console.warn('[\x41\x75\x74\x6f\x6d\x61\x54\x65\x65] \x61\x63\x74\x69\x6f\x6e\x2e\x6f\x6e\x43\x6c\x69\x63\x6b\x65\x64 \x73\x69\x64\x65\x50\x61\x6e\x65\x6c\x2e\x6f\x70\x65\x6e \uc2e4\ud328\x3a',e);
}
}
});
}
chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
if(message.action==='\x4f\x50\x45\x4e\x5f\x53\x49\x44\x45\x5f\x50\x41\x4e\x45\x4c'){
chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
if(tabs&&tabs[0]&&chrome.sidePanel&&typeof chrome.sidePanel.open==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
chrome.sidePanel.open({windowId:tabs[0].windowId}).then(()=>{
sendResponse({success:true});
}).catch((err)=>{
console.error("\uc0ac\uc774\ub4dc\ud328\ub110 \uc5f4\uae30 \uc2e4\ud328\x3a",err);
sendResponse({success:false,error:err.message});
});
}else{
sendResponse({success:false});
}
});
return true;
}
if(message.action==='\x43\x41\x4c\x4c\x5f\x47\x45\x4d\x49\x4e\x49\x5f\x4f\x43\x52'){
const{modelName,payload,apiKey}=message;
const cleanKey=(apiKey||'').trim();
const url=`https://generativelanguage.googleapis.com/v1beta/models/${modelName||'\x67\x65\x6d\x69\x6e\x69-\x33\x2e\x35-\x66\x6c\x61\x73\x68-\x6c\x69\x74\x65'}:generateContent`;
fetch(url,{
method:'\x50\x4f\x53\x54',
headers:{
'\x43\x6f\x6e\x74\x65\x6e\x74-\x54\x79\x70\x65':'\x61\x70\x70\x6c\x69\x63\x61\x74\x69\x6f\x6e\x2f\x6a\x73\x6f\x6e',
'\x58-\x67\x6f\x6f\x67-\x61\x70\x69-\x6b\x65\x79':cleanKey
},
body:JSON.stringify(payload)
})
.then(async(resp)=>{
if(resp.ok){
const data=await resp.json();
sendResponse({success:true,data});
}else{
const errTxt=await resp.text();
let errMsg=`\uad6c\uae00 HTTP ${resp.status}`;
try{
const ej=JSON.parse(errTxt);
if(ej.error&&ej.error.message)errMsg=`[Google AI ${resp.status}] ${ej.error.message}`;
else errMsg=`[Google AI ${resp.status}] ${errTxt.slice(0,120)}`;
}catch(e){errMsg=`[Google AI ${resp.status}] ${errTxt.slice(0,120)}`;}
sendResponse({success:false,error:errMsg});
}
})
.catch((err)=>{
sendResponse({success:false,error:`[\ub124\ud2b8\uc6cc\ud06c \ud1b5\uc2e0 \uc624\ub958] ${err.message}`});
});
return true;
}
});
