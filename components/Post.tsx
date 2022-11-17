/* eslint-disable react/no-children-prop */
import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import styles from "../styles/markdown-styles.module.css";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : "Unknown author";
  return (
    <div onClick={() => Router.push("/post/[id]", `/post/${post.id}`)}>
      <h2 className="post-header">{post.title}</h2>
      <small className="author">By {authorName}</small>
      <ReactMarkdown className={styles.reactMarkDown} children={post.content} />
      <style jsx>{`
        .post-header {
          font-size: 20px;
          font-weight: bold;
          color: #006d77;
        }
        .author {
          color: #83c5be;
        }
        div {
          background-color: #edf6f9;
          color: inherit;
          padding: 2rem;
        }
        .markdown a {
          color: #fff !important;
        }
      `}</style>
    </div>
  );
};

export default Post;
