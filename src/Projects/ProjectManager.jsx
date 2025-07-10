import  { forwardRef, useImperativeHandle } from "react";
import useGlobalStore from "../globalStore";
import supabase from "../supabase";

/**
 *@typedef {ProjectManager} - Handles interactions with supabase that involve the Projects
 *table or bucket.
 */
const ProjectManager = forwardRef((_, ref) => {
  ProjectManager.displayName = "ProjectManager";
  const authData = useGlobalStore((state) => state.authData);

  /**
   *Adds a value to a user's num_of_projects column in their row in the "Profiles" table.
   *@param {Number} incrementNum - The value being added to num_of_projects.
   */
  const addNumOfProjects = async (incrementNum) => {
    const { data: selectData, error: selectError } = await supabase
      .from("Profiles")
      .select("num_of_projects");

    const new_num_of_projects = Math.max(
      0,
      selectData[0].num_of_projects + incrementNum
    );
    
    if (selectError) {
      console.log("selectError: " + selectError);
    }

    const { error: updateError } = await supabase
      .from("Profiles")
      .update({ num_of_projects: new_num_of_projects })
      .eq("user_id", authData.user.id);

      if(updateError) {
        console.log("updateError: " + updateError);
      }
  };

  /**
   *Creates a project in the "Projects" table and in the bucket?
   *@param {string} name - name of the project.
   *@param {string} id - value for project_id.
   */
  const createProject = async (name, id) => {
    /** default project entry
     * { projectName: name, colorList: ["#ff0000"], meshes: {} }
     */
    const jsonData = {
      colorList: ["#ff0000"],
      meshes: {},
      cameraPosition: [0,0,5],
      cameraRotation: [0,0,0],
      
    };

    const jsonBlob = new Blob([JSON.stringify(jsonData)], {
      type: "application/json",
    });

    const path = "" + authData.user.id + "/" + id + "/data.json";
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("Project Files")
      .upload(path, jsonBlob);

    const { error: insertError } = await supabase.from("Projects").insert([
      {
        project_name: name,
        user_id: authData.user.id,
        project_id: id,
        project_url: path,
      },
    ]);



    if (!insertError) {
      addNumOfProjects(1);
    }
    const output = [name, id];
    return output;
  };

  /**
   *Removes a project from the "Projects" table in Supabase.
   *@param {string} project_id - the id of the project ot be removed.
   */
  const removeProject = async (project_id) => {
    addNumOfProjects(-1);

    const { error: _deleteError } = await supabase
      .from("Projects")
      .delete()
      .eq("project_id", project_id);

    const path = "" + authData.user.id + "/" + project_id + "/data.json";
    const { _data, _error } = await supabase.storage
      .from("Project Files")
      .remove([path]);
  };

  useImperativeHandle(ref, () => ({ createProject, removeProject }));
});

export default ProjectManager;
