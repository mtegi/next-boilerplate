import gsap from 'gsap';

export const textIntro = elem => {
  gsap.from(elem, {
    duration: 0.5,
    opacity: 0,
    ease: 'power4.in',
  });
};
