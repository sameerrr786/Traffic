import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  // Shadow styles for consistent animation
  const shadowBase = "0px 0px 8px rgba(0, 245, 255, 0.3)";
  const shadowHover = "0px 0px 20px rgba(0, 245, 255, 0.7)";

  return (
    <div className="pt-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 
            className="text-4xl font-bold mb-4"
            style={{
              background: "linear-gradient(to right, #00f5ff, #4e66f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 8px rgba(0, 245, 255, 0.5))"
            }}
          >
            About TrafficSignAI
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "#e0e0e0" }}>
            We're revolutionizing traffic sign recognition with cutting-edge AI
            technology, making roads safer and navigation easier for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-xl backdrop-blur-sm"
            style={{ 
              backgroundColor: "rgba(0,0,0,0.7)", 
              border: "1px solid #00f5ff",
              boxShadow: shadowBase
            }}
            whileHover={{ 
              y: -5, 
              boxShadow: shadowHover
            }}
          >
            <h2 
              className="text-2xl font-bold mb-4"
              style={{
                background: "linear-gradient(to right, #00f5ff, #4e66f5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 5px rgba(0, 245, 255, 0.5))"
              }}
            >
              Our Mission
            </h2>
            <p style={{ color: "#e0e0e0" }}>
              Our mission is to enhance road safety and improve traffic management
              through advanced AI-powered sign recognition technology. We aim to
              make traffic sign identification accessible to everyone, from
              professional drivers to everyday commuters.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-xl backdrop-blur-sm"
            style={{ 
              backgroundColor: "rgba(0,0,0,0.7)", 
              border: "1px solid #00f5ff",
              boxShadow: shadowBase
            }}
            whileHover={{ 
              y: -5, 
              boxShadow: shadowHover
            }}
          >
            <h2 
              className="text-2xl font-bold mb-4"
              style={{
                background: "linear-gradient(to right, #4e66f5, #00f5ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 5px rgba(0, 245, 255, 0.5))"
              }}
            >
              Technology
            </h2>
            <p style={{ color: "#e0e0e0" }}>
              We utilize state-of-the-art machine learning algorithms and computer
              vision techniques to accurately identify and classify traffic signs
              in real-time. Our system is continuously learning and improving to
              provide the most reliable results.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-xl"
          style={{ 
            backgroundColor: "rgba(0,0,0,0.5)", 
            border: "1px solid #00f5ff",
            boxShadow: shadowBase 
          }}
        >
          <h2 
            className="text-2xl font-bold mb-4 text-center"
            style={{
              background: "linear-gradient(to right, #00f5ff, #4e66f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 5px rgba(0, 245, 255, 0.5))"
            }}
          >
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Real-time Processing',
                description: 'Instant sign recognition with minimal delay',
                gradient: 'linear-gradient(to right, #00f5ff, #4e66f5)',
              },
              {
                title: 'High Accuracy',
                description: 'Trained on diverse datasets for reliable results',
                gradient: 'linear-gradient(to right, #00f5ff, #f566cb)',
              },
              {
                title: 'User-Friendly',
                description: 'Simple interface for easy navigation',
                gradient: 'linear-gradient(to right, #66f5a3, #00f5ff)',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-6 rounded-lg transition-all duration-300"
                style={{ 
                  backgroundColor: "rgba(0,0,0,0.7)", 
                  border: "1px solid #00f5ff",
                  boxShadow: "0px 0px 5px rgba(0, 245, 255, 0.2)" 
                }}
                whileHover={{ 
                  y: -3, 
                  boxShadow: "0px 0px 15px rgba(0, 245, 255, 0.4)" 
                }}
              >
                <h3 
                  className="text-lg font-semibold mb-2"
                  style={{
                    background: feature.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 2px rgba(0, 245, 255, 0.5))"
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ color: "#e0e0e0" }}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 