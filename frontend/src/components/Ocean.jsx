import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water";

const waterNormalsUrl = "https://threejs.org/examples/textures/waternormals.jpg";

export default function Ocean({ className = "", style = {} }) {
    const containerRef = useRef(null);

    useEffect(() => {
        let renderer, scene, camera, water;
        let animationId;

        const container = containerRef.current;
        if (!container) return;

        // Scene
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(new THREE.Color(0x021736), 400, 4000);

        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        const initWidth = container.clientWidth || window.innerWidth;
        const initHeight = container.clientHeight || window.innerHeight;
        renderer.setSize(initWidth, initHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.65;
        container.appendChild(renderer.domElement);

        // Camera
        camera = new THREE.PerspectiveCamera(55, initWidth / initHeight, 1, 20000);
        camera.position.set(30, 18, 90);

        // Water
        const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
        const waterNormals = new THREE.TextureLoader().load(waterNormalsUrl, texture => {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        });
        water = new Water(waterGeometry, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: waterNormals,
            sunDirection: new THREE.Vector3(1, 1, 1).normalize(),
            sunColor: 0xffffff,
            waterColor: 0x062a66, // dark blue
            distortionScale: 5,
            fog: scene.fog !== undefined
        });
        water.rotation.x = -Math.PI / 2;
        scene.add(water);

        // Animate
        const render = () => {
            water.material.uniforms.time.value += 1.0 / 60.0;
            camera.lookAt(0, 0, 0);
            renderer.render(scene, camera);
        };
        const animate = () => {
            render();
            animationId = requestAnimationFrame(animate);
        };
        animate();

        // Resize
        function onWindowResize() {
            const width = container.clientWidth || window.innerWidth;
            const height = container.clientHeight || window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }
        window.addEventListener("resize", onWindowResize);
        const resizeObserver = new ResizeObserver(() => onWindowResize());
        resizeObserver.observe(container);

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", onWindowResize);
            resizeObserver.disconnect();
            if (container && renderer && renderer.domElement && renderer.domElement.parentNode === container) {
                container.removeChild(renderer.domElement);
            }
            if (renderer) renderer.dispose();
        };
    }, []);

    return (
        <div className={"relative overflow-hidden " + className} style={{ minHeight: '60vh', ...style }}>
            <div ref={containerRef} className="absolute top-0 left-0 w-full h-full" />
        </div>
    );
}
