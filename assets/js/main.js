const BLOCKED = [
  "bigger", "enhance", "bulge", "explicit",
  "sexual", "nsfw", "nude", "naked"
];

function isSafe(prompt) {
  const lower = prompt.toLowerCase();
  return !BLOCKED.some(word => lower.includes(word));
}

async function generateXander() {
  const userPrompt = document.getElementById("prompt").value;
  const preset = document.getElementById("preset").value;

  if (!isSafe(userPrompt)) {
    alert("Please keep prompts professional and modeling‑focused.");
    return;
  }

  let finalPrompt = "";

  if (preset === "studio") {
    finalPrompt = `a professional studio photoshoot of <xndr>, ${userPrompt}, softbox lighting, clean white backdrop, commercial fashion style`;
  } else if (preset === "beach") {
    finalPrompt = `<xndr> in a beach photoshoot, ${userPrompt}, golden hour lighting, lifestyle fashion style`;
  } else if (preset === "gym") {
    finalPrompt = `<xndr> in a gym fitness underwear shoot, ${userPrompt}, dramatic lighting, athletic commercial style`;
  } else {
    finalPrompt = `<xndr>, ${userPrompt}`;
  }

  // TODO: Replace YOUR_API_URL and YOUR_API_KEY
  const response = await fetch("YOUR_API_URL", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY"
    },
    body: JSON.stringify({
      prompt: finalPrompt
    })
  });

  const data = await response.json();

  document.getElementById("result").innerHTML =
    `<img src="${data.image}" alt="Generated Xander Image">`;
}
