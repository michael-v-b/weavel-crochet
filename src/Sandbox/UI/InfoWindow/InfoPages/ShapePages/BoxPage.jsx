import DimField from "../InfoAttributes/DimField";

/**
 * @typedef {BoxPage} - extra fields added when box is selected.
 * @property {GetFocusedCallback} getFocused - allows isFocused to be accessed by Parents.
 * @property {Mesh} object - the box whose info is being displayed.
 * @property {DimField} - Dimfield.
 */
const BoxPage = ({ getFocused, object }) => {
  return (
    <>
      <DimField getFocused={getFocused} object={object} dimensions={3} />
    </>
  );
};
export default BoxPage;
