import usermodel from '../model/UserModel'
import apiEndPoint from './endpoint'
import {GetUserToken} from './loginService/loginservice'
export const getusers=()=>{
    let token=GetUserToken();
    const requestOptions = {
        method: 'GET',
        headers: {
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + token,
                 }

    };

    return fetch(apiEndPoint.getendPoint()+'/user/', requestOptions)
}

export const getuserByid=(id)=>{
    let token=GetUserToken();
    const requestOptions = {
        method: 'GET',
        headers: {
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + token,
                 }

    };

    return fetch(apiEndPoint.getendPoint()+'/user/'+id, requestOptions)
}

export const AddUpdate=(id,name,email,password,isEmailVerified,isActive,roleid)=>{
    let token=GetUserToken();
   
    if(id==0)
    {
        
        const requestOptions = {
            method: 'Post',
            headers: {
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer ' + token
                     },
            body: JSON.stringify({'id':id,'name':name,'email':email,'password':password,'isEmailVerified':isEmailVerified,'isActive':isActive,'roleid':roleid})
    
        };
     return fetch(apiEndPoint.getendPoint()+'/user', requestOptions)
    }
    else
    {
        const requestOptions = {
            method: 'PUT',
            headers: {
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer ' + token
                     },
            body: JSON.stringify({'id':id,'name':name,'email':email,'password':password,'isEmailVerified':isEmailVerified,'isActive':isActive,'roleid':roleid})
    
        };

     return fetch(apiEndPoint.getendPoint()+'/user/'+id, requestOptions)
    }
}

export default {getusers,getuserByid,AddUpdate};
