import Intro from "./Intro";
import PrivacyTOC from "./PrivacyTOC";
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
import Sec12 from "./Sections/Sec12/Sec12";
import Sec13 from "./Sections/Sec13";
import Sec14 from "./Sections/Sec14";
import Sec15 from "./Sections/Sec15";
import Banner from "../UI/Banner/Banner";
import Footer from "../UI/Footer/Footer";
import { useRef, useMemo, createRef } from "react";

const Privacy = () => {
  const sections = [
    PrivacyTOC,
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
  ];

  const sectionRefs = useMemo(
    () => sections.map(() => createRef()),
    [sections]
  );

  //refactor, create array of sections, set refs based on sections, map sections to return

  return (
    <div className="webpage">
      <Banner />
      <div className="privacy-container">
        <div className="privacy-text">
          <Intro sectionRefs={sectionRefs} />
          {sections.map((Component, i) => {
            return (
              <Component
                ref={sectionRefs[i]}
                key={i}
                sectionRefs={sectionRefs}
              ></Component>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
