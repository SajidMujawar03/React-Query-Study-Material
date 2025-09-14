import { useQuery } from "@tanstack/react-query";
import React from "react";

const CacheTime = () => {
  const { isLoading, isError, data } = useQuery<any>({
    queryKey: ["gcTime"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((response) =>
        response.json()
      ),
    gcTime: 1000, // cache persists for 1s before being garbage-collected
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl font-semibold text-red-500">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Cache Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-center">
        <p className="text-blue-700 font-medium">
          🔒 Data is cached for <span className="font-bold">1000 ms (1s)</span>{" "}
          after which it gets removed from memory.
        </p>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        Products
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map((product: any, index: number) => (
          <div
            key={index}
            className="bg-white border rounded-2xl shadow-md p-6 flex flex-col items-center 
                       hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-36 h-36 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold mb-2 text-center text-gray-800 line-clamp-2">
              {product.title}
            </h2>
            <p className="text-gray-500 text-sm mb-3 text-center italic">
              {product.category}
            </p>
            <p className="text-gray-600 text-sm text-center leading-relaxed">
              {product.description.length > 100
                ? product.description.slice(0, 100) + "..."
                : product.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CacheTime;
