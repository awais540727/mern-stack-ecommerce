import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
const ProductDetail = () => {
  const [cart, setCart] = useCart();
  const params = useParams();

  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProducts] = useState();
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}api/v1/product/single-product/${params.slug}`
      );
      setProduct(data?.product);
      console.log(data.product._id, data.product.category._id);
      RelatedProducts(data.product._id, data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getSingleProduct();
  }, [params?.slug]);

  // get related products

  const RelatedProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
      console.log(relatedProduct);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      {/* <h4>{product.name}</h4> */}
      <div className="row container mt-3">
        <div className="col-md-6">
          <img
            src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${product._id}`}
            className="card-img-top mx-auto rounded"
            style={{ width: "33rem", height: "30rem" }}
            alt={product.name}
          />
        </div>
        <div className="col-md-6">
          <h3 className="text-center">Product Details</h3>
          <h4>Name: {product.name}</h4>
          <h4>Description: {product.description}</h4>
          <h4>Price: ${product.price}</h4>
          <h4>Category: {product?.category?.name}</h4>
          <h4>Product in Stock: {product.quantity}</h4>
          <button
            className="btn btn-success ms-2"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Product Added to Cart");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="row">
        <h5 className="mt-3 text-center">Related Products</h5>
        <div className="d-flex flex-wrap">
          {relatedProduct &&
            relatedProduct.map((product) => (
              <Link
                className="text-decoration-none"
                to={`/product/${product.slug}`}
              >
                <div
                  className="card m-2"
                  key={product._id}
                  style={{ width: "15rem" }}
                  //   onClick={() => navigate(`/product/${product.slug}`)}
                >
                  <img
                    src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${product._id}`}
                    className="card-img-top mx-auto rounded"
                    style={{ width: "15rem", height: "12rem" }}
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-info">{product.name}</h5>
                    <strong>
                      <p className="card-text">Rs. {product.price}</p>
                    </strong>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
