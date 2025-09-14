import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProducts, uploadProduct } from "./services/product.service";
import { useState } from "react";

// Define product type (adjust fields if needed)
type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
};

const UseMutation = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
  });

  const queryClient = useQueryClient();

  // Fetch products
  const { data, isLoading, isError, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts, // no need to wrap in async/await
  });

  // Mutation for uploading a product
  const { mutate: uploadMutate, isPending, isError: isNotPostedProduct, error: postProductError } =
    useMutation({
      mutationFn: (newProduct: Omit<Product, "id">) => uploadProduct(newProduct),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        setForm({ title: "", description: "", image: "" }); // clear form
      },
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    uploadMutate(form);
  };

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error: {String(error)}</p>;

  return (
    <div className="p-4 max-w-xl mx-auto space-y-6">
      {/* Form */}
      <div className="bg-white p-4 shadow rounded space-y-4">
        <h2 className="text-lg font-semibold">Upload Product</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-full"
        />
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Uploading..." : "Upload"}
        </button>
        {isNotPostedProduct && (
          <p className="text-red-500">Error: {String(postProductError)}</p>
        )}
      </div>

      {/* Products */}
      <div className="grid gap-4">
        {data?.map((product) => (
          <div
            key={product.id}
            className="p-4 border rounded shadow bg-white flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-32 h-32 object-cover mb-2"
            />
            <p className="font-semibold">{product.title}</p>
            <p className="text-gray-600">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UseMutation;
