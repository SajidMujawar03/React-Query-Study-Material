import { useQuery } from '@tanstack/react-query'

type Post = {
    id: number;
    title: string;
    body: string;
}

const ReactQuery = () => {

    const { data, error, isError, isLoading } = useQuery<Post[]>({
        queryKey: ["posts"],
        queryFn:
            () => (
                fetch("http://localhost:3000/posts").then(res => res.json())
            )
    })
    if (isLoading) return <p className="text-center mt-5">Loading...</p>
    if (isError) return <p className="text-center mt-5 text-red-500">{error.message}</p>


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {data?.map(post => (
                <div
                    key={post.id}
                    className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow"
                >
                    <h2 className="text-lg font-bold mb-2">{post.title}</h2>
                    <p className="text-gray-700">{post.body}</p>
                </div>
            ))}
        </div>
    )
}

export default ReactQuery
