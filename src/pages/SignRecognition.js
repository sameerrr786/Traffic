import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import ML model service
import { loadModel, recognizeTrafficSign } from '../services/modelService';

const SignRecognition = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState(null);
  const [isPlaceholderModel, setIsPlaceholderModel] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  // Load the model when component mounts
  useEffect(() => {
    async function initializeModel() {
      try {
        const loaded = await loadModel();
        setModelLoaded(loaded);
        if (!loaded) {
          setModelError("Failed to load the traffic sign recognition model");
        }
      } catch (error) {
        console.error("Error loading model:", error);
        setModelError("Error loading model: " + error.message);
      }
    }

    initializeModel();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setResult(null); // Clear previous results
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    
    try {
      // Create an image element from the selectedImage data URL
      const img = new Image();
      img.src = selectedImage;
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      
      // Process the image with the model
      const prediction = await recognizeTrafficSign(img);
      setResult(prediction);
      
      // Check if this is a placeholder model
      if (prediction.isPlaceholder) {
        setIsPlaceholderModel(true);
      }
    } catch (error) {
      console.error("Analysis error:", error);
      setResult({
        signType: "Error",
        confidence: "0%",
        description: "An error occurred during analysis: " + error.message
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setResult(null); // Clear previous results
      };
      reader.readAsDataURL(file);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="pt-16 min-h-screen bg-dark-200 hex-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 curved-text">
            Traffic Sign Recognition
          </h1>
          <p className="text-xl text-neutral-light font-secondary">
            Upload a photo of a traffic sign and our AI will identify it instantly
          </p>
          
          {modelError && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-danger bg-opacity-10 text-danger rounded-lg border border-danger border-opacity-20"
            >
              {modelError}
            </motion.div>
          )}
          
          {!modelError && !modelLoaded && (
            <div className="mt-4 flex items-center justify-center space-x-2 text-neutral-light">
              <div className="flex space-x-2">
                <span className="loader-dot"></span>
                <span className="loader-dot"></span>
                <span className="loader-dot"></span>
              </div>
              <span>Initializing model...</span>
            </div>
          )}
          
          {isPlaceholderModel && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-warning bg-opacity-10 text-warning rounded-lg border border-warning border-opacity-20"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p>Running in demo mode with a placeholder model. Results are simulated.</p>
              </div>
              <p className="text-xs mt-1">For accurate results, please add a real model to the /models directory.</p>
            </motion.div>
          )}
        </motion.div>

        <div className="glassy-card rounded-2xl p-8">
          <div className="space-y-8">
            {/* Upload Section */}
            <div 
              className={`file-upload-wrapper ${dragActive ? 'border-orange-primary bg-orange-primary bg-opacity-5' : ''} ${!modelLoaded ? 'opacity-70 pointer-events-none' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {selectedImage ? (
                <div className="space-y-6 w-full">
                  <motion.div 
                    className="relative rounded-xl overflow-hidden shadow-glass max-w-sm mx-auto card-3d"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.img
                      src={selectedImage}
                      alt="Selected traffic sign"
                      className="max-h-64 w-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-primary from-10% to-transparent opacity-60"></div>
                  </motion.div>
                  
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="btn-secondary"
                    >
                      Change Image
                    </button>
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !modelLoaded}
                      className="btn-primary shadow-button"
                    >
                      {isAnalyzing ? (
                        <span className="flex items-center">
                          <div className="flex space-x-1 mr-2">
                            <span className="loader-dot w-2 h-2"></span>
                            <span className="loader-dot w-2 h-2"></span>
                            <span className="loader-dot w-2 h-2"></span>
                          </div>
                          Analyzing...
                        </span>
                      ) : (
                        'Identify Sign'
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <div className="icon-box mx-auto animate-float neon-glow">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full bg-blue-primary bg-opacity-5 pulse-ring"></div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-neutral-light">Upload Traffic Sign Image</h3>
                    <p className="text-sm text-neutral-light opacity-80">
                      Supports JPG, PNG formats
                    </p>
                  </div>
                  
                  <div>
                    <button
                      onClick={onButtonClick}
                      className="btn-primary shadow-button"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      Browse Files
                    </button>
                    <input
                      ref={inputRef}
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={!modelLoaded}
                    />
                  </div>
                  
                  <p className="text-sm text-neutral-light opacity-60">
                    or drag and drop your image here
                  </p>
                </div>
              )}
            </div>

            {/* Results Section */}
            <AnimatePresence>
              {result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="glassy-card rounded-xl p-6 shadow-glass"
                >
                  <h2 className="text-2xl font-bold mb-4 curved-text">
                    Analysis Results
                  </h2>
                  
                  {result.isPlaceholder && (
                    <div className="mb-6 p-3 bg-warning bg-opacity-10 text-warning rounded-lg border border-warning border-opacity-20 text-sm">
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <span>These results are generated by a placeholder model for demonstration purposes.</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-6">
                    <div className="bg-dark-300 rounded-xl p-5 shadow-glass border border-dark-border">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-light">
                          Sign Identified
                        </h3>
                      </div>
                      <p className="text-2xl font-bold text-neutral-light ml-11">{result.signType}</p>
                    </div>
                    
                    <div className="bg-dark-300 rounded-xl p-5 shadow-glass border border-dark-border">
                      <div className="flex items-center mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-secondary flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-light">
                          Confidence Level
                        </h3>
                      </div>
                      
                      <div className="ml-11">
                        <div className="progress-bar mb-2">
                          <motion.div 
                            className="progress-fill"
                            initial={{ width: 0 }}
                            animate={{ width: result.confidence }}
                            transition={{ duration: 1, ease: "easeOut" }}
                          ></motion.div>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm text-blue-primary font-bold">{result.confidence}</p>
                          <p className="text-xs text-neutral-light opacity-60">Based on 43 sign classes</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-dark-300 rounded-xl p-5 shadow-glass border border-dark-border">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-light">
                          Description
                        </h3>
                      </div>
                      <p className="text-neutral-light ml-11">{result.description}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignRecognition; 