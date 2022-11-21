import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.article.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="my-3 text-4xl font-bold dark:text-gray-200">Popular</h1>
        <main className="order-2 mt-4 mb-24 flex-[1_0_16rem]">
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
              <Post post={post} />
              <Post post={post} />
              <Post post={post} />
              <Post post={post} />
              <Post post={post} />
              <Post post={post} />
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Blog;
