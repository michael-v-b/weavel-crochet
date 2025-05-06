import logo from "../assets/logo.png";
import {useNavigate} from "react-router";
import {motion} from "framer-motion";

const HomeIcon = () => {

    const navigate = useNavigate();
    return <motion.img
        className="login-logo"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={()=>{
            navigate("/");
        }}
        src={logo}
      />
    
}

export default HomeIcon;