import tw from "tailwind-styled-components";

export const EclipsedCoreSection = tw.section`
    w-screen 
    h-dvh
    z-10
    relative
`;

export const EclipsedCoreContainer = tw.div`
    w-full
    h-[160vh]
    bg-black
`;

export const EclipsedCoreHeading = tw.div`
    sticky 
    top-0
    px-10
    z-10
`;

export const EclipsedCoreImgContainer = tw.div`
    relative    
    -top-[16rem]
    w-full
`;

export const EclipsedCoreDialog = tw.div`
    absolute 
    z-10
    top-[16rem]
    left-0 
    w-full
    max-w-7xl 
    flex
    flex-col
    items-center 
    justify-start
    gap-8
    text-4xl 
    font-bold
    pb-[16rem]
    left-1/2 
    -translate-x-1/2
`;
