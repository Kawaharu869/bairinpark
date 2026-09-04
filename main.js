// =========================
//  写真スライダー管理
// =========================

let currentSlide = 0;
let slideInterval;
let totalSlides = 4;

function updateSlider() {
  const wrapper = document.querySelector('.slider-wrapper');
  const dots = document.querySelectorAll('.dot');
  
  if (!wrapper || !dots.length) return;
  
  wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
  
  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlider();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlider();
}

function goToSlide(index) {
  currentSlide = index;
  updateSlider();
}

function startAutoSlide() {
  stopAutoSlide();
  slideInterval = setInterval(nextSlide, 3000);
}

function stopAutoSlide() {
  if (slideInterval) {
    clearInterval(slideInterval);
    slideInterval = null;
  }
}

function initSlider() {
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const slides = document.querySelectorAll('.slide');
  
  if (!sliderWrapper || !slides.length) {
    console.log('Slider not found');
    return;
  }
  
  totalSlides = slides.length;
  
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const dots = document.querySelectorAll('.dot');
  
  console.log('Slider initialized:', totalSlides, 'slides');
  
  // 矢印ボタン
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopAutoSlide();
      startAutoSlide();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
    });
  }
  
  // ドット
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      stopAutoSlide();
      startAutoSlide();
    });
  });
  
  // 自動スクロール開始
  startAutoSlide();
}

// =========================
//  テーマ（ライト/ダークモード）管理
// =========================

function setTheme(theme) {
  const body = document.body;
  if (theme === "dark") {
    body.classList.add("dark-mode");
  } else {
    body.classList.remove("dark-mode");
  }
  localStorage.setItem("theme", theme);
  console.log("Theme set to:", theme);
}

function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.contains("dark-mode");
  const next = isDark ? "light" : "dark";
  setTheme(next);
}

// =========================
//  開いたときに一瞬ライトモードになるバグを修正
// =========================

// HTML の <head> 内にテーマ初期化スクリプトがある場合、
// ここでは body が作られた直後にクラスを付与するだけで十分です。
// 点滅が気になる場合は、index.html 側の head 内スクリプトを削除し、
// このファイルだけでテーマ管理するようにしてください。

// =========================
//  DOM 読み込み完了後に実行
// =========================
document.addEventListener("DOMContentLoaded", () => {
  console.log('DOM loaded');
  
  // 保存されたテーマを適用
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
  
  // テーマ切替ボタン
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
    console.log("Theme toggle button initialized");
  } else {
    console.error("Theme toggle button not found");
  }
  
  // 写真スライダー
  setTimeout(() => {
    initSlider();
  }, 100);
  
  // モバイルメニュー
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      console.log("Menu open:", isOpen);
    });
    
    nav.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }
  
  // スムーズスクロール
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#" || !href.startsWith("#")) return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      
      const headerOffset = document.querySelector(".header")?.offsetHeight || 0;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });
});
