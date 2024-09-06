import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import cookie from "js-cookie";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

function Profile() {
    const [data, setData] = useState({});
    const id = useParams().id;
    const navigate = useNavigate();
    const getUserToken = JSON.parse(cookie.get("userInfo"));

    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:2108/user/userProfile/${id}`, {
                headers: {
                    Authorization: `Bearer ${getUserToken?.token}`
                }
            });
            console.log(response.data, "data");
            setData(response.data.body);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        cookie.remove("userInfo");
        navigate("/");
        toast.success("Logout successfully")
    };

    useEffect(() => {
        getData();
    }, [id]);

    return (
        <div className="flex">
            <div className="w-full sm:w-2/3">
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                        Applicant Information
                    </h3>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Full name
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data?.name}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Email
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data?.email}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Mobile
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data?.mobile}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Date of Birth
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data?.dateOfBirth}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Gender
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data?.gender == 0 ? "Male" : data?.gender == 1 ? "Female" : data?.gender == 2 ? "Other" : ""}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Martial Status
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data?.martialStatus == 0 ? "Single" : "Married"}
                            </dd>
                        </div>
                        {data?.martialStatus == 0 ? "" : <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Spouse Name
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data?.spouse}
                            </dd>
                        </div>}

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Address
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                {data?.address}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                                Attachments
                            </dt>
                            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul
                                    role="list"
                                    className="divide-y divide-gray-100 rounded-md border border-gray-200"
                                >
                                    {data?.pdfFile?.map((url, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                                        >
                                            <div className="flex w-0 flex-1 items-center">
                                                <FontAwesomeIcon
                                                    icon={faFilePdf}
                                                    className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                />
                                                <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                    <span className="truncate font-medium">
                                                        {url.split('/').pop()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <a
                                                    href={url}
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    download
                                                >
                                                    Download
                                                </a>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Logout
                </button>
                <img
                    src={data?.image ? data?.image : 'default-image-url.jpg'}
                    alt="Applicant"
                    className="h-40 w-40 object-cover mt-8"
                />
            </div>
        </div>
    );
}

export default Profile;
