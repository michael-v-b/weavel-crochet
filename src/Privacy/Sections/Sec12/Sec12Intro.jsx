import { forwardRef } from "react";

const Sec12Intro = forwardRef(({ sectionRefs }, ref) => {
  return (
    <>
      <h3 ref={ref}>
        12. DO UNITED STATES RESIDENTS Have SPECIFIC PRIVACY RIGHTS?
      </h3>
      <div>
        <strong>In Short: </strong> If you are a resident of New Jersey, you may
        have the right to request access to and receive details about the
        personal information we maintain about you and how we have processed it,
        correct inaccuracies, get a copy of, or delete your personal
        information. You may also have the right to withdraw your consent to our
        processing of your personal information. These rights may be limited in
        some circumstances by applicable law. More information is provided
        below.
      </div>
      <h3>Categories of Personal Information We Collect</h3>
      <div>
        The table below shows the categories of personal information we have
        collected in the past twelve (12) months. The table includes
        illustrative examples of each category and does not reflect the personal
        information we collect from you. For a comprehensive inventory of all
        personal information we process, please refer to the section “
        <span
          className="link clickable"
          onClick={() => {
            sectionRefs[1].current.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          WHAT INFORMATION DO WE COLLECT?
        </span>
        ”
      </div>
    </>
  );
});

export default Sec12Intro;
