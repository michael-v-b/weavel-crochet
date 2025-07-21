import { forwardRef } from "react";

const Sec1 = forwardRef((_, ref) => {
  return (
    <>
      <h2 ref={ref}>1. WHAT INFORMATION DO WE COLLECT?</h2>
      Personal information you disclose to us
      <div>
        <strong>In Short: </strong> We collect personal information that you
        provide to us.
      </div>
      <div>
        We collect personal information that you voluntarily provide to us when
        you register on the Services, express an interest in obtaining
        information about us or our products and Services, when you participate
        in activities on the Services, or otherwise when you contact us.
      </div>
      <div>
        <strong>Personal Information Provided by You.</strong> The personal
        information that we collect depends on the context of your interactions
        with us and the Services, the choices you make, and the products and
        features you use. The personal information we collect may include the
        following:
      </div>
      <ul>
        <li>email addresses</li>
        <li>passwords</li>
      </ul>
      <div>
        <strong>Sensitive Information.</strong> We do not process sensitive
        information.
      </div>
      <div>
        <strong>Payment Data.</strong> We may collect data necessary to process
        your payment if you choose to make purchases, such as your payment
        instrument number, and the security code associated with your payment
        instrument. All payment data is handled and stored by Papal. you may
        find their privacy notice link here:
        <a
          className="link clickable"
          href="https://www.paypal.com/us/legalhub/paypal/privacy-full"
        >
          https://www.paypal.com/us/legalhub/paypal/privacy-full
        </a>
      </div>
      All personal information that you provide to us must be true, complete,
      and accurate, and you must notify us of any changes to such personal
      information.
    </>
  );
});

export default Sec1;
