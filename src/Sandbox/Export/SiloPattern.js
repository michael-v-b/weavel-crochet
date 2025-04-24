import CirclePattern from "./CirclePattern";

/**
 * @typedef {SiloPattern} - creates a crochet pattern for a silo shape.
 * @param {Object} input - silo whose pattern is being created.
 * @returns {[string]} - a list of strings portraying a silo pattern.
 */
const SiloPattern = (input) => {
  const CIRCLE_CONST = 6;
  const circum = input.userData.meshData.circum;
  const height = input.userData.meshData.height;
  let roundNum = 0;
  const output = CirclePattern([circum, false,CIRCLE_CONST]);
  const radius = Math.floor(circum/(2*Math.PI));
  roundNum = (circum / CIRCLE_CONST) + 1;

  output.push(
    "Round " +
      (roundNum) +
      "-" +
      (roundNum +(height-radius)) +
      ": sc x " +
      circum +
      ". (" +
      circum +
      ")"
  );
  output.push("Stuff with polyfill.");
  output.push("Fasten off.");
  return output;
};

export default SiloPattern;
