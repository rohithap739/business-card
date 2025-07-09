const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let width, height, particles;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

particles = Array.from({ length: 100 }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  vx: (Math.random() - 0.5) * 1.2,
  vy: (Math.random() - 0.5) * 1.2,
  length: Math.random() * 15 + 10,
  alpha: Math.random() * 0.6 + 0.4,
  flicker: Math.random() * 0.03 + 0.01,
  color: Math.random() > 0.5 ? 'rgba(0, 200, 255,' : 'rgba(0, 150, 255,'
}));

function draw() {
  ctx.fillStyle = 'rgba(0, 0, 20, 0.2)';
  ctx.fillRect(0, 0, width, height);

  for (let p of particles) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;

    p.alpha += (Math.random() - 0.5) * p.flicker;
    p.alpha = Math.max(0.3, Math.min(1, p.alpha));

    const angle = Math.atan2(p.vy, p.vx);
    const x2 = p.x - Math.cos(angle) * p.length;
    const y2 = p.y - Math.sin(angle) * p.length;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `${p.color} ${p.alpha})`;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 20;
    ctx.shadowColor = `${p.color} 1)`;
    ctx.stroke();
    ctx.restore();
  }

  requestAnimationFrame(draw);
}

draw();
