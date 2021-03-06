const AccountModel = (mongoose)=>{
    const COLLECTION = 'accounts';
    const MODEL_NAME = 'Account';
    const Schema = new mongoose.Schema({
        username: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        profile_pic: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            default: ""
        },
        follower:{
            type:Number,
            default:0
        },
        following:{
            type:Number,
            default:0
        },
        isPrivate:{
            type: Boolean,
            default:false
        }
    }, { collection: COLLECTION });
    return mongoose.model(MODEL_NAME, Schema);
}

module.exports = AccountModel;