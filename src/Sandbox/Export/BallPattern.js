import CirclePattern from "./CirclePattern";
import insertEyes from "./insertEyes";

/**
 *@typedef {BallPattern} Creates pattern based on a ball.
 *@property {Number || [circum: {Number}, height: {Number}]} input - Values for circumference and height
 *either based on meshData or on array of inputs.
 *@returns {[string]} - an array of rows depicting crochet pattern to make a ball.
 */
const BallPattern = (input, eyeList) => {
  let output = [];
  let circum = -1;
  let height = -1;
  if (input && input.userData && input.userData.meshData) {
    circum = input.userData.meshData.circum;
  }
  if (typeof input == "object" && input.length == 2) {
    circum = input[0];
    height = input[1];
  }
  //first part of ball is just a circle.
  output = CirclePattern([circum, false, 6], {});

  //second part of ball,just a large amount of single crochets, more depending on height
  let roundNum = circum / 6 + 1;
  let stitchCount = circum;
  let second = "";
  if (height == -1) {
    second =
      "Round " +
      roundNum +
      "-" +
      (roundNum * 2 - 1) +
      ": " +
      stitchCount +
      " sc. (" +
      stitchCount +
      ")\n";

    roundNum = roundNum * 2;
  } else {
    const radius = Math.ceil(circum / (2 * Math.PI));
    second =
      "Round " +
      roundNum +
      "-" +
      (roundNum * 2 - 1 + Math.abs(height - 2 * radius)) +
      ": " +
      stitchCount +
      " sc. (" +
      stitchCount +
      ")\n";
    roundNum = roundNum * 2 + Math.abs(height - 2 * radius);
  }
  output.push(second);

  //round out the rest of the ball with decreases
  let third = "";
  while (stitchCount > 12) {
    stitchCount -= 6;
    let roundString = "Round " + roundNum + ": (";
    let scCount = "";
    scCount = stitchCount / 6 - 1 + " sc, ";

    third = roundString + scCount + "dec) x6. (" + stitchCount + ")\n";
    roundNum += 1;
    output.push(third);
  }

  if (Object.keys(eyeList).length > 0) {
    const eyes = insertEyes(eyeList);
    output.push(eyes);
  }

  const stuff = "Fill with stuffing.\n";
  const exit = "Round " + roundNum + ": dec x6.";

  output.push(stuff);
  output.push(exit);
  output.push("sl st and Fasten off.");
  output.push("Close the circle.");

  return output;
};

export default BallPattern;
