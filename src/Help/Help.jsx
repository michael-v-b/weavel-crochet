
import Banner from "../UI/Banner/Banner";
import Footer from "../UI/Footer/Footer";

import HelpWordList from "./HelpWordList";
import TableOfContents from "./TableOfContents";
import HelpText from "./HelpText";
import {useState} from 'react';
import "./help.css";


/**
 * @typedef {Help} - The main functional component for the help page.
 * 
 * @returns {HTMLFragment} contains the main text area of the help page
 * as well as the table of contents.
 */
const Help = () => {

    

    const [refTree,setRefTree] = useState(null);
    
    const wordList = HelpWordList();

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
    <Footer/>
    </>
}

export default Help;