import NameField from "./InfoAttributes/NameField";
import ColorField from "./InfoAttributes/ColorField";
import RotationField from "./InfoAttributes/RotationField";

const GroupPage = ({objects}) => {
  return (
    <div>
      <NameField objects = {objects}/>
    </div>
  );
};
export default GroupPage;
