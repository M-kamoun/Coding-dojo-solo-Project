import React, { useEffect, useState } from "react";
import OrderForm from "./OrderForm";
import OrdersList from "./OrdersList";
import axiosInstance from "../api";

const Orders = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); // Current page index
  const [pageSize, setPageSize] = useState(5); // Number of rows per page
  const [totalRecords, setTotalRecords] = useState(0); //number of records

  // get all suppliers
  useEffect(() => {
    axiosInstance
      .get("/suppliers")
      .then((res) => {
        console.log(res.data);
        setSuppliers(res.data);
      })
      .catch((err) => console.log(err));
    axiosInstance
      .get("/products")
      .then((res) => {
        console.log(res.data.data);
        setProducts(res.data.data);
      })
      .catch((err) => console.log(err));

    axiosInstance
      .get(`/orders-pagination?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.content);
        setTotalRecords(res.data.totalElements);
        return axiosInstance.get("/categories");
      });
  }, [pageNumber, pageSize]);

  const handleSubmit = (orderData) => {
    axiosInstance
      .post("/orders/new", orderData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <OrderForm
        titleLabel="Add New order"
        suppliers={suppliers}
        products={products}
        buttonLabel={"Add Order"}
        OnSubmitProp={handleSubmit}
      />
      <OrdersList />
    </div>
  );
};

export default Orders;
