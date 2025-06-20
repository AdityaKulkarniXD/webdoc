const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const { passwordSchema } = require("../utils/joi");
const HospitalModel = require("../models/hospital");
const Encrypt = require("../utils/crypt");
const { generateToken } = require("../utils/jwt");

class Doctor {
    login = async (req, res) => {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: passwordSchema,
            });

            const { error } = schema.validate(req.body);
            if (error) {
                return res
                    .status(400)
                    .json({ error: error.details[0].message });
            }

            const { email, password } = req.body;

            const hospital = await HospitalModel.findOne({
                "doctors.email": email,
            });
            if (!hospital) {
                return res.status(400).json({ error: "Doctor not found" });
            }

            const doctor = hospital.doctors.find((doc) => doc.email === email);
            if (!doctor) {
                return res.status(400).json({ error: "Doctor not found" });
            }

            const isMatch = await Encrypt.comparePassword(
                password,
                doctor.password
            );
            if (!isMatch) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            const payload = {
                doctorId: doctor.id,
                email: doctor.email,
                hospitalId: hospital.hospitalId,
                role: "doctor",
            };

            const token = await generateToken(payload);

            res.status(200).json({
                success: 1,
                message: "Doctor logged in successfully",
                token,
            });
        } catch (error) {
            console.error("Error during doctor login:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    getPatientReports = async (req, res) => {
        try {
            const { patientId } = req.params;

            if (!patientId) {
                return res
                    .status(400)
                    .json({ error: "Patient ID is required" });
            }

            const hospital = await HospitalModel.findOne({
                "doctors.id": req.doctor.doctorId,
            });
            if (!hospital) {
                return res.status(404).json({ error: "Hospital not found" });
            }

            const patient = hospital.patients.find((p) => p.id === patientId);
            if (!patient) {
                return res.status(404).json({ error: "Patient not found" });
            }

            res.status(200).json({
                success: 1,
                message: "Patient reports retrieved successfully",
                reports: patient.reports || [],
            });
        } catch (error) {
            console.error("Error retrieving patient reports:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    getAppointmentsByDoctor = async (req, res) => {
        try {
            const { doctorId } = req.body;
            if (!doctorId) {
                return res.status(400).json({ error: "Doctor ID is required" });
            }
            const hospital = await HospitalModel.findOne({
                "doctors.id": doctorId,
            });
            if (!hospital) {
                return res.status(404).json({ error: "Hospital not found" });
            }
            const doctor = hospital.doctors.find((doc) => doc.id === doctorId);
            if (!doctor) {
                return res.status(404).json({ error: "Doctor not found" });
            }
            const appointments = doctor.appointments || [];
            res.status(200).json({
                success: 1,
                message: "Appointments retrieved successfully",
                appointments,
            });
        } catch (error) {
            console.error("Error retrieving appointments:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };
}

module.exports = new Doctor();
