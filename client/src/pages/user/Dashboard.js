import React from "react";
import Layout from "../../components/layout/Layout.js";
import UserMenu from "../../components/layout/UserMenu.js";
import { useAuth } from "../../context/auth.js";
import "../../styles/DashboardStyles.css"; // Import the new CSS file

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container-fluid dashboard-page m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card dashboard-card w-75 p-4">
              <h3 className="dashboard-item">Name: {auth?.user?.name}</h3>
              <h3 className="dashboard-item">Email: {auth?.user?.email}</h3>
              <h3 className="dashboard-item">Address: {auth?.user?.address}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
