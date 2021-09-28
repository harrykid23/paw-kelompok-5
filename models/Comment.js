const CommentModel = (mongoose)=>{
    const COLLECTION = 'comments';
    const MODEL_NAME = 'Comment';
    const Schema = new mongoose.Schema({
        account_id: {
            type: String,
            required: true
        },
        post_id:{
            type: String,
            required:true
        },
        comment: {
            type: String,
            unique: true,
            required: true
        },
        time : {
            type : Date,
            default: Date.now
        }
    }, { collection: COLLECTION });
    return mongoose.model(MODEL_NAME, Schema);
}

module.exports = CommentModel;