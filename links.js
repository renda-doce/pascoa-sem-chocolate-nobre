const WHATSAPP_LINK = "https://chat.whatsapp.com/HU9UwLOPuCY8RAkvKA6XJ0";

// Dispara um evento do Meta Pixel de forma segura.
// O flag `fired` garante que cada chamada dispara no máximo UMA vez,
// mesmo que o fbevents.js demore a carregar.
function trackPixel(eventName, params, options) {
    var fired = false;
    var retries = 15;

    function attempt() {
        if (fired) return;
        if (typeof fbq === "function") {
            fired = true;
            fbq('track', eventName, params || {}, options || {});
        } else if (retries > 0) {
            retries--;
            setTimeout(attempt, 300);
        }
    }

    attempt();
}

// Garante que o setup roda apenas uma vez,
// independente do estado do DOM quando o script é carregado.
function setup() {
    // ── ViewContent: dispara uma única vez no carregamento ──
    var _vcId = 'vc_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    trackPixel('ViewContent', {
        content_name: 'Páscoa Além do Chocolate',
        content_category: 'Evento Online',
        currency: 'BRL',
        value: 0
    }, { eventID: _vcId });

    // ── Configura todos os botões CTA ──
    var ctaButtons = document.querySelectorAll(".btn-cta");
    ctaButtons.forEach(function (button) {
        if (button.tagName === "A") {
            button.href = WHATSAPP_LINK;
            button.target = "_blank";
            button.rel = "noopener noreferrer";
        }

        button.addEventListener("click", function () {
            trackPixel('Lead', {
                content_name: 'Páscoa Além do Chocolate',
                currency: 'BRL',
                value: 0
            });
        });
    });

    // ── Sticky CTA (se existir) ──
    var stickyCtaLink = document.querySelector(".sticky-cta a");
    if (stickyCtaLink) {
        stickyCtaLink.href = WHATSAPP_LINK;
        stickyCtaLink.target = "_blank";
        stickyCtaLink.rel = "noopener noreferrer";
        stickyCtaLink.addEventListener("click", function () {
            trackPixel('Lead', {
                content_name: 'Páscoa Além do Chocolate',
                currency: 'BRL',
                value: 0
            });
        });
    }
}

// Como o script está no final do <body>, o DOM já está pronto.
// Usa DOMContentLoaded apenas como fallback de segurança.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
} else {
    setup();
}
