/* ============================================================
   VINHXDEV — PORTFOLIO INTERACTIONS
   Theme (system + manual), language switch, email copy,
   scroll progress, scroll-reveal, ambient waveform, equalizers,
   interactive terminal, vinhxcapcha anti-spam gate.
   ============================================================ */

/* ---------------------------------------------------------
   Translations
--------------------------------------------------------- */
const translations = {
  en: {
    nav: { about: "about", elsewhere: "elsewhere", learning: "learning", terminal: "terminal", radio: "radio", email: "copy email" },
    hero: {
      eyebrow: "// currently building things that make noise",
      title: "Hello, I'm Vinh.",
      sub: "I'm Vinh — most places online you'll find me as vinhxdev. I love coding and listening to music whenever I have free time.",
      btnPrimary: "Find me elsewhere",
      btnGhost: "View GitHub"
    },
    status: { text: "Ready for new code strings" },
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
    terminal: {
      eyebrow: "try it yourself",
      title: "A tiny terminal, just for fun.",
      intro: "Type <strong>help</strong> to see available commands.",
      help: [
        "Available commands:",
        "help — show this list",
        "about — quick bio",
        "skills — tech stack",
        "music — now playing",
        "clear — clear the screen"
      ],
      about: [
        "Vinh — full-stack developer.",
        "I love coding and listening to music whenever I have free time."
      ],
      skills: ["JavaScript · HTML/CSS · Git · Lua · Systems"],
      music: [
        "spinning up the turntable...",
        "♪ now playing: \"keep steady\" — sosocamo ♪",
        "press play in the Radio section below to hear it for real."
      ],
      notFound: (cmd) => `command not found: ${cmd} — type "help" for options.`
    },
    radio: {
      eyebrow: "now playing",
      title: "A track that's had me on repeat lately.",
      kicker: "personal radio",
      track: "currently: \"keep steady\" — sosocamo",
      note: "Hit play — no login, no ads, just the track."
    },
    footer: { github: "github", facebook: "facebook", soundcloud: "soundcloud" },
    emailCopied: "copied!",
    capcha: {
      title: "Quick check before you continue",
      note: "We noticed a burst of activity. Please confirm you're not a bot.",
      label: "Click to verify you're a human developer",
      verified: "Verified — welcome back."
    }
  },

  vi: {
    nav: { about: "giới thiệu", elsewhere: "kết nối", learning: "học tập", terminal: "terminal", radio: "radio", email: "sao chép email" },
    hero: {
      eyebrow: "// đang xây những thứ gây ồn theo cách riêng",
      title: "Xin chào, mình là Vinh.",
      sub: "Mình là Vinh — hầu hết mọi nơi trên mạng bạn sẽ thấy mình với cái tên vinhxdev. Mình thích code và nghe nhạc mỗi khi có thời gian rảnh.",
      btnPrimary: "Tìm mình ở nơi khác",
      btnGhost: "Xem GitHub"
    },
    status: { text: "Sẵn sàng vọc vạch code mới" },
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
    terminal: {
      eyebrow: "thử ngay tại đây",
      title: "Một cái terminal nhỏ, cho vui thôi.",
      intro: "Gõ <strong>help</strong> để xem các lệnh có sẵn.",
      help: [
        "Các lệnh có sẵn:",
        "help — hiển thị danh sách này",
        "about — giới thiệu nhanh",
        "skills — công nghệ đang dùng",
        "music — bài đang nghe",
        "clear — xoá màn hình"
      ],
      about: [
        "Vinh — full-stack developer.",
        "Mình thích code và nghe nhạc mỗi khi có thời gian rảnh."
      ],
      skills: ["JavaScript · HTML/CSS · Git · Lua · Systems"],
      music: [
        "đang quay đĩa than...",
        "♪ đang phát: \"keep steady\" — sosocamo ♪",
        "nhấn play ở mục Radio bên dưới để nghe thật nhé."
      ],
      notFound: (cmd) => `không tìm thấy lệnh: ${cmd} — gõ "help" để xem danh sách.`
    },
    radio: {
      eyebrow: "đang phát",
      title: "Bản nhạc mình nghe lặp lại suốt dạo này.",
      kicker: "radio cá nhân",
      track: "đang phát: \"keep steady\" — sosocamo",
      note: "Nhấn play — không cần đăng nhập, không quảng cáo, chỉ có nhạc."
    },
    footer: { github: "github", facebook: "facebook", soundcloud: "soundcloud" },
    emailCopied: "đã sao chép!",
    capcha: {
      title: "Xác minh nhanh trước khi tiếp tục",
      note: "Mình nhận thấy có thao tác liên tục bất thường. Vui lòng xác nhận bạn không phải bot.",
      label: "Nhấn để xác minh bạn là một developer thật",
      verified: "Đã xác minh — chào mừng quay lại."
    }
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
     2. Theme: system auto-detect + manual override
  --------------------------------------------------------- */
  const themeToggle = document.getElementById("themeToggle");
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const systemSchemeQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;

  function hasManualThemeOverride() {
    try { return localStorage.getItem("vinh-theme") !== null; } catch (e) { return false; }
  }

  function applyTheme(theme, { manual = false } = {}) {
    currentTheme = theme;
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", theme === "light" ? "#F7F2E7" : "#0A0A0A");
    }
    if (manual) {
      try { localStorage.setItem("vinh-theme", theme); } catch (e) {}
    }
  }

  // Determine the theme actually applied by the blocking head script.
  const initialTheme = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  currentTheme = initialTheme;
  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", initialTheme === "light" ? "#F7F2E7" : "#0A0A0A");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      applyTheme(currentTheme === "light" ? "dark" : "light", { manual: true });
    });
  }

  // Live-follow the OS theme only while the user hasn't manually chosen one.
  if (systemSchemeQuery) {
    const handleSystemChange = (e) => {
      if (hasManualThemeOverride()) return;
      applyTheme(e.matches ? "light" : "dark", { manual: false });
    };
    if (systemSchemeQuery.addEventListener) {
      systemSchemeQuery.addEventListener("change", handleSystemChange);
    } else if (systemSchemeQuery.addListener) {
      systemSchemeQuery.addListener(handleSystemChange);
    }
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

  /* ---------------------------------------------------------
     10. Interactive mock terminal
  --------------------------------------------------------- */
  const terminalOutput = document.getElementById("terminalOutput");
  const terminalInput = document.getElementById("terminalInput");
  const terminalBody = document.getElementById("terminalBody");

  function scrollTerminalToBottom() {
    if (terminalOutput) terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function addTerminalLine(text, variant) {
    if (!terminalOutput) return;
    const line = document.createElement("p");
    line.className = "terminal-line" + (variant ? ` terminal-line--${variant}` : "");
    line.innerHTML = text;
    terminalOutput.appendChild(line);
    scrollTerminalToBottom();
  }

  function addTerminalLinesWithDelay(lines, variant, gap) {
    lines.forEach((text, i) => {
      setTimeout(() => addTerminalLine(text, variant), i * gap);
    });
  }

  function runTerminalCommand(raw) {
    const dict = (translations[currentLang] || translations.en).terminal;
    const cmd = raw.trim().toLowerCase();

    addTerminalLine(raw || "&nbsp;", "command");

    if (!cmd) return;

    switch (cmd) {
      case "help":
        dict.help.forEach((line) => addTerminalLine(line, "muted"));
        break;
      case "about":
        dict.about.forEach((line) => addTerminalLine(line));
        break;
      case "skills":
        dict.skills.forEach((line) => addTerminalLine(line, "accent"));
        break;
      case "music":
        addTerminalLinesWithDelay(dict.music, "accent", 380);
        break;
      case "clear":
        if (terminalOutput) terminalOutput.innerHTML = "";
        break;
      default:
        addTerminalLine(dict.notFound(cmd), "error");
    }
  }

  if (terminalInput) {
    terminalInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const value = terminalInput.value;
        terminalInput.value = "";
        runTerminalCommand(value);
      }
    });
  }

  if (terminalBody) {
    terminalBody.addEventListener("click", () => {
      if (terminalInput) terminalInput.focus();
    });
  }

  /* ---------------------------------------------------------
     11. vinhxcapcha — rapid-click / spam detection gate
  --------------------------------------------------------- */
  const capchaOverlay = document.getElementById("capchaOverlay");
  const capchaCheckbox = document.getElementById("capchaCheckbox");
  const capchaLabel = document.getElementById("capchaLabel");

  const RAGE_CLICK_THRESHOLD = 5;
  const RAGE_CLICK_WINDOW_MS = 900;
  let clickTimestamps = [];
  let capchaOpen = false;

  function showCapcha() {
    if (!capchaOverlay || capchaOpen) return;
    capchaOpen = true;
    capchaOverlay.hidden = false;
    document.body.classList.add("is-locked");
    // force a reflow so the transition triggers reliably
    void capchaOverlay.offsetWidth;
    capchaOverlay.classList.add("is-visible");

    if (capchaCheckbox) {
      capchaCheckbox.classList.remove("is-verifying", "is-verified");
      capchaCheckbox.setAttribute("aria-pressed", "false");
    }
    if (capchaLabel) {
      const dict = translations[currentLang] || translations.en;
      capchaLabel.textContent = dict.capcha.label;
    }
  }

  function hideCapcha() {
    if (!capchaOverlay) return;
    capchaOverlay.classList.remove("is-visible");
    document.body.classList.remove("is-locked");
    setTimeout(() => {
      capchaOverlay.hidden = true;
      capchaOpen = false;
    }, 350);
  }

  if (capchaCheckbox) {
    capchaCheckbox.addEventListener("click", () => {
      if (capchaCheckbox.classList.contains("is-verifying") || capchaCheckbox.classList.contains("is-verified")) return;

      capchaCheckbox.classList.add("is-verifying");
      capchaCheckbox.setAttribute("aria-pressed", "true");

      setTimeout(() => {
        capchaCheckbox.classList.remove("is-verifying");
        capchaCheckbox.classList.add("is-verified");
        if (capchaLabel) {
          const dict = translations[currentLang] || translations.en;
          capchaLabel.textContent = dict.capcha.verified;
        }
        clickTimestamps = [];

        setTimeout(hideCapcha, 700);
      }, 650);
    });
  }

  document.addEventListener("click", (e) => {
    if (capchaOverlay && capchaOverlay.contains(e.target)) return;
    if (capchaOpen) return;

    const now = Date.now();
    clickTimestamps.push(now);
    clickTimestamps = clickTimestamps.filter((ts) => now - ts <= RAGE_CLICK_WINDOW_MS);

    if (clickTimestamps.length >= RAGE_CLICK_THRESHOLD) {
      clickTimestamps = [];
      showCapcha();
    }
  });
});
