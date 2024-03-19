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
    <Layout title={"all orders"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9 col-md-9">
            <h2 className="mb-4">All Orders</h2>
            {!loading ? (
              orders?.map((order, i) => (
                <div key={order._id} className="mb-4">
                  <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                      Order #{i + 1}
                    </div>
                    <div className="card-body">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Status</th>
                            <th scope="col">Buyer</th>
                            <th scope="col">Date</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
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
                              {order?.payment?.success ? (
                                <span className="text-success">Success</span>
                              ) : (
                                <span className="text-danger">Failed</span>
                              )}
                            </td>
                            <td>{order?.products?.length}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
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
