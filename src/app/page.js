import About from "@/components/about/about.component";
import Hero from "@/components/hero/hero.component";
import React from "react";

const Home = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Hero />
      <About />

    </main>
  );
};

export default Home;
