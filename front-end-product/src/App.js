import "./App.css";

import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Main from "./components/Main";
import Supplier from "./components/supplier/Supplier";

import UpdateForm from "./components/product/UpdateForm";

import Categories from "./components/category/Categories";

import UpdateCatForm from "./components/category/UpdateCatForm";
import UpdateSuppForm from "./components/supplier/UpdateSuppForm";
import Orders from "./components/order/Orders";
import Registration from "./components/Registration";

import LoginForm from "./components/LoginForm";
function App() {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<Main />} />
        <Route path="/suppliers" element={<Supplier />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/edit/:id" element={<UpdateForm />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="categories/edit/:id" element={<UpdateCatForm />} />
        <Route path="suppliers/edit/:id" element={<UpdateSuppForm />} />
      </Routes>
    </div>
  );
}

export default App;
