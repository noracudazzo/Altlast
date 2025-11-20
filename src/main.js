import { hotspots } from "./hotspotData";
import { gsap } from "gsap";


const viewport = document.querySelector(".viewport");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const assistant = document.getElementById("assistant");
const assistantButton = document.getElementById("assistantButton");
const assistantSpeechbubble = document.getElementById("speechbubble");
const optionsButton = document.querySelector(".options-button");
const elevatorControls = document.getElementById("controls");
const elevatorDoors = document.querySelector(".elevator-doors");
const entrance = document.querySelector(".entrance");

let zoomed = false;
let popupShown = false;
let assistantShown = false;
let activateableButtonsActive = false;
let activateableElementActivated = false;

// Audio
const clickSfx = new Audio(`/sounds/effects/220166__gameaudio__button-confirm-spacey.wav`);
const zoomInSfx = new Audio(`/sounds/effects/220171__gameaudio__flourish-spacey-1.wav`);
const zoomOutSfx = new Audio(`/sounds/effects/812687__audiopapkin__sound-design-elements-whoosh-sfx-050.wav`);
const assistantSfx = new Audio(`/sounds/effects/220202__gameaudio__teleport-casual_shortened.wav`);
const unlockedSfx = new Audio(`/sounds/effects/524202__department64__d64-samplepack-fx-powerup-37.wav`); 
const errorSfx = new Audio(`/sounds/effects/176238__melissapons__sci-fi_short_error.wav`);

unlockedSfx.volume = 0.5;

const typeSfxPool = [];
const typeSfxs = [
  "/sounds/effects/370849__cabled_mess__clack_minimal-ui-sounds.wav", "/sounds/effects/515522__waveplaysfx__audacity-high-pitched-beep.wav",
  "/sounds/effects/517379__newlocknew__ui_3-3-fhsandal-sinussytrusarpegiomultiprocessingrsmpl.wav", "/sounds/effects/517377__newlocknew__ui_7-1-confusion-blip-2sytrusarpegiomultiprocessingrsmpl.wav",
]

let currentMusic = undefined; 
// tbd currentMusic.loop = true; 

let currentCursor = "default";

// Settings
let musicOn = false;
let soundEffectsOn = false;

// Rooms
const ROOMS = ["elevator", "kitchen", "livingRoom", "bedroom", "office"];
let currentRoom = ROOMS[0]; 
let lastUnlockedRoom = ROOMS[0]; 
let nextRoomIndex = ROOMS.indexOf(lastUnlockedRoom) + 1;
let nextRoom = ROOMS[nextRoomIndex];
let scene = document.querySelector("." + currentRoom);

let lastUnlockedRoomData = hotspots[currentRoom];
let currentNarrative = lastUnlockedRoomData.narrative;
let lastAssistantMessage = currentNarrative;

// Cursor Manager
const CURSORS = {
  default: "url(/src/assets/imgs/ui/cursor.png), auto",
  zoomIn: "url(/src/assets/imgs/ui/cursor-zoomin.png), zoom-in",
  zoomOut: "url(/src/assets/imgs/ui/cursor-zoomout.png), zoom-out",
  click: "url(/src/assets/imgs/ui/cursor-click.png), pointer",
  leave: "url(/src/assets/imgs/ui/cursor-leave.png), s-resize",
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

async function typeText(el, text, speed = 50, isSpeaking) {
  // el.textContent = ""; // leeren

  for (let i = 0; i < text.length; i++) {
    el.textContent += text[i];

    if(!isSpeaking) {
      if (text[i] !== " ") {   // keine Sounds bei Leerzeichen
        playTypeSound();
      }
    }

    await new Promise(r => setTimeout(r, speed));
  }
}

function speakTextRobot(text) {
    const utterance = new SpeechSynthesisUtterance(text);

    // Roboter-Effekt
    utterance.rate = 1.1;   // langsamer → mechanisch

    speechSynthesis.speak(utterance);
}


function playTypeSound() {
    let audio = typeSfxPool.find(a => a.paused || a.ended);

    if (!audio) {
        audio = new Audio();
        typeSfxPool.push(audio);
    }

    audio.src = typeSfxs[Math.floor(Math.random() * typeSfxs.length)];
    audio.playbackRate = 0.4 + Math.random() * 0.15; // Pitch
    audio.volume = 0.1;
    audio.currentTime = 0;
    audio.play();
}

async function showAssistantMessage(comment = null) { 
  assistantShown = true;
  assistantSfx.play();

  if (comment === lastAssistantMessage && assistantShown) {
    assistantSpeechbubble.classList.remove("hidden");
    assistant.classList.add("activeAssistant");
    return; // um doppelte Generierung zu vermeiden 
  }

  assistantSpeechbubble.innerHTML = ""; // Reset von bestehendem Inhalt

  const p = document.createElement("p"); // Paragraph Element erstellen
  assistantSpeechbubble.appendChild(p);

  assistantSpeechbubble.classList.remove("hidden");
  assistant.classList.add("activeAssistant");


  if (comment) { 
    lastAssistantMessage = comment;
    speakTextRobot(lastAssistantMessage);
    await typeText(p, comment, 40, true); // Falls Kommentar vorhanden
  } else {
    lastAssistantMessage = currentNarrative;
    speakTextRobot(lastAssistantMessage);
    await typeText(p, currentNarrative, 40, true); // Sonst normale Narrative
  }
  setTimeout(() => {
    closeAssistantMessage();
  }, 50000);
}

function closeAssistantMessage() {
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
 

  // Typewriter
  for (const { li, strong, el, text } of texts) {
    if (!popupShown) return; 

    li.style.transition = "opacity 0.3s ease";
    li.style.opacity = 1;

    strong.style.opacity = 1; // Titel einblenden
    
    const blingSound = new Audio(typeSfxs[2]);
    blingSound.volume = 0.1;
    blingSound.currentTime = 0;
    blingSound.play();
    
    await new Promise(r => setTimeout(r, 400 + Math.random() * 200));

    if (!popupShown) return; 
    await typeText(el, text, 50, false); // Text tippen

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
          elevatorControls.classList.remove("hotspot");
          elevatorControls.classList.add("background");
          openElevator(); 
          unlockRoom(nextRoom);
        } else {
          errorSfx.play();
          showAssistantMessage(hotspots.elevator.controls.falseClickMessage);
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

  setTimeout(() => activatedElement.classList.remove("hidden"), 800); // aktiviertes Element sichtbar machen
  setTimeout(() => baseElement.classList.add("hidden"), 800); // parent unsichtbar machen
  activatedElement.classList.add("activatedElement");

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

function changeRoom(room) {
  if (scene.classList.contains("leaveHovered")) scene.classList.remove("leaveHovered"); // tbd, klappt das? Hover reset
  setCursor("default"); // Cursor reset
  scene.classList.add("hidden");

  currentRoom = room; // change room to kitchen, tbd goal: hallway

  scene = document.querySelector("." + currentRoom);
  scene.classList.remove("hidden");

  initParticles(scene);
  startParticles(100); 
  playMusic(currentRoom);
}

function playMusic(room) {
  const musicFile = hotspots[room]?.music;
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


function openElevator() {

  deactivateElements();
  setTimeout(() => resetZoom(), 1000);
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
      }
    }, i * 300); 
  }
} 
}

function unlockRoom(room) { 
  lastUnlockedRoom = ROOMS[nextRoomIndex];
  hotspots[lastUnlockedRoom].isUnlocked = true;
  currentNarrative = hotspots[lastUnlockedRoom].startNarrative;
  if (!scene.classList.contains("intro")) { 
    unlockedSfx.play();
    showAssistantMessage(currentNarrative);
  };
  currentNarrative = hotspots[lastUnlockedRoom].narrative;
}

function getDoorTarget(door) {
  return door.className.baseVal
    .split(" ")
    .find(c => c.startsWith("door-to-"))
    ?.replace("door-to-", "");
}


// Haupt Cursor Logik!

document.addEventListener("mousemove", e => {
  const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
  const sceneRect = scene.getBoundingClientRect();
  // Leave‑zone: 10% vom unteren Rand der Szene
  const threshold = sceneRect.bottom - (sceneRect.height * 0.1);

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
  const door = target.closest(".door");

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
    else if (door) setCursor("click");
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
      clickSfx.play();
    }
    else if (zoomed && activateableElementActivated) {
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

    if (hotspots[targetRoom].isUnlocked) {
      unlockedSfx.play();
      changeRoom(targetRoom);
    }
    else {
      showAssistantMessage(hotspots[lastUnlockedRoom].errorNarrative);
      errorSfx.play();
    }
  });
});


// Click (Assistant)
assistantButton.addEventListener("click", () => {
  if (!assistantShown) showAssistantMessage();
  else closeAssistantMessage();
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
  if (!hotspots[currentRoom].canBeLeft) return;

  const target = e.target;
  if (target.closest("#main-navigation") || target.closest(".hotspot")) return;
  clickSfx.play();
  const threshold = window.innerHeight * 0.9;
  if (e.clientY > threshold) {
    changeRoom("elevator"); // tbd hallway
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
  zoomOutSfx.play();
});
