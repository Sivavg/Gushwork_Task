document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================
       1. Sticky Header Functionality
       ========================================================== */
    const header = document.getElementById('mainHeader');
    const heroFold = document.getElementById('heroFold');

    // Calculate the height of the first fold (approx 80vh or hero section height)
    // We use an IntersectionObserver or simply scroll event.

    // We want the header to become sticky once we scroll past the hero fold.
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        if (scrollPosition > window.innerHeight * 0.8) {
            if (!header.classList.contains('sticky')) {
                header.classList.add('sticky');
                setTimeout(() => header.classList.add('show'), 10);
            }
        } else {
            if (header.classList.contains('sticky')) {
                header.classList.remove('show');
                setTimeout(() => {
                    if (window.scrollY <= window.innerHeight * 0.8) {
                        header.classList.remove('sticky');
                    }
                }, 400);
            }
        }
    });


    /* ==========================================================
       2. Image Carousel with Zoom (Product Detail)
       ========================================================== */

    const mainImg = document.getElementById('mainImage');
    const imgContainer = document.getElementById('imgContainer');
    const glass = document.getElementById('glass');
    const thumbs = document.querySelectorAll('.thumb-box');
    const prevBtn = document.getElementById('mainPrevBtn');
    const nextBtn = document.getElementById('mainNextBtn');

    let currentImageIndex = 0;
    const images = Array.from(thumbs).map(thumb => thumb.querySelector('img').src.replace('200/150', '1200/900')); // Convert thumbnail URls to high-res

    // Helper: Update main image
    function updateMainImage(index) {
        // Simple fade out/in effect
        mainImg.style.opacity = 0;
        setTimeout(() => {
            mainImg.src = images[index];
            mainImg.style.opacity = 1;

            // Update thumbs
            thumbs.forEach(t => t.classList.remove('active'));
            thumbs[index].classList.add('active');
        }, 200);
        currentImageIndex = index;
    }

    // Thumb clicks
    thumbs.forEach((thumb, idx) => {
        thumb.addEventListener('click', () => {
            updateMainImage(idx);
        });
    });

    // Arrows
    prevBtn.addEventListener('click', () => {
        let prevIdx = currentImageIndex - 1;
        if (prevIdx < 0) prevIdx = images.length - 1;
        updateMainImage(prevIdx);
    });

    nextBtn.addEventListener('click', () => {
        let nextIdx = currentImageIndex + 1;
        if (nextIdx >= images.length) nextIdx = 0;
        updateMainImage(nextIdx);
    });

    // Zoom Lens Effect
    const zoomMultiplier = 2; // How much to zoom

    imgContainer.addEventListener('mouseenter', () => {
        glass.style.opacity = 1;
        glass.style.backgroundImage = `url('${mainImg.src}')`;
        const size = mainImg.naturalWidth * zoomMultiplier;
        glass.style.backgroundSize = `${size}px auto`; // use auto for height based on aspect ratio
    });

    imgContainer.addEventListener('mouseleave', () => {
        glass.style.opacity = 0;
    });

    imgContainer.addEventListener('mousemove', (e) => {
        // Get cursor position relative to image container
        const rect = imgContainer.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        // Prevent glass from going outside
        const glassWidth = glass.offsetWidth / 2;
        const glassHeight = glass.offsetHeight / 2;

        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x > rect.width) x = rect.width;
        if (y > rect.height) y = rect.height;

        // Position the glass center at cursor
        glass.style.left = (x - glassWidth) + 'px';
        glass.style.top = (y - glassHeight) + 'px';

        // Calculate background position
        // The background position should be proportional to the cursor position on the image
        const bgPosX = (x / rect.width) * 100;
        const bgPosY = (y / rect.height) * 100;

        glass.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
    });


    /* ==========================================================
       3. Process Tabs & Image Slider
       ========================================================== */
    const processTabs = document.querySelectorAll('.process-tab');
    const processImage = document.getElementById('processImage');
    const processImgCol = document.querySelector('.process-img-col');

    // Create an array of process images mapped to tabs
    const processImages = [
        "https://picsum.photos/id/1068/800/600",
        "https://picsum.photos/id/30/800/600",
        "https://picsum.photos/id/40/800/600",
        "https://picsum.photos/id/88/800/600",
        "https://picsum.photos/id/163/800/600",
        "https://picsum.photos/id/200/800/600",
        "https://picsum.photos/id/270/800/600",
        "https://picsum.photos/id/350/800/600"
    ];
    let currentProcessIndex = 0;

    function updateProcess(index) {
        processTabs.forEach(t => t.classList.remove('active'));
        processTabs[index].classList.add('active');
        processImage.style.opacity = 0;
        setTimeout(() => {
            processImage.src = processImages[index];
            processImage.style.opacity = 1;
        }, 200);
        currentProcessIndex = index;
    }

    processTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            updateProcess(index);
        });
    });

    if (processImgCol) {
        const prevProcBtn = processImgCol.querySelector('.prev');
        const nextProcBtn = processImgCol.querySelector('.next');

        if (prevProcBtn) {
            prevProcBtn.addEventListener('click', () => {
                let idx = currentProcessIndex - 1;
                if (idx < 0) idx = processTabs.length - 1;
                updateProcess(idx);
            });
        }
        if (nextProcBtn) {
            nextProcBtn.addEventListener('click', () => {
                let idx = currentProcessIndex + 1;
                if (idx >= processTabs.length) idx = 0;
                updateProcess(idx);
            });
        }

        // ensure default transition styling on the image
        if (processImage) processImage.style.transition = 'opacity 0.2s';
    }


    /* ==========================================================
       4. Applications Carousel Desktop Scroll Arrows
       ========================================================== */
    const appCarousel = document.querySelector('.applications-carousel');
    const appNavBtns = document.querySelectorAll('.slider-nav-btn');

    if (appCarousel && appNavBtns.length === 2) {
        const scrollAmount = 324; // Card width + gap

        appNavBtns[0].addEventListener('click', () => {
            appCarousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        appNavBtns[1].addEventListener('click', () => {
            appCarousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    /* ==========================================================
       5. FAQ Accordion
       ========================================================== */
    const accordionBtns = document.querySelectorAll('.accordion-btn');

    accordionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const item = btn.parentElement;
            const icon = btn.querySelector('i');

            // Toggle active state
            if (content.style.display === 'block') {
                content.style.display = 'none';
                icon.classList.replace('ph-caret-up', 'ph-caret-down');
                item.classList.remove('active');
            } else {
                // Close others
                document.querySelectorAll('.accordion-content').forEach(c => c.style.display = 'none');
                document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
                document.querySelectorAll('.accordion-btn i').forEach(i => i.classList.replace('ph-caret-up', 'ph-caret-down'));

                content.style.display = 'block';
                icon.classList.replace('ph-caret-down', 'ph-caret-up');
                item.classList.add('active');
            }
        });
    });

    /* ==========================================================
       6. Mobile Menu Toggle
       ========================================================== */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const headerRight = document.querySelector('.header-right');

    if (mobileMenuBtn && headerRight) {
        mobileMenuBtn.addEventListener('click', () => {
            if (headerRight.style.display === 'flex') {
                headerRight.style.display = 'none';
            } else {
                headerRight.style.display = 'flex';
                headerRight.style.flexDirection = 'column';
                headerRight.style.position = 'absolute';
                headerRight.style.top = '100%';
                headerRight.style.left = '0';
                headerRight.style.right = '0';
                headerRight.style.background = '#fff';
                headerRight.style.padding = '24px';
                headerRight.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                headerRight.style.gap = '24px';
            }
        });
    }

});
