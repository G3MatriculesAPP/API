# **[G3] - MatriculesAPP | API**

## DESCRIPCIÓN
En este repositorio se encuentra la API de nuestra aplicación multiplataforma, desde las aplicaciones se hacen llamadas a este, que se encarga de obtener y guardar datos en la DB.

## ENDPOINTS

<br>

## **SPRINT 1**

### alum/login
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| itEmail | String | Email introducido por el usuario |
| itPassword | String | Contraseña introducida por el usuario y encripada en MD5 |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Te has logueado correctamente! [TOKEN] |
| 500 | Usuari / contrasenya incorrecta... |

### admin/login
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| itEmail | String | Email introducido por el usuario |
| itPassword | String | Contraseña introducida por el usuario y encripada en MD5 |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Te has logueado correctamente! [TOKEN] |
| 500 | Usuari / contrasenya incorrecta... |

### api/auth
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| token | String | Token del usuario obtenido al iniciar sesion |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Token descifrado |
| 500 | El token ha expirado |
| 500 | Invalid token |

<br>

## **SPRINT 2**

### [POST] /api/cicles/insertMany
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| data | JSON | Cicles en format JSON a pujar a la DB |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Cicle/s afeigit/s correctament! |
| 500 | null |

### [GET] /api/cicles/readAll 

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Ciclos obtenidos correctamente |
| 500 | Imposible obtener los ciclos... |

### [POST] /api/moduls/readAll
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| id | String | ObjectID del cicle a obtenir les dades |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Moduls obtenidos correctamente! |
| 500 | Imposible obtener los moduls. |

### [POST] /api/ufs/readAll  
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| id | String | ObjectID del cicle a obtenir les dades|
| pos | int | Posició del modul en l'Array que es vol obtenir les UF |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | UF obtenides correctament! |
| 500 | Imposible obtenir les UF |

## **SPRINT 3**

### [POST] /api/alumnes/insertMany
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| data | JSON | Alumnes en format JSON a pujar a la DB |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Alumne/s afeigit/s correctament! |
| 500 | null |

### [POST] /api/alumnes/readAllByCicle
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| cicle | String | Nom del cicle a obtenir les dades |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Alumnos obtenidos correctamente! |
| 500 | Imposible obtener los alumnos. |

### [POST] /api/reqPerfils/insertOne
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| data | JSON | Perfil en format JSON a pujar a la DB |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Perfil afeigit correctament! |
| 500 | null |

### [GET] /api/reqPerfils/readAll
| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Perfiles obtenidos correctamente |
| 500 | Imposible obtener los perfiles... |

### [POST] /api/reqPerfils/readOne
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| id | String | ObjectID del perfil a obtenir les dades |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Requisits obtenidos correctamente! |
| 500 | Imposible obtener los requisits. |


### [POST] /api/reqPerfils/uploadReq



## **SPRINT 4**

### [POST] /api/reqPerfils/updateAlumProfile
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| token | string | Token del alumne |
| nomPerfil | string | Perfil del alumne seleccionat |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Perfil actualitzat correctament! |
| 500 | Error... |

### [POST] /api/cicles/readOne

| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| idCicle | string | id del cicle seleccionat |


| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Requisits obtenidos correctamente! |
| 500 | Imposible obtener los requisits. |

### [PUT] /api/cicles/updateOne
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| dades cicle | json | Totes les dades dun cicle ordenades | 

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Perfil actualitzat correctament! |
| 500 | Error... |

### [POST] /api/perfils/getStatusPerfil
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| token | string | Token del alumne |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Estado del perfil obtenido correctamente! |
| 500 | Imposible obtener el estado del perfil... |


### [POST]  /api/perfils/getRequisit
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| id | string | id del alumne |
| nomReq | string | nom del requisit |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Fichero subido correctamente! |
| 500 | Error... |

### [POST] /api/reqPerfils/readOneByAlumne
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| nomPerfil | string | Nom del perfil |
| idAlumne | string | id del alumne |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | message: 'Requeriments obtenidos correctamente!' |
| 500 | Error... |


### [POST] /api/reqPerfils/updateStatus
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| id | string | id del alumne |
| estatRequisits | int | el estat dels requisits (0,1,2,3) |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Estat dels requisits actualitzats correctament! |
| 500 | Error... |





