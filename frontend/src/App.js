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
import ScrollToTop from "./config/scrollToTop";
import { ToastContainer } from "react-toastify";
import { allowedRoles } from "./config/allowedRoles";
import CheckSuccess from "./pages/Global/checkSuccess";
import { OrderList } from "./pages/SuperAdmin/orderList";
import ShowProducts from "./components/User/showProducts";
import ProtectedAdminRoute from "./function/protectedAdmin";
import { IsAuthenticated } from "./function/isAuthenticated";
import { Menu, MenuList, RestaurantPage } from "./pages/index";
import { EmployeeList } from "./pages/SuperAdmin/employeeList";
import WixShowProducts from "./components/User/wixUserProduct";
import ProtectedSuperRoute from "./function/ProtectedSuperAdmin";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  const Role = IsAuthenticated();

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Unauthorised User */}
          <Route
            path="/"
            element={
              Role === null ? (
                <LoginForm />
              ) : Role === allowedRoles[0] ? (
                <Navigate to={"/home"} />
              ) : Role === allowedRoles[1] ? (
                <Navigate to={"/admin/order"} />
              ) : Role === allowedRoles[2] ? (
                <Navigate to={"/dashboard"} />
              ) : (
                <LoginForm />
              )
            }
            exact
          />
          <Route path="/register" element={<RegisterForm />} exact />
          {/*wix user */}
          <Route path="/" element={<UserHeader />}>
            <Route
              path="/restaurant/:name/:id/:uid/:email"
              element={<WixShowProducts />}
            />
          </Route>
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
