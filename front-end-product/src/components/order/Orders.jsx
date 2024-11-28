import React, { useEffect, useState } from "react";
import OrderForm from "./OrderForm";
import OrdersList from "./OrdersList";
import API_URL from "../../api";

const Orders = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  // get all suppliers
  useEffect(() => {
    API_URL.get("/suppliers")
      .then((res) => {
        console.log(res.data);
        setSuppliers(res.data);
      })
      .catch((err) => console.log(err));
    API_URL.get("/products")
      .then((res) => {
        console.log(res.data);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <OrderForm
        titleLabel="Add New order"
        suppliers={suppliers}
        products={products}
      />
      <OrdersList />
    </div>
  );
};

export default Orders;
