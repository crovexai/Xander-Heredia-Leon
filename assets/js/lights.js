document.addEventListener("DOMContentLoaded", () => {
  const mask = document.querySelector(".string-light-mask");
  const reflection = document.querySelector(".string-light-reflection");
  const greenReact = document.querySelector(".green-wall-react");
  const tagShadow = document.querySelector(".name-tag-shadow");

  if (!mask) return;

  const state = {
    baseBrightness: 1.5,
    baseSepia: 1.0,
    baseSaturate: 2.0,
    baseHue: -18,
    baseBlur: 0.4,
    baseOpacity: 0.9
  };

  function applyMaskStyle({
    brightness,
    sepia,
    saturate,
    hue,
    blur,
    opacity
  }) {
    mask.style.opacity = opacity.toFixed(3);
    mask.style.filter =
      `brightness(${brightness.toFixed(3)}) ` +
      `sepia(${sepia.toFixed(3)}) ` +
      `saturate(${saturate.toFixed(3)}) ` +
      `hue-rotate(${hue.toFixed(3)}deg) ` +
      `blur(${blur.toFixed(3)}px)`;
  }

  function tick() {
    const microFlicker = randomBetween(-0.10, 0.10);
    const rareDip = Math.random() < 0.12 ? randomBetween(-0.16, -0.06) : 0;
    const rarePop = Math.random() < 0.08 ? randomBetween(0.03, 0.08) : 0;

    const brightness = clamp(
      state.baseBrightness + microFlicker + rareDip + rarePop,
      1.2,
      1.75
    );

    const opacity = clamp(
      state.baseOpacity + microFlicker * 0.65 + rareDip * 0.35,
      0.72,
      0.98
    );

    const sepia = clamp(
      state.baseSepia + randomBetween(-0.05, 0.08),
      0.9,
      1.12
    );

    const saturate = clamp(
      state.baseSaturate + randomBetween(-0.15, 0.20),
      1.75,
      2.25
    );

    const hue = clamp(
      state.baseHue + randomBetween(-2.0, 1.5),
      -22,
      -14
    );

    const blur = clamp(
      state.baseBlur + (brightness - state.baseBrightness) * 0.35,
      0.25,
      0.65
    );

    applyMaskStyle({
      brightness,
      sepia,
      saturate,
      hue,
      blur,
      opacity
    });

    if (reflection) {
      const reflectionOpacity = clamp(opacity * 0.20, 0.12, 0.22);
      reflection.style.opacity = reflectionOpacity.toFixed(3);

      const reflectionBlur = clamp(12 + (brightness - 1.4) * 10, 10, 18);
      reflection.style.filter = `blur(${reflectionBlur.toFixed(2)}px) saturate(1.1)`;
    }

    if (greenReact) {
      const reactOpacity = clamp(0.10 + (brightness - 1.3) * 0.08, 0.08, 0.18);
      greenReact.style.opacity = reactOpacity.toFixed(3);
    }

    if (tagShadow) {
      const shadowOpacity = clamp(0.22 + (1.75 - brightness) * 0.18, 0.18, 0.34);
      const shadowBlur = clamp(8 + (1.75 - brightness) * 8, 8, 14);
      const shadowOffset = clamp((1.7 - brightness) * 6, 0, 4);

      tagShadow.style.opacity = shadowOpacity.toFixed(3);
      tagShadow.style.filter = `blur(${shadowBlur.toFixed(2)}px)`;
      tagShadow.style.transform = `translateY(${shadowOffset.toFixed(2)}px)`;
    }

    const nextDelay = randomBetween(120, 320);
    setTimeout(tick, nextDelay);
  }

  applyMaskStyle({
    brightness: state.baseBrightness,
    sepia: state.baseSepia,
    saturate: state.baseSaturate,
    hue: state.baseHue,
    blur: state.baseBlur,
    opacity: state.baseOpacity
  });

  tick();
});

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
