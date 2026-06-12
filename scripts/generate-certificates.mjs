import sharp from "sharp";

async function createCertificate(name, label, color) {
  const svg = `<svg width="640" height="480" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="${color}"/>
      </linearGradient>
    </defs>
    <rect width="640" height="480" rx="24" fill="url(#g)"/>
    <rect x="24" y="24" width="592" height="432" rx="16" fill="none" stroke="#1E63FF" stroke-width="4" opacity="0.35"/>
    <text x="320" y="180" text-anchor="middle" font-family="Arial,sans-serif" font-size="28" font-weight="700" fill="#1E63FF">ELEVEIIM</text>
    <text x="320" y="240" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" fill="#0f172a">${label}</text>
    <text x="320" y="320" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="#64748b">Certificate of Completion</text>
  </svg>`;

  await sharp(Buffer.from(svg))
    .webp({ quality: 85 })
    .toFile(`public/images/${name}`);
}

await createCertificate(
  "certificate1.webp",
  "Professional Certification",
  "#eef4ff"
);
await createCertificate(
  "certificate2.webp",
  "Industry Training Certificate",
  "#e8f0ff"
);

console.log("Certificate images generated.");
