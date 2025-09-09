import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Fetch from "./Fetch";
import ReactQuery from "./ReactQuery";

function App() {
  return (
    <>
      {/* Header */}
      <header className="bg-gray-900 text-white shadow-md">
        <nav className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold">My App</h1>
          <div className="flex space-x-6">
            <Link
              to="/"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/traditional"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Traditional Fetch
            </Link>
            <Link
              to="/react-query"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              React Query
            </Link>
          </div>
        </nav>
      </header>

      {/* Routes */}
      <main className="container mx-auto p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/traditional" element={<Fetch />} />
          <Route path="/react-query" element={<ReactQuery />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
