var Validator = require("validator") // 主要验证信息是否符合要求
const isEmpty = require("./is-empty")

module.exports = function validateLoginInput(data){
    let errors ={};
     
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

//利用第三方包validator 里的isEmail验证邮箱是否合法
    if(!Validator.isEmail(data.email)){
        errors.email = "邮箱不合法!"
    }

    //验证邮箱不能为空
    if(Validator.isEmpty(data.email)){
        errors.email = "邮箱不能为空!"
    }

    //判断密码不为空
    if(Validator.isEmpty(data.password)){
        errors.password = "密码不能为空!"
    }

    return{
        errors,
        isValid:isEmpty(errors)
    }
}