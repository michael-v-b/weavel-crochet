
import "./help.css";
import {motion} from 'framer-motion';
import {useState,useRef} from 'react';


const ToCChapter = ({chapter}) =>{
    const text = chapter?.text;
    const sections = chapter.children;
    const NUM_SECTIONS = sections.length;
    const SECTION_HEIGHT = 3.5;

    const clickedPlus = useRef(false);


    const [dropdownHeight,setDropdownHeight] = useState(0);
    const [isDroppedText,setDroppedText] = useState('[+]');

    const handleDropdown = () => {
        if (dropdownHeight == 0) {
            setDropdownHeight(NUM_SECTIONS*SECTION_HEIGHT);
            setDroppedText('[-]');
        } else {
            setDropdownHeight(0);
            setDroppedText('[+]');
        }
    }
    
    return <>
        <motion.div className = 'toc-chapter' 
        whileHover = {{backgroundColor:'#cff0ff'}}
        whileTap = {{backgroundColor: '#b0e0e8'}}
        onTap= {()=>{
                if(clickedPlus.current) {
                    clickedPlus.current = false;
                } else {
                    chapter?.reference?.current.scrollIntoView({behavior:'smooth'});
                }
            }}> 
            {NUM_SECTIONS > 0 && 
            <motion.div 
            whileHover = {{scale:1.2}} 
            style = {{paddingRight:".5vw"}}
            onTap={() => {
                clickedPlus.current = true;
                handleDropdown()
            }}>
                {isDroppedText}
            </motion.div>}
            {text}
        
        </motion.div>

        <motion.div style = {{height: dropdownHeight + 'vh'}} className = 'toc-dropdown'>
            {sections.map((section,key) => {
                const sectionTitle=  section.text;
                key+=1;
                return <motion.div key = {key}
                className = "toc-dropdown-section"
                whileHover = {{backgroundColor:'#b8dbed'}}
                whileTap = {{backgroundColor:'#b0e0e8',scale:1.1}}
                onTap = {()=>{
                    section.reference.current.scrollIntoView({behavior:'smooth'});
                }}>
                    {sectionTitle}

                </motion.div>
            })}
        </motion.div>
    </>
}

export default ToCChapter;