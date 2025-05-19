import "./ProjectDim.css";
import {useEffect,useState} from 'react';
import useStore from "../../DevTools/store";

const ProjectDim = () => {
  const projectDims = useStore((state) => state.projectDims);
  const [projectText,setProjectText] = useState([0,0,0]);



  useEffect(()=>{
    for(let i =0; i < projectDims.length;i++) {
      
      //set positive set round to nearest 100th, then remove trailing 0s
      projectText[i] = parseFloat(Math.abs(projectDims[i]).toFixed(2));
    }
    setProjectText([...projectText]);
    
  },[projectDims]);

  useEffect(()=>{
    console.log(projectText);
  },[projectText]);
  
  return (
    <div className="project-dim">
      Dimensions:
      <div className = "project-dim-text">{projectText[0]}</div>
      x
      <div className = "project-dim-text">{projectText[1]}</div>
      x
      <div className = "project-dim-text">{projectText[2]}</div>
    </div>
  );
};

export default ProjectDim;
