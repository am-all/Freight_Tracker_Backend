const postgres = require('../model/postgre');

const Postgres = new postgres();


module.exports = class vehicleController {

    getVehicleActivityData(license, start_tis, end_tis){
        return new Promise(function(resolve,reject){   
            console.log('inside with',license, start_tis, end_tis);
        
            let sql = `SELECT vehicle_activity.lat,vehicle_activity.lng FROM vehicle_activity INNER JOIN vehicle_detail ON vehicle_activity.vehicle_id = vehicle_detail.id WHERE vehicle_detail.license='${license}' AND vehicle_activity.date_time >= CAST('${start_tis}' AS timestamp)
            AND vehicle_activity.date_time <= CAST('${end_tis}' AS timestamp) ORDER BY vehicle_activity.date_time ASC;`;
        
            Postgres.query(sql, function(err, data){
                if (err) {
                    console.log('sql error ',err);
                    reject(err);

                } else {
                    console.log('inside result',data.rows)
                    resolve(data.rows);
                }
            });
        })
    }

    getVehicleLicenceList(){
        return new Promise(function(resolve,reject){   
        
            let sql = `SELECT license FROM vehicle_detail;`;
        
            Postgres.query(sql, function(err, data){
                if (err) {
                    console.log('sql error ',err);
                    reject(err);

                } else {
                    resolve(data.rows);
                }
            });
        })
    }
}