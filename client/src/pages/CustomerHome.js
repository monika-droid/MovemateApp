import React, { useRef } from 'react';
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
  const aboutSectionRef = useRef(null);
  const searchMoversRef = useRef(null);
  const chooseUsSectionRef = useRef(null);

  const scrollToSection = (section) => {
    if (section === 'about' && aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'searchMovers' && searchMoversRef.current) {
      searchMoversRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'chooseUs' && chooseUsSectionRef.current) {
      chooseUsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }

  };

  return (
    <div>
      <Header onNavigate={scrollToSection} />
      <Hero />
      <div ref={aboutSectionRef}>
        <About />
      </div>
      <div ref={searchMoversRef}>
        <SearchBar />
      </div>
      <div ref={chooseUsSectionRef}>
        <ChooseUsSection />
      </div>
      
      <ServiceAreas />
      <TaglineSection />
      <Footer />
    </div>
  );
};

export default CustomerHome;
