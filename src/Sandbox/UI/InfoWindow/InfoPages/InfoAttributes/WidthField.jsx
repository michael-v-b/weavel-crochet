import "../InfoPages.css";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import useStore from "../../../../DevTools/store";
import InputField from "./InputField";

/**
 * @typedef {WidthField} - A field used to edit an object's width.
 * @property {Object} object - object whose base is being edited.
 * @returns {Component} - div with an input field that represents the object's width.
 */
const WidthField = forwardRef(
  ({ objects, getWidth, name = "Width: " }, ref) => {
    const [action, setAction] = useState([["width"], [], [], []]);
    const [matching, setMatching] = useState(true);
    const [changes, setChanges] = useState(false);
    const setFocused = useStore((state) => state.setFocused);
    const undoList = useStore((state) => state.undoList);
    const setUndoList = useStore((state) => state.setUndoList);
    const projectFile = useStore((state) => state.projectFile);
    const setProjectFile = useStore((state) => state.setProjectFile);
    const setWarningText = useStore((state) => state.setWarningText);

    const [width, setWidth] = useState("-");

    /**
     *
     * @returns True if all the widths are the same, false if not
     */
    const testMatching = () => {
      let temp = objects[0].userData.meshData.width;
      for (let i = 0; i < objects.length; i++) {
        if (temp != objects[i].userData.meshData.width) {
          return false;
        }
      }
      return true;
    };

    /**
     * updates matching whenever an object's width is changed
     */
    useEffect(() => {
      setMatching(testMatching());
    }, [objects, ...objects.map((object) => object.userData.meshData.width)]);

    useEffect(() => {
      if (objects && testMatching() && !changes) {
        setWidth(objects[0].userData.meshData.width);
      }
    }, [objects, width, matching]);

    /**
     *updates the internal base when input field is edited.
     *@param {Event} e - Used to find input field's value.
     */
    const handleChange = (e) => {
      const initNumber = parseInt(e.target.value);

      if (isNaN(initNumber)) {
        setWarningText("Entry was not a number");
        setWidth(0);
      } else {
        setWidth(initNumber);
      }
      setChanges(true);
    };

    /**
     * Sets the focused state to true when input field is focused on.
     */
    const handleFocus = () => {
      setFocused(true);
    };

    /**
     * Updates the object's height when input field is no longer selected and sets focused state to false.
     */
    const handleBlur = () => {
      let temp = Math.max(2, width);
      let meshTemp = temp;
      const meshType = objects[0].userData.meshType;
      if (meshType == "stadium" && temp % 2 != 0) {
        meshTemp = temp + 1;
      }

      objects.forEach((object) => {
        const objectData = object.userData.meshData;

        action[1].push(object);
        action[2].push(objectData.width);
        action[3].push(temp);

        objectData.setWidth(meshTemp);

        setWidth(meshTemp);

        //update project file
        const newMesh = projectFile.meshes[object.userData.idNumber];
        newMesh.width = temp;
      });

      if (getWidth) {
        getWidth(meshTemp);
      }

      undoList.push(action);
      setUndoList([...undoList]);
      setAction([["width"], [], [], []]);

      setProjectFile({ ...projectFile });

      setFocused(false);
    };

    useImperativeHandle(ref, () => ({ setWidth, width }));

    return (
      <>
        <div className="attribute">
          <div className="attribute attribute-name">{name}</div>
          <InputField
            className="small field-style"
            type="text"
            value={!changes || matching ? width : "-"}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <div className="stitch-text">stitches</div>
        </div>
      </>
    );
  }
);

export default WidthField;
