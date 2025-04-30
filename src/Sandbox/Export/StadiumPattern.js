/**
 * @typedef {StadiumPattern} - lists the instructions for the pattern the stadium object.
 * @property {Mesh} object - the object whose pattern is being made.
 * @returns {[String]} - a list of strings that create the pattern for the stadium
 */
const StadiumPattern = (object) => {
  const height = object.userData.meshData.height;
  const width = object.userData.meshData.width;
  const midHeight = height - width;

  let stitchCount = midHeight * 2 + 8;
  let output = [
    "Round 1: Ch " + (height - width + 2) + ".",
    "Round 2: Skip first chain, (" +
      midHeight +
      " sc, insert 4 sc into next stitch) x 2 (" +
      stitchCount +
      ")",
  ];

  stitchCount += 8;

  if (width >= 2) {
    output.push(
      "Round 3: " +
        midHeight +
        " sc, inc x4, " +
        midHeight +
        " sc, inc x4. (" +
        stitchCount +
        ")"
    );
  }

  stitchCount += 8;

  let roundNum = 3;
  console.log("half width: " + width / 2);
  for (let i = 2; i < width / 2; i++) {
    roundNum += 1;
    let temp = "Round " + roundNum + ":";

    for (let j = 0; j < 2; j++) {
      const midString = " " + midHeight + " sc, ";
      const inc = "(" + (i - 1) + " sc, inc) x4";
      temp = temp + midString + inc;
    }
    temp = temp + ". (" + stitchCount + ")";
    output.push(temp);
    stitchCount += 8;
  }

  output.push("Fasten off.");

  return output;
};

export default StadiumPattern;
