// =========================
//  DOM 読み込み完了後に実行
// =========================
document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initSmoothScroll();
  initContactForm();
});

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
