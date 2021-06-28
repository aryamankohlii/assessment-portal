import apiEndPoint from './endpoint'
import {GetUserToken} from './loginService/loginservice'

export const getQuestions=()=>{
    let token=GetUserToken();
    const requestOptions = {
        method: 'GET',
        headers: {
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + token,
                 }

    };

    return fetch(apiEndPoint.getendPoint()+'/question/', requestOptions)
}

export const getQuestionsById=(id)=>{
    let token=GetUserToken();
    const requestOptions = {
        method: 'GET',
        headers: {
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + token,
                 }

    };

    return fetch(apiEndPoint.getendPoint()+'/question/'+id, requestOptions)
}


export const updateQuestion=(data)=>{
    let token=GetUserToken();
    const requestOptions = {
        method: 'put',
        headers: {
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + token,
                 },
        body:JSON.stringify(data)

    };

    return fetch(apiEndPoint.getendPoint()+'/question/'+data.id, requestOptions)
}

export const saveQuestions=(data)=>{
    let token=GetUserToken();
    const requestOptions = {
        method: 'Post',
        headers: {
                     'Content-Type': 'application/json',
                     'Authorization': 'Bearer ' + token,
                 },
        body:JSON.stringify(data)

    };

    return fetch(apiEndPoint.getendPoint()+'/question/', requestOptions)
}



// export const getAnswersQuestionsById=(id)=>{
//     let token=GetUserToken();
//     const requestOptions = {
//         method: 'GET',
//         headers: {
//                      'Content-Type': 'application/json',
//                      'Authorization': 'Bearer ' + token,
//                  }

//     };

//     return fetch(apiEndPoint.getendPoint()+'/answers/question/'+id, requestOptions)
// }

// export const addUpdateQuestion=(data,qId)=>{

//     let token=GetUserToken();
//     if(qId>0)
//     {
//         const requestOptionsPut = {
//             method: 'Put',
//             headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': 'Bearer ' + token,
//                     }

//         };

//         return fetch(apiEndPoint.getendPoint()+'/question/', requestOptionsPut)
//     }
//     else{
       
//         const requestopt = {
//             method: 'POST',
//             headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': 'Bearer ' + token
//                     },
//                     body: JSON.stringify(data)

//         };

//         return fetch(apiEndPoint.getendPoint()+'/questionanswers', requestopt)
//     }
// }



export default {getQuestions,getQuestionsById,saveQuestions,updateQuestion};