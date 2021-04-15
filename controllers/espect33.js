const cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'matriculesapp', 
    api_key: '369193188672646', 
    api_secret: 'so54IGOFNqjL0aTZcY4FSr-MQ3Y' 
});

async function uploadReq(req, res){
    try{

        var validate = false;
        var payload = ""
        await authController.decodeToken(req.body.token)
        .then(response => {
            validate = true;
            payload = jwt.decode(req.body.token, config.SECRET_TOKEN)
        })

        if(validate){
            const fileStr = req.body.file;
            var result = await cloudinary.v2.uploader.upload(fileStr, {
                public_id: "uploads/requisits/" + payload.sub + "_" + req.body.reqName,
                overwrite: true
            });
            console.log(result)
            res.status(200).send({
                message: "Fichero subido correctamente!"
            })
        }else{
            console.log("Token invalido...");
            res.status(500).send("Error....")
        }        
    }catch (err) {
        console.log(err)
        res.status(500).send("Error....")
    }
}
cloudinary.imageTag('uploads/requisits/60759e32d94f3900041bb3b1_Document%20per%20davant.jpg').toHtml();