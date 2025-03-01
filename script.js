// تهيئة المتغيرات العامة
let currentSlide = 0;
const totalSlides = 6; // عدد السلايدات الثابت

// دالة تحديث السلايدر
function updateSlider() {
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${currentSlide * (100 / totalSlides)}%)`;
    updateDots();
    updateSlideContent();
}

// دالة تحديث النقاط
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// دالة تحديث محتوى السلايد
function updateSlideContent() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
}

// إنشاء نقاط التنقل
function createDots() {
    const dotsContainer = document.querySelector('.slider-dots');
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentSlide = i;
            updateSlider();
        });
        dotsContainer.appendChild(dot);
    }
}

// تهيئة السلايدر
function initializeSlider() {
    createDots();
    
    // أزرار التنقل
    document.querySelector('.prev-btn').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    });

    // التغيير التلقائي للسلايد
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 5000);
}

// تهيئة البحث
function initializeSearch() {
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.querySelector('.search input');
    const searchContainer = document.querySelector('.search');

    searchIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        searchIcon.classList.toggle('active');
        searchInput.classList.toggle('active');
        if (searchInput.classList.contains('active')) {
            setTimeout(() => searchInput.focus(), 300);
        } else {
            searchInput.value = ''; // مسح النص عند الإغلاق
        }
    });

    searchInput.addEventListener('click', (e) => {
        e.stopPropagation(); // منع إغلاق البحث عند النقر على حقل الإدخال
    });

    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            searchIcon.classList.remove('active');
            searchInput.classList.remove('active');
            searchInput.value = ''; // مسح النص عند الإغلاق
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchInput.classList.contains('active')) {
            searchIcon.classList.remove('active');
            searchInput.classList.remove('active');
            searchInput.value = ''; // مسح النص عند الإغلاق
        }
    });
}

// تهيئة قائمة المستخدم
function initializeUserMenu() {
    const userIcon = document.querySelector('.user-icon');
    const userDropdown = document.querySelector('.user-dropdown');
    const menuButton = document.querySelector('.list-siting-button');
    const menuItems = document.querySelector('.list-siting-item');

    userIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('active');
        menuItems.classList.remove('active');
        menuButton.classList.remove('active');
    });

    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        menuItems.classList.toggle('active');
        menuButton.classList.toggle('active');
        userDropdown.classList.remove('active');
    });

    userDropdown.addEventListener('click', (e) => {
        e.stopPropagation(); // منع إغلاق القائمة عند النقر داخلها
    });

    menuItems.addEventListener('click', (e) => {
        e.stopPropagation(); // منع إغلاق القائمة عند النقر داخلها
    });

    document.addEventListener('click', () => {
        userDropdown.classList.remove('active');
        menuItems.classList.remove('active');
        menuButton.classList.remove('active');
    });

    // إغلاق القوائم عند الضغط على ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            userDropdown.classList.remove('active');
            menuItems.classList.remove('active');
            menuButton.classList.remove('active');
        }
    });
}

// تحديث تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
    initializeSlider();
    initializeSearch();
    initializeUserMenu();
}); 