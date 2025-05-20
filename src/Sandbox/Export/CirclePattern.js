import insertEyes from "./insertEyes";

/**
 * @typedef {CirclePattern} - a crochet pattern on how to make a circle
 * @property {Mesh || [circum: {Number},height: {Number}]} - either a mesh
 * or an array that has the dimensions of the circle.
 * @returns {[{string}]} - a crochet pattern for a crochet circle.
 */
const CirclePattern = (input,eyeList) => {
  let output = [];
  let circum = -1;
  let fastenOff = true;
  let rate = 8;
  if (input?.userData?.meshData) {
    circum = input.userData.meshData.circum;
  }

  if (typeof input == "object" && input.length == 3) {
    circum = input[0];
    fastenOff = input[1];
    rate = input[2];
  } 

  const intro = "Round 1: make " + rate + " sc into a magic ring (" + rate + ")";

  output.push(intro);
  let stitchCount = rate;
  let roundNum = 2;
  let first = "";
  //first third of ball
  while (stitchCount < circum) {
    stitchCount += rate;
    let roundString = "Round " + roundNum + ": (";
    let scCount = "";
    if (roundNum > 2) {
      scCount = roundNum - 2 + " sc, ";
    }
    first = roundString + scCount + "inc) x" + rate + " (" + stitchCount + ").\n";
    roundNum += 1;
    output.push(first);
  }

  if (fastenOff) {
    output.push("sl st. Fasten off.");
  }

  if(Object.keys(eyeList).length > 0) {
    output.push(insertEyes(eyeList));
  }

  return output;
};
export default CirclePattern;
