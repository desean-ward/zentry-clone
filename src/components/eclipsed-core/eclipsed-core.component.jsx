"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  EclipsedCoreContainer,
  EclipsedCoreHeading,
  EclipsedCoreSection,
  EclipsedCoreImgContainer,
  EclipsedCoreDialog,
} from "./eclipsed-core.styles";
import AnimatedHeading from "../../animations/animated-heading.animate";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideUp from "@/animations/slideUp.animate";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EclipsedCore = () => {
  // Monitor the intial load
  const [initialLoad, setInitialLoad] = useState(true);
  // Ref to track `initialLoad`
  const initialLoadRef = useRef(initialLoad);

  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const headingRef = useRef(null);
  const taglineRef = useRef(null);
  const dialog1Ref = useRef(null);
  const dialog2Ref = useRef(null);
  const imgRef = useRef(null);

  const title = "The Eclipsed Core";
  const dialog1 =
    "In a universe where cosmic energies govern the balance between light and shadow, the Eclipsed Core, an ancient artifact of unimaginable power, maintains harmony across the multiverse. This core is safeguarded by the Lumina Nexus, a coalition of protectors from various realms, led by the radiant hero, Luminar. However, the peace shatters when the renegade titan Eclipse Titan—a being of both light and darkness—destroys the Nexus to seize the Core’s power for themselves, creating a rift between realms.";

  const dialog2 =
    "The destruction awakens Shadow Wraith, a villain born from the fractured energies of the Core. Shadow Wraith thrives on chaos, spreading destruction across dimensions. With realms descending into darkness, Luminar and a new ally, the cosmic warrior Nova Flare, must rally against these threats to restore balance.";

  // Wrap each letter in spans for animation
  const wrapLettersAndWords = (text) =>
    text
      .split(" ")
      .map(
        (word) =>
          `<span class="word">${word
            .split("")
            .map((char) =>
              char === " " ? " " : `<span class="letter">${char}</span>`
            )
            .join("")}</span>`
      )
      .join(" ");

  // Sync the ref with state whenever it changes
  useEffect(() => {
    initialLoadRef.current = initialLoad;
  }, [initialLoad]);

  // Slit the header into indiviual letters
  useEffect(() => {
    textRef.current.innerHTML = wrapLettersAndWords(title);
    initialLoadRef.current === true &&
      (dialog1Ref.current.innerHTML = wrapLettersAndWords(dialog1));
    initialLoadRef.current === false &&
      (dialog2Ref.current.innerHTML = wrapLettersAndWords(dialog2));
  }, [initialLoad, initialLoadRef]);

  // Animate dialog2 immediately after `initialLoad` becomes false
  useGSAP(() => {
    if (!dialog1Ref.current || !dialog2Ref.current) return;

    // Wrap letters for both dialogs
    dialog1Ref.current.innerHTML = wrapLettersAndWords(dialog1);
    dialog2Ref.current.innerHTML = wrapLettersAndWords(dialog2);
  }, [dialog1Ref.current, dialog2Ref.current]);

  useGSAP(() => {
    if (!window || window === undefined) return;

    // ***** Total height of the Hero section ***** /
    const totalStickyHeight = window.innerHeight * 2;

    // Pin the sticky section
    ScrollTrigger.create({
      trigger: "#ec-section",
      start: "top top",
      end: () => `+=${totalStickyHeight}`,
      pin: true,
      scrub: 0.1,
      onEnter: () => setInitialLoad(false),
    });

    // Fade-out animation for #ec-section
    gsap.to("#ec-container", {
      opacity: 0,
      scrollTrigger: {
        trigger: "#ec-section",
        start: () => `${totalStickyHeight} bottom`,
        end: () => `${totalStickyHeight} 10%`,
        scrub: true,
        markers: true,
      },
    });

    // Scroll in the background image
    gsap.from("#eclipsed-core-img", {
      y: "100vh",
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: "#ec-section",
        start: "top top",
        end: () => `+=${totalStickyHeight}`,
        toggleActions: "play none none reverse",
        // markers: true,
      },
    });

    // Animate Text Color
    const changeHeadingColor = (direction) => {
      gsap.to(["#ec-heading", "#ec-dialog"], {
        color: direction === "out" ? "white" : "#AC4300",
        duration: 0.75,
      });
    };

    // Intersection Observer for Header Color Change
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          changeHeadingColor("in");
        } else {
          changeHeadingColor("out");
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  return (
    <EclipsedCoreSection id='ec-section' ref={sectionRef}>
      <EclipsedCoreContainer id='ec-container'>
        <EclipsedCoreHeading id='ec-heading' ref={headingRef}>
          {/* Heading */}
          <>
            <h2 ref={textRef} className='hero-heading'>
              {/* Animated Heading */}
              <AnimatedHeading textRef={textRef} context='Eclipsed Core' />
            </h2>
          </>

          {/* Tagline */}
          <p
            id='ec-tagline'
            ref={taglineRef}
            className='mb-5 max-w-128 font-robert-regular text-4xl lg:text-6xl text-shadow-lg text-center md:text-start opacity-0'
          >
            Fractured Realms.
          </p>

          {/* Animate the tagline */}
          <SlideUp textRef={taglineRef} triggerRef={sectionRef} />
        </EclipsedCoreHeading>

        {/* Dialogs */}
        <EclipsedCoreDialog id='ec-dialog' className=''>
          <p id='dialog-1' ref={dialog1Ref} className='text-shadow '>
            {/* Animated Heading */}
            <AnimatedHeading
              textRef={dialog1Ref}
              context='Dialog 1'
              contentType='text'
            />
          </p>

          {/* Dialog 2 */}
          <p
            id='dialog-2'
            ref={dialog2Ref}
            className={
              initialLoadRef.current === false ? "hidden" : "text-shadow"
            }
          >
            <AnimatedHeading
              textRef={dialog2Ref}
              context='Dialog 2'
              contentType='text'
              delay={7}
            />
          </p>
        </EclipsedCoreDialog>

        {/* Background Image */}
        <EclipsedCoreImgContainer id='eclipsed-core-img' ref={imgRef}>
          <video
            ref={imgRef}
            src='videos/eclipsed-core.mp4'
            id='video-3'
            autoPlay
            loop
            muted
            preload='auto'
            className={
              initialLoad
                ? "hidden"
                : "absolute opacity-[0.6] left-0 top-0 w-[1980]"
            }
          />
        </EclipsedCoreImgContainer>
      </EclipsedCoreContainer>
    </EclipsedCoreSection>
  );
};

export default EclipsedCore;
