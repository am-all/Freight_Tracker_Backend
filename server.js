const express = require('express'),
    expressApp = express(),
    port = 3001,
    bodyParser = require('body-parser');
const router = express.Router();
var cors = require('cors')



const routes = require('./routes');

expressApp.use(bodyParser.json({ extended: true }));
expressApp.use(cors());

expressApp.set("LISTENING_PORT", port);

expressApp.use(routes(router));

expressApp.listen(port, () => {
    console.log('RESTfull API server started on: ' + port);
});