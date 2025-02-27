'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/components/nav/nav';
import Footer from '@/components/footer/footer';
import axios from "axios"
import swal from "sweetalert"

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const onSubmit = async (data: any) => {
        data.image = imagePreview
        const response = await axios.post("/pages/api/user/register", data)
        if (response?.data?.success) {
            swal({ title: response?.data?.message, icon: "success" })
        } else {
            swal({ title: response?.data?.message, icon: "warning" })
        }


    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <main
            style={{
                background: "url(https://cdn.pixabay.com/photo/2023/12/09/23/34/login-8440426_960_720.png)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover"
            }}
            className=' overflow-y-scroll'
        >
            <div className=" ">
                <div className=" text-white z-50 sticky top-0 md:backdrop:filter md:backdrop-blur-3xl max-md:bg-slate-800">
                    <Nav />
                </div>
                <div className="flex  items-center justify-center p-4">
                    <div className="w-full max-w-4xl bg-base-100 shadow-xl rounded-lg overflow-hidden flex flex-col md:flex-row">
                        {/* Left Side - Image Preview */}
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
                        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                            <h2 className="text-3xl font-bold text-center text-neutral mb-6">Create an Account</h2>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-neutral font-medium">Full Name</label>
                                    <input type="text" {...register('name', { required: 'Name is required' })} className="input input-bordered w-full" placeholder="Enter your name" />
                                    {errors.name && <p className="text-error text-sm mt-1">{errors.name.message as string}</p>}
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-neutral font-medium">Email</label>
                                    <input type="email" {...register('email', { required: 'Email is required' })} className="input input-bordered w-full" placeholder="Enter your email" />
                                    {errors.email && <p className="text-error text-sm mt-1">{errors.email.message as string}</p>}
                                </div>

                                {/* Password Field */}
                                <div className="relative">
                                    <label className="block text-neutral font-medium">Password</label>
                                    <input type={showPassword ? 'text' : 'password'} {...register('password', { required: 'Password is required' })} className="input input-bordered w-full" placeholder="Enter your password" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-10 text-neutral">
                                        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                    </button>
                                    {errors.password && <p className="text-error text-sm mt-1">{errors.password.message as string}</p>}
                                </div>

                                {/* Confirm Password Field */}
                                <div className="relative">
                                    <label className="block text-neutral font-medium">Confirm Password</label>
                                    <input type={showConfirmPassword ? 'text' : 'password'} {...register('confirmPassword', {
                                        required: 'Please confirm your password',
                                        validate: value => value === watch('password') || 'Passwords do not match'
                                    })} className="input input-bordered w-full" placeholder="Re-enter your password" />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-10 text-neutral">
                                        {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                    </button>
                                    {errors.confirmPassword && <p className="text-error text-sm mt-1">{errors.confirmPassword.message as string}</p>}
                                </div>

                                {/* Image Upload Field */}
                                <div>
                                    <label className="block text-neutral font-medium">Profile Picture</label>
                                    <input type="file" accept="image/*" {...register('image', { required: 'Image is required' })} className="file-input file-input-bordered w-full" onChange={handleImageChange} />
                                    {errors.image && <p className="text-error text-sm mt-1">{errors.image.message as string}</p>}
                                    <div className="">
                                        {imagePreview ? (
                                            <Image src={imagePreview} alt="Preview" width={300} height={300} className="rounded-lg" />
                                        ) : (
                                            <p className="text-gray-500">Image Preview</p>
                                        )}
                                    </div>
                                </div>


                                {/* Submit Button */}
                                <button type="submit" className="btn btn-primary w-full">Register</button>
                            </form>

                            {/* Already Have an Account */}
                            <div className="text-center mt-4 text-sm">
                                <Link href="/login" className="text-accent hover:underline">Already have an account? Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <Footer />
                </div>
            </div>
        </main>
    );
};

export default Register;
