import Banner from "../UI/Banner/Banner";
import Footer from "../UI/Footer/Footer";
import './about.css';

const About = () => {
    return <>
        <Banner/>
        <div className= "about-webpage">
            <div className = "about-text-container">
            <div className = "about-top-text">     
                <div className = "about-image"></div>
                <div className = "about-text">
                    <div className = "about-greeting">Hi! I'm Michael...</div> ...and I'm very passionate about crochet, specifically amigurumi, and the creativity it inspires.
                    It's extremely satisfying then bringing your creations to life with your own two hands. However, designing your
                    own patterns can take a lot of time and effort, not to mention the trial and error. 
                    There's nothing more painful than being on round 24 before realizing your doll's head is way to big for its body.
                </div>
            </div>
                <div className = "about-text about-bottom-text">
                    That's why I created Weavel. Weavel is a user-friendly 3D design software focused on basic shapes, allowing
                    you to quickly and easily visualize and create your own crochet designs, so you can spend less time guessing, and more time stitching!
                </div>
            </div>
        </div>
        <Footer/>
    </>
}

export default About;