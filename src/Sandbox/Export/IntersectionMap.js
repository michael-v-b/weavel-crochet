

import {Matrix4} from 'three';

/**
 * 
 * @param {[Mesh]} meshList - a list of all meshes in project 
 * @returns a double sided graph of all the meshes in the project.
 */
const IntersectionMap = (meshList) => {

    const meshMap = {}

    const insertValue = (id,value) => {
        if(meshMap[id]) {
            meshMap[id].push(value);
        } else {
            meshMap[id] = [value];
        }
    }

    for(let i = 0; i < meshList.length;i++) {

        const firstMesh = meshList[i];
        const firstTree = firstMesh.geometry.boundsTree;
        const firstName = firstMesh.name;
        for (let j = i; j < meshList.length;j++) {
            if(i == j) {
                continue;
            }

            const secondMesh = meshList[j];

            const secondName = secondMesh.name;

            const matrix = new Matrix4();
            matrix.copy(firstMesh.matrixWorld).invert();
            matrix.multiply(secondMesh.matrixWorld);

        

            const intersects = firstTree.intersectsGeometry(secondMesh.geometry,matrix)

            //add value to both ends of intersection map
            if(intersects) {
                insertValue(firstName,secondName);
                insertValue(secondName,firstName);
            }  
        }
    }

    return meshMap;
}

export default IntersectionMap;