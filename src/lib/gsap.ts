import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Fade/slide al entrar en viewport — mismo `start` en Hero, Propuesta, etc.
 *  Con `prefers-reduced-motion` no anima: el contenido queda en su estado final. */
export function revealOnScroll(
  targets: gsap.TweenTarget,
  vars: gsap.TweenVars = {},
) {
  if (prefersReducedMotion()) return;

  const { scrollTrigger, ...rest } = vars;
  return gsap.from(targets, {
    ease: "power2.out",
    ...rest,
    scrollTrigger: {
      start: "top 70%",
      ...(typeof scrollTrigger === "object" ? scrollTrigger : {}),
    },
  });
}

export const breakpoints = {
  isMobile: "(max-width: 767px)",
  isDesktop: "(min-width: 768px)",
};

export const mm = gsap.matchMedia();
