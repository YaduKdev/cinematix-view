import React from "react";
import img1 from "../assets/1.avif";
import img2 from "../assets/2.avif";
import img3 from "../assets/3.avif";
import img4 from "../assets/4.avif";
import img5 from "../assets/5.avif";
import img6 from "../assets/6.avif";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import useMediaQuery from "@mui/material/useMediaQuery";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const HeroCarousel = ({ movies }) => {
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
          modules={[EffectCoverflow]}
          className="swiper_container"
        >
          {movies.map((movie) => {
            return (
              <SwiperSlide key={movie._id}>
                <Link
                  to={"/movies"}
                  style={{ color: "white", textDecoration: "none" }}
                >
                  <img src={movie.posterUrl} alt={movie.title} />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </Box>
  );
};

export default HeroCarousel;
