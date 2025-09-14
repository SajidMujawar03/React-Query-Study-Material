import { useQuery } from '@tanstack/react-query'
import React from 'react'

const Polling = () => {
  const { isLoading, isError, isFetching, data } = useQuery({
    queryKey: ["polling"],
    queryFn: () =>
      fetch("https://api.escuelajs.co/api/v1/products").then((response) =>
        response.json()
      ),
    refetchInterval: 1000, // 🔄 Poll every 1s
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
           {isFetching && (
        <p className="text-sm text-blue-500 mt-4">Fetching new data...</p>
      )}
      <h1 className="text-2xl font-bold mb-4">Polling Example</h1>
      <p className="mb-4 text-gray-600">Refetching every 1 second...</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((dt: any) => (
          <div
            key={dt.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={dt.images?.[0]}
              alt={dt.title}
              className="w-32 h-32 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold">{dt.title}</h2>
            <p className="text-gray-600">Slug: {dt.slug}</p>
            <p className="text-gray-500">
              Category: {dt.category?.name}
            </p>
          </div>
        ))}
      </div>

   
    </div>
  );
};

export default Polling;
