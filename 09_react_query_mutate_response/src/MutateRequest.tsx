import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, uploadProduct } from "./services/products.service";
import { data } from "react-router";
import { useState } from "react";

const MutateRequest = () => {
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        description: "",
        image: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const {
        data: products,
        isError: isErrorGettingProducts,
        isLoading: isProductsLoading,
        error: ProductsError,
    } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    console.log(products);


    const { mutate: postProduct, isPending, isError, error } = useMutation({
        mutationFn: uploadProduct,
        onSuccess: (newProduct) => {
            queryClient.setQueryData(["products"], (oldData: any) => {
                console.log("n :", newProduct);

                return {
                    ...oldData,
                    data: [...(oldData?.data || []), newProduct.data],
                };
            });
        },
    });

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Add Product Form */}
                <form onSubmit={(e) => {
                    e.preventDefault()
                    postProduct({
                        id: new Date(Date.now()).toLocaleString() + Math.random(),
                        title: formData.title,
                        description: formData.description,
                        price: Number(formData.price),
                        image: formData.image,
                    })
                }}>
                    <div className="bg-white shadow rounded-lg p-6 space-y-4">

                        <h2 className="text-lg font-semibold text-gray-800">Add Product</h2>

                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Product Title"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Product Description"
                            rows={3}
                            required
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            placeholder="Price"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        <input
                            type="text"
                            name="image"
                            value={formData.image}

                            onChange={handleChange}
                            placeholder="Image URL"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />

                        <div className="flex justify-end">
                            <button
                                disabled={isPending}
                                type="submit"
                                className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                            >
                                {isPending ? "Adding..." : "Add Product"}
                            </button>
                        </div>

                    </div>
                </form>


                {/* Loading & Error States */}
                {isProductsLoading && (
                    <p className="text-gray-600 text-center">Loading products...</p>
                )}
                {isErrorGettingProducts && (
                    <p className="text-red-600 text-center">
                        Error: {ProductsError.message}
                    </p>
                )}

                {/* Product List */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {products?.data.map((p: any) => (
                        <li
                            key={p.id}
                            className="bg-white rounded-xl shadow-md p-5 space-y-3 hover:shadow-lg transition"
                        >
                            <h3 className="text-lg font-semibold text-gray-800">
                                {p.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{p.description}</p>
                            <p className="text-blue-600 font-medium">${p.price}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MutateRequest;
