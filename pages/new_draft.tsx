import React, { useState } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Router from "next/router";
import { CategoryProps } from "../components/Category";
import prisma from "../lib/prisma";
import {
  Card,
  Label,
  FileInput,
  TextInput,
  Select,
  Button,
} from "flowbite-react";
import { HiX, HiOutlineCheck } from "react-icons/hi";
import Image from "next/image";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import UiFileInputButton from "../components/UIFileInputButton";

export const getStaticProps: GetStaticProps = async () => {
  const categories = await prisma.category.findMany();
  // console.log(categories);
  return {
    props: { categories },
  };
};

type Props = {
  categories: CategoryProps[];
};

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const Draft: React.FC<Props> = (props) => {
  const [category, setCategory] = useState("select");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<any>("");
  const [headerImage, setHeaderImage] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { headerImage, category, title, content };
      console.log(body);
      await fetch("/api/article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.replace("/drafts");
    } catch (error) {
      console.error(error);
    }
  };

  const onImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }
    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("images", event.target.files[0]);
    formData.append("type", "gallery");

    try {
      await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setHeaderImage("/" + data.url);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="my-3 text-4xl font-bold dark:text-gray-200">
          New Draft
        </h1>
        <Card className="mb-10">
          <form className="flex flex-col gap-4" onSubmit={submitData}>
            <div id="select">
              <div className="mb-2 block">
                <Label htmlFor="countries" value="Select your country" />
              </div>
              <Select
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
              </Select>
            </div>
            {headerImage == "" ? (
              <div className="mb-2 block">
                <Label htmlFor="Header Image" value="Select Header Image" />
                <label className="flex justify-center h-32 px-4 transition border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                  <span className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="font-medium text-gray-600">
                      Click to select image
                    </span>
                  </span>

                  <FileInput
                    className="hidden"
                    id="icon"
                    onChange={onImageSelect}
                  />
                </label>
              </div>
            ) : (
              <div>
                <Label htmlFor="Icon" value="Select an Icon" />
                <div className="relative h-48 mt-4 p-12 border-2 border-gray-300 rounded-md">
                  <Image
                    src={headerImage}
                    alt="Selected Image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            )}

            <div className="mb-2 block">
              <Label htmlFor="Title" value="Title for new article" />
              <TextInput
                id="title"
                type="text"
                placeholder="How to setup Nginx"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required={true}
              />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="Content" value="Write content" />
              <MDEditor
                className=" bg-slate-50 rounded-lg dark:bg-gray-700 text-gray-900 dark:text-white"
                value={content}
                onChange={setContent}
                height={500}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <div>
                <Button disabled={!content || !title} pill={true} type="submit">
                  <HiOutlineCheck className="mr-2 h-5 w-5" />
                  Create
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => Router.replace("/drafts")}
                  pill={true}
                  color="gray"
                >
                  <HiX className="mr-2 h-5 w-5" />
                  Discard
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default Draft;
