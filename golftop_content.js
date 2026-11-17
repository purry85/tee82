if(typeof latestAlertNotice!=='\x75\x6e\x64\x65\x66\x69\x6e\x65\x64'&&!window.__golftop_onMessage_fn){
window.__golftop_legacy_listener_exists=true;
}
try{shouldStopRegistration=false;}catch(e){window.shouldStopRegistration=false;}
try{isRegistrationRunning=false;}catch(e){window.isRegistrationRunning=false;}
try{latestAlertNotice='';}catch(e){window.latestAlertNotice='';}
if(!window.__golftop_dialog_listener_registered){
window.__golftop_dialog_listener_registered=true;
window.addEventListener('\x6d\x65\x73\x73\x61\x67\x65',(e)=>{
if(e.data&&e.data.type==='\x5f\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x44\x49\x41\x4c\x4f\x47\x5f\x4e\x4f\x54\x49\x43\x45\x5f\x5f'){
const alertText=e.data.text||'';
console.log("[\uace8\ud504\ud0d1 \x41\x6c\x65\x72\x74 \uac10\uc9c0]\x3a",alertText);
latestAlertNotice=alertText;
if(alertText.includes('\ucd08\uacfc')||alertText.includes('\uc2e4\ud328')||alertText.includes('\uc624\ub958')||alertText.includes('\uae08\uc9c0')){
console.warn("[\uace8\ud504\ud0d1] \uc11c\ubc84 \uc81c\ud55c\x2f\uc624\ub958 \uc54c\ub9bc \uac10\uc9c0\x3a",alertText);
}
}
});
}
if(typeof sleep==='\x75\x6e\x64\x65\x66\x69\x6e\x65\x64'){
window.sleep=(ms)=>new Promise(r=>setTimeout(r,ms));
}
function _0x1000(type='\x6e\x6f\x72\x6d\x61\x6c',preset='\x68\x75\x6d\x61\x6e'){
if(preset==='\x75\x6c\x74\x72\x61')return type==='\x66\x61\x73\x74'?40:80;
if(preset==='\x66\x61\x73\x74')return type==='\x66\x61\x73\x74'?80:150;
if(preset==='\x68\x75\x6d\x61\x6e')return type==='\x66\x61\x73\x74'?150:300;
return type==='\x66\x61\x73\x74'?250:500;
}
function _0x1001(preset='\x73\x61\x66\x65'){
if(preset==='\x75\x6c\x74\x72\x61')return 300;
if(preset==='\x66\x61\x73\x74')return 600;
if(preset==='\x68\x75\x6d\x61\x6e')return 1200;
return 1800;
}
async function _0x1002(el){
if(!el)return;
el.scrollIntoView({block:'\x6e\x65\x61\x72\x65\x73\x74',inline:'\x63\x65\x6e\x74\x65\x72',behavior:'\x69\x6e\x73\x74\x61\x6e\x74'});
const rect=el.getBoundingClientRect();
const x=rect.left+rect.width/2;
const y=rect.top+rect.height/2;
['\x70\x6f\x69\x6e\x74\x65\x72\x6f\x76\x65\x72','\x6d\x6f\x75\x73\x65\x6f\x76\x65\x72','\x70\x6f\x69\x6e\x74\x65\x72\x64\x6f\x77\x6e','\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e'].forEach(t=>{
el.dispatchEvent(new MouseEvent(t,{bubbles:true,cancelable:true,view:window,clientX:x,clientY:y}));
});
await sleep(20);
['\x70\x6f\x69\x6e\x74\x65\x72\x75\x70','\x6d\x6f\x75\x73\x65\x75\x70'].forEach(t=>{
el.dispatchEvent(new MouseEvent(t,{bubbles:true,cancelable:true,view:window,clientX:x,clientY:y}));
});
try{el.click();}catch(e){}
}
async function _0x1003(input,text){
if(!input)return;
input.focus();
input.value='';
input.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
input.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
await sleep(40);
const str=String(text);
input.value=str;
input.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
input.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
}
function _0x1004(){
let hud=document.getElementById('\x67\x74\x70\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c');
if(!hud){
hud=document.createElement('\x64\x69\x76');
hud.id='\x67\x74\x70\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c';
hud.style.cssText=`
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 9999999;
            background: rgba(15, 23, 42, 0.94);
            backdrop-filter: blur(8px);
            color: #F8FAFC;
            padding: 14px 18px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 13px;
            min-width: 280px;
            max-width: 380px;
            transition: all 0.2s ease;
        `;
hud.innerHTML=`
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <div style="font-weight: 700; font-size: 13.5px; color: #F59E0B; display: flex; align-items: center; gap: 6px;">
                    <span id="gtp_hud_title">\uace8\ud504\ud0d1 \ud64d\ubcf4 \uc790\ub3d9\ub4f1\ub85d</span>
                </div>
                <button id="gtp_hud_stop_btn" style="
                    background: #EF4444; color: white; border: none; padding: 3px 8px; border-radius: 4px;
                    font-size: 11px; font-weight: 700; cursor: pointer;">\uc911\ub2e8</button>
            </div>
            <div id="gtp_hud_desc" style="font-size: 12px; color: #CBD5E1; margin-bottom: 8px; line-height: 1.4;">
                \uc900\ube44 \uc911...
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); height: 6px; border-radius: 3px; overflow: hidden; margin-bottom: 6px;">
                <div id="gtp_hud_bar" style="background: #F59E0B; height: 100%; width: 0%; transition: width 0.25s ease;"></div>
            </div>
            <div id="gtp_hud_count" style="font-size: 11px; color: #94A3B8; text-align: right; font-weight: 600;">
                0 / 0\uac74 (0%)
            </div>
        `;
document.body.appendChild(hud);
hud.querySelector('\x23\x67\x74\x70\x5f\x68\x75\x64\x5f\x73\x74\x6f\x70\x5f\x62\x74\x6e')?.addEventListener('\x63\x6c\x69\x63\x6b',()=>{
console.log("[\uace8\ud504\ud0d1] \uc0ac\uc6a9\uc790\uac00 \x48\x55\x44 \uc911\ub2e8 \ubc84\ud2bc \ud074\ub9ad");
shouldStopRegistration=true;
isRegistrationRunning=false;
_0x1005({desc:'\ud83d\uded1 \uc0ac\uc6a9\uc790\uc5d0 \uc758\ud574 \uc911\ub2e8\ub418\uc5c8\uc2b5\ub2c8\ub2e4\x2e',isStopped:true});
chrome.runtime.sendMessage({type:'\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x53\x54\x4f\x50\x50\x45\x44'});
setTimeout(_0x1006,2000);
});
}
return hud;
}
function _0x1005({title,desc,current,total,isCompleted,isStopped}){
const hud=_0x1004();
if(!hud)return;
if(title)hud.querySelector('\x23\x67\x74\x70\x5f\x68\x75\x64\x5f\x74\x69\x74\x6c\x65').innerText=title;
if(desc)hud.querySelector('\x23\x67\x74\x70\x5f\x68\x75\x64\x5f\x64\x65\x73\x63').innerText=desc;
const bar=hud.querySelector('\x23\x67\x74\x70\x5f\x68\x75\x64\x5f\x62\x61\x72');
const countEl=hud.querySelector('\x23\x67\x74\x70\x5f\x68\x75\x64\x5f\x63\x6f\x75\x6e\x74');
if(total&&total>0){
const cur=current||0;
const pct=Math.min(100,Math.round((cur/total)*100));
if(bar)bar.style.width=`${pct}%`;
if(countEl)countEl.innerText=`${cur} / ${total}\uac74 (${pct}%)`;
}
if(isCompleted&&bar){
bar.style.width='\x31\x30\x30%';
bar.style.background='\x23\x31\x30\x42\x39\x38\x31';
}
if(isStopped&&bar){
bar.style.background='\x23\x45\x46\x34\x34\x34\x34';
}
}
function _0x1006(){
const hud=document.getElementById('\x67\x74\x70\x5f\x73\x74\x61\x74\x75\x73\x5f\x70\x61\x6e\x65\x6c');
if(hud)hud.remove();
}
function _0x1007(labelName){
const cleanTarget=labelName.replace(/[\s\-_/]/g,'').toLowerCase();
const allLabels=Array.from(document.querySelectorAll('\x74\x68, \x74\x64, \x6c\x61\x62\x65\x6c, \x64\x69\x76, \x73\x70\x61\x6e, \x70, \x64\x74, \x64\x64'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
if(el.children.length>2)return false;
const t=(el.innerText||el.textContent||'').trim().replace(/[\s\-_/]/g,'').toLowerCase();
return t===cleanTarget||t.startsWith(cleanTarget);
});
if(allLabels.length>0){
const exact=allLabels.find(el=>(el.innerText||el.textContent||'').trim().replace(/[\s\-_/]/g,'').toLowerCase()===cleanTarget);
return exact||allLabels[0];
}
return null;
}
function _0x1008(labelName){
const labelEl=_0x1007(labelName);
if(!labelEl)return null;
const tr=labelEl.closest('\x74\x72');
if(tr){
const cells=Array.from(tr.querySelectorAll('\x74\x64, \x74\x68'));
const cellIdx=cells.indexOf(labelEl.closest('\x74\x64, \x74\x68'));
if(cellIdx!==-1&&cellIdx+1<cells.length){
return cells[cellIdx+1];
}
return tr;
}
const row=labelEl.closest('\x2e\x72\x6f\x77, \x2e\x66\x6f\x72\x6d-\x67\x72\x6f\x75\x70, \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x72\x6f\x77"], \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x69\x74\x65\x6d"], \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x6c\x69\x6e\x65"]');
if(row)return row;
if(labelEl.parentElement)return labelEl.parentElement;
return null;
}
function _0x1009(inp){
let labelEl=null;
let text='';
if(inp.id){
try{
const forLabel=document.querySelector(`label[for="${CSS.escape(inp.id)}"]`);
if(forLabel){
labelEl=forLabel;
text=(forLabel.innerText||forLabel.textContent||'').trim();
}
}catch(e){}
}
if(!text){
const wrapLabel=inp.closest('\x6c\x61\x62\x65\x6c');
if(wrapLabel&&wrapLabel.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"]').length===1){
labelEl=wrapLabel;
text=(wrapLabel.innerText||wrapLabel.textContent||'').trim();
}
}
if(!text&&inp.nextElementSibling){
const nextEl=inp.nextElementSibling;
if((nextEl.tagName==='\x4c\x41\x42\x45\x4c'||nextEl.tagName==='\x53\x50\x41\x4e')&&nextEl.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"]').length===0){
labelEl=nextEl;
text=(nextEl.innerText||nextEl.textContent||'').trim();
}
}
if(!text&&inp.nextSibling&&inp.nextSibling.nodeType===3){
const nodeTxt=(inp.nextSibling.textContent||'').trim();
if(nodeTxt)text=nodeTxt;
}
if(!text&&inp.parentElement&&inp.parentElement.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"]').length===1){
labelEl=labelEl||inp.parentElement;
text=(inp.parentElement.innerText||inp.parentElement.textContent||'').trim();
}
return{input:inp,labelEl,text};
}
async function _0x100a(rowLabel,targetValue){
const cleanTarget=(targetValue||'').replace(/\s+/g,'');
const container=_0x1008(rowLabel);
let radioInputs=container
?Array.from(container.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"]')).filter(el=>el.offsetHeight>0||el.offsetWidth>0)
:[];
if(radioInputs.length===0){
const labelEl=_0x1007(rowLabel);
if(labelEl){
const lRect=labelEl.getBoundingClientRect();
radioInputs=Array.from(document.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"]'))
.filter(el=>{
if(el.offsetHeight<=0&&el.offsetWidth<=0)return false;
const r=el.getBoundingClientRect();
return Math.abs(r.top-lRect.top)<40&&r.left>=lRect.left;
});
}
}
const candidates=radioInputs.map(inp=>_0x1009(inp));
let matched=null;
matched=candidates.find(c=>c.text.replace(/\s+/g,'')===cleanTarget);
if(!matched){
matched=candidates.find(c=>{
const cleanOpt=c.text.replace(/\s+/g,'');
if(!cleanOpt)return false;
if(!cleanTarget.includes('+')&&cleanOpt.includes('+'))return false;
if(!cleanTarget.includes('\x2f')&&cleanOpt.includes('\x2f'))return false;
return cleanOpt.includes(cleanTarget);
});
}
if(!matched&&rowLabel.includes('\uc591\ub3c4')&&candidates.length>=2){
if(cleanTarget==='\uc591\ub3c4')matched=candidates[0];
else if(cleanTarget==='\uc870\uc778')matched=candidates[1];
}
if(matched&&matched.input){
const targetRadio=matched.input;
targetRadio.scrollIntoView({block:'\x6e\x65\x61\x72\x65\x73\x74',inline:'\x63\x65\x6e\x74\x65\x72'});
for(const c of candidates){
if(c.input!==targetRadio&&c.input.checked){
c.input.checked=false;
}
}
await _0x1002(targetRadio);
if(!targetRadio.checked&&matched.labelEl){
await _0x1002(matched.labelEl);
}
if(!targetRadio.checked){
targetRadio.checked=true;
}
targetRadio.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
targetRadio.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
console.log(`[\uace8\ud504\ud0d1] [${rowLabel}] \ub77c\ub514\uc624 [${targetValue}] \uc120\ud0dd \uc644\ub8cc (\ub9e4\uce6d\uc635\uc158: ${matched.text||'\uc21c\uc11c\ub9e4\uce6d'}, checked=${targetRadio.checked})`);
return true;
}
console.warn(`[\uace8\ud504\ud0d1] \u26a0\ufe0f [${rowLabel}] \ub77c\ub514\uc624 [${targetValue}] \ubbf8\ubc1c\uacac (\ud6c4\ubcf4 ${candidates.length}\uac1c: ${candidates.map(c=>c.text).join(', ')})`);
return false;
}
async function _0x100b(rowLabel,value){
const container=_0x1008(rowLabel);
let input=container?container.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x6e\x75\x6d\x62\x65\x72"], \x74\x65\x78\x74\x61\x72\x65\x61, \x69\x6e\x70\x75\x74\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"])'):null;
if(!input){
const labelEl=_0x1007(rowLabel);
if(labelEl){
const lRect=labelEl.getBoundingClientRect();
const candidateInputs=Array.from(document.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x6e\x75\x6d\x62\x65\x72"], \x74\x65\x78\x74\x61\x72\x65\x61, \x69\x6e\x70\x75\x74\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"])'))
.filter(inp=>{
if(inp.offsetHeight<=0||inp.offsetWidth<=0)return false;
const r=inp.getBoundingClientRect();
return Math.abs(r.top-lRect.top)<25&&r.left>=lRect.left;
});
if(candidateInputs.length>0){
input=candidateInputs[0];
}
}
}
if(input){
await _0x1003(input,value);
console.log(`[\uace8\ud504\ud0d1] [${rowLabel}] \uc785\ub825\uac12: [${value}] \uc644\ub8cc`);
return true;
}
console.warn(`[\uace8\ud504\ud0d1] \u26a0\ufe0f [${rowLabel}] \uc785\ub825 \ud544\ub4dc\ub97c \ucc3e\uc9c0 \ubabb\ud568`);
return false;
}
async function _0x100c(rowLabel,targetText){
const container=_0x1008(rowLabel);
let sel=container?container.querySelector('\x73\x65\x6c\x65\x63\x74'):null;
if(!sel){
const labelEl=_0x1007(rowLabel);
if(labelEl){
const lRect=labelEl.getBoundingClientRect();
const selects=Array.from(document.querySelectorAll('\x73\x65\x6c\x65\x63\x74')).filter(s=>{
if(s.offsetHeight<=0||s.offsetWidth<=0)return false;
const r=s.getBoundingClientRect();
return Math.abs(r.top-lRect.top)<25&&r.left>=lRect.left;
});
if(selects.length>0)sel=selects[0];
}
}
if(!sel)return false;
const options=Array.from(sel.options);
const cleanTarget=(targetText||'').trim();
let matchedOpt=options.find(o=>o.text.trim()===cleanTarget);
if(!matchedOpt&&cleanTarget){
matchedOpt=options.find(o=>o.text.includes(cleanTarget)||cleanTarget.includes(o.text.trim()));
}
if(matchedOpt){
sel.value=matchedOpt.value;
sel.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
console.log(`[\uace8\ud504\ud0d1] [${rowLabel}] \uc140\ub809\ud2b8 [${matchedOpt.text}] \uc120\ud0dd \uc644\ub8cc`);
return true;
}
return false;
}
async function _0x100d(rawGender='',waitPax=0){
const container=_0x1008('\ub300\uae30\uc131\ubcc4');
let sel=container?container.querySelector('\x73\x65\x6c\x65\x63\x74'):null;
if(!sel){
const labelEl=_0x1007('\ub300\uae30\uc131\ubcc4');
if(labelEl){
const lRect=labelEl.getBoundingClientRect();
const selects=Array.from(document.querySelectorAll('\x73\x65\x6c\x65\x63\x74')).filter(s=>{
if(s.offsetHeight<=0||s.offsetWidth<=0)return false;
const r=s.getBoundingClientRect();
return Math.abs(r.top-lRect.top)<25&&r.left>=lRect.left;
});
if(selects.length>0)sel=selects[0];
}
}
if(!sel)return false;
const options=Array.from(sel.options);
const cleanG=(rawGender||'').trim().replace(/\s+/g,'');
const pax=parseInt(waitPax,10)||0;
let matchedOpt=null;
const isNoWait=(pax===0&&(!cleanG||cleanG==='\uc778\uc6d0\uc5c6\uc74c'||cleanG==='\ub300\uae30\uc5c6\uc74c'||cleanG==='\uc5c6\uc74c'||cleanG==='\uc120\ud0dd'||cleanG==='\ubb34\uad00'||cleanG==='\ubbf8\uc815'||cleanG==='\x30'))||
(!cleanG||cleanG==='\uc778\uc6d0\uc5c6\uc74c'||cleanG==='\ub300\uae30\uc5c6\uc74c'||cleanG==='\uc5c6\uc74c'||cleanG==='\uc120\ud0dd'||cleanG==='\ubbf8\uc815'||cleanG==='\x30');
if(isNoWait){
matchedOpt=options.find(o=>o.text.trim()==='\uc120\ud0dd'||o.value===''||o.text.includes('\uc120\ud0dd'))||options[0];
}
else if(cleanG.includes('\ub0a8\ub0a8\ub0a8')||cleanG==='\ub0a8\ub0a8\ub0a8'||(pax===3&&cleanG==='\ub0a8')){
matchedOpt=options.find(o=>o.text.includes('\ub0a8\ub0a8\ub0a8')||o.text==='\x33\uc778(\ub0a8\ub0a8\ub0a8)');
}else if(cleanG.includes('\uc5ec\uc5ec\uc5ec')||cleanG==='\uc5ec\uc5ec\uc5ec'||(pax===3&&cleanG==='\uc5ec')){
matchedOpt=options.find(o=>o.text.includes('\uc5ec\uc5ec\uc5ec')||o.text==='\x33\uc778(\uc5ec\uc5ec\uc5ec)');
}else if(cleanG.includes('\ub0a8\ub0a8\uc5ec')||cleanG.includes('\ub0a8\uc5ec\ub0a8')||cleanG.includes('\uc5ec\ub0a8\ub0a8')){
matchedOpt=options.find(o=>o.text.includes('\ub0a8\ub0a8\uc5ec')||o.text==='\x33\uc778(\ub0a8\ub0a8\uc5ec)');
}else if(cleanG.includes('\ub0a8\uc5ec\uc5ec')||cleanG.includes('\uc5ec\ub0a8\uc5ec')||cleanG.includes('\uc5ec\uc5ec\ub0a8')){
matchedOpt=options.find(o=>o.text.includes('\ub0a8\uc5ec\uc5ec')||o.text==='\x33\uc778(\ub0a8\uc5ec\uc5ec)');
}
else if(cleanG.includes('\ub0a8\ub0a8')||cleanG==='\ub0a8\ub0a8'||(pax===2&&cleanG==='\ub0a8')){
matchedOpt=options.find(o=>(o.text.includes('\ub0a8\ub0a8')||o.text==='\x32\uc778(\ub0a8\ub0a8)')&&!o.text.includes('\ub0a8\ub0a8\ub0a8')&&!o.text.includes('\x33\uc778'));
}else if(cleanG.includes('\uc5ec\uc5ec')||cleanG==='\uc5ec\uc5ec'||(pax===2&&cleanG==='\uc5ec')){
matchedOpt=options.find(o=>(o.text.includes('\uc5ec\uc5ec')||o.text==='\x32\uc778(\uc5ec\uc5ec)')&&!o.text.includes('\uc5ec\uc5ec\uc5ec')&&!o.text.includes('\x33\uc778'));
}else if(cleanG.includes('\ub0a8\uc5ec')||cleanG.includes('\uc5ec\ub0a8')||cleanG.includes('\ubd80\ubd80')||cleanG.includes('\ucee4\ud50c')){
matchedOpt=options.find(o=>(o.text.includes('\ub0a8\uc5ec')||o.text==='\x32\uc778(\ub0a8\uc5ec)'||o.text.includes('\ubd80\ubd80'))&&!o.text.includes('\x33\uc778'));
}
else if(cleanG.includes('\ub0a8')||cleanG==='\ub0a8'||pax===1){
matchedOpt=options.find(o=>(o.text.includes('\x31\uc778(\ub0a8)')||(o.text.includes('\ub0a8')&&!o.text.includes('\ub0a8\ub0a8')&&!o.text.includes('\ub0a8\uc5ec'))));
}else if(cleanG.includes('\uc5ec')||cleanG==='\uc5ec'){
matchedOpt=options.find(o=>(o.text.includes('\x31\uc778(\uc5ec)')||(o.text.includes('\uc5ec')&&!o.text.includes('\uc5ec\uc5ec')&&!o.text.includes('\ub0a8\uc5ec'))));
}
if(!matchedOpt&&cleanG){
matchedOpt=options.find(o=>o.text.includes(cleanG)||cleanG.includes(o.text.trim()));
}
if(!matchedOpt){
matchedOpt=options.find(o=>o.text.trim()==='\uc120\ud0dd'||o.value==='')||options[0];
}
if(matchedOpt){
sel.value=matchedOpt.value;
sel.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
sel.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
console.log(`[\uace8\ud504\ud0d1] \ud83c\udfaf [\ub300\uae30\uc131\ubcc4] \uc6d0\ubcf8:'${rawGender}' (\uc778\uc6d0:${pax}) -> [${matchedOpt.text}] \uc120\ud0dd \uc644\ub8cc!`);
return true;
}
console.warn(`[\uace8\ud504\ud0d1] \u26a0\ufe0f [\ub300\uae30\uc131\ubcc4] '${rawGender}'\uc5d0 \ud574\ub2f9\ud558\ub294 \uc635\uc158\uc744 \ucc3e\uc9c0 \ubabb\ud568. (\ud604\uc7ac\uac12 \uc720\uc9c0)`);
return false;
}
async function _0x100e(rowLabel,cbLabel,shouldCheck){
const container=_0x1008(rowLabel)||document.body;
const checkboxes=Array.from(container.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"], \x6c\x61\x62\x65\x6c'));
let targetCb=null;
for(const el of checkboxes){
const txt=(el.innerText||el.textContent||'').trim();
if(txt.includes(cbLabel)){
targetCb=(el.tagName==='\x49\x4e\x50\x55\x54')?el:el.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]')||el.previousElementSibling;
break;
}
}
if(!targetCb){
const labelEl=_0x1007(rowLabel);
if(labelEl){
const lRect=labelEl.getBoundingClientRect();
const allCbs=Array.from(document.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"], \x6c\x61\x62\x65\x6c'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const r=el.getBoundingClientRect();
return Math.abs(r.top-lRect.top)<25&&r.left>=lRect.left;
});
for(const el of allCbs){
const txt=(el.innerText||el.textContent||'').trim();
if(txt.includes(cbLabel)){
targetCb=(el.tagName==='\x49\x4e\x50\x55\x54')?el:el.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"]')||el.previousElementSibling;
break;
}
}
}
}
if(targetCb&&targetCb.type==='\x63\x68\x65\x63\x6b\x62\x6f\x78'){
if(targetCb.checked!==shouldCheck){
await _0x1002(targetCb);
targetCb.checked=shouldCheck;
targetCb.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
}
console.log(`[\uace8\ud504\ud0d1] [${rowLabel}] [${cbLabel}] \uccb4\ud06c\uc0c1\ud0dc: ${shouldCheck}`);
return true;
}
return false;
}
async function _0x100f(dateStr){
if(!dateStr)return true;
const dateMatch=dateStr.match(/(\d{1,2})[./\-](\d{1,2})/);
if(!dateMatch)return true;
const targetDay=parseInt(dateMatch[2],10);
console.log(`[\uace8\ud504\ud0d1] \ud83d\udcc5 \ubaa9\ud45c \ub0a0\uc9dc: [${targetDay}\uc77c] \uc120\ud0dd \uc2dc\ub3c4...`);
const calArea=Array.from(document.querySelectorAll('\x64\x69\x76, \x74\x64, \x74\x61\x62\x6c\x65, \x73\x65\x63\x74\x69\x6f\x6e'))
.find(el=>(el.innerText||el.textContent||'').includes('\ub0a0\uc9dc \uc120\ud0dd')&&el.offsetHeight>0);
const searchScope=calArea||document.body;
const dayCells=Array.from(searchScope.querySelectorAll('\x74\x64, \x64\x69\x76, \x73\x70\x61\x6e, \x61, \x62\x75\x74\x74\x6f\x6e'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const t=(el.innerText||el.textContent||'').trim();
return t===String(targetDay);
});
for(const cell of dayCells){
const r=cell.getBoundingClientRect();
if(r.left<400&&r.top<500&&r.width<60&&r.height<60){
await _0x1002(cell);
console.log(`[\uace8\ud504\ud0d1] \ud83d\udcc5 \ub2ec\ub825 [${targetDay}\uc77c] \ud074\ub9ad \uc644\ub8cc!`);
await sleep(350);
return true;
}
}
return false;
}
async function _0x1010(){
console.log("[\uace8\ud504\ud0d1] \uc2e0\uccad \uad6c\ubd84 [\ud64d\ubcf4] \uc120\ud0dd \uc5ec\ubd80 \uc815\ubc00 \ud655\uc778 \uc911\x2e\x2e\x2e");
function _0x1011(){
const labels=Array.from(document.querySelectorAll('\x74\x68, \x74\x64, \x6c\x61\x62\x65\x6c, \x64\x69\x76, \x73\x70\x61\x6e, \x70, \x62, \x73\x74\x72\x6f\x6e\x67'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const t=(el.innerText||el.textContent||'').replace(/\s+/g,'');
return t==='\uc2e0\uccad\uad6c\ubd84'||t.startsWith('\uc2e0\uccad\uad6c\ubd84');
});
for(const lbl of labels){
let container=lbl.closest('\x74\x72, \x2e\x72\x6f\x77, \x2e\x66\x6f\x72\x6d-\x67\x72\x6f\x75\x70, \x2e\x69\x6e\x70\x75\x74-\x67\x72\x6f\x75\x70, \x64\x69\x76');
for(let step=0;step<4&&container;step++){
const btns=Array.from(container.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x62\x74\x6e, \x61, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x73\x70\x61\x6e, \x64\x69\x76'))
.filter(b=>b.offsetHeight>0&&b.offsetWidth>0);
const promo=btns.find(b=>(b.innerText||b.textContent||'').trim()==='\ud64d\ubcf4');
const reserve=btns.find(b=>{
const txt=(b.innerText||b.textContent||'').replace(/\s+/g,'');
return txt.includes('\uc608\uc57d\x2f\ub300\uae30')||txt.includes('\uc608\uc57d\ub300\uae30');
});
if(promo){
return{
promoBtn:promo.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x62\x74\x6e, \x61, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||promo,
reserveBtn:reserve?(reserve.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x62\x74\x6e, \x61, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||reserve):null
};
}
container=container.parentElement;
}
}
const allCandidates=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x62\x74\x6e, \x61, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x73\x70\x61\x6e, \x64\x69\x76'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const t=(el.innerText||el.textContent||'').trim();
if(t!=='\ud64d\ubcf4')return false;
const r=el.getBoundingClientRect();
return r.top<700&&r.width<160;
});
if(allCandidates.length>0){
const promo=allCandidates[0].closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x62\x74\x6e, \x61, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"]')||allCandidates[0];
return{promoBtn:promo,reserveBtn:null};
}
return{promoBtn:null,reserveBtn:null};
}
function _0x1012(promoBtn,reserveBtn){
if(!promoBtn)return false;
const pClass=promoBtn.className||'';
if(/\b(active|selected|on|current|btn-success|btn-primary)\b/i.test(pClass)){
return true;
}
if(reserveBtn){
const rClass=reserveBtn.className||'';
const rActive=/\b(active|selected|on|current|btn-success|btn-primary)\b/i.test(rClass);
if(rActive){
return false;
}
const pBg=window.getComputedStyle(promoBtn).backgroundColor||'';
const rBg=window.getComputedStyle(reserveBtn).backgroundColor||'';
if(pBg!==rBg){
const isPColored=!pBg.includes('\x72\x67\x62\x61(\x30, \x30, \x30, \x30)')&&!pBg.includes('\x72\x67\x62(\x32\x35\x35, \x32\x35\x35, \x32\x35\x35)');
const isRWhite=rBg.includes('\x72\x67\x62\x61(\x30, \x30, \x30, \x30)')||rBg.includes('\x72\x67\x62(\x32\x35\x35, \x32\x35\x35, \x32\x35\x35)');
if(isPColored&&isRWhite)return true;
}
}
const style=window.getComputedStyle(promoBtn);
const bg=style.backgroundColor||'';
const color=style.color||'';
const hasWhiteText=color.includes('\x32\x35\x35, \x32\x35\x35, \x32\x35\x35')||color.includes('\x72\x67\x62(\x32\x35\x35,\x32\x35\x35,\x32\x35\x35)');
const hasColoredBg=!bg.includes('\x72\x67\x62\x61(\x30, \x30, \x30, \x30)')&&!bg.includes('\x72\x67\x62(\x32\x35\x35, \x32\x35\x35, \x32\x35\x35)')&&!bg.includes('\x72\x67\x62(\x32\x34\x38, \x32\x34\x39, \x32\x35\x30)');
if(hasWhiteText&&hasColoredBg){
return true;
}
if(promoBtn.getAttribute('\x61\x72\x69\x61-\x70\x72\x65\x73\x73\x65\x64')==='\x74\x72\x75\x65'||promoBtn.getAttribute('\x61\x72\x69\x61-\x73\x65\x6c\x65\x63\x74\x65\x64')==='\x74\x72\x75\x65'){
return true;
}
return false;
}
for(let attempt=1;attempt<=3;attempt++){
const{promoBtn,reserveBtn}=_0x1011();
if(!promoBtn){
console.warn(`[\uace8\ud504\ud0d1] \uc2e0\uccad \uad6c\ubd84 [\ud64d\ubcf4] \ubc84\ud2bc \ud0d0\uc0c9 \uc2e4\ud328 (\uc2dc\ub3c4 ${attempt}/3)`);
await sleep(300);
continue;
}
if(_0x1012(promoBtn,reserveBtn)){
console.log("[\uace8\ud504\ud0d1] \uc2e0\uccad \uad6c\ubd84 [\ud64d\ubcf4] \ubaa8\ub4dc \uc815\uc0c1 \ud65c\uc131\ud654 \ud655\uc778 \uc644\ub8cc!");
return true;
}
console.log(`[\uace8\ud504\ud0d1] \uc2e0\uccad \uad6c\ubd84\uc774 [\ud64d\ubcf4]\uac00 \uc544\ub2d9\ub2c8\ub2e4. [\ud64d\ubcf4] \ubc84\ud2bc \ud074\ub9ad \uc2e4\ud589 (\uc2dc\ub3c4 ${attempt}/3)...`);
await _0x1002(promoBtn);
await sleep(350);
const recheck=_0x1011();
if(_0x1012(recheck.promoBtn,recheck.reserveBtn)){
console.log("[\uace8\ud504\ud0d1] [\ud64d\ubcf4] \ubc84\ud2bc \ud074\ub9ad \ud6c4 \uc815\uc0c1 \ud65c\uc131\ud654 \ud655\uc778 \uc131\uacf5!");
return true;
}
try{
promoBtn.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x64\x6f\x77\x6e',{bubbles:true,cancelable:true}));
promoBtn.dispatchEvent(new MouseEvent('\x6d\x6f\x75\x73\x65\x75\x70',{bubbles:true,cancelable:true}));
promoBtn.click();
}catch(e){}
await sleep(400);
}
const finalCheck=_0x1011();
if(finalCheck.promoBtn&&_0x1012(finalCheck.promoBtn,finalCheck.reserveBtn)){
console.log("[\uace8\ud504\ud0d1] \ucd5c\uc885 \uc7ac\uac80\uc0ac\uc5d0\uc11c \uc2e0\uccad \uad6c\ubd84 [\ud64d\ubcf4] \ud65c\uc131\ud654 \ud655\uc778 \uc644\ub8cc!");
return true;
}
console.error("[\uace8\ud504\ud0d1] \u274c \uc2e0\uccad \uad6c\ubd84\uc774 [\ud64d\ubcf4]\ub85c \ud65c\uc131\ud654\ub418\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4! (\uc608\uc57d\x2f\ub300\uae30 \uc624\ub4f1\ub85d\uc744 \ubc29\uc9c0\ud558\uae30 \uc704\ud574 \ub4f1\ub85d\uc744 \uc9c4\ud589\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4)");
return false;
}
function _0x1013(){
const headers=Array.from(document.querySelectorAll('\x68\x31, \x68\x32, \x68\x33, \x68\x34, \x68\x35, \x68\x36, \x74\x68, \x74\x64, \x64\x69\x76, \x73\x70\x61\x6e, \x70, \x62, \x73\x74\x72\x6f\x6e\x67'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
if(el.children.length>2)return false;
const t=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
return t==='\uace8\ud504\uc7a5\uc120\ud0dd'||t.includes('\uace8\ud504\uc7a5\uc120\ud0dd');
});
for(const h of headers){
let parent=h.parentElement;
let bestCandidate=null;
for(let i=0;i<8&&parent&&parent!==document.body;i++){
const txt=(parent.innerText||parent.textContent||'');
if(txt.includes('\uacbd\uae30\ubd81\ubd80')&&txt.includes('\uacbd\uae30\ub0a8\ubd80')&&txt.includes('\ucda9\uccad\ub3c4')){
return parent;
}
if(txt.includes('\uacbd\uae30\ubd81\ubd80')||txt.includes('\uacbd\uae30\ub0a8\ubd80')||txt.includes('\ucda9\uccad\ub3c4')){
bestCandidate=parent;
}
parent=parent.parentElement;
}
if(bestCandidate)return bestCandidate;
}
const regionContainers=Array.from(document.querySelectorAll('\x64\x69\x76, \x73\x65\x63\x74\x69\x6f\x6e, \x74\x61\x62\x6c\x65, \x66\x69\x65\x6c\x64\x73\x65\x74'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const txt=(el.innerText||el.textContent||'');
return txt.includes('\uacbd\uae30\ubd81\ubd80')&&txt.includes('\uacbd\uae30\ub0a8\ubd80');
});
if(regionContainers.length>0){
regionContainers.sort((a,b)=>(b.offsetWidth*b.offsetHeight)-(a.offsetWidth*a.offsetHeight));
return regionContainers[0];
}
return null;
}
async function _0x1014(golfName,rawGolfName){
console.log(`[\uace8\ud504\ud0d1] \u26f3 \uace8\ud504\uc7a5 \uc120\ud0dd \uc2dc\ub3c4: [${golfName}] (\uc6d0\ubcf8: ${rawGolfName})...`);
const cleanFn=(s)=>(s||'').trim().toLowerCase().replace(/[\s\-_/]/g,'');
const stripSuffix=(s)=>cleanFn(s).replace(/cc|gc|골프장|골프클럽/gi,'');
const stripParen=(s)=>(s||'').replace(/\([^)]*\)/g,'').replace(/\[[^\]]*\]/g,'').trim();
const stripEllipsis=(s)=>(s||'').replace(/\.{2,}|…/g,'').trim();
const combinedGolf=((golfName||'')+' '+(rawGolfName||'')).toLowerCase();
const isBAPublic=combinedGolf.includes('\ube44\uc5d0\uc774\ube44\uc2a4\ud0c0(\x70)')||combinedGolf.includes('\ube44\uc5d0\uc774\ube44\uc2a4\ud0c0 (\x70)')||
combinedGolf.includes('\ube44\uc5d0\uc774\ube44\uc2a4\ud0c0\x70')||combinedGolf.includes('\ube44\uc5d0\uc774\ube44\uc2a4\ud0c0[\x70]')||
combinedGolf.includes('\ube44\uc5d0\uc774\ube44\uc2a4\ud0c0(\ud37c\ube14\ub9ad)');
const isBAStandard=!isBAPublic&&combinedGolf.includes('\ube44\uc5d0\uc774\ube44\uc2a4\ud0c0');
const isClub72Ocean=combinedGolf.includes('\ud074\ub7fd\x37\x32(\uc624\uc158)')||combinedGolf.includes('\ud074\ub7fd\x37\x32 (\uc624\uc158)')||
combinedGolf.includes('\ud074\ub7fd\x37\x32\uc624\uc158')||combinedGolf.includes('\ud074\ub7fd\x37\x32[\uc624\uc158]')||
(combinedGolf.includes('\ud074\ub7fd\x37\x32')&&combinedGolf.includes('\uc624\uc158'));
const isClub72Haneul=combinedGolf.includes('\ud074\ub7fd\x37\x32(\ud558\ub298)')||combinedGolf.includes('\ud074\ub7fd\x37\x32 (\ud558\ub298)')||
combinedGolf.includes('\ud074\ub7fd\x37\x32\ud558\ub298')||combinedGolf.includes('\ud074\ub7fd\x37\x32[\ud558\ub298]')||
(combinedGolf.includes('\ud074\ub7fd\x37\x32')&&combinedGolf.includes('\ud558\ub298'));
const isClub72Standard=!isClub72Ocean&&!isClub72Haneul&&combinedGolf.includes('\ud074\ub7fd\x37\x32');
const isTejeveDongbuk=combinedGolf.includes('\ub5bc\uc81c\ubca0(\ub3d9\ubd81)')||combinedGolf.includes('\ub5bc\uc81c\ubca0\ub3d9\ubd81')||(combinedGolf.includes('\ub5bc\uc81c\ubca0')&&combinedGolf.includes('\ub3d9\ubd81'));
const isTejeveSeonam=combinedGolf.includes('\ub5bc\uc81c\ubca0(\uc11c\ub0a8)')||combinedGolf.includes('\ub5bc\uc81c\ubca0\uc11c\ub0a8')||(combinedGolf.includes('\ub5bc\uc81c\ubca0')&&combinedGolf.includes('\uc11c\ub0a8'));
if(isBAPublic){
console.log("[\uace8\ud504\ud0d1] \u26f3 [\ube44\uc5d0\uc774\ube44\uc2a4\ud0c0(\x50)] \uac10\uc9c0 -> \ud654\uba74\uc758 [\ube44\uc5d0\uc774\ube44\uc2a4\x2e\x2e\x2e] \ubc84\ud2bc \uc6b0\uc120 \ub9e4\uce6d \ubaa8\ub4dc \uac00\ub3d9");
}else if(isBAStandard){
console.log("[\uace8\ud504\ud0d1] \u26f3 [\uc77c\ubc18 \ube44\uc5d0\uc774\ube44\uc2a4\ud0c0] \uac10\uc9c0 -> \ud654\uba74\uc758 [\ube44\uc5d0\uc774\ube44\uc2a4\ud0c0] \ubc84\ud2bc \uc6b0\uc120 \ub9e4\uce6d \ubaa8\ub4dc \uac00\ub3d9");
}else if(isClub72Ocean){
console.log("[\uace8\ud504\ud0d1] \u26f3 [\ud074\ub7fd\x37\x32(\uc624\uc158)] \uac10\uc9c0 -> \ud654\uba74\uc758 [\ud074\ub7fd\x37\x32(\uc624\uc158)] \ubc84\ud2bc \uc804\uc6a9 \ub9e4\uce6d \uac00\ub3d9 (\uc77c\ubc18 \ud074\ub7fd\x37\x32 \ubc30\uc81c)");
}else if(isClub72Haneul){
console.log("[\uace8\ud504\ud0d1] \u26f3 [\ud074\ub7fd\x37\x32(\ud558\ub298)] \uac10\uc9c0 -> \ud654\uba74\uc758 [\ud074\ub7fd\x37\x32(\ud558\ub298)] \ubc84\ud2bc \uc804\uc6a9 \ub9e4\uce6d \uac00\ub3d9 (\uc77c\ubc18 \ud074\ub7fd\x37\x32 \ubc30\uc81c)");
}else if(isClub72Standard){
console.log("[\uace8\ud504\ud0d1] \u26f3 [\uc77c\ubc18 \ud074\ub7fd\x37\x32] \uac10\uc9c0 -> \ud654\uba74\uc758 [\ud074\ub7fd\x37\x32] \ubc84\ud2bc \ub9e4\uce6d \uac00\ub3d9 (\uc624\uc158\x2f\ud558\ub298 \ubc30\uc81c)");
}
const hasParenInTarget=/\([^)]+\)/.test(golfName||'')||/\([^)]+\)/.test(rawGolfName||'');
const targetList=[
golfName,
rawGolfName,
(!hasParenInTarget?stripParen(golfName):null),
(!hasParenInTarget?stripParen(rawGolfName):null)
].filter(Boolean);
const courseContainer=_0x1013()||document.body;
console.log("[\uace8\ud504\ud0d1] \u26f3 \uace8\ud504\uc7a5 \ucee8\ud14c\uc774\ub108 \ud0d0\uc0c9 \uacb0\uacfc\x3a",courseContainer===document.body?"\uc804\uccb4\ud654\uba74 \x46\x61\x6c\x6c\x62\x61\x63\x6b":"\uc804\uc6a9 \ucee8\ud14c\uc774\ub108 \ubc1c\uacac");
const candidateNodes=Array.from(courseContainer.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x62\x74\x6e, \x61, \x73\x70\x61\x6e, \x74\x64, \x64\x69\x76, \x6c\x69, \x6c\x61\x62\x65\x6c, \x70, \x62'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
if(el.children.length>=3)return false;
const txt=(el.innerText||el.textContent||'').trim();
if(txt.length<2||txt.length>25)return false;
const cleanT=txt.replace(/\s+/g,'');
if(cleanT==='\uace8\ud504\uc7a5\uc120\ud0dd'||cleanT==='\uc9c0\uc5ed\ubcc4'||cleanT==='\uacbd\uae30\ubd81\ubd80'||cleanT==='\uacbd\uae30\ub0a8\ubd80'||cleanT==='\ucda9\uccad\ub3c4'||cleanT==='\uac15\uc6d0'||cleanT==='\uc804\ub77c'||cleanT==='\uacbd\uc0c1'||cleanT==='\uc81c\uc8fc')return false;
if(courseContainer===document.body){
const r=el.getBoundingClientRect();
if(r.left<150||r.left>window.innerWidth*0.8)return false;
if(r.top>window.innerHeight*0.75)return false;
}
return true;
});
let bestEl=null;
let bestScore=0;
let bestMatchedText='';
for(const el of candidateNodes){
const rawTxt=(el.innerText||el.textContent||'').trim();
const hasEllipsis=rawTxt.includes('\x2e\x2e\x2e')||rawTxt.includes('\u2026');
const cleanTxt=cleanFn(rawTxt);
const coreTxt=stripSuffix(rawTxt);
const noEllipsisRaw=stripEllipsis(rawTxt);
const cleanNoEllipsis=cleanFn(noEllipsisRaw);
const coreNoEllipsis=stripSuffix(noEllipsisRaw);
if(isBAPublic){
if(rawTxt.startsWith('\ube44\uc5d0\uc774\ube44\uc2a4')&&hasEllipsis){
bestEl=el;
bestScore=200;
bestMatchedText=rawTxt+' (\ube44\uc5d0\uc774\ube44\uc2a4\ud0c0(\x50) \uc804\uc6a9)';
break;
}
if(cleanTxt==='\ube44\uc5d0\uc774\ube44\uc2a4\ud0c0'){
continue;
}
}else if(isBAStandard){
if(cleanTxt==='\ube44\uc5d0\uc774\ube44\uc2a4\ud0c0'&&!hasEllipsis){
bestEl=el;
bestScore=200;
bestMatchedText=rawTxt+' (\uc77c\ubc18 \ube44\uc5d0\uc774\ube44\uc2a4\ud0c0 \uc804\uc6a9)';
break;
}
if(rawTxt.startsWith('\ube44\uc5d0\uc774\ube44\uc2a4')&&hasEllipsis){
continue;
}
}
if(isClub72Ocean){
if(cleanTxt.includes('\uc624\uc158')||rawTxt.startsWith('\ud074\ub7fd\x37\x32(\uc624')||cleanTxt==='\uc624\uc158'){
bestEl=el;
bestScore=200;
bestMatchedText=rawTxt+' (\ud074\ub7fd\x37\x32(\uc624\uc158) \uc804\uc6a9)';
break;
}
continue;
}else if(isClub72Haneul){
if(cleanTxt.includes('\ud558\ub298')||rawTxt.startsWith('\ud074\ub7fd\x37\x32(\ud558')||cleanTxt==='\ud558\ub298'){
bestEl=el;
bestScore=200;
bestMatchedText=rawTxt+' (\ud074\ub7fd\x37\x32(\ud558\ub298) \uc804\uc6a9)';
break;
}
continue;
}else if(isClub72Standard){
if(cleanTxt.includes('\uc624\uc158')||cleanTxt.includes('\ud558\ub298')){
continue;
}
if(cleanTxt==='\ud074\ub7fd\x37\x32'||cleanTxt==='\ud074\ub7fd\x37\x32\x63\x63'||cleanTxt.includes('\ub808\uc774\ud06c')||cleanTxt.includes('\ud074\ub798\uc2dd')){
bestEl=el;
bestScore=200;
bestMatchedText=rawTxt+' (\uc77c\ubc18 \ud074\ub7fd\x37\x32 \uc804\uc6a9)';
break;
}
}
if(isTejeveDongbuk){
if(cleanTxt.includes('\uc11c\ub0a8'))continue;
if(cleanTxt.includes('\ub3d9\ubd81')){
bestEl=el;
bestScore=200;
bestMatchedText=rawTxt+' (\ub5bc\uc81c\ubca0(\ub3d9\ubd81) \uc804\uc6a9)';
break;
}
}else if(isTejeveSeonam){
if(cleanTxt.includes('\ub3d9\ubd81'))continue;
if(cleanTxt.includes('\uc11c\ub0a8')){
bestEl=el;
bestScore=200;
bestMatchedText=rawTxt+' (\ub5bc\uc81c\ubca0(\uc11c\ub0a8) \uc804\uc6a9)';
break;
}
}
for(const t of targetList){
const cleanT=cleanFn(t);
const coreT=stripSuffix(t);
const tNoParen=cleanFn(stripParen(t));
const coreNoParen=stripSuffix(stripParen(t));
let score=0;
if(rawTxt===t||cleanTxt===cleanT){
score=100;
}
else if(coreTxt.length>=2&&coreTxt===coreT){
score=95;
}
else if(!hasParenInTarget&&coreNoParen.length>=2&&(coreTxt===coreNoParen||coreNoEllipsis===coreNoParen)){
score=92;
}
else if(coreNoEllipsis.length>=3&&(coreT.startsWith(coreNoEllipsis)||coreNoParen.startsWith(coreNoEllipsis))){
score=90;
}
else if(coreNoParen.length>=3&&coreNoEllipsis.startsWith(coreNoParen)){
score=88;
}
else if(coreNoEllipsis.length>=3&&(coreT.includes(coreNoEllipsis)||coreNoEllipsis.includes(coreT)||coreNoParen.includes(coreNoEllipsis))){
score=80;
}
if(hasParenInTarget&&score>0){
const parenMatch=(golfName||rawGolfName||'').match(/\(([^)]+)\)/);
if(parenMatch){
const subCourse=cleanFn(parenMatch[1]);
if(!cleanTxt.includes(subCourse)&&!coreNoEllipsis.includes(subCourse)){
score=0;
}
}
}
if(score>bestScore){
bestScore=score;
bestEl=el;
bestMatchedText=rawTxt;
}
}
}
if(bestEl&&bestScore>=80){
const clickTarget=bestEl.closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x62\x74\x6e, \x61')||bestEl;
let scrollParent=clickTarget.parentElement;
while(scrollParent&&scrollParent!==document.body){
const overflowY=window.getComputedStyle(scrollParent).overflowY;
if(overflowY==='\x61\x75\x74\x6f'||overflowY==='\x73\x63\x72\x6f\x6c\x6c'||scrollParent.scrollHeight>scrollParent.clientHeight+10){
const targetScrollTop=clickTarget.offsetTop-(scrollParent.clientHeight/2)+(clickTarget.offsetHeight/2);
scrollParent.scrollTo({top:Math.max(0,targetScrollTop),behavior:'\x73\x6d\x6f\x6f\x74\x68'});
break;
}
scrollParent=scrollParent.parentElement;
}
clickTarget.scrollIntoView({block:'\x63\x65\x6e\x74\x65\x72',inline:'\x63\x65\x6e\x74\x65\x72',behavior:'\x73\x6d\x6f\x6f\x74\x68'});
clickTarget.style.setProperty('\x74\x72\x61\x6e\x73\x69\x74\x69\x6f\x6e','\x61\x6c\x6c \x30\x2e\x32\x35\x73 \x65\x61\x73\x65','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
clickTarget.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x45\x46\x34\x34\x34\x34','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
clickTarget.style.setProperty('\x62\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64-\x63\x6f\x6c\x6f\x72','\x23\x46\x45\x46\x30\x38\x41','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
clickTarget.style.setProperty('\x63\x6f\x6c\x6f\x72','\x23\x31\x45\x32\x39\x33\x42','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
clickTarget.style.setProperty('\x62\x6f\x78-\x73\x68\x61\x64\x6f\x77','\x30 \x30 \x32\x30\x70\x78 \x72\x67\x62\x61(\x32\x33\x39, \x36\x38, \x36\x38, \x30\x2e\x39)','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
clickTarget.style.setProperty('\x74\x72\x61\x6e\x73\x66\x6f\x72\x6d','\x73\x63\x61\x6c\x65(\x31\x2e\x30\x38)','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
clickTarget.style.setProperty('\x7a-\x69\x6e\x64\x65\x78','\x39\x39\x39\x39','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
_0x1005({desc:`[${bestMatchedText}] \uc2a4\ud06c\ub864 \uc774\ub3d9 \ubc0f \ud655\uc778 \uc911...`});
console.log(`[\uace8\ud504\ud0d1] \u26f3 \uace8\ud504\uc7a5 \ubc84\ud2bc \ubc1c\uacac \ubc0f \uc2a4\ud06c\ub864 \uc774\ub3d9 \uc644\ub8cc: [${bestMatchedText}] (\ub9e4\uce6d \uc810\uc218: ${bestScore}\uc810)`);
await sleep(600);
await _0x1002(clickTarget);
await sleep(250);
clickTarget.style.removeProperty('\x74\x72\x61\x6e\x73\x66\x6f\x72\x6d');
clickTarget.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x33\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x31\x30\x42\x39\x38\x31','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await sleep(350);
return true;
}
console.warn(`[\uace8\ud504\ud0d1] \u26a0\ufe0f \uace8\ud504\uc7a5 \ubc84\ud2bc [${golfName}] \ubbf8\ubc1c\uacac (\ucd5c\uace0 \uc810\uc218: ${bestScore}\uc810)`);
return false;
}
async function _0x1015(timeStr){
if(!timeStr)return false;
const cleanTime=timeStr.replace(/[^\d]/g,'');
const colonTime=(cleanTime.length===4)?`${cleanTime.slice(0,2)}:${cleanTime.slice(2)}`:timeStr;
console.log(`[\uace8\ud504\ud0d1] \u23f1\ufe0f \uc0c1\ub2e8 \uc794\uc5ec\ud0c0\uc784 \ubaa9\ub85d\uc5d0\uc11c [${colonTime}] \ud0d0\uc0c9 \ubc0f [\uc2e0\uccad] \ud074\ub9ad \uc2dc\ub3c4...`);
const allContainers=Array.from(document.querySelectorAll('\x64\x69\x76, \x73\x65\x63\x74\x69\x6f\x6e, \x74\x61\x62\x6c\x65'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const r=el.getBoundingClientRect();
if(r.left<450)return false;
const txt=(el.innerText||el.textContent||'');
return txt.includes('\uc794\uc5ec\ud0c0\uc784')&&!txt.includes('\uc678 \uc794\uc5ec\ud0c0\uc784')&&!txt.includes('\uc678\uc794\uc5ec\ud0c0\uc784');
});
const allRows=Array.from(document.querySelectorAll('\x74\x72, \x64\x69\x76[\x63\x6c\x61\x73\x73*="\x72\x6f\x77"]'))
.filter(el=>{
if(el.offsetHeight<=0)return false;
const r=el.getBoundingClientRect();
if(r.left<450)return false;
let p=el.parentElement;
for(let i=0;i<8&&p&&p!==document.body;i++){
const pTxt=(p.innerText||p.textContent||'').slice(0,100);
if(pTxt.includes('\uc678 \uc794\uc5ec\ud0c0\uc784')||pTxt.includes('\uc678\uc794\uc5ec\ud0c0\uc784')||p.id?.includes('\x6f\x74\x68\x65\x72')||p.className?.includes('\x6f\x74\x68\x65\x72')){
return false;
}
p=p.parentElement;
}
return true;
});
for(const row of allRows){
const txt=(row.innerText||row.textContent||'');
if(txt.includes(colonTime)||(cleanTime.length===4&&txt.replace(/[^\d]/g,'').includes(cleanTime))){
const applyBtn=Array.from(row.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x62\x74\x6e, \x61, \x73\x70\x61\x6e'))
.find(b=>{
const bt=(b.innerText||b.textContent||'').trim();
return bt==='\uc2e0\uccad'&&b.offsetHeight>0;
});
if(applyBtn){
applyBtn.scrollIntoView({block:'\x6e\x65\x61\x72\x65\x73\x74',inline:'\x63\x65\x6e\x74\x65\x72'});
try{applyBtn.click();}catch(e){await _0x1002(applyBtn);}
console.log(`[\uace8\ud504\ud0d1] \u23f1\ufe0f \uc0c1\ub2e8 \uc794\uc5ec\ud0c0\uc784 [${colonTime}]\uc758 [\uc2e0\uccad] \ubc84\ud2bc 1\ud68c \ud074\ub9ad \uc644\ub8cc!`);
await sleep(500);
return true;
}
}
}
console.log(`[\uace8\ud504\ud0d1] \u2139\ufe0f \uc0c1\ub2e8 \uc794\uc5ec\ud0c0\uc784 \ubaa9\ub85d\uc5d0 [${colonTime}] \ubbf8\uc874\uc7ac -> \ud558\ub2e8 '\ud76c\ub9dd\uc2dc\uac04' \uc9c1\uc811 \uc785\ub825\uc73c\ub85c \uc804\ud658`);
return false;
}
async function _0x1016(targetTimeStr){
const container=_0x1008('\ud76c\ub9dd\uc2dc\uac04');
if(!container)return;
const timeInputs=Array.from(container.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"], \x69\x6e\x70\x75\x74\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x68\x69\x64\x64\x65\x6e"])'))
.filter(inp=>inp.offsetHeight>0&&inp.offsetWidth>0);
if(timeInputs.length>1){
console.warn(`[\uace8\ud504\ud0d1] \u26a0\ufe0f \ud76c\ub9dd\uc2dc\uac04 \uc785\ub825\ub780\uc774 ${timeInputs.length}\uac1c \uac10\uc9c0\ub428 -> 1\uac1c\ub9cc \ub0a8\uae30\uace0 \uc911\ubcf5 \ud589 \uc0ad\uc81c \uc2e4\ud589`);
for(let i=timeInputs.length-1;i>=1;i--){
const extraInput=timeInputs[i];
const rowWrap=extraInput.parentElement;
const delBtn=rowWrap
?Array.from(rowWrap.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x62\x74\x6e, \x61, \x73\x70\x61\x6e')).find(b=>(b.innerText||b.textContent||'').trim()==='\uc0ad\uc81c')
:null;
if(delBtn){
try{delBtn.click();}catch(e){}
await sleep(80);
}else{
extraInput.value='';
extraInput.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
extraInput.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
}
}
}
const remainingInput=container.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"], \x69\x6e\x70\x75\x74\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x63\x68\x65\x63\x6b\x62\x6f\x78"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"])\x3a\x6e\x6f\x74([\x74\x79\x70\x65="\x68\x69\x64\x64\x65\x6e"])');
if(remainingInput&&targetTimeStr&&!remainingInput.value.trim()){
await _0x1003(remainingInput,targetTimeStr);
}
}
function _0x1017(){
const swal=document.querySelector('\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72\x3a\x6e\x6f\x74([\x73\x74\x79\x6c\x65*="\x64\x69\x73\x70\x6c\x61\x79\x3a \x6e\x6f\x6e\x65"]), \x2e\x73\x77\x61\x6c\x32-\x70\x6f\x70\x75\x70\x3a\x6e\x6f\x74([\x73\x74\x79\x6c\x65*="\x64\x69\x73\x70\x6c\x61\x79\x3a \x6e\x6f\x6e\x65"]), \x2e\x73\x77\x65\x65\x74-\x61\x6c\x65\x72\x74\x2e\x73\x68\x6f\x77-\x73\x77\x65\x65\x74-\x61\x6c\x65\x72\x74, \x2e\x6d\x6f\x64\x61\x6c\x2e\x73\x68\x6f\x77, \x2e\x6d\x6f\x64\x61\x6c-\x64\x69\x61\x6c\x6f\x67');
if(swal&&swal.offsetHeight>0&&swal.offsetWidth>0)return swal;
const allNodes=Array.from(document.querySelectorAll('*'));
const promoEl=allNodes.find(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
if(el.children.length>2)return false;
const txt=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
return txt==='\ud64d\ubcf4\ub418\uc5c8\uc2b5\ub2c8\ub2e4'||txt.includes('\ud64d\ubcf4\ub418\uc5c8\uc2b5\ub2c8\ub2e4');
});
if(promoEl){
let cur=promoEl;
let bestModal=promoEl.parentElement;
for(let i=0;i<15&&cur&&cur!==document.body;i++){
const st=window.getComputedStyle(cur);
const zIdx=parseInt(st.zIndex,10);
if(st.position==='\x66\x69\x78\x65\x64'||st.position==='\x61\x62\x73\x6f\x6c\x75\x74\x65'||
cur.classList.contains('\x73\x77\x61\x6c\x32-\x70\x6f\x70\x75\x70')||cur.classList.contains('\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72')||
cur.classList.contains('\x6d\x6f\x64\x61\x6c')||cur.getAttribute('\x72\x6f\x6c\x65')==='\x64\x69\x61\x6c\x6f\x67'||
(!isNaN(zIdx)&&zIdx>50)){
bestModal=cur;
if(st.position==='\x66\x69\x78\x65\x64'||cur.classList.contains('\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72')){
return cur;
}
}
cur=cur.parentElement;
}
return bestModal;
}
return null;
}
function _0x1018(){
const swalSelectors=[
'\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x66\x69\x72\x6d',
'\x62\x75\x74\x74\x6f\x6e\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x66\x69\x72\x6d',
'\x2e\x73\x77\x61\x6c\x32-\x61\x63\x74\x69\x6f\x6e\x73 \x62\x75\x74\x74\x6f\x6e\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x66\x69\x72\x6d',
'\x2e\x73\x77\x61\x6c\x32-\x61\x63\x74\x69\x6f\x6e\x73 \x62\x75\x74\x74\x6f\x6e',
'\x2e\x73\x77\x65\x65\x74-\x61\x6c\x65\x72\x74 \x62\x75\x74\x74\x6f\x6e\x2e\x63\x6f\x6e\x66\x69\x72\x6d',
'\x2e\x73\x61-\x63\x6f\x6e\x66\x69\x72\x6d-\x62\x75\x74\x74\x6f\x6e-\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72 \x62\x75\x74\x74\x6f\x6e'
];
for(const sel of swalSelectors){
const btn=document.querySelector(sel);
if(btn&&btn.offsetHeight>0&&btn.offsetWidth>0){
return btn;
}
}
const modal=_0x1017();
if(modal){
const modalBtns=Array.from(modal.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x62\x74\x6e, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"], \x61, \x64\x69\x76, \x73\x70\x61\x6e, \x70'))
.filter(b=>{
if(b.offsetHeight<=0||b.offsetWidth<=0)return false;
const txt=(b.innerText||b.textContent||b.value||'').trim().replace(/\s+/g,'');
return txt==='\ud655\uc778'||txt==='\x4f\x4b'||txt==='\x6f\x6b'||txt==='\ub2eb\uae30';
});
if(modalBtns.length>0){
const btnTag=modalBtns.find(b=>b.tagName==='\x42\x55\x54\x54\x4f\x4e'||b.classList.contains('\x62\x74\x6e')||b.classList.contains('\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x66\x69\x72\x6d'));
if(btnTag)return btnTag;
const exactTag=modalBtns.find(b=>(b.innerText||b.textContent||b.value||'').trim().replace(/\s+/g,'')==='\ud655\uc778');
if(exactTag)return exactTag;
return modalBtns[modalBtns.length-1];
}
}
const allConfirmCandidates=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x62\x74\x6e, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"], \x61, \x64\x69\x76, \x73\x70\x61\x6e'))
.filter(b=>{
if(b.offsetHeight<=0||b.offsetWidth<=0)return false;
if(b.children.length>2)return false;
const txt=(b.innerText||b.textContent||b.value||'').trim().replace(/\s+/g,'');
if(txt!=='\ud655\uc778')return false;
const r=b.getBoundingClientRect();
let p=b;
let isHighLayer=false;
for(let i=0;i<8&&p&&p!==document.body;i++){
const st=window.getComputedStyle(p);
const z=parseInt(st.zIndex,10);
if(st.position==='\x66\x69\x78\x65\x64'||(!isNaN(z)&&z>50)){
isHighLayer=true;
break;
}
p=p.parentElement;
}
const inCenter=(r.top>window.innerHeight*0.1&&r.bottom<window.innerHeight*0.9&&
r.left>window.innerWidth*0.1&&r.right<window.innerWidth*0.9);
return isHighLayer||inCenter;
});
if(allConfirmCandidates.length>0){
const btnTag=allConfirmCandidates.find(b=>b.tagName==='\x42\x55\x54\x54\x4f\x4e'||b.classList.contains('\x62\x74\x6e'));
return btnTag||allConfirmCandidates[allConfirmCandidates.length-1];
}
return null;
}
function _0x1019(){
const swal=document.querySelector('\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x73\x77\x61\x6c\x32-\x70\x6f\x70\x75\x70, \x2e\x73\x77\x65\x65\x74-\x61\x6c\x65\x72\x74\x2e\x73\x68\x6f\x77-\x73\x77\x65\x65\x74-\x61\x6c\x65\x72\x74, \x2e\x6d\x6f\x64\x61\x6c\x2e\x73\x68\x6f\x77');
if(swal){
const st=window.getComputedStyle(swal);
if(st.display!=='\x6e\x6f\x6e\x65'&&st.visibility!=='\x68\x69\x64\x64\x65\x6e'&&swal.offsetHeight>0)return true;
}
const allNodes=Array.from(document.querySelectorAll('*'));
const promoEl=allNodes.find(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
if(el.children.length>2)return false;
const txt=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
return txt==='\ud64d\ubcf4\ub418\uc5c8\uc2b5\ub2c8\ub2e4'||txt.includes('\ud64d\ubcf4\ub418\uc5c8\uc2b5\ub2c8\ub2e4');
});
return!!promoEl;
}
async function _0x101a(maxWaitMs=8000){
console.log("[\uace8\ud504\ud0d1] \u23f3 '\ud64d\ubcf4 \ub418\uc5c8\uc2b5\ub2c8\ub2e4' \ud655\uc778 \ud31d\uc5c5 \ub300\uae30 \uc911\x2e\x2e\x2e");
_0x1005({desc:'\u23f3 \ud64d\ubcf4 \uc644\ub8cc \ud31d\uc5c5 \ud655\uc778 \uc911\x2e\x2e\x2e'});
await sleep(150);
const startTime=Date.now();
while(Date.now()-startTime<maxWaitMs){
if(shouldStopRegistration)return false;
const confirmBtn=_0x1018();
const promoModal=_0x1017();
if(confirmBtn||promoModal||_0x1019()){
console.log("[\uace8\ud504\ud0d1] \ud83c\udfaf '\ud64d\ubcf4 \ub418\uc5c8\uc2b5\ub2c8\ub2e4' \ud31d\uc5c5 \uac10\uc9c0 -> [\ud655\uc778] \ubc84\ud2bc \ud074\ub9ad \uc2e4\ud589!");
const targetBtn=confirmBtn||_0x1018();
if(targetBtn){
targetBtn.scrollIntoView({block:'\x63\x65\x6e\x74\x65\x72',inline:'\x63\x65\x6e\x74\x65\x72'});
targetBtn.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x45\x46\x34\x34\x34\x34','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
targetBtn.style.setProperty('\x62\x6f\x78-\x73\x68\x61\x64\x6f\x77','\x30 \x30 \x32\x30\x70\x78 \x72\x67\x62\x61(\x32\x33\x39, \x36\x38, \x36\x38, \x30\x2e\x39)','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await sleep(150);
try{targetBtn.click();}catch(e){}
try{
if(window.Swal&&typeof window.Swal.close==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
window.Swal.close();
}
}catch(e){}
}else{
try{
if(window.Swal&&typeof window.Swal.close==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
window.Swal.close();
}
}catch(e){}
}
for(let check=0;check<20;check++){
await sleep(250);
const stillOpen=_0x1019();
const stillBtn=_0x1018();
if(!stillOpen&&!stillBtn){
console.log("[\uace8\ud504\ud0d1] \u2705 \ud31d\uc5c5 \ub2eb\ud798 \ud655\uc778 \uc644\ub8cc! -> \ub2e4\uc74c \ud0c0\uc784\uc73c\ub85c \uc548\uc804\ud558\uac8c \uc774\ub3d9");
_0x1005({desc:'\u2705 \ud31d\uc5c5 \ub2eb\ud798 \uc644\ub8cc -> \ub2e4\uc74c \ud0c0\uc784 \uc900\ube44'});
await sleep(350);
return true;
}
console.log(`[\uace8\ud504\ud0d1] \ud83d\udd04 \ud31d\uc5c5 \ub2eb\ud798 \ub300\uae30 \uc911... \uc7ac\uc2dc\ub3c4 (${check+1}/20)`);
const retryBtn=stillBtn||_0x1018();
if(retryBtn){
try{retryBtn.click();}catch(e){}
}else{
const overlay=document.querySelector('\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x6d\x6f\x64\x61\x6c-\x62\x61\x63\x6b\x64\x72\x6f\x70');
if(overlay){
try{overlay.click();}catch(e){}
}
}
}
const leftoverModal=_0x1017();
if(leftoverModal){
console.warn("[\uace8\ud504\ud0d1] \u26a0\ufe0f \ud31d\uc5c5 \ubbf8\ub2eb\ud798 -> \uac15\uc81c \uc740\ub2c9 \ucc98\ub9ac\ud558\uc5ec \ucc28\ub2e8 \ud574\uc81c");
leftoverModal.style.setProperty('\x64\x69\x73\x70\x6c\x61\x79','\x6e\x6f\x6e\x65','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
const container=leftoverModal.closest('\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72')||document.querySelector('\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72');
if(container)container.style.setProperty('\x64\x69\x73\x70\x6c\x61\x79','\x6e\x6f\x6e\x65','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
}
console.log("[\uace8\ud504\ud0d1] \u2705 \ud31d\uc5c5 \uc815\ub9ac \uc644\ub8cc -> \ub2e4\uc74c \ub2e8\uacc4 \uc9c4\ud589");
return true;
}
await sleep(200);
}
console.log("[\uace8\ud504\ud0d1] \u2139\ufe0f \ud31d\uc5c5 \ub300\uae30 \uc2dc\uac04 \ucd08\uacfc \ub610\ub294 \ud31d\uc5c5 \ubbf8\ubc1c\uc0dd -> \ub2e4\uc74c\uc73c\ub85c \uc9c4\ud589");
return true;
}
async function _0x101b(){
if(_0x1019()){
console.log("[\uace8\ud504\ud0d1] \u26a0\ufe0f \uc794\uc5ec \ud31d\uc5c5 \ubc1c\uacac -> [\ud655\uc778] \ud074\ub9ad\ud558\uc5ec \uae68\ub057\uc774 \ub2eb\uc74c");
const btn=_0x1018();
if(btn){
try{btn.click();}catch(e){}
}
await sleep(300);
if(_0x1019()){
const m=_0x1017();
if(m)m.style.setProperty('\x64\x69\x73\x70\x6c\x61\x79','\x6e\x6f\x6e\x65','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
const c=document.querySelector('\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72');
if(c)c.style.setProperty('\x64\x69\x73\x70\x6c\x61\x79','\x6e\x6f\x6e\x65','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
}
await sleep(200);
}
}
async function _0x101c(){
console.log("[\uace8\ud504\ud0d1] \ud83d\ude80 \ud558\ub2e8 \ub178\ub780\uc0c9 [\ud64d\ubcf4] \uc81c\ucd9c \ubc84\ud2bc \ud0d0\uc0c9 \ubc0f \ud074\ub9ad\x2e\x2e\x2e");
const candidates=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x62\x74\x6e, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"], \x61'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const txt=(el.innerText||el.textContent||el.value||'').trim();
if(txt!=='\ud64d\ubcf4')return false;
const r=el.getBoundingClientRect();
return r.top>500&&r.width>=100;
});
if(candidates.length>0){
const submitBtn=candidates[candidates.length-1];
submitBtn.scrollIntoView({block:'\x63\x65\x6e\x74\x65\x72',inline:'\x63\x65\x6e\x74\x65\x72'});
submitBtn.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x34\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x46\x35\x39\x45\x30\x42','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
await sleep(100);
try{
submitBtn.click();
}catch(e){
await _0x1002(submitBtn);
}
try{submitBtn.blur();}catch(e){}
console.log("[\uace8\ud504\ud0d1] \ud83d\ude80 [\ud64d\ubcf4] \uc81c\ucd9c \ubc84\ud2bc \ub2e8\uc77c \x31\ud68c \ud074\ub9ad \uc644\ub8cc!");
await _0x101a(6000);
return true;
}
console.error("[\uace8\ud504\ud0d1] \u274c \ud558\ub2e8 [\ud64d\ubcf4] \uc81c\ucd9c \ubc84\ud2bc\uc744 \ucc3e\uc9c0 \ubabb\ud568");
return false;
}
async function _0x101d(item,customMemo='',stepPreset='\x68\x75\x6d\x61\x6e'){
console.log(`\n================== [\uace8\ud504\ud0d1 \uc790\ub3d9\ub4f1\ub85d] ${item.golf} (${item.date} ${item.time}) ==================`);
await _0x101b();
await _0x100f(item.date);
if(shouldStopRegistration)return false;
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
const courseSelected=await _0x1014(item.golf,item.rawGolf);
if(shouldStopRegistration)return false;
if(!courseSelected){
console.warn(`[\uace8\ud504\ud0d1] \u26a0\ufe0f \uace8\ud504\uc7a5 [${item.golf}] \ubc84\ud2bc\uc744 \ucc3e\uc9c0 \ubabb\ud558\uc5ec \uc548\uc804\ud558\uac8c \uac74\ub108\ub701\ub2c8\ub2e4 (\uc5c9\ub6b1\ud55c \uad6c\uc7a5 \uc624\ub4f1\ub85d 100% \ubc29\uc9c0)`);
_0x1005({desc:`\u26a0\ufe0f [${item.golf}] \uad6c\uc7a5 \ubbf8\ubc1c\uacac -> \uc2a4\ud0b5`});
return false;
}
await sleep(_0x1000('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
const isPromoReady=await _0x1010();
if(shouldStopRegistration)return false;
if(!isPromoReady){
console.error(`[\uace8\ud504\ud0d1] \ud83d\uded1 [${item.golf} ${item.time}] \uc2e0\uccad \uad6c\ubd84\uc774 [\ud64d\ubcf4]\ub85c \ud655\uc778\ub418\uc9c0 \uc54a\uc544 \ub4f1\ub85d\uc744 \uc548\uc804\ud558\uac8c \uac74\ub108\ub701\ub2c8\ub2e4! (\uc624\ub4f1\ub85d 100% \ubc29\uc9c0)`);
_0x1005({desc:`\ud83d\uded1 [\ud64d\ubcf4] \ubbf8\uccb4\ud06c -> \uc548\uc804 \uac74\ub108\ub700`});
return false;
}
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
const appliedTime=await _0x1015(item.time);
if(shouldStopRegistration)return false;
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
const timeClean=(item.time||'').replace(/[^\d]/g,'');
const formattedTime=(timeClean.length===4)?`${timeClean.slice(0,2)}:${timeClean.slice(2)}`:item.time;
if(!appliedTime){
await _0x100b('\ud76c\ub9dd\uc2dc\uac04',formattedTime||timeClean);
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
}
await _0x1016(formattedTime||timeClean);
const isTransfer=(item.roomType==='\uc591\ub3c4');
await _0x100a('\uc591\ub3c4\x2f\uc870\uc778',isTransfer?'\uc591\ub3c4':'\uc870\uc778');
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
const fieldFeeNum=parseFloat((item.fieldFee||item.fee||'').toString().replace(/[^\d.]/g,''))||0;
const preFeeNum=parseFloat((item.prepaidFee||'').toString().replace(/[^\d.]/g,''))||0;
let payType='\ud604\uc7a5';
if(fieldFeeNum>0&&preFeeNum>0)payType='\uc77c\ubd80\uc120\uacb0';
else if(preFeeNum>0&&fieldFeeNum<=0)payType='\uc804\uc561\uc120\uacb0';
else payType='\ud604\uc7a5';
await _0x100a('\uacb0\uc81c\uad6c\ubd84',payType);
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
if(fieldFeeNum>0){
await _0x100b('\ud604\uc7a5\uacb0\uc81c',String(fieldFeeNum));
await sleep(100);
}
if(preFeeNum>0){
await _0x100b('\uc120\uacb0\uc81c',String(preFeeNum));
await sleep(100);
}else if(appliedTime){
await _0x100b('\uc120\uacb0\uc81c','\x30');
await sleep(60);
}
const rawGender=(item.waitGender||item.gender||'').trim();
const waitPax=parseInt(item.waitPax,10)||0;
await _0x100d(rawGender,waitPax);
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
const cond=(item.condition||'').trim();
let reqGender='\uc0c1\uad00\uc5c6\uc74c';
if(cond.includes('\ub0a8\uc790')||cond.includes('\ub0a8\uc131'))reqGender='\ub0a8\uc131\ub9cc';
else if(cond.includes('\uc5ec\uc790')||cond.includes('\uc5ec\uc131'))reqGender='\uc5ec\uc131\ub9cc';
else if(cond.includes('\ubd80\ubd80')||cond.includes('\ucee4\ud50c'))reqGender='\ub0a8\uc5ec\ub9cc';
await _0x100a('\uc694\uccad\uc131\ubcc4',reqGender);
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
const hasCart=Boolean(item.isCart||(item.rawText||'').includes('\uce74\ud3ec')||(item.rawText||'').includes('\uce74\ud2b8\ud3ec\ud568'));
const hasMeal=Boolean(item.isMeal||(item.rawText||'').includes('\uc2dd\ud3ec')||(item.rawText||'').includes('\uc2dd\uc0ac\ud3ec\ud568')||(item.rawText||'').includes('\uc870\uc2dd'));
await _0x100e('\uc870\uac74\uc120\ud0dd','\uce74\ud3ec',hasCart);
await _0x100e('\uc870\uac74\uc120\ud0dd','\uc2dd\ud3ec',hasMeal);
await _0x100e('\uc870\uac74\uc120\ud0dd','\ucee4\ud53c',false);
await _0x100e('\uc870\uac74\uc120\ud0dd','\uc2dc\uc124\x58',false);
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
const cadyRaw=(item.cady||'\uce90\ub514').trim();
let cadyTarget='\uce90\ud2f0';
if(cadyRaw.includes('\ub178\uce90\ub514'))cadyTarget='\ub178\uce90\ub514';
else if(cadyRaw.includes('\uc6b4\uc804')||cadyRaw.includes('\ub4dc\ub77c\uc774\ube59'))cadyTarget='\ub4dc\ub77c\uc774\ube59\uce90\ub514';
else if(cadyRaw.includes('\uc2e0\uc785')||cadyRaw.includes('\uad50\uc721\uc0dd'))cadyTarget='\uc2e0\uc785\uce90\ub514';
else if(cadyRaw.includes('\ud2b9\uc218'))cadyTarget='\ud2b9\uc218\uce90\ub514';
else cadyTarget='\uce90\ud2f0';
const cadyDone=await _0x100a('\uce90\ub514\uc720\ubb34',cadyTarget);
if(!cadyDone&&cadyTarget==='\uce90\ud2f0'){
await _0x100a('\uce90\ub514\uc720\ubb34','\uce90\ub514');
}
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
const memoVal=item.memo||customMemo||'';
if(memoVal){
const container=_0x1008('\ub9e4\ub2c8\uc800\ube44\uace0');
if(container){
const memoInput=container.querySelector('\x74\x65\x78\x74\x61\x72\x65\x61, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"]');
if(memoInput){
await _0x1003(memoInput,memoVal);
console.log("[\uace8\ud504\ud0d1] \ub9e4\ub2c8\uc800\ube44\uace0 \ub4f1\ub85d\ubb38\uad6c \uc785\ub825 \uc644\ub8cc");
await sleep(100);
}
}
}
await _0x100a('\uc591\ub3c4\x2f\uc870\uc778',isTransfer?'\uc591\ub3c4':'\uc870\uc778');
await sleep(80);
if(fieldFeeNum>0){
await _0x100b('\ud604\uc7a5\uacb0\uc81c',String(fieldFeeNum));
}
if(preFeeNum>0){
await _0x100b('\uc120\uacb0\uc81c',String(preFeeNum));
}
await sleep(50);
const isPromoStillActive=await _0x1010();
if(!isPromoStillActive){
console.error(`[\uace8\ud504\ud0d1] \ud83d\uded1 [${item.golf} ${item.time}] \uc81c\ucd9c \uc9c1\uc804 \uc2e0\uccad \uad6c\ubd84\uc774 [\ud64d\ubcf4]\uac00 \uc544\ub2d8\uc774 \uac10\uc9c0\ub418\uc5c8\uc2b5\ub2c8\ub2e4! \uc81c\ucd9c\uc744 \ucde8\uc18c\ud569\ub2c8\ub2e4.`);
_0x1005({desc:`\ud83d\uded1 \uc81c\ucd9c \uc804 [\ud64d\ubcf4] \ubbf8\uccb4\ud06c -> \ucde8\uc18c`});
return false;
}
const submitted=await _0x101c();
if(!submitted)return false;
await sleep(_0x1000('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
return true;
}
async function _0x101e(items,memo='',delayPreset='\x73\x61\x66\x65',stepPreset='\x68\x75\x6d\x61\x6e'){
if(!items||items.length===0)return;
const nowTs=Date.now();
if(isRegistrationRunning||(window.__golftop_last_start_ts&&nowTs-window.__golftop_last_start_ts<2500)){
console.warn("[\uace8\ud504\ud0d1] \u26a0\ufe0f \uc774\ubbf8 \uc790\ub3d9\ub4f1\ub85d \ub8e8\ud504\uac00 \uc2e4\ud589 \uc911\uc774\ubbc0\ub85c \uc911\ubcf5 \uc2dc\uc791 \uc694\uccad\uc744 \ubb34\uc2dc\ud569\ub2c8\ub2e4\x2e");
return;
}
window.__golftop_last_start_ts=nowTs;
isRegistrationRunning=true;
shouldStopRegistration=false;
console.log(`\ud83d\ude80 [\uace8\ud504\ud0d1 \uc790\ub3d9\ub4f1\ub85d \uc2dc\uc791 - Ver 2.0.53] \ucd1d ${items.length}\uac74 (\uc18d\ub3c4: ${stepPreset}, \uac04\uaca9: ${delayPreset})`);
_0x1005({
title:'\uace8\ud504\ud0d1 \ud64d\ubcf4 \uc790\ub3d9\ub4f1\ub85d',
desc:`\ucd1d ${items.length}\uac74 \ub4f1\ub85d \uc2dc\uc791...`,
current:0,
total:items.length
});
let successCount=0;
for(let i=0;i<items.length;i++){
if(shouldStopRegistration)break;
const item=items[i];
_0x1005({
desc:`[${i+1}/${items.length}] ${item.golf} (${item.date} ${item.time}) \ucc98\ub9ac \uc911...`,
current:i+1,
total:items.length
});
chrome.runtime.sendMessage({
type:'\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x50\x52\x4f\x47\x52\x45\x53\x53',
current:i+1,
total:items.length,
golf:item.golf,
date:item.date,
time:item.time,
fee:item.fee,
regId:item.regId
});
try{
const ok=await _0x101d(item,memo,stepPreset);
if(ok){
successCount++;
console.log(`\u2705 [\uace8\ud504\ud0d1] [${i+1}/${items.length}] ${item.golf} (${item.time}) \ub4f1\ub85d \uc644\ub8cc!`);
chrome.runtime.sendMessage({
type:'\x49\x54\x45\x4d\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x53\x55\x43\x43\x45\x53\x53',
regId:item.regId,
item:item
});
}
}catch(err){
console.error(`[\uace8\ud504\ud0d1] [${i+1}/${items.length}] ${item.golf} \ucc98\ub9ac \uc911 \uc608\uc678 \ubc1c\uc0dd:`,err);
}
if(shouldStopRegistration)break;
if(i<items.length-1){
const cooldown=_0x1001(delayPreset);
await sleep(cooldown);
}
}
isRegistrationRunning=false;
if(shouldStopRegistration){
console.log(`\ud83d\uded1 [\uace8\ud504\ud0d1] \uc790\ub3d9\ub4f1\ub85d \uc911\ub2e8 (\uc131\uacf5: ${successCount}\uac74)`);
_0x1005({desc:`\ud83d\uded1 \ub4f1\ub85d \uc911\ub2e8 (\uc131\uacf5 ${successCount}\uac74)`,isStopped:true});
chrome.runtime.sendMessage({type:'\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x53\x54\x4f\x50\x50\x45\x44',total:items.length,successCount:successCount});
}else{
console.log(`\ud83c\udf89 [\uace8\ud504\ud0d1] \ubaa8\ub4e0 \ub4f1\ub85d \uc644\ub8cc! (\ucd1d \uc131\uacf5: ${successCount}/${items.length}\uac74)`);
_0x1005({desc:`\ud83c\udf89 \ubaa8\ub4e0 \ub4f1\ub85d \uc644\ub8cc! (${successCount}\uac74 \uc131\uacf5)`,isCompleted:true});
chrome.runtime.sendMessage({type:'\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x43\x4f\x4d\x50\x4c\x45\x54\x45\x44',total:items.length,successCount:successCount});
}
setTimeout(_0x1006,4000);
}
function _0x101f(){
let dateInputs=[];
let courseInput=null;
let timeInput=null;
let searchBtn=null;
const allInputs=Array.from(document.querySelectorAll('\x69\x6e\x70\x75\x74'));
const labelEls=Array.from(document.querySelectorAll('\x74\x68, \x74\x64, \x6c\x61\x62\x65\x6c, \x73\x70\x61\x6e, \x64\x69\x76, \x70')).filter(el=>{
if(el.children.length>2)return false;
return(el.innerText||el.textContent||'').trim().replace(/\s+/g,'')==='\uc608\uc57d\uc77c';
});
for(const lbl of labelEls){
const container=lbl.closest('\x2e\x66\x6f\x72\x6d-\x67\x72\x6f\x75\x70, \x2e\x72\x6f\x77, \x74\x72, \x74\x64, \x64\x69\x76')||lbl.parentElement;
if(container){
const inps=Array.from(container.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"], \x69\x6e\x70\x75\x74\x3a\x6e\x6f\x74([\x74\x79\x70\x65]), \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x64\x61\x74\x65"]'))
.filter(inp=>inp.offsetWidth>0||inp.offsetHeight>0);
if(inps.length>=2){
dateInputs=[inps[0],inps[1]];
break;
}
}
}
if(dateInputs.length<2){
const dateLikeInputs=allInputs.filter(inp=>{
const v=(inp.value||'').trim();
const n=(inp.name||inp.id||'').toLowerCase();
return/^\d{4}[\/\-]\d{2}[\/\-]\d{2}$/.test(v)||n.includes('\x73\x64\x61\x74\x65')||n.includes('\x65\x64\x61\x74\x65')||n.includes('\x73\x74\x61\x72\x74\x64\x61\x74\x65')||n.includes('\x65\x6e\x64\x64\x61\x74\x65');
});
if(dateLikeInputs.length>=2){
dateInputs=[dateLikeInputs[0],dateLikeInputs[1]];
}
}
const courseLabels=Array.from(document.querySelectorAll('\x74\x68, \x74\x64, \x6c\x61\x62\x65\x6c, \x73\x70\x61\x6e, \x64\x69\x76')).filter(el=>{
if(el.children.length>2)return false;
return(el.innerText||el.textContent||'').trim().replace(/\s+/g,'')==='\uace8\ud504\uc7a5\uba85';
});
for(const lbl of courseLabels){
const container=lbl.closest('\x2e\x66\x6f\x72\x6d-\x67\x72\x6f\x75\x70, \x2e\x72\x6f\x77, \x74\x72, \x74\x64, \x64\x69\x76')||lbl.parentElement;
if(container){
const inp=container.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"], \x69\x6e\x70\x75\x74\x3a\x6e\x6f\x74([\x74\x79\x70\x65])');
if(inp){
courseInput=inp;
break;
}
}
}
if(!courseInput){
courseInput=allInputs.find(inp=>{
const n=(inp.name||inp.id||inp.placeholder||'').toLowerCase();
return n.includes('\x67\x6f\x6c\x66')||n.includes('\x63\x6f\x75\x72\x73\x65')||n.includes('\uace8\ud504\uc7a5');
});
}
const timeLabels=Array.from(document.querySelectorAll('\x74\x68, \x74\x64, \x6c\x61\x62\x65\x6c, \x73\x70\x61\x6e, \x64\x69\x76')).filter(el=>{
if(el.children.length>2)return false;
return(el.innerText||el.textContent||'').trim().replace(/\s+/g,'')==='\uc2dc\uac04';
});
for(const lbl of timeLabels){
const container=lbl.closest('\x2e\x66\x6f\x72\x6d-\x67\x72\x6f\x75\x70, \x2e\x72\x6f\x77, \x74\x72, \x74\x64, \x64\x69\x76')||lbl.parentElement;
if(container){
const inp=container.querySelector('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x74\x65\x78\x74"], \x69\x6e\x70\x75\x74\x3a\x6e\x6f\x74([\x74\x79\x70\x65])');
if(inp){
timeInput=inp;
break;
}
}
}
if(!timeInput){
timeInput=allInputs.find(inp=>{
const n=(inp.name||inp.id||inp.placeholder||'').toLowerCase();
return n.includes('\x74\x69\x6d\x65')||n.includes('\uc2dc\uac04');
});
}
const allBtns=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x61\x2e\x62\x74\x6e, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x73\x75\x62\x6d\x69\x74"], \x2e\x62\x74\x6e'));
searchBtn=allBtns.find(b=>{
const txt=(b.innerText||b.textContent||b.value||'').trim();
return txt.includes('\uc870\ud68c');
});
return{dateInputs,courseInput,timeInput,searchBtn};
}
async function _0x1020(inputEl,value){
if(!inputEl)return;
inputEl.focus();
inputEl.value='';
inputEl.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
inputEl.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
await sleep(30);
inputEl.value=String(value);
inputEl.dispatchEvent(new Event('\x69\x6e\x70\x75\x74',{bubbles:true}));
inputEl.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
await sleep(40);
inputEl.blur();
}
function _0x1021(golfName,rawGolfName,targetDate,targetTime,yyyy,mm,dd){
const table=document.querySelector('\x74\x61\x62\x6c\x65');
if(!table)return[];
const rows=Array.from(table.querySelectorAll('\x74\x62\x6f\x64\x79 \x74\x72')).filter(tr=>{
if(tr.offsetHeight<=0&&tr.offsetWidth<=0)return false;
const cells=Array.from(tr.querySelectorAll('\x74\x64'));
if(cells.length<5)return false;
return true;
});
const cleanTargetGolf=(golfName||'').replace(/[\s\-_\[\]\(\)]/g,'').toLowerCase().replace(/cc|gc/g,'');
const cleanRawGolf=(rawGolfName||'').replace(/[\s\-_\[\]\(\)]/g,'').toLowerCase().replace(/cc|gc/g,'');
const targetDigits=(targetTime||'').replace(/[^\d]/g,'');
return rows.filter(tr=>{
const cells=Array.from(tr.querySelectorAll('\x74\x64'));
const courseText=(cells[0]?.innerText||cells[0]?.textContent||'').replace(/[\s\-_\[\]\(\)]/g,'').toLowerCase().replace(/cc|gc/g,'');
const courseMatch=!cleanTargetGolf||courseText.includes(cleanTargetGolf)||cleanTargetGolf.includes(courseText)||
(cleanRawGolf&&(courseText.includes(cleanRawGolf)||cleanRawGolf.includes(courseText)));
if(!courseMatch)return false;
const dateText=(cells[1]?.innerText||cells[1]?.textContent||'').trim();
let dateMatch=true;
if(mm&&dd){
const mNum=parseInt(mm,10);
const dNum=parseInt(dd,10);
dateMatch=dateText.includes(`${mm}-${dd}`)||dateText.includes(`${mm}/${dd}`)||
dateText.includes(`${mNum}-${dNum}`)||dateText.includes(`${mNum}/${dNum}`)||
dateText.includes(`${yyyy}-${mm}-${dd}`)||dateText.includes(`${yyyy}/${mm}/${dd}`);
}
if(!dateMatch)return false;
const timeText=(cells[2]?.innerText||cells[2]?.textContent||'').trim();
let timeMatch=true;
if(targetDigits){
const cellDigits=timeText.replace(/[^\d]/g,'');
timeMatch=(cellDigits===targetDigits)||timeText.includes(targetTime);
}
if(!timeMatch)return false;
return true;
});
}
function _0x1022(row){
if(!row)return null;
const buttons=Array.from(row.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x61, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"], \x73\x70\x61\x6e\x2e\x62\x74\x6e'));
let btn=buttons.find(b=>(b.innerText||b.textContent||b.value||'').trim()==='\uc0ad\uc81c');
if(!btn){
btn=buttons.find(b=>{
const txt=(b.innerText||b.textContent||b.value||'').trim();
const cls=(b.className||'').toLowerCase();
return txt.includes('\uc0ad\uc81c')&&(cls.includes('\x64\x61\x6e\x67\x65\x72')||cls.includes('\x72\x65\x64')||cls.includes('\x64\x65\x6c'));
});
}
return btn;
}
async function _0x1023(maxWaitMs=5000){
console.log("[\uace8\ud504\ud0d1] \u23f3 '\uc774 \ud64d\ubcf4\uae00\uc744 \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?' \ud655\uc778 \ud31d\uc5c5 \ub300\uae30 \ubc0f \uc790\ub3d9 \uc2b9\uc778\x2e\x2e\x2e");
const startTime=Date.now();
while(Date.now()-startTime<maxWaitMs){
if(shouldStopRegistration)return false;
const swalConfirmBtn=document.querySelector('\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x66\x69\x72\x6d, \x62\x75\x74\x74\x6f\x6e\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x66\x69\x72\x6d, \x2e\x73\x77\x61\x6c\x32-\x61\x63\x74\x69\x6f\x6e\x73 \x62\x75\x74\x74\x6f\x6e\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x66\x69\x72\x6d, \x2e\x73\x77\x61\x6c\x32-\x61\x63\x74\x69\x6f\x6e\x73 \x62\x75\x74\x74\x6f\x6e\x3a\x6e\x6f\x74(\x2e\x73\x77\x61\x6c\x32-\x63\x61\x6e\x63\x65\x6c)');
let targetBtn=swalConfirmBtn;
if(!targetBtn){
const modalContainer=document.querySelector('\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x73\x77\x61\x6c\x32-\x70\x6f\x70\x75\x70, \x2e\x6d\x6f\x64\x61\x6c\x2e\x73\x68\x6f\x77, \x2e\x73\x77\x65\x65\x74-\x61\x6c\x65\x72\x74');
if(modalContainer){
const buttons=Array.from(modalContainer.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x61\x2e\x62\x74\x6e, \x2e\x62\x74\x6e, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"]'));
targetBtn=buttons.find(b=>(b.innerText||b.textContent||b.value||'').trim()==='\ud655\uc778');
}
}
if(!targetBtn){
const allElements=Array.from(document.querySelectorAll('\x64\x69\x76, \x70, \x68\x32, \x73\x70\x61\x6e, \x68\x33'));
const deleteMsgEl=allElements.find(el=>{
if(el.children.length>2)return false;
const txt=(el.innerText||el.textContent||'').trim();
return txt.includes('\uc774 \ud64d\ubcf4\uae00\uc744 \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c')||txt.includes('\uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c');
});
if(deleteMsgEl){
const dialog=deleteMsgEl.closest('\x2e\x73\x77\x61\x6c\x32-\x70\x6f\x70\x75\x70, \x2e\x6d\x6f\x64\x61\x6c-\x63\x6f\x6e\x74\x65\x6e\x74, [\x72\x6f\x6c\x65="\x64\x69\x61\x6c\x6f\x67"], \x64\x69\x76')||deleteMsgEl.parentElement;
if(dialog){
const btns=Array.from(dialog.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x61\x2e\x62\x74\x6e, \x2e\x62\x74\x6e, \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"]'));
targetBtn=btns.find(b=>(b.innerText||b.textContent||b.value||'').trim()==='\ud655\uc778');
}
}
}
if(targetBtn&&(targetBtn.offsetWidth>0||targetBtn.offsetHeight>0)){
console.log("[\uace8\ud504\ud0d1] \ud83c\udfaf \uc0ad\uc81c \ud655\uc778 \ud31d\uc5c5 [\ud655\uc778] \ubc84\ud2bc \uac10\uc9c0! \ud074\ub9ad \uc2e4\ud589");
targetBtn.style.setProperty('\x6f\x75\x74\x6c\x69\x6e\x65','\x33\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x31\x30\x42\x39\x38\x31','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
targetBtn.click();
try{
if(window.Swal&&typeof window.Swal.clickConfirm==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
window.Swal.clickConfirm();
}
}catch(e){}
await sleep(300);
for(let i=0;i<20;i++){
await sleep(150);
const followupConfirm=document.querySelector('\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x66\x69\x72\x6d, \x62\x75\x74\x74\x6f\x6e\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x66\x69\x72\x6d');
const followupText=document.querySelector('\x2e\x73\x77\x61\x6c\x32-\x74\x69\x74\x6c\x65, \x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x74\x65\x6e\x74, \x2e\x73\x77\x61\x6c\x32-\x68\x74\x6d\x6c-\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72');
if(followupConfirm&&followupText&&(followupText.innerText.includes('\uc0ad\uc81c\ub418\uc5c8\uc2b5\ub2c8\ub2e4')||followupText.innerText.includes('\uc644\ub8cc'))){
console.log("[\uace8\ud504\ud0d1] \ud83c\udfaf '\uc0ad\uc81c\ub418\uc5c8\uc2b5\ub2c8\ub2e4' \ud6c4\uc18d \ud31d\uc5c5 \uac10\uc9c0 -> [\ud655\uc778] \ud074\ub9ad");
followupConfirm.click();
try{if(window.Swal&&typeof window.Swal.close==='\x66\x75\x6e\x63\x74\x69\x6f\x6e')window.Swal.close();}catch(e){}
await sleep(250);
break;
}
const swalContainer=document.querySelector('\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72');
if(!swalContainer||window.getComputedStyle(swalContainer).display==='\x6e\x6f\x6e\x65'){
console.log("[\uace8\ud504\ud0d1] \u2705 \uc0ad\uc81c \ud655\uc778 \ud31d\uc5c5 \ub2eb\ud798 \uc644\ub8cc!");
return true;
}
}
return true;
}
await sleep(100);
}
console.warn("[\uace8\ud504\ud0d1] \u26a0\ufe0f \uc0ad\uc81c \ud655\uc778 \ud31d\uc5c5 \ubbf8\ubc1c\uc0dd \ub610\ub294 \ub300\uae30 \uc2dc\uac04 \ucd08\uacfc");
return false;
}
if(!window.__golftop_swal_observer_registered){
window.__golftop_swal_observer_registered=true;
const autoClickSwalConfirm=()=>{
const container=document.querySelector('\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x73\x77\x61\x6c\x32-\x70\x6f\x70\x75\x70');
if(!container||container.style.display==='\x6e\x6f\x6e\x65')return;
const text=(container.innerText||container.textContent||'');
if(text.includes('\uc774 \ud64d\ubcf4\uae00\uc744 \uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c')||text.includes('\uc0ad\uc81c\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c')||text.includes('\uc0ad\uc81c\ub418\uc5c8\uc2b5\ub2c8\ub2e4')){
const confirmBtn=container.querySelector('\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x66\x69\x72\x6d, \x62\x75\x74\x74\x6f\x6e\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x66\x69\x72\x6d')||
Array.from(container.querySelectorAll('\x62\x75\x74\x74\x6f\x6e')).find(b=>(b.innerText||'').trim()==='\ud655\uc778');
if(confirmBtn&&(confirmBtn.offsetWidth>0||confirmBtn.offsetHeight>0)){
console.log("[\uace8\ud504\ud0d1 \uc635\uc800\ubc84] \ud83c\udfaf \uc0ad\uc81c \ud655\uc778 \ud31d\uc5c5 [\ud655\uc778] \uc989\uc2dc \ud074\ub9ad!");
try{confirmBtn.click();}catch(e){}
}
}
};
try{
const observer=new MutationObserver(autoClickSwalConfirm);
observer.observe(document.body||document.documentElement,{childList:true,subtree:true});
}catch(e){}
}
async function _0x1024(targetPost,initialDeletedCount=0){
if(!targetPost){
return{success:false,message:'\uc0ad\uc81c\ud560 \ud2f0\ud0c0\uc784 \uc815\ubcf4\uac00 \uc5c6\uc2b5\ub2c8\ub2e4\x2e'};
}
const golfName=targetPost.golf||'';
const rawGolfName=targetPost.rawGolf||golfName;
const targetDate=targetPost.date||'';
const targetTime=targetPost.time||'';
const actionMode=targetPost.mode||'\x64\x65\x6c\x65\x74\x65';
const isSoldOut=(actionMode==='\x73\x6f\x6c\x64\x6f\x75\x74');
const actionLabel=isSoldOut?'\ub9c8\uac10':'\uc0ad\uc81c';
console.log(`[\uace8\ud504\ud0d1 \ub9c8\uac10/\uc0ad\uc81c] \uc2dc\uc791: \uad6c\uc7a5=${golfName}(${rawGolfName}), \ub0a0\uc9dc=${targetDate}, \uc2dc\uac04=${targetTime}, \ubaa8\ub4dc=${actionMode}`);
isRegistrationRunning=true;
shouldStopRegistration=false;
window.shouldStopRegistration=false;
_0x1005({
title:`\uace8\ud504\ud0d1 \uae00 ${actionLabel}`,
desc:`[${golfName} ${targetDate} ${targetTime}] MY \ud64d\ubcf4 \uac80\uc0c9 \uc911...`,
current:1,
total:1
});
try{
const currentPath=window.location.pathname.toLowerCase();
if(!currentPath.includes('\x2f\x6d\x61\x6e\x61\x67\x65\x2f\x70\x72\x6f\x6d\x6f\x74\x69\x6f\x6e')){
_0x1005({desc:'\x4d\x59 \ud64d\ubcf4 \uba54\ub274\ub85c \uc774\ub3d9 \uc911\x2e\x2e\x2e'});
sessionStorage.setItem('\x5f\x5f\x67\x6f\x6c\x66\x74\x6f\x70\x5f\x70\x65\x6e\x64\x69\x6e\x67\x5f\x64\x65\x6c\x65\x74\x65\x5f\x5f',JSON.stringify({
targetPost,
deletedCount:initialDeletedCount
}));
const myPromoLink=Array.from(document.querySelectorAll('\x61')).find(a=>
(a.href&&a.href.includes('\x2f\x4d\x61\x6e\x61\x67\x65\x2f\x50\x72\x6f\x6d\x6f\x74\x69\x6f\x6e'))||
(a.innerText&&a.innerText.trim().includes('\x4d\x59 \ud64d\ubcf4'))
);
if(myPromoLink){
myPromoLink.click();
}else{
window.location.href='\x68\x74\x74\x70\x73\x3a\x2f\x2f\x69\x6e\x74\x72\x61\x2e\x67\x6f\x6c\x66\x74\x6f\x70\x2e\x6b\x72\x2f\x4d\x61\x6e\x61\x67\x65\x2f\x50\x72\x6f\x6d\x6f\x74\x69\x6f\x6e';
}
return{success:true,pendingNavigation:true};
}
await sleep(400);
const filters=_0x101f();
console.log("[\uace8\ud504\ud0d1 \ub9c8\uac10\x2f\uc0ad\uc81c] \ud0d0\uc0c9\ub41c \uac80\uc0c9 \ud544\ud130\x3a",filters);
let m=new Date().getMonth()+1;
let d=new Date().getDate();
let y=new Date().getFullYear();
const dateParts=targetDate.match(/(\d{1,2})[.\/\-](\d{1,2})/);
if(dateParts){
m=parseInt(dateParts[1],10);
d=parseInt(dateParts[2],10);
}
const yearParts=targetDate.match(/20\d{2}/);
if(yearParts){
y=parseInt(yearParts[0],10);
}
const yyyy=String(y);
const mm=String(m).padStart(2,'\x30');
const dd=String(d).padStart(2,'\x30');
if(filters.dateInputs&&filters.dateInputs.length>=2){
const sampleVal=filters.dateInputs[0].value||'';
const useSlash=sampleVal.includes('\x2f')||!sampleVal.includes('-');
const formattedDate=useSlash?`${yyyy}/${mm}/${dd}`:`${yyyy}-${mm}-${dd}`;
console.log(`[\uace8\ud504\ud0d1 \ub9c8\uac10/\uc0ad\uc81c] \uc608\uc57d\uc77c \uac80\uc0c9 \ud544\ud130 \uc124\uc815: ${formattedDate}`);
await _0x1020(filters.dateInputs[0],formattedDate);
await _0x1020(filters.dateInputs[1],formattedDate);
document.querySelectorAll('\x2e\x64\x61\x74\x65\x70\x69\x63\x6b\x65\x72, \x2e\x64\x61\x74\x65\x70\x69\x63\x6b\x65\x72-\x64\x72\x6f\x70\x64\x6f\x77\x6e, \x2e\x62\x6f\x6f\x74\x73\x74\x72\x61\x70-\x64\x61\x74\x65\x74\x69\x6d\x65\x70\x69\x63\x6b\x65\x72-\x77\x69\x64\x67\x65\x74').forEach(dp=>{
dp.style.setProperty('\x64\x69\x73\x70\x6c\x61\x79','\x6e\x6f\x6e\x65','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
});
try{
if(document.activeElement&&typeof document.activeElement.blur==='\x66\x75\x6e\x63\x74\x69\x6f\x6e'){
document.activeElement.blur();
}
}catch(e){}
}
const searchCourseName=(golfName||rawGolfName||'')
.replace(/\(.*?\)/g,'')
.replace(/cc|gc/gi,'')
.trim();
if(filters.courseInput&&searchCourseName){
console.log(`[\uace8\ud504\ud0d1 \ub9c8\uac10/\uc0ad\uc81c] \uad6c\uc7a5\uba85 \uac80\uc0c9 \ud544\ud130 \uc124\uc815: ${searchCourseName}`);
await _0x1020(filters.courseInput,searchCourseName);
}
if(filters.timeInput&&targetTime){
console.log(`[\uace8\ud504\ud0d1 \ub9c8\uac10/\uc0ad\uc81c] \uc2dc\uac04 \uac80\uc0c9 \ud544\ud130 \uc124\uc815: ${targetTime}`);
await _0x1020(filters.timeInput,targetTime);
}
if(filters.searchBtn){
console.log("[\uace8\ud504\ud0d1 \ub9c8\uac10\x2f\uc0ad\uc81c] [\x51 \uc870\ud68c] \ubc84\ud2bc \ud074\ub9ad");
filters.searchBtn.click();
await sleep(1000);
}
let deletedCount=initialDeletedCount;
const MAX_LOOPS=25;
let loopCount=0;
while(loopCount<MAX_LOOPS){
loopCount++;
if(shouldStopRegistration)break;
let matchingRows=_0x1021(golfName,rawGolfName,targetDate,targetTime,yyyy,mm,dd);
if(matchingRows.length===0&&loopCount===1&&filters.timeInput&&filters.timeInput.value){
console.log("[\uace8\ud504\ud0d1 \ub9c8\uac10\x2f\uc0ad\uc81c] \uc2dc\uac04 \ud544\ud130 \ud3ec\ud568 \x30\uac74 -> \uc2dc\uac04 \ud544\ud130 \ube44\uc6b0\uace0 \uc7ac\uc870\ud68c \uc2dc\ub3c4\x2e\x2e\x2e");
await _0x1020(filters.timeInput,'');
if(filters.searchBtn){
filters.searchBtn.click();
await sleep(1000);
matchingRows=_0x1021(golfName,rawGolfName,targetDate,targetTime,yyyy,mm,dd);
}
}
if(matchingRows.length===0){
console.log(`[\uace8\ud504\ud0d1 \ub9c8\uac10/\uc0ad\uc81c] \uc77c\uce58\ud558\ub294 \ud589\uc774 0\uac1c\uc785\ub2c8\ub2e4. \ud0d0\uc0c9 \uc885\ub8cc. (\ucd1d \ucc98\ub9ac: ${deletedCount}\uac74)`);
break;
}
console.log(`[\uace8\ud504\ud0d1 \ub9c8\uac10/\uc0ad\uc81c] \uc77c\uce58\ud558\ub294 \ud0c0\uc784 \ud589 ${matchingRows.length}\uac1c \ubc1c\uacac! \ucc98\ub9ac \uc9c4\ud589 \uc911...`);
_0x1005({
desc:`[${golfName} ${targetTime}] \uc77c\uce58\ud558\ub294 \uae00 ${matchingRows.length}\uac1c \ubc1c\uacac! ${actionLabel} \ucc98\ub9ac \uc911...`
});
if(isSoldOut){
let soldOutDone=0;
for(const row of matchingRows){
const statusRadios=Array.from(row.querySelectorAll('\x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x72\x61\x64\x69\x6f"]'));
const soldOutRadio=statusRadios.find(r=>{
const lbl=r.closest('\x6c\x61\x62\x65\x6c')||r.parentElement;
return(lbl&&lbl.innerText.includes('\ub9c8\uac10'))||r.value==='\ub9c8\uac10'||r.value==='\x63\x6c\x6f\x73\x65'||r.value==='\x4e';
})||statusRadios[1];
if(soldOutRadio&&!soldOutRadio.checked){
soldOutRadio.click();
soldOutRadio.checked=true;
soldOutRadio.dispatchEvent(new Event('\x63\x68\x61\x6e\x67\x65',{bubbles:true}));
soldOutDone++;
await sleep(300);
}
}
deletedCount+=soldOutDone;
break;
}else{
const targetRow=matchingRows[0];
const delBtn=_0x1022(targetRow);
if(!delBtn){
console.warn("[\uace8\ud504\ud0d1 \ub9c8\uac10\x2f\uc0ad\uc81c] \ud574\ub2f9 \ud589\uc758 \uc0ad\uc81c \ubc84\ud2bc\uc744 \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4\x2e");
break;
}
sessionStorage.setItem('\x5f\x5f\x67\x6f\x6c\x66\x74\x6f\x70\x5f\x70\x65\x6e\x64\x69\x6e\x67\x5f\x64\x65\x6c\x65\x74\x65\x5f\x5f',JSON.stringify({
targetPost,
deletedCount:deletedCount+1
}));
console.log(`[\uace8\ud504\ud0d1 \ub9c8\uac10/\uc0ad\uc81c] [\uc0ad\uc81c] \ubc84\ud2bc \ud074\ub9ad -> \ud655\uc778 \ud31d\uc5c5 \uc2b9\uc778 \ub300\uae30...`);
delBtn.click();
await _0x1023(5000);
deletedCount++;
_0x1005({
desc:`[${golfName} ${targetTime}] \uc911\ubcf5 \uae00 \uc0ad\uc81c \uc911... (${deletedCount}\uac74 \uc0ad\uc81c \uc644\ub8cc)`
});
await sleep(800);
if(document.body.contains(targetRow)){
if(filters.searchBtn){
filters.searchBtn.click();
await sleep(1000);
}
}
}
}
sessionStorage.removeItem('\x5f\x5f\x67\x6f\x6c\x66\x74\x6f\x70\x5f\x70\x65\x6e\x64\x69\x6e\x67\x5f\x64\x65\x6c\x65\x74\x65\x5f\x5f');
isRegistrationRunning=false;
if(deletedCount>0){
_0x1005({
desc:`\u2705 [${golfName} ${targetTime}] \ucd1d ${deletedCount}\uac74 ${actionLabel} \uc644\ub8cc!`,
isCompleted:true
});
setTimeout(_0x1006,4000);
return{
success:true,
count:deletedCount,
platform:'\x67\x6f\x6c\x66\x74\x6f\x70',
message:`[\uace8\ud504\ud0d1] ${golfName} (${targetTime}) \ucd1d ${deletedCount}\uac74 ${actionLabel} \uc644\ub8cc`
};
}else{
_0x1005({
desc:`\u26a0\ufe0f [${golfName} ${targetDate} ${targetTime}] \uc77c\uce58\ud558\ub294 \uae00\uc744 \ucc3e\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4.`,
isStopped:true
});
setTimeout(_0x1006,4000);
return{
success:false,
count:0,
platform:'\x67\x6f\x6c\x66\x74\x6f\x70',
message:`[\uace8\ud504\ud0d1] MY \ud64d\ubcf4 \ubaa9\ub85d\uc5d0\uc11c [${golfName} / ${targetDate} ${targetTime}] \uc77c\uce58\ud558\ub294 \uae00\uc744 \ucc3e\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4.`
};
}
}catch(err){
sessionStorage.removeItem('\x5f\x5f\x67\x6f\x6c\x66\x74\x6f\x70\x5f\x70\x65\x6e\x64\x69\x6e\x67\x5f\x64\x65\x6c\x65\x74\x65\x5f\x5f');
isRegistrationRunning=false;
console.error("[\uace8\ud504\ud0d1 \ub9c8\uac10\x2f\uc0ad\uc81c] \uc624\ub958 \ubc1c\uc0dd\x3a",err);
_0x1005({desc:`\u274c \uc624\ub958: ${err.message}`,isStopped:true});
setTimeout(_0x1006,4000);
return{
success:false,
count:0,
platform:'\x67\x6f\x6c\x66\x74\x6f\x70',
message:`\uace8\ud504\ud0d1 \uae00 ${actionLabel} \uc911 \uc624\ub958 \ubc1c\uc0dd: ${err.message}`
};
}
}
(async function _0x1025(){
try{
if(!window.location.pathname.toLowerCase().includes('\x2f\x6d\x61\x6e\x61\x67\x65\x2f\x70\x72\x6f\x6d\x6f\x74\x69\x6f\x6e'))return;
const rawPending=sessionStorage.getItem('\x5f\x5f\x67\x6f\x6c\x66\x74\x6f\x70\x5f\x70\x65\x6e\x64\x69\x6e\x67\x5f\x64\x65\x6c\x65\x74\x65\x5f\x5f');
if(!rawPending)return;
const pending=JSON.parse(rawPending);
if(pending&&pending.targetPost){
console.log("[\uace8\ud504\ud0d1] \ud398\uc774\uc9c0 \ub9ac\ub85c\ub4dc \ud6c4 \ub300\uae30 \uc911\uc778 \uae00 \ub9c8\uac10\x2f\uc0ad\uc81c \uc790\ub3d9 \uc7ac\uac1c\x3a",pending);
await sleep(1000);
_0x1024(pending.targetPost,pending.deletedCount||0);
}
}catch(e){
try{sessionStorage.removeItem('\x5f\x5f\x67\x6f\x6c\x66\x74\x6f\x70\x5f\x70\x65\x6e\x64\x69\x6e\x67\x5f\x64\x65\x6c\x65\x74\x65\x5f\x5f');}catch(err){}
}
})();
if(window.__golftop_onMessage_fn){
try{
chrome.runtime.onMessage.removeListener(window.__golftop_onMessage_fn);
}catch(e){}
}
window.__golftop_onMessage_fn=(msg,sender,sendResponse)=>{
if(msg.action==='\x53\x54\x41\x52\x54\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e'){
console.log("[\uace8\ud504\ud0d1] \uc790\ub3d9\ub4f1\ub85d \uc2dc\uc791 \uc694\uccad \uc218\uc2e0 (\x56\x65\x72 \x32\x2e\x30\x2e\x35\x33)\x3a",msg);
shouldStopRegistration=false;
_0x101e(msg.items,msg.memo,msg.delayPreset,msg.stepPreset);
sendResponse({success:true,version:'\x32\x2e\x30\x2e\x35\x33'});
return true;
}else if(msg.action==='\x53\x54\x41\x52\x54\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x50\x4f\x53\x54\x5f\x44\x45\x4c\x45\x54\x45'){
console.log("[\uace8\ud504\ud0d1] \ud2f0\ud0c0\uc784 \uae00 \ub9c8\uac10\x2f\uc0ad\uc81c \uc694\uccad \uc218\uc2e0\x3a",msg);
_0x1024(msg.targetPost).then(result=>{
sendResponse(result);
}).catch(err=>{
sendResponse({success:false,message:err.message||'\uace8\ud504\ud0d1 \uae00 \ucc98\ub9ac \uc911 \uc624\ub958\uac00 \ubc1c\uc0dd\ud588\uc2b5\ub2c8\ub2e4\x2e'});
});
return true;
}else if(msg.action==='\x53\x54\x4f\x50\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e'||msg.action==='\x53\x54\x4f\x50\x5f\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e'){
console.log("[\uace8\ud504\ud0d1] \uc790\ub3d9\ub4f1\ub85d \uc911\ub2e8 \uc694\uccad \uc218\uc2e0");
shouldStopRegistration=true;
isRegistrationRunning=false;
_0x1005({desc:'\ud83d\uded1 \uc790\ub3d9\ub4f1\ub85d\uc774 \uc911\ub2e8\ub418\uc5c8\uc2b5\ub2c8\ub2e4\x2e',isStopped:true});
_0x1006();
sendResponse({success:true});
return true;
}else if(msg.action==='\x53\x45\x54\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x53\x4d\x41\x52\x54\x5f\x4c\x41\x59\x4f\x55\x54'){
const enabled=!!msg.enabled;
_0x1027(enabled);
_0x1037(enabled);
sendResponse({success:true,enabled:enabled});
return true;
}else if(msg.action==='\x47\x45\x54\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x53\x4d\x41\x52\x54\x5f\x4c\x41\x59\x4f\x55\x54\x5f\x53\x54\x41\x54\x55\x53'){
const isEnabled=document.body.classList.contains('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x6c\x61\x79\x6f\x75\x74-\x61\x63\x74\x69\x76\x65');
sendResponse({success:true,enabled:isEnabled});
return true;
}
};
if(!window.__golftop_legacy_listener_exists){
chrome.runtime.onMessage.addListener(window.__golftop_onMessage_fn);
}
console.log("[\x54\x65\x65\x38\x32] \uace8\ud504\ud0d1(\x69\x6e\x74\x72\x61\x2e\x67\x6f\x6c\x66\x74\x6f\x70\x2e\x6b\x72) \uc790\ub3d9\ub4f1\ub85d \ucf58\ud150\uce20 \uc2a4\ud06c\ub9bd\ud2b8 \ub85c\ub4dc \uc644\ub8cc (\x56\x65\x72 \x32\x2e\x30\x2e\x35\x33)");
const GTP_LAYOUT_STORAGE_KEY='\x67\x74\x70\x5f\x73\x6d\x61\x72\x74\x5f\x6c\x61\x79\x6f\x75\x74\x5f\x65\x6e\x61\x62\x6c\x65\x64';
const GTP_LAYOUT_STYLE_ID='\x67\x74\x70\x5f\x73\x6d\x61\x72\x74\x5f\x6c\x61\x79\x6f\x75\x74\x5f\x69\x6e\x6a\x65\x63\x74\x65\x64\x5f\x73\x74\x79\x6c\x65';
let __gtp_smart_layout_observer=null;
let __gtp_is_layout_updating=false;
let __gtp_layout_debounce_timer=null;
function _0x1026(){
return new Promise(resolve=>{
try{
chrome.storage.local.get([GTP_LAYOUT_STORAGE_KEY],(res)=>{
if(chrome.runtime.lastError||res[GTP_LAYOUT_STORAGE_KEY]===undefined){
const localVal=localStorage.getItem(GTP_LAYOUT_STORAGE_KEY);
resolve(localVal===null?true:localVal==='\x74\x72\x75\x65');
}else{
resolve(!!res[GTP_LAYOUT_STORAGE_KEY]);
}
});
}catch(e){
const localVal=localStorage.getItem(GTP_LAYOUT_STORAGE_KEY);
resolve(localVal===null?true:localVal==='\x74\x72\x75\x65');
}
});
}
function _0x1027(enabled){
try{
chrome.storage.local.set({[GTP_LAYOUT_STORAGE_KEY]:enabled});
}catch(e){}
try{
localStorage.setItem(GTP_LAYOUT_STORAGE_KEY,String(enabled));
}catch(e){}
}
function _0x1028(){
let style=document.getElementById(GTP_LAYOUT_STYLE_ID);
if(!style){
style=document.createElement('\x73\x74\x79\x6c\x65');
style.id=GTP_LAYOUT_STYLE_ID;
document.head.appendChild(style);
}
style.textContent=`
        /* ===== \uace8\ud504\ud0d1 \uace8\ud504\ub77d \uc644\ubcbd \uc77c\uce58 \uc2a4\ub9c8\ud2b8 \ub808\uc774\uc544\uc6c3 CSS ===== */

        /* 1. \uc0c1\ub2e8 \ud589: \ub2ec\ub825(\uc88c) + \ud544\ud130(\uc911) + \ud2b9\uc774\uc0ac\ud56d/\ud560\uc778\uadf8\ub9b0\ud53c(\uc6b0) 3\uce74\ub4dc \ub098\ub780\ud788 \ubc30\uce58 */
        body.gtp-smart-layout-active .gtp-smart-top-row,
        body.gtp-smart-layout-active tr.gtp-smart-top-row {
            display: flex !important;
            flex-wrap: wrap !important;
            width: 100% !important;
            box-sizing: border-box !important;
            align-items: flex-start !important;
            gap: 10px !important;
            height: auto !important;
            max-height: none !important;
            min-height: 0 !important;
            overflow: visible !important;
            margin-bottom: 10px !important;
        }

        /* [\uc0c1\ub2e8 \uc88c\uce21 \uc804\uccb4 \ucee8\ud14c\uc774\ub108]: \ub2ec\ub825 \ubc0f \uc794\uc5ec\ud0c0\uc784 \ud544\ud130 \ub798\ud37c (Column 1) */
        body.gtp-smart-layout-active .gtp-smart-col-date,
        body.gtp-smart-layout-active tr.gtp-smart-top-row > td.gtp-smart-col-date {
            order: 1 !important;
            display: flex !important;
            flex-direction: row !important;
            gap: 10px !important;
            flex: 0 0 auto !important;
            width: auto !important;
            max-width: none !important;
            height: 260px !important;
            min-height: 260px !important;
            max-height: 260px !important;
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
            box-shadow: none !important;
            overflow: visible !important;
            box-sizing: border-box !important;
        }

        /* [\uc0c1\ub2e8 1A]: \ud83d\udcc5 \ub2ec\ub825 \uce74\ub4dc (\ub9e8 \uc704 \uc88c\uce21) */
        body.gtp-smart-layout-active #gtp_smart_cal_box,
        body.gtp-smart-layout-active .gtp-smart-cal-card {
            flex: 0 0 240px !important;
            width: 240px !important;
            max-width: 240px !important;
            min-width: 240px !important;
            height: 260px !important;
            max-height: 260px !important;
            background: #ffffff !important;
            border: 1px solid #cbd5e1 !important;
            border-radius: 8px !important;
            padding: 6px 8px !important;
            box-sizing: border-box !important;
            overflow-y: auto !important;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
        }

        /* [\uc0c1\ub2e8 1B]: \ud83d\udd0d \ud544\ud130\uc120\ud0dd \uce74\ub4dc (\ub2ec\ub825 \uc6b0\uce21) */
        body.gtp-smart-layout-active #gtp_smart_filter_box,
        body.gtp-smart-layout-active .gtp-smart-filter-card {
            flex: 0 0 230px !important;
            width: 230px !important;
            max-width: 230px !important;
            min-width: 230px !important;
            height: 260px !important;
            max-height: 260px !important;
            background: #ffffff !important;
            border: 1px solid #cbd5e1 !important;
            border-radius: 8px !important;
            padding: 6px 8px !important;
            box-sizing: border-box !important;
            overflow-y: auto !important;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
        }

        /* [\uc0c1\ub2e8 \uc6b0\uce21 2]: \ud83d\udcdd \ud560\uc778\uadf8\ub9b0\ud53c / \uace8\ud504\uc7a5\ud2b9\uc774\uc0ac\ud56d \uce74\ub4dc (\ud544\ud130 \uc6b0\uce21) */
        body.gtp-smart-layout-active .gtp-smart-col-detail,
        body.gtp-smart-layout-active tr.gtp-smart-top-row > td.gtp-smart-col-detail {
            order: 2 !important;
            flex: 1 1 0 !important;
            min-width: 260px !important;
            width: auto !important;
            max-width: none !important;
            height: 260px !important;
            min-height: 260px !important;
            max-height: 260px !important;
            box-sizing: border-box !important;
            margin-left: 0 !important;
            padding: 6px 10px !important;
            background: #ffffff !important;
            border-radius: 8px !important;
            border: 1px solid #cbd5e1 !important;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
            display: flex !important;
            flex-direction: column !important;
            visibility: visible !important;
            overflow-y: auto !important;
        }

        body.gtp-smart-layout-active .gtp-smart-col-detail > * {
            max-width: 100% !important;
            width: 100% !important;
            visibility: visible !important;
        }

        /* \ud2b9\uc774\uc0ac\ud56d \ud5e4\ub354 \ubc43\uc9c0 */
        body.gtp-smart-layout-active .gtp-detail-header-styled {
            font-size: 11.5px !important;
            font-weight: 800 !important;
            color: #1e3a8a !important;
            background: #dbeafe !important;
            padding: 4px 8px !important;
            border-radius: 4px !important;
            margin-bottom: 6px !important;
            text-align: center !important;
            border: 1px solid #93c5fd !important;
            display: block !important;
            box-shadow: 0 1px 2px rgba(0,0,0,0.04) !important;
            user-select: none !important;
            flex-shrink: 0 !important;
        }

        /* [\uc911\ub2e8 \uc804\uccb4\ud3ed]: \u26f3 \uace8\ud504\uc7a5 \uc120\ud0dd \ubaa9\ub85d (Column 2) */
        body.gtp-smart-layout-active .gtp-smart-col-course,
        body.gtp-smart-layout-active tr.gtp-smart-top-row > td.gtp-smart-col-course {
            order: 3 !important;
            flex: 0 0 100% !important;
            max-width: 100% !important;
            min-width: 100% !important;
            width: 100% !important;
            box-sizing: border-box !important;
            margin-top: 10px !important;
            padding: 8px 10px !important;
            background: #ffffff !important;
            border-radius: 8px !important;
            border: 1px solid #cbd5e1 !important;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
            display: block !important;
            height: auto !important;
            max-height: 320px !important;
            overflow: hidden !important;
        }

        /* \uace8\ud504\uc7a5 \uc120\ud0dd \ub0b4\ubd80 \ubaa8\ub4e0 \ub798\ud37c 100% \uac00\ub85c\ud3ed \uac15\uc81c (250px \uc881\ud798 \ucc28\ub2e8) */
        body.gtp-smart-layout-active .gtp-smart-col-course > div,
        body.gtp-smart-layout-active .gtp-smart-col-course form,
        body.gtp-smart-layout-active .gtp-smart-col-course section,
        body.gtp-smart-layout-active .gtp-smart-col-course div[class*="body"],
        body.gtp-smart-layout-active .gtp-smart-col-course div[id*="scroll"],
        body.gtp-smart-layout-active #gtp_smart_regions_grid {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 100% !important;
            box-sizing: border-box !important;
        }

        /* 2. \uace8\ud504\uc7a5 \uc120\ud0dd \ubaa9\ub85d: \uace8\ud504\ub77d\ucc98\ub7fc 3\uac1c \uad8c\uc5ed\uc529 \ub098\ub780\ud788 \uadf8\ub9ac\ub4dc \ubc30\uce58:
           [\uacbd\uae30\ubd81\ubd80] [\uacbd\uae30\ub0a8\ubd80] [\ucda9\uccad\ub3c4]
           [\uac15\uc6d0\ub3c4]   [\uacbd\uc0c1\ub3c4]   [\uc804\ub77c\ub3c4]
           [\uc81c\uc8fc\ub3c4]
        */
        body.gtp-smart-layout-active #gtp_smart_regions_grid,
        body.gtp-smart-layout-active .gtp-regions-grid {
            display: grid !important;
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 10px !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 100% !important;
            box-sizing: border-box !important;
            align-items: stretch !important;
            max-height: 280px !important;
            overflow-y: auto !important;
            padding: 2px 2px 6px 2px !important;
        }

        /* \uad8c\uc5ed\ubcc4 \uce74\ub4dc \uc2a4\ud0c0\uc77c (\uace8\ud504\ub77d \uc2a4\ud0c0\uc77c\uc758 \ub3c5\ub9bd \uad8c\uc5ed \ubc15\uc2a4 - 1/3 \ub108\ube44 \uade0\ub4f1 \uaf49 \ucc44\uc6c0) */
        body.gtp-smart-layout-active .gtp-region-card {
            background: #f8fafc !important;
            border: 1px solid #cbd5e1 !important;
            border-radius: 6px !important;
            padding: 6px 8px !important;
            box-sizing: border-box !important;
            display: flex !important;
            flex-direction: column !important;
            min-width: 0 !important;
            width: 100% !important;
            max-height: 260px !important;
            overflow: hidden !important;
            box-shadow: 0 1px 2px rgba(0,0,0,0.03) !important;
        }

        /* \uad8c\uc5ed \uc81c\ubaa9 \uc2a4\ud0c0\uc77c (\ub179\uc0c9 \ubc43\uc9c0 \ud5e4\ub354) */
        body.gtp-smart-layout-active .gtp-region-header-styled {
            font-size: 11.5px !important;
            font-weight: 800 !important;
            color: #065f46 !important;
            background: #d1fae5 !important;
            padding: 3px 6px !important;
            border-radius: 4px !important;
            margin-bottom: 5px !important;
            text-align: center !important;
            border: 1px solid #6ee7b7 !important;
            display: block !important;
            box-shadow: 0 1px 2px rgba(0,0,0,0.04) !important;
            user-select: none !important;
            flex-shrink: 0 !important;
        }

        /* \uad8c\uc5ed \ub0b4\ubd80\uc758 \ubc84\ud2bc \uadf8\ub9ac\ub4dc (3\uac1c\uc529 \uade0\ub4f1 \ubc30\uce58 + \uce74\ub4dc \ub0b4\ubd80 \uc138\ub85c \uc2a4\ud06c\ub864) */
        body.gtp-smart-layout-active .gtp-region-buttons-wrap {
            display: grid !important;
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 4px !important;
            width: 100% !important;
            min-width: 100% !important;
            box-sizing: border-box !important;
            max-height: 210px !important;
            overflow-y: auto !important;
            padding-right: 2px !important;
        }

        /* \uace8\ud504\uc7a5 \uc120\ud0dd \ubc84\ud2bc 2\uc904 \uc904\ubc14\uafc8 \ubc0f \uc2a4\ud0c0\uc77c \ucd5c\uc801\ud654 */
        body.gtp-smart-layout-active .gtp-smart-course-btn {
            white-space: pre-line !important;
            word-break: keep-all !important;
            text-overflow: clip !important;
            line-height: 1.15 !important;
            font-size: 10.5px !important;
            min-height: 34px !important;
            height: auto !important;
            padding: 2px 2px !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            box-sizing: border-box !important;
            border-radius: 4px !important;
            background: #ffffff !important;
            border: 1px solid #cbd5e1 !important;
            color: #1e293b !important;
            cursor: pointer !important;
            transition: all 0.1s ease !important;
            width: 100% !important;
            min-width: 0 !important;
        }
        body.gtp-smart-layout-active .gtp-smart-course-btn:hover {
            background: #f1f5f9 !important;
            border-color: #94a3b8 !important;
        }

        /* \uc138\ub85c \uc2a4\ud06c\ub864\ubc14 \ucee4\uc2a4\ud140 \uc2a4\ud0c0\uc77c (\ub354 \ub69c\ub837\ud558\uace0 \ub9e4\ub044\ub7fd\uac8c) */
        body.gtp-smart-layout-active .gtp-regions-grid::-webkit-scrollbar,
        body.gtp-smart-layout-active .gtp-region-buttons-wrap::-webkit-scrollbar,
        body.gtp-smart-layout-active .gtp-smart-col-detail::-webkit-scrollbar,
        body.gtp-smart-layout-active #gtp_smart_cal_box::-webkit-scrollbar,
        body.gtp-smart-layout-active #gtp_smart_filter_box::-webkit-scrollbar,
        body.gtp-smart-layout-active .gtp-smart-col-date::-webkit-scrollbar {
            width: 5px !important;
        }
        body.gtp-smart-layout-active .gtp-regions-grid::-webkit-scrollbar-track,
        body.gtp-smart-layout-active .gtp-region-buttons-wrap::-webkit-scrollbar-track,
        body.gtp-smart-layout-active .gtp-smart-col-detail::-webkit-scrollbar-track,
        body.gtp-smart-layout-active #gtp_smart_cal_box::-webkit-scrollbar-track,
        body.gtp-smart-layout-active #gtp_smart_filter_box::-webkit-scrollbar-track,
        body.gtp-smart-layout-active .gtp-smart-col-date::-webkit-scrollbar-track {
            background: #f1f5f9 !important;
            border-radius: 4px !important;
        }
        body.gtp-smart-layout-active .gtp-regions-grid::-webkit-scrollbar-thumb,
        body.gtp-smart-layout-active .gtp-region-buttons-wrap::-webkit-scrollbar-thumb,
        body.gtp-smart-layout-active .gtp-smart-col-detail::-webkit-scrollbar-thumb,
        body.gtp-smart-layout-active #gtp_smart_cal_box::-webkit-scrollbar-thumb,
        body.gtp-smart-layout-active #gtp_smart_filter_box::-webkit-scrollbar-thumb,
        body.gtp-smart-layout-active .gtp-smart-col-date::-webkit-scrollbar-thumb {
            background: #94a3b8 !important;
            border-radius: 4px !important;
        }

        /* \ubaa8\ubc14\uc77c \ubd84\ud560\ud654\uba74 \ubbf8\ub514\uc5b4 \ucffc\ub9ac (\uac00\ub85c\ud3ed 900px \uc774\ud558) */
        @media (max-width: 900px) {
            body.gtp-smart-layout-active {
                font-size: 11px !important;
            }
            body.gtp-smart-layout-active .gtp-smart-col-date {
                flex-wrap: wrap !important;
            }
        }
    `;
}
let __gtp_cached_row=null;
let __gtp_cached_date_col=null;
let __gtp_cached_course_col=null;
let __gtp_cached_detail_col=null;
let __gtp_cached_common_parent=null;
let __gtp_cached_form_container=null;
let __gtp_cached_detected_regions=[];
let __gtp_cached_optimized_btns=[];
function _0x1029(rawTxt,titleVal){
let text=rawTxt;
if(titleVal&&titleVal.length>rawTxt.length&&!titleVal.includes('\ud074\ub9ad')){
text=titleVal;
}
const clean=text.replace(/\s+/g,' ').trim();
if(clean.includes('\ub0a8\uc591\uc8fc')){
return'\ub0a8\uc591\uc8fc\x63\x63\n(\x39\ud640)';
}
if(clean.includes('\uace8\ud504\uc874')&&(clean.includes('\uc548\uc131\x57')||clean.includes('\uc548\uc131\x77')||(clean.includes('\uc548')&&!clean.includes('\uc548\uc131\x48')))){
return'\uace8\ud504\uc874\n\uc548\uc131\x57';
}
if(clean.includes('\uace8\ud504\uc874')&&clean.includes('\uc548\uc131\x48')){
return'\uace8\ud504\uc874\n\uc548\uc131\x48';
}
if(clean.includes('\uace8\ud504\uc874')&&clean.includes('\uc774')){
return'\uace8\ud504\uc874\n\uc774\ucc9c';
}
if(clean.includes('\uace8\ud504\uc874')&&clean.includes('\uc1a1\ub3c4')){
return'\uace8\ud504\uc874\n\uc1a1\ub3c4';
}
if(clean.includes('\uace8\ud504\uc874')&&clean.includes('\uc9c4\ucc9c')){
return'\uace8\ud504\uc874\n\uc9c4\ucc9c';
}
if(clean.includes('\uace8\ud504\uc874')&&clean.includes('\ucc9c\uc548')){
return'\uace8\ud504\uc874\n\ucc9c\uc548';
}
if(clean.includes('\uace8\ud504\uc874')&&clean.includes('\ud654\ub791')){
return'\uace8\ud504\uc874\n\ud654\ub791';
}
if(clean.includes('\ubca0\uc5b4\uc988')){
return'\ubca0\uc5b4\uc988\n\ubca0\uc2a4\ud2b8';
}
if(clean.includes('\ube44\uc5d0\uc774\ube44\uc2a4')&&(clean.includes('\x2e\x2e\x2e')||clean.includes('\u2026')||clean.includes('\x50')||clean.includes('\x70')||clean.includes('\ud37c\ube14\ub9ad'))){
return'\ube44\uc5d0\uc774\ube44\uc2a4\ud0c0\n(\x50)';
}
if(clean==='\ube44\uc5d0\uc774\ube44\uc2a4\ud0c0'||clean.startsWith('\ube44\uc5d0\uc774\ube44\uc2a4\ud0c0')){
return'\ube44\uc5d0\uc774\n\ube44\uc2a4\ud0c0';
}
if(clean.includes('\uce90\uc2ac\ub809\uc2a4')){
return'\uce90\uc2ac\ub809\uc2a4\n\ud558\ub0a8';
}
if(clean.includes('\ud074\ub7fd\x37\x32')&&clean.includes('\uc624\uc158')){
return'\ud074\ub7fd\x37\x32\n(\uc624\uc158)';
}
if(clean.includes('\ud074\ub7fd\x37\x32')&&clean.includes('\ud558\ub298')){
return'\ud074\ub7fd\x37\x32\n(\ud558\ub298)';
}
if(clean.includes('\uc36c\ubc38\ub9ac')&&(clean.includes('\uc5ec\uc8fc')||clean.includes('\uacbd\uae30'))){
return'\uc36c\ubc38\ub9ac\n\uc5ec\uc8fc';
}
if(clean.includes('\uc36c\ubc38\ub9ac')&&(clean.includes('\uc74c\uc131')||clean.includes('\ucda9\uccad'))){
return'\uc36c\ubc38\ub9ac\n\uc74c\uc131';
}
if(clean.includes('\ub808\uc778\ubcf4\uc6b0')){
return'\ub808\uc778\ubcf4\uc6b0\n\ud790\uc2a4';
}
if(clean.includes('\ubcf4\ub839')){
return'\ubcf4\ub839\n\ubca0\uc774\uc2a4';
}
if(clean.includes('\ubaa8\uce74')){
return'\ubaa8\uce74\n(\uad6c\x3a\ub5bc\uc81c\ubca0)';
}
if(clean.includes('\uc784\ud398\ub9ac\uc5bc')){
return'\uc784\ud398\ub9ac\uc5bc\n\ub808\uc774\ud06c';
}
if(clean.includes('\ub300\uc601\ubca0\uc774\uc2a4')){
return'\ub300\uc601\n\ubca0\uc774\uc2a4\x63\x63';
}
if(clean.includes('\ub300\uc601\ud790\uc2a4')){
return'\ub300\uc601\n\ud790\uc2a4\x63\x63';
}
if(clean.includes('\ub85c\uc584\ud3ec\ub808')){
return'\ub85c\uc584\n\ud3ec\ub808\x63\x63';
}
if(clean.includes('\uc18d\ub9ac\uc0b0')){
return'\uc18d\ub9ac\uc0b0\n\x63\x63';
}
if(clean.includes('\uc194\ub77c\uace0')){
return'\uc194\ub77c\uace0\n\x63\x63';
}
if(clean.includes('\uc62c\ub370\uc774')){
return'\uc62c\ub370\uc774\n\x63\x63';
}
if(clean.includes('\ud50c\ub77c\ubc0d\uace0')){
return'\ud50c\ub77c\ubc0d\uace0\n\x63\x63';
}
if(clean.includes('\ud788\ub4e0\ubc38\ub9ac')){
return'\ud788\ub4e0\n\ubc38\ub9ac\x63\x63';
}
if(clean.includes('\ubca0\uc2a4\ud2b8\ubc38\ub9ac')){
return'\ubca0\uc2a4\ud2b8\n\ubc38\ub9ac\x63\x63';
}
if(clean.includes('\ube44\uc804\ud790\uc2a4')){
return'\ube44\uc804\n\ud790\uc2a4\x63\x63';
}
if(clean.includes('\uc11c\uc6b8\ud55c\uc591')){
return'\uc11c\uc6b8\n\ud55c\uc591\x63\x63';
}
if(clean.includes('\ud3ec\ub808\uc2a4\ud2b8\ud790')){
return'\ud3ec\ub808\uc2a4\ud2b8\n\ud790\x63\x63';
}
if(clean.includes('\ud55c\uc591\ud30c\uc778')){
return'\ud55c\uc591\n\ud30c\uc778\x63\x63';
}
if(clean.includes('\uac15\ub0a8\x33\x30\x30')){
return'\uac15\ub0a8\n\x33\x30\x30\x63\x63';
}
if(clean.includes('\uadf8\ub9b0\ud790')){
return'\uadf8\ub9b0\ud790\n\x63\x63';
}
if(clean.includes('\ud06c\ub85c\uc2a4\ube44')){
return'\ub354\n\ud06c\ub85c\uc2a4\ube44';
}
if(clean.includes('\ub77c\ube44\ub3cc')){
return'\ub77c\ube44\ub3cc\n\x63\x63';
}
if(clean.includes('\ub9ac\ubca0\ub77c')){
return'\ub9ac\ubca0\ub77c\n\x63\x63';
}
if(clean.includes('\uc138\ud604')){
return'\uc138\ud604\n\x63\x63';
}
if(clean.includes('\uc2e0\ub77c')){
return'\uc2e0\ub77c\n\x63\x63';
}
if(clean.includes('\uc2e0\uc548')){
return'\uc2e0\uc548\n\x63\x63';
}
if(clean.includes('\uc591\ud3c9\x54\x50\x43')||clean.includes('\uc591\ud3c9\x74\x70\x63')){
return'\uc591\ud3c9\n\x54\x50\x43';
}
if(clean.includes('\uc6a9\uc778\x63\x63')||clean==='\uc6a9\uc778'){
return'\uc6a9\uc778\n\x63\x63';
}
if(clean.includes('\uc9c0\uc0b0\x63\x63')||clean==='\uc9c0\uc0b0'){
return'\uc9c0\uc0b0\n\x63\x63';
}
if(clean.includes('\ud06c\ub9ac\uc2a4\ubc38\ub9ac')){
return'\ud06c\ub9ac\uc2a4\n\ubc38\ub9ac';
}
if(clean.includes('\ud0dc\uad11')){
return'\ud0dc\uad11\n\x63\x63';
}
if(clean.includes('\uc601\uad11')){
return'\uc601\uad11\n\x63\x63';
}
if(clean.includes('\ud30c\uc778\ud06c\ub9ac\ud06c')){
return'\ud30c\uc778\n\ud06c\ub9ac\ud06c';
}
if(clean.includes('\ud55c\uc6d0')){
return'\ud55c\uc6d0\n\x63\x63';
}
if(clean.includes('\ud574\uc194\ub9ac\uc544')){
return'\ud574\uc194\ub9ac\uc544\n\x63\x63';
}
if(clean.includes('(')){
return clean.replace('(','\n(');
}
if(clean.includes('\x5f')){
return clean.replace('\x5f','\n');
}
if(clean.length>=6&&clean.endsWith('\x63\x63')){
return clean.slice(0,-2)+'\n\x63\x63';
}
return clean;
}
function _0x102a(){
const allHeaders=Array.from(document.querySelectorAll('\x74\x68, \x74\x64, \x64\x69\x76, \x73\x70\x61\x6e, \x68\x31, \x68\x32, \x68\x33, \x68\x34, \x68\x35, \x68\x36, \x62, \x73\x74\x72\x6f\x6e\x67, \x70'));
const courseHeader=allHeaders.find(el=>{
if(el.children.length>2)return false;
const t=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
return t==='\uace8\ud504\uc7a5\uc120\ud0dd'||t.startsWith('\uace8\ud504\uc7a5\uc120\ud0dd');
});
if(!courseHeader){
return null;
}
let cur=courseHeader;
let rowContainer=null;
let colDate=null;
let colCourse=null;
let colDetail=null;
for(let step=0;step<8&&cur&&cur.parentElement&&cur.parentElement!==document.body;step++){
const parent=cur.parentElement;
const children=Array.from(parent.children);
const dateChild=children.find(c=>{
const txt=c.innerText||c.textContent||'';
return(txt.includes('\ub0a0\uc9dc \uc120\ud0dd')||txt.includes('\ub0a0\uc9dc\uc120\ud0dd'))&&!txt.includes('\uace8\ud504\uc7a5 \uc120\ud0dd');
});
const courseChild=children.find(c=>{
const txt=c.innerText||c.textContent||'';
return(txt.includes('\uace8\ud504\uc7a5 \uc120\ud0dd')||txt.includes('\uace8\ud504\uc7a5\uc120\ud0dd')||txt.includes('\uacbd\uae30\ubd81\ubd80'))&&!txt.includes('\ub0a0\uc9dc \uc120\ud0dd');
});
if(dateChild&&courseChild){
rowContainer=parent;
colDate=dateChild;
colCourse=courseChild;
const detailChild=children.find(c=>{
if(c===colDate||c===colCourse)return false;
const txt=c.innerText||c.textContent||'';
return(txt.includes('\ub0b4\uc6a9')&&txt.includes('\uc791\uc131\uc77c'))||txt.includes('\uace8\ud504\uc7a5\uc744 \uc120\ud0dd')||txt.includes('\uace8\ud504\uc7a5\uc744\uc120\ud0dd')||txt.includes('\ud2b9\uc774\uc0ac\ud56d')||txt.includes('\ud560\uc778');
});
if(detailChild){
colDetail=detailChild;
}else{
const courseIdx=children.indexOf(colCourse);
if(courseIdx!==-1&&courseIdx+1<children.length){
for(let i=courseIdx+1;i<children.length;i++){
const next=children[i];
const nextTxt=next.innerText||next.textContent||'';
if(!nextTxt.includes('\uc794\uc5ec\ud0c0\uc784')&&!nextTxt.includes('\uc2e0\uccad\uc77c\uc790')&&!nextTxt.includes('\uc2e0\uccad\uad6c\ubd84')&&!nextTxt.includes('\uc2e0\uccad \uad6c\ubd84')){
colDetail=next;
break;
}
}
}
}
break;
}
cur=parent;
}
if(!colDetail&&rowContainer){
const candidates=Array.from(rowContainer.querySelectorAll('\x74\x64, \x64\x69\x76, \x73\x65\x63\x74\x69\x6f\x6e')).filter(el=>{
if(el===colDate||el===colCourse)return false;
if(colDate&&colDate.contains(el))return false;
if(colCourse&&colCourse.contains(el))return false;
const t=el.innerText||el.textContent||'';
return((t.includes('\ub0b4\uc6a9')&&t.includes('\uc791\uc131\uc77c'))||t.includes('\uace8\ud504\uc7a5\uc744 \uc120\ud0dd')||t.includes('\uace8\ud504\uc7a5\uc744\uc120\ud0dd'))&&!t.includes('\uc794\uc5ec\ud0c0\uc784');
});
if(candidates.length>0){
let best=candidates[0];
while(best.parentElement&&best.parentElement!==rowContainer){
best=best.parentElement;
}
colDetail=best;
}
}
if(colDetail){
const dTxt=colDetail.innerText||colDetail.textContent||'';
if(colDetail===colDate||colDetail===colCourse||dTxt.includes('\uacbd\uae30\ubd81\ubd80')||dTxt.includes('\uacbd\uae30\ub0a8\ubd80')){
colDetail=null;
}
}
return{rowContainer,colDate,colCourse,colDetail};
}
function _0x102b(colDate){
if(!colDate)return null;
let calBox=colDate.querySelector('\x23\x67\x74\x70\x5f\x73\x6d\x61\x72\x74\x5f\x63\x61\x6c\x5f\x62\x6f\x78');
let filterBox=colDate.querySelector('\x23\x67\x74\x70\x5f\x73\x6d\x61\x72\x74\x5f\x66\x69\x6c\x74\x65\x72\x5f\x62\x6f\x78');
if(calBox&&filterBox){
calBox.style.setProperty('\x64\x69\x73\x70\x6c\x61\x79','\x62\x6c\x6f\x63\x6b','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
filterBox.style.setProperty('\x64\x69\x73\x70\x6c\x61\x79','\x62\x6c\x6f\x63\x6b','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
return{calBox,filterBox};
}
const allDescendants=Array.from(colDate.querySelectorAll('\x64\x69\x76, \x74\x61\x62\x6c\x65, \x73\x65\x63\x74\x69\x6f\x6e, \x66\x6f\x72\x6d, \x70, \x73\x70\x61\x6e, \x68\x31, \x68\x32, \x68\x33, \x68\x34, \x68\x35, \x68\x36, \x62, \x73\x74\x72\x6f\x6e\x67'));
const filterHeader=allDescendants.find(el=>{
if(el.children.length>3)return false;
const txt=(el.innerText||el.textContent||'').trim().replace(/\s+/g,'');
return txt.includes('\uc794\uc5ec\ud0c0\uc784\ud544\ud130')||txt.includes('\ud544\ud130\uc911\ubcf5\ud5c8\uc6a9')||(txt.includes('\ud544\ud130')&&(txt.includes('\uc911\ubcf5')||txt.includes('\ud5c8\uc6a9')||txt.includes('\ucd08\uae30\ud654')));
});
if(!filterHeader){
console.warn("[\uace8\ud504\ud0d1 \uc2a4\ub9c8\ud2b8\ubdf0] \u26a0\ufe0f \uc794\uc5ec\ud0c0\uc784 \ud544\ud130 \ud5e4\ub354\ub97c \ucc3e\uc9c0 \ubabb\ud568");
return null;
}
let container=colDate;
let filterTopChild=filterHeader;
while(filterTopChild.parentElement&&filterTopChild.parentElement!==colDate){
filterTopChild=filterTopChild.parentElement;
}
if(colDate.children.length===1&&filterTopChild===colDate.firstElementChild){
let inner=filterHeader;
while(inner.parentElement&&inner.parentElement!==colDate.firstElementChild){
inner=inner.parentElement;
}
container=colDate.firstElementChild;
filterTopChild=inner;
}
const children=Array.from(container.children);
const filterIdx=children.indexOf(filterTopChild);
if(filterIdx<0)return null;
calBox=document.createElement('\x64\x69\x76');
calBox.id='\x67\x74\x70\x5f\x73\x6d\x61\x72\x74\x5f\x63\x61\x6c\x5f\x62\x6f\x78';
calBox.className='\x67\x74\x70-\x73\x6d\x61\x72\x74-\x63\x61\x6c-\x63\x61\x72\x64';
filterBox=document.createElement('\x64\x69\x76');
filterBox.id='\x67\x74\x70\x5f\x73\x6d\x61\x72\x74\x5f\x66\x69\x6c\x74\x65\x72\x5f\x62\x6f\x78';
filterBox.className='\x67\x74\x70-\x73\x6d\x61\x72\x74-\x66\x69\x6c\x74\x65\x72-\x63\x61\x72\x64';
for(let i=0;i<filterIdx;i++){
calBox.appendChild(children[i]);
}
for(let i=filterIdx;i<children.length;i++){
filterBox.appendChild(children[i]);
}
container.appendChild(calBox);
container.appendChild(filterBox);
container.style.setProperty('\x64\x69\x73\x70\x6c\x61\x79','\x66\x6c\x65\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
container.style.setProperty('\x66\x6c\x65\x78-\x64\x69\x72\x65\x63\x74\x69\x6f\x6e','\x72\x6f\x77','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
container.style.setProperty('\x67\x61\x70','\x31\x30\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
container.style.setProperty('\x61\x6c\x69\x67\x6e-\x69\x74\x65\x6d\x73','\x66\x6c\x65\x78-\x73\x74\x61\x72\x74','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
container.style.setProperty('\x77\x69\x64\x74\x68','\x61\x75\x74\x6f','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
container.style.setProperty('\x6d\x61\x78-\x77\x69\x64\x74\x68','\x6e\x6f\x6e\x65','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
container.style.setProperty('\x68\x65\x69\x67\x68\x74','\x32\x36\x30\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
container.style.setProperty('\x6d\x69\x6e-\x68\x65\x69\x67\x68\x74','\x32\x36\x30\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
container.style.setProperty('\x6d\x61\x78-\x68\x65\x69\x67\x68\x74','\x32\x36\x30\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
if(container!==colDate){
colDate.style.setProperty('\x64\x69\x73\x70\x6c\x61\x79','\x66\x6c\x65\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDate.style.setProperty('\x66\x6c\x65\x78-\x64\x69\x72\x65\x63\x74\x69\x6f\x6e','\x72\x6f\x77','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDate.style.setProperty('\x67\x61\x70','\x31\x30\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDate.style.setProperty('\x77\x69\x64\x74\x68','\x61\x75\x74\x6f','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDate.style.setProperty('\x6d\x61\x78-\x77\x69\x64\x74\x68','\x6e\x6f\x6e\x65','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDate.style.setProperty('\x68\x65\x69\x67\x68\x74','\x32\x36\x30\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDate.style.setProperty('\x6d\x69\x6e-\x68\x65\x69\x67\x68\x74','\x32\x36\x30\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDate.style.setProperty('\x6d\x61\x78-\x68\x65\x69\x67\x68\x74','\x32\x36\x30\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
}
console.log("[\uace8\ud504\ud0d1 \uc2a4\ub9c8\ud2b8\ubdf0] \ud83d\udcc5 \ub2ec\ub825 \ubc0f \ud83d\udd0d \ud544\ud130\uc120\ud0dd \x32\uac1c \uce74\ub4dc \uc88c\uc6b0 \ubd84\ud560 \uc644\ub8cc");
return{calBox,filterBox};
}
function _0x102c(colDate){
if(!colDate)return;
const calBox=colDate.querySelector('\x23\x67\x74\x70\x5f\x73\x6d\x61\x72\x74\x5f\x63\x61\x6c\x5f\x62\x6f\x78');
const filterBox=colDate.querySelector('\x23\x67\x74\x70\x5f\x73\x6d\x61\x72\x74\x5f\x66\x69\x6c\x74\x65\x72\x5f\x62\x6f\x78');
if(calBox&&filterBox){
const parent=calBox.parentElement;
while(calBox.firstChild){
parent.insertBefore(calBox.firstChild,calBox);
}
while(filterBox.firstChild){
parent.insertBefore(filterBox.firstChild,filterBox);
}
calBox.remove();
filterBox.remove();
parent.style.removeProperty('\x64\x69\x73\x70\x6c\x61\x79');
parent.style.removeProperty('\x66\x6c\x65\x78-\x64\x69\x72\x65\x63\x74\x69\x6f\x6e');
parent.style.removeProperty('\x67\x61\x70');
parent.style.removeProperty('\x61\x6c\x69\x67\x6e-\x69\x74\x65\x6d\x73');
parent.style.removeProperty('\x68\x65\x69\x67\x68\x74');
parent.style.removeProperty('\x6d\x69\x6e-\x68\x65\x69\x67\x68\x74');
parent.style.removeProperty('\x6d\x61\x78-\x68\x65\x69\x67\x68\x74');
}
}
function _0x102d(colCourse){
if(!colCourse)return null;
const candidates=[colCourse,...Array.from(colCourse.querySelectorAll('\x64\x69\x76, \x75\x6c, \x73\x65\x63\x74\x69\x6f\x6e'))];
let best=null;
for(const el of candidates){
const txt=el.innerText||el.textContent||'';
if(txt.includes('\uacbd\uae30\ubd81\ubd80')&&txt.includes('\uacbd\uae30\ub0a8\ubd80')){
if(!best||best.contains(el)){
best=el;
}
}
}
return best||colCourse;
}
function _0x102e(colCourse){
if(!colCourse)return[];
const elements=Array.from(colCourse.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x61, [\x72\x6f\x6c\x65="\x62\x75\x74\x74\x6f\x6e"], \x69\x6e\x70\x75\x74[\x74\x79\x70\x65="\x62\x75\x74\x74\x6f\x6e"], \x73\x70\x61\x6e, \x64\x69\x76, \x6c\x69, \x74\x64, \x6c\x61\x62\x65\x6c'));
const candidates=elements.filter(el=>{
if(el.offsetHeight<=0&&el.offsetWidth<=0)return false;
if(el.children.length>=3)return false;
const txt=(el.innerText||el.textContent||'').trim();
if(txt.length<2||txt.length>25)return false;
const cleanT=txt.replace(/\s+/g,'');
if(['\uace8\ud504\uc7a5\uc120\ud0dd','\uc9c0\uc5ed\ubcc4','\uacbd\uae30\ubd81\ubd80','\uacbd\uae30\ub0a8\ubd80','\ucda9\uccad\ub3c4','\uac15\uc6d0','\uc804\ub77c','\uacbd\uc0c1','\uc81c\uc8fc','\uac15\uc6d0\ub3c4','\uc804\ub77c\ub3c4','\uacbd\uc0c1\ub3c4','\uc81c\uc8fc\ub3c4','\uc870\ud68c','\ub0b4\uc6a9','\uc791\uc131\uc77c','\ub0a0\uc9dc\uc120\ud0dd','\ucd08\uae30\ud654','\ud544\ud130','\ub2ec\ub825','\uae30\uac04'].includes(cleanT)){
return false;
}
return true;
});
const result=[];
candidates.forEach(el=>{
let p=el.parentElement;
let isChildOfOther=false;
while(p&&p!==colCourse){
if(candidates.includes(p)&&(p.tagName==='\x42\x55\x54\x54\x4f\x4e'||p.tagName==='\x41'||p.getAttribute('\x72\x6f\x6c\x65')==='\x62\x75\x74\x74\x6f\x6e'||p.classList.contains('\x62\x74\x6e'))){
isChildOfOther=true;
break;
}
p=p.parentElement;
}
if(!isChildOfOther){
result.push(el);
}
});
return result;
}
function _0x102f(colCourse){
if(!colCourse)return;
let gridContainer=colCourse.querySelector('\x23\x67\x74\x70\x5f\x73\x6d\x61\x72\x74\x5f\x72\x65\x67\x69\x6f\x6e\x73\x5f\x67\x72\x69\x64');
if(!gridContainer){
gridContainer=document.createElement('\x64\x69\x76');
gridContainer.id='\x67\x74\x70\x5f\x73\x6d\x61\x72\x74\x5f\x72\x65\x67\x69\x6f\x6e\x73\x5f\x67\x72\x69\x64';
gridContainer.className='\x67\x74\x70-\x72\x65\x67\x69\x6f\x6e\x73-\x67\x72\x69\x64';
}
gridContainer.style.setProperty('\x64\x69\x73\x70\x6c\x61\x79','\x67\x72\x69\x64','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
gridContainer.style.setProperty('\x67\x72\x69\x64-\x74\x65\x6d\x70\x6c\x61\x74\x65-\x63\x6f\x6c\x75\x6d\x6e\x73','\x72\x65\x70\x65\x61\x74(\x33, \x6d\x69\x6e\x6d\x61\x78(\x30, \x31\x66\x72))','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
gridContainer.style.setProperty('\x67\x61\x70','\x31\x30\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
gridContainer.style.setProperty('\x77\x69\x64\x74\x68','\x31\x30\x30%','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
gridContainer.style.setProperty('\x6d\x61\x78-\x77\x69\x64\x74\x68','\x31\x30\x30%','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
gridContainer.style.setProperty('\x6d\x69\x6e-\x77\x69\x64\x74\x68','\x31\x30\x30%','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
gridContainer.style.setProperty('\x62\x6f\x78-\x73\x69\x7a\x69\x6e\x67','\x62\x6f\x72\x64\x65\x72-\x62\x6f\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
gridContainer.style.setProperty('\x61\x6c\x69\x67\x6e-\x69\x74\x65\x6d\x73','\x73\x74\x72\x65\x74\x63\x68','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
gridContainer.style.setProperty('\x6d\x61\x78-\x68\x65\x69\x67\x68\x74','\x32\x38\x30\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
gridContainer.style.setProperty('\x6f\x76\x65\x72\x66\x6c\x6f\x77-\x79','\x61\x75\x74\x6f','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
gridContainer.style.setProperty('\x70\x61\x64\x64\x69\x6e\x67','\x32\x70\x78 \x32\x70\x78 \x36\x70\x78 \x32\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
const regionList=[
{name:'\uacbd\uae30\ubd81\ubd80',match:(t)=>t.includes('\uacbd\uae30\ubd81\ubd80')||t==='\ubd81\ubd80'},
{name:'\uacbd\uae30\ub0a8\ubd80',match:(t)=>t.includes('\uacbd\uae30\ub0a8\ubd80')||t==='\ub0a8\ubd80'},
{name:'\ucda9\uccad\ub3c4',match:(t)=>t.includes('\ucda9\uccad')},
{name:'\uac15\uc6d0\ub3c4',match:(t)=>t.includes('\uac15\uc6d0')},
{name:'\uacbd\uc0c1\ub3c4',match:(t)=>t.includes('\uacbd\uc0c1')||t.includes('\uc601\ub0a8')},
{name:'\uc804\ub77c\ub3c4',match:(t)=>t.includes('\uc804\ub77c')||t.includes('\ud638\ub0a8')},
{name:'\uc81c\uc8fc\ub3c4',match:(t)=>t.includes('\uc81c\uc8fc')}
];
const allBtns=_0x102e(colCourse);
if(allBtns.length===0)return;
const scrollEl=_0x102d(colCourse)||colCourse;
const allTextEls=Array.from(scrollEl.querySelectorAll('\x68\x31, \x68\x32, \x68\x33, \x68\x34, \x68\x35, \x68\x36, \x74\x68, \x74\x64, \x64\x69\x76, \x73\x70\x61\x6e, \x70, \x62, \x73\x74\x72\x6f\x6e\x67, \x64\x74, \x6c\x69'));
const detectedHeaders=[];
for(const el of allTextEls){
if(el.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x61\x2e\x62\x74\x6e, \x2e\x62\x74\x6e').length>0)continue;
if(el.children.length>2)continue;
const cleanT=(el.innerText||el.textContent||'').trim().replace(/[\s\[\]\-:_]/g,'');
for(const def of regionList){
if(def.match(cleanT)){
if(!detectedHeaders.some(d=>d.name===def.name)){
detectedHeaders.push({name:def.name,el});
}
break;
}
}
}
detectedHeaders.sort((a,b)=>{
const pos=a.el.compareDocumentPosition(b.el);
if(pos&Node.DOCUMENT_POSITION_FOLLOWING)return-1;
if(pos&Node.DOCUMENT_POSITION_PRECEDING)return 1;
return 0;
});
__gtp_cached_detected_regions=detectedHeaders;
const regionCardsMap=new Map();
regionList.forEach(reg=>{
let card=gridContainer.querySelector(`.gtp-region-card[data-gtp-region="${reg.name}"]`);
let btnsWrap;
if(!card){
card=document.createElement('\x64\x69\x76');
card.className='\x67\x74\x70-\x72\x65\x67\x69\x6f\x6e-\x63\x61\x72\x64';
card.dataset.gtpRegion=reg.name;
const headerBadge=document.createElement('\x64\x69\x76');
headerBadge.className='\x67\x74\x70-\x72\x65\x67\x69\x6f\x6e-\x68\x65\x61\x64\x65\x72-\x73\x74\x79\x6c\x65\x64';
headerBadge.innerText=`[${reg.name}]`;
card.appendChild(headerBadge);
btnsWrap=document.createElement('\x64\x69\x76');
btnsWrap.className='\x67\x74\x70-\x72\x65\x67\x69\x6f\x6e-\x62\x75\x74\x74\x6f\x6e\x73-\x77\x72\x61\x70';
card.appendChild(btnsWrap);
gridContainer.appendChild(card);
}else{
btnsWrap=card.querySelector('\x2e\x67\x74\x70-\x72\x65\x67\x69\x6f\x6e-\x62\x75\x74\x74\x6f\x6e\x73-\x77\x72\x61\x70');
}
card.style.setProperty('\x77\x69\x64\x74\x68','\x31\x30\x30%','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
card.style.setProperty('\x6d\x69\x6e-\x77\x69\x64\x74\x68','\x30','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
card.style.setProperty('\x62\x6f\x78-\x73\x69\x7a\x69\x6e\x67','\x62\x6f\x72\x64\x65\x72-\x62\x6f\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
btnsWrap.style.setProperty('\x64\x69\x73\x70\x6c\x61\x79','\x67\x72\x69\x64','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
btnsWrap.style.setProperty('\x67\x72\x69\x64-\x74\x65\x6d\x70\x6c\x61\x74\x65-\x63\x6f\x6c\x75\x6d\x6e\x73','\x72\x65\x70\x65\x61\x74(\x33, \x6d\x69\x6e\x6d\x61\x78(\x30, \x31\x66\x72))','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
btnsWrap.style.setProperty('\x67\x61\x70','\x34\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
btnsWrap.style.setProperty('\x77\x69\x64\x74\x68','\x31\x30\x30%','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
btnsWrap.style.setProperty('\x6d\x69\x6e-\x77\x69\x64\x74\x68','\x31\x30\x30%','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
btnsWrap.style.setProperty('\x62\x6f\x78-\x73\x69\x7a\x69\x6e\x67','\x62\x6f\x72\x64\x65\x72-\x62\x6f\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
regionCardsMap.set(reg.name,{card,btnsWrap});
});
function _0x1030(btn){
const rawTxt=(btn.dataset.gtpOrigText||btn.innerText||btn.textContent||'').trim().replace(/\s+/g,'');
if(rawTxt.includes('\uc601\uad11'))return'\uc804\ub77c\ub3c4';
if(rawTxt.includes('\uc2a4\ud504\ub9c1\ub370\uc77c')||rawTxt.includes('\uc5d8\ub9ac\uc2dc\uc548')||rawTxt.includes('\ub77c\uc628')||rawTxt.includes('\ud0c0\ubbf8\uc6b0\uc2a4')||rawTxt.includes('\uc5d0\ucf54\ub79c\ub4dc')||rawTxt.includes('\uc81c\uc8fc'))return'\uc81c\uc8fc\ub3c4';
if(rawTxt.includes('\ubca8\ub77c\uc2a4\ud1a4')||rawTxt.includes('\ube14\ub799\ubc38\ub9ac')||rawTxt.includes('\uc0e4\uc778\ub370\uc77c')||rawTxt.includes('\ub3d9\uc6d0\uc36c\ubc38\ub9ac')||rawTxt.includes('\ube44\ucf58\ud790\uc2a4')||rawTxt.includes('\uc124\uc545'))return'\uac15\uc6d0\ub3c4';
if(rawTxt.includes('\uc2a4\ud1a4\ube44\uce58')||rawTxt.includes('\uc2a4\ud504\ub9c1\ud790')||rawTxt.includes('\ud074\ub7fd\ub514\uac70\ucc3d')||rawTxt.includes('\ub9c8\uc6b0\ub098'))return'\uacbd\uc0c1\ub3c4';
if(rawTxt.includes('\ub300\uc601')||rawTxt.includes('\ub85c\uc584\ud3ec\ub808')||rawTxt.includes('\uc18d\ub9ac\uc0b0')||rawTxt.includes('\uc194\ub77c\uace0')||rawTxt.includes('\uc62c\ub370\uc774')||rawTxt.includes('\ud50c\ub77c\ubc0d\uace0')||rawTxt.includes('\ud788\ub4e0\ubc38\ub9ac')||rawTxt.includes('\ub808\uc778\ubcf4\uc6b0')||rawTxt.includes('\ubcf4\ub839')||rawTxt.includes('\ubaa8\uce74')||rawTxt.includes('\uc784\ud398\ub9ac\uc5bc')||rawTxt.includes('\uc9c4\ucc9c')||rawTxt.includes('\ucc9c\uc548')||rawTxt.includes('\ud654\ub791')||rawTxt.includes('\ub5bc\uc81c\ubca0'))return'\ucda9\uccad\ub3c4';
if(rawTxt.includes('\uace0\uc591')||rawTxt.includes('\ub0a8\uc591\uc8fc')||rawTxt.includes('\ubca0\uc2a4\ud2b8\ubc38\ub9ac')||rawTxt.includes('\ube44\uc804\ud790\uc2a4')||rawTxt.includes('\uc11c\uc6b8\ud55c\uc591')||rawTxt.includes('\ud30c\uc8fc')||rawTxt.includes('\ud3ec\ub808\uc2a4\ud2b8\ud790')||rawTxt.includes('\ud55c\uc591\ud30c\uc778'))return'\uacbd\uae30\ubd81\ubd80';
if(detectedHeaders.length>0){
let assigned=detectedHeaders[0].name;
for(let i=0;i<detectedHeaders.length;i++){
const h=detectedHeaders[i].el;
const pos=h.compareDocumentPosition(btn);
if(pos&Node.DOCUMENT_POSITION_FOLLOWING){
assigned=detectedHeaders[i].name;
}
}
return assigned;
}
return'\uacbd\uae30\ub0a8\ubd80';
}
allBtns.forEach(btn=>{
const regName=_0x1030(btn);
const regData=regionCardsMap.get(regName);
if(regData){
if(!btn.__gtp_orig_parent){
btn.__gtp_orig_parent=btn.parentElement;
btn.__gtp_orig_next=btn.nextSibling;
}
if(btn.parentElement!==regData.btnsWrap){
regData.btnsWrap.appendChild(btn);
}
}
});
detectedHeaders.forEach(reg=>{
reg.el.style.display='\x6e\x6f\x6e\x65';
});
__gtp_cached_common_parent=colCourse;
Array.from(colCourse.children).forEach(child=>{
if(child!==gridContainer){
const txt=(child.innerText||child.textContent||'').trim();
const isHeader=(txt.includes('\uace8\ud504\uc7a5 \uc120\ud0dd')||txt.includes('\uace8\ud504\uc7a5\uc120\ud0dd'))&&!txt.includes('\uacbd\uae30\ubd81\ubd80')&&!txt.includes('\uacbd\uae30\ub0a8\ubd80');
if(!isHeader){
if(child.__gtp_orig_display===undefined){
child.__gtp_orig_display=child.style.display||'';
}
child.style.display='\x6e\x6f\x6e\x65';
}
}
});
if(gridContainer.parentElement!==colCourse){
colCourse.appendChild(gridContainer);
}
console.log(`[\uace8\ud504\ud0d1 \uc2a4\ub9c8\ud2b8\ubdf0] \u2705 \uace8\ud504\ub77d \uc2a4\ud0c0\uc77c \uad8c\uc5ed \uadf8\ub9ac\ub4dc \uc0dd\uc131 \uc644\ub8cc (7\uac1c \uad8c\uc5ed \uaf49 \ucc44\uc6c0, \uad6c\uc7a5 ${allBtns.length}\uac1c)`);
}
function _0x1031(){
const grid=document.getElementById('\x67\x74\x70\x5f\x73\x6d\x61\x72\x74\x5f\x72\x65\x67\x69\x6f\x6e\x73\x5f\x67\x72\x69\x64');
if(grid){
if(__gtp_cached_optimized_btns&&__gtp_cached_optimized_btns.length>0){
__gtp_cached_optimized_btns.forEach(btn=>{
if(btn.__gtp_orig_parent){
if(btn.__gtp_orig_next&&btn.__gtp_orig_parent.contains(btn.__gtp_orig_next)){
btn.__gtp_orig_parent.insertBefore(btn,btn.__gtp_orig_next);
}else{
btn.__gtp_orig_parent.appendChild(btn);
}
delete btn.__gtp_orig_parent;
delete btn.__gtp_orig_next;
}
});
}
grid.remove();
}
if(__gtp_cached_detected_regions&&__gtp_cached_detected_regions.length>0){
__gtp_cached_detected_regions.forEach(reg=>{
if(reg.el)reg.el.style.display='';
});
__gtp_cached_detected_regions=[];
}
if(__gtp_cached_common_parent){
Array.from(__gtp_cached_common_parent.children).forEach(child=>{
if(child.__gtp_orig_display!==undefined){
child.style.display=child.__gtp_orig_display;
delete child.__gtp_orig_display;
}
});
__gtp_cached_common_parent=null;
}
}
function _0x1032(){
console.log("[\uace8\ud504\ud0d1 \uc2a4\ub9c8\ud2b8\ubdf0] \u26f3 \uace8\ud504\ub77d \uc2a4\ud0c0\uc77c \ucd5c\uc801\ud654 \uc2dc\uc791\x2e\x2e\x2e");
const cols=_0x102a();
if(!cols||!cols.colCourse){
console.warn("[\uace8\ud504\ud0d1 \uc2a4\ub9c8\ud2b8\ubdf0] \u26a0\ufe0f \uace8\ud504\ud0d1 \uceec\ub7fc\uc744 \uc2dd\ubcc4\ud558\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4\x2e");
return{success:false,buttonCount:0};
}
const{rowContainer,colDate,colCourse,colDetail}=cols;
if(rowContainer){
__gtp_cached_row=rowContainer;
rowContainer.classList.add('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x74\x6f\x70-\x72\x6f\x77');
rowContainer.style.setProperty('\x64\x69\x73\x70\x6c\x61\x79','\x66\x6c\x65\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
rowContainer.style.setProperty('\x66\x6c\x65\x78-\x77\x72\x61\x70','\x77\x72\x61\x70','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
rowContainer.style.setProperty('\x77\x69\x64\x74\x68','\x31\x30\x30%','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
rowContainer.style.setProperty('\x67\x61\x70','\x31\x30\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
rowContainer.style.setProperty('\x61\x6c\x69\x67\x6e-\x69\x74\x65\x6d\x73','\x66\x6c\x65\x78-\x73\x74\x61\x72\x74','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
rowContainer.style.setProperty('\x6d\x61\x72\x67\x69\x6e-\x62\x6f\x74\x74\x6f\x6d','\x31\x30\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
}
if(colDate){
__gtp_cached_date_col=colDate;
colDate.classList.add('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x63\x6f\x6c-\x64\x61\x74\x65');
_0x102b(colDate);
}
if(colDetail){
__gtp_cached_detail_col=colDetail;
colDetail.classList.add('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x63\x6f\x6c-\x64\x65\x74\x61\x69\x6c');
colDetail.style.setProperty('\x6f\x72\x64\x65\x72','\x32','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDetail.style.setProperty('\x66\x6c\x65\x78','\x31 \x31 \x30','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDetail.style.setProperty('\x6d\x69\x6e-\x77\x69\x64\x74\x68','\x32\x36\x30\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDetail.style.setProperty('\x77\x69\x64\x74\x68','\x61\x75\x74\x6f','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDetail.style.setProperty('\x6d\x61\x78-\x77\x69\x64\x74\x68','\x6e\x6f\x6e\x65','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDetail.style.setProperty('\x68\x65\x69\x67\x68\x74','\x32\x36\x30\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDetail.style.setProperty('\x6d\x61\x78-\x68\x65\x69\x67\x68\x74','\x32\x36\x30\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDetail.style.setProperty('\x62\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64','\x23\x66\x66\x66\x66\x66\x66','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDetail.style.setProperty('\x62\x6f\x72\x64\x65\x72','\x31\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x63\x62\x64\x35\x65\x31','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDetail.style.setProperty('\x62\x6f\x72\x64\x65\x72-\x72\x61\x64\x69\x75\x73','\x38\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDetail.style.setProperty('\x70\x61\x64\x64\x69\x6e\x67','\x36\x70\x78 \x31\x30\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDetail.style.setProperty('\x62\x6f\x78-\x73\x69\x7a\x69\x6e\x67','\x62\x6f\x72\x64\x65\x72-\x62\x6f\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDetail.style.setProperty('\x6f\x76\x65\x72\x66\x6c\x6f\x77-\x79','\x61\x75\x74\x6f','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDetail.style.setProperty('\x62\x6f\x78-\x73\x68\x61\x64\x6f\x77','\x30 \x31\x70\x78 \x33\x70\x78 \x72\x67\x62\x61(\x30, \x30, \x30, \x30\x2e\x30\x34)','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDetail.style.setProperty('\x64\x69\x73\x70\x6c\x61\x79','\x66\x6c\x65\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDetail.style.setProperty('\x66\x6c\x65\x78-\x64\x69\x72\x65\x63\x74\x69\x6f\x6e','\x63\x6f\x6c\x75\x6d\x6e','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colDetail.style.setProperty('\x76\x69\x73\x69\x62\x69\x6c\x69\x74\x79','\x76\x69\x73\x69\x62\x6c\x65','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
let detailHeader=colDetail.querySelector('\x23\x67\x74\x70\x5f\x73\x6d\x61\x72\x74\x5f\x64\x65\x74\x61\x69\x6c\x5f\x68\x65\x61\x64\x65\x72');
if(!detailHeader){
detailHeader=document.createElement('\x64\x69\x76');
detailHeader.id='\x67\x74\x70\x5f\x73\x6d\x61\x72\x74\x5f\x64\x65\x74\x61\x69\x6c\x5f\x68\x65\x61\x64\x65\x72';
detailHeader.className='\x67\x74\x70-\x64\x65\x74\x61\x69\x6c-\x68\x65\x61\x64\x65\x72-\x73\x74\x79\x6c\x65\x64';
detailHeader.style.cssText=`
                font-size: 11.5px !important;
                font-weight: 800 !important;
                color: #1e3a8a !important;
                background: #dbeafe !important;
                padding: 4px 8px !important;
                border-radius: 4px !important;
                margin-bottom: 6px !important;
                text-align: center !important;
                border: 1px solid #93c5fd !important;
                display: block !important;
                box-shadow: 0 1px 2px rgba(0,0,0,0.04) !important;
                user-select: none !important;
                flex-shrink: 0 !important;
            `;
detailHeader.innerText='\ud83d\udcdd \ud560\uc778\uadf8\ub9b0\ud53c \x2f \uace8\ud504\uc7a5\ud2b9\uc774\uc0ac\ud56d';
colDetail.insertBefore(detailHeader,colDetail.firstChild);
}
Array.from(colDetail.querySelectorAll('*')).forEach(el=>{
if(el.style.display==='\x6e\x6f\x6e\x65'){
el.style.removeProperty('\x64\x69\x73\x70\x6c\x61\x79');
}
el.style.setProperty('\x76\x69\x73\x69\x62\x69\x6c\x69\x74\x79','\x76\x69\x73\x69\x62\x6c\x65','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
});
}
if(colCourse){
__gtp_cached_course_col=colCourse;
colCourse.classList.add('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x63\x6f\x6c-\x63\x6f\x75\x72\x73\x65');
colCourse.style.setProperty('\x6f\x72\x64\x65\x72','\x33','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colCourse.style.setProperty('\x66\x6c\x65\x78','\x30 \x30 \x31\x30\x30%','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colCourse.style.setProperty('\x77\x69\x64\x74\x68','\x31\x30\x30%','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colCourse.style.setProperty('\x6d\x61\x78-\x77\x69\x64\x74\x68','\x31\x30\x30%','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colCourse.style.setProperty('\x6d\x69\x6e-\x77\x69\x64\x74\x68','\x31\x30\x30%','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colCourse.style.setProperty('\x62\x6f\x78-\x73\x69\x7a\x69\x6e\x67','\x62\x6f\x72\x64\x65\x72-\x62\x6f\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colCourse.style.setProperty('\x64\x69\x73\x70\x6c\x61\x79','\x62\x6c\x6f\x63\x6b','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colCourse.style.setProperty('\x6d\x61\x72\x67\x69\x6e-\x74\x6f\x70','\x31\x30\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colCourse.style.setProperty('\x62\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64','\x23\x66\x66\x66\x66\x66\x66','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colCourse.style.setProperty('\x62\x6f\x72\x64\x65\x72','\x31\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x63\x62\x64\x35\x65\x31','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colCourse.style.setProperty('\x62\x6f\x72\x64\x65\x72-\x72\x61\x64\x69\x75\x73','\x38\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colCourse.style.setProperty('\x70\x61\x64\x64\x69\x6e\x67','\x38\x70\x78 \x31\x30\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colCourse.style.setProperty('\x6d\x61\x78-\x68\x65\x69\x67\x68\x74','\x33\x32\x30\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
colCourse.style.setProperty('\x6f\x76\x65\x72\x66\x6c\x6f\x77','\x68\x69\x64\x64\x65\x6e','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
}
_0x102f(colCourse);
const buttons=_0x102e(colCourse);
let count=0;
buttons.forEach(btn=>{
const rawTxt=(btn.innerText||btn.textContent||'').trim();
if(!btn.dataset.gtpOrigText){
btn.dataset.gtpOrigText=rawTxt;
}
const titleVal=btn.getAttribute('\x74\x69\x74\x6c\x65');
const formatted=_0x1029(rawTxt,titleVal);
if(formatted!==rawTxt){
btn.innerText=formatted;
}
btn.classList.add('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x63\x6f\x75\x72\x73\x65-\x62\x74\x6e');
btn.style.setProperty('\x77\x69\x64\x74\x68','\x31\x30\x30%','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
btn.style.setProperty('\x62\x6f\x78-\x73\x69\x7a\x69\x6e\x67','\x62\x6f\x72\x64\x65\x72-\x62\x6f\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
btn.style.setProperty('\x6d\x69\x6e-\x68\x65\x69\x67\x68\x74','\x33\x34\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
btn.style.setProperty('\x68\x65\x69\x67\x68\x74','\x61\x75\x74\x6f','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
btn.style.setProperty('\x66\x6f\x6e\x74-\x73\x69\x7a\x65','\x31\x30\x2e\x35\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
btn.style.setProperty('\x6c\x69\x6e\x65-\x68\x65\x69\x67\x68\x74','\x31\x2e\x31\x35','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
btn.style.setProperty('\x77\x68\x69\x74\x65-\x73\x70\x61\x63\x65','\x70\x72\x65-\x6c\x69\x6e\x65','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
btn.style.setProperty('\x77\x6f\x72\x64-\x62\x72\x65\x61\x6b','\x6b\x65\x65\x70-\x61\x6c\x6c','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
count++;
});
__gtp_cached_optimized_btns=buttons;
console.log(`[\uace8\ud504\ud0d1 \uc2a4\ub9c8\ud2b8\ubdf0] \u2705 \uad6c\uc7a5 \ubc84\ud2bc ${count}\uac1c 2\uc904 \uc904\ubc14\uafc8 \ucd5c\uc801\ud654 \uc644\ub8cc`);
const allFormWrappers=Array.from(document.querySelectorAll('\x64\x69\x76, \x66\x6f\x72\x6d, \x73\x65\x63\x74\x69\x6f\x6e, \x74\x61\x62\x6c\x65'));
const resvForm=allFormWrappers.find(el=>{
if(el.children.length>10)return false;
const txt=(el.innerText||el.textContent||'').trim();
return txt.includes('\uc2e0\uccad \uad6c\ubd84')&&(txt.includes('\uc608\uc57d\x2f\ub300\uae30')||txt.includes('\ud64d\ubcf4'));
});
if(resvForm){
let formContainer=resvForm;
while(formContainer&&formContainer.parentElement&&formContainer.parentElement!==document.body){
if(rowContainer&&formContainer.parentElement.contains(rowContainer)&&formContainer.parentElement.children.length>=2){
break;
}
formContainer=formContainer.parentElement;
}
if(formContainer&&formContainer!==rowContainer){
__gtp_cached_form_container=formContainer;
formContainer.style.setProperty('\x63\x6c\x65\x61\x72','\x62\x6f\x74\x68','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
formContainer.style.setProperty('\x70\x6f\x73\x69\x74\x69\x6f\x6e','\x72\x65\x6c\x61\x74\x69\x76\x65','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
formContainer.style.setProperty('\x6d\x61\x72\x67\x69\x6e-\x74\x6f\x70','\x31\x35\x70\x78','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
formContainer.style.setProperty('\x7a-\x69\x6e\x64\x65\x78','\x35','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
}
}
return{success:true,buttonCount:count};
}
function _0x1033(){
console.log("[\uace8\ud504\ud0d1 \uc2a4\ub9c8\ud2b8\ubdf0] \u21a9\ufe0f \uc6d0\ub798 \uc21c\uc815 \ubdf0 \ubcf5\uc6d0 \uc2dc\uc791\x2e\x2e\x2e");
_0x1031();
if(__gtp_cached_date_col){
_0x102c(__gtp_cached_date_col);
}
if(__gtp_cached_row){
__gtp_cached_row.classList.remove('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x74\x6f\x70-\x72\x6f\x77');
__gtp_cached_row=null;
}
if(__gtp_cached_date_col){
__gtp_cached_date_col.classList.remove('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x63\x6f\x6c-\x64\x61\x74\x65');
__gtp_cached_date_col=null;
}
if(__gtp_cached_detail_col){
__gtp_cached_detail_col.classList.remove('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x63\x6f\x6c-\x64\x65\x74\x61\x69\x6c');
const detailHeader=__gtp_cached_detail_col.querySelector('\x23\x67\x74\x70\x5f\x73\x6d\x61\x72\x74\x5f\x64\x65\x74\x61\x69\x6c\x5f\x68\x65\x61\x64\x65\x72');
if(detailHeader)detailHeader.remove();
__gtp_cached_detail_col.style.removeProperty('\x64\x69\x73\x70\x6c\x61\x79');
__gtp_cached_detail_col.style.removeProperty('\x76\x69\x73\x69\x62\x69\x6c\x69\x74\x79');
__gtp_cached_detail_col=null;
}
if(__gtp_cached_course_col){
__gtp_cached_course_col.classList.remove('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x63\x6f\x6c-\x63\x6f\x75\x72\x73\x65');
__gtp_cached_course_col=null;
}
if(__gtp_cached_form_container){
__gtp_cached_form_container.style.removeProperty('\x63\x6c\x65\x61\x72');
__gtp_cached_form_container.style.removeProperty('\x70\x6f\x73\x69\x74\x69\x6f\x6e');
__gtp_cached_form_container.style.removeProperty('\x6d\x61\x72\x67\x69\x6e-\x74\x6f\x70');
__gtp_cached_form_container.style.removeProperty('\x7a-\x69\x6e\x64\x65\x78');
__gtp_cached_form_container=null;
}
const cols=_0x102a();
if(cols){
if(cols.rowContainer)cols.rowContainer.classList.remove('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x74\x6f\x70-\x72\x6f\x77');
if(cols.colDate){
cols.colDate.classList.remove('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x63\x6f\x6c-\x64\x61\x74\x65');
_0x102c(cols.colDate);
}
if(cols.colDetail){
cols.colDetail.classList.remove('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x63\x6f\x6c-\x64\x65\x74\x61\x69\x6c');
const detailHeader=cols.colDetail.querySelector('\x23\x67\x74\x70\x5f\x73\x6d\x61\x72\x74\x5f\x64\x65\x74\x61\x69\x6c\x5f\x68\x65\x61\x64\x65\x72');
if(detailHeader)detailHeader.remove();
cols.colDetail.style.removeProperty('\x64\x69\x73\x70\x6c\x61\x79');
cols.colDetail.style.removeProperty('\x76\x69\x73\x69\x62\x69\x6c\x69\x74\x79');
}
if(cols.colCourse)cols.colCourse.classList.remove('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x63\x6f\x6c-\x63\x6f\x75\x72\x73\x65');
}
if(__gtp_cached_optimized_btns&&__gtp_cached_optimized_btns.length>0){
__gtp_cached_optimized_btns.forEach(btn=>{
if(btn.dataset.gtpOrigText){
btn.innerText=btn.dataset.gtpOrigText;
delete btn.dataset.gtpOrigText;
}
btn.classList.remove('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x63\x6f\x75\x72\x73\x65-\x62\x74\x6e');
btn.style.removeProperty('\x77\x69\x64\x74\x68');
btn.style.removeProperty('\x6d\x69\x6e-\x77\x69\x64\x74\x68');
btn.style.removeProperty('\x62\x6f\x78-\x73\x69\x7a\x69\x6e\x67');
btn.style.removeProperty('\x6d\x69\x6e-\x68\x65\x69\x67\x68\x74');
btn.style.removeProperty('\x68\x65\x69\x67\x68\x74');
btn.style.removeProperty('\x66\x6f\x6e\x74-\x73\x69\x7a\x65');
btn.style.removeProperty('\x6c\x69\x6e\x65-\x68\x65\x69\x67\x68\x74');
btn.style.removeProperty('\x77\x68\x69\x74\x65-\x73\x70\x61\x63\x65');
btn.style.removeProperty('\x77\x6f\x72\x64-\x62\x72\x65\x61\x6b');
});
__gtp_cached_optimized_btns=[];
}
}
function _0x1034(msg){
let toast=document.getElementById('\x67\x74\x70\x5f\x6c\x61\x79\x6f\x75\x74\x5f\x74\x6f\x61\x73\x74');
if(!toast){
toast=document.createElement('\x64\x69\x76');
toast.id='\x67\x74\x70\x5f\x6c\x61\x79\x6f\x75\x74\x5f\x74\x6f\x61\x73\x74';
toast.style.cssText=`
            position: fixed !important;
            bottom: 30px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            background: rgba(15, 23, 42, 0.94) !important;
            color: #ffffff !important;
            padding: 9px 20px !important;
            border-radius: 30px !important;
            font-size: 12px !important;
            font-weight: 700 !important;
            z-index: 10000000 !important;
            pointer-events: none !important;
            transition: opacity 0.25s ease !important;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3) !important;
            font-family: -apple-system, BlinkMacSystemFont, "Pretendard", Roboto, sans-serif !important;
        `;
document.body.appendChild(toast);
}
toast.innerText=msg;
toast.style.opacity='\x31';
setTimeout(()=>{
if(toast)toast.style.opacity='\x30';
},2500);
}
function _0x1035(isEnabled){
let pill=document.getElementById('\x67\x74\x70\x5f\x6c\x61\x79\x6f\x75\x74\x5f\x74\x6f\x67\x67\x6c\x65\x5f\x70\x69\x6c\x6c');
if(!pill){
pill=document.createElement('\x64\x69\x76');
pill.id='\x67\x74\x70\x5f\x6c\x61\x79\x6f\x75\x74\x5f\x74\x6f\x67\x67\x6c\x65\x5f\x70\x69\x6c\x6c';
pill.title='\ud074\ub9ad \uc2dc \uc2a4\ub9c8\ud2b8\ubdf0(\x33\uc5f4 \uc228\uae40\x2f\uad6c\uc7a5\uba85 \ud480\ub124\uc784)\uc640 \uc21c\uc815 \uace8\ud504\ud0d1 \ubdf0\ub97c \uc989\uc2dc \uc804\ud658\ud569\ub2c8\ub2e4\x2e';
pill.style.cssText=`
            position: fixed !important;
            bottom: 16px !important;
            left: 16px !important;
            z-index: 999999999 !important;
            display: inline-flex !important;
            align-items: center !important;
            gap: 4px !important;
            padding: 4px 9px !important;
            border-radius: 14px !important;
            font-family: -apple-system, BlinkMacSystemFont, "Pretendard", Roboto, sans-serif !important;
            font-size: 10.5px !important;
            font-weight: 700 !important;
            cursor: pointer !important;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.22) !important;
            transition: all 0.15s ease !important;
            user-select: none !important;
            line-height: 1.2 !important;
            opacity: 0.88 !important;
        `;
pill.addEventListener('\x6d\x6f\x75\x73\x65\x65\x6e\x74\x65\x72',()=>{pill.style.opacity='\x31';pill.style.transform='\x73\x63\x61\x6c\x65(\x31\x2e\x30\x34)';});
pill.addEventListener('\x6d\x6f\x75\x73\x65\x6c\x65\x61\x76\x65',()=>{pill.style.opacity='\x30\x2e\x38\x38';pill.style.transform='\x73\x63\x61\x6c\x65(\x31)';});
pill.addEventListener('\x63\x6c\x69\x63\x6b',(e)=>{
e.preventDefault();
e.stopPropagation();
const current=document.body.classList.contains('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x6c\x61\x79\x6f\x75\x74-\x61\x63\x74\x69\x76\x65');
const next=!current;
_0x1027(next);
_0x1037(next);
if(next){
const res=_0x1032()||{};
const count=res.buttonCount||0;
_0x1034(`\u26f3 \uace8\ud504\ud0d1 \uc2a4\ub9c8\ud2b8 \ub808\uc774\uc544\uc6c3 \uc801\uc6a9\ub428 (\uad6c\uc7a5 ${count}\uac1c 2\uc904 \uc904\ubc14\uafc8)`);
}else{
_0x1034('\u21a9\ufe0f \uace8\ud504\ud0d1 \uc6d0\ub798 \uc21c\uc815 \ubdf0 \ubcf5\uc6d0\ub428');
}
});
document.body.appendChild(pill);
}
if(isEnabled){
pill.style.background='\x6c\x69\x6e\x65\x61\x72-\x67\x72\x61\x64\x69\x65\x6e\x74(\x31\x33\x35\x64\x65\x67, \x23\x31\x30\x62\x39\x38\x31 \x30%, \x23\x30\x35\x39\x36\x36\x39 \x31\x30\x30%)';
pill.style.color='\x23\x66\x66\x66\x66\x66\x66';
pill.style.border='\x31\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x33\x34\x64\x33\x39\x39';
pill.innerHTML='<\x73\x70\x61\x6e>\u26f3 \uc2a4\ub9c8\ud2b8\ubdf0 [\x4f\x4e]<\x2f\x73\x70\x61\x6e>';
}else{
pill.style.background='\x23\x66\x66\x66\x66\x66\x66';
pill.style.color='\x23\x36\x34\x37\x34\x38\x62';
pill.style.border='\x31\x70\x78 \x73\x6f\x6c\x69\x64 \x23\x63\x62\x64\x35\x65\x31';
pill.innerHTML='<\x73\x70\x61\x6e>\u26f3 \uc2a4\ub9c8\ud2b8\ubdf0 [\x4f\x46\x46]<\x2f\x73\x70\x61\x6e>';
}
}
function _0x1036(){
if(__gtp_is_layout_updating)return;
if(__gtp_layout_debounce_timer)clearTimeout(__gtp_layout_debounce_timer);
__gtp_layout_debounce_timer=setTimeout(()=>{
if(!document.body.classList.contains('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x6c\x61\x79\x6f\x75\x74-\x61\x63\x74\x69\x76\x65'))return;
__gtp_is_layout_updating=true;
try{
_0x1032();
}catch(e){
console.warn("[\uace8\ud504\ud0d1 \uc2a4\ub9c8\ud2b8 \ub808\uc774\uc544\uc6c3 \ucd5c\uc801\ud654 \uc624\ub958]\x3a",e);
}finally{
__gtp_is_layout_updating=false;
}
},250);
}
function _0x1037(enabled){
_0x1028();
_0x1035(enabled);
if(enabled){
document.body.classList.add('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x6c\x61\x79\x6f\x75\x74-\x61\x63\x74\x69\x76\x65');
_0x1036();
if(!__gtp_smart_layout_observer){
__gtp_smart_layout_observer=new MutationObserver(()=>{
if(document.body.classList.contains('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x6c\x61\x79\x6f\x75\x74-\x61\x63\x74\x69\x76\x65')){
_0x1036();
}
});
__gtp_smart_layout_observer.observe(document.body,{childList:true,subtree:true});
}
}else{
document.body.classList.remove('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x6c\x61\x79\x6f\x75\x74-\x61\x63\x74\x69\x76\x65');
_0x1033();
if(__gtp_smart_layout_observer){
__gtp_smart_layout_observer.disconnect();
__gtp_smart_layout_observer=null;
}
}
}
try{
chrome.storage.onChanged.addListener((changes,area)=>{
if(area==='\x6c\x6f\x63\x61\x6c'&&changes[GTP_LAYOUT_STORAGE_KEY]){
const nextVal=!!changes[GTP_LAYOUT_STORAGE_KEY].newValue;
_0x1037(nextVal);
}
});
}catch(e){}
(async function _0x1038(){
try{
const enabled=await _0x1026();
const runInit=()=>{
_0x1037(enabled);
setTimeout(()=>{if(document.body.classList.contains('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x6c\x61\x79\x6f\x75\x74-\x61\x63\x74\x69\x76\x65'))_0x1032();},400);
setTimeout(()=>{if(document.body.classList.contains('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x6c\x61\x79\x6f\x75\x74-\x61\x63\x74\x69\x76\x65'))_0x1032();},1000);
setTimeout(()=>{if(document.body.classList.contains('\x67\x74\x70-\x73\x6d\x61\x72\x74-\x6c\x61\x79\x6f\x75\x74-\x61\x63\x74\x69\x76\x65'))_0x1032();},2000);
};
if(document.readyState==='\x6c\x6f\x61\x64\x69\x6e\x67'){
document.addEventListener('\x44\x4f\x4d\x43\x6f\x6e\x74\x65\x6e\x74\x4c\x6f\x61\x64\x65\x64',runInit);
}else{
runInit();
}
}catch(e){
console.warn("[\uace8\ud504\ud0d1 \uc2a4\ub9c8\ud2b8 \ub808\uc774\uc544\uc6c3] \ucd08\uae30\ud654 \uc911 \uc608\uc678\x3a",e);
}
})();
