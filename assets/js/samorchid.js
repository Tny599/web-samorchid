/* ============================================================
   SAMOrchid — Interactive JavaScript
   Premium Orchid Catalog
   ============================================================ */

   document.addEventListener('DOMContentLoaded', function () {

    // ----------------------------------------------------------
    // 1. HAMBURGER MENU TOGGLE
    // ----------------------------------------------------------
    const menuToggle = document.querySelector('.menu-btn');
    const sideNav = document.querySelector('.side-menu');
    const menuOverlay = document.querySelector('.menu-overlay');

    if (menuToggle && sideNav && menuOverlay) {
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('active');
            sideNav.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            document.body.style.overflow = sideNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on overlay click
        menuOverlay.addEventListener('click', function () {
            menuToggle.classList.remove('active');
            sideNav.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close menu on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && sideNav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                sideNav.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }


    // ----------------------------------------------------------
    // 2. HEADER SCROLL EFFECT
    // ----------------------------------------------------------
    const header = document.querySelector('header');

    if (header) {
        function handleScroll() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Run on load in case page is already scrolled
        handleScroll();
    }


    // ----------------------------------------------------------
    // 3. HERO AUTO-SLIDER
    // ----------------------------------------------------------
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.hero-slider-dots .dot');

    if (sliderWrapper && slides.length > 1) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let sliderInterval;

        function goToSlide(index) {
            currentSlide = index;
            sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

            // Update dots
            if (dots.length > 0) {
                dots.forEach(function (dot, i) {
                    dot.classList.toggle('active', i === currentSlide);
                });
            }
        }

        function nextSlide() {
            const next = (currentSlide + 1) % totalSlides;
            goToSlide(next);
        }

        function startAutoSlide() {
            sliderInterval = setInterval(nextSlide, 4000);
        }

        function stopAutoSlide() {
            clearInterval(sliderInterval);
        }

        // Dot click navigation
        if (dots.length > 0) {
            dots.forEach(function (dot, index) {
                dot.addEventListener('click', function () {
                    stopAutoSlide();
                    goToSlide(index);
                    startAutoSlide();
                });
            });
        }

        // Pause on hover
        const heroSliderContainer = document.querySelector('.hero-slider-container');
        if (heroSliderContainer) {
            heroSliderContainer.addEventListener('mouseenter', stopAutoSlide);
            heroSliderContainer.addEventListener('mouseleave', startAutoSlide);
        }

        // Initialize
        goToSlide(0);
        startAutoSlide();
    }


    // ----------------------------------------------------------
    // 4. SCROLL REVEAL (Intersection Observer)
    // ----------------------------------------------------------
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    if (scrollRevealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    // Once revealed, stop observing for performance
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        scrollRevealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback: reveal all immediately
        scrollRevealElements.forEach(function (el) {
            el.classList.add('reveal-active');
        });
    }


    // ----------------------------------------------------------
    // 5. CATALOG FILTER TABS
    // ----------------------------------------------------------
    const filterButtons = document.querySelectorAll('.btn-filter');
    const productCards = document.querySelectorAll('.product-card[data-category]');

    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                // Update active button
                filterButtons.forEach(function (b) {
                    b.classList.remove('active');
                });
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(function (card) {
                    const category = card.getAttribute('data-category');

                    if (filterValue === 'all' || category === filterValue) {
                        card.classList.remove('hidden');
                        card.classList.add('show');
                    } else {
                        card.classList.remove('show');
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }


    // ----------------------------------------------------------
    // 6. ACCORDION TOGGLE
    // ----------------------------------------------------------
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(function (headerEl) {
            headerEl.addEventListener('click', function () {
                const accordionBody = headerEl.nextElementSibling;
                const isActive = headerEl.classList.contains('active');

                // Close all other accordion items (optional: single-open behavior)
                accordionHeaders.forEach(function (otherHeader) {
                    if (otherHeader !== headerEl) {
                        otherHeader.classList.remove('active');
                        const otherBody = otherHeader.nextElementSibling;
                        if (otherBody && otherBody.classList.contains('accordion-body')) {
                            otherBody.classList.remove('open');
                        }
                    }
                });

                // Toggle current
                headerEl.classList.toggle('active', !isActive);
                if (accordionBody && accordionBody.classList.contains('accordion-body')) {
                    accordionBody.classList.toggle('open', !isActive);
                }
            });
        });
    }


    // ----------------------------------------------------------
    // 7. WHATSAPP MESSAGE GENERATOR
    // ----------------------------------------------------------
    const whatsappButtons = document.querySelectorAll('.btn-whatsapp[data-product]');

    /**
     * Opens WhatsApp with a pre-formatted message about a product.
     * @param {string} productName - Name of the product
     * @param {string} productPrice - Price of the product
     * @param {string} phoneNumber - WhatsApp phone number (with country code, no +)
     */
    function openWhatsApp(productName, productPrice, phoneNumber) {
        phoneNumber = phoneNumber || '6281234567890';

        const message = [
            '🌸 Halo SAMOrchid!',
            '',
            'Saya tertarik dengan produk berikut:',
            '',
            '🪴 *Produk:* ' + productName,
            '💰 *Harga:* ' + productPrice,
            '',
            'Mohon informasi lebih lanjut mengenai ketersediaan dan cara pemesanan.',
            '',
            'Terima kasih! 🙏'
        ].join('\n');

        const encodedMessage = encodeURIComponent(message);
        const url = 'https://wa.me/' + phoneNumber + '?text=' + encodedMessage;
        window.open(url, '_blank');
    }

    if (whatsappButtons.length > 0) {
        whatsappButtons.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const productName = btn.getAttribute('data-product') || 'Anggrek Premium';
                const productPrice = btn.getAttribute('data-price') || '';
                const phoneNumber = btn.getAttribute('data-phone') || '6281234567890';
                openWhatsApp(productName, productPrice, phoneNumber);
            });
        });
    }

    // General WhatsApp CTA (e.g., in side menu or footer)
    const whatsappCTAs = document.querySelectorAll('.btn-whatsapp:not([data-product])');

    if (whatsappCTAs.length > 0) {
        whatsappCTAs.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                const phoneNumber = btn.getAttribute('data-phone') || '6281234567890';
                const message = encodeURIComponent(
                    '🌸 Halo SAMOrchid!\n\nSaya ingin bertanya mengenai koleksi anggrek premium Anda.\n\nTerima kasih! 🙏'
                );
                const url = 'https://wa.me/' + phoneNumber + '?text=' + message;
                window.open(url, '_blank');
            });
        });
    }


    // ----------------------------------------------------------
    // 8. SMOOTH SCROLL FOR ANCHOR LINKS
    // ----------------------------------------------------------
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            const targetId = link.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close side menu if open
                if (sideNav && sideNav.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    sideNav.classList.remove('active');
                    menuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });


    // ----------------------------------------------------------
    // 9. NAVBAR ACTIVE STATE
    // ----------------------------------------------------------
    const navLinks = document.querySelectorAll('.side-menu ul li a');
    const currentPath = window.location.pathname;

    if (navLinks.length > 0) {
        navLinks.forEach(function (link) {
            const linkPath = new URL(link.href, window.location.origin).pathname;

            // Remove trailing slashes for comparison
            const normalizedCurrent = currentPath.replace(/\/+$/, '') || '/';
            const normalizedLink = linkPath.replace(/\/+$/, '') || '/';

            if (normalizedCurrent === normalizedLink) {
                link.classList.add('active-link');
            } else {
                link.classList.remove('active-link');
            }
        });
    }

    // Also highlight corresponding footer links
    const footerLinks = document.querySelectorAll('.footer-col ul li a');
    if (footerLinks.length > 0) {
        footerLinks.forEach(function (link) {
            const linkPath = new URL(link.href, window.location.origin).pathname;
            const normalizedCurrent = currentPath.replace(/\/+$/, '') || '/';
            const normalizedLink = linkPath.replace(/\/+$/, '') || '/';

            if (normalizedCurrent === normalizedLink) {
                link.style.color = 'var(--pink-flower)';
            }
        });
    }

});
