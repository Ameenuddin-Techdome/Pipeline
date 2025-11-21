import { fetchStrapiBlogs } from "@lib/data/fetchStrapiBlogs"

export default async function BlogPage() {
    const blogs = await fetchStrapiBlogs()

    return (
        <div className="max-w-4xl mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">Latest Blogs</h1>

            <div className="grid gap-8">
                {blogs.map((blog: any) => (
                    <div key={blog.id} className="border rounded-lg p-6 shadow">
                        {blog.image && (
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-60 object-cover rounded mb-4"
                            />
                        )}
                        <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                        <p className="text-gray-600 mb-4">
                            {typeof blog.content === "string"
                                ? blog.content.slice(0, 200)
                                : blog.content?.[0]?.children?.[0]?.text?.slice(0, 200) || "No content"}...
                        </p>
                        <a
                            href={`/blogs/${blog.uid}`}
                            className="text-blue-600 hover:underline"
                        >
                            Read more →
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}
