'use strict'

const config = require('../config')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

async function readUFS(req, res){

    // readUFS
    // Consulta a la DB los datos de un ciclo completo y mediante un filtro devuelve
    // unicamente todas las UF de un MODULO especifico

    try{

        const filter = { moduls: {unitatsFormatives: { esProjecte: 1, esIdioma: 1, duradaUnitatFormativa: 1, codiUnitatFormativa: 1, nomUnitatFormativa: 1, esSintesis: 1, esFCT: 1}}}
        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        const login = await db.collection("cicles").find({"_id": new ObjectId(req.body.id)}).project(filter).toArray();
        
        if(login.length < 1){
            res.status(500).send({ message: "Imposible obtener los ciclos..."})
        }else{
            res.status(200).send({
                message: 'Ciclos obtenidos correctamente!',
                data: login[0].moduls[req.body.pos].unitatsFormatives
            });
            client.close();
        }
        
    }catch (e){
        console.error(e);
    }

}

module.exports = {
    readUFS
  }