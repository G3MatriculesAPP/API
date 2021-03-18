
const config = require('./config')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const service = require('./services/index')
const auth = require('./services/auth')
const cicles = require('./services/cicles.js')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) =>{
    res.send('<html><body></body></html>')
})

app.get('/api/auth', auth, (req, res, next) => {
    res.status(200).send({ message: 'Tienes acceso' })
})

app.post('/admin/login',(req, res) => {
    run("admins", req, res);
})

app.post('/alum/login',(req, res) => {
    run("alumnes", req, res);
})

// SPRINT 2

// CREATE
app.post('/api/cicles', (req, res) => {
    cicles.createCicles(req, res);
})

// READ
app.get('/api/cicles', (req, res) => {
    readCicles(req, res);

})

// UPDATE
app.put('/api/cicles', (req, res) => {
    cicles.updateCicles(req, res);

})

// DELETE
app.delete('/api/cicles', (req, res) => {
    cicles.deleteCicles(req, res);

})

async function run(collection, req, res){
    
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

app.listen(config.port, () => {
    console.log('[SERVER] - Listening at: http://localhost:' + config.port)
})

async function readCicles(req, res){
    
    try{

        const projection = { hores: 1, nom: 1, dataInici: 1, codi: 1, codiAdaptacioCur_: 1}
        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        const login = await db.collection("cicles").find().project(projection).toArray();
        
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
