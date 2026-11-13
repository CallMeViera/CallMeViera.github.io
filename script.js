/* =========================================================
   CallMeViera — interacciones
   ========================================================= */

(() => {
  "use strict";

  /* -------------------------------------------------------
     CONFIGURACIÓN DE WHATSAPP
     Reemplaza "TUNUMERO" por tu número con código de país,
     sin "+" y sin espacios. Ejemplo: 5215512345678
     ------------------------------------------------------- */
  const WHATSAPP_NUMBER = "5353733997";
  const WHATSAPP_MESSAGE = "Hola CallMeViera, quiero información sobre sus servicios";

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  document.querySelectorAll("[data-wa]").forEach((link) => {
    link.href = whatsappUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  if (WHATSAPP_NUMBER === "TUNUMERO") {
    console.warn(
      "CallMeViera: configura WHATSAPP_NUMBER en script.js con tu número real para activar los botones."
    );
  }

  /* -------------------------------------------------------
     Año del footer
     ------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* -------------------------------------------------------
     Header, barra de progreso y botón flotante
     ------------------------------------------------------- */
  const header = document.getElementById("header");
  const progress = document.querySelector(".scroll-progress");
  const floatButton = document.querySelector(".wa-float");
  const root = document.documentElement;

  let scrollTicking = false;

  function updateScrollUI() {
    const y = window.scrollY || root.scrollTop;
    const max = root.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(y / max, 1) : 0;

    if (header) header.classList.toggle("is-scrolled", y > 12);
    if (progress) progress.style.transform = `scaleX(${ratio})`;
    if (floatButton) floatButton.classList.toggle("is-visible", y > 520);

    scrollTicking = false;
  }

  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(updateScrollUI);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  updateScrollUI();

  /* -------------------------------------------------------
     Animaciones de entrada
     ------------------------------------------------------- */
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealElements = document.querySelectorAll(".reveal");

  if (!reduceMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  /* -------------------------------------------------------
     Brillo que sigue al cursor en el hero (solo escritorio)
     ------------------------------------------------------- */
  const hero = document.querySelector(".hero");
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  if (hero && !reduceMotion && finePointer) {
    let glowTicking = false;
    let pointerX = 0;
    let pointerY = 0;

    hero.addEventListener(
      "pointermove",
      (event) => {
        const rect = hero.getBoundingClientRect();
        pointerX = event.clientX - rect.left;
        pointerY = event.clientY - rect.top;

        if (glowTicking) return;
        glowTicking = true;

        window.requestAnimationFrame(() => {
          hero.style.setProperty("--mx", `${pointerX}px`);
          hero.style.setProperty("--my", `${pointerY}px`);
          glowTicking = false;
        });
      },
      { passive: true }
    );
  }
})();
