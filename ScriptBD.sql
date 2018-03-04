USE [angular]

DELETE FROM [dbo].[Credito]
DROP TABLE [dbo].[Credito]
DELETE FROM [dbo].[Solicitud]
DROP TABLE [dbo].[Solicitud]
DELETE FROM [dbo].[Cliente]
DROP TABLE [dbo].[Cliente]

CREATE TABLE Cliente(
Nombre nvarchar(50) not null,
Apellido nvarchar(50) not null,
Cedula nvarchar(50) not null PRIMARY KEY,
fecha_Nacimiento nvarchar(50) not null,
Usuario nvarchar(50) unique not null,
)

CREATE TABLE Solicitud(

Cedula nvarchar(50) not null,
Empresa nvarchar(50) not null,
nit_Empresa nvarchar(50) not null PRIMARY KEY,
fecha_Ingreso nvarchar(50) not null,
Salario nvarchar(50) not null,

FOREIGN KEY (Cedula) REFERENCES Cliente(Cedula)
)

CREATE TABLE Credito(
id_Credito int identity (1,1) not null PRIMARY KEY,
nit_Empresa nvarchar(50) not null,
Cedula nvarchar(50) not null,
Cantidad nvarchar(50) not null,

FOREIGN KEY (nit_Empresa) REFERENCES Solicitud(nit_Empresa),
FOREIGN KEY (Cedula) REFERENCES Cliente(Cedula)

)

/*insert into Cliente values('juan','ramrirez','109495','1995-01-29','user');*/
/*insert into Solicitud values('88','bunuelos','1094-7','1995-01-29','1099019');*/
/*
DELETE FROM [dbo].[Credito]
DROP TABLE [dbo].[Credito]
DELETE FROM [dbo].[Solicitud]
DROP TABLE [dbo].[Solicitud]*/
