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
  const roleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const aboutTitleRef = useRef<HTMLDivElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  
  // State management
  const [isScrolling, setIsScrolling] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Set isClient and check mobile on mount
  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Create particles only on client side
  useEffect(() => {
    if (!isClient || !particlesContainerRef.current) return;

    const createParticles = () => {
      const fragment = document.createDocumentFragment();
      
      // Create fewer particles for better performance
      for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        particle.style.cssText = `
          position: absolute;
          width: ${1 + Math.random()}px;
          height: ${1 + Math.random()}px;
          background: radial-gradient(circle, #3b82f6, #1d4ed8);
          border-radius: 50%;
          opacity: ${0.2 + Math.random() * 0.3};
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          pointer-events: none;
          box-shadow: 0 0 6px rgba(59, 130, 246, 0.3);
          animation: floatUp ${15 + Math.random() * 10}s linear infinite;
          animation-delay: ${i * 0.5}s;
        `;
        
        fragment.appendChild(particle);
      }
      
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
      gsap.set([nameRef.current, roleRef.current, descriptionRef.current, ctaRef.current], {
        opacity: 0,
        y: 20,
      });

      gsap.set(adnanRef.current, {
        opacity: 0,
        scale: 0.9,
        y: 10,
      });

      gsap.set(aboutSectionRef.current, {
        opacity: 0,
        y: 30,
      });

      // Create entrance timeline
      const entranceTl = gsap.timeline({ delay: 0.1 });

      entranceTl
        .to(nameRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        })
        .to(roleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.3")
        .to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.3")
        .to(adnanRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.2)",
        }, "-=0.4")
        .to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.3");

      // Subtle floating animation
      gsap.to(adnanRef.current, {
        y: -3,
        duration: 3,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
      });

    }, heroRef);

    return () => ctx.revert();
  }, [isClient]);

  // Scroll animations
  useGSAP(() => {
    if (!isClient) return;

    const ctx = gsap.context(() => {
      // Desktop scroll animation
      if (!isMobile) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            scrub: 1,
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

        // Image moves to top-right as logo
        scrollTl.to(adnanRef.current, {
          scale: 0.3,
          xPercent: 130,
          yPercent: -50,
          ease: "power1.inOut",
        }, 0);

        // Content fades out
        scrollTl.to([nameRef.current, roleRef.current, descriptionRef.current, ctaRef.current], {
          opacity: 0,
          y: -15,
          ease: "power1.out",
          stagger: 0.05,
        }, 0);

        // About section fades in
        scrollTl.to(aboutSectionRef.current, {
          opacity: 1,
          y: 0,
          ease: "power1.inOut",
        }, 0.2);

        // Reverse animations when scrolling back
        scrollTl.to([nameRef.current, roleRef.current, descriptionRef.current, ctaRef.current], {
          opacity: 1,
          y: 0,
          ease: "power1.out",
          stagger: 0.05,
        }, 0.8);

        scrollTl.to(adnanRef.current, {
          scale: 1,
          xPercent: 0,
          yPercent: 0,
          ease: "power1.inOut",
        }, 0.8);

        scrollTl.to(aboutSectionRef.current, {
          opacity: 0,
          y: 30,
          ease: "power1.inOut",
        }, 0.8);

      } else {
        // Mobile scroll animation
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,
            scrub: 1,
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

        // Image shrinks and stays in center
        scrollTl.to(adnanRef.current, {
          scale: 0.4,
          yPercent: -10,
          ease: "power1.inOut",
        }, 0);

        // Content fades out
        scrollTl.to([nameRef.current, roleRef.current, descriptionRef.current, ctaRef.current], {
          opacity: 0,
          y: -20,
          ease: "power1.out",
          stagger: 0.05,
        }, 0);

        // About section fades in and grows
        scrollTl.to(aboutSectionRef.current, {
          opacity: 1,
          y: 0,
          scale: 1.05,
          ease: "power1.inOut",
        }, 0.2);

        // Reverse animations when scrolling back
        scrollTl.to([nameRef.current, roleRef.current, descriptionRef.current, ctaRef.current], {
          opacity: 1,
          y: 0,
          ease: "power1.out",
          stagger: 0.05,
        }, 0.8);

        scrollTl.to(adnanRef.current, {
          scale: 1,
          yPercent: 0,
          ease: "power1.inOut",
        }, 0.8);

        scrollTl.to(aboutSectionRef.current, {
          opacity: 0,
          y: 30,
          scale: 1,
          ease: "power1.inOut",
        }, 0.8);
      }

    }, heroRef);

    return () => ctx.revert();
  }, [isClient, isMobile]);

  // Mouse parallax effect (desktop only)
  useGSAP(() => {
    if (!isClient || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isScrolling) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;

      gsap.to(adnanRef.current, {
        x: xPos * 4,
        y: yPos * 2,
        duration: 1,
        ease: "power1.out",
        overwrite: "auto",
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isClient, isMobile, isScrolling]);

  // Enhanced hover effects
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
      {/* CSS for particles and animations */}
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
        style={{ height: "100vh" }}
        aria-label="Hero section"
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] sm:bg-[size:60px_60px]" />
          </div>
        </div>

        {/* Particles Container */}
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
        <div className="fixed inset-0 z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 pt-8">
          <div className="relative w-full max-w-6xl text-center">
            
            {/* Name */}
            <header 
              ref={nameRef}
              className="mb-3 sm:mb-4"
            >
              <h1 className="text-4xl font-black leading-none tracking-wider bg-gradient-to-r from-white via-blue-100 to-gray-300 bg-clip-text text-transparent sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                ADNAN
              </h1>
              <div className="mx-auto mt-2 h-0.5 w-16 rounded-full bg-gradient-to-r from-blue-400 to-white sm:mt-3 sm:h-1 sm:w-20 md:w-24" />
            </header>

            {/* Role */}
            <div 
              ref={roleRef}
              className="mb-3 sm:mb-4"
            >
              <h2 className="text-base font-bold leading-tight text-white sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                Software Developer & Founder
              </h2>
            </div>

            {/* Description */}
            <div 
              ref={descriptionRef}
              className="mb-4 sm:mb-6"
            >
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg lg:text-xl">
                A passionate full-stack developer and founder of Electroplix, currently pursuing a degree in Computer Science Engineering, with hands-on experience in building scalable and dynamic end-to-end applications.
              </p>
            </div>

            {/* Adnan Image */}
            <div className="relative mb-4 flex justify-center sm:mb-6">
              <div className="relative">
                {/* Glowing background */}
                <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-blue-600/15 to-blue-400/8 blur-2xl sm:-inset-8" />
                <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-blue-500/10 to-transparent blur-xl sm:-inset-4" />
                
                {/* Image container */}
                <div 
                  ref={adnanRef}
                  className="relative z-10 transform-gpu cursor-pointer"
                  onMouseEnter={handleImageHover}
                  onMouseLeave={handleImageLeave}
                  role="img"
                  aria-label="Adnan profile image"
                >
                  <Image
                    src={Adnan}
                    alt="Adnan - Full Stack Developer"
                    className="h-40 w-40 object-contain filter drop-shadow-2xl sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64 xl:h-72 xl:w-72"
                    priority
                    sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, (max-width: 1024px) 224px, (max-width: 1280px) 256px, 288px"
                  />
                  
                  {/* Animated rings */}
                  <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-blue-400/50 border-r-white/30" aria-hidden="true" />
                  <div className="absolute inset-2 animate-spin animate-reverse rounded-full border border-transparent border-b-blue-300/40 border-l-white/20 sm:inset-3" aria-hidden="true" />
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div ref={ctaRef}>
              <button 
                className="group relative rounded-full bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/30 active:scale-95 sm:px-5 sm:py-2.5 md:px-6 md:py-3 md:text-base lg:text-lg"
                aria-label="Get in touch with Adnan"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </div>
          </div>
        </div>

        {/* About Section - Slides up from bottom */}
        <div 
          ref={aboutSectionRef}
          className="fixed inset-0 z-20 flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4 sm:px-6 lg:px-8 pt-8"
        >
          <div className="text-center text-white max-w-5xl">
            <div 
              ref={aboutTitleRef}
              className="mb-4 sm:mb-6"
            >
              <h2 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                About Me
              </h2>
              <h3 className="text-lg font-bold text-white sm:text-xl md:text-2xl lg:text-3xl">
                Software Developer & Founder
              </h3>
            </div>
            
            <div 
              ref={aboutContentRef}
              className="space-y-3 text-left max-w-4xl mx-auto sm:space-y-4"
            >
              <p className="text-sm text-gray-300 sm:text-base md:text-lg lg:text-xl leading-relaxed">
                A passionate full-stack developer and founder of Electroplix, currently pursuing a degree in Computer Science Engineering, with hands-on experience in building scalable and dynamic end-to-end applications.
              </p>
              
              <p className="text-sm text-gray-300 sm:text-base md:text-lg lg:text-xl leading-relaxed">
                Proficient in modern technologies including React.js, Next.js, Node.js, BunJS, HonoJS, Elysia, and database solutions like NeonDB, Supabase, PostgreSQL, and MongoDB.
              </p>
              
              <p className="text-sm text-gray-300 sm:text-base md:text-lg lg:text-xl leading-relaxed">
                Skilled in deploying serverless architectures using Cloudflare Workers, combining strong technical foundations with creative problem-solving to craft efficient, high-impact digital solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="fixed bottom-4 left-1/2 z-30 -translate-x-1/2 animate-bounce text-xs font-medium text-gray-400 sm:bottom-6 sm:text-sm"
          aria-label="Scroll down to explore more content"
        >
          Scroll to explore ↓
        </div>
      </section>
    </>
  );
};

export default Hero;