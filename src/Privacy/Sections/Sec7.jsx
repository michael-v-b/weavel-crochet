import { forwardRef } from "react";

const Sec7 = forwardRef((_, ref) => {
  return (
    <>
      <h2 ref={ref}>7. HOW LONG DO WE KEEP YOUR INFORMATION</h2>
      <div>
        <strong>In Short:</strong> We keep your information for as long as
        necessary to fulfill the purposes outlined in this Privacy Notice unless
        otherwise required by law.
      </div>
      <div>
        We will only keep your personal information for as long as it is
        necessary for the purposes set out in this Privacy Notice, unless a
        longer retention period is required or permitted by law (such as tax,
        accounting, or other legal requirements). No purpose in this notice will
        require us keeping your personal information for longer than the period
        of time in which users have an account with us.
      </div>
      <div>
        When we have no ongoing legitimate business need to process your
        personal information, we will either delete or anonymize such
        information, or, if this is not possible (for example, because your
        personal information has been stored in backup archives), then we will
        securely store your personal information and isolate it from any further
        processing until deletion is possible.
      </div>
    </>
  );
});

export default Sec7;
