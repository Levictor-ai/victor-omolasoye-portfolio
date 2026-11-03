const fs = require('fs');
const path = require('path');
const dir = 'data/projects';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
for (const f of files.sort()) {
  const p = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  if (!p.features || p.features.length === 0) continue;
  const usedImageSrcs = new Set();
  const blocks = [];
  if (p.slug === 'hapnan') {
    const onboarding = p.images.filter((img) => /(onboarding|sign[-_]?in|sign[-_]?up|forgot[-_]?pass)/i.test(img.src));
    const discovery = p.images.filter((img) => /(home|trending|event[-_]?details)/i.test(img.src));
    const planning = p.images.filter((img) => /(saved[-_]?events|ticket|payment|notification)/i.test(img.src));
    for (const [key, title, images] of [
      ['onboarding', 'Onboarding & Account', onboarding],
      ['discovery', 'Discovery', discovery],
      ['planning', 'Planning & Tickets', planning],
    ]) {
      blocks.push({ title, images });
    }
  } else {
    for (const feature of p.features) {
      const words = feature.title.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
      const matched = p.images.filter(
        (img) => !usedImageSrcs.has(img.src) && words.some((w) => img.src.toLowerCase().includes(w)),
      );
      matched.forEach((img) => usedImageSrcs.add(img.src));
      blocks.push({ title: feature.title, images: matched });
    }
  }
  const missing = blocks.filter((b) => b.images.length === 0);
  if (missing.length) {
    console.log('=== ' + p.slug + ' — features WITHOUT screens:');
    for (const b of missing) console.log('   - ' + b.title);
  }
}
console.log('scan complete');
