import Banner from "../UI/Banner/Banner";
import { useEffect, useState, useRef } from "react";
import useGlobalStore from "../globalStore";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import supabase from "../supabase";
import ProjectManager from "./ProjectManager";
import AuthTester from "../AuthTester";
import "./Projects.css";

const Projects = () => {
  const auth = useGlobalStore((state) => state.auth);
  const [projectNames, setProjectNames] = useState([]);
  const [canRemove, setRemove] = useState(false);
  const removeButtonRef = useRef(null);
  const plusButtonRef = useRef(null);
  const navigate = useNavigate();
  const projectManagerRef = useRef(null);
  const clickedX = useRef(false);

  useEffect(() => {
      getProjects();
    

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  /**
   * Creates projects based on user's supabase.
   */
  const getProjects = async () => {
    const { data, _error } = await supabase.from("Projects").select("*");

    const tempNames = [];
    for (let i = 0; i < data.length; i++) {
      tempNames.push([data[i].project_name, data[i].project_id]);
    }
    setProjectNames([...tempNames]);
  };

  /**
   *Happens every time user clicks mouse.
   *@param {Event} event - Determines mouse location.
   */
  const handleClick = (event) => {
    if (clickedX.current) {
      clickedX.current = false;
      return;
    }

    if (
      removeButtonRef.current &&
      !removeButtonRef.current.contains(event.target) &&
      plusButtonRef.current &&
      !plusButtonRef.current.contains(event.target)
    ) {
      setRemove(false);
    }
  };

  /**
   *Creates project if user is under 3 projects.
   */
  const handleCreateProject = () => {
    if (projectNames.length < 3) {
      const name = "New Project";
      const id = crypto.randomUUID();

      projectManagerRef.current.createProject(name, id);

      setProjectNames([...projectNames, [name, id]]);
    }
  };

  /**
   * Removes the project through the ProjectManager
   */
  const handleRemoveProject = (project_id) => {
    for (let i = 0; i < projectNames.length; i++) {
      if (projectNames[i][1] == project_id) {
        projectNames.splice(i, 1);
        break;
      }
    }
    setProjectNames([...projectNames]);
    projectManagerRef.current.removeProject(project_id);
  };

  return (
    <div className="projects-web-container">
      <ProjectManager ref={projectManagerRef} />
      <Banner />
      <AuthTester reroute = {"/login"}/>
      <div className="projects-container">
        <div className="projects-title-bar">
          <div className="projects-title">Your Projects</div>
          <motion.div
            ref={removeButtonRef}
            className="remove-projects-button"
            style={{ backgroundColor: canRemove ? "#a5cff5" : "#FFFFFF" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              clickedX.current = true;
              setRemove(!canRemove);
            }}
          >
            {" "}
            Remove Project{" "}
          </motion.div>
        </div>
        <div className="projects-sub-container">
          {projectNames.map((valuePair, key) => {
            const project_name = valuePair[0];
            const project_id = valuePair[1];
            return (
              <div className="project-container" key={key}>
                {canRemove && (
                  <div className="remove-project-container">
                    <motion.div
                      whileHover={{ scale: 1.1, backgroundColor: "#ffbbbb" }}
                      whileTap={{ scale: 0.9, backgroundColor: "#FF9999" }}
                      onClick={() => {
                        clickedX.current = true;
                        handleRemoveProject(project_id);
                      }}
                      className="remove-project"
                    >
                      X
                    </motion.div>
                  </div>
                )}

                <motion.div
                  whileHover={
                    canRemove ? {} : { scale: 1.1, backgroundColor: "#ecfbff" }
                  }
                  whileTap={
                    canRemove ? {} : { scale: 0.9, backgroundColor: "#FFFFFF" }
                  }
                  animate={
                    canRemove ? { rotate: [0, -2, 2, -2, 2] } : { rotate: [0] }
                  }
                  transition={
                    canRemove
                      ? {
                          repeat: Infinity,
                          repeatType: "loop",
                          duration: 0.5,
                        }
                      : {}
                  }
                  className="project"
                  onClick={() => {
                    if (!canRemove) {
                      navigate("/sandbox/" + project_id);
                    }
                  }}
                >
                  <div className="project-image" />
                  <div className="project-title"> {project_name} </div>
                </motion.div>
              </div>
            );
          })}

          <div className="project-button-container">
            <motion.div
              ref={plusButtonRef}
              whileHover={{ scale: 1.1, backgroundColor: "#ecfbff" }}
              whileTap={{ scale: 0.9, backgroundColor: "#FFFFFF" }}
              onClick={handleCreateProject}
              className="add-project-button"
            >
              {" "}
              +{" "}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
