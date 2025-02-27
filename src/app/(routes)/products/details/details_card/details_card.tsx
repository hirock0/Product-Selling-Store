"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import ZoomImage from "@/components/magnify/magnify";
const Details_card = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  // Dummy product images
  const images = [
    "https://i.ibb.co.com/Zz39NdjQ/img-5.jpg",
    "https://i.ibb.co.com/Zz39NdjQ/img-5.jpg",
    "https://i.ibb.co.com/Zz39NdjQ/img-5.jpg",
    "https://i.ibb.co.com/Zz39NdjQ/img-5.jpg",
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 flex flex-col lg:flex-row gap-6">
      {/* Left Side - Product Gallery */}
      <div className="lg:w-1/2">
        {/* Swiper for Main Image */}
        <Swiper
          modules={[Navigation, Thumbs]}
          spaceBetween={10}
          slidesPerView={1}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          className="w-full border rounded-lg overflow-hidden"
        >
          {images?.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative group overflow-hidden">
                <ZoomImage src={img} alt={`Product ${index + 1}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Swiper for Thumbnails */}
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          className="w-full mt-3 cursor-pointer"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                width={60}
                height={60}
                className="border rounded-lg hover:opacity-75"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Right Side - Product Info */}
      <div className="lg:w-1/2 space-y-4">
        <h1 className="text-2xl font-bold">Saad Hot Tomato Sauce 1000gm</h1>
        <p className="text-yellow-500 text-sm">★★★★★ <span className="text-gray-600">(671 Ratings)</span></p>
        <p className="text-lg font-semibold text-red-500">৳ 230 <span className="line-through text-gray-500">৳ 270</span> <span className="text-green-600">-15%</span></p>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">Buy Now</button>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Details_card;
