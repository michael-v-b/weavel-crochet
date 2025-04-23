

import {useRef,useEffect} from 'react';
import {ToCNode} from './ToCNode';

import "./help.css";

const HelpText = ({wordList,getRefTree}) => {

  
    const rootNode = new ToCNode("",null);

    
    useEffect(()=>{
        getRefTree(rootNode);
    },[])
    return  <div className = "help-text-container">
        <div className = "help-title">
            Weavel Help Page
        </div>

        {wordList.map((value,key)=>{
            const category = value.substring(0,3);
            const text = value.substring(4);
            let textClass = "";
            const divRef = useRef(null);

            if(category == "$c$") {
                textClass = "help-chapter";
                rootNode.addChild(new ToCNode(text,divRef));
            } else if (category == "$s$") {
                //add section to chapter
                const childIndex = rootNode.children.length-1;
                rootNode.children[childIndex].addChild(new ToCNode(text,divRef));

                textClass = "help-section";
            } else if (category == "$b$") {
                textClass = "help-body";
            }
            key+=1;
            return <div ref = {divRef} key = {key} className = {textClass}> {text} </div>
        })}

    </div>
}

export default HelpText;