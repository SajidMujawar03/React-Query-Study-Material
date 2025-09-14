# React Query – Mutations with Cache Updates

This example shows how to **fetch products** and **add new products** using  
[`useQuery`](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery) and  
[`useMutation`](https://tanstack.com/query/latest/docs/framework/react/reference/useMutation) from **TanStack React Query**.

We also use [`setQueryData`](https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation#manually-updating-query-data) to **manually update the cache** after a successful mutation (optimistic-style update).

---

## 🔑 Key Concepts

1. **`useQuery`** – Fetches data (`getProducts`) and caches it under `["products"]`.
2. **`useMutation`** – Handles creating a new product (`uploadProduct`).
3. **`queryClient.setQueryData`** – Updates the cached `["products"]` list immediately, without waiting for a re-fetch.
4. **Form Handling** – Controlled form with React `useState`.

---

## ⚙️ Code Walkthrough

### 1. Fetch Products (`useQuery`)
```tsx
const {
  data: products,
  isError: isErrorGettingProducts,
  isLoading: isProductsLoading,
  error: ProductsError,
} = useQuery({
  queryKey: ["products"],
  queryFn: getProducts,
});
```

- `products` → contains the product list (from API or cache)  
- `isLoading` → shows loading state  
- `isError` / `ProductsError` → handles errors  

---

### 2. Add Product (`useMutation`)
```tsx
const { mutate: postProduct, isPending, isError, error } = useMutation({
  mutationFn: uploadProduct,
  onSuccess: (newProduct) => {
    queryClient.setQueryData(["products"], (oldData: any) => {
      return {
        ...oldData,
        data: [...(oldData?.data || []), newProduct.data],
      };
    });
  },
});
```

- `mutationFn` → `uploadProduct` API call  
- `onSuccess` → when API returns success, update cached `["products"]`  
- `setQueryData` → merges the **new product** into the existing cached list  

This avoids calling `invalidateQueries` (which would re-fetch the entire list).

---

### 3. Form Handling
```tsx
<form onSubmit={(e) => {
  e.preventDefault();
  postProduct({
    id: new Date(Date.now()).toLocaleString() + Math.random(),
    title: formData.title,
    description: formData.description,
    price: Number(formData.price),
    image: formData.image,
  });
}}>
```

- Prevents default form submission  
- Calls `postProduct()` mutation with form values  
- Assigns a temporary `id` (for demo/mock API compatibility)  

---

### 4. Product List UI
```tsx
<ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  {products?.data.map((p: any) => (
    <li key={p.id} className="bg-white rounded-xl shadow-md p-5">
      <h3 className="text-lg font-semibold">{p.title}</h3>
      <p className="text-gray-600 text-sm">{p.description}</p>
      <p className="text-blue-600 font-medium">${p.price}</p>
    </li>
  ))}
</ul>
```

- Displays products directly from React Query’s **cached data**  
- Updates instantly after a new product is added  

---

## 🔄 Flow Diagram

```
User fills form → submit → useMutation(postProduct) 
    → onSuccess → queryClient.setQueryData(["products"])
    → UI instantly shows new product without refetch
```

---

## ✅ Pros of This Approach

- **No waiting** – UI updates immediately after a mutation.
- **Reduced API calls** – No extra `refetch` required.
- **Better UX** – Feels “real-time” for the user.

---

## 🚀 Next Steps

- Add **optimistic updates** (show product instantly even before API responds).
- Add **error rollback** (remove the optimistic item if API fails).
- Validate form inputs (price must be a number, image must be a URL, etc.).

---

This pattern is great when your **API returns the created resource** and you want to update the cache directly instead of fetching everything again.
