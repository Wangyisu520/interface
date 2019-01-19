var Validator = require("validator") // 主要验证信息是否符合要求
const isEmpty = require("./is-empty")

module.exports = function validateExperienceInput(data){
    let errors ={};
     
    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    //验证个人经历不能为空
    if(Validator.isEmpty(data.title)){
        errors.title = "个人经历不能为空!"
    }

    //判断个人公司不为空
    if(Validator.isEmpty(data.company)){
        errors.company = "个人公司不能为空!"
    }

     //判断工作时间不为空
     if(Validator.isEmpty(data.from)){
        errors.from = "工作时间不能为空!"
    }

    return{
        errors,
        isValid:isEmpty(errors)
    }
}