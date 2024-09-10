import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Suppliers = () => {
  const [supplier, setSupplier] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigateTo = useNavigate();

  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/suppliers");
        setSupplier(response.data.suppliers);
      } catch (error) {
        toast.error("Could not Fetch suppliers");
      }
    };
    fetchData();
  }, [refresh]);

  const addNewSupplier = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name,
        contactInfo: { email, phone, address },
      };
      const response = await axios.post(
        "http://localhost:4000/api/suppliers",
        data
      );
      toast.success(response.data.message);
      setRefresh(!refresh);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const editSupplier = async (data) => {
    navigateTo("/suppliers/edit", { state: data });
    console.log(data);
  };
  const deleteSupplier = async (id) => {
    try {
      const data = await axios.delete(
        `http://localhost:4000/api/suppliers/${id}`
      );
      toast.success(data.data.message);
      setRefresh(!refresh);
    } catch (error) {
      toast.error(error.data.data.message);
    }
  };

  return (
    <div className="container-fluid m-3">
      <div className="form-section m-2">
        <h2>ADD NEW SUPPLIER</h2>
        <hr />
        <form className="form" onSubmit={addNewSupplier}>
          <div className="form-group m-2">
            <label className="m-1">Supllier Name</label>
            <input
              type="text"
              className="form-control"
              id="productname"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group m-2">
            <label className="m-1">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group m-2">
            <label className="m-1">Phone</label>
            <input
              type="number"
              className="form-control"
              id="phone"
              placeholder="Enter Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group m-2">
            <label className="m-1">Address</label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-secondary mt-4 ml-4 fs-5  ">
            ADD
          </button>
        </form>
      </div>

      <div className="form-section m-2">
        <div className="scrollable-section">
          <h3>Suppliers</h3>
          <table className="table table-hover">
            <thead>
              <tr className="text-center">
                <th>NAME</th>
                <th>EMAIL</th>
                <th>PHONE</th>
                <th>ADDRESS</th>
              </tr>
            </thead>

            {supplier &&
              supplier.map((s, index) => {
                return (
                  <tbody>
                    <tr key={index}>
                      <td>{s.name}</td>
                      <td>{s.contactInfo.email}</td>
                      <td>{s.contactInfo.phone}</td>
                      <td>{s.contactInfo.address}</td>

                      <div>
                        <a
                          role="button"
                          className="link-warning m-2"
                          onClick={() => {
                            editSupplier(s);
                          }}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </a>

                        <a
                          role="button"
                          className="link-danger m-2"
                          onClick={() => {
                            deleteSupplier(s._id);
                          }}
                        >
                          <i className="bi bi-trash"></i>
                        </a>
                      </div>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Suppliers;
