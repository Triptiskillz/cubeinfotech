const fs = require('fs');
const path = require('path');

// SVG placeholder images for blogs
const placeholders = [
  {
    filename: 'nextjs-blog.jpg',
    svg: `<svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="450" fill="#000"/>
      <text x="400" y="200" font-family="Arial, sans-serif" font-size="64" fill="#fff" text-anchor="middle" font-weight="bold">Next.js 14</text>
      <text x="400" y="280" font-family="Arial, sans-serif" font-size="32" fill="#888" text-anchor="middle">The React Framework</text>
    </svg>`
  },
  {
    filename: 'react-server-components.jpg',
    svg: `<svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="450" fill="#20232a"/>
      <text x="400" y="180" font-family="Arial, sans-serif" font-size="56" fill="#61dafb" text-anchor="middle" font-weight="bold">React Server</text>
      <text x="400" y="260" font-family="Arial, sans-serif" font-size="56" fill="#61dafb" text-anchor="middle" font-weight="bold">Components</text>
    </svg>`
  },
  {
    filename: 'nodejs-api.jpg',
    svg: `<svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="450" fill="#333"/>
      <text x="400" y="200" font-family="Arial, sans-serif" font-size="64" fill="#6cc24a" text-anchor="middle" font-weight="bold">Node.js APIs</text>
      <text x="400" y="280" font-family="Arial, sans-serif" font-size="32" fill="#fff" text-anchor="middle">Scalable & Fast</text>
    </svg>`
  },
  {
    filename: 'css-grid-flexbox.jpg',
    svg: `<svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="450" fill="#1572b6"/>
      <text x="400" y="160" font-family="Arial, sans-serif" font-size="56" fill="#fff" text-anchor="middle" font-weight="bold">CSS Grid</text>
      <text x="400" y="240" font-family="Arial, sans-serif" font-size="40" fill="#fff" text-anchor="middle">vs</text>
      <text x="400" y="320" font-family="Arial, sans-serif" font-size="56" fill="#fff" text-anchor="middle" font-weight="bold">Flexbox</text>
    </svg>`
  },
  {
    filename: 'typescript-intro.jpg',
    svg: `<svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="450" fill="#3178c6"/>
      <text x="400" y="200" font-family="Arial, sans-serif" font-size="64" fill="#fff" text-anchor="middle" font-weight="bold">TypeScript</text>
      <text x="400" y="280" font-family="Arial, sans-serif" font-size="32" fill="#fff" text-anchor="middle">JavaScript that scales</text>
    </svg>`
  }
];

// Create SVG files
placeholders.forEach(({ filename, svg }) => {
  const svgFilename = filename.replace('.jpg', '.svg');
  const filepath = path.join(__dirname, svgFilename);
  fs.writeFileSync(filepath, svg);
  console.log(`Created: ${svgFilename}`);
});

console.log('\nPlaceholder SVG files created successfully!');
console.log('You can convert these to JPG using an online converter or image editing software.');