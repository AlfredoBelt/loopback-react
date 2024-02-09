CREATE DATABASE petsitter;
use petsitter;
CREATE TABLE user(
	id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(60) NOT NULL,
    apellido VARCHAR(60) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL,
    telefono INT NOT NULL,
    contraseña VARCHAR(20) NOT NULL
);

#Todo: aumentar los campos enteros
#INSERT INTO user (nombre, apellido, direccion, correo, telefono, contraseña) VALUES("alfredo", "beltran", "Zeta halo","alfredo@gmail.com" ,667243908, "1234")


CREATE TABLE state(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(60) NOT NULL
);

CREATE TABLE city(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idState INT NOT NULL,
    nombre VARCHAR(60) NOT NULL,
    FOREIGN KEY(idState) REFERENCES state(id)
);

CREATE TABLE petsType(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    descripcion varchar(255) NOT NULL
);

CREATE TABLE petSitter(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cityId INT NOT NULL,
    nombre VARCHAR(60) NOT NULL,
    apellido VARCHAR(60) NOT NULL,
    correo VARCHAR(60) NOT NULL,
    telefono INT NOT NULL,
    fotoUrl VARCHAR(60) NOT NULL,
    edad INT NOT NULL,
    FOREIGN KEY(cityId) REFERENCES city(id)
);

CREATE TABLE petAndSitter(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    petId INT NOT NULL,
    petSitterId INT NOT NULL,
    FOREIGN KEY(petId) REFERENCES petsType(id),
    FOREIGN KEY(petSitterId) REFERENCES petSitter(id)
);

ALTER TABLE user MODIFY telefono VARCHAR(20);

ALTER TABLE petSitter MODIFY telefono VARCHAR(20);

ALTER TABLE petSitter MODIFY fotoUrl VARCHAR(255);