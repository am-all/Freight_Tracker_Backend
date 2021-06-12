const postgres = require('../model/postgre');

const Postgres = new postgres();


module.exports = class vehicleController {

    getPlaceInteractionData(start_tis, end_tis) {

        return new Promise((resolve, reject) => {

            let sql = `SELECT * FROM vehicle_activity VA 
            INNER JOIN vehicle_detail VD on VA.vehicle_id = VD.id 
            WHERE 
            VA.date_time >= CAST('${start_tis}' AS timestamp) AND VA.date_time <= CAST('${end_tis}' AS timestamp) 
            AND  
            ST_Contains(
                'SRID=4326;POLYGON(
                    (18.7128121962049 73.5598715332623,
                    18.858427375322  73.7795980957623,
                    18.8298343351168 74.0817221191998,
                    18.6633784989781  74.1805990723248,
                    18.4420517762916 74.2575033691998,
                    18.2569599275397  74.2025717285748,
                    18.1030009147098 74.0460165527935,
                    18.0272764656119  73.743892529356,
                    18.074281691122 73.568111279356,
                    18.2100037896017  73.4774740723248,
                    18.4733152757346 73.3538778809185,
                    18.6659806320587 73.4088095215435,
                    18.7128121962049 73.5598715332623)
                )',ST_SetSRID(ST_Point(VA.lat, VA.lng), 4326))`

            Postgres.query(sql, (err, data) => {
                if (err) {
                    console.log('PLACE INTERACTION ERROR',err)
                    reject(err);

                } else {
                    resolve(data);

                }
            });
        })
    }
}