
const root: HTMLElement = document.documentElement as HTMLElement;
let hue: number = parseFloat(getComputedStyle(root).getPropertyValue("--hue")) || 0;

// respect user preference for reduced motion
const prefersReducedMotion: boolean = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  root.style.setProperty("--hue", String(hue));
} else {
  const degreesPerSecond: number = 1; // adjust: lower = slower
  let lastTime: number = performance.now();

  const step = (now: number): void => {
    const dt: number = now - lastTime; // ms since last frame
    lastTime = now;

    hue = (hue + (degreesPerSecond * dt) / 1000) % 360;
    root.style.setProperty("--hue", String(hue));

    requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}