import "./Agreement.css";
const Agreement = ({ getChecked }) => {
  return (
    <div className="ack-container">
      <div className="ack-check-container">
        <input
          className="ack-check"
          type="checkbox"
          onChange={(e) => {
            getChecked(e.target.checked);
          }}
        />
      </div>
      <div className="ack-text-container">
        <div className="ack-text">
          By clicking here you acknowledge that you both agree and have read our{" "}
          <a href="./tos" target="_blank" className="unused-link clickable">
            Terms of Service
          </a>
          and our{" "}
          <a href="./privacy" target="_blank" className="link">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default Agreement;
