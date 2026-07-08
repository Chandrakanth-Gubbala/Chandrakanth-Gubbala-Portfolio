document.documentElement.classList.add("js");

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector(".site-header");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement) {
            navLinks.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href || href === "#") return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
        window.scrollTo({ top, behavior: "smooth" });
    });
});

const categoryButtons = document.querySelectorAll(".category-btn");
const projectCards = document.querySelectorAll(".project-card[data-category]");

categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const category = button.dataset.category || "all";

        categoryButtons.forEach((item) => item.classList.toggle("active", item === button));
        projectCards.forEach((card) => {
            const shouldShow = category === "all" || card.dataset.category === category;
            card.hidden = !shouldShow;
        });
    });
});

const sectionLinks = Array.from(document.querySelectorAll(".nav-links a[href^='#']"));
const sections = sectionLinks
    .map((link) => {
        const href = link.getAttribute("href");
        return href ? document.querySelector(href) : null;
    })
    .filter(Boolean);

if (sections.length) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const activeId = `#${entry.target.id}`;
                sectionLinks.forEach((link) => {
                    link.classList.toggle("active", link.getAttribute("href") === activeId);
                });
            });
        },
        {
            rootMargin: "-35% 0px -55% 0px",
            threshold: 0.01
        }
    );

    sections.forEach((section) => sectionObserver.observe(section));
}

const revealTargets = document.querySelectorAll(
    ".section-heading, .about-copy, .timeline-item, .project-card, .skill-category, .interest-card, .contact-card, .metric-grid article, .case-content article"
);

revealTargets.forEach((target) => target.classList.add("reveal"));

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.12 }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
} else {
    revealTargets.forEach((target) => target.classList.add("is-visible"));
}
