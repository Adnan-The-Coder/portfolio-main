"use client";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";

import Adnan from "@/public/assets/GB/Adnan-2.png";
import { Spotlight } from "./ui/Spotlight";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // Refs for all animated elements
  const heroRef = useRef<HTMLDivElement>(null);
  const adnanRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const contentSlideRef = useRef<HTMLDivElement>(null);
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  
  // State management
  const [isScrolling, setIsScrolling] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Tech stack data
  const techStack = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AI/ML'];

  // Predefined particle configurations to avoid hydration issues
  const particleConfigs = [
    { size: 1.5, opacity: 0.3, left: 10, top: 20, duration: 18 },
    { size: 1, opacity: 0.4, left: 25, top: 60, duration: 22 },
    { size: 2, opacity: 0.25, left: 45, top: 15, duration: 20 },
    { size: 1.2, opacity: 0.35, left: 65, top: 80, duration: 25 },
    { size: 1.8, opacity: 0.28, left: 80, top: 35, duration: 19 },
    { size: 1, opacity: 0.42, left: 90, top: 70, duration: 23 },
    { size: 1.3, opacity: 0.33, left: 15, top: 45, duration: 21 },
    { size: 1.6, opacity: 0.29, left: 35, top: 85, duration: 24 },
    { size: 1, opacity: 0.38, left: 55, top: 10, duration: 17 },
    { size: 1.4, opacity: 0.31, left: 75, top: 55, duration: 26 },
    { size: 1.1, opacity: 0.36, left: 5, top: 75, duration: 18 },
    { size: 1.7, opacity: 0.27, left: 95, top: 25, duration: 22 },
    { size: 1, opacity: 0.41, left: 20, top: 90, duration: 20 },
    { size: 1.5, opacity: 0.32, left: 40, top: 50, duration: 19 },
    { size: 1.2, opacity: 0.37, left: 60, top: 5, duration: 24 },
    { size: 1, opacity: 0.39, left: 85, top: 85, duration: 21 },
    { size: 1.3, opacity: 0.34, left: 30, top: 30, duration: 23 },
    { size: 1.6, opacity: 0.26, left: 70, top: 65, duration: 25 },
    { size: 1.1, opacity: 0.43, left: 12, top: 95, duration: 18 },
    { size: 1.8, opacity: 0.24, left: 88, top: 15, duration: 27 }
  ];

  // Set isClient to true after component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Create particles only on client side
  useEffect(() => {
    if (!isClient || !particlesContainerRef.current) return;

    const createParticles = () => {
      const fragment = document.createDocumentFragment();
      
      particleConfigs.forEach((config, i) => {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        particle.style.cssText = `
          position: absolute;
          width: ${config.size}px;
          height: ${config.size}px;
          background: radial-gradient(circle, #3b82f6, #1d4ed8);
          border-radius: 50%;
          opacity: ${config.opacity};
          left: ${config.left}%;
          top: ${config.top}%;
          pointer-events: none;
          box-shadow: 0 0 6px rgba(59, 130, 246, 0.3);
          animation: floatUp ${config.duration}s linear infinite;
          animation-delay: ${i * 0.5}s;
        `;
        
        fragment.appendChild(particle);
      });
      
      particlesContainerRef.current?.appendChild(fragment);
    };

    createParticles();

    return () => {
      if (particlesContainerRef.current) {
        particlesContainerRef.current.innerHTML = '';
      }
    };
  }, [isClient]);

  // Initial entrance animations
  useGSAP(() => {
    if (!isClient) return;

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([nameRef.current, titleRef.current, subtitleRef.current, techStackRef.current, ctaRef.current], {
        opacity: 0,
        y: 60,
      });

      gsap.set(adnanRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 40,
      });

      gsap.set(contentSlideRef.current, {
        yPercent: 100,
        opacity: 0,
      });

      // Create master entrance timeline
      const entranceTl = gsap.timeline({ delay: 0.3 });

      entranceTl
        .to(nameRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        })
        .to(adnanRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.2,
          ease: "back.out(1.2)",
        }, "-=0.6")
        .to([titleRef.current, subtitleRef.current], {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
        }, "-=0.8")
        .to(techStackRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        }, "-=0.6")
        .to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.4");

      // Continuous floating animation
      gsap.to(adnanRef.current, {
        y: -8,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Subtle rotation
      gsap.to(adnanRef.current, {
        rotation: 1.5,
        duration: 4,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

    }, heroRef);

    return () => ctx.revert();
  }, [isClient]);

  // Main scroll transformation timeline
  useGSAP(() => {
    if (!isClient) return;

    const ctx = gsap.context(() => {
      
      // Create the main scroll timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            setIsScrolling(self.progress > 0.1 && self.progress < 0.9);
          },
          onLeave: () => {
            setIsScrolling(false);
          },
          onEnterBack: () => {
            setIsScrolling(false);
          },
        }
      });

      // Image transformation: shrink and move to top-right
      scrollTl.to(adnanRef.current, {
        scale: 0.25,
        xPercent: 140,
        yPercent: -120,
        rotation: 0,
        ease: "power1.inOut",
        duration: 1,
      }, 0);

      // Name: fade out and slide left
      scrollTl.to(nameRef.current, {
        opacity: 0,
        xPercent: -80,
        yPercent: -15,
        scale: 0.9,
        ease: "power1.out",
        duration: 0.8,
      }, 0);

      // Title and subtitle: fade and move up
      scrollTl.to([titleRef.current, subtitleRef.current], {
        opacity: 0,
        yPercent: -25,
        ease: "power1.out",
        duration: 0.8,
        stagger: 0.05,
      }, 0.1);

      // Tech stack: fade out
      scrollTl.to(techStackRef.current, {
        opacity: 0,
        yPercent: -20,
        scale: 0.95,
        ease: "power1.out",
        duration: 0.8,
      }, 0.15);

      // CTA: fade out and slide down
      scrollTl.to(ctaRef.current, {
        opacity: 0,
        yPercent: 25,
        ease: "power1.out",
        duration: 0.8,
      }, 0.2);

      // Content slide: bring up new content
      scrollTl.to(contentSlideRef.current, {
        yPercent: 0,
        opacity: 1,
        ease: "power1.inOut",
        duration: 1,
      }, 0.4);

    }, heroRef);

    return () => ctx.revert();
  }, [isClient]);

  // Mouse parallax effect (disabled during scroll)
  useGSAP(() => {
    if (!isClient) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isScrolling) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;

      gsap.to(adnanRef.current, {
        x: xPos * 8,
        y: yPos * 5,
        duration: 1.5,
        ease: "power1.out",
        overwrite: "auto",
      });

      gsap.to(nameRef.current, {
        x: xPos * -4,
        y: yPos * -2,
        duration: 1.5,
        ease: "power1.out",
        overwrite: "auto",
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isClient, isScrolling]);

  // Enhanced hover effects (disabled during scroll)
  const handleImageHover = () => {
    if (isScrolling || !isClient) return;
    
    gsap.to(adnanRef.current, {
      scale: "+=0.05",
      filter: "brightness(1.1) contrast(1.05) drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))",
      duration: 0.3,
      ease: "power1.out",
    });
  };

  const handleImageLeave = () => {
    if (isScrolling || !isClient) return;
    
    gsap.to(adnanRef.current, {
      scale: "-=0.05",
      filter: "brightness(1) contrast(1) drop-shadow(0 0 0px transparent)",
      duration: 0.3,
      ease: "power1.out",
    });
  };

  return (
    <>
      {/* CSS for particles - only render on client */}
      {isClient && (
        <style jsx>{`
          @keyframes floatUp {
            0% {
              transform: translateY(0) translateX(0);
              opacity: 0.6;
            }
            50% {
              opacity: 1;
            }
            100% {
              transform: translateY(-100vh) translateX(20px);
              opacity: 0;
            }
          }
          
          .hero-particle {
            will-change: transform, opacity;
          }
          
          @media (prefers-reduced-motion: reduce) {
            .hero-particle {
              animation: none !important;
            }
          }
        `}</style>
      )}

      <section 
        ref={heroRef}
        className="relative w-full bg-black overflow-hidden"
        style={{ height: "200vh" }}
        aria-label="Hero section"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] sm:bg-[size:60px_60px]" />
          </div>
        </div>

        {/* Particles Container - only render on client */}
        {isClient && (
          <div 
            ref={particlesContainerRef}
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          />
        )}

        {/* Spotlight Effect */}
        <Spotlight
          className="bg-blue-500/10 blur-3xl"
          size={600}
          springOptions={{
            bounce: 0.1,
            duration: 0.4,
          }}
        />

        {/* Main Hero Content */}
        <div className="fixed inset-0 z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="relative w-full max-w-7xl text-center">
            
            {/* Name */}
            <header 
              ref={nameRef}
              className="mb-6 sm:mb-8"
            >
              <h1 className="text-6xl font-black leading-none tracking-wider bg-gradient-to-r from-white via-blue-100 to-gray-300 bg-clip-text text-transparent sm:text-7xl md:text-8xl lg:text-[8rem] xl:text-[10rem]">
                ADNAN
              </h1>
              <div className="mx-auto mt-3 h-0.5 w-24 rounded-full bg-gradient-to-r from-blue-400 to-white sm:mt-4 sm:h-1 sm:w-32 md:w-40" />
            </header>

            {/* Adnan Image */}
            <div className="relative mb-6 flex justify-center sm:mb-8">
              <div className="relative">
                {/* Glowing background */}
                <div className="absolute -inset-12 rounded-full bg-gradient-to-r from-blue-600/15 to-blue-400/8 blur-3xl sm:-inset-16" />
                <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-blue-500/10 to-transparent blur-2xl sm:-inset-8" />
                
                {/* Image container */}
                <div 
                  ref={adnanRef}
                  className="relative z-10 cursor-pointer transform-gpu"
                  onMouseEnter={handleImageHover}
                  onMouseLeave={handleImageLeave}
                  role="img"
                  aria-label="Adnan profile image"
                >
                  <Image
                    src={Adnan}
                    alt="Adnan - Full Stack Developer"
                    className="h-64 w-64 object-contain filter drop-shadow-2xl sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 xl:h-[420px] xl:w-[420px]"
                    priority
                    sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, (max-width: 1280px) 384px, 420px"
                  />
                  
                  {/* Animated rings */}
                  <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-blue-400/50 border-r-white/30" aria-hidden="true" />
                  <div className="absolute inset-4 animate-spin animate-reverse rounded-full border border-transparent border-b-blue-300/40 border-l-white/20 sm:inset-6" aria-hidden="true" />
                  <div className="absolute -inset-3 animate-spin rounded-full border border-transparent border-t-white/15 opacity-60 sm:-inset-4" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* Title */}
            <div 
              ref={titleRef}
              className="mb-4 sm:mb-6"
            >
              <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
                Full Stack Developer
              </h2>
              <h3 className="mt-1 text-lg font-bold text-blue-300 sm:mt-2 sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl">
                & Tech Innovator
              </h3>
            </div>

            {/* Subtitle */}
            <div 
              ref={subtitleRef}
              className="mb-6 sm:mb-8"
            >
              <p className="mx-auto max-w-4xl text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg lg:text-xl">
                Crafting digital experiences with cutting-edge technologies. 
                Passionate about creating scalable solutions that push the boundaries of what's possible.
              </p>
            </div>

            {/* Tech Stack */}
            <div 
              ref={techStackRef}
              className="mb-8 sm:mb-12"
            >
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {techStack.map((tech, i) => (
                  <span 
                    key={tech}
                    className="rounded-full border border-blue-400/25 bg-gray-900/80 px-3 py-1.5 text-xs font-medium text-blue-200 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-blue-400/50 hover:bg-blue-400/10 sm:px-4 sm:py-2 sm:text-sm md:px-6 md:py-3 md:text-base"
                    style={{
                      animationDelay: `${i * 0.1}s`
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div ref={ctaRef}>
              <button 
                className="group relative rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-base font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/30 active:scale-95 sm:px-8 sm:py-4 md:px-10 md:py-5 md:text-lg lg:text-xl"
                aria-label="Get in touch with Adnan"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </div>
          </div>
        </div>

        {/* Content that slides up from bottom */}
        <div 
          ref={contentSlideRef}
          className="fixed inset-0 z-20 flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center text-white">
            <h2 className="mb-4 text-3xl font-bold sm:mb-6 sm:text-4xl md:text-6xl">
              Welcome to My World
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-300 sm:text-xl md:text-2xl">
              This is where the next section content would appear as the hero transforms
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2 animate-bounce text-xs font-medium text-gray-400 sm:bottom-8 sm:text-sm"
          aria-label="Scroll down to explore more content"
        >
          Scroll to explore ↓
        </div>
      </section>
    </>
  );
};

export default Hero;