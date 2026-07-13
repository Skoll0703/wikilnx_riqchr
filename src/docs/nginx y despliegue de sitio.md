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
- sudo cp -r dist/* /var/www/wiki/
- sudo chown -R www-data:www-data /var/www/wiki