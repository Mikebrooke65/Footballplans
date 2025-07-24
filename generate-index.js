const fs = require('fs');
const path = require('path');

// ✅ Update this path to target the /lessons/ folder
const lessonsPath = path.join(__dirname, 'lessons');

const folders = fs.readdirSync(lessonsPath).filter(f =>
  fs.statSync(path.join(lessonsPath, f)).isDirectory()
);

// 🔄 Write to lessons/index.json
const outputPath = path.join(lessonsPath, 'index.json');
fs.writeFileSync(outputPath, JSON.stringify(folders, null, 2));

console.log('✅ Skill index generated:', folders);
