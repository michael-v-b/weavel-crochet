
import "./Footer.css";
import logo from "../../assets/logo.png";
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router';

/**
 * 
 * @returns Footer at the end of the page with information
 */

/**
 * 
 * @returns Vertical line to be used to seperate elements in footer.
 */
   const VLine = () => {
        return <div style = {{height:'10vh',
            width:'0.01vw',
            backgroundColor:'rgb(176, 227, 229)'}}/>
    }

    /**
     * 
     * @param {DOMElement} children - the text that is inside the footer.
     * @param {string} link - the webpage the footer links to.
     */
    const FooterOption = ({children,onClick}) => {
        return <>
            <motion.div className ="footer-text clickable"
                whileHover = {{scale:1.1, color:"rgb(235, 248, 255)"}} 
                whileTap ={{scale:0.9}}
                onClick = {()=>{
                    onClick();
                }}>
                {children}
            </motion.div>
        </>
    }

/*
    Things to include in the footer
    -About us
    -Contact us
    -Feedback
    -Donate
    -Create ACcount
    -social media
        -facebook
        -instagram
        -tiktok
        -twitter

    
    -Resources
        -Help
        -How to crochet
    -Terms of Service
    -Privacy Policy
    
    
    */

const Footer = () => {

    const navigate = useNavigate();

    return <>
        <div className = "footer-container">
            <div className = "footer-logo-container">
                <motion.img 
                whileHover = {{scale:1.1}} 
                whileTap = {{scale:0.9}}
                src = {logo} 
                className = "footer-logo clickable"/>
                <div className = "footer-text footer-alt-color" > Follow Us: </div>
                <div> Socials </div>
            </div>
            <div className= "footer-link-container">
                <div className = "footer-top">
                        <FooterOption onClick = {()=>{navigate('/about')}}>
                            About Weavel
                        </FooterOption> 
                        <VLine/>
                        <FooterOption onClick = {()=>{
                            console.log("this will link to the Ko-Fi account");
                        }}>
                            Want to donate?
                        </FooterOption>
                        <VLine/>
                        <FooterOption onClick = {()=>{navigate('/help')}}>
                            Help
                        </FooterOption>
                        <VLine/>
                        <FooterOption onClick = {()=>{
                            console.log("this will link to a google form")}}> Give us feedback!</FooterOption>
                        <VLine/>
                        <div>
                            <div className = "footer-text" > Contact us at: </div>
                            <div className = 'footer-email'>weavelcrochet@gmail.com</div>
                        </div>
                </div>
                {/*line but hr has a border*/}
                <div style = {{height:'0.01vh',width:'80vw',backgroundColor:'rgb(176, 226, 229)'}}/>
                <div className = "footer-bottom">
                    <div className = "footer-text footer-text-bottom" >Privacy Policy</div>
                    <div className = "footer-text footer-text-bottom" >Terms of Service</div>
                    <div className = "footer-text footer-text-bottom" >Weavel Crochet</div>
                </div>
            </div>
        </div>
    </>
}

export default Footer;