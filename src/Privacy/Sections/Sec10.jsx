import { forwardRef } from "react";

const Sec10 = forwardRef(({ sectionRefs }, ref) => {
  return (
    <>
      <h2 ref={ref}>10. WHAT ARE YOUR PRIVACY RIGHTS?</h2>;
      <div>
        <strong>In Short:</strong> Depending on your state of residence in the
        US or in some regions, such as the European Economic Area (EEA), United
        Kingdom (UK), Switzerland, and Canada, you have rights that allow you
        greater access to and control over the personal information. You may
        review, change, or terminate your account at any time, depending on your
        country, province, or state of residence.
      </div>
      <div>
        In some regions (like the EEA, UK, Switzerland, and Canada), you have
        certain rights under applicable data protection laws. These may include
        the right (i) to request access and obtain a copy of your personal
        information, (ii) to request rectification or erasure; (iii) to restrict
        the processing of your personal information; (iv) if applicable, to data
        portability; and (v) not to be subject to automated decision-making. If
        a decision that produces legal or similarly significant effects is made
        solely by automated means, we will inform you, explain the main factors,
        and offer a simple way to request human review. In certain
        circumstances, you may also have the right to object to the processing
        of your personal information. You can make such a request by contacting
        us by using the contact details provided in the section “
        <span
          className="link not-added clickable"
          onClick={() => {
            sectionRefs[14].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          HOW CAN YOU CONTACT US ABOUT THIS NOTICE
        </span>
        ” below.
      </div>
      <div>
        We will consider an act upon any request in accordance with applicable
        data protection laws.
      </div>
      <div>
        If you are located in the EEA or UK and you believe we are unlawfully
        processing your personal information, you also have the right to
        complain to your{" "}
        <span className="link">Member State data protection authority</span> or{" "}
        <a
          className="link clickable"
          href="https://ico.org.uk/make-a-complaint/data-protection-complaints/"
        >
          UK data protection authority.
        </a>
      </div>
      <div>
        If you are located in Switzerland, you may contact the{" "}
        <a className="link clickable" href="https://www.edoeb.admin.ch/en">
          Federal Data Protection and Information Commissioner.
        </a>
      </div>
      <div>
        <strong>Withdrawing your consent:</strong> If we are relying on your
        consent to process your personal information, which may be express
        and/or implied consent depending on the applicable law, you have the
        right ot withdraw your consent at any time. You can withdraw your
        consent at any time. You can withdraw your consent at any time by
        contacting us by using the contact details provided in the section “
        <span
          className="link clickable"
          onClick={() => {
            sectionRefs[14].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
        </span>
        ” below.
      </div>
      <div>
        However, please note that this will not affect the lawfulness of the
        processing before its withdrawal nor, when applicable law allows, will
        it affect the processing of your personal information conducted in
        reliance on lawful processing grounds other than consent.
      </div>
      <h3>Account Information</h3>
      <div>
        -Log in to your account, access the Profile tab and hit “Delete Account”
      </div>
      <div>
        Upon your request to terminate your account, we will deactivate or
        delete your account information from our active databases. However, we
        may retain some information in our files to prevent fraud, troubleshoot
        problems, assist with any investigations, enforce our legal terms and/or
        comply with applicable legal requirements.
      </div>
      <div>
        If you have questions or comments about your privacy rights, you may
        email us at weavelcrochet@gmail.com
      </div>
    </>
  );
});

export default Sec10;
