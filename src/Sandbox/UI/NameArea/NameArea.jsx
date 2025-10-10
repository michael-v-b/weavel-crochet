import NameTag from "./NameTag/NameTag";
import TutorialButton from "./Tutorial/TutorialButton";

const NameArea = () => {
  return (
    <div className="name-tag-container clickable">
      <NameTag />
      <TutorialButton />
    </div>
  );
};

export default NameArea;
