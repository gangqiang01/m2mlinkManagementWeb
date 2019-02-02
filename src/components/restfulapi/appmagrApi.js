import {apiGet, apiPost, apiPostfile, apiDelete} from "../../assets/js/baseApi";


let addAppApi = function(data){
    let config = {
        headers: {'Content-Type': 'multipart/form-data'}
    };
    return new Promise((resolve, reject) => {
        apiPostfile('/repoapps', data, config).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
}

let deleteAppApi = function(rfid){
    return new Promise((resolve, reject) => {
        apiDelete('/repoapps/'+rfid).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
} 

let getAppsApi = function(data){
    return new Promise((resolve, reject) => {
        apiGet('/repoapps', data).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
}

let updateAppsApi = function(data){
    apiPost('/repoapps/'+rfid, data).then((data) => {
        resolve(data)
    }).catch((error) => {
        resolve(err.response)
    })
}

export {
    addAppApi,
    deleteAppApi,
    getAppsApi,
    updateAppsApi
}