export const EASE = [0.16, 1, 0.3, 1];

export const DURATION = { fast: 0.35, base: 0.55, slow: 0.8 };

const OFFSET = 26;

export const revealVariants = {
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  up: { hidden: { opacity: 0, y: OFFSET }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: OFFSET }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -OFFSET }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.96 }, visible: { opacity: 1, scale: 1 } },
};

export function staggerContainer(stagger = 0.08, delayChildren = 0) {
  return { hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren } } };
}
