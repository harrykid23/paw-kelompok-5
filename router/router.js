const router = (app, mongoose) => {
    // Multer, for image upload
    const multer = require('multer');
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads')
        },
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now() + ".png")
        }
    });
    const upload = multer({ storage: storage });
// tes
    // Account Model
    const Account = require('../models/Account.js')(mongoose);
    // Account Controller
    const AccountController = require('../controller/AccountController.js')(Account);
    // Account Route List
    app.get("/accounts", AccountController.findAll);
    app.get("/accounts/:account_id", AccountController.findById);
    app.post("/accounts", upload.single('profile_pic'), AccountController.create);
    app.put("/accounts/:account_id", AccountController.edit);
    app.put("/accounts/:account_id/profile_pic", upload.single('profile_pic'), AccountController.editProfilePic);
    app.delete("/accounts/:account_id", AccountController.deleteById);

    // Post Model
    const Post = require('../models/Post.js')(mongoose);
    // Post Controller
    const PostController = require('../controller/PostController.js')(Post, Account);
    // Post Route List
    app.get("/post", PostController.findAll);
    app.get("/post/:post_id", PostController.findById);
    app.post("/post", upload.single('image'), PostController.create);
    app.put("/post/:post_id", PostController.edit);
    app.delete("/post/:post_id", PostController.deleteById);

    // File Controller
    const FileController = require('../controller/FileController.js')();
    app.get("/download/:filename", FileController.download);
}

module.exports = router;