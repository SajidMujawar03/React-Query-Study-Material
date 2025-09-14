# Infinite Scroll with TanStack React Query + Intersection Observer

This project demonstrates how to build an **infinite scrolling product feed** in React using:

- **React Query (`useInfiniteQuery`)** for fetching and caching paginated data.
- **React Intersection Observer (`useInView`)** for automatically loading new pages when the user scrolls to the bottom.
- **Tailwind CSS** for styling.

The app fetches product data from the [EscuelaJS Fake Store API](https://api.escuelajs.co/api/v1/products) and keeps loading more data as you scroll.

---

## 🚀 Features
- Infinite data fetching with `useInfiniteQuery`.
- Auto-load next page when last item is visible (`useInView`).
- Handles **loading**, **error**, and **no more data** states.
- Responsive UI built with Tailwind.
- Strong TypeScript support for product type safety.

---

## 📦 Dependencies
- `react` – UI library
- `@tanstack/react-query` – Data fetching & caching
- `react-intersection-observer` – Detects when an element enters/exits the viewport
- `tailwindcss` – Styling framework

---

## 🔑 Key Concepts Explained

### 1. Product Type Definition
```ts
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
};
```
- Using **TypeScript** for type safety ensures that product fields are accessed correctly.
- Helps prevent runtime errors when working with fetched data.

---

### 2. `useInfiniteQuery` Setup
```ts
const {
  data,
  isFetchingNextPage,
  error,
  isError,
  isLoading,
  fetchNextPage,
  hasNextPage,
} = useInfiniteQuery({
  queryKey: ["page"],
  initialPageParam: 1,
  queryFn: async ({ pageParam }) => {
    const offset = (pageParam - 1) * itemsPerPage;
    const res = await fetch(
      `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${itemsPerPage}`
    );
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return res.json();
  },
  getNextPageParam: (lastPage, allPages) => {
    if (lastPage.length < itemsPerPage) return null; // No more pages
    return allPages.length + 1; // Next page index
  },
});
```

#### Key Options:
- **`queryKey`**: A unique identifier (`["page"]`) for caching and re-fetching.
- **`initialPageParam`**: Start pagination from page `1`.
- **`queryFn`**: Fetch function that receives `{ pageParam }` and calculates the `offset`.
- **`getNextPageParam`**:
  - If the last page has fewer items than `itemsPerPage`, stop fetching.
  - Otherwise, increment the page count.

#### Returned Values:
- **`data.pages`** → All fetched pages of products.
- **`fetchNextPage()`** → Load the next page.
- **`hasNextPage`** → Boolean flag indicating if more data is available.
- **`isFetchingNextPage`** → Loading state for next page.
- **`isLoading`** → Initial loading state.
- **`isError` / `error`** → Error state and message.

---

### 3. Intersection Observer with `useInView`
```ts
const { ref, inView } = useInView();
```
- `ref`: Attach this to the **last element** of the list.
- `inView`: Boolean that tells whether the element is visible in the viewport.

---

### 4. Auto-Fetch on Scroll
```ts
useEffect(() => {
  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }
}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
```
- Whenever the **last item** becomes visible (`inView === true`), React Query loads the next page.
- Prevents duplicate calls by checking:
  - `hasNextPage` (only if more data exists).
  - `!isFetchingNextPage` (not already loading).

---

### 5. Rendering Products
```tsx
{data?.pages.map((page, pageIndex) =>
  page.map((item: Product, index: number) => {
    const isLast =
      pageIndex === data.pages.length - 1 &&
      index === page.length - 1;

    return (
      <div
        key={item.id}
        ref={isLast ? ref : null} // Attach observer to last item
        className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
      >
        <img src={item.images?.[0]} alt={item.title} className="w-32 h-32 object-cover rounded-md mb-3" />
        <h2 className="text-lg font-semibold">{item.title}</h2>
        <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
        <span className="text-indigo-600 font-bold">${item.price}</span>
      </div>
    );
  })
)}
```
- Iterates over all `pages` and renders product cards.
- The **last product card** in the last page is assigned `ref={ref}` to trigger intersection observer.

---

### 6. Handling States
```tsx
if (isLoading) return <p>Loading...</p>;
if (isError) return <p>Error: {(error as Error).message}</p>;
```
- Shows loading or error messages.

```tsx
{isFetchingNextPage && <p>Loading more...</p>}
{!hasNextPage && <p>No data further</p>}
```
- Shows loading indicator while fetching next page.
- Displays a message when there are no more results.

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

## 🛠️ How Infinite Scroll Works
1. Start with `pageParam = 1`.
2. API fetch → `offset = (pageParam - 1) * itemsPerPage`.
3. Render products in a grid.
4. Attach **Intersection Observer** (`ref`) to the last product card.
5. When last card enters viewport → `fetchNextPage()`.
6. If last page has fewer than `itemsPerPage` → stop loading (`hasNextPage = false`).

---

## ✅ Improvements You Can Try
- **Skeleton Loading** → Show placeholders while fetching.
- **Error Retry** → Add retry button for failed requests.
- **Manual Button + Auto Load** → Combine both approaches for flexibility.
- **Prefetch Next Page** → Fetch next page early for smoother UX.

---

## 🔗 References
- [TanStack React Query Docs](https://tanstack.com/query/latest)
- [React Intersection Observer](https://www.npmjs.com/package/react-intersection-observer)
- [EscuelaJS API](https://fakeapi.platzi.com/)
- [Tailwind CSS](https://tailwindcss.com/)

---
