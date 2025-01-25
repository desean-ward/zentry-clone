"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const AnimatedHeading = ({
  textRef,
  contentType = "heading",
  delay = 0,
  context = "Default", // Context for debugging/logging
}) => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (!textRef.current) return;

    // Set the initial opacity for the text container
    gsap.set(textRef.current, { opacity: 0 });

    // Function to animate letters
    const animateLetters = (direction) => {
      let letters = textRef.current.querySelectorAll(".letter");

      if (!letters.length) {
        console.warn(
          `[AnimatedHeading]: No letters found for context: ${context}`
        );
        return;
      }

      // Kill existing animations for letters
      contentType !== "heading" &&
        direction === "out" &&
        gsap.killTweensOf(letters);

      // Animate letters using GSAP
      gsap.fromTo(
        letters,
        {
          opacity: 0,
          rotateX: 90,
        },
        {
          opacity: direction === "in" ? 1 : 0,
          rotateX: direction === "in" ? 0 : -90,
          display:
            contentType !== "heading" && direction === "out"
              ? "none"
              : "inline-block",
          duration: 1,
          delay: delay,
          stagger: contentType === "heading" ? 0.065 : 0.01625, // Adjust stagger for finer control
          ease: "power2.out",
        }
      );
    };

    // Handle initial load animations
    if (initialLoad && context === "Luminar") {
      gsap.to(textRef.current, {
        opacity: 1,
        // delay: 0.12,
        onComplete: () => animateLetters("in"),
      });
      setInitialLoad(false);
    }

    // Set up Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        const direction = entry.isIntersecting ? "in" : "out";
        gsap.to(textRef.current, {
          opacity: entry.isIntersecting ? 1 : 0,
          duration: 0.5,
        });
        animateLetters(direction);
      },
      {
        threshold: 0.2, // Trigger when 20% of the element is visible
      }
    );

    observer.observe(textRef.current);

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, [textRef, context, delay, initialLoad]);

  return null; // This component only handles animations
};

export default AnimatedHeading;
