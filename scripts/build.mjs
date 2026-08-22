import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from "fs";
import { join, dirname, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const webRoot = join(projectRoot, "web");
const srcDir = join(projectRoot, "site-src", "pages");
const partialsDir = join(projectRoot, "site-src", "_partials");

const headTpl = readFileSync(join(partialsDir, "head.html"), "utf8");
const headerTpl = readFileSync(join(partialsDir, "header.html"), "utf8");
const footerTpl = readFileSync(join(partialsDir, "footer.html"), "utf8");

const NAV_KEYS = ["home", "partneri", "onas", "galerie", "skolka", "klubik", "vzdelavani", "tabory", "kontakt"];

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) throw new Error("Missing frontmatter");
  const meta = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: match[2].trim() };
}

function getRootDepth(outPath) {
  const parts = outPath.replace(/\\/g, "/").split("/").filter(Boolean);
  const depth = parts.length - 1;
  return depth === 0 ? "" : "../".repeat(depth);
}

function applyNav(header, active) {
  let h = header;
  for (const key of NAV_KEYS) {
    const placeholder = `{{nav_${key}}}`;
    h = h.replace(placeholder, key === active ? ' class="is-active"' : "");
  }
  return h;
}

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, files);
    else if (name.endsWith(".page.html")) files.push(p);
  }
  return files;
}

function build() {
  const pages = walk(srcDir);
  for (const srcPath of pages) {
    const raw = readFileSync(srcPath, "utf8");
    const { meta, body } = parseFrontmatter(raw);
    let rel = relative(srcDir, srcPath).replace(/\\/g, "/");
    if (rel.endsWith("index.page.html")) {
      rel = rel.slice(0, -"index.page.html".length) + "index.html";
    } else {
      rel = rel.replace(/\.page\.html$/, "/index.html");
    }
    const outPath = join(webRoot, rel);
    const root = getRootDepth(rel);
    const active = meta.nav || "";

    let header = headerTpl.replace(/\{\{root\}\}/g, root);
    header = applyNav(header, active);

    const html = `<!DOCTYPE html>
<html lang="cs">
<head>
${headTpl.replace(/\{\{title\}\}/g, meta.title).replace(/\{\{description\}\}/g, meta.description || "").replace(/\{\{root\}\}/g, root)}
</head>
<body>
${header}
<main id="content">
${body.replace(/\{\{root\}\}/g, root)}
</main>
${footerTpl.replace(/\{\{root\}\}/g, root)}
</body>
</html>`;

    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, "utf8");
    console.log("Built:", rel);
  }
  console.log(`Done: ${pages.length} pages`);
}

build();
