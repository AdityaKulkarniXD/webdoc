const mongoose = require("mongoose");

// Appointment schema
const appointmentSchema = new mongoose.Schema({
  appointmentId: String,
  patientId: String,
  patientName: String,
  doctorId: String,
  doctorName: String,
  specialization: String,
  date: String, // Format: "YYYY-MM-DD"
  time: String, // Format: "HH:mm"
  reason: String,
  status: {
    type: String,
    enum: ["booked", "completed", "cancelled"],
    default: "booked"
  },
  bookedAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

// Doctor schema with appointments
const doctorSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  specialization: String,
  phone: String,
  appointments: [appointmentSchema]
}, { _id: false });

// Medical report schema
const medicalReportSchema = new mongoose.Schema({
  reportId: String,
  title: String,
  date: {
    type: Date,
    default: Date.now
  },
  description: String,
  fileUrl: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

// Patient schema with appointments
const patientSchema = new mongoose.Schema({
  id: String,
  name: String,
  age: Number,
  email: String,
  password: String,
  phone: String,
  dob: Date,
  bloodgroup: String,
  gender: {
    type: String,
    enum: ["male", "female", "other"]
  },
  address: String,
  medicalReports: [medicalReportSchema],
  appointments: [appointmentSchema] // ⬅️ added to fetch patient-wise
}, { _id: false });

// Hospital schema
const hospitalSchema = new mongoose.Schema({
  hospitalId: String,
  name: String,
  email: String,
  password: String,
  location: String,
  phone: String,
  address: String,
  doctors: [doctorSchema],
  patients: [patientSchema]
}, { timestamps: true });

module.exports = mongoose.model("Hospital", hospitalSchema);