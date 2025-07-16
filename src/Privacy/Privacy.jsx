import Intro from "./Intro";
import PrivacyTOC from "./PrivacyTOC";
import Sec1 from "./Sections/Sec1";
import Sec2 from "./Sections/Sec2";
import Sec3 from "./Sections/Sec3";
import Sec4 from "./Sections/Sec4";
import Sec5 from "./Sections/Sec5";

const Privacy = () => {

    return <div>
        <div className=  "privacy-text">
            <Intro/>
            <PrivacyTOC/>
            <Sec1/>
            <Sec2/>
            <Sec3/>
            <Sec4/>
            <Sec5/>
        </div>
    </div>
}

export default Privacy;