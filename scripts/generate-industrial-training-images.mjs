import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const peopleDir = "public/images/industrial-training";

async function createImage(filePath, label, subtitle, colors) {
  const [bgStart, bgEnd, accent] = colors;
  const svg = `<svg width="640" height="480" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgStart}"/>
        <stop offset="100%" stop-color="${bgEnd}"/>
      </linearGradient>
    </defs>
    <rect width="640" height="480" rx="24" fill="url(#bg)"/>
    <circle cx="520" cy="80" r="120" fill="${accent}" opacity="0.15"/>
    <circle cx="100" cy="400" r="90" fill="${accent}" opacity="0.12"/>
    <rect x="48" y="48" width="544" height="384" rx="20" fill="none" stroke="${accent}" stroke-width="3" opacity="0.25"/>
    <text x="320" y="200" text-anchor="middle" font-family="Arial,sans-serif" font-size="26" font-weight="700" fill="${accent}">ELEVEIIM</text>
    <text x="320" y="250" text-anchor="middle" font-family="Arial,sans-serif" font-size="20" fill="#1E293B">${label}</text>
    <text x="320" y="300" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="#64748b">${subtitle}</text>
  </svg>`;

  await sharp(Buffer.from(svg))
    .webp({ quality: 85 })
    .toFile(filePath);
}

await mkdir(peopleDir, { recursive: true });

await createImage(
  "public/images/industrial-training-hero.webp",
  "Industrial Training",
  "Learn · Build · Get Hired",
  ["#ffffff", "#eef4ff", "#0B63CE"]
);

const people = [
  ["student-1.webp", "Student Success", "Full Stack Track"],
  ["student-2.webp", "Student Success", "Digital Marketing"],
  ["student-3.webp", "Student Success", "Graphic Design"],
  ["mentor-1.webp", "Industry Mentor", "Full Stack Expert"],
  ["mentor-2.webp", "Industry Mentor", "Marketing Expert"],
  ["mentor-3.webp", "Industry Mentor", "Design Expert"],
];

for (const [file, label, sub] of people) {
  await createImage(
    path.join(peopleDir, file),
    label,
    sub,
    ["#f8fafc", "#e0f2fe", "#0B63CE"]
  );
}

console.log("Industrial training placeholder images generated.");
