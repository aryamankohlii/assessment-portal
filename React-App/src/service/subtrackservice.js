
import apiEndPoint from './endpoint'
import {GetUserToken} from './loginService/loginservice'
export const getsubtrack=()=>{
    let token=GetUserToken();
    const requestOptions = {
        method: 'GET',
        headers: {
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + token,
                 }

    };

    return fetch(apiEndPoint.getendPoint()+'/subtrack/', requestOptions)
}

export const getsubtrackActive=()=>{
    let token=GetUserToken();
    const requestOptions = {
        method: 'GET',
        headers: {
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + token,
                 }

    };

    return fetch(apiEndPoint.getendPoint()+'/subtrack/', requestOptions)
}

export const getsubtrackByid=(id)=>{
    let token=GetUserToken();
    const requestOptions = {
        method: 'GET',
        headers: {
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + token,
                 }

    };

    return fetch(apiEndPoint.getendPoint()+'/subtrack/'+id, requestOptions)
}

export const addUpdate=(id,name,isactive,assesment_area_id)=>{
    let token=GetUserToken();
   
    if(id==0)
    {
        
        const requestOptions = {
            method: 'Post',
            headers: {
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer ' + token
                     },
            body: JSON.stringify({'id':id,'name':name,'isactive':isactive,'assesment_area_id':assesment_area_id})
    
        };
     return fetch(apiEndPoint.getendPoint()+'/subtrack', requestOptions)
    }
    else
    {
        const requestOptions = {
            method: 'PUT',
            headers: {
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer ' + token
                     },
            body: JSON.stringify({'id':id,'name':name,'isactive':isactive,'assesment_area_id':assesment_area_id})
    
        };

     return fetch(apiEndPoint.getendPoint()+'/subtrack/'+id, requestOptions)
    }
}

export const getsubtrackByAssesmentid=(id)=>{
    let token=GetUserToken();
    const requestOptions = {
        method: 'GET',
        headers: {
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + token,
                 }

    };

    return fetch(apiEndPoint.getendPoint()+'/subtrack/assesmentarea/'+id, requestOptions)
}



export default {getsubtrackByid,getsubtrack,addUpdate,getsubtrackActive,getsubtrackByAssesmentid};
