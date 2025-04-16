import { forwardRef} from "react";
import { motion } from "framer-motion-3d";

/**
 * @typedef {IBall} - Interactive ball that increases in size when mouse is hovered over it
 * @property {Number} dim - the height, width and depth of the box.
 * @property {Set} meshProps - gives properties to be added to Mesh Object.
 * @property {Set} materialProps - gives properties to be added to Material Object
 * @returns {motion.mesh} - an interactive box mesh
 */
const IBall = forwardRef(({ dim = 1, meshProps, materialProps }, ref) => {
  IBall.displayName = "Interactive Box";
  return (
    <motion.mesh
      ref={ref}
      {...meshProps}
      whileHover={{ scale: 1.5 }}
      whileTap={{ scale: 1.2 }}
      transition={{ duration: 0.1 }}
    >
      <sphereGeometry args={[dim,10,10]} />
      <meshBasicMaterial {...materialProps} />
    </motion.mesh>
  );
});

export default IBall;
