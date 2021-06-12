const fs = require("fs");
const Pool = require("pg").Pool;
const fastcsv = require("fast-csv");

require('dotenv').config();
const postgres = require('../model/postgre');

const Postgres = new postgres();

let stream = fs.createReadStream("data.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end", function() {
    // remove the first line: header
    csvData.shift();

    
    csvData.map((data)=>{
        data[1] = new Date(data[1]).toLocaleString('en-us');
    })
    console.log(csvData);
    // create a new connection to the database
    const query =
      "INSERT INTO vehicle_activity (vehicle_id,date_time,lat,lng) VALUES ($1, $2, $3, $4)";

      try {
        csvData.forEach(row => {
            Postgres.queryWithRow(query, row);
        });
      } catch(err) {
        console.lof('Error ',err);
      }
  
  });

stream.pipe(csvStream);
