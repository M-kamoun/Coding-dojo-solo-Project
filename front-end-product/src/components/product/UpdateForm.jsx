import React from "react";
import API_URL from "../../api";
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
    API_URL.get(`/products/${id}`)
      .then((res) => {
        setProducts(res.data);
        console.log(res.data);
        setLoaded(true);
        return API_URL.get("/categories");
      })
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
        setLoaded(true);
      });
  }, [id]);

  const updateProduct = (updatedData) => {
    API_URL.put(`/products/${id}/edit`, updatedData)
      .then((res) => {
        setProducts(res.data);
        navigate(`/`);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        const errorResponse = err.response.data.errors; // get errors from response

        const errorObj = {};
        for (const key of Object.keys(errorResponse)) {
          errorObj[errorResponse[key].field] =
            errorResponse[key].defaultMessage;
        }

        setErrors(errorObj);
        console.log(errorObj);
      });
  };

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
