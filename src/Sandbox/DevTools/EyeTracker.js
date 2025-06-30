

import {Matrix4} from 'three';

const EyeTracker = () => {
}

/**
 * Get all of the meshes that are eyes in the scene
 * @param {[Mesh]} meshList - list of all meshes in the scene
 * @returns list of all eye meshes in the scene
 */
EyeTracker.getEyeList = (meshList) => {
    const eyeList = [];
    for(let i = 0; i < meshList.length;i++) {
        if(meshList[i].userData.meshType =="eye") {
            eyeList.push(meshList[i]);
        }
    }
    return eyeList;
}

EyeTracker.getEyeCount = (meshList) => {
    const eyeList = EyeTracker.getEyeList(meshList);
    const eyeCount = {};

    for(let i = 0; i < eyeList.length; i++) {
        const eyeSize = eyeList[i].userData.meshData.size;
        if(eyeCount[eyeSize]) {
            eyeCount[eyeSize] +=1;
        } else {
            eyeCount[eyeSize] = 1;
        }
    }

    return eyeCount;
}


/**
 * Gets all eyes that intersect with this mesh
 * @param {Mesh} mesh - mesh that's intersecting with all the eyes 
 * @param {[Mesh]} meshList - list of all meshes in the scene 
 * @returns list of all eyes that intersect with mesh
 */
EyeTracker.getIntersectingEyes = (mesh, meshList) => {
    const eyeList = EyeTracker.getEyeList(meshList);

    const output = {};
    for(let i = 0; i < eyeList.length;i++) {
        const eye = eyeList[i];
        if(EyeTracker.testIntersectEye(eye,mesh)) {
            const eyeSize = eye.userData.meshData.size;
            if(output[eyeSize]) {
                output[eyeSize] +=1;
            } else {
                output[eyeSize] = 1;
            }
        }
    }
    return output;
}

/**
 * tests whether an eye and a mesh are intersecting
 * @param {EyeMesh} eye - eye that is being tested
 * @param {Mesh} mesh - mesh that is being tested
 * @returns true if they intersect, false if not
 */
EyeTracker.testIntersectEye = (eye,mesh) => {
    if(mesh.userData.meshType == "eye") {
        return;
    }
    const eyeTip = eye.userData.visualRef.current.children[0];
    
    //world matrix for eye tip
    const tipMatrix = new Matrix4();
    tipMatrix.copy(mesh.matrixWorld).invert();
    tipMatrix.multiply(eyeTip.matrixWorld);

    //world matrix for eye itself
    const eyeMatrix = new Matrix4();
    eyeMatrix.copy(mesh.matrixWorld).invert();
    eyeMatrix.multiply(eye.matrixWorld);

    //CHAT GPT CODE end
    const bTree = mesh.geometry.boundsTree;
    eyeTip.geometry.computeBoundingBox();
    
    //if selected mesh intersects with eyetip and eye
    const intersects = (bTree.intersectsBox(
      eyeTip.geometry.boundingBox,
      tipMatrix
    ) && 
    bTree.intersectsBox(eye.geometry.boundingBox,eyeMatrix));

    return intersects;
}


export default EyeTracker;