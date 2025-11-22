document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    // Scene Setup
    const scene = new THREE.Scene();
    // Fog for depth - Dark background color
    scene.fog = new THREE.FogExp2(0x0B0C10, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 28;
    camera.position.y = 5;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- DIGITAL GLOBE SYSTEM ---

    const globeGroup = new THREE.Group();
    // Position: Right (x > 0) and slightly Up (y > 0) relative to camera center
    globeGroup.position.set(10, 4, 0);
    scene.add(globeGroup);

    // 1. The Grid Sphere (Latitude/Longitude)
    const globeGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(10, 32, 32));
    const globeMat = new THREE.LineBasicMaterial({
        color: 0x30e9bb, // Primary (Teal)
        transparent: true,
        opacity: 0.15
    });
    const globeWireframe = new THREE.LineSegments(globeGeo, globeMat);
    globeGroup.add(globeWireframe);

    // 2. The "Data" Particles (Simulating digital landmass/activity)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    const r = 10;
    for (let i = 0; i < particlesCount * 3; i += 3) {
        // Generate points on the surface of the sphere
        const phi = Math.acos(-1 + (2 * Math.random()));
        const theta = Math.sqrt(particlesCount * Math.PI) * phi;

        posArray[i] = r * Math.cos(theta) * Math.sin(phi);     // x
        posArray[i + 1] = r * Math.sin(theta) * Math.sin(phi);   // y
        posArray[i + 2] = r * Math.cos(phi);                     // z
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.15,
        color: 0x30e9bb, // Primary (Teal)
        transparent: true,
        opacity: 0.8,
    });

    const particleSphere = new THREE.Points(particlesGeometry, particlesMaterial);
    globeGroup.add(particleSphere);


    // 3. The "Biping" Location Marker
    const markerGroup = new THREE.Group();

    // Position the marker
    const lat = 45;
    const lon = 15;
    const phiMark = (90 - lat) * (Math.PI / 180);
    const thetaMark = (lon + 180) * (Math.PI / 180);

    const mx = -(r * Math.sin(phiMark) * Math.cos(thetaMark));
    const mz = (r * Math.sin(phiMark) * Math.sin(thetaMark));
    const my = (r * Math.cos(phiMark));

    markerGroup.position.set(mx, my, mz);
    markerGroup.lookAt(0, 0, 0);

    globeGroup.add(markerGroup);

    // 3a. The Dot
    const dotGeo = new THREE.CircleGeometry(0.4, 32);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xbaee1c, side: THREE.DoubleSide }); // Accent (Green)
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.z = 0.1;
    markerGroup.add(dot);

    // 3b. The Pulsing Ring
    const ringGeo = new THREE.RingGeometry(0.4, 0.5, 32);
    const ringMat = new THREE.MeshBasicMaterial({
        color: 0xbaee1c,
        transparent: true,
        opacity: 1,
        side: THREE.DoubleSide
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.z = 0.15;
    markerGroup.add(ring);

    // 3c. Vertical Location Pin Line
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 4)
    ]);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x44dc7e, transparent: true, opacity: 0.3 }); // Accent (Green)
    const pinLine = new THREE.Line(lineGeo, lineMat);
    markerGroup.add(pinLine);


    // 4. Orbital Rings
    const orbitGeo1 = new THREE.TorusGeometry(14, 0.1, 16, 100);
    const orbitMat = new THREE.MeshBasicMaterial({ color: 0x8ad8c4, transparent: true, opacity: 0.3 }); // Primary Light
    const orbit1 = new THREE.Mesh(orbitGeo1, orbitMat);
    orbit1.rotation.x = Math.PI / 2;
    globeGroup.add(orbit1);

    const orbitGeo2 = new THREE.TorusGeometry(18, 0.05, 16, 100);
    const orbit2 = new THREE.Mesh(orbitGeo2, orbitMat);
    orbit2.rotation.x = Math.PI / 3;
    orbit2.rotation.y = Math.PI / 6;
    globeGroup.add(orbit2);


    // 5. Background Sparkles (Flowing Data/Stars)
    const sparklesGeo = new THREE.BufferGeometry();
    const sparklesCount = 1000;
    const sparklesPos = new Float32Array(sparklesCount * 3);

    for (let i = 0; i < sparklesCount * 3; i += 3) {
        sparklesPos[i] = (Math.random() - 0.5) * 150; // Wide X spread
        sparklesPos[i + 1] = (Math.random() - 0.5) * 80; // Y spread
        sparklesPos[i + 2] = (Math.random() - 0.5) * 60; // Z spread
    }

    sparklesGeo.setAttribute('position', new THREE.BufferAttribute(sparklesPos, 3));
    const sparklesMat = new THREE.PointsMaterial({
        color: 0xbaee1c, // SubAccent (Lime/Green)
        size: 0.15,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });
    const sparklesMesh = new THREE.Points(sparklesGeo, sparklesMat);
    scene.add(sparklesMesh);


    // --- ANIMATION LOOP ---

    // Mouse Interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    const clock = new THREE.Clock();

    const animate = () => {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        targetX = mouseX * 0.0005;
        targetY = mouseY * 0.0005;

        // Rotate Globe
        globeGroup.rotation.y += 0.002;

        // Mouse Interaction (Tilt)
        globeGroup.rotation.y += 0.05 * (targetX - globeGroup.rotation.y);
        globeGroup.rotation.x += 0.05 * (targetY - globeGroup.rotation.x);

        // Animate Orbits
        orbit1.rotation.z += 0.002;
        orbit2.rotation.z -= 0.003;

        // Animate "Bip" (Pulse Effect)
        const scale = (elapsedTime * 2) % 3;
        ring.scale.set(1 + scale, 1 + scale, 1);
        ring.material.opacity = 1 - (scale / 3);

        // Animate Sparkles
        sparklesMesh.rotation.y = elapsedTime * 0.05; // Faster rotation
        sparklesMesh.position.y = Math.sin(elapsedTime * 0.2) * 4; // Larger floating movement

        renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Scroll Handler for Opacity and Blur
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const heroHeight = window.innerHeight;

        // Calculate progress (0 to 1) as user scrolls out of hero
        const progress = Math.min(1, scrollY / (heroHeight * 0.8));

        // Opacity: Fade from 0.6 (Hero) down to 0.3 (Content)
        const opacity = 0.6 - (progress * 0.3);

        // Blur: Increase from 0px to 4px (Subtle glass effect)
        const blur = progress * 4;

        canvas.style.opacity = opacity;
        canvas.style.filter = `blur(${blur}px)`;
    });
});
