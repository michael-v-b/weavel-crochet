import BallPattern from "./Pattern/BallPattern";
import BoxPattern from "./Pattern/BoxPattern";
import SquarePattern from "./Pattern/SquarePattern";
import CirclePattern from "./Pattern/CirclePattern";
import CylinderPattern from "./Pattern/CylinderPattern";
import ConePattern from "./Pattern/ConePattern";
import CapsulePattern from "./Pattern/CapsulePattern";
import ChainPattern from "./Pattern/ChainPattern";
import SiloPattern from "./Pattern/SiloPattern";
import TrianglePattern from "./Pattern/TrianglePattern";
import StadiumPattern from "./Pattern/StadiumPattern";

import Title from "./Title";
import Disclaimer from "./Disclaimer";
import Summary from "./Summary";
import Finishing from "./Finishing";

import EyeTracker from "../DevTools/EyeTracker";

import { forwardRef, useImperativeHandle } from "react";
import { jsPDF } from "jspdf";
import useStore from "../DevTools/store";

import banner from "../../assets/banner.png";


/**
 * @typedef {Exporter} - exports crochet patterns of every mesh in scene.
 * @property {[Mesh]} meshList - every mesh in the scene.
 *
 * @TODO Implement patterns for the following shapes
 * - stadium
 * - silo
 * - chain
 */
const Exporter = forwardRef((_, ref) => {
  Exporter.displayName = "Exporter";
  const colorList = useStore((state) => state.colorList);
  const meshList = useStore((state) => state.meshList);
  const projectName = useStore((state) => state.projectName);
  let pageWidth = 0;
  let pageHeight = 0;

  let row = 10;

  //maps meshtype to pattern
  const Patterns = {
    ball: BallPattern,
    box: BoxPattern,
    square: SquarePattern,
    circle: CirclePattern,
    cylinder: CylinderPattern,
    cone: ConePattern,
    capsule: CapsulePattern,
    chain: ChainPattern,
    silo: SiloPattern,
    triangle: TrianglePattern,
    stadium: StadiumPattern,
  };

  

  /**
   *Converts hex codes to rgb values
   *@param {string} hexCode - The hex code.
   * @returns [r: {Number}, g: {Number} b: {Number}] - rgb values.
   */
  const hexToRGB = (hexCode) => {
    const r = parseInt(hexCode.slice(1, 3), 16);
    const g = parseInt(hexCode.slice(3, 5), 16);
    const b = parseInt(hexCode.slice(5, 7), 16);
    return [r, g, b];
  };

  /**
   * adds the colors for each yarn at the top of the page.
   */
  const addColorKey = (doc) => {
    doc.text("Color Key: ", 10, row);
    for (let i = 0; i < colorList.length; i++) {
      const COLOR_SIZE = 4;
      addRow(10, doc);
      doc.text(
        "- Color " + (i + 1) + ": " + colorList[i].toUpperCase(),
        10,
        row
      );
      const rgb = hexToRGB(colorList[i]);
      doc.setFillColor(0, 0, 0);
      doc.circle(70, row - 2, COLOR_SIZE + 0.5, "F");
      doc.setFillColor(rgb[0], rgb[1], rgb[2]);

      doc.circle(70, row - 2, COLOR_SIZE, "F");
      doc.text("\n", 10, 10);
    }
  };

  const addStitchKey = (doc) => {
    const stitch_key_text = [
      "-sc: single crochet",
      "-ch: chain",
      "-inc: increase",
      "-dec: decrease",
      "-sl st: slip stitch",
    ];
    doc.text("Stitch Key: ", 10, row);
    for (let i = 0; i < stitch_key_text.length; i++) {
      addRow(10, doc);
      doc.text(stitch_key_text[i], 10, row);
    }
  };

  /**
   *Adds a banner to the top of the page.
   *@param {Document} doc - the document whose banner is being added
   */
  const addBanner = (doc) => {
    doc.setFillColor(191, 237, 245);
    doc.rect(0, 0, pageWidth, 20, "F");

    doc.addImage(banner, 0, 0, 200, 20);
    doc.setTextColor(0, 0, 0);
    row += 30;
  };

  /**
   */
  const printToDoc = (stringList, doc) => {
    for (let i = 0; i < stringList.length; i++) {
      doc.text(stringList[i], 10, row);
      addRow(7, doc);
      //if row gets larger than page height, add new page.
    }
  };

  const addRow = (num, doc) => {
    row += num;
    if (row > pageHeight - 30) {
      doc.addPage();
      addBanner(doc);
      row = 40;
    }
  };



  const exportPDF = () => {
    const doc = new jsPDF();
    pageHeight = doc.internal.pageSize.getHeight();
    pageWidth = doc.internal.pageSize.getWidth();
    doc.setFont("Helvetica", "normal");

    row = 10;
    addBanner(doc);

    //add title
    doc.setFontSize(24);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(120, 165, 206);
    doc.setFillColor(191, 237, 245);
    doc.roundedRect(10, row - 10, pageWidth - 50, 15, 5, 5, "F");
    doc.text(projectName, 20, row);

    addRow(20, doc);

    doc.setFontSize(14);

    doc.setFont("Helvetica", "bold");

    //DISCLAIMER//////////////////////////////////////
    doc.setTextColor(255, 90, 90);

    Disclaimer().forEach((line) => {
      doc.text(line,10,row);
      addRow(10,doc);
    })
    addRow(10, doc);

    //SUMMARY////////////////////////////////////////////
    doc.setTextColor(120, 165, 206);

    Summary().forEach((line)=>{
      doc.text(line,10,row);
      addRow(10);
    })

    addRow(10, doc);

    doc.setDrawColor(120, 165, 206);
    doc.line(10, row, pageWidth - 10, row);

    addRow(10, doc);

    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.setFont("Helvetica", "normal");

    addColorKey(doc);

    addRow(10, doc);

    doc.setDrawColor(120, 165, 206);
    doc.line(10, row, pageWidth - 10, row);

    addRow(10, doc);

    addStitchKey(doc);

    addRow(10, doc);

    doc.setDrawColor(120, 165, 206);

    doc.line(10, row, pageWidth - 10, row);

    //if recommended materials would bleed to next page, make it on next page
    //otherwise keep it right under
    if (pageHeight-row < 50) {
      addRow(pageHeight-row,doc);
      doc.line(10, row, pageWidth - 10, row);
      addRow(10,doc);
    } else {
      addRow(10,doc);
    }

    addRow(10, doc);

    doc.text("Recommended Materials:", 10, row);
    addRow(10, doc);

    doc.text("- #4 weight yarn in previous colors", 10, row);
    addRow(10, doc);

    doc.text("- 3.5mm corchet hook", 10, row);
    addRow(10, doc);

    doc.text("- Stuffing", 10, row);
    addRow(10, doc);

    doc.text("- Scissors", 10, row);
    addRow(10, doc);

    //add eyes to materials
    const eyeCount = EyeTracker.getEyeCount(meshList);
    const eyeSizes = Object.keys(eyeCount);
    for(let i = 0; i < eyeSizes.length;i++) {
      doc.text("- " + eyeCount[eyeSizes[i]] + " x " + eyeSizes[i] + " mm. safety eyes",10,row);
      addRow(10,doc);
    }

    //iterate through every mesh and its mesh pattern to the list.
    for (let i = 0; i < meshList.length; i++) {
     
      let stringList = [];
      const object = meshList[i];
      
      if(object.userData.meshType!="eye") {
        doc.setDrawColor(120, 165, 206);
        doc.line(10, row, pageWidth - 10, row);

        addRow(14, doc);

        //Object Title
        Title(doc,object.name,row);

        addRow(14, doc);

        //switch color
        doc.text(
          "Switch to color " + object.userData.colorIndex + " yarn.\n",
          10,
          row
        );

        addRow(14, doc);

      
        const meshEyeList = EyeTracker.getIntersectingEyes(object,meshList);
        //concat actual pattern
        stringList = stringList.concat(
          Patterns[object.userData.meshType](object,meshEyeList)
        );
        stringList.push("\n");
      }
      printToDoc(stringList, doc);
    }

    doc.setDrawColor(120, 165, 206);
    doc.line(10, row, pageWidth - 10, row);
    
    addRow(14,doc);
    
    //Finishing ////////////////////
    Title(doc,"Finishing",row);
    
    Finishing(meshList);

    //doc.text("Sew all pieces together",row);

    doc.save(projectName + " pattern");
  };

  useImperativeHandle(ref, () => ({ exportPDF }));
});

export default Exporter;
