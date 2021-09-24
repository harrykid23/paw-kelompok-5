module.exports = ()=>{
    const download = (req, res)=>{
        const filename = req.params.filename;
        res.download(`${__dirname}/../uploads/`+filename);
    }

    return {
        download
    }
}