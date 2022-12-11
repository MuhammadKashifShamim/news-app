import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import Article, { ArticleProps } from "../components/Article";
import prisma from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.article.findMany({
    where: { published: true },
    orderBy: { views: "desc" },
    include: {
      author: {
        select: { name: true, image: true },
      },
      categories: {
        select: {
          category: {
            select: { title: true },
          },
        },
      },
    },
  });
  // console.log(JSON.stringify(feed));
  const result = feed.map((feed) => {
    return {
      ...feed,
      categories: feed.categories.map((category) => category.category),
    };
  });
  return {
    props: { feed: JSON.parse(JSON.stringify(result)) }, //this is a workaround to handle date strings cuz next only handles scalar types for performance
    revalidate: 10,
  };
};

type Props = {
  feed: ArticleProps[];
};

const Popular: React.FC<Props> = (props) => {
  console.log(props.feed);
  return (
    <Layout>
      <Head>
        <title>tinkrng.dev - Popular News</title>
        <meta name="description" content=" Popular Devlogs" />
      </Head>
      <div className="container mx-auto">
        <h1 className="my-3 text-4xl font-bold dark:text-gray-200">Popular</h1>
        <main className="order-2 mt-4 mb-24 flex-[1_0_16rem]">
          {props.feed.map((article) => (
            <div key={article.id} className="mx-auto">
              <Article article={article} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Popular;
