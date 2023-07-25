import { get } from "../utils/request"

export const getListQuestion = async (id)=>{
    const response = await get(`questions?topicId=${id}`);
    return response;
}