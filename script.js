(() => {
  "use strict";

  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => Array.from(p.querySelectorAll(s));

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const canUseCursor = finePointer && !reduceMotion;

  const state = {
    effect: null,
    canvas: null,
    ctx: null,
    raf: 0,
    timer: 0,
    cursor: "default",
    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2,
    coreX: window.innerWidth / 2,
    coreY: window.innerHeight / 2,
    ringX: window.innerWidth / 2,
    ringY: window.innerHeight / 2,
    glowX: window.innerWidth / 2,
    glowY: window.innerHeight / 2,
    lastParticle: 0
  };

  function protectClient() {
    document.addEventListener("dragstart", (e) => e.preventDefault(), true);

    document.addEventListener(
      "contextmenu",
      (e) => {
        if (!e.target.closest("input, textarea")) e.preventDefault();
      },
      true
    );

    document.addEventListener(
      "keydown",
      (e) => {
        const key = String(e.key || "").toLowerCase();

        const blocked =
          e.key === "F12" ||
          (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) ||
          (e.ctrlKey && ["u", "s"].includes(key));

        if (blocked) {
          e.preventDefault();
          e.stopPropagation();
        }
      },
      true
    );
  }

  async function fetchRealTimeViews() {
    const el = $("#visit-count");
    if (!el) return;

    try {
      const res = await fetch(`/api/views?t=${Date.now()}`, {
        method: "GET",
        cache: "no-store",
        credentials: "same-origin"
      });

      const data = await res.json();
      el.textContent = Number(data.views || 1).toLocaleString("en-US");

      const counter = el.closest(".view-counter");
      if (counter && data.online) counter.title = `${data.online} online now`;
    } catch {
      el.textContent = "1";
    }
  }

  function initEye() {
    const eye = $("#eye-parent");
    const pupil = eye ? eye.querySelector(".pupil") : null;

    if (!eye || !pupil || !canUseCursor) return;

    document.addEventListener(
      "mousemove",
      (e) => {
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
        const distance = Math.min(5, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 15);

        pupil.style.transform = `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${
          Math.sin(angle) * distance
        }px))`;
      },
      { passive: true }
    );
  }

  function initTyping() {
    const el = $("#about-text");
    if (!el) return;

    const text =
      "Hello! I am a software developer with a strong passion for automation and system optimization. Always ready to solve real-world logic problems.";

    let index = 0;
    let deleting = false;

    function loop() {
      el.textContent = text.slice(0, index);

      if (!deleting && index < text.length) {
        index++;
        setTimeout(loop, 25);
        return;
      }

      if (!deleting) {
        deleting = true;
        setTimeout(loop, 4200);
        return;
      }

      if (deleting && index > 0) {
        index--;
        setTimeout(loop, 10);
        return;
      }

      deleting = false;
      setTimeout(loop, 700);
    }

    loop();
  }

  function toggleSettings() {
    $("#settingsMenu")?.classList.toggle("show");
  }

  function openDonate() {
    const modal = $("#donateModal");
    const content = $("#modalContent");

    if (!modal || !content) return;

    updateQR();

    modal.style.display = "flex";

    requestAnimationFrame(() => {
      modal.style.opacity = "1";
      content.style.transform = "scale(1)";
    });
  }

  function closeDonate() {
    const modal = $("#donateModal");
    const content = $("#modalContent");

    if (!modal || !content) return;

    modal.style.opacity = "0";
    content.style.transform = "scale(.95)";

    setTimeout(() => {
      modal.style.display = "none";
    }, 180);
  }

  function cleanText(value) {
    return String(value || "")
      .replace(/[^\w\sÀ-ỹ._-]/g, "")
      .trim()
      .slice(0, 80);
  }

  function getDonateData() {
    const amountInput = $("#donateAmount");
    const infoInput = $("#donateInfo");

    const amount =
      String(amountInput ? amountInput.value : "0")
        .replace(/\D/g, "")
        .slice(0, 9) || "0";

    const info = cleanText(infoInput ? infoInput.value : "Donate Vinhx") || "Donate Vinhx";

    if (amountInput) amountInput.value = amount === "0" ? "" : amount;
    if (infoInput) infoInput.value = info;

    return { amount, info };
  }

  function updateQR() {
    const qr = $("#qrImage");
    const content = $("#transferContent");

    if (!qr) return;

    const data = getDonateData();

    if (content) content.textContent = data.info;

    qr.src = `/api/qr?amount=${encodeURIComponent(data.amount)}&info=${encodeURIComponent(data.info)}&t=${Date.now()}`;
  }

  async function copyTransferContent() {
    const data = getDonateData();

    try {
      await navigator.clipboard.writeText(data.info);
      toast("Copied");
    } catch {
      toast("Copy failed");
    }
  }

  function downloadQR() {
    const data = getDonateData();
    const a = document.createElement("a");

    a.href = `/api/qr?amount=${encodeURIComponent(data.amount)}&info=${encodeURIComponent(data.info)}&download=1`;
    a.download = `vinhprofile-qr-${data.amount}.png`;

    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function toast(text) {
    let el = $(".toast");

    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      el.style.cssText =
        "position:fixed;left:50%;bottom:36px;z-index:2147483647;transform:translateX(-50%);background:#18181b;border:1px solid #27272a;color:#fff;padding:10px 14px;border-radius:999px;font:600 12px Inter,sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.45);opacity:0;transition:.2s";
      document.body.appendChild(el);
    }

    el.textContent = text;
    el.style.opacity = "1";

    clearTimeout(el._timer);
    el._timer = setTimeout(() => {
      el.style.opacity = "0";
    }, 1200);
  }

  function triggerJumpscare() {
    const box = $("#jumpscare-container");
    if (!box) return;

    box.style.display = "block";

    setTimeout(() => {
      box.style.display = "none";
    }, 1200);
  }

  function resetEffect() {
    cancelAnimationFrame(state.raf);
    clearInterval(state.timer);

    state.raf = 0;
    state.timer = 0;
    state.effect = null;

    $(".effect-canvas")?.remove();
    $$(".particle-effect, .neon-orb").forEach((el) => el.remove());

    state.canvas = null;
    state.ctx = null;
  }

  function createCanvas() {
    $(".effect-canvas")?.remove();

    const canvas = document.createElement("canvas");
    canvas.className = "effect-canvas";

    resizeCanvas(canvas);
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d", { alpha: true });
    ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);

    state.canvas = canvas;
    state.ctx = ctx;

    return canvas;
  }

  function resizeCanvas(canvas = state.canvas) {
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const ctx = canvas.getContext("2d", { alpha: true });
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function toggleEffect(type, btn) {
    if (reduceMotion) return;

    if (type === "none" || state.effect === type) {
      resetEffect();
      $$("#effect-group .ctrl-btn").forEach((b) => b.classList.remove("active"));
      return;
    }

    resetEffect();

    $$("#effect-group .ctrl-btn").forEach((b) => b.classList.remove("active"));
    if (btn) btn.classList.add("active");

    state.effect = type;

    if (type === "stars") startStars();
    if (type === "matrix") startMatrix();
    if (type === "neon") startNeon();
    if (type === "sakura") startFalling("sakura");
    if (type === "snow") startFalling("snow");
  }

  function startStars() {
    createCanvas();

    const count = window.innerWidth < 768 ? 55 : 130;

    const stars = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random() * 1 + 0.3,
      r: Math.random() * 1.8 + 0.4,
      vx: Math.random() * 0.18 - 0.09,
      vy: Math.random() * 0.18 + 0.05
    }));

    function draw() {
      const ctx = state.ctx;
      if (!ctx) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (const star of stars) {
        star.x += star.vx * star.z;
        star.y += star.vy * star.z;

        if (star.y > window.innerHeight + 10) star.y = -10;
        if (star.x < -10) star.x = window.innerWidth + 10;
        if (star.x > window.innerWidth + 10) star.x = -10;

        const glow = 0.35 + Math.sin(Date.now() / 500 + star.x) * 0.25;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${glow})`;
        ctx.arc(star.x, star.y, star.r * star.z, 0, Math.PI * 2);
        ctx.fill();
      }

      state.raf = requestAnimationFrame(draw);
    }

    draw();
  }

  function startMatrix() {
    createCanvas();

    const ctx = state.ctx;
    if (!ctx) return;

    const chars = "01アカサタナハマヤラワ";
    const fontSize = window.innerWidth < 768 ? 14 : 16;
    const columns = Math.ceil(window.innerWidth / fontSize);
    const drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -40));

    function draw() {
      const ctx = state.ctx;
      if (!ctx) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      ctx.textAlign = "center";

      for (let i = 0; i < columns; i++) {
        const x = i * fontSize + fontSize / 2;

        for (let j = 0; j < 18; j++) {
          const y = (drops[i] - j) * fontSize;
          if (y < -fontSize || y > window.innerHeight + fontSize) continue;

          const alpha = Math.max(0, 1 - j / 18);
          const char = chars[Math.floor(Math.random() * chars.length)];

          ctx.fillStyle = j === 0 ? "rgba(187,247,208,0.95)" : `rgba(34,197,94,${alpha * 0.55})`;
          ctx.shadowColor = "rgba(34,197,94,0.75)";
          ctx.shadowBlur = j === 0 ? 12 : 4;
          ctx.fillText(char, x, y);
        }

        drops[i] += 0.42;

        if (drops[i] * fontSize > window.innerHeight + 320 && Math.random() > 0.985) {
          drops[i] = Math.floor(Math.random() * -50);
        }
      }

      ctx.shadowBlur = 0;
      state.raf = requestAnimationFrame(draw);
    }

    draw();
  }

  function startNeon() {
    for (let i = 0; i < 3; i++) {
      const orb = document.createElement("div");
      orb.className = "neon-orb";
      orb.style.left = `${Math.random() * 80}vw`;
      orb.style.top = `${Math.random() * 80}vh`;
      document.body.appendChild(orb);
    }
  }

  function startFalling(type) {
    const max = window.innerWidth < 768 ? 28 : 70;
    const delay = type === "snow" ? 110 : 160;

    state.timer = setInterval(() => {
      if ($$(".particle-effect").length > max) return;

      const p = document.createElement("div");
      p.className = `particle-effect particle-${type}`;

      const size = type === "snow" ? Math.random() * 4 + 2 : Math.random() * 9 + 7;
      const startX = Math.random() * window.innerWidth;
      const drift = Math.random() * 180 - 90;
      const duration = type === "snow" ? Math.random() * 3000 + 4200 : Math.random() * 3600 + 4200;

      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${startX}px`;
      p.style.top = "-20px";

      document.body.appendChild(p);

      p.animate(
        [
          { transform: "translate3d(0,0,0) rotate(0deg)", opacity: 0 },
          {
            transform: `translate3d(${drift * 0.35}px, ${window.innerHeight * 0.45}px, 0) rotate(220deg)`,
            opacity: 0.9
          },
          {
            transform: `translate3d(${drift}px, ${window.innerHeight + 80}px, 0) rotate(720deg)`,
            opacity: 0
          }
        ],
        {
          duration,
          easing: "linear"
        }
      ).onfinish = () => p.remove();
    }, delay);
  }

  function initCursor() {
    if (!canUseCursor) return;

    if (!$(".cursor-core")) {
      const glow = document.createElement("div");
      const ring = document.createElement("div");
      const core = document.createElement("div");

      glow.className = "cursor-glow";
      ring.className = "cursor-ring";
      core.className = "cursor-core";

      document.body.append(glow, ring, core);
    }

    const core = $(".cursor-core");
    const ring = $(".cursor-ring");
    const glow = $(".cursor-glow");

    function draw() {
      state.coreX += (state.mouseX - state.coreX) * 0.9;
      state.coreY += (state.mouseY - state.coreY) * 0.9;
      state.ringX += (state.mouseX - state.ringX) * 0.18;
      state.ringY += (state.mouseY - state.ringY) * 0.18;
      state.glowX += (state.mouseX - state.glowX) * 0.08;
      state.glowY += (state.mouseY - state.glowY) * 0.08;

      if (core) core.style.transform = `translate3d(${state.coreX}px, ${state.coreY}px, 0) translate(-50%, -50%)`;
      if (ring) ring.style.transform = `translate3d(${state.ringX}px, ${state.ringY}px, 0) translate(-50%, -50%)`;
      if (glow) glow.style.transform = `translate3d(${state.glowX}px, ${state.glowY}px, 0) translate(-50%, -50%)`;

      requestAnimationFrame(draw);
    }

    draw();
  }

  function clearCursorMode() {
    document.body.classList.remove(
      "cursor-on",
      "cursor-ring-mode",
      "cursor-cyber-mode",
      "cursor-fire-mode",
      "cursor-trail-mode"
    );

    state.cursor = "default";
    $$(".cursor-particle, .cursor-ripple").forEach((el) => el.remove());
  }

  function changeCursor(type, btn) {
    $$("#cursor-group .ctrl-btn").forEach((b) => b.classList.remove("active"));
    if (btn) btn.classList.add("active");

    clearCursorMode();

    if (type === "default" || !canUseCursor) return;

    state.cursor = type;
    document.body.classList.add("cursor-on");

    if (type === "ring") document.body.classList.add("cursor-ring-mode");
    if (type === "cyber") document.body.classList.add("cursor-cyber-mode");
    if (type === "fire") document.body.classList.add("cursor-fire-mode");
    if (type === "trail") document.body.classList.add("cursor-trail-mode");

    spawnCursorParticle(state.mouseX, state.mouseY, true);
  }

  function spawnCursorParticle(x, y, force = false) {
    if (!canUseCursor || state.cursor === "default" || state.cursor === "ring") return;

    const now = performance.now();

    if (!force && now - state.lastParticle < 18) return;

    state.lastParticle = now;

    const particle = document.createElement("div");

    if (state.cursor === "cyber") particle.className = "cursor-particle cyber";
    if (state.cursor === "fire") particle.className = "cursor-particle fire";
    if (state.cursor === "trail") particle.className = "cursor-particle trail";

    particle.style.left = `${x + Math.random() * 10 - 5}px`;
    particle.style.top = `${y + Math.random() * 10 - 5}px`;

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 760);
  }

  function spawnClickRipple(x, y) {
    if (!canUseCursor || state.cursor === "default") return;

    const ripple = document.createElement("div");
    ripple.className = "cursor-ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 480);
  }

  function bindEvents() {
    document.addEventListener(
      "mousemove",
      (e) => {
        state.mouseX = e.clientX;
        state.mouseY = e.clientY;

        spawnCursorParticle(e.clientX, e.clientY);
      },
      { passive: true }
    );

    document.addEventListener("mousedown", (e) => {
      spawnClickRipple(e.clientX, e.clientY);

      const ring = $(".cursor-ring");
      if (ring) {
        ring.style.width = "24px";
        ring.style.height = "24px";
      }
    });

    document.addEventListener("mouseup", () => {
      const ring = $(".cursor-ring");
      if (ring) {
        ring.style.width = "";
        ring.style.height = "";
      }
    });

    document.addEventListener("click", (e) => {
      const settings = $(".settings-container");

      if (settings && !settings.contains(e.target)) {
        $("#settingsMenu")?.classList.remove("show");
      }

      const modal = $("#donateModal");
      if (modal && e.target === modal) closeDonate();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDonate();
        $("#settingsMenu")?.classList.remove("show");
      }
    });

    window.addEventListener("resize", () => {
      resizeCanvas();
    });
  }

  protectClient();
  bindEvents();
  initCursor();
  initEye();
  initTyping();

  fetchRealTimeViews();
  setInterval(fetchRealTimeViews, 15000);

  Object.assign(window, {
    toggleSettings,
    openDonate,
    closeDonate,
    updateQR,
    copyTransferContent,
    downloadQR,
    triggerJumpscare,
    changeCursor,
    toggleEffect
  });
})();
