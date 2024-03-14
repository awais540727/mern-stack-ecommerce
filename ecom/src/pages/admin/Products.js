import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}api/v1/product/get-all-products`
      );
      if (data?.success) {
        setProducts(data.products);
        setLoading(false);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  // Getting all products from backend using useEffect

  useEffect(() => {
    setTimeout(() => {
      getAllProducts();
    }, 5000);
  }, []);
  return (
    <Layout title={"All products"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9 col-md-9 ">
            <h2>All Products</h2>
            {loading && (
              <div>
                <p className="placeholder-glow">
                  <span className="placeholder col-12"></span>
                </p>
                <p className="placeholder-wave">
                  <span className="placeholder col-12"></span>
                </p>
              </div>
            )}

            <div className="d-flex flex-wrap">
              {products &&
                products.map((product) => (
                  <Link
                    key={product._id}
                    to={`/dashboard/admin/update-product/${product.slug}`}
                    className="product-card"
                  >
                    <div className="card m-2" style={{ width: "18rem" }}>
                      <img
                        src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${product._id}`}
                        className="card-img-top mx-auto"
                        style={{ width: "18rem", height: "18rem" }}
                        alt={product.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title text-info">{product.name}</h5>
                        <p className="card-text">
                          {product.description.substring(0, 30)}...
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
            {/* <div className="d-flex flex-wrap">
              {loading
                ? // Render loading placeholders for each product
                  Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="card m-2 my-auto"
                      style={{ width: "18rem", height: "18rem" }}
                    >
                      <div className="placeholder-glow mt-5">
                        <span className="placeholder mt-5 col-12 mt-4"></span>
                      </div>
                      <div className="placeholder-wave my-auto mt-4">
                        <span className="placeholder mt-5 p-3 col-12"></span>
                      </div>
                    </div>
                  ))
                : // Render actual products when data is fetched
                  products.map((product) => (
                    <Link
                      key={product._id}
                      to={`/dashboard/admin/update-product/${product.slug}`}
                      className="product-card"
                    >
                      <div className="card m-2" style={{ width: "18rem" }}>
                        <img
                          src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${product._id}`}
                          className="card-img-top mx-auto"
                          style={{ width: "18rem", height: "18rem" }}
                          alt={product.name}
                        />
                        <div className="card-body">
                          <h5 className="card-title text-info">
                            {product.name}
                          </h5>
                          <p className="card-text">{product.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
