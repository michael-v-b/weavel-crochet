const HalfField = ({ object }) => {
  const objectData = object.userData.meshData;

  const handleChange = (event) => {
    objectData.setHalf(event.target.checked);
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
