import { motion } from "framer-motion";
import "./InfiniteScroll.css";
import Bunny from "../assets/Home/Scroll/Bunny.jpg";
import Dragon from "../assets/Home/Scroll/Dragon.jpg";
import Octopus from "../assets/Home/Scroll/Octopus.jpg";
import Oreo from "../assets/Home/Scroll/Oreo.jpg";
import Sesame from "../assets/Home/Scroll/Sesame.jpg";
import Spot from "../assets/Home/Scroll/Spot.jpg";
import BunnyProject from "../assets/Home/Scroll/Bunny-Project.png";
import DragonProject from "../assets/Home/Scroll/Dragon-Project.png";
import OctopusProject from "../assets/Home/Scroll/Octopus-Project.png";
import OreoProject from "../assets/Home/Scroll/Oreo-Project.png";
import SesameProject from "../assets/Home/Scroll/Sesame-Project.png";
import SpotProject from "../assets/Home/Scroll/Spot-Project.png";

const InfiniteScroll = () => {
  const scrollList = [
    [Bunny, BunnyProject],
    [Dragon, DragonProject],
    [Octopus, OctopusProject],
    [Oreo, OreoProject],
    [Sesame, SesameProject],
    [Spot, SpotProject],
  ];

  const onPhone = window.innerWidth > 480 ? false : true;
  const timePerPhoto = 8;
  const animationTime = onPhone
    ? (timePerPhoto / 2) * scrollList.length
    : timePerPhoto * scrollList.length;

  const scrollLength = 63 * scrollList.length;

  return (
    <div className="scroll-container">
      <motion.div
        style={{ width: scrollLength + "vh" }}
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          ease: "linear",
          duration: animationTime,
          repeat: Infinity,
          repeatDelay: 0,
        }}
        className="full-scroll"
      >
        {scrollList.map((value, key) => {
          const irl = value[0];
          const project = value[1];
          return (
            <motion.div key={key} className="scroll-image-container">
              <motion.img src={irl} className="scroll-image" />
              <motion.img src={project} className="scroll-image" />
            </motion.div>
          );
        })}
      </motion.div>

      {/*second version for the infinite scroller*/}
      <motion.div
        style={{ width: scrollLength + "vh" }}
        animate={{ x: ["100%", "-100%"] }}
        transition={{
          delay: animationTime / 2,
          ease: "linear",
          duration: animationTime,
          repeat: Infinity,
          repeatDelay: 0,
        }}
        className="full-scroll"
      >
        {scrollList.map((value, key) => {
          const irl = value[0];
          const project = value[1];
          return (
            <motion.div key={key} className="scroll-image-container">
              <motion.img src={irl} className="scroll-image" />
              <motion.img src={project} className="scroll-image" />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default InfiniteScroll;
