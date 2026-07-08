/* ============================================================
   VINH — PORTFOLIO INTERACTIONS
   Theme toggle, language switch, smooth scroll, scroll-reveal,
   ambient waveform canvas, equalizer bars, footer utilities.
   ============================================================ */

/* ---------------------------------------------------------
   Translations
--------------------------------------------------------- */
const translations = {
  en: {
    nav: { about: "about", elsewhere: "elsewhere", radio: "radio", cta: "github ↗" },
    hero: {
      eyebrow: "// currently building things that make noise",
      title1: "Vinh codes,",
      title2: "Vinh mixes.",
      sub: "Full-stack developer by daylight, self-taught sound tinkerer after dark. I ship interfaces that behave themselves and tracks that don't.",
      btnPrimary: "Find me elsewhere",
      btnGhost: "View GitHub"
    },
    scrollcue: "scroll",
    about: {
      eyebrow: "who's typing",
      heading: "I like problems that end in either a <em>deploy</em> or a <em>drop</em>.",
      p1: "I'm Vinh — most places online you'll find me as <strong>vinhxdev</strong>. By trade I build things for the web: interfaces, small tools, and the occasional over-engineered side project that only I will ever use. By habit, I'm somewhere in a DAW, chasing a bassline that won't sit right.",
      p2: "The two aren't as far apart as they sound. Code and music are both just timing, structure, and knowing when to leave space. I spend most of my time on the front end, but I'm just as happy tracing a bug at 1am as I am layering a track past 2.",
      stat1label: "stack", stat1value: "JS · TS · React · Node",
      stat2label: "mode", stat2value: "day: code / night: sound",
      stat3label: "status", stat3value: "open to collab"
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
    radio: {
      eyebrow: "now playing",
      title: "A track that's had me on repeat lately.",
      kicker: "personal radio",
      note: "Hit play — no login, no ads, just the track."
    },
    footer: { github: "github", facebook: "facebook", soundcloud: "soundcloud" }
  },

  vi: {
    nav: { about: "giới thiệu", elsewhere: "kết nối", radio: "radio", cta: "github ↗" },
    hero: {
      eyebrow: "// đang xây những thứ gây ồn theo cách riêng",
      title1: "Vinh code,",
      title2: "Vinh mix.",
      sub: "Là full-stack developer vào ban ngày, tay chơi âm thanh tự học vào ban đêm. Mình làm ra giao diện biết cư xử đúng mực, còn những bản mix thì không hẳn.",
      btnPrimary: "Tìm mình ở nơi khác",
      btnGhost: "Xem GitHub"
    },
    scrollcue: "cuộn",
    about: {
      eyebrow: "ai đang gõ phím",
      heading: "Mình thích những vấn đề kết thúc bằng một lần <em>deploy</em> hoặc một bản <em>drop</em>.",
      p1: "Mình là Vinh — hầu hết mọi nơi trên mạng bạn sẽ thấy mình với cái tên <strong>vinhxdev</strong>. Công việc chính là xây những thứ cho web: giao diện, công cụ nhỏ, và thỉnh thoảng vài dự án cá nhân bị làm phức tạp hoá quá mức mà chỉ mình mình dùng. Còn theo thói quen thì mình hay lẩn quẩn trong một cái DAW, đuổi theo một đường bass chưa vừa ý.",
      p2: "Hai việc này không xa nhau như mọi người nghĩ. Code và âm nhạc đều là chuyện timing, cấu trúc, và biết khi nào nên để khoảng lặng. Phần lớn thời gian mình làm front-end, nhưng debug lúc 1 giờ sáng hay chồng lớp âm thanh qua 2 giờ đêm thì mình đều thấy vui như nhau.",
      stat1label: "công nghệ", stat1value: "JS · TS · React · Node",
      stat2label: "chế độ", stat2value: "ngày: code / đêm: âm thanh",
      stat3label: "trạng thái", stat3value: "sẵn sàng hợp tác"
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
    radio: {
      eyebrow: "đang phát",
      title: "Bản nhạc mình nghe lặp lại suốt dạo này.",
      kicker: "radio cá nhân",
      note: "Nhấn play — không cần đăng nhập, không quảng cáo, chỉ có nhạc."
    },
    footer: { github: "github", facebook: "facebook", soundcloud: "soundcloud" }
  }
};

let currentTheme = "dark";

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------
     1. Footer year is fixed per brief (© 2026), no JS needed.
     2. Language switch
  --------------------------------------------------------- */
  const langEnBtn = document.getElementById("langEnBtn");
  const langViBtn = document.getElementById("langViBtn");

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.en;
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
     3. Theme toggle
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
      themeColorMeta.setAttribute("content", theme === "light" ? "#F7F2E7" : "#12211C");
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
     4. Smooth scroll for internal links + scroll cue + back-to-top
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
     5. Scroll-reveal via IntersectionObserver
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
     6. Ambient hero waveform (canvas)
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
      const topAlpha = isLight ? 0.55 : 0.9;
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
     7. Equalizer bar generator (shared by SoundCloud card
        and the Radio widget)
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
     8. Nav background intensifies slightly on scroll
  --------------------------------------------------------- */
  const nav = document.querySelector(".site-nav");
  if (nav) {
    let ticking = false;

    function updateNav() {
      if (window.scrollY > 40) {
        nav.style.background = "var(--ink)";
        nav.style.boxShadow = "0 1px 0 var(--border)";
      } else {
        nav.style.background = "linear-gradient(to bottom, var(--ink), transparent)";
        nav.style.boxShadow = "none";
      }
      ticking = false;
    }

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    });

    updateNav();
  }
});
