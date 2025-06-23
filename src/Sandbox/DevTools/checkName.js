

/**
 * 
 * @param {string} name - name that you want to make
 * @param {[Mesh]} objectList - list of objects to compare name to.
 * @returns 
 */
const checkNames = (name,objectList) => {

    if(objectList.length < 1) {
        return name;
    }

    const nameList = []
    

    objectList.forEach(object=>{
        nameList.push(object.name);
    });
    
    let index = 1;
    let temp = name;

    //while temp has overlapping names, add index to it
    while(nameList.includes(temp)) {
        temp = name + " (" + index +")";
        index +=1;
    }

    
    return temp; 
}

export default checkNames;