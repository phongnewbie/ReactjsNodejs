 import bcrypt from 'bcrypt'
 import { Jwt } from 'jsonwebtoken'


export const userService = ({email,password}) =>{
    return new Promise((res,rej) =>{
        try {
           const isMail =  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)
           if(isMail){

           }
        } catch (error) {
            
        }
    })
}