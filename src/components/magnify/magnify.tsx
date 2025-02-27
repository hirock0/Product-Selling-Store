"use client";

import React, { useRef } from "react";
import Image from "next/image";

interface ZoomImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  zoom?: number;
}

const ZoomImage: React.FC<ZoomImageProps> = ({ src, alt, width = 400, height = 300, zoom = 2 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !imageRef.current) return;

    const { left, top, width, height } = containerRef.current.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    imageRef.current.style.transformOrigin = `${x}% ${y}%`;
    imageRef.current.style.transform = `scale(${zoom})`;

  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = "scale(1)";
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden border border-gray-300 rounded-lg"
    >
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        width={width * zoom} // Load higher resolution for zoom
        height={height * zoom}
        className="object-cover w-full h-full transition-transform duration-200"
      />
    </div>
  );
};

export default ZoomImage;
