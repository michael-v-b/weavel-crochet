import { forwardRef } from "react";

const Sec2 = forwardRef((_, ref) => {
  return (
    <>
      <h2 ref={ref}>2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
      <div>
        <strong>In Short:</strong> We process your information to provide,
        improve and administer our Services, communicate with you, for security
        and fraud prevention, and to comply with law. We process the personal
        information for the following purposes listed below. We may also process
        your information for other purposes only with your prior explicit
        consent.
      </div>
      <div>
        <strong>
          We process your personal information for a variety of reasons,
          depending depending on how you interact with our services, including:
        </strong>
      </div>
      <ul>
        <li>
          <strong>
            To facilitate account creation and authentication and otherwise
            manage user accounts.
          </strong>{" "}
          We may process your information so you can create and log in to your
          account, as well as keep your account in working order.
        </li>
        <li>
          <strong>
            To deliver and facilitate delivery of services to the user.
          </strong>{" "}
          We may process your information to respond to your inquiries and solve
          any potential issues you might have with the requested service.
        </li>
        <li>
          <strong>To respond to user inquiries/offer support to users.</strong>{" "}
          We may process your information to respond to your inquiries and solve
          any potential issues you might have with the requested service.
        </li>
        <li>
          <strong>To save or protect an individual's vital interest</strong> We
          may process your information when necessary to save or protect an
          individual's vital interest, such as to prevent harm.
        </li>
      </ul>
    </>
  );
});

export default Sec2;
