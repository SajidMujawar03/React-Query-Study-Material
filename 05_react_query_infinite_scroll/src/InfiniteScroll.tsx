import { useInfiniteQuery } from "@tanstack/react-query";

const InfiniteScroll = () => {
  const itemsPerPage = 4;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["feed"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const offset = pageParam * itemsPerPage;
      return fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${itemsPerPage}`
      ).then((res) => res.json());
    },
    getNextPageParam: (_lastPage, allPages) => {
      if (_lastPage.length < itemsPerPage) return null;
      return allPages.length + 1;
    },
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Product Feed
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.pages?.map((page, pageIndex) =>
          page.map((item: any) => (
            <div
              key={`${pageIndex}-${item.id}`}
              className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition"
            >
              <img
                src={item.images?.[0]}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg text-gray-800 truncate">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {item.description}
                </p>
                <p className="text-indigo-600 font-bold text-lg">
                  ${item.price}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className={`px-6 py-2 rounded-lg font-medium transition 
            ${
              !hasNextPage
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
        >
          {isFetchingNextPage
            ? "Loading..."
            : hasNextPage
            ? "Load More"
            : "No More Products"}
        </button>
      </div>
    </div>
  );
};

export default InfiniteScroll;
