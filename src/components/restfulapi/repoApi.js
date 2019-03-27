import {apiGet, apiPost, apiPostfile, apiDelete} from "../../assets/js/baseApi";


let addRepoApi = function({reponame , description= "" , type="", uid}){
    if(uid && reponame && type){
        let data = {
            reponame, 
            type,
            description ,
            uid
        }
        return new Promise((resolve, reject) => {
            apiPost('/repo', data).then((data) => {
                resolve(data)
            }).catch((error) => {
                resolve(err.response)
            })
        })
    }else{
        console.error(" incorrect parameters")
    }
    
}

let deleteRepoApi = function(rid){
    return new Promise((resolve, reject) => {
        apiDelete('/repo/'+ rid).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
} 

let getReposApi = function(data){
    return new Promise((resolve, reject) => {
        apiGet('/repo', data).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
}

let updateRepoApi = function(data){
    return new Promise((resolve, reject) => {
        apiPost('/repo/'+ rid, data).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
}

export {
    addRepoApi,
    deleteRepoApi,
    getReposApi,
    updateRepoApi
}