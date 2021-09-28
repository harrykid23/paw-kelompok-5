module.exports = (Comment,Post,Account) =>{


    const create = (req,res,next)=>{
        //Data diperlukan: post_id,account_id,comment
        
        //Find account related
        Account.findOne({__id:req.body.account_id},(err,data)=>{
            
            if(err){
                res.status(500).send(err || "Terjadi kesalahan");
                return
            }

            if(!data){
                res.status(500).send("Akun tidak ditemukan");
                return
            }

            //if account_id exist, next check post_id related
            Post.findOne({__id:req.body.post_id},(err,data)=>{
                if(err){
                    res.status(500).send(err || "Terjadi kesalahan");
                    return
                }
    
                if(!data){
                    res.status(500).send("Post tidak ditemukan");
                    return
                }

                //if account and post exist, create comment
                const newComment = new Comment({
                    account_id : req.body.account_id,
                    post_id : req.body.post_id,
                    comment : req.body.comment
                })
                newComment.save((err)=>{
                    if(err){
                        res.status(500).send(err.message || "Terjadi kesalahan");
                        return
                    }
                res.json({success:1})
            });
            
            
            });
        });
        
    }


    const findAll = (req,res)=>{
        Comment.find((err,data)=>{
            if(err){
                res.status(500).send(err.message || "Terjadi kesalahan");
                return;
            }
            res.json({success:1,data:data})
        })
    }

    return{
        findAll,
        create
    }
}