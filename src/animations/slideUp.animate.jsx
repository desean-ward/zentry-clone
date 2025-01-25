import { useEffect, useState } from "react";
import { gsap } from "gsap";

const SlideUp = ({ textRef, content, triggerRef }) => {
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (!textRef.current) return;

    // Ensure the element starts fully hidden
    gsap.set(textRef.current, { opacity: 0, y: 100 });

    // Function to animate tagline
    const animateTagline = (direction) => {
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0,
          y: 100,
        },
        {
          opacity: direction === "in" ? 1 : 0,
          y: direction === "in" ? 0 : 100,
          duration: 1,
          ease: "power1.out",
          delay: content === "Hero" ? 0 : 0.5,
        }
      );
    };

    // Initial animation on page load (for Hero)
    if (content === "Hero") {
      animateTagline("in");
      setInitialLoad(false);
      return;
    }

    animateTagline("in");

    // Set up Intersection Observer (for About section)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateTagline("in");
        } else {
          animateTagline("out");
        }
      },
      {
        threshold: 0.8, // Trigger when 50% of the element is visible
      }
    );

    observer.observe(triggerRef.current);

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, [textRef.current, content]);

  return null;
};

export default SlideUp;
