import {hotspots} from "./hotspotData";

const viewport = document.querySelector(".viewport");
const scene = document.querySelector(".scene");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const popupClose = document.getElementById("popup-close");

let zoomed = false;
let clicked = false;
let popupShown = false;

// Functions

function startHoverHotspot(hotspot) {
  viewport.classList.add("shake");
  // hotspot.style.filter = "drop-shadow(0 0 3px white)";
  hotspot.style.cursor = "url(/src/assets/ui/cursor-investigate.png), zoom-in";
}

function endHoverHotspot(hotspot) {  
  viewport.classList.remove("shake");
  // hotspot.style.filter = "unset";
  hotspot.style.cursor = "unset";
}

function zoomTo (hotspot) {
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

function showPopUp(hotspot) {
  popupShown = true;
  const id = hotspot.id;
  const config = hotspots[id];
  popup.style.left = config.textLocation.left;
  popup.style.top = config.textLocation.top;
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

    // Beschreibung wird in Array gepusht
    const span = document.createElement("span");
    p.appendChild(span);

    popupText.appendChild(p); 

    texts.push({ strong, el: span, text: field.data });
  }

  setTimeout(() => popup.classList.add("visible"), 10); //  Verzögerung, damit die Transition greift
  
  // Typewriter Effekt
  let i = 0;

  function typeNext() {
    if (i >= texts.length) return;
    const { strong, el, text } = texts[i];
    let j = 0;

    // Titel einblenden
    strong.style.opacity = 1;

    setTimeout(() => {
      function type() {
        if (j < text.length) {
          el.textContent += text[j];
          j++;
          setTimeout(type, 50);
        } else {
          i++;
          typeNext();
        }
      }
      type();
    }, 500); // Fade
  }

  setTimeout(typeNext, 100);
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