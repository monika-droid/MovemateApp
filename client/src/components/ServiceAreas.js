// src/components/ServiceAreas.js
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import '../styles/styles.css';
import { FaPhoneAlt } from 'react-icons/fa';

const ServiceAreas = () => {
  // Animation controls for content and map sections
  const contentControls = useAnimation();
  const mapControls = useAnimation();

  // Set up in-view hooks for triggering animations
  const [contentRef, contentInView] = useInView({
    triggerOnce: false,  // Repeat animation each time the element is in view
    threshold: 0.2       // Trigger when 20% of the element is visible
  });

  const [mapRef, mapInView] = useInView({
    triggerOnce: false,
    threshold: 0.2
  });

  // Start animation when content or map is in view
  if (contentInView) {
    contentControls.start({ opacity: 1, x: 0 });
  }

  if (mapInView) {
    mapControls.start({ opacity: 1, x: 0 });
  }

  return (
    <section className="service-areas-section">
      <motion.div
        ref={contentRef}
        className="service-areas-content"
        initial={{ opacity: 0, x: -50 }}
        animate={contentControls}
        transition={{ duration: 0.8 }}
      >
        <h2 className="service-areas-title">Ontario Moving Areas</h2>
        <p className="service-areas-description">
        MOVEMATE is proud to provide top-rated moving services across Ontario.
        </p>
        <p className="service-areas-cities">
        Our professional movers have assisted customers in cities such as Toronto, Mississauga, Brampton, Hamilton, Ottawa, London, Markham, Vaughan, Kitchener, Windsor, Barrie, Guelph, Oakville, Burlington, and many more.
          
        </p>
        <p className="service-areas-description">
        Whether you’re moving locally or need a long-distance move anywhere in Ontario, MOVEMATE has you covered. Contact us today to get an affordable and transparent rate for your next move. Let MOVEMATE take the stress out of your relocation!
        </p>
        <a href="tel:310-562-0608" className="service-areas-phone">
          <FaPhoneAlt /> 123-456-7890
        </a>
      </motion.div>

      <motion.div
        ref={mapRef}
        className="service-areas-map"
        initial={{ opacity: 0, x: 50 }}
        animate={mapControls}
        transition={{ duration: 0.8 }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92718.21993291784!2d-80.4763151!3d43.43043435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882bf48c03ee5105%3A0x9525f8e6df5f544b!2sKitchener%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sus!4v1732246153712!5m2!1sen!2sus"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          title="Service Area Map"
        ></iframe>
      </motion.div>
    </section>
  );
};

export default ServiceAreas;
