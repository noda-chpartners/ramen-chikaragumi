import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

const toArray = (selector: string) => gsap.utils.toArray<HTMLElement>(selector);

/**
 * スクロールでフェードインさせる共通関数。
 * - レイアウトを動かさない（opacity のみ）ことでスクロールの引っかかりを防ぐ
 * - 初期状態を gsap.set で先に確定（チラつき防止）
 */
const revealOnScroll = (
  targets: HTMLElement[],
  options: {
    trigger?: Element | null;
    stagger?: number;
    duration?: number;
    start?: string;
  } = {},
) => {
  if (!targets.length) return;

  const {
    trigger = targets[0],
    stagger = 0,
    duration = 0.9,
    start = 'top 85%',
  } = options;

  gsap.set(targets, { autoAlpha: 0 });

  gsap.to(targets, {
    autoAlpha: 1,
    duration,
    stagger,
    ease: 'power2.out',
    scrollTrigger: {
      trigger,
      start,
      once: true,
    },
  });
};

const initAnimation = () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  gsap.defaults({ ease: 'power2.out', duration: 0.9 });

  /* ===== Hero（ファーストビュー・スクロール非依存） ===== */
  const heroTimeline = gsap.timeline();

  heroTimeline
    .from('.header .logo, .header .hamburger', {
      autoAlpha: 0,
      duration: 0.8,
    })
    .from(
      '[data-hero-image]',
      {
        autoAlpha: 0,
        scale: 1.08,
        duration: 1.6,
      },
      '<0.1',
    )
    .from(
      '.hero-copy-line',
      {
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.15,
      },
      '-=0.6',
    );

  /* ===== セクションタイトル ===== */
  toArray('.section-title').forEach((title) => {
    revealOnScroll([title], { trigger: title });
  });

  /* ===== About ===== */
  revealOnScroll(toArray('.about .text'), {
    trigger: document.querySelector('.about .content'),
    stagger: 0.18,
  });

  /* ===== Menu ===== */
  toArray('.menu-item').forEach((item) => {
    const text = item.querySelector<HTMLElement>('.menu-text');
    const image = item.querySelector<HTMLElement>('.menu-image');
    const targets = [text, image].filter((el): el is HTMLElement => el !== null);

    revealOnScroll(targets, {
      trigger: item,
      stagger: 0.15,
    });
  });

  /* ===== Info ===== */
  revealOnScroll(toArray('.info-row'), {
    trigger: document.querySelector('.info-table'),
    stagger: 0.08,
  });

  revealOnScroll(toArray('.info-image'), {
    trigger: document.querySelector('.info-image'),
  });

  /* ===== Contact ===== */
  revealOnScroll(
    toArray('.contact .lead, .contact .tel-button, .contact .note'),
    {
      trigger: document.querySelector('.contact .content'),
      stagger: 0.16,
    },
  );

  /* ===== Footer ===== */
  revealOnScroll(toArray('.footer-inner'), {
    trigger: document.querySelector('.footer'),
    start: 'top 90%',
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimation);
} else {
  initAnimation();
}