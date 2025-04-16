import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  // Single shadow style to prevent format mixing
  const shadowStyle = "0 0 8px rgba(0, 245, 255, 0.3)";
  
  // Hover without shadow animation
  const hoverStyle = { y: -5 };

  return (
    <div className="pt-16 bg-black min-h-screen">
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
            We're revolutionizing traffic sign recognition with cutting-edge technology, 
            making roads safer and navigation easier for everyone.
          </p>
        </motion.div>

        {/* New About Us Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-xl backdrop-blur-sm mb-16"
          style={{ 
            backgroundColor: "rgba(0,0,0,0.7)", 
            border: "1px solid #00f5ff",
            boxShadow: shadowStyle,
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "linear-gradient(45deg, #00f5ff 25%, transparent 25%, transparent 50%, #00f5ff 50%, #00f5ff 75%, transparent 75%, transparent)",
              backgroundSize: "20px 20px",
              zIndex: 0
            }}
          ></div>
          
          <div className="relative z-10">
            <h2 
              className="text-3xl font-bold mb-6 text-center"
              style={{
                background: "linear-gradient(to right, #00f5ff, #4e66f5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 5px rgba(0, 245, 255, 0.5))"
              }}
            >
              About Us
            </h2>
            <p className="text-lg mb-6 leading-relaxed" style={{ color: "#e0e0e0" }}>
              At TrafficSignAI, we are dedicated to enhancing road safety through advanced traffic sign detection technology. 
              Our mission is to develop intelligent systems that accurately recognize and classify traffic signs in real-time, 
              aiding drivers and autonomous vehicles in making informed decisions.
            </p>
            
            <h3 
              className="text-2xl font-bold mb-4 mt-8"
              style={{
                background: "linear-gradient(to right, #00f5ff, #4e66f5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 5px rgba(0, 245, 255, 0.5))"
              }}
            >
              Our Technology
            </h3>
            <p className="text-lg mb-6 leading-relaxed" style={{ color: "#e0e0e0" }}>
              We leverage cutting-edge computer vision and deep learning algorithms to detect a wide range of traffic signs, 
              including speed limits, stop signs, and warnings. By utilizing models like YOLOv8, our system achieves high 
              accuracy and speed, making it suitable for real-world applications such as autonomous driving and smart traffic management.
            </p>
            
            <h3 
              className="text-2xl font-bold mb-4 mt-8"
              style={{
                background: "linear-gradient(to right, #00f5ff, #4e66f5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 5px rgba(0, 245, 255, 0.5))"
              }}
            >
              Why Traffic Sign Detection?
            </h3>
            <p className="text-lg mb-6 leading-relaxed" style={{ color: "#e0e0e0" }}>
              Traffic sign detection is crucial for improving road safety and advancing autonomous driving technologies. 
              With the increasing complexity of driving environments, our system aims to reduce accidents caused by missed 
              or misinterpreted signs by providing real-time recognition and alerts.
            </p>
            
            <h3 
              className="text-2xl font-bold mb-4 mt-8"
              style={{
                background: "linear-gradient(to right, #00f5ff, #4e66f5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 5px rgba(0, 245, 255, 0.5))"
              }}
            >
              Our Vision
            </h3>
            <p className="text-lg mb-6 leading-relaxed" style={{ color: "#e0e0e0" }}>
              We envision a future where intelligent transportation systems seamlessly integrate with our daily lives, 
              reducing human error and enhancing the overall driving experience. Through continuous innovation and 
              collaboration, we strive to make roads safer for everyone.
            </p>
            
            <motion.div 
              className="w-2/3 h-1 mx-auto mt-10" 
              style={{ background: "linear-gradient(to right, #00f5ff, #4e66f5)" }}
              initial={{ width: "10%" }}
              animate={{ width: "66%" }}
              transition={{ duration: 1.2 }}
            ></motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-xl backdrop-blur-sm transform transition-transform duration-300 hover:-translate-y-2"
            style={{ 
              backgroundColor: "rgba(0,0,0,0.7)", 
              border: "1px solid #00f5ff",
              boxShadow: shadowStyle
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
              through advanced sign recognition technology. We aim to
              make traffic sign identification accessible to everyone, from
              professional drivers to everyday commuters, helping reduce accidents and save lives.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-xl backdrop-blur-sm transform transition-transform duration-300 hover:-translate-y-2"
            style={{ 
              backgroundColor: "rgba(0,0,0,0.7)", 
              border: "1px solid #00f5ff",
              boxShadow: shadowStyle
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
              We utilize state-of-the-art pattern recognition algorithms and computer
              vision techniques to accurately identify and classify traffic signs
              in real-time. Our system is continuously learning and improving to
              provide the most reliable results through advanced computational methods.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-8 rounded-xl mb-16"
          style={{ 
            backgroundColor: "rgba(0,0,0,0.5)", 
            border: "1px solid #00f5ff",
            boxShadow: shadowStyle
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                className="p-6 rounded-lg transform transition-transform duration-300 hover:-translate-y-2"
                style={{ 
                  backgroundColor: "rgba(0,0,0,0.7)", 
                  border: "1px solid #00f5ff",
                  boxShadow: shadowStyle
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

        {/* History Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-8 rounded-xl backdrop-blur-sm mb-16"
          style={{ 
            backgroundColor: "rgba(0,0,0,0.7)", 
            border: "1px solid #00f5ff",
            boxShadow: shadowStyle
          }}
        >
          <h2 
            className="text-2xl font-bold mb-6 text-center"
            style={{
              background: "linear-gradient(to right, #00f5ff, #4e66f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 5px rgba(0, 245, 255, 0.5))"
            }}
          >
            Our Journey
          </h2>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 font-bold" style={{ color: "#00f5ff" }}>2025</div>
              <div className="md:w-3/4" style={{ color: "#e0e0e0" }}>
              Our Traffic Sign Prediction Project took shape with the goal of improving road safety through a smart and efficient system. We started by collecting a wide variety of traffic sign images from different environments and conditions. Our focus was on creating a solution that could accurately detect and recognize traffic signs in real-time. After multiple rounds of development and refinement, we built a two-stage system: one part identifies the signs from road scenes, while the other classifies them into specific categories. We rigorously tested our system to ensure it works reliably across various scenarios. This year marked a major achievement as we successfully developed and demonstrated a real-time application that brings us a step closer to safer and more responsive driving support systems.


              </div>
            </div>
            
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="p-8 rounded-xl backdrop-blur-sm mb-16"
          style={{ 
            backgroundColor: "rgba(0,0,0,0.7)", 
            border: "1px solid #00f5ff",
            boxShadow: shadowStyle
          }}
        >
          <h2 
            className="text-2xl font-bold mb-6 text-center"
            style={{
              background: "linear-gradient(to right, #00f5ff, #4e66f5)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 5px rgba(0, 245, 255, 0.5))"
            }}
          >
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'A.Sameer',
                role: '23BCE1079',
                bio: 'CSE CORE',
                gradient: 'linear-gradient(to right, #00f5ff, #4e66f5)',
              },
              {
                name: 'Sanjay Venkat',
                role: '23BCE1928',
                bio: 'CSE CORE',
                gradient: 'linear-gradient(to right, #f566cb, #4e66f5)',
              },
              {
                name: 'Madhulika',
                role: '23BCE1796',
                bio: 'CSE CORE',
                gradient: 'linear-gradient(to right, #66f5a3, #00f5ff)',
              },
              {
                name: 'Sukumaran',
                role: '23BCE1876',
                bio: 'CSE CORE',
                gradient: 'linear-gradient(to right, #66f5a3, #00f5ff)',
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                whileHover={hoverStyle}
                className="p-6 rounded-lg text-center"
                style={{ 
                  backgroundColor: "rgba(0,0,0,0.8)", 
                  border: "1px solid #00f5ff",
                  boxShadow: shadowStyle
                }}
              >
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{
                    background: member.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 3px rgba(0, 245, 255, 0.5))"
                  }}
                >
                  {member.name}
                </h3>
                <p className="text-lg mb-2" style={{ color: "#00f5ff" }}>{member.role}</p>
                <p style={{ color: "#e0e0e0" }}>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Future Developments Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="p-8 rounded-xl backdrop-blur-sm"
          style={{ 
            backgroundColor: "rgba(0,0,0,0.7)", 
            border: "1px solid #00f5ff",
            boxShadow: shadowStyle
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
            Future Roadmap
          </h2>
          <p className="text-center mb-8" style={{ color: "#e0e0e0" }}>
            We're continuously working to improve our technology and expand our services.
            Here's what's coming next:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Mobile Application',
                description: 'A dedicated mobile app for iOS and Android that works offline and provides real-time sign recognition during driving.',
                gradient: 'linear-gradient(to right, #00f5ff, #4e66f5)',
              },
              {
                title: 'Integration with Navigation',
                description: 'Partnering with navigation systems to provide advance warning of upcoming traffic signs and speed limits.',
                gradient: 'linear-gradient(to right, #f566cb, #4e66f5)',
              },
              {
                title: 'International Expansion',
                description: 'Adding support for traffic signs from more countries and regions around the world.',
                gradient: 'linear-gradient(to right, #66f5a3, #00f5ff)',
              },
              {
                title: 'Educational Resources',
                description: 'Creating comprehensive learning materials about traffic signs for new drivers and international travelers.',
                gradient: 'linear-gradient(to right, #f5d866, #f566cb)',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.7 + (index * 0.1) }}
                className="p-6 rounded-lg transform transition-transform duration-300 hover:-translate-y-2"
                style={{ 
                  backgroundColor: "rgba(0,0,0,0.8)", 
                  border: "1px solid #00f5ff",
                  boxShadow: shadowStyle
                }}
              >
                <h3 
                  className="text-lg font-semibold mb-2"
                  style={{
                    background: item.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 2px rgba(0, 245, 255, 0.5))"
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: "#e0e0e0" }}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 