import HeightField from "../InfoAttributes/HeightField";
import CircumField from "../InfoAttributes/CircumField";
import React, { useState } from "react";

/**
 * @typedef {ConePage} - extra fields added when cone is selected.
 * @property {GetFocusedCallback} getFocused - allows isFocused to be accessed by App.
 * @property {Mesh} object - the cone whose info is being displayed.
 * @returns {Component} - CircumField and HeightField.
 */
const ConePage = ({ object, getFocused }) => {
  const objectData = object.userData.meshData;
  const [currentCircum, setCurrentCircum] = useState(objectData.circum);

  /**
   * updates the circumference state in order to change the max height.
   */
  const handleCircum = (newCircum) => {
    setCurrentCircum(newCircum);
  };

  return (
    <>
      <CircumField
        object={object}
        getFocused={getFocused}
        getCircum={handleCircum}
        roundingNum={0}
      />
      <HeightField
        object={object}
        getFocused={getFocused}
        maxRate={6}
        currentBase={currentCircum}
      />
    </>
  );
};
export default ConePage;
