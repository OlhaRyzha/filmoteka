'use strict';

(() => {
  const refs = {
    openCardInfoEl: document.querySelector('.film-card__list.film-card__list'),
    closeCardInfoEl: document.querySelector('[data-modal-close-card]'),
    modalCardInfo: document.querySelector('[data-modal-card]'),
    body: document.querySelector('body'),
  };

  const onOpenCardInfoElClick = event => {
    if (event.target.nodeName !== 'UL') {
      refs.modalCardInfo.classList.remove('is-hidden');
      refs.body.classList.add('no-scroll');
      document.addEventListener('keydown', onEscKeyBtnPress);
    }
  };

  const onCloseCardInfoElClick = () => {
    refs.modalCardInfo.classList.add('is-hidden');
    refs.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', onEscKeyBtnPress);
  };

  const onEscKeyBtnPress = event => {
    if (event.code === 'Escape') {
      onCloseCardInfoElClick();
    }
  };

  const onModalCardInfoClick = event => {
    const { target, currentTarget } = event;

    if (target !== currentTarget) {
      return;
    }

    onCloseCardInfoElClick();
  };

  refs.openCardInfoEl.addEventListener('click', onOpenCardInfoElClick);
  refs.closeCardInfoEl.addEventListener('click', onCloseCardInfoElClick);
  refs.modalCardInfo.addEventListener('click', onModalCardInfoClick);
})();
