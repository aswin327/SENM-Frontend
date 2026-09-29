const fs = require('fs');
const file = 'c:\\Users\\aswin\\OneDrive\\Desktop\\Extention Architecture\\frontend\\components\\profile\\Profile.tsx';
let content = fs.readFileSync(file, 'utf8');

// The faulty tags look like this:
// <div className={`profile-step-panel ${currentStep === 1 ? 'active' : ''}`}<div className="profile-step-heading">
// I need to add > after the }`
for (let i = 1; i <= 7; i++) {
  const searchStr = `<div className={\`profile-step-panel \${currentStep === ${i} ? 'active' : ''}\`}`;
  const repStr = `<div className={\`profile-step-panel \${currentStep === ${i} ? 'active' : ''}\`}>`;
  content = content.replaceAll(searchStr, repStr);
}

for (let i = 1; i <= 6; i++) {
  const searchStr2 = `<article className={\`project-editor-card profile-project-card \${currentProject === ${i} ? 'active' : ''}\`}`;
  const repStr2 = `<article className={\`project-editor-card profile-project-card \${currentProject === ${i} ? 'active' : ''}\`}>`;
  content = content.replaceAll(searchStr2, repStr2);
}

fs.writeFileSync(file, content);
console.log('Fixed syntax');
