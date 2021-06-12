const CONFIG = require('../config/apiConfig').API;
const vehicleController = require('../controller/vehicle');

const VehicleController = new vehicleController();
module.exports = class vehicleAPIRenderer {
    
    async getVehicleActivity(req,res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        
        let apiResponse = { 
            status:'',
            Message:'',
            data:[] 
        }

        let { licence, start_tis, end_tis} = req.query;

        if(licence && start_tis && end_tis){

            try{
                let data = await VehicleController.getVehicleActivityData(licence, start_tis, end_tis);
    
                if(data.length == 0){
                    apiResponse.status = CONFIG.GLOBAL.STATUS.SUCCESS;
                    apiResponse.Message = CONFIG.VEHICLE.MESSAGE.NO_DATA; 
                    res.status(200).send(apiResponse);
                }
                else{
                    apiResponse.status = CONFIG.GLOBAL.STATUS.SUCCESS;
                    apiResponse.Message = CONFIG.VEHICLE.MESSAGE.SUCCESS; 
                    apiResponse.data = data; 
                    res.status(200).send(apiResponse);
                }
            }
            catch(err){

                apiResponse.status = CONFIG.GLOBAL.STATUS.FAILED;
                apiResponse.Message = CONFIG.VEHICLE.MESSAGE.FAILED;
                res.status(500).send(apiResponse);
            }

        }
        else{
            apiResponse.status = CONFIG.GLOBAL.STATUS.FAILED;
            apiResponse.Message = CONFIG.VEHICLE.MESSAGE.NO_DATA;
            res.status(500).send(apiResponse);
        }
    }

    async getVehicleLicenceList(req,res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
        let apiResponse = { 
            status:'',
            Message:'',
            data:''  
        }
        try{
            let data = await VehicleController.getVehicleLicenceList();

            if(data.length == 0){
                apiResponse.status = CONFIG.GLOBAL.STATUS.SUCCESS;
                apiResponse.Message = CONFIG.VEHICLE.MESSAGE.NO_DATA; 
                res.status(200).send(apiResponse);
            }
            else{
                data.map((data_item)=>{
                    return data_item.licence;
                })
                apiResponse.status = CONFIG.GLOBAL.STATUS.SUCCESS;
                apiResponse.Message = CONFIG.VEHICLE.MESSAGE.SUCCESS; 
                apiResponse.data = data; 
                res.status(200).send(apiResponse);
            }
        }
        catch(err){

            apiResponse.status = CONFIG.GLOBAL.STATUS.FAILED;
            apiResponse.Message = CONFIG.VEHICLE.MESSAGE.FAILED;
            res.status(500).send(apiResponse);
        }

    }
}