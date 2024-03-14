import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";

const Users = () => {
  return (
    <Layout title={"all users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <AdminMenu />
          </div>
          <div className="col-lg-9 col-md-9">
            <h2>All users</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
