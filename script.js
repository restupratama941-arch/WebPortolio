/* ===== 1. Efek teks mengetik di Beranda ===== */
const roles = ['Web Developer pemula', 'Mahasiswa Sistem Informasi', 'Tech Enthusiast'];
const typedEl = document.getElementById('typed');
let roleIdx = 0, charIdx = 0, deleting = false;

function type() {
  const word = roles[roleIdx];
  typedEl.textContent = word.slice(0, charIdx);
  if (!deleting && charIdx === word.length) { deleting = true; return setTimeout(type, 1400); }
  if (deleting && charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; }
  charIdx += deleting ? -1 : 1;
  setTimeout(type, deleting ? 40 : 90);
}
type();

/* ===== 2. Navbar: bayangan saat scroll & menu aktif ===== */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section');
const toTop = document.getElementById('toTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  toTop.classList.toggle('show', window.scrollY > 400);
  let current = 'home';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
});
toTop.addEventListener('click', () => window.scrollTo({ top: 0 }));

// Tutup menu mobile setelah link diklik
document.querySelectorAll('#menu .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('menu');
    if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });
});

/* ===== 3. Bar kemampuan: animasi saat terlihat ===== */
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target.querySelector('.skill-fill');
      fill.style.width = entry.target.dataset.level + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.skill').forEach(s => skillObserver.observe(s));

/* ===== 4. Filter proyek ===== */
const filterBtns = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    projects.forEach(p => {
      const show = btn.dataset.filter === 'all' || p.dataset.cat === btn.dataset.filter;
      p.classList.toggle('hide', !show);
    });
  });
});

/* ===== 5. Validasi formulir kontak ===== */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

function check(id, errId, message, test) {
  const input = document.getElementById(id);
  const valid = test(input.value.trim());
  input.classList.toggle('invalid', !valid);
  document.getElementById(errId).textContent = valid ? '' : message;
  return valid;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const ok = [
    check('name', 'errName', 'Nama wajib diisi.', v => v.length > 0),
    check('email', 'errEmail', 'Masukkan email yang valid.', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)),
    check('message', 'errMessage', 'Pesan minimal 10 karakter.', v => v.length >= 10)
  ].every(Boolean);

  status.className = 'mt-3';
  if (ok) {
    status.textContent = 'Pesan terkirim. Terima kasih!';
    status.classList.add('ok');
    form.reset();
  } else {
    status.textContent = '';
  }
});

/* ===== 6. Tahun otomatis di footer ===== */
document.getElementById('year').textContent = new Date().getFullYear();