import {hotspots} from "./hotspotData";

const viewport = document.querySelector(".viewport");
const scene = document.querySelector(".scene");
const sceneWrapper = document.querySelector(".scene-wrapper");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const assistant = document.getElementById("assistant");
const assistantButton = document.getElementById("assistantButton");
const assistantSpeechbubble = document.getElementById("speechbubble");
const activeAssistant = document.querySelector(".activeAssistant");
const activeButton = document.querySelector(".activeButton");

let zoomed = false;
let popupShown = false;
let assistantShown = false;
let activateableButtonActive = false;
let activateableElementActivated = false;

let currentRoom = "kitchen";
let currentCursor = "default";
let currentNarrative = "Durchsuche zunächst die Küche.";


// Cursor Manager
const CURSORS = {
  default: "url(/src/assets/imgs/ui/cursor.png), auto",
  zoomIn: "url(/src/assets/imgs/ui/cursor-zoomin.png), zoom-in",
  zoomOut: "url(/src/assets/imgs/ui/cursor-zoomout.png), zoom-out",
  click: "url(/src/assets/imgs/ui/cursor-click.png), pointer",
};


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
  scene.classList.add('glitch');
  setTimeout(() => scene.classList.remove('glitch'), 400);

  endHoverHotspot(hotspot);
  zoomed = true;
  const id = hotspot.id;
  const roomData = hotspots[currentRoom];
  if (!roomData) return;

  const config = roomData[id];
  if (!config) return;

  const sceneWidth = scene.offsetWidth;
  const sceneHeight = scene.offsetHeight;

  // Original-Szene: 3072x5464
  const scaleX = sceneWidth / 5464; 
  const scaleY = sceneHeight / 3072;

  // Pixel-Koordinaten der Zoom-Punkte (in config)
  const originX = config.originX * scaleX;
  const originY = config.originY * scaleY;

  // Zoom Transition
  scene.style.transition = "transform 0.9s cubic-bezier(0.33, 1, 0.68, 1)";
  scene.style.transformOrigin = `${originX}px ${originY}px`;

  requestAnimationFrame(() => {
  scene.style.transform = `scale(${config.scale})`;
  });

  // Zoomed Klasse adden
  hotspot.classList.add("zoomed");

    // Potentiellen Button aktivieren
  const relatedButton = document.getElementById(`${id}Button`);

  if (relatedButton) {
    prepareButton(relatedButton, id);
    activateableButtonActive = true;
  }
}

function zoomOut() {
  zoomed = false;

  scene.style.transition = "transform 0.9s cubic-bezier(0.33, 1, 0.68, 1)";
  requestAnimationFrame(() => {
    scene.style.transform = "scale(1)";
  });

  // Klasse entfernen
  document.querySelectorAll(".zoomed").forEach(el => el.classList.remove("zoomed"));

  // Elemente deaktivieren
  document.querySelectorAll("[id$='Activated']").forEach(el => {
    deactivateElement(el.id.replace("Activated", ""));
    activateableElementActivated = false;
  });
    document.querySelectorAll(".activeButton").forEach(el => {
    el.classList.remove("activeButton");
    activateableButtonActive = false;
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
  const config = hotspots[currentRoom][id];

  if (!config) return;

  const viewportWidth = viewport.offsetWidth;
  const viewportHeight = viewport.offsetHeight;

  // Original-Szene: 3072x5464
  const scaleX = viewportWidth / 5464; 
  const scaleY = viewportHeight / 3072;

  // Position setzen

  // X-Achse
  if (config.textLocation.left === "center" || config.textLocation.right === "center") { 
    console.log("Fall 1");
    const popupWidth = popup.getBoundingClientRect().width;
    const left = (viewportWidth - popupWidth) / 2; 
    popup.style.left = `${left}px`; 
    popup.style.right = "unset"; 
  } 

  else if (typeof config.textLocation.left === "number") { 
    console.log("Fall 2");
    popup.style.left = `${config.textLocation.left * scaleX}px`;
    popup.style.right = "unset"; 
  }

  else if (typeof config.textLocation.right === "number") { 
    console.log("Fall 3");
    popup.style.right = `${config.textLocation.right * scaleX}px`;
    popup.style.left = "unset"; 
  }

  // Y-Achse
  if (config.textLocation.top === "center" || config.textLocation.bottom === "center") { 
    console.log("Fall 4");
    const popupHeight = popup.getBoundingClientRect().height;
    const top = (viewportHeight - popupHeight) / 2; 
    popup.style.top = `${top}px`; 
    popup.style.bottom = "unset"; 
  } 

  else if (typeof config.textLocation.top === "number") { 
    console.log("Fall 5");
    popup.style.top = `${config.textLocation.top * scaleY}px`;
    popup.style.bottom = "unset"; 
  }
  
  else if (typeof config.textLocation.bottom === "number") { 
    console.log("Fall 6");
    popup.style.bottom = `${config.textLocation.bottom * scaleY}px`;
    popup.style.top = "unset"; 
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

  // Element als geklickt vermerken
  config.hasBeenClicked = true;

  // Schauen, ob Raum fertig ist
  if(areAllHotspotsClicked(currentRoom)) {
  } // wichtig, tbd

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
  setTimeout(() => activateableElementActivated = true, 100); // Verzögerung, damit Popup nicht im Klick angezeigt wird
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

function areAllHotspotsClicked(roomId) { // checkt, ob Raum fertig durchsucht ist
  const room = hotspots[roomId];
  if (!room) return false;

  // Alle Hotspots durchgehen und prüfen, ob alle angeklickt wurden
  const clickableHotspots = Object.values(room)
    .filter(item => Object.prototype.hasOwnProperty.call(item, "hasBeenClicked"));

  return clickableHotspots.every(item => item.hasBeenClicked === true);
}



// Haupt Cursor Logik!

document.addEventListener("mousemove", e => {
  const target = e.target;
  const hotspot = target.closest(".hotspot");

  // Fall 0: Immer fixe UI-Elemente
  if (target.closest(".main-navigation") || target.closest(".assistant #assistantButton")) {
    setCursor("click");
    return;
  }

  if (target.closest(".speechbubble")) {
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
      setCursor("default");
      return;
    } 

    // Wenn über Objekt
    if (target.closest(".activatedElement .hotspot")) {
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
    if (!zoomed || (zoomed && activateableElementActivated)) {
      zoomTo(hs);
      showPopUp(hs);
    }
  });
});

// Click (Assistant)
assistantButton.addEventListener("click", () => {
  if (!assistantShown) showAssistantMessage();
  else closeAssistantMessage();
});

// Click (Zoom Out)
document.addEventListener("click", e => {
  if (!zoomed) return;
  if (
    e.target.closest(".main-navigation") || 
    e.target.closest("#popup.popup") ||
    e.target.closest("#assistant #assistantButton") ||
    e.target.closest("#assistant .speechbubble") ||
    e.target.closest(".zoomed") 
  )
  return;
  zoomOut();
});


