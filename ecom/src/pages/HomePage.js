import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Price } from "../components/PriceData";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

// import { useAuth } from "../context/auth";

const HomePage = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radioPrice, setRadioPrice] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Getting all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://mern-stack-ecommerce-kappa.vercel.app/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Load More
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}api/v1/product/product-list/${page}`
      );
      setLoading(false);
      if (data?.success) {
        setProducts([...products, ...data?.products]);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Load More
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}api/v1/category/all-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Filter Products
  const getAllFilterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}api/v1/product/product-filter`,
        { checked, radioPrice }
      );
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}api/v1/product/products-count`
      );
      console.log(data?.total);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);
  useEffect(() => {
    if (!checked.length || !radioPrice.length) getAllProducts();
  }, [checked.length, radioPrice.length]);
  useEffect(() => {
    if (checked.length || radioPrice.length) getAllFilterProducts();
  }, [checked, radioPrice]);

  const handleCheck = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  return (
    <Layout>
      {/* {JSON.stringify(checked, null, 4)} */}
      <div className="container-fluid">
        <div className="row mt-4">
          <div className="col-sm-12 col-md-3 col-lg-3 col-12">
            <h2>Filters</h2>
            <h3 className="m-1">By Categories</h3>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h3 className="m-1">By Price</h3>
            <Radio.Group onChange={(e) => setRadioPrice(e.target.value)}>
              {Price?.map((price) => (
                <div key={price.id}>
                  <Radio value={price.array}>{price.name}</Radio>
                </div>
              ))}
            </Radio.Group>
            {checked.length > 0 || radioPrice.length > 0 ? (
              <div className="d-flex flex-column mt-3">
                <button
                  className="btn btn-danger"
                  onClick={() => window.location.reload()}
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="col-sm-12 col-md-9 col-lg-9 col-12">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
              {products &&
                products.map((product) => (
                  <div
                    className="card m-2"
                    key={product._id}
                    style={{ width: "18rem" }}
                  >
                    <img
                      src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${product._id}`}
                      className="card-img-top mx-auto"
                      style={{ width: "18rem", height: "15rem" }}
                      alt={product.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-info">{product.name}</h5>
                      <p className="card-text">
                        {product.description.substring(0, 30)}
                      </p>
                      <p className="card-text">$ {product.price}</p>
                      <button
                        className="btn btn-primary ms-1"
                        onClick={() => navigate(`/product/${product.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-success ms-2"
                        onClick={() => {
                          setCart([...cart, product]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, product])
                          );
                          toast.success("Product added to Cart");
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    <div class="spinner-border text-white" role="status"></div>
                  ) : (
                    "Load more"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
