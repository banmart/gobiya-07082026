/* Gobiya — chrome interactions: smart nav, mobile menu, parallax, clocks */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── mark fonts/content ready (drives hero media fade-in) ── */
  function finishLoading() {
    document.body.classList.add("is-loaded");
  }
  if (prefersReduced) {
    finishLoading();
  } else {
    const ready = document.fonts ? document.fonts.ready : Promise.resolve();
    ready.then(finishLoading);
    setTimeout(finishLoading, 3500); // hard failsafe
  }

  /* ── smart nav: blur when scrolled, hide on scroll down ── */
  const nav = document.getElementById("nav");
  let lastY = window.scrollY;
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("is-scrolled", y > 24);
    if (y > lastY && y > 320 && !menuOpen) nav.classList.add("is-hidden");
    else nav.classList.remove("is-hidden");
    lastY = y;
    updateParallax();
    updateScrub();
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );

  /* ── hero parallax (object-position, so it never fights the zoom transition) ── */
  const parallaxEls = document.querySelectorAll("[data-parallax] img, [data-parallax] video");
  function updateParallax() {
    if (prefersReduced) return;
    parallaxEls.forEach((img) => {
      const rect = img.parentElement.getBoundingClientRect();
      // 0 when container top hits viewport top, 1 when it's a full viewport below
      const progress = Math.max(-1, Math.min(1, rect.top / window.innerHeight));
      img.style.objectPosition = `50% ${50 - progress * 18}%`;
    });
  }

  /* ── scroll-scrubbed hero video: pins in place and plays frame-by-frame
     as the user scrolls, then releases and the page continues normally ── */
  const scrubWrap = document.querySelector("[data-scrub-video]");
  const scrubMedia = scrubWrap ? scrubWrap.querySelector(".hero__media") : null;
  const scrubVideo = scrubMedia ? scrubMedia.querySelector("video") : null;
  let scrubNavH = 0;
  let scrubActive = false;

  function sizeScrub() {
    if (!scrubWrap || !scrubMedia) return;
    scrubNavH = nav.offsetHeight;
    scrubMedia.style.top = `${scrubNavH}px`;
    // ~2.5 viewports of scroll to scrub the full clip — enough range for
    // frame-by-frame control without making the page too long.
    const range = window.innerHeight * 2.5;
    scrubWrap.style.height = `${scrubMedia.offsetHeight + range}px`;
  }

  function updateScrub() {
    if (!scrubActive || !scrubWrap || !scrubMedia || !scrubVideo) return;
    const duration = scrubVideo.duration;
    if (!duration || Number.isNaN(duration)) return;
    const wrapRect = scrubWrap.getBoundingClientRect();
    const scrollable = scrubWrap.offsetHeight - scrubMedia.offsetHeight;
    if (scrollable <= 0) return;
    const scrolledIntoPin = scrubNavH - wrapRect.top;
    const progress = Math.max(0, Math.min(1, scrolledIntoPin / scrollable));
    const target = progress * duration;
    if (Math.abs(scrubVideo.currentTime - target) > 0.03) {
      scrubVideo.currentTime = target;
    }
  }

  if (scrubWrap && scrubMedia && scrubVideo) {
    if (prefersReduced) {
      // Leave it as a plain autoplay/loop background video — no pin, no
      // scroll-jacking, matches the rest of the site's reduced-motion story.
    } else {
      const enableScrub = () => {
        scrubVideo.pause();
        scrubActive = true;
        sizeScrub();
        updateScrub();
      };
      if (scrubVideo.readyState >= 1) {
        enableScrub();
      } else {
        scrubVideo.addEventListener("loadedmetadata", enableScrub, { once: true });
      }
      let resizeTimer;
      window.addEventListener(
        "resize",
        () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(sizeScrub, 150);
        },
        { passive: true }
      );
    }
  }

  /* ── mobile menu ── */
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  let menuOpen = false;
  menu.querySelectorAll(".menu__links a").forEach((a, i) => a.style.setProperty("--i", i));
  function toggleMenu(force) {
    menuOpen = typeof force === "boolean" ? force : !menuOpen;
    burger.classList.toggle("is-open", menuOpen);
    burger.setAttribute("aria-expanded", String(menuOpen));
    menu.classList.toggle("is-open", menuOpen);
    menu.setAttribute("aria-hidden", String(!menuOpen));
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }
  burger.addEventListener("click", () => toggleMenu());
  menu.querySelectorAll("a[href^='#']").forEach((a) =>
    a.addEventListener("click", () => toggleMenu(false))
  );
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOpen) toggleMenu(false);
  });

  /* ── office clocks ── */
  const clocks = document.querySelectorAll(".offices__time[data-tz]");
  function tick() {
    const now = new Date();
    clocks.forEach((el) => {
      el.textContent = new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: el.dataset.tz,
      }).format(now);
    });
  }
  if (clocks.length) {
    tick();
    setInterval(tick, 1000);
  }

  /* ── initial paint ── */
  onScroll();
})();
