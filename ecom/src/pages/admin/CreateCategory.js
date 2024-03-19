import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/form/CategoryForm";
import { Modal } from "antd";
const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} ` + data.message);
        getAllCategory();
        setName("");
      } else toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // delete category
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}api/v1/category/delete-category/${id}`
      );
      if (data?.success) {
        toast.success(`Category ` + data.message);
        getAllCategory();
      } else toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}api/v1/category/all-category`
      );
      if (data.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  // update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      console.log(data?.message);
      if (data?.success) {
        toast.success(data.message);
        setVisible(false);
        setSelected(null);
        setUpdatedName("");
        getAllCategory();
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
  }, []);

  return (
    <Layout title={"create category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9 col-md-9">
            <h2>Manage category</h2>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((category) => (
                    <>
                      <tr>
                        <td key={category._id}>{category.name}</td>
                        <td>
                          <div className="d-grid gap-2 d-md-table">
                            <button
                              className="btn btn-primary mb-2 mb-md-0"
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(category.name);
                                setSelected(category);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(category._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              footer={null}
              open={visible}
              onCancel={() => setVisible(false)}
            >
              <CategoryForm
                handleSubmit={handleUpdate}
                value={updatedName}
                setValue={setUpdatedName}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
