import sharp from "sharp";
import { fileURLToPath } from "node:url";

const logoPath = fileURLToPath(new URL("../assets/images/UESC-logo4.png", import.meta.url));
const iconPath = fileURLToPath(new URL("../src/app/icon.png", import.meta.url));
const socialCardPath = fileURLToPath(new URL("../src/app/opengraph-image.png", import.meta.url));

const icon = await sharp(logoPath)
  .resize({ width: 118, height: 118, fit: "inside" })
  .extend({
    top: 5,
    bottom: 5,
    left: 5,
    right: 5,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png({ compressionLevel: 9 })
  .toBuffer();

await sharp(icon).toFile(iconPath);

const socialLogo = await sharp(logoPath)
  .resize({ width: 190, height: 190, fit: "inside" })
  .png()
  .toBuffer();

const socialCard = `
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#071a3d"/>
        <stop offset="1" stop-color="#164ea7"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#background)"/>
    <circle cx="1120" cy="70" r="200" fill="#ffffff" opacity="0.06"/>
    <rect x="70" y="60" width="220" height="220" rx="110" fill="#ffffff"/>
    <text x="340" y="145" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="700">
      Universal Engineering &amp;
    </text>
    <text x="340" y="212" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="54" font-weight="700">
      Science College
    </text>
    <text x="340" y="270" fill="#ffffff" fill-opacity="0.84" font-family="Arial, Helvetica, sans-serif" font-size="27">
      Engineering futures in Lalitpur since 2000
    </text>
    <rect x="70" y="365" width="1060" height="2" rx="1" fill="#ffffff" opacity="0.18"/>
    <text x="70" y="430" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="28">
      Chakupat, Lalitpur, Nepal
    </text>
    <text x="70" y="485" fill="#ffffff" fill-opacity="0.78" font-family="Arial, Helvetica, sans-serif" font-size="23">
      Affiliated with Pokhara University
    </text>
    <text x="70" y="565" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="31" font-weight="700">
      UESC
    </text>
  </svg>
`;

await sharp(Buffer.from(socialCard))
  .composite([{ input: socialLogo, left: 85, top: 75 }])
  .png({ compressionLevel: 9 })
  .toFile(socialCardPath);
