import axios from "axios";
import React, { useEffect, useState } from "react";

const Alert = ({ data }) => {
  return (
    <div>
      <div className="dashboard-section">
        <h3>Notifications & Alerts</h3>
        {data &&
          data.map((d, index) => {
            return (
              <div key={index} className="flex">
                <h4>{d.name}:</h4>
                <p className="text-danger">Available: {d.quantity}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Alert;
