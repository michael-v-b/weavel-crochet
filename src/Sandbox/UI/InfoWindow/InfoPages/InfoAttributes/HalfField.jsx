import useStore from "../../../../DevTools/store";

const HalfField = ({ object }) => {
  const objectData = object.userData.meshData;

  const projectFile = useStore((state) => state.projectFile);
  const setProjectFile = useStore((state) => state.setProjectFile);

  const handleChange = (event) => {
    const isHalf = event.target.checked;
    objectData.setHalf(isHalf);

    //update project file
    const newMesh = projectFile.meshes[object.userData.idNumber];

    newMesh.isHalf = isHalf;
    setProjectFile({ ...projectFile });
  };

  return (
    <>
      <div className="attribute">
        <div className="attribute attribute-name">Half: </div>
        <input
          className="attribute small field-style"
          type="checkbox"
          onChange={handleChange}
        />{" "}
      </div>
    </>
  );
};

export default HalfField;
