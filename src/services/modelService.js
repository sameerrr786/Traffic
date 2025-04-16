import * as tf from '@tensorflow/tfjs';

// Global model variable
let model = null;
let isModelLoading = false;
let modelLoadingError = null;
let classNames = null;

/**
 * Load class names from classes.json
 * @returns {Promise<Array<string>>} Array of class names
 */
const loadClassNames = async () => {
  try {
    const response = await fetch('/models/classes.json');
    if (!response.ok) {
      throw new Error(`Failed to load classes: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.classes || [];
  } catch (error) {
    console.error('Error loading class names:', error);
    // Return the default class names if the file isn't available
    return [
      'Speed limit (20km/h)',
      'Speed limit (30km/h)',
      'Speed limit (50km/h)',
      'Speed limit (60km/h)',
      'Speed limit (70km/h)',
      'Speed limit (80km/h)',
      'End of speed limit (80km/h)',
      'Speed limit (100km/h)',
      'Speed limit (120km/h)',
      'No passing',
      'No passing for vehicles over 3.5 tons',
      'Right-of-way at the next intersection',
      'Priority road',
      'Yield',
      'Stop',
      'No vehicles',
      'Vehicles over 3.5 tons prohibited',
      'No entry',
      'General caution',
      'Dangerous curve to the left',
      'Dangerous curve to the right',
      'Double curve',
      'Bumpy road',
      'Slippery road',
      'Road narrows on the right',
      'Road work',
      'Traffic signals',
      'Pedestrians',
      'Children crossing',
      'Bicycles crossing',
      'Beware of ice/snow',
      'Wild animals crossing',
      'End of all speed and passing limits',
      'Turn right ahead',
      'Turn left ahead',
      'Ahead only',
      'Go straight or right',
      'Go straight or left',
      'Keep right',
      'Keep left',
      'Roundabout mandatory',
      'End of no passing',
      'End of no passing by vehicles over 3.5 tons'
    ];
  }
};

/**
 * Load the traffic sign recognition model
 * @returns {Promise<boolean>} - True if model loaded successfully, false otherwise
 */
export const loadModel = async () => {
  // If already loading, wait for that to complete
  if (isModelLoading) {
    return !modelLoadingError;
  }
  
  // If already loaded successfully, return true
  if (model) {
    return true;
  }
  
  isModelLoading = true;
  modelLoadingError = null;
  
  try {
    // Load the class names first
    classNames = await loadClassNames();
    
    // Now load the model
    model = await tf.loadLayersModel('/models/model.json');
    console.log('Traffic sign recognition model loaded successfully');
    return true;
  } catch (error) {
    console.error('Failed to load traffic sign model:', error);
    modelLoadingError = error;
    
    // Create a simple fallback model for demo purposes
    try {
      console.log('Creating a simple fallback model for demonstration');
      model = tf.sequential();
      
      // Create a model that matches our Python structure but simplified
      model.add(tf.layers.conv2d({
        inputShape: [64, 64, 3],
        kernelSize: 3,
        filters: 32,
        activation: 'relu'
      }));
      model.add(tf.layers.maxPooling2d({poolSize: 2}));
      
      model.add(tf.layers.flatten());
      model.add(tf.layers.dense({units: 128, activation: 'relu'}));
      model.add(tf.layers.dense({units: classNames.length, activation: 'softmax'}));
      
      model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
      });
      console.log('Fallback model created successfully');
      return true;
    } catch (fallbackError) {
      console.error('Failed to create fallback model:', fallbackError);
      return false;
    }
  } finally {
    isModelLoading = false;
  }
};

/**
 * Get description for a traffic sign
 * @param {string} className - The class name of the sign
 * @returns {string} - Description of the sign
 */
const getSignDescription = (className) => {
  // This is a simplified version - you should expand with proper descriptions
  const descriptions = {
    'Stop': 'A red octagonal sign with white border and the word "STOP"',
    'Yield': 'A downward-pointing triangular sign with red border and white center',
    'Speed limit (30km/h)': 'A circular sign with red border and "30" in the center',
    'Priority road': 'A diamond-shaped sign with yellow center and white border',
    'No passing': 'A circular sign with a red border showing two cars side by side',
    'No entry': 'A circular sign with a horizontal white bar on a red background',
    'General caution': 'A triangular sign with a red border and black exclamation mark',
    'Pedestrians': 'A triangular sign with a pedestrian symbol',
    'Children crossing': 'A triangular sign with children crossing symbol',
    'Bicycles crossing': 'A triangular sign with a bicycle symbol',
    'Road work': 'A triangular sign showing a person digging',
    'Traffic signals': 'A triangular sign showing a traffic light',
    'Dangerous curve to the left': 'A triangular sign showing a curve bending to the left',
    'Dangerous curve to the right': 'A triangular sign showing a curve bending to the right',
    'Double curve': 'A triangular sign showing an S-shaped curve',
    'Bumpy road': 'A triangular sign showing a bumpy surface',
    'Slippery road': 'A triangular sign showing a car skidding',
  };
  
  // Return the description or a default message
  return descriptions[className] || `Traffic sign classified as ${className}`;
};

/**
 * Preprocess an image for the model
 * @param {HTMLImageElement} img - The image element to process
 * @returns {tf.Tensor} - Processed tensor ready for prediction
 */
const preprocessImage = (img) => {
  // Create a tensor from the image
  const imageTensor = tf.browser.fromPixels(img);
  
  // Resize to the model's expected input dimensions (64x64)
  // This matches the Python model's input dimensions
  const resized = tf.image.resizeBilinear(imageTensor, [64, 64]);
  
  // Normalize values to [0, 1]
  const normalized = resized.div(tf.scalar(255));
  
  // Add batch dimension and return
  return normalized.expandDims(0);
};

/**
 * Process traffic sign image and return predictions
 * @param {HTMLImageElement} imgElement - The image element to analyze
 * @returns {Promise<Object>} - Recognition result with sign type, confidence, and description
 */
export const recognizeTrafficSign = async (imgElement) => {
  if (!model) {
    const loaded = await loadModel();
    if (!loaded) {
      throw new Error('Model not loaded and could not be loaded automatically.');
    }
  }
  
  try {
    // Preprocess the image
    const tensor = preprocessImage(imgElement);
    
    // Get prediction from model
    const predictions = await model.predict(tensor);
    const probabilities = await predictions.data();
    
    // Cleanup tensors to prevent memory leaks
    tensor.dispose();
    predictions.dispose();
    
    // Get the index of the highest probability
    const highestProbIndex = probabilities.indexOf(Math.max(...probabilities));
    
    // Get the class name and probability
    const signType = classNames[highestProbIndex];
    const confidence = `${(probabilities[highestProbIndex] * 100).toFixed(1)}%`;
    
    // Return the result
    return {
      signType,
      confidence,
      description: getSignDescription(signType),
      isPlaceholder: !!modelLoadingError
    };
  } catch (error) {
    console.error('Error during traffic sign recognition:', error);
    throw new Error('Failed to process image: ' + error.message);
  }
};

/**
 * Alternative API-based implementation
 * Use this if you have a separate backend for your ML model
 * @param {File|Blob} imageFile - The image file to send to the API
 * @returns {Promise<Object>} - Recognition result
 */
export const recognizeTrafficSignAPI = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    const response = await fetch('http://your-api-url/predict', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}; 