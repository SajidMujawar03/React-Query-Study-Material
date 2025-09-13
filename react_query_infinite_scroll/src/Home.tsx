import { useNavigate } from "react-router";

const Home = () => {
  const naviagate=useNavigate()
  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans flex flex-col">
      <h1 className="text-4xl font-bold text-indigo-700 mb-6 text-center">
        Understanding useInfiniteQuery
      </h1>

      <button onClick={()=>naviagate('/infinite-scroll')} className="w-[100px] h-[25px] text-white bg-blue-500 self-center  rounded-sm m-[20px]">See Demo</button>

      <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
        The <span className="font-semibold">useInfiniteQuery</span> hook from{" "}
        <code className="bg-gray-200 px-1 rounded">@tanstack/react-query</code>{" "}
        helps us fetch paginated data in chunks. Instead of loading everything
        at once, it lets us load “pages” of data and fetch more as the user
        scrolls or clicks a button.
      </p>

      {/* Step 1 */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
          Step 1: Setup Infinite Query
        </h2>
        <p className="text-gray-700 mb-4">
          Start by calling{" "}
          <code className="bg-gray-200 px-1 rounded">useInfiniteQuery</code> and
          define:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <strong>queryKey</strong> → unique identifier for the query
          </li>
          <li>
            <strong>initialPageParam</strong> → where to start (usually page 1)
          </li>
          <li>
            <strong>queryFn</strong> → function that fetches data based on page
          </li>
          <li>
            <strong>getNextPageParam</strong> → logic to decide if more pages exist
          </li>
          <li>
            <strong>lastPage</strong> → the data returned from the most recent query
            function execution (the last fetched page)
          </li>
          <li>
            <strong>allPages</strong> → an array that holds all pages of data fetched
            so far
          </li>
        </ul>

        <pre className="bg-gray-900 text-gray-100 p-4 mt-4 rounded-lg text-sm overflow-x-auto">
          {`const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ["feed"],
  initialPageParam: 1,
  queryFn: async ({ pageParam }) => {
    const itemsPerPage = 4;
    const offset = pageParam * itemsPerPage;
    return fetch(\`https://api.escuelajs.co/api/v1/products?offset=\${offset}&limit=\${itemsPerPage}\`)
      .then(res => res.json());
  },
  getNextPageParam: (lastPage, allPages) => {
    // lastPage = data returned from the most recent request
    // allPages = array of all pages fetched till now
    if (lastPage.length < 4) return null; // no more pages
    return allPages.length + 1; // next page number
  }
});`}
        </pre>
      </div>


      {/* Step 2 */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
          Step 2: Display Data
        </h2>
        <p className="text-gray-700 mb-4">
          The returned <code className="bg-gray-200 px-1 rounded">data.pages</code> is an array of
          all fetched pages. You can map through them to render your items.
        </p>

        <pre className="bg-gray-900 text-gray-100 p-4 mt-4 rounded-lg text-sm overflow-x-auto">
          {`<div>
  {data?.pages?.map((page, pageIndex) =>
    page.map(item => (
      <div key={item.id}>
        <h3>{item.title}</h3>
        <p>{item.price}</p>
      </div>
    ))
  )}
</div>`}
        </pre>
      </div>

      {/* Step 3 */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-600">
          Step 3: Load More
        </h2>
        <p className="text-gray-700 mb-4">
          Use the <code className="bg-gray-200 px-1 rounded">fetchNextPage</code> function to load
          more results when the user clicks a button (or when scrolling).
        </p>

        <pre className="bg-gray-900 text-gray-100 p-4 mt-4 rounded-lg text-sm overflow-x-auto">
          {`<button 
  onClick={() => fetchNextPage()} 
  disabled={!hasNextPage}
>
  {hasNextPage ? "Load More" : "No More Products"}
</button>`}
        </pre>
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-700">
          That’s it! With <span className="font-semibold">useInfiniteQuery</span>, you can build
          infinite scrolling feeds, “Load More” buttons, and lazy-loaded lists
          efficiently.
        </p>
      </div>
    </div>
  );
};

export default Home;
