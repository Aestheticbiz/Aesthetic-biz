const fs = require("fs");
const path = require("path");

const src = "C:/Users/ignat/Local Sites/Lumina/css/styles.css";
let css = fs.readFileSync(src, "utf8");

css = css.replace(/@import url\([^)]+\);\s*/g, "");
css = css.replace(
  /^\/\*[\s\S]*?\*\/\s*/,
  "/* AestheticBiz - Lumina-based Patient Revenue Platform demo */\n\n"
);

const out = "C:/Users/ignat/Local Sites/aestheticbiz/app/globals.css";
fs.writeFileSync(out, css, "utf8");
console.log("wrote globals.css", fs.statSync(out).size);

const imgSrc = "C:/Users/ignat/Local Sites/_shared-medspa-images/images";
const imgDst = "C:/Users/ignat/Local Sites/aestheticbiz/public/images";
for (const name of fs.readdirSync(imgSrc)) {
  if (!/\.(jpe?g|png|webp)$/i.test(name)) continue;
  fs.copyFileSync(path.join(imgSrc, name), path.join(imgDst, name));
  console.log("copied", name, fs.statSync(path.join(imgDst, name)).size);
}
