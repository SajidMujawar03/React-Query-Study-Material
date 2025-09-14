# TanStack React Query Guide

TanStack React Query (often just called **React Query**) is a powerful data-fetching and server-state management library for React.  
It helps you **fetch, cache, synchronize, and update server data** efficiently, without writing repetitive boilerplate.

This guide covers the **core concepts** of React Query and demonstrates how they apply in real-world use cases like the `OptimisticUpdates` component in this repo.

---

## 🚀 Why React Query?

Traditionally, developers use `useEffect` + `useState` to fetch and manage data.  
But this approach has limitations:
- Repeated boilerplate (`loading`, `error`, `data` states)
- Manual caching and refetching logic
- UI not staying in sync with server data

React Query solves these problems by:
- Automatically managing **cache** for server state
- Providing declarative **hooks** for fetching and mutating data
- Handling **stale data, retries, background updates**
- Making **optimistic updates** simple

---

## ⚡ Core Concepts

### 1. Queries (`useQuery`)
A **query** is a request for data that React Query tracks, caches, and keeps in sync.

```tsx
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/products.service";

const { data, isLoading, isError, error } = useQuery({
  queryKey: ["products"], // unique key for cache
  queryFn: getProducts,   // function to fetch data
});
```

- **`queryKey`**: Unique identifier for the query (e.g., `["products"]`).  
- **`queryFn`**: Async function to fetch data.  
- React Query automatically caches and reuses results across components.

**States returned:**
- `isLoading`: Request is in progress
- `isError`: Request failed
- `error`: Error object
- `data`: Cached or fetched data

---

### 2. Mutations (`useMutation`)
Mutations are used for **creating, updating, or deleting** data (POST/PUT/DELETE).

```tsx
import { useMutation } from "@tanstack/react-query";
import { uploadProduct } from "@/services/products.service";

const { mutate, isPending, isError, error } = useMutation({
  mutationFn: (newProduct) => uploadProduct(newProduct),
});
```

- Mutations don’t automatically update the cache — you have to tell React Query what to do (via `invalidateQueries`, `setQueryData`, or **optimistic updates**).

---

### 3. Cache Invalidation
After a mutation, data in cache may be **stale**.  
We can ask React Query to refetch queries:

```tsx
const client = useQueryClient();

onSettled: () => {
  client.invalidateQueries({ queryKey: ["products"] });
}
```

This ensures UI stays consistent with server.

---

### 4. Optimistic Updates
Optimistic updates make the UI feel **instant** by updating cache **before** the server confirms.  
If the server fails, React Query rolls back.

```tsx
onMutate: async (newProduct) => {
  await client.cancelQueries({ queryKey: ["products"] });
  const oldData = client.getQueryData(["products"]);

  client.setQueryData(["products"], (oldQueryData) => ({
    ...oldQueryData,
    data: [
      ...(oldQueryData?.data || []),
      { ...newProduct, id: "temp-" + Date.now() }, // temporary ID
    ],
  }));

  return { oldData }; // rollback context
},
onError: (_error, _variables, context) => {
  client.setQueryData(["products"], context?.oldData);
},
```

**Flow:**
1. Temporarily add new product to UI.
2. If mutation succeeds → keep data, optionally replace temp ID with real ID.
3. If mutation fails → rollback to previous cache.

---

### 5. QueryClient
The `QueryClient` is React Query’s **brain** that manages all queries and mutations.

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

<QueryClientProvider client={client}>
  <App />
</QueryClientProvider>
```

You can use it inside hooks:

```tsx
const client = useQueryClient();
```

---

### 6. Query States & Refetching
React Query considers data as **stale** by default.  
This means:
- It refetches automatically on **window focus**.
- You can manually refetch with `refetch()` or `invalidateQueries`.

You can customize this with options:
```tsx
useQuery({
  queryKey: ["products"],
  queryFn: getProducts,
  staleTime: 1000 * 60, // data stays fresh for 1 min
  refetchOnWindowFocus: false, // disable auto refetch on focus
});
```

---

### 7. Error Handling
Errors can occur both in queries and mutations.

```tsx
if (isError) return <p>Error: {error.message}</p>;
```

For mutations:
```tsx
{isError && <p>Error: {uploadError.message}</p>}
```

React Query also supports global error handling via `QueryCache` config.

---

### 8. DevTools
React Query has a built-in **DevTools panel** to visualize cache and states.

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

<QueryClientProvider client={client}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

---

## 🛠 Example: Optimistic Product Upload

Here’s how it all comes together in the `OptimisticUpdates` component:

1. **Fetching Products**
   ```tsx
   const { data } = useQuery({ queryKey: ["products"], queryFn: getProducts });
   ```

2. **Uploading Products with Optimistic Updates**
   ```tsx
   const { mutate } = useMutation({
     mutationFn: (product) => uploadProduct(product),
     onMutate: async (newProduct) => {
       await client.cancelQueries({ queryKey: ["products"] });
       const oldData = client.getQueryData(["products"]);

       client.setQueryData(["products"], (oldQueryData) => ({
         ...oldQueryData,
         data: [...(oldQueryData?.data || []), { ...newProduct, id: "temp-" + Date.now() }],
       }));

       return { oldData };
     },
     onError: (_error, _variables, context) => {
       client.setQueryData(["products"], context?.oldData);
     },
     onSettled: () => {
       client.invalidateQueries({ queryKey: ["products"] });
     },
   });
   ```

3. **UI Updates Instantly → Rolls Back on Failure → Syncs on Success**

---

## 📌 Key Takeaways

- **`useQuery`**: Fetch + cache + sync server data  
- **`useMutation`**: Perform writes (POST/PUT/DELETE)  
- **Optimistic Updates**: Make UI instant, rollback on failure  
- **QueryClient**: Manages cache, mutations, invalidations  
- **Cache Invalidation**: Keep UI in sync after changes  
- **DevTools**: Debug and inspect query cache in real-time  

---

## 📚 Further Reading

- [Official Docs](https://tanstack.com/query/latest)  
- [React Query GitHub](https://github.com/TanStack/query)  
- [Best Practices](https://tkdodo.eu/blog/practical-react-query)  

---

Happy querying! 🎉
