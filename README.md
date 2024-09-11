--crear la base de datos--

drop database hoperecords:
create database hoperecords;
use hoperecords
create table
(
id_artista mediumint primary key auto_increment;
nombre_banda varchar(50) not null,
debut varchar(11) not null,
contrato varchar(50) not null,
genero varchar(50) not null,
estado varchar(20) not null,
pais varchar(50) not null,
descripcion text not null
)ENGINE=InnoDB;


--Instalar node.js--
en el directorio raíz(donde se encuentra la carpeta descargada) abrir la consola de visual y ejecutar los siguientes codigos

npm install
node server.js

es probable que se demore en conectar a la base de datos.
