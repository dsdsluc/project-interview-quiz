import { get, post } from "../utils/request"

export const checkLogin = async (email,password)=>{
    const response = await get(`users?email=${email}&password=${password}`);
    return response;
}
export const checkRegister = async (email)=>{
    const response = await get(`users?email=${email}`);
    return response;
}
export const newUser = async (option)=>{
    const response = await post(`users`,option);
    return response;
}