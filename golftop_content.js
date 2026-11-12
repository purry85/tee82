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
console.log("[\uace8\ud504\ud0d1] \ud83c\udfaf \uc2e0\uccad \uad6c\ubd84 [\ud64d\ubcf4] \ubaa8\ub4dc \uc804\ud658 \uc2dc\ub3c4\x2e\x2e\x2e");
const allBtns=Array.from(document.querySelectorAll('\x62\x75\x74\x74\x6f\x6e, \x2e\x62\x74\x6e, \x61, \x73\x70\x61\x6e, \x6c\x61\x62\x65\x6c, \x64\x69\x76'))
.filter(el=>{
if(el.offsetHeight<=0||el.offsetWidth<=0)return false;
const t=(el.innerText||el.textContent||'').trim();
if(t!=='\ud64d\ubcf4')return false;
const r=el.getBoundingClientRect();
return r.top<650&&r.width<150;
});
if(allBtns.length>0){
const promoBtn=allBtns[0].closest('\x62\x75\x74\x74\x6f\x6e, \x2e\x62\x74\x6e, \x61')||allBtns[0];
const isAlreadyActive=promoBtn.classList.contains('\x61\x63\x74\x69\x76\x65')||promoBtn.classList.contains('\x73\x65\x6c\x65\x63\x74\x65\x64')||
window.getComputedStyle(promoBtn).backgroundColor.includes('\x72\x67\x62(\x30, \x31\x32\x38, \x31\x32\x38)')||
window.getComputedStyle(promoBtn).color.includes('\x72\x67\x62(\x32\x35\x35, \x32\x35\x35, \x32\x35\x35)');
if(!isAlreadyActive){
await _0x1002(promoBtn);
console.log("[\uace8\ud504\ud0d1] \ud83c\udfaf \uc0c1\ub2e8 [\ud64d\ubcf4] \ubc84\ud2bc \ud074\ub9ad \uc644\ub8cc!");
await sleep(300);
}else{
console.log("[\uace8\ud504\ud0d1] \ud83c\udfaf \uc0c1\ub2e8 [\ud64d\ubcf4] \ubaa8\ub4dc \uc774\ubbf8 \ud65c\uc131 \uc0c1\ud0dc");
}
return true;
}
return false;
}
function _0x1011(){
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
async function _0x1012(golfName,rawGolfName){
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
const courseContainer=_0x1011()||document.body;
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
async function _0x1013(timeStr){
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
async function _0x1014(targetTimeStr){
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
function _0x1015(){
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
function _0x1016(){
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
const modal=_0x1015();
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
function _0x1017(){
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
async function _0x1018(maxWaitMs=8000){
console.log("[\uace8\ud504\ud0d1] \u23f3 '\ud64d\ubcf4 \ub418\uc5c8\uc2b5\ub2c8\ub2e4' \ud655\uc778 \ud31d\uc5c5 \ub300\uae30 \uc911\x2e\x2e\x2e");
_0x1005({desc:'\u23f3 \ud64d\ubcf4 \uc644\ub8cc \ud31d\uc5c5 \ud655\uc778 \uc911\x2e\x2e\x2e'});
await sleep(150);
const startTime=Date.now();
while(Date.now()-startTime<maxWaitMs){
if(shouldStopRegistration)return false;
const confirmBtn=_0x1016();
const promoModal=_0x1015();
if(confirmBtn||promoModal||_0x1017()){
console.log("[\uace8\ud504\ud0d1] \ud83c\udfaf '\ud64d\ubcf4 \ub418\uc5c8\uc2b5\ub2c8\ub2e4' \ud31d\uc5c5 \uac10\uc9c0 -> [\ud655\uc778] \ubc84\ud2bc \ud074\ub9ad \uc2e4\ud589!");
const targetBtn=confirmBtn||_0x1016();
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
const stillOpen=_0x1017();
const stillBtn=_0x1016();
if(!stillOpen&&!stillBtn){
console.log("[\uace8\ud504\ud0d1] \u2705 \ud31d\uc5c5 \ub2eb\ud798 \ud655\uc778 \uc644\ub8cc! -> \ub2e4\uc74c \ud0c0\uc784\uc73c\ub85c \uc548\uc804\ud558\uac8c \uc774\ub3d9");
_0x1005({desc:'\u2705 \ud31d\uc5c5 \ub2eb\ud798 \uc644\ub8cc -> \ub2e4\uc74c \ud0c0\uc784 \uc900\ube44'});
await sleep(350);
return true;
}
console.log(`[\uace8\ud504\ud0d1] \ud83d\udd04 \ud31d\uc5c5 \ub2eb\ud798 \ub300\uae30 \uc911... \uc7ac\uc2dc\ub3c4 (${check+1}/20)`);
const retryBtn=stillBtn||_0x1016();
if(retryBtn){
try{retryBtn.click();}catch(e){}
}else{
const overlay=document.querySelector('\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72, \x2e\x6d\x6f\x64\x61\x6c-\x62\x61\x63\x6b\x64\x72\x6f\x70');
if(overlay){
try{overlay.click();}catch(e){}
}
}
}
const leftoverModal=_0x1015();
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
async function _0x1019(){
if(_0x1017()){
console.log("[\uace8\ud504\ud0d1] \u26a0\ufe0f \uc794\uc5ec \ud31d\uc5c5 \ubc1c\uacac -> [\ud655\uc778] \ud074\ub9ad\ud558\uc5ec \uae68\ub057\uc774 \ub2eb\uc74c");
const btn=_0x1016();
if(btn){
try{btn.click();}catch(e){}
}
await sleep(300);
if(_0x1017()){
const m=_0x1015();
if(m)m.style.setProperty('\x64\x69\x73\x70\x6c\x61\x79','\x6e\x6f\x6e\x65','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
const c=document.querySelector('\x2e\x73\x77\x61\x6c\x32-\x63\x6f\x6e\x74\x61\x69\x6e\x65\x72');
if(c)c.style.setProperty('\x64\x69\x73\x70\x6c\x61\x79','\x6e\x6f\x6e\x65','\x69\x6d\x70\x6f\x72\x74\x61\x6e\x74');
}
await sleep(200);
}
}
async function _0x101a(){
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
await _0x1018(6000);
return true;
}
console.error("[\uace8\ud504\ud0d1] \u274c \ud558\ub2e8 [\ud64d\ubcf4] \uc81c\ucd9c \ubc84\ud2bc\uc744 \ucc3e\uc9c0 \ubabb\ud568");
return false;
}
async function _0x101b(item,customMemo='',stepPreset='\x68\x75\x6d\x61\x6e'){
console.log(`\n================== [\uace8\ud504\ud0d1 \uc790\ub3d9\ub4f1\ub85d] ${item.golf} (${item.date} ${item.time}) ==================`);
await _0x1019();
await _0x100f(item.date);
if(shouldStopRegistration)return false;
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
const courseSelected=await _0x1012(item.golf,item.rawGolf);
if(shouldStopRegistration)return false;
if(!courseSelected){
console.warn(`[\uace8\ud504\ud0d1] \u26a0\ufe0f \uace8\ud504\uc7a5 [${item.golf}] \ubc84\ud2bc\uc744 \ucc3e\uc9c0 \ubabb\ud558\uc5ec \uc548\uc804\ud558\uac8c \uac74\ub108\ub701\ub2c8\ub2e4 (\uc5c9\ub6b1\ud55c \uad6c\uc7a5 \uc624\ub4f1\ub85d 100% \ubc29\uc9c0)`);
_0x1005({desc:`\u26a0\ufe0f [${item.golf}] \uad6c\uc7a5 \ubbf8\ubc1c\uacac -> \uc2a4\ud0b5`});
return false;
}
await sleep(_0x1000('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
await _0x1010();
if(shouldStopRegistration)return false;
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
const appliedTime=await _0x1013(item.time);
if(shouldStopRegistration)return false;
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
const timeClean=(item.time||'').replace(/[^\d]/g,'');
const formattedTime=(timeClean.length===4)?`${timeClean.slice(0,2)}:${timeClean.slice(2)}`:item.time;
if(!appliedTime){
await _0x100b('\ud76c\ub9dd\uc2dc\uac04',formattedTime||timeClean);
await sleep(_0x1000('\x66\x61\x73\x74',stepPreset));
}
await _0x1014(formattedTime||timeClean);
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
const submitted=await _0x101a();
if(!submitted)return false;
await sleep(_0x1000('\x6e\x6f\x72\x6d\x61\x6c',stepPreset));
return true;
}
async function _0x101c(items,memo='',delayPreset='\x73\x61\x66\x65',stepPreset='\x68\x75\x6d\x61\x6e'){
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
const ok=await _0x101b(item,memo,stepPreset);
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
if(window.__golftop_onMessage_fn){
try{
chrome.runtime.onMessage.removeListener(window.__golftop_onMessage_fn);
}catch(e){}
}
window.__golftop_onMessage_fn=(msg,sender,sendResponse)=>{
if(msg.action==='\x53\x54\x41\x52\x54\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e'){
console.log("[\uace8\ud504\ud0d1] \uc790\ub3d9\ub4f1\ub85d \uc2dc\uc791 \uc694\uccad \uc218\uc2e0 (\x56\x65\x72 \x32\x2e\x30\x2e\x35\x33)\x3a",msg);
shouldStopRegistration=false;
_0x101c(msg.items,msg.memo,msg.delayPreset,msg.stepPreset);
sendResponse({success:true,version:'\x32\x2e\x30\x2e\x35\x33'});
return true;
}else if(msg.action==='\x53\x54\x4f\x50\x5f\x47\x4f\x4c\x46\x54\x4f\x50\x5f\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e'||msg.action==='\x53\x54\x4f\x50\x5f\x52\x45\x47\x49\x53\x54\x52\x41\x54\x49\x4f\x4e'){
console.log("[\uace8\ud504\ud0d1] \uc790\ub3d9\ub4f1\ub85d \uc911\ub2e8 \uc694\uccad \uc218\uc2e0");
shouldStopRegistration=true;
isRegistrationRunning=false;
_0x1005({desc:'\ud83d\uded1 \uc790\ub3d9\ub4f1\ub85d\uc774 \uc911\ub2e8\ub418\uc5c8\uc2b5\ub2c8\ub2e4\x2e',isStopped:true});
_0x1006();
sendResponse({success:true});
return true;
}
};
if(!window.__golftop_legacy_listener_exists){
chrome.runtime.onMessage.addListener(window.__golftop_onMessage_fn);
}
console.log("[\x54\x65\x65\x38\x32] \uace8\ud504\ud0d1(\x69\x6e\x74\x72\x61\x2e\x67\x6f\x6c\x66\x74\x6f\x70\x2e\x6b\x72) \uc790\ub3d9\ub4f1\ub85d \ucf58\ud150\uce20 \uc2a4\ud06c\ub9bd\ud2b8 \ub85c\ub4dc \uc644\ub8cc (\x56\x65\x72 \x32\x2e\x30\x2e\x35\x33)");
