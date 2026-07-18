import fs from 'fs';
import path from 'path';

const APP_DIR = './app';
const COMPONENTS_DIR = './components';

// Function to recursively find all JS files
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
  // Skip TopicMarquee itself and layout.js, etc. if needed
  if (file.includes('TopicMarquee.js') || file.includes('layout.js') || file.includes('globals.css')) continue;
  
  let content = fs.readFileSync(file, 'utf-8');
  
  // Only process files that have a hero section
  if (!content.includes('className="') || !content.match(/className="[^"]*hero[^"]*"/)) {
    continue;
  }
  if (content.includes('<TopicMarquee')) {
    continue; // already added
  }

  // Find the end of the first section with a hero class
  // We'll look for the first `<section ` that contains a `className` with `hero`.
  // Then we find its closing `</section>`.
  
  const heroRegex = /<section[^>]*className="[^"]*hero[^"]*"[^>]*>/;
  const match = heroRegex.exec(content);
  if (!match) continue;

  const startIndex = match.index;
  let nesting = 0;
  let i = startIndex;
  let sectionEndIndex = -1;

  // Simple parser to find the matching closing </section>
  while (i < content.length) {
    if (content.substring(i, i + 9) === '<section ' || content.substring(i, i + 9) === '<section>') {
      nesting++;
      i += 8;
    } else if (content.substring(i, i + 10) === '</section>') {
      nesting--;
      if (nesting === 0) {
        sectionEndIndex = i + 10;
        break;
      }
      i += 9;
    }
    i++;
  }

  if (sectionEndIndex !== -1) {
    // Generate topics based on file name or generic
    let topics = ['SEO Optimization', 'AI Visibility', 'Organic Growth', 'Digital Marketing', 'Search Strategy'];
    
    const isApp = file.includes('app\\') || file.includes('app/');
    if (file.includes('industries')) {
      topics = ['B2B SEO', 'Legal Marketing', 'Healthcare SEO', 'Tech SEO', 'Local Business'];
    } else if (file.includes('services')) {
      topics = ['Technical SEO', 'Content Strategy', 'Link Building', 'AI Optimization', 'Local SEO'];
    } else if (file.includes('about')) {
      topics = ['Our Story', 'Mission', 'Values', 'Expertise', 'Leadership'];
    } else if (file.includes('insights')) {
      topics = ['Industry News', 'Algorithm Updates', 'SEO Tips', 'Marketing Trends', 'Case Studies'];
    }

    const importStatement = `import TopicMarquee from '${isApp ? (file.split(path.sep).length > 2 ? '../'.repeat(file.split(path.sep).length - 2) : '../') + 'components/TopicMarquee' : './TopicMarquee'}';\n`;
    
    // Add import if not present
    if (!content.includes('TopicMarquee')) {
      // Find the last import
      const lastImportIndex = content.lastIndexOf('import ');
      if (lastImportIndex !== -1) {
        const endOfLastImport = content.indexOf('\n', lastImportIndex);
        content = content.substring(0, endOfLastImport + 1) + importStatement + content.substring(endOfLastImport + 1);
        // Adjust sectionEndIndex because content length changed
        sectionEndIndex += importStatement.length;
      } else {
        content = importStatement + content;
        sectionEndIndex += importStatement.length;
      }
    }

    const componentToInsert = `\n      <TopicMarquee topics={${JSON.stringify(topics)}} />\n`;
    content = content.substring(0, sectionEndIndex) + componentToInsert + content.substring(sectionEndIndex);
    
    fs.writeFileSync(file, content, 'utf-8');
    modifiedCount++;
    console.log(`Modified: ${file}`);
  }
}

console.log(`Successfully modified ${modifiedCount} files.`);
