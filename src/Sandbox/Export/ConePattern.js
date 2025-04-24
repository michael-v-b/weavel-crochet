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
  const POINT_NUMBER = 3; //stitch count for point
  const wordList = [];
  let roundNum = circum / 6; //divided by 6 because that is repeats for circular pattern

  let output = [];


    output = [
      "Chain " +
        circum +
        " then slip stitch ends together in a ring. (" +
        circum +
        ")",
    ];
    roundNum = 1;


  let stitchCount = circum;

  //the number of decreases to reach point
  const rate = Math.floor((circum - POINT_NUMBER) / (height - 1));
  //the number needed to be added for clean change
  const remain = (circum - POINT_NUMBER) % (height - 1);
  const order = Array(height - 1).fill(rate);
  const indexRate = Math.floor((height - 1) / remain);

  //create list of entries that should have extra decreases
  for (let i = 0; i < remain; i++) {
    order[i * indexRate] += 1;
  }
  //create pattern
  for (let i = 0; i < order.length; i++) {
    roundNum += 1;

    const repeatCount = order[i];
    const repeatSize = Math.floor(stitchCount / repeatCount);
    const scCount = repeatSize - 2;
    const rowRemain = stitchCount % repeatCount;

    const roundString = "Round " + roundNum + ": (";
    const scString = scCount > 0 ? scCount + " sc, " : "";
    const dcString = "dc) x" + repeatCount;

    stitchCount -= order[i];

    const extraScString = rowRemain == 0 ? "" : ", " + rowRemain + " sc";

    const transition =  "";

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
  }
  output.push("Fasten off.\n");
  return output;
};

export default ConePattern;
