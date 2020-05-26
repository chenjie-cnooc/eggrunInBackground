'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async test() {
    const { ctx } = this;
    try {
      var result = {}, data, captcha;
      var username = this.ctx.request.body.username;
      var password = this.ctx.request.body.password;
      var captcha = this.ctx.session.captcha;
      var c = this.ctx.cookies.get("c", { signed: false });

      if (c) { //没有cookie的时候，将session.captcha清空 
        this.ctx.session.captcha = "";
        captcha = ""
      }


      var token = await ctx.service.api.curl({ a: 1, b: 2 });
      this.ctx.session.captcha = token;     

      let res =  await ctx.service.api.curl({ a: 1, b: 2 });
      result.userInfo = res;
      //记录登陆信息
     
      this.ctx.body = result;

      //记录登录日志
      this.ctx.runInBackground(async () => {
        // 这里面的异常都会统统被 Backgroud 捕获掉，并打印错误日志
        let response = await this.ctx.curl("https://getman.cn/api/request", {
          method: "get",
          contentType: "json",
          data: data,
          timeout: 30000,
          dataType: "json"
        });
        console.log(response);
      });

    } catch (e) {
      throw e;
    }

  }
}

module.exports = HomeController;
