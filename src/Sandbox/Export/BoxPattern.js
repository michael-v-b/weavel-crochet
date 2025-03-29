import SquarePattern from "./SquarePattern";

/**
 *@typedef {BoxPattern} Creates pattern based on a ball.
 *@property {Mesh} object - object used to get dimensions from meshData.
 *@returns {string} - a crochet pattern to make a box.
 */
const BoxPattern = (object) => {
  objectData = object.userData.meshData;
  const x = objectData.xDim;
  const y = objectData.yDim;
  const z = objectData.zDim;
  let roundNum = 1;
  //start with square in the base
  let output = SquarePattern([x, z, false]);
  roundNum = x;

  //make walls based on height.
  const walls =
    "Round " +
    roundNum +
    "-" +
    (roundNum + y) +
    ": " +
    (z * 2 + x * 2) +
    " sc around full square.\n";
  output.push(walls);
  output.push("Fasten Off.\n");
  output.push("\n");

  output.push("Top Square:");
  //make another ball based on squares
  output = output.concat(SquarePattern([x, z, true]));

  const end =
    "Sew final square to the top of the cube and fill with Polyfill.\n";
  output.push(end);
  return output;
};
export default BoxPattern;
