import Image from "next/image"
import Link from "next/link"

const Categories = () => {


    const productCategories = [
        {
            title: "modile",
            cat_path: "/category",
            img: "https://i.ibb.co.com/VcZRQKrt/cat-1.jpg"
        },
        {
            title: "modile",
            cat_path: "/category",
            img: "https://i.ibb.co.com/mdQR1WY/cat-2.jpg"
        },
        {
            title: "modile",
            cat_path: "/category",
            img: "https://i.ibb.co.com/cX3Y7zNk/cat-3.jpg"
        },
        {
            title: "modile",
            cat_path: "/category",
            img: "https://i.ibb.co.com/zhYGdh0m/cat-4.jpg"
        },
        {
            title: "modile",
            cat_path: "/category",
            img: "https://i.ibb.co.com/8gysrCgr/cat-5.jpg"
        },
        {
            title: "modile",
            cat_path: "/category",
            img: "https://i.ibb.co.com/fdvnwfCR/cat-6.jpg"
        },
        {
            title: "modile",
            cat_path: "/category",
            img: "https://i.ibb.co.com/LdqJS0fm/cat-7.jpg"
        },
        {
            title: "modile",
            cat_path: "/category",
            img: "https://i.ibb.co.com/p6zPLtgK/cat-8.jpg"
        },
        {
            title: "modile",
            cat_path: "/category",
            img: "https://i.ibb.co.com/TB0pKdPj/cat-9.jpg"
        },
        {
            title: "modile",
            cat_path: "/category",
            img: "https://i.ibb.co.com/9K6z8s2/cat-10.jpg"
        },
        {
            title: "modile",
            cat_path: "/category",
            img: "https://i.ibb.co.com/v42cDLmR/cat-11.jpg"
        },
        {
            title: "modile",
            cat_path: "/category",
            img: "https://i.ibb.co.com/rfyGBcYx/cat-12.jpg"
        },
        {
            title: "modile",
            cat_path: "/category",
            img: "https://i.ibb.co.com/7tNDK98N/cat-13.jpg"
        },
        {
            title: "modile",
            cat_path: "/category",
            img: "https://i.ibb.co.com/Fqh9Bpwv/cat-15.jpg"
        },
    ]
    return (
        <div className="py-10 bg-slate-200">
            <div className="responsive-box">
                <h1 className="text-2xl">Category</h1>
            </div>
            <div className=" mt-5 grid grid-cols-7 max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 justify-items-center gap-2">
                {
                    productCategories?.map((item, index) => (
                        <Link href={item?.cat_path} key={index} className=" hover:scale-105">
                            <div className=" " >
                                <div className=" h-52">
                                    <Image src={item?.img} alt={item?.title} width={500} height={500} className=" w-full h-full object-cover" />
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories
