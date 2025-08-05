const ToC = ({sectionRefs}) => {

    const sections = [
"Our Services"
,"Intellectual Property Rights"
,"User Representations"
,"UserRegistration"
,"Purchases and Payment"
,"Prohibited Activites"
,"User Generated Contributions"
,"Contribution License"
,"Third-Party Websites and Content"
,"ADvertisers"
,"Services Management"
,"Privacy Policy"
,"Term and Termination"
,"Modifications and Interruptions"
,"Governing Law"
,"Dispute Resolution"
,"Corrections"
,"Disclaimer"
,"Limitations of LIability"
,"Indemnification"
,"User Data"
,"Electronic Communications, Transactions, and Signatures"
,"California Users and Residents"
,"Miscellaneous"
,"Contact Us"
]
    return <>
        <ol className=  "link clickable">
            {sections.map((value,i) => {
                return <li 
                    key = {i} 
                    onClick = {()=>{
                        if(i < sectionRefs.length) {
                        sectionRefs[i].current.scrollIntoView({behavior:'smooth'});
                        } else {
                            console.log("section " + (i+1) + " is not implemented yet");
                        }
                    }}> 
                    {value}
                </li>
            })}
        </ol>
    </>
}

export default ToC;