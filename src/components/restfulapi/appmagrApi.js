import {apiGet, apiPost, apiPostfile, apiDelete} from "../../assets/js/baseApi";


let addAppApi = function(file, {rid, description, website, license, summary}){
    let formdata = new FormData();
    if(file && rid){
        formdata.append("file", file);
        formdata.append("rid", rid);
        formdata.append("description", description);
        formdata.append("website", website);
        formdata.append("license", license);
        formdata.append("summary", summary);
        let config = {
            headers: {'Content-Type': 'multipart/form-data'}
        };
        return new Promise((resolve, reject) => {
            apiPostfile('/repoapps', formdata, config).then((data) => {
                resolve(data)
            }).catch((error) => {
                resolve(err.response)
            })
        })
    }else{
        console.error(" incorrect parameters")
    }
    
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