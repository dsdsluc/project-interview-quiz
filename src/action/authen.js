export const authen = (isLogin)=>{
    return{
        type: "AUTHEN",
        isLogin: isLogin,
    }
}