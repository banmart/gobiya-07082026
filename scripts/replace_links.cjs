const fs = require('fs');
const path = require('path');

// 1. Add CSS to globals.css
const cssPath = 'c:/Users/banma/projects/gobiya-07082026/app/globals.css';
const cssToAdd = `

/* ═══════════ Global Lead Modal ═══════════ */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  width: 100%;
  max-width: 540px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2.5rem;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 2rem;
  line-height: 1;
  color: var(--text-muted);
  cursor: pointer;
}

.modal-close:hover {
  color: var(--text);
}

.modal-label {
  display: block;
  font-size: 0.8125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text);
}

.modal-input {
  width: 100%;
  padding: 0.75rem;
  background: var(--surface-sunken);
  border: 1px solid var(--rule);
  border-radius: 6px;
  color: var(--text);
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.modal-input:focus {
  outline: none;
  border-color: var(--main);
}
`;

let cssContent = fs.readFileSync(cssPath, 'utf8');
if (!cssContent.includes('Global Lead Modal')) {
  fs.appendFileSync(cssPath, cssToAdd);
  console.log('Added modal CSS.');
}

// 2. Replace /free-site-scan in files
const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.js') && !file.includes('node_modules') && !file.includes('.next')) {
        results.push(file);
      }
    }
  });
  return results;
};

const files = [...walk('c:/Users/banma/projects/gobiya-07082026/app'), ...walk('c:/Users/banma/projects/gobiya-07082026/components')];
let replaceCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('/free-site-scan')) {
    // Only replace href='/free-site-scan' or href="/free-site-scan"
    // Also consider template literals like `/free-site-scan?goal=${t}`
    let newContent = content.replace(/href="\/free-site-scan(\?[^"]*)?"/g, 'href="?onboarding=true"');
    newContent = newContent.replace(/href='\/free-site-scan(\?[^']*)?'/g, 'href="?onboarding=true"');
    newContent = newContent.replace(/href=\{\`\/free-site-scan(\?[^\`]*)?\`\}/g, 'href="?onboarding=true"');
    
    // Specifically for Next.js router.push or specific object keys if any
    newContent = newContent.replace(/href: '\/free-site-scan(\?[^']*)?'/g, 'href: \'?onboarding=true\'');
    
    // For HeroQuickForm and other places that might have explicit '/free-site-scan' strings in components/Header.js
    newContent = newContent.replace(/'\/free-site-scan'/g, "'?onboarding=true'");
    
    if (content !== newContent) {
      fs.writeFileSync(file, newContent, 'utf8');
      replaceCount++;
    }
  }
});

console.log(`Updated ${replaceCount} files.`);
