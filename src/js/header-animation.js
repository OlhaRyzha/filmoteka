const leftHeaderBgrEl = document.querySelector('.left-bgr');
const rightHeaderBgrEl = document.querySelector('.right-bgr');

if (!leftHeaderBgrEl && !rightHeaderBgrEl) {
  return;
}

window.addEventListener('DOMContentLoaded', showBgr);
window.addEventListener('scroll', moveBgr);

function showBgr(event) {
  setTimeout(() => {
    leftHeaderBgrEl.classList.add('left-bgr--shown');
    rightHeaderBgrEl.classList.add('right-bgr--shown');
  }, 2500);
}

function moveBgr(event) {
  if (window.pageYOffset > 50) {
    leftHeaderBgrEl.classList.remove('left-bgr--shown');
    rightHeaderBgrEl.classList.remove('right-bgr--shown');
  } else {
    leftHeaderBgrEl.classList.add('left-bgr--shown');
    rightHeaderBgrEl.classList.add('right-bgr--shown');
  }
}
