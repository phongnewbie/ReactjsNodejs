import {configureStore} from "@reduxjs/toolkit"
import authReducer from"./auth"
import likesReducer from "./reactReducer/likesReducer"
export default  configureStore({
    reducer:{
auth: authReducer,
likes: likesReducer
    }
})




