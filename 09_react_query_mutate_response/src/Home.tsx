import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold text-blue-700">
            React Query: Mutations & Queries
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn how to{" "}
            <span className="font-semibold">fetch data</span> with{" "}
            <code className="bg-gray-200 px-1 rounded">useQuery</code> and{" "}
            <span className="font-semibold">update data</span> with{" "}
            <code className="bg-gray-200 px-1 rounded">useMutation</code>.
          </p>
        </motion.div>

        {/* Step 1: Fetching */}
        <div className="bg-white shadow-lg rounded-xl p-6 space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">
            1. Fetching Data with <code>useQuery</code>
          </h2>
          <p className="text-gray-600">
            We use <code>useQuery</code> to fetch products from the server. It
            handles loading, error, and caching for us automatically.
          </p>
          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
{`const { data: products, isLoading, isError } = useQuery({
  queryKey: ["products"],
  queryFn: getProducts,
});`}
          </pre>
        </div>

        {/* Step 2: Mutating */}
        <div className="bg-white shadow-lg rounded-xl p-6 space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">
            2. Adding Data with <code>useMutation</code>
          </h2>
          <p className="text-gray-600">
            To add a product, we use <code>useMutation</code>. Once successful,
            we update the cache with <code>queryClient.setQueryData</code> so
            the UI reflects changes instantly.
          </p>
          <pre className="bg-gray-900 text-yellow-300 p-4 rounded-lg overflow-x-auto text-sm">
{`const { mutate: postProduct, isPending } = useMutation({
  mutationFn: uploadProduct,
  onSuccess: (newProduct) => {
    queryClient.setQueryData(["products"], (oldData) => ({
      ...oldData,
      data: [...(oldData?.data || []), newProduct.data],
    }));
  },
});`}
          </pre>
        </div>

        {/* Step 3: UI Form */}
        <div className="bg-white shadow-lg rounded-xl p-6 space-y-3">
          <h2 className="text-xl font-semibold text-gray-800">
            3. Interactive Form
          </h2>
          <p className="text-gray-600">
            The form lets you add a product with <b>title, price, description,
            and image</b>. When submitted, it triggers{" "}
            <code>postProduct()</code>.
          </p>
          <pre className="bg-gray-900 text-blue-300 p-4 rounded-lg overflow-x-auto text-sm">
{`<button onClick={() => 
  postProduct({ title, price, description, image })}>
  Add Product
</button>`}
          </pre>
        </div>

        {/* CTA to Implementation */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/mutate-request")}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            Try It Yourself →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
