CREATE DATABASE impacta;
USE impacta;

CREATE TABLE formData (
id INT auto_increment PRIMARY KEY,
name VARCHAR(45) NOT NULL,
email VARCHAR(255) NOT NULL,
phone VARCHAR (45),
planet VARCHAR (45),
message TEXT NOT NULL,
radio VARCHAR(255),
privacy BOOLEAN NOT NULL 
);