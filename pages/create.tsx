import React, { useState } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Router from "next/router";
import prisma from "../lib/prisma";
import UiFileInputButton from "../components/UIFileInputButton";

export const getStaticProps: GetStaticProps = async () => {
  const categories = await prisma.category.findMany();
  // console.log(categories);
  return {
    props: { categories },
  };
};

type CategoryProps = {
  id: string;
  title: string;
};

type Props = {
  categories: CategoryProps[];
};

const Draft: React.FC<Props> = (props) => {
  const [category, setCategory] = useState("select");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { category, title, content };
      console.log(body);
      await fetch("/api/article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = async (formData: FormData) => {
    console.log(Object.fromEntries(formData));
    try {
      await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.error(error);
    }
    // const response = await uploadFileRequest(formData, (event) => {
    //   console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
    // });

    // console.log('response', response);
  };

  return (
    <Layout>
      <div>
        <h1 className="header">New Draft</h1>
        <UiFileInputButton // TODO: Change this once you implement it in gallery and implement select from gallery
          label="Upload Single File"
          uploadFileName="theFiles"
          onChange={onChange}
        />
        <form onSubmit={submitData}>
          <select
            name="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="select">Select Category</option>
            {props.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input disabled={!content || !title} type="submit" value="Create" />
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .header {
          font-size: 25px;
          font-weight: bold;
          color: #3c4048;
        }
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        select,
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Draft;
