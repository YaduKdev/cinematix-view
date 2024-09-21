import React from "react";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import useMediaQuery from "@mui/material/useMediaQuery";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const HeroCarousel = () => {
  return (
    <Box margin="auto" width={"100%"} paddingTop={"100px"}>
      <Box
        margin="auto"
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography gutterBottom={true} variant="h4" color="primary">
          LATEST RELEASES
        </Typography>
        <Button
          LinkComponent={Link}
          to="/movies"
          sx={{
            position: {
              xs: "relative",
              lg: "absolute",
            },
            top: "0",
            right: "20px",
          }}
          variant="outlined"
          size="large"
        >
          VIEW ALL
        </Button>
      </Box>
      <Box width={"100%"} margin={"50px auto 100px"}>
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
          modules={[EffectCoverflow]}
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
        </Swiper>
      </Box>
    </Box>
  );
};

export default HeroCarousel;
