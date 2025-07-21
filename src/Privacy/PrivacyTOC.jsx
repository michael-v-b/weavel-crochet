import { forwardRef } from "react";

const PrivacyTOC = forwardRef(({ sectionRefs }, ref) => {
  return (
    <>
      <h1 ref={ref}>Table of Contents</h1>
      <ol className="link clickable">
        <li
          onClick={() => {
            sectionRefs[1].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          WHAT INFORMATION DO WE COLLECT?
        </li>
        <li
          onClick={() => {
            sectionRefs[2].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          HOW DO WE PROCESS YOUR INFORMATION?
        </li>
        <li
          onClick={() => {
            sectionRefs[3].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION
        </li>
        <li
          onClick={() => {
            sectionRefs[4].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
        </li>
        <li
          onClick={() => {
            sectionRefs[5].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
        </li>
        <li
          onClick={() => {
            sectionRefs[6].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
        </li>
        <li
          onClick={() => {
            sectionRefs[7].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          HOW LONG DO WE KEEP YOUR INFORMATION?
        </li>
        <li
          onClick={() => {
            sectionRefs[8].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          HOW DO WE KEEP YOUR INFORMATION SAFE?
        </li>
        <li
          onClick={() => {
            sectionRefs[9].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          DO WE COLLECT INFORMATION FROM MINORS?
        </li>
        <li
          onClick={() => {
            sectionRefs[10].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          WHAT ARE YOUR PRIVACY RIGHTS?
        </li>
        <li
          onClick={() => {
            sectionRefs[11].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          CONTROLS FOR DO-NOT-TRACK FEATURES
        </li>
        <li
          onClick={() => {
            sectionRefs[12].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
        </li>
        <li
          onClick={() => {
            sectionRefs[13].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          DO WE MAKE UPDATES TO THIS NOTICE?
        </li>
        <li
          onClick={() => {
            sectionRefs[14].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
        </li>
        <li
          onClick={() => {
            sectionRefs[15].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
        </li>
      </ol>
    </>
  );
});

export default PrivacyTOC;
