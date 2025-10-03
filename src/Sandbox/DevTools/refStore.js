import {create} from 'zustand';

const useRefStore = create((set)=>({
    refs: {},
    setRefs: (key,el) => set((state)=>({refs:{...state.refs,[key]:el}}))
}));

export default useRefStore;