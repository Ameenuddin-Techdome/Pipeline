import Image from "next/image";
import { fetchStrapiBlogById } from "@lib/data/fetchStrapiBlogById";

export default async function BlogDetailPage({ params }: { params: { countryCode: string; uid: string } }) {
  const { uid } = await params;
  const blog = await fetchStrapiBlogById(uid);

  if (!blog) {
    return <div className="p-8 text-center text-gray-600">Blog not found.</div>;
  }

  const textContent =
    typeof blog.content === "string"
      ? blog.content
      : blog.content
          ?.map((block: any) =>
            block.children?.map((child: any) => child.text).join(" ")
          )
          .join("\n") || "";

  return (
    <div className="max-w-3xl mx-auto p-8">
      {blog.image && (
        <div className="relative w-full h-80 mb-6">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>

      {/* Author and publish date */}
      <div className="text-gray-500 mb-6">
        By <span className="font-medium">{blog.author}</span> |{" "}
        {new Date(blog.publishedAt).toLocaleDateString()}
      </div>

      <div className="text-gray-600 whitespace-pre-line leading-relaxed">
        {textContent}
      </div>
    </div>
  );
}
