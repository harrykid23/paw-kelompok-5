const jwt = require("jsonwebtoken");
const secretKey = "e6fca938a3283c53ac053e8919ca8ffb4050c7116d2ee799de754651e746791548ef5632528c4efe362adeb726846067fb7658a5efe1c896ea0e917b3acb5c5e";
const validateToken = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(token==null){
        return res.status(401).send({
            message: "No token"
        })
    }

    jwt.verify(token, secretKey, (err, user)=>{
        if(err) return res.status(403).send({
            message: err
        })

        res.user = user;
        next();
    });
}

module.exports = {jwt, validateToken, secretKey}