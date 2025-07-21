const Sec12Table = () => {
  const tableData = [
    ["A. Identifiers", "Contact details, such as real", "YES"],
    [
      "B. Protected classification characteristics under state or federal law",
      "Gender, age, date of birth, race and ethnicity, national origin, marital status, and other demographic data",
      "NO",
    ],
    [
      "C. Commercial information",
      "Transaction information, purchase history, financial details, and payment information",
      "NO",
    ],
    ["D. Biometric information", "Fingerprints and voiceprints", "NO"],
    [
      "E. Internet or other similar network activity",
      "Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements",
      "NO",
    ],
    ["F. Geolocation data", "Device location", "NO"],
    [
      "G. Audio, electronic, sensory, or similar information",
      "Images and audio, video or call recordings created in connection with our business activities",
      "NO",
    ],
    [
      "H. Professional or employment-related information",
      "Business contact details in order to provide you our Services at a business level or job title, work history, and professional qualifications if you apply for a job with us",
      "NO",
    ],
    [
      "G. Education Information",
      "Student records and directory information",
      "NO",
    ],
    [
      "J. Inferences drawn from collected personal information",
      "Inferences drawn from any of the collected personal information listed above to create a profile or summary about, for example, an individual’s preferences and characteristics",
      "NO",
    ],
  ];
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Example</th>
            <th>Collected</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((value, key) => {
            return (
              <tr key={key}>
                <td>{value[0]}</td>
                <td>{value[1]}</td>
                <td>{value[2]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Sec12Table;
