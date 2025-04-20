import "./colorButton.css";
import { useEffect, useState } from "react";
import useStore from "../../../DevTools/store";

const HexOption = ({ color, id }) => {
  const [currentColor, setCurrentColor] = useState(color);
  const [firstColor, setFirstColor] = useState(color);
  const colorList = useStore((state) => state.colorList);
  const setColorList = useStore((state) => state.setColorList);
  const setFocused = useStore((state) => state.setFocused);

  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  /**
   * tests whether or not the string is a hex code, and then changes color if it is
   * @param {string} hexString - input that is tested to see if it is string.
   */
  const testHexString = (hexString) => {
    if (/^#?[0-9A-Fa-f]{6}$/.test(hexString)) {
      setFirstColor(currentColor);
      colorList[id - 1] = hexString;
      setColorList([...colorList]);
    } else {
      setCurrentColor(firstColor);
    }
  };

  const handleChange = (event) => {
    setCurrentColor(event.target.value);
  };

  const handleFocused = () => {
    setFocused(true);
    setFirstColor(currentColor);
  };

  const handleBlur = () => {
    setFocused(false);
    testHexString(currentColor);
  };

  return (
    <div className="hex-container">
      Hex:
      <input
        className="hex-input"
        type="text"
        maxLength={7}
        value={currentColor}
        onChange={handleChange}
        onFocus={handleFocused}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default HexOption;
