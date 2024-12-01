import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API_URL from "../api";
import SupplierForm from "./SupplierForm";
const UpdateSuppForm = () => {
  const { id } = useParams();
  const [suppliers, setSuppliers] = useState({});

  const [errors, setErrors] = useState({});
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API_URL.get(`/suppliers/${id}`).then((res) => {
      setSuppliers(res.data);
      console.log(res.data);
      setLoaded(true);
    });
  }, [id]);

  const updateSupplier = (updatedData) => {
    API_URL.put(`/suppliers/${id}/edit`, updatedData)
      .then((res) => {
        setSuppliers(res.data);
        navigate(`/suppliers`);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);
        const errorResponse = err.response.data; // get errors from response

        setErrors(errorResponse);
      });
  };
  return (
    <div>
      {loaded ? (
        <SupplierForm
          supplierSelected={suppliers}
          OnSubmitProp={updateSupplier}
          titleLabel="Update Supplier"
          buttonLabel="Update Supplier"
          errorLabel="Error"
          errorMessage
          errors={errors}
        />
      ) : (
        <h1>Loading Product...</h1>
      )}
    </div>
  );
};

export default UpdateSuppForm;
