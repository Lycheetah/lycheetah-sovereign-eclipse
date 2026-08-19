#!/usr/bin/env node
/**
 * Canonical source: src/ + styles/ + index.html
 * Release artifact:  dist/sovereign-eclipse.html
 *
 * Standalone. No source tree required to play.
 * Three.js still comes from the CDN (same as every forge HTML).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const srcRoot = path.join(root, 'src');
const entry = path.join(srcRoot, 'main.js');
const indexPath = path.join(root, 'index.html');
const outPath = path.join(root, 'dist', 'sovereign-eclipse.html');

const IMPORT_RE = /import\s+(?:(\*\s+as\s+\w+)|(\{[\s\S]*?\}))\s+from\s+['"]([^'"]+)['"]\s*;?/g;

function isExternal(spec){
  return spec === 'three' || spec.startsWith('three/');
}

function resolveFrom(fromFile, spec){
  const abs = path.normalize(path.join(path.dirname(fromFile), spec));
  return abs.endsWith('.js') ? abs : abs + '.js';
}

function relId(abs){
  return path.relative(root, abs).split(path.sep).join('/');
}

function collect(start){
  const order = [];
  const seen = new Set();
  const files = new Map();
  const externals = new Map(); // spec -> raw import line set

  function walk(file){
    const id = relId(file);
    if(seen.has(id)) return;
    seen.add(id);
    const source = fs.readFileSync(file, 'utf8');
    files.set(id, source);
    const deps = [];
    let m;
    const re = new RegExp(IMPORT_RE.source, 'g');
    while((m = re.exec(source))){
      const spec = m[3];
      if(isExternal(spec)){
        externals.set(spec, m[0].trim());
        continue;
      }
      const dep = resolveFrom(file, spec);
      if(!fs.existsSync(dep)){
        throw new Error('Missing import '+spec+' from '+id);
      }
      deps.push(dep);
    }
    for(const dep of deps) walk(dep);
    order.push(id);
  }

  walk(start);
  return { order, files, externals };
}

function parseNamed(block){
  return block
    .replace(/^{|}$/g, '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => {
      const as = s.split(/\s+as\s+/);
      if(as.length === 2) return { name: as[0].trim(), alias: as[1].trim() };
      return { name: s, alias: s };
    });
}

function wrapModule(id, source){
  const requires = [];
  let body = source.replace(IMPORT_RE, (full, star, named, spec) => {
    if(isExternal(spec)) return '';
    // resolve relative to this module
    const fromAbs = path.join(root, id);
    const dep = relId(resolveFrom(fromAbs, spec));
    if(star){
      const alias = star.replace(/\*\s+as\s+/, '').trim();
      requires.push(`  const ${alias} = __require(${JSON.stringify(dep)});`);
      return '';
    }
    const names = parseNamed(named);
    const bind = names.map(({name, alias}) =>
      alias === name ? name : `${name}: ${alias}`
    ).join(', ');
    requires.push(`  const { ${bind} } = __require(${JSON.stringify(dep)});`);
    return '';
  });

  const exported = [];
  body = body.replace(/^export\s+\{([^}]+)\}\s*;?/gm, (_, inner) => {
    for(const {name, alias} of parseNamed('{' + inner + '}')){
      exported.push([alias, name]);
    }
    return '';
  });
  body = body.replace(/^export\s+function\s+([A-Za-z0-9_]+)/gm, (_, n) => {
    exported.push([n, n]);
    return 'function ' + n;
  });
  body = body.replace(/^export\s+(const|let|var)\s+([A-Za-z0-9_]+)/gm, (_, kw, n) => {
    exported.push([n, n]);
    return kw + ' ' + n;
  });

  const assigns = exported
    .map(([exp, local]) => `  exports.${exp} = ${local};`)
    .join('\n');

  return (
    `__define(${JSON.stringify(id)}, function(exports, __require){\n` +
    requires.join('\n') + (requires.length ? '\n' : '') +
    body.trim() + '\n' +
    (assigns ? assigns + '\n' : '') +
    '});\n'
  );
}

function cssBundle(){
  const files = ['base.css','hud.css','screens.css','station.css','forge.css'];
  return files.map(name => {
    const raw = fs.readFileSync(path.join(root, 'styles', name), 'utf8');
    return `/* ${name} */\n${raw}`;
  }).join('\n');
}

function htmlShell(css, js){
  let html = fs.readFileSync(indexPath, 'utf8');
  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    '<title>LYCHEETAH: SOVEREIGN ECLIPSE — 0.27.5.2 Nine Worlds</title>'
  );
  html = html.replace(
    /<link rel="stylesheet" href="\.\/styles\/[^"]+"\/>\n?/g,
    ''
  );
  html = html.replace(
    '</head>',
    `<style>\n${css}\n</style>\n</head>`
  );
  html = html.replace(
    /INITIALISING&nbsp;<b>SOVEREIGN ECLIPSE \/\/ FORGE 0\.27\.5<\/b>/,
    'INITIALISING&nbsp;<b>SOVEREIGN ECLIPSE // 0.27.5.2</b>'
  );
  html = html.replace(
    'Lycheetah Interactive // Prototype Build 0.27.5',
    'Lycheetah Interactive // Prototype Build 0.27.5.2'
  );
  html = html.replace(
    '<script type="module" src="./src/main.js"></script>',
    `<script type="module">\n${js}\n</script>`
  );
  return html;
}

const { order, files, externals } = collect(entry);

const runtime = `const __modules = Object.create(null);
function __define(id, factory){ __modules[id] = { factory, exports: null }; }
function __require(id){
  const rec = __modules[id];
  if(!rec) throw new Error('Missing module '+id);
  if(!rec.exports){
    rec.exports = {};
    rec.factory(rec.exports, __require);
  }
  return rec.exports;
}
`;

const externalLines = [...externals.values()].join('\n');
const wrapped = order.map(id => wrapModule(id, files.get(id))).join('\n');
const js = `${externalLines}\n\n${runtime}\n${wrapped}\n__require(${JSON.stringify(relId(entry))});\n`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
const html = htmlShell(cssBundle(), js);
fs.writeFileSync(outPath, html);

const leftover = html.match(/from\s+['"]\.\//g);
if(leftover){
  console.error('Build leaked local imports:', leftover.length);
  process.exit(1);
}

console.log('wrote', path.relative(root, outPath));
console.log('bytes', html.length);
console.log('modules', order.length);
console.log('externals', [...externals.keys()].join(', '));
