import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState("");
  const [name, setName] = useState("");
  const [photo, SetPhoto] = useState("");
  const [quantity, SetQuantity] = useState("");
  const [description, SetDescription] = useState("");

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
      toast.error("Something went wrong");
    }
  };

  // Get Single Product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}api/v1/product/single-product/${params.slug}`
      );
      if (data?.success) {
        setName(data.product.name);
        SetDescription(data.product.description);
        setPrice(data.product.price);
        setCategory(data.product.category._id);
        SetQuantity(data.product.quantity);
        setShipping(data.product.shipping);
        setId(data.product._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Update Product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      photo && productData.append("photo", photo);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      productData.append("category", category);
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}api/v1/product/update-product/${id}`,
        productData
      );
      console.log(data);
      if (data?.success) {
        toast.success(data.message);
        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getAllCategory();
    getSingleProduct();
  }, []);
  //   useEffect(() => {
  //     getSingleProduct();
  //   }, []);
  // Delete Product
  const handleDelete = async () => {
    console.log(id);
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        toast.success(data.message);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting Product");
    }
  };

  return (
    <Layout title={"single product and update"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9 col-md-9">
            <h2>Create Product</h2>
            {/* Product Name */}
            <form onSubmit={handleUpdate}>
              <div className="m-1 w-75">
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Enter product Name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                {/* category selector */}
                <Select
                  bordered={false}
                  placeholder="Please select Category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => setCategory(value)}
                  value={category}
                >
                  {categories?.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.name}
                    </Option>
                  ))}
                </Select>
                {/* photo uploaded */}
                <div className="mb-3 ">
                  <label className="btn btn-outline-secondary">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => SetPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                {/* photo uploaded preview */}
                <div className="text-center">
                  {photo ? (
                    <div className="mb-3">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Product Photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="mb-3">
                      <img
                        src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${id}`}
                        alt="Product Photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <textarea
                    type="text"
                    placeholder="Enter product Description"
                    className="form-control h-350"
                    value={description}
                    onChange={(e) => SetDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Enter product Quantity"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => SetQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    placeholder="Enter product Price"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    size="large"
                    placeholder="Select Shipping"
                    className="form-select mb-3"
                    onChange={(value) => setShipping(value)}
                    value={shipping ? "Yes" : "No"}
                  >
                    <Option value="1">Yes</Option>
                    <Option value="0">No</Option>
                  </Select>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-3 col-lg-3 col-6 mb-3">
                    {/* <div className="mb-3"> */}
                    <button className="btn btn-primary" type="submit">
                      Update Product
                    </button>
                    {/* </div> */}
                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-12 col-12 mb-3"></div>
                </div>
              </div>
            </form>
            <div className="flex-end">
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
