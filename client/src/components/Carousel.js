// Carousel.js
import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../styles/styles.css';

const HomeCarousel = () => (
  <Carousel>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/images/5-things-to-look-for-in-a-moving-company-1.jpg"
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>Affordable Moving Services</h3>
        <p>Reliable and budget-friendly moving solutions for everyone.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/images/starting-moving-company.jpg"
        alt="Second slide"
      />
      <Carousel.Caption>
        <h3>Move with Ease</h3>
        <p>We help you move effortlessly and securely.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="/images/istockphoto-928084870-612x612.jpg"
        alt="Third slide"
      />
      <Carousel.Caption>
        <h3>Your Move, Our Priority</h3>
        <p>Experience hassle-free moving with MoveMate.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);

export default HomeCarousel;
