import logo from "../../assets/logo.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import useGlobalStore from "../../globalStore";
import useStore from "../../Sandbox/DevTools/store";
import BannerDropdown from "./BannerDropdown";
import {useState,useEffect} from 'react';
import "./Banner.css";

const Banner = () => {
  const auth = useGlobalStore((state) => state.auth);
  const setAuth = useGlobalStore((state) => state.setAuth);
  const authData = useGlobalStore((state) => state.authData);
  const setSelectedMeshes = useStore((state) => state.setSelectedMeshes);
  const [bannerText,setBannerText] = useState("WEAVEL CROCHET DESIGNER");
  const navigate = useNavigate();

  const handleHomeClick = () => {
    setSelectedMeshes([]);
    navigate("/");
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };
  const handleLoginClick = () => {
    navigate("/login");
  };

  useEffect(()=>{

    const handleResize = () =>{
      if (window.innerWidth > 480) {
        setBannerText("WEAVEL CROCHET DESIGNER");
      } else {
        setBannerText("WEAVEL CROCHET");
      }
      
    }

    handleResize();
    window.addEventListener('resize',handleResize);

    return ()=>{window.removeEventListener('resize',handleResize);}

    
  },[])


  return (
    <div className="banner-style">
      <div className="left-container">
        <motion.img
          className="banner-image clickable"
          whileHover={{ scale: 1.05, backgroundColor: "#e6fbff" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleHomeClick}
          src={logo}
        />
        <div className="banner-text-container">
          <div className="banner-text"> {bannerText}</div>
        </div>
      </div>

      <div className="right-container">
        {!auth && (
          <>
            <motion.div
              className="banner-login clickable"
              whileHover={{ scale: 1.1, backgroundColor: "#e6fbff" }}
              whileTap={{ scale: 1 }}
              onClick={handleRegisterClick}
            >
              Sign Up{" "}
            </motion.div>
            <motion.div
              className="banner-login clickable"
              whileHover={{ scale: 1.1, backgroundColor: "#e6fbff" }}
              whileTap={{ scale: 1 }}
              onClick={handleLoginClick}
            >
              Log In{" "}
            </motion.div>
          </>
        )}
        {auth && <BannerDropdown />}
      </div>
    </div>
  );
};

export default Banner;
