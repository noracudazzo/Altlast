import {hotspots} from "./hotspotData";

const viewport = document.querySelector(".viewport");
const scene = document.querySelector(".scene");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
// const popupClose = document.getElementById("popup-close");
const assistant = document.getElementById("assistant");
const assistantSpeechbubble = document.getElementById("speechbubble");

let zoomed = false;
let clicked = false;
let popupShown = false;
let assistantShown = false;
let relatedButtonActivated = false;
let activateableElementShown = false;

let currentNarrative = "Durchsuche zunächst die Küche.";

// Functions

function startHoverHotspot(hotspot) {
  // viewport.classList.add("shake");
  hotspot.style.filter = "drop-shadow(0 0 6px white)";
  hotspot.style.cursor = "url(/src/assets/imgs/ui/cursor-investigate.png), zoom-in";
}

function endHoverHotspot(hotspot) {  
  viewport.classList.remove("shake");
  hotspot.style.filter = "unset";
  hotspot.style.cursor = "unset";
}

function zoomTo(hotspot) {
  console.log(hotspot);
  zoomed = true;
  const id = hotspot.id;
  const config = hotspots[id];
  console.log(config);
  scene.style.transformOrigin = config.origin;
  scene.style.transform = `scale(${config.scale})`;
  hotspot.classList.add("zoomed");
}

function zoomOut() {
  zoomed = false;
  scene.style.transform = "scale(1)";
  const zoomedElement = document.querySelector(".zoomed");
  if (zoomedElement) zoomedElement.classList.remove("zoomed");
  relatedButtonActivated = false;

  // potentiell aktivierte Elemente deaktivieren
  const activeElements = document.querySelectorAll("[id$='Activated']");
  activeElements.forEach(el => {
    const baseId = el.id.replace("Activated", "");
    deactivateElement(baseId);
  });
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

function closePopup() {
  popup.classList.remove("visible"); 
  popupShown = false;
}

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

  // Potentiellen Button aktivieren
  const relatedButton = document.getElementById(`${id}Button`);
  
  if (relatedButton) {
    prepareButton(relatedButton, id);
    relatedButtonActivated = true;
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

function prepareButton(button, parentId) {
  button.classList.add("active");
  button.setAttribute("tabindex", "0");

  button.addEventListener("click", () => {
    if (!button.classList.contains("active")) return;
    activateElement(parentId);
  });
}

function activateElement(baseId) {

  const baseElement = document.getElementById(baseId);
  const activatedElement = document.getElementById(baseId + "Activated");

  closePopup();
  closeAssistantMessage();
  zoomTo(activatedElement);

  // Sichtbar machen
  baseElement.style.display = "none";
  activatedElement.style.display = "block";

   // Booleans
  activateableElementShown = true;
  relatedButtonActivated = true;
}

function deactivateElement(baseId) {
  const baseElement = document.getElementById(baseId);
  const activatedElement = document.getElementById(baseId + "Activated");

  if (!baseElement || !activatedElement) return;

  // Sichtbar machen
  activatedElement.style.display = "none";
  baseElement.style.display = "block";

  // Booleans
  activateableElementShown = false;
  relatedButtonActivated = false;
}


function isInsideZoomArea(e, buffer = 30) { // Ist Maus innerhalb des Elements (+ Buffer)?
  const zoomedElement = document.querySelector(".zoomed");
  if (!zoomedElement) return false;

  const rect = zoomedElement.getBoundingClientRect();
  return (
    e.clientX >= rect.left - buffer &&
    e.clientX <= rect.right + buffer &&
    e.clientY >= rect.top - buffer &&
    e.clientY <= rect.bottom + buffer
  );
}

function isClickIgnored(e) {
  if (!e.target) return false;

  // Liste von Selektoren, die Klicks auslösen dürfen
  const ignoreSelectors = [
    '.activationButton', '.navigation', '.button', '.popup',
  ];

  // wenn der Klick in einem dieser Elemente liegt -> ignorieren
  for (const sel of ignoreSelectors) {
    if (e.target.closest(sel)) return true;
  }

  return false;
}


// Zoom on click

document.querySelectorAll(".hotspot").forEach(hotspot => {
  hotspot.addEventListener("click", () => {
    if (zoomed) return; 
    zoomTo(hotspot);
    showPopUp(hotspot);
    clicked = true;
  }); 
}); 

/* .addEventListener("click", () => {
  zoomOut();
  closeAssistantMessage();
  closePopup();
}); */

assistant.addEventListener("click", () => {
  if (assistantShown === false) { showAssistantMessage(); }
  else { closeAssistantMessage(); }
});

document.addEventListener("click", (e) => {
  if (!zoomed) return;

  if (isInsideZoomArea(e)) return; // Falls Klick im Hotspot Bereich
  if (isClickIgnored(e)) return; // Falls Klick auf Elemente, die ausgenommen sind (popup, Nav, Buttons, ...)

  // Ansonsten: Rauszoomen
  zoomOut();
  closeAssistantMessage();
  closePopup();
});


// Hover effects

document.querySelectorAll(".hotspot").forEach(hotspot => { // Hover glow Element
  hotspot.addEventListener("mouseenter", () => { // Start hover
    if (!zoomed || activateableElementShown) {
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

document.addEventListener("mousemove", (e) => { // Zoom out
  if (!zoomed) return;

  const popup = document.getElementById("popup");
  const overPopup = popup && popup.contains(e.target);

  if (!isInsideZoomArea(e) && !overPopup) {
    document.body.style.cursor = "url(/src/assets/imgs/ui/cursor-zoom-out.png), zoom-out";
  } else {
    document.body.style.cursor = "";
  }
});