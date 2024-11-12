// src/components/ChooseUsSection.js
import React from 'react';
import { FaUserCheck, FaClipboardCheck, FaTruck, FaDollarSign, FaShieldAlt, FaMedal, FaFileContract, FaClock } from 'react-icons/fa';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/styles.css';

const features = [
  { icon: <FaUserCheck />, title: 'Satisfied Clients', description: 'Browse our testimonials to see the great things our clients have to say about us.' },
  { icon: <FaClipboardCheck />, title: 'Proven Quality Jobs', description: 'We document our jobs to provide our clients peace of mind, knowing they’re in good hands.' },
  { icon: <FaTruck />, title: 'Full Service Moving', description: 'We provide thorough full-service moving options to make your move easy and efficient.' },
  { icon: <FaDollarSign />, title: 'Affordable Moving Services', description: 'We offer the highest quality at the lowest price for your satisfaction.' },
  { icon: <FaShieldAlt />, title: 'Movers Who Care', description: 'Hire an ethical moving company that truly cares about your moving experience.' },
  { icon: <FaMedal />, title: 'Top Rated Moving Company', description: 'Hundreds of positive reviews. Customer satisfaction is our top priority.' },
  { icon: <FaFileContract />, title: 'Licensed and Insured', description: 'Our local movers are fully licensed and insured for your peace of mind.' },
  { icon: <FaClock />, title: 'Short Notice Moving', description: 'We’ll work with any schedule to get the job done efficiently, even on short notice.' }
];

const ChooseUsSection = () => {
  return (
    <section className="choose-us-section">
      <h2 className="choose-us-title">Why Choose Our Movers in LA</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            delay={index * 0.1} // Stagger animations
          />
        ))}
      </div>
    </section>
  );
};

// FeatureCard Component for individual cards with scroll animations
const FeatureCard = ({ icon, title, description, delay }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: false,  // Ensures the animation triggers each time the element comes into view
    threshold: 0.1       // Triggers when 10% of the element is in view
  });

  if (inView) {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay }
    });
  }

  return (
    <motion.div
      ref={ref}
      className="feature-card"
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
    >
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </motion.div>
  );
};

export default ChooseUsSection;
