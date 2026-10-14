"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

interface PhotorealisticMoonProps {
  progress: number; // Normalized scroll progress: 0 to 1
}

export function PhotorealisticMoon({ progress }: PhotorealisticMoonProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const moonGroupRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const smoothedProgressRef = useRef<number>(progress);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    const testCanvas = document.createElement("canvas");
    const gl =
      testCanvas.getContext("webgl") ||
      testCanvas.getContext("experimental-webgl");
    if (!gl) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Three.js Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

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
      renderer.toneMappingExposure = 1.15;
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch {
      return;
    }

    // Directional Sunlight (Casts dramatic crater relief across the terminator line)
    const sunLight = new THREE.DirectionalLight(0xfff7e6, 2.8);
    sunLight.position.set(5, 3, 4.5);
    scene.add(sunLight);

    // Deep Space Ambient Light
    const spaceAmbient = new THREE.AmbientLight(0x0a101d, 0.35);
    scene.add(spaceAmbient);

    // Subtle Earthshine / Rim Light (Cold blue reflection from space)
    const rimLight = new THREE.DirectionalLight(0x3865a3, 0.65);
    rimLight.position.set(-5, -2, -3);
    scene.add(rimLight);

    // Moon Group (Handles positioning, scale, and local X-axis rotation)
    const moonGroup = new THREE.Group();
    moonGroupRef.current = moonGroup;
    scene.add(moonGroup);

    // Position Moon in background (upper-right quadrant)
    const isMobile = window.innerWidth < 768;
    moonGroup.position.set(isMobile ? 1.0 : 2.7, isMobile ? 1.4 : 1.3, -1.0);
    const baseScale = isMobile ? 1.3 : 2.05;
    moonGroup.scale.set(baseScale, baseScale, baseScale);

    // Texture Loading
    const textureLoader = new THREE.TextureLoader();
    const diffuseMap = textureLoader.load(
      "/models/moon/Diffuse_2K.png",
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
      }
    );
    const bumpMap = textureLoader.load("/models/moon/Bump_2K.png");

    // Photorealistic Lunar Material with physical roughness & crater relief
    const moonMaterial = new THREE.MeshStandardMaterial({
      map: diffuseMap,
      bumpMap: bumpMap,
      bumpScale: 0.055,
      roughness: 0.88,
      metalness: 0.02,
    });

    // 1. Immediate Sphere Geometry (zero wait, instant photorealistic render)
    const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
    const sphereMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonGroup.add(sphereMesh);

    // 2. Load the specific Moon 2K OBJ model if available
    const objLoader = new OBJLoader();
    objLoader.load(
      "/models/moon/Moon_2K.obj",
      (obj) => {
        obj.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = moonMaterial;
          }
        });
        moonGroup.remove(sphereMesh);
        sphereGeometry.dispose();
        moonGroup.add(obj);
      },
      undefined,
      () => {
        // Fallback sphere geometry remains active seamlessly
      }
    );

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const rotationSpeed = prefersReducedMotion ? 0.005 : 0.025;

    // Handle Window Resize
    const handleResize = () => {
      if (!renderer) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      const mobile = w < 768;
      moonGroup.position.set(mobile ? 0.8 : 2.7, mobile ? 1.4 : 1.3, -1.0);
      const sc = mobile ? 1.3 : 2.05;
      moonGroup.scale.set(sc, sc, sc);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop with performance.now() (eliminates THREE.Clock deprecation notice)
    let animId: number;
    let lastTime = performance.now();

    const animate = () => {
      const now = performance.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Rotate continuously on its own local Y-axis (equatorial spin)
      moonGroup.rotation.y += delta * rotationSpeed;

      // Smooth scroll parallax position adjustment without blurring
      smoothedProgressRef.current +=
        (progress - smoothedProgressRef.current) * 0.08;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      moonMaterial.dispose();
      sphereGeometry.dispose();
      diffuseMap.dispose();
      bumpMap.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        opacity: 0.95, // Sharp, 0 blur, constant photorealistic clarity
      }}
    >
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
