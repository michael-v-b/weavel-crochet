import "./privacy.css";
import { forwardRef } from "react";

const Intro = forwardRef(({ sectionRefs }, ref) => {
  return (
    <div>
      <h1>Privacy Policy</h1>
      <div>Last updated July 03, 2025</div>
      <div>
        This Privacy Notice for Weavel Crochet ("we","us", or "our"), describes
        how and why we might access, collect, store, use, and/or share
        ("process") your personal information when you use our services
        ("Services"), including when you:
      </div>
      <ul>
        <li>
          Visit our website at weavelcrochet.com or any website of ours that
          links to this Privacy Notice
        </li>
        <li>
          Engage with us in other related ways, including any sales, marketing,
          or events
        </li>
      </ul>
      <h3>Questions or concerns?</h3>
      Reading this Privacy Notice will help you understand your privacy rights
      and choices. we are responsible for making decisions about how your
      personal information is processed. If you do not agree with our policies
      and practices, please do not use our Services. If you still have any
      questions or concerns, please contact us at weavelcrochet@gmail.com.
      <h2>Summary of Key Points</h2>
      <div>
        This summary provides key points from our Privacy Notice, but you can
        find out more details about any of these topics by clicking the link
        following each key point or by using our{" "}
        <span
          className="link clickable"
          onClick={() => {
            sectionRefs[1].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Table of Contents
        </span>{" "}
        below to find the section you are looking for.
      </div>
      <div>
        <strong>What personal information do we process?</strong> When you
        visit, use or navigate our services, we may process personal information
        depending on how you interact with us and the services, the choices you
        make, and the products and features you use. Learn more about{" "}
        <span
          className="link clickable"
          onClick={() => {
            sectionRefs[1].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          PERSONAL INFORMATION YOU DISCLOSE TO US
        </span>
      </div>
      <div>
        <strong>Do we process any sensitive personal information?</strong>
        Some of the information may be considered "special" or"sensitive" in
        certain jurisdictions, for example your racial or ethnic origins, sexual
        orientation, and religious beliefs. We do not process sensitive personal
        information.
      </div>
      <div>
        <strong>Do we collect any information from third parties?</strong>
        We do not collect any information from third parties.
      </div>
      <div>
        <strong>How do we process your information?</strong>
        We process our information to provide, improve, and administer our
        Services, communicate with you, for security and fraud prevention, and
        to comply with law. We may also process your information for other
        purposes with our consent. We process your information only when we have
        a valid legal reason to do so. Learn more about
        <span
          className="link clickable"
          onClick={() => {
            sectionRefs[2].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          HOW WE PROCESS YOUR INFORMATION
        </span>
      </div>
      <div>
        <strong>
          In what situations and with which parties do we share personal
          information?
        </strong>
        We may share information in specific situations and with specific third
        parties. Learn more about
        <span
          className="link clickable"
          onClick={() => {
            sectionRefs[4].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          WHEN AND WITH WHOM WE SHARE YOUR PERSONAL INFORMATION.
        </span>
      </div>
      <div>
        <strong>How do we keep our information safe?</strong>
        We have adequate organization and technical processes and procedures in
        place to protect your personal information. However, no electronic
        transmission over the internet or information storage technology can be
        guaranteed to be 100% secure, so we cannot promise or guarantee that
        hackers, cybercriminals or other unauthorized third parties will not be
        able to defeat our security and improperly collect, access, steal, or
        modify your information. Learn more about
        <span
          className="link clickable"
          onClick={() => {
            sectionRefs[8].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          HOW WE KEEP YOUR INFORMATION SAFE.
        </span>
      </div>
      <div>
        <strong>What are your rights?</strong>
        Depending on where you are located geographically, the applicable
        privacy law may mean you have certain rights regarding our personal
        information. Learn more about{" "}
        <span
          className="link clickable"
          onClick={() => {
            sectionRefs[1].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          YOUR PRIVACY RIGHTS.
        </span>
      </div>
      <div>
        <strong>How do you exercise your rights</strong>
        The easiest way to exercise your rights is by contacting us at
        weavelcrochet@gmail.com. We will consider and act upon any request in
        accordance with applicable data protection laws.
      </div>
    </div>
  );
});

export default Intro;
