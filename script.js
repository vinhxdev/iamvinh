(() => {
  "use strict";

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  const state = {
    effect: null,
    effectTimer: null,
    cursorTrail: false,
    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2,
    lastTrail: 0
  };

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.matchMedia("(max-width: 768px), (pointer: coarse)").matches;

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
        const key = e.key.toLowerCase();

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

      if (counter && data.online) {
        counter.title = `${data.online} online now`;
      }
    } catch {
      el.textContent = "1";
    }
  }

  function initEye() {
    const eyeParent = $("#eye-parent");
    const pupil = eyeParent?.querySelector(".pupil");

    if (!eyeParent || !pupil || isMobile) return;

    document.addEventListener(
      "mousemove",
      (e) => {
        const rect = eyeParent.getBoundingClientRect();
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

    function type() {
      el.textContent = text.slice(0, index);

      if (!deleting && index < text.length) {
        index++;
        setTimeout(type, 25);
        return;
      }

      if (!deleting && index >= text.length) {
        deleting = true;
        setTimeout(type, 4500);
        return;
      }

      if (deleting && index > 0) {
        index--;
        setTimeout(type, 10);
        return;
      }

      deleting = false;
      setTimeout(type, 800);
    }

    type();
  }

  function toggleSettings() {
    $("#settingsMenu")?.classList.toggle("show");
  }

  function openDonate() {
    const modal = $("#donateModal");
    const content = $("#modalContent");

    if (!modal || !content) return;

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

  function updateQR() {
    const input = $("#donateAmount");
    const qr = $("#qrImage");

    if (!input || !qr) return;

    const amount = input.value.replace(/\D/g, "").slice(0, 9);
    input.value = amount;

    qr.src = `https://img.vietqr.io/image/ACB-33689707-compact2.png?amount=${
      amount || 0
    }&accountName=NGUYEN%20NGOC%20TRI%20VINH&addInfo=Donate%20Vinhx`;
  }

  function triggerJumpscare() {
    const box = $("#jumpscare-container");

    if (!box) return;

    box.style.display = "block";

    setTimeout(() => {
      box.style.display = "none";
    }, 1200);
  }

  function changeCursor(type, btn) {
    $$("#cursor-group .ctrl-btn").forEach((button) => button.classList.remove("active"));
    btn?.classList.add("active");

    state.cursorTrail = type === "trail";

    $$(".cursor-trail-dot").forEach((dot) => dot.remove());

    const cursors = {
      default: "auto",
      sniper:
        'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27%3E%3Ccircle cx=%2712%27 cy=%2712%27 r=%2710%27 fill=%27none%27 stroke=%27%23ef4444%27 stroke-width=%272%27/%3E%3Cpath d=%27M12 2v4m0 12v4m-10-10h4m12 0h4%27 stroke=%27%23ef4444%27 stroke-width=%272%27/%3E%3C/svg%3E") 12 12, crosshair',
      flame:
        'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27%3E%3Cpath d=%27M12 2C12 2 5 10 5 16C5 19.866 8.134 23 12 23C15.866 23 19 19.866 19 16C19 10 12 2 12 2Z%27 fill=%27%23f97316%27/%3E%3C/svg%3E") 12 12, pointer',
      trail: "crosshair"
    };

    document.documentElement.style.setProperty("--site-cursor", cursors[type] || "auto");
    document.body.classList.toggle("custom-cursor", type !== "default");
  }

  function createTrail(x, y) {
    if (!state.cursorTrail || prefersReducedMotion) return;

    const now = performance.now();

    if (now - state.lastTrail < (isMobile ? 90 : 28)) return;

    state.lastTrail = now;

    const dot = document.createElement("div");
    dot.className = "cursor-trail-dot";
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;

    document.body.appendChild(dot);

    setTimeout(() => {
      dot.remove();
    }, 520);
  }

  function clearEffect() {
    clearInterval(state.effectTimer);

    state.effect = null;
    state.effectTimer = null;

    $$(".particle-effect").forEach((el) => el.remove());
  }

  function toggleEffect(type, btn) {
    if (prefersReducedMotion) return;

    if (state.effect === type) {
      clearEffect();
      btn?.classList.remove("active");
      return;
    }

    clearEffect();

    $$("#effect-group .ctrl-btn").forEach((button) => button.classList.remove("active"));
    btn?.classList.add("active");

    state.effect = type;

    const speed = {
      snow: isMobile ? 220 : 120,
      spark: isMobile ? 90 : 45,
      sakura: isMobile ? 260 : 160
    };

    state.effectTimer = setInterval(() => createParticle(type), speed[type] || 120);
  }

  function createParticle(type) {
    const el = document.createElement("div");

    el.className = `particle-effect particle-${type}`;

    let startX = Math.random() * window.innerWidth;
    let startY = -20;
    let moveX = Math.random() * 80 - 40;
    let moveY = window.innerHeight + 40;
    let size = 4;
    let duration = 3000;

    if (type === "snow") {
      size = Math.random() * 4 + 2;
      duration = Math.random() * 2500 + 2800;
    }

    if (type === "sakura") {
      size = Math.random() * 8 + 6;
      moveX = Math.random() * 160 - 80;
      duration = Math.random() * 3500 + 3800;
    }

    if (type === "spark") {
      startX = state.mouseX;
      startY = state.mouseY;
      moveX = Math.random() * 100 - 50;
      moveY = Math.random() * 100 - 50;
      size = Math.random() * 4 + 2;
      duration = Math.random() * 450 + 450;
    }

    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.left = `${startX}px`;
    el.style.top = `${startY}px`;

    document.body.appendChild(el);

    const animation = el.animate(
      [
        {
          transform: "translate3d(0, 0, 0) rotate(0deg)",
          opacity: 0.9
        },
        {
          transform: `translate3d(${moveX}px, ${moveY}px, 0) rotate(${type === "sakura" ? 720 : 0}deg)`,
          opacity: 0
        }
      ],
      {
        duration,
        easing: "linear"
      }
    );

    animation.onfinish = () => el.remove();
  }

  function bindEvents() {
    document.addEventListener(
      "mousemove",
      (e) => {
        state.mouseX = e.clientX;
        state.mouseY = e.clientY;

        createTrail(e.clientX, e.clientY);
      },
      { passive: true }
    );

    document.addEventListener("click", (e) => {
      const settings = $(".settings-container");

      if (settings && !settings.contains(e.target)) {
        $("#settingsMenu")?.classList.remove("show");
      }

      if (e.target === $("#donateModal")) {
        closeDonate();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeDonate();
        $("#settingsMenu")?.classList.remove("show");
      }
    });
  }

  protectClient();
  bindEvents();
  initEye();
  initTyping();

  fetchRealTimeViews();
  setInterval(fetchRealTimeViews, 15000);

  Object.assign(window, {
    toggleSettings,
    openDonate,
    closeDonate,
    updateQR,
    triggerJumpscare,
    changeCursor,
    toggleEffect
  });
})();
