import { animate, stagger, svg, utils } from 'animejs';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const arcs = [...document.querySelectorAll('.arc')];
const rings = [...document.querySelectorAll('.ring')];

if (!reduced) {
  animate('.map-layer', {
    opacity: [0, 1],
    duration: 1800,
    delay: stagger(220),
    ease: 'outQuad',
  });

  animate('[data-reveal]', {
    opacity: [0, 1],
    translateY: [16, 0],
    filter: ['blur(6px)', 'blur(0px)'],
    duration: 1100,
    delay: stagger(110, { start: 350 }),
    ease: 'outExpo',
  });

  animate('.dot', {
    opacity: [0, 1],
    duration: 500,
    delay: stagger(60, { start: 1100, from: 'random' }),
    ease: 'outQuad',
  });

  rings.forEach((ring) => {
    animate(ring, {
      scale: [1, window.innerWidth < 640 ? 3.5 : 6],
      opacity: [0, 0.9, 0],
      duration: utils.random(1600, 2400),
      delay: utils.random(1400, 6000),
      loopDelay: utils.random(2500, 9000),
      loop: true,
      ease: 'outCirc',
    });
  });

  animate('.status-dot, .pulse', {
    opacity: [1, 0.15],
    duration: 900,
    alternate: true,
    loop: true,
    ease: 'inOutSine',
  });

  const fire = () => {
    if (!document.hidden) {
      const arc = utils.randomPick(arcs);
      const [line] = svg.createDrawable(arc);
      arc.style.opacity = '0.85';
      animate(line, {
        draw: ['0 0', '0 1', '1 1'],
        duration: utils.random(1800, 2600),
        ease: 'inOutQuad',
        onComplete: () => {
          arc.style.opacity = '0';
        },
      });
    }
    window.setTimeout(fire, utils.random(500, 1300));
  };

  window.setTimeout(fire, 1600);
} else {
  arcs.slice(0, 6).forEach((arc) => {
    arc.style.opacity = '0.35';
  });
}
