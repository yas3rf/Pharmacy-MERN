import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Invoice from "../components/Printables/Invoice";

const Sales = () => {
  const [barcode, setBarcode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [product, setProduct] = useState("");
  const [name, setName] = useState("");
  const [saleData, setSaleData] = useState("");
  const [cart, setCart] = useState("");

  const generateRandomNumber = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (barcode) {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/products/barcode/${barcode}`
          );
          setName(response.data.product.name);
          setProduct(response.data.product);
        } catch (error) {
          // toast.error("Couldn't fetch product");
          console.log(error);
        }
      }
    };
    fetchData();
  }, [barcode]);

  const addToCart = () => {
    if (!product) {
      toast.error("No product selected");
      return;
    }

    // Add the selected product to the cart
    const newCartItem = {
      productId: product._id,
      name: product.name,
      quantity,
      discount,
      price: product.price,
      totalPrice: product.price * quantity - discount,
    };
    console.log(newCartItem);

    setCart([...cart, newCartItem]);
    toast.success(`${product.name} added to cart`);
    // Reset form fields
    setBarcode("");
    setProduct(null);
    setQuantity(1);
    setDiscount(0);
  };

  const submitSale = async () => {
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    try {
      const invNumber = generateRandomNumber();
      const response = await axios.post("http://localhost:4000/api/sales", {
        cart,
      });
      setSaleData({
        invoiceNumber: invNumber,
        cart,
        totalAmount: cart.reduce((acc, item) => acc + item.totalPrice, 0),
      });
      console.log(setSaleData);
      toast.success(response.data.message);
      setCart([]); // Clear the cart after successful sale
    } catch (error) {
      toast.error("Could not create sale");
      console.log(error);
    }
  };

  return (
    <div className="form-container m-3">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addToCart();
        }}
        className="form"
      >
        <div className="form-group m-5">
          <input
            autoFocus
            type="text"
            value={barcode}
            placeholder="Barcode"
            className="form-control mb-3"
            onChange={(e) => {
              setBarcode(e.target.value);
            }}
          />
          {product && (
            <div>
              <div>
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  value={name}
                  readOnly
                  className="form-control mb-3"
                />
              </div>
              <div>
                <label htmlFor="">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  placeholder="Quantity"
                  className="form-control mb-3"
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="">Discount</label>
                <input
                  type="number"
                  value={discount}
                  placeholder="Discount"
                  className="form-control mb-3"
                  onChange={(e) => {
                    setDiscount(e.target.value);
                  }}
                  min="0"
                />
              </div>
              <button type="submit" className="btn btn-secondary">
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </form>

      {cart.length > 0 && (
        <div className="cart m-5">
          <h3>Cart</h3>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - {item.quantity} x {item.price} = {item.totalPrice}{" "}
                (Discount: {item.discount})
              </li>
            ))}
          </ul>
          <button className="btn btn-primary" onClick={submitSale}>
            Submit Sale
          </button>
        </div>
      )}
      {saleData && <Invoice saleData={saleData} />}
    </div>
  );
};

export default Sales;
