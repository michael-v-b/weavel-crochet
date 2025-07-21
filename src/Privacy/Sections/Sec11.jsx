import { forwardRef } from "react";

const Sec11 = forwardRef((_, ref) => {
  return (
    <>
      <h2 ref={ref}>11. CONTROLS FOR DO-NOT-TRACK FEATURES</h2>
      <div>
        Most web browsers and some mobile operating systems and mobile
        applications include a Do-Not-Track (“DNT”) feature or setting you can
        activate to signal your privacy preference not to have data about your
        online browsing activities monitored and collected. At this stage, no
        uniform technology standard for recognizing and implementing DNT signals
        has been finalized. As such, we do not currently respond to DNT browser
        signals or any other mechanism that automatically communicates your
        choice not to be tracked online. If a standard or online tracking is
        adopted that we must follow in the future, we will inform you about that
        practice in a revised version of this Privacy Notice.
      </div>
      <div>
        California law requires us to let you know how we respond to web browser
        DNT signals. Because there currently is not an industry or legal
        standard for recognizing or honoring DNT signals, we do not respond to
        them at this time.
      </div>
    </>
  );
});

export default Sec11;
