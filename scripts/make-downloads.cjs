/* Builds the downloadable artifacts:
   - public/downloads/impact-magazine.pdf  (print-quality PDF via headless Edge)
   The ZIP is built separately from the exported site.
*/
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const ts = require("typescript");

const ROOT = path.resolve(__dirname, "..");

function loadTsData(relPath) {
  const file = path.join(ROOT, relPath);
  const src = fs.readFileSync(file, "utf8");
  const js = ts.transpileModule(src, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  }).outputText;
  const moduleObj = { exports: {} };
  const fn = new Function(
    "exports",
    "require",
    "module",
    "__filename",
    "__dirname",
    js,
  );
  fn(moduleObj.exports, require, moduleObj, file, path.dirname(file));
  return moduleObj.exports;
}

const { chapters } = loadTsData("src/data/magazine.ts");
const { sources, sourceLabel } = loadTsData("src/data/sources.ts");

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// ——— page assembly ———
const pages = [];

pages.push(`
<section class="sheet cover">
  <div class="cover-frame"></div>
  <div class="cover-kicker">The Planet &amp; the Ledger</div>
  <h1 class="cover-title">Impact<span>.</span></h1>
  <div class="cover-rule"></div>
  <p class="cover-deck">How cryptocurrency is reshaping energy, money, and the planet.</p>
  <p class="cover-credit">Presented by <span>Qumar Ahmad</span></p>
  <div class="cover-foot">A five-chapter magazine &middot; 2026</div>
</section>`);

// Table of contents
const tocRows = chapters
  .map((ch) => {
    const start = 3 + chapters
      .slice(0, chapters.indexOf(ch))
      .reduce((acc, c) => acc + 1 + c.articles.length, 0);
    return `<div class="toc-row"><span class="num">${ch.number}</span><span class="t">${esc(ch.title)}</span><span class="dots"></span><span class="pg">${start}</span></div>`;
  })
  .join("");
pages.push(`
<section class="sheet toc">
  <div class="running">Contents</div>
  <h2>What&rsquo;s inside</h2>
  <p class="sub">Five chapters, from the basics to the future.</p>
  ${tocRows}
  <p class="how">Click a chapter to jump to it in the live magazine.</p>
</section>`);

for (const ch of chapters) {
  pages.push(`
<section class="sheet divider">
  <div class="divider-num">${ch.number}</div>
  <h1>${esc(ch.title)}</h1>
  <div class="divider-rule"></div>
  <p>${esc(ch.subtitle)}</p>
</section>`);

  for (const a of ch.articles) {
    const paragraphs = a.paragraphs
      .map((p, i) => `<p${i === 0 ? ' class="drop-cap"' : ""}>${esc(p)}</p>`)
      .join("");
    const pull = a.pullQuote
      ? `<blockquote class="pullquote"><span class="q">&ldquo;</span>${esc(a.pullQuote)}</blockquote>`
      : "";
    const stat = a.stat
      ? `<div class="stat"><div class="stat-value">${esc(a.stat.value)}</div><div class="stat-label">${esc(a.stat.label)}</div><div class="stat-source">Source: ${esc(sourceLabel(a.stat.sourceId))}</div></div>`
      : "";
    pages.push(`
<section class="sheet article">
  <div class="running">Chapter ${ch.number} &middot; ${esc(ch.title)}</div>
  <h2>${esc(a.title)}</h2>
  ${paragraphs}
  ${pull}
  ${stat}
  <div class="page-foot"><span>Impact</span><span>${esc(a.id)} &middot; Chapter ${ch.number}</span></div>
</section>`);
  }
}

const sourceItems = sources
  .map(
    (s) =>
      `<div class="source"><div class="source-name">${esc(s.name)}</div><div class="source-url">${esc(s.url)}</div><div class="source-note">${esc(s.note)}</div></div>`,
  )
  .join("");

pages.push(`
<section class="sheet sources">
  <div class="running">References</div>
  <h2>Sources</h2>
  <p class="sub">All figures were accessed on 2 October 2026.</p>
  ${sourceItems}
</section>`);

pages.push(`
<section class="sheet about">
  <div class="running">Editor&rsquo;s note</div>
  <h2>About this magazine</h2>
  <p>Impact is a five-chapter digital magazine about what cryptocurrency is doing to the planet &mdash; to its energy grids, its financial systems, and its people.</p>
  <p>We aim for balance: the promise and the price, in the same spread. Every figure is approximate and attributed on the Sources page; nothing here is investment advice.</p>
  <p>Turn back to the cover and read it again.</p>
  <div class="page-foot"><span>Impact</span><span>2026</span></div>
</section>`);

pages.push(`
<section class="sheet back">
  <div class="back-frame"></div>
  <h2 class="back-title">Impact<span>.</span></h2>
  <p class="tagline">The promise and the price of money without borders.</p>
  <div class="cover-rule"></div>
  <div class="back-foot">Sources: Cambridge &middot; World Bank &middot; Ethereum.org</div>
</section>`);

const css = `
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { margin: 0; padding: 0; }
body { font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif; color: #221f1a; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.sheet { width: 210mm; height: 297mm; page-break-after: always; position: relative; overflow: hidden; background: #faf8f1; }
.sheet:last-child { page-break-after: auto; }
.running { font-family: Inter, Arial, sans-serif; font-size: 9pt; letter-spacing: 0.28em; text-transform: uppercase; color: #8b8578; border-bottom: 1px solid #e2dbcd; padding-bottom: 7pt; margin-bottom: 14pt; }
h2 { font-family: 'Playfair Display', Georgia, serif; font-size: 21pt; line-height: 1.1; margin-bottom: 10pt; position: relative; padding-bottom: 10pt; }
h2::after { content: ""; position: absolute; left: 0; bottom: 0; width: 30pt; height: 3pt; background: #0f766e; }
.article p, .about p { font-size: 10.5pt; line-height: 1.55; margin-bottom: 8pt; }
.drop-cap::first-letter { font-family: 'Playfair Display', Georgia, serif; font-size: 34pt; line-height: 0.78; float: left; padding: 6pt 7pt 0 0; color: #0f766e; font-weight: 700; }
.pullquote { position: relative; border: 0; margin: 14pt 0; padding: 10pt 0; text-align: center; font-family: 'Playfair Display', Georgia, serif; font-size: 14pt; font-style: italic; line-height: 1.4; color: #1f3b36; }
.pullquote .q { display: block; font-size: 26pt; line-height: 1; color: #0f766e; margin-bottom: 3pt; }
.stat { margin-top: 12pt; padding: 10pt 12pt; background: rgba(15,118,110,0.06); border-left: 3pt solid #0f766e; border-radius: 0 6pt 6pt 0; }
.stat-value { font-family: 'Playfair Display', Georgia, serif; font-size: 22pt; color: #0f766e; line-height: 1; }
.stat-label { font-size: 9.5pt; color: #55503f; margin-top: 4pt; }
.stat-source { font-size: 8pt; color: #a09a8c; margin-top: 5pt; padding-top: 5pt; border-top: 1px dashed #e2dbcd; }
.page-foot { position: absolute; bottom: 28pt; left: 40pt; right: 40pt; display: flex; justify-content: space-between; font-family: Inter, Arial, sans-serif; font-size: 7.5pt; letter-spacing: 0.18em; text-transform: uppercase; color: #a09a8c; border-top: 1px solid #e7dfd0; padding-top: 7pt; }
.article, .about { padding: 40pt 44pt 60pt; }
/* cover */
.cover { background: linear-gradient(165deg, #f9f4e9, #f0e7d4); display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 60pt 50pt; }
.cover-frame { position: absolute; top: 22pt; left: 22pt; right: 22pt; bottom: 22pt; border: 1pt solid rgba(15,118,110,0.25); }
.cover-kicker { font-family: Inter, Arial, sans-serif; font-size: 8.5pt; letter-spacing: 0.36em; text-transform: uppercase; color: #6f6a60; display: flex; align-items: center; gap: 10pt; margin-bottom: 34pt; }
.cover-kicker::before, .cover-kicker::after { content: ""; height: 1pt; width: 30pt; background: rgba(15,118,110,0.5); }
.cover-title { font-family: 'Playfair Display', Georgia, serif; font-size: 72pt; line-height: 0.9; letter-spacing: 0.02em; margin-bottom: 24pt; }
.cover-title span { color: #0f766e; }
.cover-rule { position: relative; width: 60pt; height: 1pt; background: #0f766e; margin: 0 auto 22pt; }
.cover-rule::after { content: ""; position: absolute; left: 50%; top: 50%; width: 7pt; height: 7pt; background: #0f766e; transform: translate(-50%,-50%) rotate(45deg); }
.cover-deck { font-family: 'Playfair Display', Georgia, serif; font-size: 14pt; font-style: italic; line-height: 1.5; color: #4b463e; max-width: 30ch; }
.cover-credit { font-family: Inter, Arial, sans-serif; font-size: 8.5pt; letter-spacing: 0.28em; text-transform: uppercase; color: #8b8578; margin-top: 26pt; }
.cover-credit span { display: block; font-family: 'Playfair Display', Georgia, serif; font-size: 16pt; letter-spacing: 0.04em; text-transform: none; color: #1c1a17; margin-top: 5pt; }
.cover-foot { position: absolute; bottom: 34pt; left: 0; right: 0; font-family: Inter, Arial, sans-serif; font-size: 8pt; letter-spacing: 0.22em; text-transform: uppercase; color: #8b8578; }
/* toc */
.toc, .sources { padding: 44pt 50pt 60pt; }
.toc .sub, .sources .sub { font-size: 10pt; color: #6f6a60; margin-bottom: 16pt; }
.toc-row { display: flex; align-items: baseline; padding: 9pt 0; border-bottom: 1pt solid #e8e1d2; }
.toc-row .num { font-family: 'Playfair Display', Georgia, serif; font-size: 13pt; color: #0f766e; width: 3ch; }
.toc-row .t { font-family: 'Playfair Display', Georgia, serif; font-size: 13pt; }
.toc-row .dots { flex: 1; border-bottom: 1pt dotted #c9c1af; margin: 0 8pt 3pt; }
.toc-row .pg { font-family: Inter, Arial, sans-serif; font-size: 8.5pt; color: #a09a8c; }
.toc .how { margin-top: 16pt; font-size: 9pt; color: #6f6a60; }
/* divider */
.divider { background: #14211e; color: #f4efe3; display: flex; flex-direction: column; justify-content: center; padding: 60pt 55pt; }
.divider-num { font-family: 'Playfair Display', Georgia, serif; font-size: 80pt; line-height: 1; color: #2f8f86; margin-bottom: 16pt; }
.divider h1 { font-family: 'Playfair Display', Georgia, serif; font-size: 36pt; line-height: 1.02; margin-bottom: 18pt; }
.divider-rule { width: 40pt; height: 3pt; background: #2f8f86; margin-bottom: 16pt; }
.divider p { font-family: 'Source Serif 4', Georgia, serif; font-size: 12.5pt; font-style: italic; line-height: 1.6; color: #bfc9c4; max-width: 30ch; }
/* sources */
.source { margin-bottom: 12pt; padding-left: 10pt; border-left: 2pt solid #e7dfd0; }
.source-name { font-weight: 600; }
.source-url { display: block; font-family: Inter, Arial, sans-serif; font-size: 8pt; color: #0f766e; word-break: break-all; margin-top: 2pt; }
.source-note { font-size: 9pt; color: #6f6a60; margin-top: 2pt; }
/* back cover */
.back { background: #14211e; color: #f4efe3; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 60pt 50pt; }
.back-frame { position: absolute; top: 22pt; left: 22pt; right: 22pt; bottom: 22pt; border: 1pt solid rgba(244,239,227,0.18); }
.back-title { font-family: 'Playfair Display', Georgia, serif; font-size: 40pt; }
.back-title span { color: #2f8f86; }
.back .tagline { font-family: 'Playfair Display', Georgia, serif; font-size: 14pt; font-style: italic; line-height: 1.5; color: #cfd9d3; max-width: 28ch; margin-top: 14pt; }
.back .cover-rule { margin: 18pt auto 18pt; }
.back-foot { position: absolute; bottom: 34pt; left: 0; right: 0; font-family: Inter, Arial, sans-serif; font-size: 8pt; letter-spacing: 0.22em; text-transform: uppercase; color: #9db3aa; }
`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Impact — How Cryptocurrency Is Reshaping the Planet</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,600&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;600&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
${pages.join("\n")}
</body>
</html>`;

const tmpDir = path.join(ROOT, "scripts", ".tmp");
fs.mkdirSync(tmpDir, { recursive: true });
const htmlPath = path.join(tmpDir, "magazine-print.html");
fs.writeFileSync(htmlPath, html, "utf8");

const outDir = path.join(ROOT, "public", "downloads");
fs.mkdirSync(outDir, { recursive: true });
const pdfPath = path.join(outDir, "impact-magazine.pdf");

const edgeCandidates = [
  process.env.ProgramFiles + "\\Microsoft\\Edge\\Application\\msedge.exe",
  process.env["ProgramFiles(x86)"] + "\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
];
const browser = edgeCandidates.find((p) => fs.existsSync(p));
if (!browser) {
  console.error("No Edge/Chrome executable found.");
  process.exit(1);
}

console.log("Rendering PDF with", browser);
execFileSync(
  browser,
  [
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    "--no-pdf-header-footer",
    "--print-to-pdf=" + pdfPath,
    "file:///" + htmlPath.replace(/\\/g, "/"),
  ],
  { stdio: "inherit", timeout: 120000 },
);

const size = fs.statSync(pdfPath).size;
console.log("Wrote", pdfPath, "(" + size + " bytes)");
if (size < 20000) {
  console.error("PDF looks suspiciously small — check Edge output above.");
  process.exit(1);
}
