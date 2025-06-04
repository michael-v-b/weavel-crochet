
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
    
    
  
    const [onPhone,setPhone] = useState(window.innerWidth <= 480);

    useEffect(()=>{
        const handleResize = () => {
            setPhone(window.innerWidth<=480);
        }

        handleResize();
        window.addEventListener("resize",handleResize);

        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
    });
    
    const [open,setOpen] = useState(!onPhone);
    const [chapters,setChapters] = useState([]);

    
    /**
     * initialize chapters
     */
    useEffect(()=>{
        if(refTree != null) {
            setChapters(refTree.children);
        }
    },[refTree]);
    

 
    return  <>


    <motion.div className = "toc-container">

        {onPhone && <motion.div 
        whileTap = {{backgroundColor:"#eee"}}
                style = {{height:open ? "100vh" : "70vw", marginTop:open ? "0vh" : "15vh",
            transition: "0.5s"
        }}
        onClick = {()=>{
            setOpen(!open);
        }}
        className = "toc-sidebar">
        {!open ? ">" : "<"}   
        </motion.div>}


        <motion.div

        style = {onPhone && {width:open ? "90vw" : "0vw",
            transition: "0.5s"
        }}

        className = "help-toc ">
                <div className = "toc-title">
                    Table of Contents
                </div>
                {chapters?.length > 0 && chapters.map((currentNode,key)=>{
                    key +=1;
                    return <ToCChapter key = {key} chapter = {currentNode} setOpen = {setOpen}/>
                })}

        </motion.div>
    </motion.div>
    </>
}

export default TableOfContents;