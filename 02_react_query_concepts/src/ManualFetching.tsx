import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ManualFetching = () => {
  const { isLoading, isError, data:products, refetch ,isFetching} = useQuery({
    queryKey: ["manual"],
    queryFn: () =>
      fetch(`https://fakestoreapi.com/products?page=1&limit=10&category=electronics&price={"min":100,"max":1000}`).then((response) =>
        response.json()
      ),
    enabled: false, // 🚀 prevent auto-fetch
  });

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">Manual Fetching</h1>
      <p className="mb-6 text-gray-600">Fetch data only when you click!</p>

      <button
        onClick={() => refetch()}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        {"----> Fetch <-----"}

        
      </button>

      {isFetching?"fetching....":"not fetching"}

      {isLoading && <p className="mt-4 text-gray-500">Loading...</p>}
      {isError && <p className="mt-4 text-red-500">Something went wrong!</p>}

      <div className='grid grid-cols-3 gap-3'>
       { products && products.map((data : any)=>{
        return (<div className="mt-6 bg-white shadow-md rounded-lg p-6 text-center">
          <img
            src={data.image}
            alt={data.title}
            className="w-32 h-32 object-contain mx-auto mb-4"
          />
          <h2 className="text-lg font-semibold mb-2">{data.title}</h2>
          <p className="text-gray-600 mb-2">💲 {data.price}</p>
          <p className="text-gray-500 text-sm">{data.description}</p>
        </div>)
        })

      }

      </div>
    </div>
  );
};

export default ManualFetching;
