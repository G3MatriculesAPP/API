'use strict'

const config = require('../config')
const MongoClient = require('mongodb').MongoClient;

function createCicles(req, res){
    

}

async function readCicles(req, res){
    
    try{

        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        const login = await db.collection("cicles").find({}).toArray();
        
        console.log(login)

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

function updateCicles(req, res){


}

function deleteCicles(req, res){


}


