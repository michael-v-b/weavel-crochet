import { forwardRef } from "react";

const Sec6 = forwardRef(({ sectionRefs }, ref) => {
  return (
    <>
      <h2 ref={ref}>6. IS YOUR INFORMATION TRANSFERRED INTERNATIONALLY?</h2>
      <div>
        <strong>In Short:</strong> We may transfer, store, and process your
        information in countries other than your own.
      </div>
      <div>
        Our servers are located in the United States. If you are accessing our
        Services for outside the United States, please be aware that your
        information may be transferred to, store by, and processed by us in our
        facilities and in the facilities of the third parties with whom we may
        share your personal information (see "
        <span
          className="link not-added clickable"
          onClick={() => {
            sectionRefs[4].current.scrollIntoView({ behavior: "smooth" });
          }}
        >
          WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
        </span>
        " above), in the United States, and other countries.
      </div>
      <div>
        If you are a resident in the European Economic Area (EEA), United
        Kingdom (UK), or Switzerland, then these countries may not necessarily
        have data protection laws or other similar laws as comprehensive as
        those in your country. However, we will take all necessary measures to
        protect your personal information in accordance with this Privacy Notice
        and applicable law.
      </div>
      <div>European Commission's Standard Contractual Clauses:</div>
      <div>
        We have implemented measures to protect your personal information,
        including by using the European Commission's Standard Contractual
        Clauses for transfers or personal information between our group
        companies and between us and our third-party providers. These clauses
        require all recipients to protect all personal information that they
        process originating from the EEA or UK in accordance with the European
        data protection laws and regulations. Our Standard Contractual Clauses
        can be provided upon request. We have implemented similar appropriate
        safeguards with our third-party service providers and partners and
        further details can be provided upon request.
      </div>
    </>
  );
});
export default Sec6;
