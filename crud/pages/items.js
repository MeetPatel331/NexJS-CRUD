import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getServerSideProps() {
    try {
        const res = await axios.get("http://localhost:3000/api/items");
        return { props: { items: res.data } };
    } catch (error) {
        console.error("Error fetching items:", error);
        return { props: { items: [] } };
    }
}

export default function Item({ items }) {
    const router = useRouter();
    const { data: session } = useSession();
    const [editFormIndex, setEditFormIndex] = useState(null);
    const [loading, setloading] = useState(false)
    const [editData, setEditData] = useState({ name: "", price: "", _id: "" });

    const handleRemove = async (id) => {
        try {
            setloading(true)
            await axios.delete(`/api/items/?id=${id}`);
            router.replace(router.asPath);
            setloading(false)
        } catch (err) {
            console.error("Error removing item:", err);
            setloading(false)
        }
    };

    const handleEditClick = (item, index) => {
        setEditFormIndex(index);
        setEditData({ name: item.name, price: item.price, _id: item._id });
    };

    const handleEditDataChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setloading(true)
        try {
            await axios.put(`/api/items`, editData);
            router.replace(router.asPath); // Refresh page after update
            setEditFormIndex(null);
            setloading(false)
        } catch (err) {
            console.error("Error updating item:", err);
            setloading(false)
        }
    };

    return (
        <div className="grid place-content-center h-screen bg-gray-50 p-6">
            <div>
                <button className="bg-gray-100 text-blue-400 px-3 py-1 rounded-md font-bold mb-3" onClick={() => router.replace('/')}>
                    &larr; Home
                </button>
                <button className="bg-gray-100 text-blue-400 px-3 py-1 rounded-md font-bold mb-3 ml-3" onClick={() => router.replace('/additem')}>
                    Add
                </button>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Product Name</th>
                                <th className="px-6 py-3">Price</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length > 0 ? (
                                items.map((item, index) => (
                                    <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                        <td className="px-6 py-4">${item.price}</td>
                                        <td className="px-6 py-4 text-right flex space-x-4">
                                            <button className="text-blue-600 hover:underline" onClick={() => handleEditClick(item, index)}>
                                                Edit
                                            </button>
                                            <button className="text-red-600 hover:underline" onClick={() => handleRemove(item._id)}>
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center">No items found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {editFormIndex !== null && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-md shadow-md">
                            <h2 className="text-lg font-semibold mb-4">Edit Item</h2>
                            <form onSubmit={handleUpdate}>
                                <div className="mb-5">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                                        Item Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={editData.name}
                                        onChange={handleEditDataChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Name"
                                        required
                                    />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        value={editData.price}
                                        onChange={handleEditDataChange}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Price"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                                        onClick={() => setEditFormIndex(null)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        {
                                            loading ? 'Loading...' : 'Update'
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
