(() => {
  const player = document.querySelector('.story-player');
  if (!player) return;
  const slides = [...player.querySelectorAll('.story-slide')];
  const button = player.querySelector('.story-toggle');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let current = slides.findIndex(slide => slide.classList.contains('is-active'));
  let paused = reducedMotion.matches;
  let timer;
  let visible = false;
  const show = index => slides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === index);
    slide.setAttribute('aria-hidden', String(i !== index));
  });
  const schedule = () => {
    clearInterval(timer);
    button.textContent = paused ? '▶' : 'Ⅱ';
    button.setAttribute('aria-pressed', String(paused));
    button.setAttribute('aria-label', paused ? 'Продолжить смену сторис' : 'Приостановить смену сторис');
    if (!paused && visible && !document.hidden) timer = setInterval(() => {
      current = (current + 1) % slides.length;
      show(current);
    }, 3000);
  };
  show(current);
  button.addEventListener('click', () => { paused = !paused; schedule(); });
  document.addEventListener('visibilitychange', schedule);
  reducedMotion.addEventListener('change', e => { paused = e.matches; schedule(); });
  new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }).observe(player);
})();
