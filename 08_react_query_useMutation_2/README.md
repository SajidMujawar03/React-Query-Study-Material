# React Query – useMutation + useQuery Example

This example demonstrates how to use **TanStack React Query**’s  
- `useQuery` → to fetch a list of products  
- `useMutation` → to upload a new product  
- `useQueryClient.invalidateQueries` → to refresh queries after mutation  

It also includes a simple **form** for creating products and displaying them in a grid.

---

## 📦 Features
- Fetch products from an API with `useQuery`
- Upload new products with `useMutation`
- Automatic query invalidation (refresh products after upload)
- Loading and error states
- Minimal form handling using React `useState`
- TypeScript support for safer data handling

---

## 🚀 Code Walkthrough

### 1. Product Type
We define a `Product` type for TypeScript safety.
```ts
type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
};
```

### 2. State Management (Form)
We use `useState` for form input:
```tsx
const [form, setForm] = useState({
  title: "",
  description: "",
  image: "",
});
```

### 3. Fetching Products (`useQuery`)
We fetch all products using `useQuery`:
```tsx
const { data, isLoading, isError, error } = useQuery<Product[]>({
  queryKey: ["products"],   // cache key
  queryFn: getProducts,     // API call function
});
```
- `data` → contains the products  
- `isLoading` → true while fetching  
- `isError` → true if request fails  

### 4. Uploading Products (`useMutation`)
We handle product uploads with `useMutation`:
```tsx
const { mutate: uploadMutate, isPending, isError: isNotPostedProduct, error: postProductError } =
  useMutation({
    mutationFn: (newProduct: Omit<Product, "id">) => uploadProduct(newProduct),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] }); // refresh products
      setForm({ title: "", description: "", image: "" }); // reset form
    },
  });
```
- `mutationFn` → function to send new product to API  
- `onSuccess` → automatically re-fetches products after upload  
- `invalidateQueries` → tells React Query that cached `["products"]` data is stale  

### 5. Form Handling
```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = () => {
  uploadMutate(form); // call mutation
};
```

### 6. Rendering the UI
#### Product Upload Form
```tsx
<div className="bg-white p-4 shadow rounded space-y-4">
  <h2 className="text-lg font-semibold">Upload Product</h2>
  <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
  <input name="description" value={form.description} onChange={handleChange} placeholder="Description" />
  <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
  <button onClick={handleSubmit} disabled={isPending}>
    {isPending ? "Uploading..." : "Upload"}
  </button>
  {isNotPostedProduct && <p>Error: {String(postProductError)}</p>}
</div>
```

#### Product List
```tsx
<div className="grid gap-4">
  {data?.map((product) => (
    <div key={product.id} className="p-4 border rounded shadow bg-white">
      <img src={product.image} alt={product.title} className="w-32 h-32 object-cover mb-2" />
      <p className="font-semibold">{product.title}</p>
      <p className="text-gray-600">{product.description}</p>
    </div>
  ))}
</div>
```

---

## 🔄 React Query Flow
1. `useQuery` → Fetch and cache products  
2. User submits form → `useMutation` triggers  
3. On success → `invalidateQueries(["products"])` tells React Query to **re-fetch products**  
4. UI updates automatically with new product  

---

## 🛠️ Example API Service (`services/product.service.ts`)
```ts
export const getProducts = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const uploadProduct = async (product: Omit<Product, "id">) => {
  const res = await fetch("https://fakestoreapi.com/products", {
    method: "POST",
    body: JSON.stringify(product),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to upload product");
  return res.json();
};
```

---

## 📚 Key Concepts Recap
- **`useQuery`** → fetches and caches server data  
- **`useMutation`** → handles create/update/delete operations  
- **`useQueryClient.invalidateQueries`** → keeps UI in sync by refreshing cache after mutations  
- **Optimistic UI (Optional)** → can be added for instant UI updates before server response  

---

## ✅ Next Steps
- Add **optimistic updates** for instant product list update  
- Add **form validation**  
- Handle **server errors more gracefully**  

---

This example shows how **React Query simplifies fetching, caching, and updating server state** with minimal boilerplate compared to traditional React data fetching.

