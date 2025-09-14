# React Query Example – Fetching & Mutating Posts

This project demonstrates how to use **TanStack React Query** for:

- Fetching posts from a backend (`useQuery`).
- Creating new posts (`useMutation`).
- Handling **loading**, **error**, and **success** states.
- Building a responsive UI with **Tailwind CSS**.

---

## 🚀 Features
- **Fetch posts** using `useQuery`.
- **Create posts** with `useMutation`.
- **Optimistic UI** for form handling.
- **Error handling** with proper messages.
- Clean **card-based layout** for displaying posts.
- **Refetch** button to reload data.

---

## 📦 Dependencies
- `react` – UI framework.
- `@tanstack/react-query` – Data fetching, caching, and mutations.
- `tailwindcss` – Styling.

---

## 🔑 Key Concepts

### 1. Post Type
```ts
export type PostType = {
  id: number;
  title: string;
  postDetails: string;
  createdAt: Date;
  updatedAt: Date;
};
```
- Ensures **type safety** when creating or displaying posts.
- Avoids accessing invalid fields from API responses.

---

### 2. Fetching Posts with `useQuery`
```ts
const {
  data,
  isLoading: isGettingPosts,
  isError: isErrorGettingPosts,
  error: gettingPostsError,
  refetch,
} = useQuery<PostType[], any>({
  queryKey: ["posts"],
  queryFn: async () => (await getPosts()).data,
});
```

#### Key Points:
- **`queryKey: ["posts"]`** → Uniquely identifies the query in the cache.
- **`queryFn`** → Async function that calls `getPosts()` from `post.service.ts`.
- **Loading/Error Handling**:
  - `isLoading` → While fetching.
  - `isError` & `error` → Error message.
- **`refetch`** → Manually re-fetch posts when needed.

---

### 3. Creating Posts with `useMutation`
```ts
const {
  mutate: createPostMutate,
  isPending: isCreating,
  isError: isErrorCreating,
  error: creatingError,
} = useMutation({
  mutationFn: async (newPost: PostType) => createPost(newPost),
});
```

#### Key Points:
- **`mutationFn`** → Function that calls `createPost()` to add a new post.
- **`mutate`** → Triggers the mutation.
- **States**:
  - `isPending` → Shows "Uploading..." state in button.
  - `isError` → Displays error messages if post creation fails.

---

### 4. Handling Form Submission
```ts
const handleSubmit = () => {
  try {
    if (!title || !postDetails)
      throw new Error("Please provide details");

    createPostMutate({
      id: (data?.length ?? 0) + Math.floor(Math.random() * 100),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      title,
      postDetails,
    });
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};
```

- Validates form fields.
- Calls `createPostMutate()` with a new `PostType`.
- Uses random ID generation for demo purposes.
- Logs validation or API errors.

---

### 5. Rendering UI

#### Form
```tsx
<input
  type="text"
  name="title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

<input
  type="text"
  name="description"
  value={postDetails}
  onChange={(e) => setPostDetails(e.target.value)}
/>

<button onClick={() => handleSubmit()} disabled={isCreating}>
  {isCreating ? "Uploading..." : "Upload Post"}
</button>
```
- Controlled form using `useState`.
- Button shows loading state while mutation is in progress.
- Error message shown if post creation fails.

#### Posts Grid
```tsx
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {data?.map((post: PostType) => (
    <div key={post.id} className="p-6 bg-white shadow rounded-lg">
      <h3>{post.title}</h3>
      <p>{post.postDetails}</p>
      <p>Created: {new Date(post.createdAt).toLocaleString()}</p>
      <p>Updated: {new Date(post.updatedAt).toLocaleString()}</p>
    </div>
  ))}
</div>
```
- Responsive grid layout for posts.
- Shows title, description, created, and updated timestamps.

#### Refetch Button
```tsx
<button onClick={() => refetch()}>
  Reload Posts
</button>
```
- Manually reloads posts from the backend.

---

## 📂 File Structure
```
src/
 ├─ services/
 │   └─ post.service.ts   # API calls (getPosts, createPost)
 ├─ types/
 │   └─ types.ts          # PostType definition
 ├─ components/
 │   └─ UseMutation.tsx   # Main component
 ├─ App.tsx
 └─ main.tsx
```

---

## 🛠️ Flow of the App
1. `useQuery` loads posts on page mount.
2. User fills out form and submits.
3. `useMutation` sends new post to backend.
4. UI shows loading state → success/error state.
5. Posts are displayed in a responsive grid.
6. User can click **Reload Posts** to refetch.

---

## ✅ Improvements You Can Try
- **Optimistic Updates** → Show new post instantly before server responds.
- **Invalidate Queries** → Call `queryClient.invalidateQueries(["posts"])` after mutation so list auto-refreshes.
- **Form Reset** → Clear form fields after successful submission.
- **Pagination** → Load posts in pages for scalability.

---

## 🔗 References
- [TanStack React Query Docs](https://tanstack.com/query/latest)
- [Tailwind CSS Docs](https://tailwindcss.com/)

---
