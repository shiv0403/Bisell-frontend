import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import img1 from "../../../assets/sitemap.png";
import img2 from "../../../assets/sample.jpeg";
import img3 from "../../../assets/sample.webp";
import img4 from "../../../assets/sitemap.png";

function ImageCarousel() {
  return (
    <div className="border-offWhite border-2 mb-5">
      <Carousel dynamicHeight={false}>
        <div>
          <img src={img1} />
        </div>
        <div>
          <img src={img2} style={{ height: "10%" }} />
        </div>
        <div>
          <img src={img3} />
        </div>
      </Carousel>
    </div>
  );
}

export default ImageCarousel;
