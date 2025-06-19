import "../InfoPages.css";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import useStore from "../../../../DevTools/store";
import InputField from "./InputField";

/**
 * @typedef {CircumField} - A field in the info window that is used to change an object's circumference.
 * @property {GetFocusedCallback} - Lets boolean isFocused be accessible by Parents.
 * @property {Mesh} object - object whose circumference is being changed
 * @returns {Component} - div that represents the circumference.
 */
const CircumferenceField = forwardRef(
  ({ objects, getCircum, roundingNum = 6, minCircum = 3 }, ref) => {
    CircumferenceField.displayName = "Circumference Field";

    const [circum, setCircum] = useState(-1);
    //action, objects, old radii, new radii,old circum, new circum
    const [action, setAction] = useState([["circum"], [], [], [], [], []]);
    const [changed, setChanged] = useState(false);
    const [matching, setMatching] = useState(true);

    const setFocused = useStore((state) => state.setFocused);
    const undoList = useStore((state) => state.undoList);
    const setUndoList = useStore((state) => state.setUndoList);
    const projectFile = useStore((state) => state.projectFile);
    const setProjectFile = useStore((state) => state.setProjectFile);
    const circum_radius_convert = useStore(
      (state) => state.circum_radius_convert
    );
    const setWarningText = useStore((state) => state.setWarningText);

    /**
     * @returns true if all of the object's circumferences are matching, false if otherwise
     */
    const testMatching = () => {
      const temp = objects[0].userData.meshData.circum;
      for (let i = 0; i < objects.length; i++) {
        if (objects[i].userData.meshData.circum != temp) {
          return false;
        }
      }
      return true;
    };

    //sets matching based on all the values
    useEffect(() => {
      setMatching(testMatching());
    }, [objects, ...objects.map((object) => object.userData.meshData.circum)]);

    //changes circum based on objects changing
    useEffect(() => {
      if (objects && testMatching() && !changed) {
        setCircum(objects[0].userData.meshData.circum);
      }
    }, [objects, circum, matching]);

    /**
     * When input field is changed, update the circum accordingly
     * @param {Event} e - used to find new value in input field.
     */
    const handleChange = (e) => {
      const initNumber = parseInt(e.target.value);
      if (isNaN(initNumber) || initNumber < 0) {
        setWarningText("Entry was not a number");
        setCircum(0);
      } else {
        setCircum(initNumber);
      }
      setChanged(true);
    };

    /**
     * Round circumference to the roundingNum
     */

    const roundCircum = (tempCircum) => {
      if (tempCircum < 3 && (roundingNum == 8 || roundingNum == 0)) {
        setWarningText("Circumference must be at minimum " + minCircum);
      }

      let roundedCircum = Math.max(minCircum, tempCircum);

      if (roundingNum != 0 && !(roundingNum == 8 && roundedCircum < 8)) {
        roundedCircum = Math.max(
          roundingNum,
          roundingNum * Math.floor(tempCircum / roundingNum)
        );

        //warning text
        if (tempCircum % roundingNum != 0) {
          setWarningText("Circumference must be multiple of " + roundingNum);
        }
      }

      if (getCircum) {
        getCircum(roundedCircum);
      }

      return roundedCircum;
    };

    /**
     * Calculates radius given current circum.
     * Rounds Circumference.
     */
    const findRadius = (tempCircum = circum) => {
      //warning if under 3 circumference for cylinder and circle

      const newRadius = circum_radius_convert(tempCircum);

      action[3].push(newRadius);

      //update project file
      return newRadius;
    };

    /**
     * Sets the focused state to true when input field is focused on.
     */
    const handleFocused = () => {
      setFocused(true);
    };

    /**
     * Set focused stated to false and updates the radius in the scene.
     */
    const handleBlur = () => {
      if (!changed) {
        return;
      }
      const roundedCircum = roundCircum(circum);

      setCircum(roundedCircum);

      objects.forEach((object) => {
        object.userData.meshData.setRadius(findRadius(roundedCircum));
        object.userData.meshData.setCircum(roundedCircum);

        action[1].push(object);
        action[2].push(object.userData.meshData.radius);
        action[4].push(object.userData.meshData.circum);
        action[5].push(roundedCircum);

        const newMesh = projectFile.meshes[object.userData.idNumber];
        newMesh.circum = roundedCircum;
      });

      //save project
      setProjectFile({ ...projectFile });

      //save undo list
      undoList.push(action);
      setUndoList([...undoList]);
      setAction([["circum"], [], [], [], [], []]);

      //reset
      setFocused(false);
    };

    useImperativeHandle(ref, () => ({ circum, setCircum, findRadius }));

    return (
      <>
        <div className="attribute">
          <div className="attribute attribute-name">Circum: </div>
          <InputField
            className="attribute small field-style"
            type="text"
            value={matching || changed ? circum : "-"}
            onFocus={handleFocused}
            onBlur={handleBlur}
            onChange={handleChange}
          />{" "}
          <div className="stitch-text">stitches</div>
        </div>
      </>
    );
  }
);

export default CircumferenceField;
