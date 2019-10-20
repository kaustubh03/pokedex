export const disableBodyScrolling = flag => {
  if (flag) {
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    document.getElementsByTagName('html')[0].style.height = '100%';
  } else {
    document.getElementsByTagName('html')[0].style.overflow = 'scroll';
    document.getElementsByTagName('html')[0].style.height = 'auto';
  }
};

export const bodyHack = flag => {
  if (flag) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'visible';
  }
};

export const goToBackScreen = () => {
  try {
    window.history.back();
  } catch (e) {
    // Error handling here
  }
};
