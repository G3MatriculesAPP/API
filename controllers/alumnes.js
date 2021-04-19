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
        const filter = { _id: 1, nom: 1, primerCognom: 1, segonCognom: 1, dni: 1, email: 1, nie: 1}
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
            res.status(500).send({ message: "Imposible obtener el alumno..."})
        }else{
            res.status(200).send({
                message: 'Alumno obtenido correctamente!',
                data: login
            });
            client.close();
        }
        
    }catch (e){
        console.error(e);
    }
    
}

async function updateOne(req, res){

    try{
        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        var alumneObj = JSON.parse(req.body.data)
        var idAlumne = alumneObj._id;
        delete alumneObj._id;
        await db.collection("alumnes").replaceOne({"_id": new ObjectId(idAlumne)}, alumneObj, {upsert: true} ,function(err, rec){
            if(err) throw res.status(500).send();
            res.status(200).send({
                message: "Alumne actualitzat correctament!"
            })    
        })
    }catch(e){
        console.log(e)
    }
    
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
            res.status(200).send({
                message: "UFS seleccionades guardades correctament!"
            })    
        })
    }catch(e){
        console.error(e);
    }

}

async function deleteOne(req, res){

    try{
        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        await db.collection("alumnes").deleteOne({"_id": new ObjectId(req.body.id)}, function(err, rec){
            if(err) throw res.status(500).send();
            res.status(200).send({
                message: "Alumne eliminat correctament!"
            })    
        })
    }catch(e){
        console.log(e)
    }
    
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