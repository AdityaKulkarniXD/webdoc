const hospital_router = require('./hospital');
const doctor_router = require('./doctor');
const patient_router = require('./patient');

let all_routes = [
    hospital_router,
    doctor_router,
    patient_router
];

module.exports = all_routes;