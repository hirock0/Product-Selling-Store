"use client"

import Link from "next/link"
import { useEffect, useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import { MdMenu } from "react-icons/md";
const Nav = () => {
    const [menuFlag, setMenuFlag] = useState(false)
    useEffect(() => {
        const handler = () => {
            setMenuFlag(false)
        }
        window.addEventListener("click", handler)
        return () => {
            window.removeEventListener("click", handler)
        }
    }, [menuFlag])
    return (
        <nav>
            <div className=" h-20 flex items-center">
                <div className="responsive-box center-between">
                    <div className="">left</div>
                    <div onClick={(e) => e.stopPropagation()} className={` ${!menuFlag ? " max-md:translate-x-full" : " max-md:translate-x-0"} max-md:transition-all center-between gap-5 max-md:fixed max-md:right-0 max-md:top-20 max-md:bg-red-200 max-md:flex-col max-md:items-start max-md:w-1/2 max-md:p-5 `}>
                        <Link href={"/"}>Home</Link>
                        <Link href={"/"}>About</Link>
                        <Link href={"/"}>Products</Link>
                        <Link href={"/"}>Home</Link>
                        <Link href={"/"}>Home</Link>
                    </div>
                    <div className="">
                        <div className="center-between gap-5">
                            <button className=" relative">
                                <MdShoppingCart size={30} />
                                <span className=" absolute text-white -top-2 right-0 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                    5
                                </span>
                            </button>
                            <Link href={"/user/login"}>
                                Login
                            </Link>
                            <button onClick={(e) => { e.stopPropagation(), setMenuFlag(!menuFlag) }} className="  md:hidden">
                                <MdMenu size={30} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav
