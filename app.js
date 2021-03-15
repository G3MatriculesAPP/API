
const config = require('./config')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const service = require('./services/index')
const auth = require('./services/auth')

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
        const login = await db.collection(collection).find({EMAIL: req.body.itEmail, PASSWORD: req.body.itPassword}).toArray();
        
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
