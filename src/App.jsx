import React from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Vault from "./components/Vault";
import WhoWeAre from "./components/WhoWeAre";
import NewSection from "./components/NewSection";

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Vault />
      <WhoWeAre />
      <NewSection />
      <Contact />
      <Footer />
    </main>
  );
};

export default App;
