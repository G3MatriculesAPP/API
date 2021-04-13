
const config = require('./config')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const multer = require('multer');
const upload = multer();
const auth = require('./services/auth')

const ciclesController = require('./controllers/cicles')
const modulsController = require('./controllers/moduls')
const ufsController = require('./controllers/ufs')
const loginController = require('./controllers/login')
const alumnesController = require('./controllers/alumnes')
const perfilsController = require('./controllers/perfils')

app.use(bodyParser.urlencoded({limit: '1000mb', extended: true, parameterLimit: 1000000}));
app.use(bodyParser.json({limit: '1000mb', extended: true}));
app.use(cors());

app.listen(config.port, () => {
    console.log('[SERVER] - LISTO! // PORT: ' + config.port)
})

 /* ===============================================
  *                   SPRINT 1
  * ===============================================
  * /api/auth       - Revisar estado TOKEN y verificar si es válido o no
  * /admin/login    - Login para admins con consulta a la coleccion "admins"
  * /alum/login     - Login para alumnos con consulta a la coleccion "alumnes"
  * =============================================== */


  
app.get('/', (req, res) =>{
    res.send('<html><body></body></html>')
})

app.get('/api/auth', auth, (req, res, next) => {
    res.status(200).send({ message: 'Tienes acceso' })
})

app.post('/admin/login',(req, res) => {
    loginController.checkLogin("admins", req, res);
})

app.post('/alum/login',(req, res) => {
    loginController.checkLogin("alumnes", req, res);
})

 /* ===============================================
  *                   SPRINT 2
  * ===============================================
  * == CREATE ==
  * /api/cicles/insertOne   - Añade un cicles a la DB.
  * /api/cicles/insertMany  - Añade multiples cicles a la DB.
  * 
  * == READ ==
  * /api/cicles/readAll     - Obtiene todos los cicles en la DB.
  * /api/moduls/readAll     - Obtiene todos los moduls de un cicle en la DB.
  * /api/ufs/readAll        - Obtiene todas los UF de un modul de un cicle de la DB.
  * 
  * == UPDATE ==
  * /api/cicles/update      - Actualiza un cicle en la DB.
  * /api/moduls/update      - Actualiza un modul de un cicle en la DB.
  * /api/ufs/update         - Actualiza una uf de un modul de un cicle en la DB.
  * 
  * == DELETE ==
  * /api/cicles/deleteOne   - Elimina un cicle en la DB.
  * /api/cicles/deleteMany  - Elimina multiples cicles en la DB.
  * /api/cicles/deleteAll   - Elimina todos los cicles en la DB.
  * 
  * /api/moduls/deleteOne   - Elimina un modul de un cicle en la DB.
  * /api/moduls/deleteMany  - Elimina multiples moduls de un cicle en la DB.
  * /api/moduls/deleteAll   - Elimina todos los moduls de un cicle en la DB.
  * 
  * /api/ufs/deleteOne       - Elimina una uf de un modul de un cicle en la DB.
  * /api/ufs/deleteMany      - Elimina multiples ufs de un modul de un cicle en la DB.
  * /api/ufs/deleteAll       - Elimina todas las ufs de un modul de un cicle en la DB.
  * =============================================== */

 // === CREATE ===

app.post('/api/cicles/insertOne', (req, res) => {
    ciclesController.insertOne(req, res);
})

app.post('/api/cicles/insertMany', (req, res) => {
    ciclesController.insertMany(req, res);
})

// === READ ===

app.get('/api/cicles/readAll', (req, res) => {
    ciclesController.readCicles(req, res);
})

app.post('/api/moduls/readAll', (req, res) => {
    modulsController.readModuls(req, res);
})

app.post('/api/ufs/readAll', (req, res) => {
    ufsController.readUFS(req, res);
})

// === UPDATE ===

app.put('/api/cicles/update', (req, res) => {
    ciclesController.updateCicles(req, res);
})

app.put('/api/moduls/update', (req, res) => {
    modulsController.updateModuls(req, res);
})

app.put('/api/ufs/update', (req, res) => {
    ufsController.updateUFS(req, res);
})

// === DELETE ===

app.delete('/api/cicles/deleteOne', (req, res) => {
    ciclesController.deleteOneCicle(req, res);
})

app.delete('/api/cicles/deleteMany', (req, res) => {
    ciclesController.deleteManyCicles(req, res);
})

app.delete('/api/cicles/deleteAll', (req, res) => {
    ciclesController.deleteAllCicles(req, res);
})

app.delete('/api/moduls/deleteOne', (req, res) => {
    modulsController.deleteOneModul(req, res);
})

app.delete('/api/moduls/deleteMany', (req, res) => {
    modulsController.deleteManyModuls(req, res);
})

app.delete('/api/moduls/deleteAll', (req, res) => {
    modulsController.deleteAllModuls(req, res);
})

app.delete('/api/ufs/deleteOne', (req, res) => {
    ufsController.deleteOneUF(req, res);
})

app.delete('/api/ufs/deleteMany', (req, res) => {
    ufsController.deleteManyUFS(req, res);
})

app.delete('/api/ufs/deleteAll', (req, res) => {
    ufsController.deleteAllUFS(req, res);
})

 /* ===============================================
  *                   SPRINT 3
  * === ALUMNES ===
  * 
  * == CREATE ==
  * /api/alumnes/insertOne          - Inserta un nuevo ALUMNO a la DB
  * /api/alumnes/insertMany         - Inserta un JSON con datos de ALUMNOS a la DB
  * 
  * == READ ==
  * /api/alumnes/readAll            - Obtiene todos los ALUMNOS de la DB 
  * /api/alumnes/readAllByCicle     - Obtiene todos los ALUMNOS de un CICLO de la DB
  * /api/alumnes/readOne            - Obtiene todos los datos de un ALUMNO
  * 
  * == UPDATE ==
  * /api/alumnes/updateOne          - Actualiza un ALUMNO de la DB
  * 
  * == DELETE
  * /api/alumnes/deleteOne          - Elimina un ALUMNO de la DB
  * /api/alumnes/deleteAll          - Elimina todos los ALUMNOS de la DB
  * /api/alumnes/deleteAllByCicle   - Elimina todos los ALUMNOS de un CICLO de la DB
  * 
  * === PERFILS REQUISITS ===
  * 
  * == CREATE ==
  * /api/reqPerfils/insertOne       - Inserta un PERFIL con todos sus datos en la DB
  * /api/reqPerfils/uploadReq       - Subir un fichero como requisito a la DB.
  * 
  * == READ ==
  * /api/reqPerfils/readAll         - Obtiene todos los PERFILES excepto sus requisitos de la DB
  * /api/reqPerfils/readOne         - Obtiene todos los REQUISITOS y toda la informacion de un PERFIL de la DB.
  * 
  * == UPDATE ==
  * /api/reqPerfils/updateOne       - Actualiza un PERFIL de la DB
  * 
  * == DELETE ==
  * /api/reqPerfils/deleteAll       - Elimina todos los PERFILES de la DB
  * /api/reqPerfils/deleteOne       - Elimina un PERFIL de la DB
  * 
  * 
  * /api/cicles/readOneByAlumne     - Obtiene la ID del alumno descifrando su token, a través de su ID obtiene el nombre de su ciclo y a través de ese nombre
  *                                   obtiene todos los datos de su ciclo.
  * =============================================== */

app.post('/api/alumnes/insertOne', (req, res) => {
     alumnesController.insertOne(req, res);
 })

app.post('/api/alumnes/insertMany', (req, res) => {
    alumnesController.insertMany(req, res);
})

app.get('/api/alumnes/readAll', (req, res) => {
     alumnesController.readAll(req, res);
 })

app.post('/api/alumnes/readAllByCicle', (req, res) => {
    alumnesController.readAllByCicle(req, res);
})

app.post('/api/alumnes/readOne', (req, res) => {
    alumnesController.readOne(req, res);
})

app.put('/api/alumnes/updateOne', (req, res) => {
    alumnesController.updateOne(req, res);
})

app.patch('/api/alumnes/updateUF', (req, res) => {
    alumnesController.updateUF(req, res);
})

app.delete('/api/alumnes/deleteOne', (req, res) => {
    alumnesController.deleteOne(req, res);
})

app.delete('/api/alumnes/deleteAll', (req, res) => {
    alumnesController.deleteAll(req, res);
})

app.delete('/api/alumnes/deleteAll', (req, res) => {
    alumnesController.deleteAllByCicle(req, res);
})

// PERFILS I REQUERIMENTS:

app.post('/api/reqPerfils/insertOne', (req, res) => {
    perfilsController.insertOne(req, res);  
})

app.get('/api/reqPerfils/readAll', (req, res) => {
    perfilsController.readAll(req, res);
})

app.post('/api/reqPerfils/readOne', (req, res) => {
    perfilsController.readOne(req, res);
})

app.put('/api/reqPerfils/updateOne', (req, res) => {
    perfilsController.updateOne(req, res);
})

app.delete('/api/reqPerfils/deleteAll', (req, res) => {
    perfilsController.deleteAll(req, res);
})

app.delete('/api/reqPerfils/deleteOne', (req, res) => {
    perfilsController.deleteOne(req, res);
})

app.post('/api/reqPerfils/uploadReq', function(req, res) {
    perfilsController.uploadReq(req, res, function(err){
        if(err){
            console.log(err);
            return;
        }
        console.log("[DEBUG] - Fichero subido correctamente! ")
        res.status(200).send("Fichero subido correctamente!")
    })
})

app.post('/api/cicles/readOneByAlumne', (req, res) => {
    ciclesController.readOneByAlumne(req, res);
})