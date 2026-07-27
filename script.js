/* ============================================================
   VINHXDEV — PORTFOLIO INTERACTIONS
   Theme (system + manual), language switch, email copy,
   scroll progress, scroll-reveal, ambient waveform, equalizers,
   interactive terminal (incl. live time & battery status),
   live VietQR donate widget, chaptered page layout,
   direct message form (delivers to inbox via FormSubmit),
   real traffic telemetry dashboard (dstats, no fake data),
   hero letter animation, 3D card tilt, cursor spotlight.
   ============================================================ */

/* ---------------------------------------------------------
   Translations
--------------------------------------------------------- */
const translations = {
  en: {
    nav: {
      intro: "intro", work: "work", lab: "lab", connect: "connect", email: "copy email"
    },
    chapter: {
      intro: "introduction",
      work: "work & learning",
      lab: "playground",
      connect: "get in touch"
    },
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
    projects: {
      eyebrow: "featured projects",
      title: "Things I've shipped.",
      desc: "My main project and personal site — where everything I build comes together."
    },
    learning: {
      eyebrow: "learning hub",
      title: "A few resources worth your time.",
      mdn: "The reference for HTML, CSS, and JavaScript — where I look things up first.",
      fcc: "Free, structured courses covering the full path from basics to full-stack.",
      cs50: "Harvard's intro to computer science — a solid foundation in how systems work."
    },
    traffic: {
      eyebrow: "// edge network telemetry",
      title: "Live system traffic logs."
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
        "time — current time in Ho Chi Minh City",
        "status — live status + device battery",
        "clear — clear the screen"
      ],
      about: [
        "Vinh — full-stack developer.",
        "I love coding and listening to music whenever I have free time."
      ],
      skills: ["JavaScript · HTML/CSS · Git · Lua · Systems"],
      music: [
        "spinning up the turntable...",
        "♪ 8 tracks loaded on the personal radio ♪",
        "scroll to the Radio section below and pick one."
      ],
      timeLabel: (str) => `Ho Chi Minh City time: ${str}`,
      statusActivities: [
        "current activity: coding on vinhx.site",
        "background: listening to SoundCloud"
      ],
      statusChecking: "checking device battery...",
      statusBattery: (percent, chargingLabel) => `user system battery: ${percent}% [${chargingLabel}]`,
      statusCharging: "Charging",
      statusNotCharging: "Not charging",
      statusBatteryUnsupported: "battery API not supported by this browser.",
      statusBatteryError: "couldn't read battery status.",
      notFound: (cmd) => `command not found: ${cmd} — type "help" for options.`
    },
    message: {
      eyebrow: "// direct line",
      title: "Drop me a message.",
      nameLabel: "your name",
      namePlaceholder: "e.g. Minh",
      contentLabel: "message",
      contentPlaceholder: "Feedback, a hello, a collab idea — anything.",
      note: "Lands straight in my inbox — no login, no tracking.",
      send: "send message",
      sending: "sending...",
      sent: "sent!",
      statusSent: "Got it — your message is on its way to my inbox. Thank you!",
      statusError: "Couldn't send right now. Opening your email app as a backup...",
      statusMissing: "Please fill in both your name and a message first."
    },
    donate: {
      eyebrow: "support",
      title: "Buy me a coffee, or don't — no pressure.",
      kicker: "bank transfer",
      bankLabel: "bank",
      accountLabel: "account number",
      holderLabel: "account holder",
      amountLabel: "Amount (VND)",
      messageLabel: "Message",
      messagePlaceholder: "thanks vinh!",
      note: "The QR code updates instantly as you type — scan it with any banking app."
    },
    radio: {
      eyebrow: "now playing",
      title: "My little radio station.",
      kicker: "personal radio",
      note: "Pick a track from the list — no login, no ads, just the music.",
      playlistLabel: "tracklist"
    },
    footer: { github: "github", facebook: "facebook", soundcloud: "soundcloud" },
    emailCopied: "copied!"
  },

  vi: {
    nav: {
      intro: "giới thiệu", work: "công việc", lab: "thử nghiệm", connect: "kết nối", email: "sao chép email"
    },
    chapter: {
      intro: "giới thiệu",
      work: "công việc & học tập",
      lab: "khu thử nghiệm",
      connect: "kết nối với mình"
    },
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
    projects: {
      eyebrow: "dự án tiêu biểu",
      title: "Những gì mình đã làm ra.",
      desc: "Dự án và trang cá nhân chính của mình — nơi mọi thứ mình xây được gộp lại."
    },
    learning: {
      eyebrow: "tài liệu học tập",
      title: "Vài tài nguyên đáng để bạn dành thời gian.",
      mdn: "Tài liệu tham khảo cho HTML, CSS và JavaScript — nơi mình tra cứu đầu tiên.",
      fcc: "Khóa học miễn phí, có lộ trình rõ ràng từ cơ bản đến full-stack.",
      cs50: "Nhập môn khoa học máy tính của Harvard — nền tảng vững cho cách hệ thống vận hành."
    },
    traffic: {
      eyebrow: "// đo lường mạng lưới edge",
      title: "Nhật ký lưu lượng hệ thống thực."
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
        "time — giờ hiện tại tại TPHCM",
        "status — trạng thái sống + pin thiết bị",
        "clear — xoá màn hình"
      ],
      about: [
        "Vinh — full-stack developer.",
        "Mình thích code và nghe nhạc mỗi khi có thời gian rảnh."
      ],
      skills: ["JavaScript · HTML/CSS · Git · Lua · Systems"],
      music: [
        "đang quay đĩa than...",
        "♪ 8 bài đã nạp sẵn trên radio cá nhân ♪",
        "cuộn xuống mục Radio bên dưới và chọn một bài nhé."
      ],
      timeLabel: (str) => `giờ tại TPHCM: ${str}`,
      statusActivities: [
        "hoạt động hiện tại: đang code trên vinhx.site",
        "nền: đang nghe SoundCloud"
      ],
      statusChecking: "đang kiểm tra pin thiết bị...",
      statusBattery: (percent, chargingLabel) => `pin hệ thống của bạn: ${percent}% [${chargingLabel}]`,
      statusCharging: "Đang sạc",
      statusNotCharging: "Không sạc",
      statusBatteryUnsupported: "trình duyệt này không hỗ trợ Battery API.",
      statusBatteryError: "không đọc được trạng thái pin.",
      notFound: (cmd) => `không tìm thấy lệnh: ${cmd} — gõ "help" để xem danh sách.`
    },
    message: {
      eyebrow: "// liên lạc trực tiếp",
      title: "Gửi mình một tin nhắn.",
      nameLabel: "tên của bạn",
      namePlaceholder: "vd: Minh",
      contentLabel: "nội dung",
      contentPlaceholder: "Góp ý, lời chào, ý tưởng hợp tác — gì cũng được.",
      note: "Tin nhắn bay thẳng vào hộp thư của mình — không cần đăng nhập.",
      send: "gửi tin nhắn",
      sending: "đang gửi...",
      sent: "đã gửi!",
      statusSent: "Đã nhận — tin nhắn đang trên đường tới hộp thư của mình. Cảm ơn bạn!",
      statusError: "Chưa gửi được lúc này. Đang mở ứng dụng email của bạn để gửi dự phòng...",
      statusMissing: "Bạn điền tên và nội dung trước đã nhé."
    },
    donate: {
      eyebrow: "ủng hộ",
      title: "Mời mình một ly cà phê, hoặc không cũng được — không áp lực gì cả.",
      kicker: "chuyển khoản ngân hàng",
      bankLabel: "ngân hàng",
      accountLabel: "số tài khoản",
      holderLabel: "chủ tài khoản",
      amountLabel: "Số tiền (VNĐ)",
      messageLabel: "Lời nhắn",
      messagePlaceholder: "cam on vinh nhe",
      note: "Mã QR sẽ tự động cập nhật khi bạn nhập — quét bằng bất kỳ app ngân hàng nào."
    },
    radio: {
      eyebrow: "đang phát",
      title: "Trạm radio nhỏ của mình.",
      kicker: "radio cá nhân",
      note: "Chọn một bài trong danh sách — không cần đăng nhập, không quảng cáo, chỉ có nhạc.",
      playlistLabel: "danh sách phát"
    },
    footer: { github: "github", facebook: "facebook", soundcloud: "soundcloud" },
    emailCopied: "đã sao chép!"
  }
};

let currentTheme = "dark";
let currentLang = "en";

// Khởi tạo các biến cấu trúc dùng cho Real-time dstats panel (100% số liệu thật)
let activeRPS = 0;
let totalRequests = 0;
let visitorsOnline = 0;
let trafficOnline = true;
let displayedTotal = 0;
let totalAnimFrame = null;
let rpsData = Array(60).fill(0);
let trafficCanvas, trafficCtx;

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------------------------------------------------------
       1. Language switch
  --------------------------------------------------------- */
  const langEnBtn = document.getElementById("langEnBtn");
  const langViBtn = document.getElementById("langViBtn");

  // Tách tiêu đề hero thành từng ký tự để chạy hiệu ứng chữ trồi lên lần lượt
  function animateHeroTitle() {
    if (prefersReducedMotion) return;
    const line = document.querySelector(".hero__title-line");
    if (!line) return;
    const text = line.textContent;
    line.textContent = "";
    let charIndex = 0;
    const words = text.split(" ");
    words.forEach((word, wi) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "hero-word";
      for (const ch of word) {
        const charSpan = document.createElement("span");
        charSpan.className = "hero-char";
        charSpan.textContent = ch;
        charSpan.style.animationDelay = `${(charIndex * 0.035).toFixed(3)}s`;
        wordSpan.appendChild(charSpan);
        charIndex++;
      }
      line.appendChild(wordSpan);
      if (wi < words.length - 1) line.appendChild(document.createTextNode(" "));
    });
  }

  function applyLanguage(lang) {
    const dict = translations[lang] || translations.en;
    currentLang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const value = key.split(".").reduce((acc, k) => (acc ? acc[k] : undefined), dict);
      if (value !== undefined) el.innerHTML = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      const value = key.split(".").reduce((acc, k) => (acc ? acc[k] : undefined), dict);
      if (value !== undefined) el.setAttribute("placeholder", value);
    });

    document.documentElement.lang = lang;
    if (langEnBtn) langEnBtn.classList.toggle("is-active", lang === "en");
    if (langViBtn) langViBtn.classList.toggle("is-active", lang === "vi");
    try { localStorage.setItem("vinh-lang", lang); } catch (e) {}

    animateHeroTitle();
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
    // Render lại biểu đồ khi đổi màu giao diện
    if (trafficCanvas) renderTrafficChart();
  }

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
       10. Live VietQR donate widget
  --------------------------------------------------------- */
  const donateAmountInput = document.getElementById("donateAmount");
  const donateMessageInput = document.getElementById("donateMessage");
  const vietqrImage = document.getElementById("vietqrImage");

  function buildVietQrUrl(amountRaw, messageRaw) {
    const digitsOnly = (amountRaw || "").toString().replace(/[^0-9]/g, "");
    const amount = digitsOnly ? parseInt(digitsOnly, 10) : 0;
    const message = (messageRaw || "").trim() || "Cam on nhe";

    return (
      "https://img.vietqr.io/image/acb-33689707-compact2.png" +
      `?amount=${amount}` +
      `&addInfo=${encodeURIComponent(message)}` +
      "&accountName=NGUYEN%20NGOC%20TRI%20VINH"
    );
  }

  if (donateAmountInput && donateMessageInput && vietqrImage) {
    let qrUpdateTimeout;

    function updateVietQr() {
      clearTimeout(qrUpdateTimeout);
      qrUpdateTimeout = setTimeout(() => {
        vietqrImage.src = buildVietQrUrl(donateAmountInput.value, donateMessageInput.value);
      }, 350);
    }

    donateAmountInput.addEventListener("input", updateVietQr);
    donateMessageInput.addEventListener("input", updateVietQr);
  }

  /* ---------------------------------------------------------
       11. Interactive mock terminal
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

  async function handleStatusCommand(dict) {
    dict.statusActivities.forEach((line) => addTerminalLine(line, "accent"));
    addTerminalLine(dict.statusChecking, "muted");

    if (navigator.getBattery) {
      try {
        const battery = await navigator.getBattery();
        const renderBatteryLine = () => {
          const percent = Math.round(battery.level * 100);
          const chargingLabel = battery.charging ? dict.statusCharging : dict.statusNotCharging;
          addTerminalLine(dict.statusBattery(percent, chargingLabel), "accent");
        };
        renderBatteryLine();
      } catch (err) {
        addTerminalLine(dict.statusBatteryError, "error");
      }
    } else {
      addTerminalLine(dict.statusBatteryUnsupported, "muted");
    }
  }

  function handleTimeCommand(dict) {
    try {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat(currentLang === "vi" ? "vi-VN" : "en-US", {
        timeZone: "Asia/Ho_Chi_Minh",
        weekday: "short",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      });
      addTerminalLine(dict.timeLabel(formatter.format(now)), "accent");
    } catch (err) {
      addTerminalLine(dict.notFound("time"), "error");
    }
  }

  async function runTerminalCommand(raw) {
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
      case "time":
        handleTimeCommand(dict);
        break;
      case "status":
        await handleStatusCommand(dict);
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
       13. Direct message form — gửi thẳng về hộp thư qua FormSubmit
  --------------------------------------------------------- */
  const MESSAGE_INBOX = "nguyenngoctrivinh72@gmail.com";
  const MESSAGE_ENDPOINT = `https://formsubmit.co/ajax/${MESSAGE_INBOX}`;

  const messageForm = document.getElementById("messageForm");
  const msgNameInput = document.getElementById("msgName");
  const msgContentInput = document.getElementById("msgContent");
  const msgSubmitBtn = document.getElementById("msgSubmitBtn");
  const msgSubmitLabel = msgSubmitBtn ? msgSubmitBtn.querySelector(".message-form__submit-label") : null;
  const msgStatus = document.getElementById("msgStatus");

  function setMessageStatus(text, variant) {
    if (!msgStatus) return;
    msgStatus.textContent = text || "";
    msgStatus.className = "message-form__status" + (variant ? ` message-form__status--${variant}` : "");
    msgStatus.classList.toggle("is-visible", Boolean(text));
  }

  if (messageForm && msgSubmitBtn) {
    let sendingMessage = false;

    messageForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (sendingMessage) return;

      const dict = (translations[currentLang] || translations.en).message;
      const name = (msgNameInput ? msgNameInput.value : "").trim();
      const content = (msgContentInput ? msgContentInput.value : "").trim();
      const honey = messageForm.querySelector('input[name="_honey"]');
      if (honey && honey.value) return;

      if (!name || !content) {
        setMessageStatus(dict.statusMissing, "error");
        const target = !name ? msgNameInput : msgContentInput;
        if (target) target.focus();
        return;
      }

      sendingMessage = true;
      msgSubmitBtn.classList.add("is-sending");
      msgSubmitBtn.disabled = true;
      if (msgSubmitLabel) msgSubmitLabel.textContent = dict.sending;
      setMessageStatus("", null);

      try {
        const res = await fetch(MESSAGE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name,
            message: content,
            _subject: `Tin nhan moi tu ${name} — vinhxdev`,
            _template: "table",
            _captcha: "false"
          })
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || String(data.success) === "false") throw new Error("send failed");

        msgSubmitBtn.classList.remove("is-sending");
        msgSubmitBtn.classList.add("is-sent");
        if (msgSubmitLabel) msgSubmitLabel.textContent = dict.sent;
        setMessageStatus(dict.statusSent, "ok");
        messageForm.reset();

        setTimeout(() => {
          msgSubmitBtn.classList.remove("is-sent");
          msgSubmitBtn.disabled = false;
          const d = (translations[currentLang] || translations.en).message;
          if (msgSubmitLabel) msgSubmitLabel.textContent = d.send;
          sendingMessage = false;
        }, 2600);
      } catch (err) {
        msgSubmitBtn.classList.remove("is-sending");
        msgSubmitBtn.disabled = false;
        if (msgSubmitLabel) msgSubmitLabel.textContent = dict.send;
        setMessageStatus(dict.statusError, "error");
        sendingMessage = false;

        // Dự phòng khi mạng/dịch vụ lỗi: mở app email với nội dung điền sẵn
        const mailto = `mailto:${MESSAGE_INBOX}?subject=${encodeURIComponent("Message from " + name)}&body=${encodeURIComponent(content + "\n\n— " + name)}`;
        window.open(mailto, "_blank");
      }
    });
  }

  /* ---------------------------------------------------------
       13b. Radio station — playlist nhiều bài, chuyển bài trực tiếp
  --------------------------------------------------------- */
  const RADIO_TRACKS = [
    { id: "3UsJUXvHb7qz4GiQtEc4a4", title: "keep steady", artist: "sosocamo" },
    { id: "0VjIjW4GlUZAMYd2vXMi3b", title: "Blinding Lights", artist: "The Weeknd" },
    { id: "2QjOHCTQ1Jl3zawyYOpxh6", title: "Sweater Weather", artist: "The Neighbourhood" },
    { id: "0u2P5u6lvoDfwTYjAADbn4", title: "lovely", artist: "Billie Eilish & Khalid" },
    { id: "21jGcNKet2qwijlDFuPiPb", title: "Circles", artist: "Post Malone" },
    { id: "7qiZfU4dY1lWllzX7mPBI3", title: "Shape of You", artist: "Ed Sheeran" },
    { id: "7qEHsqek33rTcFNT9PFqLf", title: "Someone You Loved", artist: "Lewis Capaldi" },
    { id: "4Dvkj6JhhA12EX05fT7y2e", title: "As It Was", artist: "Harry Styles" }
  ];

  const radioTrackList = document.getElementById("radioTrackList");
  const spotifyPlayer = document.getElementById("spotifyPlayer");
  const radioTrackTitle = document.getElementById("radioTrackTitle");

  function selectRadioTrack(index) {
    const track = RADIO_TRACKS[index];
    if (!track) return;

    if (spotifyPlayer) {
      spotifyPlayer.src = `https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`;
    }
    if (radioTrackTitle) {
      radioTrackTitle.textContent = `${track.title} — ${track.artist}`;
    }
    if (radioTrackList) {
      radioTrackList.querySelectorAll(".radio-playlist__item").forEach((btn, i) => {
        btn.classList.toggle("is-active", i === index);
      });
    }
  }

  if (radioTrackList) {
    RADIO_TRACKS.forEach((track, i) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "radio-playlist__item" + (i === 0 ? " is-active" : "");
      btn.setAttribute("aria-label", `Play ${track.title} by ${track.artist}`);

      const num = document.createElement("span");
      num.className = "radio-playlist__num";
      num.textContent = String(i + 1).padStart(2, "0");

      const meta = document.createElement("span");
      meta.className = "radio-playlist__meta";
      const title = document.createElement("span");
      title.className = "radio-playlist__title";
      title.textContent = track.title;
      const artist = document.createElement("span");
      artist.className = "radio-playlist__artist";
      artist.textContent = track.artist;
      meta.appendChild(title);
      meta.appendChild(artist);

      const eq = document.createElement("span");
      eq.className = "radio-playlist__eq";
      eq.setAttribute("aria-hidden", "true");
      for (let b = 0; b < 3; b++) eq.appendChild(document.createElement("i"));

      btn.appendChild(num);
      btn.appendChild(meta);
      btn.appendChild(eq);
      btn.addEventListener("click", () => selectRadioTrack(i));

      li.appendChild(btn);
      radioTrackList.appendChild(li);
    });
  }

  /* ---------------------------------------------------------
       14. 3D card tilt + glare (desktop, pointer chính xác)
  --------------------------------------------------------- */
  const finePointer = window.matchMedia && window.matchMedia("(pointer: fine)").matches;

  if (finePointer && !prefersReducedMotion) {
    document.querySelectorAll(".link-card, .project-card, .resource-card, .sound-card").forEach((card) => {
      card.classList.add("has-tilt");
      let tiltRaf = null;

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        if (tiltRaf) return;
        tiltRaf = requestAnimationFrame(() => {
          tiltRaf = null;
          const ry = ((px - 0.5) * 8).toFixed(2);
          const rx = ((0.5 - py) * 8).toFixed(2);
          card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
          card.style.setProperty("--glare-x", `${(px * 100).toFixed(1)}%`);
          card.style.setProperty("--glare-y", `${(py * 100).toFixed(1)}%`);
        });
      });

      card.addEventListener("mouseleave", () => {
        if (tiltRaf) { cancelAnimationFrame(tiltRaf); tiltRaf = null; }
        card.style.transform = "";
      });
    });
  }

  /* ---------------------------------------------------------
       15. Cursor spotlight — quầng sáng ấm bám theo con trỏ
  --------------------------------------------------------- */
  if (finePointer && !prefersReducedMotion) {
    const glow = document.createElement("div");
    glow.className = "cursor-glow";
    glow.setAttribute("aria-hidden", "true");
    document.body.appendChild(glow);

    let glowX = window.innerWidth / 2;
    let glowY = window.innerHeight / 2;
    let targetX = glowX;
    let targetY = glowY;
    let glowVisible = false;

    window.addEventListener("mousemove", (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!glowVisible) {
        glow.classList.add("is-on");
        glowVisible = true;
      }
    }, { passive: true });

    (function moveGlow() {
      glowX += (targetX - glowX) * 0.12;
      glowY += (targetY - glowY) * 0.12;
      glow.style.transform = `translate(${glowX - 260}px, ${glowY - 260}px)`;
      requestAnimationFrame(moveGlow);
    })();
  }

  /* ---------------------------------------------------------
       16. Real-time Traffic Logs (dstats canvas controller)
  --------------------------------------------------------- */
  trafficCanvas = document.getElementById("trafficCanvas");
  if (trafficCanvas) {
    trafficCtx = trafficCanvas.getContext("2d");
    resizeTrafficCanvas();
    window.addEventListener("resize", resizeTrafficCanvas);
  }

  // Ghi nhận lượt xem trang thật ngay khi tải xong
  postTrafficEvent("view");

  // Ghi nhận tương tác thật từ người xem (click + gõ phím, chặn flood khi giữ phím)
  window.addEventListener("click", () => {
    postTrafficEvent("click");
  });

  let lastKeyPost = 0;
  window.addEventListener("keydown", () => {
    const now = Date.now();
    if (now - lastKeyPost < 200) return;
    lastKeyPost = now;
    postTrafficEvent("key");
  });

  // Heartbeat 30s: chỉ báo hiện diện để đếm khách online, không tính là sự kiện
  setInterval(() => {
    if (document.visibilityState === "visible") postTrafficEvent("ping");
  }, 30000);

  // Vòng lặp đồng bộ số liệu thật mỗi giây
  setInterval(syncTrafficData, 1000);
  syncTrafficData();
});

/* ---------------------------------------------------------
   Helper Functions for Real-time Traffic Logs (số liệu thật)
--------------------------------------------------------- */
function resizeTrafficCanvas() {
  if (!trafficCanvas) return;
  trafficCanvas.width = trafficCanvas.parentElement.clientWidth;
  trafficCanvas.height = trafficCanvas.parentElement.clientHeight;
}

// Mã định danh khách bền theo trình duyệt — dùng đếm số người online thật
function getVisitorId() {
  try {
    let id = localStorage.getItem("vinh-visitor");
    if (!id) {
      id = "v-" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      localStorage.setItem("vinh-visitor", id);
    }
    return id;
  } catch (e) {
    return "v-anon";
  }
}

function postTrafficEvent(type) {
  try {
    fetch("/api/traffic", {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, visitor: getVisitorId() })
    }).catch(() => {});
  } catch (e) {}
}

async function syncTrafficData() {
  try {
    const res = await fetch("/api/traffic");
    const data = await res.json();
    if (data.success) {
      activeRPS = data.currentRPS || 0;
      totalRequests = data.totalRequests || 0;
      visitorsOnline = data.visitorsOnline || 0;
      trafficOnline = true;
    } else {
      trafficOnline = false;
    }
  } catch (err) {
    // Không bịa số liệu khi rớt kết nối — báo OFFLINE và để đồ thị về 0 thật
    trafficOnline = false;
    activeRPS = 0;
  }

  rpsData.push(activeRPS);
  rpsData.shift();

  updateTrafficMeta();
  renderTrafficChart();
}

function updateTrafficMeta() {
  const rpsEl = document.getElementById("liveRpsCounter");
  const onlineEl = document.getElementById("visitorsOnlineCounter");
  const statusEl = document.getElementById("serverStatus");

  if (rpsEl) rpsEl.textContent = activeRPS < 10 ? activeRPS.toFixed(1) : Math.round(activeRPS).toString();
  if (onlineEl) onlineEl.textContent = visitorsOnline.toLocaleString();

  if (statusEl) {
    statusEl.textContent = trafficOnline ? "OPERATIONAL" : "OFFLINE";
    statusEl.classList.toggle("dstats-widget__value--green", trafficOnline);
    statusEl.classList.toggle("dstats-widget__value--red", !trafficOnline);
  }

  animateTotalCounter();
}

// Đếm số tổng mượt mà thay vì nhảy cứng
function animateTotalCounter() {
  const el = document.getElementById("totalReqsCounter");
  if (!el) return;
  if (totalAnimFrame) cancelAnimationFrame(totalAnimFrame);

  const step = () => {
    const diff = totalRequests - displayedTotal;
    if (Math.abs(diff) < 1) {
      displayedTotal = totalRequests;
    } else {
      displayedTotal += diff * 0.18;
      totalAnimFrame = requestAnimationFrame(step);
    }
    el.textContent = Math.round(displayedTotal).toLocaleString();
  };
  step();
}

function renderTrafficChart() {
  if (!trafficCtx || !trafficCanvas) return;
  const w = trafficCanvas.width;
  const h = trafficCanvas.height;
  trafficCtx.clearRect(0, 0, w, h);
  if (w <= 0 || h <= 0) return;

  const isLight = document.documentElement.getAttribute("data-theme") === "light";

  // Lưới nền monitor đồng bộ theo theme
  trafficCtx.strokeStyle = isLight ? "rgba(32, 48, 42, 0.05)" : "rgba(241, 236, 225, 0.04)";
  trafficCtx.lineWidth = 0.5;
  for (let i = 1; i < 4; i++) {
    trafficCtx.beginPath();
    trafficCtx.moveTo(0, (h / 4) * i);
    trafficCtx.lineTo(w, (h / 4) * i);
    trafficCtx.stroke();
  }

  // Trục Y tự co giãn theo đỉnh thật của dữ liệu — số nhỏ vẫn thấy rõ sóng, không bịa tỷ lệ
  const peak = Math.max(1, ...rpsData);
  const scale = peak * 1.25;

  const step = w / (rpsData.length - 1);
  const points = rpsData.map((v, i) => ({
    x: i * step,
    y: Math.min(h - 4, Math.max(4, h - 4 - (v / scale) * (h - 12)))
  }));

  const amberColor = isLight ? "#B9791F" : "#E8A33D";

  const drawCurve = () => {
    trafficCtx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length - 1; i++) {
      const mx = (points[i].x + points[i + 1].x) / 2;
      const my = (points[i].y + points[i + 1].y) / 2;
      trafficCtx.quadraticCurveTo(points[i].x, points[i].y, mx, my);
    }
    trafficCtx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
  };

  // Vùng nền dưới đường sóng
  const fill = trafficCtx.createLinearGradient(0, 0, 0, h);
  fill.addColorStop(0, isLight ? "rgba(185, 121, 31, 0.16)" : "rgba(232, 163, 61, 0.2)");
  fill.addColorStop(1, "rgba(232, 163, 61, 0)");
  trafficCtx.beginPath();
  trafficCtx.moveTo(points[0].x, h);
  trafficCtx.lineTo(points[0].x, points[0].y);
  drawCurve();
  trafficCtx.lineTo(points[points.length - 1].x, h);
  trafficCtx.closePath();
  trafficCtx.fillStyle = fill;
  trafficCtx.fill();

  // Đường sóng chính
  trafficCtx.beginPath();
  trafficCtx.lineWidth = 2;
  trafficCtx.strokeStyle = amberColor;
  trafficCtx.shadowBlur = isLight ? 0 : 8;
  trafficCtx.shadowColor = amberColor;
  drawCurve();
  trafficCtx.stroke();
  trafficCtx.shadowBlur = 0;

  // Chấm nhịp sống ở điểm dữ liệu mới nhất
  const last = points[points.length - 1];
  trafficCtx.beginPath();
  trafficCtx.arc(Math.min(last.x, w - 4), last.y, 3, 0, Math.PI * 2);
  trafficCtx.fillStyle = amberColor;
  trafficCtx.fill();
}
