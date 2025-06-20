const { Server } = require("socket.io");
const fs = require('fs');
const path = require('path');

const doctors = new Map(); // doctorId => socketId
const activeRecordings = new Map(); // roomId => recording info
let ioInstance;

// Create recordings directory if it doesn't exist
const recordingsDir = path.join(__dirname, 'recordings');
if (!fs.existsSync(recordingsDir)) {
    fs.mkdirSync(recordingsDir, { recursive: true });
}

function initSocket(server) {
    const io = new Server(server, {
        cors: { origin: "*" },
    });

    ioInstance = io;

    io.on("connection", (socket) => {
        console.log("🟢 Socket connected:", socket.id);

        socket.on("register-doctor", (doctorId) => {
            doctors.set(doctorId, socket.id);
            console.log(`✅ Registered doctor ${doctorId} with socket ${socket.id}`);
            console.log(`📊 Total registered doctors: ${doctors.size}`);
            console.log(`👨‍⚕️ All registered doctors: [${Array.from(doctors.keys()).join(', ')}]`);
        });

        socket.on("accept-call", ({ roomId }) => {
            socket.join(roomId);
            socket.to(roomId).emit("doctor-joined");
            console.log(`✅ Doctor accepted call and joined room: ${roomId}`);
            
            // Start recording when doctor accepts call
            startRecording(roomId);
        });

        socket.on("join-room", (roomId) => {
            socket.join(roomId);
            console.log(`🏠 Socket ${socket.id} joined room: ${roomId}`);
        });

        socket.on("offer", (data) => {
            socket.to(data.room).emit("offer", data.sdp);
            console.log(`📤 Offer sent to room: ${data.room}`);
        });

        socket.on("answer", (data) => {
            socket.to(data.room).emit("answer", data.sdp);
            console.log(`📥 Answer sent to room: ${data.room}`);
        });

        socket.on("ice-candidate", (data) => {
            socket.to(data.room).emit("ice-candidate", data.candidate);
            console.log(`🧊 ICE candidate sent to room: ${data.room}`);
        });

        // Recording related events
        socket.on("start-recording", ({ roomId }) => {
            startRecording(roomId);
            socket.to(roomId).emit("recording-started");
        });

        socket.on("stop-recording", ({ roomId }) => {
            stopRecording(roomId);
            socket.to(roomId).emit("recording-stopped");
        });

        socket.on("recording-data", ({ roomId, data, timestamp }) => {
            saveRecordingChunk(roomId, data, timestamp);
        });

        socket.on("end-call", ({ roomId }) => {
            console.log(`📞 Call ended for room: ${roomId}`);
            stopRecording(roomId);
            socket.to(roomId).emit("call-ended");
        });

        socket.on("disconnect", () => {
            // Remove doctor from registry
            for (const [doctorId, socketId] of doctors.entries()) {
                if (socketId === socket.id) {
                    doctors.delete(doctorId);
                    console.log(`❌ Unregistered doctor ${doctorId} due to disconnect`);
                    break;
                }
            }
            console.log("🔴 Disconnected socket:", socket.id);
            console.log(`📊 Remaining registered doctors: ${doctors.size}`);
        });
    });
}

function sendCallRequestToDoctor(doctorId, roomId) {
    console.log(`🔍 Attempting to send call request to doctor: ${doctorId}`);
    
    if (!ioInstance) {
        console.log("❌ Socket.IO instance not initialized");
        return false;
    }

    const socketId = doctors.get(doctorId);
    console.log(`🔍 Looking for doctor ${doctorId}, found socketId: ${socketId}`);
    
    if (socketId) {
        console.log(`📤 Sending 'incoming-call' event to socket ${socketId} with roomId: ${roomId}`);
        ioInstance.to(socketId).emit("incoming-call", { roomId });
        console.log(`✅ Call request SUCCESSFULLY sent to doctor ${doctorId}`);
        return true;
    } else {
        console.log(`❌ Doctor ${doctorId} not found in registered doctors`);
        console.log(`📊 Currently registered doctors: [${Array.from(doctors.keys()).join(', ')}]`);
        return false;
    }
}

// Recording functions
function startRecording(roomId) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `call_${roomId}_${timestamp}.webm`;
    const filepath = path.join(recordingsDir, filename);
    
    activeRecordings.set(roomId, {
        filename,
        filepath,
        startTime: Date.now(),
        chunks: []
    });
    
    console.log(`🎥 Recording started for room ${roomId}: ${filename}`);
}

function stopRecording(roomId) {
    const recording = activeRecordings.get(roomId);
    if (recording) {
        const duration = Date.now() - recording.startTime;
        console.log(`🛑 Recording stopped for room ${roomId}. Duration: ${Math.round(duration/1000)}s`);
        console.log(`💾 Recording saved: ${recording.filepath}`);
        
        // Finalize the recording file
        if (recording.chunks.length > 0) {
            const buffer = Buffer.concat(recording.chunks);
            fs.writeFileSync(recording.filepath, buffer);
        }
        
        activeRecordings.delete(roomId);
    }
}

function saveRecordingChunk(roomId, data, timestamp) {
    const recording = activeRecordings.get(roomId);
    if (recording) {
        const chunk = Buffer.from(data, 'base64');
        recording.chunks.push(chunk);
        console.log(`📝 Recording chunk saved for room ${roomId} at ${timestamp}`);
    }
}

// Utility function to get recording status
function getRecordingStatus(roomId) {
    return activeRecordings.has(roomId);
}

// Utility function to get all active recordings
function getActiveRecordings() {
    return Array.from(activeRecordings.keys());
}

module.exports = {
    initSocket,
    sendCallRequestToDoctor,
    getRecordingStatus,
    getActiveRecordings,
    startRecording,
    stopRecording,
    doctors, // Export doctors map for debug controller
    activeRecordings // Export for debug purposes
};