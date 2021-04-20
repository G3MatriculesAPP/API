'use strict'

const config = require('../config')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const authController = require('../services/index')
const jwt = require('jwt-simple')

const cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'matriculesapp', 
    api_key: '369193188672646', 
    api_secret: 'so54IGOFNqjL0aTZcY4FSr-MQ3Y' 
});

async function updateAlumProfile(req, res){
    
    try{
        var payload = ""
        await authController.decodeToken(req.body.token)
        .then(response => {
            payload = jwt.decode(req.body.token, config.SECRET_TOKEN)
        })

        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        await db.collection("alumnes").updateOne({"_id": new ObjectId(payload.sub)}, {$set: {"perfilRequisits": req.body.nomPerfil, "estatRequisits": []}}, function(err, rec){
            if(err) throw res.status(500).send();
            res.status(200).send({
                message: "Perfil actualitzat correctament!"
            })    
        })
    }catch(e){
        console.error(e);
    }
}

async function insertOne(req, res){

    try{

        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');

        const array = req.body.data;
        const parsedArray = JSON.parse(array)

        console.log(parsedArray)

        await db.collection("perfilsRequeriments").insertOne(parsedArray, function(err, rec){
            if(err) throw res.status(500).send();
            console.log("[DEBUG] - PERFIL afegit correctament! :D")
            res.status(200).send()
        })

    }catch(e){
        console.error(e);
    }


}

async function readAll(req, res){

    try{

        const filter = { _id: 1, nom: 1, descripcio: 1}
        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        const login = await db.collection("perfilsRequeriments").find().project(filter).toArray();

        if(login.length < 1){
            res.status(500).send({ message: "Imposible obtener los perfiles..."})
        }else{
            res.status(200).send({
                message: 'Perfiles obtenidos correctamente!',
                data: login
            });
            client.close();
        }
        
    }catch (e){
        console.error(e);
    }

}

async function readOne(req, res){

    try{

        // const filter = {requeriments: {nomReq: 1, tipusReq: 1}}
        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        const login = await db.collection("perfilsRequeriments").find({"_id": new ObjectId(req.body.id)}).toArray();
        
        if(login.length < 1){
            res.status(500).send({ message: "Imposible obtener los requeriments..."})
        }else{
            res.status(200).send({
                message: 'Requeriments obtenidos correctamente!',
                data: login[0].requeriments
            });
            client.close();
        }
        
    }catch (e){
        console.error(e);
    }


}

async function readOneByAlumne(req, res){

    try {
        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        const login = await db.collection("perfilsRequeriments").find({"nom": req.body.nomPerfil}).toArray();
        if(login.length < 1){
            res.status(500).send({ message: "Imposible obtener los requeriments..."})
        }else{
            var filter = { estatRequisits: 1}
            const alumne = await db.collection("alumnes").find({"_id": new ObjectId(req.body.idAlumne)}).project(filter).toArray();
            if(alumne.length < 1){
                res.status(500).send({ message: "Imposible obtener los estados de requisitos del alumno..."})
            }else{
                res.status(200).send({
                    message: 'Requeriments obtenidos correctamente!',
                    data: login[0].requeriments,
                    alum: alumne[0]
                });
                client.close();
            }
            
        }
    } catch (error) {
        console.log(error);
    }

}

async function updateOne(req, res){

}

async function deleteOne(req, res){

}

async function deleteAll(req, res){

}

async function getRequisit(req, res){

    try {
        var requisit = await cloudinary.image("uploads/"+req.body.id+"/"+req.body.nomReq);
        console.log(requisit);
        res.status(200).send({
            message: "OK!",
            data: requisit
        })
    } catch (e) {
        console.log(e);
    }

}

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
            var reqName = req.body.reqName;
            reqName = reqName.replace(" ", "_");
            var result = await cloudinary.v2.uploader.upload(fileStr, {
                public_id: "uploads/" + payload.sub + "/" + reqName,
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

async function getStatus(req, res){
    try{

        var validate = false;
        var payload = ""
        await authController.decodeToken(req.body.token)
        .then(response => {
            validate = true;
            payload = jwt.decode(req.body.token, config.SECRET_TOKEN)
        })

        if(validate){
            const filter = { convocatoria: {estatSolicitud: 1}};
            const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
            const db = client.db('G3Matricules');

            const login = await db.collection("alumnes").find({"_id": new ObjectId(payload.sub)}).project(filter).toArray();
            console.log(login);
            
            res.status(200).send({
            
                result: login[0].convocatoria.estatSolicitud
            })
        }else{
            console.log("Token invalido...");
            res.status(500).send("Error....")
        }        
    }catch (err) {
        console.log(err)
        res.status(501).send("Error....")
    }
}

async function getStatusPerfil(req, res){

    try{
        var payload = ""
        await authController.decodeToken(req.body.token)
        .then(response => {
            payload = jwt.decode(req.body.token, config.SECRET_TOKEN)
        })

        const filter = {perfilRequisits: 1, estatRequisits: 1}
        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        const login = await db.collection("alumnes").find({"_id": new ObjectId(payload.sub)}).project(filter).toArray();

        const filterPerfil = {_id: 1};
        const perfil = await db.collection("perfilsRequeriments").find({"nom": login[0].perfilRequisits}).project(filterPerfil).toArray();

        if(login.length < 1){
            res.status(500).send({ message: "Imposible obtener el estado del perfil..."})
        }else{
            res.status(200).send({
                message: 'Estado del perfil obtenido correctamente!',
                data: login,
                dataPerfil : perfil
            });
            client.close();
        }

    }catch(e){
        console.log(e);
    }

}

async function updateStatus(req, res){

    try{
        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');

        var estatRequisits = [];
        estatRequisits = req.body.estatRequisits;
        await db.collection("alumnes").updateOne({"_id": new ObjectId(req.body.id)}, {$set: {"estatRequisits": estatRequisits}}, function(err, rec){
            if(err) throw res.status(500).send();
            res.status(200).send({
                message: "Estat dels requisits actualitzats correctament!"
            })    
        })
    }catch(e){
        console.error(e);
    }

}

module.exports = {
    insertOne,
    readAll,
    readOne,
    readOneByAlumne,
    updateOne,
    updateAlumProfile,
    deleteOne,
    deleteAll,

    getRequisit,
    uploadReq,

    getStatus,
    getStatusPerfil,
    updateStatus
}