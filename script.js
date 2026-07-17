document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.carousel').forEach((carousel) => {
    const track = carousel.querySelector('.carousel__track');
    const prevBtn = carousel.querySelector('.carousel__arrow--prev');
    const nextBtn = carousel.querySelector('.carousel__arrow--next');
    if (!track) return;

    const scrollByAmount = () => Math.min(track.clientWidth * 0.8, 600);

    prevBtn?.addEventListener('click', () => {
      track.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' });
    });
    nextBtn?.addEventListener('click', () => {
      track.scrollBy({ left: scrollByAmount(), behavior: 'smooth' });
    });
  });

  const infoToggleBtn = document.querySelector('.info-toggle-btn');
  const infoBox = document.getElementById('limite-info-box');
  infoToggleBtn?.addEventListener('click', () => {
    const isOpen = infoBox.classList.toggle('is-open');
    infoToggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.see-all-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const section = btn.closest('.category-section');
      const grid = section?.querySelector('.category-section__grid');
      if (!grid) return;
      const isOpen = grid.classList.toggle('is-open');
      section.classList.toggle('is-grid-open', isOpen);
      btn.textContent = isOpen ? 'Ver menos' : 'Ver otros productos';
    });
  });
});
