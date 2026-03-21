const BLOCKED = [
  "bigger",
  "enhance",
  "bulge",
  "explicit",
  "sexual",
  "nsfw",
  "nude",
  "naked"
];

// Put your real backend/API values here
const API_URL = "YOUR_API_URL";
const API_KEY = "YOUR_API_KEY";

function isSafe(prompt) {
  const lower = prompt.toLowerCase();
  return !BLOCKED.some((word) => lower.includes(word));
}

function buildPrompt(userPrompt, preset) {
  const cleanPrompt = userPrompt.trim();

  if (preset === "studio") {
    return `A professional studio photoshoot of Xander Heredia-Leon, ${cleanPrompt}, softbox lighting, clean white backdrop, commercial fashion style, ultra realistic, high detail.`;
  }

  if (preset === "beach") {
    return `Xander Heredia-Leon in a beach photoshoot, ${cleanPrompt}, golden hour lighting, luxury lifestyle fashion style, ultra realistic, high detail.`;
  }

  if (preset === "gym") {
    return `Xander Heredia-Leon in a gym fitness photoshoot, ${cleanPrompt}, dramatic lighting, athletic commercial style, ultra realistic, high detail.`;
  }

  return `A professional photoshoot of Xander Heredia-Leon, ${cleanPrompt}, ultra realistic, high detail.`;
}

function showMessage(message, type = "info") {
  const result = document.getElementById("result");
  if (!result) return;

  result.innerHTML = `
    <div class="result-card ${type}">
      <p>${message}</p>
    </div>
  `;
}

function showImage(imageUrl, altText = "Generated image") {
  const result = document.getElementById("result");
  if (!result) return;

  result.innerHTML = `
    <div class="result-card success">
      <img src="${imageUrl}" alt="${altText}">
    </div>
  `;
}

async function generateXander() {
  const promptInput = document.getElementById("prompt");
  const presetInput = document.getElementById("preset");

  if (!promptInput || !presetInput) return;

  const userPrompt = promptInput.value.trim();
  const preset = presetInput.value;

  if (!userPrompt) {
    showMessage("Please enter a prompt first.", "error");
    return;
  }

  if (!isSafe(userPrompt)) {
    showMessage("Please keep prompts professional and modeling-focused.", "error");
    return;
  }

  const finalPrompt = buildPrompt(userPrompt, preset);
  showMessage("Generating image...", "loading");

  if (API_URL === "YOUR_API_URL" || API_KEY === "YOUR_API_KEY") {
    showMessage(
      `Your front end is working, but you still need to add your real API URL and API key in assets/js/main.js. Final prompt preview: ${finalPrompt}`,
      "error"
    );
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        prompt: finalPrompt
      })
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    const imageUrl =
      data.imageUrl ||
      data.image_url ||
      data.url ||
      data.output?.[0] ||
      data.data?.[0]?.url ||
      "";

    if (!imageUrl) {
      console.error("Unexpected API response:", data);
      showMessage("The API responded, but no image URL was found in the response.", "error");
      return;
    }

    showImage(imageUrl);
  } catch (error) {
    console.error(error);
    showMessage(`Error: ${error.message}`, "error");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generate-btn");
  const promptInput = document.getElementById("prompt");

  if (generateBtn) {
    generateBtn.addEventListener("click", generateXander);
  }

  if (promptInput) {
    promptInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        generateXander();
      }
    });
  }
});
