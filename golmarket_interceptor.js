(function(){
function _0x1000(w){
if(!w)return;
try{
w.confirm=function(msg){
return true;
};
w.alert=function(msg){
try{
w.postMessage({type:'\x5f\x5f\x55\x49\x5f\x44\x49\x41\x4c\x4f\x47\x5f\x4e\x4f\x54\x49\x43\x45\x5f\x5f',text:String(msg)},'*');
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
try{
w.postMessage({type:'\x5f\x5f\x55\x49\x5f\x44\x49\x41\x4c\x4f\x47\x5f\x4e\x4f\x54\x49\x43\x45\x5f\x5f',text:String(msg)},'*');
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
if(document.readyState==='\x6c\x6f\x61\x64\x69\x6e\x67'){
document.addEventListener('\x44\x4f\x4d\x43\x6f\x6e\x74\x65\x6e\x74\x4c\x6f\x61\x64\x65\x64',()=>_0x1000(window));
}
window.addEventListener('\x6c\x6f\x61\x64',()=>_0x1000(window));
})();
