import {apiGet, apiPost, apiPostfile, apiDelete} from "../../assets/js/baseApi";


let addBspApi = function({ 
    address, 
    filename, 
    boardname, 
    versionname, 
    rid, 
    description=""}){
    return new Promise((resolve, reject) => {
        if(address && versionname && boardname && rid){
            let data = {
                address, 
                boardname, 
                versionname , 
                rid, 
                description
            }
            apiPost('/repobsps', data).then((data) => {
                resolve(data)
            }).catch((error) => {
                resolve(err.response)
            })
        }else{
            console.error(" incorrect parameters")
        }
       
    })
}

let addBspFileApi = function(file, file_md5, {boardname, versionname, rid, description}){
    let formdata = new FormData();
    if(file && rid){
        formdata.append("file_md5", file_md5);
        formdata.append("file", file);
        formdata.append("rid", rid);
        formdata.append("description", description);
        formdata.append("boardname", boardname);
        formdata.append("versionname", versionname);
        let config = {
            headers: {'Content-Type': 'multipart/form-data'}
        };
        return new Promise((resolve, reject) => {
            apiPostfile('/addBspFile', formdata, config).then((data) => {
                resolve(data)
            }).catch((error) => {
                resolve(err.response)
            })
        })
    }else{
        console.error(" incorrect parameters")
    }
    
}
let deleteBspApi = function(rbid){
    return new Promise((resolve, reject) => {
        apiDelete('/repobsps/'+rbid).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
} 

let getBspsApi = function({keywords, currentpage, limit}){
    let data = {
        keywords, 
        currentpage, 
        limit
    }
    return new Promise((resolve, reject) => {
        apiGet('/repobsps', data).then((data) => {
            resolve(data)
        }).catch((error) => {
            resolve(err.response)
        })
    })
}

let updateBspsApi = function(data){
    apiPost('/repobsps/'+rfid, data).then((data) => {
        resolve(data)
    }).catch((error) => {
        resolve(err.response)
    })
}

export {
    addBspApi,
    deleteBspApi,
    getBspsApi,
    updateBspsApi,
    addBspFileApi
}