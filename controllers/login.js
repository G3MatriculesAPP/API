'use strict'

const config = require('../config')
const MongoClient = require('mongodb').MongoClient;
const service = require('../services/index')

async function checkLogin(collection, req, res){
    
    // run()
    // Conecta con la MongoDB y hace una query con el correo y la contraseña pasadas desde
    // la APP y dependiendo del enlace a una coleccion u otra, la contraseña ya viene hasheada en MD5. 
    // Los resultados se guardan en un array, se contempla que los resultados siempre sean 0 o 1 asi 
    // que si la longitud de este es < 1 se manda STATUS 500 y si su longitud es 1, es decir, que ha
    // obtenido una coincidencia se manda STATUS 200 y se le envia al usuario un TOKEN generado.
  
    try{
  
        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        const login = await db.collection(collection).find({email: req.body.itEmail, pass: req.body.itPassword}).toArray();
        
        if(login.length < 1){
            res.status(500).send({ message: "Usuari/contrasenya incorrecta..."})
        }else{
            res.status(200).send({
                message: 'Te has logueado correctamente',
                token: service.createToken(login[0])
            });
            client.close();
        }
        
    }catch (e){
        console.error(e);
    }
    
}

  module.exports = {
    checkLogin
  }