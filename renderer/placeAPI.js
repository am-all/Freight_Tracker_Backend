const CONFIG = require('../config/apiConfig').API;
const placeController = require('../controller/place');

const PlaceController = new placeController();

module.exports = class placeAPIRenderer {

    async getPlaceCluster(req,res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        let { start_tis, end_tis} = req.query;

        let apiResponse = { 
            status:'',
            Message:'',
            data:''  
        }
        if(start_tis && end_tis){

            try{

                let data = await PlaceController.getPlaceInteractionData(start_tis, end_tis);
    
                if(data.length == 0){
                    apiResponse.status = CONFIG.GLOBAL.STATUS.SUCCESS;
                    apiResponse.Message = CONFIG.PLACE.MESSAGE.NO_DATA; 
                    res.status(200).send(apiResponse);
                }
                else{
                    apiResponse.status = CONFIG.GLOBAL.STATUS.SUCCESS;
                    apiResponse.Message = CONFIG.PLACE.MESSAGE.SUCCESS; 
                    apiResponse.data = data.rows;
                    res.status(200).send(apiResponse);
                }
            }
            catch(err){
                console.log(err);
                apiResponse.status = CONFIG.GLOBAL.STATUS.FAILED;
                apiResponse.Message = CONFIG.PLACE.MESSAGE.FAILED;
                res.status(500).send(apiResponse);
            }

        }
        else{
            apiResponse.status = CONFIG.GLOBAL.STATUS.FAILED;
            apiResponse.Message = CONFIG.PLACE.MESSAGE.NO_DATA;
            res.status(500).send(apiResponse);
        }
    }
}