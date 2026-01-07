const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

// Load SVG files - using the FINAL version
const logoFullSVG = fs.readFileSync(path.join(__dirname, 'sesame3 FINAL.svg'), 'utf8');

// Create white version by replacing colors
const logoWhiteSVG = logoFullSVG
  .replace(/fill="#1B5E4A"/g, 'fill="#ffffff"')
  .replace(/#5CB88A/g, '#8ED9B5')
  .replace(/#1B5E4A(?=")/g, '#36736A');

// Extract just the logo mark (first 50 units of viewBox)
const logoMarkSVG = logoFullSVG
  .replace(/width="185"/, 'width="50"')
  .replace(/viewBox="0 0 185 56"/, 'viewBox="0 0 50 56"')
  .replace(/<path d="M53[\s\S]*?<text[\s\S]*?<\/text>/, ''); // Remove text paths

// Asset configurations
const ASSETS = {
  marks: [
    { name: 'logo-mark-512.png', size: 512 },
    { name: 'logo-mark-192.png', size: 192 },
    { name: 'apple-touch-icon-180.png', size: 180 },
    { name: 'favicon-48.png', size: 48 },
    { name: 'favicon-32.png', size: 32 },
    { name: 'favicon-16.png', size: 16 },
  ],
  full: [
    { name: 'logo-full.png', width: 740, height: 224, svg: logoFullSVG },
    { name: 'logo-full-white.png', width: 740, height: 224, svg: logoWhiteSVG },
  ],
  og: [
    { name: 'og-image.png', width: 1200, height: 630 },
  ]
};

const logoMarkHTML = (size) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: ${size}px;
      height: ${size}px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
    }
    svg { width: 90%; height: 90%; }
  </style>
</head>
<body>${logoMarkSVG}</body>
</html>
`;

const logoFullHTML = (width, height, svg) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: ${width}px;
      height: ${height}px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
    }
    svg { width: 90%; height: auto; }
  </style>
</head>
<body>${svg}</body>
</html>
`;

const ogImageHTML = (width, height) => `
<!DOCTYPE html>
<html>
<head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: ${width}px;
      height: ${height}px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: linear-gradient(145deg, #f0faf4 0%, #e0f2e8 50%, #d4ede0 100%);
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    }
    .logo-container { margin-bottom: 32px; }
    .logo-container svg { width: 500px; height: auto; }
    .tagline { font-size: 26px; color: #36736A; font-weight: 600; }
  </style>
</head>
<body>
  <div class="logo-container">${logoFullSVG}</div>
  <p class="tagline">Your College Application Companion</p>
</body>
</html>
`;

async function generateAssets() {
  const outputDir = path.join(__dirname, 'generated');
  const websiteAssetsDir = '/Users/gutgutia/Documents/MySoftware/sesame3/1_website/public/assets';
  
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({ deviceScaleFactor: 2 });

  console.log('🎨 Generating assets from sesame3 FINAL.svg...\n');

  // Generate logo marks
  console.log('📐 Logo Marks:');
  for (const config of ASSETS.marks) {
    const page = await context.newPage();
    await page.setViewportSize({ width: config.size, height: config.size });
    await page.setContent(logoMarkHTML(config.size));
    await page.waitForLoadState('domcontentloaded');
    await page.screenshot({ path: path.join(outputDir, config.name), omitBackground: true });
    console.log(`   ✓ ${config.name}`);
    await page.close();
  }

  // Generate full logos
  console.log('\n📝 Full Logos:');
  for (const config of ASSETS.full) {
    const page = await context.newPage();
    await page.setViewportSize({ width: config.width, height: config.height });
    await page.setContent(logoFullHTML(config.width, config.height, config.svg));
    await page.waitForLoadState('domcontentloaded');
    await page.screenshot({ path: path.join(outputDir, config.name), omitBackground: true });
    console.log(`   ✓ ${config.name}`);
    await page.close();
  }

  // Generate OG image
  console.log('\n🖼️  OG Image:');
  for (const config of ASSETS.og) {
    const page = await context.newPage();
    await page.setViewportSize({ width: config.width, height: config.height });
    await page.setContent(ogImageHTML(config.width, config.height));
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outputDir, config.name) });
    console.log(`   ✓ ${config.name}`);
    await page.close();
  }

  await browser.close();

  // Copy to website assets
  console.log('\n📦 Copying to website assets...');
  const filesToCopy = [
    'logo-mark-512.png', 'logo-mark-192.png', 'apple-touch-icon-180.png',
    'favicon-32.png', 'logo-full.png', 'logo-full-white.png', 'og-image.png'
  ];
  
  for (const file of filesToCopy) {
    const src = path.join(outputDir, file);
    const dest = path.join(websiteAssetsDir, file);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`   ✓ Copied ${file}`);
    }
  }

  console.log('\n✅ Done! Assets are now in your website.');
}

generateAssets().catch(console.error);
