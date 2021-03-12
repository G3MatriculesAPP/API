'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require("../config")

function createToken(loginAlumn){

    // createToken()
    // Crea el TOKEN, obtiene del usuario su ID y se le asigna una fecha de expiración
    // de 1h desde el momento que el usuario se loguea a la BD.

    const payload = {
        sub: loginAlumn[0],
        iat: moment().unix(),
        exp: moment().add(1, 'minutes').unix(),
    }

    return  jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token){

    // decodeToken
    // Con este método se comprueba si el TOKEN del usuario ha expirado, si el TOKEN es erroneo
    // se devuelve STATUS 500 y si este ha expirado se devuelve STATUS 401. Si el TOKEN es válido 
    // y no ha expirado resuelve la ID del usuario del TOKEN y la devuelve.

    const decoded = new Promise((resolve, reject) => {
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN)
            
            if(payload.exp <= moment().unix()){
                resolve({
                    status: 401,
                    message: 'El token ha expirado...'
                })
            }

            resolve(payload.sub)

        } catch(err){
            reject({
                status: 500,
                message: 'Invalid Token'
            })
        }
    })

    return decoded

}

module.exports = {
    createToken,
    decodeToken
}
