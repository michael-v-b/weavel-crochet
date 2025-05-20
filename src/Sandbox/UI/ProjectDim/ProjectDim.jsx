import "./ProjectDim.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useStore from "../../DevTools/store";

const ProjectDim = () => {
  const projectDims = useStore((state) => state.projectDims);
  const [projectText, setProjectText] = useState([0, 0, 0]);
  const [metric, setMetric] = useState(false);
  const [unit, setUnit] = useState("(in.)");

  useEffect(() => {
    if (metric) {
      setUnit("(m.)");
    } else {
      setUnit("(in.)");
    }
  }, [metric]);

  const simplify = (num) => {
    let output = "";
    if (metric) {
      output = simplifyMeter(num);
    } else {
      output = simplifyFeet(num);
    }
    return output;
  };

  const simplifyFeet = (num) => {
    const FOOT = 12;
    let feet = Math.floor(num / FOOT);

    if(!isFinite(feet)) {
      feet = 0;
    }
    let inches = parseFloat((num % FOOT).toFixed(2));
    if(isNaN(inches)) {
      inches = 0;
    }

    let output = "";
    if (feet > 0) {
      output = feet + "' " + inches + "''";
    } else {
      output = inches + "''";
    }
    return output;
  };

  const simplifyMeter = (num) => {
    let mm = num * 25.4;

    if(!isFinite(mm)) {
      mm = 0;
    }
    let cm = 0;

    if (mm > 10) {
      cm = mm / 10;
    }

    let output = "";
    if (cm != 0) {
      output = cm.toFixed(1) + "cm.";
    } else {
      output = mm.toFixed(0) + "mm.";
    }
    return output;
  };

  useEffect(() => {
    for (let i = 0; i < projectDims.length; i++) {
      //set positive set round to nearest 100th, then remove trailing 0s
      projectText[i] = parseFloat(Math.abs(projectDims[i]).toFixed(2));
    }
    setProjectText([...projectText]);
  }, [projectDims]);
  //rgb(52, 108, 168);
  return (
    <motion.div
      whileHover={{ color: "#72a5db", scale: 1.025 }}
      whileTap={{ color: "#84b2e3", scale: 0.975 }}
      onClick={() => {
        setMetric(!metric);
      }}
      className="project-dim"
    >
      Dimensions:
      <div className="project-dim-text">{simplify(projectText[0])}</div>x
      <div className="project-dim-text">{simplify(projectText[1])}</div>x
      <div className="project-dim-text">{simplify(projectText[2])}</div>
      {unit}
    </motion.div>
  );
};

export default ProjectDim;
