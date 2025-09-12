import { Link } from 'react-router'

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-8 space-y-8">
      
      {/* Header */}
      <h1 className="text-4xl font-bold text-gray-800 animate-pulse">
        Welcome to React Query Demo!
      </h1>

      {/* Explanation Section */}
      <div className="max-w-2xl bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">How useQuery works:</h2>
        <p className="text-gray-600 leading-relaxed">
          React Query's <span className="font-bold text-blue-600">useQuery</span> is a powerful hook
          to fetch and cache data. Each post you want to display can be fetched dynamically using
          its <span className="font-bold text-blue-600">id</span>.  
        </p>
        <p className="text-gray-600 mt-3 leading-relaxed">
          For example, if you visit a URL like <span className="font-mono text-gray-800">/post/1</span>,
          React Query will fetch that specific post using its <span className="font-bold">id</span>
          and automatically manage loading, errors, and caching for you.
        </p>
      </div>

      {/* Example Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
        {[1, 2, 3, 4, 5].map((postId) => (
          <Link
            to={`/post/${postId}`}
            key={postId}
            className="bg-white p-4 rounded-lg shadow-md hover:scale-105 transform transition duration-300 hover:bg-blue-50 flex flex-col items-center justify-center"
          >
            <div className="text-gray-700 font-semibold text-lg">Post {postId}</div>
            <div className="text-gray-500 text-sm mt-1">Click to see details</div>
          </Link>
        ))}
      </div>

      {/* Footer Animation */}
      <div className="mt-12 animate-bounce text-gray-500 text-sm">
        Try clicking any post to see <span className="font-bold text-blue-600">useQuery in action!</span>
      </div>
    </div>
  )
}

export default Home
