import "../InfoPages.css";
import { useState, useEffect } from "react";
import useStore from "../../../../DevTools/store";

/**
 * @typedef {ColorField} - the color of the given object
 * @property {Mesh} object - the object whose color will be changed.
 * @property {[string]} colorList - a list of all colors in project.
 * @returns {Component} - a component used to change the color of an object.
 */
const ColorField = ({ objects}) => {
  const colorList = useStore((state) => state.colorList);
  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);
  const selectedMeshes = useStore((state)=>state.selectedMeshes);

    
  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentColor, setCurrentColor] = useState(
    colorList[0]
  );
  const [isWhite, setWhite] = useState(false);

  /**
   *When new option is selected, update currentcolor
   *@param {Event} event - new value for currentColor
   */

  const handleChange = (value) => {
    const newColor = colorList[value - 1];
    objects.forEach((object) =>{
    
      object.material.color.set(newColor);

      object.userData.setColorIndex(value);


      //update project file
      const newMesh = projectFile.meshes[object.userData.idNumber];
      newMesh.colorIndex = value;
    });
    setCurrentColor(newColor);
    setCurrentIndex(value);
    setWhite(testWhite(newColor));

    setProjectFile({ ...projectFile });
  };

  /**
   * tests whether the object's current color is dark enough to warrant changing
   * the field's color to white.
   */
  const testWhite = (tempColor) => {
    let r = 0;
    let g = 0;
    let b = 0;
    if (typeof tempColor == "string") {
      r = parseFloat(tempColor.substring(0, 2), 16) / 255;
      g = parseFloat(tempColor.substring(2, 4), 16) / 255;
      b = parseFloat(tempColor.substring(4, 6), 16) / 255;
    } else {
      r = tempColor.r;
      g = tempColor.g;
      b = tempColor.b;
    }

    if (Math.max(r, g, b) < 0.5) {
      return true;
    } else {
      return false;
    }
  };

  /**
   * 
   * @returns True if all of the objects have the same color index, and false otherwise
   */
  const testMatching = () => {
    const temp = objects[0].userData.colorIndex;
    for(let i =0 ; i < objects.length;i++) {
      if(objects[i].userData.colorIndex != temp) {
        return false;
      }
    }
    return true;
  }

  /**
   * change background of field when the color changes.
   */
  useEffect(() => {

    objects.forEach((object) => {
      const objectData = object.userData;
      const minIndex = Math.min(objectData.colorIndex,colorList.length);
      objectData.setColorIndex(minIndex);
    });

    let matches = testMatching();
    
    
    const colorValue = matches ? Math.min(objects[0].userData.colorIndex,colorList.length) : 1;

    const newColor = colorList[colorValue-1];
    setCurrentColor(newColor);
    setCurrentIndex(colorValue);
    setWhite(testWhite(newColor));

    setProjectFile({ ...projectFile });

    //handleChange(minIndex);
  }, [colorList]);

  useEffect(() => {
    const temp = objects[0].userData.colorIndex;
    let matches = testMatching();
   
    const colorValue = matches ? temp : 1;
    setCurrentIndex(colorValue);
    setCurrentColor(colorList[colorValue - 1]);
    setWhite(testWhite(colorValue));
  }, [selectedMeshes]);


  return (
    <div className="attribute">
      <div className="attribute attribute-name"> Color</div>
      <select
        value={currentIndex}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        style={{
          color: isWhite ? "#FFFFFF" : "#000000",
          backgroundColor: currentColor,
        }}
        className = "color-field"
      >
        {colorList.map((value, key) => {
          return (
            <option
              key={key}
              
              style={{
                backgroundColor: value,
                color: testWhite(value.replace(/^#/, ""))
                  ? "#FFFFFF"
                  : "#000000",
              }}
              value={key + 1}
            >
              Color {key + 1}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ColorField;
