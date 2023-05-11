-- Active: 1680181159627@@127.0.0.1@5432@pezmosaico
CREATE DATABASE pezmosaico;

CREATE TABLE rol(  
    id SERIAL NOT NULL PRIMARY KEY,
    descripcion VARCHAR(50) NOT NULL
);

CREATE TABLE registrousuario(  
    id SERIAL NOT NULL PRIMARY KEY,
    nombres VARCHAR(50) NOT NULL,
    apellidos VARCHAR(50) NOT NULL,
    rut VARCHAR(15) NOT NULL,
    direccion VARCHAR(50) NOT NULL,
    telefono VARCHAR(15) NOT NULL,
    email VARCHAR(50) NOT NULL,
    usuario VARCHAR(50) NOT NULL,
    password VARCHAR(150) NOT NULL,
    rol_id INT NOT NULL
);

CREATE TABLE categoria(  
    id SERIAL NOT NULL PRIMARY KEY,
    categoria VARCHAR(50) NOT NULL,
    imgCategoria VARCHAR(200) NOT NULL
);

CREATE TABLE estado (
  id SERIAL PRIMARY KEY,
  descripcion varchar(50) NOT NULL
  );

CREATE TABLE producto(  
    id SERIAL NOT NULL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    precio INT NOT NULL,
    imagen VARCHAR(200) NOT NULL,
    existencia INT NOT NULL,
    categoria_id INT NOT NULL,
    id_estado INT NOT NULL
);

CREATE TABLE compra(  
    id SERIAL NOT NULL PRIMARY KEY,
    fecha VARCHAR(10) NOT NULL,
    monto_neto INT NOT NULL,
    id_usuario INT NULL,
    impuesto INT NOT NULL,
    monto_bruto INT NOT NULL,
    gasto_envio INT NOT NULL,
    documento_id INT NOT NULL
);

CREATE TABLE detalle_compra(  
    id SERIAL NOT NULL PRIMARY KEY,
    id_compra INT NOT NULL,
    id_pdto INT NOT NULL,
    cantidad INT NOT NULL
);

CREATE TABLE datos_empresa (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL,
  rut VARCHAR(20) NOT NULL
  );

CREATE SEQUENCE documento_seq;
CREATE TABLE documento (
  id SERIAL PRIMARY KEY,
    tipo_documento INTEGER NOT NULL,
    numero INTEGER DEFAULT NEXTVAL('documento_seq'),
    UNIQUE(tipo_documento, numero)
  );

ALTER TABLE registrousuario ADD CONSTRAINT unique_usuario UNIQUE (usuario);

ALTER TABLE registrousuario ADD CONSTRAINT unique_rut UNIQUE (rut);

ALTER TABLE producto ADD CONSTRAINT fk_producto_estado
  FOREIGN KEY (id_estado) REFERENCES estado (id);

ALTER TABLE producto ADD CONSTRAINT fk_producto_categoria
    FOREIGN KEY (categoria_id) REFERENCES categoria (id);

ALTER TABLE registrousuario ADD CONSTRAINT fk_registrousuario_rol
    FOREIGN KEY (rol_id) REFERENCES rol(id);

ALTER TABLE compra ADD CONSTRAINT fk_compra_registrousuario
    FOREIGN KEY (id_usuario) REFERENCES registrousuario (id);

ALTER TABLE detalle_compra ADD CONSTRAINT fk_detalle_compra_compra
    FOREIGN KEY (id_compra) REFERENCES compra (id);

ALTER TABLE detalle_compra ADD CONSTRAINT fk_detalle_compra_producto
    FOREIGN KEY (id_pdto) REFERENCES producto (id);

ALTER TABLE compra ADD CONSTRAINT fk_compra_documento
    FOREIGN KEY (documento_id) REFERENCES documento (id);


INSERT INTO categoria (categoria, imgCategoria) VALUES 
('Decoración Hogar', 'https://m.media-amazon.com/images/I/91NE3TwFouL.__AC_SX300_SY300_QL70_ML2_.jpg'),
('Mobiliario', 'https://sodimac.scene7.com/is/image/SodimacCL/4160088_03?wid=1500&hei=1500&qlt=70'),
('Misceláneo', 'https://i.pinimg.com/originals/2f/ba/f4/2fbaf4208a06cb94ca1c5c96717e54f8.jpg'),
('Menaje Hogar', 'https://ae01.alicdn.com/kf/Scfd6410d3103440eb1a7891b62854c07N/Kit-de-posavasos-de-mosaico-redondo-de-bamb-Diy-Material-de-decoraci-n-creativo-hecho-a.jpg_Q90.jpg_.webp');


INSERT INTO estado ("descripcion") VALUES ('disponible'), ('no disponible');

INSERT INTO producto(nombre, precio, imagen, existencia, categoria_id, id_estado) VALUES 
('Bandeja mosaico', 30000,'https://i.pinimg.com/originals/71/3d/68/713d68cce00a8937f19e524765fcb6d0.png', 10, 2, 1),
('Cuadro mosaico', 60000, 'https://i.pinimg.com/originals/9a/0d/36/9a0d36cc7a7c75c302d7e32467243bff.jpg', 10, 1, 1),
('Tornamesa mosaico', 45000, 'https://i.pinimg.com/originals/6a/79/23/6a7923d42f181c0f27ffbe525dcdd09d.jpg', 10, 1, 1),
('Bandeja mosaico', 30000, 'https://i.pinimg.com/originals/79/f2/17/79f2170bb0a5ece617b9181a87f22b23.jpg', 10, 2, 1),
('Posavasos mosaico', 10000, 'https://i.pinimg.com/originals/67/e3/e0/67e3e03865a68d2ac74aa91a73879194.jpg', 10, 2, 1),
('Caja té mosaico', 15000, 'https://i.pinimg.com/originals/f6/78/b2/f678b2197e63bca556fd835efb45e5f5.jpg', 10, 2, 1),
('Número casa mosaico', 25000, 'https://defrenteparaomar.com/wp-content/04-diy/201902-numero-casa-mosaico/02-numero-para-casa-mosaico.jpg', 10, 4, 1),
('Lámpara mosaico', 45000, 'https://i.pinimg.com/originals/21/f7/b6/21f7b6539a6120d2254876adc4f1a4aa.jpg', 10, 1, 1),
('Bandeja chica mosaico', 18000, 'https://i.pinimg.com/originals/df/4e/0e/df4e0e41d198abfa2e9141fe58066905.jpg', 10, 2, 1),
('Cenicero mosaico', 15000, 'https://i.pinimg.com/originals/a8/1e/3f/a81e3ff7884ccd91cfbd21712a31b1fb.jpg', 10, 4, 1);

INSERT INTO rol (descripcion) VALUES ('admin'), ('user');

INSERT INTO registrousuario(nombres, apellidos, rut, direccion, telefono, email, usuario, password, rol_id) VALUES ('Andrea', 'Jiménez Espinoza', '9339873-4', 'Pasaje Esmeralda 14', '965554730', 'andreacjimenez@gmail.com', 'admin', '9165', 1);

INSERT INTO datos_empresa (nombre, direccion, telefono, email, rut) VALUES ('Pez Mosaico Limitada', 'Pasaje Esmeralda 14, Valparaíso', '965554730', 'pezmosaico@gmail.com', '76573333-2');

