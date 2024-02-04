"use client";

import { useEffect, useState } from "react";

import BounceLoader from "react-spinners/BounceLoader";

import Aos from "aos";
import "@/styles/dataos.css";

import HeaderPage from "./components/Header";
import SkillsPage from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";

import "./globals.css";

function HomePage() {

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Aos.init(
        { 
          duration: 2000,
          easing: 'ease',
          once: true,
          offset: 0
        }
      );
    }, 5000);
  }, []);

  return (
    <>
      {loading ?
        <div className="loading">
          <BounceLoader color={"#037edb"} loading={loading} size={150} />
        </div>
      :
      <>
        <div className="div--pages">
          <HeaderPage />
          <hr data-aos='fade' />
          <SkillsPage />
          <hr id="a" data-aos='fade' />
          <Projects />
        </div>
        <Footer />
      </>
      }
    </>
  );
}

export default HomePage;