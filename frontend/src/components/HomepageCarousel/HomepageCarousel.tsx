import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./HomepageCarousel.module.css";
import Carousel from "react-bootstrap/Carousel";
import AuthContext from "../../context/AuthContext";
import useMediaQuery from "@mui/material/useMediaQuery";

const HomepageCarousel = () => {
  const {isLoggedIn} = useContext(AuthContext);
  const isTabletOrDesktop = useMediaQuery('(min-width:1024px)');
  return (
      <NavLink to={isLoggedIn ? "/schedule" : "/register"}>
          <Carousel
            className={styles.carousel}
            indicators={false}
            controls={false}
            pause={false}
          >
            <Carousel.Item interval={5000}>
              <img
                src={
                 isTabletOrDesktop
                     ? "https://i.imgur.com/XQoR59Z.jpg"
                     : "https://i.imgur.com/SPMaMQR.jpg"
              }
                alt="HIIT-1"
              />

              {/* <Carousel.Caption className={styles.carouselCaption}>
                <p>Change Begins Here</p>
              </Carousel.Caption> */}
            </Carousel.Item>

            <Carousel.Item interval={5000}>
              <img
                src={
                  isTabletOrDesktop
                      ? "https://i.imgur.com/udAlChI.jpg"
                      : "https://i.imgur.com/uXFcCW4.jpg"
              }
                alt="HIIT-2"
              />
              {/* <Carousel.Caption className={styles.carouselCaption}>
                <p>Change Begins Here</p>
              </Carousel.Caption> */}
            </Carousel.Item>
          </Carousel>
      </NavLink>
  );
};

export default HomepageCarousel;
