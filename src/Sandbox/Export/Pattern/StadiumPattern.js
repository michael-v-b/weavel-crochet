
import insertEyes from "../insertEyes";

/**
 * @typedef {StadiumPattern} - lists the instructions for the pattern the stadium object.
 * @property {Mesh} object - the object whose pattern is being made.
 * @returns {[String]} - a list of strings that create the pattern for the stadium
 */
const StadiumPattern = (object,eyeList) => {
  const height = object.userData.meshData.height;
  const width = object.userData.meshData.width;
  const isHalf = object.userData.meshData.isHalf;
  const midHeight = isHalf ? height - width / 2 : height - width - 1;

  let stitchCount = isHalf ? midHeight * 2 + 4 : midHeight * 2 + 8;
  let output = [];

  const incrementStitches = () => {
    if (isHalf) {
      stitchCount += 4;
    } else {
      stitchCount += 8;
    }
  };
  const midString = midHeight > 0 ? midHeight + " sc, " : "";
  if (!isHalf) {
    output = [
      "Round 1: Ch " + (midHeight + 2) + ".",
      "Round 2: Skip first chain, ( " +
        midString + "insert 4 sc into next stitch) x 2 (" +
        stitchCount +
        ")",
    ];

    //if is half
  } else {
    
    output = [
      "Round 1: Ch " + Math.min(2,(midHeight + 1)) + ".",
      "Round 2: Skip first chain, " + midString + "insert 4 sc into next stitch, ",
      "\t\t" + midString + "ch 1 and turn. (" + stitchCount + ")",
    ];
  }

  incrementStitches();

  if (width >= 4) {
    if (!isHalf) {
      output.push(
        "Round 3: " +
          midString + "inc x4, " +
          midString + "inc x4, ch 1 and turn. (" +
          stitchCount +
          ")"
      );
    } else {
      output.push(
        "Round 3: " +
          midString + "inc x4, " +
          midString + "(" +
          stitchCount +
          ")"
      );
    }
  }


  let roundNum = 3;
  for (let i = 2; i < (width / 2); i++) {
    roundNum += 1;
    let temp = "Round " + roundNum + ":";

    if (!isHalf) {
      for (let j = 0; j < 2; j++) {
        const inc = "(" + (i - 1) + " sc, inc) x4,";
        temp = temp + midString + inc;
      }
    } else {
      const inc = "(" + (i - 1) + " sc, inc) x4, ";
      const midString2 =  midString + "ch1 and turn";
      temp = temp + midString + inc + midString2;
    }
    temp = temp + ". (" + stitchCount + ")";
    output.push(temp);
    incrementStitches();
  }

  output.push("Fasten off.");

  if(Object.keys(eyeList).length > 0) {
    output.push(insertEyes(eyeList));
  }

  return output;
};

export default StadiumPattern;
