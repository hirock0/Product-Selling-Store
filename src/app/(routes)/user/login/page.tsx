'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/nav/nav';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const Login = () => {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post("/pages/api/user/login", data)
            if (response?.data?.success) {
                swal({
                    title: response?.data?.message,
                    icon: "success"
                })
                router.push("/")
            } else {
                swal({
                    title: response?.data?.message,
                    icon: "warning"
                })
            }
        } catch (error) {
            throw new Error(String(error))

        }
    };

    return (
        <main className=' min-h-screen'

            style={{
                background: "url(https://cdn.pixabay.com/photo/2023/12/09/23/34/login-8440426_960_720.png)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover"
            }}
        >
            <div className=" text-white">
                <Nav />
            </div>
            <div className="flex items-center justify-center  p-4">
                <div className="w-full max-w-4xl backdrop:filter backdrop-blur-3xl shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row">
                    {/* Left Side - Image */}
                    <div className="hidden md:block w-1/2 relative">
                        <Image
                            src="https://cdn.pixabay.com/photo/2018/07/12/21/32/subscribe-3534409_1280.jpg"
                            alt="Login"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-l-lg"
                        />
                    </div>

                    {/* Right Side - Form */}
                    <div className="w-full text-white md:w-1/2 p-8 flex flex-col justify-center">
                        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            {/* Email Field */}
                            <div>
                                <label className="block font-medium">Email</label>
                                <input
                                    type="email"
                                    {...register('email', { required: 'Email is required' })}
                                    className="input input-bordered w-full"
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="text-error text-sm mt-1">{errors.email.message as string}</p>}
                            </div>

                            {/* Password Field */}
                            <div className="relative">
                                <label className="block font-medium">Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', { required: 'Password is required' })}
                                    className="input input-bordered w-full"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-10 text-neutral"
                                >
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                                {errors.password && <p className="text-error text-sm mt-1">{errors.password.message as string}</p>}
                            </div>

                            {/* Forgot Password */}
                            <div className="text-right">
                                <Link href="/forgot-password" className="text-accent text-sm hover:underline">Forgot Password?</Link>
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="btn btn-primary w-full">
                                Login
                            </button>
                        </form>

                        {/* Google Login Button */}
                        <button className="btn btn-outline btn-accent w-full flex items-center justify-center gap-2 mt-4">
                            <FaGoogle /> Sign in with Google
                        </button>

                        {/* Policy and Create Account Buttons */}
                        <div className="flex justify-between mt-6 text-sm">
                            <Link href="/policy" className="text-neutral hover:underline">Privacy Policy</Link>
                            <Link href="/user/register" className="text-accent hover:underline">Create an Account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;