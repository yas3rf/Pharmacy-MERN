import React from "react";
import "./invoice.css";
import { useNavigate } from "react-router-dom";

const Invoice = ({ saleData }) => {
  const navigateTo = useNavigate();

  const printInvoice = () => {
    window.print();

    navigateTo("/sales");
  };

  return (
    <>
      <div id="invoice" className="container-fluid m-3">
        <h2>Pharmacy Invoice</h2>
        <p>Date: {new Date().toLocaleDateString()}</p>
        <p>Invoice Number: {saleData.invoiceNumber}</p>
        <h2>Items</h2>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {saleData.cart.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.discount}</td>
                <td>{item.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3 className="mt-4">Total Amount: {saleData.totalAmount}</h3>

        <h3 className="my-5">Thank you for your purchase!</h3>
      </div>
      <button onClick={printInvoice} className="btn btn-success w-100">
        Print Invoice
      </button>
    </>
  );
};

export default Invoice;
