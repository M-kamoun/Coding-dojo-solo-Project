import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import PrivateRoute from "./components/context/PrivateRoute";
import Products from "./components/product/Products";
import Login from "./components/Login";
import Navbar from "./components/NavBar";
import Register from "./components/Register";
import RegistrationSuccess from "./components/RegistrationSucces";
import Supplier from "./components/supplier/Supplier";
import Orders from "./components/order/Orders";
import UpdateForm from "./components/product/UpdateForm";
import Categories from "./components/category/Categories";
import UpdateSuppForm from "./components/supplier/UpdateSuppForm";
import UpdateCatForm from "./components/category/UpdateCatForm";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Route publique */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-success" element={<RegistrationSuccess />} />

        {/* Routes protégées */}
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="/suppliers"
          element={
            <PrivateRoute>
              <Supplier />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <UpdateForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          }
        />
        <Route
          path="categories/edit/:id"
          element={
            <PrivateRoute>
              <UpdateCatForm />
            </PrivateRoute>
          }
        />
        <Route
          path="suppliers/edit/:id"
          element={
            <PrivateRoute>
              <UpdateSuppForm />
            </PrivateRoute>
          }
        />

        {/* Redirection par défaut */}
        <Route path="*" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
