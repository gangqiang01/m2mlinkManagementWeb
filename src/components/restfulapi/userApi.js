import {apiGet, apiPost, apiDelete} from "../../assets/js/baseApi";


let addUserApi = function(form){
    return new Promise((resolve, reject) => {
        let data = {}
        data.name = form.username
        data.passwd = form.password
        apiPost('/user', data).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
}

let deleteUserApi = function(uid){
    return new Promise((resolve, reject) => {

        apiDelete('/user/'+uid).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
}

let getAllUserInfoApi = function(data){
    return new Promise((resolve, reject) => {
        apiGet('/user', data).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
}

let getUserInfoApi = function(uid){
    return new Promise((resolve, reject) => {

        apiGet('/user/'+uid).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
}

export {
    getAllUserInfoApi,
    deleteUserApi,
    getUserInfoApi,
    addUserApi
}