import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { motion, AnimatePresence } from 'framer-motion';

const PHOTOS = [
  '/assets/photos/0031C2F5-D0D2-43B3-A185-1100FB9DA0D9.jpg',
  '/assets/photos/1AB04405-F2F1-44C2-9D8F-FA0C81BA22FE.jpg',
  '/assets/photos/3B74FBA0-5EBE-41DB-8BC9-79C5525985B2.jpg',
  '/assets/photos/4CB65A0B-8F4C-4844-9999-4D3017130574.jpg',
  '/assets/photos/60DDAA87-7E98-4AE3-8331-F3EB9902A524.jpg',
  '/assets/photos/65b56b13-fd01-4cb6-9524-9cbe8618316a.jpg',
  '/assets/photos/6bea67cb-cd32-41aa-bbdc-13db666bda52.jpg',
  '/assets/photos/87439B21-B8B1-4DAF-86D7-6AAD4D875A49.JPG',
  '/assets/photos/9b319c4f-4921-4b54-82ad-fdee1f01c205.jpg',
  '/assets/photos/IMG_0993.JPG',
  '/assets/photos/IMG_20230423_141444.jpg',
  '/assets/photos/interactive.JPG',
  '/assets/photos/photo1.jpg',
];

export default function MemoryGalaxy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    // No background color to allow CSS background to show through

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(10, 7, 10);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(renderer.domElement);

    // --- OrbitControls ---
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;
    controls.maxDistance = 25;
    controls.minDistance = 3;

    // --- Galaxy Particles ---
    const parameters = {
      count: 70000,
      size: 0.012,
      radius: 10,
      branches: 3,
      spin: 1.8,
      randomness: 0.35,
      randomnessPower: 3,
      insideColor: '#D4AF37',
      outsideColor: '#1b3984'
    };

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);

    const colorInside = new THREE.Color(parameters.insideColor);
    const colorOutside = new THREE.Color(parameters.outsideColor);

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3;
      const radius = Math.random() * parameters.radius;
      const spinAngle = radius * parameters.spin;
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
      const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

      positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX;
      positions[i3 + 1] = randomY * 0.5; // Flatten the galaxy a bit
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, radius / parameters.radius);
      colors[i3 + 0] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size: parameters.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });

    const points = new THREE.Points(geometry, pointsMaterial);
    scene.add(points);

    // --- Photo Stars ---
    const textureLoader = new THREE.TextureLoader();
    const loadedTextures = PHOTOS.map(url => textureLoader.load(url));

    const photoGroup = new THREE.Group();
    scene.add(photoGroup);

    const planes: THREE.Mesh[] = [];
    const planeGeometry = new THREE.PlaneGeometry(0.12, 0.12);

    const photoCount = 600;
    for (let i = 0; i < photoCount; i++) {
      const radius = (Math.random() * parameters.radius * 0.98) + 0.3;
      const spinAngle = radius * parameters.spin;
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

      const spreadFactor = 0.15;
      const x = Math.cos(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * spreadFactor;
      const z = Math.sin(branchAngle + spinAngle) * radius + (Math.random() - 0.5) * spreadFactor;
      const y = (Math.random() - 0.5) * 1.5;

      const textureIndex = i % loadedTextures.length;
      const material = new THREE.MeshBasicMaterial({
        map: loadedTextures[textureIndex],
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.NormalBlending
      });

      const mesh = new THREE.Mesh(planeGeometry, material);
      mesh.position.set(x, y, z);
      mesh.userData = {
        url: PHOTOS[textureIndex],
        originalOpacity: 0.5,
        phase: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.3
      };
      photoGroup.add(mesh);
      planes.push(mesh);
    }

    // --- Interactivity ---
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // --- Animation ---
    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      controls.update();

      // Cinematic motion for photo stars
      planes.forEach((p) => {
        // Bobbing & Twinkling
        const data = p.userData;
        p.position.y += Math.sin(elapsedTime * data.speed + data.phase) * 0.0005;

        // Face camera
        p.quaternion.copy(camera.quaternion);

        // Distance-based fading (depth of field simulation)
        const distance = p.position.distanceTo(camera.position);
        const fadeStart = 15;
        const fadeEnd = 25;
        let opacity = data.originalOpacity;

        if (distance > fadeStart) {
          opacity *= Math.max(0, 1 - (distance - fadeStart) / (fadeEnd - fadeStart));
        }

        // Subtle twinkling
        opacity *= (0.8 + Math.sin(elapsedTime * 2 + data.phase) * 0.2);

        (p.material as THREE.MeshBasicMaterial).opacity = opacity;
      });

      // Raycasting
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planes);

      if (intersects.length > 0) {
        const target = intersects[0].object as THREE.Mesh;
        setHoveredPhoto(target.userData.url);
        target.scale.set(3, 3, 3); // Significant scale for visibility
        (target.material as THREE.MeshBasicMaterial).opacity = 1.0;
      } else {
        setHoveredPhoto(null);
        planes.forEach(p => {
          p.scale.set(1, 1, 1);
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);

      geometry.dispose();
      pointsMaterial.dispose();
      planes.forEach(p => {
        (p.material as THREE.MeshBasicMaterial).dispose();
      });
      loadedTextures.forEach(t => t.dispose());
      renderer.dispose();

      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden z-40">
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* UI Overlay */}
      <div className="absolute top-10 left-10 z-50 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex flex-col gap-1"
        >
          <h2 className="font-sacramento text-7xl text-white/90 drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">
            Our Galaxy
          </h2>
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-gold/60 to-transparent" />
            <p className="font-sans text-gold/60 text-[10px] tracking-[0.4em] uppercase">
              Memories through the cosmos
            </p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {hoveredPhoto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 30, filter: 'blur(10px)' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="absolute bottom-12 right-12 z-50 flex flex-col items-center group"
          >
            <div className="relative p-1 bg-gradient-to-tr from-gold/50 via-white/20 to-gold/50 rounded-2xl">
              <div className="bg-black/80 backdrop-blur-3xl rounded-[14px] p-4 border border-white/5 shadow-2xl">
                <img
                  src={hoveredPhoto}
                  alt="Memory"
                  className="w-64 h-64 object-cover rounded-lg shadow-inner grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 flex flex-col items-center gap-1"
                >
                  <span className="font-handwritten text-gold text-2xl">A piece of us</span>
                  <div className="h-[1px] w-20 bg-gold/20" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Help */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 text-[10px] text-white tracking-widest uppercase font-sans pointer-events-none"
      >
        <span>Drag to Orbit</span>
        <div className="w-8 h-[1px] bg-white/20" />
        <span>Scroll to Zoom</span>
      </motion.div>
    </div>
  );
}
