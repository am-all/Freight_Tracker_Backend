const express = require('express');
const router = express.Router();

const vehicleDataController = require('../renderer/vehicleAPI');
const placeDataController = require('../renderer/placeAPI');

const VehicleDataController = new vehicleDataController();
const PlaceDataController = new placeDataController();

const API_PREFIX = '/api'

module.exports = (router) => {

    router.get(API_PREFIX+'/vehicle_activity', VehicleDataController.getVehicleActivity);
    router.get(API_PREFIX+'/vehicle_licence_list', VehicleDataController.getVehicleLicenceList);
    
    router.get(API_PREFIX+'/place_interactions', PlaceDataController.getPlaceCluster);
     

    return router;

}