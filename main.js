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
//  DOM 読み込み完了後に実行
// =========================
document.addEventListener("DOMContentLoaded", () => {
  // 保存されたテーマを適用
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    setTheme("dark");
  }
  
  // テーマ切替ボタン
  const themeToggle = document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
    console.log("Theme toggle button initialized");
  }
  
  // モバイルメニュー
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
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
