import React from 'react';
import Header from '../components/Header';
import Hero from '../components/HeroSection';
import About from '../components/AboutSection';
import SearchBar from '../components/SearchMovers';
import ChooseUsSection from '../components/ChooseUsSection';
import ServiceAreas from '../components/ServiceAreas';
import TaglineSection from '../components/TaglineSection';
import Footer from '../components/Footer';
import '../styles/styles.css';

const CustomerHome = () => {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <SearchBar />
      <ChooseUsSection />
      <ServiceAreas />
      <TaglineSection />
      <Footer />
    </div>
  );
};

export default CustomerHome;
