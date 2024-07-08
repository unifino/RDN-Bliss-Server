CREATE TYPE Gender AS ENUM ( 'male', 'female' );

CREATE TABLE Dietitians (
    email varchar UNIQUE NOT NULL,
    username varchar UNIQUE NOT NULL,
    password varchar  NOT NULL,
    firstName varchar,
    lastName varchar,
    age int,
	gender Gender
);

CREATE TABLE Patients (
    email varchar UNIQUE NOT NULL,
    username varchar UNIQUE NOT NULL,
    password varchar NOT NULL,
    firstName varchar,
    lastName varchar,
    age int,
	gender Gender
);

--  =======================================================================================

INSERT INTO Patients (email, username, password, firstName, lastName, age, gender) VALUES
( 'x', 'x', 'x', 'Hatef', null, 37, 'male' ),
( 'y', 'y', 'y', 'Fatemeh', null, 24, 'female' ),
( 'z', 'z', 'z', 'Ali', null, 37, 'male' ),
( 'a', 'a', 'a', 'Rasul', null, 27, 'male' ),
( 'b', 'b', 'b', 'Sara', null, 27, 'female' ),
( 'c', 'c', 'c', 'Farid', null, 26, 'male' ),
( 'd', 'd', 'd', 'Javad', null, 23, 'male' ),
( 'e', 'e', 'e', 'Saeed', null, 38, 'male' ),
( 'f', 'f', 'f', 'Leyla', null, 38, 'female' ),
( 'g', 'g', 'g', 'HamidReza', null, 30, 'male' ),
( 'h', 'h', 'h', 'Mohaddese', null, 30, 'female' ),
( 'i', 'i', 'i', 'Karim', null, 44, 'male' ),
( 'k', 'k', 'k', 'Sima', null, 18, 'female' )
;