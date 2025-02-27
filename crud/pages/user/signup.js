"use client"
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function signup() {
    const [data, setdata] = useState({})
    const route = useRouter()
    const [error, SetError] = useState('')
    const [loading, setloading] = useState(false)
    const handleChange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setloading(true)
        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                route.replace('/user/login')
                setloading(false)
            }
            else {
                setloading(false)
                SetError(res.json().data.message)
            }
        }
        catch (err) {
            SetError("Somethin went wrong")
            setloading(false)
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
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                    <input type="text" name="name" onChange={(e) => handleChange(e)} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" name="password" onChange={(e) => handleChange(e)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className="text-right text-sm font-semibold mb-4">
                    already have an account ? <Link href="/user/login" className="text-blue-400">Login</Link>
                </div>
                {
                    error ? <span className="text-red-500 w-100 text-center mb-5">{error}</span> : ''
                }
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 block mx-auto w-full">{
                    loading ? <div className="loader">Loading...</div> : 'Submit'
                }</button>
            </form>
        </>
    )
}