import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../api";
import SupplierList from "./SupplierList";
import SupplierForm from "./SupplierForm";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState({});
  const [pageNumber, setPageNumber] = useState(0); // Current page index
  const [pageSize, setPageSize] = useState(5); // Number of rows per page
  const [totalRecords, setTotalRecords] = useState(0); //number of records

  useEffect(() => {
    axiosInstance
      .get(
        `/suppliers-pagination?pageNumber=${pageNumber}&pageSize=${pageSize}`
      )
      .then((res) => {
        console.log(res.data.content);
        setSuppliers(res.data.content);
        setTotalRecords(res.data.totalElements);
      })

      .catch((err) => console.log(err));
  }, [pageNumber, pageSize, totalRecords]);

  const handleChangePage = (event, newPage) => {
    setPageNumber(newPage);
  };

  const handleSubmit = (data) => {
    axiosInstance
      .post("/suppliers/new", data)
      .then((res) => {
        console.log(res.data);
        setSuppliers((prev) => [...prev, res.data]);
        setTotalRecords(res.data.totalElements);
        console.log(suppliers);
      })
      .catch((err) => {
        console.log(err);
        const errorResponse = err.response.data; // get errors from response

        setError(errorResponse);
      });
  };
  useEffect(() => {
    console.log("Updated errors: ", error);
  }, [error]); //
  const handleDelete = (id) => {
    axiosInstance.delete(`/suppliers/${id}/delete`).then((res) => {
      console.log(res.data);
      setSuppliers(suppliers.filter((suppliers) => suppliers.id !== id));
      setTotalRecords((prevTotal) => prevTotal - 1);
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  return (
    <div>
      <SupplierForm
        titleLabel="Add new Supplier"
        buttonLabel="Add Supplier"
        errorLabel="Error"
        handleChange={handleSubmit}
        OnSubmitProp={handleSubmit}
        supplierSelected={{
          name: "",
          address: "",
          email: "",
        }}
        errorMessage
        errors={error}
      />
      <SupplierList
        suppliers={suppliers}
        pageNumber={pageNumber}
        pageSize={pageSize}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        totalRecords={totalRecords}
        setTotalRecords={setTotalRecords}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Supplier;
