import "./ProjectDim.css";
import useStore from "../../DevTools/store";

const ProjectDim = () => {
  //const projectDims = useStore((state) => state.projectDims);
  const calculateSize = (axis) => {
    return axis[0] - axis[1];
  };

  return (
    <div className="project-dim">
      <div>{calculateSize([0, 0])}</div>
    </div>
  );
};

export default ProjectDim;
