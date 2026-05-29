const fs = require("fs");
const path = require("path");
const jpeg = require("jpeg-js");
const { PNG } = require("pngjs");

const ASSET_LOGO =
  "C:/Users/tbsmo/.cursor/projects/c-Users-tbsmo-eleveiim/assets/c__Users_tbsmo_AppData_Roaming_Cursor_User_workspaceStorage_ee11729ea83c2dbb2168262926303a70_images_NEW_LOGO_ELEVEIIM-a86642da-d7a0-4476-8ae7-d7efe4a2929a.png";
const ASSET_ICON =
  "C:/Users/tbsmo/.cursor/projects/c-Users-tbsmo-eleveiim/assets/c__Users_tbsmo_AppData_Roaming_Cursor_User_workspaceStorage_ee11729ea83c2dbb2168262926303a70_images_ELEVEIIM_FINAL_LOGO_ICON-412ddb7a-8714-479b-b404-1ff9754147f8.png";

function isDark(r, g, b) {
  return r < 50 && g < 50 && b < 50;
}

/** Flood-fill edge-connected dark pixels → white background */
function whiteBackgroundFromJpeg(inputPath, outputPath) {
  const buffer = fs.readFileSync(inputPath);
  const { width, height, data } = jpeg.decode(buffer, { useTArray: true });
  const total = width * height;
  const bg = new Uint8Array(total);
  const queue = [];

  const pushIfDark = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = y * width + x;
    if (bg[i]) return;
    const p = i * 4;
    if (isDark(data[p], data[p + 1], data[p + 2])) {
      bg[i] = 1;
      queue.push(i);
    }
  };

  for (let x = 0; x < width; x++) {
    pushIfDark(x, 0);
    pushIfDark(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    pushIfDark(0, y);
    pushIfDark(width - 1, y);
  }

  while (queue.length) {
    const i = queue.pop();
    const x = i % width;
    const y = (i - x) / width;
    pushIfDark(x - 1, y);
    pushIfDark(x + 1, y);
    pushIfDark(x, y - 1);
    pushIfDark(x, y + 1);
  }

  const png = new PNG({ width, height });
  for (let i = 0; i < total; i++) {
    const p = i * 4;
    if (bg[i]) {
      png.data[p] = 255;
      png.data[p + 1] = 255;
      png.data[p + 2] = 255;
      png.data[p + 3] = 255;
    } else {
      png.data[p] = data[p];
      png.data[p + 1] = data[p + 1];
      png.data[p + 2] = data[p + 2];
      png.data[p + 3] = 255;
    }
  }

  fs.writeFileSync(outputPath, PNG.sync.write(png));
  console.log(`Saved ${outputPath} (${width}x${height})`);
}

const root = path.join(__dirname, "..");

whiteBackgroundFromJpeg(
  ASSET_LOGO,
  path.join(root, "public/images/eleveiim-logo-white.png")
);
whiteBackgroundFromJpeg(
  ASSET_ICON,
  path.join(root, "public/images/eleveiim-icon-white.png")
);

const copies = [
  ["public/images/eleveiim-icon-white.png", "src/app/icon.png"],
  ["public/images/eleveiim-icon-white.png", "src/app/apple-icon.png"],
  ["public/images/eleveiim-logo-white.png", "public/og-image.png"],
  ["public/images/eleveiim-icon-white.png", "public/android-chrome-192x192.png"],
  ["public/images/eleveiim-icon-white.png", "public/android-chrome-512x512.png"],
  ["public/images/eleveiim-logo-white.png", "public/images/eleveiim-logo.png"],
  ["public/images/eleveiim-icon-white.png", "public/images/eleveiim-icon.png"],
];

for (const [src, dest] of copies) {
  try {
    fs.copyFileSync(path.join(root, src), path.join(root, dest));
    console.log(`Copied ${dest}`);
  } catch (err) {
    console.warn(`Skipped ${dest} (${err.code})`);
  }
}
