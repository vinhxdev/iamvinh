(() => {
  "use strict";

  const $ = (s, p = document) => p.querySelector(s);
  const $$ = (s, p = document) => [...p.querySelectorAll(s)];

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touchDevice = matchMedia("(pointer: coarse)").matches;

  const state = {
    effect: null,
    canvas: null,
    ctx: null,
    raf: 0,
    timer: 0,
    cursor: "default",
    mouseX: innerWidth / 2,
    mouseY: innerHeight / 2,
    coreX: innerWidth / 2,
    coreY: innerHeight / 2,
    ringX: innerWidth / 2,
    ringY: innerHeight / 2,
    glowX: innerWidth / 2,
    glowY: innerHeight / 2,
    lastParticle: 0
  };

  function protectClient() {
    document.addEventListener("dragstart", (e) => e.preventDefault(), true);

    document.addEventListener("contextmenu", (e) => {
      if (!e.target.closest("input, textarea")) e.preventDefault();
    }, true);

    document.addEventListener("keydown", (e) => {
      const k = e.key.toLowerCase();

      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(k)) ||
        (e.ctrlKey && ["u", "s"].includes(k))
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
  }

  async function fetchRealTimeViews() {
    const el = $("#visit-count");
    if (!el) return;

    try {
      const res = await fetch(`/api/views?t=${Date.now()}`, {
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
    const pupil = eye?.querySelector(".pupil");
    if (!eye || !pupil || touchDevice) return;

    document.addEventListener("mousemove", (e) => {
      const r = eye.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      const a = Math.atan2(e.clientY - y, e.clientX - x);
      const d = Math.min(5, Math.hypot(e.clientX - x, e.clientY - y) / 15);

      pupil.style.transform = `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d}px))`;
    }, { passive: true });
  }

  function initTyping() {
    const el = $("#about-text");
    if (!el) return;

    const text =
      "Hello! I am a software developer with a strong passion for automation and system optimization. Always ready to solve real-world logic problems.";

    let i = 0;
    let del = false;

    function loop() {
      el.textContent = text.slice(0, i);

      if (!del && i < text.length) {
        i++;
        setTimeout(loop, 25);
        return;
      }

      if (!del) {
        del = true;
        setTimeout(loop, 4200);
        return;
      }

      if (del && i > 0) {
        i--;
        setTimeout(loop, 10);
        return;
      }

      del = false;
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

  function getDonateData() {
    const amountInput = $("#donateAmount");
    const infoInput = $("#donateInfo");

    const amount = (amountInput?.value || "0").replace(/\D/g, "").slice(0, 9) || "0";
    const info = (infoInput?.value || "Donate Vinhx")
      .replace(/[^\p{L}\p{N}\s._-]/gu, "")
      .trim()
      .slice(0, 80) || "Donate Vinhx";

    if (amountInput) amountInput.value = amount === "0" ? "" : amount;
    if (infoInput) infoInput.value = info;

    return { amount, info };
  }

  function updateQR() {
    const qr = $("#qrImage");
    const content = $("#transferContent");
    if (!qr) return;

    const { amount, info } = getDonateData();

    if (content) content.textContent = info;

    qr.src = `/api/qr?amount=${encodeURIComponent(amount)}&info=${encodeURIComponent(info)}&t=${Date.now()}`;
  }

  async function copyTransferContent() {
    const { info } = getDonateData();

    try {
      await navigator.clipboard.writeText(info);
      toast("Copied");
    } catch {
      toast("Copy failed");
    }
  }

  function downloadQR() {
    const { amount, info } = getDonateData();
    const a = document.createElement("a");

    a.href = `/api/qr?amount=${encodeURIComponent(amount)}&info=${encodeURIComponent(info)}&download=1`;
    a.download = `vinhprofile-qr-${amount}.png`;
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
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

    state.canvas = canvas;
    state.ctx = ctx;

    return canvas;
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
    btn?.classList.add("active");

    state.effect = type;

    if (type === "stars") startStars();
    if (type === "matrix") startMatrix();
    if (type === "neon") startNeon();
    if (type === "sakura") startFalling("sakura");
    if (type === "snow") startFalling("snow");
  }

  function startStars() {
    createCanvas();

    const stars = Array.from({ length: innerWidth < 768 ? 65 : 140 }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      z: Math.random() * 1 + 0.3,
      r: Math.random() * 1.9 + 0.4,
      vx: Math.random() * 0.18 - 0.09,
      vy: Math.random() * 0.18 + 0.05
    }));

    function draw() {
      const ctx = state.ctx;
      if (!ctx) return;

      ctx.clearRect(0, 0, innerWidth, innerHeight);

      for (const s of stars) {
        s.x += s.vx * s.z;
        s.y += s.vy * s.z;

        if (s.y > innerHeight + 10) s.y = -10;
        if (s.x < -10) s.x = innerWidth + 10;
        if (s.x > innerWidth + 10) s.x = -10;

        const glow = 0.35 + Math.sin(Date.now() / 500 + s.x) * 0.25;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${glow})`;
        ctx.arc(s.x, s.y, s.r * s.z, 0, Math.PI * 2);
        ctx.fill();
      }

      state.raf = requestAnimationFrame(draw);
    }

    draw();
  }

  function startMatrix() {
    createCanvas();

    const ctx = state.ctx;
    const chars = "01アイウエオカキクケコサシスセソ";
    const font = innerWidth < 768 ? 13 : 15;
    const cols = Math.floor(innerWidth / font);
    const drops = Array(cols).fill(0).map(() => Math.random() * -innerHeight);

    function draw() {
      if (!ctx) return;

      ctx.fillStyle = "rgba(9,9,11,0.14)";
      ctx.fillRect(0, 0, innerWidth, innerHeight);
      ctx.font = `${font}px JetBrains Mono, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const x = i * font;
        const y = drops[i] * font;
        const char = chars[Math.floor(Math.random() * chars.length)];

        ctx.fillStyle = "rgba(34,197,94,0.85)";
        ctx.fillText(char, x, y);

        drops[i] += 0.75;

        if (y > innerHeight && Math.random() > 0.975) {
          drops[i] = Math.random() * -20;
        }
      }

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
    const max = innerWidth < 768 ? 35 : 75;
    const delay = type === "snow" ? 95 : 150;

    state.timer = setInterval(() => {
      if ($$(".particle-effect").length > max) return;

      const p = document.createElement("div");
      p.className = `particle-effect particle-${type}`;

      const size = type === "snow" ? Math.random() * 4 + 2 : Math.random() * 9 + 7;
      const startX = Math.random() * innerWidth;
      const drift = Math.random() * 180 - 90;
      const duration = type === "snow" ? Math.random() * 3000 + 4200 : Math.random() * 3600 + 4200;

      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${startX}px`;
      p.style.top = `-20px`;

      document.body.appendChild(p);

      p.animate(
        [
          { transform: "translate3d(0,0,0) rotate(0deg)", opacity: 0 },
          { transform: `translate3d(${drift * 0.35}px, ${innerHeight * 0.45}px, 0) rotate(220deg)`, opacity: 0.9 },
          { transform: `translate3d(${drift}px, ${innerHeight + 80}px, 0) rotate(720deg)`, opacity: 0 }
        ],
        {
          duration,
          easing: "linear"
        }
      ).onfinish = () => p.remove();
    }, delay);
  }

  function initCursor() {
    if (touchDevice || reduceMotion) return;

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

      if (core) core.style.transform = `translate(${state.coreX}px, ${state.coreY}px) translate(-50%, -50%)`;
      if (ring) ring.style.transform = `translate(${state.ringX}px, ${state.ringY}px) translate(-50%, -50%)`;
      if (glow) glow.style.transform = `translate(${state.glowX}px, ${state.glowY}px) translate(-50%, -50%)`;

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
    btn?.classList.add("active");

    clearCursorMode();

    if (type === "default" || touchDevice || reduceMotion) return;

    state.cursor = type;
    document.body.classList.add("cursor-on");

    if (type === "ring") document.body.classList.add("cursor-ring-mode");
    if (type === "cyber") document.body.classList.add("cursor-cyber-mode");
    if (type === "fire") document.body.classList.add("cursor-fire-mode");
    if (type === "trail") document.body.classList.add("cursor-trail-mode");

    spawnCursorParticle(state.mouseX, state.mouseY, true);
  }

  function spawnCursorParticle(x, y, force = false) {
    if (touchDevice || reduceMotion || state.cursor === "default" || state.cursor === "ring") return;

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
    if (touchDevice || reduceMotion || state.cursor === "default") return;

    const ripple = document.createElement("div");
    ripple.className = "cursor-ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 480);
  }

  function bindEvents() {
    document.addEventListener("mousemove", (e) => {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;

      spawnCursorParticle(e.clientX, e.clientY);
    }, { passive: true });

    document.addEventListener("mousedown", (e) => {
      spawnClickRipple(e.clientX, e.clientY);
      $(".cursor-ring")?.style.setProperty("width", "24px");
      $(".cursor-ring")?.style.setProperty("height", "24px");
    });

    document.addEventListener("mouseup", () => {
      $(".cursor-ring")?.style.setProperty("width", "");
      $(".cursor-ring")?.style.setProperty("height", "");
    });

    document.addEventListener("click", (e) => {
      const settings = $(".settings-container");

      if (settings && !settings.contains(e.target)) {
        $("#settingsMenu")?.classList.remove("show");
      }

      if (e.target === $("#donateModal")) closeDonate();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDonate();
        $("#settingsMenu")?.classList.remove("show");
      }
    });

    addEventListener("resize", () => {
      if (!state.canvas) return;

      state.canvas.width = innerWidth * devicePixelRatio;
      state.canvas.height = innerHeight * devicePixelRatio;
      state.canvas.style.width = `${innerWidth}px`;
      state.canvas.style.height = `${innerHeight}px`;
      state.ctx?.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
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
