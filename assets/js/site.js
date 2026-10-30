// Consenso cookie e Google Analytics 4.
// GA si carica SOLO dopo "Accetta"; con "Rifiuta" non parte nessuno script di tracciamento.
(function () {
    var GA_ID = 'G-BZYFRMPTGH';
    var KEY = 'suc-consenso-analytics';

    function readChoice() {
        try { return localStorage.getItem(KEY); } catch (e) { return null; }
    }

    function saveChoice(value) {
        try { localStorage.setItem(KEY, value); } catch (e) { }
    }

    function loadAnalytics() {
        if (window.__gaLoaded) return;
        window.__gaLoaded = true;
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { dataLayer.push(arguments); };
        gtag('js', new Date());
        gtag('config', GA_ID);
    }

    function deleteAnalyticsCookies() {
        var host = location.hostname;
        document.cookie.split(';').forEach(function (c) {
            var name = c.split('=')[0].trim();
            if (name.indexOf('_ga') !== 0) return;
            [host, '.' + host, '.' + host.replace(/^www\./, '')].forEach(function (d) {
                document.cookie = name + '=; Max-Age=0; path=/; domain=' + d;
            });
            document.cookie = name + '=; Max-Age=0; path=/';
        });
    }

    function closeBanner() {
        var el = document.getElementById('cookie-banner');
        if (el) el.remove();
    }

    function showBanner() {
        closeBanner();
        var el = document.createElement('div');
        el.id = 'cookie-banner';
        el.setAttribute('role', 'dialog');
        el.setAttribute('aria-live', 'polite');
        el.setAttribute('aria-label', 'Preferenze cookie');
        el.className = 'fixed bottom-0 inset-x-0 z-[90] bg-stone-950 text-stone-300 border-t border-stone-800 shadow-2xl';
        el.innerHTML =
            '<div class="container mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">' +
            '<p class="text-sm leading-normal flex-1">Usiamo cookie tecnici e, solo se accetti, Google Analytics per capire come viene usato il sito. ' +
            '<a href="/privacy" class="underline text-white hover:text-stone-300">Privacy e cookie</a></p>' +
            '<div class="flex gap-3 shrink-0">' +
            '<button type="button" data-consent="denied" class="px-6 py-3 rounded-full font-bold text-sm border border-stone-600 text-white hover:bg-stone-800 transition-colors">Rifiuta</button>' +
            '<button type="button" data-consent="granted" class="px-6 py-3 rounded-full font-bold text-sm bg-[#822621] text-white hover:bg-white hover:text-stone-900 transition-colors">Accetta</button>' +
            '</div></div>';
        el.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-consent]');
            if (!btn) return;
            var choice = btn.getAttribute('data-consent');
            saveChoice(choice);
            if (choice === 'granted') loadAnalytics();
            else deleteAnalyticsCookies();
            closeBanner();
        });
        document.body.appendChild(el);
    }

    // Link "Cookie" nel footer: riapre le preferenze
    window.openCookieSettings = function () { showBanner(); };

    // Conversioni: clic su Chiama, Indicazioni, WhatsApp (solo se GA è attivo)
    document.addEventListener('click', function (e) {
        var link = e.target.closest('[data-track]');
        if (link && window.gtag) gtag('event', link.getAttribute('data-track'), { link_url: link.href });
    });

    function init() {
        var choice = readChoice();
        if (choice === 'granted') loadAnalytics();
        else if (choice !== 'denied') showBanner();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
