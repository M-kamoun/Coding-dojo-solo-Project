import React from "react";
import { useState, useEffect } from "react";
import API_URL from "../../api";
import SupplierList from "./SupplierList";
import SupplierForm from "./SupplierForm";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState({});
  const [pageNumber, setPageNumber] = useState(0); // Current page index
  const [pageSize, setPageSize] = useState(5); // Number of rows per page
  const [totalRecords, setTotalRecords] = useState(0); //number of records

  useEffect(() => {
    API_URL.get(
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
    API_URL.post("/suppliers/new", data)
      .then((res) => {
        console.log(res.data);
        setSuppliers((prev) => [...prev, res.data]);
        setTotalRecords(res.data.totalElements);
        console.log(suppliers);
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

  const handleDelete = (id) => {
    API_URL.delete(`/suppliers/${id}/delete`).then((res) => {
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
