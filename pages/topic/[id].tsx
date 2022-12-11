import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import { Card } from "flowbite-react";
import { CategoryProps } from "../../components/Category";
import Article, { ArticleProps } from "../../components/Article";

type Props = {
  category: CategoryProps;
  articles: ArticleProps[];
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const category = await prisma.category.findUnique({
    where: {
      id: Number(params?.id),
    },
  });

  const articles = await prisma.article.findMany({
    where: {
      categories: {
        some: {
          category: {
            id: Number(params?.id),
          },
        },
      },
      published: true,
    },
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
  const result = articles.map((article) => {
    return {
      ...article,
      categories: article.categories.map((category) => category.category),
    };
  });

  return {
    props: { category: category, articles: JSON.parse(JSON.stringify(result)) },
  };
};

const Topic: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Head>
        <title>tinkrng.dev - {props?.category?.title}</title>
        <meta name="description" content={props?.category?.description} />
      </Head>
      <div className="container mx-auto mt-6">
        <div className="ml-12 mb-12">
          <h5 className="text-4xl mb-6 font-bold tracking-tight text-gray-900 dark:text-white">
            {props?.category?.title}
          </h5>
          <h6 className="text-2xl font-normal text-gray-700 dark:text-gray-400">
            {props?.category?.description}
          </h6>
        </div>
        <div className="order-2 mt-4 mb-24 flex-[1_0_16rem] grid grid-cols-2 gap-24">
          {props.articles.map((article) => (
            <div key={article.id} className="article">
              <Article article={article} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default Topic;
