import { toast } from "react-toastify";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchProduct = () => {
  const [bar, setBar] = useState("");
  const [responseData, setResponseData] = useState("");

  const navigateTo = useNavigate();
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:4000/api/products/barcode/${bar}`
      );

      setResponseData(response.data.product);
      setBar("");

      console.log(responseData.price);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleEdit = (data) => {
    console.log(data, "sent");
    navigateTo("/products/edit", { state: data });
  };

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`http://localhost:4000/api/products/${id}`)
        .then(() => {
          toast.success("Product Deleted Successfully");
          navigateTo("/");
        });
    } catch (error) {
      toast.error(error.response.message);
    }
  };

  return (
    <div className="conatainer">
      <div className="m-3 form-section w-100">
        <h2>Search</h2>
        <hr />
        <form action="form" onSubmit={handleSearch}>
          <label className="m-1" for="Barcode">
            Barcode
          </label>
          <input
            type="text"
            className="form-control"
            id="Barcode"
            placeholder="Barcode"
            value={bar}
            onChange={(e) => setBar(e.target.value)}
          />
          <button type="submit" className="btn btn-secondary mt-4 ml-4 fs-5 ">
            Search
          </button>
        </form>
      </div>

      {responseData ? (
        <div className="m-2 ">
          <div className="form-section m-2">
            <h3>FOUND PRODUCT</h3>
            <table className="inventory-table">
              <tr>
                <th>NAME</th>
                <th>CATERGORY</th>
                <th>DESCRIPTION</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>BARCODE</th>
              </tr>
              <tr>
                <td>{responseData.name}</td>
                <td>{responseData.category}</td>
                <td>{responseData.desc}</td>
                <td>{responseData.price}</td>
                <td>{responseData.quantity}</td>
                <td>{responseData.barcode}</td>
                <td>
                  {" "}
                  <a
                    role="button"
                    className="link-warning"
                    onClick={() => {
                      handleEdit(responseData);
                    }}
                  >
                    <i className="bi bi-pencil-square"></i>
                  </a>
                </td>
                <td>
                  <a
                    role="button"
                    className="link-danger"
                    onClick={() => {
                      handleDelete(responseData._id);
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </a>
                </td>
              </tr>
            </table>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchProduct;
