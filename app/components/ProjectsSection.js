"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Web3 from "web3";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import Abi1 from "../abi/Abi1";
import Abi2 from "../abi/Abi2";
import Abi3 from "../abi/Abi3";
import localFont from 'next/font/local'

const miFuente = localFont({
  src: '../../public/fonts/Kompot.otf',
  variable: '--font-mi-fuente',
})

// Initialize Web3
const web3 = new Web3("https://polygon-mumbai.infura.io/v3/6f9ce52853f94e708b4458e10336a8f8");

// Fetch the latest block on the Ethereum network
web3.eth.getBlock("latest")

// Base de datos de diferentes NFTS.

const nftConfigurations = [
  {
    tokenContract: "0x5Be109fe4D785761Fc98Cf2D6C969C630cDfDebc",
    abi: Abi1,
    tokenId: 1,
  },
  {
    tokenContract: "0xb1E9210c628ABa432549D3E68ae7F75a7ce70fa3",
    abi: Abi2,
    tokenId: 2,
  }

  // Agrega más objetos según sea necesario
];


const ProjectsSection = () => {
  // State for filtering projects based on tags
  const [tag, setTag] = useState("All");
  const [metadataList, setMetaDataList] = useState([])

  // Ref and isInView for animation
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Fetch metadata when the component mounts
  useEffect(() => {
    const resultArray = []; // Declara resultArray fuera de fetchData

    const fetchData = async () => {
      const contractPromises = nftConfigurations.map(async ({ tokenContract, abi, tokenId }) => {
        const contract = new web3.eth.Contract(abi, tokenContract);
        // console.log(contract);

        try {
          const data = await contract._methods.retrieve().call(); // Cambié _methods a methods
          console.log(data)

          if (Array.isArray(data)) {
            data.forEach((item) => {
              const objeto = {};
              for (let i = 0; i < item.length; i++) {
                objeto._name = item[0];
                objeto._imageUrl = item[1];
                objeto._contractType = item[2];
                objeto.contract = tokenContract;
              }
              resultArray.push(objeto); // Agrega cada objeto al resultArray
            });
          } else {
            // Si no es un array, es un solo objeto, entonces lo agregamos a nuestro array resultado.
            data.contract = tokenContract;
            resultArray.push(data);
          }

          console.log(resultArray);

        } catch (error) {
          console.error("Error fetching metadata:", error);
        }
      });

      // Ahora, esperamos que todas las promesas se resuelvan.
      await Promise.all(contractPromises);

      // Haz lo que necesites con resultArray después de que todas las promesas se hayan resuelto.
      console.log(resultArray)
      setMetaDataList(resultArray)
    };

    fetchData();
  }, []); // Asegúrate de ajustar las dependencias según tu caso.




  // Filter projects based on selected tag
  const filteredProjects =
    tag === "All" ? metadataList
      : metadataList.filter((nft) => nft._contractType.includes(tag));


  // Variants for card animation
  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  // Handle tag change
  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  return (
    <section id="projects" className={`${miFuente.className}`}>
      <h2 className={`text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12 ${miFuente.className}`}>
        My Projects
      </h2>
      <div className="flex flex-row justify-center items-center gap-2 text-white my-6">
        <ProjectTag
          name="All"
          onClick={handleTagChange}
          isSelected={tag === "All"}
        />
        <ProjectTag
          name="ERC-721"
          onClick={handleTagChange}
          isSelected={tag === "ERC-721"}
        />
        <ProjectTag
          name="ERC-1155"
          onClick={handleTagChange}
          isSelected={tag == "ERC-1155"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12 ">
        {
          filteredProjects.map((project, index) => {
            return (
              <motion.li
                key={index}
                variants={cardVariants}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                transition={{ duration: 0.3, delay: index * 0.4 }}
              >
                <ProjectCard
                  key={project.index}
                  title={project._name}
                  contract={project.contract}
                  img={project._imageUrl}
                />
              </motion.li>
            )
          })}
      </ul>
    </section>
  );
};

export default ProjectsSection;