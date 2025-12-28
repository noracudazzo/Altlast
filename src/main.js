import "@fontsource/space-mono/latin";
import { data as origData } from "./data";
import { gsap } from "gsap";

let data = structuredClone(origData);

const viewport = document.querySelector(".viewport");
const start = document.querySelector(".start");
const scenes = document.querySelectorAll(".scene");
const continueButton = document.querySelector(".continue-button");
const newGameButton = document.querySelector(".new-game-button");
const creditsButton = document.querySelector(".credits-button");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const warning = document.getElementById("warning")
const assistant = document.getElementById("assistant");
const assistantButton = document.getElementById("assistantButton");
const assistantSpeechbubble = document.getElementById("speechbubble");
const homeButton = document.querySelector(".home-button");
const soundButton = document.querySelector(".sound-button");
const soundOnIcon = document.querySelector(".sound-on-icon");
const soundOffIcon = document.querySelector(".sound-off-icon");
const roomName = document.querySelector(".room-name p");
const heightDisplay = document.getElementById("height-display");
const elevatorControls = document.getElementById("controls");
const elevatorDoorBackgroundPlaceholder = document.getElementById("elevatorDoorBackgroundPlaceholder");
const elevatorDoors = document.querySelector(".elevator-doors");
const elevatorHotspots = document.querySelectorAll(".elevator .hotspot");
const entrance = document.querySelector(".entrance");
const doorBodies = document.querySelectorAll(".doorBody");
const board = document.getElementById("board");
const board1 = document.getElementById("board1");
const board2 = document.getElementById("board2");
const boardObjects = document.querySelectorAll(".board .object");

let zoomed = false;
let popupShown = false;
let activePopupRunId = 0;
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
let utterance = undefined;

let altlastIdentified = false;

// Audio

const SFX = [];

const clickSfx = sfx(`/sounds/effects/220166__gameaudio__button-confirm-spacey.wav`);
const zoomInSfx = sfx(`/sounds/effects/220171__gameaudio__flourish-spacey-1.wav`);
const assistantSfx = sfx(`/sounds/effects/220202__gameaudio__teleport-casual_shortened.wav`);
const unlockedSfx = sfx(`/sounds/effects/515828__newlocknew__ui_2-2-ntfo-trianglesytrusarpegiomultiprocessingrsmpl.wav`, 0.5); 
const errorSfx = sfx(`/sounds/effects/176238__melissapons__sci-fi_short_error.wav`);
const bleepSfx = sfx(`/sounds/effects/263133__mossy4__tone-beep.wav`, 0.4); 
const typeSfx = sfx(`/sounds/effects/738440__chris112233__key-clack1.wav`, 0.3); 
const retypeSfx = sfx(`/sounds/effects/786190__danymo__sci-fi_computing_tr1.mp3`);
const elevatorMovementSfx = sfx(`/sounds/effects/341190__yoyodaman234__elevator-travel-6a.wav`);
const elevatorDoorSfx = sfx(`/sounds/effects/581369__audiotorp__hydraulic_door_scifi_withdecompression.wav`);
const elevatorIsThereSfx = sfx(`/sounds/effects/529559__drmrsir__ping.wav`);
const openDoorSfx = sfx(`/sounds/effects/400329__n-razm__door_open.wav`, 0.1); 
const closeDoorSfx = sfx(`/sounds/effects/426734__samuelgremaud__door-closing.wav`, 0.1); 
const openFridgeSfx = sfx(`/sounds/effects/8865__harri__1_fridge_open.mp3`, 0.3); 
const closeFridgeSfx = sfx(`/sounds/effects/8876__harri__2_fridge_close.mp3`, 0.3); 
const openShelfSfx = sfx(`/sounds/effects/131888__vtownpunks__cupboard-4.wav`); 
const closeShelfSfx = sfx(`/sounds/effects/131889__vtownpunks__cupboard-3.wav`); 
const openDrawersSfx = sfx(`/sounds/effects/360949__marcusgar__drawer.wav`, 0.7); 
const closeDrawersSfx = sfx(`/sounds/effects/569035__jdolea__drawer-closing.wav`, 0.025); 
const altlastIdentifiedSfx = sfx(`/sounds/effects/448745__lilmati__futuristic-city-terminal.wav`, 0.1); 
const altlastWarningSfx = sfx(`/sounds/effects/657938__lilmati__scifi-popup-warning-notice-or-note.wav`, 0.1);
const altlastAlertSfx = sfx(`/sounds/effects/547250__eminyildirim__warning-ui.wav`, 1, true); 


// needed: music bedroom or living room, waste room, start Screen 

let currentMusic = undefined; 

let currentCursor = "default";

// Settings
let soundOn = false;

// Cursor Manager
const CURSORS = {
  default: "url(/src/assets/imgs/ui/cursor.png), auto",
  zoomIn: "url(/src/assets/imgs/ui/cursor-zoomin.png), zoom-in",
  zoomOut: "url(/src/assets/imgs/ui/cursor-zoomout.png), zoom-out",
  click: "url(/src/assets/imgs/ui/cursor-click.png), pointer",
  leave: "url(/src/assets/imgs/ui/cursor-leave.png), s-resize",
};

function resetClasses() {
  // Elevator Hotspots
  elevatorHotspots.forEach(hs => {
    hs.classList.remove("glow");
  });

  // Background Buttons
  const controlButtonBackgrounds = document.querySelectorAll(".controls-button-background");
  controlButtonBackgrounds.forEach(bg => {
    bg.classList.remove("clicked", "unclicked");
  });

  // Elevator 
  elevatorControls.classList.remove("background");
  heightDisplay.classList.remove("active");
  elevatorDoors.classList.remove("doorsOpen");
  elevatorDoors.classList.add("no-transition");
  entrance.classList.add("hidden"); 
  elevatorDoorBackgroundPlaceholder.classList.remove("hidden");

  // Office
  // tbd Objects.classList.add("background");

  // Viewport
  viewport.classList.remove("slow-fading", "fast-fading", "invisible", "noclick");

  // Scenes
  scenes.forEach(scene => {
    scene.classList.remove("shake", "leaveHovered");
  });

  elevatorDoors.classList.remove("no-transition");

  doorBodies?.forEach(db => {
    db.classList.remove("hidden");
  });
}


function saveGame() {
  const state = {
    gameStarted,
    currentRoom,
    lastUnlockedRoom,
    nextRoomIndex,
    worldState,
  };

  localStorage.setItem("gameState", JSON.stringify(state));
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

function syncDoorsWithState() {
  ROOMS.forEach(room => {
    const doorBody = document.querySelector(`.door-to-${room} .doorBody`);
    if (!doorBody) return;

    if (data[room].isUnlocked) {
      doorBody.classList.add("hidden");
    } else {
      doorBody.classList.remove("hidden");
    }
  });
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

  // Potentielle Buttons aktivieren
  const relatedButtons = document.querySelectorAll(`.${id}Button`);

  relatedButtons.forEach(button => {
    setTimeout(() => prepareButton(button, id), 500);
    activateableButtonsActive = true;
  });
}

function deactivateElements() {

  scene.querySelectorAll("[id$='Activated']").forEach(el => {
    deactivateElement(el.id.replace("Activated", ""));
  });
  activateableElementActivated = false;

  scene.querySelectorAll(".activeButton").forEach(el => {
    el.classList.remove("activeButton");
  });
  activateableButtonsActive = false;
}

function zoomOut() {

  // speichern
  worldState = extractStateFromData(data);

  saveGame({
    gameStarted,
    currentRoom,
    lastUnlockedRoom,
    nextRoomIndex,
    worldState
  });

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
  if(activateableElementActivated || activateableButtonsActive) {
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

  if (altlastIdentified) {
    removeAltlastEffect();
  }

  // Raum Fortschritt prüfen
  if (!scene.classList.contains("intro")) { // nur relevant wenn keine Intro Szene
    canNextRoomBeUnlocked();
  }
} 

async function typeText(el, text, speed = 85, isSpeaking, textIsAltlast) {
  // el.textContent = ""; // leeren
  typingController.skip = false;
  if(altlastIdentified) el.classList.add("altlastIdentified");

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

    await new Promise(r => setTimeout(r, speed));
  }

  // Effekt triggern
  if (textIsAltlast) await playAltlastEffect(el, speed);
}

function speakTextRobot(text) {
    speechSynthesis.cancel();

    utterance = new SpeechSynthesisUtterance(text);

    // Roboter-Effekt
    utterance.rate = 1.1;   // langsamer → mechanisch

    if(soundOn) speechSynthesis.speak(utterance);
}

async function playAltlastEffect(el, speed) {
  retypeSfx.play();

  // Text langsam löschen
  for (let i = el.textContent.length; i >= 0; i--) {
    typeSfx.play();
    el.textContent = el.textContent.slice(0, i);
    await new Promise(r => setTimeout(r, speed * 1.5));
  }

  // 3x "..." Animation
  for (let c = 0; c < 2; c++) {
    for (let dots = 1; dots <= 3; dots++) {
      typeSfx.play();
      el.textContent = ".".repeat(dots);
      await new Promise(r => setTimeout(r, speed * 3));
    }

    el.textContent = "";
    await new Promise(r => setTimeout(r, speed * 1.2));
  }
  altlastIdentified = true;
  altlastIdentifiedSfx.play();
  altlastAlertSfx.play();
  popup.classList.add("altlastIdentified");
  await typeText(el, "vor Beginn der Zeitrechnung", speed, false, false);
}

function endAltlastPopup() {
  altlastWarningSfx.play();
  warning.classList.add("visible");
  warning.classList.remove("invisible");
  popupText.classList.add("blurred");
}

function removeAltlastEffect() {
  altlastAlertSfx.pause();
  altlastAlertSfx.currentTime = 0;
  popup.classList.remove("altlastIdentified");
  altlastIdentified = false;
  warning.classList.remove("visible");
  warning.classList.add("invisible");
  popupText.classList.remove("blurred");
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
  if (texts.length > 1 && !zoomed) deactivateClick();

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


    // speakTextRobot(text); // Sprachausgabe
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
      elevatorHotspots.forEach(hs => {
        // hs.style
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
  assistant.classList.remove("activeAssistant");
  speechSynthesis.cancel();
};

function closePopup() {
  popupShown = false;
  activePopupRunId++;
  popup.classList.remove("visible"); 
  if(altlastIdentified) removeAltlastEffect();
}

async function showPopUp(hotspot) {
  if(altlastIdentified) removeAltlastEffect();

  const runId = ++activePopupRunId; // eindeutige ID

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

  if(aborted(runId)) return;
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

  if(aborted(runId)) return;
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

  if(aborted(runId)) return;
  popupText.innerHTML = ""; // Text reset

  const texts = [];
  for (const key in config.text) { 
    const field = config.text[key];
    const li = document.createElement("li");
    li.style.opacity = 0;  

    const strong = document.createElement("strong");
    const isAltlast = config.isAltlast && key === "year";
    if(altlastIdentified) strong.classList.add("altlastIdentified");

    // Titel (zunächst unsichtbar)
    strong.textContent = field.title + ": ";
    strong.style.opacity = 0;   
    li.appendChild(strong);

    // Beschreibung
    const span = document.createElement("span");
    li.appendChild(span);

    popupText.appendChild(li); 

    texts.push({ li, strong, el: span, text: field.data, isAltlast });
  }

  // Popup einblenden
  setTimeout(() => popup.classList.add("visible"), 10);
 

  // Typewriter
  for (const { li, strong, el, text, isAltlast } of texts) {
    if(aborted(runId)) return;

    li.style.transition = "opacity 0.3s ease";
    li.style.opacity = 1;

    strong.style.opacity = 1; // Titel einblenden
  
    bleepSfx.play();
    
    await new Promise(r => setTimeout(r, 400 + Math.random() * 200));

    if(aborted(runId)) return;
    await typeText(el, text, 50, false, isAltlast);

    if(aborted(runId)) return;
    await new Promise(r => setTimeout(r, 200)); // Pause zwischen den Zeilen
  }

  if(!aborted(runId) && config.comment) {
    showAssistantMessage(config.comment);
  };

  if(altlastIdentified && popupShown && !aborted(runId)) endAltlastPopup(); 
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
            unlockNextRoom();
            unlockNextRoom();
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

  if(baseId === "fridge") openFridgeSfx.play();
  if(baseId === "shelf" || baseId === "shelf2" ) openShelfSfx.play();
  if(baseId === "drawers") openDrawersSfx.play();

  // Booleans
  setTimeout(() => activateableElementActivated = true, 100); // Verzögerung, damit Popup nicht im Klick angezeigt wird

  fadeOutFast()
  setTimeout(() => {
    fadeInFast();
    activatedElement.classList.remove("hidden"); // aktiviertes Element sichtbar machen 
    activatedElement.classList.add("activatedElement");
    baseElement.classList.add("hidden");
  }, 400); 

}

function deactivateElement(baseId) {
  const baseElement = document.getElementById(baseId);
  const activatedElement = document.getElementById(baseId + "Activated");

  if (!baseElement || !activatedElement) return;

  if(baseId === "fridge" && activateableElementActivated) closeFridgeSfx.play();
  if(baseId === "shelf" || "shelf2" && activateableElementActivated) closeShelfSfx.play();
  if(baseId === "drawers" && activateableElementActivated) closeDrawersSfx.play();

  // Booleans
  activateableElementActivated = false;
  activateableButtonsActive = false;

  if(baseId === board) {
    boardObjects.forEach(el => el.classList.add("background"));
    return; // tbd
  }

  // Sichtbar machen
  activatedElement.classList.add("hidden");
  baseElement.classList.remove("hidden");
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
      showAssistantMessage(data[nextRoom].startNarrative);
      unlockNextRoom();
    } else {
      currentNarrative = `Du hast den letzten Raum abgeschlossen! 🎉`; // tbd, Platzhalter
    }
  }
}

function changeRoom(room) {
  if (scene.classList.contains("leaveHovered")) scene.classList.remove("leaveHovered"); // Hover reset
  setCursor("default"); // Cursor reset
  
  scene.classList.add("hidden");

  currentRoom = room; 
  roomName.textContent = data[currentRoom].displayName;

  scene = document.querySelector("." + currentRoom);
  scene.classList.remove("hidden");
  if(soundOn) activateSound();

  if(assistantActive) closeAssistantMessage();

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
    worldState,
  });
}

function playMusic(room) {
  if(currentMusic) stopMusic();

  const musicFile = data[room]?.music;
  if (!musicFile) return; // Abbruch falls keine Datei existiert
  const musicVolume = data[room]?.musicVolume;

  // Neue Musik starten
  currentMusic = new Audio(`/sounds/music/${musicFile}`);
  currentMusic.loop = true;
  if(musicVolume) {
    currentMusic.volume = musicVolume;
  } else {
    currentMusic.volume = 0.05;
  }

  currentMusic.play();
}

function stopMusic() {
  currentMusic.pause();
  currentMusic.currentTime = 0;
}

function sfx(src, volume = 0.5, loop = false) {
  const audio = new Audio(src);
  audio.volume = volume;
  audio.loop = loop;

  SFX.push(audio);
  return audio;
}

function activateSound() {
  soundOn = true;
  SFX.forEach(s => s.muted = false);
  playMusic(currentRoom);

  soundOnIcon.classList.remove("hidden");
  soundOffIcon.classList.add("hidden");
}

function deactivateSound() {
  soundOn = false;
  stopMusic();
  SFX.forEach(s => s.muted = true);
  speechSynthesis.cancel();

  soundOnIcon.classList.add("hidden");
  soundOffIcon.classList.remove("hidden");
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
    viewport.classList.remove("fast-fading");
  }, 500);  
}

function startGame() {

  // Save löschen
  localStorage.removeItem("gameState");
  data = structuredClone(origData);
  // Variablen zurücksetzen
  
  gameStarted = false;
  currentRoom = ROOMS[0];
  lastUnlockedRoom = ROOMS[0];
  nextRoomIndex = 1;
  nextRoom = ROOMS[nextRoomIndex];
  lastUnlockedRoomData = data[currentRoom];
  currentNarrative = lastUnlockedRoomData.narrative;
  lastAssistantMessage = currentNarrative;
  soundOn = true;

  worldState = extractStateFromData(data);
  resetClasses();

  changeRoom("elevator");

  viewport.classList.add("invisible");
  gameStarted = true;
  continueButton.classList.remove("hidden");

  setTimeout(() => { fadeInSlow() }, 100); 
  setTimeout(() => { showAssistantMessage(data.elevator.startNarrative) }, 4000); 
}

function continueGame() {
  soundOn = true;
  showAssistantMessage(currentNarrative); 
  changeRoom(currentRoom);
}


function openElevator() {
  elevatorMovementSfx.play();

  deactivateClick();
  resetZoom();
  setTimeout(() => scene.classList.add("shake"), 1000);
  setTimeout(() => heightDisplay.classList.add("active"), 500);

  setTimeout(() => animateFloorCount(), 1000);

  function animateFloorCount() {
  for (let i = 1; i <= 26; i++) {
    heightDisplay.classList.remove("active");
      activateClick();
      setTimeout(() => {
      floorCounter.textContent = i;

      if (i === 26) {
        scene.classList.remove("shake");
        elevatorDoorSfx.play();
        setTimeout(() => {
          elevatorIsThereSfx.play();
        }, 500
      );
        setTimeout(() => {
          elevatorDoorBackgroundPlaceholder.classList.add("hidden");
          elevatorDoors.classList.add("doorsOpen")
         }
          , 2000);
        setTimeout(() => entrance.classList.remove("hidden"), 3000); 
      }
    }, i * 250); 
  }
} 
}

function unlockNextRoom() { 
  lastUnlockedRoom = ROOMS[nextRoomIndex];
  data[lastUnlockedRoom].isUnlocked = true;

  nextRoomIndex++;
  nextRoom = ROOMS[nextRoomIndex];

  currentNarrative = data[lastUnlockedRoom].narrative;

  const doorBody = document.querySelector(`.door-to-${lastUnlockedRoom} .doorBody`);
  console.log(`.door-to-${lastUnlockedRoom} .doorBody`);
  console.log(doorBody);
  if(doorBody) doorBody.classList.add("hidden");
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

function aborted(runId) {
  return runId !== activePopupRunId || !popupShown;
}


// Initalize game

const saved = loadGame();

if (saved) {

  // Einzelne Variablen zurückschreiben
  gameStarted = saved.gameStarted;
  currentRoom = saved.currentRoom;
  lastUnlockedRoom = saved.lastUnlockedRoom;
  nextRoomIndex = saved.nextRoomIndex;

  // worldState wieder in data.js pushen
  applyWorldStateToData(saved.worldState);
  syncDoorsWithState();

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
      return;
    }

    if (!zoomed || (zoomed && activateableElementActivated && hs.closest(".activatedElement"))) {
      showPopUp(hs);
      clickSfx.play();
      return;
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
      if(!data[targetRoom].hasBeenEntered) unlockedSfx.play();
      openDoorSfx.play();
      fadeOutFast();
      setTimeout(() => {
        changeRoom(targetRoom)
        fadeInFast()
    }, 500);   
    }
    else {
      const lastRoomWording = `${data[lastUnlockedRoom].akkusativ} ${data[lastUnlockedRoom].displayName}`;
      const targetRoomWording = `${data[targetRoom].dativ} ${data[targetRoom].displayName}`;
      const assistantErrorMessage = `Um ${targetRoomWording} zu gelangen, solltest du dir erst vollständig ${lastRoomWording} ansehen.`;
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
  resetZoom();
});

// Click (Controls)
soundButton.addEventListener("click", () => {
  clickSfx.play();

  if (!soundOn) {
    activateSound();
  } else {
    deactivateSound();
  }
});

// Click (Leave)

document.addEventListener("click", (e) => {
  if (!data[currentRoom].canBeLeft) return;

  const target = e.target;
  if (target.closest("#main-navigation") || target.closest(".hotspot")) return;
  const sceneRect = scene.getBoundingClientRect();
  const threshold = sceneRect.bottom - (sceneRect.height * 0.1);
  
  if (e.clientY > threshold) {
    fadeOutFast(); 
    closeDoorSfx.play();
    setTimeout(() => {
      changeRoom("hallway");
      fadeInFast(); 
    }, 500);
  }
});


// Click (Zoom Out)
document.addEventListener("click", e => {
  if (!zoomed) return;
  if (
    e.target.closest(".main-navigation") || 
    e.target.closest("#popup.popup") ||
    e.target.closest(".assistant #assistantButton") ||
    e.target.closest("#speechbubble.speechbubble") ||
    e.target.closest(".clickNextMessage") ||
    e.target.closest(".zoomed") 
  )
  return;
  resetZoom();
});

// changeRoom("livingRoom");
