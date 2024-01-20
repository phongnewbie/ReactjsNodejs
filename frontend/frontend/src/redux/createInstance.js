import axios from "axios";
import { config } from "process";

import { jwtDecode } from "jwt-decode";
import { loginSuccess } from "./auth";


const refreshToken = async() =>{
    try {
        const res = await axios.post("/routes/apiLogin/refresh",{
        withCredentials: true,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};


 
export const createAxios =(user,dispatch,stateSuccess)=>{
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async(config)=>{
            let date = new Date();
            const decodedToken = jwtDecode(user?.accessToken);
            if(decodedToken.exp < date.getTime()/1000){
                const data = await refreshToken();
                const refreshUser = {
                    ...user,accessToken:data.accessToken,
                };
                dispatch(stateSuccess(refreshUser));
                config.headers["token"] = "Bearer" +data.accessToken;
            }
            return config
        },
        (err) =>{
            return Promise.reject(err)
        }
    
    )
    return newInstance
}