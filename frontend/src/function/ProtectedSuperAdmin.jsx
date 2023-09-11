import { GetStore } from "../config/store";
import CryptoJS from "crypto-js";
import { allowedRoles } from "../config/allowedRoles";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const ProtectedSuperRoute = () => {
  const location = useLocation();
  const user = GetStore("user");

  const isValidUser = () => {
    if (!user) {
      return false;
    }

    const hashedRoleFromServer = user.user.role;
    const clientRole = allowedRoles[2];
    const hashedClientRole = CryptoJS.SHA256(clientRole).toString();
    const isRoleValid = hashedClientRole === hashedRoleFromServer;

    return isRoleValid;
  };

  return isValidUser() ? (
    <Outlet />
  ) : (
    <Navigate to="/404" state={{ from: location }} replace />
  );
};

export default ProtectedSuperRoute;
