const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const { passwordSchema} = require("../utils/joi");
const HospitalModel = require("../models/hospital");
const Encrypt = require("../utils/crypt");
const { generateToken } = require("../utils/jwt");

class Hospital {
    signup = async (req, res) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: passwordSchema,
                location: Joi.string().required(),
                phone: Joi.string()
                    .pattern(/^[0-9]{10}$/)
                    .required(),
                address: Joi.string().required(),
            });

            const { error } = schema.validate(req.body);
            if (error) {
                return res
                    .status(400)
                    .json({ error: error.details[0].message });
            }

            const { name, email, password, location, phone, address } =
                req.body;

            const existing = await HospitalModel.findOne({ email });
            if (existing) {
                return res
                    .status(400)
                    .json({ error: "Hospital already exists" });
            }

            const hashedPassword = await Encrypt.hashPassword(password);
            let id = uuidv4().slice(0, 6);
            const newHospital = new HospitalModel({
                hospitalId: id,
                name,
                email,
                password: hashedPassword,
                location,
                phone,
                address,
            });

            await newHospital.save();

            res.status(200).json({
                success: 1,
                message: "Hospital registered successfully",
            });
        } catch (error) {
            console.error("Error during hospital signup:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    login = async (req, res) => {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: passwordSchema,
            });

            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const { email, password } = req.body;

            const hospital = await HospitalModel.findOne({ email });
            if (!hospital) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            const isMatch = await Encrypt.comparePassword(password, hospital.password);
            if (!isMatch) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            const payload = {
                _id: hospital._id,
                email: hospital.email,
            };

            const token = await generateToken(payload);

            res.status(200).json({
                success: 1,
                message: "Hospital logged in successfully",
                token,
            });
        } catch (error) {
            console.error("Error during hospital login:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    addDoctor = async (req, res) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: passwordSchema,
                specialization: Joi.string().required(),
                phone: Joi.string()
                    .pattern(/^[0-9]{10}$/)
                    .required(),
            });
            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const { name, email, password, specialization, phone } = req.body;

            const existingDoctor = await HospitalModel.findOne({ "doctors.email": email });
            if (existingDoctor) {
                return res.status(400).json({ error: "Doctor already exists" });
            }

            const hashedPassword = await Encrypt.hashPassword(password);

            const doctor = {
                id: uuidv4(),
                name,
                email,
                password: hashedPassword,
                specialization,
                phone,
            };
            
            await HospitalModel.updateOne(
                { _id: req.hospital._id },
                { $push: { doctors: doctor } }
            );
            res.status(200).json({
                id: doctor.id,
                success: 1,
                message: "Doctor added successfully",
            });
        } catch (error) {
            console.error("Error adding doctor:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    updateDoctor = async (req, res) => {
        try {
            const schema = Joi.object({
                doctorId: Joi.string().required(),
                name: Joi.string().optional(),
                email: Joi.string().email().optional(),
                specialization: Joi.string().optional(),
                phone: Joi.string()
                    .pattern(/^[0-9]{10}$/)
                    .optional(),
            });

            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const { doctorId, name, email, specialization, phone } = req.body;

            const updateFields = {};
            if (name) updateFields["doctors.$.name"] = name;
            if (email) updateFields["doctors.$.email"] = email;
            if (specialization) updateFields["doctors.$.specialization"] = specialization;
            if (phone) updateFields["doctors.$.phone"] = phone;

            const result = await HospitalModel.updateOne(
                { _id: req.hospital._id, "doctors.id": doctorId },
                { $set: updateFields }
            );

            if (result.nModified === 0) {
                return res.status(404).json({ error: "Doctor not found" });
            }

            res.status(200).json({
                success: 1,
                message: "Doctor updated successfully",
            });
        } catch (error) {
            console.error("Error updating doctor:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    deleteDoctor = async (req, res) => {
        try {
            const schema = Joi.object({
                doctorId: Joi.string().required(),
            });

            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const { doctorId } = req.body;

            const result = await HospitalModel.updateOne(
                { _id: req.hospital._id },
                { $pull: { doctors: { id: doctorId } } }
            );

            if (result.nModified === 0) {
                return res.status(404).json({ error: "Doctor not found" });
            }

            res.status(200).json({
                success: 1,
                message: "Doctor deleted successfully",
            });
        } catch (error) {
            console.error("Error deleting doctor:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    addPatient = async (req, res) => {
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                age: Joi.number().integer().min(0).required(),
                email: Joi.string().email().required(),
                password: passwordSchema,
                phone: Joi.string()
                    .pattern(/^[0-9]{10}$/)
                    .required(),
                dob: Joi.date().required(),
                gender: Joi.string().required(),
                bloodgroup: Joi.string().optional(),
                address: Joi.string().required(),
            });

            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const { name, age, email, password, phone, dob, bloodgroup,gender, address } = req.body;

            const hashedPassword = await Encrypt.hashPassword(password);

            const patient = {
                id: uuidv4(),
                name,
                age,
                email,
                password: hashedPassword,
                phone,
                dob,
                gender,
                bloodgroup,
                address,
            };

            await HospitalModel.updateOne(
                { _id: req.hospital._id },
                { $push: { patients: patient } }
            );

            res.status(200).json({
                id: patient.id,
                success: 1,
                message: "Patient added successfully",
            });
        } catch (error) {
            console.error("Error adding patient:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    updatePatient = async (req, res) => {
        try {
            const schema = Joi.object({
                patientId: Joi.string().required(),
                name: Joi.string().optional(),
                age: Joi.number().integer().min(0).optional(),
                email: Joi.string().email().optional(),
                phone: Joi.string()
                    .pattern(/^[0-9]{10}$/)
                    .optional(),
                dob: Joi.date().optional(),
                gender: Joi.string().optional(),
                address: Joi.string().optional(),
            });

            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const { patientId, name, age, email, phone, dob, gender, address } = req.body;
            const updateFields = {};
            if (name) updateFields["patients.$.name"] = name;
            if (age !== undefined) updateFields["patients.$.age"] = age;
            if (email) updateFields["patients.$.email"] = email;
            if (phone) updateFields["patients.$.phone"] = phone;
            if (dob) updateFields["patients.$.dob"] = dob;
            if (gender) updateFields["patients.$.gender"] = gender;
            if (address) updateFields["patients.$.address"] = address;

            const result = await HospitalModel.updateOne(
                { _id: req.hospital._id, "patients.id": patientId },
                { $set: updateFields }
            );

            if (result.nModified === 0) {
                return res.status(404).json({ error: "Patient not found" });
            }

            res.status(200).json({
                success: 1,
                message: "Patient updated successfully",
            });
        } catch (error) {
            console.error("Error updating patient:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    deletePatient = async (req, res) => {
        try {
            const schema = Joi.object({
                patientId: Joi.string().required(),
            });

            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }
            const { patientId } = req.body;

            const result = await HospitalModel.updateOne(
                { _id: req.hospital._id },
                { $pull: { patients: { id: patientId } } }
            );

            if (result.nModified === 0) {
                return res.status(404).json({ error: "Patient not found" });
            }

            res.status(200).json({
                success: 1,
                message: "Patient deleted successfully",
            });
        } catch (error) {
            console.error("Error deleting patient:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

    addMedicalReport = async (req, res) => {
        try {
            const schema = Joi.object({
                patientId: Joi.string().required(),
                title: Joi.string().required(),
                description: Joi.string().optional(),
                fileUrl: Joi.string().uri().optional(),
            });

            const { error } = schema.validate(req.body);
            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            const { patientId, title, description, fileUrl } = req.body;

            const report = {
                reportId: uuidv4(),
                title,
                date: new Date(),
                description,
                fileUrl,
                uploadedAt: new Date(),
            };

            await HospitalModel.updateOne(
                { _id: req.hospital._id, "patients.id": patientId },
                { $push: { "patients.$.medicalReports": report } }
            );

            res.status(200).json({
                reportId: report.reportId,
                success: 1,
                message: "Medical report added successfully",
            });
        } catch (error) {
            console.error("Error adding medical report:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    };

}

module.exports = new Hospital();
