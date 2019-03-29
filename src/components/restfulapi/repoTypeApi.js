import {apiGet, apiPost, apiDelete} from "../../assets/js/baseApi";


let addRepoTypeApi = function({typename}){
    if(typename){
        let data = {
            typename
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

let deleteRepoTypeApi = function(rtid){
    return new Promise((resolve, reject) => {
        apiDelete('/repotype/'+ rtid).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
} 

let getRepoTypesApi = function(data){
    return new Promise((resolve, reject) => {
        apiGet('/repotype', data).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
}

let updateRepoTypeApi = function(data){
    return new Promise((resolve, reject) => {
        apiPost('/repotype/'+ rtid, data).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
}

export {
    addRepoTypeApi,
    deleteRepoTypeApi,
    getRepoTypesApi,
    updateRepoTypeApi
}