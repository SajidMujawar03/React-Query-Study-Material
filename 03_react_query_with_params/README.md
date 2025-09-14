This is a React application that demonstrates the basics of **React Query** for fetching and caching dynamic data. The homepage provides a simple interface with links to individual post pages, each of which would fetch data for a specific post using its ID.

---

### 📚 **Core Concepts**

This project focuses on the fundamental concepts of using React Query for dynamic data fetching, particularly with unique identifiers.

* **Dynamic `useQuery`**: The primary goal is to show how `useQuery` can be used to fetch data for a specific item, such as a blog post. Instead of fetching a list of all posts at once, we use the post's **ID** as part of the query to fetch just one post. This is a common pattern for detail pages.

    **Example:** When a user navigates to `/post/1`, a component on that page would use `useQuery` with a query key that includes the ID, like `useQuery(['post', 1], ...)` to fetch data for post with ID `1`.

* **Query Key**: The **query key** is a unique identifier that React Query uses to manage and cache data. For dynamic queries, the query key must include the variable part of the query, such as the `post ID`. For instance, `['post', 1]` is a different query key from `['post', 2]`, allowing React Query to cache and manage each post's data separately. This prevents a user from having to refetch post 1's data if they've already visited that page.

---

### 💻 **How it Works**

The `Home` component serves as a simple landing page. It doesn't fetch any data itself. Instead, it generates a series of links to hypothetical post detail pages (`/post/1`, `/post/2`, etc.).

1.  **Welcome & Explanation**: The page begins with a clear header and a brief explanation of how `useQuery` works for individual items, highlighting the role of the post's **ID**.

2.  **Dynamic Links**: It maps over an array of numbers `[1, 2, 3, 4, 5]` to create five different `Link` components. Each `Link` directs the user to a unique URL, such as `/post/1` or `/post/5`.

3.  **Demonstration**: When a user clicks on one of these links, a different component (not shown in this file) would load. That component would then use React Query, with the ID from the URL, to fetch and display the corresponding post's data.

This setup effectively simulates a real-world scenario where a list of items on a homepage links to individual detail pages that dynamically fetch their own data.