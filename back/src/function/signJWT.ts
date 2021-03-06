import jwt from "jsonwebtoken";
import config from '../config/config'
import {IUser} from '../interface/user.interface'

const signJWT = (user:IUser,callback : (error:Error|null,token:string|null)=>void):void=>{
    var timeSinchEpoch=new Date().getTime()
    var expirationTime = timeSinchEpoch+Number(config.server.token.expireTime)*100000;
    var expirationTimeInSeconds = Math.floor(expirationTime/1000);

    try{
        jwt.sign(
            {
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            phone:user.phone,
            isAdmin:user.isAdmin
        },
        config.server.token.secret,
        {
            issuer:config.server.token.issuer,
            algorithm:'HS256',
            expiresIn:expirationTimeInSeconds,
        },
        (error,token)=>{
            if(error){
                callback(error,null);

            }else if(token){
              callback(null,token)
            }

        }
        )
    }catch(error:any){
        callback(error,null)

    }
}


export default signJWT;