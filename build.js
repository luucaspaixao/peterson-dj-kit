/**
 * build.js
 * 
 * Script de build simples que lê o site-content.json
 * e gera o index.html final com todo o conteúdo injetado.
 * 
 * Uso: node build.js
 * 
 * Isso roda automaticamente no deploy (Netlify/Vercel)
 * toda vez que o DJ salva algo pelo painel admin.
 */

const fs = require('fs');
const path = require('path');

// Lê o conteúdo editável
const content = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'src/content/site-content.json'), 'utf-8')
);

// Lê o template
const template = fs.readFileSync(path.join(__dirname, 'src/template.html'), 'utf-8');

// ── Helpers ──

function generateReleasesHTML(releases) {
  const delays = [100, 200, 300, 400];
  return releases.map((r, i) => `
    <div class="reveal glass-panel p-4 rounded-custom glow-hover transition-all group" style="transition-delay: ${delays[i] || (i + 1) * 100}ms;">
      <div class="relative mb-4 aspect-square overflow-hidden rounded-custom">
        <img alt="${r.title} Cover" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="${r.cover}" />
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-brand/20 backdrop-blur-sm transition-opacity">
          <button class="w-12 h-12 bg-brand text-black rounded-full flex items-center justify-center">
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
          </button>
        </div>
      </div>
      <h3 class="font-title text-lg text-white mb-1">${r.title}</h3>
      <p class="text-xs font-mono text-brand/60 mb-4 uppercase">${r.type} • ${r.year} • ${r.label}</p>
      <div class="flex gap-4 text-gray-400">
        ${r.spotify_url ? `<a class="hover:text-brand transition-colors" href="${r.spotify_url}" target="_blank" rel="noopener"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.973 14.408c-.197.32-.612.423-.93.226-2.522-1.54-5.7-1.89-9.44-1.033-.362.08-.72-.14-.8-.503-.08-.363.14-.72.502-.8 4.102-.937 7.625-.538 10.462 1.196.32.197.424.612.227.931zm1.325-2.716c-.247.404-.775.534-1.18.286-2.887-1.776-7.288-2.288-10.7-1.25-.458.138-.934-.127-1.072-.586-.137-.458.127-.934.586-1.072 3.89-1.18 8.74-.616 12.08 1.442.404.248.535.776.286 1.18zm.114-2.8c-3.463-2.056-9.176-2.246-12.485-1.242-.53.16-1.09-.142-1.25-.672-.16-.53.142-1.09.672-1.25 3.805-1.155 10.11-.93 14.103 1.44.477.283.633.896.35 1.373-.284.477-.897.633-1.373.352h-.017z"></path></svg></a>` : ''}
        ${r.soundcloud_url ? `<a class="hover:text-brand transition-colors" href="${r.soundcloud_url}" target="_blank" rel="noopener"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 0H3C1.343 0 0 1.343 0 3v18c0 1.657 1.343 3 3 3h18c1.657 0 3-1.343 3-3V3c0-1.657-1.343-3-3-3z"></path></svg></a>` : ''}
      </div>
    </div>
  `).join('\n');
}

function generateGalleryHTML(gallery) {
  const delays = [100, 200, 300, 400];
  const offsetClass = (i) => i >= 2 ? 'md:translate-y-8' : '';
  return gallery.map((g, i) => `
    <div class="reveal relative overflow-hidden rounded-custom aspect-[3/4] group ${offsetClass(i)}" style="transition-delay: ${delays[i]}ms;">
      <img alt="Live Photo" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="${g.image}" />
      <div class="absolute inset-0 bg-gradient-to-t from-cyber-black via-transparent to-transparent opacity-80"></div>
      <div class="absolute bottom-4 left-4 font-mono text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity">${g.caption}</div>
    </div>
  `).join('\n');
}

function generateVideosHTML(videos) {
  return videos.map((v, i) => `
    <div class="reveal glass-panel p-2 rounded-custom glow-hover" style="transition-delay: ${(i + 1) * 100}ms;">
      <div class="aspect-video bg-black rounded-custom flex items-center justify-center relative overflow-hidden">
        <img alt="${v.title}" class="absolute inset-0 w-full h-full object-cover opacity-50" src="${v.thumbnail}" />
        <div class="z-10 text-center">
          <a href="${v.youtube_url}" target="_blank" rel="noopener" class="w-20 h-20 border-2 border-brand text-brand rounded-full flex items-center justify-center hover:bg-brand hover:text-black transition-all mb-4 mx-auto">
            <svg class="h-10 w-10 ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"></path></svg>
          </a>
          <p class="font-title text-sm tracking-widest text-white">${v.title}</p>
        </div>
      </div>
    </div>
  `).join('\n');
}

function generateGenresHTML(genres) {
  const colors = ['brand', 'cyber-magenta', 'cyber-purple'];
  return genres.map((g, i) => {
    const c = colors[i % colors.length];
    return `<div class="px-4 py-2 bg-${c}/10 border border-${c}/20 rounded-custom text-xs text-${c}">${g}</div>`;
  }).join('\n');
}

function generateSocialLinksHTML(links) {
  const names = { soundcloud: 'SOUNDCLOUD', spotify: 'SPOTIFY', instagram: 'INSTAGRAM', twitch: 'TWITCH' };
  return Object.entries(links)
    .filter(([_, url]) => url)
    .map(([key, url]) => `<a class="text-white/40 hover:text-brand transition-colors" href="${url}" target="_blank" rel="noopener">${names[key] || key.toUpperCase()}</a>`)
    .join('\n');
}

// ── Substituições no template ──

let html = template;

// Site / Hero
html = html.replace(/\{\{site\.title\}\}/g, content.site.title);
html = html.replace(/\{\{site\.tagline\}\}/g, content.site.tagline);
html = html.replace(/\{\{site\.badge\}\}/g, content.site.badge);
html = html.replace(/\{\{site\.hero_cta_primary\}\}/g, content.site.hero_cta_primary);
html = html.replace(/\{\{site\.hero_cta_secondary\}\}/g, content.site.hero_cta_secondary);
html = html.replace(/\{\{site\.bpm_display\}\}/g, content.site.bpm_display);

// About
html = html.replace(/\{\{about\.section_title\}\}/g, content.about.section_title);
html = html.replace(/\{\{about\.photo\}\}/g, content.about.photo);
html = html.replace(/\{\{about\.bio_paragraph_1\}\}/g, content.about.bio_paragraph_1);
html = html.replace(/\{\{about\.bio_paragraph_2\}\}/g, content.about.bio_paragraph_2);
html = html.replace(/\{\{about\.genres\}\}/g, generateGenresHTML(content.about.genres));

// Dynamic sections
html = html.replace(/\{\{releases\}\}/g, generateReleasesHTML(content.releases));
html = html.replace(/\{\{gallery\}\}/g, generateGalleryHTML(content.gallery));
html = html.replace(/\{\{videos\}\}/g, generateVideosHTML(content.videos));

// Press Kit
html = html.replace(/\{\{press_kit\.description\}\}/g, content.press_kit.description);
html = html.replace(/\{\{press_kit\.epk_file\}\}/g, content.press_kit.epk_file || '#');
html = html.replace(/\{\{press_kit\.tech_rider_file\}\}/g, content.press_kit.tech_rider_file || '#');
html = html.replace(/\{\{press_kit\.video_reel_file\}\}/g, content.press_kit.video_reel_file || '#');

// Contact
html = html.replace(/\{\{contact\.intro\}\}/g, content.contact.intro);
html = html.replace(/\{\{contact\.email\}\}/g, content.contact.email);
html = html.replace(/\{\{contact\.instagram\}\}/g, content.contact.instagram);

// Social + Footer
html = html.replace(/\{\{social_links\}\}/g, generateSocialLinksHTML(content.social_links));
html = html.replace(/\{\{footer\.copyright\}\}/g, content.footer.copyright);

// Título do documento
const titleParts = content.site.title.split('_');
html = html.replace(/\{\{page_title\}\}/g, `${content.site.title} // Digital Press Kit`);

// Escreve o output
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

// Copia o admin para dist
const adminDistDir = path.join(distDir, 'admin');
if (!fs.existsSync(adminDistDir)) fs.mkdirSync(adminDistDir, { recursive: true });
fs.copyFileSync(path.join(__dirname, 'public/admin/index.html'), path.join(adminDistDir, 'index.html'));
fs.copyFileSync(path.join(__dirname, 'public/admin/config.yml'), path.join(adminDistDir, 'config.yml'));

fs.writeFileSync(path.join(distDir, 'index.html'), html);

console.log('✅ Build concluído! → dist/index.html');
console.log(`   Site: ${content.site.title}`);
console.log(`   Seções: Hero, About, ${content.releases.length} Releases, ${content.gallery.length} Fotos, ${content.videos.length} Vídeos, Press Kit, Contato`);
