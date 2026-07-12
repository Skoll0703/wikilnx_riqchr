# Permisos por lineas de comando 
** Los siguientes pasos y comandos a ejecutar son los siguientes:**

- "mkdir -p ~/demo"
** Este comando crea un directorio llamado "demo" en el directorio home del usuario actual. La opción "-p" asegura que se creen todos los directorios intermedios necesarios si no existen.**

- "cd ~/demo"
** Con este comando entramos a la carpeta demo que acabamos de crear.**

- "touch nota.txt"
** Crea un archivo vacío llamado "nota.txt" dentro de la carpeta actual.**

- "mkdir privado"
** Crea una carpeta llamada "privado" dentro de la carpeta demo.**

- "ls -l"
** Muestra una lista detallada de los archivos y directorios en el directorio actual, incluyendo permisos, propietario, grupo, tamaño y fecha de modificación.**

![Creacion de archivos y carpetas](img/permisos%20por%20linea%20de%20comandos.png)

** Los siguientes comando que ejecutaremos serviran para administrar permisos, propietarios y directorios**

- "chmod 600 nota.txt"
** Cambia los permisos del archivo "nota.txt" para que solo el propietario tenga permisos de lectura y escritura, mientras que el grupo y otros usuarios no tengan ningún permiso.**

- "chmod u+x,go-rwx privado"
** Cambia los permisos de la carpeta "privado" para que el propietario tenga permisos de ejecución (acceso a la carpeta), mientras que el grupo y otros usuarios no tengan ningún permiso.**

- "sudo chown root:root nota.txt"
** Cambia el propietario y el grupo del archivo "nota.txt" a "root". Esto significa que solo el usuario root tendrá control total sobre este archivo.**

- "sudo mkdir /srv/compartido"
** Crea una carpeta llamada "compartido" en la ruta "/srv", que es comúnmente utilizada para servicios y datos compartidos en sistemas Linux.**

- "sudo chmod 2775 /srv/compartido"
** Cambia los permisos de la carpeta "/srv/compartido" para que el propietario y el grupo tengan permisos de lectura, escritura y ejecución, mientras que otros usuarios tengan permisos de lectura y ejecución. El "2" al inicio establece el bit setgid, lo que significa que los archivos creados dentro de esta carpeta heredarán el grupo del directorio padre.**

- "sudo chmod +t /tmp"
** Cambia los permisos del directorio "/tmp" para que tenga el bit sticky activado. Esto significa que solo el propietario de un archivo dentro de "/tmp" puede eliminar o renombrar ese archivo, incluso si otros usuarios tienen permisos de escritura en el directorio.**

- "ls -ld /srv/compartido /tmp"
** Muestra una lista detallada de los directorios "/srv/compartido" y "/tmp", incluyendo permisos, propietario, grupo, tamaño y fecha de modificación. Esto permite verificar que los permisos se hayan configurado correctamente.**

![Permisos de directorios](img/permisos%20comandos.png)



![Permisos de directorios](img/linea%20de%20comandos.png)


![Permisos de directorios](img/permiso%20linea%20de%20comandos.png)


** Como se leen los permisos en Linux:**
- El primer carácter indica el tipo de archivo: "-" para archivos regulares, "d" para directorios, "l" para enlaces simbólicos, entre otros.
- Los siguientes tres caracteres representan los permisos del propietario: "r" para lectura, "w" para escritura y "x" para ejecución. Si un permiso no está otorgado, se muestra como "-".
- Los siguientes tres caracteres representan los permisos del grupo, con el mismo significado que los del propietario.
- Los últimos tres caracteres representan los permisos de otros usuarios, nuevamente con el mismo significado que los del propietario.