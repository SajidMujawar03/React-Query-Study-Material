import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-indigo-600">
          Learning <span className="text-gray-800">useMutation</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          <code>useMutation</code> in React Query is used for creating, updating,
          or deleting data on the server. Unlike <code>useQuery</code> (which is
          for fetching), mutations are used to **change data**.
        </p>
      </motion.div>

      {/* Code Example */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="bg-gray-900 text-green-400 p-6 rounded-xl shadow-lg overflow-x-auto"
      >
        <pre className="text-sm">
{`const { mutate, isLoading, isError } = useMutation({
  mutationFn: (newPost) => createPost(newPost),
  onSuccess: () => {
    // refresh or update state
  },
});`}
        </pre>
      </motion.div>

      {/* Explanation Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {[
          {
            title: "mutationFn",
            desc: "Defines the function that performs the mutation (e.g., creating a post).",
          },
          {
            title: "onSuccess",
            desc: "Runs after mutation succeeds. Useful for refreshing posts or clearing inputs.",
          },
          {
            title: "Status Flags",
            desc: "You can track loading, error, or success states easily with `isLoading` and `isError`.",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-indigo-600">
              {item.title}
            </h3>
            <p className="mt-2 text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Posts Example Integration */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-indigo-50 p-6 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold text-indigo-700">
          Example: Adding a Post
        </h2>
        <p className="mt-2 text-gray-600">
          In our app, we use <code>useMutation</code> to handle the creation of
          posts. When you click <strong>"Upload Post"</strong>, the mutation
          sends your data to the API and updates the UI once it’s successful.
        </p>

        <div className="mt-4 bg-gray-800 text-gray-100 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm">{`createPostMutate({ 
  title: "React Query Rocks", 
  postDetails: "Learning useMutation with example." 
});`}</pre>
        </div>
      </motion.div>

      {/* Interactive Closing */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-10"
      >
        <h3 className="text-2xl font-semibold text-gray-800">
          🚀 Now you know how to use <span className="text-indigo-600">useMutation</span>!
        </h3>
        <p className="mt-2 text-gray-600">
          Go ahead and try creating posts in the app — React Query will take
          care of syncing everything.
        </p>
      </motion.div>
    </div>
  );
};

export default Home;
