import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../api";
import CategoriesList from "./CategoriesList";
import { CategoryForm } from "./CategoryForm";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState({});

  useEffect(() => {
    axiosInstance
      .get(`/categories`)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })

      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (data) => {
    axiosInstance
      .post("/categories/new", data)
      .then((res) => {
        console.log(res.data);
        setCategories((prevCategories) => [...prevCategories, res.data]);
        setError({});
        console.log(categories);
      })
      .catch((err) => {
        console.log(err);

        setError(err.response.data);
        console.log(error);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategories({ ...categories, [name]: value });
  };

  const handleDelete = (id) => {
    axiosInstance.delete(`/categories/${id}/delete`).then((res) => {
      console.log(res.data);
      setCategories(categories.filter((category) => category.id !== id));
    });
  };

  return (
    <div>
      <CategoryForm
        CategorySelected={{ name: "" }}
        OnSubmitProp={handleSubmit}
        titleLabel="Add Category"
        buttonLabel="Add category"
        errorLabel="Error"
        errorMessage
        handleChange={handleChange}
        errors={error}
      />
      <CategoriesList categories={categories} handleDelete={handleDelete} />
    </div>
  );
};

export default Categories;
