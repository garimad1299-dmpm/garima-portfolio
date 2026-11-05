/* Garima Dandotiya — Portfolio interactions */
(function () {
  "use strict";
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---- intro ---- */
  requestAnimationFrame(() => setTimeout(() => root.classList.add("loaded"), 80));

  /* ---- year ---- */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---- nav: scrolled state, progress bar, active link, WA button ---- */
  const nav = document.getElementById("nav");
  const progress = document.querySelector(".progress");
  const wa = document.querySelector(".wa-float");
  const links = [...document.querySelectorAll(".nav-links a")];
  const sections = links.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const tl = document.querySelector(".timeline");
  const tlFill = document.querySelector(".tl-line span");

  let ticking = false;
  function onScroll() {
    const sy = window.scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle("scrolled", sy > 20);
    progress.style.transform = `scaleX(${max > 0 ? sy / max : 0})`;
    wa.classList.toggle("show", sy > innerHeight * 0.6);

    let current = "";
    for (const s of sections) if (s.getBoundingClientRect().top < innerHeight * 0.4) current = s.id;
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + current));

    if (tl && tlFill) {
      const r = tl.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.7 - r.top) / r.height));
      tlFill.style.setProperty("--tl", p.toFixed(3));
    }
    ticking = false;
  }
  window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();

  /* ---- mobile menu ---- */
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("navLinks");
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open);
  });
  links.forEach(a => a.addEventListener("click", () => { menu.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }));

  /* ---- number formatting ---- */
  const fmt = (n, dec, style) => {
    if (style === "in") return Math.round(n).toLocaleString("en-IN");
    return dec ? n.toFixed(dec) : Math.round(n).toLocaleString("en-IN");
  };
  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const to = parseFloat(el.dataset.to);
    const dec = parseInt(el.dataset.dec || "0", 10);
    const style = el.dataset.format;
    if (reduce) { el.textContent = fmt(to, dec, style); return; }
    const dur = 1800 + Math.min(800, String(Math.round(to)).length * 120);
    const t0 = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - k, 4);
      el.textContent = fmt(to * e, dec, style);
      if (k < 1) requestAnimationFrame(tick); else el.textContent = fmt(to, dec, style);
    };
    requestAnimationFrame(tick);
  }

  /* ---- reveal on scroll ---- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add("in");
      en.target.querySelectorAll(".count").forEach(countUp);
      if (en.target.classList.contains("count")) countUp(en.target);
      io.unobserve(en.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  // stagger siblings
  document.querySelectorAll(".kpi-grid, .camp-grid, .skills-grid, .about-facts, .g-grid, .edu-col").forEach(group => {
    [...group.querySelectorAll(":scope > .reveal")].forEach((el, i) => el.style.setProperty("--d", (i * 0.08) + "s"));
  });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  // counters not inside a .reveal
  document.querySelectorAll(".count").forEach(c => { if (!c.closest(".reveal")) io.observe(c); });

  /* ---- tabs (Meta / Google) ---- */
  const tabs = [...document.querySelectorAll(".tab")];
  const indicator = document.querySelector(".tab-indicator");
  const panels = [...document.querySelectorAll(".panel")];
  function placeIndicator(tab) {
    if (!indicator || !tab) return;
    indicator.style.width = tab.offsetWidth + "px";
    indicator.style.transform = `translateX(${tab.offsetLeft - 5}px)`;
  }
  tabs.forEach(tab => tab.addEventListener("click", () => {
    tabs.forEach(t => { t.classList.toggle("active", t === tab); t.setAttribute("aria-selected", t === tab); });
    panels.forEach(p => {
      const on = p.dataset.panel === tab.dataset.tab;
      p.hidden = !on; p.classList.toggle("active", on);
      if (on) p.querySelectorAll(".reveal").forEach(el => {
        // panel was hidden; make sure its items animate in now
        requestAnimationFrame(() => { el.classList.add("in"); el.querySelectorAll(".count").forEach(countUp); });
      });
    });
    placeIndicator(tab);
  }));
  window.addEventListener("load", () => placeIndicator(document.querySelector(".tab.active")));
  window.addEventListener("resize", () => placeIndicator(document.querySelector(".tab.active")));
  if (document.fonts) document.fonts.ready.then(() => placeIndicator(document.querySelector(".tab.active")));

  if (!finePointer || reduce) return;

  /* ---- cursor glow ---- */
  const glow = document.querySelector(".cursor-glow");
  let gx = -500, gy = -500, cx = gx, cy = gy;
  window.addEventListener("pointermove", e => { gx = e.clientX; gy = e.clientY; }, { passive: true });
  (function loop() {
    cx += (gx - cx) * 0.12; cy += (gy - cy) * 0.12;
    glow.style.left = cx + "px"; glow.style.top = cy + "px";
    requestAnimationFrame(loop);
  })();

  /* ---- magnetic buttons ---- */
  document.querySelectorAll(".magnetic").forEach(btn => {
    btn.addEventListener("pointermove", e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.22;
      const y = (e.clientY - r.top - r.height / 2) * 0.32;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
  });

  /* ---- portrait tilt ---- */
  const tilt = document.getElementById("portrait");
  if (tilt) {
    const area = tilt.closest(".hero");
    area.addEventListener("pointermove", e => {
      const r = tilt.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      tilt.style.transform = `perspective(1000px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg)`;
    });
    area.addEventListener("pointerleave", () => { tilt.style.transform = ""; });
  }
})();
