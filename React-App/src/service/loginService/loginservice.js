import userModel from '../../model/UserModel'
import apiEndPoint from '../endpoint'


  export  const ValidateUser=(username,password) =>{
   
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'email':username,'password':password})
    };

    return fetch(apiEndPoint.getendPoint()+'/auth-token', requestOptions)
    }
    

    export const SetUserSession=(userdata)=>
    {
        
        window.sessionStorage.setItem("UserData", JSON.stringify(userdata));
    }

    export  const GetUserSession=()=>
    {
     return JSON.parse(window.sessionStorage.getItem("UserData"));
    }

    export  const GetUserToken=()=>
    {
     let data = JSON.parse(window.sessionStorage.getItem("UserData"));
     return data.token
    }

    export  const getUserName=()=>
    {
     let data = JSON.parse(window.sessionStorage.getItem("UserData"));
     return data.name
    }

    export  const logout=()=>
    {
        window.sessionStorage.setItem("UserData", "");
    }


export default {ValidateUser,GetUserSession,SetUserSession,GetUserToken,getUserName,logout};