import DimField from "../InfoAttributes/DimField";

/**
 * @typedef {BoxPage} - extra fields added when box is selected.
 * @property {Mesh} object - the box whose info is being displayed.
 * @property {DimField} - Dimfield.
 */
const BoxPage = ({ object }) => {
  return (
    <>
      <DimField objects={[object]} dimensions={3} />
    </>
  );
};
export default BoxPage;
