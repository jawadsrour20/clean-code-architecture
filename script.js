document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    let navDots = document.querySelectorAll('.nav-dot');

    const navigation = document.querySelector('.navigation') || createNavigation();

    if (navDots.length === 0) {
        slides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.className = 'nav-dot';
            dot.dataset.slide = index;
            navigation.appendChild(dot);
        });
        navDots = document.querySelectorAll('.nav-dot');
    }

    function createNavigation() {
        const nav = document.createElement('div');
        nav.className = 'navigation';
        document.body.appendChild(nav);
        return nav;
    }

    function updateNavigation() {
        const scrollPos = window.scrollY + window.innerHeight / 2;
        let activeIndex = -1;

        slides.forEach((slide, index) => {
            const slideTop = slide.offsetTop;
            const slideBottom = slideTop + slide.offsetHeight;

            if (scrollPos >= slideTop && scrollPos <= slideBottom) {
                activeIndex = index;
            }
        });

        navDots.forEach(dot => dot.classList.remove('active'));
        if (activeIndex !== -1) {
            navDots[activeIndex].classList.add('active');
        }
    }

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

    updateNavigation();
    window.addEventListener('scroll', updateNavigation);
});
