import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Page = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["page", page],
    queryFn: () => {
      const itemsPerPage = 10;
      const offset = (page - 1) * itemsPerPage;
      return fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${itemsPerPage}`
      ).then((response) => response.json());
    },
    placeholderData: keepPreviousData,
  });

  console.log(data);
  

  const prev = () => setPage((prev) => prev - 1);
  const next = () => setPage((prev) => prev + 1);

  if (isLoading) return <div className="text-center p-4">Loading...</div>;
  if (isError)
    return <div className="text-red-500 text-center p-4">Error: {error.message}</div>;

  return (
    <div className="p-6">
      {/* Horizontal scroll list */}
      <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pb-4">
        {data?.map((item: any, index: number) => (
          <div
            key={index}
            className="w-[300px] h-[450px] bg-white shadow-md rounded-lg p-4 flex-shrink-0 flex flex-col"
          >
            {/* Fixed image container */}
            <div className="w-full h-[200px] flex justify-center items-center mb-3">
              <img
                src={item.category.image}
                alt={item.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Text content */}
            <h2 className="text-lg font-bold truncate">{item.title}</h2>
            <p className="text-sm text-gray-600">{item.category.name}</p>
            <p className="text-sm text-gray-500 line-clamp-2 flex-grow">
              {item.description}
            </p>
            <p className="text-xl font-semibold mt-2">${item.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          onClick={prev}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="font-medium text-gray-700">Page {page}</span>
        <button
          onClick={next}
          disabled={data?.length < 10}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
