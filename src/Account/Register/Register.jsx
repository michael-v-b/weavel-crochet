import "./Register.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useState } from "react";
import logo from "../../assets/logo.png";
import supabase from "../../supabase";

/**
 *@typedef {Register} - Screen users navigate to to create their accounts.
 *@returns {Component} - A web page for users to create their accounts.
 */
const Register = () => {
  const navigate = useNavigate();
  const [passOne, setPassOne] = useState("");
  const [passTwo, setPassTwo] = useState("");
  const [email, setEmail] = useState("");
  const [warningText, setWarningText] = useState("");

  /**
   *Updates the state of passOne when the respective field is changed.
   *@param {Event} event - the value in the field.
   */
  const handleChangeOne = (event) => {
    setPassOne(event.target.value);
  };

  /**
   *Updates the state of passTwo when the respective field is changed.
   *@param {Event} event - the value in the field.
   */
  const handleChangeTwo = (event) => {
    setPassTwo(event.target.value);
  };

  /**
   *Updates the state of hte email when the resepctive field is changed.
   *@param {Event} event - the value in the field.
   */
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  /**
   * Adds a profile to the "Profiles" table
   *@param {data} data - The user's data from the supabase.auth table.
   */
  const createProfile = async (data) => {
    const { error } = await supabase.from("Profiles").insert({
      email: email,
      user_id: data.user.id,
      created_at: data.user.created_at,
    });
  };

  /**
   *Triggers when clicking 'Create Account'. Will create a user if their information passes
   *regulations. Other wise displays an error message.
   */
  const handleRegisterClick = async () => {
    //ERROR MESSAGES
    if (email.length <= 0) {
      setWarningText("*Please add an email");
    } else if (!/[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]+$/.test(email)) {
      setWarningText("Please use a valid email");
    } else if (passOne.length < 6 || passTwo.length < 6) {
      setWarningText("*Password must be over 6 characters");
    } else if (passOne != passTwo) {
      setWarningText("*Both passwords must match");
    } else {
      //SUCCESS
      setWarningText("");

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: passOne,
      });
      if (error && error.message == "User already registered") {
        setWarningText("*Email already in use");
      } else if (data) {
        createProfile(data);
        navigate("/verification");
      }
    }
  };

  return (
    <div className="web-container center">
      <motion.img
        className="register-logo"
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          navigate("/");
        }}
        src={logo}
      />
      <div className="register-window ">
        <div className="register-request">Please Create Your Account </div>
        <div className="register-inputs center">
          <div className="register-field-name"> Email Address: </div>
          <motion.input
            className="register-field"
            whileHover={{ scale: 1.1, backgroundColor: "#eeeeee" }}
            type="text"
            maxLength="30"
            onChange={handleChangeEmail}
          />
          <div className="register-field-name"> Password: </div>
          <motion.input
            className="register-field"
            whileHover={{ scale: 1.1, backgroundColor: "#eeeeee" }}
            type="password"
            maxLength="30"
            onChange={handleChangeOne}
          />
          <div className="register-field-name"> Reenter Password: </div>
          <motion.input
            className="register-field"
            whileHover={{ scale: 1.1, backgroundColor: "#eeeeee" }}
            type="password"
            maxLength="30"
            onChange={handleChangeTwo}
          />

          {/*displays warning text if exists*/}
          {warningText.length > 0 && (
            <div className="warning"> {warningText}</div>
          )}
          <motion.div
            className="register-button"
            whileHover={{ scale: 1.1, backgroundColor: "#11d5e9" }}
            whileTap={{
              scale: 0.9,
              backgroundColor: "#a8f7ff",
              transition: { duration: 0.1 },
            }}
            onClick={handleRegisterClick}
          >
            Create Account
          </motion.div>
          <motion.div
            className="login"
            whileHover={{ color: "#000000", scale: 1.1 }}
            whileTap={{ color: "#888888", scale: 0.9 }}
            onClick={() => {
              navigate("/login");
            }}
          >
            {" "}
            I already have an account...
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default Register;
