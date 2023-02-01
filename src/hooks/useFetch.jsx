import axios from "axios";
import { useQuery, useMutation } from "react-query";
//
import { USER_API } from "../config";


// ------------- AXIOS BASE --------------
const axiosBase = axios.create({
  baseURL: `${USER_API}`,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`
  },
});


// -------------- GET DATA ----------------
export const useGet = ( path ) => {
    async function fetched() { return await axiosBase.get(path) }
    return useQuery([path], fetched)    
}


// -------------- POST DATA ----------------
export const usePost = ( path ) => {
    async function fetched(post) { return await axiosBase.post(path, post) }
    return useMutation([path], fetched)
}


// -------------- POST DATA ----------------
export const usePut = ( path ) => {
    async function fetched(post) { return await axiosBase.put(path, post) }
    return useMutation([path], fetched)
}


// -------------- POST DATA ----------------
export const usePatch = ( path ) => {
    async function fetched(post) { return await axiosBase.patch(path, post) }
    return useMutation([path], fetched)
}