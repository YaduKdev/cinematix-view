import React from "react";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const HeroCarousel = () => {
  return (
    <Box margin="auto" width={"100%"}>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography margin="auto" fontSize={25} color="primary">
          LATEST RELEASES
        </Typography>
      </Box>
      <Box width={"100%"} margin={"auto"}>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"3"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          breakpoints={{
            0: {
              slidesPerView: "auto",
            },
            500: {
              slidesPerView: 1,
            },
            1000: {
              slidesPerView: 2,
            },
            1500: {
              slidesPerView: 3,
            },
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: "true",
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          <SwiperSlide>
            <Link
              to={"/movies"}
              style={{ color: "white", textDecoration: "none" }}
            >
              <img src={img1} />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <img src={img2} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img3} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img4} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={img3} />
          </SwiperSlide>

          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </Box>
    </Box>
  );
};

export default HeroCarousel;
