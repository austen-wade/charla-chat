CREATE TABLE chat_user (
  user_id  uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  handle VARCHAR(45) NOT NULL
);

CREATE TABLE chat_space (
  space_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  space_name VARCHAR(45) NOT NULL
);

CREATE TABLE chat_room (
  room_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  space_id uuid,
  room_name VARCHAR(45) NOT NULL,
  CONSTRAINT fk_chat_space FOREIGN KEY (space_id) REFERENCES chat_space(space_id)
);

CREATE TABLE messages(
  message_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
  content VARCHAR(256) NOT NULL
);