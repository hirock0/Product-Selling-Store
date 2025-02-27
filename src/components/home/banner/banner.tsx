"use client"

import Nav from "@/components/nav/nav"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from "next/image";

const Banner = () => {

    const bannerImages = [
        {
            title: "Product-1",
            img: "https://cdn.pixabay.com/photo/2024/04/06/14/18/ai-generated-8679407_960_720.png"
        },
        {
            title: "Product-2",
            img: "https://cdn.pixabay.com/photo/2015/06/27/16/34/food-823607_960_720.jpg"
        },
    ]

    const [scrollFlag, setScrollFlag] = useState(false)

    useEffect(() => {
        const handler = () => {
            if (window.scrollY > 0) {
                setScrollFlag(true)
            } else {
                setScrollFlag(false)
            }
        }
        window.addEventListener("scroll", handler)
        return () => { window.removeEventListener("scroll", handler) }
    }, [scrollFlag])

    return (
        <div className="">
            <div className="">


                <div className=" ">
                    <div className={`${scrollFlag ? " bg-zinc-600" : "bg-zinc-800/20"} fixed z-50 top-0 left-0 right-0 text-white`}>
                        <Nav />
                    </div>
                    <Swiper
                        autoplay={{
                            delay: 4000
                        }}
                        loop
                        modules={[Autoplay, Pagination, Navigation]}
                        className="h-[650px] max-lg:h-[600px] max-md:h-[550px] max-sm:h-[400px]  "
                    >
                        {
                            bannerImages?.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <Image src={item?.img} alt={item?.title} width={5000} height={5000} priority className=" h-full w-full object-cover" />
                                </SwiperSlide>
                            ))
                        }


                    </Swiper>
                </div>

            </div>
        </div>
    )
}

export default Banner
