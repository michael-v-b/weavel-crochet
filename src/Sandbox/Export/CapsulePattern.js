import BallPattern from "./BallPattern";
/**
 * @typedef {CapsulePattern} - gives a crochet pattern for making a CapsulePattern
 * @property {Mesh} object - the object whose parameters are being measured.
 * @returns {string} - string detailing a crochet pattern
 */
const CapsulePattern = (object) => {
  const objectData = object.userData.meshData;
  //a capsule is basically just a longer ball
  return BallPattern([objectData.circum, objectData.height]);
};

export default CapsulePattern;
