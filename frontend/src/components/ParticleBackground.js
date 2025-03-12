// frontend/src/components/ParticleBackground.js
import React from "react";
import Particles from "react-tsparticles";

const ParticleBackground = () => {
  return (
    <Particles
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        particles: {
          number: {
            value: 60,
            density: { enable: true, area: 800 },
          },
          color: { value: "#ffffff" },
          shape: { type: "circle" },
          opacity: { value: 0.5, random: true },
          size: { value: 3, random: true },
          move: { enable: true, speed: 1, outMode: "out" },
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            resize: true,
          },
        },
      }}
    />
  );
};

export default ParticleBackground;
