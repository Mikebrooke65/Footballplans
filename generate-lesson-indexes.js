const fs = require('fs');
const path = require('path');

const lessonsRoot = path.join(__dirname, 'lessons');

const skillFolders = fs.readdirSync(lessonsRoot).filter(folder => {
  const fullPath = path.join(lessonsRoot, folder);
  return fs.statSync(fullPath).isDirectory();
});

skillFolders.forEach(skill => {
  const skillPath = path.join(lessonsRoot, skill);
  const lessonFiles = fs.readdirSync(skillPath).filter(file => {
    const fullFile = path.join(skillPath, file);
    return fs.statSync(fullFile).isFile() && file !== 'index.json';
  });

  const outputPath = path.join(skillPath, 'index.json');
  fs.writeFileSync(outputPath, JSON.stringify(lessonFiles, null, 2));
  console.log(`✅ ${skill}/index.json created:`, lessonFiles);
});
