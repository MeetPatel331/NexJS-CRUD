import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

export default function additems() {
    const route = useRouter()
    const [data, setdata] = useState({})
    const [error, setError] = useState('')
    const [loading, setloading] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        setloading(true)
        axios.post('/api/items', data).then((res) => {
            console.log(res.data)
            route.replace('/items')
            setloading(false)
        }).catch((err) => {
            setError(err.response.data.message)
            setloading(false)
        })
    }
    const handleChange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    }
    return (
        <form className="max-w-sm mx-auto mt-36  rounded-md border-gray-50 border-2 p-5" onSubmit={handleSubmit}>
            <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Name</label>
                <input type="text" name="name" onChange={(e) => handleChange(e)} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name" />
            </div>
            <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Price</label>
                <input type="number" name="price" onChange={(e) => handleChange(e)} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            {
                error ? <span className="text-red-500 w-100 text-center mb-5">{error}</span> : ''
            }
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 block mx-auto w-full">{
                loading ? 'Loading...' : 'Submit'
            }</button>
        </form>
    )
}