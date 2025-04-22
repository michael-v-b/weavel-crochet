

import {useRef} from 'react';
import Body from "./Body";
import Header from "./Header";
import "./help.css";

const HelpText = () => {

    const testRef = useRef(null);

    console.log("testing ref location");
    console.dir(testRef);
    return  <div className = "help-text-container">
    <div ref = {testRef} className = "help-title">
        Weavel Help Page
    </div>

    <Header>
        What is Weavel?
    </Header>
    <Body>
        Weavel is a simple, user-friendly, 3D modeling software designed to help crocheters make their own custom amigurumi crochet patterns. 
        This web-page serves as a guide to help you, step-by-step, throughout the process of creating your own custom design using Weavel.
        If there is a specific section you are confused about, use the Table of Contents to the left to be taken down to that seciton of the page.
    </Body>

    <Header>
        Getting Started
    </Header>
</div>
}

export default HelpText;