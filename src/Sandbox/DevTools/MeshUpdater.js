import { Vector3, Euler } from "three";

/**
 * Takes a mesh ref and updates its attributes to fit the data in saveData.
 * @param {MeshReference} meshRef - mesh that's being updated
 * @param {Set} saveData - set of information for meshRef to update
 * @param {Function} circum_radius_convert - work around to allow for constant function regarding circum data.
 */
const updateMesh = (meshRef, saveData, circum_radius_convert) => {
  if (!meshRef.current) {
    return;
  }

  const userData = meshRef.current.userData;
  //UNIVERSAL ATTRIBUTES

  // name
  meshRef.current.name = saveData.name;
  //position
  meshRef.current.position.copy(new Vector3().fromArray(saveData.position));
  //rotation
  meshRef.current.rotation.copy(new Euler().fromArray(saveData.rotation));

  //color
  userData.setColorIndex(saveData.colorIndex);

  //CUSTOM ATTRIBUTES===============================================================

  const attributes = saveData.attributeList;
  const meshData = userData.meshData;

  if (!attributes) {
    return;
  }
  //circumference
  if (attributes.includes("circum")) {
    meshData.setCircum(saveData.circum);
    meshData.setRadius(circum_radius_convert(saveData.circum));
  }

  if (attributes.includes("dim")) {
    const dim = saveData.dim;
    meshData.setX(dim[0]);
    meshData.setY(dim[1]);
    if (dim.length > 2) {
      meshData.setZ(dim[2]);
    }
  }

  if (attributes.includes("height")) {
    meshData.setHeight(saveData.height);
  }

  if (attributes.includes("width")) {
    meshData.setWidth(saveData.width);
  }

  if (attributes.includes("isHalf")) {
    meshData.setHalf(saveData.isHalf);
  }

  if (attributes.includes("size")) {
    meshData.setSize(saveData.size);
  }
};

export default updateMesh;
