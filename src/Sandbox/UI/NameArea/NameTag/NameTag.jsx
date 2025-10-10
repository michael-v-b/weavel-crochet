import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router";
import useGlobalStore from "../../../../globalStore";
import useStore from "../../../DevTools/store";
import supabase from "../../../../supabase";
import "../NameTag.css";

/**
 * @typedef {NameTag} Lists the name of the project
 */
const NameTag = () => {
  const [projectName, setName] = useState("New Project");
  const projectId = useStore((state) => state.projectId);
  const authData = useGlobalStore((state) => state.authData);
  const setFocused = useStore((state) => state.setFocused);
  const setNameLoading = useStore((state) => state.setNameLoading);
  const setProjectName = useStore((state) => state.setProjectName);
  const location = useLocation();

  const handleName = async () => {
    const { data, error } = await supabase
      .from("Projects")
      .select("project_name")
      .eq("project_id", projectId);
    if (data && data.length > 0) {
      setName(data[0].project_name);
      setProjectName(data[0].project_name);
    }
    setNameLoading(false);
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };
  const handleFocused = () => {
    setFocused(true);
  };
  const handleBlur = async () => {
    setFocused(false);
    const tempName = projectName.length == 0 ? "New Project" : projectName;
    const { error } = await supabase
      .from("Projects")
      .update({ project_name: tempName })
      .eq("user_id", authData.user.id)
      .eq("project_id", projectId);
    setName(tempName);
    setProjectName(tempName);
  };

  useEffect(() => {
    handleName();
  }, [projectId]);

  return (
    <input
      className="name-tag"
      type="text"
      minLength="1"
      maxLength="30"
      value={projectName}
      onChange={handleChange}
      onFocus={handleFocused}
      onBlur={handleBlur}
    />
  );
};

export default NameTag;
