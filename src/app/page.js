import EclipsedCore from "@/components/eclipsed-core/eclipsed-core.component";
import Hero from "@/components/hero/hero.component";
import React from "react";

const Home = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Hero />
      <EclipsedCore />
      <div className='bg-black w-screen h-[200vh] relative' />
    </main>
  );
};

export default Home;
