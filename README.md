# Traffic Sign Recognition

A machine learning application that recognizes traffic signs from images. This project uses TensorFlow.js to run the ML model directly in the browser.

## Features

- Upload images of traffic signs
- Real-time analysis and classification
- Display of results with confidence scores
- Responsive UI with animations (using Framer Motion)

## How to Use

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the application: `npm start`
4. Open your browser to `http://localhost:3000`
5. Upload an image of a traffic sign
6. View the recognition results

## About the Model

This application uses TensorFlow.js to run a Convolutional Neural Network (CNN) in the browser. To use the application with a real model:

1. Train a model for traffic sign recognition (using TensorFlow.js or convert from TensorFlow/PyTorch)
2. Save the model in TensorFlow.js format
3. Place the model files in `public/models/`
4. Update the `modelService.js` file with your model's classes and parameters

## Technologies Used

- React.js for the UI
- TensorFlow.js for the ML model
- Framer Motion for animations
- Tailwind CSS for styling 