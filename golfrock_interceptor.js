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
console.log("[\x54\x65\x65\x38\x32 \uace8\ud504\ub77d \x63\x6f\x6e\x66\x69\x72\x6d \uc790\ub3d9 \uc2b9\uc778]\x3a",msg);
return true;
}
return origConfirm?origConfirm(msg):true;
};
w.alert=function(msg){
try{
w.postMessage({type:'\x5f\x5f\x55\x49\x5f\x44\x49\x41\x4c\x4f\x47\x5f\x4e\x4f\x54\x49\x43\x45\x5f\x5f',text:String(msg)},'*');
}catch(e){}
if(_0x1000()){
console.log("[\x54\x65\x65\x38\x32 \uace8\ud504\ub77d \x61\x6c\x65\x72\x74 \uc790\ub3d9 \ud1b5\uacfc]\x3a",msg);
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
try{
Object.defineProperty(w,'\x63\x6f\x6e\x66\x69\x72\x6d',{
configurable:true,
enumerable:true,
get:function(){
return function(msg){
if(_0x1000()){
console.log("[\x54\x65\x65\x38\x32 \uace8\ud504\ub77d \x63\x6f\x6e\x66\x69\x72\x6d \uc790\ub3d9 \uc2b9\uc778]\x3a",msg);
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
w.postMessage({type:'\x5f\x5f\x55\x49\x5f\x44\x49\x41\x4c\x4f\x47\x5f\x4e\x4f\x54\x49\x43\x45\x5f\x5f',text:String(msg)},'*');
}catch(e){}
if(_0x1000()){
console.log("[\x54\x65\x65\x38\x32 \uace8\ud504\ub77d \x61\x6c\x65\x72\x74 \uc790\ub3d9 \ud1b5\uacfc]\x3a",msg);
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
console.log("[\uace8\ud504\ub77d \x4d\x41\x49\x4e] \uc790\ub3d9\ub4f1\ub85d \ud65c\uc131 \uc0c1\ud0dc \ubcc0\uacbd\x3a",isAutoRegistrationActive);
}
});
_0x1001(window);
if(document.readyState==='\x6c\x6f\x61\x64\x69\x6e\x67'){
document.addEventListener('\x44\x4f\x4d\x43\x6f\x6e\x74\x65\x6e\x74\x4c\x6f\x61\x64\x65\x64',()=>_0x1001(window));
}
window.addEventListener('\x6c\x6f\x61\x64',()=>_0x1001(window));
})();
