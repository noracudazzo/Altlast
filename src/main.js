import {hotspots} from "./hotspotData";

const viewport = document.querySelector(".viewport");
const scene = document.querySelector(".scene");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const popupClose = document.getElementById("popup-close");

let zoomed = false;
let clicked = false;
let popupShown = true;

// Functions

function startHoverHotspot(hotspot) {
  viewport.classList.add("shake");
  // hotspot.style.filter = "drop-shadow(0 0 5px white)";
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

function showPopUp (hotspot) {
  popupShown = true;
  const id = hotspot.id;
  const config = hotspots[id];
  popupText.innerHTML = ""; // reset

  const texts = [];
  for (const key in config.text) { // loop 
    const field = config.text[key];
    const p = document.createElement("p");
    popupText.appendChild(p); // br
    texts.push({ el: p, text: `${field.title}: ${field.data}`});
  }

  popup.classList.remove("hidden");

  // Typewriter
  let i = 0;

  function typeNext() {
    if (i >= texts.length) return;
    const { el, text } = texts[i];
    let j = 0;

    function type() {
      if (j < text.length) {
        el.textContent += text[j];
        j++;
        setTimeout(type, 50); // Geschwindigkeit
      } else {
        i++;
        typeNext(); // nächster Absatz
      }
    }

    type();
  }

  typeNext();
}


// await, asynch

// Zoom on click

document.querySelectorAll(".hotspot").forEach(hotspot => {
  hotspot.addEventListener("click", () => {
    zoomTo(hotspot);
    showPopUp(hotspot);
    clicked = true;
  }); 
}); 

popupClose.addEventListener("click", () => {
  popup.classList.add("hidden"); 
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