const fs = require('fs');
const file = 'c:\\Users\\aswin\\OneDrive\\Desktop\\Extention Architecture\\frontend\\components\\profile\\Profile.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/return \([\s\S]*?<section className="view active" id="profile">/, 'return (\n    <>\n      <section className="view active" id="profile">');
content = content.replace(/<\/section>[\s]*?\);/, '</section>\n    </>\n  );');

// Just in case it wasn't caught correctly:
if (!content.includes('<>')) {
    console.log("Failed to inject fragments with regex. Injecting manually.");
    content = content.replace("return (", "return (\n    <>");
    content = content.replace(/(\n\s*)\);\n\}\n?$/, "$1    </>\n  );\n}");
}

fs.writeFileSync(file, content);
console.log('Fixed fragments');
