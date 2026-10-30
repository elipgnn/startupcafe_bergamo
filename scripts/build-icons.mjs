// Genera assets/js/icons.js con le sole icone Lucide usate nelle pagine (<i data-lucide="nome">).
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const files = [
    ...readdirSync('.').filter(f => f.endsWith('.html')),
    ...readdirSync('assets/js').filter(f => f.endsWith('.js') && f !== 'icons.js').map(f => 'assets/js/' + f),
];
const names = new Set();
for (const f of files) {
    for (const m of readFileSync(f, 'utf8').matchAll(/data-lucide="([a-z0-9-]+)"/g)) names.add(m[1]);
}

const icons = {};
for (const name of [...names].sort()) {
    const svg = readFileSync(`node_modules/lucide-static/icons/${name}.svg`, 'utf8');
    icons[name] = svg.replace(/<!--[\s\S]*?-->/g, '').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>[\s\S]*$/, '').replace(/\s*\n\s*/g, '');
}

const out = `// File generato da scripts/build-icons.mjs: non modificarlo a mano (npm run build:icons).
(function () {
    var I = ${JSON.stringify(icons)};
    function renderIcons(root) {
        (root || document).querySelectorAll('i[data-lucide]').forEach(function (el) {
            var name = el.getAttribute('data-lucide');
            if (!I[name]) return;
            var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('width', '24');
            svg.setAttribute('height', '24');
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', 'currentColor');
            svg.setAttribute('stroke-width', '2');
            svg.setAttribute('stroke-linecap', 'round');
            svg.setAttribute('stroke-linejoin', 'round');
            svg.setAttribute('aria-hidden', 'true');
            for (var i = 0; i < el.attributes.length; i++) {
                var a = el.attributes[i];
                if (a.name !== 'data-lucide') svg.setAttribute(a.name, a.value);
            }
            svg.setAttribute('class', ('lucide lucide-' + name + ' ' + (el.getAttribute('class') || '')).trim());
            svg.innerHTML = I[name];
            el.replaceWith(svg);
        });
    }
    window.renderIcons = renderIcons;
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { renderIcons(); });
    else renderIcons();
})();
`;
writeFileSync('assets/js/icons.js', out);
console.log(`icons.js: ${names.size} icone (${[...names].join(', ')})`);
