"use client"
import { motion } from "framer-motion"
import React from "react";
import { MdClose } from "react-icons/md";
interface Props {
    logoutPopup: boolean,
    setLogoutPopup: any,
    logoutHandler: () => void
}
const LogoutPopup: React.FC<Props> = ({ logoutPopup, setLogoutPopup, logoutHandler }) => {
    return (
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
    )
}

export default LogoutPopup
