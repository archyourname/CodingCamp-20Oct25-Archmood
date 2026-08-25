/* =====================================================
   LYNCH WEB3
   JAVASCRIPT
===================================================== */

/* =====================================================
   BLOCKCHAIN NETWORK
===================================================== */

const canvas = document.getElementById("networkCanvas");

const ctx = canvas.getContext("2d");

let width;
let height;

let nodes = [];

const NODE_COUNT = 80;

/* ================= RESIZE ================= */

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;

  width = window.innerWidth;

  height = window.innerHeight;

  canvas.width = width * dpr;

  canvas.height = height * dpr;

  canvas.style.width = width + "px";

  canvas.style.height = height + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

/* =====================================================
   CREATE NODES
===================================================== */

function createNodes() {
  nodes = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * width,

      y: Math.random() * height,

      vx: (Math.random() - 0.5) * 0.25,

      vy: (Math.random() - 0.5) * 0.25,

      radius: Math.random() * 2 + 1,
    });
  }
}

createNodes();

/* =====================================================
   MOUSE
===================================================== */

let mouse = {
  x: width / 2,

  y: height / 2,
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;

  mouse.y = event.clientY;
});

/* =====================================================
   DRAW NETWORK
===================================================== */

function drawNetwork() {
  ctx.clearRect(0, 0, width, height);

  /* Move nodes */

  nodes.forEach((node) => {
    node.x += node.vx;

    node.y += node.vy;

    if (node.x < 0 || node.x > width) {
      node.vx *= -1;
    }

    if (node.y < 0 || node.y > height) {
      node.vy *= -1;
    }

    /* Mouse influence */

    const dx = mouse.x - node.x;

    const dy = mouse.y - node.y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 150) {
      node.x -= dx * 0.0005;

      node.y -= dy * 0.0005;
    }
  });

  /* Connections */

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];

      const b = nodes[j];

      const dx = a.x - b.x;

      const dy = a.y - b.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 130) {
        ctx.beginPath();

        ctx.moveTo(a.x, a.y);

        ctx.lineTo(b.x, b.y);

        ctx.strokeStyle = `rgba(
                        0,
                        229,
                        255,
                        ${1 - distance / 130}
                    )`;

        ctx.lineWidth = 0.35;

        ctx.stroke();
      }
    }
  }

  /* Nodes */

  nodes.forEach((node) => {
    ctx.beginPath();

    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);

    ctx.fillStyle = "#00e5ff";

    ctx.shadowBlur = 10;

    ctx.shadowColor = "#00e5ff";

    ctx.fill();

    ctx.shadowBlur = 0;
  });

  requestAnimationFrame(drawNetwork);
}

drawNetwork();

/* =====================================================
   NAVBAR
===================================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =====================================================
   COUNTERS
===================================================== */

const counters = document.querySelectorAll("[data-counter]");

let countersStarted = false;

function startCounters() {
  if (countersStarted) return;

  countersStarted = true;

  counters.forEach((counter) => {
    const target = Number(counter.dataset.counter);

    let current = 0;

    const increment = target / 100;

    function update() {
      current += increment;

      if (current >= target) {
        counter.textContent = target.toLocaleString();

        return;
      }

      counter.textContent = Math.floor(current).toLocaleString();

      requestAnimationFrame(update);
    }

    update();
  });
}

const statsSection = document.querySelector(".stats");

const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    startCounters();
  }
});

statsObserver.observe(statsSection);

/* =====================================================
   CONNECT WALLET DEMO
===================================================== */

const walletButtons = document.querySelectorAll(".wallet-btn");

walletButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const original = button.textContent;

    button.textContent = "CONNECTING...";

    setTimeout(() => {
      button.textContent = "0x7A...92F";

      button.style.color = "#00ffb3";

      button.style.borderColor = "#00ffb3";
    }, 1200);
  });
});

/* =====================================================
   HERO COIN PARALLAX
===================================================== */

const coinStage = document.querySelector(".coin-stage");

let mousePos = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  if (window.innerWidth < 700) return;

  mousePos.x = (event.clientX / window.innerWidth - 0.5) * 25;

  mousePos.y = (event.clientY / window.innerHeight - 0.5) * 25;
});

if (coinStage) {
  function updateCoinParallax() {
    coinStage.style.transform = `translateY(-50%)
             translate(
                ${mousePos.x}px,
                ${mousePos.y}px
             )`;

    requestAnimationFrame(updateCoinParallax);
  }

  updateCoinParallax();
}

/* =====================================================
   TOKEN COIN MOUSE PARALLAX
===================================================== */

const tokenCoin = document.querySelector(".token-coin");

let tokenCoinPos = {
  x: 0,
  y: 0,
};

if (tokenCoin) {
  window.addEventListener("mousemove", (event) => {
    if (window.innerWidth < 700) return;

    tokenCoinPos.x = (event.clientX / window.innerWidth - 0.5) * 15;

    tokenCoinPos.y = (event.clientY / window.innerHeight - 0.5) * 15;
  });

  function updateTokenParallax() {
    tokenCoin.style.marginLeft = `${tokenCoinPos.x}px`;

    tokenCoin.style.marginTop = `${tokenCoinPos.y}px`;

    requestAnimationFrame(updateTokenParallax);
  }

  updateTokenParallax();
}

/* =====================================================
   MAGNETIC BUTTON
===================================================== */

document.querySelectorAll(".btn,.wallet-btn").forEach((button) => {
  button.addEventListener("mousemove", (event) => {
    const rect = button.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;

    const y = event.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(
                        ${x * 0.08}px,
                        ${y * 0.08}px
                    )`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0,0)";
  });
});

/* =====================================================
   LIVE TOKEN PRICE DEMO
===================================================== */

const tokenPrice = document.querySelector(".token-price");

let fakePrice = 2.481;

setInterval(() => {
  fakePrice += (Math.random() - 0.5) * 0.02;

  if (tokenPrice) {
    tokenPrice.textContent = `+${(12 + Math.random() * 2).toFixed(2)}%`;
  }
}, 3000);

/* =====================================================
   SCROLL COIN EFFECT
===================================================== */

const scrollCoin = document.querySelector(".coin");

let scrollVal = 0;

window.addEventListener("scroll", () => {
  if (window.innerWidth < 700) return;

  scrollVal = window.scrollY;
});

if (scrollCoin) {
  function updateScrollCoin() {
    if (scrollCoin && scrollVal < window.innerHeight) {
      const rotation = scrollVal * 0.15;

      const scale = Math.max(0.75, 1 - scrollVal / 3000);

      scrollCoin.style.transform = `translate(-50%,-50%)
                 rotateX(12deg)
                 rotateY(${rotation}deg)
                 scale(${scale})`;
    }

    requestAnimationFrame(updateScrollCoin);
  }

  updateScrollCoin();
}

/* =====================================================
   LYNCH VDP FORM
===================================================== */

const vdpForm = document.getElementById("vdpForm");

const formMessage = document.getElementById("formMessage");

if (vdpForm) {
  vdpForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const submitButton = vdpForm.querySelector(".submit-report");

    submitButton.disabled = true;

    submitButton.innerHTML = "ENCRYPTING REPORT...";

    formMessage.className = "form-message";

    formMessage.textContent = "";

    setTimeout(
      function () {
        const reportID =
          "AXN-" + Math.random().toString(36).substring(2, 8).toUpperCase();

        submitButton.disabled = false;

        submitButton.innerHTML = "SUBMIT SECURITY REPORT <span>→</span>";

        formMessage.className = "form-message success";

        formMessage.innerHTML =
          "REPORT RECEIVED · " +
          "<strong>" +
          reportID +
          "</strong><br>" +
          "Your vulnerability report has " +
          "been queued for security review.";

        vdpForm.reset();
      },

      1800,
    );
  });
}
