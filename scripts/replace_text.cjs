const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processFile(filePath) {
  if (!filePath.endsWith('.js') && !filePath.endsWith('.jsx')) return;
  
  // Exclude hero widget as per instructions
  if (filePath.includes('HeroScanWidget.js')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // CTAs
  content = content.replace(/Get Your Free Site Scan/g, 'Request a Quote');
  content = content.replace(/Get a FREE site scan/g, 'Request a Quote');
  content = content.replace(/Get a FREE Site Scan/g, 'Request a Quote');
  content = content.replace(/Start a free scan/g, 'Request a Quote');
  content = content.replace(/Start My Free Scan/g, 'Request a Quote');
  content = content.replace(/Claim Free Scan/g, 'Request a Quote');

  // Meta description cleanups
  content = content.replace(/ Free site scan\./g, '');
  content = content.replace(/ Get a FREE site scan today\./g, '');
  content = content.replace(/ Call today for a free audit!/g, '');
  content = content.replace(/ Call now for a free audit!/g, '');
  content = content.replace(/ Real client results, free audit\./g, '');
  content = content.replace(/ See real client results and get a free audit\./g, '');
  content = content.replace(/ See our AI citation research and get a free audit\./g, '');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
  }
}

walk('./app', processFile);
walk('./components', processFile);
walk('./lib', processFile);
