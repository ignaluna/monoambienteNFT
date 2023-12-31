"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import localFont from 'next/font/local'

const miFuente = localFont({
  src: '../../public/fonts/Kompot.otf',
  variable: '--font-mi-fuente',
})

const HeroSection = () => {
  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = '/arbol.pdf';
    link.download = 'ArbolGenealógicoMitologíaGriega.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <section className="lg:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className={` text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold
          ${miFuente.className}`}>
            <br></br>
            <TypeAnimation
              sequence={[
                "Dioses",
                1000,
                "Héroes",
                1000,
                "Titanes",
                1000,
                "Mitología",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl uppercase">
            Desde la majestuosidad del Olimpo hasta las profundidades del Tártaro, sumérgete en la mitología griega a través de nuestra exclusiva colección de NFTs.          </p>
          <div className="flex items-center justify-center">
            <div
              className="px-1 flex items-center justify-center py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white mt-3"
            >
              <button className="block bg-[#121212] items-center justify-center hover:bg-slate-800 rounded-full px-5 py-2 z-10"
              onClick={downloadPdf}
              >Descargar PDF</button>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }} 
          className="col-span-4 place-self-center mt-4 lg:mt-0"
        >
          <div className="rounded-full bg-[#181818] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
            <Image
              src="/images/logo1.png"
              alt="hero image"
              className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              width={300}
              height={300}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;