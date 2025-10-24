import {hotspots} from "./hotspotData";

const viewport = document.querySelector(".viewport");
const scene = document.querySelector(".scene");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const assistant = document.getElementById("assistant");
const assistantButton = document.querySelector("assistantButton");
const assistantSpeechbubble = document.getElementById("speechbubble");
const activeAssistant = document.querySelector(".activeAssistant");
const activeButton = document.querySelector(".activeButton");


// Cursor Manager
const CURSORS = {
  default: "url(/src/assets/imgs/ui/cursor.png), auto",
  zoomIn: "url(/src/assets/imgs/ui/cursor-zoomin.png), zoom-in",
  zoomOut: "url(/src/assets/imgs/ui/cursor-zoomout.png), zoom-out",
  click: "url(/src/assets/imgs/ui/cursor-click.png), pointer",
};

let zoomed = false;
let popupShown = false;
let assistantShown = false;
let activateableButtonActive = false;
let activateableElementActivated = false;

let currentCursor = "default";
let currentNarrative = "Durchsuche zunächst die Küche.";

// Functions

function setCursor(type) {
  if (currentCursor === type) return; 
  currentCursor = type;
  document.body.style.cursor = CURSORS[type] || CURSORS.default;
}

function startHoverHotspot(hotspot) {
  hotspot.classList.add("hovered");
}

function endHoverHotspot(hotspot) {
  hotspot.classList.remove("hovered");
}

function zoomTo(hotspot) {
  zoomed = true;
  const id = hotspot.id;
  const config = hotspots[id];
  if (!config) return;

  // Zoom transition (Origin & Scale)
  scene.style.transformOrigin = config.origin;
  scene.style.transform = `scale(${config.scale})`;

  // Klasse adden
  hotspot.classList.add("zoomed");

    // Potentiellen Button aktivieren
  const relatedButton = document.getElementById(`${id}Button`);
  
  // Button aktivieren, falls vorhanden
  if (relatedButton) {
    prepareButton(relatedButton, id);
    activateableButtonActive = true;
  }
}

function zoomOut() {

  // Zoom entfernen
  zoomed = false;
  scene.style.transform = "scale(1)";

  document.querySelectorAll(".zoomed").forEach(el => el.classList.remove("zoomed"));
  document.querySelectorAll("[id$='Activated']").forEach(el => {
    deactivateElement(el.id.replace("Activated", ""));
  });

  // Popup schließen
  closePopup();

  // Assistant schließen
  closeAssistantMessage();
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
  assistantSpeechbubble.innerHTML = ""; // Reset von bestehendem Inhalt

  const p = document.createElement("p"); // Paragraph Element erstellen
  assistantSpeechbubble.appendChild(p);

  assistantSpeechbubble.style.display = "block";
  assistant.classList.add("activeAssistant");

  if (comment) { 
    await typeText(p, comment, 40); // Falls Kommentar vorhanden
  } else {
    await typeText(p, currentNarrative, 40); // Sonst normale Narrative
  }
}

function closeAssistantMessage() {
  assistantShown = false;
  assistantSpeechbubble.style.display = "none";
  assistant.classList.remove("activeAssistant");
};

function closePopup() {
  popupShown = false;
  popup.classList.remove("visible"); 
}

async function showPopUp(hotspot) {
  popupShown = true;
  const id = hotspot.id;
  const config = hotspots[id];

  popup.style.transform = "unset"; // Style Reset

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

  popupText.innerHTML = ""; // Text reset

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

function prepareButton(button, parentId) {

  if (!button.classList.contains("activeButton")) {
    button.classList.add("activeButton");
    button.setAttribute("tabindex", "0");

    button.addEventListener("click", () => {
      if (!button.classList.contains("activeButton")) return;
      activateElement(parentId);
    });
  }
}

function activateElement(baseId) {
  const baseElement = document.getElementById(baseId);
  const activatedElement = document.getElementById(baseId + "Activated");

  // alles schließen
  closePopup();
  closeAssistantMessage();
  zoomTo(activatedElement); // an Element ranzoomen

  setTimeout(() => activatedElement.style.display = "block", 800); // aktiviertes Element sichtbar machen
  setTimeout(() => baseElement.style.display = "none", 800); // parent unsichtbar machen
  activatedElement.classList.add("activatedElement");

   // Booleans
  activateableElementActivated = true;

  // Aktiven Button deaktivieren
  const activeButton = document.querySelector(".activeButton");
  activateableButtonActive = false; // Button wird inaktiv wenn Element bereits aktiviert wurde
  if (activeButton) activatedElement.classList.remove("activeButton");
}

function deactivateElement(baseId) {
  const baseElement = document.getElementById(baseId);
  const activatedElement = document.getElementById(baseId + "Activated");

  if (!baseElement || !activatedElement) return;

  // Sichtbar machen
  activatedElement.style.display = "none";
  baseElement.style.display = "block";

  // Booleans
  activateableElementActivated = false;
  activateableButtonActive = false;
}






// Haupt Cursor Logik!

document.addEventListener("mousemove", e => {
  const target = e.target;
  const hotspot = target.closest(".hotspot");

  // Fall 0: Immer fixe UI-Elemente
  if (target.closest(".main-navigation") || target.closest(".assistant .assistantButton")) {
    console.log("Target close to Nav or Assistant");
    setCursor("click");
    return;
  }

  if (target.closest(".speechbubble")) {
    console.log("Target close to Assistant Speechbubble");
    setCursor("default");
    return;
  } 

  // Fall 1: Nicht gezoomt
  if (!zoomed) {
    if (hotspot) setCursor("zoomIn");
    else setCursor("default");
    return;
  }

  // Fall 2: Gezoomt
  if (zoomed && !activateableElementActivated) {

    // Wenn Activation Button vorhanden
    if (target.closest(".activeButton") && activateableButtonActive) {
      setCursor("click");
      return;
    }

    // Wenn über gezoomtem Element oder Popup 
    if (target.closest(".zoomed") || target.closest(".popup")) {
      console.log("Target is zoomed Element or Popup");
      setCursor("default");
      return;
    } 

    setCursor("zoomOut"); // Sonst: Zoom out
    return;
  }

  // Fall 2: Gezoomt und aktiviertes Objekt
  if (zoomed && activateableElementActivated) {

    // Wenn über Element Body oder Popup 
    if (target.closest(".activateableBody") || target.closest(".popup")) {
      console.log("Target is activatedBody");
      setCursor("default");
      return;
    } 

    // Wenn über Objekt
    if (target.closest(".activatedElement .hotspot")) {
      console.log("Target is hotspot");
      setCursor("zoomIn");
      return;
    } 

    setCursor("zoomOut"); // Sonst: Zoom out
    return;
  }

});

// Click & Hover (Hotspots)

document.querySelectorAll(".hotspot").forEach(hs => {
  hs.addEventListener("mouseenter", () => {
    // Nur erlaubt, wenn nicht gezoomt ODER aktivierbares Objekt sichtbar
    if (!zoomed || (zoomed && activateableElementActivated)) startHoverHotspot(hs);
  });

  hs.addEventListener("mouseleave", () => endHoverHotspot(hs));

  hs.addEventListener("click", () => {
    if (!zoomed) {
      zoomTo(hs);
      showPopUp(hs);
    }
  });
});

// Click (Assistant)
assistant.addEventListener("click", () => {
  if (!assistantShown) showAssistantMessage();
  else closeAssistantMessage();
});

// Click (Zoom Out)
document.addEventListener("click", e => {
  if (!zoomed) return;
  console.log("zoomed, zoomout-click listener active");
  if (
    e.target.closest(".main-navigation") || 
    e.target.closest("#popup.popup") ||
    e.target.closest("#assistant .assistantButton") ||
    e.target.closest("#assistant .speechbubble") ||
    e.target.closest(".zoomed") 
  )
  return;
  zoomOut();
});


