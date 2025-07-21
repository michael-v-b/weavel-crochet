import { forwardRef } from "react";

const Sec8 = forwardRef((_, ref) => {
  return (
    <>
      <h2 ref={ref}> 8. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
      <div>
        <strong>In Short:</strong> We aim to protect your personal information
        through a system of organizational and technical security measures.
      </div>
      <div>
        We have implemented appropriate and reasonable technical and
        organizational security measures designed to protect the security of any
        personal information we process. However, despite our safeguards and
        efforts to secure your information, no electronic transmission over the
        Internet or information storage technology can be guaranteed to be 100%
        secure, so we cannot promise or guarantee that hackers, cybercriminals,
        or other unauthorized third parties will not be able to defeat our
        security and improperly collect, access, steal, or modify your
        information. Although we will do our best to protect your personal
        information, transmission of personal information to and from our
        Services is at your own risk. You should only access the Services within
        a secure environment.
      </div>
    </>
  );
});

export default Sec8;
