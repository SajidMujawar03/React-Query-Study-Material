import { Route, Routes, Link } from "react-router";
import InfiniteScroll from "./InfiniteScroll";
import Home from "./Home";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Navigation Bar */}
      <nav className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">My React App</h1>
          <div className="space-x-4">
            <Link
              to="/"
              className="hover:bg-indigo-700 px-3 py-2 rounded-md transition"
            >
              Home
            </Link>
            <Link
              to="/infinite-scroll"
              className="hover:bg-indigo-700 px-3 py-2 rounded-md transition"
            >
              Infinite Scroll
            </Link>
          </div>
        </div>
      </nav>

      {/* ✅ Page Content */}
      <main className="max-w-6xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/infinite-scroll" element={<InfiniteScroll />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
