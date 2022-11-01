/* eslint-disable react/no-children-prop */
import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Router from 'next/router';
import Layout from "../../components/Layout";
import { PostProps } from "../../components/Post";
import { useSession } from 'next-auth/react';
import prisma from '../../lib/prisma';
import styles from '../../styles/markdown-styles.module.css';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.article.findUnique({
    where: {
      id: Number(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  })
  return {
    props: post,
  }
}

async function publishPost(id: string): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  });
  await Router.push('/');
}

async function deletePost(id: string): Promise<void> {
  await fetch(`/api/article/${id}`, {
    method: 'DELETE',
  });
  Router.push('/');
}

const Post: React.FC<PostProps> = (props) => {
  const { data: session, status } = useSession();
  if (status === 'loading') {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  console.log("Valid User Session:",userHasValidSession);
  const postBelongsToUser = session?.user?.name === props.author?.name;
  console.log(session?.user);
  console.log(props.author);
  console.log(postBelongsToUser);
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <div>
        <h2 className="post-header">{title}</h2>
        <p className="author">By {props?.author?.name || 'Unknown author'}</p>
        <ReactMarkdown className={styles.reactMarkDown}children={props.content} />
        {!props.published && userHasValidSession && postBelongsToUser && (
          <button onClick={() => publishPost(props.id)}>Publish</button>
        )}
        {userHasValidSession && postBelongsToUser && (
          <button onClick={() => deletePost(props.id)}>Delete</button>
        )}
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 2rem;
        }
        div {
          background-color: #EDF6F9;
          color: inherit;
          padding: 2rem;
        }
        .post-header {
          font-size: 20px;
          font-weight: bold;
          color: #006d77;
        }
        .author{
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
      `}</style>
    </Layout>
  )
}

export default Post