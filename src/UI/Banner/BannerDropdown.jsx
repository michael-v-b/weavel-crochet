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
  const [dropdownHeight, setDropdownHeight] = useState("0%");
  const navigate = useNavigate();
  const DROPDOWN_SELECT_COLOR = "#dddddd";
  const OPTIONS = 5;

  useEffect(() => {
    if (dropped) {
      setDropdownHeight(3 * OPTIONS + "vh");
    } else {
      setDropdownHeight("0%");
    }
  }, [dropped]);

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
        className="banner-profile"
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
          className="profile-dropdown-option"
          whileHover={{ backgroundColor: DROPDOWN_SELECT_COLOR }}
          onClick={() => {
            navigate("/");
            setSelectedMeshes([]);
          }}
        >
          Home
        </motion.div>
        <motion.div
          className="profile-dropdown-option"
          whileHover={{ backgroundColor: DROPDOWN_SELECT_COLOR }}
          onClick={() => {
            navigate("/projects");
            setSelectedMeshes([]);
          }}
        >
          Your Projects{" "}
        </motion.div>
        <motion.div
          className="profile-dropdown-option"
          whileHover={{ backgroundColor: DROPDOWN_SELECT_COLOR }}
          onClick={() => {
            navigate("/help");
            setSelectedMeshes([]);
          }}
        >
          Help
        </motion.div>
        <motion.div
          className="profile-dropdown-option"
          whileHover={{ backgroundColor: DROPDOWN_SELECT_COLOR }}
          onClick={() => {
            signOut();
          }}
        >
          Sign Out
        </motion.div>        <motion.div
          className="profile-dropdown-option"
        >
          logged in as {authData.user.email}
        </motion.div>
      </div>
    </div>
  );
};
export default BannerDropdown;
