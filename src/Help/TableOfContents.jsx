
import {useEffect,useState,useRef} from 'react';
import {motion} from 'framer-motion';
import ToCChapter from "./ToCChapter";
import "./help.css";

/**
 * @typedef {TableOfContents} - A side bar that has short cuts to the different sections of the
 * help page.
 * @param {ToCChapter} refTree - A tree like structure that organizes the different chapters and sections.
 * @returns {HTMLComponent} - a side bar that has chapters with drop down menus with sections.
 */
const TableOfContents = ({refTree}) => {
    

    const [chapters,setChapters] = useState([]);

    
    /**
     * initialize chapters
     */
    useEffect(()=>{
        if(refTree != null) {
            setChapters(refTree.children);
        }
    },[refTree]);
    

 

    return <div className = "help-toc ">
        <div className = "toc-title">
            Table of Contents
        </div>
        {chapters?.length > 0 && chapters.map((currentNode,key)=>{
            key +=1;
            return <ToCChapter key = {key} chapter = {currentNode}/>
        })}

    </div>
}

export default TableOfContents;