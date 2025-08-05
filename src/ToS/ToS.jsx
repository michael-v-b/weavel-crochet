
import Banner from "../UI/Banner/Banner";
import Footer from "../UI/Footer/Footer";
import Intro from "./Intro";
import ToC from "./ToC";
import Sec1 from "./Sections/Sec1";
import Sec2 from "./Sections/Sec2";
import Sec3 from "./Sections/Sec3";
import Sec4 from "./Sections/Sec4";
import Sec5 from "./Sections/Sec5";
import Sec6 from "./Sections/Sec6";
import Sec7 from "./Sections/Sec7";
import Sec8 from "./Sections/Sec8";
import Sec9 from "./Sections/Sec9";
import Sec10 from "./Sections/Sec10";
import Sec11 from "./Sections/Sec11";
import Sec12 from "./Sections/Sec12";
import Sec13 from "./Sections/Sec13";
import Sec14 from "./Sections/Sec14";
import Sec15 from "./Sections/Sec15";
import Sec16 from "./Sections/Sec16";
import Sec17 from "./Sections/Sec17";
import Sec18 from "./Sections/Sec18";
import Sec19 from "./Sections/Sec19";
import Sec20 from "./Sections/Sec20";
import Sec21 from "./Sections/Sec21";
import Sec22 from "./Sections/Sec22";
import Sec23 from "./Sections/Sec23";
import Sec24 from "./Sections/Sec24";
import Sec25 from "./Sections/Sec25";
import "../Privacy/privacy.css";
import {createRef, useMemo} from 'react';

const ToS = () => {

    const sections = [
        Sec1,
        Sec2,
        Sec3,
        Sec4,
        Sec5,
        Sec6,
        Sec7,
        Sec8,
        Sec9,
        Sec10,
        Sec11,
        Sec12,
        Sec13,
        Sec14,
        Sec15,
        Sec16,
        Sec17,
        Sec18,
        Sec19,
        Sec20,
        Sec21,
        Sec22,
        Sec23,
        Sec24,
        Sec25,
    ];

    const sectionRefs = useMemo(()=>{
        return sections.map(()=>{
            return createRef();
    })},[sections]);

    console.log("sectionRefs");
    console.dir(sectionRefs);

    return <>
    <Banner/>
    <div className=  "webpage">
        <div className=  "privacy-container">
            <div className = "privacy-text">
                <Intro/>
                <ToC sectionRefs = {sectionRefs}/>
                {sections.map((Component, i ) => {
                    return <Component ref = {sectionRefs[i]} key = {i}/>
                })}
            </div>
        </div>

    </div>
        
    <Footer/>
    </>
}

export default ToS;