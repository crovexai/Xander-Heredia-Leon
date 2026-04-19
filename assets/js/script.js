document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menuButton");
  const mask = document.getElementById("stringLightMask");
  const nameTag = document.getElementById("nameTag");

  if (menuButton) {
    menuButton.addEventListener("click", function () {
      console.log("Menu clicked");
    });

    menuButton.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        menuButton.click();
      }
    });
  }

  if (!mask) {
    console.error("String light mask not found.");
    return;
  }

  let currentOpacity = 0.72;
  let targetOpacity = 0.72;
  let nextTargetAt = 0;

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function setNextTarget(now) {
    targetOpacity = randomBetween(0.60, 0.88);
    nextTargetAt = now + randomBetween(45, 130);
  }

  function animate(now) {
    if (now >= nextTargetAt) {
      setNextTarget(now);
    }

    currentOpacity += (targetOpacity - currentOpacity) * 0.14;

    const flickerA = Math.sin(now * 0.017) * 0.032;
    const flickerB = Math.sin(now * 0.041 + 1.4) * 0.019;
    const flickerC = Math.sin(now * 0.083 + 0.7) * 0.010;

    let opacity = currentOpacity + flickerA + flickerB + flickerC;

    if (opacity < 0.54) opacity = 0.54;
    if (opacity > 0.94) opacity = 0.94;

    const glowPower = (opacity - 0.54) / 0.40;

    const nearGlow = 3 + glowPower * 3.2;
    const midGlow = 6 + glowPower * 6.5;
    const farGlow = 11 + glowPower * 10.5;
    const brightness = 1.02 + glowPower * 0.15;

    mask.style.opacity = opacity.toFixed(3);
    mask.style.filter =
      "brightness(" + brightness.toFixed(3) + ") " +
      "saturate(1.10) " +
      "drop-shadow(0 0 " + nearGlow.toFixed(2) + "px rgba(255, 244, 214, 0.92)) " +
      "drop-shadow(0 0 " + midGlow.toFixed(2) + "px rgba(255, 210, 120, 0.55)) " +
      "drop-shadow(0 0 " + farGlow.toFixed(2) + "px rgba(255, 170, 70, 0.28))";

    if (nameTag) {
      const shadowPower = (opacity - 0.54) / 0.40;

      const shadowY = 10 + shadowPower * 16;
      const shadowBlur = 14 + shadowPower * 22;
      const shadowAlpha = 0.16 + shadowPower * 0.22;

      nameTag.style.filter =
        "drop-shadow(0 " + shadowY.toFixed(2) + "px " +
        shadowBlur.toFixed(2) + "px rgba(0, 0, 0, " +
        shadowAlpha.toFixed(3) + "))";
    }

    requestAnimationFrame(animate);
  }

  setNextTarget(performance.now());
  requestAnimationFrame(animate);
});

