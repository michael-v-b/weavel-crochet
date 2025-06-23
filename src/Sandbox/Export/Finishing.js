import IntersectionMap from "./IntersectionMap";

const Finishing = (meshList) => {
    const intersectionMap = IntersectionMap(meshList);

    const visited = [];

    const dfs = (name) => {
        if(visited.includes(name) || !intersectionMap[name]) {
           return; 
        } else {
            visited.push(name);
        }
        
        const intersections = intersectionMap[name];
        for(let i = 0; i < intersections.length;i++) {
            dfs(intersections[i]);
        }
    }
    
    for(let i =0; i <meshList.length;i++ ) {
        dfs(meshList[i].name);
    }

    console.log("visited: " + visited);
}

export default Finishing;