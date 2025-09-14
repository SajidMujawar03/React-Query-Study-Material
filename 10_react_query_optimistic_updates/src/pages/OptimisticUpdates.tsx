import { useState } from "react";
import { getProducts, uploadProduct } from "@/services/products.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const OptimisticUpdates = () => {
  // React Query's client for interacting with the cache
  const client = useQueryClient();

  // Local state to manage form inputs for a new product
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  /**
   * useQuery - fetch products from the backend
   * queryKey: unique key to identify this query in React Query's cache
   * queryFn: function that actually fetches data (getProducts service)
   */
  const {
    data, // actual response data
    isLoading: isGettingProducts, // loading state
    isError: isErrorGettingProducts, // error state
    error: gettingProductsError, // error object if request fails
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  /**
   * useMutation - used for POST/PUT/DELETE type requests
   * Here, it uploads a new product
   */
  const {
    mutate: uploadMutate, // function to trigger mutation
    isPending, // mutation in progress
    isError: isUploadError, // error state for mutation
    error: uploadError, // error object if upload fails
  } = useMutation({
    mutationFn: (product) => uploadProduct(product), // function that performs upload

    /**
     * onMutate runs before mutationFn and allows "optimistic updates"
     * so the UI feels instant by updating cache before server confirms
     */
    onMutate: async (newProduct: any) => {
      // Cancel any ongoing refetches for this query
      await client.cancelQueries({ queryKey: ["products"] });

      // Save the current cached data in case we need to roll back
      const oldData = client.getQueryData(["products"]);

      // Optimistically update cache: add new product to products list
      client.setQueryData(["products"], (oldQueryData: any) => {
        return {
          ...oldQueryData,
          data: [
            ...(oldQueryData?.data || []),
            {
              ...newProduct,
              id:
                Math.floor(Math.random() * 1000) +
                "-" +
                new Date().toISOString(), // generate temporary id
            },
          ],
        };
      });

      // Return old data so we can rollback in case of error
      return { oldData };
    },

    /**
     * onError runs if mutation fails
     * Restore old cached data so user doesn't see broken UI
     */
    onError: (_error, _productData, context) => {
      client.setQueryData(["products"], context?.oldData);
    },

    /**
     * onSettled runs after success OR failure
     * Here, it ensures the cache is refetched from the server
     */
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["products"] });
    },
  });

  /**
   * handleChange - updates form state as user types
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * handleSubmit - called when user submits the form
   * It calls uploadMutate() to trigger optimistic update + API request
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default page reload
    uploadMutate(form); // trigger mutation with form data
    setForm({ title: "", description: "", price: "", image: "" }); // reset form
  };

  // Handle loading and error states for fetching products
  if (isGettingProducts) return <p className="text-center">Loading...</p>;
  if (isErrorGettingProducts)
    return (
      <p className="text-center text-red-500">
        {gettingProductsError.message}
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-4 border"
      >
        <h2 className="text-2xl font-semibold text-gray-700">Add a Product</h2>

        {/* Title input */}
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Description input */}
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Price input */}
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Image input (URL) */}
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        {/* Submit button */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
        >
          {isPending ? "Uploading..." : "Upload Product"}
        </button>

        {/* Show error if upload fails */}
        {isUploadError && (
          <p className="text-red-500">Error: {uploadError.message}</p>
        )}
      </form>

      {/* Products List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.data?.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md border"
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            {/* Product Title */}
            <h3 className="text-lg font-semibold">{product.title}</h3>
            {/* Product Description */}
            <p className="text-gray-600">{product.description}</p>
            {/* Product Price */}
            <p className="text-blue-600 font-bold mt-2">₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptimisticUpdates;
