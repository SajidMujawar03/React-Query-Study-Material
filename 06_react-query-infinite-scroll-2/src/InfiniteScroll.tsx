import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

// ✅ Type for better safety
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
};

const InfiniteScroll = () => {
  const itemsPerPage = 4;
  const { ref, inView } = useInView();

  const {
    data,
    isFetchingNextPage,
    error,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["page"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const offset = (pageParam - 1) * itemsPerPage;
      const res = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${itemsPerPage}`
      );
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      return res.json();
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < itemsPerPage) return null;
      return allPages.length + 1;
    },
  });

  // ✅ Trigger next page load when last item is in view
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading)
    return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  if (isError)
    return (
      <div className="flex flex-col items-center justify-center mt-10">
        <p className="text-red-500 font-semibold mb-2">
          Error: {(error as Error).message}
        </p>
        <button
          onClick={() => fetchNextPage()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Infinite Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {data?.pages.map((page, pageIndex) =>
          page.map((item: Product, index: number) => {
            const isLast =
              pageIndex === data.pages.length - 1 &&
              index === page.length - 1;

            return (
              <div
                key={item.id}
                ref={isLast ? ref : null}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow"
              >
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-32 h-32 object-cover rounded-md mb-3"
                />
                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {item.description}
                </p>
                <span className="text-indigo-600 font-bold">
                  ${item.price}
                </span>
              </div>
            );
          })
        )}
      </div>

      {isFetchingNextPage && (
        <p className="text-center mt-6 text-gray-500 w-full">Loading more...</p>
      )}
      {
        !hasNextPage&&(
            <p className="text-center mt-6 text-gray-500 w-full">No data further</p>
        )
      }
    </div>
  );
};

export default InfiniteScroll;
