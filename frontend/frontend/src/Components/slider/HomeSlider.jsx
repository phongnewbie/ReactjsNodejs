import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
export default function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <FontAwesomeIcon icon={faChevronLeft} />,
    nextArrow: <FontAwesomeIcon icon={faChevronRight} />,
  };

  return (
    <div>
      <div className=" slider_partOne">
        <Slider {...settings}>
          <div className="slide_Parts">
            <img
              src="https://cf.shopee.vn/file/vn-50009109-bd70a1e3bc1d8844596a3a17ebb1cb68_xxhdpi"
              alt=""
            />
          </div>
          <div className="slide_Parts">
            <img
              src="https://cf.shopee.vn/file/vn-50009109-f602fcbf6e4e9734c349e3cf66b931b3_xxhdpi"
              alt=""
            />
          </div>
          <div className="slide_Parts">
            <img
              src="https://cf.shopee.vn/file/vn-50009109-2497c2c10ceb977055e24aa1ad1bfc9d_xxhdpi"
              alt=""
            />
          </div>
          <div className="slide_Parts">
            <img
              src="https://cf.shopee.vn/file/vn-50009109-5ca5922b89f9f7efa9bafc24feee8c4b_xxhdpi"
              alt=""
            />
          </div>
          <div className="slide_Parts">
            <img
              src="https://cf.shopee.vn/file/vn-50009109-5a9e3bde6da714c800ee0013772b6d5f_xxhdpi"
              alt=""
            />
          </div>
          <div className="slide_Parts">
            <img
              src="https://cf.shopee.vn/file/vn-50009109-69f5305bf86cf19eba91a56b6d43a5ac_xxhdpi"
              alt=""
            />
          </div>
        </Slider>
      </div>
    </div>
  );
}
