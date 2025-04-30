/**
 * @typedef {SquarePattern} - a crochet pattern on how to make a square.
 * @property {Mesh || [x: {Number},x: {Number}]} - either a mesh
 * or an array that has the dimensions of the square.
 * @returns {string} - a crochet pattern for a crochet square.
 */
const SquarePattern = (input) => {
  let x = -1;
  let y = -1;
  let fasten = true;
  if (input && input.userData && input.userData.meshData) {
    const objectData = input.userData.meshData;
    x = objectData.xDim;
    y = objectData.yDim;
  }
  if (typeof input == "object" && input.length == 3) {
    x = input[0];
    y = input[1];
    fasten = input[2];
  }
  let output = [];
  const intro = "Round 1: Ch " + (x + 1) + ". (" + x + ")";
  output.push(intro);

  const body =
    "Round 2-" + (y + 1) + " sc " + x + " ch 1, turn over. (" + x + ")";
  output.push(body);

  if (fasten) {
    output.push("Fasten off.");
  }
  return output;
};
export default SquarePattern;
