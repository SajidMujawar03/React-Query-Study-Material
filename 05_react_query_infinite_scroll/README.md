# Infinite Scroll with TanStack React Query

This project demonstrates how to build an **Infinite Scroll Product Feed** using  
**React**, **Tailwind CSS**, and **TanStack React Query (`useInfiniteQuery`)**.  

We fetch paginated products from the [EscuelaJS Fake API](https://api.escuelajs.co/api/v1/products),  
load them in chunks, and provide a **Load More** button to fetch the next page.

---

## 🚀 Features
- Fetch products page by page from a public API.
- Implement infinite queries with **`useInfiniteQuery`**.
- Automatically determine when to stop fetching more pages.
- Modern, responsive UI built with **Tailwind CSS**.
- Handles loading states and disabled states gracefully.

---

## 📦 Dependencies
- **React** – UI library
- **@tanstack/react-query** – Data fetching & caching
- **Tailwind CSS** – Styling
- **EscuelaJS API** – Fake products data

---

## 🔑 Key Concepts

### 1. `useInfiniteQuery`
`useInfiniteQuery` is a special hook in React Query designed for **paginated data fetching**.  
It manages multiple pages of data and provides utilities like:

- `fetchNextPage()` → Fetch the next page of data.
- `hasNextPage` → Boolean flag to check if more data is available.
- `isFetchingNextPage` → Loading state for the next page.
- `data.pages` → An array of all fetched pages.

---

### 2. `queryKey`
```ts
queryKey: ["feed"]
```
- Acts like a **cache identifier**.
- All requests with the same key share the same cached data.

---

### 3. `initialPageParam`
```ts
initialPageParam: 1
```
- Defines the **starting page**.
- React Query passes this as the first `pageParam` to `queryFn`.

---

### 4. `queryFn`
```ts
queryFn: async ({ pageParam }) => {
  const offset = pageParam * itemsPerPage;
  return fetch(
    `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${itemsPerPage}`
  ).then((res) => res.json());
},
```
- Runs whenever a new page is fetched.
- Uses `pageParam` to determine the offset.
- Fetches `itemsPerPage` products from the API.

---

### 5. `getNextPageParam`
```ts
getNextPageParam: (_lastPage, allPages) => {
  if (_lastPage.length < itemsPerPage) return null;
  return allPages.length + 1;
},
```
- Tells React Query **what the next `pageParam` should be**.
- If the last page has fewer items than `itemsPerPage`, it means there are **no more products** → return `null`.
- Otherwise, increment the page count by returning `allPages.length + 1`.

---

### 6. Rendering Data
```tsx
{data?.pages?.map((page, pageIndex) =>
  page.map((item: any) => (
    <div key={`${pageIndex}-${item.id}`}> ... </div>
  ))
)}
```
- `data.pages` is an array of all loaded pages.
- Each `page` itself is an array of products.
- We flatten them into a grid of product cards.

---

### 7. Load More Button
```tsx
<button
  onClick={() => fetchNextPage()}
  disabled={!hasNextPage || isFetchingNextPage}
>
  {isFetchingNextPage
    ? "Loading..."
    : hasNextPage
    ? "Load More"
    : "No More Products"}
</button>
```
- Calls `fetchNextPage()` when clicked.
- Disabled when:
  - `isFetchingNextPage` is `true` (loading)
  - or `hasNextPage` is `false` (no more data).
- Button label updates dynamically.

---

## 🖥️ UI & Styling
- Uses **Tailwind CSS** for styling.
- Responsive grid layout (`grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`).
- Product cards with:
  - Image
  - Title
  - Description
  - Price
- Button with different styles for loading/disabled/active states.

---

## 📂 File Structure
```
src/
 ├─ components/
 │   └─ InfiniteScroll.tsx   # Infinite scroll component
 ├─ App.tsx                  # Entry point
 ├─ main.tsx                 # React DOM setup
```

---

## 🛠️ How Pagination Works Here
1. Start with `pageParam = 1`.
2. API call → `offset = pageParam * itemsPerPage`.
3. Fetch 4 products (`itemsPerPage` = 4).
4. If API returns fewer than 4 products → stop (`hasNextPage = false`).
5. Otherwise, increment page count (`allPages.length + 1`).
6. Repeat when "Load More" is clicked.

---

## ✅ Improvements You Can Try
- **Infinite Scroll on Scroll** → Load more when the user scrolls near the bottom.
- **Skeleton Loading** → Show placeholders while fetching.
- **Error Handling** → Display retry option if API call fails.
- **Dynamic Page Size** → Allow user to select items per page.

---

## 📸 Demo Screenshot
_(Optional – Add a screenshot of your UI here)_

---

## 🔗 References
- [TanStack React Query Docs](https://tanstack.com/query/latest)
- [EscuelaJS API](https://fakeapi.platzi.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---
