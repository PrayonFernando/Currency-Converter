import React, { useEffect, useRef, useState } from "react";
import Globe from "vanta/dist/vanta.globe.min";
import * as THREE from "three";

const VantaGlobe = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  // Function to update the height of the Vanta container
  const updateHeight = () => {
    if (vantaRef.current) {
      // Set the container's height to match the document's full scroll height
      vantaRef.current.style.height = `${document.documentElement.scrollHeight}px`;
    }
  };

  useEffect(() => {
    // Update height on mount
    updateHeight();
    // Listen for window resize events
    window.addEventListener("resize", updateHeight);

    if (!vantaEffect) {
      setVantaEffect(
        Globe({
          el: vantaRef.current,
          THREE: THREE, // Pass in the three.js instance
          mouseControls: false,
          touchControls: false,
          gyroControls: false,
          //   minHeight: 200.0,
          //   minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x2f17f4,
          color2: 0x4af4f2,
          backgroundColor: 0x0,
        })
      );
    }
    // Clean up the event listener and Vanta effect on unmount
    return () => {
      window.removeEventListener("resize", updateHeight);
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        // height is set dynamically via updateHeight()
      }}
    />
  );
};

export default VantaGlobe;
