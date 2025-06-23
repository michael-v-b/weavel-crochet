
/**
 * 
 * @param {JSDPF} doc - the document that will be given the title
 * @param {string} title - the text on the title 
 * @param {Number} location - on y position for the title
 */
const Title = (doc,title,row) => {
        doc.setFillColor(191, 237, 245);
        doc.roundedRect(10, row - 7, 100, 10, 5, 5, "F");
        //Object Title
        doc.setFont("Helvetica", "bold");
        doc.setTextColor(120, 165, 206);
        doc.text(title + ": ", 20, row);
        doc.setTextColor(0, 0, 0);
        doc.setFont("Helvetica", "normal");
}

export default Title;
