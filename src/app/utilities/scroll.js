export const blockBodyScroll = () => {
  document.querySelector('body').classList.add('scroll-blocked');
};

export const allowBodyScroll = () => {
  document.querySelector('body').classList.remove('scroll-blocked');
};
