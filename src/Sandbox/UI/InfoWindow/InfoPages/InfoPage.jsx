import NameField from "./InfoAttributes/NameField";
import PositionField from "./InfoAttributes/PositionField";
import RotationField from "./InfoAttributes/RotationField";
import ColorField from "./InfoAttributes/ColorField";
import BallPage from "./ShapePages/BallPage";
import BoxPage from "./ShapePages/BoxPage";
import CapsulePage from "./ShapePages/CapsulePage";
import CylinderPage from "./ShapePages/CylinderPage";
import ConePage from "./ShapePages/ConePage";
import SquarePage from "./ShapePages/SquarePage";
import CirclePage from "./ShapePages/CirclePage";
import StadiumPage from "./ShapePages/StadiumPage";
import SiloPage from "./ShapePages/SiloPage";
import ChainPage from "./ShapePages/ChainPage";

/**
 *@typedef {InfoPage} - provides all of the information inside of the info window.

 
 * @property {string} meshType - the type of mesh that is currently selected
 *@property {ToolManagerRef} toolManagerRef- lets all public methods from ToolManager to be accessible.
 *@property {[string]} colorList - a list of all colors available in project.
 */
const InfoPage = ({ object, meshType }) => {
  const shapePages = {
    ball: BallPage,
    capsule: CapsulePage,
    cylinder: CylinderPage,
    cone: ConePage,
    box: BoxPage,
    square: SquarePage,
    circle: CirclePage,
    stadium: StadiumPage,
    silo: SiloPage,
    chain: ChainPage,
  };
  const MeshType = shapePages[meshType];

  return (
    <div>
      <NameField object={object} />
      <PositionField object={object} />
      <RotationField object={object} />
      <ColorField object={object} />
      {MeshType && <MeshType object={object} />}
    </div>
  );
};

export default InfoPage;
