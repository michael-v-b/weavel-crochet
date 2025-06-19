import NameField from "./InfoAttributes/NameField";
import ColorField from "./InfoAttributes/ColorField";
import BallPage from "./ShapePages/BallPage";
import BoxPage from "./ShapePages/BoxPage";
import ChainPage from "./ShapePages/ChainPage";
import CirclePage from "./ShapePages/CirclePage";
import EyePage from "./ShapePages/EyePage";
import SquarePage from "./ShapePages/SquarePage";
import CapsulePage from "./ShapePages/CapsulePage";
import ConePage from "./ShapePages/ConePage";
import SiloPage from "./ShapePages/SiloPage";
import StadiumPage from "./ShapePages/StadiumPage";
import TrianglePage from "./ShapePages/TrianglePage";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const GroupPage = ({ objects, deleterRef }) => {
  const [currentShape, setCurrentShape] = useState("none");

  const shapePages = {
    ball: BallPage,
    box: BoxPage,
    chain: ChainPage,
    circle: CirclePage,
    eye: EyePage,
    square: SquarePage,
    capsule: CapsulePage,
    cone: ConePage,
    silo: SiloPage,
    stadium: StadiumPage,
    triangle: TrianglePage,
  };

  const CommonFields = () => {
    const ShapePage = shapePages[currentShape];
    return <>{ShapePage && <ShapePage objects={objects} />};</>;
  };

  /**
   * see which options are overlapping amongst all the objects
   */
  useEffect(() => {
    let temp = objects[0].userData.meshType;
    for (let i = 0; i < objects.length; i++) {
      if (temp != objects[i].userData.meshType) {
        temp = "none";
        break;
      }
    }
    setCurrentShape(temp);
  }, [objects]);

  return (
    <div>
      <NameField objects={objects} />
      <ColorField objects={objects} />
      <CommonFields />
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          deleterRef.current.deleteMeshes(objects);
        }}
        className="delete-button selectable"
      >
        Delete
      </motion.div>
    </div>
  );
};
export default GroupPage;
