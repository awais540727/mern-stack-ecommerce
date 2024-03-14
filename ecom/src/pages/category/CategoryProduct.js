import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function CategoryProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const [category, setCategory] = useState();
  const [products, setProducts] = useState([]);
  const getProductByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}api/v1/product/category-products/${params.slug}`
      );
      setCategory(data?.category);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProductByCategory();
  }, [params.slug]);
  console.log(products);
  return (
    <Layout>
      <h3 className="text-center text-uppercase p-2 mt-3">
        Category - {category?.name}
      </h3>
      <div className="container">
        {products?.length > 0 ? (
          <>
            <div className="ms-2">Found {products?.length} products</div>
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
                      <button className="btn btn-success ms-2">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <Link className="text-center text-uppercase" to={"/categories"}>
            No such Product found in "{category?.name}" Category please choose
            related category
          </Link>
        )}
      </div>
    </Layout>
  );
}

export default CategoryProduct;
