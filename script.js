/* ---------------------------------------------------
   LIGHTBOX
--------------------------------------------------- */
const images = document.querySelectorAll('.lightbox-trigger');
const lightbox = document.querySelector('.lightbox-overlay');
const lightboxImg = document.querySelector('.lightbox-image');
const btnPrev = document.querySelector('.lightbox-prev');
const btnNext = document.querySelector('.lightbox-next');
const btnClose = document.querySelector('.lightbox-close');

let currentIndex = 0;

function disableScroll() {
    document.body.style.overflow = 'hidden';
}

function enableScroll() {
    document.body.style.overflow = '';
}

function showLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[index].src;
    lightbox.classList.add('active');
    disableScroll();
}

if (images.length > 0 && lightbox && lightboxImg && btnPrev && btnNext && btnClose) {
    images.forEach((img, index) => {
        img.addEventListener('click', () => showLightbox(index));
    });

    btnClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        enableScroll();
    });

    btnPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex].src;
    });

    btnNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex].src;
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            enableScroll();
        }
    });

    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            enableScroll();
        }
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            lightboxImg.src = images[currentIndex].src;
        }
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % images.length;
            lightboxImg.src = images[currentIndex].src;
        }
    });
}

/* ---------------------------------------------------
   SCROLL-SPY
--------------------------------------------------- */
const sections = document.querySelectorAll("section[id], #top");
const navLinks = document.querySelectorAll("nav a[href^='#']");

if (sections.length > 0 && navLinks.length > 0) {
    const spyObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");

                    navLinks.forEach(link => {
                        link.classList.remove("active");
                        if (link.getAttribute("href") === `#${id}`) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        },
        {
            threshold: 0.3,
            rootMargin: "-20% 0px -50% 0px"
        }
    );

    sections.forEach(section => spyObserver.observe(section));
}

/* ---------------------------------------------------
   LANGUAGE DROPDOWN — FIXED
--------------------------------------------------- */
const langDropdown = document.querySelector(".lang-dropdown");
const langMenu = document.querySelector(".lang-menu");

if (langDropdown && langMenu) {

    // CLICK TOGGLE — radi svugdje
    langDropdown.addEventListener("click", (e) => {
        e.stopPropagation();
        langMenu.style.display =
            langMenu.style.display === "block" ? "none" : "block";
    });

    // ZATVARANJE KAD KLIKNEŠ IZVAN
    document.addEventListener("click", () => {
        langMenu.style.display = "none";
    });
}

/* ---------------------------------------------------
   HAMBURGER MENU — CLICK + DESKTOP HOVER CLOSE
--------------------------------------------------- */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

if (hamburger && mobileMenu) {

    // CLICK — radi svugdje (mob + desktop)
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('open');
    });

    // DESKTOP: zatvori hamburger kad miš izađe iz menija
    mobileMenu.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove('open');
        }
    });

    // ZATVARANJE KAD KLIKNEŠ IZVAN
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            mobileMenu.classList.remove('open');
        }
    });

    // ZATVARANJE KAD KLIKNEŠ LINK
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
        });
    });
}



/* ---------------------------------------------------
   BOOK NOW FLOATING BUTTON
--------------------------------------------------- */
const bookBtn = document.getElementById("book-now-float");

let lastScrollY = window.scrollY;
let targetOffset = 0;
let currentOffset = 0;

function animateBook() {
    if (!bookBtn) return;
    currentOffset += (targetOffset - currentOffset) * 0.06;
    bookBtn.style.transform = `translateY(calc(-50% + ${currentOffset}px))`;
    requestAnimationFrame(animateBook);
}

if (bookBtn) {
    window.addEventListener("scroll", () => {
        const newY = window.scrollY;
        const direction = newY > lastScrollY ? "down" : "up";

        const maxOffset = window.innerHeight * 0.30;

        if (direction === "down") {
            targetOffset = -maxOffset;
        } else {
            targetOffset = maxOffset;
        }

        clearTimeout(window._centerTimeout);
        window._centerTimeout = setTimeout(() => {
            targetOffset = 0;
        }, 200);

        lastScrollY = newY;
    });

    animateBook();
}

/* ---------------------------------------------------
   PACKAGE CARDS — SIMPLE HOVER LOGIC
--------------------------------------------------- */
const cards = document.querySelectorAll('.pkg-card');

if (cards.length >= 3) {
    cards[1].classList.add('extended');
}

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        cards.forEach(c => c.classList.remove('extended'));
        card.classList.add('extended');
    });
});

const wrapper = document.querySelector('.package-wrapper');

if (wrapper) {
    wrapper.addEventListener('mouseleave', () => {
        cards.forEach(c => c.classList.remove('extended'));
        cards[1].classList.add('extended');
    });
}
