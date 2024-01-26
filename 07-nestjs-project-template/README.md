# Tranvia Cuenca Backend Bici Publica

### Desarrollo 

1. Clonar proyecto
2. ```npm install```
3. Clonar el archivo ```env.template``` y renombrarlo a ```.env```
4. Para generar una nuevo JWT_SECRET para los token de acceso, ejecutar ```node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"``` 
5. Cambiar las variables de entorno acorde a sus bases de datos 
6. Levantar la base de datos en ambiente de desarrollo con PostgreSQL ```docker-compose up -d``` y configurar TNS-NAME para oracle o si está en su máquina personal configurar instant client, con tnsnames.ora. 
7. Levantar ```npm run dev:start```
8. Para revisar la documentación del proyecto ingresar al navegador: ``` http://localhost:3000/api/v1/ ```
9. Generar migraciones, esto solo se debe realizar para ver la estructura que va a tener nuestro código, no es necesario se puede omitir. 
``` npm run migration:generate --name=createDatabaseStructureMultiTravelv1 ```

### Tecnologías 

- Node LTS: 20.* o superior 
- NestJS: 10.0
- PostgreSQL: Desarrollo: 14.3 y Producción: 13
- Docker
- Oraclelinux:8
- Oracle-instantclient-basic

### Dependencias
- bcrypt: 5.1.1,
- class-transformer: ^0.5.1
- class-validator: ^0.14.0
- date-fns-tz: ^2.0.0
- passport": ^0.6.0
- passport-jwt: ^4.0.1
- pg: ^8.11.3,
- typeorm: ^0.3.17,
- uuid: ^9.0.1
- nest/swagger: ^7.1.16
- oracledb: ^5.5.0,

### Bases de datos: 

- PostgreSQL: para el desarrollo del proyecto se trabajó con postgres, para staging o producción igual con postgresql.
- Oracle: Se configuro este tipo de base de datos recuperar la información de las tarjetas del Tranvía

### Ambiente de Pruebas

Para ambientes de pruebas se trabaja con la base de datos de desarrollo del tranvía de cuenca.

1. Replicar la información del archivo .env y renombrar con .env.staging con las credenciales de la base de postgres y oracle en desarrollo. 
2. Configuración de DB_TNS: esta variable corresponde a la cadena de conexión con oracle para entorno de desarrollo dentro del archivo .env.staging y demás variables necesarias.
3. Para generar un nuevo JWT_SECRET para los token de acceso, ejecutar ```node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"``` y modificar el valor. 
4. Para la construcción de la imagen de Docker para versión de pruebas ejecutar: docker build --build-arg STAGE=staging -t nombre_de_la_imagen:staging.v1
5. Para correr la imagen: docker run -dit -p 3000:3000 --add-host desacue01-bd-tc.tcuenca.pri:X.X.X.X nombre_de_la_imagen:staging.v1
6. Para revisar la documentación del proyecto ingresar al navegador: ``` http://localhost:3000/api/v1/ ```

### Ambiente de Producción

Para ambientes de pruebas se trabaja con la base de datos de producción en Potgresql y oracle. 

1. Replicar la información del archivo .env y renombrar con .env.production con las credenciales de la base de oracle en desarrollo. 
2. Configuración de DB_TNS: esta variable corresponde a la cadena de conexión con oracle para entorno de producción dentro del archivo .env.production y demás variables necesarias.
3. Para generar un nuevo JWT_SECRET para los token de acceso, ejecutar ```node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"``` y modificar el valor. 
4. Para la construcción de la imagen de Docker para versión de pruebas ejecutar: docker build --build-arg STAGE=production -t nombre_de_la_imagen:production.v1
5. Para correr la imagen: docker run -dit -p 3000:3000 --add-host prodcue01-bd-tc.tcuenca.pri:X.X.X.X  nombre_de_la_imagen:production.v1
6. Para revisar la documentación del proyecto ingresar al navegador: ``` http://localhost:3000/api/v1/ ```

### Configuración de Variable de entorno dentro de Kubernetes 

Cuando se quiere configurar la ip de host de la base de datos colocar, dentro del archivo de deployment para kubernetes lo siguiente:

```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: XXXX
  labels:
    app: XXXX
spec:
  replicas: X
  selector:
    matchLabels:
      app: XXXX
  template:
    metadata:
      labels:
        app: XXXX
    spec:
      imagePullSecrets:
        - name: X
      containers:
        - name: XXXX
          image: nombre_de_la_imagen:staging.v1
          ports:
            - containerPort: 3000
      hostAliases:
        - ip: 'X.X.X.X'
          hostnames:
            - 'desacue01-bd-tc.tcuenca.pri' # use this for staging
            - 'prodcue01-bd-tc.tcuenca.prii' # use this for production
```
