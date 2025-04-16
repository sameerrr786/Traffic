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

  // Shadow styles for consistent animation
  const shadowBase = "0px 0px 8px rgba(0, 245, 255, 0.3)";
  const shadowHover = "0px 0px 20px rgba(0, 245, 255, 0.7)";
  const neonGlow = "0 0 5px #00f5ff, 0 0 10px #00f5ff";

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
    <div className="pt-16 min-h-screen bg-black">
      <div className="absolute inset-0 opacity-5">
        <div style={{
          backgroundSize: "30px 30px",
          backgroundImage: `linear-gradient(to right, #00f5ff 1px, transparent 1px),
                          linear-gradient(to bottom, #00f5ff 1px, transparent 1px)`,
          height: "100%",
          zIndex: 0
        }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 
            className="text-5xl font-bold mb-4"
            style={{
              background: "linear-gradient(to right, #00f5ff, #4e66f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 8px rgba(0, 245, 255, 0.5))"
            }}
          >
            Traffic Sign Recognition
          </h1>
          <p className="text-xl font-secondary" style={{ color: "#e0e0e0" }}>
            Upload a photo of a traffic sign and our AI will identify it instantly
          </p>
          
          {modelError && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-lg" 
              style={{ 
                backgroundColor: "rgba(255,30,30,0.1)",
                border: "1px solid rgba(255,30,30,0.3)",
                color: "#ff5555"
              }}
            >
              {modelError}
            </motion.div>
          )}
          
          {!modelError && !modelLoaded && (
            <div className="mt-4 flex items-center justify-center space-x-2" style={{ color: "#00f5ff" }}>
              <div className="flex space-x-2">
                <span className="loader-dot" style={{ backgroundColor: "#00f5ff" }}></span>
                <span className="loader-dot" style={{ backgroundColor: "#00f5ff" }}></span>
                <span className="loader-dot" style={{ backgroundColor: "#00f5ff" }}></span>
              </div>
              <span>Initializing model...</span>
            </div>
          )}
          
          {isPlaceholderModel && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-lg"
              style={{ 
                backgroundColor: "rgba(255, 181, 46, 0.1)",
                border: "1px solid rgba(255, 181, 46, 0.3)",
                color: "#ffb52e"
              }}
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

        <div className="rounded-2xl p-8 backdrop-blur-sm" style={{ 
          backgroundColor: "rgba(0,0,0,0.7)", 
          border: "1px solid #00f5ff",
          boxShadow: shadowBase
        }}>
          <div className="space-y-8">
            {/* Upload Section */}
            <div 
              className={`relative flex flex-col items-center border-2 rounded-xl p-8 transition-all duration-300 ${!modelLoaded ? 'opacity-70 pointer-events-none' : ''}`}
              style={{ 
                borderColor: dragActive ? '#00f5ff' : 'rgba(0, 245, 255, 0.3)',
                borderStyle: 'dashed',
                backgroundColor: dragActive ? 'rgba(0, 245, 255, 0.05)' : 'transparent'
              }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <input
                type="file"
                ref={inputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              {selectedImage ? (
                <div className="space-y-6 w-full">
                  <motion.div 
                    className="relative rounded-xl overflow-hidden max-w-sm mx-auto"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.02 }}
                    style={{ boxShadow: shadowBase }}
                  >
                    <motion.img
                      src={selectedImage}
                      alt="Selected traffic sign"
                      className="max-h-64 w-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black from-10% to-transparent opacity-60"></div>
                  </motion.div>
                  
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="px-4 py-2 rounded-lg transition-all duration-300"
                      style={{ 
                        backgroundColor: "black",
                        border: "1px solid #00f5ff",
                        color: "#00f5ff",
                        textShadow: neonGlow
                      }}
                    >
                      Change Image
                    </button>
                    <button
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !modelLoaded}
                      className="px-4 py-2 rounded-lg transition-all duration-300"
                      style={{ 
                        background: "linear-gradient(to right, #00f5ff, #4e66f5)",
                        boxShadow: shadowBase, 
                        color: "white"
                      }}
                    >
                      {isAnalyzing ? (
                        <span className="flex items-center">
                          <div className="flex space-x-1 mr-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "white", animation: "bounce 1.4s ease-in-out 0s infinite" }}></span>
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "white", animation: "bounce 1.4s ease-in-out 0.2s infinite" }}></span>
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "white", animation: "bounce 1.4s ease-in-out 0.4s infinite" }}></span>
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
                    <div className="w-16 h-16 flex items-center justify-center mx-auto rounded-full" style={{ 
                      background: "linear-gradient(to right, #00f5ff, #4e66f5)",
                      boxShadow: "0 0 15px rgba(0, 245, 255, 0.5)",
                      animation: "float 6s ease-in-out infinite"
                    }}>
                      <svg
                        className="w-8 h-8 text-white"
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
                    <div className="absolute -bottom-3 -right-3 w-16 h-16 rounded-full" style={{ 
                      background: "rgba(0, 245, 255, 0.1)",
                      animation: "pulse-ring 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite"
                    }}></div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold" style={{ color: "#00f5ff", textShadow: neonGlow }}>
                      Upload Traffic Sign Image
                    </h3>
                    <p className="text-sm" style={{ color: "#e0e0e0" }}>
                      Supports JPG, PNG formats
                    </p>
                  </div>
                  
                  <div>
                    <button
                      onClick={onButtonClick}
                      className="px-6 py-3 rounded-lg transition-all duration-300"
                      style={{ 
                        background: "linear-gradient(to right, #00f5ff, #4e66f5)",
                        boxShadow: shadowBase, 
                        color: "white"
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      Upload Image
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="rounded-xl p-6" 
                  style={{ 
                    backgroundColor: "rgba(0,0,0,0.5)", 
                    border: "1px solid #00f5ff",
                    boxShadow: shadowBase
                  }}
                >
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "#00f5ff", textShadow: neonGlow }}>
                    Result:
                  </h3>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="md:w-1/3 flex justify-center">
                      <div className="w-32 h-32 rounded-full flex items-center justify-center" style={{ 
                        background: "linear-gradient(135deg, rgba(0, 245, 255, 0.1), rgba(78, 102, 245, 0.1))",
                        border: "2px solid #00f5ff",
                        boxShadow: "0 0 15px rgba(0, 245, 255, 0.3)"
                      }}>
                        <span className="text-4xl" style={{ color: "#00f5ff", textShadow: neonGlow }}>
                          {result.signType === "Error" ? "⚠️" : "🔍"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      <h4 className="text-xl font-bold mb-2" style={{ color: "#00f5ff", textShadow: neonGlow }}>
                        {result.signType}
                      </h4>
                      
                      {result.confidence && result.signType !== "Error" && (
                        <div className="mb-3">
                          <div className="text-sm mb-1" style={{ color: "#e0e0e0" }}>Confidence: {result.confidence}</div>
                          <div className="h-2 w-full rounded-full" style={{ backgroundColor: "rgba(0, 245, 255, 0.1)" }}>
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: result.confidence,
                                background: "linear-gradient(to right, #00f5ff, #4e66f5)",
                                boxShadow: "0 0 10px rgba(0, 245, 255, 0.5)"
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                      
                      <p style={{ color: "#e0e0e0" }}>{result.description}</p>
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