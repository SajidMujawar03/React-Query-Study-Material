import React from 'react';

const Home = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">
        Infinite Scroll Example
      </h1>

      <p className="text-gray-700 mb-4">
        Infinite scrolling is a technique where new data automatically loads
        as the user scrolls near the bottom of the page, instead of having
        to click a <span className="font-semibold">"Load More"</span> button.
      </p>

      <h2 className="text-xl font-semibold text-indigo-500 mb-3">
        How it works in this app:
      </h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
        <li>
          Data is fetched in <span className="font-medium">pages</span> (e.g.,
          4 items at a time).
        </li>
        <li>
          We use <code className="bg-gray-200 px-1 rounded">useInfiniteQuery</code> from{' '}
          <span className="font-medium">React Query</span> to manage fetching and caching.
        </li>
        <li>
          The <code className="bg-gray-200 px-1 rounded">useInView</code>{' '}
          hook from <span className="font-medium">react-intersection-observer</span>{' '}
          detects when the last item is visible on screen.
        </li>
        <li>
          When the last item comes into view,{' '}
          <span className="font-medium">fetchNextPage()</span> is called to load more data.
        </li>
        <li>
          While loading more items, you’ll see a{' '}
          <span className="italic">“Loading more...”</span> message at the bottom.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-indigo-500 mb-3">
        Benefits of Infinite Scroll
      </h2>
      <p className="text-gray-700 mb-4">
        - Keeps users engaged without extra clicks. <br />
        - Smooth browsing experience for large datasets. <br />
        - Commonly used in feeds like{' '}
        <span className="font-medium">Instagram, Twitter, and Facebook</span>.
      </p>

      <div className="mt-8 p-4 border rounded-lg bg-gray-50">
        <p className="text-gray-800">
          Scroll down in the <span className="font-semibold">Products Page</span> to
          see infinite scrolling in action!
        </p>
      </div>
    </div>
  );
};

export default Home;
