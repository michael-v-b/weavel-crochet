import { forwardRef} from "react";
import { motion } from "framer-motion-3d";
import {DoubleSide} from 'three'

/**
 * @typedef {IPlane} - Interactive ball that increases in size when mouse is hovered over it
 * @property {Number} dim - the height, width and depth of the box.
 * @property {Set} meshProps - gives properties to be added to Mesh Object.
 * @property {Set} materialProps - gives properties to be added to Material Object
 * @returns {motion.mesh} - an interactive box mesh
 */
const IBPlane = forwardRef(({ dim = 1, meshProps, materialProps }, ref) => {
  IBPlane.displayName = "Interactive Box";
  return (
    <motion.mesh
      ref={ref}
      {...meshProps}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      transition={{ duration: 0.1 }}
    >
      <planeGeometry args={[dim,dim]} />
      <meshBasicMaterial {...materialProps}  side = {DoubleSide}/>
    </motion.mesh>
  );
});

export default IBPlane;
