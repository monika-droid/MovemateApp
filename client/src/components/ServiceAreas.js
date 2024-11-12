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
        <h2 className="service-areas-title">Los Angeles Moving Areas</h2>
        <p className="service-areas-description">
          Pronto Moving & Delivery is proud to provide the top moving services in Los Angeles.
        </p>
        <p className="service-areas-cities">
          Cities our movers in LA have provided service to include:{" "}
          <a href="#beverlyhills">Beverly Hills</a>, <a href="#pasadena">Pasadena</a>, <a href="#westhollywood">West Hollywood</a>, <a href="#ventura">Ventura</a>, <a href="#longbeach">Long Beach</a>, <a href="#burbank">Burbank</a>, <a href="#glendale">Glendale</a>, <a href="#culvercity">Culver City</a>, <a href="#torrance">Torrance</a>, <a href="#santaclarita">Santa Clarita</a>, <a href="#westcovina">West Covina</a>, <a href="#hermosabeach">Hermosa Beach</a>, <a href="#hiddenhills">Hidden Hills</a>, <a href="#westla">West Los Angeles</a>.
        </p>
        <p className="service-areas-description">
          Our moving areas extend to the entire state of California. Call our movers today to receive an affordable long-distance or local rate from our Los Angeles moving company.
        </p>
        <a href="tel:310-562-0608" className="service-areas-phone">
          <FaPhoneAlt /> 310-562-0608
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.83543450861!2d-118.24368348468102!3d34.05223428060617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7d6e0f54365%3A0xb0c7e1e59e808c76!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1637893614124!5m2!1sen!2sus"
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
