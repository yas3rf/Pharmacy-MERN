import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditSuppliers = () => {
  const location = useLocation();
  const data = location.state;
  const navigateTo = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setEmail(data.contactInfo?.email || "");
      setPhone(data.contactInfo?.phone || "");
      setAddress(data.contactInfo?.address || "");
    }
  }, [data]);

  const updateSupplier = async (e) => {
    e.preventDefault();
    try {
      const updatedData = { name, email, phone, address };
      const response = await axios.put(
        `http://localhost:4000/api/suppliers/${data._id}`,
        updatedData // Send updatedData directly, without wrapping it in another object
      );
      toast.success(response.data.message);
      navigateTo("/suppliers");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="form-section">
      <h2>Edit Supplier</h2>
      <form className="form" onSubmit={updateSupplier}>
        <div className="form-group m-2">
          <label className="m-1" htmlFor="suppliername">
            Supplier Name
          </label>
          <input
            type="text"
            className="form-control"
            id="suppliername"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group m-2">
          <label className="m-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group m-2">
          <label className="m-1" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group m-2">
          <label className="m-1" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-secondary mt-4 ml-4 fs-5">
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default EditSuppliers;
