import { get, post } from "../utils/request"

export const postNewAnswer = async (option)=>{
    const response = await post("answers", option);
    return response
}
export const getAnswer = async (id)=>{
    const response = await get(`answers/${id}`);
    return response
}
export const getListAnswer = async (userId)=>{
    const response = await get(`answers?userId=${userId}`);
    return response;
}