"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Heart } from "lucide-react";

export function HeroMascot() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [interactionMessage, setInteractionMessage] = useState<string>("");
  const [clickCount, setClickCount] = useState<number>(0);
  const mascotMeshRef = useRef<THREE.Group | null>(null);
  const isJumpingRef = useRef<boolean>(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      setHasWebGL(false);
      return;
    }

    // Initialize Three.js Scene
    const scene = new THREE.Scene();

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 4.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      container.appendChild(renderer.domElement);
    } catch {
      setHasWebGL(false);
      return;
    }

    // Lighting setup for rich metallic gold highlights
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffebad, 3.2);
    dirLight1.position.set(3, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x7ec8e3, 1.5);
    dirLight2.position.set(-3, -2, -2);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xf6e27a, 2.5, 8);
    pointLight.position.set(0, 1.5, 2);
    scene.add(pointLight);

    // Group for complete mascot
    const mascotGroup = new THREE.Group();
    mascotMeshRef.current = mascotGroup;
    scene.add(mascotGroup);

    // Gold Material with realistic PBR properties
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xebb438,
      metalness: 0.86,
      roughness: 0.22,
      envMapIntensity: 1.5,
    });

    const polishedWhiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xfafafa,
      metalness: 0.2,
      roughness: 0.3,
    });

    // Visor Material (Glowing Friendly Display)
    const visorMaterial = new THREE.MeshStandardMaterial({
      color: 0x051329,
      roughness: 0.1,
      metalness: 0.9,
    });

    const eyeGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x38e1ff, // Cyan-blue glowing eyes
    });

    // 1. Torso / Body (Cute rounded capsule)
    const bodyGeometry = new THREE.SphereGeometry(0.72, 32, 32);
    bodyGeometry.scale(1, 1.15, 0.95);
    const bodyMesh = new THREE.Mesh(bodyGeometry, goldMaterial);
    bodyMesh.position.y = -0.3;
    mascotGroup.add(bodyMesh);

    // Cute belly plate (Pearl white inlay)
    const bellyGeometry = new THREE.SphereGeometry(0.55, 32, 32);
    bellyGeometry.scale(0.85, 0.9, 0.4);
    const bellyMesh = new THREE.Mesh(bellyGeometry, polishedWhiteMaterial);
    bellyMesh.position.set(0, -0.32, 0.52);
    mascotGroup.add(bellyMesh);

    // Heart core badge on belly
    const coreGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.05, 32);
    coreGeometry.rotateX(Math.PI / 2);
    const coreMaterial = new THREE.MeshBasicMaterial({ color: 0xf6e27a });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    coreMesh.position.set(0, -0.28, 0.72);
    mascotGroup.add(coreMesh);

    // 2. Head Group
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.78, 0);
    mascotGroup.add(headGroup);

    const headGeometry = new THREE.SphereGeometry(0.68, 32, 32);
    headGeometry.scale(1.12, 0.96, 1.0);
    const headMesh = new THREE.Mesh(headGeometry, goldMaterial);
    headGroup.add(headMesh);

    // Visor screen (faceplate)
    const visorGeometry = new THREE.SphereGeometry(0.52, 32, 32);
    visorGeometry.scale(1.05, 0.65, 0.45);
    const visorMesh = new THREE.Mesh(visorGeometry, visorMaterial);
    visorMesh.position.set(0, 0.02, 0.45);
    headGroup.add(visorMesh);

    // Expressive Cute Eyes
    const eyeGeometry = new THREE.CapsuleGeometry(0.065, 0.1, 16, 16);
    const leftEye = new THREE.Mesh(eyeGeometry, eyeGlowMaterial);
    leftEye.position.set(-0.2, 0.04, 0.64);
    leftEye.rotation.z = 0.08;
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeGlowMaterial);
    rightEye.position.set(0.2, 0.04, 0.64);
    rightEye.rotation.z = -0.08;
    headGroup.add(rightEye);

    // Cute blush dots
    const blushMaterial = new THREE.MeshBasicMaterial({ color: 0xff99bb });
    const blushGeometry = new THREE.CircleGeometry(0.05, 16);
    const leftBlush = new THREE.Mesh(blushGeometry, blushMaterial);
    leftBlush.position.set(-0.35, -0.08, 0.6);
    leftBlush.rotation.y = -0.25;
    headGroup.add(leftBlush);

    const rightBlush = new THREE.Mesh(blushGeometry, blushMaterial);
    rightBlush.position.set(0.35, -0.08, 0.6);
    rightBlush.rotation.y = 0.25;
    headGroup.add(rightBlush);

    // Cute Golden Ears / Antenna Rings
    const earGeometry = new THREE.TorusGeometry(0.18, 0.05, 16, 32);
    const leftEar = new THREE.Mesh(earGeometry, goldMaterial);
    leftEar.position.set(-0.76, 0.15, 0);
    leftEar.rotation.y = Math.PI / 2;
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeometry, goldMaterial);
    rightEar.position.set(0.76, 0.15, 0);
    rightEar.rotation.y = Math.PI / 2;
    headGroup.add(rightEar);

    // Floating Halo Ring above head
    const haloGeometry = new THREE.TorusGeometry(0.48, 0.035, 16, 48);
    haloGeometry.rotateX(Math.PI / 2.2);
    const haloMaterial = new THREE.MeshBasicMaterial({ color: 0xfff0aa });
    const haloMesh = new THREE.Mesh(haloGeometry, haloMaterial);
    haloMesh.position.set(0, 0.88, 0);
    headGroup.add(haloMesh);

    // 3. Floating Golden Paws / Hands
    const handGeometry = new THREE.SphereGeometry(0.2, 24, 24);
    handGeometry.scale(1, 0.8, 1);
    const leftHand = new THREE.Mesh(handGeometry, goldMaterial);
    leftHand.position.set(-0.95, -0.25, 0.2);
    mascotGroup.add(leftHand);

    const rightHand = new THREE.Mesh(handGeometry, goldMaterial);
    rightHand.position.set(0.95, -0.25, 0.2);
    mascotGroup.add(rightHand);

    // 4. Orbiting Mini Satellite Drone
    const droneGroup = new THREE.Group();
    scene.add(droneGroup);

    const droneGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const droneMesh = new THREE.Mesh(droneGeometry, goldMaterial);
    droneMesh.position.set(1.4, 0.5, 0);
    droneGroup.add(droneMesh);

    const droneRingGeom = new THREE.TorusGeometry(0.18, 0.02, 8, 24);
    droneRingGeom.rotateX(Math.PI / 2);
    const droneRing = new THREE.Mesh(droneRingGeom, haloMaterial);
    droneRing.position.set(1.4, 0.5, 0);
    droneGroup.add(droneRing);

    // Pointer tracking variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      const normX = (clientX / rect.width) * 2 - 1;
      const normY = -(clientY / rect.height) * 2 + 1;

      targetRotationY = normX * 0.45;
      targetRotationX = -normY * 0.35;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let animId: number;
    let jumpStartTime = 0;

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Smooth pointer follow with damping
      mascotGroup.rotation.y +=
        (targetRotationY - mascotGroup.rotation.y) * 0.08;
      mascotGroup.rotation.x +=
        (targetRotationX - mascotGroup.rotation.x) * 0.08;

      // Gentle floating sin wave
      const floatY = Math.sin(elapsedTime * 2.2) * 0.08;
      mascotGroup.position.y = floatY;

      // Subtle breathing scale
      const breath = 1 + Math.sin(elapsedTime * 2.8) * 0.015;
      mascotGroup.scale.set(breath, breath, breath);

      // Cute ear wiggle & hand bobbing
      leftHand.position.y = -0.25 + Math.sin(elapsedTime * 3.0) * 0.04;
      rightHand.position.y = -0.25 + Math.cos(elapsedTime * 3.0) * 0.04;
      haloMesh.rotation.z = elapsedTime * 0.5;

      // Orbiting companion drone
      droneGroup.rotation.y = elapsedTime * 1.4;
      droneMesh.position.y = 0.5 + Math.sin(elapsedTime * 4.0) * 0.1;
      droneRing.position.y = droneMesh.position.y;

      // Jump / Spin reaction when clicked
      if (isJumpingRef.current) {
        const jumpProgress = (performance.now() - jumpStartTime) / 600;
        if (jumpProgress < 1) {
          mascotGroup.position.y =
            floatY + Math.sin(jumpProgress * Math.PI) * 0.5;
          mascotGroup.rotation.y += Math.PI * 2 * 0.08;
        } else {
          isJumpingRef.current = false;
        }
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      // Dispose materials & geometries
      scene.clear();
    };
  }, []);

  const handleMascotClick = () => {
    isJumpingRef.current = true;
    setClickCount((prev) => prev + 1);

    const friendlyMessages = [
      "✨ AuraBot: “Let's build something extraordinary!”",
      "🏆 AuraBot: “Hackathons are won at 3 AM!”",
      "⚡ AuraBot: “Distributed consensus achieved!”",
      "💛 AuraBot: “1,200 teams couldn't stop our momentum!”",
      "🚀 AuraBot: “Precision engineering in progress!”",
    ];
    const msg =
      friendlyMessages[Math.floor(Math.random() * friendlyMessages.length)];
    setInteractionMessage(msg);

    // Auto-clear message after 3.5s
    setTimeout(() => {
      setInteractionMessage("");
    }, 3500);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-[460px] mx-auto select-none">
      {/* 3D Viewport or WebGL Fallback */}
      <div
        className="relative w-full h-[400px] sm:h-[450px] flex items-center justify-center cursor-pointer group"
        onClick={handleMascotClick}
        role="button"
        tabIndex={0}
        aria-label="Interactive 3D Team Mascot AuraBot. Click to make him jump and celebrate!"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleMascotClick();
          }
        }}
      >
        {/* Soft Golden Halo Behind Mascot */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-full blur-[80px] bg-[radial-gradient(circle,rgba(246,226,122,0.35)_0%,rgba(212,175,55,0.1)_60%,transparent_80%)] pointer-events-none group-hover:scale-110 transition-transform duration-500"
        />

        {hasWebGL ? (
          <div ref={mountRef} className="w-full h-full" />
        ) : (
          /* Graceful High-Quality Mascot Fallback */
          <div className="relative w-64 h-64 rounded-full bg-gradient-to-tr from-[#161E30] to-[#25324D] border-2 border-[rgba(212,175,55,0.5)] flex flex-col items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.3)]">
            <div className="w-32 h-32 rounded-full bg-gradient-to-b from-[#F6E27A] to-[#D4AF37] shadow-[0_0_30px_rgba(246,226,122,0.5)] flex items-center justify-center relative">
              <div className="w-20 h-10 rounded-full bg-[#07090E] flex items-center justify-center gap-3">
                <div className="w-3 h-4 rounded-full bg-[#38E1FF] shadow-[0_0_8px_#38E1FF]" />
                <div className="w-3 h-4 rounded-full bg-[#38E1FF] shadow-[0_0_8px_#38E1FF]" />
              </div>
            </div>
            <p className="mt-4 text-xs font-semibold text-[#F6E27A] tracking-wider uppercase">
              AuraBot • Mascot Fallback
            </p>
          </div>
        )}

        {/* Hover Cue Tag */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 liquid-glass-gold px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-medium text-[#F6E27A] border border-[rgba(212,175,55,0.4)] shadow-[0_4px_16px_rgba(0,0,0,0.4)] pointer-events-none group-hover:scale-105 transition-all">
          <Sparkles className="w-3.5 h-3.5 text-[#F6E27A] animate-pulse" />
          <span>Click to interact with AuraBot</span>
        </div>
      </div>

      {/* Interactive Speech Bubble */}
      {interactionMessage && (
        <div
          role="status"
          className="mt-3 liquid-glass-elevated px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-[#FFFDF5] border border-[rgba(246,226,122,0.5)] shadow-[0_8px_25px_rgba(212,175,55,0.3)] flex items-center gap-2 animate-bounce"
        >
          <Heart className="w-4 h-4 text-[#F6E27A] fill-[#F6E27A]" />
          <span>{interactionMessage}</span>
        </div>
      )}
    </div>
  );
}
