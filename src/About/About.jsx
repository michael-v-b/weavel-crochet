import Banner from "../UI/Banner/Banner";
import Footer from "../UI/Footer/Footer";
import {useEffect,useState} from 'react';
import './about.css';

const Greeting = ({children,onPhone}) => {
    return <>
    {onPhone && <div className = 'about-greeting'> {children}</div>}
    {!onPhone && <span className = 'about-greeting'>{children}</span>}
    </>
}
const About = () => {
    const [onPhone,setOnPhone] = useState(false);
    
    useEffect(()=>{
        const handleResize = () => {
            if (window.innerWidth >480) {
                setOnPhone(false);
            } else {
                setOnPhone(true);
            }
        }

        window.addEventListener('resize',handleResize);
        return ()=>{
            window.removeEventListener('resize',handleResize);
        }
    },[]);

    useEffect(()=>{
        console.log("onPhone: " + onPhone);
    },[onPhone])
    
    return <>
        <Banner/>
        <div className= "about-webpage">
            <div className = "about-text-container">
            <div className = "about-top-text">     
                <div className = "about-image"></div>
                <div className = "about-text">
                    <Greeting onPhone = {onPhone}>Hi! I'm Michael...</Greeting> and I'm very passionate about crochet, specifically amigurumi, and the creativity it inspires.
                    There's something extremely satisfying about bringing something to life with your own two hands. However, designing your
                    own patterns can take a lot of time and effort, not to mention the trial and error. 
                    There's nothing more painful than being on round 24 before realizing your doll's head is way to big for its body.
                </div>
            </div>
                <div className = "about-text about-bottom-text">
                    <Greeting onPhone = {onPhone}>That's why I created Weavel...</Greeting> Weavel is a user-friendly 3D design software focused on basic shapes, allowing
                    you to quickly and easily visualize and create your own crochet designs, so you can spend less time guessing, and more time stitching!
                </div>
            </div>
        </div>
        <Footer/>
    </>
}

export default About;