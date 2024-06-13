import React from 'react';
import { Carousel } from 'react-bootstrap';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import './cael.css';

function Cael() {
  return (
      <div className="container mt-5" style={{backgroundColor:"rgba(5, 6, 23, 0.8)"}}>
        <Carousel className="custom-carousel">
          <Carousel.Item>
            <div className="carousel-background">
              <div className="carousel-text">
                <h3>Welcome to Edu-Trivia</h3>
                <p>Explore Computer Science modules and test your knowledge with AI-generated quizzes.</p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-background">
              <div className="carousel-text">
                <h3>Engaging Modules</h3>
                <p>Covering a wide range of Computer Science topics including DSA, OS, DBMS, Java, and more.</p>
              </div>
            </div>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-background">
              <div className="carousel-text">
                <h3>Compete and Learn</h3>
                <p>Challenge yourself and others, track your progress on the leaderboard.</p>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
  );
}

export default Cael;
