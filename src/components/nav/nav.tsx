"use client"
import Link from "next/link"
import { useEffect, useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import Image from "next/image";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";
import swal from "sweetalert"
import axios from "axios";
const Nav = () => {
    const [logoutPopup, setLogoutPopup] = useState(false)
    const [menuFlag, setMenuFlag] = useState(false)
    const [loggedUser, setLoggedUser] = useState<object | null>(null)
    const logoutHandler = async () => {
        try {
            const response = await axios.get("/pages/api/user/logout")
            if (response?.data?.success) {
                swal({
                    title: response?.data?.message,
                    icon: "success"
                })
                setLogoutPopup(false)
                setLoggedUser(null)
            } else {
                swal({
                    title: response?.data?.message,
                    icon: "warning"
                })
            }
        } catch (error) {
            throw new Error(String(error))

        }
    }
    useEffect(() => {
        const handler = () => {
            setMenuFlag(false)
        }
        window.addEventListener("click", handler)
        return () => {
            window.removeEventListener("click", handler)
        }
    }, [menuFlag])


    useEffect(() => {
        const disableScroll = () => {
            document.body.style.overflow = "hidden";
        };

        const enableScroll = () => {
            document.body.style.overflow = "auto";
        };

        if (logoutPopup) {
            disableScroll();
        } else {
            enableScroll();
        }

        return () => enableScroll();
    }, [logoutPopup]);



    useEffect(() => {
        const controller = new AbortController()
        const unsubscribe = async () => {
            try {
                const response = await axios.get("/pages/api/user/decodedUser", {
                    signal: controller.signal
                });
                setLoggedUser(response?.data?.user)
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled:", error.message);
                } else {
                    console.error("Error fetching user:", error);
                }

            }
        }
        unsubscribe()
        return () => {
            controller.abort()
        }

    }, [])


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
                            {

                                loggedUser ?
                                    <button onClick={() => setLogoutPopup(true)} className=" w-12 h-12 rounded-full overflow-hidden">
                                        <Image src={loggedUser?.image} alt={loggedUser?.name} width={500} height={500} />
                                    </button>
                                    :
                                    <Link href={"/user/login"}>
                                        Login
                                    </Link>
                            }
                            <button onClick={(e) => { e.stopPropagation(), setMenuFlag(!menuFlag) }} className="  md:hidden">
                                <MdMenu size={30} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={` ${!logoutPopup ? " hidden" : " block"} fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm`}>
                {/* Animated Popup */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg w-[90%] max-w-md text-center"
                >
                    {/* Close Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={() => setLogoutPopup(false)}
                            className="p-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
                        >
                            <MdClose size={30} />
                        </button>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Are you sure you want to logout?
                    </h2>

                    {/* Buttons */}
                    <div className="mt-5 flex justify-center gap-4">
                        <button
                            onClick={() => logoutHandler()}
                            className="px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
                        >
                            Logout
                        </button>
                        <button
                            onClick={() => setLogoutPopup(false)}
                            className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </motion.div>
            </div>
        </nav>
    )
}

export default Nav