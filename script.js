/* ============================================================
   VINH — PORTFOLIO INTERACTIONS
   Smooth scroll, scroll-reveal, ambient waveform canvas,
   equalizer bar variance, footer year / back-to-top.
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------
     1. Footer year
  --------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     2. Smooth scroll for internal links + scroll cue + back-to-top
  --------------------------------------------------------- */
  const smoothScrollTo = (selector) => {
    const target = document.querySelector(selector);
    if (!target) return;
    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href.length > 1) {
        e.preventDefault();
        smoothScrollTo(href);
      }
    });
  });

  const scrollCue = document.getElementById("scrollCue");
  if (scrollCue) {
    scrollCue.addEventListener("click", () => smoothScrollTo("#about"));
  }

  const backToTop = document.getElementById("backToTop");
  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
  }

  /* ---------------------------------------------------------
     3. Scroll-reveal via IntersectionObserver
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            // slight stagger for elements that reveal together
            setTimeout(() => {
              entry.target.classList.add("is-visible");
            }, i * 60);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: no IO support, just show everything
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------------------------------------------------------
     4. Ambient hero waveform (canvas)
     A calm, generative bar waveform — not reactive to audio,
     just a slow organic idle animation that echoes the
     SoundCloud identity throughout the page.
  --------------------------------------------------------- */
  const canvas = document.getElementById("waveform");

  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext("2d");
    let width, height, bars, dpr;

    const BAR_GAP = 5;
    const BAR_MIN_WIDTH = 3;

    function resizeCanvas() {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const barCount = Math.floor(width / (BAR_MIN_WIDTH + BAR_GAP));
      bars = new Array(barCount).fill(0).map((_, i) => ({
        baseHeight: 0.15 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.6,
        amp: 0.25 + Math.random() * 0.4,
      }));
    }

    let t = 0;
    function draw() {
      t += 0.012;
      ctx.clearRect(0, 0, width, height);

      const barWidth = width / bars.length;

      bars.forEach((bar, i) => {
        const wave =
          Math.sin(t * bar.speed + bar.phase) * 0.5 +
          Math.sin(t * bar.speed * 1.7 + bar.phase) * 0.3;
        const normalized = (wave + 1) / 2; // 0..1
        const barHeight =
          (bar.baseHeight + normalized * bar.amp) * height;

        const x = i * barWidth;
        const y = height - barHeight;

        const gradient = ctx.createLinearGradient(0, y, 0, height);
        gradient.addColorStop(0, "rgba(232, 163, 61, 0.9)");
        gradient.addColorStop(1, "rgba(232, 163, 61, 0.05)");

        ctx.fillStyle = gradient;
        const w = Math.max(BAR_MIN_WIDTH, barWidth - BAR_GAP);
        const radius = w / 2;

        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(x, y + radius);
        ctx.arcTo(x, y, x + radius, y, radius);
        ctx.lineTo(x + w - radius, y);
        ctx.arcTo(x + w, y, x + w, y + radius, radius);
        ctx.lineTo(x + w, height);
        ctx.closePath();
        ctx.fill();
      });

      requestAnimationFrame(draw);
    }

    resizeCanvas();
    draw();

    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resizeCanvas, 150);
    });
  }

  /* ---------------------------------------------------------
     5. SoundCloud card equalizer bars
     Generates a set of bars with randomized peak heights so
     the hover animation feels organic rather than uniform.
  --------------------------------------------------------- */
  const eqContainer = document.getElementById("soundEq");

  if (eqContainer) {
    const BAR_COUNT = 14;
    for (let i = 0; i < BAR_COUNT; i++) {
      const bar = document.createElement("span");
      const peak = 35 + Math.random() * 55; // 35%–90%
      const duration = 0.7 + Math.random() * 0.8; // 0.7s–1.5s
      const delay = Math.random() * 0.6;

      bar.style.setProperty("--peak", `${peak}%`);
      bar.style.animationDuration = `${duration}s`;
      bar.style.animationDelay = `${delay}s`;

      eqContainer.appendChild(bar);
    }
  }

  /* ---------------------------------------------------------
     6. Nav background intensifies slightly on scroll
  --------------------------------------------------------- */
  const nav = document.querySelector(".site-nav");
  if (nav) {
    let lastKnownScroll = 0;
    let ticking = false;

    function updateNav() {
      if (window.scrollY > 40) {
        nav.style.background = "rgba(18, 33, 28, 0.92)";
        nav.style.boxShadow = "0 1px 0 rgba(241,236,225,0.08)";
      } else {
        nav.style.background =
          "linear-gradient(to bottom, rgba(18,33,28,0.9), rgba(18,33,28,0))";
        nav.style.boxShadow = "none";
      }
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      lastKnownScroll = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    });
  }
});
