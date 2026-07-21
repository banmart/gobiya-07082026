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

const files = [...getAllJsFiles(APP_DIR), ...getAllJsFiles(COMPONENTS_DIR)];

let modifiedCount = 0;

for (const file of files) {
  if (file.includes('TopicMarquee.js') || file.includes('layout.js') || file.includes('globals.css')) continue;
  
  let content = fs.readFileSync(file, 'utf-8');
  if (!content.includes('<TopicMarquee')) continue;

  let newTopics = '';
  
  // Custom logic per file
  const filename = path.basename(file);
  if (filename === 'ArticleTemplate.js') {
    newTopics = '{[article.title, article.category, "SEO Insights", "Algorithm Updates", "Digital Strategy"]}';
  } else if (filename === 'ServiceTemplate.js') {
    newTopics = '{[service.title, service.pillar, ...service.capabilities.map(c => c.title), "Enterprise SEO"]}';
  } else if (filename === 'IndustryTemplate.js') {
    newTopics = '{[industry.title, "Industry Specific SEO", "Lead Generation", "Search Dominance", "AI Visibility"]}';
  } else if (filename === 'LocationTemplate.js') {
    newTopics = '{[location.title, location.city, "Local SEO", "Google Business Profile", "Local Search Authority"]}';
  } else if (filename === 'OutcomeTemplate.js') {
    newTopics = '{[outcome.title, outcome.metric, "Traffic Growth", "Revenue Increase", "Search Performance"]}';
  } else if (filename === 'CaseStudyTemplate.js') {
    newTopics = '{[study.client, study.industry, "Algorithm Recovery", "Search Strategy", "Case Study"]}';
  } else if (file.includes('app\\page.js') || file.includes('app/page.js')) {
    newTopics = '{["Los Angeles AI SEO", "Generative Engine Optimization", "ChatGPT Optimization", "Technical SEO", "Semantic Search"]}';
  } else if (file.includes('about\\approach')) {
    newTopics = '{["Data-Driven SEO", "Search Algorithms", "AI Analysis", "White Hat Techniques", "Sustainable Growth"]}';
  } else if (file.includes('about\\steve-martin')) {
    newTopics = '{["Steve Martin", "SEO Expert", "Digital Marketing Consultant", "Los Angeles SEO", "Algorithm Specialist"]}';
  } else if (file.includes('about')) {
    newTopics = '{["Gobiya History", "Algorithm Recovery", "Los Angeles Agency", "Search First Consulting", "Since 2010"]}';
  } else if (file.includes('ai-visibility')) {
    newTopics = '{["AI Overviews", "ChatGPT Citations", "Perplexity Search", "Generative AI SEO", "Answer Engine Optimization"]}';
  } else if (file.includes('contact')) {
    newTopics = '{["Schedule Consultation", "SEO Audit", "Speak With Experts", "Los Angeles Office", "Digital Growth"]}';
  } else if (file.includes('industries')) {
    newTopics = '{["B2B Enterprise", "Healthcare SEO", "Legal Practice Marketing", "Local Service Businesses", "Professional Services"]}';
  } else if (file.includes('insights')) {
    newTopics = '{["SEO News", "Algorithm Updates", "Generative Search Trends", "Digital Marketing Blog", "Agency Perspectives"]}';
  } else if (file.includes('onboarding')) {
    newTopics = '{["Begin Onboarding", "Strategy Discovery", "Initial Audit", "Client Setup", "SEO Intake"]}';
  } else if (file.includes('outcomes')) {
    newTopics = '{["Traffic Spikes", "Keyword Dominance", "Revenue Growth", "Algorithm Recovery", "Search Visibility"]}';
  } else if (file.includes('privacy')) {
    newTopics = '{["Data Protection", "Privacy Policy", "User Security", "Analytics Consent", "Compliance"]}';
  } else if (file.includes('services')) {
    newTopics = '{["Core Services", "Technical SEO", "AI Optimization", "Link Building", "Web Development"]}';
  } else if (file.includes('terms')) {
    newTopics = '{["Terms of Service", "Legal Agreement", "Agency Terms", "Client Policies", "Copyright"]}';
  } else if (file.includes('work')) {
    newTopics = '{["Client Portfolio", "Success Stories", "SEO Case Studies", "Search Dominance", "Proven Results"]}';
  } else {
    newTopics = '{["SEO Excellence", "Digital Strategy", "AI Visibility", "Organic Search", "Brand Authority"]}';
  }

  // Use regex to replace `<TopicMarquee topics={...} />` or `<TopicMarquee topics={[...]} />`
  // We match everything between `topics={` and `} />` or `]} />` 
  const regex = /<TopicMarquee topics=\{[^}]+\}\s*\/>/;
  const newComponent = `<TopicMarquee topics=${newTopics} />`;
  
  if (regex.test(content)) {
    const updated = content.replace(regex, newComponent);
    if (updated !== content) {
      fs.writeFileSync(file, updated, 'utf-8');
      modifiedCount++;
      console.log(`Updated keywords in: ${file}`);
    }
  }
}

console.log(`Successfully updated keywords in ${modifiedCount} files.`);
