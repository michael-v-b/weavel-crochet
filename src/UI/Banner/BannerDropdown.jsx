import supabase from "../../supabase";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import useStore from "../../Sandbox/DevTools/store";
import useGlobalStore from "../../globalStore";
import "./BannerDropdown.css";

const BannerDropdown = () => {
  const authData = useGlobalStore((state) => state.authData);
  const setAuth = useGlobalStore((state) => state.setAuth);
  const setSelectedMeshes = useStore((state) => state.setSelectedMeshes);
  const [dropped, setDropped] = useState(false);
  const [optionHeight,setOptionHeight] = useState(3);
  const [dropdownHeight, setDropdownHeight] = useState("0%");

  const navigate = useNavigate();
  const DROPDOWN_SELECT_COLOR = "#dddddd";
  const OPTIONS = 6;

  useEffect(() => {
    if (dropped) {
      setDropdownHeight(optionHeight * OPTIONS + "vh");
    } else {
      setDropdownHeight("0%");
    }
  }, [dropped,optionHeight]);

  //resize dropdown if in portrait
  useEffect(()=>{
    const handleResize = () => {
      if(window.innerHeight < 480) {
        setOptionHeight(6);
      } else {
        setOptionHeight(3);
      }
    }
    handleResize();
    window.addEventListener('resize',handleResize);
    return () => {
      window.removeEventListener('resize',handleResize);
    }
  },[]);

  const signOut = async () => {
    const { data, error } = await supabase.auth.signOut();
    if (!error) {
      setAuth(false);
      navigate("/");
    }
  };

  return (
    <div className="profile-container">
      <motion.div
        whileHover={{ backgroundColor: "#defaff" }}
        className="banner-profile clickable"
        onClick={() => {
          setDropped(!dropped);
        }}
      >
        {"[PUT PFP HERE]"}
      </motion.div>

      <div
        className="profile-dropdown"
        style={{
          borderStyle: dropped ? "solid" : "none",
          height: dropdownHeight,
        }}
      >
        <motion.div
          className="profile-dropdown-option clickable"
          whileHover={{ backgroundColor: DROPDOWN_SELECT_COLOR }}
          onClick={() => {
            navigate("/");
            setSelectedMeshes([]);
          }}
        >
          Home
        </motion.div>
           <motion.div
          className="profile-dropdown-option clickable"
          whileHover={{ backgroundColor: DROPDOWN_SELECT_COLOR }}
          onClick={() => {
            navigate("/profile");
            setSelectedMeshes([]);
          }}
        >
          Profile
        </motion.div>
        <motion.div
          className="profile-dropdown-option clickable"
          whileHover={{ backgroundColor: DROPDOWN_SELECT_COLOR }}
          onClick={() => {
            navigate("/projects");
            setSelectedMeshes([]);
          }}
        >
          Your Projects{" "}
        </motion.div>
        <motion.div
          className="profile-dropdown-option clickable"
          whileHover={{ backgroundColor: DROPDOWN_SELECT_COLOR }}
          onClick={() => {
            navigate("/help");
            setSelectedMeshes([]);
          }}
        >
          Help
        </motion.div>
        <motion.div
          className="profile-dropdown-option clickable"
          whileHover={{ backgroundColor: DROPDOWN_SELECT_COLOR }}
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </motion.div>       
        <motion.div
          className="profile-dropdown-option"
        >
          logged in as {authData.user.email}
        </motion.div>
      </div>
    </div>
  );
};
export default BannerDropdown;
