const fs = require('fs');
const content = fs.readFileSync('C:/Users/yebba/.gemini/antigravity/scratch/new_golftee82/popup.js', 'utf8');
const match = content.match(/const DEFAULT_SYNC_CODE = "([^"]+)"/);
const b64 = match[1];
const bin = Buffer.from(b64, 'base64').toString('binary');
const dict = JSON.parse(decodeURIComponent(bin));
for (const [k, v] of Object.entries(dict)) {
    if (k.includes('대영') || (v.golfmon && v.golfmon.includes('대영'))) {
        console.log('key:', k, '->', JSON.stringify(v));
    }
}
