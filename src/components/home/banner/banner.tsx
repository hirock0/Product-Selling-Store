"use client"

import Nav from "@/components/nav/nav"
import { useEffect, useState } from "react"

const Banner = () => {
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
            <div className="h-[600px] max-md:h-[500px] max-sm:h-[400px]"
                style={{
                    background: "url(https://cdn.pixabay.com/photo/2022/02/17/18/41/desert-7019289_640.jpg)",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }}
            >
                <div className={`${scrollFlag && "fixed z-50 top-0 left-0 right-0 bg-slate-800/80"} bg-zinc-800/20 text-white`}>
                    <Nav />
                </div>
                <div className="">
                    <div className=" responsive-box">
                        dsfsadf
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner
