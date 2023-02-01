import create from "zustand";
import { persist } from 'zustand/middleware'

export const useStore = create(persist((set) => ({
  storeWard: "",
  setStoreWard: (prop) => set(()=>({storeWard: prop})),
})),{ name: "breadCrumb-data"});
