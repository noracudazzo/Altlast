import { data } from "./data";
import { gsap } from "gsap";


const viewport = document.querySelector(".viewport");
const start = document.querySelector(".start");
const continueButton = document.querySelector(".continue-button");
const newGameButton = document.querySelector(".new-game-button");
const optionsButtonStart = document.querySelector(".start-options-button");
const creditsButton = document.querySelector(".credits-button");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const assistant = document.getElementById("assistant");
const assistantButton = document.getElementById("assistantButton");
const assistantSpeechbubble = document.getElementById("speechbubble");
const homeButton = document.querySelector(".home-button");
const optionsButton = document.querySelector(".options-button");
const roomName = document.querySelector(".room-name p");
const elevatorControls = document.getElementById("controls");
const elevatorDoors = document.querySelector(".elevator-doors");
const entrance = document.querySelector(".entrance");

let zoomed = false;
let popupShown = false;
let assistantShown = false;
let assistantActive = false;
let activateableButtonsActive = false;
let activateableElementActivated = false;
let gameStarted = false;

// Rooms
const ROOMS = ["elevator", "hallway", "kitchen", "livingRoom", "bedroom", "office"];
let currentRoom = ROOMS[0]; 
let lastUnlockedRoom = ROOMS[0]; 
let nextRoomIndex = 1;
let nextRoom = ROOMS[nextRoomIndex];
let scene = document.querySelector("." + currentRoom);

let worldState = extractStateFromData(data);

let lastUnlockedRoomData = data[currentRoom];
let currentNarrative = lastUnlockedRoomData.narrative;
let lastAssistantMessage = currentNarrative;
let typingController = { skip: false };

// Audio
const clickSfx = new Audio(`/sounds/effects/220166__gameaudio__button-confirm-spacey.wav`);
const zoomInSfx = new Audio(`/sounds/effects/220171__gameaudio__flourish-spacey-1.wav`);
const zoomOutSfx = new Audio(`/sounds/effects/812687__audiopapkin__sound-design-elements-whoosh-sfx-050.wav`);
const assistantSfx = new Audio(`/sounds/effects/220202__gameaudio__teleport-casual_shortened.wav`);
const unlockedSfx = new Audio(`/sounds/effects/524202__department64__d64-samplepack-fx-powerup-37.wav`); 
const errorSfx = new Audio(`/sounds/effects/176238__melissapons__sci-fi_short_error.wav`);
const bleepSfx = new Audio(`/sounds/effects/263133__mossy4__tone-beep.wav`);
const typeSfx = new Audio(`/sounds/effects/738440__chris112233__key-clack1.wav`);

unlockedSfx.volume = 0.5;
bleepSfx.volume = 0.4;
typeSfx.volume = 0.3;
zoomOutSfx.volume = 0.5;

let currentMusic = undefined; 
// tbd currentMusic.loop = true; 

let currentCursor = "default";

// Settings
let musicOn = false;
let soundEffectsOn = false;

// Cursor Manager
const CURSORS = {
  default: "url(/src/assets/imgs/ui/cursor.png), auto",
  zoomIn: "url(/src/assets/imgs/ui/cursor-zoomin.png), zoom-in",
  zoomOut: "url(/src/assets/imgs/ui/cursor-zoomout.png), zoom-out",
  click: "url(/src/assets/imgs/ui/cursor-click.png), pointer",
  leave: "url(/src/assets/imgs/ui/cursor-leave.png), s-resize",
};

// Save game

function saveGame() {
  const state = {
    gameStarted,
    currentRoom,
    lastUnlockedRoom,
    nextRoomIndex,
    worldState
  };

  localStorage.setItem("gameState", JSON.stringify(state));
  console.log("Game saved!");
}

function loadGame() {
  const saved = localStorage.getItem("gameState");
  return saved ? JSON.parse(saved) : null;
}

function extractStateFromData(data) {
  const state = {};

  for (const [room, roomData] of Object.entries(data)) {
    state[room] = {
      isUnlocked: roomData.isUnlocked,
      hasBeenEntered: roomData.hasBeenEntered,
    };

    for (const [key, value] of Object.entries(roomData)) {
      if (value && typeof value === "object" && "hasBeenClicked" in value) {
        state[room][key] = { hasBeenClicked: value.hasBeenClicked };
      }
    }
  }
  return state;
}

function applyWorldStateToData(worldState) {
  for (const [room, roomState] of Object.entries(worldState)) {
    data[room].isUnlocked = roomState.isUnlocked;
    data[room].hasBeenEntered = roomState.hasBeenEntered;

    for (const [key, value] of Object.entries(roomState)) {
      if (key !== "isUnlocked" && key !== "hasBeenEntered") {
        if (data[room][key] && typeof data[room][key] === "object") {
          Object.assign(data[room][key], value);
        }
      }
    }
  }
}

function initGame() {
  if (gameStarted) {
    changeRoom(currentRoom);
  } else {
    changeRoom("elevator");
    continueButton.classList.add("hidden");
  }
}


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
  const roomData = data[currentRoom];
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

  // Audio
  setTimeout(() => zoomInSfx.play(), 200);

// GSAP Timeline für smoother Blur
  const tl = gsap.timeline();

  tl.to(scene, {
    scale: config.scale,
    // filter: "blur(2px)",
    duration: 0.4,
    ease: "power2.inOut"
  });

  tl.to(scene, {
    // filter: "blur(0px)",
    duration: 0.5,
    ease: "power1.out",
  });

  // Zoomed Klasse adden
  hotspot.classList.add("zoomed");

  // Potentielle Buttons aktivieren WICHTIG
  const relatedButtons = document.querySelectorAll(`.${id}Button`);

  relatedButtons.forEach(button => {
    setTimeout(() => prepareButton(button, id), 500);
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
  if(activateableElementActivated) {
    deactivateElements();
  }

  // Popup schließen
  if (popupShown) {
    closePopup();
  }

  // Assistant schließen
  if (assistantShown) {
    closeAssistantMessage();
  }

  // Raum Fortschritt prüfen
  if (!scene.classList.contains("intro")) { // nur relevant wenn keine Intro Szene
    canNextRoomBeUnlocked();
  }
} 

async function typeText(el, text, speed = 85, isSpeaking, textIsAltlast) {
  // el.textContent = ""; // leeren
  typingController.skip = false;

  for (let i = 0; i < text.length; i++) {

    // Bei Skip sofort ganzen Satz anzeigen
    if (typingController.skip) {
      el.textContent = text;
      return;
    }

    el.textContent += text[i];

    if(!isSpeaking) {
      if (text[i] !== " ") {   // keine Sounds bei Leerzeichen
        typeSfx.play();
        typeSfx.currentTime = 0;
      }
    }

    if(textIsAltlast) console.log(text);
    await new Promise(r => setTimeout(r, speed));
  }
}

function speakTextRobot(text) {
    const utterance = new SpeechSynthesisUtterance(text);

    // Roboter-Effekt
    utterance.rate = 1.1;   // langsamer → mechanisch

    speechSynthesis.speak(utterance);
}

async function showAssistantMessage(comment = null) { 
  assistantActive = true;
  assistantSfx.play();

  if (comment === lastAssistantMessage && assistantShown) {
    assistantSpeechbubble.classList.remove("hidden");
    assistant.classList.add("activeAssistant");
    return;
  }

  assistantShown = true;
  assistantSpeechbubble.innerHTML = "";

  const source = comment ?? currentNarrative;
  const texts = Array.isArray(source) ? source : [source];
  if (texts.length > 1) deactivateClick();

  lastAssistantMessage = source;

  assistantSpeechbubble.classList.remove("hidden");
  assistant.classList.add("activeAssistant");

  async function showIndex(i) {

    // Bubble leeren und neues <p> erzeugen
    assistantSpeechbubble.innerHTML = "";
    const p = document.createElement("p");
    assistantSpeechbubble.appendChild(p);

    const text = texts[i];
    let fullyShown = false;

    // Skip Steuerung
    p.onclick = () => {
      if (!fullyShown) {
        // Wenn noch tippt: sofort fertig anzeigen
        typingController.skip = true;
      } else {
        // Wenn fertig: weiter
        p.onclick = null;
        showIndex(i + 1);
      }

      assistantActive = true; // Timer zurücksetzen
    };


    speakTextRobot(text); // Sprachausgabe
    await typeText(p, text, 40, true, false);

    // Wenn weitere Texte folgen
    if (i < texts.length - 1) {
      p.classList.add("clickNextMessage");
      p.onclick = () => {
        p.onclick = null;
        showIndex(i + 1);
      };
    }

    if (currentRoom === "elevator" && i === 4) {
      const elevatorHotspots = document.querySelectorAll(".elevator .hotspot");
      elevatorHotspots.forEach(hs => {
        hs.style
        hs.classList.add("glow");
        setTimeout(() => { hs.classList.remove("glow"); }, 8000);
      });
    }

    // Wenn letzter Text — Auto-Close nach 30 Sek starten
    if (i === texts.length - 1) {
      p.classList.add("lastMessage");
      activateClick();
      assistantActive = false;

//      setTimeout(() => { zu verbuggt, tbd
//        if (!assistantActive) {
//          closeAssistantMessage();
//        }
//      }, 30000);
    }
  }

  await showIndex(0);
}

function closeAssistantMessage() {
  assistantActive = false;
  assistantShown = false;
  assistantSpeechbubble.classList.add("hidden");
  speechSynthesis.cancel();
  assistant.classList.remove("activeAssistant");
  speechSynthesis.cancel();
};

function closePopup() {
  popupShown = false;
  popup.classList.remove("visible"); 
}

async function showPopUp(hotspot) {

  const id = hotspot.id;
  const config = data[currentRoom][id];

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

    const strong = document.createElement("strong");

    // auf Altlast prüfen
    if (config.isAltlast && key === "year") {
      strong.classList.add("altlastIdentified");
    }

    // Titel (zunächst unsichtbar)
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
 

  // Typewriter
  for (const { li, strong, el, text } of texts) {
    if (!popupShown) return; 

    li.style.transition = "opacity 0.3s ease";
    li.style.opacity = 1;

    strong.style.opacity = 1; // Titel einblenden

    // falls Altlast
    if(strong.classList.contains("altlastIdentified")) {
      popup.classList.add("altlastIdentified"); 
    }
  
    bleepSfx.play();
    
    await new Promise(r => setTimeout(r, 400 + Math.random() * 200));

    if (!popupShown) return; 
    if(strong.classList.contains("altlastIdentified")) {
      await typeText(el, text, 50, false, true); // Text tippen
    } else {
      await typeText(el, text, 50, false, false); // Text tippen
    }

    //tbd hier weitermachen

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
        closePopup();
        closeAssistantMessage();
        clickSfx.play();
      }

      // Elevator buttons
      if (button.classList.contains("controlsButton") && currentRoom === "elevator") {

        const controlButtonBackground = button.querySelector(".controls-button-background");
        controlButtonBackground.classList.add("clicked");
        setTimeout(() => controlButtonBackground.classList.remove("clicked"), 300);
        setTimeout(() => controlButtonBackground.classList.add("unclicked"), 300);

        if (button.classList.contains("rightButton")) {
          clickSfx.play();
          setTimeout(() => {
            elevatorControls.classList.remove("hotspot");
            elevatorControls.classList.add("background");
            resetZoom();
            openElevator(); 
            unlockRoom(nextRoom);
            unlockRoom(nextRoom);
          }, 300);
        } else {
          errorSfx.play();
          showAssistantMessage(data.elevator.controls.falseClickMessage);
        }
      }
    });
  }
}

function activateElement(baseId) {
  const baseElement = document.getElementById(baseId);
  const activatedElement = document.getElementById(baseId + "Activated");
  
  // Zoomed Klasse adden
  activatedElement.classList.add("zoomed");

  fadeOutFast()
  setTimeout(() => {
    fadeInFast();
    activatedElement.classList.remove("hidden"); // aktiviertes Element sichtbar machen 
    activatedElement.classList.add("activatedElement");
    baseElement.classList.add("hidden");
  }, 400); 

   // Booleans
  setTimeout(() => activateableElementActivated = true, 100); // Verzögerung, damit Popup nicht im Klick angezeigt wird
}

function deactivateElement(baseId) {
  const baseElement = document.getElementById(baseId);
  const activatedElement = document.getElementById(baseId + "Activated");

  if (!baseElement || !activatedElement) return;

  // Sichtbar machen
  activatedElement.classList.add("hidden");
  baseElement.classList.remove("hidden");

  // Booleans
  activateableElementActivated = false;
  activateableButtonsActive = false;
}

function areAllHotspotsClicked(roomId) { // checkt, ob Raum fertig durchsucht ist
  const room = data[roomId];
  if (!room) return false;

  // Alle Hotspots durchgehen und prüfen, ob alle angeklickt wurden
  const clickableHotspots = Object.values(room)
    .filter(item => Object.prototype.hasOwnProperty.call(item, "hasBeenClicked"));

  return clickableHotspots.every(item => item.hasBeenClicked === true);
}

function canNextRoomBeUnlocked() { 
  if (areAllHotspotsClicked(lastUnlockedRoom)) {

    // Wenn es einen nächsten Raum gibt: freischalten
    if (nextRoom && data[nextRoom]) { 
      unlockRoom(nextRoom);
      showAssistantMessage(data[lastUnlockedRoom].startNarrative);
    } else {
      currentNarrative = `Du hast den letzten Raum abgeschlossen! 🎉`; // tbd, Platzhalter
    }
  }
}

function changeRoom(room) {
  if (scene.classList.contains("leaveHovered")) scene.classList.remove("leaveHovered"); // tbd, klappt das? Hover reset
  setCursor("default"); // Cursor reset
  scene.classList.add("hidden");
  console.log("room changed");

  currentRoom = room; 
  roomName.textContent = data[currentRoom].displayName;

  scene = document.querySelector("." + currentRoom);
  scene.classList.remove("hidden");
  playMusic(currentRoom);

  const config = data[currentRoom];
  const currentStartNarrative = config.startNarrative;
  
  // Start-Narrative nur einmal abspielen

  if (!config.hasBeenEntered) { 
    unlockedSfx.play();
    if (currentStartNarrative) showAssistantMessage(currentStartNarrative);
    config.hasBeenEntered = true;
  };

  // speichern
  worldState = extractStateFromData(data);

  saveGame({
    gameStarted,
    currentRoom,
    lastUnlockedRoom,
    nextRoomIndex,
    worldState
  });
}

function playMusic(room) {
  const musicFile = data[room]?.music;
  if (!musicFile) return; // Abbruch falls keine Datei existiert

  // Aktuelle Musik stoppen, falls nötig
  if (currentMusic) {
    currentMusic.pause();
    currentMusic.currentTime = 0;
  }

  // Neue Musik starten
  currentMusic = new Audio(`/sounds/music/${musicFile}`);
  currentMusic.play();
  currentMusic.volume = 0.05;
}

function stopMusic(music) {
    music.pause();
}

function fadeInSlow() {
  viewport.classList.add("slow-fading");
  viewport.classList.remove("invisible");
  setTimeout(() => {
    viewport.classList.remove("slow-fading");
  }, 2000); 
}

function fadeOutFast() {
  viewport.classList.add("fast-fading");
  viewport.classList.add("invisible");
}

function fadeInFast() {
  viewport.classList.remove("invisible");
    setTimeout(() => {
    viewport.classList.remove("slow-fading");
  }, 500);  
}

function startGame() {

  if (localStorage.getItem("gameState")) {
    // Save löschen
    localStorage.removeItem("gameState");
    // Variablen zurücksetzen
    console.log("hatte save");
    
    gameStarted = false;
    currentRoom = ROOMS[0];
    lastUnlockedRoom = ROOMS[0];
    nextRoomIndex = 1;
    nextRoom = ROOMS[nextRoomIndex];
    lastUnlockedRoomData = data[currentRoom];
    currentNarrative = lastUnlockedRoomData.narrative;
    lastAssistantMessage = currentNarrative;

    worldState = extractStateFromData(data);

    changeRoom("elevator");
  }

  viewport.classList.add("invisible");
  gameStarted = true;
  continueButton.classList.remove("hidden");

  setTimeout(() => { fadeInSlow() }, 100); 
  setTimeout(() => { showAssistantMessage(data.elevator.startNarrative) }, 4000); 
}

function continueGame() {
  showAssistantMessage(currentNarrative); 
}


function openElevator() {

  deactivateClick();
  deactivateElements();
  resetZoom();
  setTimeout(() => scene.classList.add("shake"), 1000);

  const heightDisplay = document.getElementById("height-display");
  setTimeout(() => heightDisplay.classList.add("active"), 500);

  setTimeout(() => animateFloorCount(), 1000);

  function animateFloorCount() {
  for (let i = 1; i <= 26; i++) {
    setTimeout(() => {
      floorCounter.textContent = i;

      if (i === 26) {
        scene.classList.remove("shake");
        const elevatorDoorBackgroundPlaceholder = document.getElementById("elevatorDoorBackgroundPlaceholder");
        setTimeout(() => elevatorDoorBackgroundPlaceholder.classList.add("hidden"), 2000);
        setTimeout(() => entrance.classList.remove("hidden"), 3000);
        setTimeout(() => elevatorDoors.classList.add("doorsOpen"), 2000);
        heightDisplay.classList.remove("active");
        activateClick();
      }
    }, i * 300); 
  }
} 
}

function unlockRoom(room) { 
  lastUnlockedRoom = ROOMS[nextRoomIndex];
  console.log(nextRoomIndex);
  console.log(`Raum freigeschaltet: ${lastUnlockedRoom}`);
  data[lastUnlockedRoom].isUnlocked = true;
  nextRoomIndex++;
  currentNarrative = data[lastUnlockedRoom].narrative;
}

function getDoorTarget(door) {
  return door.className.baseVal
    .split(" ")
    .find(c => c.startsWith("door-to-"))
    ?.replace("door-to-", "");
}

function activateClick() {
  if (viewport.classList.contains("noclick")) viewport.classList.remove("noclick");
}

function deactivateClick() {
  if (!viewport.classList.contains("noclick")) viewport.classList.add("noclick");
}

// Initalize game

const saved = loadGame();

if (saved) {
  console.log("Loaded save:", saved);

  // Einzelne Variablen zurückschreiben
  gameStarted = saved.gameStarted;
  currentRoom = saved.currentRoom;
  lastUnlockedRoom = saved.lastUnlockedRoom;
  nextRoomIndex = saved.nextRoomIndex;

  // worldState wieder in data.js pushen
  applyWorldStateToData(saved.worldState);

  // Für interne Abläufe aktualisieren
  nextRoom = ROOMS[nextRoomIndex];
  lastUnlockedRoomData = data[currentRoom];
  currentNarrative = lastUnlockedRoomData.narrative;
  lastAssistantMessage = currentNarrative;
}

initGame();

// Haupt Cursor Logik!

document.addEventListener("mousemove", e => {
  const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
  const sceneRect = scene.getBoundingClientRect();
  // Leave‑zone: 10% vom unteren Rand der Szene
  const threshold = sceneRect.bottom - (sceneRect.height * 0.1);

  // Fall 0.5: Leave-Zone check
  if (e.clientY > threshold && hoveredElement && !hoveredElement.closest("#main-navigation") && data[currentRoom].canBeLeft) {
    scene.classList.add("leaveHovered");
    setCursor("leave");
    return; 
  } else {
    scene.classList.remove("leaveHovered");
  }

  const target = e.target;
  const hotspot = target.closest(".hotspot");
  const door = target.closest(".door");

  // Fall 0: Immer fixe UI-Elemente
  if (target.closest("#main-navigation") || target.closest(".assistant #assistantButton") && !assistantActive || target.closest(".start-button")) {
    setCursor("click");
    return;
  }

  if (target.closest("#speechbubble")) {
    setCursor("click");
    return;
  } 

  // Fall 1: Nicht gezoomt
  if (!zoomed) {
    if (hotspot) setCursor("zoomIn");
    else if (door) setCursor("click");
    else setCursor("default");
    return;
  }


  // Fall 2: Gezoomt
  if (zoomed && !activateableElementActivated) {

    // Wenn Activation Button vorhanden
    if (target.closest(".activeButton") && activateableButtonsActive || target.closest(".speechbubble") && assistantShown ) {
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
    if (!zoomed || (zoomed && activateableElementActivated && hs.closest(".activatedElement"))) startHoverHotspot(hs);
  });

  hs.addEventListener("mouseleave", () => endHoverHotspot(hs));

  hs.addEventListener("click", () => {
    if (!zoomed) {
      zoomTo(hs);
      showPopUp(hs);
      clickSfx.play();
    }
    else if (!zoomed || (zoomed && activateableElementActivated && hs.closest(".activatedElement"))) {
      showPopUp(hs);
      clickSfx.play();
    }
  });
});

// Click & Hover (Doors)

document.querySelectorAll(".door").forEach(door => {
  door.addEventListener("mouseenter", () => startHoverHotspot(door));
  door.addEventListener("mouseleave", () => endHoverHotspot(door));

  door.addEventListener("click", () => {
    const targetRoom = getDoorTarget(door);

    if (data[targetRoom].isUnlocked) {
      unlockedSfx.play();
      fadeOutFast();
      setTimeout(() => {
        changeRoom(targetRoom)
        fadeInFast()
    }, 500);   
    }
    else {
      const lastRoomWording = `${data[lastUnlockedRoom].akkusativ} ${data[lastUnlockedRoom].displayName}`;
      const targetRoomWording = `${data[targetRoom].dativ} ${data[targetRoom].displayName}`;
      const assistantErrorMessage = `Schaue dir erst vollständig ${lastRoomWording} an, um ${targetRoomWording} zu gelangen.`;
      showAssistantMessage(assistantErrorMessage);
      errorSfx.play();
    }
  });
});

// Click Start Screen
document.querySelectorAll(".start").forEach(button => {
  button.addEventListener("mouseenter", () => startHoverHotspot(button));
  button.addEventListener("mouseleave", () => endHoverHotspot(button));

  button.addEventListener("click", () => {
    clickSfx.play();
    start.classList.add("hidden");
  });

  continueButton.addEventListener("click", () => {
    continueGame();
  });
  newGameButton.addEventListener("click", () => {
    startGame();
  });

  optionsButtonStart.addEventListener("click", () => {
    // Open settings screen
  });

  creditsButton.addEventListener("click", () => {
    // Open credits screen
  });
});


// Click (Assistant)
assistantButton.addEventListener("click", () => {
  if (!assistantShown) showAssistantMessage();
  if (assistantShown && !assistantActive) closeAssistantMessage();
});

assistantSpeechbubble.addEventListener("click", () => {
  const isLastMessage = assistantSpeechbubble.querySelector(".lastMessage");
  if (isLastMessage) {
    closeAssistantMessage();
    clickSfx.play();
  }
});

// Click (Controls)
homeButton.addEventListener("click", () => {
  clickSfx.play();
  start.classList.remove("hidden");
});

// Click (Controls)
optionsButton.addEventListener("click", () => {
  clickSfx.play();

  if (!musicOn && !soundEffectsOn) {
    playMusic(currentRoom); 
    musicOn = true;
    soundEffectsOn = true;
  } else {
    stopMusic(currentMusic);
    musicOn = false;
    soundEffectsOn = false;
  }
});

// Click (Leave)

document.addEventListener("click", (e) => {
  if (!data[currentRoom].canBeLeft) return;

  const target = e.target;
  if (target.closest("#main-navigation") || target.closest(".hotspot")) return;
  clickSfx.play();
  const sceneRect = scene.getBoundingClientRect();
  const threshold = sceneRect.bottom - (sceneRect.height * 0.1);
  
  if (e.clientY > threshold) {
    fadeOutFast(); 
    setTimeout(() => {
      changeRoom("hallway");
      fadeInFast(); 
    }, 500);
  }
});


// Click (Zoom Out)
document.addEventListener("click", e => {
  if (!zoomed) return;
  console.log(document.getElementById("speechbubble"));
  if (
    e.target.closest(".main-navigation") || 
    e.target.closest("#popup.popup") ||
    e.target.closest(".assistantButton") ||
    e.target.closest(".speechbubble") ||
    e.target.closest(".clickNextMessage") ||
    e.target.closest(".zoomed") 
  )
  return;
  console.log(document.getElementById("speechbubble"));
  console.log(document.getElementById("speechbubble").contains(e.target));
  console.log(e.target);
  resetZoom();
  zoomOutSfx.play();
});

// changeRoom("livingRoom");
