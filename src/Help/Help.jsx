
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
        section of the page.`,

        `$c$ Getting Started`,
        `$b$ Before you can get started with Weavel, you will have to create an account. Simply click \"Sign Up\" in top-right corner of the screen and create your account.
        After you've finished verify your email and log in using the \"Log in\" button in the top-right corner of the screen.`,

        '$c$ Projects',

        '$s$ Creating a Project',
        `$b$ After you have logged in, it\'s time for you to create a project. Open the drop down menu in the top-right hand corner 
        and click \"Your Projects\". You should now be seeing a list of all your projects. In order to create a new project, click on the \"+\" button.
        A new project should have appeared in the menu. Now click on it to open.`,
        `$b$ Keep in mind that you will only be allowed to have 3 projects at a time.`,

        `$s$ Deleting a Project`,
        `$b$ To delete your project, click on \"Remove Project\" in the \"My Projects\" Dashboard. This will make a small \"x\" button 
        appear in the top-right corner of each project, and make them shake. Click on the \"x\" button to delete a project.`,

        `$s$ Renaming your Project`,
        `$b$ In order to rename your project, you must first open it. Click on the text box directly under the Banner to change the name
        of your project. The project's name will have a maximum of 30 characters and will be renamed to \"New Project\" if left
        blank.`,

        '$c$ Canvas',

        `$b$ The Canvas is the central screen where you will be able to see your model and all the objects that make it up. 
        You can click on an object in order to select it and clock on it a second time to deselect. Holding shift will allow you to
        select multiple objects at once.`,



        `$c$ Modes`,

        `$b$ In order to perform any action, your project must be in the correct mode. You can change your modes using the Mode Bar 
        on the top of your project. In order to leave any mode, you can either select a different mode, or click on your selected
         mode a second time. Depending on which mode you have selected, it will change which options you have available in the Tool
         Window in the top-left section of your project.`,

        `$s$ Camera`,
        `$b$ In order to move the camera and get a different perspective on your creation, you have to enable Camera Mode.
        left-click to move the camera around a point and right-click to pan the camera. To zoom scroll the mouse wheel, 
        up to zoom-in and down to zoom-out.
        While in this mode you will be unable to select or deselect objects.`,

        `$s$ Tool`,
        `$b$ This mode is used to select the various tools for transforming any selected object. If you need to change the position
        or rotation of an object you must first select this mode. We will get further into depth with Translation and Rotation in the 
        Transformations section`,

        `$s$ Add Shape`,
        `$b$ While in this mode, you will be able to see the large variety of shapes that you are able to add into your project.
        Simply press the button to add the shape into the center of your world. You can learn more about the different shapes and
        their uses in the shapes section`,
        
        `$c$ Shapes`,

        '$c$ Transformations',

        '$s$ Translation',

        '$s$ Rotation',

        



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