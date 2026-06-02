import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const animateHeroCopy = (timeline: gsap.core.Timeline, position: gsap.Position = '-=0.4') => {
  const lines = gsap.utils.toArray<HTMLElement>('.hero-copy-line');

  lines.forEach((line, index) => {
    const chars = line.querySelectorAll('.hero-copy-char');

    timeline.from(
      chars,
      {
        autoAlpha: 0,
        scaleY: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.1,
      },
      index === 0 ? position : '+=0.06',
    );
  });
};

const initAnimation = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    gsap.set(
      [
        '.header .logo',
        '.header .hamburger',
        '[data-hero-image]',
        '.hero-copy-char',
        '.section-title',
        '.about .text',
        '.menu-item',
        '.info-row',
        '.info-image',
        '.contact .lead',
        '.contact .tel-button',
        '.contact .note',
        '.footer-inner',
      ],
      { clearProps: 'all' },
    );
    return;
  }

  gsap.defaults({
    ease: 'power3.out',
    duration: 0.9,
  });

  const heroTimeline = gsap
    .timeline()
    .from('.header .logo, .header .hamburger', {
      autoAlpha: 0,
      y: -24,
      duration: 0.8,
    })
    .from(
      '[data-hero-image]',
      {
        autoAlpha: 0,
        scale: 1.08,
        duration: 1.6,
        ease: 'power2.out',
      },
      '<0.1',
    );

  animateHeroCopy(heroTimeline, '-=0.2');

  gsap.utils.toArray<HTMLElement>('.section-title').forEach((title) => {
    gsap.from(title, {
      autoAlpha: 0,
      y: 32,
      scrollTrigger: {
        trigger: title,
        start: 'top 82%',
        once: true,
      },
    });
  });

  gsap.from('.about .text', {
    autoAlpha: 0,
    y: 28,
    stagger: 0.18,
    scrollTrigger: {
      trigger: '.about .content',
      start: 'top 78%',
      once: true,
    },
  });

  gsap.utils.toArray<HTMLElement>('.menu-item').forEach((item) => {
    const text = item.querySelector('.menu-text');
    const image = item.querySelector('.menu-image');
    const isReversed = item.matches(':nth-child(even)');

    gsap
      .timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 78%',
          once: true,
        },
      })
      .from(text, {
        autoAlpha: 0,
        x: isReversed ? 40 : -40,
      })
      .from(
        image,
        {
          autoAlpha: 0,
          x: isReversed ? -40 : 40,
          scale: 0.96,
          duration: 1,
        },
        '<0.15',
      );
  });

  gsap.from('.info-row', {
    autoAlpha: 0,
    y: 20,
    stagger: 0.08,
    scrollTrigger: {
      trigger: '.info-table',
      start: 'top 78%',
      once: true,
    },
  });

  gsap.from('.info-image', {
    autoAlpha: 0,
    scale: 0.96,
    scrollTrigger: {
      trigger: '.info-image',
      start: 'top 82%',
      once: true,
    },
  });

  gsap.from(['.contact .lead', '.contact .tel-button', '.contact .note'], {
    autoAlpha: 0,
    y: 28,
    stagger: 0.16,
    scrollTrigger: {
      trigger: '.contact .content',
      start: 'top 80%',
      once: true,
    },
  });

  gsap.from('.footer-inner', {
    autoAlpha: 0,
    y: 24,
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 88%',
      once: true,
    },
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimation);
} else {
  initAnimation();
}
