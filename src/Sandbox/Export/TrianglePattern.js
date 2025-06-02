import insertEyes from "./insertEyes";

const TrianglePattern = (object, eyeList) => {
  const objectData = object.userData.meshData;

  const height = objectData.height;
  const base = objectData.width;
  const START_SIZE = 2;
  const stitchesLeft = base - START_SIZE;
  const heightLeft = height - 1;
  const rate = Math.floor(stitchesLeft / heightLeft);

  const remain = stitchesLeft % heightLeft;

  const order = Array(heightLeft).fill(rate);

  const remainRate = Math.floor(heightLeft / remain);

  for (let i = 0; i < remain; i++) {
    order[i * remainRate] += 1;
  }

  const start = "Row 1: Ch 2  and turn. (1)";
  const firstInc = "Row 2: skip closest stitch and inc, ch 1 and turn. (2)";

  const output = [start, firstInc];

  let roundNum = 3;

  let stitchCount = 2;

  for (let i = 0; i < order.length; i++) {
    const roundString = "Round " + roundNum + ": ";

    if (order[i] == 0) {
      output.push(
        roundString +
          stitchCount + "sc, ch 1 and turn. (" +
          stitchCount +
          ")"
      );
    } else if (order[i] == 1) {
      output.push(
        roundString +
          (stitchCount - 1) +"sc, inc, ch 1 and turn. (" +
          (stitchCount + 1) +
          ")"
      );
      stitchCount += 1;
    } else if (order[i] == 2) {
      if (stitchCount > 2) {
        output.push(
          roundString +
            "inc, " + 
            (stitchCount - 2) + "sc, inc. Ch1 and turn. (" +
            (stitchCount + 2) +
            ")"
        );
      } else {
        output.push(roundString + "inc x 2. (4).");
      }
      stitchCount += 2;
    }
    roundNum += 1;
  }

  output.push("Fasten off.");

  if (Object.keys(eyeList).length > 0) {
    output.push(insertEyes(eyeList));
  }
  return output;
};

export default TrianglePattern;
