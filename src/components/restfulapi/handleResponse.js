

let handleResponse = function(res, cb, errcb){
    _g.closeGlobalLoading();
    if(res === undefined){
        console.error("data is undefined")
        return;
    }
    if(res.status != 401){
        cb(res.data)
    }else{
        if(typeof(errcb) == 'function'){
            errcb()
        }
        handleError(res)
    }
};
let handleError = function(res) {
    switch (res.status) {
        case 401:
            swal("","Login expired","error").then((val) =>{
                if(val){
                    router.replace("/");
                }
            });
            
            break
        default :
            console.log(res)
    }
}
export default handleResponse;