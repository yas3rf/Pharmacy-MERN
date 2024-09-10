import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ProductsList = () => {
  const location = useLocation();
  const data = location.state;

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const navigateTo = useNavigate();

  useEffect(() => {
    if (data) {
      setName(data.name);
      setCategory(data.category);
      setDesc(data.desc);
      setPrice(data.price);
      setQuantity(data.quantity);
    }
  }, [data]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = { name, category, desc, price, quantity };
      await axios.put(
        `http://localhost:4000/api/products/${data._id}`,
        updatedProduct
      );
      toast.success("Product updated successfully");
      navigateTo("/products");
    } catch (error) {
      toast.error("Could not update product");
      console.error("Update error:", error);
    }
  };

  return (
    <div className="form-section">
      <h2>Edit Product</h2>
      <form className="form" onSubmit={updateProduct}>
        <div className="form-group m-2">
          <label className="m-1" htmlFor="productname">
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
          <label className="m-1" htmlFor="category">
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
          <label className="m-1" htmlFor="price">
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
          <label className="m-1" htmlFor="quantity">
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
          <label className="m-1" htmlFor="desc">
            Description
          </label>
          <textarea
            placeholder="Description"
            className="form-control"
            value={desc}
            cols="30"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-secondary mt-4 ml-4 fs-5">
          UPDATE
        </button>
        <button
          type="button"
          onClick={() => navigateTo("/products")}
          className="btn btn-secondary mt-4 ml-4 fs-5"
        >
          BACK
        </button>
      </form>
    </div>
  );
};

export default ProductsList;
