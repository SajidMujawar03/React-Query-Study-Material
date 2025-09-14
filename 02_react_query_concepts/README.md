This React application demonstrates various features of **React Query** for managing and fetching data. It uses **React Router** to navigate between different examples, each focusing on a specific `useQuery` concept.

---

### 📚 **React Query Concepts Explained**

This project provides practical examples of the following key `useQuery` concepts:

* **`useQuery` Hook:** This is the primary hook for fetching and caching data. It manages the request, handles different states (`isLoading`, `isError`, `data`), and optimizes performance by caching fetched results.

* **`staleTime`:** This option determines how long data in the cache is considered "fresh" or not stale. By default, `staleTime` is **0**, which means data is always considered stale immediately after a successful fetch. While the data is fresh, subsequent `useQuery` calls with the same key will receive the cached data without triggering a new network request. Once the `staleTime` expires, the data is marked as stale, and the next time a component mounts or a refetch is triggered, a new fetch will occur in the background.

* **`cacheTime`:** This option controls how long inactive or unused data remains in the cache before it is garbage collected. The default `cacheTime` is **5 minutes**. When a component using `useQuery` unmounts, the data for that query is marked as inactive. If no other component uses the same query key within the `cacheTime` window, the data is removed from the cache.

* **Automatic Sharing:** React Query automatically shares data across components that use the same **query key**. This is a powerful feature that prevents redundant network requests.
    * **Automatic Sharing 1 & 2:** These routes likely demonstrate two separate components that use `useQuery` with the **same query key**. Since they are using the same key, React Query ensures that the data is fetched only once, and both components share the single cached result, improving performance and reducing server load.

* **Manual Fetching:** In some cases, you may need to trigger a query manually instead of it running automatically on component mount. This can be done by setting the `enabled` option to **`false`** and using the `refetch` function returned by the `useQuery` hook. This is useful for user-triggered actions, like clicking a "Load More" button.

* **Polling:** This is the process of repeatedly fetching data at regular intervals. You can implement polling with React Query by using the `refetchInterval` option, which will automatically refetch the data every a specified number of milliseconds. This is ideal for displaying real-time or frequently changing data.

---

### ⚙️ **Project Structure**

* `App.tsx`: Sets up the **React Router** to define different routes for each example.
* `Navbar.tsx`: Provides navigation links to each of the examples.
* `Home.tsx`: The default landing page.
* `StaleTime.tsx`: Example demonstrating the `staleTime` option.
* `CacheTime.tsx`: Example demonstrating the `cacheTime` option.
* `AutomaticSharing1.tsx` & `AutomaticSharing2.tsx`: Two components showing how data is automatically shared.
* `ManualFetching.tsx`: Example of how to trigger a fetch manually.
* `Polling.tsx`: Example showing automatic data fetching at set intervals.