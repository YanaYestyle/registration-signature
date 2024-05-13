"use client";
import { useState, useEffect } from "react";
import slider from "./slider.module.scss";
import { Image } from "@/types/image";

export default function Slider({
  images,
  customClassName,
}: {
  images: Image[];
  customClassName: string;
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <>
      <div className={`${slider.container} ${customClassName}`}>
        {images.slice(0, 5).map((_image, index) => (
          <img
            className={slider.img}
            key={images[(currentImageIndex + index) % images.length].id}
            src={images[(currentImageIndex + index) % images.length].src}
            alt={
              images[(currentImageIndex + index) % images.length]
                .shortDescription
            }
          />
        ))}
      </div>
    </>
  );
}
