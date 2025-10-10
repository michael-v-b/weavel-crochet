import useRefStore from "../../../DevTools/refStore";
import useStore from "../../../DevTools/store";
const TutorialValues = () => {
  const refs = useRefStore((state) => state.refs);
  const mode = useStore((state) => state.mode);
  const meshList = useStore((state) => state.meshList);
  const selectedMeshes = useStore((state) => state.selectedMeshes);
  const tool = useStore((state) => state.tool);
  const modeBar = refs["modeBar"];
  const canvas = refs["canvas"];
  const tools = refs["tools"];
  const colorWindow = refs["colorWindow"];
  const attributes = refs["attributes"];
  const hierarchy = refs["hierarchy"];
  /*adding the extra value in the back is a quick fix
  [0] message
  [1] reference
  [2] flag
  [3] orientation
  */

  return [
    [
      `Welcome to this tutorial for navigating Weavel Crochet! This guide will help start your journey 
      to creating your own custom unique crochet creations. Hit \"Next\" to continue to the next step.`,
      null,
      true,
      "",
    ],
    ["To start off, let’s talk about Modes!", modeBar, true, "bottom"],
    [
      "There are 3 Modes that your canvas can be in, Camera Mode, Tools Mode and Shapes Mode",
      modeBar,
      true,
      "bottom",
    ],
    [
      "Please click on the Camera to Enter Camera Mode",
      modeBar,
      mode == "camera",
      "bottom",
    ],
    [
      "Now you can drag your mouse around the Canvas to change the direction of the camera",
      canvas,
      true,
      "right",
    ],
    [
      "Keep in mind that you can’t select or deselect objects while in Camera Mode",
      canvas,
      true,
      "right",
    ],
    ["Now select the Shapes Mode", modeBar, mode == "shapes", "bottom"],
    [
      "In the shapes mode, the side window changes to showcase all the different shapes that Weavel has to offer",
      tools,
      true,
      "right",
    ],
    [
      "These shapes are the basis for your designs, you will combine these simple shapes together to create more complex designs",
      tools,
      true,
      "right",
    ],
    [
      "Click on a button to spawn in a shape",
      tools,
      meshList.length > 0,
      "right",
    ],
    [
      "Now that you have spawned a shape, enter Tools Mode",
      modeBar,
      mode == "transform",
      "bottom",
    ],
    ["Now select the Translate tool", tools, tool == "translate", "right"],
    [
      "You can use the Translate tool to drag your shape into different areas, if you’re having trouble dragging it, move your camera to get a better vantage",
      canvas,
      selectedMeshes.length > 0,
      "right",
    ],
    ["Now try selecting the Rotate tool", tools, tool == "rotate", "right"],
    [
      "You can use the Rotate tool to rotate your object, the balls indicate the angle of the shape on each axis",
      canvas,
      selectedMeshes.length > 0,
      "right",
    ],
    [
      "Here you can add colors to your scene, you can hit the plus sign to add new colors or each color icon to change the value of that color",
      colorWindow,
      true,
      "right",
    ],
    [
      "Here you can change your object's attributes, every shape has certain attributes in common such as Name and Color, while some shape’s attributes are unique",
      attributes,
      true,
      "left",
    ],
    [
      "You can also use this area to delete a shape, you can also use the backspace or delete keys as a shortcut",
      attributes,
      true,
      "left",
    ],
    [
      "This is the Object List, it lists all shapes that are currently in your project, along with their names",
      hierarchy,
      true,
      "left",
    ],
    [
      "If you are having trouble selecting a certain shape, you can select it here instead",
      hierarchy,
      true,
      "left",
    ],
    [
      "You can click multi-select to select multiple objects at once",
      hierarchy,
      true,
      "left",
    ],
    [
      "Once you have finished with your project, you can click the download button on the right to download a pdf with your crochet pattern.",
      modeBar,
      true,
      "bottom",
    ],
    ["Happy Crafting!", null, true, ""],
    [],
  ];
};

export default TutorialValues;
