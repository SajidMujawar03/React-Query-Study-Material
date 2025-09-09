

````
# 🚀 React Query Beginner Project

This is a **small, beginner-friendly project** designed to demonstrate the core concepts of **TanStack React Query**.  
The application fetches and displays data from a local mock API, showcasing how to manage **server state efficiently** and handle **loading, error, and success states**.

---

## 🛠 Key Technologies

- **React 19**: The UI library for building the application's interface.  
- **TanStack React Query**: A powerful library for data fetching, caching, and synchronization.  
- **Tailwind CSS 4**: A utility-first CSS framework used for rapid and responsive styling.  
- **JSON Server**: A simple tool to create a full fake REST API from a JSON file, simulating a real backend.  

---

## ⚡ Getting Started

To run this project, you'll need **Node.js** and **npm** installed on your machine.

### 1️⃣ Install Dependencies

Navigate to the project directory and install the required packages:

```bash
npm install
````

### 2️⃣ Start the Mock API Server

The application relies on a local API to fetch data. Start JSON Server to serve `data.json` on port 3000:

```bash
npm run server
```

### 3️⃣ Start the Development Server

In a new terminal window, start the React development server:

```bash
npm run dev
```

Your application should now be running at [http://localhost:5173](http://localhost:5173) and fetching data from your mock API.

---

## 📂 Project Structure

```
react_query_beginner/
├─ src/                  # Main application code
├─ data.json             # Mock database for JSON Server
├─ package.json          # Project dependencies and scripts
├─ tailwind.config.js    # Tailwind configuration
└─ vite.config.ts        # Vite configuration
```

---

## 🎯 Features

* Fetch data using **traditional fetch + useEffect**
* Fetch data using **React Query** for automatic caching and state management
* Display posts in **responsive cards** with **Tailwind CSS**
* Loading and error handling implemented
* Mock backend using **JSON Server**

---

## 🔄 Traditional Fetch vs React Query

| Aspect                   | Traditional Fetch + useEffect | React Query (@tanstack/react-query) |
| ------------------------ | ----------------------------- | ----------------------------------- |
| Data Fetching            | Manual inside `useEffect`     | `useQuery` handles automatically    |
| Caching                  | None                          | Automatic caching                   |
| Loading & Error Handling | Manual with `useState`        | Managed by `isLoading` & `isError`  |
| Refetching               | Manual                        | Built-in & configurable             |
| Ease of Use              | More boilerplate              | Less code, declarative              |

---

## 👍 Why This Project?

This project is an excellent way to **see React Query in action** and understand the basics of **server state management**.
It’s perfect for beginners who want to move from manual fetch patterns to modern, efficient data fetching with React Query.

---

## 📜 License

This project is **open-source** and free to use.

```

This version uses:

- Emojis for visual hierarchy  
- Bold text for emphasis  
- Code blocks for commands and file structure  
- Tables for comparison  
- Horizontal rules for section separation  
```
