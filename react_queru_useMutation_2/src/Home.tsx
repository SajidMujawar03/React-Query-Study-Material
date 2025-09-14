import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-800">
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center space-y-6"
        >
          <h1 className="text-5xl font-extrabold glitch-light text-blue-600 tracking-wide">
            React Query – useMutation
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn how <span className="text-blue-600 font-semibold">useMutation</span> works with{" "}
            <span className="text-blue-600 font-semibold">QueryClientProvider</span> to send and manage data efficiently.
          </p>
        </motion.div>

        {/* Run Server Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="p-6 bg-blue-50 border-l-4 border-blue-600 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-bold text-blue-700 mb-2">⚡ Before You Start</h2>
          <p className="text-gray-700">
            Make sure you have the mock API server running. In a separate terminal, run:
          </p>
          <pre className="bg-blue-900 text-blue-100 p-3 rounded-md mt-3 text-sm">
            npm run server
          </pre>
          <p className="text-gray-600 mt-2">
            This will start your backend (JSON server) so that <code>getProducts</code> and{" "}
            <code>uploadProduct</code> can work properly.
          </p>
        </motion.div>

        {/* Explanation Cards */}
        <div className="grid sm:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white border border-blue-100 shadow-lg rounded-xl"
          >
            <h2 className="text-xl font-bold text-blue-600 mb-3">🔹 QueryClientProvider</h2>
            <p className="text-gray-600 mb-4">
              It provides a client instance to your app so that{" "}
              <code className="bg-blue-100 px-1 rounded">useQuery</code> and{" "}
              <code className="bg-blue-100 px-1 rounded">useMutation</code> can work anywhere in the tree.
            </p>
            <pre className="bg-blue-900 text-blue-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

<QueryClientProvider client={queryClient}>
  <App />
</QueryClientProvider>`}
            </pre>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white border border-blue-100 shadow-lg rounded-xl"
          >
            <h2 className="text-xl font-bold text-blue-600 mb-3">🔹 useMutation</h2>
            <p className="text-gray-600 mb-4">
              It lets you send <span className="text-blue-600 font-semibold">POST, PUT, DELETE</span> requests and handle optimistic updates or invalidations.
            </p>
            <pre className="bg-blue-900 text-blue-100 p-4 rounded-lg text-sm overflow-x-auto">
{`const mutation = useMutation({
  mutationFn: newPost => axios.post("/posts", newPost),
  onSuccess: () => {
    queryClient.invalidateQueries(["posts"])
  }
});`}
            </pre>
          </motion.div>
        </div>

        {/* Interactive Flow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="p-8 bg-gradient-to-r from-blue-100 to-white rounded-xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            🚀 Flow of useMutation with QueryClientProvider
          </h2>
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg border border-blue-200 shadow-md flex-1"
            >
              <h3 className="font-bold text-blue-600 mb-2">1. Wrap App</h3>
              <p className="text-gray-600">Provide <code>QueryClientProvider</code> at the root of your app.</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg border border-blue-200 shadow-md flex-1"
            >
              <h3 className="font-bold text-blue-600 mb-2">2. useMutation</h3>
              <p className="text-gray-600">Call <code>useMutation</code> in your component with a mutation function.</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg border border-blue-200 shadow-md flex-1"
            >
              <h3 className="font-bold text-blue-600 mb-2">3. Update Cache</h3>
              <p className="text-gray-600">Use <code>queryClient.invalidateQueries</code> to refresh your queries after success.</p>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <a
            href="/usemutation"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Try useMutation Demo →
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
