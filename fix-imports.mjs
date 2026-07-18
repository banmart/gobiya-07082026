import fs from 'fs';
import path from 'path';

const APP_DIR = './app';
const COMPONENTS_DIR = './components';

function getAllJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllJsFiles(filePath, fileList);
    } else if (filePath.endsWith('.js')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = [
  ...getAllJsFiles(APP_DIR),
  ...getAllJsFiles(COMPONENTS_DIR)
];

let modifiedCount = 0;

for (const file of files) {
  if (file.includes('TopicMarquee.js') || file.includes('layout.js') || file.includes('globals.css')) continue;
  
  let content = fs.readFileSync(file, 'utf-8');
  
  if (content.includes('import TopicMarquee from ')) {
    // Calculate correct path based on folder depth
    // e.g. app/page.js is depth 2 ('app', 'page.js') -> '../components/TopicMarquee'
    // e.g. app/about/page.js is depth 3 ('app', 'about', 'page.js') -> '../../components/TopicMarquee'
    const depth = file.split(path.sep).length;
    let importPath = '';
    
    if (file.includes('components')) {
      importPath = './TopicMarquee';
    } else {
      // It's in app/
      if (depth === 2) {
        importPath = '../components/TopicMarquee';
      } else {
        importPath = '../'.repeat(depth - 1) + 'components/TopicMarquee';
      }
    }
    
    // Replace existing import
    const newContent = content.replace(/import TopicMarquee from '.*';/, `import TopicMarquee from '${importPath}';`);
    if (newContent !== content) {
      fs.writeFileSync(file, newContent, 'utf-8');
      modifiedCount++;
      console.log(`Fixed import in: ${file} to ${importPath}`);
    }
  }
}

console.log(`Successfully fixed imports in ${modifiedCount} files.`);
