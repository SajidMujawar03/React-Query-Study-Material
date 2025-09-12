import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router'


interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const Posts = () => {
  const { data, isError, isLoading } = useQuery<Product[]>({
    queryKey: ["posts"],
    queryFn: () =>
      fetch('https://fakestoreapi.com/products').then(res => res.json())
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-700">Loading data...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Something went wrong!</p>
      </div>
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((product) => (
          <Link to={`/post/${product.id}`} key={product.id}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain p-4 bg-gray-50"
              />
              <div className="p-4">
                <h2 className="font-bold text-lg mb-2 text-gray-800">{product.title}</h2>
                <p className="text-gray-600 mb-2">${product.price}</p>
                <p className="text-gray-500 text-sm line-clamp-3">{product.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Posts
