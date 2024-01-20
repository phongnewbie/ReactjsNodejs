import axios from "axios"
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from "./auth"

export const loginUser = async(user,dispatch,navigate) =>{
    dispatch(loginStart());
    try {
        const res = await axios.post("http://localhost:8000/routes/apiLogin/login",user)
        console.log(user);
        dispatch(loginSuccess(res.data));
        console.log(res.data);
       
        if (res.data.isAdmin) {
            navigate("/AdminPage");
          } else {
            navigate("/");
          }
    } catch (error) {
       dispatch(loginFailed())
        console.log(error)
        
    }
}

export const registerUser = async(user,dispatch,navigate)=>{
    dispatch(registerStart())
    try {
       await axios.post("http://localhost:8000/routes/apiLogin/register",user);
        dispatch(registerSuccess());
     
        navigate("/login")
    } catch (error) {
        dispatch(registerFailed())
        console.log(error);
    }
}

// export const forgetPassword = async(req,res)=>{
//     const {email} = req.query 
//     if(!email) throw new Error("Missing email")
//     const user  = await User.findOne({email})
//     if(!user) throw new Error("User not found")
//     const 
// }

export const logOut = async(dispatch,navigate ,_id, accessToken, axiosJWT) =>{
    dispatch(logoutStart());
    try{
        await axiosJWT.post("http://localhost:8000/routes/apiLogin/logout",_id,{
            headers:{token:`Bearer ${accessToken}`}
        });
        dispatch(logoutSuccess())
        navigate("/login")
    }catch(err){
        dispatch(logoutFailed());
        console.log(err);
    }
}

