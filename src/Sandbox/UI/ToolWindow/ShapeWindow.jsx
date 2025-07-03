import "./ToolWindow.css";
import ShapeButton from "../Buttons/ShapeButton.jsx";
import ChainIcon from "../../../assets/Icons/Shapes/chain.svg?react";
import CircleIcon from "../../../assets/Icons/Shapes/circle.svg?react";
import ConeIcon from "../../../assets/Icons/Shapes/cone.svg?react";
import BoxIcon from "../../../assets/Icons/Shapes/cube.svg?react";
import CylinderIcon from "../../../assets/Icons/Shapes/cylinder.svg?react";
import EyeIcon from "../../../assets/Icons/Shapes/eye.svg?react";
import SiloIcon from "../../../assets/Icons/Shapes/silo.svg?react";
import SphereIcon from "../../../assets/Icons/Shapes/sphere.svg?react";
import SquareIcon from "../../../assets/Icons/Shapes/square.svg?react";
import StadiumIcon from "../../../assets/Icons/Shapes/stadium.svg?react";
import TriangleIcon from "../../../assets/Icons/Shapes/triangle.svg?react";


/**
 *@typedef {ShapeWindow} - Window that showcases all the different shapes that can be added to the scene.
 *@property {GetShapeCallback} - Allows shape that was just spawned to be accessible to parents.
 *@property {Reference} mouseHoverRef - a reference to the mouseHover object
 *@returns {Component} - Div full of buttons representing every shape that can be added, organized by dimension.
 */
const ShapeWindow = ({ getShape,mouseHoverRef}) => {
  const handleClick = (shape) => {
    getShape(shape);
  };
  const thirdShapes = [
    ["ball", <SphereIcon className = 'tool-icon'/>],
    ["silo", <SiloIcon className = 'tool-icon'/>],
    ["capsule", "Capsule"],
    ["cone", <ConeIcon className = 'tool-icon'/>],
    ["cylinder", <CylinderIcon className = 'tool-icon'/>],
    ["box",<BoxIcon className = 'tool-icon'/>]];

  const secondShapes = [
    ["chain",  <ChainIcon className = 'tool-icon'/>],
    ["circle",  <CircleIcon className = 'tool-icon'/>],
    ["stadium",  <StadiumIcon className = 'tool-icon'/>],
    ["square",  <SquareIcon className = 'tool-icon'/>],
    ["triangle", <TriangleIcon className = 'tool-icon'/>],
    ["eye", <EyeIcon className = 'tool-icon'/>]];
  return (
    <>
      <div className="tool-window">
        {/*3d shapes*/}
        <div className="title">3D Shapes </div>
        <div className="window">
          {thirdShapes.map((value, index) => {
            const name = value[0];
            const icon = value[1];
            const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
            return (
              <ShapeButton
                key={index}
                onClick={() => {
                  handleClick(name);
                }}
                onMouseEnter = {()=>{
                  mouseHoverRef.current.startTimer(capitalized);
                }}
                onMouseLeave = {()=>{
                  mouseHoverRef.current.cancelTimer();
                }}
              >
                {icon}
              </ShapeButton>
            );
          })}
        </div>

        {/*2d shapes section*/}
        <div className="title">2D Shapes </div>
        <div className="window">
          {secondShapes.map((value, index) => {
            console.log("value: " + value);
            const name = value[0];
            const icon = value[1];
            const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
            return (
              <ShapeButton
                key={index}
                onClick={() => {
                  handleClick(name);
                }}
                onMouseEnter = {()=>{
                  mouseHoverRef.current.startTimer(capitalized);
                }}
                onMouseLeave = {()=>{
                  mouseHoverRef.current.cancelTimer();
                }}
              >
                {icon}
              </ShapeButton>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default ShapeWindow;
