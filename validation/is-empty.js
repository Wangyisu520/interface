
//验证注册信息是否符合要求
const isEmpty = value =>{ 
    return value === undefined || value === null || 
            (typeof value === 'object' && Object.keys(value).length ===0) ||
            (typeof value === "string" && value.trim().length === 0)
}

module.exports = isEmpty