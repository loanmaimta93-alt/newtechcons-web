function initGallery() {
  var overlay = document.getElementById('gallery-lightbox');
  if (!overlay) return;
  var imgEl = document.getElementById('gallery-img');
  var captionEl = document.getElementById('gallery-caption');
  var closeBtn = document.getElementById('gallery-close');
  var prevBtn = document.getElementById('gallery-prev');
  var nextBtn = document.getElementById('gallery-next');
  var images = [];
  var idx = 0;
  var name = '';

  function render() {
    imgEl.src = images[idx];
    captionEl.textContent = images.length > 1 ? name + ' — ảnh ' + (idx + 1) + '/' + images.length : name;
    var multi = images.length > 1;
    prevBtn.style.display = multi ? '' : 'none';
    nextBtn.style.display = multi ? '' : 'none';
  }
  function open(imgs, startIndex, altName) {
    images = imgs;
    idx = startIndex || 0;
    name = altName || '';
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    document.body.style.overflow = 'hidden';
    render();
  }
  function close() {
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
    document.body.style.overflow = '';
  }
  function prev() {
    idx = (idx - 1 + images.length) % images.length;
    render();
  }
  function next() {
    idx = (idx + 1) % images.length;
    render();
  }

  document.querySelectorAll('[data-gallery-trigger]').forEach(function (el) {
    el.addEventListener('click', function () {
      var imgs = JSON.parse(el.getAttribute('data-images') || '[]');
      var start = parseInt(el.getAttribute('data-start-index') || '0', 10);
      var altName = el.getAttribute('data-name') || '';
      open(imgs, start, altName);
    });
  });
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });
  document.addEventListener('keydown', function (e) {
    if (overlay.classList.contains('hidden')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  var touchStartX = null;
  overlay.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
  });
  overlay.addEventListener('touchend', function (e) {
    if (touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      dx > 0 ? prev() : next();
    }
    touchStartX = null;
  });
}
initGallery();
