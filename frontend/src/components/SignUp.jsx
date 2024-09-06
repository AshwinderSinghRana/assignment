import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';

function SignUp() {
    const [data, setData] = useState({ name: "", email: "", mobile: "", dateOfBirth: "", gender: "", martialStatus: "", spouse: "", address: "", password: "" });
    const [image, setImage] = useState(null);
    const [pdfFiles, setPdfFiles] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showSpouse, setShowSpouse] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setImage(files[0]);
        } else if (name === "pdfFile") {
            setPdfFiles(files);
        }
        else if (name === "martialStatus") {
            const martialStatus = Number(value);
            setData({ ...data, [name]: martialStatus });
            setShowSpouse(martialStatus === 1);
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the mobile number is exactly 10 digits
        if (data.mobile.length !== 10) {
            toast.error("Mobile number must be exactly 10 digits");
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("mobile", data.mobile);
        formData.append("dateOfBirth", data.dateOfBirth);
        formData.append("gender", data.gender);
        formData.append("martialStatus", data.martialStatus);
        if (showSpouse) formData.append("spouse", data.spouse);
        formData.append("address", data.address);
        formData.append("password", data.password);
        if (image) {
            formData.append("image", image);
        }
        if (pdfFiles.length > 0) {
            Array.from(pdfFiles).forEach((file) => {
                formData.append("pdfFile", file);
            });
        }

        try {
            await axios.post('http://localhost:2108/user/signUp', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((res) => {
                if (res.data.status === 200) {
                    toast.success(res.data.message);
                    navigate("/");
                } else {
                    toast.error(res.data.message);
                }
            }).catch((err) => {
                toast.error("Something went wrong!");
            });
        } catch (error) {
            toast.error("Submission failed!");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <>
            <div className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center">
                <div className="bg-white shadow-lg rounded-lg p-8 md:w-1/2 w-full max-w-3xl">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">
                            User Registration
                        </h2>
                    </div>

                    <div className="mt-8">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 text-left">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 text-left">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 text-left">
                                    Mobile
                                </label>
                                <input
                                    id="mobile"
                                    name="mobile"
                                    type="number"
                                    required
                                    className="block w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 text-left">
                                    Date Of Birth
                                </label>
                                <input
                                    id="dateOfBirth"
                                    name="dateOfBirth"
                                    type="date"
                                    required
                                    className="block w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 text-left">
                                    Gender
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    required
                                    className="block w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                    onChange={handleChange}
                                >
                                    <option value="" hidden>---Select Gender---</option>
                                    <option value="0">Male</option>
                                    <option value="1">Female</option>
                                    <option value="2">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 text-left">
                                    Marital Status
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="martialStatus"
                                            value="0"
                                            className="form-radio h-4 w-4 text-indigo-600"
                                            onChange={handleChange}
                                            checked={data?.martialStatus === 0}
                                        />
                                        <span className="ml-2">Single</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="martialStatus"
                                            value="1"
                                            className="form-radio h-4 w-4 text-indigo-600"
                                            onChange={handleChange}
                                            checked={data.martialStatus === 1}
                                        />
                                        <span className="ml-2">Married</span>
                                    </label>
                                </div>
                            </div>

                            {showSpouse && (
                                <div>
                                    <label htmlFor="spouse" className="block text-sm font-medium text-gray-700 text-left">
                                        Spouse Name
                                    </label>
                                    <input
                                        id="spouse"
                                        name="spouse"
                                        type="text"
                                        required={showSpouse}
                                        className="block w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                        onChange={handleChange}
                                    />
                                </div>
                            )}

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 text-left">
                                    Address
                                </label>
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 text-left">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="block w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                        onChange={handleChange}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <FontAwesomeIcon icon={faEye} />
                                        ) : (
                                            <FontAwesomeIcon icon={faEyeSlash} />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="image" className="block text-sm font-medium text-gray-700 text-left">
                                    Upload Image
                                </label>
                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    required
                                    className="block w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="pdfFile" className="block text-sm font-medium text-gray-700 text-left">
                                    Upload PDF
                                </label>
                                <input
                                    id="pdfFile"
                                    name="pdfFile"
                                    type="file"
                                    accept="application/pdf"
                                    multiple
                                    required
                                    className="block w-full rounded-md border-gray-300 py-2 px-4 text-gray-900 shadow-sm focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={handleGoBack}
                                    className="hover:text-indigo-900"
                                    
                                >
                                    Go Back
                                </button>
                                <button
                                    type="submit"
                                    className="py-2 px-4 bg-indigo-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    style={{ backgroundColor: 'rgb(229, 70, 70)' }}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
