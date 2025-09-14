import React from "react";

const Home = () => {
  const concepts = [
    {
      title: "Stale Time",
      description:
        "Defines how long fetched data is considered 'fresh'. During this time, React Query won't automatically refetch. Once the staleTime expires, the data becomes 'stale' and will be refetched on triggers like window refocus or remount.",
    },
    {
      title: "Cache Time",
      description:
        "Determines how long unused or inactive data stays in memory before being garbage collected. If a query becomes inactive and is not used within cacheTime, React Query removes it from the cache.",
    },
    {
      title: "Automatic Sharing",
      description:
        "If multiple components use the same query key, React Query shares the result automatically. It prevents duplicate requests and keeps all consumers in sync.",
    },
    {
      title: "Manual Fetching",
      description:
        "Instead of fetching data automatically, you can disable auto-fetch and call refetch() manually, for example when a button is clicked.",
    },
    {
      title: "Polling",
      description:
        "A technique where React Query keeps refetching data at a set interval (e.g., every 1 second). Useful for real-time or live-updating data.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-4xl font-bold text-center mb-6">
        React Query Concepts
      </h1>
      <p className="text-center text-gray-700 max-w-2xl mx-auto mb-10">
        This project demonstrates important concepts of{" "}
        <span className="font-semibold">TanStack React Query</span>. Explore
        each term below to understand how data fetching, caching, and
        synchronization work in modern React apps.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {concepts.map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-semibold text-blue-600 mb-3">
              {item.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
