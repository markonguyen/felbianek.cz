(function () {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  const mq = window.matchMedia("(max-width: 960px)");

  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Otevřít menu");
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    nav.querySelectorAll(".menu-item-has-children.is-expanded").forEach((item) => {
      item.classList.remove("is-expanded");
      const btn = item.querySelector(".nav-expand");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }

  function openNav() {
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Zavřít menu");
    nav.classList.add("is-open");
    document.body.classList.add("nav-open");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      if (open) closeNav();
      else openNav();
    });

    nav.querySelectorAll(".nav-expand").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const item = btn.closest(".menu-item-has-children");
        if (!item) return;
        const expanded = item.classList.toggle("is-expanded");
        btn.setAttribute("aria-expanded", String(expanded));
      });
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (mq.matches) closeNav();
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        toggle.focus();
      }
    });

    mq.addEventListener("change", (e) => {
      if (!e.matches) closeNav();
    });
  }

  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const img = lightbox.querySelector("img");
    const close = lightbox.querySelector(".lightbox__close");
    const prevBtn = lightbox.querySelector(".lightbox__prev");
    const nextBtn = lightbox.querySelector(".lightbox__next");
    const items = Array.from(document.querySelectorAll(".gallery-grid a")).filter((el) => el.href);
    let index = 0;
    let touchStartX = 0;
    let touchStartY = 0;

    const isOpen = () => lightbox.classList.contains("is-open");

    const show = (i) => {
      if (!items.length) return;
      index = ((i % items.length) + items.length) % items.length;
      const el = items[index];
      img.src = el.href;
      img.alt = el.querySelector("img")?.alt || "";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      const multi = items.length > 1;
      if (prevBtn) prevBtn.hidden = !multi;
      if (nextBtn) nextBtn.hidden = !multi;
    };

    const hide = () => {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      img.src = "";
      document.body.style.overflow = "";
    };

    const prev = () => show(index - 1);
    const next = () => show(index + 1);

    items.forEach((el, i) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        show(i);
      });
    });

    close?.addEventListener("click", hide);
    prevBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      prev();
    });
    nextBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      next();
    });

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) hide();
    });

    document.addEventListener("keydown", (e) => {
      if (!isOpen()) return;
      if (e.key === "Escape") hide();
      else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    });

    lightbox.addEventListener(
      "touchstart",
      (e) => {
        if (!isOpen() || e.touches.length !== 1) return;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      },
      { passive: true }
    );

    lightbox.addEventListener(
      "touchend",
      (e) => {
        if (!isOpen() || !e.changedTouches.length) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
        if (dx < 0) next();
        else prev();
      },
      { passive: true }
    );
  }
})();
