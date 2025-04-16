import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-16 bg-dark-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple animate-glow">
            About TrafficSignAI
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're revolutionizing traffic sign recognition with cutting-edge AI
            technology, making roads safer and navigation easier for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-dark-100 p-8 rounded-xl shadow-lg shadow-dark-accent/10 border border-gray-700 backdrop-blur-sm"
            whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(109, 40, 217, 0.1)' }}
          >
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-blue">Our Mission</h2>
            <p className="text-gray-400">
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
            className="bg-dark-100 p-8 rounded-xl shadow-lg shadow-dark-accent/10 border border-gray-700 backdrop-blur-sm"
            whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(109, 40, 217, 0.1)' }}
          >
            <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">Technology</h2>
            <p className="text-gray-400">
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
          className="bg-dark-300 p-8 rounded-xl border border-gray-700 shadow-lg shadow-dark-accent/10"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-purple">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Real-time Processing',
                description: 'Instant sign recognition with minimal delay',
                gradient: 'from-neon-yellow to-yellow-500',
              },
              {
                title: 'High Accuracy',
                description: 'Trained on diverse datasets for reliable results',
                gradient: 'from-neon-blue to-blue-500',
              },
              {
                title: 'User-Friendly',
                description: 'Simple interface for easy navigation',
                gradient: 'from-neon-green to-green-500',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-dark-100 p-6 rounded-lg shadow-md shadow-dark-accent/5 border border-gray-700 hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -3 }}
              >
                <h3 className={`text-lg font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${feature.gradient}`}>
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About; 