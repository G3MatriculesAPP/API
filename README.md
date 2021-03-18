# **[G3] - MatriculesAPP | API**

## **DESCRIPCIÓN:**
En este repositorio se encuentra la API de nuestra aplicación multiplataforma, desde las aplicaciones se hacen llamadas a este, que se encarga de obtener y guardar datos en la DB

### **SPRINT 1:**

| **REQUEST** | **JSON** | **"alum/login"** |
|:-:|:-:|:-:|
| PARAM | VALUE | DESCRIPTION |
| itEmail | String | Email introducido por el usuario |
| itPassword | String | Contraseña introducida por el usuario y encripada en MD5 |

<br>

| **RESPONSE** | **"alum/login"** |
|:-:|:-:|
| STATUS | MESSAGE |
| 200 | Te has logueado correctamente! [TOKEN] |
| 500 | Usuari / contrasenya incorrecta... |

<br><br>

| **REQUEST** | **JSON** | **"admin/login"** |
|:-:|:-:|:-:|
| PARAM | VALUE | DESCRIPTION |
| itEmail | String | Email introducido por el usuario |
| itPassword | String | Contraseña introducida por el usuario y encripada en MD5 |

<br>

| **RESPONSE** | **"admin/login"** |
|:-:|:-:|
| STATUS | MESSAGE |
| 200 | Te has logueado correctamente! [TOKEN] |
| 500 | Usuari / contrasenya incorrecta... |

<br><br>

| **REQUEST** | **JSON** | **"api/auth"** |
|:-:|:-:|:-:|
| PARAM | VALUE | DESCRIPTION |
| token | String | Token del usuario obtenido al iniciar sesion |
 
<br>

| **RESPONSE** | **"api/auth"** |
|:-:|:-:|
| STATUS | MESSAGE |
| 200 | Token descifrado |
| 500 | El token ha expirado |
| 500 | Invalid token |

  
