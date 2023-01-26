'use strict';

const btnUp = document.createElement('DIV');

const btnUpMarkup = `<img class="icon-btn-up" src="${new URL(
  '../images/logo.png',
  import.meta.url
)}" />`;

btnUp.classList.add('btn-up');
btnUp.innerHTML = btnUpMarkup + '⇧';

document.body.append(btnUp);

window.addEventListener('scroll', showBtnUp);

function showBtnUp(event) {
  if (window.pageYOffset > 1000) {
    btnUp.classList.add('btn-up--shown');
    btnUp.addEventListener('click', onBtnUpClick);
  } else {
    btnUp.classList.remove('btn-up--shown');
    btnUp.removeEventListener('click', onBtnUpClick);
  }
}

function onBtnUpClick(event) {
  window.scrollTo(0, 0);
}
