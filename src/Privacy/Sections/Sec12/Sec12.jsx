import Sec12Intro from "./Sec12Intro";
import Sec12Table from "./Sec12Table";
import Sec12Body from "./Sec12Body";
import { forwardRef } from "react";

const Sec12 = forwardRef(({ sectionRefs }, ref) => {
  return (
    <>
      <Sec12Intro sectionRefs={sectionRefs} ref={ref} />
      <Sec12Table />
      <Sec12Body sectionRefs={sectionRefs} />
    </>
  );
});

export default Sec12;
