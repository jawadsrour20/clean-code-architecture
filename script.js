document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const navDots = document.querySelectorAll('.nav-dot');

    // Create navigation dots if they don't exist
    if (navDots.length === 0) {
        const navigation = document.querySelector('.navigation') || createNavigation();
        slides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.className = 'nav-dot';
            dot.dataset.slide = index;
            navigation.appendChild(dot);
        });
    }

    function createNavigation() {
        const nav = document.createElement('div');
        nav.className = 'navigation';
        document.body.appendChild(nav);
        return nav;
    }

    // Update navigation on scroll
    function updateNavigation() {
        const scrollPos = window.scrollY + window.innerHeight / 2;

        slides.forEach((slide, index) => {
            const slideTop = slide.offsetTop;
            const slideBottom = slideTop + slide.offsetHeight;
            const dot = document.querySelector(`[data-slide="${index}"]`);

            if (scrollPos >= slideTop && scrollPos <= slideBottom) {
                document.querySelectorAll('.nav-dot').forEach(d => d.classList.remove('active'));
                if (dot) dot.classList.add('active');
            }
        });
    }

    // Navigation click handlers
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('nav-dot')) {
            const slideIndex = parseInt(e.target.dataset.slide);
            const targetSlide = slides[slideIndex];
            if (targetSlide) {
                targetSlide.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });

    // Initialize
    updateNavigation();
    window.addEventListener('scroll', updateNavigation);
});