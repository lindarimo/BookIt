CREATE TABLE Risorsa (
ID int PRIMARY KEY,
Cognome nvarchar(255) not null,
Nome nvarchar(255) not null,
Username nvarchar(255) not null,
Email nvarchar(255) not null,
FlagPrenotazione bit not null,
UNIQUE (Username)
)
CREATE TABLE Edificio (
ID_Edificio int IDENTITY (1,1) PRIMARY KEY,
Nome nvarchar(255) not null,
Indirizzo nvarchar(255) not null,
Stato nvarchar(255) not null,
)

CREATE TABLE Sala (
ID_Sala int IDENTITY (1,1) PRIMARY KEY,
ID_Edificio int not null DEFAULT(0),
Nome nvarchar(255) not null,
NumeroPostiDisponibili int not null,
Stato nvarchar(255) not null,
CONSTRAINT FK_Sala_Edificio FOREIGN KEY (ID_Edificio)
	REFERENCES Edificio (ID_Edificio)
)

CREATE TABLE Prenotazione (
ID_Prenotazione int IDENTITY (1,1) PRIMARY KEY,
ID_Risorsa int not null,
ID_Sala int not null,
Descrizione nvarchar(255) not null,
DataInizioPrenotazione datetime not null,
DataFinePrenotazione datetime not null,
CONSTRAINT FK_Prenotazione_Risorsa FOREIGN KEY (ID_Risorsa)
	REFERENCES Risorsa (ID),
CONSTRAINT FK_Prenotazione_Sala FOREIGN KEY (ID_Sala)
	REFERENCES Sala (ID_Sala),
)
