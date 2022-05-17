import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function ImageCarousel({ ad }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    function getImages() {
      setImages(JSON.parse(ad?.images));
    }

    getImages();
  }, []);

  return (
    <div
      className="border-offWhite border-2 mb-5"
      style={{ height: "570px", width: "820px" }}
    >
      <Carousel dynamicHeight={false}>
        {images?.map((img) => (
          <div>
            <img src={img} alt={"img"} style={{ aspectRatio: "16/9" }} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageCarousel;
