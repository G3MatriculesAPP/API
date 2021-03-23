# **[G3] - MatriculesAPP | API**

## DESCRIPCIÓN
En este repositorio se encuentra la API de nuestra aplicación multiplataforma, desde las aplicaciones se hacen llamadas a este, que se encarga de obtener y guardar datos en la DB.

## ENDPOINTS

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

### /api/upload/cicles
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| data | JSON | Cicles en format JSON a pujar a la DB |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Cicle/s afeigit/s correctament! |
| 500 | null |

### /api/cicles
#### GET

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Ciclos obtenidos correctamente |
| 500 | Imposible obtener los ciclos... |

#### PUT
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| id | String | ObjectID del cicle a actualitzar |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Cicle actualitzat correctament! |
| 500 | No s'ha pogut actualitzar el cicle.. |

### /api/moduls
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| id | String | ObjectID del cicle a obtenir les dades |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Moduls obtenidos correctamente! |
| 500 | Imposible obtener los moduls. |

### /api/ufs
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| id | String | ObjectID del cicle a obtenir les dades|
| pos | int | Posició del modul en l'Array que es vol obtenir les UF |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | UF obtenides correctament! |
| 500 | Imposible obtenir les UF |
