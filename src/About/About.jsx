import Banner from "../UI/Banner/Banner";
import Footer from "../UI/Footer/Footer";

const About = () => {
    return <>
        <Banner/>
        <div style = {{height:'80vh'}}>
            Hi! I'm Michael and I'm very passionate about crochet, specifically amigurumi, and the creativity it inspires.
            It's extremely satisfying then bringing your creations to life with your own two hands. However, designing your
            own patterns can take a lot of time and effort, not to mention the trial and error. 
            There's nothing more painful than being on round 25 before realizing the ball you're making is too wide and you need to start again.
            <div>Weavel</div>
            That's why I created Weavel. Weavel is a user-friendly 3D design software focused on basic shapes, allowing
            you to quickly and easily visualize and create your own crochet designs, so you can spend less time guessing, and more time stitching!
        </div>
        <Footer/>
    </>
}

export default About;