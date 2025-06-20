const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const { passwordSchema } = require("../utils/joi");
const HospitalModel = require("../models/hospital");
const Encrypt = require("../utils/crypt");
const { generateToken } = require("../utils/jwt");
const {
    sendCallRequestToDoctor,
    getActiveRecordings,
    startRecording,
    stopRecording,
    doctors,
} = require("../utils/socket");

class Patient {
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
                "patients.email": email,
            });
            if (!hospital) {
                return res.status(400).json({ error: "Patient not found" });
            }

            const patient = hospital.patients.find(
                (pat) => pat.email === email
            );
            if (!patient) {
                return res.status(400).json({ error: "Patient not found" });
            }

            const isMatch = await Encrypt.comparePassword(
                password,
                patient.password
            );
            if (!isMatch) {
                return res.status(400).json({ error: "Invalid credentials" });
            }
            const payload = {
                patientId: patient.id,
                email: patient.email,
                hospitalId: hospital.hospitalId,
                role: "patient",
            };

            const token = await generateToken(payload);

            res.status(200).json({
                success: 1,
                message: "Patient logged in successfully",
                token,
            });
        } catch (error) {
            console.error("Error during patient login:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    viewMedicalReports = async (req, res) => {
        try {
            const { patientId } = req.params;

            const hospital = await HospitalModel.findOne({
                "patients.id": patientId,
            });
            if (!hospital) {
                return res.status(404).json({ error: "Hospital not found" });
            }

            const patient = hospital.patients.find(
                (pat) => pat.id === patientId
            );
            if (!patient) {
                return res.status(404).json({ error: "Patient not found" });
            }

            if (patient.medicalReports.length === 0) {
                return res.status(404).json({
                    error: "No medical reports found for this patient",
                });
            }

            res.status(200).json({
                success: 1,
                message: "Medical reports retrieved successfully",
                medicalReports: patient.medicalReports,
            });
        } catch (error) {
            console.error("Error retrieving medical reports:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    getDoctorsList = async (req, res) => {
        try {
            const hospitalId = req.hospital.hospitalId;

            const hospital = await HospitalModel.findOne({ hospitalId });
            if (!hospital) {
                return res.status(404).json({ error: "Hospital not found" });
            }

            const doctors = hospital.doctors.map((doc) => ({
                id: doc.id,
                name: doc.name,
                email: doc.email,
                specialization: doc.specialization,
            }));

            res.status(200).json({
                success: 1,
                message: "Doctors list retrieved successfully",
                doctors,
            });
        } catch (error) {
            console.error("Error retrieving doctors list:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    // Enhanced controller with detailed logging
    callDoctor = async (req, res) => {
        try {
            const { doctorId } = req.body;
            console.log(`📞 Call request initiated for doctorId: ${doctorId}`);

            if (!doctorId) {
                console.log("❌ Call request failed: doctorId is required");
                return res.status(400).json({ error: "doctorId is required" });
            }

            const roomId = uuidv4();
            console.log(
                `🏠 Generated roomId: ${roomId} for doctor: ${doctorId}`
            );

            // Enhanced logging for call request
            console.log(`🔍 Checking if doctor ${doctorId} is available...`);
            const isSent = sendCallRequestToDoctor(doctorId, roomId);

            if (!isSent) {
                console.log(
                    `❌ Call request FAILED: Doctor ${doctorId} not available or not connected`
                );
                console.log(
                    `📊 Current registered doctors: ${Array.from(
                        doctors.keys()
                    )}`
                );
                return res
                    .status(404)
                    .json({ error: "Doctor not available or not connected" });
            }

            console.log(
                `✅ Call request SUCCESSFULLY sent to doctor ${doctorId} with roomId: ${roomId}`
            );

            res.status(200).json({
                success: 1,
                message: "Call request sent to doctor",
                roomId,
            });
        } catch (error) {
            console.error("💥 Error sending call request:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };
    getRegisteredDoctors = async (req, res) => {
        try {
            const registeredDoctors = Array.from(doctors.keys());

            console.log(`📊 Debug: Registered doctors requested`);
            console.log(
                `👨‍⚕️ Currently registered: [${registeredDoctors.join(", ")}]`
            );

            res.status(200).json({
                success: true,
                count: registeredDoctors.length,
                doctors: registeredDoctors,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            console.error("Error getting registered doctors:", error);
            res.status(500).json({
                success: false,
                error: "Internal server error",
            });
        }
    };
    // Test call request (for debugging without frontend)
    testCallRequest = async (req, res) => {
        try {
            const { doctorId } = req.body;
            console.log(`🧪 Debug: Testing call to doctor ${doctorId}`);

            if (!doctorId) {
                return res.status(400).json({
                    success: false,
                    error: "doctorId is required for test",
                });
            }

            const roomId = uuidv4();
            const isSent = sendCallRequestToDoctor(doctorId, roomId);

            const { doctors } = require("../utils/socket");
            const registeredDoctors = Array.from(doctors.keys());

            res.status(200).json({
                success: true,
                testResult: isSent ? "SUCCESS" : "FAILED",
                doctorId,
                roomId,
                message: isSent
                    ? "Call request sent successfully"
                    : "Doctor not available",
                registeredDoctors,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            console.error("Error testing call request:", error);
            res.status(500).json({
                success: false,
                error: "Internal server error",
            });
        }
    };

    // Get active recordings
    getActiveRecordingsController = async (req, res) => {
        try {
            const activeRecordings = getActiveRecordings();
            console.log(`🎥 Debug: Active recordings requested`);

            res.status(200).json({
                success: true,
                activeRecordings,
                count: activeRecordings.length,
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            console.error("Error getting active recordings:", error);
            res.status(500).json({
                success: false,
                error: "Internal server error",
            });
        }
    };

    // Manual recording control
    recordingControl = async (req, res) => {
        try {
            const { action } = req.params;
            const { roomId } = req.body;

            if (!roomId) {
                return res.status(400).json({
                    success: false,
                    error: "roomId is required",
                });
            }

            if (action === "start") {
                startRecording(roomId);
                console.log(`🎥 Manual recording started for room: ${roomId}`);
                res.status(200).json({
                    success: true,
                    message: `Recording started for room ${roomId}`,
                    roomId,
                    action: "start",
                    timestamp: new Date().toISOString(),
                });
            } else if (action === "stop") {
                stopRecording(roomId);
                console.log(`🛑 Manual recording stopped for room: ${roomId}`);
                res.status(200).json({
                    success: true,
                    message: `Recording stopped for room ${roomId}`,
                    roomId,
                    action: "stop",
                    timestamp: new Date().toISOString(),
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: "Invalid action. Use 'start' or 'stop'",
                });
            }
        } catch (error) {
            console.error("Error controlling recording:", error);
            res.status(500).json({
                success: false,
                error: "Internal server error",
            });
        }
    };

    // Get server status and socket info
    getServerStatus = async (req, res) => {
        try {
            const { doctors } = require("../utils/socket");
            const activeRecordings = getActiveRecordings();

            res.status(200).json({
                success: true,
                serverStatus: "running",
                socketConnections: {
                    totalDoctors: doctors.size,
                    registeredDoctors: Array.from(doctors.keys()),
                },
                recordings: {
                    activeCount: activeRecordings.length,
                    activeRooms: activeRecordings,
                },
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
            });
        } catch (error) {
            console.error("Error getting server status:", error);
            res.status(500).json({
                success: false,
                error: "Internal server error",
            });
        }
    };

    bookAppointment = async (req, res) => {
        try {
            const schema = Joi.object({
                patientId: Joi.string().required(),
                specialization: Joi.string().required(),
                date: Joi.string().required(), // e.g. "2025-06-21"
                time: Joi.string().required(), // e.g. "15:30"
                reason: Joi.string().optional(),
            });

            const { error } = schema.validate(req.body);
            if (error) {
                return res
                    .status(400)
                    .json({ error: error.details[0].message });
            }

            const { patientId, specialization, date, time, reason } = req.body;

            const hospital = await HospitalModel.findOne({
                "patients.id": patientId,
            });
            if (!hospital) {
                return res
                    .status(404)
                    .json({ error: "Hospital or patient not found" });
            }

            const patient = hospital.patients.find((p) => p.id === patientId);
            if (!patient) {
                return res.status(404).json({ error: "Patient not found" });
            }

            const eligibleDoctors = hospital.doctors.filter(
                (d) => d.specialization === specialization
            );
            if (eligibleDoctors.length === 0) {
                return res
                    .status(404)
                    .json({
                        error: `No doctors found with specialization: ${specialization}`,
                    });
            }

            // Get doctor with the least number of appointments
            const doctorWithLeastAppointments = eligibleDoctors.reduce(
                (prev, curr) => {
                    const prevCount = prev.appointments
                        ? prev.appointments.length
                        : 0;
                    const currCount = curr.appointments
                        ? curr.appointments.length
                        : 0;
                    return currCount < prevCount ? curr : prev;
                }
            );

            const appointment = {
                appointmentId: uuidv4(),
                patientId,
                patientName: patient.name,
                doctorId: doctorWithLeastAppointments.id,
                doctorName: doctorWithLeastAppointments.name,
                specialization,
                date,
                time,
                reason: reason || "",
                status: "booked",
                bookedAt: new Date(),
            };

            patient.appointments.push(appointment);
            doctorWithLeastAppointments.appointments.push(appointment);

            await hospital.save();

            res.status(201).json({
                success: true,
                message:
                    "Appointment booked successfully with least-busy doctor",
                appointment,
            });
        } catch (err) {
            console.error("Error booking appointment:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    getAppointmentsByPatient = async (req, res) => {
        try {
            const { patientId } = req.body;

            const hospital = await HospitalModel.findOne({
                "patients.id": patientId,
            });
            if (!hospital)
                return res
                    .status(404)
                    .json({ error: "Hospital or patient not found" });

            const patient = hospital.patients.find((p) => p.id === patientId);
            if (!patient)
                return res.status(404).json({ error: "Patient not found" });

            res.status(200).json({
                success: true,
                appointments: patient.appointments,
                count: patient.appointments.length,
            });
        } catch (err) {
            console.error("Error fetching patient appointments:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    getPatientReports = async (req, res) => {
        try {
            const { patientId } = req.body;

            const hospital = await HospitalModel.findOne({
                "patients.id": patientId,
            });
            if (!hospital)
                return res
                    .status(404)
                    .json({ error: "Hospital or patient not found" });

            const patient = hospital.patients.find((p) => p.id === patientId);
            if (!patient)
                return res.status(404).json({ error: "Patient not found" });

            res.status(200).json({
                success: true,
                reports: patient.reports || [],
                count: (patient.reports || []).length,
            });
        } catch (err) {
            console.error("Error fetching patient reports:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    };
}

module.exports = new Patient();
