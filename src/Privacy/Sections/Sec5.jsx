import { forwardRef } from "react";

const Sec5 = forwardRef(({ sectionRefs }, ref) => {
  return (
    <>
      <h2 ref={ref}>5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES</h2>

      <div>
        <strong>In Short: </strong> We may use cookies and other tracking
        technologies to collect and store your information.
      </div>
      <div>
        We may use cookies and similar tracking technologies (like web beacons
        and pixels) to gather information when you interact with our Services.
        Some online tracking technologies help us maintain the security of our
        Services and your account, prevent crashes, fix bugs, save your
        preferences, and assist with basic site functions.
      </div>
      <div>
        We also permit third parties and service providers to use online
        tracking technologies on our Services for analytics and advertising,
        including to help manage and display advertisements, to tailor
        advertisements to your interests, or to send abandoned shopping cart
        reminders (depending on your communication preferences). The third
        parties and services tailored to your interests which may appear either
        on our Services or on other websites.
      </div>
      <div>
        To the extent these online tracking technologies are deemed to be a
        "sale"/"sharing" (which includes targeted advertising, as defined
        underthe applicable laws) under applicable US state laws, you can opt
        out of these online tracking technologies by submitting a request as
        described below under section
        <span
          className="link clickable"
          onClick={() => {
            sectionRefs[12].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          "DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?"
        </span>
      </div>
      <div>
        Specific information about how we use such technologies and how you can
        refuse certain cookies is set out in our Cookie Notice.
      </div>

      <h3>Google Analytics</h3>

      <div>
        We may share your information with Google analytics to track and analyze
        the use of the Services. The Google Advertising Features that we may use
        include :Google Analytics Demographics and Interests Reporting. To opt
        out of being tracked by Google Analytics across the Services, visit{" "}
        <a
          className="link clickable"
          href="https://tools.google.com/dlpage/gaoptout"
        >
          https://tools.google.com/dlpage/gaoptout
        </a>
        . you can opt out of Google Analytics Advertising Features through{" "}
        <a
          className="link clickable"
          href="https://myadcenter.google.com/home?sasb=true&ref=ad-settings"
        >
          Ads Settings
        </a>{" "}
        and Ad Settings for mobile apps. Other opt out means include{" "}
        <a
          className="link clickable"
          href="http://optout.networkadvertising.org/"
        >
          http://optout.networkadvertising.org/
        </a>{" "}
        and
        <a
          className="link clickable"
          href="https://www.networkadvertising.org/mobile-choice"
        >
          https://www.networkadvertising.org/mobile-choice.
        </a>{" "}
        For more information on the privacy practices of Google, please visit
        the{" "}
        <a
          className="link clickable"
          href="https://policies.google.com/privacy"
        >
          Google Privacy & Terms page.
        </a>
      </div>
    </>
  );
});

export default Sec5;
