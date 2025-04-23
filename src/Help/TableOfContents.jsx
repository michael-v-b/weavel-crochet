
import {useEffect,useState} from 'react';
import {motion} from 'framer-motion';
import ToCChapter from "./ToCChapter";
import "./help.css";
const TableOfContents = ({refTree}) => {
    

    const [chapters,setChapters] = useState([]);
    
    useEffect(()=>{
        if(refTree != null) {
            setChapters(refTree.children);
        }
    },[refTree]);
    

    return <div className = "help-toc">

        {chapters?.length > 0 && chapters.map((currentNode,key)=>{
            key +=1;
            return <ToCChapter key = {key} chapter = {currentNode}/>
         
        })}

    </div>
}

export default TableOfContents;