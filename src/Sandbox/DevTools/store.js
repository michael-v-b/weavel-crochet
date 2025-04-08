import { create } from "zustand";

//real default circumference
const tempCircum = 30;

//used for state management
const useStore = create((set) => ({
  OBJECT_LIMIT: 25,
  DEF_CIRCUM: tempCircum,
  DEF_HEIGHT: Math.ceil(tempCircum/(Math.PI)),

  //CONVERTS convert real values to in game values.
  //x(1/36) + 1/6
  circum_radius_convert: (x) => {return (x/36 + (1/6))},
  height_convert: (x) => {return (x/(tempCircum/(2*Math.PI)))},

  draggingNum: 1,
  setDraggingNum: (newDragging) =>set({draggingNum:newDragging}),

  projectName: "",
  setProjectName: (newName) => set({ projectName: newName }),
  nameLoading: true,
  setNameLoading: (newLoading) => set({ nameLoading: newLoading }),

  meshLoading: true,
  setMeshLoading: (newMeshLoading) => set({ meshLoading: newMeshLoading }),

  projectFile: null,
  setProjectFile: (newProjectFile) => set({ projectFile: newProjectFile }),

  projectId: "",
  setProjectId: (newProjectId) => set({ projectId: newProjectId }),

  mode: "none",
  setMode: (newMode) => set({ mode: newMode }),

  tool: "none",
  setTool: (newTool) => set({ tool: newTool }),

  isFocused: false,
  setFocused: (newFocused) => set({ isFocused: newFocused }),

  keysPressed: [],
  setKeysPressed: (newKeys) =>
    set((state) => ({
      keysPressed:
        typeof newKeys === "function" ? newKeys(state.keysPressed) : newKeys,
    })),

  selectedMeshes: [],
  setSelectedMeshes: (newSelectedList) =>
    set({ selectedMeshes: newSelectedList }),

  meshList: [],
  setMeshList: (newMeshList) => set({ meshList: newMeshList }),


  colorList: ["#ff0000"],
  setColorList: (newColorList) => set({ colorList: newColorList }),

  rotation: [0, 0, 0],
  setRotation: (newRotation) => set({ rotation: newRotation }),

  avgPosition: [0, 1, 0],
  setAvgPosition: (newAvgPosition) => set({ avgPosition: newAvgPosition }),

  currentRotation: [0,0,0],
  setCurrentRotation : (newRotation) => set({currentRotation:newRotation}),

  updateAvgPosition: () =>
    set((state) => {
      if (state.selectedMeshes.length <= 0) {
        return {
          x: state.avgPosition[0],
          y: state.avgPosition[1],
          z: state.avgPosition[2],
        };
      }
      const updateCoords = () => {
        let x = 0;
        let y = 0;
        let z = 0;
        state.selectedMeshes.forEach((mesh) => {
          x += mesh.position.x;
          y += mesh.position.y;
          z += mesh.position.z;
        });
        x /= state.selectedMeshes.length;
        y /= state.selectedMeshes.length;
        z /= state.selectedMeshes.length;
        return { x: x, y: y, z: z };
      };

      return {
        avgPosition: [updateCoords().x, updateCoords().y, updateCoords().z],
      };
    }),

  undoList: [],
  setUndoList: (newUndo) => set({ undoList: newUndo, redoList: [] }),
  resetUndoList: (newUndo) => set({ undoList: newUndo }),

  redoList: [],
  setRedoList: (newRedo) => set({ redoList: newRedo }),
}));

export default useStore;
