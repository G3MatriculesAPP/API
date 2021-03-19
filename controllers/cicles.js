'use strict'

const config = require('../config')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

async function createCicles(req, res){

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

async function updateCicles(req, res){

}

async function deleteCicles(req, res){

}

module.exports = {
    createCicles,
    readCicles,
    updateCicles,
    deleteCicles
  }