const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processFile(filePath) {
  if (!filePath.endsWith('.js') && !filePath.endsWith('.jsx')) return;
  if (filePath.includes('next.config')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace /seo-services with /services
  content = content.replace(/\/seo-services/g, '/services');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
  }
}

walk('./app', processFile);
walk('./components', processFile);
walk('./lib', processFile);
