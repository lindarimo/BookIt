CREATE TRIGGER incrementValue
ON Risorsa
FOR Insert
AS 
   Update Risorsa  
   set ID = (SELECT (MAX(Risorsa.ID)+1) FROM Risorsa)
   where id in (select id from inserted)
GO