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
  const KeyTracker.displayName = "KeyTracker";
  const keysPressed = useStore((state) => state.keysPressed);
  const setKeysPressed = useStore((state) => state.setKeysPressed);

  /**
   * Updates Callback function on key down,
   * Disables event listener to avoid many calls.
   *@param {Event} - used to get key code from keydown event.
   */
  const handleKeyDown = (event) => {
    const newKey = event.code;
    if (!keysPressed.includes(newKey)) {
      setKeysPressed([...keysPressed, newKey]);
    }
  };

  /**
   *Clears callback function on key up.
   *Readds 'keydown' event listener.
   */
  const handleKeyUp = (event) => {
    const newKey = event.code;
    const keyIndex = keysPressed.indexOf(newKey);
    if (keyIndex != -1) {
      keysPressed.splice(keyIndex, 1);
      setKeysPressed([...keysPressed]);
    }
    window.addEventListener("keydown", handleKeyDown);
  };

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
