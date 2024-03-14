import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
const { Option } = Select;
const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");

  const [auth, setAuth] = useAuth();
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(false);

  // GETTING USER ORDERS

  const getUserOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}api/v1/auth/all-admin-orders`
      );
      setLoading(false);
      setOrders(data);
      console.log(orders);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (auth?.token) getUserOrders();
  }, [orders?.length]);

  const handleChangeStatus = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}api/v1/product/change-status/${orderId}`,
        { status: value }
      );
      getUserOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"all users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9 col-md-9">
            <h2>All Orders</h2>

            {!loading ? (
              orders?.map((order, i) => (
                <>
                  <table className="table shadow w-80">
                    <thead key={order._id}>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) =>
                              handleChangeStatus(order._id, value)
                            }
                            defaultValue={order.status}
                          >
                            {status?.map((value, i) => (
                              <Option key={i} value={value}>
                                {value}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{order?.buyer?.name}</td>
                        <td>{moment(order?.createdAt).fromNow()}</td>
                        <td>
                          {order?.payment?.success ? "Success" : "Failed"}
                        </td>
                        <td>{order?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {/* {order?.products?.map((product) => (
                      <div
                        className="row card p-3 mb-2 flex-row"
                        key={product._id}
                      >
                        <div className="col-md-4">
                          <img
                            src={`${process.env.REACT_APP_API}api/v1/product/product-photo/${product._id}`}
                            className="card-img-top mx-auto rounded pointer"
                            style={{ width: "7rem", height: "7rem" }}
                            alt={product.name}
                            onClick={() => navigate(`/product/${product.slug}`)}
                          />
                        </div>
                        <div className="col-md-4 flex-row">
                          <h5
                            className="pointer"
                            onClick={() => navigate(`/product/${product.slug}`)}
                          >
                            {product.name}
                          </h5>
                          <div className="col-md-4 flex-row">
                            <h5>Price : {product.price}</h5>
                          </div>
                        </div>
                      </div>
                    ))} */}
                  </div>
                </>
              ))
            ) : (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
