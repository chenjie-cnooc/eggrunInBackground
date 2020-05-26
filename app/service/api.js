'use strict';

const Service = require('egg').Service;

class HttpService extends Service {
    async curl(data) {
        let result = {};
        let response = await this.ctx.curl("https://getman.cn/api/request",{                
            method:"get",
            contentType:"json",
            data:data,
            timeout:30000,                      
            dataType:"json"
        });            
        if(response.status==200){
            result.code=200;
            result.data=response.data;
        }else{
            result.code=response.status;
            result.message=response.res.statusMessage;
            result.response=response;
        }
        return result;  
    } 
}


module.exports = HttpService;