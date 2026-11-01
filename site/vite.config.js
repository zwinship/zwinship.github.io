import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// The play pages (Wii, Windows 98) are plain scripts, so they get the same content as globals.
function playData() {
  let root = process.cwd();
  return {
    name: 'play-data',
    configResolved(config) { root = config.root; },
    async buildStart() {
      // hashed bundles from earlier builds would otherwise pile up in the repo
      rmSync(resolve(root, '../assets'), { recursive: true, force: true });
      const c = await import(`${pathToFileURL(resolve(root, 'src/content.js')).href}?t=${Date.now()}`);
      const sw = c.SOFTWARE;
      const software = {
        id: 'rd2dnet', title: 'rd2dnet: Boundary Discontinuity Designs on Street Networks', year: '2026', badge: `v${sw.version}`,
        meta: 'Software · Spatial Econometrics · Python and R',
        body: sw.body.join(' '), credit: sw.credit,
        tags: ['Python', 'R', 'Regression Discontinuity', 'Networks', 'Spatial'],
        links: sw.links,
      };
      const out = [
        '// Generated from site/src/content.js by `npm run build` in site/. Edit that file, not this one.',
        `const RESEARCH = ${JSON.stringify(c.RESEARCH, null, 1)};`,
        `const SOFTWARE = ${JSON.stringify(software, null, 1)};`,
        `const PERSONAL = ${JSON.stringify(c.PERSONAL, null, 1)};`,
        `const PRESENTATIONS = ${JSON.stringify(c.PRESENTATIONS, null, 1)};`,
        `const EXPERIENCE = ${JSON.stringify(c.EXPERIENCE, null, 1)};`,
        `const MEDIA = ${JSON.stringify(c.MEDIA)};`,
        `const BLOG = ${JSON.stringify(c.BLOG.posts)};`,
        `const BLOG_STATUS = ${JSON.stringify(c.BLOG.status)};`,
        `const SKILLS = ${JSON.stringify(c.PROFILE.skills)};`,
        `const PROFILE = ${JSON.stringify(c.PROFILE, null, 1)};`,
        `const EMAIL = ${JSON.stringify(c.EMAIL)};`,
        'const byId = id => [...RESEARCH, SOFTWARE, ...PERSONAL].find(p => p.id === id);',
        '',
      ].join('\n');
      writeFileSync(resolve(root, '../play/shared/data.js'), out);
    },
  };
}

export default defineConfig({
  plugins: [react(), playData()],
  base: '/',
  build: {
    outDir: '..',
    emptyOutDir: false,      // the repo root also holds images/, videos/, play/ and the PDFs
    assetsDir: 'assets',
  },
});
