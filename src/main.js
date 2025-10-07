const scene = document.querySelector(".scene");
let zoomed = false;

// Zoom on click

function zoomTo(xPercent, yPercent, scale) {
  scene.style.width = `${scale * 100}%`;
  scene.style.left = `-${xPercent * (scale - 1)}%`;
  scene.style.top  = `-${yPercent * (scale - 1)}%`;
}

document.querySelectorAll(".clickable-object").forEach(hotspot => {
  hotspot.addEventListener("click", () => {
    const hotspotRect = hotspot.getBoundingClientRect();
    const sceneRect = scene.getBoundingClientRect();
    const hotspotCenterX = hotspotRect.left + hotspotRect.width / 2;
    const hotspotCenterY = hotspotRect.top + hotspotRect.height / 2;
    const sceneWidth = sceneRect.width;
    const sceneHeight = sceneRect.height;
    const zoomPositionX = hotspotCenterX / sceneWidth * 100;
    const zoomPositionY = hotspotCenterY / sceneHeight * 100;
    console.log(zoomPositionX, zoomPositionY)
    scene.style.transformOrigin = `${zoomPositionX}% ${zoomPositionY}%`;
    scene.style.transform = "scale(3)"; 
    zoomed = true
  }); 
}); 

/* Shake effect on hover

if (zoomed = false) {
  
}
document.querySelectorAll(".clickable-object").forEach(hotspot => {
  hotspot.addEventListener("mouseenter", () => { // Start shake
    if (!zoomed) {
      scene.classList.add("shake");
    }
  });
  hotspot.addEventListener("mouseleave", () => { // End shake
    scene.classList.remove("shake");
  });
  scene.addEventListener('animationend', () => { // Fallback
    scene.classList.remove('shake');
  });
}); */