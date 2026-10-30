// Eventi con pubblicazione programmata.
// Un evento è visibile da publishFrom (incluso) fino al giorno prima di hideAfter, secondo la data di Europe/Rome.
// Per vedere la pagina come apparirà in un altro giorno: /Cosa-fare-a-bergamo?anteprima=2026-11-04
(function () {
    var BASE = 'https://startupcafebergamo.it';
    var INDIRIZZO = 'Via San Bernardino 67/a, di fronte alla Biblioteca Tiraboschi';
    var MAPS = 'https://www.google.com/maps/dir/?api=1&destination=Start+Up+Caf%C3%A8%2C+Via+San+Bernardino+67%2Fa%2C+24122+Bergamo';
    var TEL = 'tel:+393474243702';

    var EVENTI = [
        {
            slug: 'spritz-party-national-candy-day',
            titolo: 'Spritz Party · National Candy Day',
            data: '2026-11-04',
            dataEstesa: 'Mercoledì 4 novembre 2026',
            inizio: '18:30',
            fine: '22:30',
            testoBreve: 'Caramelle gratis per tutti, Spritz a 3,50 €, DJ set e beer pong gratuito.',
            testoLungo: 'Mercoledì 4 novembre lo Spritz Party festeggia il National Candy Day. Caramelle gratis per tutti, Spritz a 3,50 €, DJ set per tutta la serata e beer pong gratuito: in palio una bottiglia di Prosecco per chi vince. Dalle 18:30 alle 22:30 da Start Up Cafè, in Via San Bernardino 67/a, di fronte alla Biblioteca Tiraboschi a Bergamo.',
            locandina: '/images/eventi/spritz-party-2026-11-04.jpg',
            publishFrom: '2026-11-02',
            hideAfter: '2026-11-05'
        },
        {
            slug: 'spritz-party-singles-day',
            titolo: "Spritz Party · Singles' Day",
            data: '2026-11-11',
            dataEstesa: 'Mercoledì 11 novembre 2026',
            inizio: '18:30',
            fine: '22:30',
            // TODO: aggiornare il testo quando è deciso il regalo per i single.
            testoBreve: '11/11, un regalo per tutti i single. Spritz a 3,50 €, DJ set e beer pong gratuito.',
            testoLungo: "Mercoledì 11 novembre, Singles' Day: single, è la vostra festa! Allo Spritz Party c'è un regalo per tutti i single, Spritz a 3,50 €, DJ set per tutta la serata e beer pong gratuito con una bottiglia di Prosecco in palio per chi vince. Dalle 18:30 alle 22:30 da Start Up Cafè, in Via San Bernardino 67/a, di fronte alla Biblioteca Tiraboschi a Bergamo.",
            locandina: '/images/eventi/spritz-party-2026-11-11.jpg',
            publishFrom: '2026-11-09',
            hideAfter: '2026-11-12'
        },
        {
            slug: 'spritz-party-national-princess-day',
            titolo: 'Spritz Party · Principesse per una sera',
            data: '2026-11-18',
            dataEstesa: 'Mercoledì 18 novembre 2026',
            inizio: '18:30',
            fine: '22:30',
            // TODO: aggiornare il testo quando è deciso il regalo per le ragazze.
            testoBreve: 'National Princess Day, un regalo per ogni ragazza che partecipa. Spritz a 3,50 €.',
            testoLungo: 'Mercoledì 18 novembre, National Princess Day: principesse per una sera! Allo Spritz Party un regalo per ogni ragazza che partecipa, Spritz a 3,50 €, DJ set per tutta la serata e beer pong gratuito con una bottiglia di Prosecco in palio per chi vince. Dalle 18:30 alle 22:30 da Start Up Cafè, in Via San Bernardino 67/a, di fronte alla Biblioteca Tiraboschi a Bergamo.',
            locandina: '/images/eventi/spritz-party-2026-11-18.jpg',
            publishFrom: '2026-11-16',
            hideAfter: '2026-11-19'
        },
        {
            slug: 'spritz-party-national-jukebox-day',
            titolo: 'Spritz Party · National Jukebox Day',
            data: '2026-11-25',
            dataEstesa: 'Mercoledì 25 novembre 2026',
            inizio: '18:30',
            fine: '22:30',
            testoBreve: 'La musica la scegli tu. Spritz a 3,50 €, DJ set e beer pong gratuito.',
            testoLungo: 'Mercoledì 25 novembre, National Jukebox Day: allo Spritz Party la musica la scegli tu, ognuno può scegliere la sua canzone. Spritz a 3,50 €, DJ set per tutta la serata e beer pong gratuito con una bottiglia di Prosecco in palio per chi vince. Dalle 18:30 alle 22:30 da Start Up Cafè, in Via San Bernardino 67/a, di fronte alla Biblioteca Tiraboschi a Bergamo.',
            locandina: '/images/eventi/spritz-party-2026-11-25.jpg',
            publishFrom: '2026-11-23',
            hideAfter: '2026-11-26'
        }
    ];

    function oggiRoma() {
        var anteprima = new URLSearchParams(location.search).get('anteprima');
        if (anteprima && /^\d{4}-\d{2}-\d{2}$/.test(anteprima)) return anteprima;
        // en-CA restituisce il formato AAAA-MM-GG
        return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Rome', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    }

    function eventiVisibili() {
        var oggi = oggiRoma();
        return EVENTI.filter(function (e) { return e.publishFrom <= oggi && oggi < e.hideAfter; })
            .sort(function (a, b) { return a.data < b.data ? -1 : 1; });
    }

    function esc(t) {
        return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function giornoMese(data) {
        var d = new Date(data + 'T12:00:00Z');
        return {
            giorno: String(d.getUTCDate()).padStart(2, '0'),
            mese: d.toLocaleDateString('it-IT', { month: 'short', timeZone: 'UTC' }).replace('.', '')
        };
    }

    function altLocandina(e) {
        return 'Locandina ' + e.titolo.replace(' · ', ': ') + ', ' + e.dataEstesa.toLowerCase() + ' da Start Up Cafè a Bergamo';
    }

    function cardEvento(e, primo) {
        var gm = giornoMese(e.data);
        return '' +
            '<article id="' + e.slug + '" class="event-card bg-white rounded-2xl overflow-hidden border border-stone-200 shadow scroll-mt-24">' +
            '<div class="flex flex-col md:flex-row">' +
            '<div class="md:w-2/5 relative bg-stone-100 aspect-[4/5]">' +
            '<button type="button" class="block w-full h-full cursor-zoom-in" aria-label="Ingrandisci la locandina" data-locandina="' + e.locandina + '">' +
            '<img src="' + e.locandina + '" alt="' + esc(altLocandina(e)) + '" width="1080" height="1350"' + (primo ? '' : ' loading="lazy"') +
            ' class="w-full h-full object-cover" onerror="this.parentNode.classList.add(\'hidden\');this.parentNode.nextElementSibling.classList.remove(\'hidden\')">' +
            '</button>' +
            // Segnaposto finché la locandina non viene caricata in /images/eventi/
            '<div class="hidden absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-[#822621] text-white">' +
            '<i data-lucide="martini" width="48" height="48"></i>' +
            '<p class="text-2xl font-black uppercase tracking-widest mt-4">Spritz Party</p>' +
            '<p class="font-bold mt-2">' + e.dataEstesa + '</p>' +
            '<p class="text-sm mt-1">' + e.inizio + ' - ' + e.fine + '</p>' +
            '</div>' +
            '<div class="absolute top-4 left-4 bg-black/70 text-white rounded-xl px-4 py-2 text-center shadow-xl z-10 pointer-events-none">' +
            '<span class="block text-2xl font-black leading-none">' + gm.giorno + '</span>' +
            '<span class="block text-xs font-bold uppercase tracking-wider">' + gm.mese + '</span>' +
            '</div>' +
            '</div>' +
            '<div class="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">' +
            '<div class="flex items-center gap-2 mb-3"><span class="bg-[#822621]/10 text-[#822621] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">Spritz Party</span></div>' +
            '<h2 class="text-2xl md:text-3xl font-bold text-stone-900 mb-3">' + esc(e.titolo) + '</h2>' +
            '<p class="text-stone-900 font-bold leading-normal mb-3">' + esc(e.testoBreve) + '</p>' +
            '<p class="text-stone-600 leading-normal mb-6">' + esc(e.testoLungo) + '</p>' +
            '<ul class="flex flex-col gap-2 text-sm text-stone-600 mb-6">' +
            '<li class="flex items-center gap-2"><i data-lucide="calendar" class="text-[#822621]" width="16" height="16"></i>' + e.dataEstesa + '</li>' +
            '<li class="flex items-center gap-2"><i data-lucide="clock" class="text-[#822621]" width="16" height="16"></i>Dalle ' + e.inizio + ' alle ' + e.fine + '</li>' +
            '<li class="flex items-center gap-2"><i data-lucide="map-pin" class="text-[#822621]" width="16" height="16"></i>' + INDIRIZZO + '</li>' +
            '<li class="flex items-center gap-2"><i data-lucide="martini" class="text-[#822621]" width="16" height="16"></i>Spritz a 3,50 €</li>' +
            '</ul>' +
            '<div class="flex flex-wrap gap-3">' +
            '<a href="' + MAPS + '" target="_blank" rel="noopener noreferrer" data-track="click_indicazioni" class="inline-flex items-center gap-2 bg-[#822621] text-white px-6 py-3 rounded-full font-bold hover:bg-stone-900 transition-colors"><i data-lucide="navigation" width="18" height="18"></i>Indicazioni</a>' +
            '<a href="' + TEL + '" data-track="click_chiama" class="inline-flex items-center gap-2 bg-white text-stone-900 border border-stone-300 px-6 py-3 rounded-full font-bold hover:bg-stone-900 hover:text-white transition-colors"><i data-lucide="phone" width="18" height="18"></i>Chiama</a>' +
            '</div>' +
            '<p class="text-xs text-stone-500 mt-6">Bevi responsabilmente.</p>' +
            '</div>' +
            '</div>' +
            '</article>';
    }

    function jsonLdEvento(e, immagine) {
        return {
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: e.titolo,
            description: e.testoLungo,
            startDate: e.data + 'T' + e.inizio + ':00+01:00',
            endDate: e.data + 'T' + e.fine + ':00+01:00',
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            url: BASE + '/Cosa-fare-a-bergamo#' + e.slug,
            image: [immagine],
            location: {
                '@type': 'Place',
                name: 'Start Up Cafè',
                address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Via San Bernardino 67/a',
                    addressLocality: 'Bergamo',
                    addressRegion: 'BG',
                    postalCode: '24122',
                    addressCountry: 'IT'
                }
            },
            organizer: { '@type': 'Organization', name: 'Start Up Cafè', url: BASE + '/' }
        };
    }

    // Il JSON-LD usa la locandina solo se esiste davvero, altrimenti l'immagine generica del locale
    function aggiungiJsonLd(eventi) {
        Promise.all(eventi.map(function (e) {
            return new Promise(function (resolve) {
                var img = new Image();
                img.onload = function () { resolve(jsonLdEvento(e, BASE + e.locandina)); };
                img.onerror = function () { resolve(jsonLdEvento(e, BASE + '/assets/og-image.jpg')); };
                img.src = e.locandina;
            });
        })).then(function (dati) {
            var s = document.createElement('script');
            s.type = 'application/ld+json';
            s.textContent = JSON.stringify(dati.length === 1 ? dati[0] : dati);
            document.head.appendChild(s);
        });
    }

    function paginaEventi(lista) {
        var visibili = eventiVisibili();
        var fisso = document.getElementById('spritz-fisso');
        if (!visibili.length) return; // resta il blocco fisso "Ogni mercoledì Spritz Party"
        lista.innerHTML = visibili.map(function (e, i) { return cardEvento(e, i === 0); }).join('');
        if (fisso) fisso.classList.add('hidden');
        if (window.renderIcons) window.renderIcons(lista);
        lista.addEventListener('click', function (ev) {
            var btn = ev.target.closest('[data-locandina]');
            if (btn && window.openLightbox) window.openLightbox(btn.getAttribute('data-locandina'));
        });
        aggiungiJsonLd(visibili);
    }

    function bannerHome(box) {
        var e = eventiVisibili()[0];
        if (!e) return;
        box.innerHTML = '<strong>' + e.dataEstesa.replace(' 2026', '') + ':</strong> ' + esc(e.titolo) + '. ' + esc(e.testoBreve) +
            ' <a href="/Cosa-fare-a-bergamo#' + e.slug + '" class="underline font-bold whitespace-nowrap">Scopri la serata</a>';
        box.classList.remove('hidden');
    }

    function init() {
        var lista = document.getElementById('lista-eventi');
        if (lista) paginaEventi(lista);
        var box = document.getElementById('prossimo-evento');
        if (box) bannerHome(box);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
