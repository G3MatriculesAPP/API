'use strict'

const services = require('./index')

function isAuth(req, res, next){

    // isAuth()
    // Método que comprueba el token enviado por el usuario, si este token no es válido o
    // esta vácio (no existe, etc...) devuelve STATUS 403. Si el token és valido comprueba
    // llamando a "decodeToken()" y dependiendo de su resultado manda un STATUS u otro. 

    if(!req.headers.token){
        return res.status(403).send({ message: 'No tienes autorización'})
    }

    const token = req.headers.token;


    services.decodeToken(token)
    .then(response => {
      res.status(response.status).send({ message: response.message})
      next()
    })
    .catch(response => {
      res.status(response.status).send()
    })
}

module.exports = isAuth
