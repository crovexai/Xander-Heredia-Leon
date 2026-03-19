const redGlow = document.querySelector("#stringLights .glow.red");
const whiteGlow = document.querySelector("#stringLights .glow.white");

if (redGlow && whiteGlow) {
    let state = false;

    setInterval(() => {
        state = !state;

        if (state) {
            redGlow.style.opacity = "1";
            whiteGlow.style.opacity = "0";
        } else {
            redGlow.style.opacity = "0";
            whiteGlow.style.opacity = "1";
        }
    }, 700);
}
