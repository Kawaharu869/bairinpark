// =========================
//  テーマ（ライト/ダークモード）管理
// =========================

function getPreferredTheme() {
  const hour = new Date().getHours();
  // 6:00〜16:59 はライト、17:00〜5:59 はダーク
  if (hour >= 6 && hour <= 16) {
    return "light";
  }
  return "dark";
}

function setTheme(theme) {
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  localStorage.setItem("theme", theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    const preferred = getPreferredTheme();
    setTheme(preferred);
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  const next = current === "dark" ? "light" : "dark";
  setTheme(next);
}

// テーマ初期化（DOM 読み込み前でも OK）
initTheme();

// =========================
//  DOM 読み込み完了後に実行
// =========================
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initSmoothScroll();
  initContactForm();
  initThemeToggle();
});

// =========================
//  テーマ切替ボタン
// =========================
function initThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle");
  if (!themeToggle) return;

  themeToggle.addEventListener("click", toggleTheme);
}

// =========================
//  モバイルメニュー
// =========================
function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (!menuToggle || !nav) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // ナビリンククリック時にメニューを閉じる
  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// =========================
//  スムーズスクロール（アンカーリンク）
// =========================
function initSmoothScroll() {
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
}

// =========================
//  お問い合わせフォーム（簡易処理）
// =========================
function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // 実際の送信処理はバックエンドや外部サービスと連携する必要があります
    // ここでは簡易的にアラートを表示する例を示します

    const name = form.querySelector("#name")?.value.trim();
    const email = form.querySelector("#email")?.value.trim();
    const message = form.querySelector("#message")?.value.trim();

    if (!name || !email || !message) {
      alert("すべての項目を入力してください。");
      return;
    }

    // 簡易バリデーション（メール形式）
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("メールアドレスの形式が正しくありません。");
      return;
    }

    // ここに実際の送信処理（fetch など）を記述
    // 例: Google Forms や Formspree などの外部フォームサービスと連携可能

    alert("送信ありがとうございます！（デモ）\n\n実際の送信には、バックエンドやフォームサービスの設定が必要です。");
    form.reset();
  });
}
