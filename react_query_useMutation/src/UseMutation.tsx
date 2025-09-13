import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { createPost, getPosts } from "./services/post.service";

type PostType = {
  id: number;
  title: string;
  postDetails: string;
  createdAt: Date;
  updatedAt: Date;
};

const UseMutation = () => {
  const [title, setTitle] = useState("");
  const [postDetails, setPostDetails] = useState("");

  // Fetch posts
  const {
    data,
    isLoading: isGettingPosts,
    isError: isErrorGettingPosts,
    error: gettingPostsError,
    refetch,
  } = useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  // Create post mutation
  const {
    mutate: createPostMutate,
    isLoading: isCreating,
    isError: isErrorCreating,
    error: creatingError,
  } = useMutation({
    mutationFn: (newPost) =>
      createPost(newPost),
  });

  if (isGettingPosts)
    return <div className="text-center py-6">Loading posts...</div>;

  if (isErrorGettingPosts)
    return (
      <div className="text-center py-6 text-red-500">
        Error: {String(gettingPostsError)}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      {/* New Post Form */}
      <div className="bg-white shadow-md rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Create a Post</h2>

        <div className="flex flex-col space-y-2">
          <label htmlFor="title" className="text-gray-600 font-medium">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="description" className="text-gray-600 font-medium">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={postDetails}
            onChange={(e) => setPostDetails(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <button
          onClick={() => createPostMutate({ id:data?.data.length+1 , createdAt:Date.now() , updatedAt:Date.now(),title, postDetails })}
          disabled={isCreating}
          className="w-full bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
        >
          {isCreating ? "Uploading..." : "Upload Post"}
        </button>

        {isErrorCreating && (
          <div className="text-red-500 mt-2">Error: {String(creatingError)}</div>
        )}
      </div>

      {/* Post List */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Posts</h2>

        {/* Grid of cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((post) => (
            <div
              key={post.id}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600">{post.postDetails}</p>
              <div className="mt-4 text-sm text-gray-400 space-y-1">
                <p>Created: {new Date(post.createdAt).toLocaleString()}</p>
                <p>Updated: {new Date(post.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => refetch()}
          className="mt-6 w-full bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-200 transition"
        >
          Reload Posts
        </button>
      </div>
    </div>
  );
};

export default UseMutation;
