'use strict'

const config = require('../config')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const authController = require('../services/index')
const jwt = require('jwt-simple')



async function insertOne(req, res){

    try{

        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        const array = req.body.data;
        const parsedArray = JSON.parse(array)
        await db.collection("cicles").insertOne(parsedArray, function(err, rec){
            if(err) throw res.status(500).send();
                console.log("[DEBUG] - CICLE/S afegit correctament! :D")
                res.status(200).send()   
        })

    }catch(e){
        console.error(e);
    }

}


async function insertMany(req, res){

    // insertMany()
    // Recibe un JSON de la APP con CICLES y los añade todos a la DB, los datos ya vienen parseados y filtrados por el usuario
    
    try{

        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');

        const array = req.body.data;
        const parsedArray = JSON.parse(array)

        console.log(parsedArray)

        await db.collection("cicles").insertMany(parsedArray, function(err, rec){
            if(err) throw res.status(500).send();

            console.log("[DEBUG] - CICLE/S afegit correctament! :D")
            res.status(200).send()
            
        })

    }catch(e){
        console.error(e);
    }


}

async function readOneByAlumne(req, res){

    try{

        var payload = ""
        authController.decodeToken(req.body.token)
        .then(response => {
            payload = jwt.decode(req.body.token, config.SECRET_TOKEN)
        })

        var cicleAlumne = "";
        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        const login = await db.collection("alumnes").find({"_id": new ObjectId(payload.sub)}).toArray();
        if(login.length < 1){
            res.status(500).send({ message: "Imposible obtener el alumno..."})
        }else{
            cicleAlumne = login[0].convocatoria.ensenyament.nom;
            const filter = { _id: 1, nom: 1, moduls: {nomModul: 1, codiModul: 1, unitatsFormatives: { nomUnitatFormativa: 1}} }
            const cicle = await db.collection("cicles").find({"nom": cicleAlumne}).project(filter).toArray();
            if(cicle.length < 1){
                res.status(500).send({ message: "Imposible obtener el ciclo del alumno..."})
            }else{
                res.status(200).send({
                    message: 'Ciclo del alumno obtenido correctamente!',
                    data: cicle[0]
                });
                client.close();
            } 
        }               
    }catch (e){
        console.error(e);
    }

}

async function readOne(req, res){
    
    try{
        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        const cicle = await db.collection("cicles").find({"_id": new ObjectId(req.body.id)}).toArray();
        if(cicle.length < 1){
            res.status(500).send({ message: "Imposible obtener el ciclo"})
        }else{
            res.status(200).send({
                message: 'Ciclo obtenido correctamente!',
                data: cicle[0]
            });
            client.close();
        }               
    }catch (e){
        console.error(e);
    }
}

async function readCicles(req, res){

    // readCicles()
    // Conecta con la MongoDB y realiza una query para obtener todos los objetos dentro de la coleccion,
    // mediante un filtro devuelve al destinatario la información de cada ciclo, sin sus modulos ni UF
    
    try{

        const filter = { hores: 1, nom: 1, dataInici: 1, codi: 1, codiAdaptacioCurricular: 1}
        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        const login = await db.collection("cicles").find().project(filter).toArray();
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

async function updateOne(req, res){
    
    try{
        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        var cicleObj = JSON.parse(req.body.data)
        var idCicle = cicleObj._id;
        console.log(idCicle);
        delete cicleObj._id;

        await db.collection("cicles").replaceOne({"_id": new ObjectId(idCicle)}, cicleObj, {upsert: true} ,function(err, rec){
            if(err) throw res.status(500).send();
            res.status(200).send({
                message: "Cicle actualitzat correctament!"
            })    
        })
    }catch(e){
        console.log(e)
    }
}

async function updateCicles(req, res){

}

async function deleteOne(req, res){

    try{
        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        await db.collection("cicles").deleteOne({"_id": new ObjectId(req.body.id)}, function(err, rec){
            if(err) throw res.status(500).send();
            res.status(200).send({
                message: "Cicle eliminat correctament!"
            })    
        })
    }catch(e){
        console.log(e)
    }

}

async function deleteMany(req, res){

}

async function deleteAll(req, res){

}

module.exports = {
    insertOne,
    insertMany,
    readCicles,
    readOne,
    readOneByAlumne,
    updateOne,
    updateCicles,
    deleteOne,
    deleteMany,
    deleteAll
  }