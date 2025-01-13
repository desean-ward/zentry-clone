"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  HeroHeadingContainer,
  HeroHeadingWrapper,
  HeroVideoContainer,
  HeroWrapper,
  MaskClipPath,
  MiniVideoPlayer,
} from "./hero.styles";
import CustomButton from "@/app/ui/custom-button/custom-button.ui";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  // Total videos to play in the mini video player
  const totalVideos = 4;

  // Reference to next video
  const nextVideoRef = useRef(null);

  // Handle video loaded
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  // Get next video index using the modulus operator
  // 0 % 4 = 0 + 1 => 1
  // 1 % 4 = 1 + 1 => 2
  // 2 % 4 = 2 + 1 => 3
  // 3 % 4 = 3 + 1 => 4
  // 4 % 4 = 0 + 1 => 1
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVidClick = () => {
    setHasClicked(true);

    // Increment the index
    setCurrentIndex(upcomingVideoIndex);
  };

  const handleBackgroundImageIndex = () => {
    const timeout = setTimeout(() => {
      return getVideoSrc(currentIndex === 1 ? 4 : currentIndex - 1);
    });

    return () => clearTimeout(timeout);
  };

  // Get the video source for mini video player
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  // Register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Check if videos loaded sucessfully
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) setIsLoading(false);
  }, [loadedVideos]);

  // Video Switch Animation
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", {
          visibility: "visible",
        });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVideoRef.current.play(),
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }

      setHasClicked(false);
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

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
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <HeroWrapper>
      {/* Loading Spinner */}
      {isLoading && (
        <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
          <div className='three-body'>
            <div className='three-body__dot' />
            <div className='three-body__dot' />
            <div className='three-body__dot' />
          </div>
        </div>
      )}
      <HeroVideoContainer id='video-frame'>
        <div>
          {/* Mini Video Preview of Upcoming Video */}
          <MaskClipPath>
            <MiniVideoPlayer onClick={handleMiniVidClick}>
              <video
                loop
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                muted
                id='current-video'
                className='size-64 origin-center scale-150 object-cover object-center'
                onLoadedData={handleVideoLoad}
              />
            </MiniVideoPlayer>
          </MaskClipPath>

          {/* Expanding Background */}
          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id='next-video'
            className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
            onLoadedData={handleVideoLoad}
          />

          {/* Background Video */}
          <video
            id='background-video'
            src={getVideoSrc(currentIndex === 1 ? 4 : currentIndex - 1)}
            autoPlay
            loop
            muted
            preload='auto'
            className='absolute left-0 top-0 size-full object-cover object-center'
            onLoadedData={handleVideoLoad}
          />
        </div>

        {/* Gaming Heading */}
        <h2 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
          G<b>a</b>ming
        </h2>

        {/* Hero Heading */}
        <HeroHeadingWrapper>
          <HeroHeadingContainer>
            {/* Heading */}
            <h1 className='special-font hero-heading text-blue-100'>
              Redefi<b>n</b>e
            </h1>

            {/* Tagline */}
            <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            {/* CTA Button */}
            <CustomButton
              id='watch-trailer'
              title='Watch Trailer'
              leftIcon={<TiLocationArrow />}
              containerClass='bg-yellow-300 flex-center gap-1'
            />
          </HeroHeadingContainer>
        </HeroHeadingWrapper>
      </HeroVideoContainer>

      {/* Gaming Heading */}
      <h2 className='special-font hero-heading absolute bottom-5 right-5 text-black'>
        G<b>a</b>ming
      </h2>
    </HeroWrapper>
  );
};

export default Hero;
