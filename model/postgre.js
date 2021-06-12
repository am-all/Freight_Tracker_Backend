const Pool = require('pg').Pool;
require('dotenv').config();

let config = {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
}


let pool = new Pool(config);

module.exports = class DB {
    
    query(sql, callback) {
        pool.query(sql, (err, data) => {
            if (err){
                console.log('psql error ',err);
                callback(err, null);
            }
            else{
                callback(null, data);
            }
        });
    }

    queryWithRow(sql,row){
        pool.query(sql, row, (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log("inserted " + res.rowCount + " row:", row);
            }
        });
    }

}