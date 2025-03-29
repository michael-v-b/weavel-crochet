/**
 * @typedef {CirclePattern} - a crochet pattern on how to make a circle
 * @property {Mesh || [circum: {Number},height: {Number}]} - either a mesh
 * or an array that has the dimensions of the circle.
 * @returns {[{string}]} - a crochet pattern for a crochet circle.
 */
const CirclePattern = (input) => {
  let output = [];
  let circum = -1;
  let fastenOff = true;
  if (input && input.userData && input.userData.meshData) {
    circum = input.userData.meshData.circum;
  }

  if (typeof input == "object" && input.length == 2) {
    circum = input[0];
    fastenOff = input[1];
  }

  const intro = "Round 1: make 6 sc into a magic ring (6)";
  output.push(intro);
  let stitchCount = 6;
  let roundNum = 2;
  let first = "";
  //first third of ball
  while (stitchCount < circum) {
    stitchCount += 6;
    let roundString = "Round " + roundNum + ": (";
    let scCount = "";
    if (roundNum > 2) {
      scCount = roundNum - 2 + " sc, ";
    }
    first = roundString + scCount + "inc) x6 (" + stitchCount + ").\n";
    roundNum += 1;
    output.push(first);
  }

  if (fastenOff) {
    output.push("Fasten off.");
  }

  return output;
};
export default CirclePattern;
