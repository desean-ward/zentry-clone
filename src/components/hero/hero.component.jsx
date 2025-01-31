"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  HeroHeadingContainer,
  HeroHeadingWrapper,
  HeroVideoContainer,
  HeroVideoIndicator,
  HeroWrapper,
  VideoIndicator,
} from "./hero.styles";
import CustomButton from "@/app/ui/custom-button/custom-button.ui";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedHeading from "../../animations/animated-heading.animate";
import SlideUp from "@/animations/slideUp.animate";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(0);

  // The characters names
  const characters = [
    "Luminar",
    "Shadow Wraith",
    "Eclipse Titan",
    "Nova Flare",
  ];

  // Total videos to play in the mini video player
  const totalVideos = 4;

  // Reference to next video
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const video3Ref = useRef(null);
  const video4Ref = useRef(null);

  // Reference to character name
  const characterRef = useRef(null);
  const blackCharacterRef = useRef(null);
  const taglineRef = useRef(null);

  // Handle video loaded
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  // Get the video source for mini video player
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Check if videos loaded sucessfully
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) setIsLoading(false);
  }, [loadedVideos]);

  // Update playback rate
  useEffect(() => {
    video1Ref.current.playbackRate = 2;
    video2Ref.current.playbackRate = 2;
    video3Ref.current.playbackRate = 2;
    video4Ref.current.playbackRate = 2;
  }, []);

  // Split the character names for animation
  useEffect(() => {
    const character = characters[currentVideo];
    const blackCharacter = characters[currentVideo];

    // Wrap each letter in a span
    const letters = character
      .split("")
      .map((char) =>
        char === " " ? " " : `<span class="letter">${char}</span>`
      );

    // Wrap each black letter in a span
    const blackLetters = blackCharacter
      .split("")
      .map((char) =>
        char === " " ? " " : `<span class="letter">${char}</span>`
      );

    // ***** Inject the wrapped letters into the textRef element ***** /
    if (characterRef.current) {
      characterRef.current.innerHTML = letters.join("");
    }

    if (blackCharacterRef.current) {
      blackCharacterRef.current.innerHTML = letters.join("");
    }
  }, [characters[currentVideo]]);

  // ***** Video Switch Animation ***** /
  useGSAP(
    () => {
      const stickySection = document.querySelector("#hero-section");

      if (!window || window === undefined) return;

      // ***** Total height of the Hero section w/videos ***** /
      const totalStickyHeight = window.innerHeight * 4;

      // ***** Fade in the Hero's title ***** /
      gsap.fromTo(
        "#hero-heading",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1,
        }
      );

      // ***** Pin the sticky section ***** /
      ScrollTrigger.create({
        trigger: stickySection,
        start: "top top",
        end: () => `+=${totalStickyHeight}`,
        pin: true,
        pinSpacing: true,
      });

      // Video 2
      gsap.set("#video-2", { opacity: 1 });
      gsap.from("#video-2", {
        scale: 0,
        ease: "power1.out",
        duration: 0.75,
        scrollTrigger: {
          trigger: stickySection,
          start: () => `${window.innerHeight / 2}`, // Start after the first video section
          end: () => `${window.innerHeight}`, // End before the next video section
          toggleActions: "play none play reverse",
        },
        onComplete: () => {
          video2Ref.current.play();
          setCurrentVideo(1);
        },
        onReverseComplete: () => setCurrentVideo(0),
      });

      // Video 3
      gsap.set("#video-3", { opacity: 1 });
      gsap.from("#video-3", {
        scale: 0,
        ease: "power1.out",
        duration: 0.75,
        scrollTrigger: {
          trigger: stickySection,
          start: () => `${window.innerHeight}`, // Start after Video 2's section
          end: () => `${window.innerHeight * 2}`, // End before Video 4's section
          toggleActions: "play none play reverse",
        },
        onComplete: () => {
          video3Ref.current.play();
          setCurrentVideo(2);
        },
        onReverseComplete: () => setCurrentVideo(1),
      });

      // Video 4
      gsap.set("#video-4", { opacity: 1 });
      gsap.from("#video-4", {
        scale: 0,
        ease: "power1.out",
        duration: 0.75,
        scrollTrigger: {
          trigger: stickySection,
          start: () => `${window.innerHeight * 2}`, // Start after Video 3's section
          end: () => `${window.innerHeight * 3}`, // End at the end of the sticky section
          toggleActions: "play none play reverse",
          scrub: false,
        },
        onComplete: () => {
          video4Ref.current.play();
          setCurrentVideo(3);
        },
        onReverseComplete: () => setCurrentVideo(2),
      });
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  // ***** Animate the video frame at the end of scrolling ***** /
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 95%)",
      borderRadius: "0 0 40% 10%",
    });

    // Starting animation
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-4",
        start: () => `${window.innerHeight * 3}`,
        end: () => `${window.innerHeight * 4}`,
        toggleActions: "play none play reverse",
        // scrub: true,
        // markers: true,
      },
    });
  });

  return (
    <HeroWrapper id='hero-section'>
      {/* Loading Spinner */}
      {/*isLoading && (
        <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
          <div className='three-body'>
            <div className='three-body__dot' />
            <div className='three-body__dot' />
            <div className='three-body__dot' />
          </div>
        </div>
      ) */}

      <HeroVideoContainer id='video-frame'>
        {/* Video 1 */}
        <video
          id='video-1'
          ref={video1Ref}
          src={getVideoSrc(1)}
          autoPlay
          loop
          muted
          preload='auto'
          className='current absolute left-0 top-0 size-full object-cover object-center'
          onLoadedData={handleVideoLoad}
        />
        {/* Video 2 */}
        <video
          ref={video2Ref}
          src={getVideoSrc(2)}
          id='video-2'
          loop
          muted
          preload='auto'
          className='absolute opacity-0 left-0 top-0 size-full object-cover object-center'
          onLoadedData={handleVideoLoad}
        />
        {/* Video 3 */}
        <video
          ref={video3Ref}
          src={getVideoSrc(3)}
          id='video-3'
          loop
          muted
          preload='auto'
          className='absolute opacity-0 left-0 top-0 size-full object-cover object-center'
          onLoadedData={handleVideoLoad}
        />
        {/* Video 4 */}
        <video
          ref={video4Ref}
          src={getVideoSrc(4)}
          id='video-4'
          loop
          muted
          preload='auto'
          className='absolute opacity-0 left-0 top-0 size-full object-cover object-center'
          onLoadedData={handleVideoLoad}
        />
        {/* Character Heading */}
        <div className='flex justify-center md:justify-none'>
          <h2
            id='character-name'
            ref={characterRef}
            className='character-name text-center hero-heading absolute z-50 mx-auto bottom-5 md:right-10 text-blue-100 text-shadow'
          >
            {/* Animated Character Name */}
            <AnimatedHeading
              textRef={characterRef}
              context={characters[currentVideo]}
            />
          </h2>
        </div>

        {/* Hero Heading */}
        <HeroHeadingWrapper>
          <HeroHeadingContainer>
            {/* Heading */}
            <h1
              id='hero-heading'
              className='hero-heading text-blue-100 text-shadow opacity-0'
            >
              Eclipsed Re<b>a</b>lms
            </h1>

            {/* Tagline */}
            <SlideUp textRef={taglineRef} content='Hero' />
            <p
              id='hero-tagline'
              ref={taglineRef}
              className='mb-5 max-w-128 font-robert-regular text-blue-100 text-4xl lg:text-6xl text-shadow text-center md:text-start opacity-0'
            >
              The Dawn of Lumina
            </p>

            {/* CTA Button 
            <CustomButton
              id='watch-trailer'
              title='Watch Trailer'
              leftIcon={<TiLocationArrow />}
              containerClass='bg-yellow-300 flex-center gap-1'
            /> */}
          </HeroHeadingContainer>
        </HeroHeadingWrapper>
      </HeroVideoContainer>

      {/* Black Heading Backdrop */}
      <div className='absolute left-[2.5rem] top-5 text-[#AC4300]'>
        <h2 className='special-font hero-heading'>
          Eclipsed Re<b>a</b>lms
        </h2>
        {/* Tagline */}
        <p className='mb-5 max-w-128 font-robert-regular text-4xl lg:text-6xl text-center md:text-start'>
          The Dawn of Lumina
        </p>
      </div>

      {/* Black Character Heading Backdrop */}
      <div className='flex justify-center md:justify-none'>
        <h2
          ref={blackCharacterRef}
          className='hero-heading absolute text-center md:text-end bottom-5 md:right-10 text-[#AC4300]'
        >
          {/* Animated Character Name */}
          <AnimatedHeading
            textRef={blackCharacterRef}
            context={characters[currentVideo]}
          />
        </h2>
      </div>

      {/* Video Indicator */}
      <HeroVideoIndicator>
        {characters.map((_, idx) => (
          <VideoIndicator
            key={idx}
            className={idx === currentVideo && "bg-blue-50"}
          />
        ))}
      </HeroVideoIndicator>
    </HeroWrapper>
  );
};

export default Hero;
