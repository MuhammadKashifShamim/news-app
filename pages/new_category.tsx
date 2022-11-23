import React, { useState } from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Router from "next/router";
import prisma from "../lib/prisma";
import {
  Card,
  Label,
  FileInput,
  TextInput,
  Textarea,
  Button,
} from "flowbite-react";
import { HiX, HiOutlineCheck } from "react-icons/hi";
import Image from "next/image";

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

const Category: React.FC<Props> = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, description, icon };
      console.log(body);
      await fetch("/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.replace("/categories");
    } catch (error) {
      console.error(error);
    }
  };

  const onIconSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }
    console.log(event.target.files[0]);

    const formData = new FormData();
    formData.append("images", event.target.files[0]);
    formData.append("type", "icon");

    try {
      await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setIcon("/" + data.url);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="my-3 text-4xl font-bold dark:text-gray-200">
          New Category
        </h1>
        <Card className="mb-10">
          <form className="flex flex-col gap-4" onSubmit={submitData}>
            {icon == "" ? (
              <div className="mb-2 block">
                <Label htmlFor="Icon" value="Select an Icon" />
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
                      Click to select icon
                    </span>
                  </span>

                  <FileInput
                    className="hidden"
                    id="icon"
                    onChange={onIconSelect}
                  />
                </label>
              </div>
            ) : (
              <div>
                <Label htmlFor="Icon" value="Select an Icon" />
                <div className="relative h-32 mt-4 p-12 border-2 border-gray-300 rounded-md">
                  <Image
                    src={icon}
                    alt="Selected Image"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            )}

            <div className="mb-2 block">
              <Label htmlFor="Title" value="New Category Title" />
              <TextInput
                id="title"
                type="text"
                placeholder="DevOps"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required={true}
              />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="Description" value="New Category Description" />
              <Textarea
                id="description"
                rows={3}
                placeholder="All things DevOps"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <div>
                <Button
                  disabled={!description || !title}
                  pill={true}
                  type="submit"
                >
                  <HiOutlineCheck className="mr-2 h-5 w-5" />
                  Create
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => Router.replace("/categories")}
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

export default Category;
