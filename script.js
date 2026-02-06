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

if (images.length > 0) {
    images.forEach((img, index) => {
        img.addEventListener('click', () => showLightbox(index));
    });

    // Close on X
    btnClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        enableScroll();
    });

    // Prev
    btnPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        lightboxImg.src = images[currentIndex].src;
    });

    // Next
    btnNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        lightboxImg.src = images[currentIndex].src;
    });

    // Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            enableScroll();
        }
    });

    // Keyboard controls
    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            enableScroll();
        }
        if (e.key === 'ArrowLeft') {
            btnPrev.click();
        }
        if (e.key === 'ArrowRight') {
            btnNext.click();
        }
    });
}

/* ---------------------------------------------------
   SCROLL-SPY
--------------------------------------------------- */
const sections = document.querySelectorAll("section[id], #top");
const navLinks = document.querySelectorAll("nav a[href^='#']");

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

/* ---------------------------------------------------
   LANGUAGE DROPDOWN
--------------------------------------------------- */
const langBtn = document.querySelector(".lang-btn");
const langMenu = document.querySelector(".lang-menu");

if (langBtn && langMenu) {
    langBtn.addEventListener("click", e => {
        e.stopPropagation();
        langMenu.style.display = langMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", () => {
        langMenu.style.display = "none";
    });
}
