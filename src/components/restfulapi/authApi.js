import {apiGet, apiPost} from "../../assets/js/baseApi";


let loginApi = function(username, password){
    return new Promise((resolve, reject) => {
        let data = {
            name: username,
            passwd: password  
        }
        apiPost('/login', data).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
}

export {
    loginApi
}