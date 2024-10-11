-- List of queries I used on supabase SQL Editor

-- Create table.
CREATE TABLE IF NOT EXISTS character(
  id SERIAL PRIMARY KEY,
  character_name TEXT
);

CREATE TABLE IF NOT EXISTS games(
  id SERIAL PRIMARY KEY,
  game_name VARCHAR(255),
  game_acronym VARCHAR(4)
);

CREATE TABLE IF NOT EXISTS character_game(
  character_id SMALLINT,
  game_id SMALLINT ,
  PRIMARY KEY(character_id, game_id)
);

CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255),
  liked_posts BIGINT ARRAY
);

CREATE TABLE IF NOT EXISTS posts(
id SERIAL PRIMARY KEY,
user_id BIGINT,
character_id SMALLINT,
game_id SMALLINT,
comment TEXT,
rating SMALLINT,
likes BIGINT DEFAULT 0
);

-- Insert data into games table.
INSERT INTO games (game_name, game_acronym) VALUES('Fire Emblem: Shadow Dragon and the Blade of Light', 'FE1'),
('Fire Emblem Gaiden', 'FE2');
('Fire Emblem: Mystery of the Emblem', 'FE3'),
('Fire Emblem: Genealogy of the Holy War', 'FE4'),
('Fire Emblem: Thracia 776', 'FE5'),
('Fire Emblem: The Binding Blade', 'FE6'),
('Fire Emblem: The blazing Blade', 'FE7'),
('Fire Emblem: The Sacred Stones', 'FE8'),
('Fire Emblem: Path of Radiance', 'FE9'),
('Fire Emblem: Radiant Dawn', 'FE10'),
('Fire Emblem: Shadow Dragon', 'FE11'),
('Fire Emblem: New Mystery of the Emblem', 'FE12'),
('Fire Emblem Awakening', 'FE13'),
('Fire Emblem Fates', 'FE14'),
('Fire Emblem Echoes: Shadow of Valentia', 'FE15'),
('Fire Emblem: Three Houses', 'FE16'),
('Fire Emblem Engage', 'FE17');

-- Insert some characters into characters table.
INSERT INTO characters(character_name) VALUES('Marth'),
('Alm'),
('Celica'),
('Sigurd'),
('Seliph'),
('Roy'),
('Eliwood'),
('Hector'),
('Lyn'),
('Erika'),
('Ephriam'),
('Ike'),
('Micaiah'),
('Chrom'),
('Corrin'),
('Edelgard'),
('Dimitri'),
('Claude');

-- Seed some dummy usernames into the table
INSERT INTO users(user_name) VALUES('Testusername 1'),
('Test 2');