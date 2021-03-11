
const config = require('./config')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const service = require('./services/index')
const MongoClient = require('mongodb').MongoClient;
const md5 = require('md5');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.send('<html><body></body></html>')
})

app.get('/alumnes/login', (req, res) => {
    res.send('<form method="POST"><label for="fname">DNI:</label><br><input type="email" id="fname" name="email"><br><label for="fpass">PASSWORD<label><br><input type="password" id="fpass" name="password"><input type="submit" value="Submit"></form>')
})

app.post('/alumnes/login',(req, res) => {
    run(req, res);
})

async function run(req, res){
    
    try{
        const client = await MongoClient.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
        const db = client.db('G3Matricules');
        const loginAlumn = await db.collection('alumnes').find({EMAIL : req.body.email, PASSWORD : md5(req.body.password)}).toArray();
        
        if(loginAlumn.length < 1){
            res.status(500).send({ message: "Usuari/contrasenya incorrecta..."})
        }else{
            res.status(200).send({
                message: 'Te has logueado correctamente',
                token: service.createToken(loginAlumn)
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
