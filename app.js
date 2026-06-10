(function() {
  const C = CONFIG;

  /* Names */
  document.getElementById('hero-names').textContent = `${C.casal.nome1} ❤️ ${C.casal.nome2}`;
  document.getElementById('footer-name').textContent = C.casal.nome1;

  /* Music */
  document.getElementById('music-cover').src = C.musica.fotoCasal;
  document.getElementById('spotify-iframe').src =
    `https://open.spotify.com/embed/track/${C.musica.spotifyTrackId}?utm_source=generator&theme=0`;

  /* Counter */
  function updateCounter() {
    const now   = new Date();
    const start = C.dataRelacionamento;
    let anos  = now.getFullYear() - start.getFullYear();
    let meses = now.getMonth()    - start.getMonth();
    let dias  = now.getDate()     - start.getDate();
    if (dias  < 0) { meses--; const prev = new Date(now.getFullYear(), now.getMonth(), 0); dias += prev.getDate(); }
    if (meses < 0) { anos--; meses += 12; }
    const totalSec = Math.floor((now - start) / 1000);
    const horas = Math.floor((totalSec % 86400) / 3600);
    const min   = Math.floor((totalSec % 3600)  / 60);
    const seg   = totalSec % 60;
    const pad   = n => String(n).padStart(2, '0');
    document.getElementById('c-anos').textContent  = pad(anos);
    document.getElementById('c-meses').textContent = pad(meses);
    document.getElementById('c-dias').textContent  = pad(dias);
    document.getElementById('c-horas').textContent = pad(horas);
    document.getElementById('c-min').textContent   = pad(min);
    document.getElementById('c-seg').textContent   = pad(seg);
  }
  updateCounter();
  setInterval(updateCounter, 1000);

  /* Gallery */
  const gallery = document.getElementById('gallery');
  C.fotos.forEach((url, i) => {
    const div = document.createElement('div');
    div.className = 'photo-item';
    div.setAttribute('tabindex', '0');
    div.setAttribute('role', 'button');
    div.setAttribute('aria-label', `Foto ${i+1}`);
    div.innerHTML = `<img src="${url}" alt="Foto ${i+1} do casal" loading="lazy" /><div class="photo-overlay"></div>`;
    div.addEventListener('click', () => openLightbox(i));
    div.addEventListener('keydown', e => { if (e.key === 'Enter') openLightbox(i); });
    gallery.appendChild(div);
  });

  /* Lightbox */
  let lbIndex = 0;
  const lb    = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  function openLightbox(i) { lbIndex = i; lbImg.src = C.fotos[i]; lb.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeLightbox() { lb.classList.remove('open'); document.body.style.overflow = ''; }
  document.getElementById('lb-close').addEventListener('click', closeLightbox);
  document.getElementById('lb-prev').addEventListener('click', () => { lbIndex = (lbIndex - 1 + C.fotos.length) % C.fotos.length; lbImg.src = C.fotos[lbIndex]; });
  document.getElementById('lb-next').addEventListener('click', () => { lbIndex = (lbIndex + 1) % C.fotos.length; lbImg.src = C.fotos[lbIndex]; });
  lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  { lbIndex = (lbIndex - 1 + C.fotos.length) % C.fotos.length; lbImg.src = C.fotos[lbIndex]; }
    if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % C.fotos.length; lbImg.src = C.fotos[lbIndex]; }
  });

  /* Envelope */
  document.getElementById('letter-text').textContent = C.mensagemEspecial;
  let envelopeOpen = false;
  const env = document.getElementById('envelope');
  function toggleEnvelope() {
    if (!envelopeOpen) {
      env.classList.add('shake');
      setTimeout(() => { env.classList.remove('shake'); env.classList.add('open'); env.setAttribute('aria-expanded','true'); envelopeOpen = true; }, 600);
    }
  }
  env.addEventListener('click', toggleEnvelope);
  env.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') toggleEnvelope(); });

  /* Floating Hearts */
  const container = document.getElementById('heartsContainer');
  const heartChars = ['❤️','🩷','💕','💗','💖','💝','🌸'];
  function spawnHeart() {
    const el = document.createElement('div');
    el.className = 'heart';
    el.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    const dur = 10 + Math.random() * 12;
    el.style.animationDuration = dur + 's';
    el.style.animationDelay    = (Math.random() * 4) + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), (dur + 4) * 1000);
  }
  for (let i = 0; i < 18; i++) setTimeout(spawnHeart, i * 600);
  setInterval(spawnHeart, 1800);

  /* Scroll Reveal */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

})();