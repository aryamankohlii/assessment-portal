import apiEndPoint from './endpoint'
import {GetUserToken} from './loginService/loginservice'

export const getassesmentArea=()=>{
    let token=GetUserToken();
    const requestOptions = {
        method: 'GET',
        headers: {
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + token,
                 }

    };

    return fetch(apiEndPoint.getendPoint()+'/assesmentArea/', requestOptions)
}

export const getassesmentAreaByid=(id)=>{
    let token=GetUserToken();
    const requestOptions = {
        method: 'GET',
        headers: {
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + token,
                 }

    };

    return fetch(apiEndPoint.getendPoint()+'/assesmentArea/'+id, requestOptions)
}

export const AddUpdate=(data)=>{
    let token=GetUserToken();
   
    if(data.id==0)
    {
        
        const requestOptions = {
            method: 'Post',
            headers: {
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer ' + token
                     },
            body: JSON.stringify(data)
    
        };
     return fetch(apiEndPoint.getendPoint()+'/assesmentArea', requestOptions)
    }
    else
    {
        const requestOptions = {
            method: 'PUT',
            headers: {
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer ' + token
                     },
            body: JSON.stringify(data)
    
        };

     return fetch(apiEndPoint.getendPoint()+'/assesmentArea/'+data.id, requestOptions)
    }
}

export const getActiveassesmentArea=(isActive)=>{
    let token=GetUserToken();
    const requestOptions = {
        method: 'GET',
        headers: {
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + token,
                 }

    };

    return fetch(apiEndPoint.getendPoint()+'/assesmentArea/active/'+isActive, requestOptions)
}

export default {getassesmentArea,getassesmentAreaByid,AddUpdate,getActiveassesmentArea};