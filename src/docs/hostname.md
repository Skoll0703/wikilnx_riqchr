# Conectarse al servidor desde nuestro computador
** Lo siguiente que haremos sera conectarnos a nuestro servidor que esta alojado en la maquina virtual desde nuestro computador, para esto necesitamos ejecutar los siguientes comandos en la terminal de nuestro computador.**

- ssh -p 2222 inacap@localhost.

** Al ejecutar este comando nos pedira la contraseña que configuramos anteriormente, en este caso seria: Inacap2026, que la contraseña para iniciar sesion a nuestro servido en la maquina virtual.**
![Conectarse al servidor](img/conectar%20linux%20server%20desde%20mi%20pc.png)


** El siguiente paso es configurar el hostname de nuestro servidor, para esto ejecutaremos el siguiente comando:**

- sudo hostnamectl set-hostname srv-wiki

** Este comando lo que hace es cambiar el hostname de nuestro servidor a "srv-wiki", para verificar que se haya cambiado correctamente ejecutaremos el siguiente comando:**

- hostnamectl


![Verificar hostname](img/hostname.png)

** Los siguientes comando a ejecutar son los siguientes:**

- sudo apt update

** Este comando lo que hace es actualizar la lista de paquetes disponibles y sus versiones, pero no instala ni actualiza ningún paquete.**

- sudo apt upgrade -y

** Este comando lo que hace es instalar las versiones más recientes de todos los paquetes actualmente instalados en el sistema.**


![Actualizar paquetes](img/conectar%20mi%20pc(1).png)


** El siguiente comando seria:**

-ip a

** Este comando lo que hace es mostrar la configuración de red de nuestro servidor, incluyendo las direcciones IP asignadas a cada interfaz de red.**

![Interfaces de red](img/conectar%20mi%20pc.png)
