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
   MOBITEL OPTIMIZACIJE — TAP TO CLOSE
--------------------------------------------------- */
if (lightboxImg) {
    lightboxImg.addEventListener("click", () => {
        lightbox.classList.remove("active");
        enableScroll();
    });
}

/* ---------------------------------------------------
   MOBITEL OPTIMIZACIJE — SWIPE LEFT/RIGHT
--------------------------------------------------- */
let startX = 0;

if (lightbox) {
    lightbox.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    lightbox.addEventListener("touchend", e => {
        let endX = e.changedTouches[0].clientX;
        let diff = endX - startX;

        if (diff > 50) btnPrev.click();
        if (diff < -50) btnNext.click();
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
   LANGUAGE DROPDOWN — HOVER ONLY
--------------------------------------------------- */
const langDropdown = document.querySelector(".lang-dropdown");
const langMenu = document.querySelector(".lang-menu");

if (langDropdown && langMenu) {
    langDropdown.addEventListener("mouseenter", () => {
        langMenu.style.display = "block";
    });

    langDropdown.addEventListener("mouseleave", () => {
        langMenu.style.display = "none";
    });

    langDropdown.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
    });
}

/* ---------------------------------------------------
   HAMBURGER DROPDOWN MENU — FIXED
--------------------------------------------------- */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const header = document.querySelector('header');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('open');
    });

    hamburger.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
            mobileMenu.classList.add('open');
        }
    });

    header.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove('open');
        }
    });

    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
            mobileMenu.classList.remove('open');
        }
    });

    mobileMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        mobileMenu.classList.remove('open');
    }
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
