import { useEffect, useState } from 'react'

type Post = {
    id: number;
    title: string;
    body: string;
}

const Fetch = () => {
    const [data, setData] = useState<Post[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true)
        try {
           
            await new Promise((resolve) => setTimeout(resolve, 2000));
              const  response = await fetch("http://localhost:3000/posts");
            
            
            if (!response.ok) throw new Error("Failed to fetch posts");
            const data: Post[] = await response.json();
            setData(data)
        } catch (err) {
            if (err instanceof Error)    
                setError(err.message)
            else
                setError("Unexpected Error")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
         fetchData()
    }, [])

    if (loading) return <p className="text-center mt-5">Loading...</p>
    if (error) return <p className="text-center mt-5 text-red-500">{error}</p>

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {data.map(post => (
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

export default Fetch
