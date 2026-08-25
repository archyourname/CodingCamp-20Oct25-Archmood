/* =====================================================
   APP
===================================================== */

const app = document.getElementById("app");

/* =====================================================
   MASUK KE WEBSITE
===================================================== */

function openHome() {
  app.classList.add("home-open");
}

/* =====================================================
   BUKA SCENE
===================================================== */

function openDetail(number) {
  const scene = document.getElementById("detail" + number);

  if (!scene) return;

  /* Tutup scene lain */

  document.querySelectorAll(".detail.active").forEach((activeScene) => {
    activeScene.classList.remove("active");
  });

  /* Buka scene */

  scene.classList.add("active");
}

/* =====================================================
   TUTUP SCENE
===================================================== */

function closeDetail(number) {
  const scene = document.getElementById("detail" + number);

  if (!scene) return;

  scene.classList.remove("active");
}

/* =====================================================
   KEYBOARD ESC
===================================================== */

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    document.querySelectorAll(".detail.active").forEach((scene) => {
      scene.classList.remove("active");
    });
  }
});

/* =====================================================
   GLOBAL MOUSE
===================================================== */

const mouse = {
  x: window.innerWidth / 2,

  y: window.innerHeight / 2,
};

window.addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;

  mouse.y = event.clientY;
});

/* =====================================================
   HERO PARALLAX
===================================================== */

const homeContent = document.querySelector(".home-content");

const parallaxTexts = document.querySelectorAll(".parallax-text");

window.addEventListener("mousemove", function (event) {
  if (!homeContent) return;

  /* ---------------------------------------------
           POSISI CURSOR DARI TENGAH
        --------------------------------------------- */

  const x = event.clientX / window.innerWidth - 0.5;

  const y = event.clientY / window.innerHeight - 0.5;

  /* ---------------------------------------------
           GERAKAN JUDUL
        --------------------------------------------- */

  const titleMoveX = x * 20;

  const titleMoveY = y * 12;

  homeContent.style.transform = `translate3d(
                ${titleMoveX}px,
                ${titleMoveY}px,
                0
            )`;

  /* ---------------------------------------------
           SUBTITLE PARALLAX
        --------------------------------------------- */

  parallaxTexts.forEach((text) => {
    const depth = parseFloat(
      getComputedStyle(text).getPropertyValue("--depth"),
    );

    if (isNaN(depth)) return;

    /*
                   Gerak berlawanan
                   dengan cursor
                */

    const moveX = x * depth * -1;

    const moveY = y * depth * -0.5;

    text.style.setProperty("--x", `${moveX}px`);

    text.style.setProperty("--y", `${moveY}px`);
  });
});

/* =====================================================
   PARTICLE SYSTEM
===================================================== */

const canvas = document.getElementById("particles");

/*
   Jalankan particle hanya
   jika canvas tersedia.
*/

if (canvas) {
  const ctx = canvas.getContext("2d");

  let particles = [];

  /* =================================================
       MOUSE PARTICLE
    ================================================= */

  const particleMouse = {
    x: null,

    y: null,

    radius: 120,
  };

  /* =================================================
       RESIZE CANVAS
    ================================================= */

  function resizeCanvas() {
    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;
  }

  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);

  /* =================================================
       MOUSE MOVE
    ================================================= */

  window.addEventListener("mousemove", function (event) {
    particleMouse.x = event.clientX;

    particleMouse.y = event.clientY;
  });

  /* =================================================
       MOUSE LEAVE
    ================================================= */

  window.addEventListener("mouseleave", function () {
    particleMouse.x = null;

    particleMouse.y = null;
  });

  /* =================================================
       CREATE PARTICLES
    ================================================= */

  function createParticles() {
    particles = [];

    const amount = window.innerWidth < 600 ? 50 : 100;

    for (let i = 0; i < amount; i++) {
      particles.push({
        x: Math.random() * canvas.width,

        y: Math.random() * canvas.height,

        size: Math.random() * 2 + 1,

        speedX: (Math.random() - 0.5) * 0.5,

        speedY: (Math.random() - 0.5) * 0.5,

        opacity: Math.random() * 0.6 + 0.2,
      });
    }
  }

  createParticles();

  /* =================================================
       UPDATE PARTICLES
    ================================================= */

  function updateParticles() {
    particles.forEach((particle) => {
      /* -------------------------------------
                   GERAKAN NORMAL
                ------------------------------------- */

      particle.x += particle.speedX;

      particle.y += particle.speedY;

      /* -------------------------------------
                   BATAS KIRI / KANAN
                ------------------------------------- */

      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX *= -1;
      }

      /* -------------------------------------
                   BATAS ATAS / BAWAH
                ------------------------------------- */

      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY *= -1;
      }

      /* -------------------------------------
                   INTERAKSI MOUSE
                ------------------------------------- */

      if (particleMouse.x !== null && particleMouse.y !== null) {
        const dx = particle.x - particleMouse.x;

        const dy = particle.y - particleMouse.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < particleMouse.radius) {
          if (distance > 0) {
            const force =
              (particleMouse.radius - distance) / particleMouse.radius;

            particle.x += (dx / distance) * force * 1.5;

            particle.y += (dy / distance) * force * 1.5;
          }
        }
      }
    });
  }

  /* =================================================
       DRAW PARTICLES
    ================================================= */

  function drawParticles() {
    particles.forEach((particle) => {
      ctx.beginPath();

      ctx.arc(
        particle.x,

        particle.y,

        particle.size,

        0,

        Math.PI * 2,
      );

      ctx.fillStyle = `rgba(
                        255,
                        255,
                        255,
                        ${particle.opacity}
                    )`;

      ctx.fill();
    });
  }

  /* =================================================
       CONNECT PARTICLES
    ================================================= */

  function connectParticles() {
    const maxDistance = 120;

    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;

        const dy = particles[a].y - particles[b].y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.15;

          ctx.beginPath();

          ctx.moveTo(
            particles[a].x,

            particles[a].y,
          );

          ctx.lineTo(
            particles[b].x,

            particles[b].y,
          );

          ctx.strokeStyle = `rgba(
                            255,
                            255,
                            255,
                            ${opacity}
                        )`;

          ctx.lineWidth = 1;

          ctx.stroke();
        }
      }
    }
  }

  /* =================================================
       ANIMATION LOOP
    ================================================= */

  function animateParticles() {
    /* Clear */

    ctx.clearRect(
      0,
      0,

      canvas.width,
      canvas.height,
    );

    /* Update */

    updateParticles();

    /* Connect */

    connectParticles();

    /* Draw */

    drawParticles();

    /* Loop */

    requestAnimationFrame(animateParticles);
  }

  animateParticles();

  /* =================================================
       RECREATE PARTICLES
       AFTER RESIZE
    ================================================= */

  window.addEventListener("resize", function () {
    createParticles();
  });
}

/* =====================================================
   END
===================================================== */
