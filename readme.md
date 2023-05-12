                    PROYECTO PERSONAL: API DE LA TIENDA PEZ MOSAICO

Instrucciones para ejecutar el proyecto:

1) Se deben instalar las siguientes librerías: 
    - express: infraestructura para aplicaciones node js;
    - pg: paquete que permite utilizar postgresSQL como base de datos.
    - crypto-js: librería que permite encriptar contraseñas; 
    - dotenv: paquete que permite la lectura sencilla de las variables de entorno en archivos de extensión;
    

Su instalación se realiza en el terminal de la siguiente manera: npm i "nombre de la librería" (sin comillas) Asimismo, y para poder visualizar el proyecto en tiempo real, se sugiera instalar nodemon.

2) Se incorporan las querys de entrada para cargar la base de datos con información mínima que permita visualizar el proyecto PEZ MOSAICO. Se deben ejecutar el archivo data.sql. La consulta de inserción de usuario en la tabla "registrousuario" es necesaria para poder ingresar al mantenedor. La query incluye el password ya encriptado pero al ingresar a través del ingreso de la aplicación se debe ingresar con el usuario admin y la contraseña 9165.

3) La API se encuentra levantada en puerto 4000 y se accede a él por navegador en http://localhost:4000.

4) Se agregaron variables de entorno, en el archivo .env ubicado en la carpeta raíz.