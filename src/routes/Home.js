import React from 'react';
import Slider from 'react-slick';
import './css/Home.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import sampleImage from '../images/sample.png';
import { Link } from 'react-router-dom';

const Home = () => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // 한 번에 하나의 슬라이드만 표시
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="main-container">
      <div className="slider-container">
        <Slider {...sliderSettings}>
          <div className="slider-item">
            <img src={sampleImage} alt="Slide 1" />
          </div>
          <div className="slider-item">
            <img src={sampleImage} alt="Slide 2" />
          </div>
          <div className="slider-item">
            <img src={sampleImage} alt="Slide 3" />
          </div>
          <div className="slider-item">
            <img src={sampleImage} alt="Slide 4" />
          </div>
        </Slider>
      </div>

      <div className="cards-container">
        <Link to="/challenge" className="card-link">
          <div className="card">
            <img src={sampleImage} alt="Typing Game" className="card-image" />
            <h2>오늘의 챌린지</h2>
          </div>
        </Link>
        <Link to="/findError" className="card-link">
          <div className="card">
            <img src={sampleImage} alt="오류 찾기" className="card-image" />
            <h2>오류 찾기</h2>
          </div>
        </Link>
        <Link to="/board" className="card-link">
          <div className="card">
            <img src={sampleImage} alt="게시판" className="card-image" />
            <h2>게시판</h2>
          </div>
        </Link>
        <Link to="/recruiting" className="card-link">
          <div className="card">
            <img src={sampleImage} alt="팀원 모집" className="card-image" />
            <h2>팀원 모집</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
