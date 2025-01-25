"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedVideoMask = ({
  id,
  videoSrc,
  isActive,
  className,
  scrollTriggerStart,
  scrollTriggerEnd,
}) => {
  const videoRef = useRef(null);
  const maskRef = useRef(null);

  useEffect(() => {
    if (!maskRef.current || !videoRef.current) return;

    // Set initial state for the mask
    gsap.set(maskRef.current, {
      attr: {
        d: "M50 50C30 30 10 20 10 50C10 80 30 70 50 70C70 70 90 80 90 50C90 20 70 30 50 50Z", // Circular mask
      },
    });

    // Create ScrollTrigger animation for scaling the mask
    ScrollTrigger.create({
      trigger: videoRef.current,
      start: scrollTriggerStart || "top bottom", // Start scaling when the video enters the viewport
      end: scrollTriggerEnd || "top center", // Complete scaling when the video reaches the center
      scrub: true, // Smooth scaling tied to scroll
      onUpdate: (self) => {
        const progress = self.progress;

        // Morph the mask from a circle to a rectangle based on scroll progress
        gsap.to(maskRef.current, {
          attr: {
            d:
              progress < 1
                ? "M50 50C30 30 10 20 10 50C10 80 30 70 50 70C70 70 90 80 90 50C90 20 70 30 50 50Z" // Circular mask
                : "M0 0L100 0L100 100L0 100Z", // Rectangular mask
          },
          duration: 0.1,
          ease: "none",
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Cleanup on unmount
    };
  }, [scrollTriggerStart, scrollTriggerEnd]);

  return (
    <div className={className}>
      {/* SVG for Mask */}
      <svg
        width='0'
        height='0'
        viewBox='0 0 100 100'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs>
          <clipPath id={`mask-${id}`} clipPathUnits='objectBoundingBox'>
            <path
              ref={maskRef}
              d='M50 50C30 30 10 20 10 50C10 80 30 70 50 70C70 70 90 80 90 50C90 20 70 30 50 50Z' // Initial circular mask
            />
          </clipPath>
        </defs>
      </svg>
      {/* Masked Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        preload='auto'
        style={{
          clipPath: `url(#mask-${id})`,
          WebkitClipPath: `url(#mask-${id})`, // Safari support
        }}
        className='absolute w-full h-full object-cover'
      />
    </div>
  );
};

export default AnimatedVideoMask;
