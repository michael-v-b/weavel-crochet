import CirclePattern from "./CirclePattern";

/**
 * @typedef {CylinderPattern} - a crochet pattern on how to make a Cylinder
 * @property {Mesh} object - used to find dimensions of cylinder
 * @returns {string} - crochet pattern for a cylinder
 */
const CylinderPattern = (object) => {
  const objectData = object.userData.meshData;
  const open = objectData.open;
  const circum = objectData.circum;
  const height = objectData.height;
  let output = [];
  if (!open) {
    output = ["Base: ", "\n"];
    output = output.concat(CirclePattern([circum, false]));
  } else {
    output = [
      "Chain " +
        circum +
        " then slip stitch ends together in a ring. (" +
        circum +
        ")",
    ];
  }
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
    "sc around walls (" +
    circum +
    ")\n";
  output.push(walls);
  output.push("\n");
  output.push("Top Circle: \n");

  if (!open) {
    const top = CirclePattern([circum, true]);
    output = output.concat(top);
    const end = "Sew on top circle and fill with Polyfill.";
    output.push(end);
  }
  output.push("Fasten off.\n");
  return output;
};

export default CylinderPattern;
