const express = require('express');
const hospital = require('../controller/hospital');
const authenticate = require('../middleware/hospital');

const router = express.Router();

router.post('/hospital/signup', hospital.signup);
router.post('/hospital/login', hospital.login);

router.post('/hospital/doctor/add', authenticate, hospital.addDoctor);
router.post('/hospital/doctor/delete', authenticate, hospital.deleteDoctor);
router.post('/hospital/doctor/update', authenticate, hospital.updateDoctor);

router.post('/hospital/patient/add', authenticate, hospital.addPatient);
router.post('/hospital/patient/delete', authenticate, hospital.deletePatient);
router.post('/hospital/patient/update', authenticate, hospital.updatePatient);


router.post('/hospital/patient/medical-report/add', authenticate, hospital.addMedicalReport);

module.exports = router;