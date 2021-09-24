module.exports = (Post, Account)=>{
    // Methods
    const create = (req, res, next)=>{
        // Data diperlukan : account_id, caption, image

        // Find account
        Account.findOne({__id: req.body.account_id}, (err, data)=>{
            if(err){
                res.status(500).send(err || "Terjadi kesalahan");
                return
            }

            if(!data){
                res.status(500).send("Akun tidak ditemukan");
                return
            }

            // Account found, save post to database
            const newPost = new Post({
                ...req.body,
                image: "/download/" + req.file.filename
            });
            newPost.save((err)=>{
                if(err){
                    res.status(500).send(err.message || "Terjadi kesalahan");
                    return
                }
                res.json({success: 1, data: newPost});
            })
        })
    }

    const findAll = (req, res)=>{
        // Data diperlukan : -
        Post.find((err, data)=>{
            if (err) {
                res.status(500).send(err.message || "Terjadi kesalahan");
                return;
            }
            res.json({success: 1, data: data});
        })
    }

    const findById = (req, res)=>{
        // Data diperlukan : -
        const post_id = req.params.post_id;
        Post.findOne({__id: post_id}, (err, data)=>{
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
        // optional : account_id, caption
        const post_id = req.params.post_id;
        const new_post = req.body;
        Post.findOne({post_id: post_id}, (err, data)=>{
            if (err || !data) {
                res.status(500).send(err.message || "Terjadi kesalahan, postingan tidak ditemukan");
                return;
            }

            Object.keys(new_post).forEach(key=>{
                data[key] = new_post[key]
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

    const deleteById = (req, res)=>{
        // Data diperlukan : -
        const post_id = req.params.post_id;
        Post.deleteOne({post_id: post_id}, (err)=>{
            if (err) {
                res.status(500).send(err.message || "Terjadi kesalahan");
                return;
            }
            res.json({success: 1, id_deleted: post_id})
        });
    }

    return {
        findAll,
        create,
        findById,
        edit,
        deleteById
    }
}