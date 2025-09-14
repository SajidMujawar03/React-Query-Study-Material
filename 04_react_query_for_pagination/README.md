This is a React component that demonstrates **client-side pagination** using **React Query**. It fetches product data from a public API, displaying it in a horizontally scrollable list with "Previous" and "Next" buttons to navigate between pages.

---

### 📚 **Core Concepts**

This project illustrates a key feature of React Query called `keepPreviousData`, which is crucial for creating a smooth user experience during pagination.

* **`queryKey` with Dynamic Value**: The `queryKey` is an array that uniquely identifies the data being fetched. Here, it includes the `page` number (`["page", page]`). This tells React Query to treat each page as a separate, cacheable piece of data. For example, `["page", 1]` is a different query from `["page", 2]`. When the `page` state changes, React Query knows it needs to fetch new data because the query key has changed.

* **`keepPreviousData`**: This is a powerful optimization feature for pagination. When the `page` state changes and a new query is initiated, React Query, by default, would show a loading state while waiting for the new data. This can cause a jarring flash of a loading spinner or an empty screen.  By setting `placeholderData: keepPreviousData`, you instruct React Query to **continue displaying the previously fetched data** (`data` from `page - 1`) until the new data for the current page is successfully fetched. This provides a much smoother, more seamless transition for the user.

* **`fetch` with Offset and Limit**: The `queryFn` uses the `offset` and `limit` URL parameters to request a specific slice of data from the API. The `itemsPerPage` constant sets the `limit` to 10, and the `offset` is calculated based on the current `page` number. This is how the component requests the correct set of items for the currently selected page.

* **State Management**: A local state variable, `page`, is used to keep track of the current page number. Clicking the "Next" or "Prev" buttons updates this state, which in turn triggers a new `useQuery` fetch due to the change in the `queryKey`.

---

### 💡 **How It Works**

1.  When the component first loads, it fetches data for `page: 1`. The `queryKey` is `["page", 1]`.
2.  The "Next" button click increments the `page` state to `2`.
3.  Because the `queryKey` changes from `["page", 1]` to `["page", 2]`, React Query starts fetching the new data.
4.  **Crucially**, thanks to `placeholderData: keepPreviousData`, the UI **continues to show the data from `page 1`** while the request for `page 2` is in flight.
5.  Once the new data for `page 2` arrives, the UI instantly updates with the new content, and the previous data is no longer displayed.
6.  This process is repeated as the user navigates through the pages, providing a fast and flicker-free user experience.