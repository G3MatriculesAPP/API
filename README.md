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
| token | String | Token del usuario obtenido al iniciar sesion |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Token descifrado |
| 500 | El token ha expirado |
| 500 | Invalid token |

### /api/cicles
#### GET
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| token | String | Token del usuario obtenido al iniciar sesion |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Token descifrado |
| 500 | El token ha expirado |
| 500 | Invalid token |

#### PUT
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| token | String | Token del usuario obtenido al iniciar sesion |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Token descifrado |
| 500 | El token ha expirado |
| 500 | Invalid token |

### /api/moduls
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| token | String | Token del usuario obtenido al iniciar sesion |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Token descifrado |
| 500 | El token ha expirado |
| 500 | Invalid token |

### /api/ufs
| PARAM | VALUE | DESCRIPTION |
|:-:|:-:|:-:|
| token | String | Token del usuario obtenido al iniciar sesion |

| STATUS | MESSAGE |
|:-:|:-:|
| 200 | Token descifrado |
| 500 | El token ha expirado |
| 500 | Invalid token |
