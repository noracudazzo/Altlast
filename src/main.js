import {hotspots} from "./hotspotData";

const viewport = document.querySelector(".viewport");
const scene = document.querySelector(".scene");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const popupClose = document.getElementById("popup-close");
const assistant = document.getElementById("assistant");
const assistantSpeechbubble = document.getElementById("speechbubble");

let zoomed = false;
let clicked = false;
let popupShown = false;
let assistantShown = false;

let currentNarrative = "Durchsuche zunächst die Küche.";

// Functions

function startHoverHotspot(hotspot) {
  // viewport.classList.add("shake");
  // hotspot.style.filter = "drop-shadow(0 0 3px white)";
  hotspot.style.cursor = "url(/src/assets/imgs/ui/cursor-investigate.png), zoom-in";
}

function endHoverHotspot(hotspot) {  
  viewport.classList.remove("shake");
  // hotspot.style.filter = "unset";
  hotspot.style.cursor = "unset";
}

function zoomTo(hotspot) {
  zoomed = true;
  const id = hotspot.id;
  const config = hotspots[id];
  scene.style.transformOrigin = config.origin;
  scene.style.transform = `scale(${config.scale})`;
}

function zoomOut() {
  zoomed = false;
  scene.style.transform = "scale(1)";
}

async function typeText(el, text, speed = 50) {
  el.textContent = ""; // leeren
  for (let i = 0; i < text.length; i++) {
    el.textContent += text[i];
    await new Promise(r => setTimeout(r, speed));
  }
}

async function showAssistantMessage(comment = null) {
  assistantShown = true;
  assistantSpeechbubble.innerHTML = ""; // reset

  const p = document.createElement("p"); // p erstellen
  assistantSpeechbubble.appendChild(p);

  assistantSpeechbubble.classList.add("visible");
  assistant.classList.add("active");

  if (comment) {
    await typeText(p, comment, 40); // Falls Kommentar vorhanden
  } else {
    await typeText(p, currentNarrative, 40); // Sonst normale Narrative
  }
  setTimeout(() => closeAssistantMessage(), 30000);
}

function closeAssistantMessage() {
  assistantShown = false;
  assistantSpeechbubble.classList.remove("visible");
  assistant.classList.remove("active");
};

async function showPopUp(hotspot) {
  popup.style.transform = "unset";
  popupShown = true;
  const id = hotspot.id;
  const config = hotspots[id];

  // Position setzen
  if (config.textLocation.left != null) { 
    popup.style.left = config.textLocation.left; 
    popup.style.right = "unset"; 
  }
  if (config.textLocation.right != null) { 
    popup.style.right = config.textLocation.right; 
    popup.style.left = "unset"; 
  }
  if (config.textLocation.top != null) { 
    popup.style.top = config.textLocation.top; 
    popup.style.bottom = "unset"; 
  }
  if (config.textLocation.bottom != null) { 
    popup.style.bottom = config.textLocation.bottom; 
    popup.style.top = "unset"; 
  }
  if (popup.style.left === "50%") { 
    popup.style.transform = "translateX(-50%)";
  }

  popupText.innerHTML = ""; // Reset text

  const texts = [];
  for (const key in config.text) { 
    const field = config.text[key];
    const p = document.createElement("p");

    // Titel (zunächst unsichtbar)
    const strong = document.createElement("strong");
    strong.textContent = field.title + ": ";
    strong.style.opacity = 0;   
    p.appendChild(strong);

    // Beschreibung
    const span = document.createElement("span");
    p.appendChild(span);

    popupText.appendChild(p); 

    texts.push({ strong, el: span, text: field.data });
  }

  // Popup einblenden
  setTimeout(() => popup.classList.add("visible"), 10);

  // Typewriter
  for (const { strong, el, text } of texts) {
    if (!popupShown) return; 
    strong.style.opacity = 1; // Titel einblenden
    await new Promise(r => setTimeout(r, 300)); // Fade-Pause
    if (!popupShown) return; 
    await typeText(el, text, 50); // Text tippen
    if (!popupShown) return; 
    await new Promise(r => setTimeout(r, 200)); // Pause zwischen den Zeilen
  }

  if (popupShown && config.comment) {
    showAssistantMessage(config.comment);
  };
}

// Zoom on click

document.querySelectorAll(".hotspot").forEach(hotspot => {
  hotspot.addEventListener("click", () => {
    zoomTo(hotspot);
    showPopUp(hotspot);
    clicked = true;
  }); 
}); 

popupClose.addEventListener("click", () => {
  popup.classList.remove("visible"); 
  zoomOut();
  closeAssistantMessage();
  popupShown = false;
});

assistant.addEventListener("click", () => {
  if (assistantShown === false) { showAssistantMessage(); }
  else { closeAssistantMessage(); }
});

// Hover effects

document.querySelectorAll(".hotspot").forEach(hotspot => {
  hotspot.addEventListener("mouseenter", () => { // Start hover
    if (!zoomed) {
      startHoverHotspot(hotspot)
    }
  });
  hotspot.addEventListener("mouseleave", () => { // End hover
    endHoverHotspot(hotspot);
  });
  hotspot.addEventListener("click", () => { // End hover fallback
    endHoverHotspot(hotspot);
  });
}); 