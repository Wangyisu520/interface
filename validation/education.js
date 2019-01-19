var Validator = require("validator") // 主要验证信息是否符合要求
const isEmpty = require("./is-empty")

module.exports = function validateEducationInput(data){
    let errors ={};
     
    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    //验证个人学校不能为空
    if(Validator.isEmpty(data.school)){
        errors.school = "个人学校不能为空!"
    }

    //判断个人学历不为空
    if(Validator.isEmpty(data.degree)){
        errors.degree = "个人学历不能为空!"
    }

    //判断个人专业不为空
    if(Validator.isEmpty(data.fieldofstudy)){
        errors.fieldofstudy = "个人专业不能为空!"
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