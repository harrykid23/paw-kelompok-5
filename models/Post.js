const PostModel = (mongoose)=>{
    const COLLECTION = 'posts';
    const MODEL_NAME = 'Post';
    const Schema = new mongoose.Schema({
        account_id: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        caption: {
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

module.exports = PostModel;