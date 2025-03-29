import { motion } from "framer-motion-3d";
import React, { useRef, forwardRef } from "react";

/**
 * @typedef {ILine} - Interactive line that increases in size when mouse is hovered over it represented by a flat cylinder
 * @property {Number} lineWidth - the width of the line (diameter of the cylinder).
 * @property {Number} lineLength - the length of the line (height of cylinder).
 * @property {Set} meshProps - gives properties to be added to Mesh Object.
 * @property {Set} materialProps - gives properties to be added to Material Object
 * @returns {motion.mesh} - an interactive thin cylinder mesh.
 */
const ILine = forwardRef(
  (
    { lineWidth = 0.1, lineLength = 2, meshProps, materialProps, children },
    ref
  ) => {
    return (
      <motion.mesh
        {...meshProps}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <cylinderGeometry args={[lineWidth / 2, lineWidth / 2, lineLength]} />
        <meshBasicMaterial {...materialProps} />
        {children}
      </motion.mesh>
    );
  }
);
export default ILine;
