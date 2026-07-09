/* ============================================================
   VINHXDEV — PORTFOLIO INTERACTIONS
   Theme toggle, language switch, email copy, scroll progress,
   smooth scroll, scroll-reveal, ambient waveform, equalizers.
   ============================================================ */

/* ---------------------------------------------------------
   Translations
--------------------------------------------------------- */
const translations = {
  en: {
    nav: { about: "about", elsewhere: "elsewhere", learning: "learning", radio: "radio", email: "copy email" },
    hero: {
      eyebrow: "// currently building things that make noise",
      title1: "Vinh codes,",
      title2: "Vinh mixes.",
      sub: "I love coding and listening to music whenever I have free time.",
      btnPrimary: "Find me elsewhere",
      btnGhost: "View GitHub"
    },
    scrollcue: "scroll",
    about: {
      eyebrow: "who's typing",
      heading: "I like problems that end in either a <em>deploy</em> or a <em>drop</em>.",
      p1: "I'm Vinh — you'll find me online as <strong>vinhxdev</strong>.",
      p2: "I love coding and listening to music whenever I have free time.",
      stat1label: "mode", stat1value: "day: code / night: sound",
      stat2label: "status", stat2value: "open to collab",
      techLabel: "tech stack"
    },
    links: { eyebrow: "elsewhere", title: "Find me around the internet." },
    card: {
      githubLabel: "github",
      githubDesc: "Where the code lives — repos, experiments, late-night commits.",
      facebookLabel: "facebook",
      facebookDesc: "Say hi, or just lurk from the timeline. I don't mind either."
    },
    sound: {
      label: "soundcloud",
      desc: "Tracks, mixes, and whatever's been stuck in my head this week.",
      cta: "Press play"
    },
    learning: {
      eyebrow: "learning hub",
      title: "A few resources worth your time.",
      mdn: "The reference for HTML, CSS, and JavaScript — where I look things up first.",
      fcc: "Free, structured courses covering the full path from basics to full-stack.",
      cs50: "Harvard's intro to computer science — a solid foundation in how systems work."
    },
    radio: {
      eyebrow: "now playing",
      title: "A track that's had me on repeat lately.",
      kicker: "personal radio",
      note: "Hit play — no login, no ads, just the track."
    },
    footer: { github: "github", facebook: "facebook", soundcloud: "soundcloud" },
    emailCopied: "copied!"
  },

  vi: {
    nav: { about: "giới thiệu", elsewhere: "kết nối", learning: "học tập", radio: "radio", email: "sao chép email" },
    hero: {
      eyebrow: "// đang xây những thứ gây ồn theo cách riêng",
      title1: "Vinh code,",
      title2: "Vinh mix.",
      sub: "Mình thích code và nghe nhạc mỗi khi có thời gian rảnh.",
      btnPrimary: "Tìm mình ở nơi khác",
      btnGhost: "Xem GitHub"
    },
    scrollcue: "cuộn",
    about: {
      eyebrow: "ai đang gõ phím",
      heading: "Mình thích những vấn đề kết thúc bằng một lần <em>deploy</em> hoặc một bản <em>drop</em>.",
      p1: "Mình là Vinh — hầu hết mọi nơi trên mạng bạn sẽ thấy mình với cái tên <strong>vinhxdev</strong>.",
      p2: "Mình thích code và nghe nhạc mỗi khi có thời gian rảnh.",
      stat1label: "chế độ", stat1value: "ngày: code / đêm: âm thanh",
      stat2label: "trạng thái", stat2value: "sẵn sàng hợp tác",
      techLabel: "công nghệ dùng"
    },
    links: { eyebrow: "kết nối", title: "Tìm mình quanh đây trên internet." },
    card: {
      githubLabel: "github",
      githubDesc: "Nơi code sống — repo, thử nghiệm, và những commit lúc nửa đêm.",
      facebookLabel: "facebook",
      facebookDesc: "Ghé qua chào một tiếng, hoặc cứ lặng lẽ xem dòng thời gian cũng được."
    },
    sound: {
      label: "soundcloud",
      desc: "Track, bản mix, và bất cứ giai điệu nào đang vướng trong đầu mình tuần này.",
      cta: "Nhấn nghe"
    },
    learning: {
      eyebrow: "tài liệu học tập",
      title: "Vài tài nguyên đáng để bạn dành thời gian.",
      mdn: "Tài liệu tham khảo cho HTML, CSS và JavaScript — nơi mình tra cứu đầu tiên.",
      fcc: "Khóa học miễn phí, có lộ trình rõ ràng từ cơ bản đến full-stack.",
      cs50: "Nhập môn khoa học máy tính của Harvard — nền tảng vững cho cách hệ thống vận hành."
    },
    radio: {
      eyebrow: "đang phát",
      title: "Bản nhạc mình nghe lặp lại suốt dạo này.",
      kicker: "radio cá nhân",
      note: "Nhấn play — không cần đăng nhập, không quảng cáo, chỉ có nhạc."
    },
    footer: { github: "github", facebook: "facebook", soundcloud: "soundcloud" },
    emailCopied: "đã sao chép!"
  }
};

let currentTheme = "dark";
let currentLang = "en";

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------
     1. Language switch
  --------------------------------------------------------- */
  const langEnBtn = document.getElementById("langEnBtn");
  const langViBtn = document.getElementById("langViBtn");

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.en;
    currentLang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = key.split(".").reduce((acc, k) => (acc ? acc[k] : undefined), dict);
      if (value !== undefined) el.innerHTML = value;
    });

    document.documentElement.lang = lang;
    if (langEnBtn) langEnBtn.classList.toggle("is-active", lang === "en");
    if (langViBtn) langViBtn.classList.toggle("is-active", lang === "vi");
    try { localStorage.setItem("vinh-lang", lang); } catch (e) {}
  }

  let savedLang = "en";
  try { savedLang = localStorage.getItem("vinh-lang") || "en"; } catch (e) {}
  applyLanguage(savedLang);

  if (langEnBtn) langEnBtn.addEventListener("click", () => applyLanguage("en"));
  if (langViBtn) langViBtn.addEventListener("click", () => applyLanguage("vi"));

  /* ---------------------------------------------------------
     2. Theme toggle
  --------------------------------------------------------- */
  const themeToggle = document.getElementById("themeToggle");
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');

  function applyTheme(theme) {
    currentTheme = theme;
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", theme === "light" ? "#F7F2E7" : "#0A0B0A");
    }
    try { localStorage.setItem("vinh-theme", theme); } catch (e) {}
  }

  const startingTheme = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  applyTheme(startingTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      applyTheme(currentTheme === "light" ? "dark" : "light");
    });
  }

  /* ---------------------------------------------------------
     3. 1-click email copy
  --------------------------------------------------------- */
  const emailCopyBtn = document.getElementById("emailCopyBtn");
  if (emailCopyBtn) {
    const labelEl = emailCopyBtn.querySelector(".email-copy__label");
    const email = emailCopyBtn.getAttribute("data-email") || "";
    let resetTimeout;

    emailCopyBtn.addEventListener("click", async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(email);
        } else {
          const tempInput = document.createElement("textarea");
          tempInput.value = email;
          tempInput.style.position = "fixed";
          tempInput.style.opacity = "0";
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand("copy");
          document.body.removeChild(tempInput);
        }

        emailCopyBtn.classList.add("is-copied");
        if (labelEl) {
          const dict = translations[currentLang] || translations.en;
          labelEl.textContent = dict.emailCopied || "copied!";
        }

        clearTimeout(resetTimeout);
        resetTimeout = setTimeout(() => {
          emailCopyBtn.classList.remove("is-copied");
          if (labelEl) {
            const dict = translations[currentLang] || translations.en;
            labelEl.textContent = dict.nav.email;
          }
        }, 2000);
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    });
  }

  /* ---------------------------------------------------------
     4. Scroll progress bar
  --------------------------------------------------------- */
  const scrollProgress = document.getElementById("scrollProgress");
  function updateScrollProgress() {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = `${percent}%`;
  }

  /* ---------------------------------------------------------
     5. Smooth scroll for internal links + scroll cue + back-to-top
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
     6. Scroll-reveal via IntersectionObserver
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
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
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------------------------------------------------------
     7. Ambient hero waveform (canvas)
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
      bars = new Array(barCount).fill(0).map(() => ({
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
      const isLight = currentTheme === "light";
      const topAlpha = isLight ? 0.55 : 0.85;
      const bottomAlpha = isLight ? 0.03 : 0.05;

      bars.forEach((bar, i) => {
        const wave =
          Math.sin(t * bar.speed + bar.phase) * 0.5 +
          Math.sin(t * bar.speed * 1.7 + bar.phase) * 0.3;
        const normalized = (wave + 1) / 2;
        const barHeight = (bar.baseHeight + normalized * bar.amp) * height;

        const x = i * barWidth;
        const y = height - barHeight;

        const gradient = ctx.createLinearGradient(0, y, 0, height);
        gradient.addColorStop(0, `rgba(232, 163, 61, ${topAlpha})`);
        gradient.addColorStop(1, `rgba(232, 163, 61, ${bottomAlpha})`);

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
     8. Equalizer bar generator (SoundCloud card + Radio widget)
  --------------------------------------------------------- */
  function createEqBars(container, count, minPeak, maxPeak, minDur, maxDur) {
    if (!container) return;
    for (let i = 0; i < count; i++) {
      const bar = document.createElement("span");
      const peak = minPeak + Math.random() * (maxPeak - minPeak);
      const duration = minDur + Math.random() * (maxDur - minDur);
      const delay = Math.random() * 0.6;

      bar.style.setProperty("--peak", `${peak}%`);
      bar.style.animationDuration = `${duration}s`;
      bar.style.animationDelay = `${delay}s`;

      container.appendChild(bar);
    }
  }

  createEqBars(document.getElementById("soundEq"), 14, 35, 90, 0.7, 1.5);
  createEqBars(document.getElementById("radioEq"), 9, 40, 100, 0.6, 1.3);

  /* ---------------------------------------------------------
     9. Nav background intensifies on scroll + progress bar sync
  --------------------------------------------------------- */
  const nav = document.querySelector(".site-nav");
  let ticking = false;

  function updateOnScroll() {
    if (nav) {
      if (window.scrollY > 40) {
        nav.style.background = "var(--ink)";
        nav.style.boxShadow = "0 1px 0 var(--border)";
      } else {
        nav.style.background = "linear-gradient(to bottom, var(--ink), transparent)";
        nav.style.boxShadow = "none";
      }
    }
    updateScrollProgress();
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  });

  updateOnScroll();
});
