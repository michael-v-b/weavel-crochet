import CirclePattern from "./CirclePattern";

/**
 * @typedef {CylinderPattern} - a crochet pattern on how to make a Cylinder
 * @property {Mesh} object - used to find dimensions of cylinder
 * @returns {string} - crochet pattern for a cylinder
 */
const CylinderPattern = (object) => {
  const objectData = object.userData.meshData;
  const circum = objectData.circum;
  const height = objectData.height;
  let output = [];
  output = [
    "Round 1: Ch " +
      circum +
      " then slip stitch ends together in a ring. (" +
      circum +
      ")",
  ];

  let roundNum = circum / 6 + 1;

  const wallsStart =
    "Round " +
    roundNum +
    ": " +
    circum +
    " sc in front loop around the bases (" +
    circum +
    ")\n";
  output.push(wallsStart);

  roundNum += 1;
  const walls =
    "Round " +
    roundNum +
    "-" +
    (roundNum + height - 2) +
    ": " +
    circum +
    " sc around walls (" +
    circum +
    ")\n";

  output.push(walls);
  output.push("\n");
  output.push("Top Circle: \n");

  output.push("Fasten off.\n");
  return output;
};

export default CylinderPattern;
