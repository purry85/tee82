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
window.addEventListener('\x6d\x65\x73\x73\x61\x67\x65',function(e){
if(!e.data||typeof e.data!=='\x6f\x62\x6a\x65\x63\x74')return;
if(e.data.type==='\x5f\x5f\x47\x4f\x4c\x46\x4c\x41\x4e\x44\x5f\x4f\x50\x45\x4e\x5f\x54\x41\x42\x5f\x5f'){
try{
var isTransfer=Boolean(e.data.isTransfer);
var selector=isTransfer?'\x2e\x77\x72\x69\x74\x65\x42\x6f\x6f\x6b\x69\x6e\x67\x2e\x62\x74\x6e-\x74\x72\x61\x6e\x73\x66\x65\x72, \x70[\x73\x65\x71="\x31"], \x2e\x62\x74\x6e-\x74\x72\x61\x6e\x73\x66\x65\x72':'\x2e\x77\x72\x69\x74\x65\x42\x6f\x6f\x6b\x69\x6e\x67\x2e\x62\x74\x6e-\x6a\x6f\x69\x6e, \x70[\x73\x65\x71="\x32"], \x2e\x62\x74\x6e-\x6a\x6f\x69\x6e';
var targetBtn=document.querySelector(selector);
if(!targetBtn){
var container=document.querySelector('\x2e\x62\x74\x6e-\x66\x69\x6c\x74\x65\x72-\x77\x72\x61\x70, \x2e\x66\x69\x6c\x74\x65\x72\x5f\x62\x74\x6e\x5f\x77\x72\x61\x70');
if(container){
var pTags=Array.from(container.querySelectorAll('\x70, \x6c\x69, \x64\x69\x76, \x62\x75\x74\x74\x6f\x6e, \x61'));
for(var i=0;i<pTags.length;i++){
var p=pTags[i];
var txt=(p.textContent||'').replace(/\s+/g,'');
if(isTransfer&&txt.includes('\uc591\ub3c4')&&txt.includes('\ub4f1\ub85d')){targetBtn=p;break;}
if(!isTransfer&&txt.includes('\uc870\uc778')&&txt.includes('\ub4f1\ub85d')&&!txt.includes('\x31\ubc15')){targetBtn=p;break;}
}
}
}
if(targetBtn){
console.log("[\uace8\ud504\ub79c\ub4dc \x4d\x41\x49\x4e] \ud83c\udfaf \ub4f1\ub85d \ud0ed \ubc1c\uacac \uc131\uacf5\x3a",targetBtn.tagName,targetBtn.className,"\x73\x65\x71\x3a",targetBtn.getAttribute('\x73\x65\x71'));
if(window.$){
try{window.$(targetBtn).trigger('\x63\x6c\x69\x63\x6b');}catch(e1){}
try{window.$(targetBtn).click();}catch(e2){}
}
try{targetBtn.click();}catch(e3){}
try{
targetBtn.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',{bubbles:true,cancelable:true,view:window}));
targetBtn.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',{bubbles:true,cancelable:true,view:window}));
targetBtn.dispatchEvent(new MouseEvent('\x63\x6c\x69\x63\x6b',{bubbles:true,cancelable:true,view:window}));
}catch(e4){}
}else{
console.warn("[\uace8\ud504\ub79c\ub4dc \x4d\x41\x49\x4e] \u26a0\ufe0f \ub4f1\ub85d \ud0ed \ubc84\ud2bc\uc744 \ucc3e\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4\x2e \x73\x65\x6c\x65\x63\x74\x6f\x72\x3a",selector);
}
}catch(err){
console.error("[\uace8\ud504\ub79c\ub4dc \x4d\x41\x49\x4e] \ud0ed \uc624\ud508 \uc5d0\ub7ec\x3a",err);
}
}
if(e.data.type==='\x5f\x5f\x47\x4f\x4c\x46\x4c\x41\x4e\x44\x5f\x53\x55\x42\x4d\x49\x54\x5f\x4d\x4f\x44\x41\x4c\x5f\x5f'){
try{
var submitBtn=document.querySelector('[\x64\x61\x74\x61-\x67\x6c\x64-\x73\x75\x62\x6d\x69\x74="\x31"]');
if(!submitBtn){
var candidates=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"], \x61, \x70, \x73\x70\x61\x6e, \x64\x69\x76'));
for(var i=candidates.length-1;i>=0;i--){
var btn=candidates[i];
if(btn.classList.contains('\x77\x72\x69\x74\x65\x42\x6f\x6f\x6b\x69\x6e\x67'))continue;
var txt=((btn.tagName==='\x49\x4e\x50\x55\x54'?btn.value:btn.textContent)||'').replace(/\s+/g,'');
if(txt==='\ub4f1\ub85d'&&btn.getClientRects().length>0){
submitBtn=btn;
break;
}
}
}
if(submitBtn){
console.log("[\uace8\ud504\ub79c\ub4dc \x4d\x41\x49\x4e] \ud83c\udfaf \uc81c\ucd9c [\ub4f1\ub85d] \ubc84\ud2bc \ud074\ub9ad \ud2b8\ub9ac\uac70 \uc2e4\ud589\x3a",submitBtn.tagName,submitBtn.className);
var onc=submitBtn.getAttribute('\x6f\x6e\x63\x6c\x69\x63\x6b');
if(onc){
try{new Function(onc).call(submitBtn);}catch(e1){try{eval(onc);}catch(e2){}}
}
var href=submitBtn.getAttribute('\x68\x72\x65\x66')||'';
if(href.indexOf('\x6a\x61\x76\x61\x73\x63\x72\x69\x70\x74\x3a')===0){
try{eval(href.replace(/^javascript:/i,''));}catch(e3){}
}
if(window.$&&typeof window.$(submitBtn).trigger==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
try{window.$(submitBtn).trigger('\x63\x6c\x69\x63\x6b');}catch(e4){}
}
try{submitBtn.click();}catch(e5){}
}
}catch(err){}
}
if(e.data.type==='\x5f\x5f\x47\x4f\x4c\x46\x4c\x41\x4e\x44\x5f\x53\x45\x54\x5f\x44\x41\x54\x45\x5f\x5f'){
try{
var dateStr=e.data.date;
var dp=document.getElementById('\x75\x69-\x64\x61\x74\x65\x70\x69\x63\x6b\x65\x72-\x64\x69\x76');
var inp=document.querySelector('\x2e\x6a\x50\x6f\x70\x75\x70\x41\x72\x65\x61 \x69\x6e\x70\x75\x74[\x70\x6c\x61\x63\x65\x68\x6f\x6c\x64\x65\x72*="\ud2f0\uc5c5 \uc77c\uc790"], \x2e\x6a\x50\x6f\x70\x75\x70\x41\x72\x65\x61 \x69\x6e\x70\x75\x74[\x6e\x61\x6d\x65*="\x64\x61\x74\x65"], \x2e\x66\x6f\x63\x75\x73\x41\x72\x65\x61 \x69\x6e\x70\x75\x74[\x70\x6c\x61\x63\x65\x68\x6f\x6c\x64\x65\x72*="\ud2f0\uc5c5 \uc77c\uc790"], \x69\x6e\x70\x75\x74[\x70\x6c\x61\x63\x65\x68\x6f\x6c\x64\x65\x72*="\ud2f0\uc5c5 \uc77c\uc790"]');
if(inp&&window.$&&typeof window.$(inp).datepicker==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
try{window.$(inp).datepicker('\x73\x65\x74\x44\x61\x74\x65',dateStr);}catch(dpe1){}
try{window.$(inp).datepicker('\x68\x69\x64\x65');}catch(dpe2){}
try{window.$(inp).trigger('\x63\x68\x61\x6e\x67\x65');}catch(dpe3){}
}
if(dp){
var parts=(dateStr||'').split('-');
var day=parseInt(parts[parts.length-1],10);
var links=Array.from(dp.querySelectorAll('\x61\x2e\x75\x69-\x73\x74\x61\x74\x65-\x64\x65\x66\x61\x75\x6c\x74, \x74\x64\x3a\x6e\x6f\x74(\x2e\x75\x69-\x64\x61\x74\x65\x70\x69\x63\x6b\x65\x72-\x6f\x74\x68\x65\x72-\x6d\x6f\x6e\x74\x68) \x61'));
for(var i=0;i<links.length;i++){
if(parseInt(links[i].textContent.trim(),10)===day){
if(window.$&&typeof window.$(links[i]).trigger==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
try{window.$(links[i]).trigger('\x63\x6c\x69\x63\x6b');}catch(e1){}
}
try{links[i].click();}catch(e2){}
break;
}
}
var closeBtn=dp.querySelector('\x2e\x75\x69-\x64\x61\x74\x65\x70\x69\x63\x6b\x65\x72-\x63\x6c\x6f\x73\x65');
if(closeBtn){
try{closeBtn.click();}catch(cbErr){}
}
if(window.$&&typeof window.$(dp).hide==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
try{window.$(dp).hide();}catch(hdErr){}
}
dp.style.display='\x6e\x6f\x6e\x65';
}
}catch(err){}
}
if(e.data.type==='\x5f\x5f\x47\x4f\x4c\x46\x4c\x41\x4e\x44\x5f\x4d\x41\x49\x4e\x5f\x54\x52\x49\x47\x47\x45\x52\x5f\x5f'){
try{
var sel=e.data.selector;
var eventName=e.data.event||'\x63\x68\x61\x6e\x67\x65';
var val=e.data.value;
var el=document.querySelector(sel);
if(el){
if(val!==undefined)el.value=val;
if(window.$){
try{window.$(el).val(val).trigger(eventName);}catch(err1){}
try{window.$(el).change();}catch(err2){}
}
try{el.dispatchEvent(new Event(eventName,{bubbles:true}));}catch(err3){}
if(typeof el.onchange==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
try{el.onchange();}catch(err4){}
}
}
}catch(err){}
}
});
_0x1000(window);
if(document.readyState==='\x6c\x6f\x61\x64\x69\x6e\x67'){
document.addEventListener('\x44\x4f\x4d\x43\x6f\x6e\x74\x65\x6e\x74\x4c\x6f\x61\x64\x65\x64',()=>_0x1000(window));
}
window.addEventListener('\x6c\x6f\x61\x64',()=>_0x1000(window));
})();