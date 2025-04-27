import "./ToolWindow.css";
import DrawButton from "../Buttons/DrawButton.jsx";
import React, { useRef, useState } from "react";

/**
 *@typedef {DrawWindow} - Window that showcases all the different shapes that can be added to the scene.
 *@property {GetShapeCallback} - Allows shape that was just spawned to be accessible to parents.
 *@returns {Component} - Div full of buttons representing every shape that can be added, organized by dimension.
 */
const DrawWindow = ({ getShape }) => {
  const handleClick = (shape) => {
    getShape(shape);
  };
  const thirdShapes = ["ball", "silo", "capsule", "cone", "cylinder", "box"];
  const secondShapes = ["chain", "circle", "stadium", "square", "triangle"];
  return (
    <>
      <div className="tool-window">
        {/*3d shapes*/}
        <div className="title">3D Shapes </div>
        <div className="window">
          {thirdShapes.map((name, index) => {
            const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
            return (
              <DrawButton
                key={index}
                onClick={() => {
                  handleClick(name);
                }}
              >
                {capitalized}
              </DrawButton>
            );
          })}
        </div>

        {/*2d shapes section*/}
        <div className="title">2D Shapes </div>
        <div className="window">
          {secondShapes.map((name, index) => {
            const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
            return (
              <DrawButton
                key={index}
                onClick={() => {
                  handleClick(name);
                }}
              >
                {capitalized}
              </DrawButton>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default DrawWindow;
