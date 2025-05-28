

/**
 * Creates a string for how many of each kind of eye should be added into shape after completion
 * @param {{Number}} eyeList - Object containing numbers and counts of eyes for each number 
 * @returns string that will be added to the exported pdf
 */
const insertEyes = (eyeList) => {

    const keys = Object.keys(eyeList);

    let output = "";

    const getNumEyes = (eyeSize) => {
        let numEyes = "";
        
        if(eyeList[eyeSize] == 1) {
            numEyes = eyeSize +" mm safety eye";
        } else {
            numEyes = "x " + eyeList[eyeSize] + " " + eyeSize + " mm. safety eyes";
        }
        return numEyes;
    }

    if(keys.length == 1) {
        output = "Insert " + getNumEyes(keys[0]) + " into shape.";
    } else {
        output = "Insert ";
        let firstEyes = ""
        for(let i = 0; i < keys.length-1;i++) {
            firstEyes = firstEyes + getNumEyes(keys[i]) + ", ";
        }
        let secondEyes = " and " +getNumEyes(keys[keys.length-1]) + " into shape.";
        output = output + firstEyes + secondEyes;
    }

    return output;
}

export default insertEyes;