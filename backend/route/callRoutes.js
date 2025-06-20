const express = require('express');
const patient = require('../controller/patient');
const authenticate = require('../middleware/hospital');

const router = express.Router();

router.post('/patient/appointment/book', authenticate, patient.callDoctor);

router.get('/doctors', patient.getRegisteredDoctors);

router.post('/test-call', patient.testCallRequest);

router.get('/recordings', patient.getActiveRecordingsController);

router.post('/recording/:action', patient.recordingControl);

router.get('/status', patient.getServerStatus);

module.exports = router;