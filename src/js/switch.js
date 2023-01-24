'use strict';

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const switchInput = document.querySelector('#theme-switch-toggle');
const bodyEl = document.querySelector('body');

// console.log(bodyEl)

switchInput.addEventListener('change', changeTheme);

function changeTheme() {
  bodyEl.classList.toggle(Theme.DARK);
  bodyEl.classList.toggle(Theme.LIGHT);

  getCurrentTheme(bodyEl.classList);
}

function getCurrentTheme(currentTheme) {
  localStorage.setItem('Theme', currentTheme);
}

function actualTheme() {
  const savedTheme = localStorage.getItem('Theme');

  if (savedTheme === Theme.DARK) {
    bodyEl.classList.add(savedTheme);
    switchInput.checked = true;
  } else {
    bodyEl.classList.add(Theme.LIGHT);
  }
}

actualTheme();
