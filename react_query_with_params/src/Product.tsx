import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router'

interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
}

const Post = () => {
  const { id } = useParams<{ id: string }>()

  const { data, isError, isLoading } = useQuery<Product>({
    queryKey: ["post", id],
    queryFn: () =>
      fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json()),
    enabled: !!id // prevents query running if id is undefined
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
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-8">
      {data && (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md w-full">
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-64 object-contain p-4 bg-gray-50"
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2 text-gray-800">{data.title}</h1>
            <p className="text-xl text-gray-700 mb-4">${data.price}</p>
            <p className="text-gray-600">{data.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Post
