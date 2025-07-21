import { forwardRef } from "react";

const Sec15 = forwardRef((_, ref) => {
  return (
    <>
      <h2 ref={ref}>
        15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
      </h2>
      <div>
        You have the right to request access to the personal information we
        collect from you, details about how we have processed it, correct
        inaccuracies, or delta your personal information. You may also have the
        right to withdraw your consent to our processing of your personal
        information. These rights may be limited in some circumstances by
        applicable law To request to review, update or delete you personal
        information, please fill out and submit a{" "}
        <span className="link">data subject access request</span>
      </div>
    </>
  );
});

export default Sec15;
