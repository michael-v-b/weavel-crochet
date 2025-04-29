import CirclePattern from "./CirclePattern";

/**
 * @typedef {ConePattern} - a crochet pattern on how to make a cone pattern
 * @param {Mesh} object - object used to determine dimensions.
 * @returns {string} - a crochet pattern on how to make a cone.
 */
const ConePattern = (object) => {
  const objectData = object.userData.meshData;
  const height = objectData.height;
  const circum = objectData.circum;
  const POINT_NUMBER = 6; //stitch count for point

  let output = [];

  output = ["Put 6 sc into a magic ring."];
  let roundNum = 1;

  let stitchCount = 6;

  //the number of decreases to reach point
  const rate = Math.floor((circum - POINT_NUMBER) / (height - 1));
  //the number needed to be added for clean change
  const remain = (circum - POINT_NUMBER) % (height - 1);
  const order = Array(height - 1).fill(rate);
  const indexRate = Math.floor(height / remain);

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
    const dcString = "inc) x" + repeatCount;

    stitchCount += order[i];

    const extraScString = rowRemain == 0 ? "" : ", " + rowRemain + " sc";

    const transition = "";

    if (order[i] != 0) {
      output.push(
        roundString +
          scString +
          dcString +
          extraScString +
          transition +
          ". (" +
          stitchCount +
          ")\n"
      );
    } else {
      const tempString =
        "Round " + roundNum + ": " + repeatSize + " sc. (" + stitchCount + ")";
      output.push(tempString);
    }
  }
  output.push("Fasten off.\n");
  return output;
};

export default ConePattern;
