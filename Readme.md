# 🚀 TanStack React Query Guide

TanStack React Query (often simply **React Query**) is a powerful data-fetching and state management library for React. It helps you **fetch, cache, synchronize, and update server state** in your applications without the hassle of manually managing loading states, refetching, or caching.

-----

## 🧐 Why Use React Query?

React Query simplifies complex data-fetching challenges, offering numerous benefits:

  * It **simplifies data fetching**, eliminating the need for `useEffect` and `useState` boilerplate code.
  * It provides **built-in caching**, which reuses data across renders to improve performance.
  * It offers **automatic background refetching** to keep your data fresh.
  * It has robust **mutation support** for creating, updating, and deleting data on the server.
  * It makes **infinite queries and pagination** easy to implement.
  * The included **Devtools** enable real-time query debugging.

-----

## 📦 Installation

To get started, install the core library:

```bash
npm install @tanstack/react-query
# or
yarn add @tanstack/react-query
```

For a better developer experience, install the **Devtools** (optional but highly recommended):

```bash
npm install @tanstack/react-query-devtools
```

-----

## 🏗️ Setup

To use React Query, you need to wrap your application in a `QueryClientProvider`. This provider gives all your components access to the `QueryClient` instance, which manages the cache and state.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';

const queryClient = new QueryClient();

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

-----

## 📥 Fetching Data with `useQuery`

The **`useQuery`** hook is the heart of React Query's data fetching. It's used for **GET** operations.

```tsx
import { useQuery } from '@tanstack/react-query';

function Users() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;

  return (
    <ul>
      {data.map((user: any) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

  * The **`queryKey`** is a unique identifier used to cache and track the query.
  * The **`queryFn`** is the function that fetches your data.

-----

## ✍️ Mutations with `useMutation`

The **`useMutation`** hook is used for server-side side effects like **creating, updating, or deleting** data.

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

function AddUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser: any) =>
      fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
      }),
    onSuccess: () => {
      // Invalidate and refetch the 'users' query after a successful mutation
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return (
    <button
      onClick={() => mutation.mutate({ id: Date.now(), name: 'Tony' })}
    >
      Add User
    </button>
  );
}
```

-----

## ⏳ Query States

`useQuery` and `useMutation` expose various states to help you manage your UI:

  * `isLoading`: The query is in its initial loading state.
  * `isFetching`: The query is currently fetching data in the background (even if it has cached data).
  * `isError`: An error occurred during the fetch.
  * `isSuccess`: The data was fetched successfully.

-----

## 🔄 Invalidating Queries

After a mutation (create, update, delete), you often need to refetch data to keep your UI in sync with the server. **Invalidating a query** tells React Query that its data is stale and it should be refetched the next time it's used.

### Basic Usage (Single Key)

```tsx
queryClient.invalidateQueries({ queryKey: ['users'] });
```

This invalidates and refetches any active queries with a key that starts with `['users']`.

-----

### Multiple Keys

You can invalidate multiple queries in a few ways:

1.  **Call `invalidateQueries` multiple times:**

    ```tsx
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
    ```

2.  **Use a `predicate` for partial matching:**

    ```tsx
    queryClient.invalidateQueries({
      predicate: (query) => {
        return (
          query.queryKey[0] === 'users' ||
          query.queryKey[0] === 'posts'
        );
      },
    });
    ```

3.  **Leverage nested/composite keys:**

    You can use arrays to create more specific query keys.

    ```tsx
    // Invalidate all "users" queries (e.g., ['users'], ['users', 1])
    queryClient.invalidateQueries({ queryKey: ['users'] });

    // Invalidate only the specific "users" list where the state is "active"
    queryClient.invalidateQueries({ queryKey: ['users', 'active'] });
    ```

    ### ⚡ Pro Tips

      * Use **specific keys** (e.g., `['users', userId]`) when you only want to refetch a single item.
      * Use **broad keys** (e.g., `['users']`) to refetch all queries in a family.
      * Use a **predicate** for maximum flexibility across different query families.

-----

## 📜 Pagination & Infinite Queries

For lists of data that are too large to fetch all at once, `useInfiniteQuery` is perfect for implementing "Load More" buttons or infinite scrolling.

```tsx
import { useInfiniteQuery } from '@tanstack/react-query';

function Products() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam = 0 }) =>
      fetch(`/api/products?cursor=${pageParam}`).then(res => res.json()),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  return (
    <>
      {data?.pages.map((page, i) => (
        <div key={i}>
          {page.items.map((item: any) => (
            <p key={item.id}>{item.name}</p>
          ))}
        </div>
      ))}

      <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        {isFetchingNextPage ? 'Loading...' : 'Load More'}
      </button>
    </>
  );
}
```

-----

## ⚡ Optimistic Updates

**Optimistic updates** improve the user experience by instantly updating the UI to reflect a change *before* the server responds. This makes the app feel fast and responsive. If the server request fails, you can roll back the UI.

```tsx
const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    // 1. Cancel any outgoing refetches to avoid overwriting the optimistic update.
    await queryClient.cancelQueries({ queryKey: ['todos'] });

    // 2. Snapshot the current data.
    const previousTodos = queryClient.getQueryData(['todos']);

    // 3. Optimistically update the cache with the new data.
    queryClient.setQueryData(['todos'], (old: any) =>
      old.map((todo: any) =>
        todo.id === newTodo.id ? { ...todo, ...newTodo } : todo
      )
    );

    // 4. Return a context object with the snapshot.
    return { previousTodos };
  },
  // 5. If the mutation fails, use the context to roll back.
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(['todos'], context?.previousTodos);
  },
  // 6. On success or failure, refetch the data to ensure the UI is in sync.
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});
```

-----

## 🛠️ QueryClient Methods

The `QueryClient` instance gives you several powerful methods to interact with the cache programmatically:

  * `prefetchQuery`: Fetches data and stores it in the cache in advance.
  * `invalidateQueries`: Marks queries as stale and triggers a refetch.
  * `setQueryData`: Manually updates a query's data in the cache without a network request.
  * `getQueryData`: Retrieves a query's cached data.

-----

## 🧩 Devtools

React Query Devtools is an indispensable tool for debugging your data flow. It lets you:

  * See which queries are active, inactive, or stale.
  * Inspect the cached data for each query.
  * Manually trigger refetches and invalidations.

Simply add the component to your application:

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// ... in your JSX
<ReactQueryDevtools initialIsOpen={false} />
```

-----

## 📚 Key Concepts Summary

| Concept | Purpose |
| :--- | :--- |
| **`useQuery`** | Fetches and caches data from an API. |
| **`useMutation`** | Handles create, update, and delete operations. |
| **`queryKey`** | A unique key for identifying and caching a query. |
| **`invalidateQueries`** | A method to mark data as stale and refetch it. |
| **`useInfiniteQuery`** | A hook for implementing pagination and infinite scrolling. |
| **Optimistic Updates** | Instantly updates the UI before a server response for a better UX. |
| **Devtools** | A debugging tool for inspecting and managing queries. |

-----

Happy Querying\! 🚀