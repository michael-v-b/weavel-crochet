import { forwardRef} from "react";
import { motion } from "framer-motion-3d";

/**
 * @typedef {IBox} - Interactive box that increases in size when mouse is hovered over it
 * @property {Number} dim - the height, width and depth of the box.
 * @property {Set} meshProps - gives properties to be added to Mesh Object.
 * @property {Set} materialProps - gives properties to be added to Material Object
 * @returns {motion.mesh} - an interactive box mesh
 */
const IBox = forwardRef(({ dim = 1, meshProps, materialProps }, ref) => {
  IBox.displayName = "Interactive Box";
  return (
    <motion.mesh
      ref={ref}
      {...meshProps}
      whileHover={{ scale: 1.5 }}
      whileTap={{ scale: 1.2 }}
      transition={{ duration: 0.1 }}
    >
      <boxGeometry args={[dim, dim, dim]} />
      <meshStandardMaterial {...materialProps} />
    </motion.mesh>
  );
});

export default IBox;
