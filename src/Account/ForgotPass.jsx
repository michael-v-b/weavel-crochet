import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useState } from "react";
import supabase from "../supabase";

const ForgotPass = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const sendEmail = async () => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://michael-v-b.github.io/weavel-crochet/reset_pass",
    });

    navigate("/verification");
  };

  return (
    <div className="web-container center">
      <div className="register-window" style={{ height: "50vh" }}>
        <div className="register-request">Reset Your Password</div>
        <div className="register-inputs-container center">
          <div className="register-field-name" style={{ marginTop: "5vh" }}>
            Email Address
          </div>
          <motion.input
            className="register-field"
            whileHover={{ scale: 1.1, backgroundColor: "#eeeeee" }}
            type="text"
            maxLength="30"
            onChange={handleChange}
          />
        </div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="register-button"
          style={{ fontSize: "3vh", width: "10vh" }}
          onClick={sendEmail}
        >
          Send
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1, color: "#000" }}
          whileTap={{ scale: 0.9, color: "#888" }}
          onClick={() => {
            navigate("/login");
          }}
          className="login center"
          style={{ marginTop: "1vh" }}
        >
          I remember my password...
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPass;
