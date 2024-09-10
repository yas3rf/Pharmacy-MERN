import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import SaleSummary from "../components/SaleSummary";
import InventoryStatus from "../components/Products/InventoryStatus";
import Alert from "../components/Alert";

const Dashboard = () => {
  const [productsData, setProductsData] = useState({});
  const [saleData, setSaleData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lowStock, setLowStock] = useState([]);

  const startDate = "2024-01-01";
  const endDate = "2024-12-25";
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        //get products reports
        const productRes = await axios.get(
          "http://localhost:4000/api/products/inventory/report"
        );

        setProductsData(productRes.data.report);

        // console.log(productsData);

        const saleRes = await axios.get(
          `http://localhost:4000/api/sales/report?startDate=${startDate}&endDate=${endDate}`
        );

        setSaleData(saleRes.data.report);

        const alertRes = await axios.get(
          "http://localhost:4000/api/alert/stock-alerts"
        );
        setLowStock(alertRes.data.lowStockProducts);

        setLoading(false);
      } catch (err) {
        setError(err);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="dashboard p-3">
        <h2>Dashboard</h2>
        <SaleSummary data={saleData} />
        <InventoryStatus data={productsData} />
        {lowStock ? <Alert data={lowStock} /> : null}
      </div>
    </>
  );
};

export default Dashboard;
