import { createSlice } from "@reduxjs/toolkit";
const auth = createSlice({
    name:"authSlice",
    initialState:{
        login:{
            currentUser: null,
            isFetching: false,
            error: false,
            isAdmin: null

        },
        register:{
            isFetching: false,
            error: false,
            success: false
        },
        logout:{
            isFetching: false,
            error: false,
        }
    },
    reducers:{
        loginStart:(state) =>{
            state.login.isFetching= true
        },
        loginSuccess:(state,action) =>{
            state.login.isFetching=true
            state.login.currentUser= action.payload;
            state.login.error = false
            state.login.isAdmin = action.payload.isAdmin;
        },
        loginFailed: (state) =>{
            state.login.isFetching = false
            state.login.error = true
        },
        registerStart:(state) =>{
            state.register.isFetching= true
        },
        registerSuccess:(state) =>{
            state.register.isFetching=false
            state.register.error = false
            state.register.success= true;
        },
        registerFailed: (state) =>{
            state.register.isFetching = false
            state.register.error = true
            state.register.success = false;
            
        },
        logoutStart:(state) =>{
            state.login.isFetching= true
        },
        logoutSuccess:(state) =>{
            state.login.isFetching=false
            state.login.currentUser= null;
            state.login.error = false
            state.login.isAdmin = true
        },
        logoutFailed: (state) =>{
            state.login.isFetching = false;
            state.login.error = false
            
        },

      
      
        
    }
})
export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
    
} = auth.actions
export default auth.reducer