(function(){
function _0x1000(w){
if(!w)return;
try{
w.confirm=function(msg){
console.log("[\x54\x65\x65\x38\x32 \uace8\ud504\ud0d1 \x63\x6f\x6e\x66\x69\x72\x6d \uc790\ub3d9 \uc2b9\uc778]\x3a",msg);
return true;
};
w.alert=function(msg){
console.log("[\x54\x65\x65\x38\x32 \uace8\ud504\ud0d1 \x61\x6c\x65\x72\x74 \uc790\ub3d9 \ud1b5\uacfc]\x3a",msg);
try{
w.postMessage({type:'\x5f\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x44\x49\x41\x4c\x4f\x47\x5f\x4e\x4f\x54\x49\x43\x45\x5f\x5f',text:String(msg)},'*');
}catch(e){}
return undefined;
};
w.prompt=function(msg,def){
return def||'';
};
function _0x1001(origSwal){
if(!origSwal||origSwal.__tee82_hooked)return origSwal;
const proxy=function(...args){
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
let _swal=w.Swal?_0x1001(w.Swal):undefined;
try{
Object.defineProperty(w,'\x53\x77\x61\x6c',{
configurable:true,
enumerable:true,
get:()=>_swal,
set:(v)=>{_swal=_0x1001(v);}
});
}catch(e){
if(w.Swal)w.Swal=_0x1001(w.Swal);
}
let _swalLower=w.swal?_0x1001(w.swal):undefined;
try{
Object.defineProperty(w,'\x73\x77\x61\x6c',{
configurable:true,
enumerable:true,
get:()=>_swalLower,
set:(v)=>{_swalLower=_0x1001(v);}
});
}catch(e){
if(w.swal)w.swal=_0x1001(w.swal);
}
try{
Object.defineProperty(w,'\x63\x6f\x6e\x66\x69\x72\x6d',{
configurable:true,
enumerable:true,
get:function(){
return function(msg){
console.log("[\x54\x65\x65\x38\x32 \uace8\ud504\ud0d1 \x63\x6f\x6e\x66\x69\x72\x6d \uc790\ub3d9 \uc2b9\uc778]\x3a",msg);
return true;
};
},
set:function(){}
});
Object.defineProperty(w,'\x61\x6c\x65\x72\x74',{
configurable:true,
enumerable:true,
get:function(){
return function(msg){
console.log("[\x54\x65\x65\x38\x32 \uace8\ud504\ud0d1 \x61\x6c\x65\x72\x74 \uc790\ub3d9 \ud1b5\uacfc]\x3a",msg);
try{
w.postMessage({type:'\x5f\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x44\x49\x41\x4c\x4f\x47\x5f\x4e\x4f\x54\x49\x43\x45\x5f\x5f',text:String(msg)},'*');
}catch(e){}
return undefined;
};
},
set:function(){}
});
}catch(e){}
}catch(e){}
}
_0x1000(window);
})();
