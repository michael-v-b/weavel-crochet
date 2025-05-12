const TrianglePattern = (object) => {
  
  const objectData = object.userData.meshData;

  const height = objectData.height;
  const base = objectData.base;
  const START_SIZE = 2;
  const stitchesLeft = base - START_SIZE;
  const heightLeft = height - 2;
  const rate = Math.floor(stitchesLeft / heightLeft);

  const remain = stitchesLeft % heightLeft;

  const order = Array(heightLeft).fill(rate);

  const remainRate = Math.floor(heightLeft / remain);


  for (let i = 0; i < remain; i++) {
    order[i * remainRate] += 1;
  }

  const start = "Ch 2 (2)";
  const firstInc = "Row 1: inc in first stitch, ch 1 and turn. (2)";

  const output = [start, firstInc];

  let roundNum = 2;

  let stitchCount = 2;

  for (let i = 0; i < order.length; i++) {
    const roundString = "Round " + roundNum + ": ";

    if (order[i] == 0) {
      output.push(
        roundString +
          "sc " +
          stitchCount +
          ". Ch 1 and turn. (" +
          stitchCount +
          ")"
      );
    } else if (order[i] == 1) {
      output.push(
        roundString +
          "sc " +
          (stitchCount - 1) +
          ", inc. Ch 1 and turn. (" +
          (stitchCount + 1) +
          ")"
      );
      stitchCount += 1;
    } else if (order[i] == 2) {
      output.push(
        roundString +
          "inc, sc " +
          (stitchCount - 1) +
          ", inc. Ch1 and turn. (" +
          (stitchCount + 2) +
          ")"
      );
      stitchCount += 2;
    }
    roundNum += 1;
  }

  output.push("Fasten off.");
  return output;
};

export default TrianglePattern;
