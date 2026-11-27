async function _0x1000(){
return;
}
chrome.runtime.onInstalled.addListener((details)=>{
console.log("[\x41\x75\x74\x6f\x6d\x61\x54\x65\x65] \ud655\uc7a5\ud504\ub85c\uadf8\ub7a8 \uc124\uce58\x2f\uc5c5\ub370\uc774\ud2b8 \uac10\uc9c0\x3a",details?.reason);
_0x1000();
const currentVersion=chrome.runtime.getManifest()?.version||'';
const isRealVersionChange=details&&details.reason==='\x75\x70\x64\x61\x74\x65'&&
details.previousVersion&&details.previousVersion!==currentVersion;
if(isRealVersionChange){
try{
chrome.storage.local.get(['\x76\x32\x5f\x69\x73\x41\x64\x6d\x69\x6e','\x76\x32\x5f\x61\x75\x74\x68\x5f\x75\x73\x65\x72'],(res)=>{
const user=res?.v2_auth_user;
const adminIds=['\x61\x64\x6d\x69\x6e','\x61\x64\x6d\x69\x6e\x69\x73\x74\x72\x61\x74\x6f\x72','\x67\x6f\x6c\x66\x6d\x6f\x6e\x5f\x61\x64\x6d\x69\x6e','\x70\x75\x72\x72\x79','\x70\x75\x72\x72\x79\x38\x35','\x79\x65\x62\x62\x61'];
const adminTokens=['\uad00\ub9ac\uc790','\x61\x64\x6d\x69\x6e','\ub9c8\uc2a4\ud130','\x6d\x61\x73\x74\x65\x72','\ucd5c\uace0\uad00\ub9ac\uc790','\uac1c\ubc1c\uc790'];
let isAdmin=false;
if(user){
const id=String(user.id||'').trim().toLowerCase();
const tokens=String(user.features||'').toLowerCase().split(/[,+\/\s|;]+/).filter(Boolean);
isAdmin=user.isAdmin===true||adminIds.includes(id)||tokens.some(t=>adminTokens.includes(t));
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
chrome.sidePanel.setPanelBehavior({openPanelOnActionClick:false}).catch((err)=>{
console.warn('[\x41\x75\x74\x6f\x6d\x61\x54\x65\x65] \x73\x65\x74\x50\x61\x6e\x65\x6c\x42\x65\x68\x61\x76\x69\x6f\x72 \uc124\uc815\x3a',err);
});
}
if(chrome.action&&typeof chrome.action.setPopup==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
chrome.action.setPopup({popup:'\x70\x6f\x70\x75\x70\x2e\x68\x74\x6d\x6c'});
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
