import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    getAllCategory();
  }, []);

  // Create product function
  const handleCreate = async (e) => {
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
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success(data.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"create product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9 col-md-9">
            <h2>Create Product</h2>
            {/* Product Name */}
            <form onSubmit={handleCreate}>
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
                  {photo && (
                    <div className="mb-3">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Product Photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  {/* <input
                  type="text"
                  placeholder="Enter product Description"
                  className="form-control"
                  value={description}
                  onChange={(e) => SetDescription(e.target.value)}
                /> */}
                  <textarea
                    type="text"
                    placeholder="Enter product Description"
                    className="form-control h-200"
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
                  >
                    <Option value="1">Yes</Option>
                    <Option value="0">No</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary" type="submit">
                    Create Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
