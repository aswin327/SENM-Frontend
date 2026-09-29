const fs = require('fs');
const file = 'c:\\Users\\aswin\\OneDrive\\Desktop\\Extention Architecture\\frontend\\components\\profile\\Profile.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/\/ \/>/g, '/>');
fs.writeFileSync(file, content);
console.log('Fixed');
