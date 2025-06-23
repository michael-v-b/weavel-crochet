import IntersectionMap from "./IntersectionMap";

const Finishing = (meshList) => {
    const intersectionMap = IntersectionMap(meshList);

    console.log("intersecitonMap");
    console.dir(intersectionMap);
}

export default Finishing;