import React from "react";
import axiosInstance from "../api";
import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { useParams, useNavigate } from "react-router-dom";

const UpdateForm = () => {
  const { id } = useParams();
  const [products, setProducts] = useState({});
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/products/${id}`)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
        setLoaded(true);
        return axiosInstance.get("/categories");
      })
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
        setLoaded(true);
      });
  }, [id]);

  const updateProduct = (updatedData) => {
    axiosInstance
      .put(`/products/${id}/edit`, updatedData)
      .then((res) => {
        setProducts(res.data);
        if (!errors) {
          navigate(`/products`);
        }

        console.log(res);
      })
      .catch((err) => {
        console.log("error", err);
        setErrors(err.response.data);
      });
  };
  useEffect(() => {
    console.log("Updated errors: ", errors);
  }, [errors]); //
  return (
    <div>
      {loaded ? (
        <ProductForm
          categories={categories}
          OnSubmitProp={updateProduct}
          productSelected={products}
          titleLabel="Edit Product"
          buttonLabel="Update Product"
          errors={errors}
        />
      ) : (
        <h1>Loading Product...</h1>
      )}
    </div>
  );
};

export default UpdateForm;
