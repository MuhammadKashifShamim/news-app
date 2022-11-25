/* eslint-disable react/no-children-prop */
import React from "react";
import Router from "next/router";
import { Avatar, Badge, Button } from "flowbite-react";
import Image from "next/image";
import {
  HiArrowRight,
  HiOutlineEye,
  HiOutlineHeart,
  HiOutlineBookmark,
  HiOutlineChat,
} from "react-icons/hi";
import ReactMarkdown from "react-markdown";

export type ArticleProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
    image: string;
  } | null;
  categories:
    | [
        {
          title: string;
          description: string;
          icon: string;
        }
      ]
    | [];
  content: string;
  headerImage: string;
  published: boolean;
  likes: number;
  views: number;
  createdAt: string;
};

const Article: React.FC<{ article: ArticleProps }> = ({ article }) => {
  async function updatePostLikes(id: string): Promise<void> {
    await fetch(`/api/article/${id}`, {
      method: "PUT",
      body: JSON.stringify({ likes: { increment: 1 } }),
    });
    Router.push("/");
  }

  const authorName = article.author ? article.author.name : "Unknown author";
  return (
    <div className="flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700  dark:bg-gray-800 flex-col mb-6">
      <div className="relative h-64 p-12 ">
        <Image
          className="rounded-t-lg"
          src={article.headerImage}
          alt="Article Header Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-5 ">
        <div className="flex justify-between mb-4">
          <Avatar img={article?.author?.image} rounded={true}>
            <div className="space-y-1 font-medium dark:text-white">
              <div>{authorName}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Posted at {new Date(article?.createdAt).toDateString()}
              </div>
            </div>
          </Avatar>
          <div>
            {article?.categories &&
              article?.categories.map((category, index) => {
                return (
                  <Badge size="lg" key={index}>
                    {category.title}
                  </Badge>
                );
              })}
          </div>
        </div>
        <h5 className="text-4xl font-extrabold tracking-tight leading-none text-gray-900 dark:text-white md:text-4xl lg:text-5xl mb-6">
          {article.title}
        </h5>
        <div className="format max-w-none dark:format-invert lg:format-lg format-a:text-blue-600 mb-4">
          <ReactMarkdown children={article.content.substring(0, 300) + "..."} />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-6 text-gray-900 dark:text-white text-lg">
            <div className="flex items-center">
              <HiOutlineEye className="mr-2 h-10 w-10" />
              <p>{article.views}</p>
            </div>
            <div
              className="flex items-center  cursor-pointer hover:brightness-50"
              onClick={() => updatePostLikes(article.id)}
            >
              <HiOutlineHeart className="mr-2 h-10 w-10" />
              <p>{article.likes}</p>
            </div>
          </div>
          <Button
            pill={true}
            onClick={() =>
              Router.push("/article/[id]", `/article/${article.id}`)
            }
          >
            Read More
            <HiArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>

    // <div onClick={() => Router.push("/article/[id]", `/article/${article.id}`)}>
    //   <h2 className="article-header">{article.title}</h2>
    //   <small className="author">By {authorName}</small>
    //   <ReactMarkdown
    //     className={styles.reactMarkDown}
    //     children={article.content}
    //   />
    //   <style jsx>{`
    //     .post-header {
    //       font-size: 20px;
    //       font-weight: bold;
    //       color: #006d77;
    //     }
    //     .author {
    //       color: #83c5be;
    //     }
    //     div {
    //       background-color: #edf6f9;
    //       color: inherit;
    //       padding: 2rem;
    //     }
    //     .markdown a {
    //       color: #fff !important;
    //     }
    //   `}</style>
    // </div>
  );
};

export default Article;
