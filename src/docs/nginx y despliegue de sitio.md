# Instalar el servidor web

Lo siguiente que haremos será instalar nuestro servidor web con nginx, los comando a ejecutar seran los siguientes:

- "sudo apt install -y nginx"

![Servidor web](img/servidor%20web.png)

Despues abriras en tu navegador web "http://localhost:8080" lo que veras sera "Welcome to nginx"

![Servidor web](img/servidor%20web1.png)

Lo siguiente que haremos sera construir nuestro sitio, hay que decirle a nginx que mostrar, lo que haremos sera ejecutar los siguientes comandos:

- sudo apt install -y nodejs npm git

** Este comando instala Node.js y git**

![Servidor Web](img/construir%20sitio.png)

- git clone "tu-repo"

** Con este clonamos un proyecto desde un repositorio GitHub**

![Servidor Web](img/construccion%20sitio.png)

- cd "tu-repo"

** Entramos en la carpeta del proyecto clonado**

- npm install

** Instala todas las dependencias en nuestro proyecto**

- npm run build

** Compila y genera una version optimizada del proyecto para producción y crea la carpeta dist/: es tu web ya "construida" (HTML/CSS/JS listos).**

![Servidor Web](img/constuir%20sitio1.png)


## Copia el sitio a la carpeta de nginx
** Lo que haremos ahora sera copiar nuestro sitio a la carpeta de nginx para que se pueda ver desde el puerto 8080.**
** Para ello ejecutaremos los siguientes comandos.**

- sudo mkdir -p /var/www/wiki

** Crea la carpeta donde se alojara el sitio web.

- sudo cp -r dist/* /var/www/wiki/

** Copia la version compilada de la aplicacion a esa carpeta

- sudo chown -R www-data:www-data /var/www/wiki

** Asigna la propiedad de todos los archivos al usuario y grupo del servidor web (www-data) para que pueda servir el sitio correctamente.


![Servidor Web](img/copiar%20sitio%20a%20carpeta%20de%20nginx.png)


## Crea el archivo de configuracion del sitio
** 

- "sudo nano / etc/nginx/sites-available/wiki

** Este comando abre el editor de texto **nano** para crear o editar un archivo llamado ***wiki***, dentro de este archivo pegaremos la siguiente sintaxis:

** "server {
        listen 80 default_server;
        root /var/www/wiki;
        index index.html;
        location / { try_files $uri $uri/ /index.html; }
}" **


** Guarda y cierra: ***Ctrl+O, Enter, Ctrl+X.*** (Le dice a nginx: "atiende en el puerto 80 y entrega los archivos de /var/www/wiki".)

## Activa el sitio y recarga nginx
** Lo que haremos ahora sera activar nuestro sitio web y refrescar nginx para que muestre nuestro sitio en la web desde nuestro propio servidor Linux**

- "sudo ln -s /etc/nginx/sites-available/wiki /etc/nginx/sites-enabled/"

** Crea un enlace simbolico (similiar a un acceso directo en Windows) desde el archivo *wiki* hacia la carpeta **sites-enabled**

- "sudo rm /etc/nginx/sites-enabled/default"

** Elmina el enlace del sitio predeterminado de Nginx.**

- "sudo nginx -t"

** Verifica que la configuracion de Nginx sea correcta antes de aplicarla.

- "sudo systemctl reload nginx"

** Le indica a Nginx que vuelva a leer su configuracion sin detener el servicio.**


**nginx -t debe responder: *"syntax is ok / test succesful".**


![Servidor web](img/copiar%20sitio%20a%20nginx.png)


### Comprueba
** Recarga "http://localhost:8080", ahora deberia verse tu sitio servido desde tu propio Linux


![Servidor Web](img/prueba%20del%20sitio%20desplegado%20con%20nginx.png)

