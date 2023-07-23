"use client";

import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 420 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 5,
  },
};

function ScrollableImageSlider({ children }: { children: React.ReactNode }) {
  return <Carousel responsive={responsive}>{children}</Carousel>;
}

export default ScrollableImageSlider;
