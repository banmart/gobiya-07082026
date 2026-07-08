/* Confluence Capital — interactions
   reveal-on-scroll, word splits, count-ups, parallax,
   smart nav, office clocks, mobile menu, preloader */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── preloader ── */
  const preloader = document.getElementById("preloader");
  function finishLoading() {
    document.body.classList.add("is-loaded");
    if (preloader) {
      // Note: intentionally not removing this node from the DOM — it's rendered by
      // React (see components/Preloader.js), and imperatively removing a React-owned
      // node causes insertBefore/removeChild errors on the next re-render. CSS
      // (.preloader.is-done) fully hides it visually, so removal isn't needed.
      preloader.classList.add("is-done");
    }
  }
  if (prefersReduced) {
    finishLoading();
  } else {
    // wait for fonts + a beat for the bar animation, whichever is longer
    const minDelay = new Promise((r) => setTimeout(r, 1400));
    const ready = document.fonts ? document.fonts.ready : Promise.resolve();
    Promise.all([minDelay, ready]).then(finishLoading);
    setTimeout(finishLoading, 3500); // hard failsafe
  }

  /* ── split statements into masked words ── */
  document.querySelectorAll("[data-words]").forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = "";
    words.forEach((word, i) => {
      const mask = document.createElement("span");
      mask.className = "w";
      const inner = document.createElement("span");
      inner.style.setProperty("--i", i);
      inner.textContent = word;
      mask.appendChild(inner);
      el.appendChild(mask);
      el.appendChild(document.createTextNode(" "));
    });
  });

  /* ── reveal on scroll ── */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
  );
  document.querySelectorAll("[data-reveal], [data-words]").forEach((el, i) => {
    // small stagger among siblings revealed in the same batch
    el.style.setProperty("--d", `${(i % 4) * 70}ms`);
    io.observe(el);
  });

  /* ── count-up numbers ── */
  const easeExpoOut = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
  function countUp(el) {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const prefix = el.dataset.prefix || "";
    const plain = el.hasAttribute("data-plain"); // years: no thousands separator
    const dur = 1600;
    const start = performance.now();
    function frame(now) {
      const t = Math.min((now - start) / dur, 1);
      const v = target * easeExpoOut(t);
      el.textContent =
        prefix +
        (plain
          ? Math.round(v).toString()
          : v.toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            }));
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }
  const ioCount = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (prefersReduced) {
            const el = entry.target;
            el.textContent = (el.dataset.prefix || "") + el.dataset.count;
          } else {
            countUp(entry.target);
          }
          ioCount.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll("[data-count]").forEach((el) => ioCount.observe(el));

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
  const parallaxEls = document.querySelectorAll("[data-parallax] img");
  function updateParallax() {
    if (prefersReduced) return;
    parallaxEls.forEach((img) => {
      const rect = img.parentElement.getBoundingClientRect();
      // 0 when container top hits viewport top, 1 when it's a full viewport below
      const progress = Math.max(-1, Math.min(1, rect.top / window.innerHeight));
      img.style.objectPosition = `50% ${50 - progress * 18}%`;
    });
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
