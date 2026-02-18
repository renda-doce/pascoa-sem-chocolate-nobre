const WHATSAPP_LINK = "https://chat.whatsapp.com/Cz5ZvgT7Mj62JYkZ5PQhAd";

document.addEventListener("DOMContentLoaded", function () {
    const ctaButtons = document.querySelectorAll(".btn-cta");
    ctaButtons.forEach(button => {
        if (button.tagName === "A") {
            button.href = WHATSAPP_LINK;
            button.target = "_blank";
            button.rel = "noopener noreferrer";
        }

        button.addEventListener("click", function () {
            if (typeof fbq === "function") {
                fbq('track', 'Lead');
            }
        });
    });

    // Update sticky CTA link if it exists and doesn't have the class
    const stickyCtaLink = document.querySelector(".sticky-cta a");
    if (stickyCtaLink) {
        stickyCtaLink.href = WHATSAPP_LINK;
        stickyCtaLink.target = "_blank";
        stickyCtaLink.rel = "noopener noreferrer";
        stickyCtaLink.addEventListener("click", function () {
            if (typeof fbq === "function") {
                fbq('track', 'Lead');
            }
        });
    }
});
