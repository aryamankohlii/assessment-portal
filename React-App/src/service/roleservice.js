import rolemodel from '../model/rolemodel'
import apiEndPoint from './endpoint'
import {GetUserToken} from './loginService/loginservice'
export const getroles=()=>{
    let token=GetUserToken();
    const requestOptions = {
        method: 'GET',
        headers: {
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + token,
                 }

    };

    return fetch(apiEndPoint.getendPoint()+'/role/', requestOptions)
}

export const getrolesByid=(id)=>{
    let token=GetUserToken();
    const requestOptions = {
        method: 'GET',
        headers: {
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + token,
                 }

    };

    return fetch(apiEndPoint.getendPoint()+'/role/'+id, requestOptions)
}

export const AddUpdate=(id,role,isactive)=>{
    let token=GetUserToken();
   
    if(id==0)
    {
        
        const requestOptions = {
            method: 'Post',
            headers: {
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer ' + token
                     },
            body: JSON.stringify({'id':id,'role':role,'isactive':isactive})
    
        };
     return fetch(apiEndPoint.getendPoint()+'/role', requestOptions)
    }
    else
    {
        const requestOptions = {
            method: 'PUT',
            headers: {
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer ' + token
                     },
            body: JSON.stringify({'id':id,'role':role,'isactive':isactive})
    
        };

     return fetch(apiEndPoint.getendPoint()+'/role/'+id, requestOptions)
    }
}

export const getActiveRoles = (isActive)=>{
    let token=GetUserToken();
    const requestOptions = {
        method: 'GET',
        headers: {
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + token,
                 }

    };

    return fetch(apiEndPoint.getendPoint()+'/role/active/'+isActive, requestOptions)
}
export default {getroles,getrolesByid,AddUpdate,getActiveRoles};
