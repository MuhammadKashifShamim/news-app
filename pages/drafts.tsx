import React from "react";
import { GetServerSideProps } from "next";
import { useSession, getSession } from "next-auth/react";
import Router from "next/router";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
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
        select: { name: true },
      },
    },
  });
  return {
    props: { drafts },
  };
};

type Props = {
  drafts: PostProps[];
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
      <div className="container mx-auto">
        <div className="mx-auto flex flex-wrap items-center justify-between">
          <h1 className="my-3 text-4xl font-bold dark:text-gray-200">Drafts</h1>
          <Button pill={true} href="/new_draft">
            <HiPlus className="mr-2 h-5 w-5" />
            Create
          </Button>
        </div>
        <main className="order-2 mt-4 mb-24 flex-[1_0_16rem]">
          {props.drafts.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Drafts;
