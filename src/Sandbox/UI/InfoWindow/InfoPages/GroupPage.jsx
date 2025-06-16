import NameField from "./InfoAttributes/NameField";
import ColorField from "./InfoAttributes/ColorField";

const GroupPage = ({objects}) => {
  return (
    <div>
      <NameField objects = {objects}/>
      <ColorField objects = {objects}/>
    </div>
  );
};
export default GroupPage;
