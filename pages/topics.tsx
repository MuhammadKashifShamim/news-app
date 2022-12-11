import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import Category, { CategoryProps } from "../components/Category";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const categories = await prisma.category.findMany();
  return {
    props: { categories },
  };
};

type Props = {
  categories: CategoryProps[];
};

const Topics: React.FC<Props> = (props) => {
  //console.log(props.categories);
  return (
    <Layout>
      <Head>
        <title>tinkrng.dev - Topics</title>
        <meta name="description" content="Topics for articles" />
      </Head>
      <div className="container mx-auto">
        <div className="mx-auto flex flex-wrap items-center justify-between">
          <h1 className="my-3 text-4xl font-bold dark:text-gray-200">Topics</h1>
        </div>
        <main className="order-2 mt-4 mb-24 flex-[1_0_16rem] grid grid-cols-2 gap-4">
          {props.categories.map((category) => (
            <div key={category.id}>
              <Category category={category} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Topics;
