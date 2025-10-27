import * as PIXI from "pixi.js";
import { gsap } from "gsap";

let app;
let particlesContainer;

export function initParticles(targetElement = document.body) {
  // Pixi App erstellen
  app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundAlpha: 0,
    resolution: window.devicePixelRatio || 1,
  });
  targetElement.appendChild(app.view);

  // Container für Partikel
  particlesContainer = new PIXI.Container();
  app.stage.addChild(particlesContainer);

  // Continuous Update
  app.ticker.add(() => {
    particlesContainer.children.forEach(p => {
      // Optional: langsames Schweben
      p.y -= p.speedY;
      p.x += p.speedX;

      // Wenn Partikel aus dem Screen raus, reset Position
      if (p.y < -10) p.y = app.screen.height + 10;
      if (p.x < -10) p.x = app.screen.width + 10;
    });
  });
}

export function createParticle() {
  if (!particlesContainer) return;

  const particle = new PIXI.Graphics();
  particle.beginFill(0x66ccff, Math.random() * 0.8 + 0.2);
  particle.drawCircle(0, 0, Math.random() * 2 + 1); 
  particle.beginFill(0x66ccff, Math.random() * 0.5 + 0.1); 

  particle.x = Math.random() * app.screen.width;
  particle.y = Math.random() * app.screen.height;

  // zufällige Geschwindigkeit
  particle.speedY = Math.random() * 0.3 + 0.1; 
  particle.speedX = (Math.random() - 0.5) * 0.2; 

  particlesContainer.addChild(particle);

  // Optional: Auflösen / Fade mit GSAP
  gsap.to(particle, {
    alpha: 0,
    duration: Math.random() * 2 + 2,
    onComplete: () => {
      if (particle.parent) particle.parent.removeChild(particle);
    },
  });
}

export function startParticles(interval = 100) {
  setInterval(createParticle, interval);
}
