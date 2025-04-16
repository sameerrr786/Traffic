import React, { useRef } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  // Create a ref for the parent container
  const containerRef = useRef(null);
  
  // Use useViewportScroll to track document scroll
  const { scrollYProgress } = useViewportScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Floating elements animation - standardized shadow format
  const floatingElements = Array(20).fill().map((_, i) => ({
    id: i,
    size: Math.random() * 30 + 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  // Theme styles - consistent shadow format
  const cardStyle = {
    backgroundColor: "rgba(0,0,0,0.7)",
    border: "1px solid #00f5ff",
    boxShadow: "0 0 8px rgba(78, 217, 255, 0.3)"
  };
  
  const neonTextShadow = "0 0 5px #00f5ff, 0 0 10px #00f5ff, 0 0 15px #00f5ff";

  // Animation variants
  const featureCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { 
      y: -8,
      scale: 1.03
    }
  };
  
  const signCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { 
      scale: 1.05
    }
  };
  
  const safetyCardVariants = {
    hiddenLeft: { opacity: 0, x: -20 },
    hiddenRight: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    hover: { 
      y: -5
    }
  };

  // Common traffic signs data - expanded with more signs and actual images
  const trafficSigns = [
    {
      name: "Stop Sign",
      description: "Octagonal red sign requiring a complete halt. Wait until it's safe before proceeding through the intersection.",
      image: "/images/traffic-signs/STOP.png",
      details: "Found at intersections. You must come to a complete stop, check for pedestrians and traffic, then proceed when safe."
    },
    {
      name: "Pedestrian Crossing",
      description: "A warning sign, usually triangular, indicating that pedestrians may be crossing the road ahead.",
      image: "https://storage.googleapis.com/theory-svc-production-media/media/de/2020-04-01/1.4.40-155.png",
      details: "Drivers must slow down, watch for people on or near the crossing, and be prepared to stop to allow them to cross safely. Always give priority to pedestrians at marked crossings."
    },
    {
      name: "Speed Limit",
      description: "Round or rectangular sign showing the maximum legal speed for the current road section in normal conditions.",
      image: "https://e7.pngegg.com/pngimages/312/820/png-clipart-speed-sign-traffic-sign-speed-limit-90-s-miscellaneous-text.png",
      details: "Speed limits are set based on road design, traffic patterns, and surrounding environment. They're lower in school zones and residential areas."
    },
    {
      name: "No Entry",
      description: "Circular sign with a red circle and horizontal white bar indicating vehicles cannot enter from this direction.",
      image: "https://static.vecteezy.com/system/resources/previews/023/234/492/non_2x/no-entry-traffic-sign-no-direct-traffic-icon-on-white-background-vector.jpg",
      details: "Common at exits of one-way streets or restricted areas. Entering against this sign is dangerous and illegal."
    },
    {
      name: "One Way",
      description: "Rectangular sign with an arrow indicating traffic flows only in the direction shown.",
      image: "https://5.imimg.com/data5/SELLER/Default/2023/1/HW/SY/KR/21032740/one-way-traffic-sign-board-500x500.png",
      details: "Helps organize traffic flow in congested areas. All vehicles must move in the indicated direction."
    },
    {
      name: "Railroad Crossing",
      description: "Round yellow sign with an X and R letters, warning of an upcoming railroad crossing.",
      image: "https://png.pngtree.com/png-vector/20240104/ourmid/pngtree-traffic-sign-isolated---railroad-crossing-danger-png-image_11086453.png",
      details: "Approach with caution and be prepared to stop. Look both ways and never stop on tracks."
    },
    {
      name: "U-Turn",
      description: "A regulatory or warning sign that indicates a place where making a U-turn is either allowed or prohibited.",
      image: "https://static.vecteezy.com/system/resources/previews/003/611/299/non_2x/u-turn-right-traffic-road-sign-isolate-on-white-background-illustration-eps-10-free-vector.jpg",
      details: "If it's a U-turn permitted sign, it means vehicles may safely turn around to go in the opposite direction. Drivers must check for oncoming traffic and ensure the turn can be made safely."
    },
    {
      name: "No Parking",
      description: "A regulatory sign indicating that vehicles are not allowed to park in the designated area.",
      image: "https://media.istockphoto.com/id/894875554/vector/no-parking-sign-in-crossed-out-red-circle-vector.jpg?s=612x612&w=0&k=20&c=nXr9cACwK53HRXU4mZ7V_r88nuSubca3jUrTS9QFL-s=",
      details: "This sign helps ensure smooth traffic flow and safety by keeping certain zones clear—such as near intersections, bus stops, gates, or emergency access areas."
    }
  ];

  // Safety rules data - expanded with more detailed rules
  const safetyRules = [
    {
      title: "Always observe speed limits",
      description: "Speed limits are designed for optimal safety in different road conditions. Exceeding them reduces reaction time and increases stopping distance.",
      color: "linear-gradient(to right, #00f5ff, #4e66f5)",
      details: "Remember that posted limits are for ideal conditions. Reduce speed in adverse weather, poor visibility, or heavy traffic. Speeding is a factor in nearly one-third of all fatal crashes."
    },
    {
      title: "Maintain safe following distance",
      description: "Keep at least 3 seconds of distance between you and the vehicle ahead. In adverse conditions, increase to 5-6 seconds.",
      color: "linear-gradient(to right, #00f5ff, #f566cb)",
      details: "To measure following distance, watch the vehicle ahead pass a fixed point, then count seconds until you reach the same point. This buffer provides critical reaction time in emergencies."
    },
    {
      title: "Use signals appropriately",
      description: "Signal your intentions early to give other drivers time to react. Use turn signals 100-300 feet before turning or changing lanes.",
      color: "linear-gradient(to right, #66f5a3, #00f5ff)",
      details: "Proper signaling reduces the risk of rear-end and sideswipe collisions. Remember to cancel your signal after completing your maneuver to avoid confusing other drivers."
    },
    {
      title: "Never drive impaired",
      description: "Avoid driving under the influence of alcohol, drugs, or when fatigued. Even prescription medications can impair driving ability.",
      color: "linear-gradient(to right, #f5a866, #00f5ff)",
      details: "Impairment slows reaction time, impairs judgment, and reduces coordination. Use designated drivers, rideshare services, or public transportation if impaired."
    },
    {
      title: "Eliminate distractions",
      description: "Focus solely on driving - avoid phone use, eating, adjusting controls, or any activity that diverts attention from the road.",
      color: "linear-gradient(to right, #00f5ff, #4e66f5)",
      details: "Taking your eyes off the road for just 2 seconds doubles your crash risk. Use hands-free devices when necessary and pull over for tasks requiring attention."
    },
    {
      title: "Practice defensive driving",
      description: "Anticipate hazards, expect the unexpected, and always have an escape route planned in traffic.",
      color: "linear-gradient(to right, #f566cb, #00f5ff)",
      details: "Scan the road 12-15 seconds ahead, check mirrors every 5-8 seconds, and maintain awareness of vehicles in your blind spots. Assume other drivers may make mistakes."
    }
  ];

  // Driving scenarios with specific safety tips
  const drivingScenarios = [
    {
      scenario: "Highway Driving",
      tips: [
        "Maintain steady speed and stay in the right lane except when passing",
        "Check mirrors and blind spots before changing lanes",
        "Leave extra space around large trucks due to their limited visibility",
        "Take breaks every 2 hours on long journeys to combat fatigue"
      ],
      color: "linear-gradient(to right, #00f5ff, #4e66f5)"
    },
    {
      scenario: "Night Driving",
      tips: [
        "Use high beams when appropriate but dim them for oncoming traffic",
        "Reduce speed to compensate for limited visibility",
        "Keep windshield and headlights clean for optimal visibility",
        "Be especially alert for pedestrians and wildlife"
      ],
      color: "linear-gradient(to right, #f566cb, #00f5ff)"
    },
    {
      scenario: "Adverse Weather",
      tips: [
        "Reduce speed by at least 5-10 mph in rain and more in snow/ice",
        "Increase following distance to 6+ seconds in poor conditions",
        "Avoid sudden movements - gentle braking, acceleration, and steering",
        "Use headlights in rain, fog, or snow for visibility to others"
      ],
      color: "linear-gradient(to right, #66f5a3, #00f5ff)"
    }
  ];

  return (
    <div className="pt-16 bg-black" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        {floatingElements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute rounded-full"
            style={{
              width: el.size,
              height: el.size,
              left: `${el.x}%`,
              top: `${el.y}%`,
              zIndex: 0,
              backgroundColor: 'rgba(0, 245, 255, 0.07)',
              boxShadow: '0 0 15px rgba(0, 245, 255, 0.3)'
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
              ease: "easeInOut"
            }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-black to-black" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300f5ff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            y,
            opacity
          }}
        />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring" }}
            className="mb-6 inline-block"
          >
            <div 
              className="text-sm uppercase tracking-widest font-mono mb-2"
              style={{ color: "#00f5ff", textShadow: neonTextShadow }}
            >
              AI-Powered
            </div>
            <h1 
              className="text-5xl sm:text-7xl font-extrabold mb-2"
              style={{
                background: "linear-gradient(to right, #00f5ff, #4e66f5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "none",
                filter: "drop-shadow(0 0 8px rgba(0, 245, 255, 0.5))"
              }}
            >
              Traffic Sign Predictor
            </h1>
            <div className="h-1 w-24 mx-auto" style={{ background: "linear-gradient(to right, #00f5ff, #4e66f5)" }}></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl sm:text-4xl font-bold mb-6"
            style={{ color: "white", textShadow: "0 0 10px rgba(0, 245, 255, 0.3)" }}
          >
            Intelligent Traffic Sign Recognition
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: "#e0e0e0" }}
          >
            Upload a photo of any traffic sign and let our AI identify it instantly.
            Perfect for drivers, learners, and traffic management.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="relative inline-block"
          >
            <div 
              className="absolute -inset-1 rounded-lg blur-md opacity-70"
              style={{ background: "linear-gradient(to right, #00f5ff, #4e66f5)" }}
            ></div>
            <Link
              to="/recognize"
              className="relative inline-block px-8 py-4 text-lg font-semibold text-white rounded-lg transform hover:-translate-y-1"
              style={{ 
                background: "black", 
                border: "1px solid #00f5ff",
                boxShadow: "0 0 10px rgba(0, 245, 255, 0.5)",
                transition: "all 0.3s ease"
              }}
            >
              Try It Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" style={{ backgroundColor: "#080808" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.1 }}
            className="text-center mb-16"
          >
            <h2 
              className="text-3xl font-bold text-center mb-4"
              style={{
                background: "linear-gradient(to right, #00f5ff, #4e66f5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 5px rgba(0, 245, 255, 0.5))"
              }}
            >
              Why Choose Our Service?
            </h2>
            <div className="h-1 w-24 mx-auto" style={{ background: "linear-gradient(to right, #00f5ff, #4e66f5)" }}></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Real-time Recognition',
                description: 'Get instant results with our advanced AI technology powered by Google Gemini',
                icon: '⚡',
                color: 'linear-gradient(to right, #00f5ff, #4e66f5)',
              },
              {
                title: 'High Accuracy',
                description: 'Trained on thousands of traffic signs for precise identification',
                icon: '🎯',
                color: 'linear-gradient(to right, #00f5ff, #f566cb)',
              },
              {
                title: 'User-Friendly',
                description: 'Simple interface that anyone can use - just upload and get results',
                icon: '👥',
                color: 'linear-gradient(to right, #66f5a3, #00f5ff)',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={featureCardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2,
                  type: "spring"
                }}
                className="p-6 rounded-xl backdrop-blur-sm transition-all duration-300"
                style={cardStyle}
              >
                <motion.div 
                  className="text-4xl mb-4 inline-block"
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  {feature.icon}
                </motion.div>
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{
                    background: feature.color,
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
        </div>
      </section>
      
      {/* Traffic Safety Section */}
      <section className="py-20" style={{ backgroundColor: "#000" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="text-3xl font-bold text-center mb-4"
              style={{
                background: "linear-gradient(to right, #00f5ff, #4e66f5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 5px rgba(0, 245, 255, 0.5))"
              }}
            >
              Traffic Safety Guide
            </h2>
            <div className="h-1 w-24 mx-auto mb-6" style={{ background: "linear-gradient(to right, #00f5ff, #4e66f5)" }}></div>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: "#e0e0e0" }}>
              Understanding traffic signs and following safety rules is essential for all road users.
              Our AI helps you recognize signs while these guidelines keep you safe.
            </p>
          </div>
          
          {/* Common Traffic Signs */}
          <div className="mb-16">
            <h3
              className="text-2xl font-bold mb-8 text-center"
              style={{ color: "#00f5ff", textShadow: neonTextShadow }}
            >
              Common Traffic Signs
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trafficSigns.map((sign, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl backdrop-blur-sm flex flex-col items-center text-center transform hover:scale-105 hover:-translate-y-1 transition-all duration-300"
                  style={cardStyle}
                >
                  <div className="w-32 h-32 mb-4 rounded-full overflow-hidden flex items-center justify-center" style={{ border: "2px solid #00f5ff", boxShadow: "0 0 10px rgba(0, 245, 255, 0.5)" }}>
                    <img 
                      src={sign.image} 
                      alt={sign.name} 
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://via.placeholder.com/150?text=${encodeURIComponent(sign.name)}`;
                      }}
                    />
                  </div>
                  <h4 
                    className="text-xl font-semibold mb-2"
                    style={{ color: "#00f5ff", textShadow: "0 0 5px rgba(0, 245, 255, 0.5)" }}
                  >
                    {sign.name}
                  </h4>
                  <p style={{ color: "#e0e0e0" }} className="mb-3">{sign.description}</p>
                  <p style={{ color: "#a0a0a0", fontSize: "0.9rem" }} className="italic">{sign.details}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Safety Rules */}
          <h3
            className="text-2xl font-bold mb-8 text-center"
            style={{ color: "#00f5ff", textShadow: neonTextShadow }}
          >
            Essential Safety Rules
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {safetyRules.map((rule, index) => (
              <div
                key={index}
                className="p-6 rounded-xl backdrop-blur-sm transform hover:-translate-y-1 transition-all duration-300"
                style={cardStyle}
              >
                <h4 
                  className="text-xl font-semibold mb-2"
                  style={{
                    background: rule.color,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 2px rgba(0, 245, 255, 0.5))"
                  }}
                >
                  {rule.title}
                </h4>
                <p style={{ color: "#e0e0e0" }} className="mb-3">{rule.description}</p>
                <p style={{ color: "#a0a0a0", fontSize: "0.9rem" }} className="italic">{rule.details}</p>
              </div>
            ))}
          </div>
          
          {/* Driving Scenarios Section */}
          <h3
            className="text-2xl font-bold mb-8 text-center"
            style={{ color: "#00f5ff", textShadow: neonTextShadow }}
          >
            Situational Driving Tips
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            {drivingScenarios.map((scenario, index) => (
              <div
                key={index}
                className="p-6 rounded-xl backdrop-blur-sm transform hover:-translate-y-1 transition-all duration-300"
                style={cardStyle}
              >
                <h4 
                  className="text-xl font-semibold mb-4 text-center"
                  style={{
                    background: scenario.color,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 2px rgba(0, 245, 255, 0.5))"
                  }}
                >
                  {scenario.scenario}
                </h4>
                <ul className="space-y-2">
                  {scenario.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
                      <span style={{ color: "#00f5ff" }} className="mr-2">•</span>
                      <span style={{ color: "#e0e0e0" }}>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg mb-6" style={{ color: "#e0e0e0" }}>
              Remember: Understanding traffic signs could save lives. Test your knowledge with our recognition tool.
            </p>
            <Link
              to="/recognize"
              className="inline-block px-6 py-3 text-white rounded-lg transform hover:-translate-y-1 transition-all duration-300"
              style={{ 
                border: "1px solid #00f5ff",
                color: "#00f5ff",
                textShadow: neonTextShadow,
                boxShadow: "0 0 10px rgba(0, 245, 255, 0.5)"
              }}
            >
              Try Sign Recognition
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundColor: "black" }}>
        <div className="absolute inset-0 opacity-20" style={{ 
          background: "linear-gradient(135deg, #00f5ff 0%, #4e66f5 100%)",
        }}></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundSize: "30px 30px",
            backgroundImage: `linear-gradient(to right, #00f5ff 1px, transparent 1px),
                            linear-gradient(to bottom, #00f5ff 1px, transparent 1px)`
          }}
        />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl font-bold mb-6"
            style={{ color: "white", textShadow: "0 0 10px rgba(0, 245, 255, 0.5)" }}
          >
            Ready to Start Identifying Traffic Signs?
          </h2>
          
          <p
            className="text-xl mb-10"
            style={{ color: "#e0e0e0" }}
          >
            Join thousands of users who trust our technology for accurate traffic sign recognition.
          </p>
          
          <div>
            <Link
              to="/recognize"
              className="inline-block px-8 py-4 text-lg font-semibold text-white rounded-lg transform hover:-translate-y-1 transition-all duration-300"
              style={{ 
                background: "linear-gradient(to right, #00f5ff, #4e66f5)",
                boxShadow: "0 0 15px rgba(0, 245, 255, 0.5)"
              }}
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 