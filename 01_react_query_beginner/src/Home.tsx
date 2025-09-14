import React, { useState } from "react";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"fetch" | "react-query">("fetch");
  const [showCode, setShowCode] = useState(false);
  const [showWrapper, setShowWrapper] = useState(false);

  const fetchCode = `
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
    }
  };
  fetchData();
}, []);
`;

  const reactQueryCode = `
import { useQuery } from '@tanstack/react-query';

const { data, error, isLoading } = useQuery({
  queryKey: ['posts'],
  queryFn: () => fetch("/api/posts").then(res => res.json()),
});
`;

  const wrapperCode = `
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import App from "./App";

// step 1: create Client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
// step 2: Use client in QueryClientProvider
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
`;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Fetching Data in React
      </h1>

      <p className="text-center text-gray-700 mb-8 max-w-2xl mx-auto">
        In React, there are different ways to fetch and manage server data.
        Below we compare the traditional <strong>useEffect + fetch</strong>{" "}
        approach with the modern <strong>TanStack React Query</strong> approach.
      </p>

      {/* Tabs */}
      <div className="flex justify-center mb-6 gap-4">
        <button
          className={`px-6 py-2 rounded-md font-semibold ${
            activeTab === "fetch"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
          onClick={() => {
            setActiveTab("fetch");
            setShowCode(false);
          }}
        >
          Traditional fetch
        </button>
        <button
          className={`px-6 py-2 rounded-md font-semibold ${
            activeTab === "react-query"
              ? "bg-blue-600 text-white"
              : "bg-white border"
          }`}
          onClick={() => {
            setActiveTab("react-query");
            setShowCode(false);
          }}
        >
          React Query
        </button>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        {activeTab === "fetch" && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">
              Traditional fetch + useEffect
            </h2>
            <p className="mb-4 text-gray-700">
              In this approach, you manually call <code>fetch</code> inside a{" "}
              <code>useEffect</code> hook, manage loading and error states, and
              update state with the response.
            </p>

            <button
              className="text-blue-600 underline mb-4"
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? "Hide Code" : "Show Code"}
            </button>

            {showCode && (
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {fetchCode}
              </pre>
            )}
          </div>
        )}

        {activeTab === "react-query" && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">TanStack React Query</h2>
            <p className="mb-4 text-gray-700">
              React Query abstracts away manual fetching and caching. It
              provides automatic caching, refetching, and state management for
              your server data.
            </p>

            <button
              className="text-blue-600 underline mb-4"
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? "Hide Code" : "Show Code"}
            </button>

            {showCode && (
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {reactQueryCode}
              </pre>
            )}

            {/* Wrapper Section */}
            <button
              className="text-green-600 underline mb-4 block"
              onClick={() => setShowWrapper(!showWrapper)}
            >
              {showWrapper ? "Hide Wrapper Setup" : "Show Wrapper Setup"}
            </button>

            {showWrapper && (
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                {wrapperCode}
              </pre>
            )}
          </div>
        )}
      </div>

      {/* Interactive Comparison */}
      <div className="mt-10 max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Traditional fetch</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Manual state management for loading/error/data</li>
              <li>Refetching must be handled manually</li>
              <li>No built-in caching</li>
              <li>Works fine for simple cases</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold mb-2">React Query</h3>
            <ul className="list-disc list-inside text-gray-700">
              <li>Automatic caching and background refetching</li>
              <li>Loading, error, and data states handled automatically</li>
              <li>Supports pagination, infinite queries, and mutations</li>
              <li>Better for complex apps with lots of server state</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
