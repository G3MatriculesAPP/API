'use strict'

const config = require('../config')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

async function insertOne(req, res){

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

async function updateOne(req, res){

}

async function deleteOne(req, res){

}

async function deleteAll(req, res){

}

module.exports = {
    insertOne,
    readAll,
    readOne,
    updateOne,
    deleteOne,
    deleteAll
}