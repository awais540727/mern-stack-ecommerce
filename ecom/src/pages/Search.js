import React from "react";
import Layout from ".././components/layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const Search = () => {
  const [cart, setCart] = useCart();

  const navigate = useNavigate();
  const [values] = useSearch();
  const { results } = values;
  return (
    <Layout title={"search results"}>
      <div className="container">
        <div className="text-center">
          <h3>Search Results</h3>
        </div>
        <h6 className="ms-2">
          {results
            ? `Found ${results.length} results`
            : "No such Product Found"}
        </h6>
        <div className="d-flex flex-wrap">
          {results &&
            results.map((product) => (
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
      </div>
    </Layout>
  );
};

export default Search;
