import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const StaleTime = () => {
  const STALE_LIMIT = 1000; // 1 second
  const [time, setTime] = useState(STALE_LIMIT / 1000); // in seconds

  const { data: products, isLoading, isError, isStale } = useQuery<any>({
    queryKey: ["staletime"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/products").then((response) =>
        response.json()
      ),
    staleTime: STALE_LIMIT,
  });

  useEffect(() => {
    // reset timer whenever query becomes fresh
    setTime(STALE_LIMIT / 1000);

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval); // stop at 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, [isStale]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-2xl font-semibold text-gray-600 animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl font-semibold text-red-600">
          Something went wrong!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-center mb-4 text-sm font-medium text-gray-500">
        <p>⏳ Time until stale: {time}s</p>
        {isStale ? "⚠️ Data is stale" : "✅ Data is fresh"}
      </h2>
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        Product Listings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product: any, index: any) => (
          <div
            key={index}
            className="border rounded-2xl shadow-md p-6 flex flex-col items-center 
                       bg-white hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-36 h-36 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold mb-2 text-center line-clamp-2 text-gray-800">
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

export default StaleTime;
