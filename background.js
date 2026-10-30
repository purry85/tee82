async function _0x1000(){
if(!chrome.action||!chrome.action.setIcon)return;
try{
const sizes=[16,32,48,128];
const imageDataMap={};
for(const size of sizes){
imageDataMap[size]=_0x1001(size);
}
await chrome.action.setIcon({imageData:imageDataMap});
console.log("[\x54\x65\x65\x38\x32] \ud234\ubc14 \uc544\uc774\ucf58(\x69\x63\x6f\x6e\x2e\x73\x76\x67 \ud22c\uba85 \uc5e0\ube14\ub7fc)\uc774 \uc131\uacf5\uc801\uc73c\ub85c \uc801\uc6a9\ub418\uc5c8\uc2b5\ub2c8\ub2e4\x2e");
}catch(err){
console.error("[\x54\x65\x65\x38\x32] \ud234\ubc14 \uc544\uc774\ucf58 \uc801\uc6a9 \uc2e4\ud328\x3a",err);
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
chrome.runtime.onInstalled.addListener(()=>{
console.log("\uace8\ud504\ubaac \ubcc0\ud658\uae30 \ud655\uc7a5\ud504\ub85c\uadf8\ub7a8 \uc124\uce58 \uc644\ub8cc");
_0x1000();
});
chrome.runtime.onStartup.addListener(()=>{
_0x1000();
});
_0x1000();
chrome.runtime.onMessage.addListener((message,sender,sendResponse)=>{
if(message.action==='\x4f\x50\x45\x4e\x5f\x53\x49\x44\x45\x5f\x50\x41\x4e\x45\x4c'){
chrome.tabs.query({active:true,currentWindow:true},(tabs)=>{
if(tabs&&tabs[0]&&chrome.sidePanel){
chrome.sidePanel.open({windowId:tabs[0].windowId}).then(()=>{
sendResponse({success:true});
}).catch((err)=>{
console.error("\uc0ac\uc774\ub4dc\ud328\ub110 \uc5f4\uae30 \uc2e4\ud328\x3a",err);
sendResponse({success:false,error:err.message});
});
}
});
return true;
}
});
