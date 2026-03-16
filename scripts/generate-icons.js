#!/usr/bin/env node
/**
 * Generates the FitMeal Planner app icon.
 * Outputs: ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png (1024×1024)
 *          ios/App/App/Assets.xcassets/Splash.imageset/splash.png  (2732×2732)
 */

const sharp = require('sharp');
const path  = require('path');
const fs    = require('fs');

// ─── Brand colours ────────────────────────────────────────────────────────────
const BG   = '#0d1117';   // dark background
const CARD = '#161b22';   // slightly lighter
const GREEN = '#22c55e';  // primary accent
const WHITE = '#e6edf3';

// ─── SVG icon source (1024×1024 viewBox) ──────────────────────────────────────
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <!-- Background -->
  <rect width="1024" height="1024" fill="${BG}" rx="200"/>

  <!-- Green circle backdrop -->
  <circle cx="512" cy="430" r="260" fill="${GREEN}" opacity="0.12"/>

  <!-- Barbell icon (simplified) -->
  <!-- Left weight plate -->
  <rect x="130" y="380" width="60" height="140" rx="14" fill="${GREEN}"/>
  <!-- Left collar -->
  <rect x="190" y="400" width="40" height="100" rx="8" fill="${GREEN}" opacity="0.7"/>
  <!-- Bar -->
  <rect x="230" y="448" width="564" height="28" rx="14" fill="${GREEN}"/>
  <!-- Right collar -->
  <rect x="794" y="400" width="40" height="100" rx="8" fill="${GREEN}" opacity="0.7"/>
  <!-- Right weight plate -->
  <rect x="834" y="380" width="60" height="140" rx="14" fill="${GREEN}"/>

  <!-- Leaf / fork accent above bar -->
  <path d="M452 280 Q512 210 572 280 Q542 340 512 350 Q482 340 452 280Z"
        fill="${GREEN}" opacity="0.9"/>
  <line x1="512" y1="350" x2="512" y2="400" stroke="${GREEN}" stroke-width="12"
        stroke-linecap="round"/>

  <!-- App name text -->
  <text x="512" y="660"
        font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
        font-size="96" font-weight="800" letter-spacing="-2"
        text-anchor="middle" fill="${WHITE}">FitMeal</text>
  <text x="512" y="750"
        font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
        font-size="56" font-weight="400" letter-spacing="8"
        text-anchor="middle" fill="${GREEN}">PLANNER</text>
</svg>`.trim();

// ─── Splash screen SVG (2732×2732 — covers all iPhone/iPad launch sizes) ─────
const splashSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2732 2732" width="2732" height="2732">
  <rect width="2732" height="2732" fill="${BG}"/>
  <!-- Centred icon at 512px logical size -->
  <g transform="translate(1110, 1060)">
    <rect width="512" height="512" fill="${BG}" rx="100"/>
    <circle cx="256" cy="215" r="130" fill="${GREEN}" opacity="0.12"/>
    <rect x="65" y="190" width="30" height="70" rx="7" fill="${GREEN}"/>
    <rect x="95" y="200" width="20" height="50" rx="4" fill="${GREEN}" opacity="0.7"/>
    <rect x="115" y="224" width="282" height="14" rx="7" fill="${GREEN}"/>
    <rect x="397" y="200" width="20" height="50" rx="4" fill="${GREEN}" opacity="0.7"/>
    <rect x="417" y="190" width="30" height="70" rx="7" fill="${GREEN}"/>
    <path d="M226 140 Q256 105 286 140 Q271 170 256 175 Q241 170 226 140Z" fill="${GREEN}" opacity="0.9"/>
    <line x1="256" y1="175" x2="256" y2="200" stroke="${GREEN}" stroke-width="6" stroke-linecap="round"/>
    <text x="256" y="370" font-family="Helvetica,Arial,sans-serif" font-size="48" font-weight="800"
          text-anchor="middle" fill="${WHITE}" letter-spacing="-1">FitMeal</text>
    <text x="256" y="410" font-family="Helvetica,Arial,sans-serif" font-size="28" font-weight="400"
          text-anchor="middle" fill="${GREEN}" letter-spacing="4">PLANNER</text>
  </g>
</svg>`.trim();

async function generate() {
  // ── App Icon 1024×1024 ────────────────────────────────────────────────────
  const iconDir = path.join(__dirname,
    '../ios/App/App/Assets.xcassets/AppIcon.appiconset');
  fs.mkdirSync(iconDir, { recursive: true });

  await sharp(Buffer.from(iconSvg))
    .resize(1024, 1024)
    .png()
    .toFile(path.join(iconDir, 'AppIcon-512@2x.png'));
  console.log('✔ App icon  1024×1024 → ios/.../AppIcon-512@2x.png');

  // ── Splash screen 2732×2732 ──────────────────────────────────────────────
  const splashDir = path.join(__dirname,
    '../ios/App/App/Assets.xcassets/Splash.imageset');
  fs.mkdirSync(splashDir, { recursive: true });

  await sharp(Buffer.from(splashSvg))
    .resize(2732, 2732)
    .png()
    .toFile(path.join(splashDir, 'splash.png'));
  console.log('✔ Splash    2732×2732 → ios/.../Splash.imageset/splash.png');

  // Write Contents.json for splash imageset if it doesn't exist
  const splashContents = path.join(splashDir, 'Contents.json');
  if (!fs.existsSync(splashContents)) {
    fs.writeFileSync(splashContents, JSON.stringify({
      images: [
        { idiom: 'universal', filename: 'splash.png', scale: '1x' }
      ],
      info: { author: 'xcode', version: 1 }
    }, null, 2));
  }

  console.log('\n✅  All icons generated.');
}

generate().catch(err => { console.error(err); process.exit(1); });
