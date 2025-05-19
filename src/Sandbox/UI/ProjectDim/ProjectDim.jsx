import "./ProjectDim.css";
import {useEffect,useState} from 'react';
import {motion} from 'framer-motion';
import useStore from "../../DevTools/store";

const ProjectDim = () => {
  const projectDims = useStore((state) => state.projectDims);
  const [projectText,setProjectText] = useState([0,0,0]);
  const [metric, setMetric] = useState(false);


  const simplify = (num) => {
    let output = "";
    if(metric) {
      output = simplifyMeter(num);
    } else {
      output = simplifyFeet(num);
    }
    return output;
  }

  const simplifyFeet = (num)=>{
        const FOOT = 12;
    const feet = Math.floor(num/FOOT);

    const inches = parseFloat((num%FOOT).toFixed(2));

    let output = "";
    if(feet > 0) {
      output = feet + "' " + inches +"''";
    } else {
      output = inches + "''";
    }
    return output;
  }

  const simplifyMeter = (num)=>{
    let mm = num*25.4;
    let cm = 0;
    let m = 0;

    if(mm > 10) {
      cm = mm/10;
    }

    if(cm > 100) {
      m = cm/100;
    }

    let output = ""
    if(m != 0) {
      output = m.toFixed(2) + " m.";
    } else if (cm != 0) {
      output = cm.toFixed(2) + "cm.";
    } else {
      output = mm.toFixed(2) + "mm.";
    }
    return output;

  }


  useEffect(()=>{
    for(let i =0; i < projectDims.length;i++) {
      
      //set positive set round to nearest 100th, then remove trailing 0s
      projectText[i] = parseFloat(Math.abs(projectDims[i]).toFixed(2));
    }
    setProjectText([...projectText]);
    
  },[projectDims]);


  
  return (
    <motion.div className="project-dim">
      Dimensions:
      <div className = "project-dim-text">{simplify(projectText[0])}</div>
      x
      <div className = "project-dim-text">{simplify(projectText[1])}</div>
      x
      <div className = "project-dim-text">{simplify(projectText[2])}</div>
      (in.)
    </motion.div>
  );
};

export default ProjectDim;
