import "./InfoWindow.css";
import "../../styles.css";
import InfoPage from "./InfoPages/InfoPage";
import GroupPage from "./InfoPages/GroupPage";
import useStore from "../../DevTools/store";
import {useEffect} from 'react';

/**
 * @typedef {InfowWindow} - Showcases all of a selected objects attributes that can be edited freely.
 * @property {deleterReference} deleterRef - a reference to the deleter object that deletes objects
 * @returns {Component} - window full of all field relevant to a selected item.
 */
const InfoWindow = ({deleterRef}) => {
  const selectedMeshes = useStore((state) => state.selectedMeshes);

    const handleHistory =  (event) => {
    if (
      (event.inputType === 'historyUndo' || event.inputType === 'historyRedo') &&
      event.target instanceof HTMLInputElement
    ) {
      event.preventDefault();
    } 
  }

  useEffect(()=>{
  document.addEventListener('beforeinput',handleHistory, { capture: true });
  },[]);


  return (
    <div className="side-window">
      <div className="side-title-bar">Info</div>
      <div className="info">
        {selectedMeshes.length > 0 && (
          <>
            {selectedMeshes.length == 1 && (
              <>
                {<InfoPage
                  deleterRef = {deleterRef}
                  object={selectedMeshes[0]}
                  meshType={selectedMeshes[0].userData.meshType}
            />}

              </>
            )}
            
            {selectedMeshes.length > 1 && <GroupPage objects = {selectedMeshes}/>}
          </>
        )}
      </div>
    </div>
  );
};
export default InfoWindow;
