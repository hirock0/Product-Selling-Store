"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import React from "react"
import { MdClose } from "react-icons/md";
interface Props {
    cartPopup: boolean,
    setCartPopup: any,
    carts: any
}
const Carts: React.FC<Props> = ({ cartPopup, setCartPopup, carts }) => {
    return (
        <>
            {/* Cart Popup start */}
            {cartPopup && (
                <div className="fixed top-20 z-50 inset-0 flex items-center justify-center bg-black/60 ">

                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg w-[90%] max-w-lg"
                    >
                        <div className="flex justify-between items-center border-b pb-3 mb-3">
                            <h2 className="text-xl font-semibold">Your Cart</h2>
                            <button onClick={() => setCartPopup(false)} className="p-2">
                                <MdClose size={30} />
                            </button>
                        </div>
                        <div className="max-h-60 overflow-y-auto space-y-4">
                            {carts?.length > 0 ? (

                                carts.map((item: any, index: any) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 border p-3 rounded-lg shadow-sm"
                                    >
                                        <Image
                                            src={"https://i.ibb.co.com/Zz39NdjQ/img-5.jpg"}
                                            alt={"Image"}
                                            width={50}
                                            height={50}
                                            className="rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-lg font-medium">Title</h3>
                                            <p className="text-sm text-gray-600">500</p>
                                        </div>
                                        <button
                                            onClick={() => console.log("Remove Item", index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">Your cart is empty.</p>
                            )}
                        </div>
                        <div className="mt-5 flex justify-between">
                            <button
                                onClick={() => setCartPopup(false)}
                                className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 transition"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => console.log("Proceed to Checkout")}
                                className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
                            >
                                Buy Now
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
            {/* Cart Popup end */}
        </>
    )
}

export default Carts
