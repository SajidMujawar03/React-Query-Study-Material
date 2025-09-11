import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";

const AutomaticSharing2 = () => {
  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["sharedKey"],
    queryFn: () =>
      fetch("https://fakestoreapi.com/users").then((response) =>
        response.json()
      ),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading users...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl font-semibold text-red-600">
          Failed to load users!
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Info Banner */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6 text-center">
        <p className="text-purple-700 font-medium">
          Page 2: This query shares the same cache as Page 1.  
          Check the current path if you don’t believe me 💡{"<3"}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-center mb-8">
        <Link
          to="/automatic-sharing-1"
          className="px-5 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-colors"
        >
          Go to Page 1
        </Link>
      </div>

      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
        Users List
      </h1>

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {data.map((user: any, index: number) => (
          <div
            key={index}
            className="bg-white border rounded-2xl shadow-md p-6 flex flex-col items-center 
                       hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <img
              src={`https://i.pravatar.cc/150?u=${user.email}`}
              alt={user.username}
              className="w-24 h-24 rounded-full border-2 border-purple-200 mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              {user.username}
            </h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <p className="text-gray-400 text-xs mt-2">
              Password: {user.password}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutomaticSharing2;
