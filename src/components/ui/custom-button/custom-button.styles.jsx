import tw from "tailwind-styled-components";

export const ButtonWrapper = tw.button`
    group 
    relative 
    z-10 
    w-fit 
    cursor-pointer 
    overflow-hidden 
    rounded-full 
    px-7 
    py-3 
    text-black
`;

export const ButtonTextWrapper = tw.span`
    relative 
    incline-flex 
    overflow-hidden 
    font-general 
    text-xs 
    uppercase
`
