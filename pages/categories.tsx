import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Router from "next/router";
import Layout from "../components/Layout";
import Category, { CategoryProps } from "../components/Category";
import { Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { categories: [] } };
  }

  const categories = await prisma.category.findMany();
  return {
    props: { categories },
  };
};

type Props = {
  categories: CategoryProps[];
};

const Categories: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1 className="my-3 text-4xl font-bold dark:text-gray-200">
          Categories
        </h1>
        <div className="dark:text-gray-200">
          You need to be authenticated to view this page.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="mx-auto flex flex-wrap items-center justify-between">
          <h1 className="my-3 text-4xl font-bold dark:text-gray-200">
            Categories
          </h1>
          <Button pill={true} href="/new_category">
            <HiPlus className="mr-2 h-5 w-5" />
            Create
          </Button>
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

export default Categories;
