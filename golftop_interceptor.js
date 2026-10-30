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
