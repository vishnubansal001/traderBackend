"use client";

import React, { useState, useEffect } from "react";
import Card1 from "../Assests/card_template_1.svg";
import Card2 from "../Assests/card_template_2.svg";
import Card3 from "../Assests/card_template_3.svg";
import Card4 from "../Assests/card_template_4.svg";
import Card5 from "../Assests/card_template_5.svg";
import Card6 from "../Assests/card_template_6.svg";
import { motion } from "framer-motion";

const arr = [Card1, Card2, Card3, Card4, Card5, Card6];

const CardComponent = ({ data }) => {
  const [image, setImage] = useState(
    arr[Math.floor(Math.random() * arr.length)]
  );
  const [hover, setHover] = useState(false);
  const check = typeof image;
  const style = {
    backgroundImage: `url(${check == "object" ? image.src : image})`,
    backgroundSize: "cover",
  };
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      if (!localStorage.getItem("card_template")) {
        localStorage.setItem("card_template", image.src);
      }
      const localimage =
        localStorage.getItem("card_template") ||
        arr[Math.floor(Math.random() * arr.length)];
      setImage(localimage);
    }
  }, [image]);
  return (
    <>
      {image && (
        <div className="h-72">
          <div className="w-full md:w-[60%] mx-auto h-full relative">
            <div
              style={{ perspective: "1000px" }}
              className="h-full rounded-xl w-full card absolute"
              onMouseOver={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <motion.div
                className="content h-full bg-transparent absolute w-full rounded-xl"
                animate={{ rotateY: hover ? 180 : 0 }}
                transition={{ duration: 0.1 }}
                style={{
                  transformStyle: "preserve-3d",
                  transition: "transform 1s",
                }}
              >
                <div
                  className="front border w-full h-full absolute text-white border-white rounded-xl flex items-end"
                  style={style}
                >
                  <div className=" bg-transparent h-28 w-[80%] mx-auto">
                    <div className="flex bg-transparent mt-5">
                      <p className="bg-transparent">{data?.history?.name}</p>
                    </div>
                  </div>
                </div>
                <div
                  className="back w-full h-full absolute border border-white text-white rounded-xl flex"
                  style={style}
                >
                  <div className=" bg-transparent h-40 flex flex-col justify-end w-full mx-auto">
                    <div className="flex h-20 border-y border-gray-400 px-8 items-center mt-5 bg-black">
                      <p className="bg-transparent text-3xl">
                        ₹ {data?.history?.amount}/-
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardComponent;
