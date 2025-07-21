const Sec12Body = ({ sectionRefs }) => {
  return (
    <>
      <div>
        We may also collect other personal information outside of these
        categories through instances where you interact with us in person,
        online, or by phone or mail in the context of:
      </div>
      <div>
        Receiving help through our customer support channels; Participation in
        customer surveys or contests; and Facilitation in the delivery of our
        Services and to respond to your inquiries.
      </div>
      <div>
        We will use and retain the collected personal information as needed to
        provide the Services or for:
      </div>
      <ul>
        <li>Category A - As long as the user has an account with us</li>
      </ul>

      <h3>Sources of Personal Information</h3>

      <div>
        Learn more about the sources of personal information we collect in “
        <span
          className="link not-added clickable"
          onClick={() => {
            sectionRefs[1].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          WHAT INFORMATION DO WE COLLECT?
        </span>
        ”
      </div>

      <h3>How We Use Your Personal Information</h3>
      <div>
        Learn more about how we use your personal information in the section, "
        <span
          className="link clickable"
          onClick={() => {
            sectionRefs[2].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          HOW DO WE PROCESS YOUR INFORMATION
        </span>
      </div>
      <div>
        <strong>Will your information be shared with anyone else?</strong>
      </div>
      <div>
        We may disclose your personal information with our service providers
        pursuant to a written contract between us and each service provider.
        Learn more about how we disclose personal information to the section, “
        <span
          className="link clickable"
          onClick={() => {
            sectionRefs[4].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION
        </span>
        ”
      </div>
      <div>
        We may use your personal information for our own business purposes, such
        as for undertaking internal research for technological development and
        demonstration. This is not considered to be “selling” your personal
        information.
      </div>
      <div>
        We have not sold or shared any personal information to third parties for
        a business or commercial purpose in the preceding twelve (12) months. We
        have disclosed the following categories of personal information to third
        parties for a business or commercial purpose in the preceding twelve
        (12) months:
      </div>
      <div>
        The categories of third parties to whom we disclosed personal
        information for a business or commercial purpose can be found under “
        <span
          className="link clickable"
          onClick={() => {
            sectionRefs[4].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
        </span>
        ”
      </div>
      <h3>Your Rights</h3>
      <div>
        You have rights under certain US state data protection laws. However,
        these rights are not absolute, and in certain cases, we may decline your
        request as permitted by law. These rights include:
      </div>

      <ul>
        <li>
          <strong>Right to know</strong> whether or not we are processing your
          personal data
        </li>
        <li>
          <strong>Right to access</strong> your personal data
        </li>
        <li>
          <strong>Right to correct</strong> inaccuracies in your personal data
        </li>
        <li>
          <strong>Right to request</strong> the deletion of your personal data
        </li>
        <li>
          <strong>Right to obtain a copy</strong> of the personal data you
          previously shared with us
        </li>
        <li>
          <strong>Right to non-discrimination</strong> for exercising your
          rights
        </li>
        <li>
          <strong>Right to opt out</strong> of the processing of your personal
          data if it is used for targeted advertising, the sale of personal
          data, or profiling in furtherance of decisions that produce legal or
          similarly significant effects (“profiling”)
        </li>
      </ul>
      <h3>How to Exercise Your Rights</h3>
      <div>
        To exercise these rights, you can contact us by submitting a{" "}
        <span className="link">data subject access request</span>, by emailing
        us at weavelcrochet@gmaill.com, or by referring to the contact details
        at the bottom of this document.
      </div>
      <div>
        Under certain US state data protection laws, you can designate an
        authorized agent to make a request on your behalf. We may deny a request
        from an authorized agent that does not submit proof that they have been
        validly authorized to act on your behalf in accordance with applicable
        laws.
      </div>
      <h3>Request Verification</h3>
      <div>
        Upon receiving your request, we will need to verify your identity to
        determine you are the same person about whom we have the information in
        our system. We will only use personal information provided in your
        request to verify your identity or authority to make the request.
        However, if we cannot verify your identity from the information already
        maintained by us, we may request that you provide additional information
        for the purposes of verifying your identity and for security or
        fraud-prevention purposes.
      </div>
      <div>
        If you submit the request through an authorized agent, we may need to
        collect additional information to verify your identity before processing
        your request and the agent will need to provide a written and signed
        permission from you to submit such request on your behalf.
      </div>
      <h3>Appeals</h3>
      <div>
        Under certain US state data protections laws, if we decline to take
        action regarding your request, you may appeal our decision by emailing
        us at weavelcrochet@gmail.com . We will inform you in writing of any
        action taken or not taken in response to the appeal, including a written
        explanation of the reasons for the decisions. If your appeal is denied,
        you may submit a complaint to your state attorney general.
      </div>
    </>
  );
};

export default Sec12Body;
