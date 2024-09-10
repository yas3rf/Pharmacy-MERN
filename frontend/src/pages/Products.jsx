import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const [productsData, setProductsData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await axios.get("http://localhost:4000/api/products");
        setProductsData(products.data.products);
      } catch (error) {
        toast.error("Failed to fetch product data");
        console.log(error);
      }
    };
    fetchData();
  }, [refresh]);

  const deleteProduct = async (id) => {
    try {
      await axios
        .delete(`http://localhost:4000/api/products/${id}`)
        .then(() => {
          toast.success("Product Deleted Successfully");
          setRefresh((prev) => !prev);
        });
    } catch (error) {
      toast.error(error.response.message);
    }
  };

  const editProduct = (data) => {
    console.log(data, "sent");
    navigateTo("/products/edit", { state: data });
  };

  return (
    <div className="form-contaier m-3 w-100 p-5">
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr className="text-center">
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>DESCRIPTION</th>

              <th>PRICE</th>
              <th>STOCK</th>
              <th>BARCODE</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {productsData &&
              productsData.map((p, index) => {
                return (
                  <tr key={index}>
                    <td>{p.name}</td>
                    <td>{p.category}</td>
                    <td>{p.desc}</td>
                    <td>{p.price}</td>
                    <td>{p.quantity}</td>
                    <td>{p.barcode}</td>
                    <td>
                      <a
                        role="button"
                        className="link-warning"
                        onClick={() => {
                          editProduct(p);
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
                          deleteProduct(p._id);
                        }}
                      >
                        <i className="bi bi-trash"></i>
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
