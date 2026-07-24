const fs = require('fs');
const path = require('path');

const domain = 'https://sarvesh.website';

function generateSitemap() {
  const rootDir = path.join(__dirname, '..');
  const files = fs.readdirSync(rootDir);
  const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'index.html');
  
  // Start sitemap content
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add homepage (index.html) as the root URL
  const today = new Date().toISOString().split('T')[0];
  xml += '  <url>\n';
  xml += `    <loc>${domain}/</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += '    <changefreq>daily</changefreq>\n';
  xml += '    <priority>1.0</priority>\n';
  xml += '  </url>\n';
  
  // Add other html files
  htmlFiles.forEach(file => {
    // Skip subfolders or hidden files
    const stats = fs.statSync(path.join(rootDir, file));
    if (stats.isFile()) {
      xml += '  <url>\n';
      xml += `    <loc>${domain}/${file}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += '    <changefreq>weekly</changefreq>\n';
      xml += '    <priority>0.8</priority>\n';
      xml += '  </url>\n';
    }
  });
  
  xml += '</urlset>\n';
  
  fs.writeFileSync(path.join(rootDir, 'sitemap.xml'), xml, 'utf8');
  console.log('Successfully generated sitemap.xml');
}

generateSitemap();
