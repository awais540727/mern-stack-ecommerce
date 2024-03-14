import React from "react";
import useCategory from "../../hooks/useCategory";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";
const AllCategories = () => {
  const categories = useCategory();
  return (
    <Layout title={"all-categories"}>
      <h3 className="text-center"></h3>
      <div className="container mt-3">
        <div className="row">
          {categories?.map((category) => (
            <div className="col-md-3 m-4" key={category._id}>
              <Link
                className="btn btn-primary fw-bolder text-9 text-uppercase"
                to={`/category/${category.slug}`}
              >
                {category.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AllCategories;
