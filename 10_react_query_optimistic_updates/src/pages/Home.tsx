import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 text-gray-800">
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold text-blue-600">
            Optimistic Updates with React Query
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Optimistic updates let you update the UI instantly before the server
            confirms the change, making apps feel faster and more responsive.
          </p>
        </motion.div>

        {/* Explanation Section */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white shadow-lg rounded-xl p-8 space-y-4 border"
        >
          <h2 className="text-2xl font-semibold text-gray-700">
            Why Optimistic Updates?
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Without optimistic updates, users have to wait until the server
            responds before seeing changes. With optimistic updates, we
            temporarily assume the operation will succeed, show the result
            immediately, and then roll back if something goes wrong.
          </p>
        </motion.div>

        {/* Code Snippet */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-900 text-gray-100 rounded-xl p-6 shadow-md overflow-x-auto"
        >
          <pre className="text-sm leading-relaxed">
{`const { mutate } = useMutation({
  mutationFn: addItem,
  onMutate: async (newItem) => {
    await queryClient.cancelQueries(['items'])
    const previousItems = queryClient.getQueryData(['items'])

    queryClient.setQueryData(['items'], (old) => [
      ...old,
      { id: Date.now(), ...newItem }
    ])

    return { previousItems }
  },
  onError: (_err, _newItem, context) => {
    queryClient.setQueryData(['items'], context.previousItems)
  },
  onSettled: () => {
    queryClient.invalidateQueries(['items'])
  }
})`}
          </pre>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <h3 className="text-xl font-semibold text-gray-700">
            Try it yourself
          </h3>
          <p className="text-gray-600">
            Go to the <span className="font-semibold">Optimistic Updates</span>{" "}
            page and add a product. You’ll see it appear instantly!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
