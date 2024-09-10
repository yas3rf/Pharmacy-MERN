import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddNewProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [barcode, setBarcode] = useState("");
  const [supplier, setSupplier] = useState("");
  const [supplierData, setSupplierData] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/suppliers");
        setSupplierData(response.data.suppliers);
        console.log(supplierData);
      } catch (error) {
        toast.error("Could not Fetch suppliers");
      }
    };
    fetchData();
  }, []);

  const addNewProduct = async (e) => {
    e.preventDefault();

    try {
      const data = { name, category, desc, price, quantity, barcode, supplier };
      console.log(data);
      await axios
        .post("http://localhost:4000/api/products", data, {
          // withCredentials: true,
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          toast.success(res.data.message);
          setName("");
          setCategory("");
          setDesc("");
          setPrice("");
          setQuantity("");
          setBarcode("");
          setSupplier("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="form-section m-2">
      <h2>ADD NEW PRODUCT</h2>
      <hr />
      <form className="form" onSubmit={addNewProduct}>
        <div className="form-group m-2">
          <label className="m-1" for="productname">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="productname"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group m-2">
          <label className="m-1" for="category">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="form-group m-2">
          <label className="m-1" for="price">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group m-2">
          <label className="m-1" for="Quantity">
            Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="form-group m-2">
          <label className="m-1" for="Barcode">
            Barcode
          </label>
          <input
            type="text"
            className="form-control"
            id="Barcode"
            placeholder="Barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
        </div>
        <div className="form-group m-2">
          <label className="m-1" for="Barcode">
            Suppliers
          </label>
          <select
            onChange={(e) => {
              setSupplier(e.target.value);
            }}
            class="form-select"
            aria-label="Default select example"
          >
            <option selected disabled>
              Select Supplier
            </option>
            {supplierData &&
              supplierData.map((sd, index) => {
                return (
                  <option value={sd._id} key={index}>
                    {sd.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group m-2">
          <label className="m-1" for="Barcode">
            description
          </label>
          <textarea
            placeholder="Description"
            className="form-control"
            value={desc}
            cols="30"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-secondary mt-4 ml-4 fs-5  ">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddNewProduct;
