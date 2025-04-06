import { User, Search, Trophy } from "lucide-react";
import "../assets/styles/HowItWorks.css"; 

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <div className="container">
        <div className="text-center">
          <h2 className="heading">How It Works?</h2>
          <p className="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ellentesque dignissim 
            quam et metus effici turac fringilla lorem facilisis.
          </p>
        </div>

        {/* Steps Section */}
        <div className="steps">
          
          <div className="step">
            <User className="icon" />
            <h3>Create an Account</h3>
            <p>
              Post a job to tell us about your project. We'll quickly match you
              with the right freelancers find place best.
            </p>
          </div>

      
          <div className="step">
            <Search className="icon" />
            <h3>Search Jobs</h3>
            <p>
              Post a job to tell us about your project. We'll quickly match you
              with the right freelancers find place best.
            </p>
          </div>

     
          <div className="step">
            <Trophy className="icon" />
            <h3>Apply</h3>
            <p>
              Post a job to tell us about your project. We'll quickly match you
              with the right freelancers find place best.
            </p>
          </div>
        </div>
      </div>
    </section>
    
  );
};

export default HowItWorks;
