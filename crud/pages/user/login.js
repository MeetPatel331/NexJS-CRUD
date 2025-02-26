"use client"
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function login() {
    const [data, setdata] = useState({})
    const route = useRouter()
    const [error, SetError] = useState('')
    const handleChange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(data)
        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password
            })
            if (res.error) {
                SetError('Invalid')
            }
            else {
                route.replace('/')
            }
        }
        catch (err) {
            SetError('Something went wrong')
        }
    }
    return (
        <>
            <form className="max-w-sm mx-auto mt-36  rounded-md border-gray-50 border-2 p-5" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" onChange={(e) => handleChange(e)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" name="password" onChange={(e) => handleChange(e)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className="text-right text-sm font-semibold mb-4">
                    Don't have an account ? <Link href="/user/signup" className="text-blue-400">SignUp</Link>
                </div>
                <div className="mb-5 text-center text-blue-400 font-bold">
                    OR
                </div>
                <div className="mb-5">
                    <button
                        onClick={() => {
                            signIn("github")
                        }
                        }
                        className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800 flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 .297C5.373.297 0 5.67 0 12.297c0 5.32 3.438 9.84 8.206 11.442.6.11.793-.26.793-.577v-2.157c-3.338.723-4.043-1.61-4.043-1.61-.546-1.386-1.333-1.755-1.333-1.755-1.088-.746.082-.73.082-.73 1.205.082 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.305 3.492.997.107-.774.418-1.305.762-1.604-2.665-.303-5.466-1.33-5.466-5.93 0-1.31.468-2.38 1.237-3.22-.124-.303-.537-1.523.117-3.172 0 0 1.008-.322 3.301 1.23a11.49 11.49 0 013.008-.404c1.02.007 2.047.137 3.007.404 2.293-1.553 3.3-1.23 3.3-1.23.654 1.65.242 2.87.118 3.172.77.84 1.236 1.91 1.236 3.22 0 4.612-2.803 5.624-5.475 5.921.429.37.812 1.096.812 2.21v3.293c0 .318.192.69.8.576 4.764-1.604 8.199-6.122 8.199-11.441C24 5.67 18.627.297 12 .297z" />
                        </svg>
                        Login with GitHub
                    </button>
                </div>
                {
                    error ? <span className="text-red-500 w-100 text-center mb-5">{error}</span> : ''
                }
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 block mx-auto w-full">Submit</button>
            </form>
        </>
    )
}