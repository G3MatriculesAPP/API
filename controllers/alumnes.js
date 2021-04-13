'use strict'

const config = require('../config')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const authController = require('../services/index')
const jwt = require('jwt-simple')

async function insertOne(req, res){

}

async function insertMany(req, res){

    try{

        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');

        const array = req.body.data;
        const parsedArray = JSON.parse(array)

        console.log(parsedArray)

        await db.collection("alumnes").insertMany(parsedArray, function(err, rec){
            if(err) throw res.status(500).send();

            console.log("[DEBUG] - ALUMNE/S afegit correctament! :D")
            res.status(200).send()
            
        })

    }catch(e){
        console.error(e);
    }

}

async function readAll(req, res){
    
}

async function readAllByCicle(req, res){

    try{

        const filter = { _id: 1, nom: 1, primerCognom: 1, segonCognom: 1, dni: 1, email: 1}
        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        const login = await db.collection("alumnes").find({"convocatoria.ensenyament.nom": req.body.cicle}).project(filter).toArray();

        if(login.length < 1){
            res.status(500).send({ message: "Imposible obtener los ciclos..."})
        }else{
            res.status(200).send({
                message: 'Ciclos obtenidos correctamente!',
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

        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        const login = await db.collection("alumnes").find({"_id": new ObjectId(req.body.id)}).toArray();
        
        if(login.length < 1){
            res.status(500).send({ message: "Imposible obtener los moduls..."})
        }else{
            res.status(200).send({
                message: 'Moduls obtenidos correctamente!',
                data: login
            });
            client.close();
        }
        
    }catch (e){
        console.error(e);
    }
    
}

async function updateOne(req, res){
    
}

async function updateUF(req, res){

    try{

        var payload = ""
        authController.decodeToken(req.body.token)
        .then(response => {
            payload = jwt.decode(req.body.token, config.SECRET_TOKEN)
        })

        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        const array = req.body.data;
        const parsedArray = JSON.parse(array)
        await db.collection("alumnes").updateOne({"_id": new ObjectId(payload.sub)}, {$set: {"convocatoria.ensenyament.seleccioUF": parsedArray}}, function(err, rec){
            if(err) throw res.status(500).send();
            console.log("[DEBUG] - ALUMNE/S afegit correctament! :D")
            res.status(200).send({
                message: "UFS seleccionades guardades correctament!"
            })    
        })
    }catch(e){
        console.error(e);
    }

}

async function deleteOne(req, res){
    
}

async function deleteAll(req, res){
    
}

async function deleteAllByCicle(req, res){
    
}

module.exports = {
    insertOne,
    insertMany,
    readAll,
    readAllByCicle,
    readOne,
    updateOne,
    updateUF,
    deleteOne,
    deleteAll,
    deleteAllByCicle
}