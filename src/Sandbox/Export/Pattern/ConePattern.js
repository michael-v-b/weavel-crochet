import insertEyes from "../insertEyes";

/**
 * @typedef {ConePattern} - a crochet pattern on how to make a cone pattern
 * @param {Mesh} object - object used to determine dimensions.
 * @returns {string} - a crochet pattern on how to make a cone.
 */
const ConePattern = (object, eyeList) => {
  const objectData = object.userData.meshData;
  const height = objectData.height;
  const circum = objectData.circum;
  const POINT_NUMBER = 3; //stitch count for point

  let output = [];

  output = ["Round 1: Put 3 sc into a magic ring."];
  let roundNum = 1;

  let stitchCount = 3;

  //the number of decreases to reach point
  const rate = Math.floor((circum - POINT_NUMBER) / (height - 1));
  //the number needed to be added for clean change
  const remain = (circum - POINT_NUMBER) % (height - 1);
  const order = Array(height - 1).fill(rate);
  const indexRate = Math.floor(height / remain);

  let singleSide = 1;

  //create list of entries that should have extra decreases
  for (let i = 0; i < remain; i++) {
    order[i * indexRate] += 1;
  }

  //create pattern
  for (let i = 0; i < order.length; i++) {
    roundNum += 1;

    const repeatCount = order[i];
    const repeatSize = Math.floor(stitchCount / Math.max(1, repeatCount));
    const scCount = repeatSize - 1;
    const rowRemain = stitchCount % repeatCount;

    const roundString = "Round " + roundNum + ": (";
    const scString = scCount > 0 ? scCount + " sc, " : "";
    const incString = "inc) x" + repeatCount;

    stitchCount += order[i];

    const extraScString = rowRemain == 0 ? "" : ", " + rowRemain + " sc";

    const transition = "";

    //if order is only 1 stitch, alternate stitching pattern to avoid curvature
    if (order[i] == 1) {
      let tempString = "Round " + roundNum + ": ";
      if (singleSide == -1) {
        //minus 2 because stich count already had one added to it
        tempString =
          tempString +
          (stitchCount - 2) +
          " sc, inc. " +
          "(" +
          stitchCount +
          ")";
      } else {
        tempString =
          tempString +
          Math.floor((stitchCount - 2) / 2) +
          " sc, inc, " +
          Math.ceil((stitchCount - 2) / 2) +
          " sc. (" +
          stitchCount +
          ")";
      }
      singleSide *= -1;
      output.push(tempString);

      //otherwise use default sc divisibility
    } else if (order[i] != 0) {
      output.push(
        roundString +
          scString +
          incString +
          extraScString +
          transition +
          ". (" +
          stitchCount +
          ")\n"
      );

      //otherwise just do a full sc ring
    } else {
      const tempString =
        "Round " + roundNum + ": " + repeatSize + " sc. (" + stitchCount + ")";
      output.push(tempString);
    }
  }
  roundNum+=1;
  output.push("Round " + roundNum + ": " + stitchCount + "sc. (" + stitchCount +")");
  roundNum += 1;
  output.push("sl st. Fasten off.\n");

  if (Object.keys(eyeList).length > 0) {
    output.push(insertEyes(eyeList));
  }

  return output;
};

export default ConePattern;
