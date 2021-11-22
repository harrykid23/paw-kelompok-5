module.exports = (Account)=>{
    // Methods
    const login = (req, res)=>{
        if(!req.body){
            res.status(400).send({
                message: "Body tidak boleh kosong!"
            });
        }
    
        const user = {
            username: req.body.username,
            password: req.body.password
        }

        const sendToken = (userFound, res)=>{
            const {jwt, secretKey} = require('../jwt/authToken');
            const encryptedData = {account_id: userFound.__id, username: userFound.username};
            const accessToken = jwt.sign(encryptedData, secretKey, {expiresIn: '10m'});

            res.send({success: 1, accessToken: accessToken, account_id: userFound.__id})
        }

        Account.findOne({username: user.username, password: user.password}, (err, data)=>{
            if (err || !data) {
                Account.findOne({email: user.username, password: user.password}, (err2, data2)=>{
                    if (err2 || !data2){
                        res.status(500).send((err2 && err2.message) || "Terjadi kesalahan, akun tidak ditemukan");
                        return;
                    }else{
                        sendToken(data2, res);
                    }
                })
            }else{
                sendToken(data, res);
            }
        });
    }

    const getSelfAccount = (req, res)=>{
        // from jwt encryption
        const user = res.user;

        Account.findOne({__id: user.account_id}, (err, data)=>{
            if (err) {
                res.status(500).send(err.message || "Terjadi kesalahan");
                return;
            }
            if (!data){
                res.status(404).send("Data tidak ditemukan");
                return;
            }
            delete data.password;
            res.json({
                success: 1,
                data
            });
        });
    }

    const create = (req, res, next)=>{
        // Data diperlukan : username, email, password, name, profile_pic
        // optional : bio
        const newAccount = new Account({
            ...req.body,
            profile_pic: "/download/" + req.file.filename
        });
        newAccount.save((err)=>{
            if(err){
                res.status(500).send(err.message || "Terjadi kesalahan");
                return
            }
            res.json({success: 1});
        })
    }

    const findAll = (req, res)=>{
        // Data diperlukan : -
        Account.find((err, data)=>{
            if (err) {
                res.status(500).send(err.message || "Terjadi kesalahan");
                return;
            }
            res.json({success: 1, data: data});
        })
    }

    const findById = (req, res)=>{
        // Data diperlukan : -
        const account_id = req.params.account_id;
        Account.findOne({__id: account_id}, (err, data)=>{
            if (err) {
                res.status(500).send(err.message || "Terjadi kesalahan");
                return;
            }
            if (!data){
                res.status(404).send("Data tidak ditemukan");
                return;
            }
            res.json(data);
        });
    }

    const edit = (req, res)=>{
        // Data diperlukan : -
        // optional : username, email, password, name, bio
        const account_id = req.params.account_id;
        const new_account = req.body;
        Account.findOne({account_id: account_id}, (err, data)=>{
            if (err || !data) {
                res.status(500).send((err && err.message) || "Terjadi kesalahan, akun tidak ditemukan");
                return;
            }

            Object.keys(new_account).forEach(key=>{
                data[key] = new_account[key]
            })

            data.save((err)=>{
                if(err){
                    res.status(500).send(err.message || "Terjadi kesalahan");
                    return
                }
                res.json({success: 1, data: data});
            })
        });
    }
    
    const editProfilePic = (req, res)=>{
        // Data diperlukan : profile_pic
        const account_id = req.params.account_id;
        Account.findOne({__id: account_id}, (err, data)=>{
            if(err || !data){
                res.status(500).send(err.message || "Terjadi kesalahan");
                return
            }

            data.profile_pic = "/download/" + req.file.filename
            data.save((err)=>{
                if(err){
                    res.status(500).send(err.message || "Terjadi kesalahan");
                    return
                }
                res.json({success: 1});
            })
        });
    }

    const deleteById = (req, res)=>{
        // Data diperlukan : -
        const account_id = req.params.account_id;
        Account.deleteOne({account_id: account_id}, (err)=>{
            if (err) {
                res.status(500).send(err.message || "Terjadi kesalahan");
                return;
            }
            res.json({success: 1, id_deleted: account_id})
        });
    }

    return {
        login,
        getSelfAccount,
        findAll,
        create,
        findById,
        edit,
        deleteById,
        editProfilePic
    }
}