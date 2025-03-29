import { motion } from "framer-motion-3d";
import { forwardRef} from "react";

/**
 * @typedef {IRing} - Interactive ring that increases in size when mouse is hovered over it
 * @property {Number} lineWidth - The cross diameter of the torus.
 * @property {Set} meshProps - gives properties to be added to Mesh Object.
 * @property {Set} materialProps - gives properties to be added to Material Object
 * @returns {motion.mesh} - an interactive ring mesh
 */
const IRing = forwardRef(({ lineWidth, meshProps, materialProps }, ref) => {
  return (
    <motion.mesh
      {...meshProps}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
    >
      <torusGeometry args={[2, lineWidth]} />
      <meshBasicMaterial {...materialProps} />
    </motion.mesh>
  );
});
export default IRing;
