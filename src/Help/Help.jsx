
import Banner from "../UI/Banner/Banner";
import TableOfContents from "./TableOfContents";
import HelpText from "./HelpText";
import {useState} from 'react';
import "./help.css";



const Help = () => {
    //how I want it to work
    //3d sets? 
    const wordList = [
        `$c$ About Weavel`,
        `$b$ Weavel is a simple, user-friendly, 3D modeling software designed to help crocheters make their own custom amigurumi 
        crochet patterns. 
        This web-page serves as a guide to help you, step-by-step, throughout the process of creating your own custom design using
         Weavel.
        If there is a specific section you are confused about, use the Table of Contents to the left to be taken down to that 
        seciton of the page.`,
        `$c$ Getting Started`,
        `$b$ Before you can get started with Weavel, you will have to create an account. Simply click \"Sign Up\" in top-right corner of the screen and create your account.
        After you've finished verify your email and log in using the \"Log in\" button in the top-right corner of the screen.`,
        '$c$ Projects',
        '$s$ Creating a Project',
    ];

    const [refTree,setRefTree] = useState(null);

    const handleRefTree = (tempRefTree) => {
        if(refTree == null) {
            setRefTree(tempRefTree);
        }
    }
    return <>
    <Banner/>
    <div className= "help-webpage">
        <TableOfContents refTree = {refTree} />
        <HelpText wordList = {wordList} getRefTree = {handleRefTree} />
    </div>
    </>
}

export default Help;