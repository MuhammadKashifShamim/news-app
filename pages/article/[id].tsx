/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-children-prop */
import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Avatar, Badge, Button } from "flowbite-react";
import Image from "next/image";
import {
  HiOutlineEye,
  HiOutlineHeart,
  HiOutlineClipboardCheck,
  HiOutlineTrash,
  HiOutlineBookmark,
  HiOutlineChat,
} from "react-icons/hi";
import ReactMarkdown from "react-markdown";
import Router from "next/router";
import Layout from "../../components/Layout";
import { ArticleProps } from "../../components/Article";
import { useSession } from "next-auth/react";
import prisma from "../../lib/prisma";
import styles from "../../styles/markdown-styles.module.css";

export async function getServerSideProps({ params }) {
  // console.log(typeof (params?.id));
  const post = await prisma.article.findUnique({
    where: {
      id: Number(params?.id),
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
  const result = {
    ...post,
    categories: post?.categories.map((category) => category.category),
  };
  return {
    props: JSON.parse(JSON.stringify(result)),
  };
}

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  Router.push("/");
}

async function updatePostLikes(id: string): Promise<void> {
  await fetch(`/api/article/${id}`, {
    method: "PUT",
    body: JSON.stringify({ likes: { increment: 1 } }),
  });
  Router.push(`/article/${id}`);
}
async function updatePostViews(id: string): Promise<void> {
  await fetch(`/api/article/${id}`, {
    method: "PUT",
    body: JSON.stringify({ views: { increment: 1 } }),
  });
  // Router.push(`/article/${id}`);
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/article/${id}`, {
    method: "DELETE",
  });
  Router.push("/");
}

const Post: React.FC<ArticleProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  console.log("Valid User Session:", userHasValidSession);
  const postBelongsToUser = session?.user?.name === props.author?.name;
  console.log(props);
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  useEffect(() => {
    if (props.published) {
      updatePostViews(props.id);
    }
  });

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={props.content} />
      </Head>
      <div className="container mx-auto mt-6">
        <div className="flex relative rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex-col mb-6">
          <div className="relative h-96 p-12 ">
            <Image
              className={
                !props.published ? "rounded-t-lg blur" : "rounded-t-lg"
              }
              src={props?.headerImage}
              alt="Article Header Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="p-5 ">
            <div className="flex justify-between mb-4">
              <Avatar img={props?.author?.image} rounded={true}>
                <div className="space-y-1 font-medium dark:text-white">
                  <div>{props?.author?.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Posted at {new Date(props?.createdAt).toDateString()}
                  </div>
                </div>
              </Avatar>
              <div>
                {props?.categories &&
                  props?.categories?.map((category, index) => {
                    return (
                      <Badge size="lg" key={index}>
                        {category.title}
                      </Badge>
                    );
                  })}
              </div>
            </div>
            <h5 className="text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white md:text-4xl lg:text-5xl mb-6">
              {props.title}
            </h5>
            <div className="format max-w-none dark:format-invert lg:format-lg format-a:text-blue-600 mb-4">
              <ReactMarkdown children={props.content} />
            </div>
            <div className="flex justify-between">
              <div className="flex gap-6 text-gray-900 dark:text-white text-lg">
                <div className="flex items-center">
                  <HiOutlineEye className="mr-2 h-10 w-10" />
                  <p>{props.views}</p>
                </div>
                <div
                  className="flex items-center  cursor-pointer hover:brightness-50"
                  onClick={() => updatePostLikes(props.id)}
                >
                  <HiOutlineHeart className="mr-2 h-10 w-10" />
                  <p>{props.likes}</p>
                </div>
              </div>
            </div>
          </div>
          {!props.published && userHasValidSession && postBelongsToUser && (
            <div className="flex flex gap-4 m-2 absolute top-0 right-0">
              <Button
                color="success"
                pill={true}
                onClick={() => publishPost(props.id)}
              >
                <HiOutlineClipboardCheck className="mr-2 h-5 w-5" />
                Publish
              </Button>
              <Button
                color="failure"
                pill={true}
                onClick={() => deletePost(props.id)}
              >
                <HiOutlineTrash className="mr-2 h-5 w-5" />
                Delete
              </Button>
            </div>
          )}
        </div>
        {/* <h2 className="post-header">{title}</h2>
        <p className="author">By {props?.author?.name || "Unknown author"}</p>
        <ReactMarkdown
          className={styles.reactMarkDown}
          children={props.content}
        />
        
        */}
      </div>
      {/* <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 2rem;
        }
        div {
          background-color: #edf6f9;
          color: inherit;
          padding: 2rem;
        }
        .post-header {
          font-size: 20px;
          font-weight: bold;
          color: #006d77;
        }
        .author {
          color: #83c5be;
        }
        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style> */}
    </Layout>
  );
};

export default Post;
