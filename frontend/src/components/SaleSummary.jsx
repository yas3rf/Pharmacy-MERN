import React from "react";

const SaleSummary = ({ data }) => {
  return (
    <div className="dashboard-section">
      <h3>Sale summary</h3>
      <div className="scrollable-section">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">Sales</h3>

            <p className="card-text">
              Total Sale amount: {data.totalSalesAmount}
            </p>
            <p className="card-text">Total items sold: {data.totalItemsSold}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleSummary;
