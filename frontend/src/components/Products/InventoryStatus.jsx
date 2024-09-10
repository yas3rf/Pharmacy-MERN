import React, { useEffect, useState } from "react";
import axios from "axios";

const InventoryStatus = ({ data }) => {
  const products = data.products;
  const inventoryValue = data.totalInventoryValue;
  const totalStock = data.totalStock;

  return (
    <div className="dashboard-section">
      <div className="scrollable-section">
        <h3>Inventory Status</h3>
        <div className="card mb-2">
          <div className="card-body">
            <h5 className="card-title">Stock Status</h5>

            <p className="card-text">
              Total Stock in Inventory:{" "}
              <span className="text-success">{totalStock}</span>
            </p>
            <p className="card-text">
              Total Stock Value:{" "}
              <span className="text-success">{inventoryValue}</span>
            </p>
          </div>
        </div>
        <table className="table table-hover">
          <thead>
            <tr className="text-center">
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>DESCRIPTION</th>
              <th>PRICE</th>
              <th>STOCK</th>
            </tr>
          </thead>

          {products &&
            products.map((p) => {
              return (
                <tbody>
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>{p.desc}</td>
                    <td>{p.price}</td>
                    <td>{p.quantity}</td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
    </div>
  );
};

export default InventoryStatus;
