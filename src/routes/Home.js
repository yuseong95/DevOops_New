import React from "react";
import Slider from "react-slick";
import "./css/Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sampleImage from "../images/sample.png";
import devOops from "../images/devOops.jpg"
import hyndai from "../images/hyndai.jpg"
import hyndai2 from "../images/hyndai2.png"
import toss from "../images/toss.jpeg"


import error2 from "../images/error2.jpg"
import team from "../images/team.jpg"
import challenge from "../images/challenge.jpg"
import post from "../images/post.jpg"

import { Link } from "react-router-dom";

const Home = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // 한 번에 하나의 슬라이드만 표시
    slidesToScroll: 1,
    arrows: false,
    autoplay: true, // 자동 재생 활성화
    autoplaySpeed: 5000, // 슬라이드 전환 시간 (밀리초 단위, 3000ms = 3초)
  };

  return (
    <div className="main-container">
      <div className="slider-container">
        <Slider {...sliderSettings}>
          <div className="slider-item">
            <img src={devOops} alt="Slide 1" />
          </div> 
          <div className="slider-item">
            <img src={hyndai} alt="Slide 2" />
          </div>
          <div className="slider-item">
            <img src={hyndai2} alt="Slide 3" />
          </div>
          <div className="slider-item">
            <img src={toss} alt="Slide 4" />
          </div>
        </Slider>
      </div>

      <div className="cards-container">
        <Link to="/challenge" className="card-link">
          <div className="card">
            <img src={challenge} alt="Typing Game" className="card-image" />
            <h2>오늘의 챌린지</h2>
          </div>
        </Link>
        <Link to="/findError" className="card-link">
          <div className="card">
            <img src={error2} alt="오류 찾기" className="card-image" />
            <h2>오류 찾기</h2>
          </div>
        </Link>
        <Link to="/board/free" className="card-link">
          {" "}
          {/* 자유 게시판으로 이동 */}
          <div className="card">
            <img src={post} alt="게시판" className="card-image" />
            <h2>게시판</h2>
          </div>
        </Link>
        <Link to="/board/team" className="card-link">
          <div className="card">
            <img src={team} alt="팀원 모집" className="card-image" />
            <h2>팀원 모집</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};



export default Home;


