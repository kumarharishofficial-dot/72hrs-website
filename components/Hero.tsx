import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { TRUSTED_BY_LOGOS } from '../constants';

// Make THREE available in the scope
const THREE = (window as any).THREE;

const Hero: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { handleLinkClick } = useSmoothScroll();

  useEffect(() => {
    if (!THREE) {
      console.error("Three.js not loaded");
      return;
    }

    const mountNode = mountRef.current;
    if (!mountNode) return;

    let scene: any, camera: any, renderer: any, particles: any;
    let mouseX = 0, mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    let animationFrameId: number;

    const init = () => {
      // Scene
      scene = new THREE.Scene();

      // Camera
      camera = new THREE.PerspectiveCamera(75, mountNode.offsetWidth / mountNode.offsetHeight, 1, 10000);
      camera.position.z = 350;

      // Particles
      const particleCount = 5000;
      const particlesGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 1000;
      }
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particlesMaterial = new THREE.PointsMaterial({
        color: 0x00dcfd,
        size: 1.5,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: 0.7
      });
      
      particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(mountNode.offsetWidth, mountNode.offsetHeight);
      mountNode.appendChild(renderer.domElement);

      // Event Listeners
      document.addEventListener('mousemove', onDocumentMouseMove, false);
      window.addEventListener('resize', onWindowResize, false);
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      render();
    };

    const render = () => {
      const time = Date.now() * 0.00005;

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      particles.rotation.x = time * 2;
      particles.rotation.y = time * 2.5;

      renderer.render(scene, camera);
    };

    const onWindowResize = () => {
      camera.aspect = mountNode.offsetWidth / mountNode.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountNode.offsetWidth, mountNode.offsetHeight);
    };

    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) / 4;
      mouseY = (event.clientY - windowHalfY) / 4;
    };

    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      // Clean up Three.js objects
      scene.remove(particles);
      particles.geometry.dispose();
      particles.material.dispose();
      renderer.dispose();
      if(mountNode && renderer.domElement) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section id="home" className="relative bg-dark-bg text-white overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900/80 via-dark-bg to-dark-bg"></div>
      <div ref={mountRef} className="absolute top-0 left-0 w-full h-full z-10 opacity-80" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col items-center justify-center min-h-screen text-center pt-24 pb-12">
        <div className="mb-4 text-sm font-bold tracking-widest uppercase text-primary-cyan">{t('hero.preheader')}</div>
        <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-geist tracking-tighter text-white mb-6 max-w-4xl"
            dangerouslySetInnerHTML={{ __html: t('hero.title') }}
        />
        <p className="max-w-2xl mx-auto mt-6 text-lg md:text-xl text-gray-300">
          {t('hero.subtitle')}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#pricing"
            onClick={handleLinkClick}
            className="w-full sm:w-auto inline-block px-8 py-3 text-base font-semibold text-white bg-primary-cyan rounded-lg shadow-[0_0_20px_rgba(0,220,253,0.5)] hover:bg-opacity-90 transform hover:-translate-y-1 transition-all duration-300"
          >
            {t('hero.ctaLaunch')}
          </a>
          <a
            href="#features"
            onClick={handleLinkClick}
            className="w-full sm:w-auto inline-block px-8 py-3 text-base font-semibold text-white bg-transparent border-2 border-gray-500/80 rounded-lg hover:bg-gray-800/50 hover:border-gray-400 transform hover:-translate-y-1 transition-all duration-300"
          >
            {t('hero.ctaExplore')}
          </a>
        </div>
        <div className="mt-20 lg:mt-24 w-full max-w-4xl">
            <p className="text-sm text-gray-400">{t('hero.trustedBy')}</p>
            <div className="mt-6 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-gray-400/80">
                {TRUSTED_BY_LOGOS.map(logo => (
                    <span key={logo} className="font-semibold text-lg opacity-60 hover:opacity-100 transition-opacity">{logo}</span>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;