
sudo -u postgres -i 
initdb --locale $LANG -E UTF8 -D '/var/lib/postgres/data/'
exit
sudo systemctl enable --now postgresql
sudo systemctl status postgresql
sudo -iu postgres psql


CREATE ROLE "RDN_Bliss" WITH LOGIN PASSWORD 'RDN';
GRANT CONNECT ON DATABASE "RDN_Bliss_Server" TO "RDN_Bliss";
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO "RDN_Bliss";
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO "RDN_Bliss";
ALTER DEFAULT PRIVILEGES IN SCHEMA public 
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO "RDN_Bliss";


sudo nano /var/lib/postgres/data/pg_hba.conf << host    all    RDN_Bliss    0.0.0.0/0    md5
sudo systemctl restart postgresql

CREATE TYPE "Gender" AS ENUM ( 'male', 'female' );

CREATE TABLE "Dietitians" (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    username VARCHAR UNIQUE NOT NULL,
    password JSONB NOT NULL,
    firstName VARCHAR,
    lastName VARCHAR,
    birthDay VARCHAR,
	gender "Gender"
);

CREATE TABLE "Patients" (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    username VARCHAR UNIQUE NOT NULL,
    password JSONB NOT NULL,
    Dietitians JSON,
    firstName VARCHAR,
    lastName VARCHAR,
    birthDay VARCHAR,
	gender "Gender"
);

-- CREATE TABLE Home (
--     id BIGSERIAL PRIMARY KEY,
--     title VARCHAR,
--     content VARCHAR,
--     image VARCHAR,
--     my_order INTEGER,
--     display BOOLEAN
-- );

-- CREATE TABLE News (
--     id BIGSERIAL PRIMARY KEY,
--     title VARCHAR,
--     content VARCHAR,
--     image VARCHAR,
--     link VARCHAR,
--     my_order INTEGER,
--     display BOOLEAN
-- );

-- CREATE TABLE FAQs (
--     id BIGSERIAL PRIMARY KEY,
--     title VARCHAR,
--     content VARCHAR,
--     my_order INTEGER,
--     display BOOLEAN
-- );

-- CREATE TABLE AboutUS (
--     id BIGSERIAL PRIMARY KEY,
--     title VARCHAR,
--     content VARCHAR,
--     my_order INTEGER,
--     display BOOLEAN
-- );

-- delete from patients where id >= 13;
-- delete from Dietitians where id >= 0;
-- SELECT * FROM public.dietitians;
SELECT * FROM public.patients;
-- CREATE TYPE HashedPass AS ( hash VARCHAR, salt VARCHAR, iterations SMALLINT ); 
-- ALTER TAble patients ALTER COLUMN password TYPE HashedPass;
-- drop table dietitians;
-- drop table Patients;


--  =======================================================================================

INSERT INTO "Patients" (email, username, password, firstName, lastName, birthDay, gender) VALUES
( 'x', 'x', '{}', 'Hatef', null, 37, 'male' ),
( 'y', 'y', '{}', 'Fatemeh', null, 24, 'female' ),
( 'z', 'z', '{}', 'Ali', null, 37, 'male' ),
( 'a', 'a', '{}', 'Rasul', null, 27, 'male' ),
( 'b', 'b', '{}', 'Sara', null, 27, 'female' ),
( 'c', 'c', '{}', 'Farid', null, 26, 'male' ),
( 'd', 'd', '{}', 'Javad', null, 23, 'male' ),
( 'e', 'e', '{}', 'Saeed', null, 38, 'male' ),
( 'f', 'f', '{}', 'Leyla', null, 38, 'female' ),
( 'g', 'g', '{}', 'HamidReza', null, 30, 'male' ),
( 'h', 'h', '{}', 'Mohaddese', null, 30, 'female' ),
( 'i', 'i', '{}', 'Karim', null, 44, 'male' ),
( 'k', 'k', '{}', 'Sima', null, 18, 'female' )
;


-- INSERT INTO HOME ( title, content, my_order, display ) values 
-- ( 'How Can a Registered Dietitian Nutritionist (RDN) Help?', 'Lifestyle changes like following a healthy eating plan, achieving a healthy weight and regular physical activity can significantly improve your health, reduce risk of developing chronic illnesse. Working with a registered dietitian nutritionist (RDN) to make these changes can improve long term success.\n\nRDNs are food and nutrition experts who have graduated with at least a bachelor’s degree in nutrition, passed a national examination and who must complete ongoing continuing professional education requirements to maintain registration.',0,true)
-- ( 'Do Doctors Really Listen to the Patient?','Last week I went to a new ENT doctor specializing in the nose and sinuses. I have had ongoing issues where my nose closes up at night and causes issues breathing with my cpap mask.\n\nNo response on that. Why would he not recommend a X-ray or better yet an MRI to see what could be going on? He then prescribed a different Fluticasone Propionate, Xhance, after I told him I had been using that steroid since 2012 with no noticeable good.',1,true),
-- ( 'Prednisone is like running UP a DOWN staircase','There are days I am able to continue in activities that keep me healthy, both physically and mentally.\n\nBut other days it''s near impossible - either the brain fog wrestles with my physical energy, or the zeal and motivation are gone. I''m at 8.5 mg, a slow taper since April. Before PMR/ prednisone I was a young 75 years - very active physically and mentally.',2,true),
-- ( 'Is it kidney or back pain?','Thank you Danny. I''m sorry you have to suffer these things, as I do. I have had neurologist for years now, on gabapentin and extra strength Tylenol, so my liver and kidneys are taking a hit.\n\nI too have osteoarthritis in my hips and back just to make life interesting. Growing old is a real challenge! I.must admit I sick of going to doctors. Take care.',3,true),
-- ( 'Agricultural Science Center of Excellence for Nutrition and Diet (ASCEND) for Better Health','A virtual center that brings together scientists, partner organizations, and communities to deliver science-based solutions that promote and elevate food and nutrition security for all Americans.\n\nOn September 28th, USDA announced the launch of the first USDA Nutrition Hub in Baton Rouge, Louisiana, in partnership with Southern University.',4,true)