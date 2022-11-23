/* eslint-disable react/no-children-prop */
import React from "react";
import Router from "next/router";
import { Card } from "flowbite-react";
import Image from "next/image";

export type CategoryProps = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

const Category: React.FC<{ category: CategoryProps }> = ({ category }) => {
  return (
    <Card className="mb-2">
      <div className="grid grid-cols-8 gap-4">
        <div>
          <Image
            src={category.icon}
            alt={category.title}
            width="60"
            height="60"
          />
        </div>
        <div className="space-y-1 font-medium dark:text-white col-span-6 ">
          <div>{category.title}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {category.description}
          </div>
        </div>
      </div>
    </Card>
    // <div
    //   onClick={() => Router.push("/category/[id]", `/category/${category.id}`)}
    // >
    //   <h2 className="category-header">{category.title}</h2>
    //   <small className="author">{category.description}</small>
    //   <style jsx>{`
    //     .category-header {
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

export default Category;
