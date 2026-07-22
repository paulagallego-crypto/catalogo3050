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

  const priceRange = document.getElementById('price-range');
  const priceRangeValue = document.getElementById('price-range-value');
  const productCards = document.querySelectorAll('.product-card[data-price]');
  const categorySections = document.querySelectorAll('.category-section');
  const categoryNavBtns = document.querySelectorAll('.category-nav__btn');

  function fmtPrice(n) {
    return '$' + Number(n).toLocaleString('es-AR');
  }

  function applyPriceFilter() {
    const max = Number(priceRange.value);
    priceRangeValue.textContent = fmtPrice(max);
    productCards.forEach((card) => {
      const price = Number(card.dataset.price);
      card.style.display = price <= max ? '' : 'none';
    });

    categorySections.forEach((section) => {
      const hasVisible = Array.from(section.querySelectorAll('.product-card')).some((c) => c.style.display !== 'none');
      section.style.display = hasVisible ? '' : 'none';
      const navBtn = document.querySelector(`.category-nav__btn[href="#${section.id}"]`);
      if (navBtn) navBtn.style.display = hasVisible ? '' : 'none';
    });

    if (priceRange) {
      const min = Number(priceRange.min);
      const total = Number(priceRange.max) - min;
      const percent = total > 0 ? ((max - min) / total) * 100 : 100;
      priceRange.style.background = `linear-gradient(to right, var(--color-primary) ${percent}%, var(--color-card-bg) ${percent}%)`;
    }
  }

  priceRange?.addEventListener('input', applyPriceFilter);
  applyPriceFilter();
});
