# 30930-ejercicios
Ejercicios Sebastian Alasia

Para iniciar:

- Correr npm install para instalar las dependencias
- Correr npm run tsc para hacer la build de typescript. Esto permite compilar el archivo Js. Luego iniciar con  npm start
- Correr npm run dev. Este módulo permite actualizar la build y dejar conectada la app sin tener que reiniciar.
- Iniciar la Database con Docker-Compose

Para correr los tests:

- Luego de instalar las dependencias, correr npm run test.

# Database

Para Correr Postgres:

- docker-compose up para levantar las instancias de Postgres / Postgres Admin
- Pueden usar PgAdmin como interfaz si así lo desean, en ese caso:

    - Ingresar a http://localhost:5050/
    - Inicialmente hay que configurar un Servidor, para eso clickear en Server:
    - Agregar nombre en name, solapa "general"
    - Agregar "postgres" (sin las ""), en la solapa conecction, campo hostname
    - Completar con el password de la docker file
    - Una vez conectado el servidor, ir a Database y crear la base de datos "coderhouse"
