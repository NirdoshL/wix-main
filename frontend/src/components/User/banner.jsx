import React from "react";
import Slider from "react-slick";
import Image from "../../assets/29.png";

//Carosel effect after header buttom
export const Banner = () => {
  //settings for Slider from react-slick
  const settings = {
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className="w-full bg-white">
      {
        // Slider from react-slick that will be auto-played
        //need mapping in future
      }
      <Slider {...settings}>
        <div>
          <img
            alt="banner"
            className={"h-96 w-full object-cover"}
            src={Image}
          />
        </div>
        <div>
          <img
            alt="banner"
            className={"h-96 w-full object-cover"}
            src={Image}
          />
        </div>
        <div>
          <img
            alt="banner"
            className={"h-96 w-full object-cover"}
            src={Image}
          />
        </div>
      </Slider>
    </div>
  );
};
