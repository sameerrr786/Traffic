const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3005;

// Enable CORS with more options
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Allow deployed frontend
  methods: ['GET', 'POST'],
  credentials: true
}));

// Set up body parser for JSON with increased limit
app.use(express.json({ limit: '50mb' }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  console.log('Creating uploads directory...');
  fs.mkdirSync(uploadsDir);
}

// Set up multer for file uploads with improved configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    // Use timestamp and original name
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1 // Only 1 file at a time
  },
  fileFilter: function (req, file, cb) {
    // Accept only image files
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'));
    }
    cb(null, true);
  }
});

// Handle sign recognition API endpoint
app.post('/api/recognize-sign', upload.single('image'), (req, res) => {
  console.log('Received image recognition request');
  
  // Check if file was uploaded
  if (!req.file) {
    console.error('No file uploaded');
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  // Image path
  const imagePath = req.file.path;
  
  // Get API key from environment or use a default for testing
  const apiKey = process.env.GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';
  
  // Use spawn to run the Python script
  const pythonProcess = spawn('python3', ['analyze_image.py', imagePath]);
  
  // Variables to collect output
  let outputData = '';
  let errorData = '';
  let geminiResponseStarted = false;
  
  // Collect data from the Python script
  pythonProcess.stdout.on('data', (data) => {
    outputData += data.toString();
    const dataStr = data.toString().trim();
    
    // Check if this is the Gemini API response section
    if (dataStr.includes('=== GEMINI API RESPONSE START ===')) {
      geminiResponseStarted = true;
      console.log('\n\x1b[1m\x1b[36m================ GEMINI API RESPONSE ================\x1b[0m');
    } 
    else if (dataStr.includes('=== GEMINI API RESPONSE END ===')) {
      geminiResponseStarted = false;
      console.log('\x1b[1m\x1b[36m===================================================\x1b[0m\n');
    }
    // If we're in the API response section, highlight it
    else if (geminiResponseStarted) {
      console.log(`\x1b[36m${dataStr}\x1b[0m`);
    }
    // Regular log for other output
    else {
      console.log(`Python stdout: ${dataStr}`);
    }
  });
  
  pythonProcess.stderr.on('data', (data) => {
    errorData += data.toString();
    const errorStr = data.toString().trim();
    console.error(`\x1b[31mPython stderr: ${errorStr}\x1b[0m`);
  });
  
  // Set environment variables for the Python process
  pythonProcess.env = { ...process.env, GEMINI_API_KEY: apiKey };
  
  // Set a timeout (30 seconds)
  const timeout = setTimeout(() => {
    console.error('Python process timed out');
    pythonProcess.kill();
    
    // Clean up the uploaded file
    try {
      fs.unlinkSync(imagePath);
    } catch (err) {
      console.error(`Error deleting file: ${err}`);
    }
    
    return res.json({ sign: 'Unknown (timeout)', error: 'Processing timed out' });
  }, 30000);
  
  // Handle process completion
  pythonProcess.on('close', (code) => {
    clearTimeout(timeout);
    console.log(`Python process exited with code ${code}`);
    console.log(`Total stdout data: ${outputData.length} bytes`);
    console.log(`Total stderr data: ${errorData.length} bytes`);
    
    // Clean up the uploaded file
    try {
      fs.unlinkSync(imagePath);
      console.log(`Deleted temp file: ${imagePath}`);
    } catch (err) {
      console.error(`Error deleting file: ${err}`);
    }
    
    if (code !== 0 || errorData) {
      console.error(`Python error: ${errorData}`);
      return res.json({ sign: 'Unknown', error: errorData });
    }
    
    // Extract the sign type from the output using regex
    const match = outputData.match(/🔍 Gemini says: (.+)/);
    const signType = match ? match[1].trim() : 'Unknown';
    
    console.log(`Identified sign: ${signType}`);
    console.log(`Response to client: ${JSON.stringify({ sign: signType })}`);
    return res.json({ sign: signType });
  });
});

// For any request to check if the API is running
app.get('/api/status', (req, res) => {
  res.json({ status: 'API is running' });
});

// For any other request, send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server and handle errors
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`API server URL: http://localhost:${port}/api/recognize-sign`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Trying port ${parseInt(port) + 1}`);
    server.close();
    app.listen(parseInt(port) + 1, () => {
      console.log(`Server listening on port ${parseInt(port) + 1}`);
      console.log(`API server URL: http://localhost:${parseInt(port) + 1}/api/recognize-sign`);
    });
  } else {
    console.error(`Server error: ${error.message}`);
  }
}); 