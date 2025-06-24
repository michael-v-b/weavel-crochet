import IntersectionMap from "./IntersectionMap";

const Finishing = (meshList) => {
    const intersectionMap = IntersectionMap(meshList);

    const visited = [];
    const output = [];
    const sortedNames = meshList.map(mesh => mesh.name);
    //sort names based on most connections
    sortedNames.sort((a,b) => intersectionMap[b].length-intersectionMap[a].length);

    /**
     * 
     * @param {string} name -name of mesh you want
     * @returns reference to mesh with that name
     */
    const findMesh = (name) => {
        for(let i =0 ;i < meshList.length;i++) {
            if(meshList[i].name == name) {
                return meshList[i];
            }
        }
        return null;
    }

    /**
     * 
     * @param {string} nameA -name of object to be compared
     * @param {string} nameB -name of object to be compared
     * @returns name of object that has the largest volume
     */
    const testSize = (nameA,nameB) => {
        const meshA = findMesh(nameA);
        const meshB = findMesh(nameB);

        const boxA = meshA.geometry.boundingBox;
        const boxB = meshB.geometry.boundingBox;

        const volumeA = getVolume(boxA);
        const volumeB = getVolume(boxB);
    
        if(volumeA > volumeB) {
            return nameA;
        } else {
            return nameB;
        }
    }

    /**
     * 
     * @param {BoundingBox} boundingBox - bounding box of object
     * @returns volume of boundingbox
     */
    const getVolume = (boundingBox) => {
        const x = boundingBox.max.x-boundingBox.min.x;
        const y = boundingBox.max.y-boundingBox.min.y;
        const z = boundingBox.max.z-boundingBox.min.z;

        const volume = x*y*z;

        return volume;
    }

    
    for(let i =0; i <sortedNames.length;i++ ) {
        const baseObject=  sortedNames[i];
        const temp = [];
        for(let j = 0; j < intersectionMap[baseObject].length; j++) {
            const connections = intersectionMap[baseObject];

            if(visited.includes(connections[j])) {
                continue;
            } 

            const larger = testSize(connections[j],baseObject);
            const smaller = connections[j] == larger ? baseObject : connections[j];

            temp.push("- sew " + smaller + " onto " + larger);
        }
        if(temp.length > 1) {
            output.push(temp);
        }
        visited.push(baseObject);
    }

    return output;

}

export default Finishing;