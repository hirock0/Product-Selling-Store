"use client"
import Link from "next/link"
import { useEffect, useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import Image from "next/image";
import swal from "sweetalert"
import axios from "axios";
import { signOut } from "next-auth/react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utils/redux/store";
import { fetchData } from "@/utils/redux/slices/slice";
import Carts from "../products/carts/carts";
import LogoutPopup from "./logoutPopup/logoutPopup";
const Nav = () => {
    const [logoutPopup, setLogoutPopup] = useState(false)
    const [menuFlag, setMenuFlag] = useState(false)
    const [loggedUser, setLoggedUser] = useState<any>(null)
    const [cartPopup, setCartPopup] = useState(false);
    const dispatch = useDispatch<AppDispatch>()
    const { carts } = useSelector((state: RootState) => state.slices)
    const logoutHandler = async () => {
        try {
            const response = await axios.get("/pages/api/user/logout")
            if (response?.data?.success) {
                swal({
                    title: response?.data?.message,
                    icon: "success"
                })
                await signOut()
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

        if (logoutPopup || cartPopup) {
            disableScroll();
        } else {
            enableScroll();
        }
        return () => enableScroll();
    }, [logoutPopup, cartPopup]);


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

    useEffect(() => {
        dispatch(fetchData())
    }, [dispatch])

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
                            <button
                                onClick={() => { setCartPopup(true) }}
                                className=" relative">
                                <MdShoppingCart size={30} />
                                <span className=" absolute text-white -top-2 right-0 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                    {
                                        (carts == undefined || carts == null) ?
                                            0 : carts?.length
                                    }
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
            <LogoutPopup logoutPopup={logoutPopup} setLogoutPopup={setLogoutPopup} logoutHandler={logoutHandler} />
            <Carts cartPopup={cartPopup} setCartPopup={setCartPopup} carts={carts} />
        </nav>
    )
}

export default Nav