const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BRAND_GREEN = '#36736A';

const markPaths = `
  <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4097 45.3592L11.2856 39.3408L11.3229 39.3408L20.9198 29.9095L26.6705 35.561C28.4007 37.09 32.8021 39.3261 36.5662 36.038C37.9105 34.9004 39.9942 31.7004 37.5744 28.0012L32.6079 23.1205L35.0725 20.6984L39.7402 25.2489C41.4455 27.3896 43.8329 32.8894 39.7402 37.7628L32.6079 44.772C30.2305 47.0718 23.8624 50.4088 17.4097 45.3592ZM29.5832 42.9372L31.4876 41.0656C28.082 40.772 25.1644 38.7414 24.1312 37.7628L20.8451 34.5334L15.916 39.3775L19.7622 42.9372C23.8549 45.9611 28.0148 44.1971 29.5832 42.9372Z" fill="white"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M32.5903 10.6408L38.7144 16.6592H38.6771L29.0802 26.0905L23.3295 20.439C21.5993 18.91 17.1979 16.6739 13.4338 19.962C12.0895 21.0996 10.0058 24.2996 12.4256 27.9988L17.3921 32.8795L14.9275 35.3016L10.2598 30.7511C8.5545 28.6104 6.1671 23.1106 10.2598 18.2372L17.3921 11.228C19.7695 8.92822 26.1376 5.59117 32.5903 10.6408ZM20.4168 13.0628L18.5124 14.9344C21.918 15.228 24.8356 17.2586 25.8688 18.2372L29.1549 21.4666L34.084 16.6225L30.2378 13.0628C26.1451 10.0389 21.9852 11.8029 20.4168 13.0628Z" fill="white"/>
`;

// Current version (smaller text)
const currentVersion = `
<svg width="200" height="56" viewBox="0 0 200 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="52" height="52" rx="12" fill="${BRAND_GREEN}"/>
  <g transform="translate(3, 0) scale(1)">${markPaths}</g>
  <text x="62" y="38" font-family="system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="26" font-weight="600" fill="#1a1a2e">sesame3</text>
</svg>
`;

// New version (larger text - closer to mark height)
const largerTextVersion = `
<svg width="220" height="56" viewBox="0 0 220 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="52" height="52" rx="12" fill="${BRAND_GREEN}"/>
  <g transform="translate(3, 0) scale(1)">${markPaths}</g>
  <text x="64" y="40" font-family="system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="32" font-weight="600" fill="#1a1a2e">sesame3</text>
</svg>
`;

// Even larger text version
const evenLargerTextVersion = `
<svg width="240" height="56" viewBox="0 0 240 56" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="52" height="52" rx="12" fill="${BRAND_GREEN}"/>
  <g transform="translate(3, 0) scale(1)">${markPaths}</g>
  <text x="64" y="42" font-family="system-ui, -apple-system, BlinkMacSystemFont, sans-serif" font-size="36" font-weight="600" fill="#1a1a2e">sesame3</text>
</svg>
`;

async function generateComparison() {
  const outputDir = path.join(__dirname, 'variations');
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({ deviceScaleFactor: 2 });

  console.log('🎨 Comparing text sizes...\n');

  // Save SVGs
  fs.writeFileSync(path.join(outputDir, 'logo-boxed-text-small.svg'), currentVersion);
  fs.writeFileSync(path.join(outputDir, 'logo-boxed-text-medium.svg'), largerTextVersion);
  fs.writeFileSync(path.join(outputDir, 'logo-boxed-text-large.svg'), evenLargerTextVersion);

  // Generate comparison
  const page = await context.newPage();
  await page.setViewportSize({ width: 700, height: 550 });
  await page.setContent(`
    <!DOCTYPE html><html><head><style>
      body { margin: 30px; background: white; font-family: system-ui; }
      .row { display: flex; align-items: center; margin: 20px 0; padding: 25px; border: 1px solid #eee; border-radius: 12px; gap: 20px; }
      .label { width: 160px; font-size: 13px; color: #666; }
      h2 { margin-bottom: 20px; font-size: 18px; }
    </style></head>
    <body>
      <h2>Text Size Comparison</h2>
      <div class="row">
        <div class="label">A. Current (font-size: 26)</div>
        ${currentVersion}
      </div>
      <div class="row">
        <div class="label">B. Medium (font-size: 32)</div>
        ${largerTextVersion}
      </div>
      <div class="row">
        <div class="label">C. Large (font-size: 36)</div>
        ${evenLargerTextVersion}
      </div>
    </body></html>
  `);
  await page.screenshot({ path: path.join(outputDir, 'comparison-text-sizes.png'), fullPage: true });
  await page.close();

  await browser.close();
  console.log('✅ Check variations/comparison-text-sizes.png');
}

generateComparison().catch(console.error);
