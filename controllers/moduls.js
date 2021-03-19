'use strict'

const config = require('../config')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

async function readModuls(req, res){

    // readModuls()
    // Conecta con la MongoDB y realiza una query para obtener todos los modulos de un ciclo específico y los deuvelve 
    // en forma de array.

    try{

        const filter = { moduls: {duradaMinModul: 1, duradaMaxModul: 1, dataIniciModul: 1, nomModul: 1, dataFiModul: 1, codiModul: 1}}
        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        const login = await db.collection("cicles").find({"_id": new ObjectId(req.body.id)}).project(filter).toArray();
        
        if(login.length < 1){
            res.status(500).send({ message: "Imposible obtener los ciclos..."})
        }else{
            res.status(200).send({
                message: 'Ciclos obtenidos correctamente!',
                data: login[0].moduls
            });
            client.close();
        }
        
    }catch (e){
        console.error(e);
    }

}

module.exports = {
    readModuls
  }