var Validator = require("validator") // 主要验证信息是否符合要求
const isEmpty = require("./is-empty")

module.exports = function validateRegisterInput(data){
    let errors ={};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

     //利用第三方包里的validator.isLength判断名字长度最小2位不超过30位
    if(!Validator.isLength(data.name,{min:2,max:30})){
        errors.name = "名字的长度不能小于2位并且不能大于30位"
    }

    //判断名字不能为空
    if(Validator.isEmpty(data.name,{min:2,max:30})){
        errors.name = "名字不能为空！"
    }

    //验证邮箱不能为空
    if(Validator.isEmpty(data.email)){
        errors.email = "邮箱不能为空!"
    }

    //利用第三方包validator 里的isEmail验证邮箱是否合法
    if(!Validator.isEmail(data.email)){
        errors.email = "邮箱不合法!"
    }


    //判断密码不为空
    if(Validator.isEmpty(data.password)){
        errors.password = "密码不能为空!"
    }

     //利用第三方包里的validator.isLength判断密码长度最小2位不超过30位
    if(!Validator.isLength(data.password,{min:6,max:30})){
        errors.password = "密码的长度不能小于6位并且不能大于30位"
    }

        //判断确认密码不为空
    if(Validator.isEmpty(data.password2)){
        errors.password2 = "确认密码不能为空!"
    }

    //利用第三方包validator.equals判断两次密码是否一样
    if(!Validator.equals(data.password,data.password2)){
        errors.password2 ="两次密码不一样"
    }
    

    return{
        errors,
        isValid:isEmpty(errors)
    }
}