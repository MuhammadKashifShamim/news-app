/* eslint-disable react/no-children-prop */
import React from "react";
import Router from "next/router";

export type CategoryProps = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

const Category: React.FC<{ category: CategoryProps }> = ({ category }) => {
  return (
    <div
      onClick={() => Router.push("/category/[id]", `/category/${category.id}`)}
    >
      <h2 className="category-header">{category.title}</h2>
      <small className="author">{category.description}</small>
      <style jsx>{`
        .category-header {
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

export default Category;
