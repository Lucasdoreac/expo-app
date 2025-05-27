const fs = require('fs');
const path = require('path');

const INDEX_PATH = path.join(__dirname, 'dist', 'index.html');

let html = fs.readFileSync(INDEX_PATH, 'utf8');

// Corrige caminhos do JS e favicon para subdiretório do GitHub Pages
html = html.replace(/src="\/_expo\//g, 'src="/expo-app/_expo/');
html = html.replace(/href="\/favicon.ico"/g, 'href="/expo-app/favicon.ico"');

fs.writeFileSync(INDEX_PATH, html);
console.log('Caminhos corrigidos para GitHub Pages em /expo-app/.');
