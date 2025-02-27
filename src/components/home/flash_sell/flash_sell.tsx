"use client"
import Card_type_1 from "@/components/product_cards/card_type_1/card_type_1"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Flash_sell = () => {

    const products = [
        {
            title: "Man",
            descriptions: "Parachute Naturale Nourishing Care Shampoo with Aloe Vera & Coconut Milk| For Strong & Silky Hair| Smoothens Hair| Paraben Free, 100% Vegan| All Hair Types| 330 ml",
            price: 100,
            img: "https://i.ibb.co.com/Zz39NdjQ/img-5.jpg",
            id:1
        },
        {
            title: "Man",
            descriptions: "Parachute Naturale Nourishing Care Shampoo with Aloe Vera & Coconut Milk| For Strong & Silky Hair| Smoothens Hair| Paraben Free, 100% Vegan| All Hair Types| 330 ml",
            price: 100,
            img: "https://i.ibb.co.com/3yXsH9w9/img-4.jpg",
            id:2
        },
        {
            title: "Man",
            descriptions: "Parachute Naturale Nourishing Care Shampoo with Aloe Vera & Coconut Milk| For Strong & Silky Hair| Smoothens Hair| Paraben Free, 100% Vegan| All Hair Types| 330 ml",
            price: 100,
            img: "https://i.ibb.co.com/9HNwpvfx/img-3.png",
            id:3
        },
        {
            title: "Man",
            descriptions: "Parachute Naturale Nourishing Care Shampoo with Aloe Vera & Coconut Milk| For Strong & Silky Hair| Smoothens Hair| Paraben Free, 100% Vegan| All Hair Types| 330 ml",
            price: 100,
            img: "https://i.ibb.co.com/v2y1k0D/img-3.jpg",
            id:4
        },
        {
            title: "Man",
            descriptions: "Parachute Naturale Nourishing Care Shampoo with Aloe Vera & Coconut Milk| For Strong & Silky Hair| Smoothens Hair| Paraben Free, 100% Vegan| All Hair Types| 330 ml",
            price: 100,
            img: "https://i.ibb.co.com/bjXjKBzS/img-2.jpg",
            id:5
        },
        {
            title: "Man",
            descriptions: "Parachute Naturale Nourishing Care Shampoo with Aloe Vera & Coconut Milk| For Strong & Silky Hair| Smoothens Hair| Paraben Free, 100% Vegan| All Hair Types| 330 ml",
            price: 100,
            img: "https://i.ibb.co.com/FSTKsFT/img-1.jpg",
            id:6
        },
    ]

    return (
        <div className=" py-10 bg-slate-200
        ">
            <div className="responsive-box">
                <h1 className=" text-xl">Flash Sales</h1>
            </div>
            <div className=" mt-5  ">
                <Swiper
                    breakpoints={
                        {
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 10,
                            },
                            1024: {
                                slidesPerView: 5,
                                spaceBetween: 10,
                            },
                        }
                    }
                    spaceBetween={50}
                    navigation
                    modules={[Pagination, Autoplay, Navigation]}
                >



                    {
                        products?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <Card_type_1 item={item} />
                            </SwiperSlide>

                        ))
                    }

                </Swiper>
            </div>
        </div>
    )
}

export default Flash_sell
