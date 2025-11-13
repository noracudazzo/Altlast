import { hotspots } from "./hotspotData";
import { gsap } from "gsap";
import { initParticles, startParticles } from "./effects.js";


const viewport = document.querySelector(".viewport");
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
let activateableButtonsActive = false;
let activateableElementActivated = false;

let currentCursor = "default";

// Rooms
const ROOMS = ["elevator", "hallwayBuilding", "hallway", "kitchen", "livingRoom", "bedroom", "office"];
let currentRoom = ROOMS[3]; 
let lastUnlockedRoom = ROOMS[3]; 
let nextRoomIndex = ROOMS.indexOf(lastUnlockedRoom) + 1;
let nextRoom = ROOMS[nextRoomIndex];
let scene = document.querySelector("." + currentRoom);

let lastUnlockedRoomData = hotspots[currentRoom];
let currentNarrative = lastUnlockedRoomData.narrative;

// Cursor Manager
const CURSORS = {
  default: "url(/src/assets/imgs/ui/cursor.png), auto",
  zoomIn: "url(/src/assets/imgs/ui/cursor-zoomin.png), zoom-in",
  zoomOut: "url(/src/assets/imgs/ui/cursor-zoomout.png), zoom-out",
  click: "url(/src/assets/imgs/ui/cursor-click.png), pointer",
  leave: "url(/src/assets/imgs/ui/cursor-leave.png), s-resize",
};

// Pixi Partikel initialisieren & kontinuierlich erzeugen
initParticles(scene);
startParticles(100); 

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

  // Transform-Origin setzen
  scene.style.transformOrigin = `${originX}px ${originY}px`;

// GSAP Timeline für smoother Blur
  const tl = gsap.timeline();

  // 1️⃣ Zoom + Blur hoch
  tl.to(scene, {
    scale: config.scale,
    filter: "blur(2px)",
    duration: 0.4,
    ease: "power2.inOut"
  });

  // 2️⃣ Blur sanft zurücknehmen
  tl.to(scene, {
    filter: "blur(0px)",
    duration: 0.5,
    ease: "power1.out",
  });

  // Zoomed Klasse adden
  hotspot.classList.add("zoomed");

  // Potentielle Buttons aktivieren WICHTIG
  const relatedButtons = document.querySelectorAll(`.${id}Button`);

  relatedButtons.forEach(button => {
    prepareButton(button, id);
    activateableButtonsActive = true;
  });
}

function deactivateElements() {
  document.querySelectorAll("[id$='Activated']").forEach(el => {
    deactivateElement(el.id.replace("Activated", ""));
    activateableElementActivated = false;
  });
    document.querySelectorAll(".activeButton").forEach(el => {
    el.classList.remove("activeButton");
    activateableButtonsActive = false;
  });
}

function zoomOut() {
  zoomed = false;

  scene.style.transition = "transform 0.9s cubic-bezier(0.33, 1, 0.68, 1)";
  requestAnimationFrame(() => {
    scene.style.transform = "scale(1)";
  });

  // Klasse entfernen
  document.querySelectorAll(".zoomed").forEach(el => el.classList.remove("zoomed"));
}

function resetZoom() {
  zoomOut();

  // Elemente deaktivieren
  deactivateElements();

  // Popup schließen
  closePopup();

  // Assistant schließen
  closeAssistantMessage();

  // Raum Fortschritt prüfen
  if (!scene.classList.contains("intro")) { // nur relevant wenn keine Intro Szene
    canNextRoomBeUnlocked();
  }
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
  setTimeout(() => {
    closeAssistantMessage();
  }, 30000);
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

  const id = hotspot.id;
  const config = hotspots[currentRoom][id];

  if (!config) return;
  // Element direkt als geklickt vermerken
  config.hasBeenClicked = true;

  if (!config.text) return;
  popupShown = true;

  const viewportWidth = viewport.offsetWidth;
  const viewportHeight = viewport.offsetHeight;

  // Original-Szene: 3072x5464
  const scaleX = viewportWidth / 5464; 
  const scaleY = viewportHeight / 3072;

  // Position setzen

  // X-Achse
  if (config.textLocation.left === "center" || config.textLocation.right === "center") { 
    const popupWidth = popup.getBoundingClientRect().width;
    const left = (viewportWidth - popupWidth) / 2; 
    popup.style.left = `${left}px`; 
    popup.style.right = "unset"; 
  } 

  else if (typeof config.textLocation.left === "number") { 
    popup.style.left = `${config.textLocation.left * scaleX}px`;
    popup.style.right = "unset"; 
  }

  else if (typeof config.textLocation.right === "number") { 
    popup.style.right = `${config.textLocation.right * scaleX}px`;
    popup.style.left = "unset"; 
  }

  // Y-Achse
  if (config.textLocation.top === "center" || config.textLocation.bottom === "center") { 
    const popupHeight = popup.getBoundingClientRect().height;
    const top = (viewportHeight - popupHeight) / 2; 
    popup.style.top = `${top}px`; 
    popup.style.bottom = "unset"; 
  } 

  else if (typeof config.textLocation.top === "number") { 
    popup.style.top = `${config.textLocation.top * scaleY}px`;
    popup.style.bottom = "unset"; 
  }
  
  else if (typeof config.textLocation.bottom === "number") { 
    popup.style.bottom = `${config.textLocation.bottom * scaleY}px`;
    popup.style.top = "unset"; 
  }

  popupText.innerHTML = ""; // Text reset

  const texts = [];
  for (const key in config.text) { 
    const field = config.text[key];
    const li = document.createElement("li");
    li.style.opacity = 0;  

    // Titel (zunächst unsichtbar)
    const strong = document.createElement("strong");
    strong.textContent = field.title + ": ";
    strong.style.opacity = 0;   
    li.appendChild(strong);

    // Beschreibung
    const span = document.createElement("span");
    li.appendChild(span);

    popupText.appendChild(li); 

    texts.push({ li, strong, el: span, text: field.data });
  }

  // Popup einblenden
  setTimeout(() => popup.classList.add("visible"), 10);
  await new Promise(r => setTimeout(r, 600));

  // Typewriter
  for (const { li, strong, el, text } of texts) {
    if (!popupShown) return; 

    li.style.transition = "opacity 0.3s ease";
    li.style.opacity = 1;

    strong.style.opacity = 1; // Titel einblenden
    
    await new Promise(r => setTimeout(r, 400 + Math.random() * 200));

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

      // Activation button
      if (button.classList.contains("activeButton") && button.classList.contains("activationButton")) {
        activateElement(parentId);
      }

      // Elevator buttons
      if (!button.classList.contains("controlsButton") && currentRoom === "hallway") return; // tbd hier && currentRoom === "hallway"
      if (button.classList.contains("rightButton")) {
        openElevator(); // aktiviertes Element sichtbar machen 
        unlockRoom(nextRoom);
      } else {
        showAssistantMessage(hotspots.hallway.controls.falseClickMessage);
      }
    });
  }
}

function activateElement(baseId) {
  const baseElement = document.getElementById(baseId);
  const activatedElement = document.getElementById(baseId + "Activated");

  // alles schließen
  closePopup();
  closeAssistantMessage();
  
  // Zoomed Klasse adden
  activatedElement.classList.add("zoomed");

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
  activateableButtonsActive = false;
}

function areAllHotspotsClicked(roomId) { // checkt, ob Raum fertig durchsucht ist
  const room = hotspots[roomId];
  if (!room) return false;

  // Alle Hotspots durchgehen und prüfen, ob alle angeklickt wurden
  const clickableHotspots = Object.values(room)
    .filter(item => Object.prototype.hasOwnProperty.call(item, "hasBeenClicked"));

  return clickableHotspots.every(item => item.hasBeenClicked === true);
}

function canNextRoomBeUnlocked() { 
  if (areAllHotspotsClicked(lastUnlockedRoom)) {

    // Wenn es einen nächsten Raum gibt: freischalten
    if (nextRoom && hotspots[nextRoom]) { 
      unlockRoom(nextRoom);
    } else {
      currentNarrative = `Du hast den letzten Raum abgeschlossen! 🎉`; // tbd, Platzhalter
    }
  }
}

function leaveRoom() {
  scene.classList.remove("leaveHovered");
  setCursor("default"); // Cursor & Hover reset

  scene.style.display = "none"; // hide room

  currentRoom = ROOMS[2]; // change room to hallway
  scene = document.querySelector("." + currentRoom);
  scene.style.display = "block";
  initParticles(scene);
  startParticles(100); 
}

function openElevator() {
  deactivateElements();
  setTimeout(() => zoomOut(), 200);
  setTimeout(() => scene.classList.add("shake"), 1000);
  
  // Door Animation
  const elevatorDoors = document.querySelector(".elevator-doors");
  setTimeout(() => elevatorDoors.classList.add("doorsOpen"), 2000);
}

function unlockRoom(room) { 
  console.log("hi");
  lastUnlockedRoom = ROOMS[nextRoomIndex];
  hotspots[lastUnlockedRoom].isUnlocked = true;
  currentNarrative = hotspots[lastUnlockedRoom].startNarrative;
  showAssistantMessage(currentNarrative);
  currentNarrative = hotspots[lastUnlockedRoom].narrative;
}


// Haupt Cursor Logik!

document.addEventListener("mousemove", e => {
  const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
  const threshold = window.innerHeight * 0.9;

  // Fall 0.5: Leave-Zone check
  if (e.clientY > threshold && hoveredElement && !hoveredElement.closest("#main-navigation") && hotspots[currentRoom].canBeLeft) {
    scene.classList.add("leaveHovered");
    setCursor("leave");
    return; 
  } else {
    scene.classList.remove("leaveHovered");
  }

  const target = e.target;
  const hotspot = target.closest(".hotspot");

  // Fall 0: Immer fixe UI-Elemente
  if (target.closest("#main-navigation") || target.closest(".assistant #assistantButton")) {
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
    if (target.closest(".activeButton") && activateableButtonsActive) {
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
      setCursor("click");
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
    else if (zoomed && activateableElementActivated) {
      showPopUp(hs);
    }
  });
});


// Click (Assistant)
assistantButton.addEventListener("click", () => {
  if (!assistantShown) showAssistantMessage();
  else closeAssistantMessage();
});

// Click (Leave)

document.addEventListener("click", (e) => {
  if (!hotspots[currentRoom].canBeLeft) return;
  const threshold = window.innerHeight * 0.9;
  if (e.clientY > threshold) {
    leaveRoom();
  }
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
  resetZoom();
});
