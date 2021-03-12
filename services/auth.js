'use strict'

const { response } = require('express')
const services = require('./index')

function isAuth(req, res, token, next){

    // isAuth()
    // Método que comprueba el token enviado por el usuario, si este token no es válido o
    // esta vácio (no existe, etc...) devuelve STATUS 403. Si el token és valido comprueba
    // llamando a "decodeToken()" y dependiendo de su resultado manda un STATUS u otro. 
    
    if(!token){
        return res.status(403).send({ message: "No tienes autorización"})
    }

    services.decodeToken(token)
        .then(response => {
            req.user = response
            next()
        })
        .catch(response => {
          res.status(response.status)
        })

}

module.exports = isAuth