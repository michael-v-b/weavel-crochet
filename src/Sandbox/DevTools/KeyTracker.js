import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

import useStore from "./store";

/**
 *@typedef {Object} KeyTracker - keeps track of which keys are pressed throughout entire project
 */
const KeyTracker = forwardRef(({ ...props }, ref) => {
  KeyTracker.displayName = "KeyTracker";
  const keysPressed = useStore((state) => state.keysPressed);
  const setKeysPressed = useStore((state) => state.setKeysPressed);

  /**
   * Updates Callback function on key down,
   * Disables event listener to avoid many calls.
   *@param {Event} - used to get key code from keydown event.
   */
  const handleKeyDown = (event) => {
    const newKey = event.code;
    setKeysPressed((prevKeys) => {
      if (!prevKeys.includes(newKey)) {
        return [...prevKeys, newKey];
      }
      return prevKeys;
    });
  };

  /**
   *Clears callback function on key up.
   *Readds 'keydown' event listener.
   */
  const handleKeyUp = (event) => {
    
    const newKey = event.code;
    setKeysPressed((prevKeys)=>{
      return prevKeys.filter((key) => key != newKey);
    })
      //setKeysPressed([...tempKeysPressed]);
  
  };

  useEffect(()=>{
    console.log("keysPressed real: " + keysPressed)
  },[keysPressed]);
  /*
   *adds key listener that triggers key up and down methods on mount and unmount.
   */
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  },[]);
});

export default KeyTracker;
