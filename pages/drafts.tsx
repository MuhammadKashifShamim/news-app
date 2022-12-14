import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useSession, getSession } from "next-auth/react";
import Layout from "../components/Layout";
import Article, { ArticleProps } from "../components/Article";
import { Button } from "flowbite-react";
import { HiPlus } from "react-icons/hi";
import prisma from "../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { drafts: [] } };
  }

  const drafts = await prisma.article.findMany({
    where: {
      author: { email: session?.user?.email },
      published: false,
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

  const result = drafts.map((draft) => {
    return {
      ...draft,
      categories: draft.categories.map((category) => category.category),
    };
  });

  return {
    props: { drafts: JSON.parse(JSON.stringify(result)) },
  };
};

type Props = {
  drafts: ArticleProps[];
};

const Drafts: React.FC<Props> = (props) => {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Layout>
        <h1 className="my-3 text-4xl font-bold dark:text-gray-200">Drafts</h1>
        <div className="dark:text-gray-200">
          You need to be authenticated to view this page.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>tinkrng.dev - Drafts</title>
        <meta name="description" content="Drafts" />
      </Head>
      <div className="container mx-auto">
        <div className="mx-auto flex flex-wrap items-center justify-between">
          <h1 className="my-3 text-4xl font-bold dark:text-gray-200">Drafts</h1>
          <Button pill={true} href="/new_draft">
            <HiPlus className="mr-2 h-5 w-5" />
            Create
          </Button>
        </div>
        <main className="order-2 mt-4 mb-24 flex-[1_0_16rem]">
          {props.drafts.map((article) => (
            <div key={article.id} className="article">
              <Article article={article} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Drafts;
