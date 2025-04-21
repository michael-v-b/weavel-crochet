import Sandbox from "./Sandbox/Sandbox";
import Login from "./Account/Login/Login";
import Register from "./Account/Register/Register";
import Home from "./Home/Home";
import Projects from "./Projects/Projects";
import { BrowserRouter, Routes, Route } from "react-router-dom";
/**
 *@typedef {App} - page for full project, connects all parts of project together in a central unit.
 *@returns {Component} main page of project, contains all of the windows.
 */

//THIS IS YET ANOTHER TEST TO SEE IF IT WILL UPDATE IN GITHUB

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/sandbox/:info" element={<Sandbox />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  );
}
