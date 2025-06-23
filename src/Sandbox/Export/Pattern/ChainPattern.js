/**
 * @typedef {ChainPattern}
 * @param {Object} input - Mesh object with mesh data.
 * @returns {[string]} - a crochet pattern for making a chain.
 */
const ChainPattern = (input) => {
  const length = input.userData.meshData.height;

  return ["Ch " + length + ". (" + length + ")", "Fasten off."];
};

export default ChainPattern;
