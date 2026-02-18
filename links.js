const WHATSAPP_LINK = "https://chat.whatsapp.com/Cz5ZvgT7Mj62JYkZ5PQhAd";

// Dispara um evento do Meta Pixel de forma segura,
// com retry caso o fbevents.js ainda não tenha carregado.
function trackPixel(eventName, params, retries) {
    retries = retries === undefined ? 10 : retries;
    if (typeof fbq === "function") {
        if (params) {
            fbq('track', eventName, params);
        } else {
            fbq('track', eventName);
        }
    } else if (retries > 0) {
        setTimeout(function () {
            trackPixel(eventName, params, retries - 1);
        }, 300);
    }
}

document.addEventListener("DOMContentLoaded", function () {

    // ── Dispara ViewContent assim que a página carrega ──
    trackPixel('ViewContent', {
        content_name: 'Páscoa Além do Chocolate',
        content_category: 'Evento Online',
        currency: 'BRL',
        value: 0
    });

    // ── Configura todos os botões CTA ──
    const ctaButtons = document.querySelectorAll(".btn-cta");
    ctaButtons.forEach(function (button) {
        if (button.tagName === "A") {
            button.href = WHATSAPP_LINK;
            button.target = "_blank";
            button.rel = "noopener noreferrer";
        }

        button.addEventListener("click", function () {
            // Lead = clicou no CTA (entrou no grupo)
            trackPixel('Lead', {
                content_name: 'Páscoa Além do Chocolate',
                currency: 'BRL',
                value: 0
            });
            // InitiateCheckout como evento secundário de intenção
            trackPixel('InitiateCheckout');
        });
    });

    // ── Sticky CTA (se existir) ──
    const stickyCtaLink = document.querySelector(".sticky-cta a");
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
});
