Here’s a **complete `README.md` draft** that explains TanStack React Query in a structured, beginner-to-advanced way. You can drop this directly into your repo.

---

````markdown
# TanStack React Query Guide

TanStack React Query (often just called **React Query**) is a powerful data-fetching and state management library for React.  
It helps you **fetch, cache, synchronize, and update server state** in your applications without the hassle of manually managing loading states, refetching, or caching.

---

## 🚀 Why React Query?
- **Simplifies data fetching** (no need for `useEffect` + `useState` boilerplate).
- **Built-in caching** so data is reused between renders.
- **Automatic background refetching** keeps data fresh.
- **Mutation support** for creating/updating/deleting data.
- **Infinite queries & pagination** with ease.
- **Devtools** for debugging queries in real-time.

---

## 📦 Installation

```bash
npm install @tanstack/react-query
# or
yarn add @tanstack/react-query
````

For Devtools (optional but recommended):

```bash
npm install @tanstack/react-query-devtools
```

---

## 🏗️ Setup

Wrap your app in a `QueryClientProvider`:

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

---

## 📥 Fetching Data (`useQuery`)

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

* **`queryKey`**: unique key to cache & identify the query.
* **`queryFn`**: function that fetches the data.

---

## ✍️ Mutations (`useMutation`)

Used for **create, update, delete** operations.

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
      // Invalidate and refetch
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

---

## ⏳ Query States

* `isLoading` → First load
* `isFetching` → Background refetch
* `isError` → Error occurred
* `isSuccess` → Data fetched successfully

---

Got it — you’d like me to extend the README with a **detailed explanation of `invalidateQueries` when handling multiple keys**. Here’s the improved section you can plug into your existing `README.md`:

---

````markdown
## 🔄 Invalidate Queries

After mutations (create, update, delete), you usually want to refetch some data so that your UI stays in sync with the server.

### Basic usage (single key)

```tsx
queryClient.invalidateQueries({ queryKey: ['users'] });
````

This refetches all queries whose key starts with `['users']`.

---

### Multiple Keys

Sometimes you may want to invalidate **different queries** after a mutation. There are two common ways:

#### 1. Call `invalidateQueries` multiple times

```tsx
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['users'] });
  queryClient.invalidateQueries({ queryKey: ['posts'] });
}
```

This ensures that both `users` and `posts` queries are refetched.

---

#### 2. Use **partial matching** with `predicate`

`invalidateQueries` accepts a `predicate` function that gives you fine-grained control:

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

This way, you can invalidate multiple query families in one call.

---

#### 3. Nested / composite keys

If your keys are nested, you can target them more specifically:

```tsx
// Invalidate all "users" queries
queryClient.invalidateQueries({ queryKey: ['users'] });

// Invalidate only "users", "active" queries
queryClient.invalidateQueries({ queryKey: ['users', 'active'] });
```

---

### ⚡ Pro Tips

* Use **specific keys** (e.g., `['users', userId]`) when you want to refetch only a subset of data.
* Use **broad keys** (e.g., `['users']`) to refetch all queries under that family.
* Use **predicate** if you need maximum flexibility across multiple query families.


---

## 📜 Pagination & Infinite Queries

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

---

## ⚡ Optimistic Updates

Instantly update UI before the server responds:

```tsx
const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    await queryClient.cancelQueries({ queryKey: ['todos'] });

    const previousTodos = queryClient.getQueryData(['todos']);
    queryClient.setQueryData(['todos'], (old: any) =>
      old.map((todo: any) =>
        todo.id === newTodo.id ? { ...todo, ...newTodo } : todo
      )
    );

    return { previousTodos };
  },
  onError: (err, newTodo, context) => {
    queryClient.setQueryData(['todos'], context?.previousTodos);
  },
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});
```

---

## 🛠️ QueryClient Methods

* `prefetchQuery` → Fetch data in advance
* `invalidateQueries` → Refetch data
* `setQueryData` → Manually update cache
* `getQueryData` → Get cached data

---

## 🧩 DevTools

React Query Devtools lets you:

* See active queries
* Inspect cache state
* Trigger refetch/invalidate manually

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
```

---

## 📚 Key Concepts Summary

| Concept             | Purpose                                    |
| ------------------- | ------------------------------------------ |
| `useQuery`          | Fetch & cache data                         |
| `useMutation`       | Create, update, delete data                |
| `queryKey`          | Unique identifier for caching              |
| `invalidateQueries` | Refetch data when stale/changed            |
| `useInfiniteQuery`  | Pagination & infinite scrolling            |
| Optimistic Updates  | Update UI instantly before server responds |
| Devtools            | Debug queries in real-time                 |

---

## 🔗 Resources

* [Official Docs](https://tanstack.com/query/latest)
* [GitHub Repo](https://github.com/TanStack/query)

---

Happy Querying 🚀

```


