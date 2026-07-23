document.addEventListener('DOMContentLoaded', () => {
  const infoToggleBtn = document.querySelector('.info-toggle-btn');
  const infoBox = document.getElementById('limite-info-box');
  infoToggleBtn?.addEventListener('click', () => {
    const isOpen = infoBox.classList.toggle('is-open');
    infoToggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  const tabBtns = document.querySelectorAll('.mode-tabs__btn');
  const provinceWrap = document.getElementById('province-select-wrap');
  const provinceSelect = document.getElementById('province-select');
  const grids = document.querySelectorAll('.locale-grid-wrap');

  function showGrid(key) {
    grids.forEach((g) => {
      g.classList.toggle('is-visible', g.dataset.gridKey === key);
    });
  }

  function setMode(mode) {
    tabBtns.forEach((b) => b.classList.toggle('is-active', b.dataset.mode === mode));
    if (mode === 'online') {
      provinceWrap.classList.remove('is-visible');
      showGrid('online');
    } else {
      provinceWrap.classList.add('is-visible');
      showGrid('province:' + provinceSelect.value);
    }
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => setMode(btn.dataset.mode));
  });

  provinceSelect.addEventListener('change', () => {
    showGrid('province:' + provinceSelect.value);
  });

  setMode('fisica');
});
