import "./Login.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useState } from "react";
import logo from "../../assets/logo.png";
import supabase from "../../supabase";
import useGlobalStore from "../../globalStore";

/**
 * @typedef {Login} - The screen users are taken to when logging in.
 * @returns {Component} - A web page that users can use to log in to their accounts.
 */
const Login = () => {
  const navigate = useNavigate();
  const setAuth = useGlobalStore((state) => state.setAuth);
  const setAuthData = useGlobalStore((state) => state.setAuthData);
  const [warning, setWarning] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   *Updates email state when respective field is filled out.
   *@param {Event} event - The value in the field.
   */
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  /**
   *Updates Password state when respective field is filled out.
   *@param {Event} event - The value in the field.
   */
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  /**
   * When logo is clicked on, it will lead back to the home page.
   */
  const handleHomeClick = () => {
    navigate("/");
  };
  /**
   * When the 'I don't have an account' text is clicked on, it will lead to the
   * registration page.
   */
  const handleRegisterClick = () => {
    navigate("/register");
  };

  /**
   *When the 'Log in' button is clicked, it logs in the person if that email and password exist,
   * other wise it puts up an error.
   */
  const handleLoginClick = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (!error) {
      setAuthData(data);
      setAuth(data.user.aud);
      navigate("/projects");
    } else if (email == "") {
      setWarning("*Missing email address");
    } else if (password == "") {
      setWarning("*Missing password");
    } else {
      setWarning("*Incorrect email or password");
    }
  };

  return (
    <div className="web-container center">
      <motion.img
        className="login-logo"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleHomeClick}
        src={logo}
      />
      <div className="login-window ">
        <div className="login-request">Please Log In </div>
        <div className="login-inputs center">
          <div className="login-field-name"> Email Address: </div>
          <motion.input
            className="login-field"
            whileHover={{ scale: 1.1, backgroundColor: "#eeeeee" }}
            type="text"
            maxLength="30"
            onChange={handleEmailChange}
          />
          <div className="login-field-name"> Password: </div>
          <motion.input
            className="login-field"
            whileHover={{ scale: 1.1, backgroundColor: "#eeeeee" }}
            type="password"
            maxLength="30"
            onChange={handlePasswordChange}
          />
          {/*warning only renders after failed attempt*/}
          <div className="warning-message">{warning} </div>
          <div className="login-button-container">
            <motion.div
              className="login-button"
              whileHover={{ scale: 1.1, backgroundColor: "#11d5e9" }}
              whileTap={{
                scale: 0.9,
                backgroundColor: "#a8f7ff",
                transition: { duration: 0.1 },
              }}
              onClick={handleLoginClick}
            >
              Log In{" "}
            </motion.div>
          </div>
          <motion.div
            className="register"
            whileHover={{ color: "#000000", scale: 1.1 }}
            whileTap={{ color: "#888888", scale: 0.9 }}
            onClick={handleRegisterClick}
          >
            {" "}
            I do not have an account...
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default Login;
