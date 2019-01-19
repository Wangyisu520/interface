const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    handle:{
        type: String,
        required: true,
        max: 40
    },
    company:{
        type: String
    },
    website:{
        type: String
    },
    location:{
        type: String
    },
    status:{
        type: String,
        required: true
    },
    skills:{
        type: [String],
        required: true
    },
    bio:{
        type: String
    },
    githubusername:{
        type: String
    },
    experience:[
        {
            current:{
                type: Boolean,
                default: true
            },
            title:{
                type: String,
                require: true
            },
            company:{
                type: String,
                require: true
            },
            location:{
                type: String
            },
            from:{
                type: String,
                require: true
            },
            to:{
                type: String
            },
            description:{
                type: String
            },
        }
    ],
    education:[
        {
            current:{
                type: Boolean,
                default: true
            },
            school:{
                type: String,
                require: true
            },
            degree:{
                type: String,
                require: true
            },
            fieldofstudy:{
                type: String
            },
            from:{
                type: String,
                require: true
            },
            to:{
                type: String
            },
            description:{
                type: String
            },
        }
    ],
    social:{
        wechat:{
            type: String
        },
        QQ:{
            type: String
        },
        tengxunkt:{
            type: String
        },
        wanyikt:{
            type: String
        },
    },
    date:{
        type:Date,
        default: Date.now
    },
})

module.exports = Profile = mongoose.model("profile",ProfileSchema)