const express = require('express');
const doctor = require('../controller/doctor');
const authenticate = require('../middleware/doctor');
const router = express.Router();

router.post('/doctor/login', doctor.login);

router.get('/doctor/patient/reports/:patiendId', authenticate, doctor.getPatientReports);

router.get('/doctor/appointments', authenticate, doctor.getAppointmentsByDoctor);

module.exports = router;
