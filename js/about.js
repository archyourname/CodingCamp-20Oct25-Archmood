/* =========================================
   CANVAS
========================================= */
const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
let W = window.innerWidth;
let H = window.innerHeight;
let D = window.devicePixelRatio || 1;
function resize() {
  W = window.innerWidth;
  H = window.innerHeight;
  D = Math.max(1, window.devicePixelRatio || 1);
  canvas.width = Math.floor(W * D);
  canvas.height = Math.floor(H * D);
  canvas.style.width = W + "px";
  canvas.style.height = H + "px";
  ctx.setTransform(D, 0, 0, D, 0, 0);
}
window.addEventListener("resize", resize);
resize();
/* =========================================
   INPUT
========================================= */
const keys = {};
let leaving = false;
const preventKeys = [" ", "arrowleft", "arrowright", "arrowup", "arrowdown"];
window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  keys[key] = true;
  if (preventKeys.includes(key)) {
    e.preventDefault();
  }
  if (key === "e" && !e.repeat) {
    interact();
  }
});
window.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});
/* =========================================
   WORLD
========================================= */
const world = {
  w: 4300,
  ground: 0,
};
/* =========================================
   PLAYER
========================================= */
const cat = {
  x: 450,
  y: 0,
  vx: 0,
  vy: 0,
  w: 46,
  h: 30,
  dir: 1,
  onGround: true,
  jump: false,
};
let camX = 0;
let time = 0;
/* =========================================
   PLATFORM
========================================= */
const platforms = [
  {
    x: 0,
    y: 0,
    w: 4300,
    h: 42,
  },
];
/* =========================================
   NPC
========================================= */
const npcs = [
  {
    x: 760,
    y: 0,
    name: "Pont-Putih",
    color: "#d6c59c",
    text: "Halo, Kucing kecil... Apakah kamu tersesat?",
  },
  {
    x: 2020,
    y: 0,
    name: "Pont-Biru",
    color: "#7fe8ff",
    text: "Celakalah setiap pengumpat lagi pencela. Yang mengumpulkan harta dan menghitung-hitungnya. Dia mengira bahwa hartanya itu dapat mengekalkannya.",
  },
  {
    x: 3300,
    y: 0,
    name: "Pont-Merah",
    color: "#b7a2ff",
    text: "Orang yang kuat bukan mereka yang tidak pernah menangis, namun mereka yang tetap bangkit meski jatuh berkali-kali.",
  },
];
/* =========================================
   NEON SIGN
========================================= */
const signs = [
  {
    x: 430,
    y: 250,
    text: "PONTMEDUSA",
    color: "#38e8ff",
  },
  {
    x: 930,
    y: 330,
    text: "SOFTWARE ENGINEER",
    color: "#ffe35a",
  },
  {
    x: 1510,
    y: 260,
    text: "HARDWARE ENGINEER",
    color: "#ff4c9a",
  },
  {
    x: 2350,
    y: 300,
    text: "NETWORK ENGINEER",
    color: "#b879ff",
  },
  {
    x: 3100,
    y: 250,
    text: "CYBERSECURITY",
    color: "#55ff9a",
  },
];
/* =========================================
   OBJECTS
========================================= */
const objects = [
  {
    x: 560,
    y: 0,
    type: "cardboard",
    name: "Kardus Basah",
    text: "Kardus ini berisi banyak suku cadang komputer. Sayangnya, sebagian besar rusak terkena hujan. Entah pemiliknya sengaja meninggalkannya, atau hanya sedang mencoba mengubur kembali hobi yang dulu pernah ditinggalkan—meski pada akhirnya selalu kembali.",
  },
  {
    x: 1080,
    y: 0,
    type: "trash",
    name: "Tempat Sampah",
    text: "Tak ada yang menarik di sini. Isinya kosong, tapi suara tetesan air hujannya paling terdengar.",
  },
  {
    x: 1380,
    y: 0,
    type: "billboard",
    name: "Papan Pengumuman",
    text: "Sebuah papan pengumuman. Di sana tertempel sebuah laporan orang hilang. Namanya Archyourname. Terakhir kali terlihat, ia mengenakan kacamata dan baju hitam, serta membawa tas berwarna putih. Warga diminta segera menghubungi pihak terkait jika menemukan seseorang yang sesuai dengan ciri-ciri pada gambar.",
  },
  {
    x: 1710,
    y: 0,
    type: "box",
    name: "Peti Kecil",
    text: "Ada beberapa berkas di dalamnya. Sepertinya sudah lama disimpan—mungkin pemiliknya masih menunggu satu panggilan yang tak kunjung datang.",
  },
  {
    x: 2060,
    y: 0,
    type: "bicycle",
    name: "Sepeda",
    text: "Sepeda tua ini masih bisa digunakan. Rodanya mulai berkarat, tapi masih terus berputar. Mungkin pemiliknya tidak sengaja meninggalkannya di sini—atau mungkin hidup memaksanya berjalan tanpa pilihan lain.",
  },
  {
    x: 2500,
    y: 0,
    type: "cardboard",
    name: "Kardus",
    text: "Kardus kosong. Sepertinya cukup untuk melindungi dari hujan.",
  },
  {
    x: 2780,
    y: 0,
    type: "car",
    name: "Mobil Patroli",
    text: "Mobil tua dengan toa di atap. Lampunya masih menyala redup, seolah masih bertugas, walaupun entah apa yang sebenarnya sedang dicari.",
  },
  {
    x: 3230,
    y: 0,
    type: "trash",
    name: "Tong Sampah",
    text: "Banyak kertas berisi kode berserakan di sini. Sepertinya seseorang menjadikan tempat ini sebagai tempat sampah pribadinya. Lucu juga... begitu takut rahasianya terbongkar, tapi membuangnya sembarangan.",
  },
  {
    x: 3500,
    y: 0,
    type: "bench",
    name: "Bangku Jalan",
    text: "Jamur dan tumbuhan mulai memenuhi bangku ini. Sudah lama tidak ada yang duduk di sini. Mungkin bangku ini bukan tidak nyaman, hanya saja tidak pernah ada yang datang.",
  },
  {
    x: 3780,
    y: 0,
    type: "vending",
    name: "Mesin Penjual Otomatis",
    text: "Mesin ini masih berfungsi sepenuhnya. Sayangnya, harganya dibuat seolah-olah yang dijual bukan mesinnya, melainkan hak untuk hidup.",
  },
  {
    x: 3990,
    y: 0,
    type: "hydrant",
    name: "Hidran Kebakaran",
    text: "Hidran merah tua. Tekanan airnya masih normal, tetapi mekanismenya telah dirusak dengan sengaja. Seseorang tampaknya memastikan hidran ini tidak bisa digunakan.",
  },
  {
    x: 4180,
    y: 0,
    type: "door",
    name: "Pintu Keluar",
    text: "Sebuah pintu tua berdiri di ujung jalan. Sepertinya ini adalah jalan keluar. Tekan E untuk kembali ke halaman utama.",
  },
];
/* =========================================
   RAIN
========================================= */
const rain = Array.from({ length: 240 }, () => ({
  x: Math.random() * W,
  y: Math.random() * H,
  l: 8 + Math.random() * 18,
  s: 8 + Math.random() * 13,
}));
/* =========================================
   BUILDINGS
========================================= */
const buildings = [];
for (let i = 0; i < 55; i++) {
  buildings.push({
    x: i * 85 + Math.random() * 40,
    w: 65 + Math.random() * 100,
    h: 180 + Math.random() * 390,
  });
}
/* =========================================
   PARTICLES
========================================= */
const particles = Array.from({ length: 80 }, () => ({
  x: Math.random() * 4300,
  y: 40 + Math.random() * 500,
  r: 1 + Math.random() * 2,
  a: Math.random(),
}));
/* =========================================
   DOM
========================================= */
const dialog = document.getElementById("dialog");
const dialogName = dialog.querySelector(".name");
const dialogText = dialog.querySelector(".text");
const prompt = document.getElementById("prompt");
const fade = document.getElementById("fade");
/* =========================================
   UTIL
========================================= */
function rect(x, y, w, h, fill) {
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, w, h);
}
function worldY(y) {
  return H - 90 - y;
}
/* =========================================
   SKY
========================================= */
function drawSky() {
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, "#070914");
  g.addColorStop(0.55, "#12152b");
  g.addColorStop(1, "#080a12");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = "#8e9cff";
  ctx.beginPath();
  ctx.arc(W * 0.72, H * 0.2, 65, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
}
/* =========================================
   CITY
========================================= */
function drawCity() {
  for (const b of buildings) {
    const x = b.x - camX * 0.18;
    if (x + b.w < 0 || x > W) {
      continue;
    }
    const y = worldY(b.h - 20);
    rect(x, y, b.w, b.h, "#080c16");
    rect(x + 6, y + 6, b.w - 12, b.h - 12, "#101626");
    rect(x, y, b.w, 5, "#27344a");
    for (let yy = y + 22; yy < y + b.h - 15; yy += 30) {
      for (let xx = x + 12; xx < x + b.w - 10; xx += 25) {
        if (((xx * 13 + yy * 7) | 0) % 5 === 0) {
          rect(xx, yy, 7, 10, "#263b52");
        } else if (((xx + yy) | 0) % 11 === 0) {
          rect(xx, yy, 7, 10, "#815b3e");
        }
      }
    }
    rect(x + b.w - 12, y + 30, 5, b.h - 30, "#253047");
  }
  /* LEFT WALL */
  ctx.fillStyle = "#05070d";
  ctx.beginPath();
  ctx.moveTo(0, H - 135);
  ctx.lineTo(170, H - 220);
  ctx.lineTo(170, H);
  ctx.lineTo(0, H);
  ctx.fill();
  /* RIGHT WALL */
  ctx.beginPath();
  ctx.moveTo(W, H - 135);
  ctx.lineTo(W - 170, H - 220);
  ctx.lineTo(W - 170, H);
  ctx.lineTo(W, H);
  ctx.fill();
  /* ROAD */
  const road = ctx.createLinearGradient(0, H - 100, 0, H);
  road.addColorStop(0, "#121827");
  road.addColorStop(1, "#05070c");
  ctx.fillStyle = road;
  ctx.fillRect(0, H - 100, W, 100);
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = "#4b607d";
  for (let x = -100; x < W + 100; x += 90) {
    ctx.beginPath();
    ctx.moveTo(x, H);
    ctx.lineTo(W / 2 + (x - W / 2) * 0.2, H - 100);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}
/* =========================================
   PLATFORM
========================================= */
function drawPlatforms() {
  for (const p of platforms) {
    const x = p.x - camX;
    const y = worldY(p.y);
    if (x + p.w < 0 || x > W) {
      continue;
    }
    rect(x, y, p.w, p.h, "#171c2a");
    rect(x, y, p.w, 4, "#334257");
    for (let i = 0; i < p.w; i += 38) {
      rect(x + i, y + 9, 20, 3, "#263144");
    }
    rect(x, y + 32, p.w, 8, "#0b0e16");
  }
}
/* =========================================
   NEON SIGNS
========================================= */
function drawNeon() {
  ctx.save();
  ctx.font = "bold 24px system-ui";
  for (const s of signs) {
    const x = s.x - camX;
    const y = worldY(s.y);
    ctx.shadowBlur = 18;
    ctx.shadowColor = s.color;
    ctx.fillStyle = s.color;
    ctx.fillText(s.text, x, y);
  }
  ctx.restore();
}
/* =========================================
   OBJECTS
========================================= */
function drawObject(o) {
  const x = o.x - camX;
  const y = worldY(o.y);
  if (x < -100 || x > W + 100) {
    return;
  }
  ctx.save();
  /* CARD BOARD */
  if (o.type === "cardboard") {
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#c78952";
    rect(x - 28, y - 35, 56, 35, "#9a633b");
    rect(x - 28, y - 35, 56, 5, "#c18450");
    ctx.strokeStyle = "#5e3926";
    ctx.strokeRect(x - 28, y - 35, 56, 35);
    ctx.beginPath();
    ctx.moveTo(x - 28, y - 20);
    ctx.lineTo(x, y - 28);
    ctx.lineTo(x + 28, y - 20);
    ctx.stroke();
  } else if (o.type === "trash") {
    /* TRASH */
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#53d6ff";
    rect(x - 18, y - 48, 36, 48, "#303948");
    rect(x - 22, y - 51, 44, 7, "#596579");
    ctx.fillStyle = "#151b26";
    ctx.fillRect(x - 10, y - 41, 20, 5);
  } else if (o.type === "billboard") {
    /* BILLBOARD */
    ctx.shadowBlur = 12;
    ctx.shadowColor = "#38e8ff";
    rect(x - 42, y - 76, 84, 55, "#202b3b");
    rect(x - 38, y - 71, 76, 42, "#111a28");
    ctx.strokeStyle = "#53677e";
    ctx.lineWidth = 2;
    ctx.strokeRect(x - 42, y - 76, 84, 55);
    ctx.fillStyle = "#5fe9ff";
    ctx.fillRect(x - 29, y - 61, 58, 4);
    ctx.fillStyle = "#d8e7f7";
    ctx.fillRect(x - 29, y - 50, 44, 3);
    ctx.fillRect(x - 29, y - 43, 52, 3);
    ctx.fillStyle = "#3e4d62";
    ctx.fillRect(x - 4, y - 21, 8, 21);
  } else if (o.type === "box") {
    /* BOX */
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#9b82ff";
    rect(x - 25, y - 38, 50, 38, "#515a6b");
    rect(x - 25, y - 38, 50, 5, "#79849a");
    ctx.strokeStyle = "#252b38";
    ctx.strokeRect(x - 25, y - 38, 50, 38);
    ctx.fillStyle = "#313a4c";
    ctx.fillRect(x - 4, y - 38, 8, 38);
  } else if (o.type === "bicycle") {
    /* BICYCLE */
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#69d7ff";
    ctx.strokeStyle = "#91a8bd";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x - 20, y - 15, 15, 0, Math.PI * 2);
    ctx.arc(x + 20, y - 15, 15, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - 20, y - 15);
    ctx.lineTo(x - 3, y - 36);
    ctx.lineTo(x + 8, y - 15);
    ctx.lineTo(x - 20, y - 15);
    ctx.moveTo(x - 3, y - 36);
    ctx.lineTo(x + 20, y - 15);
    ctx.moveTo(x - 3, y - 36);
    ctx.lineTo(x + 2, y - 42);
    ctx.moveTo(x + 8, y - 15);
    ctx.lineTo(x + 16, y - 31);
    ctx.stroke();
  } else if (o.type === "car") {
    /* CAR */
    ctx.shadowBlur = 14;
    ctx.shadowColor = "#ff4c9a";
    rect(x - 58, y - 32, 116, 25, "#29384a");
    rect(x - 43, y - 49, 70, 20, "#1a2635");
    ctx.fillStyle = "#0b111b";
    ctx.fillRect(x - 35, y - 44, 24, 12);
    ctx.fillRect(x + 5, y - 44, 24, 12);
    ctx.fillStyle = "#ff405f";
    ctx.fillRect(x - 48, y - 35, 8, 5);
    ctx.fillRect(x + 40, y - 35, 8, 5);
    ctx.fillStyle = "#0c1018";
    ctx.beginPath();
    ctx.arc(x - 37, y - 5, 10, 0, Math.PI * 2);
    ctx.arc(x + 37, y - 5, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#8e9fb4";
    ctx.beginPath();
    ctx.moveTo(x - 10, y - 49);
    ctx.lineTo(x + 2, y - 49);
    ctx.lineTo(x + 10, y - 58);
    ctx.lineTo(x - 18, y - 58);
    ctx.closePath();
    ctx.fill();
  } else if (o.type === "bench") {
    /* BENCH */
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#c68b55";
    rect(x - 42, y - 38, 84, 7, "#9b673f");
    rect(x - 42, y - 26, 84, 6, "#7e5235");
    rect(x - 34, y - 20, 6, 20, "#4b5563");
    rect(x + 28, y - 20, 6, 20, "#4b5563");
  } else if (o.type === "vending") {
    /* VENDING */
    ctx.shadowBlur = 12;
    ctx.shadowColor = "#55ff9a";
    rect(x - 25, y - 72, 50, 72, "#263447");
    rect(x - 20, y - 66, 40, 38, "#0b1720");
    ctx.fillStyle = "#55ff9a";
    ctx.fillRect(x - 15, y - 58, 30, 4);
    ctx.fillStyle = "#8fa4b8";
    ctx.fillRect(x - 15, y - 47, 25, 3);
    ctx.fillRect(x - 15, y - 39, 18, 3);
    ctx.fillStyle = "#f3cf5b";
    ctx.fillRect(x - 13, y - 18, 8, 8);
    ctx.fillRect(x, y - 18, 8, 8);
  } else if (o.type === "hydrant") {
    /* HYDRANT */
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#ff4c5d";
    rect(x - 11, y - 43, 22, 43, "#9b3344");
    rect(x - 18, y - 39, 36, 8, "#b53d50");
    ctx.fillStyle = "#d85b65";
    ctx.fillRect(x - 16, y - 54, 32, 12);
    ctx.fillStyle = "#6d2432";
    ctx.fillRect(x - 28, y - 30, 17, 9);
    ctx.fillRect(x + 11, y - 30, 17, 9);
  } else if (o.type === "door") {
    /* EXIT DOOR */
    ctx.shadowBlur = 25;
    ctx.shadowColor = "#38e8ff";
    ctx.fillStyle = "#38e8ff18";
    ctx.fillRect(x - 48, y - 120, 96, 120);
    /* OUTER FRAME */
    rect(x - 35, y - 110, 70, 110, "#263b52");
    /* DOOR */
    rect(x - 29, y - 104, 58, 104, "#0b1421");
    /* NEON FRAME */
    ctx.strokeStyle = "#4fdfff";
    ctx.lineWidth = 3;
    ctx.strokeRect(x - 35, y - 110, 70, 110);
    /* DOOR PANEL */
    ctx.strokeStyle = "#24576a";
    ctx.lineWidth = 2;
    ctx.strokeRect(x - 20, y - 82, 40, 55);
    /* NEON LINES */
    ctx.fillStyle = "#38e8ff";
    ctx.fillRect(x - 24, y - 96, 48, 3);
    ctx.fillRect(x - 24, y - 15, 48, 3);
    /* EXIT */
    ctx.font = "bold 12px system-ui";
    ctx.textAlign = "center";
    ctx.fillStyle = "#55ff9a";
    ctx.shadowBlur = 15;
    ctx.fillText("EXIT", x, y - 55);
    /* HANDLE */
    ctx.fillStyle = "#ffe35a";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(x + 18, y - 45, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.textAlign = "left";
  }
  ctx.restore();
}
/* =========================================
   NPC
========================================= */
function drawNPC(n) {
  const x = n.x - camX;
  const y = worldY(n.y);
  if (x < -60 || x > W + 60) {
    return;
  }
  ctx.save();
  ctx.shadowBlur = 14;
  ctx.shadowColor = n.color;
  /* BODY */
  rect(x - 10, y - 54, 20, 54, n.color);
  /* HEAD */
  ctx.fillStyle = "#111827";
  ctx.beginPath();
  ctx.arc(x, y - 64, 15, 0, Math.PI * 2);
  ctx.fill();
  /* EYES */
  ctx.fillStyle = n.color;
  ctx.fillRect(x - 8, y - 68, 4, 3);
  ctx.fillRect(x + 4, y - 68, 4, 3);
  ctx.restore();
}
/* =========================================
   CAT
========================================= */
function drawCat() {
  const x = cat.x - camX;
  const y = worldY(cat.y + cat.h);
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(cat.dir, 1);
  const moving = Math.abs(cat.vx) > 0.4 && cat.onGround;
  const bob = moving ? Math.sin(time * 0.025) * 2 : 0;
  ctx.translate(0, bob);
  ctx.shadowBlur = 18;
  ctx.shadowColor = "#ff9b42";
  /* TAIL */
  ctx.strokeStyle = "#d77a38";
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-16, 12);
  ctx.quadraticCurveTo(-38, -2, -28, -18);
  ctx.stroke();
  /* BODY */
  ctx.fillStyle = "#c87539";
  ctx.beginPath();
  ctx.ellipse(0, 0, 23, 15, 0, 0, Math.PI * 2);
  ctx.fill();
  /* HEAD */
  ctx.fillStyle = "#e18a45";
  ctx.beginPath();
  ctx.arc(22, -11, 14, 0, Math.PI * 2);
  ctx.fill();
  /* EARS */
  ctx.beginPath();
  ctx.moveTo(12, -20);
  ctx.lineTo(14, -35);
  ctx.lineTo(22, -23);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(27, -23);
  ctx.lineTo(35, -35);
  ctx.lineTo(36, -15);
  ctx.fill();
  /* EYES */
  ctx.shadowBlur = 10;
  ctx.shadowColor = "#ffe46b";
  ctx.fillStyle = "#ffe46b";
  ctx.fillRect(25, -14, 3, 4);
  ctx.fillRect(33, -14, 3, 4);
  /* LEGS */
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "#9f572c";
  ctx.lineWidth = 5;
  const step = moving ? Math.sin(time * 0.025) * 5 : 0;
  ctx.beginPath();
  ctx.moveTo(-10, 10);
  ctx.lineTo(-10 - step, 25);
  ctx.moveTo(8, 10);
  ctx.lineTo(8 + step, 25);
  ctx.stroke();
  ctx.restore();
}
/* =========================================
   PARTICLES
========================================= */
function drawParticles() {
  ctx.save();
  for (const p of particles) {
    const x = p.x - camX * 0.7;
    const y = worldY(p.y);
    if (x < 0 || x > W) {
      continue;
    }
    ctx.globalAlpha = 0.15 + p.a * 0.25;
    ctx.fillStyle = "#72dfff";
    ctx.beginPath();
    ctx.arc(x, y, p.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}
/* =========================================
   RAIN
========================================= */
function drawRain() {
  ctx.save();
  ctx.strokeStyle = "#83cfff33";
  ctx.lineWidth = 1;
  for (const r of rain) {
    r.y += r.s;
    if (r.y > H) {
      r.y = -r.l;
    }
    r.x -= 0.7;
    if (r.x < 0) {
      r.x = W;
    }
    ctx.beginPath();
    ctx.moveTo(r.x, r.y);
    ctx.lineTo(r.x - 5, r.y + r.l);
    ctx.stroke();
  }
  ctx.restore();
}
/* =========================================
   COLLISION
========================================= */
function collision() {
  cat.onGround = false;
  for (const p of platforms) {
    const horizontal = cat.x + cat.w / 2 > p.x && cat.x - cat.w / 2 < p.x + p.w;
    if (!horizontal) {
      continue;
    }
    const bottom = cat.y;
    if (cat.vy <= 0 && bottom >= p.y - 8 && bottom <= p.y + 18) {
      cat.y = p.y;
      cat.vy = 0;
      cat.onGround = true;
    }
  }
}
/* =========================================
   NEAREST INTERACTION
========================================= */
function nearestInteractive() {
  let best = null;
  let dist = Infinity;
  for (const n of npcs) {
    const d = Math.abs(cat.x - n.x);
    if (d < dist && d < 90) {
      best = n;
      dist = d;
    }
  }
  for (const o of objects) {
    const d = Math.abs(cat.x - o.x);
    if (d < dist && d < 90) {
      best = o;
      dist = d;
    }
  }
  return best;
}
/* =========================================
   INTERACTION
========================================= */
function interact() {
  if (leaving) {
    return;
  }
  const n = nearestInteractive();
  if (!n) {
    return;
  }
  dialog.style.display = "block";
  dialogName.textContent = n.name;
  dialogText.textContent = n.text;
  /* =====================================
       EXIT
    ===================================== */
  if (n.type === "door") {
    leaving = true;
    dialogText.textContent = "Pintu terbuka... kembali ke halaman utama.";
    prompt.style.opacity = "0";
    setTimeout(() => {
      fade.style.opacity = "1";
      setTimeout(() => {
        window.location.href = "./home.html";
      }, 1000);
    }, 1000);
    return;
  }
  /* =====================================
       NORMAL INTERACTION
    ===================================== */
  setTimeout(() => {
    if (!leaving) {
      dialog.style.display = "none";
    }
  }, 4000);
}
/* =========================================
   UPDATE
========================================= */
function update() {
  if (leaving) {
    return;
  }
  const left = keys.a || keys.arrowleft;
  const right = keys.d || keys.arrowright;
  /* MOVEMENT */
  if (left) {
    cat.vx -= 0.55;
    cat.dir = -1;
  }
  if (right) {
    cat.vx += 0.55;
    cat.dir = 1;
  }
  if (!left && !right) {
    cat.vx *= 0.78;
  }
  cat.vx = Math.max(-5, Math.min(5, cat.vx));
  /* JUMP */
  const jumping = keys[" "] || keys.w || keys.arrowup;
  if (jumping && cat.onGround && !cat.jump) {
    cat.vy = 10;
    cat.onGround = false;
    cat.jump = true;
  }
  if (!jumping) {
    cat.jump = false;
  }
  /* PHYSICS */
  cat.vy -= 0.48;
  cat.y += cat.vy;
  cat.x += cat.vx;
  /* WORLD LIMIT */
  cat.x = Math.max(25, Math.min(world.w - 25, cat.x));
  /* COLLISION */
  collision();
  /* CAMERA */
  const targetCam = cat.x - W * 0.35;
  camX += (targetCam - camX) * 0.08;
  const maxCam = Math.max(0, world.w - W);
  camX = Math.max(0, Math.min(maxCam, camX));
  time++;
}
/* =========================================
   RENDER
========================================= */
function render() {
  drawSky();
  drawCity();
  drawParticles();
  drawPlatforms();
  drawNeon();
  objects.forEach(drawObject);
  npcs.forEach(drawNPC);
  drawCat();
  drawRain();
  /* INTERACTION PROMPT */
  const n = nearestInteractive();
  if (n && !leaving) {
    if (n.type === "door") {
      prompt.textContent = "[ E ] Buka Pintu Keluar";
    } else {
      prompt.textContent = "[ E ] " + n.name;
    }
    prompt.style.opacity = "1";
  } else {
    prompt.textContent = "";
    prompt.style.opacity = "0";
  }
}
/* =========================================
   GAME LOOP
========================================= */
function loop() {
  update();
  render();
  requestAnimationFrame(loop);
}
loop();
/* =========================================
   MOBILE CONTROL
========================================= */
function setKey(key, value) {
  keys[key] = value;
}
/* =========================================
   HOLD BUTTON
========================================= */
function hold(button, key) {
  if (!button) {
    return;
  }
  button.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    try {
      button.setPointerCapture(e.pointerId);
    } catch (_) {}
    setKey(key, true);
  });
  button.addEventListener("pointerup", (e) => {
    e.preventDefault();
    setKey(key, false);
    try {
      button.releasePointerCapture(e.pointerId);
    } catch (_) {}
  });
  button.addEventListener("pointercancel", (e) => {
    e.preventDefault();
    setKey(key, false);
  });
  button.addEventListener("lostpointercapture", () => {
    setKey(key, false);
  });
}
/* =========================================
   MOBILE ELEMENTS
========================================= */
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");
const jumpButton = document.getElementById("jump");
const interactButton = document.getElementById("interact");
/* =========================================
   MOVEMENT
========================================= */
hold(leftButton, "a");
hold(rightButton, "d");
/* =========================================
   MOBILE JUMP
========================================= */
if (jumpButton) {
  jumpButton.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    try {
      jumpButton.setPointerCapture(e.pointerId);
    } catch (_) {}
    keys[" "] = true;
  });
  jumpButton.addEventListener("pointerup", (e) => {
    e.preventDefault();
    keys[" "] = false;
  });
  jumpButton.addEventListener("pointercancel", () => {
    keys[" "] = false;
  });
  jumpButton.addEventListener("lostpointercapture", () => {
    keys[" "] = false;
  });
}
/* =========================================
   MOBILE INTERACT
========================================= */
if (interactButton) {
  interactButton.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    try {
      interactButton.setPointerCapture(e.pointerId);
    } catch (_) {}
    interact();
  });
}
/* =========================================
   RELEASE ALL INPUT
   Saat tab berpindah / layar kehilangan fokus
========================================= */
window.addEventListener("blur", () => {
  keys.a = false;
  keys.d = false;
  keys[" "] = false;
  keys.w = false;
  keys.arrowleft = false;
  keys.arrowright = false;
  keys.arrowup = false;
  keys.arrowdown = false;
});
/* =========================================
   VISIBILITY
========================================= */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    keys.a = false;
    keys.d = false;
    keys[" "] = false;
    keys.w = false;
    keys.arrowleft = false;
    keys.arrowright = false;
    keys.arrowup = false;
    keys.arrowdown = false;
  }
});
