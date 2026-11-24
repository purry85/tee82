(function(){
var origConfirm=window.confirm?window.confirm.bind(window):null;
var origAlert=window.alert?window.alert.bind(window):null;
var origPrompt=window.prompt?window.prompt.bind(window):null;
var isAutoRegistrationActive=false;
function _0x1000(){
return isAutoRegistrationActive||
window.__TEE82_AUTO_ACTIVE__===true||
(document.documentElement&&document.documentElement.getAttribute('\x64\x61\x74\x61-\x74\x65\x65\x38\x32-\x61\x63\x74\x69\x76\x65')==='\x74\x72\x75\x65');
}
function _0x1001(w){
if(!w)return;
try{
w.confirm=function(msg){
if(_0x1000()){
console.log("[\x54\x65\x65\x38\x32 \uace8\ud504\ud0d1 \x63\x6f\x6e\x66\x69\x72\x6d \uc790\ub3d9 \uc2b9\uc778]\x3a",msg);
return true;
}
return origConfirm?origConfirm(msg):true;
};
w.alert=function(msg){
try{
w.postMessage({type:'\x5f\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x44\x49\x41\x4c\x4f\x47\x5f\x4e\x4f\x54\x49\x43\x45\x5f\x5f',text:String(msg)},'*');
}catch(e){}
if(_0x1000()){
console.log("[\x54\x65\x65\x38\x32 \uace8\ud504\ud0d1 \x61\x6c\x65\x72\x74 \uc790\ub3d9 \ud1b5\uacfc]\x3a",msg);
return undefined;
}
return origAlert?origAlert(msg):undefined;
};
w.prompt=function(msg,def){
if(_0x1000()){
return def||'';
}
return origPrompt?origPrompt(msg,def):(def||'');
};
function _0x1002(origSwal){
if(!origSwal||origSwal.__tee82_hooked)return origSwal;
const proxy=function(...args){
if(!_0x1000()){
return origSwal.apply(this,args);
}
const first=args[0];
const title=(typeof first==='\x73\x74\x72\x69\x6e\x67'?first:(first?.title||first?.text||first?.html||''));
const titleStr=String(title||'');
console.log("[\x54\x65\x65\x38\x32 \x53\x77\x61\x6c \ud638\ucd9c \uac10\uc9c0]\x3a",titleStr);
if(titleStr.includes('\uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c')||titleStr.includes('\ud64d\ubcf4\uae00\uc744 \uc0ad\uc81c')||titleStr.includes('\uc0ad\uc81c')){
console.log("[\x54\x65\x65\x38\x32 \x53\x77\x61\x6c \uc0ad\uc81c \ud655\uc778 \uc790\ub3d9 \uc2b9\uc778]\x3a",titleStr);
try{
w.postMessage({type:'\x5f\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x44\x49\x41\x4c\x4f\x47\x5f\x4e\x4f\x54\x49\x43\x45\x5f\x5f',text:titleStr},'*');
}catch(e){}
return Promise.resolve({isConfirmed:true,isDenied:false,isDismissed:false,value:true});
}
if(titleStr.includes('\uc0ad\uc81c\ub418\uc5c8\uc2b5\ub2c8\ub2e4')||titleStr.includes('\ud64d\ubcf4\ub418\uc5c8\uc2b5\ub2c8\ub2e4')||titleStr.includes('\uc644\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4')){
console.log("[\x54\x65\x65\x38\x32 \x53\x77\x61\x6c \uc644\ub8cc \ud31d\uc5c5 \uc790\ub3d9 \ud1b5\uacfc]\x3a",titleStr);
try{
w.postMessage({type:'\x5f\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x44\x49\x41\x4c\x4f\x47\x5f\x4e\x4f\x54\x49\x43\x45\x5f\x5f',text:titleStr},'*');
}catch(e){}
return Promise.resolve({isConfirmed:true,isDenied:false,isDismissed:false,value:true});
}
return origSwal.apply(this,args);
};
try{
Object.setPrototypeOf(proxy,origSwal);
Object.assign(proxy,origSwal);
if(typeof origSwal.fire==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
proxy.fire=function(...args){
if(!_0x1000()){
return origSwal.fire.apply(this,args);
}
const first=args[0];
const title=(typeof first==='\x73\x74\x72\x69\x6e\x67'?first:(first?.title||first?.text||first?.html||''));
const titleStr=String(title||'');
if(titleStr.includes('\uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c')||titleStr.includes('\ud64d\ubcf4\uae00\uc744 \uc0ad\uc81c')||titleStr.includes('\uc0ad\uc81c')){
console.log("[\x54\x65\x65\x38\x32 \x53\x77\x61\x6c\x2e\x66\x69\x72\x65 \uc0ad\uc81c \ud655\uc778 \uc790\ub3d9 \uc2b9\uc778]\x3a",titleStr);
try{
w.postMessage({type:'\x5f\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x44\x49\x41\x4c\x4f\x47\x5f\x4e\x4f\x54\x49\x43\x45\x5f\x5f',text:titleStr},'*');
}catch(e){}
return Promise.resolve({isConfirmed:true,isDenied:false,isDismissed:false,value:true});
}
if(titleStr.includes('\uc0ad\uc81c\ub418\uc5c8\uc2b5\ub2c8\ub2e4')||titleStr.includes('\ud64d\ubcf4\ub418\uc5c8\uc2b5\ub2c8\ub2e4')||titleStr.includes('\uc644\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4')){
console.log("[\x54\x65\x65\x38\x32 \x53\x77\x61\x6c\x2e\x66\x69\x72\x65 \uc644\ub8cc \ud31d\uc5c5 \uc790\ub3d9 \ud1b5\uacfc]\x3a",titleStr);
try{
w.postMessage({type:'\x5f\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x44\x49\x41\x4c\x4f\x47\x5f\x4e\x4f\x54\x49\x43\x45\x5f\x5f',text:titleStr},'*');
}catch(e){}
return Promise.resolve({isConfirmed:true,isDenied:false,isDismissed:false,value:true});
}
return origSwal.fire.apply(this,args);
};
}
proxy.__tee82_hooked=true;
}catch(e){}
return proxy;
}
let _swal=w.Swal?_0x1002(w.Swal):undefined;
try{
Object.defineProperty(w,'\x53\x77\x61\x6c',{
configurable:true,
enumerable:true,
get:()=>_swal,
set:(v)=>{_swal=_0x1002(v);}
});
}catch(e){
if(w.Swal)w.Swal=_0x1002(w.Swal);
}
let _swalLower=w.swal?_0x1002(w.swal):undefined;
try{
Object.defineProperty(w,'\x73\x77\x61\x6c',{
configurable:true,
enumerable:true,
get:()=>_swalLower,
set:(v)=>{_swalLower=_0x1002(v);}
});
}catch(e){
if(w.swal)w.swal=_0x1002(w.swal);
}
try{
Object.defineProperty(w,'\x63\x6f\x6e\x66\x69\x72\x6d',{
configurable:true,
enumerable:true,
get:function(){
return function(msg){
if(_0x1000()){
console.log("[\x54\x65\x65\x38\x32 \uace8\ud504\ud0d1 \x63\x6f\x6e\x66\x69\x72\x6d \uc790\ub3d9 \uc2b9\uc778]\x3a",msg);
return true;
}
return origConfirm?origConfirm(msg):true;
};
},
set:function(){}
});
Object.defineProperty(w,'\x61\x6c\x65\x72\x74',{
configurable:true,
enumerable:true,
get:function(){
return function(msg){
try{
w.postMessage({type:'\x5f\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x44\x49\x41\x4c\x4f\x47\x5f\x4e\x4f\x54\x49\x43\x45\x5f\x5f',text:String(msg)},'*');
}catch(e){}
if(_0x1000()){
console.log("[\x54\x65\x65\x38\x32 \uace8\ud504\ud0d1 \x61\x6c\x65\x72\x74 \uc790\ub3d9 \ud1b5\uacfc]\x3a",msg);
return undefined;
}
return origAlert?origAlert(msg):undefined;
};
},
set:function(){}
});
}catch(e){}
}catch(e){}
}
window.addEventListener('\x6d\x65\x73\x73\x61\x67\x65',function(e){
if(!e.data||typeof e.data!=='\x6f\x62\x6a\x65\x63\x74')return;
if(e.data.type==='\x5f\x5f\x53\x45\x54\x5f\x54\x45\x45\x38\x32\x5f\x41\x55\x54\x4f\x5f\x41\x43\x54\x49\x56\x45\x5f\x5f'){
isAutoRegistrationActive=Boolean(e.data.active);
console.log("[\uace8\ud504\ud0d1 \x4d\x41\x49\x4e] \uc790\ub3d9\ub4f1\ub85d \ud65c\uc131 \uc0c1\ud0dc \ubcc0\uacbd\x3a",isAutoRegistrationActive);
}
});
_0x1001(window);
if(document.readyState==='\x6c\x6f\x61\x64\x69\x6e\x67'){
document.addEventListener('\x44\x4f\x4d\x43\x6f\x6e\x74\x65\x6e\x74\x4c\x6f\x61\x64\x65\x64',()=>_0x1001(window));
}
window.addEventListener('\x6c\x6f\x61\x64',()=>_0x1001(window));
})();
