const express = require('express');
const patient = require('../controller/patient');
const authenticate = require('../middleware/patient');

const router = express.Router();

router.post('/patient/login', patient.login);

router.get('/patient/medical-report/:patientId', authenticate, patient.viewMedicalReports);
router.get('/patient/doctors', authenticate, patient.getDoctorsList);

router.post('/patient/appointment/book', authenticate, patient.bookAppointment);
router.get('/patient/appointments', authenticate, patient.getAppointmentsByPatient);
router.get('/patient/reports', authenticate, patient.getPatientReports);

module.exports = router;