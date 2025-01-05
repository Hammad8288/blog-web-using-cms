
import { client } from "@/sanity/lib/client";
import React from "react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import CommentsSection from "@/app/comments";


// Next.js configurations
export const dynamic = "auto";
export const runtime = "nodejs";
export const dynamicParams = true;
export const revalidate = 60;

// Fetch data function
async function getData(slug: string) {
  const query = `*[_type == "blog" && slug.current == $slug][0] {
    title,
    content,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    author->{authorname, "authorimage": authorimage.asset->url}
  }`;

  const data = await client.fetch(query, { slug });
  return data;
}

// Main BlogPost component
const BlogPost = async ({ params }: { params: { slug: string } }) => {
  // Destructure slug from params
  const { slug } = await params;

  // Ensure slug exists
  if (!slug) {
    throw new Error("Slug is missing!");
  }

  // Fetch blog post data
  const data = await getData(slug);

  // Handle case where data is not found
  if (!data) {
    return <div className="text-center mt-20">Post not found</div>;
  }

  // Render the blog post
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <Image
        src={data.imageUrl}
        alt={data.title}
        width={800}
        height={400}
        className="w-full max-h-96 object-cover rounded-lg mb-6"
      />
      {data.author && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold">Author</h3>
          <div className="flex items-center mt-2">
            <Image
              src={data.author.authorimage}
              alt={data.author.authorname}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full mr-4"
            />
            <p className="font-bold underline">{data.author.authorname}</p>
          </div>
        </div>
      )}
      <br />
      <div className="text-gray-800">
        <PortableText value={data.content} />
      </div>

      {/* Comments Section */}
      <CommentsSection slug={data.slug} />

    </div>
  );
};

export default BlogPost;

// Generate Static Params for SSG
export async function generateStaticParams() {
  const query = `*[_type == "blog"] {
    "slug": slug.current
  }`;

  const blogPosts = await client.fetch(query);

  return blogPosts.map((blog: { slug: string }) => ({
    slug: blog.slug,
  }));
}

// Generate Metadata for SEO
export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<{ title: string }> => {
  const { slug } =await params;

  if (!slug) {
    throw new Error("Slug is missing!");
  }

  return {
    title: `Blog Post: ${slug}`,
  };
};
