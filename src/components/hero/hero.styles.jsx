import tw from "tailwind-styled-components";

export const HeroWrapper = tw.section`
    relative 
    h-dvh 
    w-screen 
    overflow-x-hidden
`;

export const HeroVideoContainer = tw.div`
    relative 
    z-10 
    h-dvh 
    w-screen 
    overflow-hidden 
    rounded-lg 
    bg-black
`;

export const MaskClipPath = tw.div`
    mask-clip-path
    absolute-center 
    absolute 
    z-50 
    size-full 
    cursor-pointer 
    overflow-hidden 
    rounded-lg
`;

export const MiniVideoPlayer = tw.div`
    origin-center 
    scale-50 
    opacity-0
    transition-all 
    duration-500
    ease-in 
    hover:scale-100 
    hover:opacity-100
`;

export const HeroHeadingWrapper = tw.div`
    absolute 
    left-0 
    top-0 
    z-50 
    size-full
`;

export const HeroHeadingContainer = tw.div`
    mt-5 
    px-5 
    sm:px-10
`;
