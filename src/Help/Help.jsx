
import Banner from "../UI/Banner/Banner";
import TableOfContents from "./TableOfContents";
import HelpText from "./HelpText";
import "./help.css";



const Help = () => {
    //how I want it to work
    //3d sets? 
    return <>
    <Banner/>
    <div className= "help-webpage">
        <TableOfContents/>
        <HelpText/>
    </div>
    </>
}

export default Help;