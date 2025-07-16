import Sandbox from "./Sandbox/Sandbox";
import Login from "./Account/Login/Login";
import Register from "./Account/Register/Register";
import Verification from "./Account/Verification/Verification";
import ForgotPass from "./Account/ForgotPass";
import ResetPass from "./Account/ResetPass";
import Home from "./Home/Home";
import Projects from "./Projects/Projects";
import Help from "./Help/Help";
import Profile from "./Profile/Profile";
import About from "./About/About";
import Privacy from "./Privacy/Privacy";
import { BrowserRouter, Routes, Route } from "react-router";
/**
 *@typedef {App} - page for full project, connects all parts of project together in a central unit.
 *@returns {Component} main page of project, contains all of the windows.
 */

//THIS IS YET ANOTHER TEST TO SEE IF IT WILL UPDATE IN GITHUB

export default function App() {
  return (
    <BrowserRouter basename = "/weavel-crochet">
      <Routes>
        <Route path= "" element={<Home />} />
        <Route path= "sandbox/:info" element={<Sandbox />} />
        <Route path= "login" element={<Login />} />
        <Route path= "register" element={<Register />} />
        <Route path = "verification" element = {<Verification/>}/>
        <Route path = "forgot_pass" element = {<ForgotPass/>}/>
        <Route path = "reset_pass" element = {<ResetPass/>}/>
        <Route path= "projects" element={<Projects />} />
        <Route path = "help" element = {<Help/>}/>
        <Route path = "profile" element = {<Profile/>}/>
        <Route path = "about" element = {<About/>}/>
        <Route path = "privacy" element = {<Privacy/>}/>
      </Routes>
    </BrowserRouter>
  );
}
