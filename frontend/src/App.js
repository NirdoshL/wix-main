import "react-toastify/dist/ReactToastify.css";
import { LoginForm, RegisterForm } from "./components";
import { AdminOrderList, Dashboard } from "./pages/index";
import ProtectedUserRoute from "./function/protectedUser";
import {
  GlobalHeader,
  GlobalError,
  Profile,
  UserHeader,
  UserHome,
  AdminHeader,
} from "./pages/Global";
import Cart from "./pages/User/cart";
import { ToastContainer } from "react-toastify";
import CheckSuccess from "./pages/Global/checkSuccess";
import { OrderList } from "./pages/SuperAdmin/orderList";
import ShowProducts from "./components/User/showProducts";
import ProtectedAdminRoute from "./function/protectedAdmin";
import { IsAuthenticated } from "./function/isAuthenticated";
import { Menu, MenuList, RestaurantPage } from "./pages/index";
import { EmployeeList } from "./pages/SuperAdmin/employeeList";
import ProtectedSuperRoute from "./function/ProtectedSuperAdmin";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  const Role = IsAuthenticated();
  console.log(Role);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Unauthorised User */}
          <Route
            path="/"
            element={
              Role === null ? (
                <LoginForm />
              ) : Role === "user" ? (
                <Navigate to={"/home"} />
              ) : Role === "admin" ? (
                <Navigate to={"/admin/order"} />
              ) : Role === "superadmin" ? (
                <Navigate to={"/dashboard"} />
              ) : (
                <LoginForm />
              )
            }
            exact
          />
          <Route path="/register" element={<RegisterForm />} exact />
          <Route path="/404" element={<GlobalError />} exact />
          <Route path="*" element={<GlobalError />} />

          {/* authorised user */}
          <Route element={<ProtectedUserRoute />}>
            <Route path="/" element={<UserHeader />}>
              <Route path="/home" element={<UserHome />} exact />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout-success" element={<CheckSuccess />} />
              <Route path="/restaurant/:name/:id" element={<ShowProducts />} />
              <Route path="/profile" element={<Profile />} exact />
            </Route>
          </Route>

          {/* superAdmin ROle */}
          <Route element={<ProtectedSuperRoute />}>
            <Route path="/" element={<GlobalHeader />}>
              <Route path="/dashboard" element={<Dashboard />} exact />
              <Route path="menus" element={<Menu />} exact />
              <Route path="menus/:name/:id" element={<MenuList />} exact />
              <Route path="restaurants" element={<RestaurantPage />} exact />
              <Route path="order" element={<OrderList />} exact />
              <Route path="employee" element={<EmployeeList />} exact />
              <Route path="profiles" element={<Profile />} exact />
            </Route>
          </Route>

          {/* admin Role */}
          <Route element={<ProtectedAdminRoute />}>
            <Route path="/" element={<AdminHeader />}>
              <Route path="/admin/order" element={<AdminOrderList />} exact />
              <Route path="/admin/profile" element={<Profile />} exact />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
