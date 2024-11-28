import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../../api";
import { CategoryForm } from "./CategoryForm";

import { useEffect, useState } from "react";

const UpdateCatForm = () => {
  const { id } = useParams();

  const [categories, setCategories] = useState([]);
  const [error, setError] = useState({});
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    API_URL.get(`/categories/${id}`).then((res) => {
      setCategories(res.data);
      console.log(res.data);
      setLoaded(true);
    });
  }, [id]);

  const updateCategory = (updatedData) => {
    API_URL.put(`/categories/${id}/edit`, updatedData)
      .then((res) => {
        setCategories(res.data);
        navigate(`/categories`);
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response);

        setError({ message: "Name must Not be Empty" });
        console.log(error);
      });
  };
  return (
    <div>
      {loaded ? (
        <CategoryForm
          CategorySelected={categories}
          OnSubmitProp={updateCategory}
          titleLabel="Update Category"
          buttonLabel="Update category"
          errorLabel="Error"
          errorMessage
          errors={error}
        />
      ) : (
        <h1>Loading Product...</h1>
      )}
    </div>
  );
};

export default UpdateCatForm;
