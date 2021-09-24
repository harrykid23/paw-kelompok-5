module.exports = (Account)=>{
    // Methods
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
                res.status(500).send(err.message || "Terjadi kesalahan, akun tidak ditemukan");
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
        findAll,
        create,
        findById,
        edit,
        deleteById,
        editProfilePic
    }
}