// Global variables
let modelLoaded = false;
let classNames = null;

// API base URL - Change this to your deployed backend URL
const API_URL = 'https://traffic-npsd.onrender.com';

/**
 * Load class names from classes.json
 * @returns {Promise<Array<string>>} Array of class names
 */
const loadClassNames = async () => {
  try {
    // Skip trying to load from remote sources - just use the hardcoded list
    console.log('Using built-in class names list');
    
    // Default hardcoded class names
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
  } catch (error) {
    console.error('Error loading class names:', error);
    return [];
  }
};

/**
 * Load the traffic sign recognition model
 * @returns {Promise<boolean>} - True if model initialized successfully, false otherwise
 */
export const loadModel = async () => {
  try {
    // For Gemini API integration, we just need to load class names
    classNames = await loadClassNames();
    console.log('Traffic sign recognition service initialized');
    modelLoaded = true;
    return true;
  } catch (error) {
    console.error('Failed to initialize traffic sign service:', error);
    return false;
  }
};

/**
 * Get description for a traffic sign
 * @param {string} className - The class name of the sign
 * @returns {string} - Description of the sign
 */
const getSignDescription = (className) => {
  // Expanded set of descriptions for common traffic signs
  const descriptions = {
    // Regulatory Signs
    'Stop': 'A red octagonal sign requiring vehicles to come to a complete stop before proceeding.',
    'Yield': 'A downward-pointing triangular sign with red border indicating drivers must give way to other traffic.',
    'No entry': 'A circular sign with a horizontal white bar on a red background prohibiting entry.',
    'No passing': 'A circular sign with a red border showing two cars side by side, prohibiting overtaking.',
    'No parking': 'A circular sign with a diagonal red line through a P symbol, prohibiting parking.',
    'No stopping': 'A circular sign with a red cross indicating no stopping allowed.',
    'Do not enter': 'A red circle with a white horizontal bar indicating entry is prohibited.',
    'Wrong way': 'A rectangular sign with white text on red background warning drivers they are going the wrong way.',
    
    // Speed Limit Signs
    'Speed limit (20km/h)': 'A circular sign with red border and "20" in the center, setting maximum speed to 20 km/h.',
    'Speed limit (30km/h)': 'A circular sign with red border and "30" in the center, setting maximum speed to 30 km/h.',
    'Speed limit (50km/h)': 'A circular sign with red border and "50" in the center, setting maximum speed to 50 km/h.',
    'Speed limit (60km/h)': 'A circular sign with red border and "60" in the center, setting maximum speed to 60 km/h.',
    'Speed limit (70km/h)': 'A circular sign with red border and "70" in the center, setting maximum speed to 70 km/h.',
    'Speed limit (80km/h)': 'A circular sign with red border and "80" in the center, setting maximum speed to 80 km/h.',
    'Speed limit (100km/h)': 'A circular sign with red border and "100" in the center, setting maximum speed to 100 km/h.',
    'Speed limit (120km/h)': 'A circular sign with red border and "120" in the center, setting maximum speed to 120 km/h.',
    'End of speed limit': 'A circular sign showing the end of a previously indicated speed limit.',
    
    // Warning Signs
    'General caution': 'A triangular sign with a red border and black exclamation mark warning of potential danger ahead.',
    'Dangerous curve to the left': 'A triangular sign showing a curve bending to the left, warning drivers of a sharp left turn.',
    'Dangerous curve to the right': 'A triangular sign showing a curve bending to the right, warning drivers of a sharp right turn.',
    'Double curve': 'A triangular sign showing an S-shaped curve, warning of a series of bends ahead.',
    'Bumpy road': 'A triangular sign showing a bumpy surface, warning of uneven road conditions ahead.',
    'Slippery road': 'A triangular sign showing a car skidding, warning drivers the road may be slippery.',
    'Road narrows': 'A triangular sign warning that the road ahead narrows.',
    'Road work': 'A triangular sign showing a person digging, warning of construction or maintenance work ahead.',
    'Traffic signals': 'A triangular sign showing a traffic light, warning of traffic signal ahead.',
    'Pedestrians': 'A triangular sign with a pedestrian symbol, warning drivers to watch for pedestrians crossing.',
    'Children crossing': 'A triangular sign with children crossing symbol, usually near schools or playgrounds.',
    'Bicycle crossing': 'A triangular sign with a bicycle symbol, warning of a bicycle crossing ahead.',
    'Animal crossing': 'A triangular sign with an animal silhouette, warning of possible animals crossing the road.',
    'Intersection': 'A triangular sign warning of an upcoming intersection.',
    
    // Mandatory Signs
    'Turn right ahead': 'A blue circular sign with a right arrow, instructing drivers to turn right at the next intersection.',
    'Turn left ahead': 'A blue circular sign with a left arrow, instructing drivers to turn left at the next intersection.',
    'Ahead only': 'A blue circular sign with an upward arrow, indicating drivers can only proceed straight ahead.',
    'Go straight or right': 'A blue circular sign showing two directions, allowing drivers to go straight or turn right.',
    'Go straight or left': 'A blue circular sign showing two directions, allowing drivers to go straight or turn left.',
    'Keep right': 'A blue circular sign with a right arrow, instructing drivers to keep to the right of the sign.',
    'Keep left': 'A blue circular sign with a left arrow, instructing drivers to keep to the left of the sign.',
    'Roundabout': 'A blue circular sign with rotating arrows, indicating a roundabout ahead where traffic circulates counterclockwise.',
    
    // Informational Signs
    'Priority road': 'A diamond-shaped sign with yellow center and white border indicating a road where you have priority.',
    'End of priority road': 'A diamond-shaped sign with a black diagonal line, indicating the end of a priority road.',
    'Information': 'A rectangular sign with an "i" symbol providing information to road users.',
    'Hospital': 'A square blue sign with an "H" indicating a hospital is nearby.',
    'Parking': 'A square blue sign with a "P" indicating a parking area.',
    'One-way street': 'A rectangular sign with an arrow indicating the direction of traffic flow.',
    
    // Temporary Warning Signs
    'Road closed': 'A square sign indicating that a road is temporarily closed to traffic.',
    'Detour': 'A rectangular sign with an arrow directing traffic to a temporary route.',
    'Construction zone': 'A rectangular sign warning of a construction area ahead.',
    
    // Unknown or Not Recognized
    'Unknown': 'The traffic sign could not be identified with confidence.',
    'Not a traffic sign': 'The image does not appear to contain a traffic sign.',
    'Unknown traffic sign': 'The system could not identify this traffic sign with confidence. Please try with a clearer image or from a different angle.'
  };
  
  // Return the description or a default message
  return descriptions[className] || `Traffic sign interpreted as: ${className}`;
};

/**
 * Process traffic sign image and return predictions
 * @param {HTMLImageElement} imgElement - The image element to analyze
 * @returns {Promise<Object>} - Recognition result with sign type, confidence, and description
 */
export const recognizeTrafficSign = async (imgElement) => {
  if (!modelLoaded) {
    const loaded = await loadModel();
    if (!loaded) {
      throw new Error('Model not loaded and could not be loaded automatically.');
    }
  }
  
  try {
    // Create a canvas to get the image data
    const canvas = document.createElement('canvas');
    canvas.width = imgElement.naturalWidth || imgElement.width;
    canvas.height = imgElement.naturalHeight || imgElement.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgElement, 0, 0);
    
    // Convert the canvas to a blob
    const blob = await new Promise(resolve => {
      canvas.toBlob(resolve, 'image/jpeg', 0.95);
    });
    
    if (!blob) {
      throw new Error('Failed to convert image to blob');
    }
    
    // Create a file object from the blob
    const imageFile = new File([blob], 'traffic_sign.jpg', { type: 'image/jpeg' });
    
    try {
      // Use the API implementation to send the image to the backend
      return await recognizeTrafficSignAPI(imageFile);
    } catch (apiError) {
      console.error('API error:', apiError);
      
      // If we get an error from the API, we'll display a more helpful message
      throw new Error(`Failed to process image: ${apiError.message}`);
    }
    
  } catch (error) {
    console.error('Error during traffic sign recognition:', error);
    throw error;
  }
};

/**
 * API-based implementation
 * Use this to connect to your Python backend that uses the Gemini Vision API
 * @param {File|Blob} imageFile - The image file to send to the API
 * @returns {Promise<Object>} - Recognition result
 */
export const recognizeTrafficSignAPI = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    console.log('Sending image to API...');
    
    // First check if the API is running
    try {
      const statusResponse = await fetch(`${API_URL}/api/status`);
      if (!statusResponse.ok) {
        throw new Error(`API server is not running properly. Status: ${statusResponse.status}`);
      }
    } catch (statusError) {
      console.error('API status check failed:', statusError);
      throw new Error('Cannot connect to API server. Make sure the backend is running.');
    }
    
    // Send the image to the API
    const response = await fetch(`${API_URL}/api/recognize-sign`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || `API error: ${response.status} ${response.statusText}`;
      console.error('API response error:', errorMessage);
      
      if (response.status === 500) {
        throw new Error(`Server error processing the image. Details: ${errorData.details || 'Unknown error'}`);
      }
      
      throw new Error(errorMessage);
    }
    
    const result = await response.json();
    
    // Handle the new API response format
    // The new API returns { sign: "Sign Name" } or { sign: "Unknown", error: "Error message" }
    const signType = result.sign || "Unknown";
    
    // Sanitize response to prevent inappropriate text
    let cleanSignType = signType;
    if (signType.toLowerCase().includes("unknown") || !signType || signType.length > 30) {
      cleanSignType = "Unknown traffic sign";
    }
    
    // For error cases
    if (result.error) {
      console.warn("Recognition warning:", result.error);
    }
    
    // Set confidence level - lower for unknown signs
    let confidence = "75%";
    if (cleanSignType === "Unknown" || cleanSignType === "Unknown traffic sign" || cleanSignType === "Not a traffic sign") {
      confidence = "25%";
    }
    
    // Create a properly formatted response for the frontend
    const formattedResult = {
      signType: cleanSignType,
      confidence: confidence,
      description: getSignDescription(cleanSignType)
    };
    
    return formattedResult;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}; 