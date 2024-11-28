import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../api";
import ProductList from "./product/ProductList";
import ProductForm from "./product/ProductForm";

const Main = () => {
  // state variables declaration
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); // Current page index
  const [pageSize, setPageSize] = useState(5); // Number of rows per page
  const [totalRecords, setTotalRecords] = useState(0); //number of records
  const [error, setError] = useState({});

  // function to fetch products from API with pagination

  useEffect(() => {
    console.log(process.env.REACT_APP_API_USERNAME);
    console.log(process.env.REACT_APP_API_PASSWORD);
    axiosInstance
      .get(`/products-pagination?pageNumber=${pageNumber}&pageSize=${pageSize}`)
      .then((res) => {
        console.log(res.data);
        setProducts(res.data.content);
        setTotalRecords(res.data.totalElements);
        return axiosInstance.get("/categories");
      })
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  }, [pageNumber, pageSize, totalRecords]);
  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  const handleSubmit = (data) => {
    axiosInstance
      .post("/products/new", data)
      .then((res) => {
        console.log(res.data);
        setProducts((prevProducts) => [...prevProducts, res.data]);
        setTotalRecords(res.data.totalElements);
        console.log(products);
      })
      .catch((err) => {
        console.log(err);
        const errorResponse = err.response.data.errors; // get errors from response

        const errorObj = {};
        for (const key of Object.keys(errorResponse)) {
          errorObj[errorResponse[key].field] =
            errorResponse[key].defaultMessage;
        }

        setError(errorObj);
        console.log(errorObj);
      });
  };

  return (
    <div>
      <ProductForm
        categories={categories}
        OnSubmitProp={handleSubmit}
        titleLabel="Add New Product"
        buttonLabel="Add Product"
        errorLabel="Error"
        productSelected={{
          name: "",
          description: "",
          price: 0.0,
          categoryId: "",
        }}
        errorMessage
        errors={error}
      />

      <ProductList
        products={products}
        setProducts={setProducts}
        categories={categories}
        pageNumber={pageNumber}
        pageSize={pageSize}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        totalRecords={totalRecords}
        setTotalRecords={setTotalRecords}
      />
    </div>
  );
};

export default Main;
