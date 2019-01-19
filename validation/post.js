var Validator = require("validator") // 主要验证信息是否符合要求
const isEmpty = require("./is-empty")

module.exports = function validatePostInput(data){
    let errors ={};
     
    data.text = !isEmpty(data.text) ? data.text : '';



    //验证评论长度
    if(!Validator.isLength(data.text,{min:10,max:300})){
        errors.text = "评论不能少于10个字符并且不能超过300字符!"
    }

    //判断评论不为空
    if(Validator.isEmpty(data.text)){
        errors.text = "评论不能为空!"
    }

    return{
        errors,
        isValid:isEmpty(errors)
    }
}