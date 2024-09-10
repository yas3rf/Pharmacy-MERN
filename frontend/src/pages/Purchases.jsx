import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Purchase = () => {
  const [product, setProduct] = useState(null);
  const [suppliers, setSuppliers] = useState("");
  const [quantity, setQuantity] = useState(null);
  const [productData, setProductData] = useState(null);
  const [purchasePrice, setPurchasePrice] = useState(null);
  const [purchaseData, setPurchaseData] = useState(null);
  const { refresh, setRefresh } = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products");
        setProductData(response.data.products);
        //get purchases
        const res = await axios.get("http://localhost:4000/api/purchases");
        setPurchaseData(res.data.purchases);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductChange = (e) => {
    const selectedProductId = e.target.value;
    const selectedProduct = productData.find(
      (product) => product._id === selectedProductId
    );

    setProduct(selectedProductId);
    setSuppliers(selectedProduct ? selectedProduct.supplier : "");
  };

  const addPurchase = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/purchases", {
        product,
        supplier: suppliers._id,
        quantity,
        purchasePrice,
      });

      setProduct(null);
      setSuppliers("");
      setQuantity(null);
      setPurchasePrice(null);
      setRefresh(!refresh);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="container-fluid">
      <div className="from-section m-3">
        <h3>Make Purachase</h3>
        <form onSubmit={addPurchase} className="form">
          <div className="form-group m-2">
            <label htmlFor="">Product:</label>
            <select className="form-select" onChange={handleProductChange}>
              <option selected disabled>
                Products
              </option>

              {productData &&
                productData.map((p, index) => {
                  return (
                    <option value={p._id} key={index}>
                      {p.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="form-group m-2">
            <label htmlFor="">Supplier:</label>
            <input
              type="text"
              className="form-control"
              value={suppliers.name}
              readOnly
            />
          </div>
          <div className="form-group m-2">
            <label htmlFor="">Quantity</label>
            <input
              className="form-control"
              type="number"
              value={quantity}
              placeholder="Qunatity"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="form-group m-2">
            <label htmlFor="">Price</label>
            <input
              className="form-control"
              type="number"
              value={purchasePrice}
              placeholder="Qunatity"
              onChange={(e) => setPurchasePrice(e.target.value)}
            />
          </div>
          <button className="btn btn-secondary mt-3 w-75" type="submit">
            ADD
          </button>
        </form>
      </div>
      <hr />
      <div className="from-section m-3">
        <h3>Purachases List</h3>
        <table className="table">
          <tr className="text-center">
            <th>Product</th>
            <th>Supllier</th>
            <th>Qunatity</th>
            <th>Price</th>
          </tr>
          {purchaseData &&
            purchaseData.map((pd, index) => {
              return (
                <tr key={index}>
                  <td>{pd.product.name}</td>
                  <td>{pd.supplier.name}</td>
                  <td>{pd.quantity}</td>
                  <td>{pd.purchasePrice}</td>
                </tr>
              );
            })}
        </table>
      </div>
    </div>
  );
};

export default Purchase;
