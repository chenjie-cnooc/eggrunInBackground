'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async test() {
    const { ctx } = this;
    ctx.runInBackground(async () => { // #1
      let result = await ctx.service.api.curl({a:1,b:2});
      //debugger;
      console.log(JSON.stringify(result)+"#1");
    }); 
    console.log("hi runInBackground #2")
    ctx.body = "hi runInBackground" ; // #2    
  }
}

module.exports = HomeController;
