CREATE database numadic;

CREATE TABLE vehicle_detail (
    id SERIAL PRIMARY KEY,
    license VARCHAR(64),
    model VARCHAR(64),
    engine_no VARCHAR(64),
    chasis_no VARCHAR(64)
  );


CREATE TABLE vehicle_activity (
     id SERIAL PRIMARY KEY,
    vehicle_id integer,
    date_time timestamp,
    lat VARCHAR(64),
    lng VARCHAR(64) 
);

CREATE TABLE place_polygon (
     id SERIAL PRIMARY KEY,
    place_name VARCHAR(100),
    polygon GEOGRAPHY(POLYGON,4326) 
);

CREATE TABLE vehicle_activity (
     id SERIAL PRIMARY KEY,
    vehicle_id integer,
    date_time timestamp,
    lat DECIMAL,
    lng DECIMAL 
);