import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Services from '../components/Services';
import SearchMovers from '../components/SearchMovers';
import AboutUs from '../components/AboutUs';
import Testimonials from '../components/Testimonials';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';
import '../styles/styles.css';

const CustomerHome = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Services />
      <AboutUs />
      <Testimonials />
      <HowItWorks />
      <Footer userType="customer" />
    </div>
  );
};

export default CustomerHome;
